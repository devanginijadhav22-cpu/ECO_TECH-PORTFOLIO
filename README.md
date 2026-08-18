# Eco-Tech Portfolio

A static, no-build-step website (Welcome / Pledge / Dashboard) built on the
"Circuit & Soil" design system. No npm install, no build tool — just HTML,
CSS via Tailwind's CDN, and vanilla JS.

## Project structure

```
portfolio/
├── index.html                  # Welcome page (hero)
├── pledge.html                 # Pledge / manifesto page
├── dashboard.html              # Assignment log — reads assets/data/assignments.json
├── assets/
│   ├── js/
│   │   ├── tailwind-config.js  # Colors, fonts, spacing — one place to edit the design system
│   │   ├── site.js             # Mobile menu + active nav link
│   │   └── dashboard.js        # Renders assignment cards from the JSON file
│   ├── data/
│   │   └── assignments.json    # Your assignments — edit this to add/update work
│   └── img/                    # Put any images here, reference as assets/img/filename.png
└── README.md
```

## Running it in Antigravity

This is a static site, so there's nothing to install or compile.

1. Open Antigravity → **File → Open Folder** → select the `portfolio` folder.
2. You need a local server (opening `index.html` by double-click will break
   the Dashboard page, because browsers block `fetch()` on `file://` URLs).
   Easiest options inside Antigravity's built-in terminal:
   - Python (usually preinstalled): `python3 -m http.server 5500`, then open `http://localhost:5500`
   - Node: `npx serve .`, then open the URL it prints
   - Or ask the Antigravity agent: *"serve this folder locally and open a preview"* — it can spin one up and use its live preview panel.
3. Edit any file — the browser tab just needs a refresh (no rebuild) to see changes.

## Adding / updating your assignments

Open `assets/data/assignments.json` and add a new object to the array:

```json
{
  "id": "A04",
  "title": "Your assignment title",
  "course": "Course name",
  "date": "2026-08-12",
  "status": "IN PROGRESS",
  "tags": ["Tag One", "Tag Two"],
  "summary": "One or two sentences on what it is.",
  "link": ""
}
```

- `status`: use `"COMPLETE"` or anything else (e.g. `"IN PROGRESS"`) — it drives the color and the stats counters.
- `link`: optional URL (e.g. to a PDF, repo, or Google Doc) — leave `""` if there's nothing to link to yet.
- Newest `date` is shown first automatically. No HTML editing required.

To host actual assignment files (PDFs, images), drop them in `assets/img/` or
a new `assets/files/` folder and point `link` at e.g. `"assets/files/report.pdf"`.

## Editing the design

- Colors, fonts, spacing → `assets/js/tailwind-config.js`
- Copy on the Welcome/Pledge pages → edit the HTML directly, class names describe the styling (e.g. `text-primary`, `font-headline-lg-mobile`)
- Nav links / menu behavior → `assets/js/site.js`

## Deploying

Any static host works since there's no build step. Two easy free options:

### Option A — GitHub Pages (recommended if you're already using git)
1. Create a new GitHub repo and push this folder to it:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Source** → select the `main` branch, `/ (root)` folder → Save.
3. Your site goes live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
4. **To maintain it going forward:** edit files locally in Antigravity → `git add . && git commit -m "update assignments" && git push` → GitHub Pages redeploys automatically.

### Option B — Netlify (fastest, no git required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the whole `portfolio` folder in.
2. It deploys instantly and gives you a live URL (you can rename it in Site settings).
3. **To maintain it:** either re-drag the updated folder onto the same site, or connect it to a GitHub repo (Site settings → Build & deploy → Link repository) so every `git push` auto-deploys — same workflow as Option A.

Either way, once it's connected to git, your regular maintenance loop is:
edit → `git commit` → `git push` → live in under a minute.

## Notes

- All fonts (Space Grotesk, Inter, JetBrains Mono) and Tailwind itself load from a CDN, so the site needs an internet connection to render correctly — normal for any live deployment, just keep it in mind if you ever try to open it fully offline.
- The `Contact` button currently points at `mailto:you@example.com` — replace with your real email in `index.html`, `pledge.html`, and `dashboard.html`.
