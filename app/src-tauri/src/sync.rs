// ---- Sync over your own Wi-Fi ----
//
// RuneLite only runs on a PC, so a phone can never see the Character Export files by itself.
// Rather than put anyone's data on a server somewhere, the desktop app hands it to the phone
// directly: while you turn sharing on, it listens on your local network and nothing leaves the
// house.
//
// Pairing is a short code shown on the PC. The phone sends the code once, gets a token back, and
// uses that token from then on. The page keeps the tokens with the rest of its data, and hands
// them back when sharing starts again, so pairing is a one-time thing.
//
//   GET  /ping            who's here (unauthenticated, so a phone can sweep the network)
//   POST /pair            {code, device} -> {token}
//   GET  /pull            the snapshot the page last handed us (needs the token)
//   POST /push            whatever the phone changed while it was away (needs the token)
//
// This is a hand-written HTTP server rather than a web framework: four endpoints on a local
// network didn't justify the dependency.

use std::{
  io::{Read, Write},
  net::{TcpListener, TcpStream, UdpSocket},
  sync::{
    atomic::{AtomicBool, Ordering},
    Arc, Mutex,
  },
  thread,
  time::{Duration, SystemTime, UNIX_EPOCH},
};

use serde::{Deserialize, Serialize};

const PORTS: [u16; 6] = [8787, 8788, 8789, 8790, 8791, 8792];
// no 0/O or 1/I: these get read off a screen and typed on a phone
const CODE_ALPHABET: &[u8] = b"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

#[derive(Clone, Serialize, Deserialize)]
pub struct Pair {
  pub token: String,
  pub device: String,
}

#[derive(Default)]
struct Shared {
  code: String,
  snapshot: String,
  page: String,
  pairs: Vec<Pair>,
  inbox: Vec<String>,
  new_pairs: Vec<Pair>,
  last_seen: u64,
  host: String,
}

pub struct SyncState {
  shared: Arc<Mutex<Shared>>,
  running: Arc<AtomicBool>,
  addr: Mutex<Option<(String, u16)>>,
}

impl Default for SyncState {
  fn default() -> Self {
    Self {
      shared: Arc::new(Mutex::new(Shared::default())),
      running: Arc::new(AtomicBool::new(false)),
      addr: Mutex::new(None),
    }
  }
}

#[derive(Serialize)]
pub struct SyncInfo {
  pub on: bool,
  pub ip: String,
  pub port: u16,
  pub code: String,
  pub host: String,
  pub new_pairs: Vec<Pair>,
  pub inbox: Vec<String>,
  pub last_seen: u64,
}

fn now_ms() -> u64 {
  SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .map(|d| d.as_millis() as u64)
    .unwrap_or(0)
}

// Enough randomness for a code typed within five minutes on a home network, without pulling in a
// crate: the clock in nanoseconds, mixed and spread over the alphabet.
fn scramble(seed: u64, len: usize, alphabet: &[u8]) -> String {
  let mut x = seed ^ 0x9E3779B97F4A7C15;
  let mut out = String::with_capacity(len);
  for _ in 0..len {
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    out.push(alphabet[(x % alphabet.len() as u64) as usize] as char);
  }
  out
}

fn fresh_seed() -> u64 {
  let nanos = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .map(|d| d.as_nanos() as u64)
    .unwrap_or(0);
  nanos ^ (std::process::id() as u64).wrapping_mul(0x5851F42D4C957F2D)
}

// The address the phone should use. Opening a UDP socket "to" a public address sends nothing; it
// just makes the OS pick the interface it would route through, which is the one on your Wi-Fi.
fn local_ip() -> String {
  UdpSocket::bind("0.0.0.0:0")
    .and_then(|s| {
      s.connect("8.8.8.8:80")?;
      s.local_addr()
    })
    .map(|a| a.ip().to_string())
    .unwrap_or_else(|_| "127.0.0.1".into())
}

fn host_name() -> String {
  std::env::var("COMPUTERNAME")
    .or_else(|_| std::env::var("HOSTNAME"))
    .unwrap_or_else(|_| "This PC".into())
}

fn send(stream: &mut TcpStream, status: &str, body: &str) {
  let res = format!(
    "HTTP/1.1 {status}\r\nContent-Type: application/json\r\nContent-Length: {}\r\n\
     Access-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: *\r\n\
     Access-Control-Allow-Methods: GET, POST, OPTIONS\r\nConnection: close\r\n\r\n{body}",
    body.len()
  );
  let _ = stream.write_all(res.as_bytes());
  let _ = stream.flush();
}

fn json_field(body: &str, key: &str) -> String {
  serde_json::from_str::<serde_json::Value>(body)
    .ok()
    .and_then(|v| v.get(key).and_then(|x| x.as_str().map(String::from)))
    .unwrap_or_default()
}

fn handle(mut stream: TcpStream, shared: Arc<Mutex<Shared>>) {
  let _ = stream.set_read_timeout(Some(Duration::from_secs(5)));
  let mut buf = Vec::new();
  let mut chunk = [0u8; 8192];
  // read until the headers are in, then until Content-Length is satisfied
  let mut head_end = None;
  let mut content_len = 0usize;
  loop {
    match stream.read(&mut chunk) {
      Ok(0) => break,
      Ok(n) => {
        buf.extend_from_slice(&chunk[..n]);
        if head_end.is_none() {
          if let Some(i) = buf.windows(4).position(|w| w == b"\r\n\r\n") {
            head_end = Some(i + 4);
            let head = String::from_utf8_lossy(&buf[..i]).to_lowercase();
            for line in head.lines() {
              if let Some(v) = line.strip_prefix("content-length:") {
                content_len = v.trim().parse().unwrap_or(0);
              }
            }
          }
        }
        if let Some(h) = head_end {
          if buf.len() >= h + content_len || buf.len() > 8 * 1024 * 1024 {
            break;
          }
        }
      }
      Err(_) => break,
    }
  }
  let h = match head_end {
    Some(h) => h,
    None => return,
  };
  let head = String::from_utf8_lossy(&buf[..h]).to_string();
  let body = String::from_utf8_lossy(&buf[h..]).to_string();
  let mut lines = head.lines();
  let request = lines.next().unwrap_or("").to_string();
  let mut parts = request.split_whitespace();
  let method = parts.next().unwrap_or("");
  let path = parts.next().unwrap_or("");
  let token = head
    .lines()
    .find(|l| l.to_lowercase().starts_with("authorization:"))
    .map(|l| l.split_whitespace().last().unwrap_or("").to_string())
    .unwrap_or_default();

  if method == "OPTIONS" {
    send(&mut stream, "204 No Content", "");
    return;
  }

  let mut s = match shared.lock() {
    Ok(s) => s,
    Err(_) => return,
  };
  s.last_seen = now_ms();

  // A phone sweeping the network needs something to answer before it's paired. This says only
  // that the app is here and what the PC is called.
  if path.starts_with("/ping") {
    let body = format!(
      "{{\"app\":\"osrs-buddy\",\"host\":{}}}",
      serde_json::to_string(&s.host).unwrap_or_else(|_| "\"\"".into())
    );
    send(&mut stream, "200 OK", &body);
    return;
  }

  if path.starts_with("/pair") && method == "POST" {
    let code = json_field(&body, "code").to_uppercase().replace('-', "");
    let device = json_field(&body, "device");
    if code.is_empty() || code != s.code {
      send(&mut stream, "403 Forbidden", "{\"error\":\"wrong code\"}");
      return;
    }
    let pair = Pair {
      token: scramble(fresh_seed(), 32, b"abcdef0123456789"),
      device: if device.is_empty() { "A phone".into() } else { device },
    };
    s.pairs.push(pair.clone());
    s.new_pairs.push(pair.clone());
    let out = format!(
      "{{\"token\":{},\"host\":{}}}",
      serde_json::to_string(&pair.token).unwrap_or_default(),
      serde_json::to_string(&s.host).unwrap_or_default()
    );
    send(&mut stream, "200 OK", &out);
    return;
  }

  let known = !token.is_empty() && s.pairs.iter().any(|p| p.token == token);
  if !known {
    send(&mut stream, "401 Unauthorized", "{\"error\":\"pair first\"}");
    return;
  }

  // The phone's copy of the app is baked into its APK, so a change means reinstalling, which
  // Android deliberately makes tedious. Instead the PC hands over the page it's running and the
  // phone keeps that, so updating is a button rather than a download and an "install anyway".
  if path.starts_with("/app") {
    if s.page.is_empty() {
      send(&mut stream, "404 Not Found", "{\"error\":\"no page yet\"}");
    } else {
      let page = s.page.clone();
      let res = format!(
        "HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: {}
Access-Control-Allow-Origin: *
Connection: close

{page}",
        page.len()
      );
      let _ = stream.write_all(res.as_bytes());
      let _ = stream.flush();
    }
    return;
  }

  if path.starts_with("/pull") {
    let snap = if s.snapshot.is_empty() { "{}".to_string() } else { s.snapshot.clone() };
    send(&mut stream, "200 OK", &snap);
    return;
  }

  if path.starts_with("/push") && method == "POST" {
    if !body.trim().is_empty() {
      s.inbox.push(body);
    }
    send(&mut stream, "200 OK", "{\"ok\":true}");
    return;
  }

  send(&mut stream, "404 Not Found", "{\"error\":\"no such thing\"}");
}

#[tauri::command]
pub fn sync_start(
  state: tauri::State<'_, SyncState>,
  pairs: Vec<Pair>,
) -> Result<SyncInfo, String> {
  if state.running.load(Ordering::SeqCst) {
    return sync_status(state);
  }
  let listener = PORTS
    .iter()
    .find_map(|p| TcpListener::bind(("0.0.0.0", *p)).ok())
    .ok_or("Couldn't open a port for sharing. Something else may be using them.")?;
  let port = listener.local_addr().map_err(|e| e.to_string())?.port();
  let ip = local_ip();

  {
    let mut s = state.shared.lock().map_err(|_| "sync state is stuck")?;
    s.code = scramble(fresh_seed(), 6, CODE_ALPHABET);
    s.pairs = pairs;
    s.new_pairs.clear();
    s.inbox.clear();
    s.host = host_name();
  }
  *state.addr.lock().map_err(|_| "sync state is stuck")? = Some((ip.clone(), port));
  state.running.store(true, Ordering::SeqCst);

  let shared = state.shared.clone();
  let running = state.running.clone();
  thread::spawn(move || {
    for conn in listener.incoming() {
      if !running.load(Ordering::SeqCst) {
        break;
      }
      match conn {
        Ok(stream) => {
          let shared = shared.clone();
          thread::spawn(move || handle(stream, shared));
        }
        Err(_) => break,
      }
    }
  });

  sync_status(state)
}

#[tauri::command]
pub fn sync_stop(state: tauri::State<'_, SyncState>) -> Result<(), String> {
  state.running.store(false, Ordering::SeqCst);
  let addr = state.addr.lock().map_err(|_| "sync state is stuck")?.clone();
  // the listener thread is parked on accept(), so knock on the door to wake it up
  if let Some((_, port)) = addr {
    let _ = std::net::TcpStream::connect(("127.0.0.1", port));
  }
  *state.addr.lock().map_err(|_| "sync state is stuck")? = None;
  Ok(())
}

// Everything the page needs in one call: whether it's listening, where, the code to type, any
// device that paired since last time, and anything a phone pushed.
#[tauri::command]
pub fn sync_status(state: tauri::State<'_, SyncState>) -> Result<SyncInfo, String> {
  let on = state.running.load(Ordering::SeqCst);
  let addr = state.addr.lock().map_err(|_| "sync state is stuck")?.clone();
  let mut s = state.shared.lock().map_err(|_| "sync state is stuck")?;
  let new_pairs = std::mem::take(&mut s.new_pairs);
  let inbox = std::mem::take(&mut s.inbox);
  Ok(SyncInfo {
    on,
    ip: addr.as_ref().map(|a| a.0.clone()).unwrap_or_default(),
    port: addr.as_ref().map(|a| a.1).unwrap_or(0),
    code: s.code.clone(),
    host: s.host.clone(),
    new_pairs,
    inbox,
    last_seen: s.last_seen,
  })
}

// The desktop app hands over its own HTML, so a paired phone can take the newer copy.
#[tauri::command]
pub fn sync_page(state: tauri::State<'_, SyncState>, text: String) -> Result<(), String> {
  let mut sh = state.shared.lock().map_err(|_| "sync state is stuck")?;
  sh.page = text;
  Ok(())
}

// The page hands over what a phone should receive. Kept as text: the server never looks inside.
#[tauri::command]
pub fn sync_snapshot(state: tauri::State<'_, SyncState>, text: String) -> Result<(), String> {
  let mut s = state.shared.lock().map_err(|_| "sync state is stuck")?;
  s.snapshot = text;
  Ok(())
}
