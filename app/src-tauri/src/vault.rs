// ---- Backup files on disk ----
//
// On 5 October 2026 the app opened with an empty Scroll. Nothing had deleted anything: the whole
// state lives under one key in the browser engine's storage, the app had been force-killed
// mid-write, and the recovery that followed dropped the half-written key. The data was still in
// orphaned database files and came back, but it should never have depended on that.
//
// So the desktop app also keeps plain JSON files in Documents\OSRS Buddy\backups. They outlive
// the browser storage, the app, and reinstalls, and you can open them in Notepad. The page writes
// one on launch, once an hour while anything changes, and before anything risky.

use std::{
  fs,
  path::{Path, PathBuf},
  time::UNIX_EPOCH,
};

use serde::Serialize;

const KEEP: usize = 20;

#[derive(Serialize)]
pub struct BackupFile {
  pub name: String,
  pub bytes: u64,
  pub modified: u64,
}

fn backup_dir() -> Result<PathBuf, String> {
  let home = std::env::var("USERPROFILE")
    .or_else(|_| std::env::var("HOME"))
    .map_err(|_| "Couldn't find your user folder")?;
  let docs = Path::new(&home).join("Documents");
  let base = if docs.is_dir() { docs } else { Path::new(&home).to_path_buf() };
  let dir = base.join("OSRS Buddy").join("backups");
  fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
  Ok(dir)
}

fn modified_ms(p: &Path) -> u64 {
  fs::metadata(p)
    .ok()
    .and_then(|m| m.modified().ok())
    .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
    .map(|d| d.as_millis() as u64)
    .unwrap_or(0)
}

// Only our own files, only in our own folder: a name can't climb out of it.
fn safe_name(name: &str) -> Result<String, String> {
  let ok = name
    .chars()
    .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_' || c == '.');
  if !ok || name.contains("..") || !name.ends_with(".json") || name.len() > 80 {
    return Err("bad backup name".into());
  }
  Ok(name.to_string())
}

#[tauri::command]
pub fn vault_dir() -> Result<String, String> {
  Ok(backup_dir()?.to_string_lossy().into_owned())
}

// Write a backup, then drop the oldest ones. Writing to a temporary file first means a crash
// halfway through leaves the previous backup whole instead of a truncated one.
#[tauri::command]
pub fn vault_write(name: String, text: String) -> Result<String, String> {
  let dir = backup_dir()?;
  let name = safe_name(&name)?;
  let tmp = dir.join(format!("{name}.part"));
  fs::write(&tmp, text.as_bytes()).map_err(|e| e.to_string())?;
  let final_path = dir.join(&name);
  fs::rename(&tmp, &final_path).map_err(|e| e.to_string())?;

  let mut files: Vec<(PathBuf, u64)> = fs::read_dir(&dir)
    .map_err(|e| e.to_string())?
    .flatten()
    .map(|e| e.path())
    .filter(|p| p.extension().map(|x| x == "json").unwrap_or(false))
    .map(|p| {
      let m = modified_ms(&p);
      (p, m)
    })
    .collect();
  files.sort_by_key(|(_, m)| *m);
  while files.len() > KEEP {
    let (p, _) = files.remove(0);
    let _ = fs::remove_file(p);
  }
  Ok(final_path.to_string_lossy().into_owned())
}

#[tauri::command]
pub fn vault_list() -> Result<Vec<BackupFile>, String> {
  let dir = backup_dir()?;
  let mut out: Vec<BackupFile> = fs::read_dir(&dir)
    .map_err(|e| e.to_string())?
    .flatten()
    .map(|e| e.path())
    .filter(|p| p.extension().map(|x| x == "json").unwrap_or(false))
    .map(|p| BackupFile {
      name: p.file_name().unwrap_or_default().to_string_lossy().into_owned(),
      bytes: fs::metadata(&p).map(|m| m.len()).unwrap_or(0),
      modified: modified_ms(&p),
    })
    .collect();
  out.sort_by(|a, b| b.modified.cmp(&a.modified));
  Ok(out)
}

#[tauri::command]
pub fn vault_read(name: String) -> Result<String, String> {
  let dir = backup_dir()?;
  let name = safe_name(&name)?;
  fs::read_to_string(dir.join(name)).map_err(|e| e.to_string())
}
