# SkillTrack

Free, curated learning tracks for modern web development.

**Live:** https://skilltrack-dev.vercel.app

SkillTrack is not a course platform and does not host any content. It is a hand-picked path through the best free resources on the web: each track is an ordered list of lessons (videos, articles, documentation, interactive tutorials) with the author and the time it takes, so a beginner can see what to learn next without drowning in search results.

## What makes it different

Every resource is checked by hand before it is published. A lesson has to be:

- **Current:** up to date with the versions people actually use today
- **Reputable:** from an author or organization worth trusting
- **Free and open:** no paywall and no sign-up needed to start
- **Beginner-friendly and practical:** it teaches by doing

If nothing good enough exists for a topic, there is no track for it yet.

## Features

- Directions (Frontend, Backend) that group tracks by topic
- Tracks with ordered lessons, authors, resource types and durations
- Progress tracking: tick off lessons and see progress per track and per direction
- No account needed: progress is stored in your browser (`localStorage`)
- Per-page metadata, Open Graph images, `sitemap.xml` and `robots.txt`

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript (strict)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Storyblok](https://www.storyblok.com) as the headless CMS for all content
- [Zustand](https://zustand.docs.pmnd.rs) for client-side progress state
- Deployed on [Vercel](https://vercel.com)

## How it works

- **Content model:** a Direction contains Tracks, and a Track contains Lessons. All of it is edited in Storyblok.
- **Rendering:** pages are prerendered at build time with `generateStaticParams` and regenerated at most once an hour (ISR), so navigation is instant.
- **Fresh content:** a Storyblok webhook calls `POST /api/revalidate` on publish, so edits show up without a redeploy.
- **Data access:** every Storyblok request lives in `src/lib/storyblok-queries.ts` (cached per render with React `cache()`); pages only render the result.

## Project structure

```
src/
  app/            routes: home, directions/[slug], tracks/[slug], sitemap, robots
  components/     UI: progress bar, lesson checkbox, header, footer
  lib/            Storyblok client and queries, types, SEO helper, site config
  stores/         Zustand progress store
```

## Running locally

The content lives in a private Storyblok space, so to run your own copy you need a Storyblok space with the same content model (Direction, Course, Lesson) and a public access token.

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_STORYBLOK_TOKEN=your_public_access_token
```

Then:

```bash
npm run dev        # development server on http://localhost:3000
npm run build      # production build
npm start          # run the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

Note: `npm run dev` compiles pages on demand and feels slower than production. Judge real speed with `npm run build && npm start`.

## Status and roadmap

Version 0 is live: static curated content and local progress tracking.

Planned:

- Optional sign-in to save progress across devices
- More directions (for example web design), added only when there are enough high-quality resources to make a track worth following