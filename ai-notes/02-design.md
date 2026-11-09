# Design and artistic direction

Updated 2026-11-02

## The look in one paragraph

A warm, dark manuscript. Page background near-black brown, panels a shade lighter, one gold accent for headings, active items, primary buttons and bars. Display type is EB Garamond (a manuscript serif), body type is the system sans (Segoe UI on Windows). Hairline borders, soft shadows, corners rounded 8 to 12px. Nothing glows unless it is the one thing on the page that should. Josh's words for the target: sleek, modern, thematic, not loud.

## Themes and tokens

A theme is one CSS block that sets 27 colour tokens on `body[data-theme=...]`. Layout, type and spacing never change between themes; every colour on every page comes from the tokens. The themes: Gilded (the default, gold on warm dark; its id is still `parchment` so saves don't move), Crystal (ice blue), Nature (green), Shadow (violet), Dark, Black (pitch), Ember. Krystal Klear offers Crystal, Gilded, Nature, Dark.

The full token table with the Gilded values, two example blocks and a ready prompt for ChatGPT is in `design/theme-kit/brief.md`, with six screenshots beside it and `theme-kit.html`, a page that recolours as you paste a block in and checks contrast and that all 27 tokens are present. That kit is what to hand a model that is asked for a theme. Never hand over the installer or the page source.

The token groups, in short: backgrounds darkest to lightest (`--bg`, `--bg2`, `--panel`, `--panel2`, `--inset`, `--cellbg`, `--active`, `--border`, `--catbd`); the accent in four steps plus a halo (`--gold`, `--gold-dim`, `--gold2`, `--gold3`, `--glow`); text (`--text`, `--muted`, `--ph`, `--code`, `--xp`); buttons (`--btnlo`, `--btnhov1`, `--btnhov2`); status, which keeps its meaning in every theme (`--green`, `--green-bg`, `--red`, `--blue`); small parts (`--dotdim`, `--swempty`, `--shadow`).

Not themeable: the 24 per-skill colours (they match the in-game icons, spread so no two are closer than about 15 degrees of hue) and the two fonts.

## Rules that came from Josh's reactions

- **Too loud, toned down (September 2026):** a 76px glowing gold wordmark with chunky wooden rods on the Scroll ("too much tbh... its like loud") became a 32px wordmark in the theme's accent, hairline rods, no glow. A big red wax-seal button ("big red and obnoxious") went.
- **The one thing he loves:** the "Generate your Wrapped" pill on the Scroll's Highlights: a full-round pill in the display font, bold, purple to pink to orange gradient (`#8e2de2, #f15f79, #f7971e`) that shifts on hover, a soft coloured glow, a small lift. That treatment is reserved for the one special action on a page.
- **Emojis:** "we are overusing them a bit." None on buttons by default, one only where it does real work. The sidebar keeps one icon per entry.
- **Decoration on dense visuals, no.** Marks drawn on heatmap cells (slashes, dots, folded corners) were "terrible". Cells show skill colours only; the detail lives in the popup for a day, as badges with the wiki's icons and counts. He prefers information on demand over ornament.
- **Make the whole element clickable** instead of adding a button ("just click it"). No duplicate navigation (two sets of tabs for one thing).
- **Centred and minimal** beats busy. Small teaser stats that draw people in are good.
- **Motion:** pages and tabs rise in over a quarter second when they appear, off under reduced motion, never a fill mode that could hold a page invisible. Josh wants more of this later: a shared-element feel between a card and the page it opens, rows that stagger in, a sidebar highlight that slides.

## Copy rules

- Plain descriptions of what things do. "Notes: a sticky-note board. Notes save as you type."
- Descriptive titles ("Themes, notes and renames"), not cute ones ("Elements & elbow room" was called cringe).
- No em dashes anywhere, app or chat. A comma, a full stop, a colon, or a rewrite.
- No filler asides ("obviously", "instead of silently judging you").
- Counts as sentences on calm pages: "28 of 34 done, 2 ready now".
- Names that stuck: Scroll (the journal), Map (quests), Coffer (money), Repeatables (dailies, never Rounds or Dailies), Chill day (a one-tap journal entry that counts as a day played), Bud (Ask Bud / Wise Old Bud). Map and Coffer may still be renamed once Coffer is finished; Scroll stays.

## Layout

Three tiers: phone to 700px (drawer sidebar), tablet or an opened Fold 701 to 1000px (slim sidebar stays), desktop above. A folded Fold's 404px cover screen gets the compact rules. The skills grid keeps three columns down to 330px so all 24 skills fit one screen. The Map is the one page allowed the whole window width (`data-wide`), as is anything that is a canvas rather than a reading column (the Mockups frame uses it too).

## Data visualisation

One scale per chart, never two axes. Status colours mean the same thing everywhere: green ready or done, gold close, muted later, red blocked. Same-level marks stack rather than overlap so a scale stays honest (the Upgrades ladders do this). Text is always in text tokens, never in a series colour; the coloured mark beside it carries identity. Hover gives the detail. The game's own icons carry category colour wherever possible (skill icons, item icons from the wiki).

## Mockups

Page-level rethinks get a standalone mockup in `design/mockups/` first: same tokens, the real data from Josh's save (levels, quests done, in progress), two directions where there's a real choice, and toasts standing in for actions that would cross pages. Josh picks, then it's built behind the live page. Current mockups: `map-calm.html` (two calmer Map directions), `map-tree-first.html` (Josh's own direction, the tree as the page with a popup per quest), `upgrades.html` (tier list, rejected), `upgrades-v2.html` (skill ladders, the direction that stuck). They open inside the Beta from the Mockups page in the sidebar.

## The icon and Mortimer

The app icon is Mortimer breaking out of a teal low-poly tile; the Beta's twin has a green frame; Krystal Klear's has an ice-blue crystal frame (hers lives only in the private repo). Meter motifs on the icon (halo arc, frame as gauge, speedometer) were tried and dropped; the character carries the name. Finals live in `design/` and `design/mortimer-icon/`; iteration happens in ChatGPT or an image generator, keepers land in the repo. Mortimer himself: a skull in a crested teal helm, purple cape. Always our drawing.
