---
name: feedback-visual-style
description: OSRS Buddy visual taste — sleek and theme-aware, not loud; the Generate your Wrapped gradient pill is the benchmark he loves; cut back on emojis
metadata:
  type: feedback
---

The user wants OSRS Buddy to look sleek and modern. Loud, oversized decoration clashes with the rest of the app. See [[project-osrs-todo]] and [[feedback-plain-copy]].

**The benchmark he explicitly loves:** the "Generate your Wrapped" button on the Scroll's Highlights panel. His words: "looks fucking sick." It's a rounded full pill in the display font, bold, with a purple → pink → orange gradient (`#8e2de2, #f15f79, #f7971e`) that shifts position on hover, a soft coloured glow shadow, and a small lift on hover. Reuse that treatment when something needs to feel special.

**Too much, toned down (2026-09-13):**
- The Scroll banner with a 76px glowing gold-gradient wordmark and chunky wooden rods: "too much tbh... its like loud." It now has a 32px wordmark in the theme's own accent colour, hairline rods, and no glow.
- A big red wax-seal button: "big red and obnoxious." Keep things thematic.

**Emojis:** "we are overusing them a bit." Don't put an emoji on every button and heading. Default to none on buttons, and use one only where it does real work.

**Theme-aware:** new panels should use theme tokens (`--gold`, `--gold-dim`, `--panel`, `--panel2`, `--inset`, `--border`, `--muted`), not fixed colours, so they follow Parchment, Crystal, Nature, Shadow, Ember, Dark and Pitch black. He called this out directly for the recap panel ("same style as the user's page colors... dark mode, fire, water").

**How to apply:** prefer centred and minimal, and make the whole element clickable over adding extra buttons ("just click it"). Small teaser stats that draw people in are good. Avoid duplicate navigation (two sets of tabs).
