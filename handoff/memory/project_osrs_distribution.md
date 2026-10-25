---
name: project-osrs-distribution
description: "OSRS Buddy: parked decisions on selling/licensing, self-updating, device sync and servers, plus the Android plan (2026-10-02)"
metadata:
  node_type: memory
  type: project
  originSessionId: 37708f5c-4d78-4076-9b67-7e093a4ab505
  modified: 2026-10-02T11:09:28.829Z
---

Long discussion on 2026-10-02 about where OSRS Buddy goes as a product. Nothing here is built yet; it's the shape of the decisions for when we come back to it. See [[project-osrs-backlog]] and [[feedback-release-cadence]].

**Who actually uses it: only him.** Checked the repo on 2026-10-02: 0 stars, 0 forks, 10 installer downloads across 12 releases (all his), 11 views from 1 unique visitor in 14 days. The 53 "clones from 32 uniques" are bots scraping public repos. Don't say "your users" or "a handful of users" again; he called that out.

**Selling it is blocked by licences, not by effort.** He'd pay the $25 Play Store fee and sell for ~$1 if it got polished. But OSRS Wiki text is **CC BY-NC-SA 3.0** (confirmed from the API's rightsinfo and meta.weirdgloop.org/w/Licensing), and the app is built on wiki data everywhere: quests, collection log, diaries, combat achievements, boosts, 525 money makers. NonCommercial means a paid app needs permission from **Weird Gloop**, the company the wiki's editors formed after leaving Fandom in Oct 2018 (they also run the RuneScape, Classic and Minecraft wikis). Their licence has a clause waiving the NC restriction for Jagex alone, nobody else. Jagex's own IP (name, item icons) and their fan content policy are a second layer. Free on the Play Store is fine; paid is not, without asking.

**Self-updating (Tauri updater), wanted but not urgent.** He wants it to behave like a real app: prompt with notes, Yes/Later, apply on next close or "Restart now". Work: generate a signing key pair, add the updater plugin + public key, add the check and prompt, and have releases publish a signed bundle plus a manifest. The private key must live somewhere safe and off GitHub; losing it means existing installs can never update. Real blocker is testing, which needs an actual release to update from. Low priority while he's the only user.

**Sync between devices: Wi-Fi handoff is the chosen approach.** Desktop opens a short-lived local web server, shows a QR code holding the address plus a one-time code, phone scans and pulls the JSON; press again later to merge both ways (the backup-import merge code already does the merging). No accounts, no cloud, no cost, works for PC to laptop too. A cloud-synced folder (OneDrive) handles computer-to-computer but not Android, because Android's OneDrive/Drive apps don't expose a real synced folder.

**Server costs, if a cloud is ever wanted:** Cloudflare Workers + KV/D1 free tier covers one user, $5/mo minimum paid; Firebase/Supabase free tiers work (Supabase pauses when idle); a small VPS is ~$5/mo plus ~$10/yr for a domain. Money isn't the obstacle; sign-ins, holding other people's data, privacy policies, backups and 2am outages are. Only revisit if real users ask.

**Away from the PC, the phone leans on WiseOldMan** for XP, levels, boss kills and clues. RuneLite data (quest ticks, collection log, diaries, combat tasks) only changes when he plays on PC, so it can wait for the next sync.

**Current direction (2026-10-02): a working Android build for his own testing.** No store, no signing ceremony, sideloaded for now.

Known obstacles for Android:
- `ceDesktop()` is `!!(window.__TAURI__?.core?.invoke)`, which is **also true on Android**, so the app would claim RuneLite is connected and then fail. Needs a real platform check, with the phone falling back to WOM plus manual import.
- Layout: only 5 mobile breakpoints in ~12,000 lines. The dense screens (heatmap, Coffer tables, quest tree, Achievements) assume a wide window. This is the bulk of the work and it improves the desktop app too.
- Toolchain: Android Studio, SDK, NDK, JDK 17, Rust Android targets, then `tauri android init` / `build`.
