# Changelog, by day

Updated 2026-11-15 (covers commits through 2026-11-15)

Newest first. Written from the local git history in plain words; "dev" means the dev page and so the Beta, "stable" means the shipped page. The routine appends a block for each new day it finds.

## 2026-11-15
- dev: cleanup pass. Bakery's locked methods as a lit strip with the gap and guide/quest links; the loading screen's motion and quips; Melee as one Coffer rating; the skill ladder finished for every skill (tree parser, monster templates read, Hitpoints on the Melee guide, methods-as-cards for guides with no level bands) and the wiki link as a centred pill. Settings > Tabs (first tab or where you left off; launch always Home). Repeatable runs: per-patch plant and pick, Sold on herb runs at that day's price, runs reorder with a slide (animMove helper). Settings rebuilt as a tabbed window (General, Look, Advanced, About) with switches; Theme button opens Look; eight more display fonts embedded; Ask Bud behind developer mode. Sidebar down to Character and Tools with Game corner as a quiet dimmed row at the foot; the settings title and tabs keep their height when a pane scrolls. Repeatable runs opens with a routine picker (farm runs, bird houses, the dailies and weeklies, the rest of the wiki list folded) and shows the picks as one reorderable list with the farm cards; Change routine reopens it; Home chips follow the routine. The head of Repeatable runs is a tracker: seven-day strip, figures, Up now chips, and a card per skill the routine trains (Farming, Hunter and Crafting from bird houses by tier, the skill Tears of Guthix lands on) with supplied skills as a slim row; ticks are logged; a round that has come back ticks in one click. Upgrades, a new page: the wiki's melee, ranged and magic gear progression as a ladder with the worn-equipment grid, live prices, best value per point and bank-aware ticks, plus skilling outfits and items by skill (tools/gear.js, data/gear.json). 2026-11-17: the Terminal look as a switchable skin over the whole app (Classic kept in Settings, Look), themes Mortimer and Night from the icon, Home rebuilt with a right-click menu and a terminal, the loading screen and setup in the same manner, and an optional Claude connection with the user's own key for questions in the terminal. Second pass the same day: bars as cells, lists as numbered lines, tags as flags, bracket tick boxes, 63 glyphs of our own in place of emoji (design/skin/glyphs.py), The Bakery restyled as ranked lines, and a play grid on Home that answers to XP gained with the Scroll heatmap under it. Then tiles: the Terminal look is square glass panes a small gap apart, sidebar included, and Home's panes come in two layouts, Mosaic and Orderly (Settings, Look). Phone design, first pass: a tmux-style dock of pages along the bottom, and Home arranged for a folded phone and for the opened-out Fold (design/skin/phone.css).
- dev: phone pass. The page holds still under an open card on touch screens; swipe right opens the sidebar and swipe left closes it; Size in Look (four steps, through the viewport meta on phones); keep-out bands at a phone's top and bottom; the mark instead of the crossed swords in the phone top bar and the favicon; Quest Hub goal banners in the theme's gold only.
- app: Android debug APK built from the dev page without Developer Mode (app/apk.mjs, npm run apk:dev; the stable page with npm run apk), 15 MB, label Mortimeter, same package id. Single-instance plugin desktop-only.

## 2026-11-13
- dev: skill training guides as a card from any requirement (quest card, money maker card), the wiki's page for the level stretch you need.
- dev: Skills, a section: the game's stats tab as the front, a page per skill with the ladder (rungs by level band only, you marked on the most advanced band you hold) and the quests waiting on it. Card entrances animated. Goal banners tinted by the theme.
- dev: loading screen (Mortimer, a line, a bar; quest log and steps warm behind it); Home repeatables tick and arrow; Coffer resolves quest names it could not; RuneLite conflicts one-press untick; Quest Hub goal banners; Repeatable runs with a Patch board / Run log switch; quest-steps.json regathered (190 quests).
- dev: the scene painter restored, the baked images removed (page back to 1.2 MB); Shift+A and Shift+D cycle themes; the loading screen shows the real icon and holds in the Beta; The Bakery opens methods in a centred card.
- dev: renames. Map is Quest Hub; Coffer's sections are The Bakery, Bank, Exchange, Repeatable runs. Farm (was Runs) laid out as centred heroes; empty runs fold.
- dev: Coffer Runs, the farm curated to your Farming level: crop, costs, XP, patches with gates and your own ticks, plant and harvest presses, a weekly tally and log.
- dev: 24 themes from ChatGPT's catalog (23 runes and Clay) with their decoration layer; the cel-shaded Mortimer mark in the brand; the Theme button opens the Look step.
- dev: the catalog's painted scenes ported (sixteen themes), Scene art choice in Look; the flat scene CSS fixed for the rest.
- dev: the older themes are Blue, Purple, Orange, Dark, Black with their own icons; Gilded stays.
- dev: Vault opens with the bank window (direction A): tabs, slot grid, stack numbers, search, gp in the corner, Mark tabs wizard with names in the save.
- dev: Coffer favourites (star), floats a method up the rankings.
- routines: Quest steps and Wiki watch deleted, AI notes paused (Josh).

## 2026-11-11
- dev: the Map quest panel is a centred card (was a side panel); clicking the page behind it closes it.
- dev: scrollbars styled app-wide (thin gold thumb), the quest card centres over the content column, the sidebar folds to a rail; the Map search glass no longer sits on the placeholder.
- dev: Coffer, hide any method (⊘ beside the pin, Hide on cards and in the detail); a Hidden box at the foot of the page brings them back. The podium always fills to three.
- dev: Coffer reads Wilderness from the wiki's warning box (Corp, KBD, the obelisks now flagged; the Abyss is Low Wilderness on the way; Market risk is its own tag). Guide cache v7.
- mockups: Vault as the bank prototype (vault-bank.html), reads the real bank from the app, tab wizard.
- dev: Coffer's Risk question is two: Wilderness, and financial risk (the wiki's flag), each its own filter.
- dev: Map console noise gone (image fallback clash). Flip margins come from averages of real trades (5m or 1h), both sides must have traded, buy limit beside the margin.
- Josh signed off on the Map for now (2026-11-11).
- dev: the quest card is bigger (900px, three columns, no scrolling on a normal screen) and Rewards lead it as a lit band.

## 2026-11-10
- board: Coffer ideas (favourite and hide per card, a runs panel); rules: no installers for Josh, Krystal Klear generates from stable.

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
