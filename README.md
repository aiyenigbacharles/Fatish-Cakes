# Fatish Cakes

A responsive storefront for Fatish Cakes, a bakery in Abuja, Nigeria. Browse celebration cakes and snacks, customize an order, and send it to the bakery through WhatsApp. Online card payments are not supported.

## Features

- Product menu, cake customization, cart, and WhatsApp checkout
- Gallery, FAQs, and delivery information
- Orders require at least 48 hours' notice; delivery covers the FCT, Abuja

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands: `npm run build` creates a production build, `npm run preview` serves it locally, and `npm run lint` checks TypeScript.

## Project notes

Built with React, TypeScript, and Vite. Business and product content lives in `src/data/`; update `src/data/site.ts` to change contact and ordering details. WhatsApp: [+234 806 032 0401](https://wa.me/2348060320401).
