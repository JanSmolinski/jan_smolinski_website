/* Thoughts: dated posts, each with a cover assembled from agents. */
const THOUGHTS = [
  {
    slug: "agents-take-tasks-not-jobs",
    date: "2026-10-16",
    title: "Why agents will take your tasks but not your job",
    blurb: "A job is a bundle of tasks held together by a person. Agents are very good at the tasks. They are not yet good at the bundle.",
    cover: "human-question",
    body: `
      <p>Every few months someone publishes a list of the jobs AI is about to eat. The lists have one thing in common: they treat a job as one thing. It isn't. A job is a bundle of tasks, and a person is what holds the bundle together.</p>
      <p>Agents are getting very good at tasks. Draft the email, summarise the paper, code the survey, price the offer. In the simulations I run, agents negotiate, pitch and get interviewed perfectly well, one task at a time. What they don't do is decide which tasks matter this week, notice that a colleague is having a bad month, or take the blame when it goes wrong.</p>
      <h3>The bundle</h3>
      <p>Take a negotiator. The task is to trade concessions until there is a deal. The job is knowing which deal is worth having, who has to live with it afterwards, and when to walk away from the table altogether. The first part can be handed over. The second needs someone who will still be there next quarter.</p>
      <blockquote>Tasks can be delegated. Responsibility has to be held by someone.</blockquote>
      <h3>The question mark</h3>
      <p>So the honest answer to "will AI take my job?" is: it will take your tasks, and what is left will look different. The open question, the one on the cover, is who decides what the new bundle contains. I suspect that is where most of the interesting research is.</p>`,
    draft: true,
  },
];

const longDate = d => new Date(d + "T12:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const readMins = html => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

/* ---------- covers: pictures drawn by crowds of tiny agents ---------- */
const COVER_W = 800, COVER_H = 500;
const rng = seed => () => {
  seed = seed + 0x6D2B79F5 | 0;
  let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};

/* Fill a shape (drawn on a hidden canvas) with a hex grid of agent positions. */
function crowd(draw, rand, step = 15){
  const cv = document.createElement("canvas"); cv.width = COVER_W; cv.height = COVER_H;
  const g = cv.getContext("2d");
  g.fillStyle = g.strokeStyle = "#000"; g.lineCap = g.lineJoin = "round";
  draw(g);
  const d = g.getImageData(0, 0, COVER_W, COVER_H).data, pts = [];
  for (let r = 0, y = 12; y < COVER_H - 4; y += step * .9, r++)
    for (let x = 8 + (r % 2) * step / 2; x < COVER_W - 6; x += step){
      if (d[(Math.round(y) * COVER_W + Math.round(x)) * 4 + 3] > 128) pts.push([x + (rand() - .5) * 2.5, y + (rand() - .5) * 2.5]);
    }
  return pts;
}

const tiny = (p, rand, w = 17) => {
  const h = w * 1.25;
  return `<g transform="translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) rotate(${((rand() - .5) * 16).toFixed(1)}) scale(${(.92 + rand() * .2).toFixed(2)})"><use href="#ag" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" style="--d:${(rand() * 1.1).toFixed(2)}s"/></g>`;
};

const COVERS = {
  /* A person, and a question mark, both made of agents. */
  "human-question"(){
    const rand = rng(11), cx = 230, qx = 640;
    const human = crowd(g => {
      g.beginPath(); g.arc(cx, 92, 50, 0, 7); g.fill();
      g.lineWidth = 100; g.beginPath(); g.moveTo(cx, 205); g.lineTo(cx, 285); g.stroke();
      g.lineWidth = 34;
      for (const s of [-1, 1]){
        g.beginPath(); g.moveTo(cx + s * 52, 205); g.lineTo(cx + s * 92, 295); g.lineTo(cx + s * 100, 365); g.stroke();
      }
      g.lineWidth = 46;
      for (const s of [-1, 1]){ g.beginPath(); g.moveTo(cx + s * 27, 300); g.lineTo(cx + s * 29, 470); g.stroke(); }
    }, rand);
    const ques = crowd(g => {
      g.lineWidth = 78;
      g.beginPath(); g.arc(qx, 145, 72, Math.PI * 1.1, Math.PI * .5, false); g.lineTo(qx, 330); g.stroke();
      g.beginPath(); g.arc(qx, 452, 42, 0, 7); g.fill();
    }, rand);
    const strays = [392, 436, 480].map((x, i) =>
      `<g transform="translate(${x} ${i % 2 ? 462 : 464})"><use href="#ag" x="-14" y="-17" width="28" height="35"/></g>`).join("");
    const svg = `<svg class="cover-art" viewBox="0 0 ${COVER_W} ${COVER_H}" role="img" aria-label="A person and a question mark, each assembled from hundreds of tiny agents">
      <path class="ground" d="M30 495 H770"/>
      <g class="crowd human">${human.map(p => tiny(p, rand)).join("")}</g>
      <g class="crowd ques">${ques.map(p => tiny(p, rand)).join("")}</g>
      <g class="strays">${strays}</g>
    </svg>`;
    return { svg, cap: `Fig. 1 · <i>Homo sapiens</i>, assembled from ${human.length} agents. The question mark took ${ques.length}.` };
  },
};

const coverCache = {};
const coverOf = name => coverCache[name] || (coverCache[name] = COVERS[name]());

const coverFig = (t, size = "") => {
  const c = coverOf(t.cover);
  return `<figure class="photo tcover ${size}" style="--r:${size ? -.6 : -1.5}deg">
    <div class="frame">${c.svg}</div>
    <figcaption>${c.cap}</figcaption>
  </figure>`;
};

/* ---------- page templates ---------- */
const postMeta = t => `<time datetime="${t.date}">${longDate(t.date)}</time> · ${readMins(t.body)} min read`;

const thoughtsList = () => `
  <div class="kicker sc rise">p. 6 · Thoughts · newest first</div>
  <h2 class="rise" style="margin-top:10px">Thoughts</h2>
  <p class="lede rise">Strong views, loosely held, about AI agents, negotiation and organisations. Each one gets a cover, and each cover is made of agents.</p>
  <div class="posts">
    ${[...THOUGHTS].sort((a, b) => b.date.localeCompare(a.date)).map((t, i) => `
    <article class="post rise" style="--d:${.1 + i * .08}s">
      <a class="post-cover" href="#thoughts/${t.slug}" data-post="${t.slug}" aria-label="Read: ${esc(t.title)}">${coverFig(t)}</a>
      <div class="post-text">
        <div class="hand post-date">${longDate(t.date)}</div>
        <h3><a href="#thoughts/${t.slug}" data-post="${t.slug}">${t.title}</a></h3>
        <p>${t.blurb}</p>
        <a class="post-more" href="#thoughts/${t.slug}" data-post="${t.slug}">Read the entry →</a>
      </div>
    </article>`).join("")}
  </div>
  <button class="sleep rise" id="sleeper" aria-label="Wake the sleeping agent">${agent("asleep", `<span class="bubble"></span>`)}<span class="zz">z z z</span></button>
  <p class="note">Next entry is in draft. The agent in charge of publishing it is resting its eye.</p>
  ${colophon()}`;

const thoughtView = t => `
  <a class="back rise" href="#thoughts" data-post="">← All thoughts</a>
  <header class="post-head rise">
    <div class="kicker sc">${postMeta(t)}</div>
    <h1>${t.title}</h1>
  </header>
  <div class="rise" style="--d:.1s">${coverFig(t, "big")}</div>
  <div class="prose rise" style="--d:.18s">
    ${t.draft ? `<div class="hand draftnote">first draft, wording still being tuned</div>` : ""}
    ${t.body}
    <div class="endmark">${agent("", `<span class="bubble"></span>`, "button", `aria-label="An agent signing off"`)}<span class="sc">end of entry</span></div>
  </div>
  <a class="back" href="#thoughts" data-post="">← All thoughts</a>
  ${colophon()}`;
