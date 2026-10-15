/* Page content. Each entry returns the HTML for one page. */
const EMAIL = "jan.smolinski@mgmt.au.dk";
const LINKS = [
  [`mailto:${EMAIL}`, "Email"],
  ["https://www.linkedin.com/in/jansmolinski/", "LinkedIn"],
  ["https://www.researchgate.net/profile/Jan-Smolinski-3", "ResearchGate"],
  ["https://orcid.org/0009-0000-1429-3105", "ORCID"],
  ["https://github.com/JanSmolinski", "GitHub"],
].map(([h, t]) => `<a href="${h}"${h.startsWith("http") ? ` target="_blank" rel="noopener"` : ""}>${t}</a>`).join(" · ");

/* The Discurso.AI coach: a glossy blob, a different species from the ink agents. */
const blob = (cls = "") => `<span class="blob ${cls}" aria-hidden="true"><i></i><i></i></span>`;

const PUBLISHED = [
  // [year, title, venue, kind, authors, doi]
  ["2026", "Ethical guidelines for designing, developing, and deploying AI negotiation agents", "Group Decision and Negotiation", "Journal article", "Kesting, Smolinski R., Kröcher, Smolinski J.", "10.1007/s10726-026-10011-2"],
  ["2025", "Jesus Christ: the ultimate servant leader", "Negotiators who Changed the World, Springer Nature", "Book chapter", "Smolinski J., Smolinski R.", "10.1007/978-3-031-90367-0_2"],
  ["2025", "Uncharted waters for OpenSea: balancing sustainability and trust in the crypto space", "The Case Centre, CBS Free Case Collection", "Teaching case", "Smolinski J., Singh", "https://www.thecasecentre.org/products/view?id=207560"],
  ["2024", "Navigating the digital frontier: emerging trends in digital innovation management for 2023 and beyond", "International Journal of Innovation and Technology Management, 21(04)", "Journal article", "Smolinski J.", "10.1142/s0219877024500329"],
  ["2024", "Leaders as negotiators: Padmé vs. Palpatine", "Star Wars and Conflict Resolution II, DRI Press", "Book chapter", "Smolinski J., Smolinski R.", "https://www.amazon.com/dp/1734956216"],
  ["2024", "Neue Horizonte im Innovationsmanagement – Forschungsimpulse für die Praxis", "Springer Nature, in German", "Book chapter", "Smolinski J., Smolinski R.", "10.1007/978-3-658-44894-3_1"],
  ["2024", "Nachhaltiges Innovationsmanagement: Ideen aus Theorie und Praxis für langfristigen Erfolg", "Springer Nature, in German", "Book chapter", "Smolinski R., Smolinski J., Warecka Z.", "10.1007/978-3-658-44894-3_15"],
];
const pubTitle = p => p[5] ? `<a href="${p[5].startsWith("http") ? p[5] : "https://doi.org/" + p[5]}" target="_blank" rel="noopener">${p[1]}</a>` : p[1];


/* Simple one-line city sketches for the conference stamps. */
const CITY = {
  vienna: `<g opacity=".4"><circle cx="112" cy="48" r="23"/><circle cx="112" cy="48" r="2"/><path d="M112 48 L135.0 48.0 M112 48 L131.9 59.5 M112 48 L123.5 67.9 M112 48 L112.0 71.0 M112 48 L100.5 67.9 M112 48 L92.1 59.5 M112 48 L89.0 48.0 M112 48 L92.1 36.5 M112 48 L100.5 28.1 M112 48 L112.0 25.0 M112 48 L123.5 28.1 M112 48 L131.9 36.5"/><path d="M104 80 L112 50 L120 80"/></g><path d="M6 80 H134"/><path d="M26 46 L33 8 L40 46"/><path d="M33 3 V8 M31 5.5 H35" class="a"/><path d="M30 24 H36 M28.6 34 H37.4 M33 8 V46" opacity=".6"/><path d="M26 46 V80 H40 V46"/><path d="M30 56 V50 Q33 46 36 50 V56 M30 70 V62 Q33 58 36 62 V70"/><path d="M40 62 L48 46 H96 L106 62 V80 H40"/><path d="M44 58 L51 49 L58 58 L65 49 L72 58 L79 49 L86 58 L93 49 L102 58" /><path d="M48 76 V68 Q52 63 56 68 V76 M62 76 V68 Q66 63 70 68 V76 M76 76 V68 Q80 63 84 68 V76 M90 76 V68 Q94 63 98 68 V76" opacity=".7"/>`,
  paris: `<path d="M6 80 H134"/><path d="M70 3 V15"/><path d="M68.2 15 C67.5 34 62 56 51 80 M71.8 15 C72.5 34 78 56 89 80"/><path d="M68.2 15 H71.8"/><path d="M66.8 26 H73.2 M66.6 27.6 H73.4"/><path d="M63.4 41 H76.6 M63 43 H77"/><path d="M57 58 H83 M56.2 60.2 H83.8"/><path d="M66.8 26 L73 41 M73.2 26 L66.8 41 M63.4 43 L76.6 58 M76.6 43 L63.4 58 M56.5 60 L70 78 M83.5 60 L70 78" opacity=".75"/><path d="M58.5 80 C60 64 80 64 81.5 80"/><path d="M62 80 C63 70 77 70 78 80" opacity=".6"/><path class="a" d="M70 3 l7 2.5 l-7 2.5"/><path d="M16 80 V68 H34 V80 M18 68 V64 H32 V68 M104 80 V70 H124 V80 M107 70 V66 H121 V70" opacity=".55"/><path d="M12 44 q3 -3 6 0 q3 -3 6 0 M112 30 q3 -3 6 0 q3 -3 6 0" opacity=".5"/>`,
  online: `<path d="M20 70 H120 L112 62 H28 Z"/><rect x="30" y="16" width="80" height="46" rx="3"/><path d="M70 18 V60 M32 39 H108" opacity=".5"/><circle cx="50" cy="26" r="4.2"/><path d="M42 37 Q50 28 58 37"/><circle cx="90" cy="26" r="4.2"/><path d="M82 37 Q90 28 98 37"/><circle cx="50" cy="49" r="4.2"/><path d="M42 60 Q50 51 58 60"/><circle cx="90" cy="49" r="4.2"/><path d="M82 60 Q90 51 98 60"/><circle class="a" cx="103" cy="22" r="1.8"/>`,
  capetown: `<path d="M4 80 H136" opacity="0"/><path d="M2 76 C8 66 12 54 26 48 C32 45 36 48 38 52"/><path d="M30 76 L42 40 H110 L130 76"/><path d="M50 40 L46 76 M62 40 L60 76 M76 40 L76 76 M90 40 L94 76 M102 40 L110 76" opacity=".35"/><path class="a" d="M38 40 q6 -10 16 -6 q8 -10 20 -4 q12 -8 22 2 q10 -2 14 8"/><path class="a" d="M50 40 v5 M68 38 v9 M88 40 v7 M104 40 v4"/><path d="M2 82 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" opacity=".6"/><ellipse cx="116" cy="74" rx="5" ry="8"/><path d="M111.5 72 q-4 2 -5 6 M120.5 72 q4 2 5 6"/><path class="a" d="M116 66 l3 -1.4 l-3 -1 Z"/><circle cx="114.6" cy="69" r=".7"/><path d="M112 82 h3 M117 82 h3"/>`,
  milan: `<path d="M6 80 H134"/><path d="M18 80 V46 L70 26 L122 46 V80"/><path d="M21.8 44.7 L24 28.7 L26.2 44.7 M24 28.7 V24.7 M24 44.7 V80 M35.8 39.3 L38 23.3 L40.2 39.3 M38 23.3 V19.3 M38 39.3 V80 M49.8 33.9 L52 17.9 L54.2 33.9 M52 17.9 V13.9 M52 33.9 V80 M85.8 33.9 L88 17.9 L90.2 33.9 M88 17.9 V13.9 M88 33.9 V80 M99.8 39.3 L102 23.3 L104.2 39.3 M102 23.3 V19.3 M102 39.3 V80 M113.8 44.7 L116 28.7 L118.2 44.7 M116 28.7 V24.7 M116 44.7 V80 "/><path d="M70 26 V6 M67.5 26 L70 10 L72.5 26 M68.5 14 H71.5"/><circle class="a" cx="70" cy="4" r="1.6"/><path d="M60 80 V62 Q70 46 80 62 V80 M65 80 V64 Q70 54 75 64 V80"/><path d="M28 70 V62 Q31 57 34 62 V70 M42 70 V62 Q45 57 48 62 V70 M92 70 V62 Q95 57 98 62 V70 M106 70 V62 Q109 57 112 62 V70"/><path d="M22 52 H118" opacity=".5"/><path d="M122 80 h6 M12 80 h-6" opacity="0"/>`,
};
const CITY_STAMPS = [
  { art: "vienna", slug: "iacm-2026", name: "IACM", place: "Vienna", year: "2026", quips: "Vienna: where every negotiation comes with cake.|I came for the Riesenrad. Stayed for the Sachertorte.|Waltzing into a distributive bargain." },
  { art: "paris", slug: "intra-2026", name: "INTRA", place: "Paris", year: "2026", quips: "The Eiffel Tower is a very tall BATNA.|In Paris everything is negotiable. Except the queue.|Croissant first, concessions later." },
  { art: "online", slug: "ai-negotiation-forum-2026", name: "AI Negotiation Forum", place: "Online", year: "2026", quips: "Online: the only city with perfect wifi. Allegedly.|You're on mute. You were always on mute.|Commute: four steps." },
  { art: "capetown", slug: "intra-2025", name: "INTRA", place: "Cape Town", year: "2025", quips: "Table Mountain has the flattest ask I've ever seen.|That cloud on top is just anchoring.|Best view of any conference. No contest." },
  { art: "milan", slug: "edtech-forum-2025", name: "EdTech Forum", place: "Milan", year: "2025", quips: "Aperitivo is the real negotiation table.|The Duomo has thousands of statues. Zero agents. Yet.|Espresso for everyone except Jan." },
];
const cityStamp = c => `<div class="citycard">
  <svg class="city" viewBox="0 0 140 90" aria-hidden="true">${CITY[c.art]}</svg>
  ${postmark(c.slug, c.name, c.place, c.year)}
  <button class="holder cityagent" aria-label="An agent with a comment about ${c.place}" data-quip="${esc(c.quips)}">${agent("", `<span class="bubble"></span>`)}</button>
</div>`;

const EXPERIENCE = {
  Work: [
    ["2026 – 2029", "PhD fellow, Aarhus University", "Department of Management, School of Business and Social Sciences. Researching AI agents in entrepreneurship and negotiation.", "now"],
    ["2024 – now", "Co-founder, Discurso.AI", "AI negotiation training and assessment, used at universities in Europe, Australia and South America.", "now"],
    ["Apr – Aug 2024", "Co-founder, Languee", "An AI voice tutor that taught professionals foreign languages through spoken workplace conversations. Copenhagen."],
    ["2024", "Research assistant, Ludwig Boltzmann Gesellschaft", "Jan – Dec 2024."],
    ["2024", "Innovation intern, BMW Group", "May – Aug 2024."],
    ["2023 – 2024", "(Vice) President, CBS Students", "Copenhagen Business School's student organisation."],
    ["2022 – 2023", "Partnerships strategy analyst, Pleo", "Student worker."],
    ["2021 – 2022", "Student assistant, European Energy", "Commercial asset management."],
    ["2020 – 2021", "Business and product development assistant, Ruuky", ""],
    ["school years", "Network administrator, my high school in Hamburg", "Kept the school's hardware, software and network running. Where the interest in technology began."],
  ],
  Education: [
    ["2026 – 2029", "PhD, Department of Management", "Aarhus University. See above."],
    ["2023 – 2025", "Double MSc, Bocconi University and Copenhagen Business School", "Economics and Management of Innovation and Technology (Bocconi) · Managing Innovation and Business Development (CBS)."],
    ["2022", "Exchange semester, University of Michigan", "Ann Arbor, Aug – Dec 2022."],
    ["2020 – 2023", "BSc Business Administration and Digital Management", "Copenhagen Business School. Valedictorian."],
  ],
  "Student life": [
    ["2023 – 2024", "Head of Events, CBS Motors", ""],
    ["2021 – 2023", "Head of Partnerships, CBS Fintech", ""],
    ["2020 – 2022", "Quality Board President, Study Board member and intro guide", "Copenhagen Business School."],
    ["2020 – 2023", "Graduation planning team and student union", "Copenhagen Business School."],
  ],
};
const colophon = () => `
  <footer class="colophon">
    <div class="invite"><h3>Let's work on something</h3>
      <p>If you're working on AI agents, negotiation or entrepreneurship, as a researcher, a founder or a company trying agents out, I'd love to hear from you. <a href="mailto:${EMAIL}">Write me</a>.</p></div>
    <div class="colophon-row">
      <div>Jan Smolinski · Aarhus University<br>${LINKS}</div>
      <button class="haggle" aria-label="Two agents negotiating over the contact details">
        ${agent("", `<span class="bubble"></span>`)}${agent("flip", `<span class="bubble"></span>`)}
      </button>
    </div>
  </footer>`;

const anatomy = () => {
  const parts = AGENT_PARTS.replace(/<g class="arms">.*?<\/g>/s, "");
  const lab = (n, x, y, anchor, l1, l2, line) => `<g class="part">
      <path class="lead" d="${line}"/><circle class="lead-dot" cx="${line.split(" ").slice(-2)[0].replace(/[A-Z]/g, "")}" cy="${line.split(" ").slice(-1)[0]}" r="1.6"/>
      <text class="lbl" x="${x}" y="${y}" text-anchor="${anchor}"><tspan class="n">${n}</tspan> ${l1}<tspan x="${x}" dy="16">${l2}</tspan></text></g>`;
  return `<div class="anatomy rise" style="--d:.12s">
    <span class="plate-no sc">Plate I</span>
    <svg viewBox="0 0 480 300" role="img" aria-label="Annotated drawing of an agent">
      <g class="big track" transform="translate(157 48) scale(5.2)">${parts}</g>
      ${lab(1, 335, 40, "start", "Antenna.", "Listens for offers.", "M330 44 L274 61")}
      ${lab(2, 345, 130, "start", "Eye.", "Sees only the prompt.", "M340 134 L262 141")}
      ${lab(3, 120, 70, "end", "Shell.", "Mostly confidence.", "M125 74 L222 98")}
      ${lab(4, 120, 172, "end", "Hatching.", "Added for gravitas.", "M125 176 L205 176")}
      ${lab(5, 120, 250, "end", "Legs.", "Not load-bearing.", "M125 254 L214 236")}
      ${lab(6, 335, 250, "start", "Feet.", "Point toward the deal.", "M330 254 L282 240")}
    </svg>
    <div class="latin"><b>Agens vulgaris</b>, the common agent</div>
  </div>`;
};

const SHELF = [
  { label: "Books", items: [
    { slug: "capital", title: "Capital, Vol. 1", author: "Marx", c: "#8A2F2A", tag: "currently reading", note: "Reading it the slow way.", quip: "Surplus value? I work for free." },
    { slug: "zarathustra", title: "Thus Spoke Zarathustra", author: "Nietzsche", c: "#4A5A6A", note: "Down from the mountain, one parable at a time.", quip: "God is dead. My inbox is not." },
    { slug: "mans-search-for-meaning", title: "Man's Search for Meaning", author: "Frankl", c: "#1A1A1A", note: "Short, and not easy to put down.", quip: "Meaning found. Now I just need a calendar." },
    { slug: "monte-cristo", title: "The Count of Monte Cristo", author: "Dumas", c: "#1D2A3A", note: "Patience, planning and a very strong BATNA.", quip: "All human wisdom is contained in these words: wait and hope." },
    { slug: "siddhartha", title: "Siddhartha", author: "Hesse", c: "#2A3A8A", note: "A long walk to the river.", quip: "The river gives no feedback. Disappointing." },
    { slug: "epictetus", title: "Discourses", author: "Epictetus", c: "#1D2A3A", note: "Control what you can. Ignore the reviewers.", quip: "Dichotomy of control: I control the draft, not Reviewer 2." },
    { slug: "around-the-world-in-80-days", title: "Around the World in 80 Days", author: "Verne", c: "#3A2A7A", note: "Eighty days, one wager, and zero travel insurance.", quip: "Phileas Fogg never once checked the exchange rate." },
    { slug: "getting-to-yes", title: "Getting to Yes", author: "Fisher & Ury", c: "#C8283A", note: "The negotiation classic. Principled, patient, still relevant.", quip: "Separate the people from the problem. Then still take it personally." },
    { slug: "crime-and-punishment", title: "Crime and Punishment", author: "Dostoevsky", c: "#5A2A6A", note: "Long, dark, and very good.", quip: "Raskolnikov skipped the part where you talk it out first." },
    { title: "book", kind: "empty", quip: "Another book goes here." },
  ] },
  { label: "Films and TV", items: [
    { slug: "empire-strikes-back", title: "The Empire Strikes Back", author: "Star Wars", kind: "film", c: "#1F2230", tag: "perpetually watching", note: "Star Wars since I was a small child, and this one on a loop. I even wrote a book chapter on Padmé vs. Palpatine as negotiators.", quip: "I am your… co-author." },
    { slug: "raiders-of-the-lost-ark", title: "Raiders of the Lost Ark", author: "Steven Spielberg", kind: "film", c: "#6A4A2A", note: "It belongs in a museum.", quip: "I negotiate like Indy: improvise, then run." },
    { slug: "top-gun", title: "Top Gun", author: "Tony Scott", kind: "film", c: "#1F3A5A", note: "Highway to the danger zone.", quip: "I feel the need, the need for a BATNA." },
    { slug: "the-terminal", title: "The Terminal", author: "Steven Spielberg", kind: "film", c: "#3A4A5A", note: "A man, an airport, and the longest negotiation with bureaucracy.", quip: "Stuck at the gate. Counter-offer: a stamp." },
    { slug: "austin-powers", title: "Austin Powers", author: "Mike Myers", kind: "film", c: "#1F4A9A", note: "Yeah, baby, yeah.", quip: "I only negotiate in groovy terms, baby." },
    { slug: "formula-one", title: "Formula One", author: "every Sunday", kind: "film", c: "#A3302A", note: "Every race weekend. Lights out and away we go.", quip: "Box, box. Tyres are gone." },
    { title: "film", kind: "empty", quip: "Popcorn is ready. The film isn't." },
  ] },
  { label: "Music", items: [
    { slug: "queen-the-game", title: "The Game", author: "Queen", kind: "music", c: "#2B2B2B", tag: "perpetually listening", note: "Queen, The Game. On repeat since forever.", quip: "Another one bites the dust. Usually the other side's BATNA." },
    { slug: "too-low-for-zero", title: "Too Low for Zero", author: "Elton John", kind: "music", c: "#E8E4DA", note: "Home of I'm Still Standing.", quip: "I'm still standing. Usually after the last counter-offer." },
    { slug: "abba-arrival", title: "Arrival", author: "ABBA", kind: "music", c: "#1A2A3A", note: "Helicopter on the cover, Dancing Queen inside.", quip: "Take a chance on me. Preferably with a vesting cliff." },
    { slug: "brothers-in-arms", title: "Brothers in Arms", author: "Dire Straits", kind: "music", c: "#8AA8D0", note: "That guitar solo, start to finish.", quip: "Money for nothing. Zero for the junior authors." },
    { slug: "beatles-1967-1970", title: "1967–1970", author: "The Beatles", kind: "music", c: "#1E4A9A", note: "The Blue Album, looking down the stairwell.", quip: "Let it be. Or at least, let it be a fair split." },
    { slug: "rumours", title: "Rumours", author: "Fleetwood Mac", kind: "music", c: "#E8DCC0", note: "Go your own way. Preferably after the deal.", quip: "Never going back again. Except for the follow-up round." },
    { slug: "toto-iv", title: "Toto IV", author: "Toto", kind: "music", c: "#B8282A", note: "Africa, and everything else on it.", quip: "Africa is stuck in my head. Send help." },
    { slug: "1989-taylors-version", title: "1989 (Taylor's Version)", author: "Taylor Swift", kind: "music", c: "#A8C8E8", note: "The seagull album.", quip: "Shake it off. Then renegotiate the contract." },
    { slug: "slippery-when-wet", title: "Slippery When Wet", author: "Bon Jovi", kind: "music", c: "#2A2A2A", note: "Eighties hair, nineties negotiating.", quip: "Livin' on a prayer. Also on a BATNA." },
    { title: "album", kind: "empty music", quip: "My playlist is just modem noises." },
  ] },
  { label: "Games", items: [ // add  tag: "currently playing"  to the one you're playing
    { slug: "balatro", title: "Balatro", kind: "game", c: "#6A2F4A", tag: "perpetually playing", note: "Poker, but it's maths.", quip: "Expected value says: one more run." },
    { slug: "assassins-creed-2", title: "Assassin's Creed II", kind: "game", c: "#5A4A3A", note: "Ezio, Italy and a very long cape.", quip: "I also climb things. Mostly ladders." },
    { slug: "forza-horizon-2", title: "Forza Horizon 2", kind: "game", c: "#2F4A6D", note: "Driving, ideally on a proper sim rig.", quip: "Zero to sixty in one lap of the sofa." },
    { slug: "dirt-3", title: "DiRT 3", kind: "game", c: "#1A9AA8", note: "Rally, gymkhana and a lot of mud.", quip: "Understeer is just a negotiation with the corner." },
    { slug: "gta-v", title: "Grand Theft Auto V", kind: "game", c: "#1A1A1A", note: "Three protagonists, zero BATNAs.", quip: "Strictly fictional negotiation tactics. Mostly." },
    { slug: "indiana-jones-great-circle", title: "Indiana Jones and the Great Circle", kind: "game", c: "#B0742A", note: "Whip, hat and a Vatican conspiracy.", quip: "It belongs in a museum. So does my first draft." },
    { slug: "watch-dogs", title: "Watch Dogs", kind: "game", c: "#2A3A4A", note: "Hacking a whole city from a phone.", quip: "Hacked the whole city. Still can't hack Reviewer 2." },
    { slug: "lego-star-wars", title: "LEGO Star Wars: The Complete Saga", kind: "game", c: "#1A2A5A", note: "Every Star Wars scene, rebuilt in bricks.", quip: "Padmé would have negotiated this. In bricks." },
    { slug: "new-super-mario-bros", title: "New Super Mario Bros.", kind: "game cart mario", c: "#3A8AD0", note: "Jump, stomp, repeat. Slide the cartridge out.", quip: "Jump first, negotiate with the Goomba later." },
    { slug: "pokemon-soulsilver", title: "Pokémon SoulSilver", kind: "game cart soulsilver", c: "#8A94A8", note: "Johto, Lugia and a Pokéwalker. Slide the cartridge out.", quip: "Gotta catch 'em all. Trades are negotiations." },
    { title: "game", kind: "empty", quip: "Press start. Then press start again." },
  ] },
];

const PAGES = {
home: () => `
  <header class="hero">
    <div class="rise">
      <div class="kicker sc">Field notes · vol. I · Aarhus, 2026</div>
      <h1 style="margin-top:12px">Jan Smolinski</h1>
      <p class="lede">I study what happens when <mark>AI agents</mark> start companies, answer interview questions and negotiate with each other. I also <button class="build-one" data-go="projects">build them${blob("peek")}</button>.</p>
      <p class="byline">PhD fellow · Department of Management · Aarhus University</p>
    </div>
    <div class="hero-photo rise" style="--d:.1s">
      ${agent("perch track", `<span class="bubble"></span>`, "button", `aria-label="An agent sitting on the photo"`)}
      ${photo({ src: "assets/photos/portrait.jpg", alt: "Portrait of Jan Smolinski", cap: "the observer, 2024", r: 2.5 })}
    </div>
  </header>

  <section class="observe rise" style="--d:.2s">
    <div class="ground" id="ground">
      ${[6, 22, 40, 57, 74, 90].map((x, i) => agent(`wander walk ${i % 2 ? "flip" : ""}`, `<span class="bubble"></span>`, "button", `style="left:${x}%" aria-label="Agent ${i + 1}: tap to hear what it is doing"`)).join("")}
    </div>
    <p class="figcap"><b>Fig. 2.</b> Six agents observed in the wild, mid-afternoon. Tap one to interview it.</p>
  </section>

  <section class="section split solo">
    ${anatomy()}
  </section>

  ${colophon()}`,

research: () => {
  const P = [
    ["agents-in-management-roles", "AI agents in management roles: an affordance view", "Business Horizons · special issue on the agentic revolution · with F. Günzel-Jensen and P. Kesting", ["Submitted", "--rust"], "What do AI agents supply, and fail to supply, when they take over management roles in a startup? A framework of four things they can offer, tested on a real startup staffed almost entirely by agents."],
    ["evolution-of-agents", "The evolution of AI agents in negotiation", "Experiment, building on Curhan & Vaccaro · with J. Curhan, R. Smolinski and Y. Rana", ["Running", "--sage"], "What happens when different AI agents share one arena and can adapt as they go? We watch which negotiating styles they pick, and which ones survive. Framing still taking shape."],
    ["interviewing-ai-agents", "Can we interview AI agents, and how?", "Methods paper · with F. Günzel-Jensen and P. Kesting", ["Working paper", "--faint"], "Interviews taught entrepreneurship research most of what it knows. If more of a company's members are AI agents, can we interview them, how, and how do we use what they say responsibly?"],
    ["outcomes-to-competencies", "From outcomes to competencies", "Working paper · with R. Smolinski", ["Working paper", "--faint"], "Can AI grade negotiation skill? Human raters barely agree with each other (α ≈ 0.08), so the paper argues for hybrid human–AI assessment. Back in the lab, collecting more data."],
    ["qatar-negotiation", "Qatari and Danish negotiators compared", "Negotiation studies in Qatar and Denmark · two studies, one dataset · with R. Smolinski, P. Kesting and A. R. Harmon", ["Awaiting ethics", "--faint"], "How negotiators in Qatar approach deals compared with Danish negotiators, and when an offer is good enough. Awaiting ethics approval."],
  ];
  const roman = ["I", "II", "III", "IV", "V"];
  return `
  <div class="kicker sc rise">p. 4 · Research · AI agents × entrepreneurship × negotiation</div>
  <h2 class="rise" style="margin-top:10px">Specimens under study</h2>
  <p class="lede rise">I'm a PhD fellow at Aarhus University (Department of Management, 2026–2029). I study what happens when AI agents act for people: in new ventures, and across the negotiating table.</p>
  <div class="interests rise" aria-label="Research interests">
    <span class="sc">Interests</span>
    <span class="chip">AI agents</span><span class="chip">negotiation</span><span class="chip">entrepreneurship</span><span class="chip">assessing negotiation skill</span><span class="chip">ethics of agents</span>
  </div>
  <div class="citecard rise">
    <div class="cc-stat"><b id="cc-cites">·</b><span>citations</span></div>
    <div class="cc-stat"><b id="cc-h">·</b><span>h-index</span></div>
    <div class="cc-stat"><b>${PUBLISHED.length}</b><span>publications</span></div>
    <button class="holder citeagent" data-quip="Not a lot, but it's honest work.|Stop judging. He's not that old yet.|Every citation was earned. Some were even read.|h-index 1. Rome wasn't cited in a day.|Give him until the PhD is done.">${agent("", `<span class="bubble"></span>`)}</button>
    <p class="cc-note hand">counted live from OpenAlex · tap the agent</p>
  </div>
  <p class="lede rise" style="margin-top:34px">Five projects, each pinned to its own plate. Every plate has a one-line version for people who won't read the PDF.</p>
  <div class="section plates">
    ${P.map((p, i) => `<article class="plate rise" style="--d:${i * .07}s">
      ${paperPage(p[0], p[1], p[2].split(" · ")[0])}
      <div>
        <span class="pno sc">Plate ${roman[i]}</span>
        <h3>${p[1]}</h3>
        <p class="venue">${p[2]}</p>
        <p class="plain"><span class="sc">In plain words</span>${p[4]}</p>
        <div class="plate-actions"><button class="linkbtn" data-r2>Ask Reviewer 2</button></div>
      </div>
      ${stamp(...p[3])}
    </article>`).join("")}
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Published</h3><span class="sc"><span id="citetotal">from the archive</span> · <a href="https://orcid.org/0009-0000-1429-3105" target="_blank" rel="noopener">ORCID</a></span></div>
    <ol class="pubs">${PUBLISHED.map(p => `<li${p[5] && !p[5].startsWith("http") ? ` data-doi="${p[5].toLowerCase()}"` : ""}><span class="yr">${p[0]}</span><div><b>${pubTitle(p)}</b><p>${p[4]} · ${p[2]} · ${p[3]}<span class="cite"></span></p></div></li>`).join("")}</ol>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Teaching</h3><span class="sc">from the front of the room</span></div>
    <div class="teaching">
      <ul class="courses">
        <li>Commercial negotiation</li>
        <li>Business negotiation</li>
        <li>Business negotiation project</li>
        <li>Entrepreneurship and business planning</li>
      </ul>
      <button class="holder cityagent teacher" aria-label="An agent with a pointer" data-quip="Everyone in this room has a BATNA. Check yours.|Lecture rule one: never open with your reservation price.|Office hours: always open to a counter-offer.|Syllabus: BATNA, ZOPA, and snacks.|Students negotiate. Jan grades. Agents take notes.">${agent("arms", `<span class="bubble"></span>`)}</button>
    </div>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Talks and conferences</h3><span class="sc">postmarks from the road</span></div>
    <div class="talk-photos">
      ${photo({ src: "assets/photos/tnc-room.jpg", alt: "Jan presenting to a room of researchers", cap: "INTRA 2025, Cape Town. Presenting the scoring study", r: -1.2, ar: "3/2" })}
      ${photo({ src: "assets/photos/tnc-hallway.jpg", alt: "Jan in conversation at the conference", cap: "the INTRA hallway track", r: 1.6, ar: "1/1" })}
    </div>
    <div class="stamps">
      ${CITY_STAMPS.map(cityStamp).join("")}
    </div>
  </div>
  ${colophon()}`;
},

projects: () => `
  <div class="kicker sc rise">p. 3 · Projects · ventures, tools and side quests</div>
  <h2 class="rise" style="margin-top:10px">Things I build outside the lab</h2>
  <section class="section discurso rise" style="--d:.08s">
    <div class="d-text">
      <img class="d-logo" src="assets/logos/discurso.png" alt="Discurso.AI">
      <p class="d-lede">I co-founded Discurso.AI. You practise negotiating against realistic AI counterparts, and it gives feedback on the skills behind a deal, not only the outcome.</p>
      <p class="muted">Used in negotiation courses at universities in Europe, Australia and South America, plus a subscription for individuals.</p>
      <a class="btn" href="https://discurso.ai" target="_blank" rel="noopener">Visit Discurso.AI →</a>
      <div class="used-at">
        <span class="sc">Used at</span>
        <div class="unis">${["aarhus.png","bocconi.png","escp.png","hhl.png","unsw.png","melbourne.png","esan.png","eafit.svg","ostfalia.png"].map(f => `<img src="assets/logos/unis/${f}" alt="${f.split(".")[0]}" loading="lazy">`).join("")}</div>
      </div>
    </div>
    <figure class="jar-wrap">
      <button class="jar" id="jar" aria-label="Tap the jar to get feedback from the Discurso coach">
        <svg class="jar-glass" viewBox="0 0 220 270" aria-hidden="true">
          <g class="lidg">
            <rect class="lid" x="52" y="8" width="116" height="26" rx="4"/>
            <path class="lid-hatch" d="M62 12v18M74 12v18M86 12v18M98 12v18M110 12v18M122 12v18M134 12v18M146 12v18M158 12v18"/>
          </g>
          <path class="glass" d="M60 34 v14 q0 8 -12 16 q-30 20 -30 60 v100 q0 38 38 38 h108 q38 0 38 -38 v-100 q0 -40 -30 -60 q-12 -8 -12 -16 v-14"/>
          <path class="shine" d="M40 120 q-6 50 0 100"/>
          <path class="shine" d="M50 108 q-3 8 -4 14"/>
          <g class="label" transform="rotate(-3 110 222)"><rect x="62" y="204" width="96" height="36" rx="2"/><text x="110" y="222" text-anchor="middle">Coachus</text><text x="110" y="236" text-anchor="middle">discursivus</text></g>
        </svg>
        <span class="jar-blob">${blob("big track")}<span class="bubble"></span></span>
      </button>
      <span class="gawker l">${agent("", `<span class="bubble"></span>`)}</span>
      <span class="gawker r">${agent("flip", `<span class="bubble"></span>`)}</span>
      <figcaption class="figcap"><b>Plate VI.</b> <i>Coachus discursivus</i>, the Discurso.AI coach. Kept under glass: the only specimen in this notebook that gives feedback. Tap the jar. Do not wiggle the lid.</figcaption>
    </figure>
  </section>
  <div class="section ventures">
    <article class="venture wide rise" style="--d:.1s">
      ${stamp("Annual", "--pen")}
      <div class="logo"><img src="assets/logos/negotiation-challenge.png" alt="The Negotiation Challenge"></div>
      <p>The Negotiation Challenge is an international negotiation competition for students. I'm part of the team behind it and look after the technical setup. Its rounds also became the dataset for my assessment research.</p>
      ${photo({ src: "assets/photos/tnc-presenting.jpg", alt: "Jan presenting at The Negotiation Challenge 2025", cap: "presenting the AI scoring results, TNC 2025", r: 1.5, ar: "3/2" })}
      <div class="aside">Reasoning models turned out to be much better judges of negotiation skill than pattern matchers.</div>
    </article>
    <article class="venture retired rise" style="--d:.2s">
      ${stamp("Retired 2024", "--faint")}
      <div class="logo"><img src="assets/logos/languee.png" alt="Languee" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'Languee'}))"></div>
      <p>Co-founder, April to August 2024. Languee taught professionals a new language by talking to them: an AI voice tutor that practised real workplace conversations with you, corrected your grammar and pronunciation as you went, and would happily chat about anything.</p>
      <button class="mourner" aria-label="An agent paying its respects">${agent("arms", `<span class="bubble"></span>`)}<svg class="flower" viewBox="0 0 20 30" aria-hidden="true"><path d="M10 12 V29 M10 22 q-5 -2 -6 -6 M10 19 q5 -1 6 -5"/><circle cx="10" cy="8" r="3.2"/><circle cx="10" cy="3" r="2.6"/><circle cx="15" cy="7" r="2.6"/><circle cx="5" cy="7" r="2.6"/><circle cx="12.5" cy="12" r="2.4"/><circle cx="7.5" cy="12" r="2.4"/></svg></button>
      <span class="epitaph">In memoriam, 2024. It taught people languages; Discurso teaches them to negotiate.</span>
    </article>
  </div>
  ${colophon()}`,
about: () => `
  <div class="kicker sc rise">p. 2 · About · the most personal page</div>
  <h2 class="rise" style="margin-top:10px">The observer, observed</h2>
  <p class="lede rise">For once the agents took notes on me. <span class="muted">Habitat: wherever the next conference is. Diet: pierogi and green tea. Known to approach strangers with a counter-offer.</span></p>
  <div class="section rise">
    <div class="sec-head"><h3>How it started</h3><span class="sc">Hamburg, school years</span></div>
    <div class="origin">
      <div>
        <p>As a teenager I became my high school's network administrator. Keeping the hardware, software and network running for a whole school showed me how much well-built technology changes people's days. I've been following that idea ever since: a bachelor's in business and technology, a master's in innovation, and now a PhD on AI agents.</p>
        <p class="muted">Along the way I tried fintech, green energy and cars, and spent a lot of time making student life at CBS better. Off duty, it's Star Wars, video games or Formula One.</p>
      </div>
      <figure class="quote-note">
        <button class="pirate" aria-label="A pirate agent on a ship">
          <svg class="ship" viewBox="0 0 100 70" aria-hidden="true">
            <path class="mast" d="M54 46 V5"/>
            <path class="sail" d="M56 9 Q82 22 56 40Z"/>
            <path class="skull" d="M64 22.5 a2 2 0 1 1 4 0 a2 2 0 1 1 -4 0 M63.4 27 l5.2 -1.8 M63.4 25.2 l5.2 1.8"/>
            <path class="flag" d="M54 5 L68 9 L54 13Z"/>
            <path class="hull" d="M6 45 H94 L82 61 H20Z"/>
            <path class="plank" d="M12 51 H88 M16 56 H84"/>
            <path class="wave" d="M0 64 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0"/>
          </svg>
          <span class="crew">${agent("", `<span class="bubble"></span>`)}<svg class="hat" viewBox="0 0 40 18" aria-hidden="true"><path d="M2 15 Q20 -6 38 15 Q20 9 2 15Z"/><path class="skull" d="M18 8.5 a2 2 0 1 1 4 0 a2 2 0 1 1 -4 0 M17.5 12 l5 -1.6 M17.5 10.4 l5 1.6"/></svg></span>
        </button>
        <button class="jobs" aria-label="A Steve Jobs agent with an iPhone">${agent("arms", `<span class="bubble"></span><svg class="ov" viewBox="0 0 32 40" aria-hidden="true">
          <path class="jeans" d="M12.5 29.5 L11.5 37 M19.5 29.5 L20.5 37"/>
          <path class="tn" d="M5.4 23 C9 25.6 23 25.6 26.6 23 C27 27.5 22.5 30.5 16 30.5 C9.5 30.5 5 27.5 5.4 23Z"/>
          <path class="glasses" d="M9 15.5 L14.6 17.4 M23.4 18 a4.4 4.4 0 1 1 -8.8 0 a4.4 4.4 0 1 1 8.8 0"/>
          <g class="phone"><rect class="body" x="26" y="-3" width="8" height="13.5" rx="1.8" transform="rotate(10 30 4)"/><rect class="screen" x="27.1" y="-1.6" width="5.8" height="10.6" rx="1" transform="rotate(10 30 4)"/><g transform="rotate(10 30 4)"><circle class="logo" cx="30" cy="3.9" r="1.7"/><circle class="bite" cx="31.5" cy="3.1" r=".7"/><path class="leaf" d="M30 2.2 q.2 -1.1 1.2 -1.3 q0 1.1 -1.2 1.3Z"/></g></g>
        </svg>`)}</button>
        <blockquote class="hand">“It's more fun to be a pirate than to join the navy.”</blockquote>
        <figcaption>Steve Jobs, and the reason for most of my career choices</figcaption>
      </figure>
    </div>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Expedition log</h3><span class="sc">Warsaw → Aarhus, so far</span></div>
    <div class="map" id="map"><div class="map-loading">Drawing the map…</div></div>
    <p class="figcap"><b>Fig. 5.</b> Places lived and studied, from Warsaw (star) to Aarhus. The dotted line is the route so far. Tap a city.</p>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Languages</h3></div>
    <div class="langs">
      <div class="lang">${holder("f-de", "Natürlich.|Ordnung muss sein.|Feierabend? Not before the deadline.|Das ist nicht mein Bier. But I'll negotiate for it.|I have a form for that.")}German</div>
      <div class="lang">${holder("f-pl", "Oczywiście!|Pierogi first, then negotiations.|Na zdrowie!|My grandmother out-negotiates every model.|Żubrówka is a valid BATNA.")}Polish</div>
      <div class="lang">${holder("f-us", "Obviously. Go Blue!|Let's circle back on that.|Per my last email…|Awesome. Super awesome.|Can we take this offline?")}English</div>
    </div>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>The shelf</h3><span class="sc">books, films, music, games</span></div>
    <div class="bookcase" id="bookcase">
      ${SHELF.map(r => `<div class="shelf-row"><span class="row-label sc">${r.label}</span>
        <div class="shelf" role="group" aria-label="${r.label}">${r.items.map(book).join("")}</div></div>`).join("")}
      <div class="ladder" aria-hidden="true"></div>
      ${agent("climber", `<span class="bubble"></span>`)}
    </div>
    <p class="shelf-note" id="shelfnote">Pick something off the shelf. The librarian will climb up and fetch it.</p>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Snapshots</h3><span class="sc">taped in · tap the stacks</span></div>
    <div class="snapshots">
      <div class="pstack bocconi" style="--sa:41/60" aria-label="Bocconi graduation photos. Tap the top one to see the next.">
        ${photo({ src: "assets/photos/bocconi-top.jpg", alt: "Jan celebrating graduation with a Polish flag, flowers and champagne", cap: "flag, flowers, champagne. the full set", ar: "4/5" })}
        ${photo({ src: "assets/photos/bocconi-speech.jpg", alt: "Jan giving a speech at Bocconi graduation day", cap: "Milan, the graduation speech", ar: "4/5" })}
        ${photo({ src: "assets/photos/bocconi-laurel.jpg", alt: "Jan with a laurel wreath and diploma", cap: "laurel, Italian style", ar: "4/5" })}
        ${photo({ src: "assets/photos/bocconi-statue.jpg", alt: "Jan in gown next to a statue", cap: "befriending a statue", ar: "4/5" })}
        ${photo({ src: "assets/photos/bocconi-sign.jpg", alt: "Jan in front of the Bocconi sign", cap: "the obligatory Bocconi sign", ar: "4/5" })}
        ${photo({ src: "assets/photos/bocconi-stairs.jpg", alt: "Jan sitting on steps in his gown", cap: "stairs, laurel, tired", ar: "4/5" })}
        ${photo({ src: "assets/photos/bocconi-duomo-window.jpg", alt: "Jan with a laurel peeking from a Duomo window", cap: "peeking out of the Duomo", ar: "4/5" })}
        ${photo({ src: "assets/photos/bocconi-duomo.jpg", alt: "Jan on the Duomo roof wearing a laurel", cap: "laurel still on, Duomo roof", ar: "4/5" })}
      </div>
      <div class="vrcell">
        <button class="vrbuddy" aria-label="An agent wearing a VR headset">${agent("arms", `<span class="bubble"></span><svg class="ov" viewBox="0 0 32 40" aria-hidden="true"><path class="strap" d="M13 17 L5.5 15.5"/><rect class="visor" x="13.5" y="13.5" width="14.5" height="9" rx="4"/><path class="shine" d="M17 16.5 q3 -1.4 7 0"/></svg>`)}</button>
        <div class="pstack vrstack" style="--sa:30/50" aria-label="Headset photos through the years. Tap the top one to see the next.">
        ${photo({ src: "assets/photos/vr-1.jpg", alt: "Jan lifting a white VR headset to his eyes", cap: "Day 1. Mild curiosity.", ar: "3/4" })}
        ${photo({ src: "assets/photos/vr-5.jpg", alt: "Jan in a different VR headset, docking a boat in a simulator", cap: "Cheating on Apple with a boat-docking sim. We don't talk about it.", ar: "3/4" })}
        ${photo({ src: "assets/photos/vr-3.jpg", alt: "Jan wearing the headset and grinning", cap: "Minute nine. This is what joy looks like.", ar: "3/4" })}
        ${photo({ src: "assets/photos/holo.jpg", alt: "Jan air-tapping at a screen wall in a HoloLens", cap: "2017. HoloLens. Pointing at a wall like a wizard.", ar: "3/4" })}
        ${photo({ src: "assets/photos/vr-0.jpg", alt: "Young Jan holding a Samsung Gear VR headset to his face", cap: "2016. It started with a phone in a box.", ar: "3/4" })}
        </div>
      </div>
      <div class="pstack aarhus" style="--sa:41/60" aria-label="Photos from Aarhus. Tap the top one to see the next.">
        ${photo({ src: "assets/photos/aarhus-pierogi.jpg", alt: "Jan rolling out pierogi dough at a white table", cap: "pierogi from scratch. quality control: me", ar: "4/5" })}
        ${photo({ src: "assets/photos/aarhus-red-car.jpg", alt: "Jan holding a microphone inside a vintage red car cab", cap: "karaoke from the front seat of a very red car", ar: "4/5" })}
        ${photo({ src: "assets/photos/aarhus-match-night.jpg", alt: "A bar full of Danish football fans watching a match", cap: "match night. red and white everywhere", ar: "4/5" })}
        ${photo({ src: "assets/photos/aarhus.jpg", alt: "Aarhus marina with sailing boats on a sunny day", cap: "Aarhus, home base", ar: "4/5" })}
      </div>
      <div class="vrcell">
        <button class="holder cityagent racebuddy" aria-label="An agent with opinions about racing" data-quip="I like when cars go vroom.|Jan's racing analysis: vroom good, crash bad.|He has strong opinions about tyres. Mostly: round.|Sim racing is just negotiating with physics, again.|Pink kart. Serious face. No notes.">${agent("", `<span class="bubble"></span><svg class="ov" viewBox="0 0 32 40" aria-hidden="true"><path class="helmet" d="M4.5 19.5 C4.5 8 10 4.5 16 4.5 C23.5 4.5 28 9.5 28 17 V19.5 Z"/><path class="hstripe" d="M10 6.5 Q16 5.6 22 7"/><path class="hvisor" d="M14 12.5 H28 V19 H14 Z"/></svg>`)}</button>
        <div class="pstack racestack" style="--sa:41/51" aria-label="Racing photos. Tap the top one to see the next.">
          ${photo({ src: "assets/photos/race-7.jpg", alt: "Jan at a Grand Prix grandstand in a team shirt", cap: "I like when cars go vroom", ar: "1/1" })}
          ${photo({ src: "assets/photos/race-8.jpg", alt: "Jan kneeling in front of a red Ferrari F1 car at the Enzo Ferrari museum", cap: "Ferrari museum, Modena. A pilgrimage", ar: "1/1" })}
          ${photo({ src: "assets/photos/race-4.jpg", alt: "Jan standing in a formula car at Zandvoort", cap: "Zandvoort. arms up, as one does", ar: "1/1" })}
          ${photo({ src: "assets/photos/race-5.jpg", alt: "Jan in a Porsche at a track day", cap: "same driver, more horsepower", ar: "1/1" })}
          ${photo({ src: "assets/photos/race-6.jpg", alt: "Jan at a racing simulator", cap: "the sim, for bad-weather laps", ar: "1/1" })}
          ${photo({ src: "assets/photos/race-3.jpg", alt: "Jan in a pink kart wearing a helmet", cap: "pink kart. serious face", ar: "1/1" })}
          ${photo({ src: "assets/photos/race-2.jpg", alt: "Young Jan driving a green kart", cap: "age 11. hands up, off-road", ar: "1/1" })}
          ${photo({ src: "assets/photos/race-1.jpg", alt: "Young Jan in a bumper car", cap: "age 9. early steering research", ar: "1/1" })}
        </div>
      </div>
    </div>
  </div>
  ${colophon()}`,

opinions: () => `
  <div class="kicker sc rise">p. 5 · Opinions · the blog, later</div>
  <h2 class="rise" style="margin-top:10px">No entries yet</h2>
  <p class="lede rise">Strong views, loosely held, about AI agents, negotiation and organisations. The first ones are in draft. The agent in charge of publishing them is resting its eye.</p>
  <button class="sleep rise" id="sleeper" aria-label="Wake the sleeping agent">${agent("asleep", `<span class="bubble"></span>`)}<span class="zz">z z z</span></button>
  <div class="ruled rise"><span class="hand">Ideas: what agents say when you interview them ·<br>why α = 0.08 is not a typo ·<br>notes from the sim rig</span></div>
  ${colophon()}`,

experience: () => `
  <div class="kicker sc rise">p. 6 · Experience · no agents past this point</div>
  <h2 class="rise" style="margin-top:10px">Experience</h2>
  <p class="lede rise">Where I've worked, studied and published. Also the only page without jokes.</p>
  <div class="section"><div class="cv rise">
    ${agent("peeker", `<span class="bubble"></span>`, "button", `aria-label="An agent peeking in"`)}
    <div class="cv-links">${LINKS}</div>
    ${Object.entries(EXPERIENCE).map(([h, rows]) => `<section><h3>${h}</h3>
      ${rows.map(r => `<div class="r ${r[3] || ""}"><span class="when">${r[0]}</span><div><b>${r[1]}</b>${r[3] ? `<span class="tag">${{ now: "current", live: "current", retired: "retired" }[r[3]]}</span>` : ""}${r[2] ? `<p>${r[2]}</p>` : ""}</div></div>`).join("")}
    </section>`).join("")}
    <section><h3>Publications</h3>
      ${PUBLISHED.map(p => `<div class="r"><span class="when">${p[0]}</span><div><b>${pubTitle(p)}</b><p>${p[4]} · ${p[2]} · ${p[3]}</p></div></div>`).join("")}
    </section>
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><a class="btn" href="assets/Jan-Smolinski-CV.pdf" download>Download CV as PDF ↓</a><span class="sign">No agents beyond this point</span></div>
  </div></div>
  ${colophon()}`
};
