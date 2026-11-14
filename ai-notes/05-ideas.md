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
