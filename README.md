# Skycast Weather

A responsive weather dashboard built with React and Vite. Search worldwide cities for current conditions, temperature, humidity, wind, pressure, visibility, and local sunrise/sunset times. The selected city and theme are remembered on your device.

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 7)
- npm
- An OpenWeather API key with access to the Current Weather API

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and replace the placeholder with your OpenWeather API key.
3. Start the development server with `npm run dev` and open the local URL shown in the terminal.

Vite reads environment variables when it starts. Restart the dev server after changing `.env`.

## Scripts

- `npm run dev` — start the local development server.
- `npm run build` — create the production build in `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint, if available in this checkout.
- `npm run deploy` — publish `dist/` to GitHub Pages using `gh-pages`.

## GitHub Pages deployment

The Vite base path is configured as `/whether-app/`. If the repository name changes, update `base` in `vite.config.js` to match the GitHub Pages repository path. Configure the repository's GitHub Pages source to the `gh-pages` branch, then run `npm run deploy`.

## API key safety

The `.env` file is ignored by Git. Never commit a real API key. Variables prefixed with `VITE_` are included in browser code and can be viewed by visitors, so use a key restricted in the OpenWeather dashboard and rotate any key that has been exposed publicly. Configure an equivalent environment variable in your hosting provider for production builds.
