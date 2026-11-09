import React from 'react';
import { Cake, ArrowLeft, Utensils, MessageCircle, Home } from 'lucide-react';
import { siteConfig } from '../data/site.ts';

interface NotFoundViewProps {
  onNavigate: (view: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-8">
      {/* Visual Bakery Badge */}
      <div className="relative inline-block">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFF5F2] dark:bg-[#23150D] border-2 border-[#C9A24B]/40 flex items-center justify-center mx-auto shadow-xl">
          <Cake className="w-12 h-12 sm:w-14 sm:h-14 text-[#DC5A06] animate-bounce" />
        </div>
        <span className="absolute -top-1 -right-1 bg-[#2B1A12] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
          404
        </span>
      </div>

      {/* Main Single Clear H1 */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold block">
          Lost In The Bakery
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2]">
          Confectionery Crumb Trail <span className="text-[#DC5A06]">Not Found</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] max-w-lg mx-auto leading-relaxed">
          It appears the treat or page you were searching for has already been devoured or moved to another counter. Let us guide you back to our freshly baked creations.
        </p>
      </div>

      {/* Recommended Destination Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 bg-[#DC5A06] hover:bg-[#B84A04] text-white px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Return To Homepage</span>
        </button>

        <button
          onClick={() => onNavigate('menu')}
          className="inline-flex items-center gap-2 bg-white dark:bg-[#1E130B] border border-[#2B1A12]/15 dark:border-white/15 text-[#2B1A12] dark:text-[#FFF5F2] hover:border-[#DC5A06] px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:bg-[#FFF5F2] dark:hover:bg-[#25170F]"
        >
          <Utensils className="w-4 h-4 text-[#DC5A06]" />
          <span>Explore Full Menu</span>
        </button>

        <button
          onClick={() => onNavigate('custom-orders')}
          className="inline-flex items-center gap-2 bg-[#2B1A12] dark:bg-[#281810] text-white px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#4A2F22] transition-all border border-white/10"
        >
          <span>Custom Cake Inquiry</span>
        </button>
      </div>

      {/* Instant WhatsApp Support Helpbox */}
      <div className="pt-8 border-t border-[#2B1A12]/10 dark:border-white/10 max-w-md mx-auto text-xs text-[#6B4A3A] dark:text-[#D4B9AC] space-y-2">
        <p>Looking for a specific custom order or urgent celebration cake in Abuja?</p>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#DC5A06] font-bold hover:underline"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Speak directly with our bakery on WhatsApp (+234 806 032 0401)</span>
        </a>
      </div>
    </div>
  );
};
