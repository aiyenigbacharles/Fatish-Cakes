import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Minus, Sparkles, Clock, MessageSquare } from 'lucide-react';
import { Product } from '../data/products.ts';
import { addToCart } from '../lib/cart.ts';
import { formatNaira } from '../lib/whatsapp.ts';
import { Img } from './Img.tsx';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenCart
}) => {
  if (!isOpen || !product) return null;

  // Selected options state: group.id -> choice.label
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [inscription, setInscription] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Initialize defaults
  useEffect(() => {
    if (product) {
      const defaults: Record<string, string> = {};
      product.options.forEach((group) => {
        if (group.choices.length > 0) {
          defaults[group.id] = group.choices[0].label;
        }
      });
      setSelectedOptions(defaults);
      setInscription('');
      setSpecialNotes('');
      setQuantity(1);
      setAddedToast(false);
    }
  }, [product]);

  // Compute calculated unit price
  let computedUnitPrice: number | null = product.basePrice;
  if (computedUnitPrice !== null) {
    product.options.forEach((group) => {
      const selected = selectedOptions[group.id];
      if (selected) {
        const choice = group.choices.find((c) => c.label === selected);
        if (choice?.priceModifier) {
          computedUnitPrice! += choice.priceModifier;
        }
      }
    });
  }

  const handleOptionChange = (groupId: string, choiceLabel: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: choiceLabel
    }));
  };

  const handleAddToCart = () => {
    const summaryParts: string[] = [];
    product.options.forEach((g) => {
      const val = selectedOptions[g.id];
      if (val) summaryParts.push(val);
    });
    const optionsSummary = summaryParts.join(' · ');

    addToCart(
      product,
      selectedOptions,
      optionsSummary,
      inscription,
      quantity,
      specialNotes
    );

    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
      onOpenCart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B1A12]/60 dark:bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FFFBF8] dark:bg-[#1C120B] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92dvh] flex flex-col border border-[#C9A24B]/30 animate-scale-in text-[#2B1A12] dark:text-[#FFF5F2]">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#2B1A12]/10 dark:border-white/10 flex items-center justify-between bg-[#FFF5F2] dark:bg-[#25170F]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-[#DC5A06] font-bold">
              {product.categoryLabel}
            </span>
            {product.badge && (
              <span className="text-[11px] bg-[#C9A24B]/20 text-[#6B4A3A] dark:text-[#E2C7B6] px-2 py-0.5 rounded-full font-medium">
                {product.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B4A3A] dark:text-[#D4B9AC] hover:text-[#2B1A12] dark:hover:text-white hover:bg-[#FBE6DF] dark:hover:bg-[#342016] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Product Header / Hero Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            <div className="relative aspect-4/3 sm:aspect-square rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12] shadow-md border border-[#2B1A12]/10 dark:border-white/10">
              <Img
                src={product.image}
                sizes="(min-width: 640px) 420px, 92vw"
                priority
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#2B1A12]/80 dark:bg-black/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C9A24B]" />
                <span>Min {product.leadTimeHours}h lead time</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                {product.longDescription}
              </p>
              <div className="pt-2">
                <div className="text-xs uppercase tracking-wider text-[#6B4A3A] dark:text-[#D4B9AC]">
                  Estimated Price
                </div>
                <div className="text-2xl font-bold text-[#DC5A06] tabular-nums mt-0.5">
                  {computedUnitPrice !== null ? (
                    formatNaira(computedUnitPrice)
                  ) : (
                    <span className="text-lg">Price on request</span>
                  )}
                </div>
                {computedUnitPrice === null && (
                  <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] mt-1">
                    *Bespoke design. Final pricing confirmed via WhatsApp based on your tier and guest size.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Option Selectors */}
          {product.options.map((group) => (
            <div key={group.id} className="space-y-2.5 pt-2 border-t border-[#2B1A12]/10 dark:border-white/10">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                {group.name} {group.required && <span className="text-[#DC5A06]">*</span>}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.choices.map((choice) => {
                  const isSelected = selectedOptions[group.id] === choice.label;
                  return (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => handleOptionChange(group.id, choice.label)}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'border-[#DC5A06] bg-[#FFF5F2] dark:bg-[#2A1B12] text-[#2B1A12] dark:text-[#FFF5F2] ring-1 ring-[#DC5A06]'
                          : 'border-[#2B1A12]/15 dark:border-white/15 bg-white dark:bg-[#150D08] text-[#6B4A3A] dark:text-[#D4B9AC] hover:border-[#DC5A06]/50'
                      }`}
                    >
                      <span>{choice.label}</span>
                      {choice.priceModifier ? (
                        <span className="text-xs text-[#DC5A06] font-semibold">
                          +{formatNaira(choice.priceModifier)}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Inscription Field for Celebration Cakes */}
          {product.allowsInscription && (
            <div className="space-y-2 pt-2 border-t border-[#2B1A12]/10 dark:border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#DC5A06]" />
                  <span>Cake Inscription / Message</span>
                </label>
                <span className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">
                  {inscription.length}/40 characters
                </span>
              </div>
              <input
                type="text"
                maxLength={40}
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                placeholder='e.g. "Happy 30th Birthday Amina" or "Congrats Doc!"'
                className="w-full bg-white dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
              />
              <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">
                Piped on fondant plaque or directly on cake. Leave blank if not needed.
              </p>
            </div>
          )}

          {/* Extra Notes & Photo Inspiration Prompt */}
          <div className="space-y-2 pt-2 border-t border-[#2B1A12]/10 dark:border-white/10">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Special Requests or Color Palette
            </label>
            <textarea
              rows={2}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Gold and blush pink theme, extra flowers, allergen alerts..."
              className="w-full bg-white dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            />
            <div className="flex items-start gap-2 bg-[#FBE6DF]/50 dark:bg-[#281810] p-2.5 rounded-lg text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
              <Sparkles className="w-4 h-4 text-[#DC5A06] shrink-0 mt-0.5" />
              <span>
                Have an inspiration photo? You can easily attach it in the WhatsApp chat after submitting your order!
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-[#2B1A12]/10 dark:border-white/10 bg-[#FFF5F2] dark:bg-[#25170F] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#2B1A12]/20 dark:border-white/15 rounded-lg bg-white dark:bg-[#150D08] overflow-hidden shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 sm:px-3 text-[#2B1A12] dark:text-[#FFF5F2] hover:bg-[#FFF5F2] dark:hover:bg-[#2A1B12] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm font-bold text-[#2B1A12] dark:text-[#FFF5F2] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 sm:px-3 text-[#2B1A12] dark:text-[#FFF5F2] hover:bg-[#FFF5F2] dark:hover:bg-[#2A1B12] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 px-6 rounded-lg font-semibold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
              addedToast
                ? 'bg-[#25D366] text-white'
                : 'bg-[#DC5A06] hover:bg-[#B84A04] text-white'
            }`}
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <span>Add to Cart</span>
                {computedUnitPrice !== null && (
                  <span className="font-bold tabular-nums">
                    · {formatNaira(computedUnitPrice * quantity)}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
