// Copies the design mockups into data/mockups, the one folder the Beta serves beside the
// followed page, and writes index.json so the Mockups page in the Beta can list them.
// Run from the project folder: node tools/sync-mockups.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const src = path.join(root, "design", "mockups"), dst = path.join(root, "data", "mockups");
// One line per mockup, in the order the page shows them. A file not listed here still copies,
// with its <title> as the name and no description.
const DESC = {
  "map-goals.html": "The popular goals under the Map search, three ways that are not pills: reward cards, colour banners, medallions.",
  "vault-bank.html": "Vault as the bank. Two directions: the bank window itself, or today's Vault with the bank under it. Reads your real bank from the app; a wizard marks where your tabs begin.",
  "map-tree-first.html": "Map, tree first (Josh's direction). The tree is the page, search and the Optimal quest guide button above it, a popup per quest with everything in it.",
  "upgrades-v2.html": "Account upgrades read three ways: by skill ladder, by what they do, by stage. No tiers.",
  "map-calm.html": "Map, calmer. Two directions: one goal at a time, or one ready-now list.",
  "upgrades.html": "Account upgrades as a tier list. Kept for comparison.",
};
fs.mkdirSync(dst, { recursive: true });
const files = fs.readdirSync(src).filter(f => f.endsWith(".html") && !f.endsWith(".template.html"));
const order = Object.keys(DESC);
files.sort((a, b) => (order.indexOf(a) < 0 ? 99 : order.indexOf(a)) - (order.indexOf(b) < 0 ? 99 : order.indexOf(b)));
const index = files.map(f => {
  const text = fs.readFileSync(path.join(src, f), "utf8");
  fs.writeFileSync(path.join(dst, f), text);
  const m = text.match(/<title>([^<]*)/);
  const st = fs.statSync(path.join(src, f));
  return { file: f, title: m ? m[1].trim() : f, desc: DESC[f] || "", date: st.mtime.toISOString().slice(0, 10) };
});
// stale copies go, so a deleted mockup leaves the Beta too
for (const f of fs.readdirSync(dst)) if (f.endsWith(".html") && !files.includes(f)) fs.unlinkSync(path.join(dst, f));
fs.writeFileSync(path.join(dst, "index.json"), JSON.stringify(index, null, 2) + "\n");
console.log(`data/mockups: ${files.length} mockups, index.json written`);
