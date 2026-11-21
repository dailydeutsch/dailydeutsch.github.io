# Täglich Wort - The Daily German App

One German word a day, with its forms, examples in context and a short test.

Live: https://dailydeutsch.github.io/

## What this is

- 365 words, one for every day of the year. Day 1 is taugen, Days 2 to 43 are a cooking set.
- A progressive web app: installable on iOS, Android, tablet and desktop, with offline caching.
- Minimalist design: the main word in Vollkorn bold serif, everything else in Inter, on a gentle grey tint of beige.

## Files

- `index.html` - the app (single self-contained page, exported from the Muse artifact daily-german)
- `manifest.webmanifest` - PWA manifest
- `sw.js` - service worker (versioned cache, network-first for navigation, cache-first for static assets and Google Fonts)
- `dailydeutsch-logo-192.png`, `dailydeutsch-logo-512.png`, `dailydeutsch-logo-1024.png` - app icons (draft logo)
- `apple-touch-icon.png`, `favicon-64.png` - platform icons

Local canonical copy: ~/workspace/dailydeutsch/site/
