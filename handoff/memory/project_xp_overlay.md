---
name: project-xp-overlay
description: "RuneLite Plugin Hub plugin \"XP Overlay\" in C:/Projects/xp-overlay; owns its own XP tracking, JUnit-tested XpMath, built with a scratchpad JDK 17"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0721ecdc-a805-4c32-8c19-7aa159b91657
  modified: 2026-09-10T14:04:15.105Z
---

RuneLite plugin `xp-overlay` (display name "XP Overlay", package `com.xpoverlay`) lives in
`C:\Projects\xp-overlay`, built from the official example-plugin template
(Gradle 8.10, `options.release 11`, JUnit 4.12 + Mockito 3.12.4). Created 2026-09-10.

**Why:** User wants auditable XP math (no dependency on the built-in XP Tracker / `XpTrackerService`),
with every displayed number either read from the client, computed by a README-documented formula in the
pure class `XpMath`, or labelled as an estimate.

**How to apply:**
- Machine only has a Java 8 JRE on PATH. A Temurin JDK 17 was downloaded to the session scratchpad to
  build; re-download or install a JDK 11+ before running `./gradlew test` again.
- Current RuneLite API gotchas already handled: `Skill.OVERALL` is a deprecated null alias (guard
  `skill == null`), overlay priority uses `Overlay.PRIORITY_LOW` float, overlay right-click uses
  `addMenuEntry(..., Consumer<MenuEntry>)`, `Overlay` default layer is UNDER_WIDGETS.
- `runelite-plugin.properties` includes `build=standard` (present in the template too) and
  `author=twonuh`; all authorship (properties, LICENSE, git commits) must be under "twonuh".
- Related: [[project-osrs-todo]] (other OSRS tooling).
