# Grazac Blog Studio

The editing dashboard for the blog, powered by [Sanity](https://www.sanity.io).
It is built together with the website and served at **grazac.com.ng/studio**.

## How it's wired

- `npm run build` (repo root) builds the website, then `scripts/build-studio.js`
  builds this Studio into `build/studio`.
- `vercel.json` routes `/studio/*` to the Studio and everything else to the website.
- The Studio reuses the website's `REACT_APP_SANITY_PROJECT_ID` / `REACT_APP_SANITY_DATASET`.
  If the project ID isn't set, the Studio is skipped and the website still deploys.

## Sanity project settings (once)

In sanity.io/manage → your project → **API → CORS origins**, add each with
**Allow credentials** ticked (needed to log in to the Studio):

- `https://www.grazac.com.ng` (and `https://grazac.com.ng` if used)
- your Vercel preview domain
- `http://localhost:3333` (local Studio) and `http://localhost:3000` (local website)

## Working on the Studio locally

```bash
cd studio
cp .env.example .env      # add your Sanity project ID
npm install
npm run dev               # http://localhost:3333/studio
```

## Writing a post

1. Create at least one **Category** and one **Author**.
2. Create a **Blog post**: title, click *Generate* on the slug, summary, cover image (with alt text),
   category, author and body.
3. Tick **Feature this post** to show it large at the top of the blog.
4. Press **Publish**. It appears on the website within about a minute.
