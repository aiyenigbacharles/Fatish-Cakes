import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, getCartSummary } from '../lib/cart.ts';
import { formatNaira } from '../lib/whatsapp.ts';

interface StickyCartBarProps {
  items: CartItem[];
  onOpenCart: () => void;
  currentView: string;
}

export const StickyCartBar: React.FC<StickyCartBarProps> = ({
  items,
  onOpenCart,
  currentView
}) => {
  // Only show when there are items, on mobile/small screens, and on menu/home
  if (items.length === 0 || currentView === 'checkout') {
    return null;
  }

  const summary = getCartSummary(items);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#FFFBF8] dark:bg-[#1C120B] border-t border-[#2B1A12]/15 dark:border-white/10 px-4 py-3 shadow-2xl safe-area-bottom">
      <button
        onClick={onOpenCart}
        className="w-full bg-[#DC5A06] active:bg-[#B84A04] text-white py-3.5 px-5 rounded-xl font-semibold flex items-center justify-between text-sm shadow-md"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-white text-[#DC5A06] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {summary.itemCount}
            </span>
          </div>
          <span className="uppercase tracking-wider text-xs font-bold">
            View Cart ({summary.itemCount})
          </span>
        </div>

        <div className="flex items-center gap-2 font-bold tabular-nums">
          <span>
            {summary.subtotal !== null
              ? formatNaira(summary.subtotal)
              : 'Quote on WhatsApp'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
