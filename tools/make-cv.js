const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync('js/pages.js','utf8');
const cut=src.slice(0,src.indexOf('const colophon'));
const ctx={}; vm.createContext(ctx);
// stubs for helpers referenced at load time only inside functions
vm.runInContext(cut.replace(/const /g,'var ')+';this.PUB=PUBLISHED;this.EXP=EXPERIENCE;this.EMAIL=EMAIL;',ctx);
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const link=p=>p[5]?(p[5].startsWith('http')?p[5]:'https://doi.org/'+p[5]):'';
const exp=Object.entries(ctx.EXP).map(([h,rows])=>`<h2>${h}</h2>`+rows.map(r=>`<div class="r"><span class="w">${e(r[0])}</span><div><b>${e(r[1])}</b>${r[2]?`<p>${e(r[2])}</p>`:''}</div></div>`).join('')).join('');
const pubs=ctx.PUB.map(p=>`<div class="r"><span class="w">${p[0]}</span><div><b>${e(p[1])}</b><p>${e(p[4])} · <i>${e(p[2])}</i> · ${p[3]}${link(p)?` · <span class="u">${e(link(p))}</span>`:''}</p></div></div>`).join('');
const html=`<!doctype html><meta charset="utf-8"><title>Jan Smolinski, CV</title>
<style>
@page{size:A4;margin:16mm 16mm 16mm}
body{font:10.5pt/1.4 "EB Garamond",Georgia,serif;color:#25221e;margin:0}
h1{font-size:26pt;font-weight:500;margin:0 0 2pt}
.sub{color:#6b655c;font-style:italic;margin:0 0 4pt}
.contact{font-size:9.5pt;color:#444;margin-bottom:10pt;border-bottom:1px solid #c9c2b4;padding-bottom:8pt}
h2{font-size:9.5pt;font-variant:small-caps;letter-spacing:.12em;color:#b0452f;margin:14pt 0 4pt;border-bottom:1px solid #e3ddd0;padding-bottom:2pt;break-after:avoid}
.r{display:grid;grid-template-columns:78pt 1fr;gap:10pt;padding:3pt 0;break-inside:avoid}
.w{color:#8a8377;font-style:italic;font-size:9.5pt}
b{font-weight:600}p{margin:0;color:#4a453d;font-size:9.8pt}.u{color:#6b655c;font-size:8.8pt;word-break:break-all}
</style>
<h1>Jan Smolinski</h1>
<p class="sub">PhD fellow, Department of Management, Aarhus University · AI agents in entrepreneurship and negotiation</p>
<div class="contact">${ctx.EMAIL} · linkedin.com/in/jansmolinski · orcid.org/0009-0000-1429-3105 · github.com/JanSmolinski</div>
${exp}<h2>Publications</h2>${pubs}`;
fs.writeFileSync(process.argv[2],html);
