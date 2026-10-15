/* Agens vulgaris, the common agent, plus small helpers the page templates use. */
const AGENT_PARTS = `
<g class="arms"><path class="lim" d="M6.5 20 Q3 15 2.5 10"/><path class="lim" d="M25.5 20 Q29 15 29.5 10"/></g>
<path class="lim ant" d="M17 9.5 C17 6 19.5 4.5 22 3"/><circle class="tip" cx="22.6" cy="2.6" r="1.7"/>
<path class="b" d="M16 9 C23.5 9 27 15 27 21 C27 27 22.5 30.5 16 30.5 C9.5 30.5 5 27 5 21 C5 15 8.5 9 16 9Z"/>
<path class="hatch" d="M8 23.5 l3-3 M8.6 26.6 l4.4-4.4 M11.6 28.6 l3.4-3.4"/>
<g class="eyeg"><circle class="sclera" cx="19" cy="18" r="3.4"/><circle class="pupil" cx="19.9" cy="18.4" r="1.5"/></g>
<g class="legs"><path class="lim leg l" d="M12.5 29.5 L11.5 37 H9"/><path class="lim leg r" d="M19.5 29.5 L20.5 37 H23"/></g>`;
const AGENT = `<svg viewBox="0 0 32 40" aria-hidden="true">${AGENT_PARTS}</svg>`;

const agent = (cls = "", extra = "", tag = "span", attrs = "") =>
  `<${tag} class="agent ${cls}" ${attrs}>${AGENT}${extra}</${tag}>`;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/* A taped-in photo. Until the file exists it shows which file to add. */
const photo = ({ src, alt = "", cap = "", r = -1.5, ar = "4/5", w = "100%" }) =>
  `<figure class="photo" style="--r:${r}deg;--ar:${ar};--pw:${w}">
    <div class="frame"><img src="${src}" alt="${esc(alt)}" loading="lazy"
      onerror="const f=this.closest('.photo');f.classList.add('empty');this.parentElement.innerHTML='Photo to add<code>${src}</code>'"></div>
    ${cap ? `<figcaption>${cap}</figcaption>` : ""}
  </figure>`;

/* First page of a paper. Shows the real image if assets/papers/<slug>.png exists. */
const paperPage = (slug, title, authors) =>
  `<div class="paperpage" aria-hidden="true">
    <img src="assets/papers/${slug}.png" alt="" onerror="this.remove()">
    <div class="pt">${title}</div><div class="pa">${authors}</div>
    <i style="margin-top:6px"></i><i></i><i></i><i class="s"></i><i style="margin-top:4px"></i><i></i><i></i><i></i><i class="s"></i><i></i><i></i>
  </div>`;

/* A book or game on the shelf. Cover image if assets/covers/<slug>.jpg exists, else a drawn cover. */
const book = ({ slug, title, author = "", kind = "book", c, note = "", quip = "", tag = "" }) =>
  kind.startsWith("empty")
    ? `<button class="book ${kind}" data-note="" data-kind="${title}" data-quip="${esc(quip)}" aria-pressed="false"><div class="cover">+ ${title}</div></button>`
    : `<button class="book ${kind}" style="--c:${c}" data-note="${esc(note)}" data-quip="${esc(quip)}" data-title="${esc(title)}" aria-pressed="false">
        ${tag ? `<span class="tag-note">${tag}</span>` : ""}<div class="cover"><img src="assets/covers/${slug}.jpg" alt="" loading="lazy" onerror="this.remove()">
          <span class="a">${author}</span><span><span class="t">${title}</span><div class="rule"></div></span><span class="a">${{ game: "game", film: "film", music: "LP" }[kind.split(" ")[0]] || "vol."}</span></div>
      </button>`;

const postmark = (slug, name, place, year) =>
  `<div class="postmark"><div class="ring"><img src="assets/logos/${slug}.png" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'pm-text',innerHTML:'${[`<b>${name}</b>`, place, year].filter(Boolean).join("<br>")}'}))"></div><span>${name}${place ? `, ${place}` : ""} · ${year}</span></div>`;

const stamp = (txt, c = "--rust") => `<span class="stamp" style="--c:var(${c})">${txt}</span>`;
const holder = (flag, label = "", name = "An agent holding a flag") =>
  `<button class="holder" aria-label="${esc(name)}" data-quip="${esc(label)}"><span class="flag ${flag}">${flag === "f-en" ? "en" : ""}</span>${agent("", `<span class="bubble"></span>`)}</button>`;
