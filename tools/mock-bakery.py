# -*- coding: utf-8 -*-
# Builds the Bakery mockup (design/mockups/bakery.html and its copy in data/mockups) from
# bakery.template.html, writing in the colours of a few themes from design/skin.
# Run: python -I tools/mock-bakery.py
import io, os, re, json
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEYS = ["--bg", "--panel", "--border", "--gold", "--gold-dim", "--text", "--muted"]
pal = {}
for f in ("palettes.css", "palettes-own.css"):
    t = io.open(os.path.join(R, "design", "skin", f), encoding="utf-8").read()
    for m in re.finditer(r'\[data-theme="([a-z]+)"\]\s*\{([^}]*)\}', t):
        pal[m.group(1)] = dict((k.strip(), v.strip()) for k, v in (x.split(":", 1) for x in m.group(2).split(";") if ":" in x))
PICK = [("law", "Law"), ("mortimer", "Mortimer"), ("night", "Night"), ("black", "Abyss"), ("parchment", "Gilded"), ("fire", "Fire")]
css = "\n".join('  .W[data-th="%s"]{%s}' % (tid, " ".join("%s:%s;" % (k, pal[tid][k]) for k in KEYS)) for tid, _ in PICK)
html = io.open(os.path.join(R, "design", "mockups", "bakery.template.html"), encoding="utf-8").read()
assert html.count("/*THEMES*/") == 1 and html.count("/*THLIST*/[]") == 1
html = html.replace("/*THEMES*/", css).replace("/*THLIST*/[]", json.dumps(PICK))
for d in ("design/mockups", "data/mockups"):
    io.open(os.path.join(R, d, "bakery.html"), "w", encoding="utf-8", newline="\n").write(html)
ip = os.path.join(R, "data", "mockups", "index.json")
idx = [e for e in json.load(io.open(ip, encoding="utf-8")) if e["file"] != "bakery.html"]
idx.insert(0, {"file": "bakery.html", "title": "The Bakery, two ways", "desc": "Coffer's Bakery stopped being a page and became a list again: every method a row across the whole window. Two directions over the same sample methods. A, Board: the best three side by side, the rest as small tiles. B, Listing: one aligned table with the chosen row opened beside it. In both, tuning is a settings file you click or type into. Layout and theme switches in the top strip.", "date": "2026-11-18"})
io.open(ip, "w", encoding="utf-8", newline="\n").write(json.dumps(idx, indent=2, ensure_ascii=False) + "\n")
print("bakery.html", len(html), "bytes;", len(idx), "mockups listed")
