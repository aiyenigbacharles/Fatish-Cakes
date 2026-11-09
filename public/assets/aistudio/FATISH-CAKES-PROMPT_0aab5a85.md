# Build Brief: FATISH CAKES Website (Next.js + Tailwind + Framer Motion)

You are a senior full-stack engineer and product designer. Build a premium, luxurious, dessert-focused ordering website for **Fatish Cakes**, an Abuja celebration-cake and small-chops business that currently sells only through Instagram and WhatsApp Business. This site will be pitched to the owner first, so it must look finished, feel expensive, and work flawlessly on phones.

Read this whole brief before writing code. Work in the phases at the bottom, and stop after each phase to summarise what you did.

---

## 1. Business facts (use exactly, never invent others)

| Item | Value |
|---|---|
| Brand name | Fatish Cakes (display as "FATISH CAKES") |
| Tagline (use as hero base) | Premium celebration cakes for customers who love quality |
| Location / coverage | Abuja, Nigeria. Delivers across the entire FCT |
| Products | Celebration cakes, cake parfait, small chops ("chops") and similar snacks |
| Ordering | WhatsApp only: `https://wa.me/2348060320401` (number: +234 806 032 0401) |
| Minimum lead time | 48 hours before the event/delivery date |
| Fulfilment | Pickup or delivery |
| Instagram | https://instagram.com/fatishcakes (3,000+ posts, 16.8K followers) |
| Snack bar IG | https://instagram.com/fatishsnackbar_abuja |
| Linktree | https://linktr.ee/Fatishcakes_n_snacks |
| Domain | fatishcakes.com |
| IG highlights (inspire sections) | Reviews, Cake Parfait, Certified, Policy, Happy Customers, The Founder, Deliveries |

**Payment:** There is NO online payment gateway. When the customer finishes the cart, the site builds a pre-filled WhatsApp message and opens her WhatsApp Business chat. Payment is arranged there.

**Unknown details:** Pickup address, opening hours, deposit/cancellation terms, real prices, and real testimonials are not provided yet. Do NOT invent them. Put clearly marked placeholders in `/data/site.ts` and `/data/products.ts` (for example `// TODO(owner): confirm`), and render sensible neutral copy such as "Price on request" or "Pickup address shared on confirmation".

---

## 2. Tech stack

- **Next.js (latest stable, App Router) + TypeScript (strict)**
- **Tailwind CSS** with design tokens defined in `tailwind.config` / CSS variables
- **Framer Motion** for all animation
- **next/font** for Cormorant Garamond and Jost (no external font requests at runtime)
- **next/image** for every image, with blur placeholders and correct `sizes`
- **Zustand** (or React Context) for the cart, persisted in `localStorage`
- **react-hook-form + zod** for the checkout and custom-order forms
- **lucide-react** for icons
- Deploy target: **Vercel**. No backend or database in v1.
- **CMS-ready architecture:** keep all content in typed files under `/data` (`site.ts`, `products.ts`, `reviews.ts`, `faqs.ts`, `gallery.ts`, `policies.ts`) so a headless CMS (e.g. Sanity) can replace them later without touching components. Components must only consume typed data via small accessor functions in `/lib/content.ts`.

---

## 3. Design system

The reference is a clean, airy catering template. Match its structure and feel, but push it more luxurious, softer and more cake-friendly.

### 3.1 Colour tokens
Keep the template's burnt orange as the hero accent, then layer in a soft palette derived from the brand logo (gold and brown):

```
--orange-600: #DC5A06   /* primary CTA, headline accent words, icon badges */
--orange-700: #B84A04   /* hover/pressed */
--blush-50:   #FFF5F2   /* main alt section background (from template) */
--blush-100:  #FBE6DF   /* soft cards, pills */
--rose-200:   #F4CFC6   /* gentle dessert accent, decorative blobs */
--cream-50:   #FFFBF8   /* page background */
--gold-500:   #C9A24B   /* fine details: dividers, stars, small ornaments (from logo) */
--cocoa-900:  #2B1A12   /* headings and primary text (warm near-black, not pure black) */
--cocoa-600:  #6B4A3A   /* body text */
--white:      #FFFFFF   /* cards */
```
After the logo is placed in `/public/brand/`, sample its exact gold/brown and adjust `--gold-500` / `--cocoa-*` to match. Orange stays #DC5A06. Verify text contrast meets WCAG AA (white text on orange buttons must pass; if not, darken the button to `--orange-700`).

### 3.2 Typography
- **Headlines:** Cormorant Garamond, uppercase, high contrast, tight letter-spacing, weights 500/600/700. Two-tone headlines: main words in cocoa, key words in orange (e.g. "CELEBRATION **CAKES** THAT CREATE MOMENTS").
- **Body/UI:** Jost, 400/500/600. Small uppercase orange "eyebrow" labels above headings (e.g. "EXPLORE OUR MENU"), letter-spaced.
- Fluid type with `clamp()`. Headlines around 40px on mobile and up to 96px on desktop; body 16px minimum on mobile.

### 3.3 Shape language (from the template)
- Images use **large asymmetric rounded corners**: for example `rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-lg rounded-bl-lg`. Alternate the pattern between cards for rhythm.
- **Pill filters** for menu categories (active = solid orange, inactive = blush with orange text).
- **Circular orange icon badges** that overlap image edges (like "Fresh Ingredients / Fast Service / Hand Made" in the template).
- **Round orange arrow buttons** for carousels.
- A **rotating circular text badge** (like the "FOOD DELICIOUS" ring in the template) near the hero, reading "FRESHLY BAKED IN ABUJA • MADE TO ORDER •", with a small orange dot in the centre.
- Soft layered shadows (`0 20px 60px -20px rgba(43,26,18,.18)`), never harsh.
- Delicate hand-drawn botanical/sprig line illustrations in light grey/gold as background decoration at section edges (SVG, very subtle, hidden on small screens if crowded).
- Primary CTA buttons: solid orange, uppercase, small letter-spaced Jost, square-ish corners like the template's "ORDER SERVICE" (a 4 to 6px radius). Secondary buttons: solid cocoa or outlined.

### 3.4 Motion (premium, never gimmicky)
- Page and section **fade-up on scroll** (`whileInView`, once, 16 to 24px translate, 0.6s, ease `[0.22,1,0.36,1]`), with staggered children.
- Hero image: subtle slow parallax or scale-in; the circular text badge rotates slowly.
- Product cards: gentle lift and image zoom on hover (desktop); tap feedback on mobile.
- Add-to-cart: a small "fly to cart" or badge bump animation; cart drawer slides in with spring physics.
- Smooth page transitions and animated menu-category switching (`AnimatePresence`, layout animations).
- **Respect `prefers-reduced-motion`**: disable parallax, rotation and large movements.
- Keep animations GPU-friendly (transform/opacity only). No layout shift.

---

## 4. Information architecture and page specs

Global: sticky header (logo left, nav centre, cart icon with count badge and orange "ORDER NOW" button right). On mobile: logo, cart icon and a hamburger opening a full-screen blush menu with large serif links. Footer in solid orange (like the template) with contact, social links, delivery note, hours, and a row of rounded food images above it. Floating WhatsApp button (bottom-right, above the safe area) on every page except checkout.

### Home `/`
1. **Hero:** large two-tone serif headline ("CELEBRATION CAKES" with "CAKES" in orange), supporting line, two CTAs (**View Menu**, **Custom Order**), social icon circles (Instagram, WhatsApp), the rounded hero image with asymmetric corners, the overlapping floating product image, and the rotating text badge.
2. **Trust strip / three feature badges:** "Fresh Ingredients", "Made to Order", "Delivered Across Abuja" with circular orange icon badges overlapping rounded images.
3. **Signature picks:** a carousel of featured cakes with round arrow buttons (swipeable on mobile).
4. **Categories:** large image tiles for Celebration Cakes, Cake Parfait, Small Chops.
5. **Occasions carousel** (like "Weddings / Picnics / Corporate"): Birthdays, Weddings, Corporate, Baby Showers, Anniversaries.
6. **How it works:** 4 steps (Choose your treats, Add to cart, Send order on WhatsApp, Confirm and pay with Fatish). Mention the 48-hour lead time.
7. **Orange CTA banner** with rounded corners and a cut-out style image ("ORDER TREATS THAT EXCITE YOUR PALATE") and an Order Now button.
8. **Reviews preview**, **Instagram CTA** (follow @fatishcakes, 16.8K followers), **Delivery coverage note**.

### Menu `/menu`
- Eyebrow + two-tone headline ("MAKE YOUR EVENT THE BEST WITH OUR MENU").
- Pill filters: **All, Celebration Cakes, Cake Parfait, Small Chops**, with a search box. URL-synced (`?category=`).
- Product cards: image with asymmetric corners, name, short description, price ("From ₦X" or "Price on request"), and an **Add to Cart** button.
- Product detail opens in a **bottom sheet on mobile / modal or dedicated page on desktop** (`/menu/[slug]`, statically generated) with: gallery, description, option selectors, quantity, and Add to Cart.

### Product options (data-driven per product)
- **Cakes:** size (e.g. 6", 8", 10", tiers; sizes defined in data), layers, flavour, filling/frosting, **custom inscription text**, optional colour theme/notes, optional reference-image note ("send your inspiration picture on WhatsApp").
- **Parfait:** cup size/pack count, flavour.
- **Small chops:** pack size / quantity, selection of items.
- Each product defines which option groups it uses. Options can carry optional price modifiers. If any price is null, the UI shows "Price confirmed on WhatsApp".

### Cart (drawer) and Checkout `/checkout`
- Cart drawer from any page: line items with options summary, quantity stepper, remove, running subtotal (or "Price confirmed on WhatsApp" if any item is unpriced).
- `/checkout` is a single clean mobile-first form:
  - Full name, phone number (Nigerian format validation), email (optional)
  - **Fulfilment:** Pickup or Delivery. If Delivery: area/neighbourhood in Abuja and full address
  - **Event/needed-by date and time**, with a date picker that **disables anything earlier than now + 48 hours** and shows a friendly note about the lead time
  - **Allergy notes** (clearly labelled textarea: "Any allergies or dietary requirements?"), and "Message / inscription on cake" and "Extra notes"
  - Consent checkbox: "I understand my order is confirmed once Fatish Cakes replies on WhatsApp"
  - Summary panel with all items
  - Primary button: **"Send Order on WhatsApp"**
- On submit: validate, build the message (section 5), open `https://wa.me/2348060320401?text=<encoded>` in a new tab (use `window.open` with a fallback `<a>` link in case the popup is blocked), then show a **success screen** ("Almost done! Complete your order on WhatsApp") with a "Open WhatsApp again" button and "Clear cart" option. Do not clear the cart automatically until the user confirms, in case WhatsApp did not open.

### Custom Orders `/custom-orders`
Story-led page about bespoke cakes (themes, tiers, wedding and corporate), plus a form (occasion, servings, budget range, theme/colours, inscription, date with 48h rule, allergies, notes) that sends a structured **custom order** message to WhatsApp, with a prompt to attach inspiration images in the chat.

### Gallery `/gallery`
Masonry grid of the owner's real photos with category filters, lightbox with keyboard and swipe support, and a prominent "Follow on Instagram" CTA. Images lazy-loaded with blur placeholders.

### Reviews `/reviews`
Testimonial cards, star ratings in gold, and an option to "Send us your review on WhatsApp". Use data from `/data/reviews.ts`. **Ship with clearly marked placeholder reviews (`placeholder: true`) that show a small "Sample review" tag in dev only and have a TODO to replace them with real ones.** Never present fabricated reviews as real in production: add a build-time warning if any `placeholder: true` review remains.

### About the Founder `/about`
Warm editorial layout using the founder's photo (supplied by owner) in an asymmetric rounded frame, her story (placeholder copy marked TODO), brand values (Quality, Freshness, Care) and "Certified" credentials area (placeholder).

### Delivery & Policy `/delivery-policy`
Delivery across the entire Abuja, **48-hour minimum lead time**, pickup/delivery options, payment on WhatsApp, an allergy and ingredients notice, and TODO placeholders for deposit, cancellation and refund terms. Clear, scannable accordion sections.

### FAQ `/faq`
Accordion with FAQ schema markup (JSON-LD). Seed questions: how to order, lead time, delivery areas, custom designs, allergies, payment, changes and cancellations (marked TODO where the owner must confirm).

### Contact `/contact`
WhatsApp (primary), Instagram, Snack Bar IG, Linktree, delivery coverage, hours (TODO), pickup address (TODO). A simple "Chat on WhatsApp" card with a generic pre-filled greeting. No email form in v1.

---

## 5. WhatsApp message format

Create `/lib/whatsapp.ts` with a pure, unit-tested function `buildOrderMessage(order)` and a `buildWhatsAppUrl(message)` that uses `encodeURIComponent`. Number constant lives in `/data/site.ts` as `2348060320401`.

Message (plain text, WhatsApp-friendly, no markdown tables, emojis are fine but sparse):

```
Hello Fatish Cakes 👋
I'd like to place an order from your website.

*ORDER #FC-<YYMMDD>-<4 random chars>*

*Items*
1. Vanilla Berry Cake, 8", 2 layers, Strawberry filling
   Inscription: "Happy Birthday Amina"
   Qty: 1 | Price: ₦X (or "Price on request")
2. Small Chops Platter (Large) x2

*Estimated total:* ₦X (or "To be confirmed")

*Customer*
Name: ...
Phone: ...

*Fulfilment:* Delivery
Area: Gwarinpa
Address: ...

*Needed by:* Sat, 21 Nov 2026 at 2:00 PM

*Allergy / dietary notes:* None (or text)
*Extra notes:* ...

Please confirm availability and payment details. Thank you!
```
Rules: trim and sanitise all user text, cap length so the URL stays under about 1,800 characters (if longer, truncate notes and add "(see full details in chat)"), and use `\n` line breaks. Wrap in the exact same structure for custom orders with a `*CUSTOM ORDER REQUEST*` heading.

---

## 6. Mobile-first and responsiveness rules (critical)

- Design at **360px first**, then scale up through 640 / 768 / 1024 / 1280 / 1536. Test at 360, 390, 414, 768, 1024 and 1440.
- No horizontal scroll at any width. Use `min-w-0`, fluid grids and `clamp()`.
- Tap targets at least 44x44px. Inputs at least 16px font size (prevents iOS zoom). Use correct `inputMode`/`autocomplete` (`tel`, `name`, `street-address`).
- Use `100dvh` (not `100vh`) for full-height elements, and respect safe-area insets (`env(safe-area-inset-bottom)`) for the floating WhatsApp button, cart bar and sheets.
- **Mobile sticky bottom cart bar** on the menu and product pages once the cart has items ("View Cart (3) · ₦X").
- Carousels: native scroll-snap with touch swipe; arrows hidden on mobile.
- Bottom sheets and drawers trap focus, close on swipe-down/Escape, and lock body scroll.
- Hero must be fully legible without scrolling on a 360x640 screen.
- Target Nigerian mobile network realities: images in AVIF/WebP, small JS bundles, lazy-load below the fold, no autoplaying video.

---

## 7. SEO and Local SEO (fatishcakes.com)

- `metadata` per page (title templates, descriptions, canonical URLs, Open Graph and Twitter cards), plus a generated OG image (`opengraph-image.tsx`) with the logo and orange palette.
- Target keywords naturally in copy and headings: "cakes in Abuja", "birthday cakes in Abuja", "wedding cakes Abuja", "small chops Abuja", "cake delivery Abuja", "cake parfait Abuja", "custom cakes Abuja". Examples: Home title `Fatish Cakes | Premium Celebration Cakes & Small Chops in Abuja`.
- **JSON-LD:** `Bakery`/`LocalBusiness` (name, url, logo, image, telephone, `areaServed: Abuja`, `sameAs` with Instagram, snack bar IG and Linktree, `priceRange`, opening hours when provided, `potentialAction` OrderAction pointing to the WhatsApp link), `Product`/`Offer` on product pages (only if prices exist), `FAQPage`, `BreadcrumbList`, `Review`/`AggregateRating` **only for real reviews**.
- `app/sitemap.ts`, `app/robots.ts`, semantic HTML (one `h1` per page, logical headings, landmarks), descriptive `alt` text on every image (e.g. "Chocolate drip birthday cake in Abuja by Fatish Cakes").
- A "Areas we serve in Abuja" section on the Delivery page listing popular neighbourhoods (Gwarinpa, Kubwa, Karsana, Dawaki, Wuse, Maitama, Garki, Jabi, Asokoro, Lifecamp and others) written as helpful content, not keyword stuffing.
- Core Web Vitals targets: Lighthouse mobile **Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100**. LCP under 2.5s, CLS under 0.1.
- Add a GA4 hook (env var `NEXT_PUBLIC_GA_ID`, off if unset) and track events: `add_to_cart`, `begin_checkout`, `whatsapp_order_click`. Add a Meta Pixel hook the same way (`NEXT_PUBLIC_META_PIXEL_ID`).

---

## 8. Brand assets

- The owner's logo (transparent PNG) will be placed at `/public/brand/logo.png`. If it is missing when you start, use a text wordmark fallback in Cormorant Garamond and leave a clearly named TODO; do not draw a fake logo.
- **Favicon:** generate from the logo with a small script (use `sharp`): `app/icon.png` (512), `app/apple-icon.png` (180), and a multi-size `favicon.ico`. Because the logo is transparent, place it on a rounded `--blush-50` or cream square with padding so it stays visible in light and dark browser tabs. Add a `manifest.webmanifest` with the theme colour `#DC5A06`.
- Product, gallery, founder and hero photos will be supplied by the owner in `/public/images/<category>/`. Until then use neutral placeholder images via a single `placeholderImage()` helper so swapping is a one-line change per item. Keep consistent aspect ratios (cards 4:5, hero 4:5 or 1:1, gallery masonry). Write a short `IMAGES.md` explaining naming conventions and recommended export sizes for the owner.

---

## 9. Code quality and structure

```
/app            routes, layout, metadata, sitemap, robots, opengraph-image
/components     ui/ (Button, Pill, Badge, Sheet, Accordion), layout/, home/, menu/, cart/, forms/
/data           typed content (site, products, reviews, faqs, gallery, policies)
/lib            content accessors, whatsapp.ts, cart store, utils, analytics
/public         brand/, images/, fonts (none, use next/font)
```
- TypeScript strict, ESLint + Prettier, no `any`.
- Accessible by default: semantic elements, visible focus rings (orange), ARIA on drawers/modals/accordions, labelled inputs with inline error messages, keyboard navigation, `alt` text.
- Unit tests (Vitest) for `buildOrderMessage`, the 48-hour date rule and cart totals. One Playwright smoke test: add to cart, checkout, assert the generated `wa.me` URL.
- A `README.md` covering setup, environment variables, how to edit content, how to swap images, and how to deploy to Vercel and connect `fatishcakes.com`.

---

## 10. Phased build plan

**Phase 1: Foundation.** Scaffold Next.js, Tailwind tokens, fonts, layout (header, footer, mobile menu, floating WhatsApp button), logo and favicon pipeline, `/data` types and seed content with placeholders. *Stop and show me the home skeleton on mobile and desktop.*

**Phase 2: Home page.** All Home sections with real motion and the rotating badge, polished at 360px and 1440px.

**Phase 3: Menu and product experience.** Menu, filters, search, product detail with options, cart store, cart drawer, mobile sticky cart bar.

**Phase 4: Checkout and WhatsApp.** Checkout form (48h rule, allergy notes), message builder, WhatsApp handoff and success state, tests, Custom Orders page.

**Phase 5: Content pages.** Gallery (lightbox), Reviews, About, Delivery & Policy, FAQ, Contact.

**Phase 6: SEO, performance, QA.** Metadata, JSON-LD, sitemap/robots, OG image, analytics hooks, Lighthouse and accessibility pass, cross-device testing (iOS Safari, Chrome Android), fix issues, final README.

---

## 11. Acceptance checklist

- [ ] Looks and feels like the reference template, but softer, warmer and more luxurious, with the Fatish brand colours
- [ ] Flawless at 360px with no horizontal scroll, thumb-friendly, 16px inputs, safe-area aware
- [ ] Cart persists across refresh; options and inscription show clearly
- [ ] Checkout rejects dates inside the 48-hour window and captures allergy notes
- [ ] "Send Order on WhatsApp" opens `wa.me/2348060320401` with a correctly formatted, encoded message
- [ ] No fabricated prices, reviews, addresses, hours or policies in production, with all placeholders flagged
- [ ] Logo used in header, footer and favicon; theme colour set
- [ ] Lighthouse mobile targets met; JSON-LD validates; sitemap and robots present
- [ ] Content fully separated in `/data` so a CMS can be added later with no component rewrites
- [ ] `prefers-reduced-motion` respected; keyboard and screen-reader friendly

## Ground rules
- Don't add payment gateways, accounts/login, or a backend in v1.
- Don't invent business facts. Use placeholders and list every TODO for the owner at the end of each phase.
- Ask me before making any decision that changes scope, brand or ordering behaviour.
- Prefer simple, well-structured code over cleverness. Commit after each phase with a clear message.
