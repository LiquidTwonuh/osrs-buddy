# Pages and editions, as they stand

Updated 2026-11-09

## Editions

- **Mortimeter (stable)**: `OSRS-Buddy.html`, the Windows installer `OSRS-Buddy-setup.exe`. Only changes when Josh says ship. Shows version 1.0 on the surface; underneath the build number is 2.0 and keeps counting from where Buddy left off so updates never go backwards.
- **Mortimeter Beta**: identifier `com.joshf.osrsbuddy.beta`, green-framed icon, installs beside stable with its own data. It follows the dev page file from disk: edit `OSRS-Buddy-dev.html`, press Reload in the Beta. Beta-only pages: Board (the shared plan, editable), Mockups (the design pages), the phone preview.
- **Krystal Klear**: the private edition for Krystal, generated from the dev page in `C:\Projects\mortimeter-private`. Her sidebar: Essentials (Home, Scroll, Map, Coffer, Achievements), Learn (Discover, Roadmap, codex), Utilities (Goals, Notes, Ask Bud), Games. A greeting on every boot in Josh's words, a guided tour on the first launch, Setup is called Initialize, Flip is cut, no farewell, museum or GitHub update checks. Her public release repo `LiquidTwonuh/mortimeter-krystal-klear` holds only a README, release notes and the installer.
- **Android**: planned, sideloaded for Josh's testing. Not built. The phone would lean on WiseOldMan and manual imports.

## Sidebar (main app)

Character: Home, Scroll, Achievements. Planning: Goals, Roadmap, Map, Coffer, Notes, Board (Beta), Mockups (Beta). Tools: Ask Bud. Games: Game corner. Below: the character card (combat level, name, total, a refresh), then Theme and Settings.

## Pages

**Home.** The character at a glance: skills grid (24 tiles, three columns on a phone), stat cards, a 30-day heatmap, a Repeatables panel (dailies that know the game's clock), a fun fact, the Wrapped pill when a recap is ready.

**Scroll.** The journal. A heatmap of days played, coloured per skill trained, filled in from stats even when nothing was logged; milestone days get a rainbow ring. Sections: Overview (heatmap, recap, Highlights, Quick entry), Trophies, Journal (the composer where days get logged), and more. Chill day is a one-tap entry that counts as a day played: a chip in the Journal composer (it logs the date in the date box) and a button in Quick entry, which since 2026-11-09 sits right under the heatmap in every edition.

**Achievements.** Collection log (124 pages from the wiki, merged with what the RuneLite export has captured), Diaries (12 regions, 492 tasks), Combat achievements (655 tasks from the wiki's data API, matched to the export by id, never by name).

**Goals.** Targets that complete themselves from live stats, plus priorities (which skills matter to you) that other pages can filter by.

**Roadmap.** Mid-game progression tracks: gear ladders, unlock quests, a bossing ladder, skill milestones, with an "in reach" list from current levels. Every level milestone says why it matters; a fresh account sees the three nearest instead of six far ones.

**Map.** The quest planner, tree first since 2026-11-09 (dev, so the Beta; stable still has the older layout). Pick a goal (one quest, or the cape) and the whole dependency tree draws itself: done, ready now, blocked, with the chain's own XP rewards counted toward later requirements. The Planner page is: a search bar with a big Optimal quest guide button and a full-screen button beside it, a goal strip (progress ring, name, done and ready counts, Route and details, Pin), the tree with its legend, and two chip rows under it, Pinned and Folders. Clicking a quest lights its whole path and opens a centred card over the tree (a bottom sheet on a phone; click outside, Esc or the X closes it) with status, Mark done, Plan this, Pin, Folder, Notes (sends a note with requirements and rewards), Wiki, then tabs: Overview (requirements against your levels, the quests it needs, rewards, what it opens), Steps (tickable quick guide or walkthrough), and on the charted goal a Route tab (counts, the levels still in the way with the quests that pay that XP, every quest in order). Route for all pinned sits in the Pinned row. The other sections are Folders (the board with reordering, and your own lists) and the optimal guide. Quest steps come from the repo's own `data/quest-steps.json` (every quest's quick guide and walkthrough, verbatim from the wiki, CC BY-NC-SA), the live wiki as a fallback. Esc closes the panel, then leaves full screen, then walks back the trail of charted quests.

**Coffer.** Money making. A quiz (love, like, hate per skill; stage from your data) builds a page: skill pills lead (the lens), a podium of best methods, a ledger. Tabs for Repeatables, Vault and Flip (Grand Exchange margins; Flip still trusts a single stale trade, on the fix list). 525 methods from the wiki. Josh called it finished for now.

**Notes.** Sticky notes, saving as you type.

**Board (Beta).** `BOARD.md` rendered and editable in the app; Claude edits the same file from the chat. Ticks in the app tick the file.

**Mockups (Beta and local preview).** The pages in `design/mockups`, listed with a line each, opened inside the app in a frame, full screen available. They run on a copy of Josh's levels and quests; nothing in them touches the save.

**Ask Bud.** A rules assistant: can I do this boss, quest or item; checks requirements against live stats, looks up the wiki for what it doesn't know, remembers it. "I did Dragon Slayer 1" ticks the quest everywhere. Wise Old Claude (an API-key upgrade told as Bud ascending) is queued.

**Game corner.** Gielinor Survivors (a survivors-style game; prayer and save-and-resume are parked ideas) and Dance Dance RuneScape (a rhythm game with its own binds and library).

**Hidden.** Museum (screenshots of every stage, type `museum`), the farewell to OSRS Buddy (type `buddy`; Josh's letter, never rewritten), Patch notes.

## Settings

Themes, character and profiles, RuneLite data (the Character Export folder, synced every 15 seconds on desktop, additive only), backups (Documents\Mortimeter), Your other devices (Wi-Fi sync, and in the Beta the Page file to follow), Run setup again (prefilled, never wipes, two confirmations for anything that could).

## Data the app carries itself

`data/quest-steps.json` (185 of 193 quests, the rest stubs), `data/upgrades.json` (67 account upgrades with how, cost, levels, quests, why; images are the wiki's), and the mockups copied to `data/mockups` for the Beta. Candidates to bring in-repo next: money makers, diaries, achievements.
