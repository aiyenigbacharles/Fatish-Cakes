/**
 * WhatsApp message compiler for FATISH CAKES
 * Adheres strictly to Section 5 of the build brief.
 */

import { siteConfig } from '../data/site.ts';

export interface OrderItemPayload {
  name: string;
  optionsSummary?: string;
  inscription?: string;
  quantity: number;
  unitPrice: number | null; // null represents "Price on request"
  lineTotal: number | null;
}

export interface OrderPayload {
  customerName: string;
  phoneNumber: string;
  email?: string;
  fulfilmentType: 'delivery' | 'pickup';
  deliveryArea?: string;
  deliveryAddress?: string;
  eventDateTime: string; // e.g. "Sat, 21 Nov 2026 at 2:00 PM"
  allergyNotes?: string;
  extraNotes?: string;
  items: OrderItemPayload[];
  totalEstimate: number | null; // null if any item is unpriced
}

export interface CustomOrderPayload {
  customerName: string;
  phoneNumber: string;
  occasion: string;
  servingsOrGuests: string;
  budgetRange: string;
  themeAndColours: string;
  inscription?: string;
  eventDateTime: string;
  fulfilmentType: 'delivery' | 'pickup';
  deliveryArea?: string;
  deliveryAddress?: string;
  allergyNotes?: string;
  extraNotes?: string;
}

/**
 * Generates an order reference in format #FC-YYMMDD-XXXX
 */
export function generateOrderRef(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FC-${yy}${mm}${dd}-${rand}`;
}

/**
 * Format currency in Nigerian Naira (₦)
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

/**
 * Builds the standard WhatsApp order text according to Section 5
 */
export function buildOrderMessage(order: OrderPayload): string {
  const orderRef = generateOrderRef();

  let itemsText = '';
  order.items.forEach((item, index) => {
    const num = index + 1;
    const priceText = item.unitPrice !== null ? formatNaira(item.unitPrice) : 'Price on request';
    let line = `${num}. ${item.name}`;
    if (item.optionsSummary) {
      line += `, ${item.optionsSummary}`;
    }
    line += `\n`;
    if (item.inscription && item.inscription.trim().length > 0) {
      line += `   Inscription: "${item.inscription.trim()}"\n`;
    }
    line += `   Qty: ${item.quantity} | Price: ${priceText}\n`;
    itemsText += line;
  });

  const totalText =
    order.totalEstimate !== null
      ? formatNaira(order.totalEstimate)
      : 'To be confirmed on WhatsApp';

  let fulfilmentSection = `*Fulfilment:* ${order.fulfilmentType === 'delivery' ? 'Delivery' : 'Pickup'}`;
  if (order.fulfilmentType === 'delivery') {
    if (order.deliveryArea) {
      fulfilmentSection += `\nArea: ${order.deliveryArea}`;
    }
    if (order.deliveryAddress) {
      fulfilmentSection += `\nAddress: ${order.deliveryAddress.trim()}`;
    }
  }

  const cleanAllergies = order.allergyNotes?.trim() ? order.allergyNotes.trim() : 'None';
  let cleanNotes = order.extraNotes?.trim() || 'None';

  let message = `Hello Fatish Cakes 👋\nI'd like to place an order from your website.\n\n*ORDER #${orderRef}*\n\n*Items*\n${itemsText}\n*Estimated total:* ${totalText}\n\n*Customer*\nName: ${order.customerName.trim()}\nPhone: ${order.phoneNumber.trim()}${order.email?.trim() ? `\nEmail: ${order.email.trim()}` : ''}\n\n${fulfilmentSection}\n\n*Needed by:* ${order.eventDateTime}\n\n*Allergy / dietary notes:* ${cleanAllergies}\n*Extra notes:* ${cleanNotes}\n\nPlease confirm availability and payment details. Thank you!`;

  // Cap length under 1,800 characters to prevent browser URL truncation
  if (message.length > 1750) {
    cleanNotes = cleanNotes.slice(0, 100) + '... (see full details in chat)';
    message = `Hello Fatish Cakes 👋\nI'd like to place an order from your website.\n\n*ORDER #${orderRef}*\n\n*Items*\n${itemsText}\n*Estimated total:* ${totalText}\n\n*Customer*\nName: ${order.customerName.trim()}\nPhone: ${order.phoneNumber.trim()}\n\n${fulfilmentSection}\n\n*Needed by:* ${order.eventDateTime}\n\n*Allergy / dietary notes:* ${cleanAllergies}\n*Extra notes:* ${cleanNotes}\n\nPlease confirm availability and payment details. Thank you!`;
  }

  return message;
}

/**
 * Builds custom order message with matching structure
 */
export function buildCustomOrderMessage(custom: CustomOrderPayload): string {
  const ref = generateOrderRef();

  let fulfilmentSection = `*Fulfilment:* ${custom.fulfilmentType === 'delivery' ? 'Delivery' : 'Pickup'}`;
  if (custom.fulfilmentType === 'delivery') {
    if (custom.deliveryAddress && custom.deliveryAddress.trim()) {
      fulfilmentSection += `\nFull Delivery Address: ${custom.deliveryAddress.trim()}`;
    }
  }

  const cleanAllergies = custom.allergyNotes?.trim() ? custom.allergyNotes.trim() : 'None';
  const cleanNotes = custom.extraNotes?.trim() || 'None';

  return `Hello Fatish Cakes 👋\nI'd like to request a bespoke custom cake.\n\n*CUSTOM ORDER REQUEST #${ref}*\n\n*Event Details*\nOccasion: ${custom.occasion}\nServings / Guests: ${custom.servingsOrGuests}\nBudget Guide: ${custom.budgetRange}\nTheme & Colours: ${custom.themeAndColours}\n${custom.inscription ? `Inscription: "${custom.inscription.trim()}"\n` : ''}*Needed by:* ${custom.eventDateTime}\n\n*Customer*\nName: ${custom.customerName.trim()}\nPhone: ${custom.phoneNumber.trim()}\n\n${fulfilmentSection}\n\n*Allergy / dietary notes:* ${cleanAllergies}\n*Extra notes & inspiration:* ${cleanNotes}\n\n(I will share inspiration photos in this chat right away).\nPlease confirm availability and custom quote. Thank you!`;
}

/**
 * Encodes the text message into a WhatsApp Web / App URL
 */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
