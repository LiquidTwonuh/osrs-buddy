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
