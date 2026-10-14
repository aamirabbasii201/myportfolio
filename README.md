# Aamir Israr — Personal portfolio

A mobile-first React portfolio based on the user's CV, public GitHub repository, and publicly indexed LinkedIn profile.

## Run locally

Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the URL shown by Vite (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Contents
- `src/App.jsx` — portfolio content, project cards, filters, responsive menu, links, and animations.
- `src/styles.css` — complete mobile-first dark gradient design using ordinary CSS; **no Tailwind setup or watcher needed**.
- `public/Aamir-Israr-CV.pdf` — provided CV, used by the Download CV buttons.
- `index.html` — Vite entry and SEO meta tags.

## Update content
- Edit `PROFILE` for personal contact and URLs.
- Edit `PROJECTS` for project details and repositories.
- Edit `EXPERTISE` for skills.
- Replace each CSS illustration with actual product screenshots when ready. All current project visuals are labeled **ILLUSTRATIVE VISUAL** to avoid implying they are real screenshots.

## Notes
- No fabricated testimonials, employers, awards, published app links, or project metrics were added.
- The user's CV lists **Aamir Israr**, while the LinkedIn URL uses **Aamir Abbasi**. This site uses the CV/GitHub display name.
- Only the E-Learning project currently links to a verified public repository; other projects are presented without invented links.
- Email action uses `mailto:` and clipboard copy with a fallback.
- Project filter is in-memory O(n) over six projects.
- For production, verify the project descriptions and add real screenshots.
