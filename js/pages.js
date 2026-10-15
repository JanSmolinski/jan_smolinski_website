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
/* Courses taught, linked to their Aarhus University course catalogue pages. */
const COURSES = [
  ["Commercial negotiation", "https://kursuskatalog.au.dk/en/course/144536/Commercial-Negotiation"],
  ["Business negotiation", "https://kursuskatalog.au.dk/en/course/141552/Business-Negotiation"],
  ["Business negotiation project", "https://kursuskatalog.au.dk/en/course/141553/Business-Negotiation-Project"],
  ["Entrepreneurship and business planning", "https://kursuskatalog.au.dk/en/course/141384/Entrepreneurship-and-Business-Planning"],
];
/* Journals reviewed for: [journal, link]. Shown on Research and Experience. */
const REVIEWING = [
  ["AI and Ethics", "https://link.springer.com/journal/43681"],
  ["AI & Society", "https://link.springer.com/journal/146"],
];
const pubTitle = p => p[5] ? `<a href="${p[5].startsWith("http") ? p[5] : "https://doi.org/" + p[5]}" target="_blank" rel="noopener">${p[1]}</a>` : p[1];


/* Simple one-line city sketches for the conference stamps. */
const CITY = {
  vienna: `<path d="M4 82 H136"/><path d="M26 82 V48 H42 V82"/><path d="M26 48 L34 6 L42 48"/><path d="M34 6 V1 M32 3 H36" class="a"/><path d="M27.5 14 l-1.6 -1.4 M40.5 14 l1.6 -1.4 M29 22 l-1.6 -1.4 M39 22 l1.6 -1.4 M30.6 30 l-1.6 -1.4 M37.4 30 l1.6 -1.4 M32.1 38 l-1.6 -1.4 M35.9 38 l1.6 -1.4" opacity=".7"/><path d="M30.5 40 H37.5 M29 30 H39 M31.5 20 H36.5" opacity=".45"/><path d="M30 64 V56 Q34 50 38 56 V64 M31 78 V70 Q34 66 37 70 V78"/><path d="M42 82 V58 H92 V82"/><path d="M42 58 L50 34 H86 L92 58"/><path class="a" d="M50 42 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 M48 50 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3" opacity=".85"/><path d="M47 78 V68 Q50 63 53 68 V78 M59 78 V68 Q62 63 65 68 V78 M71 78 V68 Q74 63 77 68 V78 M83 78 V68 Q86 63 89 68 V78" opacity=".7"/><circle cx="116" cy="42" r="21"/><circle cx="116" cy="42" r="18" opacity=".5"/><circle cx="116" cy="42" r="1.8"/><path d="M116 42 L134 42 M116 42 L132.6 48.9 M116 42 L128.7 54.7 M116 42 L122.9 58.6 M116 42 L116 60 M116 42 L109.1 58.6 M116 42 L103.3 54.7 M116 42 L99.4 48.9 M116 42 L98 42 M116 42 L99.4 35.1 M116 42 L103.3 29.3 M116 42 L109.1 25.4 M116 42 L116 24 M116 42 L122.9 25.4 M116 42 L128.7 29.3 M116 42 L132.6 35.1" opacity=".55"/><path class="a" d="M135 42.6 h4 v3 h-4Z M128.8 57.4 h4 v3 h-4Z M114 63.6 h4 v3 h-4Z M99.2 57.4 h4 v3 h-4Z M93 42.6 h4 v3 h-4Z M99.2 27.8 h4 v3 h-4Z M114 21.6 h4 v3 h-4Z M128.8 27.8 h4 v3 h-4Z"/><path d="M104 82 L116 42 L128 82 M108 72 H124"/>`,
  paris: `<path d="M4 82 H136"/><path d="M70 6 C69 30 62 56 46 82 M70 6 C71 30 78 56 94 82"/><path d="M57 82 Q57 66 70 64 Q83 66 83 82"/><path d="M55.5 60 H84.5 M57.8 57 H82.2"/><path d="M63.1 38 H76.9 M64.7 35.6 H75.3"/><path d="M67 18 H73 M68.2 16.4 H71.8"/><path d="M57.5 60 L74.9 38 M82.5 60 L65.1 38 M65.1 38 L71 18 M74.9 38 L69 18 M69 18 L70.1 8 M71 18 L69.9 8 M52 80 L82.5 60 M88 80 L57.5 60" opacity=".5"/><path class="a" d="M70 6 V0"/><path d="M12 82 V62 H36 V82 M18 82 V73 Q24 66 30 73 V82 M11 62 H37 M12 66 H36" /><path d="M102 88 q5 -3 10 0 t10 0 t10 0 M98 84 q4 -2.5 8 0" opacity=".5"/><path d="M110 46 q3 -3 6 0 q3 -3 6 0 M16 40 q3 -3 6 0 q3 -3 6 0" opacity=".45"/>`,
  online: `<path d="M16 72 H124 L114 63 H26 Z"/><path d="M62 68 H78" opacity=".6"/><rect x="28" y="14" width="84" height="49" rx="3"/><rect x="31" y="17" width="78" height="43" rx="1.5" opacity=".5"/><path d="M70 17 V60 M31 38.5 H109" opacity=".45"/><circle cx="50" cy="25" r="4.2"/><path d="M42 37 Q50 27 58 37"/><circle cx="90" cy="25" r="4.2"/><path d="M82 37 Q90 27 98 37"/><circle cx="50" cy="47" r="4.2"/><path d="M42 59 Q50 49 58 59"/><path d="M90 41 C95.5 41 98 45 98 49 C98 53.5 94.5 56 90 56 C85.5 56 82 53.5 82 49 C82 45 84.5 41 90 41Z"/><circle cx="92.5" cy="47.5" r="2"/><path d="M90.5 41 C90.5 38.5 92 37.5 93.5 36.5"/><circle class="a" cx="94" cy="36.2" r="1.2"/><path class="a" d="M118 10 a8 8 0 0 1 12 0 M120.5 13 a4.5 4.5 0 0 1 7 0"/><circle class="a" cx="124" cy="16" r="1"/>`,
  capetown: `<path d="M2 74 L10 66 L18 42 L24 50 L30 38 H106 L112 58 L117 55 Q121 38 128 46 Q132 52 138 74"/><path d="M38 40 L38 60 M46 40 L45 60 M54 40 L52 60 M62 40 L62 60 M70 40 L69 60 M78 40 L76 60 M86 40 L86 60 M94 40 L93 60 M102 40 L100 60" opacity=".3"/><path class="a" d="M28 38 q4 -7 11 -4 q5 -8 13 -3 q7 -7 14 -1 q7 -7 14 0 q6 -6 13 0 q5 -4 9 3"/><path class="a" d="M36 39 v4 M48 39 v6 M60 39 v3 M72 39 v5 M84 39 v4 M96 39 v6" opacity=".7"/><path d="M14 74 V70 h5 v4 M22 74 V67 h4 v7 M30 74 V69 h6 v5 M40 74 V66 h4 v8 M48 74 V70 h7 v4 M100 74 V69 h5 v5 M108 74 V67 h4 v7" opacity=".55"/><path d="M2 74 H138"/><path d="M4 80 q5 -3 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 M12 87 q5 -3 10 0 t10 0 t10 0 t10 0 t10 0 t10 0" opacity=".5"/><ellipse cx="128" cy="80" rx="3.6" ry="5.6"/><path d="M125 79 q-2.5 1.5 -3 4 M131 79 q2.5 1.5 3 4"/><path class="a" d="M128 75.4 l2.4 -.8 l-2.4 -.8Z"/><path d="M126.5 86 h2 M128.5 86 h2"/>`,
  milan: `<path d="M4 82 H136"/><path d="M66.5 30 L68.5 9 H71.5 L73.5 30" opacity=".8"/><path d="M68 18 H72 M67.5 24 H72.5" opacity=".5"/><path class="a" d="M70 8.6 l-1.8 -4.6 h3.6Z"/><circle class="a" cx="70" cy="2.6" r="1.2"/><path d="M14 82 V52 L70 30 L126 52 V82"/><path d="M18 82 V51 M15.8 51 L18 42 L20.2 51"/><circle cx="18" cy="40" r="1.3"/><path d="M36 82 V44 M33.8 44 L36 34 L38.2 44"/><circle cx="36" cy="32" r="1.3"/><path d="M54 82 V37 M51.8 37 L54 26 L56.2 37"/><circle cx="54" cy="24" r="1.3"/><path d="M86 82 V37 M83.8 37 L86 26 L88.2 37"/><circle cx="86" cy="24" r="1.3"/><path d="M104 82 V44 M101.8 44 L104 34 L106.2 44"/><circle cx="104" cy="32" r="1.3"/><path d="M122 82 V51 M119.8 51 L122 42 L124.2 51"/><circle cx="122" cy="40" r="1.3"/><path d="M20.2 49.6 l0 -3 M26.4 47.1 l0 -3 M32.7 44.7 l0 -3 M38.9 42.2 l0 -3 M45.1 39.8 l0 -3 M51.3 37.3 l0 -3 M57.6 34.9 l0 -3 M63.8 32.4 l0 -3 M119.8 49.6 l0 -3 M113.6 47.1 l0 -3 M107.3 44.7 l0 -3 M101.1 42.2 l0 -3 M94.9 39.8 l0 -3 M88.7 37.3 l0 -3 M82.4 34.9 l0 -3 M76.2 32.4 l0 -3" opacity=".55"/><path d="M63 82 V68 Q70 58 77 68 V82 M41 82 V72 Q45 66 49 72 V82 M91 82 V72 Q95 66 99 72 V82 M24 82 V74 Q27 70 30 74 V82 M110 82 V74 Q113 70 116 74 V82"/><path d="M42 64 V56 Q45 51 48 56 V64 M92 64 V56 Q95 51 98 56 V64 M65 58 V48 Q70 41 75 48 V58" opacity=".6"/><path d="M14 66 H126" opacity=".35"/>`,
};
const CITY_STAMPS = [
  { art: "vienna", slug: "iacm-2026", name: "IACM", place: "Vienna", year: "2026", quips: "Vienna: where every negotiation comes with cake.|I came for the Riesenrad. Stayed for the Sachertorte.|Waltzing into a distributive bargain." },
  { art: "paris", slug: "intra-2026", name: "INTRA", place: "Paris", year: "2026", quips: "The Eiffel Tower is a very tall BATNA.|In Paris everything is negotiable. Except the queue.|Croissant first, concessions later." },
  { art: "online", slug: "ai-negotiation-forum-2026", name: "AI Negotiation Forum", place: "Online", year: "2026", quips: "Online: the only city with perfect wifi. Allegedly.|You're on mute. You were always on mute.|Commute: four steps." },
  { art: "capetown", slug: "intra-2025", name: "INTRA", place: "Cape Town", year: "2025", quips: "Table Mountain has the flattest ask I've ever seen.|That cloud on top is just anchoring.|Best view of any conference. No contest." },
  { art: "milan", slug: "edtech-forum-2025", name: "EdTech Forum", place: "Milan", year: "2025", quips: "Aperitivo is the real negotiation table.|The Duomo has thousands of statues. Zero agents. Yet.|Espresso for everyone except Jan." },
];
/* A perforated postage stamp with the city sketch and conference name, cancelled by a postmark with the city and year. */
const cityStamp = (c, i) => {
  const ring = (c.place.length < 8 ? `${c.place} ★ ${c.place} ★ ` : `${c.place} ★ `).toUpperCase();
  return `<div class="citycard" style="--tilt:${[-2.5, 1.8, -1.2, 2.4, -1.8][i % 5]}deg">
  <span class="sr">${c.name}, ${c.place}, ${c.year}</span>
  <div class="pstamp-wrap" aria-hidden="true"><div class="pstamp">
    <svg class="city" viewBox="0 0 140 90">${CITY[c.art]}</svg>
    <span class="pst-name">${c.name}<em>${c.place}</em></span>
  </div>
  <svg class="cancel" viewBox="0 0 120 80">
    <path class="wavy" d="M8 31 q6 -4 12 0 t12 0 t12 0 M8 40 q6 -4 12 0 t12 0 t12 0 M8 49 q6 -4 12 0 t12 0 t12 0"/>
    <circle cx="80" cy="40" r="35"/><circle cx="80" cy="40" r="23"/>
    <path id="pm-${c.slug}" fill="none" stroke="none" d="M80 40 m-29 0 a29 29 0 1 1 58 0 a29 29 0 1 1 -58 0"/>
    <text class="ringtxt"><textPath href="#pm-${c.slug}" textLength="178" lengthAdjust="spacing">${ring}</textPath></text>
    <text class="yr" x="80" y="45" text-anchor="middle">${c.year}</text>
  </svg></div>
  <button class="holder cityagent" aria-label="An agent with a comment about ${c.place}" data-quip="${esc(c.quips)}">${agent("", `<span class="bubble"></span>`)}</button>
</div>`;
};

const EXPERIENCE = {
  Work: [
    ["2026 – 2029", "PhD fellow, Aarhus University", "Department of Management, School of Business and Social Sciences. Researching AI agents in entrepreneurship and negotiation.", "now"],
    ["2024 – now", "Co-founder & CEO, Discurso.AI", "AI negotiation training and assessment, used at universities in Europe, Australia and South America.", "now"],
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
  Reviewing: [
    ["ad hoc", "Peer reviewer", REVIEWING.map(r => r[0]).join(" · ") + " (Springer)."],
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
    { slug: "like-a-prayer", title: "Like a Prayer", author: "Madonna", kind: "music", c: "#4A6A9A", note: "Express yourself, and the title track.", quip: "Express yourself. Then state your reservation price." },
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
      <p class="byline">PhD fellow · Department of Management · <a href="https://pure.au.dk/portal/da/persons/jan.smolinski%40mgmt.au.dk/" target="_blank" rel="noopener">Aarhus University</a><br>Co-founder &amp; CEO · <a href="https://discurso.ai" target="_blank" rel="noopener">Discurso.AI</a></p>
    </div>
    <div class="hero-photo rise" style="--d:.1s">
      ${agent("perch track", `<span class="bubble"></span>`, "button", `aria-label="An agent sitting on the photo"`)}
      ${photo({ src: "assets/photos/portrait.jpg", alt: "Portrait of Jan Smolinski", cap: "the observer, 2024", r: 2.5 })}
    </div>
  </header>

  <section class="observe rise" style="--d:.2s">
    <div class="observe-row">
      <div class="ground" id="ground">
        ${[6, 22, 40, 57, 74, 90].map((x, i) => agent(`wander walk ${i % 2 ? "flip" : ""}`, `<span class="bubble"></span>`, "button", `style="left:${x}%" aria-label="Agent ${i + 1}: tap to hear what it is doing"`)).join("")}
        <span class="hud hand" id="hud" hidden></span>
      </div>
      <button class="play" id="playBtn" type="button" aria-pressed="false"><span class="tri" aria-hidden="true"></span><span class="lbl">play</span></button>
    </div>
    <p class="figcap"><b>Fig. 1.</b> Six agents observed in the wild, mid-afternoon. Tap one to interview it, or press play and see how long one lasts in peer review.</p>
  </section>

  <section class="section rise" style="--d:.25s">
    <div class="nowcard" id="nowcard">
      <div class="now-head"><span class="sc">Aarhus, right now</span><span class="hand" id="now-note">checking the window…</span></div>
      <div class="now-grid">
        <div class="cc-stat"><b id="now-time">··:··</b><span id="now-day">local time</span></div>
        <div class="cc-stat"><b id="now-temp">·</b><span id="now-sky">sky</span></div>
        <div class="cc-stat"><b id="now-wind">·</b><span>wind</span></div>
        <div class="cc-stat rain"><b id="now-rain">·</b><span>rain?</span></div>
        <button class="holder" id="now-agent" aria-label="An agent with a verdict on Aarhus right now" data-quip="">${agent("", `<span class="bubble"></span>`)}</button>
      </div>
      <p class="cc-note hand">weather from open-meteo · tap the agent for the local verdict</p>
    </div>
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
  const roman = ["III", "IV", "V", "VI", "VII"];
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
    <button class="holder citeagent" aria-label="An agent with opinions about the citation count" data-quip="Not a lot, but it's honest work.|Stop judging. He's not that old yet.|Every citation was earned. Some were even read.|h-index 1. Rome wasn't cited in a day.|Give him until the PhD is done.">${agent("", `<span class="bubble"></span>`)}</button>
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
    <div class="sec-head"><h3>Reviewing</h3><span class="sc">peer review, from the other side</span></div>
    <div class="teaching reviewing">
      <ul class="courses">${REVIEWING.map(([j, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${j}</a> <span class="pub-house">Springer</span></li>`).join("")}</ul>
      <button class="holder cityagent teacher" aria-label="An agent holding a red pen" data-quip="Jan is Reviewer 2 now. The circle is complete.|Minor revisions. He means it. Mostly.|He reads past the abstract. Every time.|Polite, thorough, and only one “have you considered”.|Peer review: the only negotiation with no BATNA.">${agent("arms", `<span class="bubble"></span><svg class="ov pen" viewBox="0 0 32 40" aria-hidden="true"><path d="M27.5 12.5 L31 3.5"/></svg>`)}</button>
    </div>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Teaching</h3><span class="sc">from the front of the room</span></div>
    <div class="teaching">
      <ul class="courses">${COURSES.map(([c, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${c}</a></li>`).join("")}</ul>
      <button class="holder cityagent teacher" aria-label="An agent with a pointer" data-quip="Everyone in this room has a BATNA. Check yours.|Lecture rule one: never open with your reservation price.|Office hours: always open to a counter-offer.|Syllabus: BATNA, ZOPA, and snacks.|Students negotiate. Jan grades. Agents take notes.">${agent("arms", `<span class="bubble"></span>`)}</button>
    </div>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Talks and conferences</h3><span class="sc">postmarks from the road</span></div>
    <div class="talk-photos">
      ${photo({ src: "assets/photos/tnc-room.jpg", alt: "Jan presenting to a room of researchers", cap: "INTRA 2025, Cape Town. Presenting the scoring study", r: -1.2, ar: "3/2" })}
      ${photo({ src: "assets/photos/edtech-milan.jpg", alt: "Jan speaking into a microphone at a table, wearing a Bocconi lanyard", cap: "EdTech Forum 2025, Milan. Mid-argument", r: 1.6, ar: "4/3" })}
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
      <figcaption class="figcap"><b>Plate II.</b> <i>Coachus discursivus</i>, the Discurso.AI coach. Kept under glass: the only specimen in this notebook that gives feedback. Tap the jar. Do not wiggle the lid.</figcaption>
    </figure>
  </section>
  <div class="section ventures">
    <article class="venture wide rise" style="--d:.1s">
      ${stamp("Annual", "--pen")}
      <div class="logo"><img src="assets/logos/negotiation-challenge.png" alt="The Negotiation Challenge"></div>
      <p>The Negotiation Challenge is an international negotiation competition for students. I'm part of the team behind it and look after the technical setup. Its rounds also became the dataset for my assessment research.</p>
      <div class="visit"><a class="btn" href="https://thenegotiationchallenge.org/" target="_blank" rel="noopener">Visit The Negotiation Challenge →</a></div>
      ${photo({ src: "assets/photos/tnc-presenting.jpg", alt: "Jan presenting at The Negotiation Challenge 2025", cap: "presenting the AI scoring results, TNC 2025", r: 1.5, ar: "3/2" })}
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
    <p class="figcap"><b>Fig. 2.</b> Places lived and studied, from Warsaw (star) to Aarhus. The dotted line is the route so far. Tap a city.</p>
  </div>
  <div class="section rise">
    <div class="sec-head"><h3>Languages</h3></div>
    <div class="langs">
      <div class="lang">${holder("f-de", "Natürlich.|Ordnung muss sein.|Feierabend? Not before the deadline.|Das ist nicht mein Bier. But I'll negotiate for it.|I have a form for that.", "An agent waving a German flag")}German</div>
      <div class="lang">${holder("f-pl", "Oczywiście!|Pierogi first, then negotiations.|Na zdrowie!|My grandmother out-negotiates every model.|Żubrówka is a valid BATNA.", "An agent waving a Polish flag")}Polish</div>
      <div class="lang">${holder("f-us", "Obviously. Go Blue!|Let's circle back on that.|Per my last email…|Awesome. Super awesome.|Can we take this offline?", "An agent waving an English flag")}English</div>
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
        ${photo({ src: "assets/photos/vr-3.jpg", alt: "Jan wearing the headset and grinning", cap: "Minute nine. This is what joy looks like.", ar: "3/4" })}
        ${photo({ src: "assets/photos/vr-5.jpg", alt: "Jan in a different VR headset, docking a boat in a simulator", cap: "Cheating on Apple with a boat-docking sim. We don't talk about it.", ar: "3/4" })}
        ${photo({ src: "assets/photos/holo.jpg", alt: "Jan air-tapping at a screen wall in a HoloLens", cap: "2017. HoloLens. Pointing at a wall like a wizard.", ar: "3/4" })}
        ${photo({ src: "assets/photos/vr-0.jpg", alt: "Young Jan holding a Samsung Gear VR headset to his face", cap: "2016. It started with a phone in a box.", ar: "3/4" })}
        </div>
      </div>
      <div class="pstack aarhus" style="--sa:41/60" aria-label="Photos from Aarhus. Tap the top one to see the next.">
        ${photo({ src: "assets/photos/aarhus-red-car.jpg", alt: "Jan hosting a quiz night with a microphone inside a vintage red bus cab", cap: "quiz night, hosted by yours truly", ar: "4/5" })}
        ${photo({ src: "assets/photos/aarhus-table.jpg", alt: "A round dining table with four chairs under a painting of a red Corvette", cap: "the negotiation table. the Corvette supervises", ar: "4/5" })}
        ${photo({ src: "assets/photos/aarhus-pierogi.jpg", alt: "Jan rolling out dough at a white table", cap: "dough from scratch. quality control: me", ar: "4/5" })}
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
  ${colophon()}`,

lost: () => `
  <div class="kicker sc rise">p. ? · Lost · not in the contents</div>
  <h2 class="rise" style="margin-top:10px">This page isn't in the notebook</h2>
  <p class="lede rise">There's no <i>#${esc((h => { try { return decodeURIComponent(h); } catch (e) { return h; } })(location.hash.slice(1)))}</i> in here. The agent sent to find it is holding the map upside down.</p>
  <button class="lost-agent rise" aria-label="A lost agent holding a map upside down">${agent("arms", `<span class="bubble"></span><svg class="ov map-ov" viewBox="0 0 32 40" aria-hidden="true"><rect x="1.5" y="3.5" width="29" height="12" rx=".6"/><path d="M11.2 3.5 V15.5 M20.8 3.5 V15.5"/><path class="route" d="M4 6.5 Q9 13 15 8.5 T27 12"/><text x="24.5" y="7" transform="rotate(180 24.5 6)">N</text></svg>`)}</button>
  <p class="rise"><a href="#home" data-go="home">← Back to the contents</a></p>
  ${colophon()}`
};
