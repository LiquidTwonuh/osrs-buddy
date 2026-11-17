// Gathers the wiki's gear progression into data/gear.json, and into the page between its
// GEAR_DATA markers: the three supplemental guides (Melee, Ranged, Magic) as stages of full
// loadouts with their content-specific rows and the bonus-against-cost table, and the Skilling
// equipment page as a per-skill list of outfits and items. Each item's own page is read once, in
// batches of fifty, for its item ids, picture and whether it trades. Run by hand:
//
//   node tools/gear.js
//
// About ten requests in all, a second apart. The wiki's text is CC BY-NC-SA; the data says so.
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "OSRS-Buddy-dev.html");
const OUT = path.join(ROOT, "data", "gear.json");
const API = "https://oldschool.runescape.wiki/api.php";
const UA = "osrs-companion gear data build (run by hand, about ten requests)";
const PAUSE_MS = 1100;
const STYLES = [["melee", "Guide:Melee Gear Progression"], ["ranged", "Guide:Ranged Gear Progression"], ["magic", "Guide:Magic Gear Progression"]];
const SKILLING = "Skilling equipment";
const SLOTS = ["head", "cape", "neck", "ammo", "weapon", "torso", "shield", "legs", "gloves", "boots", "ring"];
// names the guides spell differently from the item's own page
const NAME_FIX = {"Dagon'hai robe bottoms": "Dagon'hai robe bottom"};

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(params){
  const url = API + "?" + new URLSearchParams(Object.assign({format:"json", formatversion:"2"}, params)).toString();
  const r = await fetch(url, {headers: {"User-Agent": UA}});
  if(!r.ok) throw new Error("wiki answered " + r.status);
  if(!/json/.test(r.headers.get("content-type") || "")) throw new Error("wiki answered with something that is not data");
  return r.json();
}
async function pageText(title){
  const j = await api({action:"parse", page:title, prop:"wikitext|revid"});
  if(!j.parse || !j.parse.wikitext) throw new Error("no page: " + title);
  return {text: j.parse.wikitext, rev: j.parse.revid, title: j.parse.title};
}

// ---------- wikitext helpers
// every {{name ...}} with balanced braces, as {a, b, body}
function templates(text, name){
  const out = [], tag = "{{" + name; let i = 0;
  const lower = text.toLowerCase(), ltag = tag.toLowerCase();
  for(;;){
    const a = lower.indexOf(ltag, i); if(a < 0) break;
    const nxt = text[a + tag.length];
    if(nxt !== "|" && nxt !== "}" && nxt !== "\n" && nxt !== " "){ i = a + 2; continue; }
    let depth = 0, j = a;
    while(j < text.length){
      if(text.startsWith("{{", j)){ depth++; j += 2; continue; }
      if(text.startsWith("}}", j)){ depth--; j += 2; if(depth === 0) break; continue; }
      j++;
    }
    out.push({a, b: j, body: text.slice(a + tag.length, j - 2)});
    i = j;
  }
  return out;
}
// split on | at depth 0
function splitTop(body){
  const parts = []; let cur = "", d = 0;
  for(let i = 0; i < body.length; i++){
    const two = body.substr(i, 2);
    if(two === "{{" || two === "[["){ d++; cur += two; i++; continue; }
    if(two === "}}" || two === "]]"){ d--; cur += two; i++; continue; }
    if(body[i] === "|" && d === 0){ parts.push(cur); cur = ""; continue; }
    cur += body[i];
  }
  parts.push(cur);
  return parts;
}
const stripNotes = v => String(v).replace(/<!--[\s\S]*?-->/g, "").replace(/<ref[\s\S]*?<\/ref>|<ref[^>]*\/>/g, "");
function dropTemplates(v, names){ let s = v; names.forEach(n=>{ let t; while((t = templates(s, n)).length){ s = s.slice(0, t[0].a) + s.slice(t[0].b); } }); return s; }
// the first {{Plink}} / {{plinkt}} / {{plinkp}} in a cell: {name, pic, txt}
function plinks(cell){
  const out = [];
  ["Plinkt", "Plinkp", "Plink"].forEach(n=>templates(cell, n).forEach(t=>{
    const parts = splitTop(t.body).map(x=>x.trim()).filter(Boolean); if(!parts.length) return;
    const o = {at: t.a, name: parts[0].split("#")[0].trim()};
    parts.slice(1).forEach(p=>{ const m = /^(pic|txt)\s*=\s*(.*)$/s.exec(p); if(m) o[m[1]] = m[2].trim(); });
    if(!out.some(x=>x.at === o.at)) out.push(o);
  }));
  return out.sort((a, b)=>a.at - b.at);
}
// wiki markup to a plain sentence
function plain(v){
  let s = stripNotes(v);
  s = dropTemplates(s, ["Efn", "Refn", "Notelist", "Reflist"]);
  s = s.replace(/\{\{(?:NoCoins|Nocoins|nocoins|Coins|coins)\|\s*\{\{GEP\|[^}]*\}\}[^}]*\}\}/g, "its Grand Exchange price");
  s = s.replace(/\{\{(?:NoCoins|Nocoins|nocoins|Coins|coins)\|\s*([\d,]+)[^}]*\}\}/g, (_, n)=>Number(n.replace(/,/g, "")).toLocaleString("en-US") + " coins");
  s = s.replace(/\{\{SCP\|([^|}]+)\|([^|}]+)[^}]*\}\}/g, "$2 $1").replace(/\{\{SCP\|([^|}]+)\}\}/g, "$1");
  s = s.replace(/\{\{[Pp]link[tp]?\|([^}]*)\}\}/g, (_, b)=>{ const p = splitTop(b).map(x=>x.trim()); const txt = p.find(x=>/^txt\s*=/.test(x)); return txt ? txt.replace(/^txt\s*=\s*/, "") : p[0].split("#")[0]; });
  s = s.replace(/\[\[File:[^\]]*\]\]/g, "");
  s = s.replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, "$1");
  s = s.replace(/\{\{[^{}]*\}\}/g, "").replace(/'''?/g, "").replace(/&nbsp;/g, " ").replace(/<br\s*\/?>/g, " ");
  return s.replace(/\s+/g, " ").trim();
}

// ---------- costs: a wiki expression becomes {e:"(g0-g1)/2", g:["Dragon boots","Rune boots"]}
// that the page can work out with today's prices. null when the wiki says not applicable, and
// {t:"..."} when it is words (3+ Ancient shards) or arithmetic this reader does not follow.
function costOf(cell, vars){
  let s = stripNotes(cell).trim();
  s = dropTemplates(s, ["Efn", "Refn"]);
  if(/\{\{\s*NA\s*[|}]/i.test(s) && !/GEP/.test(s)) return null;
  const coin = ["Coins", "Nocoins", "NoCoins"].map(n=>templates(s, n)).find(t=>t.length);
  if(!coin){ const t = plain(s); return t ? {t} : null; }
  let ex = splitTop(coin[0].body).filter(p=>p.trim() && !/^\s*c\s*$/.test(p))[0] || "";
  const g = [];
  const name = n => { const k = n.trim(); let i = g.indexOf(k); if(i < 0){ g.push(k); i = g.length - 1; } return "g" + i; };
  for(let guard = 0; guard < 40; guard++){
    const before = ex;
    ex = ex.replace(/\{\{#var:([^{}|]+)\}\}/g, (_, v)=>vars && vars.num[v.trim()] ? "(" + vars.num[v.trim()] + ")" : "(?)");
    ex = ex.replace(/\{\{GEP\|([^{}]*)\}\}/g, (_, b)=>{ const p = b.split("|").map(x=>x.trim()).filter(x=>!/^txt\s*=/.test(x)); return p.length > 1 ? "(" + name(p[0]) + "*(" + p[1] + "))" : name(p[0]); });
    ex = ex.replace(/\{\{#expr:([^{}]*)\}\}/g, "($1)");
    ex = ex.replace(/\{\{min\|([^{}]*)\}\}/g, (_, b)=>"min(" + b.split("|").join(",") + ")");
    if(ex === before) break;
  }
  ex = ex.replace(/\s+/g, "");
  if(!ex) return null;
  if(!/^(?:g\d+|\d+(?:\.\d+)?|\.\d+|min|floor|[+\-*/(),])+$/.test(ex)) return {t: plain(cell) || "see the wiki"};
  return g.length ? {e: ex, g} : {e: ex};
}
// {{#vardefine:name|...}}: a number (a price expression) or a choice (the cheapest of several items)
function varDefs(text){
  const num = {}, pick = {};
  let i = 0;
  for(;;){
    const a = text.indexOf("{{#vardefine:", i); if(a < 0) break;
    let depth = 0, j = a;
    while(j < text.length){ if(text.startsWith("{{", j)){ depth++; j += 2; continue; } if(text.startsWith("}}", j)){ depth--; j += 2; if(depth === 0) break; continue; } j++; }
    const body = stripNotes(text.slice(a + 13, j - 2)), bar = body.indexOf("|"), key = body.slice(0, bar).trim(), val = body.slice(bar + 1);
    if(/#switch/.test(val)){ const opts = []; val.replace(/\{\{#var:[^{}]+\}\}\s*=\s*([^|{}<\n]+)/g, (_, v)=>{ opts.push(NAME_FIX[v.trim()] || v.trim()); }); if(opts.length) pick[key] = opts; }
    else { const g = /\{\{GEP\|([^{}|]+)/.exec(val); if(g) num[key] = "{{GEP|" + g[1].trim() + "}}"; }
    i = j;
  }
  return {num, pick};
}

// ---------- a table, as rows of cells; a cell keeps its rowspan
function tableRows(tb){
  return tb.replace(/^\{\|[^\n]*\n/, "").replace(/\n\|\}\s*$/, "").split(/\n\|-[^\n]*/).map(row=>{
    // a line starting with | or ! opens a cell, unless it sits inside a template (|head = ... in Equipment)
    const cells = []; let cur = null, depth = 0;
    row.split("\n").forEach(line=>{
      const m = depth === 0 ? /^([!|])(.*)$/.exec(line) : null;
      if(m && !/^\|\}/.test(line)){ if(cur) cells.push(cur); cur = {head: m[1] === "!", raw: m[2]}; }
      else if(cur) cur.raw += "\n" + line;
      depth += (line.match(/\{\{/g) || []).length - (line.match(/\}\}/g) || []).length; if(depth < 0) depth = 0;
    });
    if(cur) cells.push(cur);
    return cells.map(c=>{
      let raw = c.raw; const at = /^\s*((?:(?:colspan|rowspan|style|class|scope|data-sort-type|rowspan-)[^|\n\[\{]*)+)\|(?!\|)/.exec(raw);
      let span = 1, col = 1;
      if(at){ const r = /rowspan\s*=\s*"?(\d+)/.exec(at[1]); if(r) span = +r[1]; const k = /colspan\s*=\s*"?(\d+)/.exec(at[1]); if(k) col = +k[1]; raw = raw.slice(at[0].length); }
      return {head: c.head, span, col, raw: raw.trim()};
    });
  }).filter(r=>r.length);
}

// ---------- a gear guide
function parseGuide(text){
  const vars = varDefs(text);
  // a "cheapest of these" variable inside a row reads as its first choice
  const sub = raw => raw.replace(/\{\{#var:([^{}]+)\}\}/g, (all, v)=>vars.pick[v.trim()] ? vars.pick[v.trim()][0] : all);
  const secs = []; const re = /^==\s*([^=\n]+?)\s*==\s*$/gm; let m;
  while((m = re.exec(text))) secs.push({a: m.index, b: m.index + m[0].length, title: m[1].trim()});
  const stages = []; let bonus = null;
  secs.forEach((sec, si)=>{
    const body = text.slice(sec.b, si + 1 < secs.length ? secs[si + 1].a : text.length);
    const tm = /\{\|[\s\S]*?\n\|\}/.exec(body); if(!tm) return;
    const rows = tableRows(tm[0]);
    if(/\{\{Equipment/i.test(tm[0])){
      const heads = rows[0].filter(c=>c.head).map(c=>plain(c.raw.replace(/\n/g, " ")));
      const loadRow = rows.find(r=>r.some(c=>/\{\{Equipment/i.test(c.raw)));
      const rungs = loadRow.filter(c=>/\{\{Equipment/i.test(c.raw)).map((c, i)=>{
        const eq = templates(c.raw, "Equipment")[0], kv = {};
        splitTop(eq.body).forEach(p=>{ const k = p.indexOf("="); if(k < 0) return; kv[p.slice(0, k).trim().toLowerCase()] = stripNotes(p.slice(k + 1)).trim(); });
        const load = {};
        SLOTS.forEach(sl=>{ const v = kv[sl] || ""; const vm = /^\{\{#var:([^{}]+)\}\}$/.exec(v); load[sl] = vm ? (vars.pick[vm[1].trim()] || []) : v; });
        const h = heads[i] || "", lv = /(\d+)/.exec(h);
        return {h, lvl: lv ? +lv[1] : null, load};
      });
      // the rows under the loadouts: content-specific gear, what it is for, what it costs to buy
      const also = []; let skip = 0;
      rows.slice(rows.indexOf(loadRow) + 1).forEach(r=>{
        if(r.every(c=>c.head)) return;
        if(skip > 0){ skip--; return; }
        const first = r[0]; if(first.span > 1) skip = first.span - 1;
        const fraw = sub(first.raw), ps = plinks(fraw).filter(p=>!/[{}]/.test(p.name)); if(!ps.length) return;
        const whole = plain(fraw), um = /\(([^()]*(?:\([^()]*\)[^()]*)*)\)\s*$/.exec(whole);
        const use = um ? um[1] : "", label = (um ? whole.slice(0, um.index) : whole).trim();
        const costCell = r.find((c, i)=>i > 0 && /\{\{(?:Coins|Nocoins|NoCoins|NA)/i.test(c.raw)) || r[r.length - 2];
        const row = {label, items: ps.map(p=>p.pic ? {n: p.name, pic: p.pic} : {n: p.name})};
        if(use) row.use = use; const cost = costCell ? costOf(costCell.raw, vars) : null; if(cost) row.cost = cost;
        also.push(row);
      });
      stages.push({title: sec.title, rungs, also});
    } else if(/bonus/i.test(sec.title)){
      const out = [];
      rows.forEach(r=>{
        if(r.every(c=>c.head)) return;
        const ps = plinks(sub(r[0].raw)).filter(p=>!/[{}]/.test(p.name));
        const val = c => c ? plain(c.raw).split(/\s*\|\s*/)[0] : "";
        const note = c => { const e = c ? templates(c.raw, "Efn")[0] : null; return e ? plain(splitTop(e.body)[1] || splitTop(e.body)[0] || "") : ""; };
        const tidy = o => { Object.keys(o).forEach(k=>{ if(o[k] == null || o[k] === "") delete o[k]; }); return o; };
        if(ps.length) out.push(tidy({n: ps[0].name, pic: ps[0].pic, txt: ps[0].txt, b: val(r[1]), cost: r[2] ? costOf(r[2].raw, vars) : null, d: val(r[3]), dn: note(r[3]), per: r[4] ? costOf(r[4].raw, vars) : null}));
        else if(out.length){ const prev = out[out.length - 1]; (prev.alt = prev.alt || []).push(tidy({d: val(r[0]), dn: note(r[0]), per: r[1] ? costOf(r[1].raw, vars) : null})); }
      });
      bonus = {name: sec.title.split("/")[0].trim(), rows: out};
    }
  });
  return {stages, bonus};
}

// ---------- the Skilling equipment page: two tables, a skill heading per group of rows
function parseSkilling(text){
  const out = [];
  const tables = text.match(/\{\|[\s\S]*?\n\|\}/g) || [];
  tables.forEach((tb, ti)=>{
    let skill = ""; const carry = {};
    tableRows(tb).forEach(r=>{
      const heads = r.filter(c=>c.head), cells = r.filter(c=>!c.head);
      heads.forEach(h=>{ const s = /\{\{SCP\|([^|}]+)/.exec(h.raw); if(s) skill = s[1].trim(); });
      if(!cells.length || !skill) return;
      // three columns: the item, what it does, where it comes from; a cell may span rows
      const cols = []; let ci = 0;
      for(let col = 0; col < 3; col++){
        if(carry[col] && carry[col].left > 0){ cols[col] = carry[col].raw; carry[col].left--; continue; }
        let c = cells[ci++];
        // the picture and the name can sit in two cells (Rada's blessing)
        if(col === 0 && c && /^\s*(\[\[File:[^\]]*\]\]\s*)+$/.test(c.raw) && cells[ci]){ c = {raw: c.raw + " " + cells[ci].raw, span: cells[ci].span}; ci++; }
        if(!c){ cols[col] = ""; continue; }
        cols[col] = c.raw; if(c.span > 1) carry[col] = {raw: c.raw, left: c.span - 1};
      }
      const ps = plinks(cols[0]); const file = /\[\[File:([^\]|]+)/.exec(cols[0]); const link = /\[\[([^\]|#]+)/.exec(cols[0].replace(/\[\[File:[^\]]*\]\]/g, ""));
      const name = ps.length ? (ps[0].txt || ps[0].name) : link ? link[1].trim() : ""; if(!name) return;
      const bullets = v => ("\n" + stripNotes(v)).split(/\n\s*\*+\s*/).map(plain).map(x=>x.replace(/^\*+\s*/, "")).filter(Boolean);
      const pic = (ps.length ? ps[0].pic : (file ? file[1].trim() : "")) || "";
      const row = {skill, name, fx: bullets(cols[1]), src: bullets(cols[2])};
      const pg = ps.length ? ps[0].name : (link ? link[1].trim() : name); if(pg !== name) row.page = pg;
      if(pic) row.pic = pic.replace(/\.png$/i, ""); if(ti === 0) row.set = 1;
      out.push(row);
    });
  });
  return out;
}

// ---------- every item's own page, fifty at a time: ids, picture, whether it trades
async function itemInfo(names){
  const info = {};
  for(let i = 0; i < names.length; i += 50){
    const batch = names.slice(i, i + 50);
    // a long batch comes back in parts; follow the continuation until the wiki has sent it all
    const pages = {}, chain = []; let cont = {};
    for(let part = 0; part < 12; part++){
      const j = await api(Object.assign({action:"query", prop:"revisions", rvprop:"content", rvslots:"main", redirects:"1", titles: batch.join("|")}, cont));
      (j.query.normalized || []).concat(j.query.redirects || []).forEach(x=>{ if(!chain.some(y=>y.from === x.from)) chain.push(x); });
      (j.query.pages || []).forEach(p=>{ if(!pages[p.title] || (p.revisions && p.revisions.length)) pages[p.title] = p; });
      if(!j.continue) break; cont = j.continue; await sleep(PAUSE_MS);
    }
    const resolve = n => { let t = n; for(let k = 0; k < 4; k++){ const hop = chain.find(x=>x.from === t); if(!hop) break; t = hop.to; } return t; };
    Object.values(pages).forEach(p=>{
      const txt = p.revisions && p.revisions[0] && p.revisions[0].slots && p.revisions[0].slots.main ? p.revisions[0].slots.main.content : "";
      const ids = []; txt.replace(/\|\s*id\d*\s*=\s*([\d,\s]+)/g, (_, v)=>{ v.split(",").forEach(x=>{ const n = +x.trim(); if(n && !ids.includes(n)) ids.push(n); }); });
      const img = /\|\s*image\d*\s*=\s*\[\[File:([^\]|]+)/.exec(txt);
      const tr = /\|\s*tradeable\d*\s*=\s*(Yes|No)/i.exec(txt);
      batch.forEach(n=>{ if(resolve(n) === p.title) info[n] = {page: p.title, missing: !!p.missing, ids: ids.slice(0, 24), img: img ? img[1].trim().replace(/ /g, "_") : "", trade: tr ? /yes/i.test(tr[1]) : null}; });
    });
    await sleep(PAUSE_MS);
  }
  return info;
}

// write the data into the page between its markers
function inject(data){
  const page = fs.readFileSync(PAGE, "utf8"), A = "/*GEAR_DATA_START*/", B = "/*GEAR_DATA_END*/";
  const a = page.indexOf(A), b = page.indexOf(B);
  if(a < 0 || b < 0){ console.log("no GEAR_DATA markers in the page yet; data file only"); return; }
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  fs.writeFileSync(PAGE, page.slice(0, a + A.length) + json + page.slice(b));
  console.log("page updated,", Math.round(json.length / 1024) + " KB inline");
}
// every picture the page will draw, checked against the wiki fifty at a time; a missing file is
// named so it can be given the right one
async function checkPictures(data){
  const file = n => (data.items[n] && data.items[n].img ? data.items[n].img : n.replace(/ /g, "_") + ".png").replace(/_/g, " ");
  const want = new Map(), add = (n, pic) => { const k = pic || n; if(k) want.set(file(k), k); };
  Object.values(data.styles).forEach(st=>{
    st.stages.forEach(s=>{ s.rungs.forEach(r=>SLOTS.forEach(sl=>[].concat(r.load[sl]).forEach(n=>add(n)))); s.also.forEach(a=>add(a.items[0].n, a.items[0].pic)); });
    if(st.bonus) st.bonus.rows.forEach(r=>add(r.n, r.pic));
  });
  data.skilling.forEach(x=>add(x.page || x.name, x.pic));
  const files = [...want.keys()], missing = [];
  for(let i = 0; i < files.length; i += 50){
    const batch = files.slice(i, i + 50);
    const j = await api({action:"query", prop:"imageinfo", titles: batch.map(f=>"File:" + f).join("|")});
    const norm = {}; (j.query.normalized || []).forEach(x=>{ norm[x.to] = x.from; });
    (j.query.pages || []).forEach(p=>{ if(p.missing && !(p.imageinfo && p.imageinfo.length)){ const f = (norm[p.title] || p.title).replace(/^File:/, ""); missing.push(want.get(f) || f); } });
    await sleep(PAUSE_MS);
  }
  console.log("pictures", files.length, "checked, missing:", missing.join(" | ") || "none");
  return missing;
}
// node tools/gear.js --inject     puts the data file already on disk into the page, without asking the wiki again
// node tools/gear.js --pictures   checks the pictures of the data file on disk
if(process.argv.includes("--inject")){ inject(JSON.parse(fs.readFileSync(OUT, "utf8"))); return; }
if(process.argv.includes("--pictures")){ checkPictures(JSON.parse(fs.readFileSync(OUT, "utf8"))).catch(e=>{ console.error("gear:", e.message); process.exit(1); }); return; }

(async ()=>{
  const data = {read: new Date().toLocaleDateString("en-CA"), licence: "Text and figures are the Old School RuneScape Wiki's, CC BY-NC-SA 3.0.", src: {}, styles: {}, skilling: [], items: {}};
  for(const [key, title] of STYLES){
    const p = await pageText(title); data.src[key] = {title: p.title, rev: p.rev};
    data.styles[key] = parseGuide(p.text);
    console.log(key, "stages", data.styles[key].stages.map(s=>s.rungs.length + "+" + s.also.length).join(" "), "bonus rows", data.styles[key].bonus ? data.styles[key].bonus.rows.length : 0);
    await sleep(PAUSE_MS);
  }
  const sk = await pageText(SKILLING); data.src.skilling = {title: sk.title, rev: sk.rev};
  data.skilling = parseSkilling(sk.text);
  console.log("skilling", data.skilling.length, "rows over", new Set(data.skilling.map(x=>x.skill)).size, "skills");
  await sleep(PAUSE_MS);

  const names = new Set();
  // every name the page will draw or look up, and the piece that pictures a set (so a set can be
  // recognised by one of its pieces in a bank)
  const want = n => { if(n && !/[{}]/.test(n)) names.add(n); };
  Object.values(data.styles).forEach(st=>{
    st.stages.forEach(s=>{ s.rungs.forEach(r=>SLOTS.forEach(sl=>[].concat(r.load[sl]).forEach(want))); s.also.forEach(a=>a.items.forEach(it=>{ want(it.n); want(it.pic); })); });
    if(st.bonus) st.bonus.rows.forEach(r=>{ want(r.n); want(r.pic); });
  });
  data.skilling.forEach(x=>{ want(x.page || x.name); want(x.pic); });
  const info = await itemInfo([...names]);
  const missing = [];
  [...names].sort().forEach(n=>{
    const x = info[n]; if(!x || x.missing){ missing.push(n); return; }
    const o = {}; if(x.ids.length) o.ids = x.ids; if(x.img && x.img !== n.replace(/ /g, "_") + ".png") o.img = x.img; if(x.trade === false) o.nt = 1; if(x.page !== n) o.page = x.page;
    if(Object.keys(o).length) data.items[n] = o;
  });
  console.log("items", names.size, "with ids", Object.values(data.items).filter(x=>x.ids).length, "missing pages:", missing.join(", ") || "none");

  fs.writeFileSync(OUT, JSON.stringify(data, null, 1) + "\n");
  console.log("wrote", path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + " KB");
  inject(data);
})().catch(e=>{ console.error("gear:", e.message); process.exit(1); });
