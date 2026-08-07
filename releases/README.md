# Released versions

One self-contained HTML file per released version. Open any of them in a browser
and that version runs — no build step, no checkout needed.

Your saved data is shared across versions (same browser storage), so opening an
old build shows your current character and Scroll. It is a copy of the *app*, not
a copy of your data — for that, use ⇓ Backup in Settings.

| File | Released |
|---|---|
| `OSRS-Buddy-v1.2.html` | 7 Aug 2026 — automatic backups, wider planner, High Alch |
| `OSRS-Buddy-v1.1.html` | 7 Aug 2026 — profiles, quest reward detail |
| `OSRS-Buddy-v1.0.html` | 6 Aug 2026 — quest planner, renumbered 1.0 |
| `OSRS-Buddy-v0.7.html` | 31 Jul 2026 — Wise Old Bud, skill-based Scroll |

Each is also a git tag (`git show v1.1:OSRS-Buddy.html`) and a
[GitHub release](../../releases) with its Windows installer.

Versions before v0.7 predate the current repository and exist only as local
snapshots on the author's machine.

## Adding one

After promoting dev to stable and bumping the version:

```bash
cp OSRS-Buddy.html releases/OSRS-Buddy-v<version>.html
```

Commit it with the release, then tag: `git tag v<version> && git push --tags`.
