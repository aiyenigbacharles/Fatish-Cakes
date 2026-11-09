/**
 * CMS-Ready Content Accessor Functions
 * Components only access data via these functions, allowing seamless headless CMS swap later.
 */

import { siteConfig, SiteConfig } from '../data/site.ts';
import { products, Product, ProductCategory } from '../data/products.ts';
import { faqs, FAQ } from '../data/faqs.ts';
import { galleryItems, GalleryItem } from '../data/gallery.ts';
import { abujaDeliveryAreas, policies, AbujaDeliveryArea } from '../data/policies.ts';

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}


export function getAllFaqs(): FAQ[] {
  return faqs;
}

export function getFaqsByCategory(category: FAQ['category']): FAQ[] {
  return faqs.filter((f) => f.category === category);
}

export function getAllGalleryItems(): GalleryItem[] {
  return galleryItems;
}

export function getGalleryItemsByCategory(category: GalleryItem['category']): GalleryItem[] {
  return galleryItems.filter((item) => item.category === category);
}

export function getDeliveryAreas(): AbujaDeliveryArea[] {
  return abujaDeliveryAreas;
}

export function getPolicies() {
  return policies;
}
