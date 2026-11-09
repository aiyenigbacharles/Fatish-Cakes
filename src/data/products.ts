/**
 * Products catalog for FATISH CAKES
 * Updated with real product photos provided by Fatish Cakes.
 * Priority: Celebration Cakes first, followed by Cake Parfaits and Small Chops.
 */

export type ProductCategory = 'cakes' | 'parfait' | 'chops';

export interface ProductOptionChoice {
  label: string;
  priceModifier?: number;
}

export interface ProductOptionGroup {
  id: string;
  name: string;
  required: boolean;
  choices: ProductOptionChoice[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  longDescription: string;
  basePrice: number | null; // null represents "Price on request"
  leadTimeHours: number;
  featured: boolean;
  image: string;
  gallery?: string[];
  badge?: string;
  options: ProductOptionGroup[];
  allowsInscription?: boolean;
}

export const products: Product[] = [
  // 1. CELEBRATION CAKES (PRIORITY 1)
  {
    id: "fc-cake-01",
    slug: "royal-gold-chocolate-drip-cake",
    name: "Royal Gold & Chocolate Drip Celebration Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Signature white frosted cake adorned with artisanal chocolate drip, cocoa truffles, and edible gold leaf.",
    longDescription: "Our flagship celebration showstopper handcrafted in Abuja. Baked with ultra-moist sponge layers, frosted with silky buttercream, and adorned with delicate chocolate drippings, gold spherical dragées, and chocolate hearts. Personalize with your custom piped message.",
    basePrice: 38000,
    leadTimeHours: 48,
    featured: true,
    badge: "Signature Showstopper",
    image: "/assets/aistudio/Elegant_Gold_and_Chocolate_Birthday_Cake_c6c99068.png",
    gallery: [
      "/assets/aistudio/Elegant_Gold_and_Chocolate_Birthday_Cake_c6c99068.png",
      "/assets/aistudio/Elegant_White_and_Gold_Chocolate_Cake_e700c4ce.png",
      "/assets/aistudio/Elegant_Gold_Birthday_Celebration_Table_bfa5923d.png"
    ],
    allowsInscription: true,
    options: [
      {
        id: "size",
        name: "Cake Size",
        required: true,
        choices: [
          { label: "6-inch (8-10 servings)", priceModifier: 0 },
          { label: "8-inch (16-20 servings)", priceModifier: 14000 },
          { label: "10-inch (28-32 servings)", priceModifier: 28000 },
          { label: "2-Tier Grand Celebration (35+ servings)", priceModifier: 55000 }
        ]
      },
      {
        id: "flavour",
        name: "Sponge Flavour",
        required: true,
        choices: [
          { label: "Classic Vanilla Velvet" },
          { label: "Rich Belgian Chocolate" },
          { label: "Red Velvet with Cream Cheese notes" },
          { label: "Caramel Biscoff Sponge" },
          { label: "Marble Vanilla-Chocolate Swirl" }
        ]
      },
      {
        id: "filling",
        name: "Filling & Frosting",
        required: true,
        choices: [
          { label: "Smooth Vanilla Whipped Buttercream" },
          { label: "Dark Chocolate Fudge Ganache" },
          { label: "Salted Caramel Drizzle & Cream" },
          { label: "Strawberry Compote Filling" }
        ]
      }
    ]
  },
  {
    id: "fc-cake-02",
    slug: "burgundy-gold-floral-celebration-cake",
    name: "Burgundy & Golden Swirl Celebration Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Elegant textured white sponge crowned with rich burgundy rosettes, golden sunburst piping, and gold pearls.",
    longDescription: "A romantic and striking design that creates unforgettable celebration moments. Features intricate buttercream piping in rich burgundy and bright golden yellows, finished with edible gold dragées and your custom greeting.",
    basePrice: 35000,
    leadTimeHours: 48,
    featured: true,
    badge: "Client Favorite",
    image: "/assets/aistudio/Elegant__Happy_Birthday_Babe__Cake_3ba433ff.png",
    gallery: [
      "/assets/aistudio/Elegant__Happy_Birthday_Babe__Cake_3ba433ff.png",
      "/assets/aistudio/Floral_Congratulations_Celebration_Cake_ff55211a.png"
    ],
    allowsInscription: true,
    options: [
      {
        id: "size",
        name: "Cake Size",
        required: true,
        choices: [
          { label: "6-inch (8-10 servings)", priceModifier: 0 },
          { label: "8-inch (16-20 servings)", priceModifier: 12000 },
          { label: "10-inch (28-32 servings)", priceModifier: 25000 }
        ]
      },
      {
        id: "flavour",
        name: "Sponge Flavour",
        required: true,
        choices: [
          { label: "Vanilla & Wild Berry" },
          { label: "Classic Red Velvet" },
          { label: "Belgian Chocolate Sponge" }
        ]
      },
      {
        id: "filling",
        name: "Filling & Frosting",
        required: true,
        choices: [
          { label: "Whipped Vanilla Buttercream" },
          { label: "White Chocolate Ganache" },
          { label: "Strawberry Compote Filling" }
        ]
      }
    ]
  },
  {
    id: "fc-cake-03",
    slug: "bespoke-tiered-peach-rose-cake",
    name: "Bespoke 2-Tier Peach Rose Luxury Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Majestic two-tier peach celebration cake accented with sculpted red roses, ruffled swags, and edible pearls.",
    longDescription: "Designed for grand milestones, engagements, and wedding receptions across Abuja. Flawlessly frosted in warm peach buttercream with classic baroque ruffles and handcrafted crimson roses.",
    basePrice: null, // "Price on request"
    leadTimeHours: 72,
    featured: true,
    badge: "Grand Multi-Tier",
    image: "/assets/aistudio/Elegant_Peach_Rose_Birthday_Cake_28259d4e.png",
    gallery: [
      "/assets/aistudio/Elegant_Peach_Rose_Birthday_Cake_28259d4e.png",
      "/assets/aistudio/Barbie_Princess_Birthday_Cake_ce2425ee.png"
    ],
    allowsInscription: true,
    options: [
      {
        id: "tier",
        name: "Tier Structure",
        required: true,
        choices: [
          { label: "2 Tiers (30-40 guests)" },
          { label: "3 Tiers (80-100 guests)" },
          { label: "4 Tiers Grand Monolith (150+ guests)" }
        ]
      },
      {
        id: "finish",
        name: "Floral & Color Theme",
        required: true,
        choices: [
          { label: "Classic Peach & Red Roses" },
          { label: "White & Gold Leaf Accents" },
          { label: "Custom Wedding Palette (coordinate on WhatsApp)" }
        ]
      }
    ]
  },
  {
    id: "fc-cake-04",
    slug: "chocolate-rosette-milestone-cake",
    name: "Chocolate Rosette & Mocha Milestone Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Velvety white base enveloped with decadent dark chocolate piped roses and golden celebration details.",
    longDescription: "A decadent delight for chocolate lovers. Rich moist cocoa or vanilla sponge enveloped in fresh cream with sculpted chocolate fudge roses and golden sugar accents.",
    basePrice: 36000,
    leadTimeHours: 48,
    featured: false,
    image: "/assets/aistudio/Chocolate_Rose_Birthday_Cake_for_Motto_ba856ff7.png",
    allowsInscription: true,
    options: [
      {
        id: "size",
        name: "Cake Size",
        required: true,
        choices: [
          { label: "6-inch (8-10 servings)", priceModifier: 0 },
          { label: "8-inch (16-20 servings)", priceModifier: 13000 },
          { label: "10-inch (28-32 servings)", priceModifier: 26000 }
        ]
      },
      {
        id: "flavour",
        name: "Sponge Flavour",
        required: true,
        choices: [
          { label: "Triple Dark Chocolate" },
          { label: "Red Velvet Sponge" },
          { label: "Classic Vanilla Velvet" }
        ]
      }
    ]
  },
  {
    id: "fc-cake-05",
    slug: "barbie-princess-whimsical-tiered-cake",
    name: "Barbie Princess 2-Tier Themed Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Enchanting 2-tier pink floral cake with Barbie toppers, flutter butterflies, and golden pearls.",
    longDescription: "The quintessential fairytale birthday cake designed to make every little girl feel like royalty. Hand-piped pink rosette swirls, butterfly accents, and custom acrylic milestone toppers.",
    basePrice: null, // "Price on request"
    leadTimeHours: 48,
    featured: false,
    badge: "Theme Specialist",
    image: "/assets/aistudio/Barbie_Princess_Birthday_Cake_ce2425ee.png",
    allowsInscription: true,
    options: [
      {
        id: "size",
        name: "Cake Size",
        required: true,
        choices: [
          { label: "2-Tier Themed Display (25-30 servings)" },
          { label: "Single Tier (8-inch, 15 servings)" },
          { label: "3-Tier Castle Monolith" }
        ]
      },
      {
        id: "sponge",
        name: "Sponge Flavour",
        required: true,
        choices: [
          { label: "Fluffy Strawberry & Vanilla" },
          { label: "Red Velvet with Cream Cheese" },
          { label: "Chocolate Fudge Sponge" }
        ]
      }
    ]
  },
  {
    id: "fc-cake-06",
    slug: "blue-ombre-bento-and-cupcakes-combo",
    name: "Blue Ombre Bento Cake & Cupcakes Box",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Vibrant blue ombre bento celebration cake paired with two luxury piped gourmet cupcakes in a gift box.",
    longDescription: "The perfect intimate gift package! Features a personalized mini celebration cake with custom piped lettering, accompanied by freshly baked cupcakes adorned with gold metallic beads and candle.",
    basePrice: 22000,
    leadTimeHours: 48,
    featured: true,
    badge: "Gift Box Favorite",
    image: "/assets/aistudio/Blue_Ombre_Birthday_Cake_Box_60b9ebcf.png",
    gallery: [
      "/assets/aistudio/Blue_Ombre_Birthday_Cake_Box_60b9ebcf.png",
      "/assets/aistudio/Elegant_Blue_Birthday_Cake_and_Cupcakes_a781c017.png"
    ],
    allowsInscription: true,
    options: [
      {
        id: "box",
        name: "Combo Box Setup",
        required: true,
        choices: [
          { label: "Bento Cake + 2 Cupcakes (as shown)", priceModifier: 0 },
          { label: "Bento Cake + 5 Cupcakes Deluxe", priceModifier: 8000 }
        ]
      },
      {
        id: "colour",
        name: "Color Tone",
        required: true,
        choices: [
          { label: "Ocean Blue Ombre with Gold" },
          { label: "Pastel Pink Ombre with Gold" },
          { label: "Emerald Green Ombre with Gold" },
          { label: "Classic All-White & Gold" }
        ]
      }
    ]
  },
  {
    id: "fc-cake-07",
    slug: "dr-tulz-golden-congratulations-cake",
    name: "Golden Milestone Congratulations Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Pure ivory frosted cake with piped shell borders, metallic gold dragées, and celebration candle.",
    longDescription: "Subtle elegance designed for graduations, doctorates, promotions, and milestone achievements in Abuja. Finished with clean piped borders and your bespoke congratulatory inscription.",
    basePrice: 32000,
    leadTimeHours: 48,
    featured: false,
    image: "/assets/aistudio/Congratulations_Dr_Tulz_Celebration_Cake_4982f6de.png",
    allowsInscription: true,
    options: [
      {
        id: "size",
        name: "Cake Size",
        required: true,
        choices: [
          { label: "8-inch (16-20 servings)", priceModifier: 0 },
          { label: "10-inch (28-32 servings)", priceModifier: 14000 }
        ]
      },
      {
        id: "flavour",
        name: "Sponge Flavour",
        required: true,
        choices: [
          { label: "Vanilla Velvet" },
          { label: "Chocolate Ganache" },
          { label: "Red Velvet" }
        ]
      }
    ]
  },
  {
    id: "fc-cake-08",
    slug: "the-35th-edition-pink-rosette-cake",
    name: "The 35th Edition Rosette Milestone Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    shortDescription: "Delicate pink piped swirls adorned with gold medallion coins and personalized plaque topper.",
    longDescription: "A sophisticated celebratory centerpiece featuring ruffled rose piping, edible gold coins, and gold dragées. A favorite for milestone birthdays.",
    basePrice: 34000,
    leadTimeHours: 48,
    featured: false,
    badge: "Milestone Edition",
    image: "/assets/aistudio/Elegant_Pink_35th_Edition_Cake_c5bfec6b.png",
    allowsInscription: true,
    options: [
      {
        id: "size",
        name: "Cake Size",
        required: true,
        choices: [
          { label: "8-inch (16-20 servings)", priceModifier: 0 },
          { label: "10-inch (28-32 servings)", priceModifier: 13000 }
        ]
      }
    ]
  },

  // 2. CAKE PARFAIT (PRIORITY 2 - 4 REAL IMAGES)
  {
    id: "fc-parfait-01",
    slug: "fatish-homemade-goodness-parfait-tubs",
    name: "Fatish Signature Homemade Goodness Parfait Tubs",
    category: "parfait",
    categoryLabel: "Cake Parfait",
    shortDescription: "Signature chilled dessert tubs layered with moist sponge cake, velvety whipped Bavarian cream, caramel crunch, and fruit coulis.",
    longDescription: "Our viral Abuja bakery dessert sensation! Each sealed tub is generously layered with tender vanilla and red velvet cake crumbles, rich whipped cream mousse, salted caramel ribbons, crunchy biscuit crumbles, and fruity coulis toppings.",
    basePrice: 5000,
    leadTimeHours: 24,
    featured: true,
    badge: "Abuja Bestseller",
    image: "/assets/aistudio/Taitshcakes_Dessert_Display_bc772563.png",
    gallery: [
      "/assets/aistudio/Taitshcakes_Dessert_Display_bc772563.png",
      "/assets/aistudio/Layered_Dessert_Tubs_Bakery_Display_7713a0d2.png"
    ],
    allowsInscription: false,
    options: [
      {
        id: "pack",
        name: "Pack Size",
        required: true,
        choices: [
          { label: "Single Tub (500ml)", priceModifier: 0 },
          { label: "Trio Pack of 3 Tubs", priceModifier: 9500 },
          { label: "Party Box of 6 Tubs", priceModifier: 24000 }
        ]
      },
      {
        id: "flavour",
        name: "Flavour Selection",
        required: true,
        choices: [
          { label: "Salted Caramel & Cookie Crunch" },
          { label: "Red Velvet & Whipped Bavarian Cream" },
          { label: "Oreo Belgian Chocolate Drizzle" },
          { label: "Assorted Mix Pack" }
        ]
      }
    ]
  },
  {
    id: "fc-parfait-02",
    slug: "tri-flavour-layered-parfait-bakery-display",
    name: "Tri-Flavour Layered Parfait Bakery Tower",
    category: "parfait",
    categoryLabel: "Cake Parfait",
    shortDescription: "Stunning stacked parfait tubs showing distinct cross-sections of Red Velvet, Ultimate Chocolate, and Vanilla Caramel.",
    longDescription: "Freshly prepared every morning in our Abuja bakery. Showcases generous tiers of moist cake, silky custard mousse, and rich chocolate or caramel drizzles. Best enjoyed ice-cold with a spoon.",
    basePrice: 15000,
    leadTimeHours: 24,
    featured: true,
    badge: "Trio Display",
    image: "/assets/aistudio/Layered_Dessert_Tubs_Bakery_Display_7713a0d2.png",
    allowsInscription: false,
    options: [
      {
        id: "set",
        name: "Trio Set Selection",
        required: true,
        choices: [
          { label: "Set of 3 Assorted Flavours (Red Velvet, Chocolate, Caramel)", priceModifier: 0 },
          { label: "Set of 6 Deluxe Party Stack", priceModifier: 14000 }
        ]
      }
    ]
  },
  {
    id: "fc-parfait-03",
    slug: "appreciation-mini-cake-parfait-gift-cups",
    name: "“Thanks for Your Support” Mini Parfait Gift Cups",
    category: "parfait",
    categoryLabel: "Cake Parfait",
    shortDescription: "Gourmet cake parfait dessert cups labeled with heartfelt appreciation tags. Perfect for event favors and gifting.",
    longDescription: "Elevate your party favors, bridal showers, corporate thank-yous, and milestone giveaways in Abuja. Each cup comes topped with crunchy nuts, caramel drizzle, and custom sticker seals.",
    basePrice: 18000,
    leadTimeHours: 48,
    featured: false,
    badge: "Event Favors",
    image: "/assets/aistudio/Mini_Cake_Cups__Thanks_for_Your_Support_68aba667.png",
    allowsInscription: false,
    options: [
      {
        id: "box",
        name: "Gift Pack Quantity",
        required: true,
        choices: [
          { label: "Box of 6 Individual Gift Cups", priceModifier: 0 },
          { label: "Box of 12 Individual Gift Cups", priceModifier: 16000 },
          { label: "Party Tray of 24 Gift Cups", priceModifier: 48000 }
        ]
      },
      {
        id: "flavour",
        name: "Topping Profile",
        required: true,
        choices: [
          { label: "Caramel Walnut & Butterscotch" },
          { label: "Oreo Crumble & Fudge" },
          { label: "Assorted Party Mix" }
        ]
      }
    ]
  },
  {
    id: "fc-parfait-04",
    slug: "ultimate-chocolate-deluxe-parfait-stack",
    name: "Ultimate Chocolate & Red Velvet Parfait Stack",
    category: "parfait",
    categoryLabel: "Cake Parfait",
    shortDescription: "Deep chocolate and red velvet sponge layers with crushed cookies, ganache drizzle, and rich cream cheese mousse.",
    longDescription: "A chocoholic's paradise crafted in Abuja! Quadruple layers of rich Belgian cocoa sponge cake with whipped white cream, chocolate syrup drip, and generous dark cookie crumbles.",
    basePrice: 5500,
    leadTimeHours: 24,
    featured: false,
    badge: "Decadent Treat",
    image: "/assets/aistudio/Layered_Dessert_Tub_Display_5c4120ce.png",
    allowsInscription: false,
    options: [
      {
        id: "size",
        name: "Tub Size",
        required: true,
        choices: [
          { label: "Single Grand Tub (650ml)", priceModifier: 0 },
          { label: "Twin Pack (2 x 650ml)", priceModifier: 5000 },
          { label: "Quad Stack (4 x 650ml)", priceModifier: 15000 }
        ]
      }
    ]
  },

  // 3. SMALL CHOPS (PRIORITY 3 - 8 REAL IMAGES)
  {
    id: "fc-chops-01",
    slug: "celebration-cake-and-crispy-small-chops-spread",
    name: "Celebration Cake & Hot Small Chops Party Spread",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Complete celebration package: Custom buttercream cake alongside a full box of golden puff-puffs, beef samosas, and spring rolls.",
    longDescription: "The all-in-one catering solution photographed live in our Abuja kitchen! Includes your freshly baked and frosted celebration cake alongside a hot box of crispy golden samosas, hand-rolled spring rolls, and fluffy sweet puff-puffs.",
    basePrice: 58000,
    leadTimeHours: 48,
    featured: true,
    badge: "Cake + Chops Combo",
    image: "/assets/aistudio/Golden_Fried_Snacks_and_Celebration_Cake_93f738c1.png",
    gallery: [
      "/assets/aistudio/Golden_Fried_Snacks_and_Celebration_Cake_93f738c1.png",
      "/assets/aistudio/Golden_Nigerian_Party_Snacks_Box_4cc2a06e.png"
    ],
    allowsInscription: true,
    options: [
      {
        id: "package",
        name: "Package Scale",
        required: true,
        choices: [
          { label: "Standard Party Pack (6-inch Cake + 30 Chops for 10-12)", priceModifier: 0 },
          { label: "VIP Grand Pack (8-inch Cake + 60 Chops for 20-25)", priceModifier: 32000 }
        ]
      }
    ]
  },
  {
    id: "fc-chops-02",
    slug: "golden-assorted-party-small-chops-box",
    name: "Golden Assorted Party Small Chops Box",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Freshly fried golden puff-puff balls, crispy spiced beef samosas, and crunchy spring rolls arranged in a clean gift box.",
    longDescription: "Freshly fried to golden perfection with crisp pastry shells and fluffy sweet puff-puffs. Seasoned with traditional Nigerian aromatic spices and delivered warm across Abuja.",
    basePrice: 16000,
    leadTimeHours: 24,
    featured: false,
    badge: "Party Essential",
    image: "/assets/aistudio/Golden_Assorted_Fried_Snacks_8c6b04bb.png",
    allowsInscription: false,
    options: [
      {
        id: "size",
        name: "Box Quantity",
        required: true,
        choices: [
          { label: "Standard Party Box (30 Pieces)", priceModifier: 0 },
          { label: "Double Celebration Box (60 Pieces)", priceModifier: 15000 }
        ]
      }
    ]
  },
  {
    id: "fc-chops-03",
    slug: "grand-catering-snack-platter-tray",
    name: "Grand Catering Small Chops Platter Tray",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Mega catering platter packed with dozens of golden sweet puff-puffs, crunchy triangle samosas, and rolled spring rolls.",
    longDescription: "Designed for corporate functions, birthday celebrations, and festive banquets. High-volume, freshly fried pastry tray keeping guests satisfied from start to finish.",
    basePrice: 35000,
    leadTimeHours: 48,
    featured: true,
    badge: "Mega Platter",
    image: "/assets/aistudio/Golden_Fried_Snack_Platter_48bdf0fe.png",
    allowsInscription: false,
    options: [
      {
        id: "platter",
        name: "Platter Scale",
        required: true,
        choices: [
          { label: "Platter for 20-25 Guests (70+ Pieces)", priceModifier: 0 },
          { label: "Platter for 40-50 Guests (150+ Pieces)", priceModifier: 32000 }
        ]
      }
    ]
  },
  {
    id: "fc-chops-04",
    slug: "fatish-abuja-signature-party-box",
    name: "Fatish Signature Abuja Small Chops Box",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Authentic branded Abuja celebration box featuring signature fluffy round puff-puffs, hand-crafted samosas, and golden crispy rolls.",
    longDescription: "Our staple small chops box delivered directly across all Abuja districts. Perfect balance of sweet golden puff-puffs, savory beef-filled samosas, and crunchy spring rolls.",
    basePrice: 20000,
    leadTimeHours: 24,
    featured: false,
    badge: "Abuja Favorite",
    image: "/assets/aistudio/Golden_Nigerian_Party_Snacks_Box_4cc2a06e.png",
    allowsInscription: false,
    options: [
      {
        id: "box",
        name: "Box Selection",
        required: true,
        choices: [
          { label: "Box of 40 Assorted Pieces", priceModifier: 0 },
          { label: "Box of 80 Assorted Pieces", priceModifier: 19000 }
        ]
      }
    ]
  },
  {
    id: "fc-chops-05",
    slug: "vip-catering-spread-with-peppered-fish-and-wings",
    name: "VIP Catering Spread with Spicy Peppered Wings & Fish",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Full event catering setup with fiery pepper-glazed chicken wings, grilled fish, double tiers of golden chops, and grab-and-go boxes.",
    longDescription: "Our top-tier event catering installation for high-profile weddings, VIP birthdays, and corporate celebrations in Abuja. Includes dedicated chafing presentation or boxed catering upon request.",
    basePrice: null, // "Price on request"
    leadTimeHours: 48,
    featured: false,
    badge: "VIP Event Setup",
    image: "/assets/aistudio/Nigerian_Fried_Snacks_Catering_Spread_19c33420.png",
    allowsInscription: false,
    options: [
      {
        id: "scale",
        name: "Event Scale",
        required: true,
        choices: [
          { label: "Intimate VIP Gathering (30-50 Guests)" },
          { label: "Medium Banquet (100-200 Guests)" },
          { label: "Grand Wedding / Gala (300+ Guests)" }
        ]
      }
    ]
  },
  {
    id: "fc-chops-06",
    slug: "cocktail-chops-box-with-spicy-skewered-beef",
    name: "Cocktail Chops Box with Toothpicked Spicy Peppered Beef",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Gourmet party box with toothpicked peppered beef kebabs in foil alongside golden puff-puffs, meat samosas, and spring rolls.",
    longDescription: "Tender, slow-braised beef chunks tossed in spicy habanero-bell pepper sauce on wooden cocktail skewers, accompanied by crispy pastry bites and sweet puff-puffs.",
    basePrice: 25000,
    leadTimeHours: 24,
    featured: true,
    badge: "Savory Sensation",
    image: "/assets/aistudio/Nigerian_Snack_Platter_Box_0a1b7e33.png",
    allowsInscription: false,
    options: [
      {
        id: "protein",
        name: "Spice Level",
        required: true,
        choices: [
          { label: "Standard Abuja Pepper Heat" },
          { label: "Mild Peppery Flavor" },
          { label: "Extra Fiery Suicide Heat" }
        ]
      }
    ]
  },
  {
    id: "fc-chops-07",
    slug: "samosas-puff-puffs-and-spiced-roast-chicken",
    name: "Small Chops Platter with Grilled Spiced Chicken",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Golden crispy samosas and sweet puff-puffs served with seasoned, herb-infused grilled quarter chicken pieces.",
    longDescription: "A hearty Nigerian comfort platter featuring juicy grilled quarter chicken cuts seasoned with local suya spices, accompanied by fresh samosas and round golden puff-puffs.",
    basePrice: 28000,
    leadTimeHours: 24,
    featured: false,
    badge: "Hearty Platter",
    image: "/assets/aistudio/Golden_Samosas__Puff-Puffs__and_Spiced_Meat_ce3802ea.png",
    allowsInscription: false,
    options: [
      {
        id: "chicken",
        name: "Chicken Style",
        required: true,
        choices: [
          { label: "2 Quarters Grilled Herb Chicken + Chops", priceModifier: 0 },
          { label: "4 Quarters Grilled Herb Chicken + Chops Deluxe", priceModifier: 16000 }
        ]
      }
    ]
  },
  {
    id: "fc-chops-08",
    slug: "deluxe-snack-box-with-spicy-glazed-wings",
    name: "Deluxe Snack Box with Fiery Glazed Chicken Drumsticks & Wings",
    category: "chops",
    categoryLabel: "Small Chops",
    shortDescription: "Spicy pepper sauce-glazed chicken wings and drumsticks garnished with fresh scallions, paired with golden puff-puffs, spring rolls, and samosas.",
    longDescription: "Our most requested finger-food box in Abuja! Crispy fried chicken wings and drumsticks drenched in our signature spicy pepper glaze and garnished with spring onion greens, served alongside crispy spring rolls, beef samosas, and golden puff-puffs.",
    basePrice: 30000,
    leadTimeHours: 24,
    featured: true,
    badge: "Chef Special",
    image: "/assets/aistudio/Nigerian_Snack_Box_with_Spicy_Wings_f1870ce6.png",
    allowsInscription: false,
    options: [
      {
        id: "portion",
        name: "Box Size",
        required: true,
        choices: [
          { label: "Deluxe Box (Wings + Drumsticks + 30 Chops)", priceModifier: 0 },
          { label: "Double Deluxe Box (Double Wings + 60 Chops)", priceModifier: 22000 }
        ]
      }
    ]
  }
];
