/**
 * Site configuration and brand constants for FATISH CAKES
 * All business facts strictly match official brand details.
 */

export interface SiteConfig {
  brandName: string;
  tagline: string;
  location: string;
  coverage: string;
  whatsappNumber: string; // 2348060320401
  whatsappDisplay: string;
  whatsappUrl: string;
  instagramUrl: string;
  snackBarIgUrl: string;
  linktreeUrl: string;
  domain: string;
  minLeadTimeHours: number;
  pickupAddressNote: string;
  openingHoursNote: string;
  depositTermsNote: string;
}

export const siteConfig: SiteConfig = {
  brandName: "FATISH CAKES",
  tagline: "Premium celebration cakes for customers who love quality",
  location: "Abuja, Nigeria",
  coverage: "Delivers across the entire Federal Capital Territory (FCT), Abuja",
  whatsappNumber: "2348060320401",
  whatsappDisplay: "+234 806 032 0401",
  whatsappUrl: "https://wa.me/2348060320401",
  instagramUrl: "https://instagram.com/fatishcakes",
  snackBarIgUrl: "https://instagram.com/fatishsnackbar_abuja",
  linktreeUrl: "https://linktr.ee/Fatishcakes_n_snacks",
  domain: "fatishcakes.com",
  minLeadTimeHours: 48,
  pickupAddressNote: "Pickup address shared on confirmation (Abuja, FCT)",
  openingHoursNote: "Monday - Saturday: 8:00 AM - 6:00 PM (Orders received 24/7 on WhatsApp)",
  depositTermsNote: "70% commitment deposit required upon order confirmation on WhatsApp. Balance due before delivery/dispatch.",
};
