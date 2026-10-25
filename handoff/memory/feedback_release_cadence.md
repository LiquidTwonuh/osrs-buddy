---
name: feedback-release-cadence
description: "OSRS Buddy release workflow: checkpoint locally (stable build installed + local git commit), only push/tag/release when he says ship; don't nudge him to ship after every batch"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 37708f5c-4d78-4076-9b67-7e093a4ab505
  modified: 2026-10-02T10:57:50.257Z
---

Don't push him to "ship" after every batch of changes. On 2026-09-13 he pointed out that 1.4 → 1.7 in one day with a GitHub release each time was "going far too quick". What he wants is safe points to roll back to, not new version numbers.

**Why:** Frequent releases mean update prompts for anyone else and noisy release history, and they add no stability. Rollback safety comes from local commits.

**How to apply ([[project-osrs-backlog]]):**
- **Dev** (`OSRS-Buddy-dev.html`) is where work happens. He deliberately keeps the "OSRS Buddy DEV" Chrome shortcut for dev testing.
- **Checkpoint**, when a batch works:
  1. Copy dev to `OSRS-Buddy.html` (stable).
  2. Build with `npm run build` in `app/`, which syncs from stable.
  3. Put it in his real desktop app by COPYING `app/src-tauri/target/release/OSRS Buddy.exe` over `%LOCALAPPDATA%\OSRS Buddy\OSRS Buddy.exe` (the install is only that exe plus uninstall.exe). The app must be closed first, since Windows locks a running exe — ask him. Decided 2026-10-02: running the NSIS installer each checkpoint deletes and recreates the Start menu shortcut, which makes his icon blink out while Windows re-reads it. Keep the real installer for actual releases, so the thing users get is still tested.
  4. Make a LOCAL git commit ("Checkpoint: …"). Don't push, don't tag, and leave `releases/` snapshot changes uncommitted until ship.
  He tests in the real installed app.
- **Ship**, only when he explicitly says so:
  1. Set the patch-notes date and installer version.
  2. Add the `releases/` snapshot and its README row.
  3. `git fetch` (he edits the README on GitHub; never force-push).
  4. Push, tag, and create the GitHub release.
- Aim for shipping a meaningful batch, roughly weekly or at the end of a big feature. Don't ask "ship?" by default. Offer a checkpoint instead.

**Checkpoints changed on 2026-10-18.** He does not want builds installed over his stable app, and nothing may be launched or installed from this session anyway (sandbox, see [[project-osrs-backlog]]). A checkpoint is now: `npm run build:beta` in `app/` (uses `src-tauri/tauri.beta.conf.json`: product "OSRS Buddy Beta", identifier `com.joshf.osrsbuddy.beta`, own data folder and shortcut), then hand him `app/src-tauri/target/release/bundle/nsis/OSRS Buddy Beta_<ver>_x64-setup.exe` with SendUserFile. He installs it himself from Explorer and runs Beta beside stable. Stable only gets the normal installer when he says. Beta starts with empty data: he imports a file from `Documents\OSRS Buddy\backups` via ⇑ Import, or uses the Wi-Fi sync.

**Checkpoints changed again on 2026-10-18 (later the same day).** He was tired of clicking installers for every Beta build. The Beta now FOLLOWS A PAGE FILE: Settings, Your other devices, "Page file" (Beta only; `isBetaApp()` checks the identifier ends in `.beta`). The Rust side (`follow_*` in `app/src-tauri/src/lib.rs`) serves that file in place of the built-in page via `on_web_resource_request`; the Beta's config lists no windows and `setup` builds one in code. He points it at `OSRS-Buddy-dev.html` once (offered as the default). From then on a checkpoint for page work is: edit dev html, he presses Reload in the Beta (or restarts it). No build, no installer. A build + installer (`npm run build:beta`, which now bakes in the DEV page via `sync:dev`) is only needed for Rust-side or icon changes. Correction 2026-10-25: service workers DO register inside WebView2 (the Beta had one from 2026-10-19). Pressing the phone's Update from GitHub inside the Windows Beta stored the old GitHub page and the worker served it over the built-in one. Fixed by making sw.js self-destruct off Android and the page never register it on desktop. The followed page file is still the desktop's update route.
