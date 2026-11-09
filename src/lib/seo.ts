/**
 * SEO & Dynamic Page Metadata Manager for FATISH CAKES
 * Manages unique titles, meta descriptions, canonical URLs, OpenGraph cards,
 * and Schema.org BreadcrumbList structured data across all routes.
 */

export interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage: string;
  h1: string;
  breadcrumbs: { name: string; path: string }[];
}

export const BASE_URL = 'https://fatishcakes.com';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/aistudio/Elegant_Gold_and_Chocolate_Birthday_Cake_c6c99068.png`;

export const PAGE_META_MAP: Record<string, PageMeta> = {
  home: {
    title: 'FATISH CAKES | Bespoke Celebration Cakes & Small Chops in Abuja',
    description: 'Order handcrafted bespoke celebration cakes, dessert parfaits, and hot Nigerian small chops in Abuja. Baked fresh with pure butter and delivered across the FCT.',
    canonicalPath: '/',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Bespoke Celebration Cakes & Small Chops in Abuja',
    breadcrumbs: [{ name: 'Home', path: '#/' }]
  },
  menu: {
    title: 'Celebration Cakes, Parfaits & Chops Menu | FATISH CAKES Abuja',
    description: 'Explore the full Fatish Cakes menu in Abuja: Signature birthday cakes, layered cake parfaits, bento boxes, and golden party small chops platters.',
    canonicalPath: '/#/menu',
    ogImage: `${BASE_URL}/assets/aistudio/Taitshcakes_Dessert_Display_bc772563.png`,
    h1: 'Our Celebration Menu & Patisserie',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'Menu', path: '#/menu' }
    ]
  },
  'custom-orders': {
    title: 'Custom Cake Orders & Bespoke Inquiries | FATISH CAKES Abuja',
    description: 'Design your dream multi-tier wedding or birthday cake in Abuja. Submit your inspiration photos, guest size, and flavor preferences directly on WhatsApp.',
    canonicalPath: '/#/custom-orders',
    ogImage: `${BASE_URL}/assets/aistudio/Barbie_Princess_Birthday_Cake_ce2425ee.png`,
    h1: 'Bespoke Custom Cake Design & Orders',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'Custom Orders', path: '#/custom-orders' }
    ]
  },
  gallery: {
    title: 'Bakery Photo Gallery | FATISH CAKES Abuja Real Creations',
    description: 'View real photography of custom celebration cakes, bridal shower trays, cake parfait cups, and catering platters handcrafted in our Abuja studio.',
    canonicalPath: '/#/gallery',
    ogImage: `${BASE_URL}/assets/aistudio/Blue_Ombre_Birthday_Cake_Box_60b9ebcf.png`,
    h1: 'Abuja Bakery Showcase & Gallery',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'Gallery', path: '#/gallery' }
    ]
  },
  about: {
    title: 'About the Head Chef & Bakery Studio | FATISH CAKES Abuja',
    description: 'Meet the Head Pastry Chef behind Fatish Cakes Abuja. Discover our culinary philosophy, pure butter commitment, and passion for memorable celebrations.',
    canonicalPath: '/#/about',
    ogImage: `${BASE_URL}/assets/aistudio/image_7012cf7f.png`,
    h1: 'About Fatish Cakes & Our Head Chef',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'About Us', path: '#/about' }
    ]
  },
  'delivery-policy': {
    title: 'Abuja Cake Delivery Policies & Lead Times | FATISH CAKES',
    description: 'Learn about our 48-hour minimum lead time, Abuja-wide delivery zones, self-pickup terms, payment procedures, and ingredient allergy notices.',
    canonicalPath: '/#/delivery-policy',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Abuja Delivery Guidelines & Bakery Policies',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'Delivery Policy', path: '#/delivery-policy' }
    ]
  },
  faq: {
    title: 'Frequently Asked Questions & Ordering Guide | FATISH CAKES Abuja',
    description: 'Answers to top questions regarding notice periods, sponge flavours, custom design consultations, delivery fees across Abuja, and storage tips.',
    canonicalPath: '/#/faq',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Frequently Asked Questions & Ordering Guide',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'FAQs', path: '#/faq' }
    ]
  },
  contact: {
    title: 'Contact Fatish Cakes Abuja | WhatsApp Line & Kitchen Hours',
    description: 'Connect directly with our Abuja bakery concierge on WhatsApp (+234 806 032 0401) or Instagram @fatishcakes for orders and consultations.',
    canonicalPath: '/#/contact',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Contact Fatish Cakes Abuja',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'Contact', path: '#/contact' }
    ]
  },
  checkout: {
    title: 'Review Your Order | FATISH CAKES Abuja',
    description: 'Review your selected celebration cakes, parfaits, and small chops before sending your pre-formatted order summary directly to WhatsApp.',
    canonicalPath: '/#/checkout',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Review Your Order & WhatsApp Checkout',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'Menu', path: '#/menu' },
      { name: 'Checkout', path: '#/checkout' }
    ]
  },
  '404': {
    title: 'Page Not Found (404) | FATISH CAKES Abuja',
    description: 'The page you are looking for does not exist or has been moved. Explore our celebration cakes, dessert parfaits, and small chops menu.',
    canonicalPath: '/#/404',
    ogImage: DEFAULT_OG_IMAGE,
    h1: '404: Confectionery Crumb Trail Not Found',
    breadcrumbs: [
      { name: 'Home', path: '#/' },
      { name: 'Page Not Found', path: '#/404' }
    ]
  }
};

/**
 * Updates DOM head elements dynamically on route changes
 */
export function updatePageMeta(view: string): PageMeta {
  const meta = PAGE_META_MAP[view] || PAGE_META_MAP['404'];

  if (typeof document === 'undefined') return meta;

  // 1. Title
  document.title = meta.title;

  // 2. Meta Description
  let descTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.name = 'description';
    document.head.appendChild(descTag);
  }
  descTag.content = meta.description;

  // 3. Canonical Link Tag
  let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.rel = 'canonical';
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.href = `${BASE_URL}${meta.canonicalPath}`;

  // 4. OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
  if (ogTitle) ogTitle.content = meta.title;

  const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
  if (ogDesc) ogDesc.content = meta.description;

  const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
  if (ogUrl) {
    ogUrl.content = `${BASE_URL}${meta.canonicalPath}`;
  } else {
    const newOgUrl = document.createElement('meta');
    newOgUrl.setAttribute('property', 'og:url');
    newOgUrl.content = `${BASE_URL}${meta.canonicalPath}`;
    document.head.appendChild(newOgUrl);
  }

  const ogImg = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
  if (ogImg) ogImg.content = meta.ogImage;

  // 5. Twitter tags
  const twTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
  if (twTitle) twTitle.content = meta.title;

  const twDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
  if (twDesc) twDesc.content = meta.description;

  const twImg = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null;
  if (twImg) {
    twImg.content = meta.ogImage;
  } else {
    const newTwImg = document.createElement('meta');
    newTwImg.name = 'twitter:image';
    newTwImg.content = meta.ogImage;
    document.head.appendChild(newTwImg);
  }

  // 6. Dynamic BreadcrumbList Schema.org JSON-LD
  let breadcrumbScript = document.getElementById('schema-breadcrumbs') as HTMLScriptElement | null;
  if (!breadcrumbScript) {
    breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'schema-breadcrumbs';
    breadcrumbScript.type = 'application/ld+json';
    document.head.appendChild(breadcrumbScript);
  }

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: meta.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.path.replace('#', '')}`
    }))
  };

  breadcrumbScript.textContent = JSON.stringify(breadcrumbListSchema);

  return meta;
}
