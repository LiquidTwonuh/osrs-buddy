# OSRS Buddy board

Shared between Josh and Claude. Edit it in the Beta (Board in the sidebar) or from the chat. Same file, both see it. Tick a box in the app and it ticks here.

## Now
- [ ] Rebrand to **Mortimeter** (decided 2026-10-18, pronounced mor-tih-mee-ter). "OSRS Buddy" was too close to RSBuddy/OSBuddy. Runners-up, logged in case a sister tool ever needs a name: Elder, Sage. Tagline: "for Old School RuneScape" (an app called "OSRS Companion" already exists, so not that)
  - [x] Page: title, header, copy, backup file names. Version is 2.0. Historical patch notes keep the old name on purpose
  - [x] Desktop: product names Mortimeter and Mortimeter Beta, window titles, backups folder Documents/Mortimeter (the old folder is moved across on first launch). Identifiers deliberately unchanged: they're internal, and changing them would move every save
  - [x] Save migration: not needed, identifiers stay. The installer upgrades in place and the data folder is untouched
  - [ ] Android: app label and package, one fresh APK, then updates flow as before
  - [ ] Repo: GitHub rename to mortimeter (Josh does this on GitHub; old links redirect, including the raw page URL the phone updates from), README, releases table
  - [ ] Icon brief: our own Mortimer, skull in a crested teal helm, a meter in it (gauge arc or needle eyes). Never Jagex's art
  - [ ] Krystal Klear stays Krystal Klear, built from the renamed page
  - [x] Farewell to OSRS Buddy, built 2026-10-19: plays once for saves born before the rename, numbers frozen that night; replay by typing buddy or clicking the old name under About; Old Buddy trophy; Buddy theme; the museum view (type museum, or from the farewell). Josh may still replace the letter text (FAREWELL_LETTER). Decided 2026-10-18: patch notes stay professional, a short "Farewell Buddy, hello Mortimeter" with the reasoning, no letter. Josh's letter (he's finishing it) lives in the easter egg only. Trophy: yes. Museum: yes, screenshots of every stage are in museum/, with a hidden Museum page to come; an About-footer line "formerly OSRS Buddy, Aug to Oct 2026"; the gold theme keeps its place in the cycle, named "Buddy"; a Trophy-cabinet trophy auto-awarded to any save that existed before the rename, never earnable later; the old diamond icon kept under archive/; one quiet first-launch card after the update, shown once. The save key osrs_todo_state_v1 never changes
- [ ] Coffer redesign: strip for the answers, podium for the top three, ledger bars for the rest. First pass is in, needs Josh's eyes in the Beta
- [ ] New app icons: Josh is generating candidates elsewhere (Wise Old Man, Mortimer). Claude converts, then one installer per edition (stable, Beta, Krystal Klear)

## Next
- [ ] Wise Old Claude: Bud takes an Anthropic API key in Settings (key stays on the machine, the person pays per question), gets the app's context in one tidy prompt, and the upgrade is told as lore, Bud ascending. Provider picker with only Anthropic for now, OpenAI and Gemini fit the same slot later. Bud's name may change with the rebrand, so this waits for the name
- [ ] Map cleanup: too much on screen at once. Keep every bit of info, calm the layout
- [ ] Quest steps from the wiki, shown when you click a quest on the Map. Clean, accurate, licence-safe. Likely a scheduled task (routine) that scrapes and checks, then Claude wires it in
- [ ] Coffer: tune the stage thresholds once a few people have seen "Auto"
- [ ] Android layout polish, touch dragging untested

## Small fixes spotted
- [x] Coffer: the answer chips are a wall on the phone. On a phone each answer is now one row that opens that question
- [x] Coffer: General Graardor showed "Needs Dad". "Must have defeated X" no longer reads as a quest

## Ideas
- Wise Old Bud gets smarter from a wiki scrape
- Mortimer flavoured Slayer page
- RuneLite plugin of our own that posts straight to the app's local server
- Coffer: highlight methods by a chosen skill

## Parked
- Lumped XP day splitter (WOM lands several days' XP on one day). Parked until the day popup is reworked
- Selling the app: blocked by the wiki's non-commercial licence. Free with a tip jar is the fallback
- Roadmap redo and priorities redesign: after Map

## Routines (scheduled tasks)
- Wiki watch, daily at 9: checks the wiki's money making guides for new, gone or sharply changed methods and notes them under "Wiki watch" at the bottom of this file. First routine, mostly to see how they behave
- Next candidate: quest steps from the wiki for the Map

## How we work
- Versions: Mortimeter shows 1.0 on the surface; the build number underneath keeps counting from where Buddy left off (2.0), so tags, installers and the update check never go backwards. Rule in the page: shown = internal major minus one (verLabel). Decided 2026-10-19
- The repo lives at C:/Users/joshf/Projects/mortimeter since 2026-10-19 (moved out of Downloads, renamed with the app). Krystal Klear is beside it in mortimeter-private. Open Claude sessions on the mortimeter folder; CLAUDE.md there holds the standing rules
- Design keepers go in design/. ChatGPT is for iterating on art; finals land there
- Dev page is `OSRS-Buddy-dev.html`. The Beta follows it: edit, press Reload in the Beta
- Stable only changes when Josh says ship
- Krystal Klear is private and never goes in this repo
