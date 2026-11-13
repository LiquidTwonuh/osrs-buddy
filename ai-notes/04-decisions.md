# Decisions, with dates and reasons

Updated 2026-11-09

Things that were decided and should not be reopened without Josh. Newest first within each group.

## Product and name

- **2026-10-18, the name is Mortimeter.** Mortimer (Josh's favourite Slayer master) plus meter. OSRS Buddy was one letter from RSBuddy/OSBuddy. Runners-up kept in case a sister tool needs a name: Elder, Sage. Rejected: Quill, Almanac, Scry, Augur, Morrow (tryhard or ambiguous), Mortimetrics (reads as a RuneMetrics knockoff). Tagline "for Old School RuneScape", never "OSRS Companion" (an Android app of that name exists). Product names and window titles changed; the internal identifiers (`com.joshf.osrsbuddy`, `.beta`) did not, because changing them would move every save. File names keep `OSRS-Buddy` until the GitHub rename, because installed phones update from the stable file's raw URL.
- **2026-10-19, the version rule.** Mortimeter shows 1.0 on the surface; the build number underneath keeps counting from 2.0 so tags, installers and the update check never go backwards (shown = internal major minus one). Don't fix either number.
- **2026-10-18 and 10-21, the farewell.** OSRS Buddy got a farewell inside the app: Josh's own letter, an Old Buddy trophy (auto-awarded to any save that existed before the rename, never earnable later), a Buddy theme, a museum of screenshots. It never plays on its own; typing `buddy` plays it, `museum` opens the museum. Patch notes stay professional and don't carry the letter. Don't rewrite the letter.
- **2026-10-02, selling is blocked.** OSRS Wiki text is CC BY-NC-SA 3.0 and the app is built on it everywhere. A paid app would need permission from Weird Gloop. Free with a tip jar is the fallback. The WikiSync cloud API is off limits.
- **2026-10-02, no cloud.** Sync between devices is a Wi-Fi handoff: the desktop opens a short-lived local server, shows a QR code with the address and a one-time code, the phone pulls the JSON; press again later to merge both ways. No accounts. Only revisit a cloud if real users ask.
- **2026-10-02, who uses it: only Josh.** 0 stars, 10 installer downloads, all his. Don't say "your users".

## Pages

- **2026-11-13, Map is Quest Hub; Coffer's sections are GP Grinds, Bank, Exchange, Farm.** Josh stopped liking Map and wanted the Coffer sections renamed before the push, and wanted plain names ("just normal stuff"). Claude proposed Compass and Ventures first; Josh chose Quest Hub and GP Grinds. Internal ids are unchanged.
- **2026-11-13, the rune themes ship as CSS, the Canvas landscape waits.** ChatGPT's catalog has palettes, a decoration layer and a Canvas renderer. Palettes and decoration went in (generated from the catalog, mapped to the app's classes). The renderer did not: it is a cost on phones and the push is close. The brand mark is the catalog's cel-shaded Mortimer. The Theme button opens the Look step instead of cycling.
- **2026-11-11, Flip prices are averages, never a single trade.** The latest high and low are one trade each and showed margins nobody could buy at. Now five-minute averages when at least ten traded each way, else hour averages, and both sides must have traded. Josh's call after trying a bead at 2k each.
- **2026-11-11, Coffer asks about the Wilderness and financial risk separately.** Josh's suggestion once the sweep showed the wiki's Risky flag is mostly market risk. Each is its own hard filter.
- **2026-11-11, Coffer reads Wilderness danger from the wiki's warning box.** The Location field missed most Wilderness methods and the MMG/Risky category is mostly market risk, so Risk = No thanks had let the Corporeal Beast through. Now the MMGWarning box decides, a short list covers what the wiki does not flag (Corp, the obelisks), the Abyss is Low Wilderness on the way, and market risk is its own tag that the Risk answer ignores. Evidence: a sweep of all 655 guide pages.
- **2026-11-11, the Map quest panel is a centred card.** Built as a side panel on 11-09 (reasoning: a card covers the lit path); Josh saw it, loved the popup and asked for it centred, so it is a 620px card with a light scrim that the lit path still reads through. Clicking the page behind it closes it, as do Esc and the X. On a phone it is a bottom sheet. The Focus section was folded away because the goal strip and the Route tab do its job.
- **2026-11-09, Chill day in every edition.** Josh: "every edition needs chill day". A chip in the Journal composer and Quick entry under the heatmap, in dev, stable (as a local checkpoint, not a ship) and Krystal Klear.
- **2026-11-02, Upgrades is not a tier list.** Josh: "i actually hate it as a tier list". The data (67 upgrades) is read three ways: by skill ladder (the lead), by what it does, by stage. Anything relevant to an item links to it: a quest chip opens Map on that quest with the path lit, a level row opens Grind on that skill. Ownership is the one thing the app can't know, so the "Got it" tick is the user's.
- **2026-11-02, Map goes tree first.** Josh's direction: the tree is the page, front and centre, the search bar above it, a big button for the optimal quest guide, full screen a tap away. Clicking a quest lights the path and opens a popup with everything (status, Mark done, Plan this, Pin, Folder, Notes, Wiki; Overview with requirements, needed quests, rewards and what it opens; Steps). Rewards live in the Overview tab, not their own tab. Pinned and Folders are chip rows under the tree. Open: card or side panel for the popup.
- **2026-11-01, mockups first.** Everyone except Josh finds the Map overwhelming. Any page-level rethink gets a mockup in `design/mockups/` with two directions before the live page changes. Josh's taste isn't the test for density; a newer player's is.
- **2026-10-25, the Coffer is finished.** Lens-first: the skill pills lead the page, quiz answers tuck behind "Your answers", every section has its own refresh, "Best for <skill>" when a skill is chosen. Josh: "we might be finito". Treat it as done unless he asks.
- **2026-10-22, Repeatables.** The dailies checklist is called Repeatables, not Rounds, not Dailies. It knows the game's clock (00:00 UTC resets, Wednesday weeklies, intervals) and gates routines by quest and diary.
- **2026-10-21, Map cleanup.** The quest panel is tabbed (Overview, Steps, Rewards) so rewards stop sprawling; popular goals fold away once a goal is charted. Both quest panels repaint together. Superseded in part by the tree-first direction above.
- **2026-10-21, adaptive layout.** Three tiers: phone to 700px, tablet or opened Fold to 1000px, desktop above. The folded Fold's 404px cover gets the compact rules.
- **2026-09-15, heatmap tags.** Cells and bars show skill colours only; non-skill tags (combat, quests, clues, alching) are badges with wiki icons in the day popup. Combat XP is split by skill, no "Combat" lump (a 1.26M Defence week was hiding in it).
- **2026-09-13, Setup.** Six steps (Welcome, Your character, Connect RuneLite, What matters to you, Look and feel, Done). Imports are optional but recommended, never blocking. "Run setup again" is prefilled from the current state and cannot wipe data; anything that could needs a backup offer and two confirmations. The save key `osrs_todo_state_v1` never changes.
- **2026-09-13, RuneLite data.** The desktop app reads the Character Export plugin's folder itself (no fs plugin; three read-only Rust commands), polls every 15 seconds, applies additively, never unticks silently; conflicts are shown per quest. Combat achievements are matched by id, never by the plugin's names (they're paired wrong). Diaries use `tasks_done` counts; the plugin's `complete` flags are wrong. The collection log file is rebuilt per session, so the app merges rather than replaces.
- **2026-09-13, the "OSRS Buddy DEV" shortcut stays.** It opens the dev page in Chrome app mode; Josh uses it on purpose. Don't suggest removing it.

## Look and copy

- **2026-10-31, the default theme is Gilded.** The id stays `parchment` so saves are untouched. Was labelled Buddy after the rename, Parchment before.
- **2026-10-31, motion.** Pages and tabs rise in over a quarter second; off under reduced motion; no fill mode (a page must never be held invisible if the animation can't run).
- **2026-10-21, the icon.** Mortimer breaking out of a teal low-poly tile, a green-framed twin for the Beta. Meter motifs tried and dropped.
- **2026-09-13, the wordmark and emojis.** Loud gold glow toned down; emojis cut back; the Wrapped pill is the benchmark for the one special element.
- **2026-09-10, no em dashes.** App copy and chat alike.

## Krystal Klear

- **2026-10-31, launch day.** Her edition launched with the glass icon (retired the same evening for Josh's crystal-tile art), greetings in Josh's words, a guided tour, Initialize instead of Setup, Discover leading Planning, Flip cut, Advanced settings with Replay the intro and Start over (four prompts). Public release repo holds README, notes and the installer only. First names are in the page by design; no emails, paths or IPs. Nothing from her edition ever goes in the public `osrs-buddy` repo.

## Workflow

- **2026-10-25, the Beta follows a file.** The Beta serves `OSRS-Buddy-dev.html` from disk in place of its built-in page. Page work needs no build: edit, Reload. Installers only for Rust or icon changes, batched. Service workers do register in WebView2 (they hijacked the Beta once), so the page never registers one on desktop and `sw.js` removes itself off Android.
- **2026-10-18, no installs from a Claude session.** The session's sandbox virtualises AppData; an install from there isn't an install Josh has, and chasing it once cost real data. Build, hand over the file, Josh double-clicks it.
- **2026-10-02 and 10-18, checkpoints, not releases.** Local commits are the rollback points. Ship only when Josh says. Don't ask "ship?".
- **2026-10-19, the repo lives at `C:\Projects\mortimeter`**, Krystal Klear beside it in `mortimeter-private`.
