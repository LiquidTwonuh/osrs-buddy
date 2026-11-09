// Joins the numbered files in ai-notes into ai-notes/ALL.md, the one-paste brief for ChatGPT or
// any other model. Run from the project folder: node tools/ai-notes-bundle.js
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "..", "ai-notes");
const files = fs.readdirSync(dir).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
const today = new Date().toISOString().slice(0, 10);
let out = `# Mortimeter, the whole brief\n\nBundled ${today} from ai-notes/ in C:\\Projects\\mortimeter. Read it top to bottom; the rules every AI should know are in the first section of the workflow file at the end. Write back through ai-notes/INBOX.md.\n\n`;
for (const f of files) {
  out += "\n\n---\n\n" + fs.readFileSync(path.join(dir, f), "utf8").trim() + "\n";
}
fs.writeFileSync(path.join(dir, "ALL.md"), out);
const words = out.split(/\s+/).length;
console.log(`ai-notes/ALL.md: ${files.length} files, about ${words} words`);
