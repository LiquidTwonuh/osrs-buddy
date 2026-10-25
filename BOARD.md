# OSRS Buddy board

Shared between Josh and Claude. Edit it in the Beta (Board in the sidebar) or from the chat. Same file, both see it. Tick a box in the app and it ticks here.

## Now
- [ ] Rebrand to **Mortimeter** (decided 2026-10-18, pronounced mor-tih-mee-ter). "OSRS Buddy" was too close to RSBuddy/OSBuddy. Runners-up, logged in case a sister tool ever needs a name: Elder, Sage. Tagline: "for Old School RuneScape" (an app called "OSRS Companion" already exists, so not that)
  - [x] Page: title, header, copy, backup file names. Version is 2.0. Historical patch notes keep the old name on purpose
  - [x] Desktop: product names Mortimeter and Mortimeter Beta, window titles, backups folder Documents/Mortimeter (the old folder is moved across on first launch). Identifiers deliberately unchanged: they're internal, and changing them would move every save
  - [x] Save migration: not needed, identifiers stay. The installer upgrades in place and the data folder is untouched
  - [ ] Android: app label and package, one fresh APK, then updates flow as before
  - [ ] Repo: GitHub rename to mortimeter (Josh does this on GitHub; old links redirect, including the raw page URL the phone updates from), README, releases table
  - [x] Icon: done, see above. The meter idea was tried (halo arc, frame as gauge, speedometer arc) and dropped; the character carries it
  - [ ] Krystal Klear stays Krystal Klear, built from the renamed page
  - [x] Farewell to OSRS Buddy, built 2026-10-19. Changed 2026-10-21: it never plays on its own (Josh has seen it; it was for him). Easter egg only, numbers frozen on first play; replay by typing buddy or clicking the old name under About; Old Buddy trophy; Buddy theme; the museum view (type museum, or from the farewell). Josh may still replace the letter text (FAREWELL_LETTER). Decided 2026-10-18: patch notes stay professional, a short "Farewell Buddy, hello Mortimeter" with the reasoning, no letter. Josh's letter (he's finishing it) lives in the easter egg only. Trophy: yes. Museum: yes, screenshots of every stage are in museum/, with a hidden Museum page to come; an About-footer line "formerly OSRS Buddy, Aug to Oct 2026"; the gold theme keeps its place in the cycle, named "Buddy"; a Trophy-cabinet trophy auto-awarded to any save that existed before the rename, never earnable later; the old diamond icon kept under archive/; one quiet first-launch card after the update, shown once. The save key osrs_todo_state_v1 never changes
- [ ] Coffer redesign: strip, podium, ledger bars (in). Per-section refresh (2026-10-21): each section's ⟲ rotates to different picks. Wiki images get a placeholder when the wiki's image server is down. Repeatables (named 2026-10-22, was Rounds): the dailies are a checklist that knows the game's clock; tick one and it comes back at 00:00 UTC, Wednesday for weeklies, or after its interval; routines the wiki doesn't list (Tears, Bert, Geoffrey, Cromperty, Zaff, kingdom, NMZ herb boxes, Robin, bird houses, herb and tree runs) are gated by quest and diary; a Repeatables panel on Home. The lens: tap a loved skill under the strip and the whole page re-measures through it. Lens-first (2026-10-25): the skill pills lead the page, big and centred; the quiz answers tuck behind "Your answers"; with a skill chosen the podium is "Best for <skill>" and the open method's panel sits under it. Josh: "we might be finito"
- [x] Scroll: one-tap Chill day (played, no XP) on the quick-log bar; counts as a day played; tap again to take it back (2026-10-25)
- [ ] New app icons: Josh is generating candidates elsewhere (Wise Old Man, Mortimer). Claude converts, then one installer per edition (stable, Beta, Krystal Klear). 2026-10-21: Josh's selected Mortimer PNG converted to a transparent square PNG and Windows ICO (16 to 256px) in design/mortimer-icon/. Original preserved as source-approved.png; preview.png shows light/dark and small sizes. A separate stylized dark teal tile icon is also prepared as mortimeter-stylized.ico/.png; mortimer-base-transparent.png preserves the plain cleaned template. Icon files prepared only, app integration and installers still pending.

## Next
- [ ] Wise Old Claude: Bud takes an Anthropic API key in Settings (key stays on the machine, the person pays per question), gets the app's context in one tidy prompt, and the upgrade is told as lore, Bud ascending. Provider picker with only Anthropic for now, OpenAI and Gemini fit the same slot later. Bud's name may change with the rebrand, so this waits for the name
- [ ] Map cleanup, first pass 2026-10-21: the quest panel is tabbed (Overview, Steps, Rewards) so rewards stop sprawling; the popular-goals row folds away once a goal is charted. More to do once Josh points at what still feels heavy
- [x] Quest steps from the wiki (2026-10-21): the Steps tab reads the quest's quick guide live, flattens the wiki markup to plain steps with headings, and shows a checklist whose ticks stay with the save. Cached 30 days, re-read on demand, attributed CC BY-NC-SA. Not verified against the live wiki yet: it was down (502) the morning it was built
- [ ] Coffer: tune the stage thresholds once a few people have seen "Auto"
- [ ] Android layout polish, touch dragging untested

## Small fixes spotted
- [x] 2026-10-25: the Beta got hijacked. A service worker does register in WebView2 (Claude had concluded it didn't), so pressing the phone's Update from GitHub inside the Windows Beta stored the old GitHub page and served it over the built-in one; quest steps and everything since vanished. Fixed: sw.js removes itself off Android, the page never registers it on desktop, the phone preview's update buttons are inert. Needed one Beta installer to replace the worker
- [ ] Josh saw wrong tooltips somewhere on the Map. Which ones? A screenshot or the words would pin it down
- [x] Phone layout (2026-10-21): three tiers now. Phone to 700px (drawer), tablet or an opened Fold 701 to 1000px (slim sidebar stays), desktop above. The folded Fold's 404px cover screen now gets the compact rules (was cut off at 400). Lens scrolls sideways, rounds wrap, farewell and board sized for a phone
- [ ] Flip trusts the latest high/low trade as a price. Yellow beads showed a margin nobody could buy at (Josh tried 2k each). Re-assess: use the 5-minute and hour averages, require real volume (trades per hour), show it, and hide thin items by default. Also show the buy limit next to the margin
- [ ] Rename Map and Coffer once Coffer is finished; Josh wants better names (Scroll stays)
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
- Quest steps, hourly at :05 (2026-10-21, reshaped 2026-10-22): runs tools/quest-steps.js, which gathers each quest's quick guide and the Walkthrough section of its page, verbatim, into data/quest-steps.json with the app's own parser, and notes progress under "Quest steps" at the bottom of this file. The app reads that file first (builds carry dist/data, the Beta is served it beside the followed page, a plain browser falls back to GitHub), the live wiki last. Nothing is condensed by us; Quick is the wiki's own short list, Walkthrough is every paragraph. Once all 193 are gathered the routine only refreshes month-old entries
- Wiki watch, daily at 9: checks the wiki's money making guides for new, gone or sharply changed methods and notes them under "Wiki watch" at the bottom of this file. First routine, mostly to see how they behave
- Next candidate: quest steps from the wiki for the Map

## How we work
- Versions: Mortimeter shows 1.0 on the surface; the build number underneath keeps counting from where Buddy left off (2.0), so tags, installers and the update check never go backwards. Rule in the page: shown = internal major minus one (verLabel). Decided 2026-10-19
- The repo lives at C:/Users/joshf/Projects/mortimeter since 2026-10-19 (moved out of Downloads, renamed with the app). Krystal Klear is beside it in mortimeter-private. Open Claude sessions on the mortimeter folder; CLAUDE.md there holds the standing rules
- Design keepers go in design/. ChatGPT is for iterating on art; finals land there
- Dev page is `OSRS-Buddy-dev.html`. The Beta follows it: edit, press Reload in the Beta
- Stable only changes when Josh says ship
- Krystal Klear is private and never goes in this repo
