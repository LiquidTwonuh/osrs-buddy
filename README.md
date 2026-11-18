# Mortimeter

A character companion for **Old School RuneScape**. It reads your account and tells you
where you stand: what you trained, what is ready to do, what is close, and what is worth
your time next. Formerly OSRS Buddy.

A note on how this was built: I use Claude Code as a pair programmer. I direct the design, review the output, make manual changes where I know what I'm doing, and use the process to learn. It's not 100% hand-written, and I'm not pretending it is, but it's my design, my decisions, and my project. Enjoy the app. :)

### [**Download Mortimeter for Windows**](https://github.com/LiquidTwonuh/osrs-buddy/releases/latest/download/Mortimeter-setup.exe)

<sub>Run the installer and you're done. Windows will warn that it's from an unidentified
developer. Click **More info**, then **Run anyway**. That's expected: the app isn't
code-signed (certificates cost money), not that anything's wrong with it.</sub>

<sub>The Android build and every earlier version are on the [releases page](../../releases).</sub>

It's a single HTML file with no build step, wrapped as a Windows and Android app with
[Tauri](https://tauri.app). Your data stays on your own devices.

![version](https://img.shields.io/badge/version-1.0-66cbb9) ![platform](https://img.shields.io/badge/platform-Windows%20%7C%20Android-6b7d8e)

## What it does

**Home.** Your character at a glance: every skill and how far it is from the next level,
what you gained this week, what is ready now, your boss kills, and a heat map of the days
you played. In the Terminal look, Home is a set of panes you can move, hide and resize.

**Scroll.** A journal of what you did. Days you played fill in on their own from your
stats, coloured by skill, and you can add notes, milestones and the skills behind a late
night. Highlights, a trophy cabinet and a recap are drawn from the same history.

**Priorities.** The things you don't want to slack on, each with a weekly target that
counts itself from your experience and kills.

**Quest Hub.** Pick a quest, or the whole quest cape, and get the full dependency tree:
what's done, what you can start now, and what it costs in levels. Every quest has its
steps built in.

**Coffer.** Every money maker the wiki lists, measured against your own levels and
quests. Answer a few questions and it shows what is worth doing tonight, what is a session
or two away, your bank's value over time, Grand Exchange margins, and the repeatable runs
(farming, bird houses, dailies) on the game's clock.

**Skills and Upgrades.** The wiki's training guide for each skill laid out as a ladder with
you marked on it, and its gear progression for melee, ranged and magic against the levels
you have.

**Goals, Roadmap, Achievements, Notes.** Targets that tick themselves off from your live
stats, mid-game progression tracks, the collection log, diaries and combat achievements,
and a place to write things down.

**A console.** Type a command, a note or a question on any page: `cd scroll`,
`stats mining`, `log mined for an hour`, `-help` for the list.

## Two looks

**Terminal** is the default: monospace headings, thin lines, a console, and panes you
arrange yourself. **Classic** is the app as it was before, unchanged. Both have eighteen
themes. Switch any time in Settings, Look.

## Where the data comes from

- [WiseOldMan](https://wiseoldman.net) for stats and XP history
- The [OSRS Wiki](https://oldschool.runescape.wiki) for quests, guides, prices and pictures
- RuneLite's Character Export plugin, read from its folder on your own PC, for quests,
  the collection log, diaries and your bank
- GitHub, to check whether a newer version exists

No account, no server, no telemetry. Your PC and phone can sync with each other over your
own Wi-Fi. If you add your own Claude API key, the questions you ask in the console are
sent to Anthropic with it; without one, nothing is.

## Running it

Use the [installer](https://github.com/LiquidTwonuh/osrs-buddy/releases/latest/download/Mortimeter-setup.exe)
above, or open `OSRS-Buddy.html` in a browser. It's the same app either way. The installer
gets you a proper window, a Start Menu entry, RuneLite syncing and an icon.

The files keep their old names so that phones already running the app keep updating.

## Building it yourself (optional)

**You don't need this to use the app.** The installer above is all anyone needs. This
section is only for compiling your own copy from source, which needs
[Rust](https://rustup.rs) and [Node](https://nodejs.org).

```bash
cd app
npm install
npx tauri build
```

The build copies the HTML file into the bundle, so `OSRS-Buddy.html` stays the single
source of truth.

## Layout

| Path | What it is |
|---|---|
| `OSRS-Buddy.html` | the app, stable |
| `OSRS-Buddy-dev.html` | where work happens before a release |
| `app/` | the Tauri wrapper for Windows and Android |
| `releases/` | a runnable copy of each released version |
| `museum/` | a screenshot of every stage the app has been through |

## Credit

Not affiliated with Jagex. Old School RuneScape is a trademark of Jagex Ltd. No game art
or audio is bundled; pictures are loaded from the OSRS Wiki, whose text and images are
CC BY-NC-SA. Built with [Claude Code](https://claude.com/claude-code).
