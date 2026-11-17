# Mortimeter, the whole brief

Bundled 2026-11-17 from ai-notes/ in C:\Projects\mortimeter. Read it top to bottom; the rules every AI should know are in the first section of the workflow file at the end. Write back through ai-notes/INBOX.md.



---

# Vision

Updated 2026-11-02

## What Mortimeter is

A character companion for Old School RuneScape. One HTML file is the whole app; a Tauri shell wraps it for Windows and, one day, Android. It reads a character from the hiscores and WiseOldMan, from the RuneLite Character Export plugin's files on the same PC, and from the OSRS Wiki, and turns that into pages that each answer one question: what did I do, what can I do next, what is it worth, what am I close to.

The name: Mortimer, Josh's favourite Slayer master, plus "meter", because the app measures your account. Pronounced mor-tih-mee-ter. Tagline "for Old School RuneScape". It was OSRS Buddy from August to October 2026; that name was one letter from RSBuddy/OSBuddy, a third-party client that ended badly with Jagex, so it went.

## Who it's for

Josh first (LiquidTwonuh, in game "Twonuh", combat 107, 109 quests done, a mid-game main). He builds it for himself and uses it daily. Second, Krystal, his fiancée, a brand-new player, who has her own edition (Krystal Klear). Third, anyone who downloads it from GitHub. Josh checked in October: nobody else uses it yet. That is fine; it is built as if they will.

The newer player is the test for whether a page is too much. Josh likes dense screens. Everyone else who has seen the Map found it overwhelming. So density is allowed, but it must be layered: the big picture first, detail on demand.

## The philosophy

- **The game is the content.** The app doesn't invent lore or jokes. It shows real requirements, real rewards, real XP, with the game's own icons for colour. When the wiki says it, the app quotes it and credits it.
- **Honest numbers.** Days played are filled from stats even when nobody logged them. The heatmap doesn't flatter. Ready means ready: every prerequisite, every level, the combat level too.
- **Layered, not sprawling.** Josh's phrase: "hide the info in a way, layer it". One main element per page, the rest in popups, tabs, folds and sheets. Scrolling is a smell.
- **Everything links.** If a requirement is shown anywhere, it opens where you'd act on it: a quest chip opens that quest on Map with its path lit, a level row opens that skill's grind.
- **The user owns the ticks.** The app can't know what you own or what you count as done. Those are the user's to tick, and the app never wipes them. "Run setup again" cannot drop data; anything that could needs two confirmations.
- **Local only.** Your data lives in your own storage. No accounts, no cloud. Sync between devices is a Wi-Fi handoff with a QR code, planned, not built.
- **No nagging.** Incentives are allowed (streaks, fireworks on a level, an app level of its own one day). Nags are not. Nothing pops up to scold.
- **Plain words.** Copy describes what a thing does. Warmth is allowed when Josh writes it (his lines in Krystal Klear stay verbatim). Manufactured quirk from an AI is not.
- **Ours, not Jagex's.** Mortimer the character is drawn by us (a skull in a crested teal helm, purple cape, a meter motif). No Jagex models, renders or audio, ever.

## Where it's going

The near horizon is the Map redesign (tree first, popup per quest), an Upgrades page (account upgrades by skill ladder, linked to Map and Grind), and a calmer first sight for new players. Further out: Wise Old Claude (Bud with a bring-your-own API key), an Android build, Wi-Fi sync, a self-updater, Mortimeter as a skill (the app has a level), rune-styled themes. Selling it is blocked by the wiki's non-commercial licence, so it stays free; a tip jar is the fallback.


---

# Design and artistic direction

Updated 2026-11-02

## The look in one paragraph

A warm, dark manuscript. Page background near-black brown, panels a shade lighter, one gold accent for headings, active items, primary buttons and bars. Display type is EB Garamond (a manuscript serif), body type is the system sans (Segoe UI on Windows). Hairline borders, soft shadows, corners rounded 8 to 12px. Nothing glows unless it is the one thing on the page that should. Josh's words for the target: sleek, modern, thematic, not loud.

## Themes and tokens

A theme is one CSS block that sets 27 colour tokens on `body[data-theme=...]`. Layout, type and spacing never change between themes; every colour on every page comes from the tokens. The themes: Gilded (the default, gold on warm dark; its id is still `parchment` so saves don't move), Crystal (ice blue), Nature (green), Shadow (violet), Dark, Black (pitch), Ember. Krystal Klear offers Crystal, Gilded, Nature, Dark.

The full token table with the Gilded values, two example blocks and a ready prompt for ChatGPT is in `design/theme-kit/brief.md`, with six screenshots beside it and `theme-kit.html`, a page that recolours as you paste a block in and checks contrast and that all 27 tokens are present. That kit is what to hand a model that is asked for a theme. Never hand over the installer or the page source.

The token groups, in short: backgrounds darkest to lightest (`--bg`, `--bg2`, `--panel`, `--panel2`, `--inset`, `--cellbg`, `--active`, `--border`, `--catbd`); the accent in four steps plus a halo (`--gold`, `--gold-dim`, `--gold2`, `--gold3`, `--glow`); text (`--text`, `--muted`, `--ph`, `--code`, `--xp`); buttons (`--btnlo`, `--btnhov1`, `--btnhov2`); status, which keeps its meaning in every theme (`--green`, `--green-bg`, `--red`, `--blue`); small parts (`--dotdim`, `--swempty`, `--shadow`).

Not themeable: the 24 per-skill colours (they match the in-game icons, spread so no two are closer than about 15 degrees of hue) and the two fonts.

## Rules that came from Josh's reactions

- **Too loud, toned down (September 2026):** a 76px glowing gold wordmark with chunky wooden rods on the Scroll ("too much tbh... its like loud") became a 32px wordmark in the theme's accent, hairline rods, no glow. A big red wax-seal button ("big red and obnoxious") went.
- **The one thing he loves:** the "Generate your Wrapped" pill on the Scroll's Highlights: a full-round pill in the display font, bold, purple to pink to orange gradient (`#8e2de2, #f15f79, #f7971e`) that shifts on hover, a soft coloured glow, a small lift. That treatment is reserved for the one special action on a page.
- **Emojis:** "we are overusing them a bit." None on buttons by default, one only where it does real work. The sidebar keeps one icon per entry.
- **Decoration on dense visuals, no.** Marks drawn on heatmap cells (slashes, dots, folded corners) were "terrible". Cells show skill colours only; the detail lives in the popup for a day, as badges with the wiki's icons and counts. He prefers information on demand over ornament.
- **Make the whole element clickable** instead of adding a button ("just click it"). No duplicate navigation (two sets of tabs for one thing).
- **Centred and minimal** beats busy. Small teaser stats that draw people in are good.
- **Motion:** pages and tabs rise in over a quarter second when they appear, off under reduced motion, never a fill mode that could hold a page invisible. Josh wants more of this later: a shared-element feel between a card and the page it opens, rows that stagger in, a sidebar highlight that slides.

## Copy rules

- Plain descriptions of what things do. "Notes: a sticky-note board. Notes save as you type."
- Descriptive titles ("Themes, notes and renames"), not cute ones ("Elements & elbow room" was called cringe).
- No em dashes anywhere, app or chat. A comma, a full stop, a colon, or a rewrite.
- No filler asides ("obviously", "instead of silently judging you").
- Counts as sentences on calm pages: "28 of 34 done, 2 ready now".
- Names that stuck: Scroll (the journal), Map (quests), Coffer (money), Repeatables (dailies, never Rounds or Dailies), Chill day (a one-tap journal entry that counts as a day played), Bud (Ask Bud / Wise Old Bud). Map and Coffer may still be renamed once Coffer is finished; Scroll stays.

## Layout

Three tiers: phone to 700px (drawer sidebar), tablet or an opened Fold 701 to 1000px (slim sidebar stays), desktop above. A folded Fold's 404px cover screen gets the compact rules. The skills grid keeps three columns down to 330px so all 24 skills fit one screen. The Map is the one page allowed the whole window width (`data-wide`), as is anything that is a canvas rather than a reading column (the Mockups frame uses it too).

## Data visualisation

One scale per chart, never two axes. Status colours mean the same thing everywhere: green ready or done, gold close, muted later, red blocked. Same-level marks stack rather than overlap so a scale stays honest (the Upgrades ladders do this). Text is always in text tokens, never in a series colour; the coloured mark beside it carries identity. Hover gives the detail. The game's own icons carry category colour wherever possible (skill icons, item icons from the wiki).

## Mockups

Page-level rethinks get a standalone mockup in `design/mockups/` first: same tokens, the real data from Josh's save (levels, quests done, in progress), two directions where there's a real choice, and toasts standing in for actions that would cross pages. Josh picks, then it's built behind the live page. Current mockups: `map-calm.html` (two calmer Map directions), `map-tree-first.html` (Josh's own direction, the tree as the page with a popup per quest), `upgrades.html` (tier list, rejected), `upgrades-v2.html` (skill ladders, the direction that stuck). They open inside the Beta from the Mockups page in the sidebar.

## The icon and Mortimer

The app icon is Mortimer breaking out of a teal low-poly tile; the Beta's twin has a green frame; Krystal Klear's has an ice-blue crystal frame (hers lives only in the private repo). Meter motifs on the icon (halo arc, frame as gauge, speedometer) were tried and dropped; the character carries the name. Finals live in `design/` and `design/mortimer-icon/`; iteration happens in ChatGPT or an image generator, keepers land in the repo. Mortimer himself: a skull in a crested teal helm, purple cape. Always our drawing.


---

# Pages and editions, as they stand

Updated 2026-11-09

## Editions

- **Mortimeter (stable)**: `OSRS-Buddy.html`, the Windows installer `OSRS-Buddy-setup.exe`. Only changes when Josh says ship. Shows version 1.0 on the surface; underneath the build number is 2.0 and keeps counting from where Buddy left off so updates never go backwards.
- **Mortimeter Beta**: identifier `com.joshf.osrsbuddy.beta`, green-framed icon, installs beside stable with its own data. It follows the dev page file from disk: edit `OSRS-Buddy-dev.html`, press Reload in the Beta. Beta-only pages: Board (the shared plan, editable), Mockups (the design pages), the phone preview.
- **Krystal Klear**: the private edition for Krystal, generated from the stable page (`OSRS-Buddy.html`) in `C:\Projects\mortimeter-private`. Her sidebar: Essentials (Home, Scroll, Map, Coffer, Achievements), Learn (Discover, Roadmap, codex), Utilities (Goals, Notes, Ask Bud), Games. A greeting on every boot in Josh's words, a guided tour on the first launch, Setup is called Initialize, Flip is cut, no farewell, museum or GitHub update checks. Her public release repo `LiquidTwonuh/mortimeter-krystal-klear` holds only a README, release notes and the installer.
- **Android**: planned, sideloaded for Josh's testing. Not built. The phone would lean on WiseOldMan and manual imports.

## Sidebar (main app)

Character: Home, Scroll, Achievements. Planning: Goals, Roadmap, Quest Hub (was Map until 2026-11-13), Coffer, Notes, Board (Beta), Mockups (Beta). Tools: Ask Bud. Games: Game corner. Below: the character card (combat level, name, total, a refresh), then Theme and Settings.

## Pages

**Home.** The character at a glance: skills grid (24 tiles, three columns on a phone), stat cards, a 30-day heatmap, a Repeatables panel (dailies that know the game's clock), a fun fact, the Wrapped pill when a recap is ready.

**Scroll.** The journal. A heatmap of days played, coloured per skill trained, filled in from stats even when nothing was logged; milestone days get a rainbow ring. Sections: Overview (heatmap, recap, Highlights, Quick entry), Trophies, Journal (the composer where days get logged), and more. Chill day is a one-tap entry that counts as a day played: a chip in the Journal composer (it logs the date in the date box) and a button in Quick entry, which since 2026-11-09 sits right under the heatmap in every edition.

**Achievements.** Collection log (124 pages from the wiki, merged with what the RuneLite export has captured), Diaries (12 regions, 492 tasks), Combat achievements (655 tasks from the wiki's data API, matched to the export by id, never by name).

**Goals.** Targets that complete themselves from live stats, plus priorities (which skills matter to you) that other pages can filter by.

**Roadmap.** Mid-game progression tracks: gear ladders, unlock quests, a bossing ladder, skill milestones, with an "in reach" list from current levels. Every level milestone says why it matters; a fresh account sees the three nearest instead of six far ones.

**Quest Hub** (Map until 2026-11-13)**.** The quest planner, tree first since 2026-11-09 (dev, so the Beta; stable still has the older layout). Pick a goal (one quest, or the cape) and the whole dependency tree draws itself: done, ready now, blocked, with the chain's own XP rewards counted toward later requirements. The Planner page is: a search bar with a big Optimal quest guide button and a full-screen button beside it, a goal strip (progress ring, name, done and ready counts, Route and details, Pin), the tree with its legend, and two chip rows under it, Pinned and Folders. Clicking a quest lights its whole path and opens a centred card over the tree (a bottom sheet on a phone; click outside, Esc or the X closes it) with status, Mark done, Plan this, Pin, Folder, Notes (sends a note with requirements and rewards), Wiki, then tabs: Overview (requirements against your levels, the quests it needs, rewards, what it opens), Steps (tickable quick guide or walkthrough), and on the charted goal a Route tab (counts, the levels still in the way with the quests that pay that XP, every quest in order). Route for all pinned sits in the Pinned row. The other sections are Folders (the board with reordering, and your own lists) and the optimal guide. Quest steps come from the repo's own `data/quest-steps.json` (every quest's quick guide and walkthrough, verbatim from the wiki, CC BY-NC-SA), the live wiki as a fallback. Esc closes the panel, then leaves full screen, then walks back the trail of charted quests.

**Skills** (2026-11-13). Every skill with your level and the way to the next; per skill, the hero, the quests waiting on it, and the wiki's training guide as a ladder with you marked on it. The same guide opens as a card from any requirement row.

**Two looks** (2026-11-17). Terminal is the default: monospace names and numbers, hairlines, a prompt-style path line, and Home rebuilt around a right-click menu and a terminal (log plus one command line; with a user's own Claude API key, questions go to Claude). Classic is the page as it was, in Settings, Look. All Terminal rules sit between the SKIN_TERM markers under `body[data-skin="term"]`. Themes Mortimer (default) and Night come from the icon's colours.

**Upgrades** (2026-11-16; tabs Melee, Ranged, Magic, Skilling). The wiki's gear progression guides as a ladder per combat style: the rung your levels reach, the worn-equipment grid for a rung with what is new on it, today's prices, what each point of bonus costs, and ticks for what you own (the RuneLite export fills in the bank). Skilling is the wiki's Skilling equipment page by skill. Data is a snapshot from `tools/gear.js`, inline in the page.

**Coffer** (sections The Bakery, Bank, Exchange, Repeatable runs since 2026-11-13)**.** Money making. A quiz (love, like, hate per skill; stage from your data) builds a page: skill pills lead (the lens), a podium of best methods, a ledger. Tabs for Repeatables, Vault, Flip and Runs (the farm: herb, tree, fruit and hardwood runs curated to your Farming level, patches with gates, plant and harvest presses, a log). Vault opens with the bank window (tabs you mark yourself, slot grid, stack numbers, search) above the value history. Flip margins are averages of real trades (5m or 1h). 525 methods from the wiki. Josh called it finished for now.

**Notes.** Sticky notes, saving as you type.

**Board (Beta).** `BOARD.md` rendered and editable in the app; Claude edits the same file from the chat. Ticks in the app tick the file.

**Mockups (Beta and local preview).** The pages in `design/mockups`, listed with a line each, opened inside the app in a frame, full screen available. They run on a copy of Josh's levels and quests; nothing in them touches the save.

**Ask Bud.** A rules assistant: can I do this boss, quest or item; checks requirements against live stats, looks up the wiki for what it doesn't know, remembers it. "I did Dragon Slayer 1" ticks the quest everywhere. Wise Old Claude (an API-key upgrade told as Bud ascending) is queued.

**Game corner.** Gielinor Survivors (a survivors-style game; prayer and save-and-resume are parked ideas) and Dance Dance RuneScape (a rhythm game with its own binds and library).

**Hidden.** Museum (screenshots of every stage, type `museum`), the farewell to OSRS Buddy (type `buddy`; Josh's letter, never rewritten), Patch notes.

## Settings

Themes, character and profiles, RuneLite data (the Character Export folder, synced every 15 seconds on desktop, additive only), backups (Documents\Mortimeter), Your other devices (Wi-Fi sync, and in the Beta the Page file to follow), Run setup again (prefilled, never wipes, two confirmations for anything that could).

## Data the app carries itself

`data/quest-steps.json` (185 of 193 quests, the rest stubs), `data/gear.json` (the three gear progression guides and the Skilling equipment page, also written inline into the page by `tools/gear.js`), `data/upgrades.json` (67 account upgrades with how, cost, levels, quests, why; images are the wiki's), and the mockups copied to `data/mockups` for the Beta. Candidates to bring in-repo next: money makers, diaries, achievements.


---

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

- **2026-11-15, the Size setting is a viewport-meta change on phones, not a CSS zoom.** Zoom on the root scales viewport units with it (a 100dvh sidebar overflowed the screen at 1.3), so the page narrows its layout width instead and the phone draws everything bigger. Desktops ignore the meta; the Look step says so and points at Ctrl and plus.
- **2026-11-15, the sidebar swipe counts from anywhere on a phone.** Android keeps the screen's edge for its back gesture, so an edge-only swipe would never arrive. Anything that scrolls sideways itself keeps its swipe.
- **2026-11-15, Quest Hub banners wear the theme's gold only.** The per-goal hues (even theme-mixed) read as washed out; Josh wanted them gone.
- **2026-11-13, Map is Quest Hub; Coffer's sections are The Bakery, Bank, Exchange, Repeatable runs.** Josh stopped liking Map and wanted the Coffer sections renamed before the push, and wanted plain names ("just normal stuff"). Claude proposed Compass and Ventures first; Josh chose Quest Hub, then The Bakery (his own, half a joke, kept) and Repeatable runs. Internal ids are unchanged.
- **2026-11-13, the rune themes ship with the painted scenes after all.** First pass left the Canvas renderer out as a phone cost; Josh saw the themes without their scenes and said they looked wrong, which was fair: the scene is the theme. The painter is ported as ChatGPT wrote it, runs once per theme change, and can be turned off in Look. The brand mark is the catalog's cel-shaded Mortimer. The Theme button opens the Look step instead of cycling.
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


---

# Ideas, open threads and what Josh still owes

Updated 2026-11-09

The live list is `BOARD.md` (Now, Next, Small fixes, Ideas, Parked). This is the same material arranged for someone coming in cold, with the thinking behind each. When an item moves on the Board, the routine moves it here.

## Decisions Josh owes (blocking something)

- **Tree-first Map: ship it?** Live in dev since 2026-11-09; Josh loves the popup (centred card since 11-11). Stable keeps the old Map until he says ship.
- **Upgrades: do the skill ladders lead the page?** The v2 mockup opens on By skill. If yes, it becomes a real page with quest chips opening Map and skill rows opening Grind.
- **Debrief of launch day's five changes.** Roadmap why-lines, bracket cleanup on quest steps, Achievements under Character, Gilded, the quarter-second rise. Stable got two of them; Josh picks which others stay.
- **Rename Map and Coffer?** Wanted once Coffer is finished; Scroll stays.

## In progress or next

- **Tree-first Map, polish.** Built. Left to look at: whether the popular goals row should fold tighter, a Route tab for folders, and the Folders page catching up with the chip look.
- **Upgrades page** from `data/upgrades.json`: ladders, sets, stages, the Next up rail, the sheet with links out.
- **Wise Old Claude.** Bud takes an Anthropic API key in Settings (key stays on the machine, the person pays per question), gets the app's context in one prompt, told as lore: Bud ascending. Provider picker with only Anthropic for now. Waits on Bud's name.
- **Rebrand leftovers.** Android label and package plus one fresh APK; the GitHub repo rename (Josh does it; old links redirect); README and releases table.
- **Flip fix.** It trusts the latest high/low trade as a price. Use the 5-minute and hour averages, require real volume, show it, hide thin items by default, show the buy limit next to the margin.
- **Console noise on Map.** An inline `onerror` fires after the global wiki-image fallback has replaced the image. Guard it or drop the inline handler.
- **Wrong tooltips somewhere on the Map.** Josh saw them; which ones is unknown.
- **Coffer stage thresholds**, once a few people have seen "Auto".
- **Android layout polish**, touch dragging untested.

## Ideas, not started

- **Coffer, favourite and hide per card (2026-11-10).** Both done in dev: hide on 2026-11-11, favourite (a star, 1.8 times the score) on 2026-11-13.
- **A Skills page (2026-11-13).** The skill guide card exists (tap a requirement). Josh floated a page per skill; it would hold every guide, the level ladder, and the Upgrades mockup's skill ladders. Decide after he has used the card.
- **Vault as the bank (2026-11-11).** Done: Josh picked A on 2026-11-13 and it is in Vault. The mockup stays for B.
- **Coffer runs panel (2026-11-10).** Built 2026-11-13 as the Runs section. Left for later: allotments, flowers, bushes, calquat, celastrus, spirit trees, per-patch crops, diary yield bonuses. Original note: Tree runs, herb runs and the like, tracked properly: Repeatables already times them, this would know the patches, what is planted and when it is ready, what a run yields and costs, and a weekly tally. Josh expects it to be very useful. Queued behind shipping the Map.
- **Priorities that matter (opt-in).** Home leads with your priorities and what moved on them; Scroll entries tagged with a priority feed a per-priority streak and share of XP; Coffer and Map filter by the active priority; the weekly recap says how much of the week went to them.
- **Mortimeter as a skill (opt-in).** The app itself has a level: XP from days logged, quests ticked, goals finished, recaps read, Coffer picks done, streaks held. Level-ups with the 99-style fireworks, a tab on Home, maybe unlocks (themes, Mortimer lines). Incentive, never a nag. Needs its own XP table and a cap so it can't be farmed by clicking.
- **More life.** Shared-element transitions between a card and the page it opens, rows that stagger in, a sidebar highlight that slides instead of jumps. Another Coffer pass later.
- **Rune themes.** Themes styled on the game's runes, not flat colours: textures, glows, per-rune palettes. Keep the OG, minimal, dark and pitch-black ones. Needs a theme format that can carry background art, panel textures and accent glows, not just 27 tokens. ChatGPT does the designing from the theme kit.
- **Theme kit for ChatGPT.** Done as a kit (`design/theme-kit/`); the ideas it enables are open.
- **Map, calmer.** Two directions drawn (one goal at a time with rings; one ready-now list). Largely absorbed by tree-first, but the rule stands: iOS-like calm, one question per screen, grouped lists, colour from the game's icons, counts as sentences.
- **Self-updater** (Tauri updater): prompt with notes, Yes/Later, apply on next close. Needs a signing key kept off GitHub; low priority while Josh is the only user.
- **Wi-Fi sync** between devices (QR code handoff, merge both ways). Designed, not built.
- **Android build** for Josh's own testing, sideloaded. Obstacles: the desktop check is true on Android too, dense screens assume a wide window, the toolchain.
- **More data in-repo:** money makers, diaries, achievements, so the app depends less on the live wiki.
- **Wise Old Bud gets smarter from a wiki scrape.**
- **A Mortimer-flavoured Slayer page.**
- **A RuneLite plugin of our own** that posts straight to the app's local server.
- **Coffer: highlight methods by a chosen skill** (partly done through the lens).
- **Gielinor Survivors:** a prayer system (points bar that drains, protection prayers, potions to restore) and saving a run to resume it after closing or switching views.
- **Boss collection log gaps:** fill every boss's items from the wiki when the import can't.
- **New app icons per edition** are prepared in `design/mortimer-icon/`; installers pending and batched.

## Parked

- Lumped XP day splitter (WiseOldMan lands several days' XP on one day). Until the day popup is reworked.
- The physical move of the repo folder to `C:\Projects\mortimeter` (currently a bridge). Harmless.


---

# Changelog, by day

Updated 2026-11-15 (covers commits through 2026-11-15)

Newest first. Written from the local git history in plain words; "dev" means the dev page and so the Beta, "stable" means the shipped page. The routine appends a block for each new day it finds.

## 2026-11-15
- dev: cleanup pass. Bakery's locked methods as a lit strip with the gap and guide/quest links; the loading screen's motion and quips; Melee as one Coffer rating; the skill ladder finished for every skill (tree parser, monster templates read, Hitpoints on the Melee guide, methods-as-cards for guides with no level bands) and the wiki link as a centred pill. Settings > Tabs (first tab or where you left off; launch always Home). Repeatable runs: per-patch plant and pick, Sold on herb runs at that day's price, runs reorder with a slide (animMove helper). Settings rebuilt as a tabbed window (General, Look, Advanced, About) with switches; Theme button opens Look; eight more display fonts embedded; Ask Bud behind developer mode. Sidebar down to Character and Tools with Game corner as a quiet dimmed row at the foot; the settings title and tabs keep their height when a pane scrolls. Repeatable runs opens with a routine picker (farm runs, bird houses, the dailies and weeklies, the rest of the wiki list folded) and shows the picks as one reorderable list with the farm cards; Change routine reopens it; Home chips follow the routine. The head of Repeatable runs is a tracker: seven-day strip, figures, Up now chips, and a card per skill the routine trains (Farming, Hunter and Crafting from bird houses by tier, the skill Tears of Guthix lands on) with supplied skills as a slim row; ticks are logged; a round that has come back ticks in one click. Upgrades, a new page: the wiki's melee, ranged and magic gear progression as a ladder with the worn-equipment grid, live prices, best value per point and bank-aware ticks, plus skilling outfits and items by skill (tools/gear.js, data/gear.json). 2026-11-17: the Terminal look as a switchable skin over the whole app (Classic kept in Settings, Look), themes Mortimer and Night from the icon, Home rebuilt with a right-click menu and a terminal, the loading screen and setup in the same manner, and an optional Claude connection with the user's own key for questions in the terminal.
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


---

# How the work happens

Updated 2026-11-09

## People and roles

- **Josh** (LiquidTwonuh, "Twonuh" in game, "Yosh" inside the app's copy) directs the design, reviews everything in the Beta himself, makes manual changes where he knows what he's doing, and decides what ships. When he says "what do you think" he wants a recommendation, not a menu. He thinks out loud; a rambling message is how the idea arrives, and the job is to find the shape in it.
- **Claude Code** (the desktop session) is the second pair of hands: builds, patches, verifies, keeps `BOARD.md` current, commits locally.
- **ChatGPT** iterates on art and themes (icons, Mortimer, theme blocks from the theme kit) and is welcome to critique and propose. It reads `ai-notes/ALL.md` and writes back through `ai-notes/INBOX.md`.
- **Krystal** is the first real second user, through her own edition.

## Where things live

```
C:\Projects\mortimeter            the repo (public as LiquidTwonuh/osrs-buddy; rename pending)
  OSRS-Buddy-dev.html             the dev page, where all work happens; the Beta follows it
  OSRS-Buddy.html                 stable; only moves when Josh says ship
  sw.js                           the phone's self-update worker
  BOARD.md                        the shared plan (Now, Next, Small fixes, Ideas, Parked, Routines, How we work)
  CLAUDE.md                       the standing rules for a Claude session
  ai-notes/                       this folder, for any AI
  handoff/                        notes for working from the laptop, a memory snapshot
  data/                           quest-steps.json, upgrades.json, mockups/ (served to the Beta)
  design/                         final art, the theme kit, mockups/
  tools/                          quest-steps.js, sync-mockups.js, ai-notes-bundle.js
  app/                            the Tauri shell (src-tauri/src/lib.rs, sync.rs, vault.rs), dist/
  museum/ releases/ archive/      screenshots of every stage, runnable released copies, old pages
C:\Projects\mortimeter-private    Krystal Klear's generator and build. Never in the public repo.
```

The Claude memory folder (`C:\Users\joshf\.claude\projects\C--Projects\memory\`, which `C--Projects-mortimeter\memory` links to) holds the session's own notes about Josh's preferences and the project; `handoff/memory/` is a dated snapshot of it.

## The loop

1. Edit the dev page. Big edits are small Python patch scripts that assert their anchors; blind search-and-replace has broken the page before. After every edit: every script block must parse (`node` with `new Function`), the stylesheet's braces must balance.
2. Josh presses Reload in the Beta and looks. Screenshots from the browser preview (`http://localhost:8124/`, serving the project folder) are a backup, not the proof.
3. When a batch works: a local commit ("Checkpoint: ..."). No push, no tag.
4. When Josh says ship: promote dev to stable, set the patch-notes date and version, add the `releases/` snapshot and its README row, `git fetch`, push, tag, release. Never force-push. Krystal Klear is built separately from the private folder.
5. Installers are only for shell (Rust) or icon changes, batched, built with `npm run build:beta` in `app/`, handed over as a file for Josh to double-click. Never installed from a session.

Page-level rethinks skip step 1 and start with a mockup in `design/mockups/`: two directions, real data from Josh's save, Josh picks.

## Routines (scheduled tasks on Josh's desktop)
- All cancelled or paused on 2026-11-13. Quest steps and Wiki watch are gone (they kept failing, and the quest data gathered so far is enough). AI notes is paused: this folder is refreshed from the Claude session as part of each day's work instead. If a routine comes back, the Board's Routines section says so.
## What an AI may and may not do here

May: read everything in the repo; propose; write into `INBOX.md`; design themes from the theme kit; draw Mortimer in our own style; critique pages against the design rules; draft copy in plain words.

Other AIs do not edit `OSRS-Buddy-dev.html` or `OSRS-Buddy.html` directly (Claude's patches anchor on exact lines; a direct edit on 2026-11-13 slipped into a commit unseen). Hand files over in `handoff/` or write to `INBOX.md`.

May not: push, tag or release; install anything; touch `OSRS-Buddy.html` (stable) without Josh saying ship; bring anything from Krystal Klear into the public repo; bundle Jagex art or audio; poll the wiki aggressively; use the WikiSync cloud API; rename the save key; add em dashes, jokes or emoji-on-everything; suggest removing the "OSRS Buddy DEV" shortcut; nudge Josh to ship.

## Data sources and their rules

- **OSRS Wiki** (oldschool.runescape.wiki): quests, requirements, rewards, quick guides, money makers, collection log, diaries, combat achievements, skill boosts, images. Text is CC BY-NC-SA; the app credits it. Cached in the app for 14 to 30 days; quest steps are gathered into the repo instead of fetched live.
- **Hiscores and WiseOldMan**: levels, XP, boss kills, clues, daily XP deltas for the heatmap. Pull at most once a minute; a five-minute auto-refresh got rate limited once.
- **RuneLite Character Export plugin** (desktop only): quests, collection log, diaries, combat achievements, character, equipment, bank. Read from `%USERPROFILE%\.runelite\character-exporter\<account>\`, additively. Known plugin faults are written down in the decisions file.
- **Josh's own save** for mockups: levels, quests done, quests in progress, pins and folders.

## Checks before calling anything done

- Every script block parses; the stylesheet balances.
- The change is visible in the browser preview at desktop and phone width; no horizontal page scroll.
- Nothing in the save changed that shouldn't (snapshot storage, run the flow, diff).
- The Board says what was decided, the same turn.
- The handover caption says exactly what a build contains.
