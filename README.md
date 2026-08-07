# OSRS Buddy

A character companion for **Old School RuneScape** — an activity journal, a quest
dependency planner, and an assistant that reads the wiki so you don't have to.

### ⬇️ [**Download OSRS Buddy for Windows**](https://github.com/LiquidTwonuh/osrs-buddy/releases/latest/download/OSRS-Buddy-setup.exe)

<sub>Run the installer and you're done. Windows will warn that it's from an unidentified
developer — click **More info → Run anyway**. That's expected: the app isn't code-signed
(certificates cost money), not that anything's wrong with it.</sub>

<sub>See [all releases](../../releases).</sub>

It's a single HTML file with no build step, wrapped as a Windows app with
[Tauri](https://tauri.app). Your data lives in your browser's local storage and
never leaves your machine.

![version](https://img.shields.io/badge/version-2.1-e6c35c) ![platform](https://img.shields.io/badge/platform-Windows-6b7d8e)

## What it does

**📜 Scroll** — a daily activity journal. Tag sessions with the skills you trained
and the heatmap builds itself, colour-coded per skill. Days you actually played
are filled in automatically from your game stats, so the map is honest even when
you forget to log. Mark the big days as 🏆 milestones and they get a rainbow ring.

**🧭 Quest planner** — pick a goal (or the whole quest cape) and get the entire
dependency tree: what's done, what you can start right now, and what it actually
costs you in levels. It reads every quest's requirements from the wiki, and it
accounts for the XP the chain itself rewards — so it can tell you a skill gate
sorts itself out before you get there.

**💬 Wise Old Bud** — ask whether you can do a boss, quest, or item and he checks
the requirements against your live stats. Anything he doesn't know, he looks up
on the wiki and remembers. Tell him *"I did Dragon Slayer 1"* and he ticks it
everywhere.

**🎯 Goals & priorities** — track targets that complete themselves from your live
stats, and get nudged when something you said mattered has gone untouched.

**🗺️ Roadmap** — mid-game progression tracks: gear ladders, unlock quests, a
bossing ladder, and skill milestones, with an "in reach" list computed from your
current levels.

**🔌 RuneLite sync** — with RuneLite running and the WikiSync plugin enabled, the
app reads your worn gear straight from your own client, on your own machine.

## Where the data comes from

- [WiseOldMan](https://wiseoldman.net) for stats and XP history
- The [OSRS Wiki](https://oldschool.runescape.wiki) content API for quest and item
  requirements
- RuneLite's local WikiSync socket for equipped gear

No account, no server, no telemetry. The app talks to those three and nothing else.

## Running it

Use the [installer](https://github.com/LiquidTwonuh/osrs-buddy/releases/latest/download/OSRS-Buddy-setup.exe)
above, or just open `OSRS-Buddy.html` in a browser — it's the same app either way.
The installer gets you a proper window, a Start Menu entry, and an icon.

## Building the Windows app

Requires [Rust](https://rustup.rs) and Node.

```bash
cd app
npm install
npx tauri build
```

The build copies the HTML file into the bundle, so `OSRS-Buddy.html` stays the
single source of truth.

## Layout

| Path | What it is |
|---|---|
| `OSRS-Buddy.html` | the app — stable |
| `OSRS-Buddy-dev.html` | development sandbox |
| `app/` | Tauri wrapper |
| `archive/` | pre-git version snapshots |

## Credit

Not affiliated with Jagex. Old School RuneScape is a trademark of Jagex Ltd.
Built with [Claude Code](https://claude.com/claude-code).
