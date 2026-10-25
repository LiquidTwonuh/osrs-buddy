# Where Mortimeter stands, 25 October 2026

Read this after CLAUDE.md and BOARD.md. It's the part that isn't in either: what was decided, what's fragile, and what Josh cares about.

## The shape of things
- One file is the app: `OSRS-Buddy-dev.html`. Stable is `OSRS-Buddy.html`, only promoted when Josh says. File names keep the old name until the rename ships, because installed phones update from the stable file's GitHub URL.
- Three Windows editions share one codebase: Mortimeter (stable), Mortimeter Beta (identifier `.beta`, green-framed icon), Krystal Klear (private, for Josh's fiancée, lives in `C:\Projects\mortimeter-private`, never in this repo).
- The Beta **follows the dev file** (Settings → Your other devices → Page file). Edit the file, press Reload in the Beta. That is the whole dev loop; installers are only for shell (Rust) or icon changes, and Josh is tired of installers. Batch them.
- Version: shows 1.0 on the surface, is 2.0 underneath (`verLabel`). Don't "fix" either.
- Data the app needs is being moved off the live wiki and into the repo. Done: quest steps (`data/quest-steps.json`, 185 quests, quick guide and walkthrough, verbatim). Next candidates: money makers, diaries, achievements.

## Decided, don't reopen
- The name is Mortimeter (mor-tih-mee-ter). Runners-up Elder, Sage. Tagline "for Old School RuneScape", never "OSRS Companion" (exists).
- The farewell to OSRS Buddy never plays on its own. Typing `buddy` plays it; `museum` opens the museum. Josh wrote the letter in it; don't rewrite it.
- "Repeatables", not Rounds or Dailies. "Chill day" is a one-tap journal entry that counts as a day played.
- Coffer: the skill pills lead the page (the "lens"), quiz answers tuck behind "Your answers", every section has its own ⟲, "Best for <skill>" when a skill is chosen. Josh said "we might be finito" after this; treat the Coffer as done unless he asks.
- Nothing ships to GitHub until Josh says ship. The public repo is a week+ behind on purpose.

## Fragile, known
- A service worker DOES register in WebView2. It once served a stale GitHub page over the built-in one in the Beta. `sw.js` now removes itself off Android and the page never registers it on desktop. If "OSRS Buddy v1.8" ever shows inside a Mortimeter window again, that's the worker: delete `%LOCALAPPDATA%\<identifier>\EBWebView\Default\Service Worker` with the app closed.
- The phone preview (Beta only) must always have a visible way out; it trapped Josh once.
- Flip trusts a single stale trade as a price (yellow beads). Not fixed yet; on the Board.
- The wiki's API and image server were down for a day; the app now shows a placeholder for a dead wiki image and falls back to its own files. Don't poll the wiki aggressively; Josh asked to stop a once-a-minute check.
- Shell heredocs eat backslashes. Write patch scripts to files, assert anchors, `node --check` every script block, check the stylesheet's brace balance. It has broken the page more than once.

## Josh, in short
- Plain words in the app and in replies. No em dashes, few emojis, no AI-flavoured jokes, no "ship?" nudges.
- Say exactly what a build contains in its caption. He installed a stable build that looked current and wasn't, and was rightly annoyed.
- He checks work in the Beta himself; screenshots from a browser are a backup, not the proof.
- He is generating icon art with ChatGPT; finals go in `design/`. Mortimer art must be ours, never Jagex's.
- When he says "what do you think", he wants a recommendation, not a menu.

## Open threads
- Ship: GitHub repo rename (his), patch notes pass, Android label and APK, Krystal Klear's build with its own icon frame, Flip fix.
- The physical move of the repo to `C:\Projects\mortimeter` on the desktop is still a bridge; harmless.
- Routines on the desktop (hourly quest-steps, daily wiki-watch) pause while that PC is off.
