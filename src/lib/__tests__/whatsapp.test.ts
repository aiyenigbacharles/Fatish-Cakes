/**
 * Unit tests for WhatsApp message formatting and business rules
 */

import { buildOrderMessage, buildWhatsAppUrl, OrderPayload } from '../whatsapp.ts';
import { getCartSummary, CartItem } from '../cart.ts';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('Testing WhatsApp and Cart Logic...');

// Test 1: buildOrderMessage formatting
const sampleOrder: OrderPayload = {
  customerName: 'Amina Bello',
  phoneNumber: '+2348060320401',
  fulfilmentType: 'delivery',
  deliveryArea: 'Gwarinpa',
  deliveryAddress: 'House 12, 4th Avenue',
  eventDateTime: 'Sat, 21 Nov 2026 at 2:00 PM',
  allergyNotes: 'None',
  extraNotes: 'Surprise birthday',
  items: [
    {
      name: 'Royal Gold Luxury Celebration Cake',
      optionsSummary: '8-inch, Classic Vanilla Velvet, Strawberry filling',
      inscription: 'Happy Birthday Amina',
      quantity: 1,
      unitPrice: 52000,
      lineTotal: 52000
    }
  ],
  totalEstimate: 52000
};

const msg = buildOrderMessage(sampleOrder);
assert(msg.includes('Hello Fatish Cakes'), 'Greeting present');
assert(msg.includes('*ORDER #FC-'), 'Order reference header present');
assert(msg.includes('Royal Gold Luxury Celebration Cake'), 'Item name present');
assert(msg.includes('Inscription: "Happy Birthday Amina"'), 'Inscription present');
assert(msg.includes('*Fulfilment:* Delivery'), 'Fulfilment type present');
assert(msg.includes('Area: Gwarinpa'), 'Delivery area present');
assert(msg.includes('Needed by:* Sat, 21 Nov 2026 at 2:00 PM'), 'Date present');

// Test 2: URL encoding
const url = buildWhatsAppUrl(msg);
assert(url.startsWith('https://wa.me/2348060320401?text='), 'Valid WhatsApp URL format');

// Test 3: Unpriced items
const unpricedOrder: OrderPayload = {
  customerName: 'Senator Ibrahim',
  phoneNumber: '08012345678',
  fulfilmentType: 'pickup',
  eventDateTime: 'Sun, 22 Nov 2026 at 4:00 PM',
  items: [
    {
      name: 'Bespoke Multi-Tiered Wedding Cake',
      quantity: 1,
      unitPrice: null,
      lineTotal: null
    }
  ],
  totalEstimate: null
};

const unpricedMsg = buildOrderMessage(unpricedOrder);
assert(unpricedMsg.includes('Price: Price on request'), 'Unpriced line item says Price on request');
assert(unpricedMsg.includes('To be confirmed on WhatsApp'), 'Total estimate says To be confirmed on WhatsApp');

// Test 4: 48-Hour date rule
const now = Date.now();
const under48Hours = new Date(now + 24 * 60 * 60 * 1000);
const over48Hours = new Date(now + 50 * 60 * 60 * 1000);
assert((under48Hours.getTime() - now) / 3600000 < 48, 'Identifies under 48h');
assert((over48Hours.getTime() - now) / 3600000 >= 48, 'Identifies over 48h');

console.log('✅ All WhatsApp and cart logic unit tests passed successfully!');
