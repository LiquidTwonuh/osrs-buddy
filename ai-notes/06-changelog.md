# Changelog, by day

Updated 2026-11-09 (covers commits through 2026-11-09)

Newest first. Written from the local git history in plain words; "dev" means the dev page and so the Beta, "stable" means the shipped page. The routine appends a block for each new day it finds.

## 2026-11-09
- dev: Map rebuilt tree first. Search, the Optimal quest guide button and full screen above the tree; a goal strip with a progress ring; Pinned and Folders as chip rows; clicking a quest lights its path and opens a side panel (a bottom sheet on a phone) with actions, Overview, Steps and, for the charted goal, a Route tab. The board panel, the pinned tabs, the Tree/Route switch and the Focus section are gone from the page.
- dev and stable: a Chill day chip in the Journal composer; Quick entry moved up under the heatmap. Krystal Klear rebuilt with the same.
- museum: a screenshot of the new Map.
- notes: the AI notes routine reads the live memory folder under C--Projects.

## 2026-11-02
- dev: Map gets a Focus tab beside the Planner (goal rings, the first ready quest's steps inline, Do next, Levels to get).
- dev: a Mockups page in the Beta's sidebar lists the design mockups and opens them inside the app; `tools/sync-mockups.js` copies them into `data/mockups`.
- data: `data/upgrades.json`, 67 account upgrades with requirements, cost, how and why.
- mockups: `upgrades.html` (tier list, rejected the same day), `upgrades-v2.html` (skill ladders, sets, stages), `map-tree-first.html` (Josh's direction: the tree as the page, a popup per quest).
- design: theme kit for ChatGPT (`design/theme-kit/`: brief, six screenshots, a checker page).
- notes: this folder, `ai-notes/`, and the routine that keeps it current.

## 2026-10-31 (Krystal Klear's launch day)
- stable: put back to the 25 October page, then given only two every-edition changes: Achievements under Character, and the default theme labelled Gilded.
- dev: Roadmap why-lines on every level milestone; a fresh account sees the three nearest milestones instead of six far ones. Quest steps drop leftover `[[ ]]` on screen. Pages and tabs rise in over a quarter second (off under reduced motion, no fill mode).
- shell: WebView2's service worker folder is dropped before the webview starts, so a stored page can never take over again.
- Krystal Klear (private): launch build, greetings, guided tour, Initialize, her sidebar, her icon, Advanced settings, public release repo.
- CLAUDE.md: a brief whenever a new day starts.

## 2026-10-25
- Coffer lens-first: skill pills lead, answers tuck behind a toggle, "Best for <skill>" podium, the open method under it.
- Scroll: one-tap Chill day that counts as a day played.
- The page-update worker is the phone's only: it removes itself on a desktop, the page never registers it there, the phone preview no longer offers real updates (fix for the hijacked Beta).
- stable checkpoint: lens-first Coffer, chill day, worker fix.
- Handoff notes for working from the laptop (`handoff/`), a memory snapshot in the repo.
- The repo's home is `C:\Projects\mortimeter`.

## 2026-10-22
- Quest steps from our own file first: `tools/quest-steps.js` gathers quick guides and walkthroughs verbatim into `data/quest-steps.json` (185 of 193); builds carry `data/`; the Beta is served data beside the followed page; the Steps tab switches Quick / Walkthrough.
- Rounds are Repeatables, on Home and in the Coffer.
- stable checkpoint: Repeatables, preview exit, section refresh, Main, image fallback, local quest steps.

## 2026-10-21
- Adaptive layout: phone, tablet or opened Fold, desktop. Map: quest steps from the wiki, tabbed quest panel, popular goals fold away. Both quest panels repaint together; plain message when the wiki can't be reached.
- Coffer: capitalised strip words as lit pills, a section per loved skill, per-section refresh, "Main" not "A main"; wiki images fall back to a placeholder.
- The farewell never plays on its own.
- Phone preview: the way out survives the panel repaint; an Exit preview button in the top bar.
- The Mortimeter icon: Mortimer breaking out of a teal tile, and the green-framed Beta twin; source, cutout and tile variants in `design/`.
- CLAUDE.md: a stable installer never ships behind dev without saying so.
- stable checkpoint: Rounds, lens, loved-skill sections, Map steps, adaptive layout, icon.

## 2026-10-19
- Mortimeter: the rename, the farewell, the Old Buddy trophy, the Buddy theme, the museum.
- Coffer: Rounds, a checklist of dailies that knows the game's clock, with the routines the wiki leaves out; a Rounds panel on Home; the lens.
- Mortimeter shows 1.0 on the surface; the build number keeps counting from 2.0 underneath.
- Foundation: CLAUDE.md with the standing rules, a design folder, the Beta's default page path follows the move to Projects.
- stable checkpoint: Mortimeter 2.0 (local build, not released).

## 2026-10-18
- Beta edition: same code, its own identity, installs beside stable. Then: the Beta follows a page file, green Beta icon, icon concepts.
- Phone updates that actually apply: a service worker serves the stored page.
- Coffer strip, podium and ledger; the Board (BOARD.md rendered and editable in the Beta).
- Museum: screenshots of every stage, July to the last day as OSRS Buddy.

## 2026-10-17
- Coffer: Vault and Flip tabs, the articles are gone; the quiz with Love/Like/Hate skills, stage from your own data, a top three that fits.
- Ready now means it, miniquests count, wiki links open on desktop. The bank is read once on the first launch that knows about it.

## 2026-10-15 and 10-16
- The Coffer gets a picks board and a detail panel like the Map; the quiz goes deeper and builds a page, not a list.
- Every launch records what loaded and why; the save-file read retries once. Desktop keeps its own save file. Backup and save-file folders follow the running app's name and identifier. Snoozes pick a length.

## 2026-10-02 to 10-06
- Android: tell a phone from the desktop app, so RuneLite watching stays desktop-only.
- Never lose the Scroll again: mirror key, backup files on disk, a load that refuses to overwrite. Only ever one copy of the app, restore without asking.
- Phone: tighter layout, quiz fixes, the app can update itself from your PC. WOM toggle into Settings.
- Day popup: a log button on every day that opens the Journal.

## September 2026 (as OSRS Buddy)
- 1.7 (09-24): RuneLite data, The Map (planner, folders, optimal guide, drag between board and folders), XP on the right day, the Coffer's Earn tab with the money making guide and the quiz, shared reach engine, profit floor slider.
- 09-15: combat XP split by skill, tag badges in the day popup instead of cell marks, re-spread skill colours, recap heatmap with day, span and week selection, bars first.
- 1.6 (09-13): Setup walkthrough and RuneLite import. Same day: Achievements tab (collection log, diaries, combat achievements matched by id), diary counts from tasks_done.
- 1.5 (09-13): the Scroll upgraded, Trophy cabinet, quest board.
- 1.4 (09-09): Gielinor Survivors, boss drops, heatmap skill focus.

## August 2026
- 1.3 to 1.3.3 (08-12, 08-13): rhythm game stability, Home layout fix, cleanup.
- 1.0 to 1.2 (08-06, 08-07): first releases; a runnable copy of each released version kept in `releases/`.
