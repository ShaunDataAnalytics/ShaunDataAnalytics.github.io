# Shaun Lin — Portfolio

Data Engineer & Analytics Specialist portfolio built with Next.js, Tailwind CSS, and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
```

Static files are output to the `out/` directory.

## Deploy to GitHub Pages

1. Push this project to your [ShaunDataAnalytics.github.io](https://github.com/ShaunDataAnalytics/ShaunDataAnalytics.github.io) repository.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. On each push to `main`, the workflow will build and deploy to your site.

## Customize

- **Social links**: Edit `src/components/Hero.tsx` (GitHub, LinkedIn, Email).
- **Projects**: Edit `src/data.ts` to add or update projects.
- **Project images**: Replace `public/images/placeholder.svg` or add real images and update `imageUrl` in `data.ts`.
- **GitHub stars**: Star counts are fetched at build time. For higher rate limits, set `GITHUB_TOKEN` in your environment (e.g. in GitHub Actions secrets).
