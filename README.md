# FATISH CAKES — Premium Patisserie Website

A dessert ordering website built for **Fatish Cakes**, Abuja, Nigeria.

## Official Brand Facts
- **Brand Name**: FATISH CAKES
- **Tagline**: Premium celebration cakes for customers who love quality
- **Coverage**: Delivers across the entire Federal Capital Territory (FCT), Abuja
- **WhatsApp**: `+234 806 032 0401` (`https://wa.me/2348060320401`)
- **Instagram**: `https://instagram.com/fatishcakes` (16.8K followers)
- **Snack Bar IG**: `https://instagram.com/fatishsnackbar_abuja`
- **Domain**: `fatishcakes.com`
- **Minimum Lead Time**: 48 hours

## Architecture & CMS-Ready Structure
All content is separated into typed data files under `/src/data`:
- `/src/data/site.ts`: Brand constants, WhatsApp numbers, socials, hours, notes
- `/src/data/products.ts`: Celebration cakes, cake parfaits, small chops, options, and prices
- `/src/data/reviews.ts`: Client reviews (sample reviews flagged with `placeholder: true`)
- `/src/data/faqs.ts`: Frequently asked questions with structured data
- `/src/data/policies.ts`: 48-hour rule, Abuja coverage zones, allergen warnings
- `/src/data/gallery.ts`: Visual photo gallery items

Components consume this data through `/src/lib/content.ts` accessors, allowing an instant swap to a headless CMS (such as Sanity or Strapi) in the future without touching UI components.

## How WhatsApp Ordering Works
There is no online debit card processing. When a customer finishes customizing their cake (size, flavour, filling, custom piped inscription) and fills in their Abuja delivery address and needed-by date (with 48-hour minimum enforcement):
1. The checkout validates Nigerian phone formats and date constraints.
2. A structured WhatsApp message is compiled via `buildOrderMessage()`.
3. The customer's WhatsApp Business chat opens directly with the pre-filled order.
4. Payment (70% commitment deposit) and delivery logistics are settled directly with Fatish Cakes.

## Deployment to Vercel
1. Push repository to GitHub or import directly on [Vercel](https://vercel.com).
2. Framework Preset: Vite / React SPA.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Custom Domain: Add `fatishcakes.com` and configure DNS CNAME/A records.
