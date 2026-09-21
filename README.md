# Dinh Nam Nguyen — Portfolio

Personal portfolio for **Nguyễn Đình Nam**, a Computer Science student at Ho Chi Minh City University of Technology (HCMUT), expected to graduate in April 2027.

## What this portfolio emphasizes

- Evidence-based project descriptions instead of invented metrics.
- Real experience from an eight-week frontend internship at EyeCode.
- Case studies for OPLang Compiler Lite, HCMUT LostFound, and Matavi.
- A printable resume view with accurate education and GPA information.
- Responsive layout, keyboard-visible focus states, reduced-motion support, and semantic metadata.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Motion
- Lucide icons
- GitHub Pages + GitHub Actions

## Run locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## Deployment

Pushes to `main` are built and deployed through `.github/workflows/deploy-pages.yml`.

Live site: <https://namdayneee.github.io/Portfolio/>

## Content notes

Project and profile content lives in `src/data.ts`. Update that file when graduation status, contact details, or project status changes.
