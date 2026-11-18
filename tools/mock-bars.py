# -*- coding: utf-8 -*-
# Builds the progress-bar mockup (design/mockups/bars.html and its copy in data/mockups) from
# bars.template.html, writing in the colours of a few themes from design/skin so the bars can be
# judged on more than one palette. Run: python -I tools/mock-bars.py
import io, os, re, json
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEYS = ["--bg", "--panel", "--border", "--gold", "--gold-dim", "--text", "--muted"]
pal = {}
for f in ("palettes.css", "palettes-own.css"):
    t = io.open(os.path.join(R, "design", "skin", f), encoding="utf-8").read()
    for m in re.finditer(r'\[data-theme="([a-z]+)"\]\s*\{([^}]*)\}', t):
        pal[m.group(1)] = dict((k.strip(), v.strip()) for k, v in (x.split(":", 1) for x in m.group(2).split(";") if ":" in x))
PICK = [("mortimer", "Mortimer"), ("night", "Night"), ("black", "Abyss"), ("crystal", "Crystal"), ("parchment", "Gilded"), ("fire", "Fire"), ("law", "Law"), ("nature", "Nature")]
css = "\n".join('  .W[data-th="%s"]{%s}' % (tid, " ".join("%s:%s;" % (k, pal[tid][k]) for k in KEYS)) for tid, _ in PICK)
html = io.open(os.path.join(R, "design", "mockups", "bars.template.html"), encoding="utf-8").read()
assert html.count("/*THEMES*/") == 1 and html.count("/*THLIST*/[]") == 1
html = html.replace("/*THEMES*/", css).replace("/*THLIST*/[]", json.dumps(PICK))
for d in ("design/mockups", "data/mockups"):
    io.open(os.path.join(R, d, "bars.html"), "w", encoding="utf-8", newline="\n").write(html)
ip = os.path.join(R, "data", "mockups", "index.json")
idx = [e for e in json.load(io.open(ip, encoding="utf-8")) if e["file"] != "bars.html"]
idx.insert(0, {"file": "bars.html", "title": "Progress bars", "desc": "Twenty-one ways to draw a progress bar, each on the same four skill cells and three day rows, so only the bar changes. A is what the app draws today. Click a card to mark the ones you like; the theme switch in the top strip shows them on eight palettes.", "date": "2026-11-18"})
io.open(ip, "w", encoding="utf-8", newline="\n").write(json.dumps(idx, indent=2, ensure_ascii=False) + "\n")
print("bars.html", len(html), "bytes;", len(idx), "mockups listed")
