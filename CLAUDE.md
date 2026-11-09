# Mortimeter (formerly OSRS Buddy)

A character companion for Old School RuneScape. One HTML file is the whole app; a Tauri shell wraps it for Windows and Android. The developer is Josh (LiquidTwonuh, in game "Twonuh"). Claude is the second pair of hands. The shared plan is `BOARD.md`: read it at the start of a session, keep it current, and put new ideas there instead of asking Josh to "write that down".

## Files that matter
- `OSRS-Buddy-dev.html`: where all work happens. The Beta app follows this file from disk (Settings, Page file), so a page change only needs Reload in the Beta. File names keep the old name until the rename ships, because installed phones update from the raw GitHub URL of `OSRS-Buddy.html`.
- `OSRS-Buddy.html`: stable. Only changes when Josh says ship.
- `sw.js`: the phone's service worker for self-update. Copied into `app/dist` by `npm run sync`.
- `app/`: the Tauri shell. `src-tauri/src/lib.rs` (commands, page-file following, the Board), `sync.rs` (Wi-Fi sync server), `vault.rs` (save file and backups). `tauri.conf.json` is stable, `tauri.beta.conf.json` is the Beta.
- `BOARD.md`: the plan, shared with the Beta's Board page. Edit freely, keep the headings.
- `museum/`: screenshots of every stage of the app. Add one when something visibly changes.
- `ai-notes/`: the brief for any other AI (ChatGPT first). `ALL.md` is the one-paste bundle, `INBOX.md` is where other AIs write back; read it when Josh points at it. A daily routine refreshes the folder; when something big is decided, update `04-decisions.md` by hand the same turn.
- `design/mockups/`: standalone mockups for page-level rethinks. After adding or changing one, run `node tools/sync-mockups.js` so the Beta's Mockups page sees it.
- `releases/`: a runnable copy of every released version. Never edit them.
- `archive/`: old pages and the original patch notes. Never delete.
- `../mortimeter-private/`: Krystal Klear, the private edition for Josh's fiancée. **Nothing from it ever goes in this repo.**

## Rules Josh has set
- Never bundle Jagex audio or art. Mortimer art must be our own.
- Commit as `LiquidTwonuh <201085695+LiquidTwonuh@users.noreply.github.com>`. Always `git fetch` before a push (Josh edits the README on GitHub). Never force-push.
- Checkpoints are local commits plus a Beta build when the Rust side changed. Don't push, tag or release unless Josh says ship. Don't ask "ship?" after every batch.
- Never launch, install or copy an installer into AppData from a Claude session. The session's sandbox virtualises AppData, so an install from here is not an install Josh has, and chasing it once cost real data. Build the installer, hand it over with SendUserFile, Josh double-clicks it from Explorer. Never force-kill the app.
- Builds go to the Beta (`npm run build:beta` in `app/`, product "OSRS Buddy Beta" until the rename), never over stable.
- "Run setup again" and anything else that could drop data needs two confirmations. The save key `osrs_todo_state_v1` never changes.
- Copy is plain: no em dashes, few emojis, no AI-flavoured jokes. Describe what things do. Colours only through the theme tokens in `:root`.
- Don't suggest removing the "OSRS Buddy DEV" shortcut. Don't nudge.
- The wiki's text is CC BY-NC-SA. Reading it in the app is fine; selling the app is not, and WikiSync's cloud API is off limits.
- Josh checks changes in the Beta, not through screenshots from Claude, except when a browser render is quicker. The browser preview serves this folder on port 8124 via `.claude/launch.json`.

## How to work here
- When the date has changed since the last message (the harness says so), open the reply with a short brief before anything else: what we were doing, what changed on disk or in the repo since, what the routines did, and what is open on the Board. Josh asked for this on 2026-10-31. Keep it to a few lines; a long gap earns a longer brief.
- Make edits with small Python patch scripts that assert their anchors, then `node --check` every script block and check the stylesheet's brace balance. The file is big; blind sed is how it has broken before.
- Prefer finishing a feature end to end over partial scaffolding. Verify in the browser with Josh's real backup imported when the change is visual.
- When something is decided, write it on the Board the same turn.
- Never hand over a stable installer that is behind dev without saying so in the caption. On 2026-10-21 a stable build with the new icon but a week-old page made Josh think the week's work was missing. If stable is being rebuilt for any reason, promote dev to stable first (a local checkpoint, not a ship) or state plainly what it lacks.
