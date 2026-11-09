import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, updateCartQuantity, removeFromCart, getCartSummary, clearCart } from '../lib/cart.ts';
import { formatNaira } from '../lib/whatsapp.ts';
import { Img } from './Img.tsx';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onNavigateToCheckout: () => void;
  onNavigateToMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onNavigateToCheckout,
  onNavigateToMenu,
}) => {
  if (!isOpen) return null;

  const summary = getCartSummary(items);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2B1A12]/50 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFBF8] dark:bg-[#1C120B] text-[#2B1A12] dark:text-[#FFF5F2] shadow-2xl flex flex-col border-l border-[#2B1A12]/10 dark:border-white/10">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#2B1A12]/10 dark:border-white/10 flex items-center justify-between bg-[#FFF5F2] dark:bg-[#25170F]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#DC5A06]/10 text-[#DC5A06] rounded-full">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Your Sweet Cart
                </h2>
                <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
                  {summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#6B4A3A] dark:text-[#D4B9AC] hover:text-[#2B1A12] dark:hover:text-white hover:bg-[#FBE6DF] dark:hover:bg-[#342016] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#2B1A12]/5 dark:divide-white/5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFF5F2] dark:bg-[#25170F] flex items-center justify-center text-[#DC5A06]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                    Your Cart is Empty
                  </h3>
                  <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC] max-w-xs">
                    Explore our handcrafted celebration cakes, decadent parfaits, and small chops for your Abuja event.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToMenu();
                  }}
                  className="bg-[#DC5A06] text-white px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#B84A04] transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                  <div className="w-20 h-20 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12] shrink-0 border border-[#2B1A12]/10 dark:border-white/10">
                    <Img
                      src={item.product.image}
                      sizes="80px"
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-display text-base font-bold text-[#2B1A12] dark:text-[#FFF5F2] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B4A3A] dark:text-[#D4B9AC] hover:text-red-500 p-1 rounded-sm transition-colors"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.optionsSummary && (
                        <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] line-clamp-2 mt-0.5">
                          {item.optionsSummary}
                        </p>
                      )}

                      {item.inscription && (
                        <p className="text-xs italic text-[#DC5A06] bg-[#FFF5F2] dark:bg-[#25170F] px-2 py-0.5 rounded-sm mt-1 border border-[#DC5A06]/20">
                          Inscription: "{item.inscription}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#2B1A12]/20 dark:border-white/20 rounded-md bg-white dark:bg-[#150D08] overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2 text-[#2B1A12] dark:text-[#FFF5F2] hover:bg-[#FFF5F2] dark:hover:bg-[#2A1B12] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#2B1A12] dark:text-[#FFF5F2] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2 text-[#2B1A12] dark:text-[#FFF5F2] hover:bg-[#FFF5F2] dark:hover:bg-[#2A1B12] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right">
                        {item.lineTotal !== null ? (
                          <span className="text-sm font-bold text-[#2B1A12] dark:text-[#FFF5F2] tabular-nums">
                            {formatNaira(item.lineTotal)}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-[#DC5A06]">
                            Price on request
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#2B1A12]/10 dark:border-white/10 bg-[#FFF5F2] dark:bg-[#25170F] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
                  <span>Estimated Subtotal</span>
                  <span className="font-bold text-[#2B1A12] dark:text-[#FFF5F2] tabular-nums">
                    {summary.subtotal !== null
                      ? formatNaira(summary.subtotal)
                      : 'Price confirmed on WhatsApp'}
                  </span>
                </div>
                {summary.hasUnpricedItems && (
                  <p className="text-[11px] text-[#DC5A06] leading-tight">
                    *Some custom items are priced on request. Final total confirmed directly in WhatsApp.
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-[#6B4A3A] dark:text-[#D4B9AC] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>48-hour minimum baking lead time applies in Abuja</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToCheckout();
                  }}
                  className="w-full bg-[#DC5A06] hover:bg-[#B84A04] text-white py-3.5 px-6 rounded-md font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Clear all items from your cart?')) {
                      clearCart();
                    }
                  }}
                  className="w-full py-1 text-xs text-[#6B4A3A] dark:text-[#D4B9AC] hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
