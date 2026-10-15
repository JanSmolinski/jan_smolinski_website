# Jan Smolinski · Field Notes

Personal website of Jan Smolinski, PhD fellow at Aarhus University, researching AI agents and how they work with humans. The site is a naturalist's notebook: hand-inked agents wander the pages, and every page has a few of them with something to say.

Live at <https://jansmolinski.github.io/jan_smolinski_website/>.

## How it works

A plain static site. No build step, no framework, no package manager.

| File | What it holds |
| --- | --- |
| `index.html` | The shell: sidebar navigation, page container, fonts and scripts |
| `css/style.css` | All styling, including light and dark ("Night notes") themes |
| `js/agents.js` | The agent drawing and small helpers (photos, books, postmarks, stamps) |
| `js/pages.js` | The content: one template per page, plus the data lists (publications, experience, shelf) |
| `js/main.js` | Page switching, keyboard shortcuts, and every agent's behaviour and one-liners |
| `assets/` | Photos, book covers, logos and the CV PDF |
| `tools/make-cv.js` | Builds the CV from the publications and experience data |

Pages: Home, About, Projects, Research, Experience, Opinions. Press `1` to `6` to jump between them.

The only outside dependencies are Google Fonts, [d3](https://d3js.org/) and topojson (for the map on the About page), loaded from CDNs, and the [OpenAlex](https://openalex.org/) API, which supplies live citation counts on the Research page.

## Run it locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>. Any static file server works.

## Editing content

- **Publications and experience:** the `PUBLISHED` and `EXPERIENCE` lists at the top of `js/pages.js`. They feed both the Research and Experience pages and the CV.
- **Research projects:** the `P` list inside the `research` page. Each entry is `[slug, title, venue line, [stamp text, colour], plain-words summary]`.
- **Citation counts:** matched by DOI from `PUBLISHED`, so add a DOI to an entry and it gets a live count.
- **Agent one-liners:** the arrays in `js/main.js`, for example `LINES`, `JOBS`, `PIRATE` and `COACH`.
- **Photo stacks:** the stacks on the About page are lists of `photo({ ... })` calls. Tap or flick to cycle through them.
- **Photos and images:** drop files into `assets/photos/`, `assets/covers/` or `assets/logos/`. Missing images show a drawn placeholder, so nothing breaks while a file is missing.

## Rebuilding the CV PDF

The CV is generated from the same data as the site.

```bash
node tools/make-cv.js cv.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=assets/Jan-Smolinski-CV.pdf file://$PWD/cv.html
```

## Deploying

The site is served by GitHub Pages from the `main` branch. Push to `main` and it updates within a minute or two.
