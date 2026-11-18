# -*- coding: utf-8 -*-
# Writes the terminal look's stylesheet into the dev page, between its two markers at the end of
# the main sheet. First run puts the markers in. Run: python -I inject.py
import io, base64, os, sys, re
HERE = os.path.dirname(os.path.abspath(__file__))
P = r"C:\Projects\mortimeter\OSRS-Buddy-dev.html"
A, B = "  /*SKIN_TERM_START*/\n", "  /*SKIN_TERM_END*/\n"
css = "".join(io.open(os.path.join(HERE, f), encoding="utf-8").read() for f in ("term.css", "home.css", "pages.css", "setup.css", "comp.css", "notes.css", "tiles.css", "home2.css", "phone.css", "arrange.css", "skills.css", "wrapped.css", "wrapped2.css", "fill.css", "cmdline.css", "edit.css", "palettes.css", "palettes-own.css", "art.css", "bakery.css", "glyphs.css") if os.path.exists(os.path.join(HERE, f)))
shared = io.open(os.path.join(HERE, "phone_shared.css"), encoding="utf-8").read()
assert css.count("/*PHONE_SHARED:") == 2
css = re.sub(r"/\*PHONE_SHARED:(.+?)\*/\n", lambda m: shared.replace("&", m.group(1)), css)
art = "data:image/png;base64," + base64.b64encode(open(r"C:\Projects\mortimeter\design\mortimer-icon\mortimeter-128.png", "rb").read()).decode("ascii")
assert css.count("/*MORT_ART*/") == 1
css = css.replace("/*MORT_ART*/", art)
# theme artwork: the plates as data, one custom property per theme
ART = r"C:\Projects\mortimeter\design\theme-art"
decl = []
for tid in sorted(f[:-5] for f in os.listdir(ART) if f.endswith(".webp")):
    decl.append('  body[data-skin="term"][data-theme="%s"]{--tm-scene:url("data:image/webp;base64,%s")}' % (tid, base64.b64encode(open(os.path.join(ART, tid + ".webp"), "rb").read()).decode("ascii")))
assert css.count("/*THEME_ART*/") == 1
css = css.replace("/*THEME_ART*/", "\n".join(decl))
if not css.endswith("\n"): css += "\n"
assert css.count("{") == css.count("}"), ("braces", css.count("{"), css.count("}"))
s = io.open(P, encoding="utf-8").read()
if A in s:
    i, j = s.index(A), s.index(B)
    s = s[:i + len(A)] + css + s[j:]
else:
    # the main sheet is the first <style> block; its closing tag is the first </style>
    k = s.index("</style>")
    s = s[:k] + A + css + B + s[k:]
io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("skin injected", len(css))
