# Mortimeter themes for the Terminal look: start here

Mortimeter is a desktop companion app for Old School RuneScape. On 2026-11-17 it got a new look, the Terminal look: monospace labels, square glass panes over a dark backdrop, hairlines instead of filled panels. The app has {{N_THEMES}} colour themes. Two of them (Mortimer, Night) were made for the new look and are right. The other {{N_REDO}} were made for the old look and read badly now. The job is to redo those palettes.

Nothing but colour changes. Layout, type, spacing and behaviour are fixed.

## What is in this folder

| file | what it is |
|---|---|
| `START-HERE.md` | this brief |
| `current-themes.css` | every theme as it is today, one block each, already in the form a new block should come back in |
| `theme-kit.html` | a stand-in for the app. Open it in a browser, pick a theme or paste a block, and everything recolours. It measures contrast for you |
| {{SHOTS}} | the real app's Home page in five themes. Mortimer is the reference. The other four show the problem |

## What is wrong with the old palettes

Look at the Mortimer screenshot, then Blood, Fire and Gilded.

1. **The backgrounds are too bright and too saturated.** The old look painted solid panels, so a wine-red or brown page worked. In the Terminal look a pane is see-through: it is `--panel` at half strength over `--bg`, blurred, with two soft lights behind it. A saturated `--bg` floods the whole window and the accent has nothing to stand out from. Mortimer works because its background is close to black with only a tint of the theme's hue (`#0b1513`), and the accent alone carries the colour.
2. **Borders and labels were tuned for solid panels.** Lines are drawn at 58% of `--border` mixed into `--bg`, and small labels at 56% of `--muted` mixed into `--bg`. On the old palettes the lines come out heavy and the labels muddy.
3. **Five colours are the same in every theme and can clash.** The app marks what a word is the way the game's right-click menu does: cyan for a place, yellow for a person, orange for an item, green for a skill, plus lilac for the player's own lines. On a red or orange palette these fight the theme. A theme may now retune them (see "Terminal extras").

## What to hand back

One CSS block per theme, in exactly this form:

```css
{{MORTIMER_BLOCK}}
```

- The selector is `body[data-skin="term"][data-theme="<id>"]`. That scopes the new colours to the Terminal look and leaves the old Classic look as it was.
- Keep each theme's id, name and picker icon exactly as listed at the bottom. Do not rename, add or drop themes.
- All {{N_TOKENS}} tokens, every time. A missing one falls back to another theme's value and looks like a bug.
- Leave out `--shadow`. The Terminal look has no shadows.
- Hex values, except `--glow`, which is the accent as `rgba(r,g,b,a)` with alpha about 0.11 to 0.18.
- Plain CSS only: no new tokens beyond the ones named here, no fonts, no images, no extra rules.

## The {{N_TOKENS}} tokens

Backgrounds. In the Terminal look these should all be near black, tinted toward the theme's hue.

| token | what it paints in the Terminal look | Mortimer |
|---|---|---|
| `--bg` | the window behind everything, and the text on a filled accent button | `#0b1513` |
| `--bg2` | barely used in this look (a few surfaces left over from the old one). Keep it between `--bg` and `--panel` | `#10201c` |
| `--panel` | panes, at half strength over `--bg` | `#11201d` |
| `--panel2` | a card inside a pane, a hovered row | `#172a26` |
| `--inset` | text inputs and the terminal's log. Darker than `--bg` | `#07100e` |
| `--cellbg` | stat tiles and table cells | `#0d1917` |
| `--active` | the selected tab or segment | `#1c332f` |
| `--border` | every line (drawn at 58% over `--bg`) and the rims of the round gauges | `#2a443f` |
| `--catbd` | the border of a chip | `#1f3531` |

Accent. One hue, used for numbers, levels, the active item, bars, the cursor, primary buttons and the border of the pane under the pointer.

| token | what it paints | Mortimer |
|---|---|---|
| `--gold` | the accent itself | `#66cbb9` |
| `--gold-dim` | pane titles (`// SKILLS`) and secondary headings. It also tints the soft light at the top left of the window | `#4a9c8f` |
| `--gold2` | meters and progress bars | `#57b5a5` |
| `--gold3` | the accent faded: outlines, disabled things | `#2f655d` |
| `--glow` | the halo round a focused input | `rgba(102,203,185,.16)` |

Text.

| token | what it paints | Mortimer |
|---|---|---|
| `--text` | body text | `#e0e6d9` |
| `--muted` | secondary text. Small labels are this at 56% over `--bg`, so it must not be dim | `#8fa39c` |
| `--ph` | placeholder text in inputs | `#64776f` |
| `--code` | figures in tables | `#b9d8cf` |
| `--xp` | small experience figures | `#7d918a` |

Buttons.

| token | what it paints | Mortimer |
|---|---|---|
| `--btnlo` | a plain button | `#12211e` |
| `--btnhov1` | a plain button under the pointer | `#22403a` |
| `--btnhov2` | a sub-menu button under the pointer | `#182d29` |

Status. These keep their meaning in every theme: green is done, red is blocked, blue is information. Shift the tone to sit with the palette, never swap them.

| token | what it paints | Mortimer |
|---|---|---|
| `--green` | done, ready | `#7fd18a` |
| `--green-bg` | the background of a done row | `#1f3a2a` |
| `--red` | blocked, missing, delete | `#e07a6c` |
| `--blue` | information, links in notes | `#7fb4e6` |

Small parts.

| token | what it paints | Mortimer |
|---|---|---|
| `--dotdim` | an empty dot in a row of progress dots | `#35554f` |
| `--swempty` | an empty swatch | `#1f3430` |

## Terminal extras (optional)

Add any of these to a theme's block only when the default does not sit well with the palette. Leave them out otherwise.

| token | default | what it is | how far it may move |
|---|---|---|---|
| `--k-c` | `#62d2d2` | a place (cyan), and the "total level" gauge | stay cyan or teal |
| `--k-y` | `#f0d264` | a person or a goal (yellow), and the "experience" gauge | stay yellow or gold |
| `--k-o` | `#f39a40` | an item, and "this has gone stale" (orange) | stay orange |
| `--k-g` | `#70cf6a` | a skill, "ready", a level within reach (green) | stay green |
| `--me` | `#c79be6` | the player's own lines in the log. Also tints the soft light at the bottom right | any hue that is not the accent |
| `--line` | 58% `--border` over `--bg` | set it only if lines come out too heavy or too faint | |
| `--faint` | 56% `--muted` over `--bg` | set it only if small labels fail contrast | |
| `--glow1` | 50% `--gold-dim` over `--bg` | the soft light at the top left of the window | dark, low saturation |
| `--glow2` | 30% `--me` over `--bg` | the soft light at the bottom right | dark, low saturation |

The four `--k-` colours must stay tellable apart from each other and from the accent. On a theme whose accent is green, for example, move `--k-g` toward lime or the accent toward teal, so that "a skill" and "the accent" do not look like the same thing.

## Rules a theme has to meet

Numbers are taken from Mortimer, which is the model.

- `--bg`: lightness 4 to 8 percent, saturation under about 40 percent. A dark theme with a tint, never a coloured page. Night goes darker still (`#060707`) and that is fine.
- `--panel` two to four points lighter than `--bg`; `--panel2` two to four lighter again; `--inset` darker than `--bg`.
- `--border`: lightness about 18 to 24 percent, same hue as the background.
- `--text`: near white with a hint of the hue. `--muted`: lightness about 58 to 66 percent.
- `--gold`: lightness about 60 to 72 percent, saturated enough to read as a colour at a glance. It is the only loud thing in the window.
- One accent hue, four steps of it (`--gold`, `--gold2`, `--gold-dim`, `--gold3`), not four colours.
- Contrast, measured on a pane (the pane colour is half `--panel`, half `--bg`):
  - `--text` at 7:1 or better
  - `--muted`, `--gold`, the four `--k-` colours and `--me` at 4.5:1 or better
  - `--gold-dim` at 3:1 or better, and small labels (`--faint`) at 2.8:1 or better, which is what Mortimer has
  - `--bg` on `--gold` (the text of a filled button) at 4.5:1 or better
- Each theme should be recognisable next to the others. Fire, Lava, Sunfire and the orange one must not come out as the same theme four times: vary the accent's hue and brightness and the tint of the background.

`theme-kit.html` checks every contrast rule above for whatever block is pasted in, and says which tokens are missing.

## How to check a result

1. Open `theme-kit.html`.
2. Paste the block into the box and press Apply.
3. Everything in the contrast list should be green, the message under the box should say all tokens are set, and the page should look like a sibling of Mortimer in a different colour.

## The themes

| id | name | picker icon (a file on oldschool.runescape.wiki) | what to do |
|---|---|---|---|
{{THEME_TABLE}}

Most are named after a rune, and the accent should be that rune's colour in the game. Gilded is gold on warm near-black. Blue, Purple and Orange are plain colour themes. Dark is neutral near-black with a gold accent. Black is true black with a gold accent, made for OLED screens: all of its background tokens stay `#000000` (the rule about `--panel` being lighter than `--bg` does not apply to it), so only its accent, text and lines are open to change.

## The prompt to paste

> You are redoing colour themes for Mortimeter, a desktop companion app for Old School RuneScape. Read START-HERE.md first, then current-themes.css. The screenshots show the app's Home page: shot-1 is the Mortimer theme, which is the model, and the others are old themes that no longer work.
>
> For every theme marked "redo" in the table, write a new block in exactly the form shown in START-HERE.md: the same selector, the same id, all the tokens, and Terminal extras only where the defaults clash with the palette. Follow the rules section, including the contrast numbers. Keep Mortimer and Night as they are.
>
> Give me the result as one CSS file I can save, with a one-line comment above each block naming the theme. After the file, list any theme where you could not meet a rule and say which rule.

Then hand the CSS file back to Claude in the Mortimeter project: "these are the new theme blocks from ChatGPT, put them in". They go into the Terminal look's stylesheet as they are.
