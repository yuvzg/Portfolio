# Yuvraj Gupta — Portfolio

Dark bento-grid portfolio (inspired by gianmarcocavallo.com) built with
**React 19 + Vite + Tailwind CSS v4 + Motion 12 + Three.js**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit your content — ONE file

Everything personal lives in `src/data.js`. Open TODOs:

1. `profile.location` / `availability` — city + target internship season
2. Project descriptions — Chat-application has no README on GitHub

## Pages & routing

React Router v7: `/` (home + cube), `/about`, `/projects`, `/contact`.
No navbar — navigation tiles live on the home page; subpages have a
"back home" link. Page transitions via Motion's AnimatePresence.
Theme accent `#981820` sampled from the avatar (`public/avatar.png`);
background is a faint isometric lattice with cube-color glows (see
`src/index.css` body rules).
SPA redirects included for Netlify (`public/_redirects`) and Vercel
(`vercel.json`). For GitHub Pages you'd need a 404.html fallback.

## Rubik's cube controls

`src/components/RubiksCube.jsx` keeps a move history: **Scramble**
(enabled only when solved) queues 12 random layer turns; **Solve 1 move**
undoes the last history entry — each click is one real move toward
solved. Drag to orbit any time.

## What's inside

- `src/pages/` — Home, About, Projects, Contact
- `src/components/` — Nav, Card, Marquee, TimeCard, NowCard, RubiksCube,
  PageTransition
- Cube is lazy-loaded (three.js in its own chunk, ~122KB gzip main bundle)
- Respects `prefers-reduced-motion` (marquees pause, cube turns become instant)

## Stats panel (projects page)

Live GitHub numbers come from the public GitHub API (60 req/hr/IP,
unauthenticated). Heatmaps are rendered by free third-party services:
ghchart.rshah.org (GitHub) and leetcard.jacoblin.cool (LeetCode).
If either service is down the images hide themselves gracefully.
Usernames live in `statsUsernames` in `src/data.js`.

## Deploy (free)

Vercel or Netlify: import the repo, framework preset "Vite", done.
Or GitHub Pages: `npm run build`, publish `dist/`.
