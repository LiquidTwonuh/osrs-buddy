# Mortimeter theme kit (for ChatGPT, or anyone making a theme)

A theme in Mortimeter is one CSS block that sets 27 colour tokens. Nothing else changes: the layout, type and spacing are fixed, every colour on every page comes from these tokens. So the deliverable to ask for is **one filled-in block**, not an image, not a redesign.

What to hand over, in this order:

1. The six screenshots in this folder (`shot-*.jpg`). They show the app in the default theme, Gilded, so the model sees what each token touches.
2. The token table and the two example blocks below.
3. The prompt at the bottom.

What not to hand over: the installer. ChatGPT can't run it, and the page's source is 1.1 MB of code it doesn't need.

To check a result, open `theme-kit.html` (same folder), paste the block into the box, and every component on the page recolours. If it reads well there, it reads well in the app.

## The tokens

Backgrounds, darkest to lightest. Panels sit on the page background, inputs sit inside panels.

| token | what it paints | Gilded |
|---|---|---|
| `--bg` | page background behind everything | `#1a1712` |
| `--bg2` | sidebar and top bar | `#241f18` |
| `--panel` | cards and panels | `#26211a` |
| `--panel2` | a card inside a card, hover rows, sub-nav | `#2f2820` |
| `--inset` | text inputs, wells, the heatmap area | `#15120d` |
| `--cellbg` | table cells and skill tiles | `#171310` |
| `--active` | the selected item in the sidebar | `#3a3122` |
| `--border` | every 1px line | `#4a3f2e` |
| `--catbd` | borders of category chips | `#322a1e` |

Accent. The app has one accent colour and uses it for headings, the active nav item, primary buttons, links and progress bars. The four steps are the same hue at falling brightness.

| token | what it paints | Gilded |
|---|---|---|
| `--gold` | the accent: headings, active items, primary buttons, links | `#e6c35c` |
| `--gold-dim` | accent at rest: secondary headings, hovered links | `#b9974a` |
| `--gold2` | accent on bars and rings | `#c9a642` |
| `--gold3` | accent faded: outlines, disabled, the dot in an empty bar | `#8a6f2e` |
| `--glow` | the accent as a translucent halo behind the active nav item and focused inputs | `rgba(230,195,92,.18)` |

Text.

| token | what it paints | Gilded |
|---|---|---|
| `--text` | body text | `#e8e0cf` |
| `--muted` | secondary text, captions, eyebrows | `#a99b7d` |
| `--ph` | placeholder text in inputs | `#7a6f58` |
| `--code` | numbers in tables and code-ish text | `#d9c98f` |
| `--xp` | the small XP figures under skill levels | `#8a7d61` |

Buttons.

| token | what it paints | Gilded |
|---|---|---|
| `--btnlo` | ghost button background | `#2a2318` |
| `--btnhov1` | ghost button hover | `#463a26` |
| `--btnhov2` | sub-nav button hover | `#332a1c` |

Status. These stay close to their meaning in every theme: green is done, red is blocked, blue is info. Shift them toward the theme's hue, don't swap them.

| token | what it paints | Gilded |
|---|---|---|
| `--green` | done, ready, ok | `#6fbf5b` |
| `--green-bg` | background of a done row | `#2c3d24` |
| `--red` | blocked, missing, delete | `#d46a5a` |
| `--blue` | info, links in notes | `#5a9fd4` |

Small parts.

| token | what it paints | Gilded |
|---|---|---|
| `--dotdim` | an empty dot in a dotted progress row | `#5a4b2e` |
| `--swempty` | an empty swatch in the theme picker | `#3a332a` |
| `--shadow` | the drop shadow under panels (keep the shape, tint the colour) | `0 2px 0 #0e0b07, 0 6px 14px rgba(0,0,0,.4)` |

Not themeable: the per-skill colours on the heatmap (they match the in-game icons and stay fixed), and the two fonts.

## The two example blocks

Gilded, the default:

```css
body[data-theme="parchment"]{
  --bg:#1a1712; --bg2:#241f18; --panel:#26211a; --panel2:#2f2820; --border:#4a3f2e;
  --gold:#e6c35c; --gold-dim:#b9974a; --gold2:#c9a642; --gold3:#8a6f2e;
  --text:#e8e0cf; --muted:#a99b7d;
  --inset:#15120d; --active:#3a3122; --btnlo:#2a2318; --btnhov1:#463a26; --btnhov2:#332a1c;
  --cellbg:#171310; --code:#d9c98f; --ph:#7a6f58; --xp:#8a7d61; --catbd:#322a1e;
  --dotdim:#5a4b2e; --swempty:#3a332a; --glow:rgba(230,195,92,.18);
  --green:#6fbf5b; --green-bg:#2c3d24; --red:#d46a5a; --blue:#5a9fd4;
  --shadow:0 2px 0 #0e0b07, 0 6px 14px rgba(0,0,0,.4);
}
```

Crystal, the ice-blue one:

```css
body[data-theme="crystal"]{
  --bg:#12151b; --bg2:#1a1f27; --panel:#1b212b; --panel2:#242c39; --border:#3a4658;
  --gold:#9fdcec; --gold-dim:#6fa9c2; --gold2:#7cc3dd; --gold3:#4b7f99;
  --text:#e2e9f2; --muted:#93a4b6;
  --inset:#0f141b; --active:#263444; --btnlo:#1c2531; --btnhov1:#2c3a4c; --btnhov2:#222d3b;
  --cellbg:#141922; --code:#a9c6d9; --ph:#6b7d8e; --xp:#7d92a4; --catbd:#283140;
  --dotdim:#3f566b; --swempty:#2c3a4c; --glow:rgba(159,220,236,.16);
  --green:#6fbf5b; --green-bg:#2c3d24; --red:#d46a5a; --blue:#5a9fd4;
  --shadow:0 2px 0 #0e0b07, 0 6px 14px rgba(0,0,0,.4);
}
```

## Rules a theme has to meet

- All 27 tokens, every time. A missing one falls back to Gilded and looks like a bug.
- `--text` on `--panel` at 4.5:1 contrast or better. `--muted` on `--panel` at 3:1 or better. `--gold` on `--panel` at 3:1 or better.
- `--bg` darker than `--panel`, `--panel` darker than `--panel2`. Light themes flip that and are fine, but say so.
- One accent hue. Four brightness steps of it, not four colours.
- Status colours keep their meaning (green done, red blocked).
- Hex values, except `--glow` which is an rgba of the accent at about 0.16 to 0.2 alpha.
- The id in `body[data-theme="…"]` is one lowercase word with no spaces. The display name can be anything.
- Each theme also needs a wiki image for its picker button: an in-game item that matches the vibe, named as it is on oldschool.runescape.wiki (for example `Fire_rune.png`, `Soul_rune.png`, `Papyrus.png`).

## The prompt to paste

> You're designing colour themes for Mortimeter, a desktop companion app for Old School RuneScape. The screenshots show the app in its default theme. A theme is exactly one CSS block that sets the 27 tokens in the table I'm giving you; the layout never changes, only the colours.
>
> Make me N themes, each one built around one in-game rune: Fire, Water, Earth, Air, Nature, Chaos, Death, Blood, Soul, Law, Cosmic, Astral, Wrath. Lead with that rune's colour as the accent, then build the backgrounds as dark, low-saturation versions of it, the way the two examples do with gold and ice blue.
>
> For each theme give me: the id, a display name, the wiki filename of the rune, and the full CSS block with all 27 tokens, following the rules in the brief. Keep the text and muted colours readable on the panels. Don't invent new tokens and don't change the fonts.

Swap "N" and the rune list for whatever you want.
