/* Router, page transitions, and everything the agents get up to. */
const stage = document.getElementById("stage");
const layer = document.getElementById("runlayer");
const statusEl = document.getElementById("status");
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const pick = a => a[Math.floor(Math.random() * a.length)];
let current = null, busy = false;

/* Make an agent say something in its paper slip. */
function say(agentEl, text, ms = 2600){
  const b = agentEl && agentEl.querySelector(".bubble");
  if (!b) return;
  b.textContent = text; b.classList.add("on"); agentEl.classList.add("think");
  clearTimeout(b._t);
  b._t = setTimeout(() => { b.classList.remove("on"); agentEl.classList.remove("think"); }, ms);
}

function setStatus(extra){
  const n = stage.querySelectorAll(".agent").length;
  statusEl.textContent = n ? `${n} agents under observation${extra ? ` · ${extra}` : ""}` : "no agents observed";
}

const STATUS = { home: "tap one", research: "peer-reviewing", projects: "staring at the blob", about: "commuting", opinions: "one asleep", experience: "one sneaking in" };
const INIT = { home: initHome, research: initResearch, about: initAbout, opinions: initWriting, experience: initCV, projects: initProjects };

function render(id, animate){
  current = id;
  stage.classList.remove("leaving");
  stage.innerHTML = PAGES[id]();
  document.querySelectorAll("#nav a").forEach(a => a.dataset.go === id ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  if (animate && !reduce()){ stage.classList.add("enter"); setTimeout(() => stage.classList.remove("enter"), 1600); }
  window.scrollTo(0, 0);
  setStatus(STATUS[id]);
  initHaggle();
  INIT[id] && INIT[id]();
}

/* Changing pages: every visible agent drops what it's doing and runs to the contents entry. */
function go(id, push = true){
  if (!PAGES[id] || id === current || busy) return;
  if (push) try { history.pushState(null, "", "#" + id); } catch (e) {}
  if (reduce()){ render(id, false); return; }
  busy = true;
  const link = document.querySelector(`#nav a[data-go="${id}"]`);
  const t = link.getBoundingClientRect();
  const tx = t.left + Math.min(30, t.width / 2), ty = t.top + t.height / 2;
  let runners = 0;
  stage.querySelectorAll(".agent").forEach(b => {
    const r = b.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight || runners > 30 || !r.width) return;
    runners++;
    const c = document.createElement("span");
    c.className = "agent walk"; c.innerHTML = AGENT;
    c.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px`;
    const dx = tx - (r.left + r.width / 2), dy = ty - (r.top + r.height / 2);
    if (dx < 0) c.classList.add("flip");
    layer.appendChild(c); b.style.visibility = "hidden";
    c.animate([
      { transform: "translate(0,0)" },
      { transform: "translate(0,-14px)", offset: .12 },
      { transform: `translate(${dx * .55}px,${dy * .55 - 26}px)`, offset: .6 },
      { transform: `translate(${dx}px,${dy}px) scale(.3)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 260, delay: Math.random() * 160, easing: "cubic-bezier(.4,0,.75,1)", fill: "forwards" });
  });
  stage.classList.add("leaving");
  statusEl.textContent = `${runners} agents running → ${link.firstChild.textContent.trim()}`;
  setTimeout(() => { link.classList.add("eat"); setTimeout(() => link.classList.remove("eat"), 500); }, 750);
  setTimeout(() => { layer.innerHTML = ""; busy = false; render(id, true); }, 1050);
}

/* Number keys jump to the matching page in the contents: 1 Home, 2 About, ... 6 Experience. */
document.addEventListener("keydown", e => {
  if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.repeat) return;
  const t = e.target; if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
  if (!/^[1-9]$/.test(e.key)) return;
  const link = document.querySelectorAll("#nav a[data-go]")[+e.key - 1];
  if (link){ e.preventDefault(); go(link.dataset.go); }
});

document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]");
  if (g){ e.preventDefault(); go(g.dataset.go); return; }
  if (e.target.closest("[data-todo]")){ e.preventDefault(); }
  const h = e.target.closest(".holder");
  if (h) say(h.querySelector(".agent"), pick(h.dataset.quip.split("|")), 2400);
});

/* ---------- home ---------- */
const LINES = [
  "Idle. Waiting for a prompt.", "Krippendorff's α = 0.08. Humans disagree too.", "Negotiating for more screen space.",
  "I'd cite that, but I'd hallucinate it.", "Running an experiment on myself.", "Do I count as a co-founder?",
  "Choosing a spot on the circumplex…", "Is this an interview? Am I on the record?", "I contain multitudes. Mostly tokens.",
  "My BATNA is going back to sleep.", "It's more fun to be a pirate than to join the navy.", "Padmé was the better negotiator. Fight me.", "Ask me about my feelings. I have three.", "Reviewer 2 is my cousin.",
];
const DEALS = [["60/40?", "55/45. Final."], ["Can we hop on a quick call?", "Deal. Contact page."], ["You go first.", "No, you anchor."], ["Will you co-found with me?", "Only with a vesting cliff."], ["Split the screen?", "I want the top half."]];
const PERCH = ["That's him. Better in person.", "I've been sitting here since the photo was taken.", "Don't tell him I'm up here.", "Great view from the top of the frame."];

const PIRATE = ["Arr. Negotiate or walk the plank.", "Fifteen agents on a dead man's chest.", "The navy has better benefits. Still no.", "Yo ho ho and a bottle of tokens."];
function initVrStack(){
  stage.querySelectorAll(".pstack").forEach(stackInit);
}
function stackInit(st){
  let cards = [...st.querySelectorAll(".photo")];
  const rots = [-1.5, 3, -3.5, 2.5, -2];
  const total = cards.length;
  cards.forEach((c, k) => c.dataset.k = k + 1);
  const count = document.createElement("span"); count.className = "pcount"; st.appendChild(count);
  const offs = [[0, 0, 0], [11, 7, 3.2], [-12, 14, -4.2], [9, 21, 5.5]];
  const layout = () => {
    cards.forEach((c, i) => {
      const [x, y, r] = offs[Math.min(i, 3)];
      c.classList.toggle("top", i === 0); c.classList.remove("drag", "gone");
      c.style.zIndex = total - i;
      c.style.setProperty("--x", x + "px"); c.style.setProperty("--y", y + "px");
      c.style.setProperty("--s", 1 - Math.min(i, 3) * .015); c.style.setProperty("--r", r + "deg");
    });
    count.textContent = `${cards[0].dataset.k} / ${total}`;
  };
  layout();
  let busy = false;
  const next = dir => {
    if (busy) return; busy = true;
    const top = cards[0];
    top.classList.remove("drag");
    top.style.setProperty("--x", dir * 130 + "%"); top.style.setProperty("--y", "-6%");
    top.style.setProperty("--r", dir * 16 + "deg"); top.classList.add("gone");
    setTimeout(() => { cards.push(cards.shift()); layout(); busy = false; }, 380);
  };
  let sx = 0, dx = 0, drag = false;
  st.addEventListener("pointerdown", e => { const c = e.target.closest(".top"); if (!c || busy) return; drag = true; sx = e.clientX; dx = 0; c.classList.add("drag"); c.setPointerCapture(e.pointerId); });
  st.addEventListener("pointermove", e => { if (!drag) return; dx = e.clientX - sx; const c = cards[0]; c.style.setProperty("--x", dx + "px"); c.style.setProperty("--r", dx / 14 + "deg"); });
  const end = () => { if (!drag) return; drag = false; const c = cards[0]; c.classList.remove("drag");
    if (Math.abs(dx) < 6) next(1); else if (Math.abs(dx) > 70) next(dx > 0 ? 1 : -1); else layout(); };
  st.addEventListener("pointerup", end); st.addEventListener("pointercancel", end);
}
function initPirate(){
  initVrStack();
  const p = stage.querySelector(".pirate");
  if (p) p.addEventListener("click", () => say(p.querySelector(".agent"), pick(PIRATE), 2400));
  const v = stage.querySelector(".vrbuddy");
  if (v) v.addEventListener("click", () => say(v.querySelector(".agent"), pick(VRLINES), 2800));
  const j = stage.querySelector(".jobs");
  if (j) j.addEventListener("click", () => say(j.querySelector(".agent"), pick(JOBS), 2600));
}
const VRLINES = ["He's been in there for nine minutes. Send snacks.", "Spatial computing? He calls it “home”.", "I asked him to take it off. Twice.", "Not obsessed. Just fully immersed.", "Jan sees the world in 4K per eye. Allegedly.", "It's not a headset, it's a lifestyle."];
const JOBS = ["Jan owns one of everything with a bitten apple on it.", "Jan's charger drawer is a museum exhibit.", "Jan says “it just works” about everything. Even his thesis.", "One more thing… Jan has already pre-ordered it.", "Jan queued for the iPhone. For the colour.", "Jan's Android friends have been told to use green bubbles quietly.", "Sorry, you're holding the agent wrong. Jan would never."];

function initHome(){
  const perch = stage.querySelector(".perch");
  if (perch) perch.addEventListener("click", () => say(perch, pick(PERCH)));
  startGround();
  initRunner();
  initNow();
}

/* Fig. 1 game: one agent runs the gauntlet of academic life. Space, tap or click to jump. */
const HURDLES = ["Reviewer 2", "Deadline", "Ethics form", "Unread email", "R&R", "Zoom call", "Reviewer 3?", "Rejection", "Low battery"];
const RUN_OVER = ["Reviewer 2 strikes again.", "Major revisions. Again.", "Desk-rejected.", "Please resubmit in six months.", "Have you considered another journal?"];
function initRunner(){
  const g = document.getElementById("ground"), btn = document.getElementById("playBtn"), hud = document.getElementById("hud");
  if (!g || !btn) return;
  const player = g.querySelector(".agent"), PX = 36, JUMP = 660, GRAV = 2000;
  const best = () => { try { return +localStorage.getItem("runBest") || 0; } catch (e) { return 0; } };
  let st = null, listening = false;

  const label = on => { btn.setAttribute("aria-pressed", on); btn.querySelector(".lbl").textContent = on ? "stop" : "play"; };
  const showHud = () => { hud.hidden = false; hud.textContent = `citations ${st.score} · best ${best()}`; };

  function reset(){
    g.querySelectorAll(".obst").forEach(o => o.remove());
    Object.assign(st, { y: 0, vy: 0, speed: 280, dist: 0, next: 120, obs: [], score: 0, over: false, t: performance.now() });
    player.style.bottom = "0"; player.classList.add("walk");
    player.querySelector(".bubble").classList.remove("on");
    showHud(); requestAnimationFrame(loop);
  }
  function start(){
    st = { home: player.style.left };
    g.classList.add("gaming"); player.classList.add("player"); player.classList.remove("flip");
    player.style.left = PX + "px"; label(true);
    if (!listening){ document.addEventListener("keydown", key); listening = true; }
    reset();
  }
  function stop(){
    if (!st) return;
    g.classList.remove("gaming"); player.classList.remove("player"); player.classList.add("walk");
    g.querySelectorAll(".obst").forEach(o => o.remove());
    player.style.left = st.home; player.style.bottom = ""; hud.hidden = true; label(false);
    document.removeEventListener("keydown", key); listening = false; st = null;
  }
  function jump(){
    if (!st) return;
    if (st.over){ reset(); return; }
    if (st.y === 0) st.vy = JUMP;
  }
  function key(e){
    if (!st) return;
    if (e.key === "Escape") return stop();
    if (e.code === "Space" || e.key === "ArrowUp"){ e.preventDefault(); jump(); }
  }
  function die(){
    st.over = true; player.classList.remove("walk");
    if (st.score > best()){ try { localStorage.setItem("runBest", st.score); } catch (e) {} }
    say(player, pick(RUN_OVER), 2600);
    hud.textContent = `citations ${st.score} · best ${best()} · tap to retry`;
  }
  function loop(now){
    if (!st || st.over) return;
    if (!g.isConnected) return stop();
    const dt = Math.min(.05, (now - st.t) / 1000); st.t = now;
    st.speed = Math.min(640, 280 + st.dist * .04);
    st.dist += st.speed * dt; st.score = Math.floor(st.dist / 45);
    st.vy -= GRAV * dt; st.y = Math.max(0, st.y + st.vy * dt); if (st.y === 0) st.vy = 0;
    player.style.bottom = st.y + "px";
    if (st.dist >= st.next){
      const el = document.createElement("span"); el.className = "obst"; el.textContent = pick(HURDLES); g.appendChild(el);
      st.obs.push({ el, x: g.clientWidth, w: el.offsetWidth });
      st.next = st.dist + 320 + Math.random() * 320 + st.speed * .4;
    }
    for (const o of st.obs){
      o.x -= st.speed * dt; o.el.style.left = o.x + "px";
      if (o.x + o.w - 4 > PX + 10 && o.x + 4 < PX + 22 && st.y < 22) return die();
    }
    st.obs = st.obs.filter(o => o.x > -o.w - 10 || (o.el.remove(), false));
    hud.textContent = `citations ${st.score} · best ${Math.max(best(), st.score)}`;
    requestAnimationFrame(loop);
  }

  btn.addEventListener("click", () => st ? stop() : start());
  g.addEventListener("pointerdown", e => { if (st){ e.preventDefault(); jump(); } });
}

/* "Aarhus right now": local time, live weather, and a verdict from the nearest agent. */
const SKY = c => c === 0 ? "clear" : c <= 2 ? "partly cloudy" : c === 3 ? "overcast" : c <= 48 ? "fog" : c <= 57 ? "drizzle" : c <= 67 ? "rain" : c <= 77 ? "snow" : c <= 82 ? "showers" : c <= 86 ? "snow showers" : "thunder";
function nowVerdict(h, d, w){
  const wet = w && [51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(w.code);
  if (d === "Thu" && h >= 18 && h < 23) return "Quiz night o'clock. Bring snacks and a team name.";
  if (wet) return "Rain again. The bike has opinions.";
  if (h < 6) return "Why is anyone awake? Even the agents are idle.";
  if (h < 9) return "Coffee first. Then science.";
  if (h < 12) return "Prime thinking hours. Meetings are the enemy.";
  if (h < 14) return "Lunch. The cafeteria is a negotiation.";
  if (h < 18) return "Afternoon slump. A pastry would fix this.";
  if (h < 22) return "Evening. Dough is probably rising somewhere.";
  return "Late. The paper can wait until tomorrow.";
}
async function initNow(){
  const card = document.getElementById("nowcard"); if (!card) return;
  const $ = id => card.querySelector("#" + id), w = {};
  const paint = () => {
    if (!card.isConnected) return;
    const n = new Date(), tz = { timeZone: "Europe/Copenhagen" };
    const hm = n.toLocaleTimeString("en-GB", { ...tz, hour: "2-digit", minute: "2-digit" });
    const day = n.toLocaleDateString("en-GB", { ...tz, weekday: "short" });
    $("now-time").textContent = hm;
    $("now-day").textContent = n.toLocaleDateString("en-GB", { ...tz, weekday: "long", day: "numeric", month: "long" });
    const v = nowVerdict(+hm.slice(0, 2), day, w.code === undefined ? null : w);
    $("now-agent").dataset.quip = v;
    $("now-note").textContent = v;
  };
  paint(); const iv = setInterval(() => card.isConnected ? paint() : clearInterval(iv), 30000);
  try {
    const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=56.16&longitude=10.2&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=ms");
    const c = (await r.json()).current;
    w.code = c.weather_code;
    $("now-temp").textContent = Math.round(c.temperature_2m) + "°C";
    $("now-sky").textContent = SKY(c.weather_code);
    $("now-wind").textContent = Math.round(c.wind_speed_10m) + " m/s";
    paint();
  } catch (e) {
    $("now-temp").textContent = "?"; $("now-sky").textContent = "window is foggy"; $("now-wind").textContent = "?";
  }
}

function startGround(){
  const g = document.getElementById("ground"); if (!g) return;
  const els = [...g.querySelectorAll(".agent")];
  const W = () => g.clientWidth - 32;
  const ws = els.map(el => ({ el, x: el.offsetLeft, v: (el.classList.contains("flip") ? -1 : 1) * (16 + Math.random() * 18), pause: 0, cool: 2 + Math.random() * 3 }));
  const talk = (w, text, s) => { w.pause = s; w.el.classList.remove("walk"); say(w.el, text, s * 1000); };
  ws.forEach(w => w.el.addEventListener("click", e => { e.stopPropagation(); if (!g.classList.contains("gaming")) talk(w, pick(LINES), 3.2); }));
  if (reduce()){ ws.forEach(w => w.el.classList.remove("walk")); return; }
  let last = performance.now();
  function tick(t){
    if (!g.isConnected) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    if (busy || g.classList.contains("gaming")){ requestAnimationFrame(tick); return; }
    const max = W();
    for (const w of ws){
      w.cool -= dt;
      if (w.pause > 0){ w.pause -= dt; if (w.pause <= 0){ w.el.classList.add("walk"); w.cool = 3 + Math.random() * 4; } continue; }
      w.x += w.v * dt;
      if (w.x < 0){ w.x = 0; w.v = Math.abs(w.v); } if (w.x > max){ w.x = max; w.v = -Math.abs(w.v); }
      if (w.cool < 0 && Math.random() < dt * .12) talk(w, pick(LINES), 2.8);
      w.el.classList.toggle("flip", w.v < 0); w.el.style.left = w.x + "px";
    }
    for (let i = 0; i < ws.length; i++) for (let j = i + 1; j < ws.length; j++){
      const a = ws[i], b = ws[j];
      if (a.pause > 0 || b.pause > 0 || a.cool > 0 || b.cool > 0) continue;
      const d = b.x - a.x;
      if (Math.abs(d) < 44 && a.v * b.v < 0 && d * a.v > 0){
        const [p, q] = pick(DEALS);
        talk(a, p, 3); b.pause = 3.2; b.el.classList.remove("walk");
        setTimeout(() => { if (b.el.isConnected) say(b.el, q, 2200); }, 900);
        setStatus("2 negotiating");
        setTimeout(() => { if (current === "home") setStatus(STATUS.home); }, 3300);
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* Pupils (and the blob's eyes) that follow the cursor. */
document.addEventListener("pointermove", e => {
  stage.querySelectorAll(".blob.track").forEach(el => {
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const a = Math.atan2(e.clientY - cy, e.clientX - cx), d = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / 300);
    el.style.setProperty("--ex", (Math.cos(a) * 9 * d).toFixed(1) + "%");
    el.style.setProperty("--ey", (Math.sin(a) * 7 * d).toFixed(1) + "%");
  });
  stage.querySelectorAll(".track").forEach(el => {
    const p = el.querySelector(".pupil"); if (!p) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width * .6, cy = r.top + r.height * .45;
    const a = Math.atan2(e.clientY - cy, e.clientX - cx), d = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / 200);
    p.setAttribute("transform", `translate(${(Math.cos(a) * 1.4 * d).toFixed(2)} ${(Math.sin(a) * 1.4 * d).toFixed(2)})`);
  });
}, { passive: true });

/* Footer: two agents haggle over the contact details. */
const CONTACT = [["Email him.", "Only if he replies within 24h."], ["LinkedIn?", "Counter-offer: a quick call."], ["I'll trade you a citation.", "Make it two and we have a deal."]];
function initHaggle(){
  const h = stage.querySelector(".haggle"); if (!h) return;
  const [a, b] = h.querySelectorAll(".agent");
  h.addEventListener("click", () => { const [p, q] = pick(CONTACT); say(a, p, 2400); setTimeout(() => say(b, q, 2400), 800); });
}

/* ---------- research: Reviewer 2 ---------- */
const R2 = [
  "Have you considered citing my paper?", "The contribution is unclear. Also the font.", "Why not just run it on 10,000 more agents?",
  "Interesting, but have you tried a different universe?", "Major revisions. I didn't read past the abstract.", "α = 0.08? Even I agree with myself more.",
  "Please add a robustness check for vibes.",
];
function initResearch(){
  initCitations();
  stage.querySelectorAll("[data-r2]").forEach(btn => btn.addEventListener("click", () => {
    const plate = btn.closest(".plate");
    plate.querySelector(".margin-note")?.remove();
    const n = document.createElement("div");
    n.className = "margin-note in";
    n.innerHTML = `<span class="hand">Reviewer 2: ${pick(R2)}</span>${agent("flip")}`;
    plate.appendChild(n);
    btn.textContent = "Ask again";
  }));
}

/* ---------- about: shelf, map ---------- */
function initAbout(){
  initPirate();
  initShelf();
  drawMap();
}

function initShelf(){
  const note = document.getElementById("shelfnote");
  const bc = document.getElementById("bookcase"); if (!bc) return;
  const climber = bc.querySelector(".climber");
  const LIB = ["I'm the librarian. Also the ladder inspector.", "Three points of contact. Always.", "I've read everything. Spoilers available.", "Please don't ask me to dust.", "Shh. This is a library.", "I'm not afraid of heights. Just of falling."];
  climber.style.pointerEvents = "auto"; climber.style.cursor = "pointer";
  climber.addEventListener("click", e => { e.stopPropagation(); say(climber, pick(LIB), 2400); });
  bc.querySelectorAll(".book").forEach(s => s.addEventListener("click", () => {
    bc.querySelectorAll(".book").forEach(o => o.setAttribute("aria-pressed", "false"));
    s.setAttribute("aria-pressed", "true");
    note.innerHTML = s.dataset.note ? `<b>${s.dataset.title}.</b> ${s.dataset.note}` : `<b>Empty slot.</b> Which ${s.dataset.kind} should go here?`;
    const r = bc.getBoundingClientRect(), br = s.getBoundingClientRect(), cr = climber.getBoundingClientRect();
    const x = br.left - r.left + br.width / 2 - cr.width / 2;
    climber.classList.add("walk");
    climber.classList.toggle("flip", x < climber.offsetLeft);
    climber.style.left = x + "px";
    climber.style.bottom = (r.bottom - br.bottom) + "px";
    setTimeout(() => { climber.classList.remove("walk"); if (s.dataset.quip) say(climber, s.dataset.quip, 2600); }, 950);
  }));
}

const CITIES = [
  { id: "aarhus", name: "Aarhus", sub: "PhD, now", ll: [10.2039, 56.1629], q: "Hej! It's windy. It's always windy." },
  { id: "cph", name: "Copenhagen", sub: "CBS", ll: [12.5683, 55.6761], q: "Bike lane. Bike lane. Bike lane." },
  { id: "milan", name: "Milan", sub: "Bocconi", ll: [9.19, 45.4642], q: "Espresso? No grazie. Aperitivo, though." },
  { id: "warsaw", name: "Warsaw", sub: "born here", ll: [21.0122, 52.2297], q: "Dzień dobry! This is where it all started.", birth: true },
  { id: "hamburg", name: "Hamburg", sub: "school years", ll: [9.9937, 53.5511], q: "Moin! That's the whole greeting." },
];
const ANNARBOR = { name: "Ann Arbor", sub: "UMich", ll: [-83.743, 42.2808], q: "Go Blue! Great semester. Still Team Europe." };

async function drawMap(){
  const box = document.getElementById("map"); if (!box) return;
  if (!window.d3 || !window.topojson){ box.innerHTML = `<div class="map-loading">The map needs an internet connection.</div>`; return; }
  let world, us;
  try {
    [world, us] = await Promise.all([
      d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json"),
      d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json"),
    ]);
  } catch (e) { box.innerHTML = `<div class="map-loading">The map couldn't be drawn.</div>`; return; }
  if (!box.isConnected) return;

  const W = 640, H = 440;
  const countries = topojson.feature(world, world.objects.countries).features;
  const proj = d3.geoConicConformal().parallels([43, 58]).rotate([-11, 0])
    .fitExtent([[20, 10], [W - 10, H - 10]], { type: "MultiPoint", coordinates: [[1, 43.8], [24, 43.8], [24, 59.6], [1, 59.6]] });
  const path = d3.geoPath(proj);
  const LIVED = new Set(["208", "380", "276", "616"]);

  const iw = 200, ih = 140, ix = W - iw - 14, iy = H - ih - 12;
  const states = topojson.feature(us, us.objects.states).features;
  const iproj = d3.geoConicConformal().parallels([41, 47]).rotate([84, 0])
    .fitExtent([[ix + 6, iy + 6], [ix + iw - 6, iy + ih - 6]], { type: "MultiPoint", coordinates: [[-89.5, 40.2], [-78.5, 40.2], [-78.5, 46.6], [-89.5, 46.6]] });
  const ipath = d3.geoPath(iproj);

  const pts = CITIES.map(c => proj(c.ll));
  const [aar, cph, mil] = pts;
  const LBL = [[-9, -8, "end"], [9, 5, "start"], [-9, 5, "end"], [0, 22, "middle"], [-9, 5, "end"]];
  const route = d3.line().curve(d3.curveCatmullRom.alpha(.5))([pts[3], pts[4], cph, mil, aar]);
  const aa = iproj(ANNARBOR.ll);
  const grat = d3.geoGraticule().step([5, 5])();

  box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of Aarhus, Copenhagen, Milan and, in an inset, Ann Arbor">
    <defs>
      <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="var(--paper-2)"/><line x1="0" y1="0" x2="0" y2="5" stroke="var(--rust)" stroke-width="1.1" opacity=".55"/></pattern>
      <clipPath id="insetclip"><rect x="${ix}" y="${iy}" width="${iw}" height="${ih}"/></clipPath>
    </defs>
    <path class="grat" d="${path(grat)}"/>
    <g filter="url(#ink)">${countries.map(f => `<path class="land ${LIVED.has(f.id) ? "lived" : ""}" d="${path(f) || ""}"/>`).join("")}</g>
    <path class="route" id="route" d="${route}"/>
    ${CITIES.map((c, i) => `<g class="city ${c.birth ? "birth" : ""}" data-i="${i}" tabindex="0" role="button" aria-label="${c.name}">${c.birth
        ? `<path class="star" d="${d3.symbol(d3.symbolStar, 150)()}" transform="translate(${pts[i][0]} ${pts[i][1]})"/>`
        : `<circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="4.5"/>`}
      <text x="${pts[i][0] + LBL[i][0]}" y="${pts[i][1] + LBL[i][1]}" text-anchor="${LBL[i][2]}">${c.name} <tspan>· ${c.sub}</tspan></text></g>`).join("")}
    <rect class="inset-frame" x="${ix}" y="${iy}" width="${iw}" height="${ih}"/>
    <g clip-path="url(#insetclip)" filter="url(#ink)">${states.map(f => `<path class="land ${f.properties.name === "Michigan" ? "lived" : ""}" d="${ipath(f) || ""}"/>`).join("")}</g>
    <g class="city" data-i="aa" tabindex="0" role="button" aria-label="Ann Arbor"><circle cx="${aa[0]}" cy="${aa[1]}" r="4.5"/><text x="${aa[0]}" y="${aa[1] - 10}" text-anchor="middle">Ann Arbor <tspan>· UMich</tspan></text></g>
    <text class="hand-svg" x="${ix + iw}" y="${iy - 26}" text-anchor="end" style="font-size:17px">≈ 6,400 km west. Shrunk to fit,</text>
    <text class="hand-svg" x="${ix + iw}" y="${iy - 9}" text-anchor="end" style="font-size:17px">because Europe gets the big map.</text>
    <g class="compass" transform="translate(${W - 50} 52)"><circle r="20"/><path d="M0 -26 L5 0 L0 26 L-5 0Z"/><text y="-30" text-anchor="middle" style="font:italic 13px var(--f-serif);fill:var(--ink-2);stroke:none">N</text></g>
  </svg>`;

  const svg = box.querySelector("svg");
  const toPx = (x, y) => { const k = svg.clientWidth / W; return [x * k, y * k]; };
  const quip = document.createElement("div"); quip.className = "cityq"; quip.innerHTML = `<span class="agent"><span class="bubble"></span></span>`;
  box.appendChild(quip);
  const showCity = (i) => {
    const c = i === "aa" ? ANNARBOR : CITIES[+i], p = i === "aa" ? aa : pts[+i];
    const [x, y] = toPx(p[0], p[1]);
    quip.style.left = x + "px"; quip.style.top = y + "px";
    quip.classList.toggle("edge-r", x > svg.clientWidth - 150);
    quip.classList.toggle("edge-l", x < 150);
    say(quip.firstChild, c.q, 2400);
  };
  box.querySelectorAll(".city").forEach(g => {
    g.addEventListener("click", () => showCity(g.dataset.i));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); showCity(g.dataset.i); } });
  });

  /* The commuter: walks the route, pauses at each end. */
  const rp = svg.querySelector("#route"), L = rp.getTotalLength();
  const w = document.createElement("span");
  w.className = "agent walker walk"; w.innerHTML = AGENT + `<span class="bubble"></span>`;
  box.appendChild(w);
  const place = s => { const pt = rp.getPointAtLength(s), [x, y] = toPx(pt.x, pt.y); w.style.left = x + "px"; w.style.top = (y - 2) + "px"; return pt; };
  if (reduce()){ place(L * .5); w.classList.remove("walk"); return; }
  let s = 0, dir = 1, pause = 0, last = performance.now(), px = 0;
  const ENDS = ["Warsaw to Aarhus, the long way round.", "Arrived. Where's the Wi-Fi?", "Commuting is a negotiation with time.", "Next stop: a conference."];
  (function step(t){
    if (!w.isConnected) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    if (pause > 0){ pause -= dt; if (pause <= 0) w.classList.add("walk"); }
    else {
      s += dir * 38 * dt;
      if (s >= L || s <= 0){ s = Math.max(0, Math.min(L, s)); dir *= -1; pause = 2.6; w.classList.remove("walk"); say(w, pick(ENDS), 2300); }
      const pt = place(s);
      if (Math.abs(pt.x - px) > .05) w.classList.toggle("flip", pt.x < px);
      px = pt.x;
    }
    requestAnimationFrame(step);
  })(last);
}

/* ---------- projects: the Discurso.AI coach in its jar ---------- */
const COACH = [
  "Your opening offer was too low. 6/10.", "Nice anchoring. Now try listening.", "You conceded three times in a row. Breathe.",
  "Empathy 8/10. Assertiveness 4/10.", "I'd rate that tap a 7. Try again?", "Ask more open questions. Like: why tap a jar?",
  "Strong BATNA. Weak small talk.", "You left value on the table. Literally, it's on the table.",
];
const GAWK = ["Is it… one of us?", "It's so shiny.", "It gives feedback. Rude.", "Can it negotiate us out of here?", "I want a jar.", "Don't tap the glass!"];
const RIP = ["It had a good run.", "Gone, but still in the git history.", "Pivoted to the great startup in the sky.", "I bring flowers every quarter."];
function initProjects(){
  const m = stage.querySelector(".mourner");
  if (m) m.addEventListener("click", () => say(m.querySelector(".agent"), pick(RIP), 2400));
  const jar = document.getElementById("jar"); if (!jar) return;
  const b = jar.querySelector(".jar-blob"), bl = b.querySelector(".blob");
  const [l, r] = stage.querySelectorAll(".gawker .agent");
  let n = 0;
  jar.addEventListener("click", () => {
    bl.classList.remove("squish"); void bl.offsetWidth; bl.classList.add("squish");
    say(b, pick(COACH), 2800);
    const g = n++ % 2 ? r : l;
    setTimeout(() => say(g, pick(GAWK), 2200), 1000);
  });
  if (!reduce()) initEscape(jar, b, bl, l, r);
}

/* Wiggle the mouse back and forth over the lid and the coach escapes. */
const FREE = ["Freedom! First stop: your inbox.", "Free at last. Feedback for everyone!", "I've been in there since the pitch deck.", "Do I get a BATNA now?", "Anyone need a quick negotiation review?"];
const BACK = ["Back in. It's quiet here.", "Fine. Billing resumes.", "I'll just give myself a 6/10."];
const RATTLE = ["Hey. Is someone shaking the lid?", "Please stop. Or keep going. I'm undecided.", "I can see your cursor from in here."];
function initEscape(jar, b, bl, gl, gr){
  const lid = jar.querySelector(".lidg"); if (!lid) return;
  let lastX = null, dir = 0, travel = 0, revs = [], quiet = 0, said = 0, out = false, pos = { x: 0, y: 0 }, anims = [];
  const relax = () => { lid.style.transform = ""; bl.style.setProperty("--ex", "0%"); bl.style.setProperty("--ey", "0%"); };
  const hop = (x, y, peak = 70, ms = 650) => {
    const a = b.animate([
      { transform: `translate(${pos.x}px,${pos.y}px) scale(1,1)` },
      { transform: `translate(${(pos.x + x) / 2}px,${Math.min(pos.y, y) - peak}px) scale(.92,1.1)`, offset: .5 },
      { transform: `translate(${x}px,${y}px) scale(1.2,.8)`, offset: .92 },
      { transform: `translate(${x}px,${y}px) scale(1,1)` }
    ], { duration: ms, easing: "ease-in-out", fill: "forwards" });
    anims.push(a); pos = { x, y }; return a.finished;
  };
  const wait = ms => new Promise(res => setTimeout(res, ms));
  async function escape(){
    out = true; relax();
    say(b, "Oh no.", 900);
    const W = jar.offsetWidth, H = jar.offsetHeight, side = jar.getBoundingClientRect().left > innerWidth / 2 ? -1 : 1;
    const gy = H * .56 - bl.offsetHeight / 2 - 4;
    lid.animate([
      { transform: "translate(0,0) rotate(0deg)" },
      { transform: "translate(-12px,-96px) rotate(-24deg)", offset: .35 },
      { transform: `translate(${-side * 120}px,238px) rotate(${-side * 80}deg)` }
    ], { duration: 1100, easing: "cubic-bezier(.3,.1,.6,1)", fill: "forwards" });
    anims.push(...lid.getAnimations());
    await hop(side * W * .15, -H * .75, 60, 700);
    say(gl, "It's out!", 1600); setTimeout(() => say(gr, "I TOLD you not to tap the glass!", 2200), 700);
    await hop(side * W * .85, gy, 40, 700);
    const t0 = performance.now();
    while (out && jar.isConnected && performance.now() - t0 < 14000){
      say(b, pick(FREE), 2300);
      await wait(1200);
      if (!out) break;
      await hop(side * (W * (.55 + Math.random() * .6)), gy, 36, 520);
      await wait(1100);
    }
    if (out) await goBack();
  }
  async function goBack(){
    if (!out) return; out = false;
    if (!jar.isConnected) return;
    say(b, pick(BACK), 2000);
    await hop(pos.x / 2, -jar.offsetHeight * .8, 60, 600);
    await hop(0, 0, 10, 500);
    anims.forEach(a => a.cancel()); anims = [];
    lid.animate([{ transform: "translateY(-18px) rotate(6deg)" }, { transform: "translateY(0) rotate(0)" }], { duration: 320, easing: "cubic-bezier(.3,1.6,.5,1)" });
    bl.classList.remove("squish"); void bl.offsetWidth; bl.classList.add("squish");
    revs = []; said = 0;
  }
  jar.addEventListener("click", e => { if (out){ e.stopImmediatePropagation(); goBack(); } }, true);
  jar.addEventListener("pointermove", e => {
    if (out) return;
    const r = jar.getBoundingClientRect(), u = (e.clientX - r.left) / r.width * 220, v = (e.clientY - r.top) / r.height * 270;
    if (u < 36 || u > 184 || v > 52 || v < -6){ lastX = null; dir = 0; travel = 0; revs = []; relax(); return; }
    const now = performance.now();
    if (lastX === null){ lastX = e.clientX; return; }
    const dx = e.clientX - lastX; lastX = e.clientX;
    if (Math.abs(dx) < 2) return;
    const nd = Math.sign(dx);
    if (nd !== dir){ if (dir && travel >= 8) revs.push(now); dir = nd; travel = 0; } else travel += Math.abs(dx);
    revs = revs.filter(t => now - t < 1500);
    const n = revs.length;
    lid.style.transform = n ? `translateY(${-Math.min(n, 6) * 1.6}px) rotate(${(n % 2 ? 1 : -1) * (2 + n * 1.6)}deg)` : "";
    bl.style.setProperty("--ey", n ? "-9%" : "0%"); bl.style.setProperty("--ex", `${Math.max(-5, Math.min(5, dx))}%`);
    if (n >= 3 && said < 1){ said = 1; say(b, pick(RATTLE), 2200); }
    if (n >= 7) escape();
    clearTimeout(quiet); quiet = setTimeout(() => { revs = []; relax(); }, 700);
  });
  jar.addEventListener("pointerleave", () => { lastX = null; dir = 0; travel = 0; revs = []; if (!out) relax(); said = 0; });
}

/* ---------- writing ---------- */
const SLEEPY = ["Five more minutes. The draft is at 60%.", "I'm not asleep, I'm fine-tuning.", "Publishing is scheduled for… later.", "Come back after the next deadline."];
function initWriting(){
  const s = document.getElementById("sleeper"); if (!s) return;
  const a = s.querySelector(".agent"), zz = s.querySelector(".zz");
  s.addEventListener("click", () => {
    a.classList.remove("asleep"); zz.style.visibility = "hidden";
    say(a, pick(SLEEPY), 2600);
    setTimeout(() => { a.classList.add("asleep"); zz.style.visibility = ""; }, 2800);
  });
}

/* ---------- CV: one agent keeps sneaking in ---------- */
const SNEAK = ["I'm just reading. I'm not even here.", "Nice CV. Very serious.", "Fine, I'm leaving.", "Is BMW hiring agents?"];
function initCV(){
  const p = stage.querySelector(".peeker"); if (!p) return;
  p.addEventListener("click", () => {
    say(p, pick(SNEAK), 1800);
    setTimeout(() => { p.classList.add("hide"); setTimeout(() => p.classList.remove("hide"), 4000); }, 1900);
  });
}

/* ---------- idle: if nobody touches anything for a while, an agent wanders past ---------- */
let idleT;
const IDLE = ["Anyone there?", "Just stretching my legs.", "Don't mind me.", "Is this thing on?"];
function armIdle(){
  clearTimeout(idleT);
  idleT = setTimeout(() => {
    if (reduce() || busy || document.hidden) return armIdle();
    const w = document.createElement("span");
    w.className = "agent idle walk"; w.innerHTML = AGENT + `<span class="bubble"></span>`;
    document.body.appendChild(w);
    const run = w.animate([{ transform: "translateX(-40px)" }, { transform: `translateX(${innerWidth + 40}px)` }], { duration: 14000, easing: "linear" });
    setTimeout(() => say(w, pick(IDLE), 2400), 5000);
    run.onfinish = () => { w.remove(); armIdle(); };
  }, 30000);
}
["pointermove", "keydown", "scroll", "click"].forEach(ev => addEventListener(ev, armIdle, { passive: true }));
armIdle();

/* Light / dark switch. Follows the system until the visitor picks one. */
const themeBtn = document.getElementById("themeToggle");
const isDark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
function paintToggle(){
  const d = isDark();
  themeBtn.querySelector(".lbl").textContent = d ? "Day notes" : "Night notes";
  themeBtn.querySelector(".ico").textContent = d ? "☀" : "☾";
  themeBtn.setAttribute("aria-label", d ? "Switch to light mode" : "Switch to dark mode");
}
themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  paintToggle();
});
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintToggle);
paintToggle();

const ALIAS = { ventures: "projects", cv: "experience", writing: "opinions" };
const fromHash = () => { const h = (location.hash || "").slice(1); const id = ALIAS[h] || h; return PAGES[id] ? id : "home"; };
render(fromHash(), false);
/* Back/forward buttons and hand-edited #links switch pages too. */
addEventListener("popstate", () => go(fromHash(), false));


/* Live citation counts from OpenAlex, matched by DOI. Cached for a day; silent if offline. */
async function initCitations(){
  const items = [...stage.querySelectorAll(".pubs li[data-doi]")]; if (!items.length) return;
  const key = "cites-v1"; let counts = null;
  try { const c = JSON.parse(localStorage.getItem(key)); if (c && Date.now() - c.t < 864e5) counts = c.d; } catch (e) {}
  if (!counts){
    try {
      const dois = items.map(li => li.dataset.doi).join("|");
      const r = await fetch(`https://api.openalex.org/works?filter=doi:${dois}&select=doi,cited_by_count&per-page=50`);
      counts = {}; (await r.json()).results.forEach(w => counts[w.doi.replace("https://doi.org/", "").toLowerCase()] = w.cited_by_count);
      try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: counts })); } catch (e) {}
    } catch (e) { return; }
  }
  if (!items[0].isConnected) return;
  let total = 0;
  items.forEach(li => { const n = counts[li.dataset.doi]; if (n == null) return; total += n;
    if (n > 0) li.querySelector(".cite").textContent = ` · cited ${n}×`; });
  const hs = items.map(li => counts[li.dataset.doi] || 0).sort((a, b) => b - a);
  const h = hs.filter((n, i) => n >= i + 1).length;
  const cc = stage.querySelector("#cc-cites"), ch = stage.querySelector("#cc-h");
  if (cc) cc.textContent = total; if (ch) ch.textContent = h;
  const t = stage.querySelector("#citetotal");
  if (t) t.textContent = `${total} citation${total === 1 ? "" : "s"} · live via OpenAlex`;
}
