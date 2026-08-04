# Abhigna & Hemanth — Wedding Invitation

A premium, fully responsive South Indian Hindu wedding invitation website for **Abhigna & Hemanth** (March 11, 2027 · Bella Cavalli Events, Aubrey, Texas).

## Features

- Interactive scratch-card opening with temple-door reveal
- Temple-inspired hero, countdown (America/Chicago), events timeline
- Our Story, wedding details, venue maps, gallery lightbox, RSVP form
- Background music: *Yedhemaina Sakhi* (starts only after guest interaction)
- Centralized editable wedding data in `src/data/wedding.ts`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

Edit **`src/data/wedding.ts`** for names, dates, venues, copy, RSVP endpoint, gallery images, and music.

- Replace gallery SVGs in `public/images/gallery/` with your photos
- Music is configured in `weddingData.music` (`youtubeId` for Yedhemaina Sakhi via YouTube, or `src` for a local audio file)
- Set `weddingData.rsvp.endpoint` to Formspree / Supabase / Firebase / Sheets / API
- Update venue `fullAddress` fields once street addresses are verified

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
