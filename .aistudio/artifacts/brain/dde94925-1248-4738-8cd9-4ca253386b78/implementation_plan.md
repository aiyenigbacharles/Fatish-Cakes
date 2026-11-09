# FATISH CAKES — Premium Dessert & Celebration Cake Ordering Experience

A high-converting, luxurious dessert ordering web application for **Fatish Cakes** (Abuja, Nigeria), tailored for mobile-first Instagram & WhatsApp clientele and desktop pitching.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed User Preferences (Phase 1):**
> 1. **Product Categorization Order**: Celebration Cakes will be prioritized first, followed by Cake Parfaits and Small Chops.
> 2. **Unpriced Products Strategy**: Items without fixed catalog prices will clearly display *"Price on request"* and be dynamically summarized as *"Price confirmed on WhatsApp"* in the cart and checkout summary.
> 3. **Lead Time Enforced**: The 48-hour minimum order window will strictly constrain the date/time picker, with clear user feedback explaining why earlier slots are unavailable.
> 4. **No Online Payment Gateway**: Fulfilment and payment details are settled directly with Fatish Cakes via pre-filled, formatted WhatsApp Business messages (`+234 806 032 0401`).

---

## 1. Overview & Core Concept

- **What It Does**: Fatish Cakes is an Abuja-based artisanal bakery specializing in bespoke celebration cakes, dessert parfaits, and small chops. The website acts as a premium digital catalog, bespoke cake customizer, and streamlined order builder that compiles orders into structured, sanitised WhatsApp chats.
- **Target Audience / Persona**: High-taste event hosts, wedding planners, corporate organizers, birthday celebrants, and dessert lovers in Abuja looking for premium aesthetics, transparent lead times, and seamless mobile ordering.
- **Key Value**: Replaces chaotic Instagram DM inquiries with a frictionless, high-trust ordering flow with real-time cart persistence, strict 48-hour event scheduling, and clean WhatsApp handoff.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Aesthetic Direction**: Artisanal luxury and warmth, inspired by fine European patisseries and Nigerian celebration culture. Clean, airy spaces with soft organic curves, warm lighting, and zero generic AI slop.
- **Color Palette Tokens**:
  - `--orange-600: #DC5A06` (Primary CTA, hero accent words, notification indicators)
  - `--orange-700: #B84A04` (Hover/active states, accessible high-contrast tap states)
  - `--blush-50: #FFF5F2` (Warm alternate section background)
  - `--blush-100: #FBE6DF` (Soft interactive cards, option pills)
  - `--rose-200: #F4CFC6` (Gentle dessert accent, decorative subtle touches)
  - `--cream-50: #FFFBF8` (Dominant page background canvas)
  - `--gold-500: #C9A24B` (Extracted from the chef hat logo: stars, thin dividers, luxury accents)
  - `--cocoa-900: #2B1A12` (Headings, primary typography, deep contrast text)
  - `--cocoa-600: #6B4A3A` (Secondary body copy, descriptions, metadata)
  - `--white: #FFFFFF` (Card surfaces, modals, drawers)
- **Typography Pairing**:
  - **Display / Headlines**: *Cormorant Garamond* (uppercase, high contrast, two-tone with cocoa & orange emphasis, tight tracking).
  - **Body & UI**: *Jost* (clean, geometric, legible at small sizes, generous letter spacing for uppercase eyebrows like `EXPLORE OUR CREATIONS`).
- **Shape Language & Motion**:
  - Asymmetric rounded corners alternating across cards (`rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg`).
  - Rotating circular badge near hero: `"FRESHLY BAKED IN ABUJA • MADE TO ORDER •"` with central gold/orange pip.
  - Smooth 200ms cubic-bezier transitions, GPU-accelerated motion via `motion`, honoring `prefers-reduced-motion`.
  - Floating WhatsApp concierge button anchored bottom-right with safe-area padding.

---

## 3. Key Product Decisions & Trade-Offs

- **View Routing & Navigation**:
  - *Chosen Approach*: Multi-view client navigation (Home, Menu with category filters, Custom Orders, Gallery, Reviews, About Founder, Delivery & Policies, FAQ, Contact, Checkout) with active URL hash/history synchronization.
  - *Why*: Instantaneous zero-reload screen switches, optimal for mobile web users on Nigerian mobile data networks, zero bundle bloat, zero server lag.
- **Cart State Management & Persistence**:
  - *Chosen Approach*: Reactive local state engine with `localStorage` persistence, custom event synchronization, and optimistic UI updates.
  - *Why*: Shoppers can browse, configure cakes with inscriptions, close their browser, and return with cart intact without requiring an account.
- **Validation & 48-Hour Lead Time Constraint**:
  - *Chosen Approach*: Interactive calendar validator locking dates `< Date.now() + 48 hours` with celebratory messaging for valid dates and explanatory notices for locked dates.
- **WhatsApp Message Serialization**:
  - *Chosen Approach*: Clean, formatted text encoder with sanitization, line break preservation, item breakdown, and automatic length capping (`encodeURIComponent` with fallback copy-to-clipboard if popup is blocked).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          FATISH CAKES WEB APP                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌─────────────────────────┐             ┌──────────────────────────┐  │
│  │     Global Header       │             │    Cart Drawer & Sheet   │  │
│  │ • Logo & Brand Wordmark │             │ • Line items & options   │  │
│  │ • 1-Line Navigation     │             │ • Inscription display    │  │
│  │ • Cart Trigger & Order  │             │ • Dynamic subtotal       │  │
│  └────────────┬────────────┘             └────────────┬─────────────┘  │
│               │                                       │                │
│  ┌────────────▼───────────────────────────────────────▼─────────────┐  │
│  │                   App Router / View Switcher                     │  │
│  │                                                                  │  │
│  │  [Home]        • Hero with Rotating Badge & Asymmetric Visuals   │  │
│  │                • Signature Cakes Carousel                        │  │
│  │                • Category Tiles & Occasion Showcases             │  │
│  │                • 4-Step "How Ordering Works" Guide               │  │
│  │  [Menu]        • Search, Pill Filters, Category Sub-grids        │  │
│  │                • Product Customizer Modal / Bottom Sheet         │  │
│  │                • Cake Size, Flavour, Filling, Inscription        │  │
│  │  [Custom]      • Bespoke Cake Form (Tiers, Budget, Theme, Date)  │  │
│  │  [Checkout]    • 48h Date Enforcement, Abuja Areas, Allergies    │  │
│  │                • WhatsApp URL Handshake & Success State          │  │
│  │  [Gallery]     • Masonry Grid & Responsive Lightbox              │  │
│  │  [Reviews]     • Star Ratings, Real Testimonial Placeholders     │  │
│  │  [About]       • Founder Story, Certified Quality Pillars        │  │
│  │  [Policies]    • Delivery Areas in Abuja, Allergen & Lead Times  │  │
│  │  [FAQ]         • Scannable Accordions with Schema.org JSON-LD    │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     │                                  │
│  ┌──────────────────────────────────▼───────────────────────────────┐  │
│  │                       Typed Data & Lib Layer                     │  │
│  │ • /src/data/site.ts        (Contact, phone, WhatsApp, socials)   │  │
│  │ • /src/data/products.ts    (Cakes, parfaits, chops, options)     │  │
│  │ • /src/data/reviews.ts     (Marked sample reviews with TODOs)    │  │
│  │ • /src/data/policies.ts    (Abuja delivery, 48h lead time)       │  │
│  │ • /src/lib/whatsapp.ts     (Unit-tested WhatsApp payload builder)│  │
│  │ • /src/lib/cart.ts         (Cart store with localStorage sync)   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Structures & State
- **Product Entity**: `id`, `slug`, `name`, `category` (`cakes` | `parfait` | `chops`), `price` (number or null for quote), `description`, `images`, `leadTimeHours`, `badge`, `options` (sizes, flavours, fillings, tiers, inscriptions).
- **Cart Item**: `cartItemId`, `productId`, `name`, `price`, `quantity`, `selectedOptions`, `inscription`, `specialNotes`.
- **Order Payload**: `customerName`, `phoneNumber`, `fulfilmentType` (`pickup` | `delivery`), `deliveryArea`, `deliveryAddress`, `eventDateTime`, `allergyNotes`, `notes`, `items`, `totalEstimate`.

---

## 5. Phased Execution Steps

1. **Phase 1: Foundation & Design System Setup**
   - Import and mount Google Fonts (*Cormorant Garamond* & *Jost*) with optical fallback.
   - Configure Tailwind v4 design tokens (`--orange-600`, `--cream-50`, `--cocoa-900`, `--gold-500`, `--blush-50`).
   - Populate `/src/data/` with typed seed data for products, options, reviews, FAQs, Abuja delivery zones, and site configurations.
   - Set up `/src/lib/whatsapp.ts` with WhatsApp URL compiler and `/src/lib/cart.ts` reactive store.
   - Build global sticky Header, mobile drawer navigation, Footer, and floating WhatsApp concierge.

2. **Phase 2: Home Page & Signature Showcase**
   - Build high-impact Hero with the golden chef hat brand logo, rotating text badge, and asymmetric image corners.
   - Implement three trust badges (*Fresh Ingredients*, *Made to Order*, *Abuja-Wide Delivery*).
   - Implement the interactive Signature Picks carousel, Category gateway tiles, Occasions cards, and 4-Step ordering timeline.
   - Add rich call-to-action banners and delivery coverage spotlight.

3. **Phase 3: Interactive Menu & Product Customizer**
   - Search bar and category pill filters (`All`, `Celebration Cakes`, `Cake Parfait`, `Small Chops`).
   - Asymmetric product cards with instant quick-add or "Customize" trigger.
   - Product detail modal (bottom sheet on mobile, centered modal on desktop):
     - Size/layer selection with dynamic price calculation
     - Cake flavor & filling selectors
     - Custom inscription text input with live character counter
     - Special notes & photo reference prompt ("send inspiration image on WhatsApp")
   - Mobile sticky bottom cart bar indicator.

4. **Phase 4: Cart Drawer, Checkout & WhatsApp Handshake**
   - Slide-out Cart Drawer with itemized configurations, quantity steppers, and clear remove actions.
   - Dedicated Checkout view:
     - Full name and Nigerian phone validation (`+234...` or `080...`)
     - Fulfilment selector (Pickup vs Delivery with Abuja neighborhoods dropdown: Gwarinpa, Wuse, Maitama, Jabi, etc.)
     - Event date & time picker enforcing the **strict 48-hour lead time**
     - Prominent Allergen & dietary requirements field
     - Confirmation checkbox
     - WhatsApp submission button that launches `wa.me/2348060320401` with compiled text and displays the post-launch success screen.

5. **Phase 5: Content Pages (Custom Orders, Gallery, Reviews, About, Policy, FAQ, Contact)**
   - Custom Orders wizard for multi-tiered bespoke celebration cakes.
   - Masonry Gallery with lightbox and Instagram CTA.
   - Reviews page highlighting sample testimonials clearly marked for owner verification.
   - About the Founder page with brand story and quality certifications.
   - Delivery & Policies accordion detailing Abuja coverage, lead times, and pickup instructions.
   - FAQ with search and Schema.org JSON-LD structured data.

6. **Phase 6: Verification, SEO, & Final Polish**
   - Validate HTML semantic landmarks, SEO titles, meta descriptions, and JSON-LD `LocalBusiness` / `Bakery` markup.
   - Verify mobile responsiveness at 360px, 390px, 768px, and 1440px desktop.
   - Run compilation and linting to ensure zero build errors.
