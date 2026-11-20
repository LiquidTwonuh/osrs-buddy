// Copies the design mockups into data/mockups, the one folder the Beta serves beside the
// followed page, and writes index.json so the Mockups page in the Beta can list them.
// Run from the project folder: node tools/sync-mockups.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const src = path.join(root, "design", "mockups"), dst = path.join(root, "data", "mockups");
// One line per mockup, in the order the page shows them. A file not listed here still copies,
// with its <title> as the name and no description.
const DESC = {
  "settings-calm.html": "Settings, calmer and less like a list (Josh's ask). Two directions with your real values: A, Rail, sections down the left and one card of even rows per section; B, Board, the four tabs kept and each setting its own card. In both, Settings keeps the look's own type whatever the Font choice sets. Direction, font and theme switches in the top strip.",
  "themes-variety.html": "The four house themes (Mortimer, Night, Abyss, Crystal) with more than one colour, the same small Home in each. Today for comparison; A gives each theme a second colour with a job (figures, bars, prompt, tags) and Night its own accent; B keeps one accent and splits the neutrals warm and cool instead. Gilded stays as it is. For 1.1.",
  "coffer-loves.html": "Coffer's Board with the skills you love up front, three ways: a column per loved skill under the podium; a fourth, loved seat on the podium and a shelf; or everything shelved by skill, loved first and twice the size. Figures from Josh's own screen. For 1.1.",
  "home-tiles.html": "Home as glass tiles (Josh's sketch): square panes with a small gap, the whole window tiled like terminals. Two layouts of the same panes: Mosaic follows the sketch, Orderly puts every edge on one grid. Gap, glass or flat, and theme switches in the top strip.",
  "home-terminal.html": "Home, second pass on the Interface direction (Josh picked it): modern mono type instead of the pixel face, the app's own themes, a sidebar with the Mortimer icon, and the chat line as a command line that runs an action when you type the start of one. Type and Theme switches in the top strip.",
  "home-runescape.html": "Home, rebuilt from RuneScape's own conventions instead of a dashboard kit. Two directions: the game interface (bitmap numerals, right-click menu, orbs, a chat line) or the quest journal (ink on paper, done lines struck through, skills as a ledger). Swap ground shows each in light and dark.",
  "coffer-runs.html": "A Runs section in Coffer, tree and herb runs first. Two directions: a board of your patches, or a log of runs tallied over the week.",
  "map-goals.html": "The popular goals under the Map search, three ways that are not pills: reward cards, colour banners, medallions.",
  "vault-bank.html": "Vault as the bank. Two directions: the bank window itself, or today's Vault with the bank under it. Reads your real bank from the app; a wizard marks where your tabs begin.",
  "map-tree-first.html": "Map, tree first (Josh's direction). The tree is the page, search and the Optimal quest guide button above it, a popup per quest with everything in it.",
  "upgrades-v2.html": "Account upgrades read three ways: by skill ladder, by what they do, by stage. No tiers.",
  "map-calm.html": "Map, calmer. Two directions: one goal at a time, or one ready-now list.",
  "upgrades.html": "Account upgrades as a tier list. Kept for comparison.",
  "bakery.html": "Coffer's Bakery two ways, both now built: A, Board, the best three side by side and the rest as tiles; B, Listing, one aligned table with the chosen row opened beside it. Tune as a settings file you click or type into.",
  "bars.html": "Twenty-one ways to draw a progress bar on the same cells. Six of them are now a setting in Look.",
  "wide-fill.html": "What goes in the empty part of a big monitor: extras in three tiers, as a side rail or as panes the page grows. The second is what was built.",
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
