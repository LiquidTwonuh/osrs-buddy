# -*- coding: utf-8 -*-
# Builds the package to hand to ChatGPT (or anyone) for redoing the colour themes in the
# Terminal look: FOR-CHATGPT-themes/ at the top of the project, and the same thing zipped.
# It reads the themes out of the dev page, so the package always shows them as they are now.
# Run from anywhere: python -I tools/theme-kit.py
import io, os, re, json, shutil, zipfile
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = os.path.join(ROOT, "OSRS-Buddy-dev.html")
SRC = os.path.join(ROOT, "design", "theme-kit")
OUT = os.path.join(ROOT, "FOR-CHATGPT-themes")
TOKENS = ["--bg", "--bg2", "--panel", "--panel2", "--border", "--gold", "--gold-dim", "--gold2", "--gold3", "--text", "--muted",
          "--inset", "--active", "--btnlo", "--btnhov1", "--btnhov2", "--cellbg", "--code", "--ph", "--xp", "--catbd",
          "--dotdim", "--swempty", "--glow", "--green", "--green-bg", "--red", "--blue"]
EXTRA = ["--k-c", "--k-y", "--k-o", "--k-g", "--me", "--line", "--faint", "--glow1", "--glow2"]

page = io.open(PAGE, encoding="utf-8").read()
css = page[page.index("<style>"):page.index("</style>")]
decl = lambda body: dict((m.group(1), m.group(2).strip()) for m in re.finditer(r"(--[a-z0-9-]+)\s*:\s*([^;}]+)", body))

# the list of themes, in the order of the picker
block = page[page.index("const THEMES = ["):]
block = block[:block.index("];")]
order = re.findall(r'\["([a-z0-9-]+)","([^"]+)","([^"]+)"\]', block)
assert len(order) >= 30, len(order)

# Gilded (id parchment) is the sheet's own :root; every other theme is one or more blocks
root = {}
for m in re.finditer(r":root\{([^}]*)\}", css):
    d = decl(m.group(1))
    if "--bg" in d: root.update(d)
assert all(t in root for t in TOKENS), [t for t in TOKENS if t not in root]
themes = {}
for tid, name, icon in order:
    vals = dict((t, root[t]) for t in TOKENS)
    for m in re.finditer(r'body\[data-theme="' + re.escape(tid) + r'"\]\{([^}]*)\}', css):
        d = decl(m.group(1)); vals.update((k, v) for k, v in d.items() if k in TOKENS)
    for m in re.finditer(r'body\[data-skin="term"\]\[data-theme="' + re.escape(tid) + r'"\]\{([^}]*)\}', css):
        d = decl(m.group(1)); vals.update((k, v) for k, v in d.items() if k in TOKENS or k in EXTRA)
    themes[tid] = {"name": name, "icon": icon, "vals": vals}

if os.path.isdir(OUT): shutil.rmtree(OUT)
os.makedirs(OUT)
w = lambda name, text: io.open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n").write(text)

# 1. the themes as they are now
def block_of(tid):
    t = themes[tid]
    lines = ["/* %s · id %s · picker icon %s */" % (t["name"], tid, t["icon"]), 'body[data-skin="term"][data-theme="%s"]{' % tid]
    ks = list(t["vals"].keys())
    for i in range(0, len(ks), 4): lines.append("  " + " ".join("%s:%s;" % (k, t["vals"][k]) for k in ks[i:i + 4]))
    lines.append("}")
    return "\n".join(lines)
w("current-themes.css", "/* Mortimeter's %d themes as they are today, one block each, in the form a new block should come back in.\n   Mortimer and Night were made for the Terminal look and are the reference. The rest were made for the\n   older Classic look and are the ones to redo. */\n\n" % len(order)
  + "\n\n".join(block_of(tid) for tid, _, _ in order) + "\n")

# 2. the page to try a block in
tpl = io.open(os.path.join(SRC, "terminal-kit.template.html"), encoding="utf-8").read()
data = dict((tid, dict([("--name", themes[tid]["name"])] + list(themes[tid]["vals"].items()))) for tid, _, _ in order)
assert tpl.count("/*THEMES_JSON*/") == 1
w("theme-kit.html", tpl.replace("/*THEMES_JSON*/", json.dumps(data, ensure_ascii=False)))

# 3. how the app looks now
shots = sorted(f for f in os.listdir(os.path.join(SRC, "term-shots")) if f.lower().endswith(".jpg"))
for f in shots: shutil.copy(os.path.join(SRC, "term-shots", f), os.path.join(OUT, f))

# 4. the brief
brief = io.open(os.path.join(SRC, "terminal-brief.md"), encoding="utf-8").read()
ids = "\n".join("| `%s` | %s | `%s` | %s |" % (tid, name, icon, "reference, leave as is" if tid in ("mortimer", "night") else "redo") for tid, name, icon in order)
brief = brief.replace("{{N_THEMES}}", str(len(order))).replace("{{N_REDO}}", str(len(order) - 2)).replace("{{N_TOKENS}}", str(len(TOKENS))).replace("{{THEME_TABLE}}", ids) \
    .replace("{{MORTIMER_BLOCK}}", block_of("mortimer")).replace("{{SHOTS}}", ", ".join("`%s`" % f for f in shots))
assert "{{" not in brief, re.findall(r"\{\{[A-Z_]+\}\}", brief)
w("START-HERE.md", brief)

# 5. one file to upload
zp = os.path.join(ROOT, "FOR-CHATGPT-themes.zip")
if os.path.exists(zp): os.remove(zp)
with zipfile.ZipFile(zp, "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(os.listdir(OUT)): z.write(os.path.join(OUT, f), f)
print("theme kit:", len(order), "themes,", len(os.listdir(OUT)), "files,", os.path.getsize(zp) // 1024, "KB zip")
print("blood --bg", themes["blood"]["vals"]["--bg"], "| mortimer --gold", themes["mortimer"]["vals"]["--gold"], "| black extras", [k for k in themes["black"]["vals"] if k in EXTRA])
