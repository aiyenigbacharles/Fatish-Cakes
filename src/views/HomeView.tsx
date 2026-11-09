import React, { useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Cake,
  Heart,
  Instagram,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';
import { getFeaturedProducts } from '../lib/content.ts';
import { Product } from '../data/products.ts';
import { siteConfig } from '../data/site.ts';
import { formatNaira } from '../lib/whatsapp.ts';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProduct }) => {
  const featured = getFeaturedProducts();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const occasions = [
    {
      title: 'Milestone Birthdays',
      tag: 'Ages 1 to 100',
      desc: 'Bespoke themes, gold leaf drips, floral accents, and piped personal messages.',
      img: '/assets/aistudio/Elegant_White_Cake_with_Gold_Details_99d798fc.png'
    },
    {
      title: 'Abuja Weddings',
      tag: 'Grand Multi-Tiers',
      desc: 'Architectural tiered showstoppers coordinated with your wedding palette and florals.',
      img: '/assets/aistudio/Elegant_Peach_Rose_Birthday_Cake_28259d4e.png'
    },
    {
      title: 'Corporate Galas & Gift Sets',
      tag: 'Seminars & Brands',
      desc: 'Custom celebration cakes, branded snack boxes, and dessert cupcake platters.',
      img: '/assets/aistudio/Birthday_Cake_and_Assorted_Pastries_c9016572.png'
    },
    {
      title: 'Showers & Milestone Ages',
      tag: 'Pastel Elegance',
      desc: 'Delicate floral piping, pink rosettes, gold coin accents, and acrylic toppers.',
      img: '/assets/aistudio/Elegant_Pink_Rose_Birthday_Cake_5bd5951f.png'
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF5F2] dark:bg-[#23150D] border border-[#DC5A06]/20 text-[#DC5A06] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Abuja's Premier Celebration Patisserie</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2] leading-[1.08] text-balance">
              Celebration <span className="text-[#DC5A06]">Cakes</span> That Create Moments
            </h1>

            <p className="text-base sm:text-lg text-[#6B4A3A] dark:text-[#D4B9AC] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              {siteConfig.tagline}. Baked fresh to order with luxury Belgian chocolates, velvety sponges, and delivered safely across the entire Federal Capital Territory.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto bg-[#DC5A06] hover:bg-[#B84A04] text-white px-8 py-4 rounded-md font-semibold uppercase tracking-wider text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('custom-orders')}
                className="w-full sm:w-auto bg-[#2B1A12] dark:bg-[#2E1C12] hover:bg-[#4A2F22] text-white px-8 py-4 rounded-md font-semibold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 active:scale-95 border border-[#2B1A12] dark:border-white/10"
              >
                <span>Custom Cake Order</span>
              </button>
            </div>

            {/* Trust and Social Proof Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#DC5A06]" />
                <span className="font-medium">48h Minimum Lead Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#DC5A06]" />
                <span className="font-medium">All Abuja Districts Covered</span>
              </div>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#DC5A06] hover:underline font-semibold"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>16.8K on Instagram</span>
              </a>
            </div>
          </div>

          {/* Right Visual Composition with Asymmetric Corners & Rotating Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Rotating Circular Text Badge */}
            <div className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 z-20 pointer-events-none">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <svg
                  className="w-full h-full animate-spin-slow"
                  viewBox="0 0 120 120"
                >
                  <defs>
                    <path
                      id="badgeCirclePath"
                      d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                    />
                  </defs>
                  <text className="text-[9.5px] uppercase font-bold tracking-[0.22em] fill-[#2B1A12] dark:fill-[#FFF5F2]">
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      FRESHLY BAKED IN ABUJA • MADE TO ORDER •
                    </textPath>
                  </text>
                </svg>
                {/* Centre Pip */}
                <div className="absolute w-4 h-4 rounded-full bg-[#DC5A06] border-2 border-white shadow-xs" />
              </div>
            </div>

            {/* Main Asymmetric Hero Image Frame (Real Fatish Cakes Product) */}
            <div className="relative w-full max-w-md aspect-4/5 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden bg-[#FBE6DF] dark:bg-[#23150D] shadow-2xl border-2 border-[#C9A24B]/30">
              <img
                src="/assets/aistudio/Elegant_Gold_and_Chocolate_Birthday_Cake_c6c99068.png"
                alt="Signature Gold Celebration Cake by Fatish Cakes Abuja"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Scrim with Brand Logo */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#2B1A12]/95 via-[#2B1A12]/60 to-transparent text-white flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-bold">
                    Chef Handcrafted
                  </p>
                  <h4 className="font-serif-display text-lg font-bold">
                    Royal Gold & Chocolate Drip Cake
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs p-1 flex items-center justify-center">
                  <img
                    src="/brand/logo.png"
                    alt="Fatish Cakes Golden Chef Hat Logo emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Overlapping Floating Small Chops / Pastry Card (Real Photo) */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-6 z-20 bg-white/95 dark:bg-[#1F130B]/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-[#2B1A12]/10 dark:border-white/10 max-w-[210px] sm:max-w-[230px]">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/Nigerian_Snack_Box_with_Spicy_Wings_f1870ce6.png"
                  alt="Fatish Cakes Small Chops with Spicy Wings"
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#DC5A06] font-bold block">
                    Abuja Sensation
                  </span>
                  <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2] truncate">
                    Hot Chops & Spicy Wings
                  </p>
                  <span className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC] font-medium">
                    Party Boxes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP & THREE OVERLAPPING FEATURE BADGES */}
      <section className="bg-[#FFF5F2] dark:bg-[#1E130B] py-12 border-y border-[#2B1A12]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#DC5A06] text-white flex items-center justify-center shrink-0 shadow-md">
                <Cake className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Fresh Pure Ingredients
                </h3>
                <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                  Real butter, Belgian cocoa, fresh dairy, and zero artificial shortcuts. Taste the difference in every crumb.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#DC5A06] text-white flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Made strictly to order
                </h3>
                <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                  48-hour minimum lead time guarantees your cake is baked fresh on the morning of your event, never frozen.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#DC5A06] text-white flex items-center justify-center shrink-0 shadow-md">
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Delivered Across Abuja
                </h3>
                <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                  Specialized cake-transit riders covering Gwarinpa, Maitama, Wuse, Jabi, Life Camp, Asokoro, and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE PICKS CAROUSEL (CELEBRATION CAKES FIRST) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
              Artisanal Selection
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] mt-1">
              Signature <span className="text-[#DC5A06]">Cakes</span> & Treats
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-10 h-10 rounded-full border border-[#2B1A12]/20 dark:border-white/20 hover:bg-[#DC5A06] hover:text-white hover:border-[#DC5A06] flex items-center justify-center transition-colors text-[#2B1A12] dark:text-[#FFF5F2]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-10 h-10 rounded-full border border-[#2B1A12]/20 dark:border-white/20 hover:bg-[#DC5A06] hover:text-white hover:border-[#DC5A06] flex items-center justify-center transition-colors text-[#2B1A12] dark:text-[#FFF5F2]"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {featured.map((product, idx) => (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[340px] snap-start flex-col flex bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div
                className={`relative aspect-4/3 overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12] ${
                  idx % 2 === 0
                    ? 'rounded-tl-2xl rounded-br-2xl'
                    : 'rounded-tr-2xl rounded-bl-2xl'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#DC5A06] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
                <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-[#150D08]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Min {product.leadTimeHours}h notice
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#6B4A3A] dark:text-[#D4B9AC] font-semibold">
                    {product.categoryLabel}
                  </span>
                  <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] group-hover:text-[#DC5A06] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#2B1A12]/10 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#6B4A3A] dark:text-[#D4B9AC] block">
                      Price
                    </span>
                    <span className="text-sm font-bold text-[#2B1A12] dark:text-[#FFF5F2] tabular-nums">
                      {product.basePrice !== null
                        ? `From ${formatNaira(product.basePrice)}`
                        : 'Price on request'}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="bg-[#DC5A06] hover:bg-[#B84A04] text-white px-3.5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CATEGORIES GATEWAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
            Curated Menus
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Baked With Passion In <span className="text-[#DC5A06]">Abuja</span>
          </h2>
          <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
            Select a specialty line to view customizable sizes, flavours, and party packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1: Celebration Cakes */}
          <div
            onClick={() => onNavigate('menu')}
            className="group cursor-pointer relative bg-white dark:bg-[#1E130B] rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl overflow-hidden border border-[#2B1A12]/10 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <div className="aspect-4/3 overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12]">
              <img
                src="/assets/aistudio/Elegant__Happy_Birthday_Babe__Cake_3ba433ff.png"
                alt="Celebration Cakes Abuja"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
                Priority 01
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] group-hover:text-[#DC5A06] transition-colors">
                Celebration Cakes
              </h3>
              <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                Birthday drips, wedding tiers, velvet layers, and custom piped inscriptions.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#DC5A06]">
                <span>Explore Cake Menu</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Category 2: Cake Parfait */}
          <div
            onClick={() => onNavigate('menu')}
            className="group cursor-pointer relative bg-white dark:bg-[#1E130B] rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl overflow-hidden border border-[#2B1A12]/10 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <div className="aspect-4/3 overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12]">
              <img
                src="/assets/aistudio/Taitshcakes_Dessert_Display_bc772563.png"
                alt="Cake Parfait Tubs Abuja"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
                Priority 02
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] group-hover:text-[#DC5A06] transition-colors">
                Cake Parfait Tubs
              </h3>
              <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                Chilled dessert tubs, red velvet layers, salted caramel crunch, and celebration gift cups.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#DC5A06]">
                <span>Order Cake Parfaits</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Category 3: Small Chops */}
          <div
            onClick={() => onNavigate('menu')}
            className="group cursor-pointer relative bg-white dark:bg-[#1E130B] rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl overflow-hidden border border-[#2B1A12]/10 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <div className="aspect-4/3 overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12]">
              <img
                src="/assets/aistudio/Golden_Nigerian_Party_Snacks_Box_4cc2a06e.png"
                alt="Small Chops Platters Abuja"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
                Priority 03
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] group-hover:text-[#DC5A06] transition-colors">
                Small Chops & Snack Boxes
              </h3>
              <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                Golden puff-puff balls, crispy beef samosas, rolled spring rolls, and spicy glazed chicken wings.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#DC5A06]">
                <span>Order Snack Platters</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OCCASIONS SHOWCASE */}
      <section className="bg-[#FFF5F2] dark:bg-[#1E130B] py-16 border-y border-[#2B1A12]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
              Celebrate Life's Milestones
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Cakes Tailored For Every <span className="text-[#DC5A06]">Occasion</span>
            </h2>
            <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
              From intimate birthday dinners in Gwarinpa to grand luxury wedding receptions in Maitama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occ, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#25170F] rounded-2xl overflow-hidden shadow-xs border border-[#2B1A12]/10 dark:border-white/10 flex flex-col group hover:-translate-y-1 transition-all"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#FBE6DF] dark:bg-[#2E1C12]">
                  <img
                    src={occ.img}
                    alt={occ.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C9A24B] tracking-wider">
                      {occ.tag}
                    </span>
                    <h4 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] mt-0.5">
                      {occ.title}
                    </h4>
                    <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] mt-1.5 leading-relaxed">
                      {occ.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('custom-orders')}
                    className="text-xs font-bold text-[#DC5A06] hover:underline pt-3 flex items-center gap-1 text-left"
                  >
                    <span>Request Cake Idea</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (4 STEPS + 48H LEAD TIME) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
            Effortless Ordering
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            How Ordering Works At <span className="text-[#DC5A06]">Fatish Cakes</span>
          </h2>
          <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
            No complicated apps or signups. Build your order here and complete with the baker on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E130B] border border-[#2B1A12]/10 dark:border-white/10 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-[#DC5A06] text-white font-bold text-sm flex items-center justify-center">
              1
            </span>
            <h4 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Choose Your Treats
            </h4>
            <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
              Select your favorite cake size, layers, sponge flavour, filling, or small chops platter.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E130B] border border-[#2B1A12]/10 dark:border-white/10 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-[#DC5A06] text-white font-bold text-sm flex items-center justify-center">
              2
            </span>
            <h4 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Customize Inscription
            </h4>
            <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
              Add your personalized birthday greeting or milestone message and dietary notes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E130B] border border-[#2B1A12]/10 dark:border-white/10 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-[#DC5A06] text-white font-bold text-sm flex items-center justify-center">
              3
            </span>
            <h4 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Send on WhatsApp
            </h4>
            <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
              Our website generates a neat WhatsApp chat containing your exact order, address, and date.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E130B] border border-[#2B1A12]/10 dark:border-white/10 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-[#DC5A06] text-white font-bold text-sm flex items-center justify-center">
              4
            </span>
            <h4 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Confirm & Savor
            </h4>
            <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
              Fatish Cakes confirms your date, shares transfer details, and bakes fresh for delivery or pickup.
            </p>
          </div>
        </div>

        {/* Lead time notice banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#FFF5F2] dark:bg-[#1E130B] border border-[#DC5A06]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#DC5A06] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2] uppercase tracking-wider">
                Strict 48-Hour Minimum Lead Time
              </p>
              <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
                Every single cake is baked from scratch on the day of delivery. Please book at least 2 days ahead!
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('delivery-policy')}
            className="text-xs font-bold text-[#DC5A06] hover:underline whitespace-nowrap"
          >
            Read Our Policies →
          </button>
        </div>
      </section>

      {/* 7. ORANGE CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative bg-[#DC5A06] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl text-white">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#FBE6DF] font-bold">
              Bespoke Patisserie In Abuja
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              Order Treats That Excite Your Palate
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
              Ready to celebrate in style? Send us your order today and let Fatish Cakes bake an unforgettable centrepiece for your event.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto bg-white text-[#DC5A06] hover:bg-[#FFF5F2] px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Explore The Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#2B1A12] hover:bg-[#4A2F22] text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A24B]" />
                <span>Quick WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Decorative Background Glow and Chef Hat Silhouette */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:flex items-center justify-center">
            <img
              src="/brand/logo.png"
              alt="Fatish Cakes Chef Hat Emblem Silhouette"
              className="w-80 h-80 object-contain filter invert"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
