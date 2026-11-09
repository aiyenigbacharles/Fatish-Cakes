import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, Clock, ArrowRight } from 'lucide-react';
import { getAllProducts } from '../lib/content.ts';
import { Product, ProductCategory } from '../data/products.ts';
import { formatNaira } from '../lib/whatsapp.ts';
import { Img } from '../components/Img.tsx';

interface MenuViewProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToCustom: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({ onSelectProduct, onNavigateToCustom }) => {
  const allProducts = getAllProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'parfait', label: 'Cake Parfait' },
    { id: 'chops', label: 'Small Chops' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Menu Header with Two-Tone Serif Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
          Explore Our Patisserie Menu
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2] leading-tight">
          Make Your Event The Best With Our <span className="text-[#DC5A06]">Menu</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] font-light max-w-xl mx-auto leading-relaxed">
          Every celebration cake, dessert parfait, and small chops platter is handcrafted to order in Abuja. Select an item to choose sizes, flavours, and piped inscriptions.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#1E130B] p-3 sm:p-4 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs">
        {/* Category Pills (Active = Solid Orange, Inactive = Blush / Dark pill) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#DC5A06] text-white shadow-xs'
                    : 'bg-[#FFF5F2] dark:bg-[#281810] text-[#DC5A06] hover:bg-[#FBE6DF] dark:hover:bg-[#342016]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#6B4A3A] dark:text-[#D4B9AC] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cakes, flavours, chops..."
            className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/15 dark:border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/60 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B4A3A] dark:text-[#D4B9AC] hover:text-[#2B1A12]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1E130B] rounded-3xl border border-[#2B1A12]/10 dark:border-white/10 space-y-4">
          <p className="text-base font-serif-display text-[#2B1A12] dark:text-[#FFF5F2] font-bold">
            No treats matched your search "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-bold text-[#DC5A06] hover:underline uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Image with Asymmetric Shape Language */}
              <div
                className={`relative aspect-4/3 overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12] cursor-pointer ${
                  idx % 2 === 0
                    ? 'rounded-tl-2xl rounded-br-2xl'
                    : 'rounded-tr-2xl rounded-bl-2xl'
                }`}
                onClick={() => onSelectProduct(product)}
              >
                <Img
                  src={product.image}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#DC5A06] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}

                <div className="absolute bottom-2.5 right-2.5 bg-white/95 dark:bg-[#150D08]/95 backdrop-blur-xs text-[#2B1A12] dark:text-[#FFF5F2] text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <Clock className="w-3 h-3 text-[#DC5A06]" />
                  <span>Min {product.leadTimeHours}h lead time</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#6B4A3A] dark:text-[#D4B9AC] font-semibold">
                    {product.categoryLabel}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif-display text-xl sm:text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] group-hover:text-[#DC5A06] cursor-pointer transition-colors leading-tight"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2B1A12]/10 dark:border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase text-[#6B4A3A] dark:text-[#D4B9AC] block">
                      Starting Price
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#2B1A12] dark:text-[#FFF5F2] tabular-nums">
                      {product.basePrice !== null ? (
                        formatNaira(product.basePrice)
                      ) : (
                        <span className="text-xs font-semibold text-[#DC5A06]">
                          Price on request
                        </span>
                      )}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="bg-[#DC5A06] hover:bg-[#B84A04] text-white px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-xs transition-all active:scale-95"
                  >
                    Select & Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bespoke Request Banner at bottom of Menu */}
      <div className="p-8 rounded-3xl bg-[#FFF5F2] dark:bg-[#1E130B] border border-[#DC5A06]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
            Looking for something uniquely yours?
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Need a Bespoke Wedding or Themed Cake?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] max-w-lg">
            We build sculpted character cakes, architectural multi-tier wedding centrepieces, and customized dessert tables for events across Abuja.
          </p>
        </div>
        <button
          onClick={onNavigateToCustom}
          className="bg-[#2B1A12] dark:bg-[#2A1B12] hover:bg-[#4A2F22] text-white px-6 py-3.5 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md transition-colors border border-white/10"
        >
          Submit Custom Inquiry
        </button>
      </div>
    </div>
  );
};
