// Gathers every quest's steps from the wiki into data/quest-steps.json: the quick guide (the
// wiki's condensed list) and the Walkthrough section of the quest page (the full version). A few
// quests at a time, politely, resuming where it left off. Run by the hourly "quest-steps" routine,
// or by hand:
//
//   node tools/quest-steps.js            (up to 40 quests this run, two requests each)
//   node tools/quest-steps.js --max 10
//
// The parser is the app's own, lifted out of OSRS-Buddy-dev.html at run time so the file and the
// Steps tab can never disagree. The wiki's text is CC BY-NC-SA; the data file says so.
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "OSRS-Buddy-dev.html");
const OUT = path.join(ROOT, "data", "quest-steps.json");
const API = "https://oldschool.runescape.wiki/api.php";
const UA = "Mortimeter/2.0 quest-steps (github.com/LiquidTwonuh/osrs-buddy)";
const MAX = (()=>{ const i = process.argv.indexOf("--max"); return i > 0 ? +process.argv[i + 1] || 40 : 40; })();
const FRESH_DAYS = 30, RETRY_HOURS = 6, MAX_TRIES = 6, PAUSE_MS = 1200;

const page = fs.readFileSync(PAGE, "utf8");
const a = page.indexOf("function wikiInline("), b = page.indexOf("async function questGuideFetch(");
if(a < 0 || b < 0) throw new Error("couldn't find the parser in the page");
const parser = new Function(page.slice(a, b) + "\nreturn {wikiStepsParse, wikiWalkthrough};")();

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(params){
  const url = API + "?" + new URLSearchParams(Object.assign({format:"json", formatversion:"2"}, params)).toString();
  const r = await fetch(url, {headers: {"User-Agent": UA}});
  if(!r.ok) throw new Error("wiki answered " + r.status);
  const ct = r.headers.get("content-type") || "";
  if(!/json/.test(ct)) throw new Error("wiki answered with " + ct.split(";")[0] + " instead of data");
  return r.json();
}
async function wikitext(title){
  const j = await api({action:"parse", page:title, prop:"wikitext"});
  const wt = j.parse && j.parse.wikitext;
  if(!wt) throw new Error("no page");
  return wt;
}
async function questList(){
  const names = []; let cont = null;
  do{
    const j = await api(Object.assign({action:"query", list:"categorymembers", cmtitle:"Category:Quests", cmlimit:"500", cmnamespace:"0"}, cont ? {cmcontinue: cont} : {}));
    (j.query.categorymembers || []).forEach(m => names.push(m.title));
    cont = j.continue && j.continue.cmcontinue;
  }while(cont);
  return names.filter(n => !/^(Quests|List of|Quest|Miniquests|Optimal quest guide|Quest experience|Quest points)/i.test(n) && !/\//.test(n));
}
async function main(){
  let db = {at:0, note:"Quest steps from the OSRS Wiki (oldschool.runescape.wiki): each quest's quick guide and the Walkthrough section of its page. CC BY-NC-SA 3.0. Gathered by tools/quest-steps.js.", quests:{}, errors:{}};
  try{ db = Object.assign(db, JSON.parse(fs.readFileSync(OUT, "utf8"))); }catch(e){}
  let names;
  try{ names = await questList(); }
  catch(e){ console.log(`stopped before starting: ${e.message}`); process.exit(2); }
  const now = Date.now();
  const due = names.filter(n => {
    const q = db.quests[n], err = db.errors[n];
    if(q && q.full && now - q.at < FRESH_DAYS * 864e5) return false;
    if(err && (err.tries >= MAX_TRIES || now - err.at < RETRY_HOURS * 36e5)) return false;
    return true;
  });
  let done = 0, failed = 0, streak = 0;
  for(const n of due.slice(0, MAX)){
    const rec = {at: now, quick: null, full: null};
    let problem = null;
    try{ rec.quick = parser.wikiStepsParse(await wikitext(n + "/Quick guide")); if(!rec.quick.length) rec.quick = null; }
    catch(e){ if(!/wiki answered/.test(e.message)) rec.quick = null; else problem = e.message; }
    await sleep(PAUSE_MS);
    if(!problem){
      try{ const wt = await wikitext(n); const slice = parser.wikiWalkthrough(wt); rec.full = slice ? parser.wikiStepsParse(slice, {prose:true}) : null; if(rec.full && !rec.full.length) rec.full = null; }
      catch(e){ problem = e.message; }
      await sleep(PAUSE_MS);
    }
    if(!problem && !rec.quick && !rec.full) problem = "neither a quick guide nor a walkthrough";
    if(problem){
      const err = db.errors[n] || {tries:0};
      db.errors[n] = {at: now, tries: err.tries + 1, err: problem};
      failed++; streak++;
      if(streak >= 5){ console.log("five failures in a row; the wiki is probably down. stopping."); break; }
    } else {
      db.quests[n] = rec; delete db.errors[n]; done++; streak = 0;
    }
  }
  db.at = now;
  fs.mkdirSync(path.dirname(OUT), {recursive:true});
  fs.writeFileSync(OUT, JSON.stringify(db));
  const have = Object.keys(db.quests).length;
  const size = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`quests on the wiki: ${names.length} · gathered: ${have} · this run: ${done} gathered, ${failed} failed · still to do: ${Math.max(0, due.length - done)} · file: ${size} KB`);
}
main().catch(e => { console.log("failed: " + e.message); process.exit(1); });
