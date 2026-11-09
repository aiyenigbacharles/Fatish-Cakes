/**
 * Gallery items for FATISH CAKES
 * Masonry showcase using real product photography from Fatish Cakes Abuja.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cakes' | 'parfait' | 'chops' | 'events';
  categoryLabel: string;
  image: string;
  aspectRatio: 'square' | 'tall' | 'wide';
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Royal Gold & Chocolate Drip Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Elegant_Gold_and_Chocolate_Birthday_Cake_c6c99068.png",
    aspectRatio: "square",
    caption: "Chocolate hearts, gold balls, and delicate drip with 'Happy Birthday Ya Nasila'."
  },
  {
    id: "gal-2",
    title: "Burgundy & Golden Swirl Celebration Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Elegant__Happy_Birthday_Babe__Cake_3ba433ff.png",
    aspectRatio: "square",
    caption: "Textured white frosting with rich burgundy rosettes and gold accents."
  },
  {
    id: "gal-3",
    title: "Bespoke 2-Tier Peach Rose Grand Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Elegant_Peach_Rose_Birthday_Cake_28259d4e.png",
    aspectRatio: "tall",
    caption: "Sculpted crimson roses with classic ruffled borders on peach buttercream."
  },
  {
    id: "gal-4",
    title: "Signature Homemade Goodness Parfait Tubs",
    category: "parfait",
    categoryLabel: "Cake Parfait",
    image: "/assets/aistudio/Taitshcakes_Dessert_Display_bc772563.png",
    aspectRatio: "square",
    caption: "Layered sponge cake tubs with caramel drizzle, cookie crumble, and Bavarian cream."
  },
  {
    id: "gal-5",
    title: "Blue Ombre Bento Cake & Cupcake Gift Box",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Blue_Ombre_Birthday_Cake_Box_60b9ebcf.png",
    aspectRatio: "square",
    caption: "Personalized bento celebration cake with matching golden dragée cupcakes."
  },
  {
    id: "gal-6",
    title: "Fatish Signature Abuja Small Chops Box",
    category: "chops",
    categoryLabel: "Small Chops",
    image: "/assets/aistudio/Golden_Nigerian_Party_Snacks_Box_4cc2a06e.png",
    aspectRatio: "square",
    caption: "Golden sweet puff-puffs, savory beef samosas, and hand-rolled spring rolls."
  },
  {
    id: "gal-7",
    title: "Barbie Princess 2-Tier Castle Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Barbie_Princess_Birthday_Cake_ce2425ee.png",
    aspectRatio: "tall",
    caption: "Two tiers of pink rosette swirls with butterflies and custom milestone topper."
  },
  {
    id: "gal-8",
    title: "Dr. Tulz Golden Milestone Celebration",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Congratulations_Dr_Tulz_Celebration_Cake_4982f6de.png",
    aspectRatio: "square",
    caption: "Clean ivory piping with gold pearls and golden celebration candle."
  },
  {
    id: "gal-9",
    title: "The 35th Edition Rosette Milestone Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Elegant_Pink_35th_Edition_Cake_c5bfec6b.png",
    aspectRatio: "tall",
    caption: "Pink swirl piping with gold medallion coins and celebration badge."
  },
  {
    id: "gal-10",
    title: "Grand Balloon & Cake Table Presentation",
    category: "events",
    categoryLabel: "Events & Setups",
    image: "/assets/aistudio/Elegant_Gold_Birthday_Celebration_Table_bfa5923d.png",
    aspectRatio: "tall",
    caption: "Full luxury gift setup with hot-air balloon bouquet and custom frosted cake."
  },
  {
    id: "gal-11",
    title: "Tall Floral Cake with Madam Gold Topper",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Elegant_Pink_Rose_Birthday_Cake_5bd5951f.png",
    aspectRatio: "tall",
    caption: "Textured tiered barrel cake with giant pink rose and acrylic gold topper."
  },
  {
    id: "gal-12",
    title: "Congratulations on Your New Age Floral Cake",
    category: "cakes",
    categoryLabel: "Celebration Cakes",
    image: "/assets/aistudio/Floral_Congratulations_Celebration_Cake_ff55211a.png",
    aspectRatio: "square",
    caption: "Yellow frosted cake crowned with fresh red daisies and edible plaque."
  }
];
