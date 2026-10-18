use std::{
  fs,
  path::{Path, PathBuf},
  time::UNIX_EPOCH,
};

// The RuneLite "Character Export" plugin writes one folder per account, each holding these
// files. The app only ever reads these names, never anything else on disk.
const CE_FILES: [&str; 7] = [
  "quests",
  "collection_log",
  "diaries",
  "combat_achievements",
  "character",
  "equipment",
  "bank",
];

fn modified_ms(p: &Path) -> u64 {
  fs::metadata(p)
    .ok()
    .and_then(|m| m.modified().ok())
    .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
    .map(|d| d.as_millis() as u64)
    .unwrap_or(0)
}

// Accept either the plugin's top folder (one subfolder per account) or a single account folder.
fn account_dirs(root: &Path) -> Vec<PathBuf> {
  let has = |d: &Path| CE_FILES.iter().any(|f| d.join(format!("{f}.json")).is_file());
  if has(root) {
    return vec![root.to_path_buf()];
  }
  let mut out = vec![];
  if let Ok(rd) = fs::read_dir(root) {
    for e in rd.flatten() {
      let p = e.path();
      if p.is_dir() && has(&p) {
        out.push(p);
      }
    }
  }
  out
}

#[derive(serde::Serialize)]
struct CeFile {
  account: String,
  name: String,
  text: String,
  modified: u64,
}

// Where the plugin saves by default, if it exists.
#[tauri::command]
fn ce_default_dir() -> Option<String> {
  let home = std::env::var("USERPROFILE").or_else(|_| std::env::var("HOME")).ok()?;
  let p = Path::new(&home).join(".runelite").join("character-exporter");
  if p.is_dir() {
    Some(p.to_string_lossy().into_owned())
  } else {
    None
  }
}

// Newest modified time across the export files. Cheap, so the page can poll it.
#[tauri::command]
fn ce_stamp(path: String) -> Result<u64, String> {
  let root = PathBuf::from(&path);
  if !root.is_dir() {
    return Err("That folder doesn't exist.".into());
  }
  let mut max = 0;
  for d in account_dirs(&root) {
    for f in CE_FILES {
      max = max.max(modified_ms(&d.join(format!("{f}.json"))));
    }
  }
  Ok(max)
}

// Every export file in the folder, grouped by account.
#[tauri::command]
fn ce_read(path: String) -> Result<Vec<CeFile>, String> {
  let root = PathBuf::from(&path);
  if !root.is_dir() {
    return Err("That folder doesn't exist.".into());
  }
  let dirs = account_dirs(&root);
  if dirs.is_empty() {
    return Err("No Character Export files in that folder.".into());
  }
  let mut out = vec![];
  for d in dirs {
    let account = d
      .file_name()
      .map(|s| s.to_string_lossy().into_owned())
      .unwrap_or_default();
    for f in CE_FILES {
      let fp = d.join(format!("{f}.json"));
      if let Ok(text) = fs::read_to_string(&fp) {
        out.push(CeFile {
          account: account.clone(),
          name: f.to_string(),
          text,
          modified: modified_ms(&fp),
        });
      }
    }
  }
  Ok(out)
}

mod sync;
mod vault;


// ---- following a page file ----
// Every page change used to mean a rebuild and an installer. The Beta can instead follow a page
// file on disk: the window asks for its page, and if a file is being followed, that file is what
// it gets. Edit the file, reload the app, done. The followed path lives in a one-line text file
// in the app's own data folder, so a build never has a path baked in.
fn follow_marker(app: &tauri::AppHandle) -> Result<PathBuf, String> {
  use tauri::Manager;
  let dir = app.path().app_local_data_dir().map_err(|e| e.to_string())?;
  fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
  Ok(dir.join("follow-page.txt"))
}
fn follow_read(marker: &Path) -> Option<PathBuf> {
  let t = fs::read_to_string(marker).ok()?;
  let t = t.trim();
  if t.is_empty() { return None; }
  let p = PathBuf::from(t);
  if p.is_file() { Some(p) } else { None }
}
// Serves the followed file in place of the built-in page. Only the page itself: sw.js and
// anything else still come from the build.
fn follow_serve(marker: &Path, req: &tauri::http::Request<Vec<u8>>, resp: &mut tauri::http::Response<std::borrow::Cow<'static, [u8]>>) {
  let path = req.uri().path();
  if path != "/" && path != "/index.html" { return; }
  let Some(file) = follow_read(marker) else { return; };
  let Ok(html) = fs::read_to_string(&file) else { return; };
  let marked = html.replacen("<head>", "<head><meta name=\"buddy-page-from\" content=\"file\">", 1);
  resp.headers_mut().remove("content-length");
  resp.headers_mut().insert("content-type", "text/html; charset=utf-8".parse().unwrap());
  *resp.status_mut() = tauri::http::StatusCode::OK;
  *resp.body_mut() = std::borrow::Cow::Owned(marked.into_bytes());
}
#[tauri::command]
fn follow_get(app: tauri::AppHandle) -> Result<Option<String>, String> {
  let m = follow_marker(&app)?;
  Ok(follow_read(&m).map(|p| p.to_string_lossy().to_string()))
}
#[tauri::command]
fn follow_set(app: tauri::AppHandle, path: Option<String>) -> Result<Option<String>, String> {
  let m = follow_marker(&app)?;
  match path.map(|p| p.trim().to_string()).filter(|p| !p.is_empty()) {
    None => { let _ = fs::remove_file(&m); Ok(None) }
    Some(p) => {
      if !Path::new(&p).is_file() { return Err("There's no file at that path.".into()); }
      fs::write(&m, &p).map_err(|e| e.to_string())?;
      Ok(Some(p))
    }
  }
}
// A likely dev file, offered as the default: the checkout next to Downloads, if it's there.
#[tauri::command]
fn follow_default() -> Option<String> {
  let home = std::env::var("USERPROFILE").ok()?;
  let p = Path::new(&home).join("Downloads").join("OSRS-Buddy").join("OSRS-Buddy-dev.html");
  if p.is_file() { Some(p.to_string_lossy().to_string()) } else { None }
}
#[tauri::command]
fn app_identifier(app: tauri::AppHandle) -> String {
  app.config().identifier.clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    // Must be registered first. A second launch hands its arguments here and exits, instead of
    // opening another window on the same storage.
    .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
      use tauri::Manager;
      if let Some(w) = app.get_webview_window("main") {
        let _ = w.unminimize();
        let _ = w.show();
        let _ = w.set_focus();
      }
    }))
    .plugin(tauri_plugin_opener::init())
    .manage(sync::SyncState::default())
    .setup(|app| {
      // A build whose config lists no windows (the Beta) gets its window here, so the page it
      // loads can come from a followed file. Other builds keep the window from their config.
      {
        use tauri::Manager;
        if app.webview_windows().is_empty() {
          let title = app.config().product_name.clone().unwrap_or_else(|| "OSRS Buddy".into());
          let marker = follow_marker(&app.handle().clone())?;
          tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::default())
            .title(title)
            .inner_size(1180.0, 860.0)
            .min_inner_size(420.0, 560.0)
            .resizable(true)
            .on_web_resource_request(move |req, resp| follow_serve(&marker, &req, resp))
            .build()?;
        }
      }
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      ce_default_dir,
      ce_stamp,
      ce_read,
      sync::sync_start,
      sync::sync_stop,
      sync::sync_status,
      sync::sync_snapshot,
      sync::sync_page,
      vault::vault_dir,
      vault::vault_write,
      vault::vault_list,
      vault::vault_read,
      vault::state_write,
      vault::state_read,
      follow_get,
      follow_set,
      follow_default,
      app_identifier
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
