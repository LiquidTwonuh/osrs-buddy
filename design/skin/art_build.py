# -*- coding: utf-8 -*-
# ChatGPT's approved set (handoff/terminal-character-panel-review, 2026-11-18): sixteen pictures and
# seventeen palettes. The pictures and palettes are taken as delivered; the way a picture meets the
# pane is redone here (Josh: "it needs to cleanly fade into the background").
# Run: python -I p31_approved.py     then python -I inject.py
import io, os, re, shutil
from urllib.parse import quote
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__))
SC = os.path.dirname(H)
SRC = os.path.join(SC, "gpt-approved", "design")
R = r"C:\Projects\mortimeter"

# ---- 1. the plates, at the size the app shows them ----
IDS = ["mortimer", "parchment", "crystal", "air", "water", "earth", "fire", "mind", "nature", "law", "chaos", "death", "blood", "cosmic", "astral", "lava"]
out = os.path.join(R, "design", "theme-art")
have = sorted(f[:-5] for f in os.listdir(os.path.join(SRC, "theme-art")) if f.endswith(".webp"))
assert have == sorted(IDS), have
total = 0
for tid in IDS:
    im = Image.open(os.path.join(SRC, "theme-art", tid + ".webp")).convert("RGB")
    assert abs(im.width / im.height - 2) < .01, (tid, im.size)
    if tid == "law":   # this one came with a pale print border round the edge: trim it, same shape kept
        dx = round(im.width * .02); dy = round(im.height * .02)
        im = im.crop((dx, dy, im.width - dx, im.height - dy))
    im = im.resize((1000, 500), Image.LANCZOS)
    dst = os.path.join(out, tid + ".webp"); im.save(dst, "WEBP", quality=74, method=6); total += os.path.getsize(dst)
print("plates:", total // 1024, "KB")

# ---- 2. palettes, as delivered ----
pal = io.open(os.path.join(SRC, "skin", "palettes.css"), encoding="utf-8-sig").read().replace("\r\n", "\n")
assert re.sub(r'body\[data-skin="term"\]\[data-theme="[a-z]+"\]\s*\{[^}]*\}|/\*.*?\*/|\s', "", pal, flags=re.S) == "", "palettes file holds something other than theme blocks"
assert "url(" not in pal and "@import" not in pal and "expression" not in pal
pal_css = ("\n  /* ============ PALETTES FOR THE TERMINAL LOOK ============\n"
           "     Seventeen themes redone for this look by ChatGPT from the theme kit (tools/theme-kit.py);\n"
           "     this is the set Josh approved on 2026-11-18, taken as delivered. Scoped to the Terminal\n"
           "     look, so Classic keeps its own. */\n" + "\n".join("  " + l if l.strip() else l for l in pal.splitlines()) + "\n")

# ---- 3. how a picture meets the pane ----
# One mask, the same shape as the picture (2:1), laid over it at the same size and place, so the
# fade follows the picture's own edges whatever shape the pane is. Each edge eases out along a
# smooth curve, with enough steps that no band shows.
def ramp(a, b, up=True, n=10):
    pts = []
    for i in range(n + 1):
        t = i / n; v = t * t * t * (t * (6 * t - 15) + 10)      # smootherstep
        pts.append((a + (b - a) * t, v if up else 1 - v))
    return pts
def stops(pts): return "".join('<stop offset="%.4f" stop-color="#fff" stop-opacity="%.4f"/>' % p for p in pts)
def feather(left, right, top, bottom):
    x = ramp(left[0], left[1]) + ramp(right[0], right[1], False)
    y = ramp(top[0], top[1]) + ramp(bottom[0], bottom[1], False)
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100" preserveAspectRatio="none"><defs>'
           '<linearGradient id="x">%s</linearGradient><linearGradient id="y" x1="0" y1="0" x2="0" y2="1">%s</linearGradient>'
           '<mask id="m"><rect width="200" height="100" fill="url(#y)"/></mask></defs>'
           '<rect width="200" height="100" fill="url(#x)" mask="url(#m)"/></svg>') % (stops(x), stops(y))
    return 'url("data:image/svg+xml,%s")' % quote(svg, safe="")
FOCUSED = feather((.14, .66), (.84, 1), (0, .26), (.64, 1))
ILLUS = feather((.03, .52), (.90, 1), (0, .18), (.74, 1))

SEL = 'body[data-skin="term"]:is([data-theme-art="focused"],[data-theme-art="illustrated"])'
art_css = '''
  /* ============ THEME ARTWORK, TERMINAL LOOK ============
     A theme can carry a picture. It shows in one place, the Character pane on Home. The pictures
     are ChatGPT's, made by its image tool for this app (design/theme-art): the set Josh approved
     on 2026-11-18. How much shows is body[data-theme-art]: focused, illustrated, or absent for off.
     inject.py writes the pictures in at the marker below.

     How the picture meets the pane (ours, not ChatGPT's):
     - Wherever the picture is darker than the pane it gives way to the pane's own colour
       (background-blend-mode:lighten over --tm-ground), so a picture painted on black does not
       sit in a dark box.
     - A mask the shape of the picture eases every edge out to nothing (--tm-feather, built by
       p31_approved.py), so no edge of the picture is ever seen.
     --tm-ground is the pane's surface as it ends up on screen: --panel at half strength over --bg. */
/*THEME_ART*/
  body[data-skin="term"][data-theme-art="focused"]{--tm-plate-alpha:.84; --tm-feather:%(focused)s}
  body[data-skin="term"][data-theme-art="illustrated"]{--tm-plate-alpha:1; --tm-feather:%(illus)s}
  %(sel)s .hs-id{position:relative; isolation:isolate}
  %(sel)s .hs-id::before{content:""; position:absolute; z-index:-1; inset:0; pointer-events:none;
    --tm-ground:color-mix(in srgb, var(--panel) 50%%, var(--bg));
    background:var(--tm-scene) right top / contain no-repeat, linear-gradient(var(--tm-ground), var(--tm-ground));
    background-blend-mode:lighten, normal;
    -webkit-mask:var(--tm-feather) right top / contain no-repeat; mask:var(--tm-feather) right top / contain no-repeat;
    opacity:var(--tm-plate-alpha)}
  /* the words stay readable where the picture runs under them */
  %(sel)s .hs-id :is(.name, .ht-name, .ht-sub, .sub){text-shadow:0 1px 3px var(--bg), 0 0 8px var(--bg)}
  %(sel)s .hs-id :is(.ht-sub, .sub){max-width:60%%; width:fit-content}
''' % {"focused": FOCUSED, "illus": ILLUS, "sel": SEL}

for d in (H, os.path.join(R, "design", "skin")):
    io.open(os.path.join(d, "palettes.css"), "w", encoding="utf-8", newline="\n").write(pal_css)
    io.open(os.path.join(d, "art.css"), "w", encoding="utf-8", newline="\n").write(art_css)
shutil.copy(os.path.abspath(__file__), os.path.join(R, "design", "skin", "art_build.py"))
print("approved set ok")
