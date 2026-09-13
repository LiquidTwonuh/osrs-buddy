use std::{
  fs,
  path::{Path, PathBuf},
  time::UNIX_EPOCH,
};

// The RuneLite "Character Export" plugin writes one folder per account, each holding these
// files. The app only ever reads these names, never anything else on disk.
const CE_FILES: [&str; 6] = [
  "quests",
  "collection_log",
  "diaries",
  "combat_achievements",
  "character",
  "equipment",
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![ce_default_dir, ce_stamp, ce_read])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
