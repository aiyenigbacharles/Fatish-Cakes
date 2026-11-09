/**
 * Cart state store with localStorage persistence and reactive window dispatching
 */

import { Product } from '../data/products.ts';

export interface CartItem {
  id: string; // unique item hash
  product: Product;
  selectedOptions: Record<string, string>;
  optionsSummary: string;
  inscription: string;
  specialNotes?: string;
  quantity: number;
  unitPrice: number | null; // null if unpriced
  lineTotal: number | null;
}

const STORAGE_KEY = 'fatish_cakes_cart_v1';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read cart from localStorage', e);
    return [];
  }
}

export function saveCartItems(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('fatish-cart-updated', { detail: { items } }));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

export function addToCart(
  product: Product,
  selectedOptions: Record<string, string>,
  optionsSummary: string,
  inscription: string,
  quantity: number = 1,
  specialNotes?: string
): void {
  const current = getCartItems();

  // Compute unit price with option modifiers
  let unitPrice: number | null = product.basePrice;
  if (unitPrice !== null) {
    for (const group of product.options) {
      const selectedChoiceLabel = selectedOptions[group.id];
      if (selectedChoiceLabel) {
        const choice = group.choices.find((c) => c.label === selectedChoiceLabel);
        if (choice?.priceModifier) {
          unitPrice += choice.priceModifier;
        }
      }
    }
  }

  // Generate unique item key based on configuration
  const configHash = `${product.id}__${JSON.stringify(selectedOptions)}__${inscription.trim().toLowerCase()}`;
  const existingIndex = current.findIndex((item) => item.id === configHash);

  if (existingIndex > -1) {
    current[existingIndex].quantity += quantity;
    if (current[existingIndex].unitPrice !== null) {
      current[existingIndex].lineTotal = current[existingIndex].unitPrice! * current[existingIndex].quantity;
    }
  } else {
    current.push({
      id: configHash,
      product,
      selectedOptions,
      optionsSummary,
      inscription: inscription.trim(),
      specialNotes: specialNotes?.trim(),
      quantity,
      unitPrice,
      lineTotal: unitPrice !== null ? unitPrice * quantity : null
    });
  }

  saveCartItems(current);
}

export function updateCartQuantity(itemId: string, newQuantity: number): void {
  const current = getCartItems();
  if (newQuantity <= 0) {
    const filtered = current.filter((item) => item.id !== itemId);
    saveCartItems(filtered);
    return;
  }

  const updated = current.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        quantity: newQuantity,
        lineTotal: item.unitPrice !== null ? item.unitPrice * newQuantity : null
      };
    }
    return item;
  });

  saveCartItems(updated);
}

export function removeFromCart(itemId: string): void {
  const current = getCartItems();
  const filtered = current.filter((item) => item.id !== itemId);
  saveCartItems(filtered);
}

export function clearCart(): void {
  saveCartItems([]);
}

export function getCartSummary(items: CartItem[]): {
  itemCount: number;
  subtotal: number | null; // null if any item is unpriced
  hasUnpricedItems: boolean;
} {
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  let hasUnpricedItems = false;
  let subtotal = 0;

  for (const item of items) {
    if (item.lineTotal === null) {
      hasUnpricedItems = true;
    } else {
      subtotal += item.lineTotal;
    }
  }

  return {
    itemCount,
    subtotal: hasUnpricedItems ? null : subtotal,
    hasUnpricedItems
  };
}
