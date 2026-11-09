import React from 'react';
import { Award, Sparkles, ShieldCheck, Instagram } from 'lucide-react';
import { siteConfig } from '../data/site.ts';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Editorial Split Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Asymmetric Photo Frame */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-square sm:aspect-4/5 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12] border-2 border-[#C9A24B]/30 shadow-2xl">
            <img
              src="/assets/aistudio/image_7012cf7f.png"
              alt="Head Pastry Chef and Founder of Fatish Cakes Abuja in official chef uniform"
              className="w-full h-full object-cover object-top"
            />
            {/* Scrim with Chef Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#1C120B]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#2B1A12]/10 dark:border-white/10 flex items-center gap-3">
              <img
                src="/brand/logo.png"
                alt="Fatish Cakes Chef Hat Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2]">The Head Pastry Chef</p>
                <p className="text-[11px] text-[#DC5A06] font-medium">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF5F2] dark:bg-[#23150D] border border-[#DC5A06]/20 text-[#DC5A06] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>The Heart of Fatish Cakes</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2] leading-tight">
            Crafting Sweet Memories In The Heart Of <span className="text-[#DC5A06]">Abuja</span>
          </h1>

          <div className="space-y-4 text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] font-light leading-relaxed">
            <p>
              Welcome to <strong>Fatish Cakes</strong>. What began as a passionate obsession with confectionery artistry in Abuja has blossomed into a beloved bakery serving over 16,000 celebration lovers across the FCT.
            </p>
            <p>
              We believe a cake is never just dessert: it is the ceremonial centerpiece of your most cherished milestones. Whether it is an intimate 1st birthday, a joyous graduation, a wedding reception, or an executive corporate gala, each creation is sculpted with uncompromising attention to crumb texture, flavor balance, and visual grandeur.
            </p>
            <blockquote className="p-4 bg-[#FFF5F2] dark:bg-[#23150D] rounded-xl border-l-4 border-[#DC5A06] text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] italic">
              "Every celebration in Abuja deserves a cake that tastes just as breathtaking as it looks. We bake with real passion, pure butter, and love for every milestone."
            </blockquote>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#DC5A06] hover:bg-[#B84A04] text-white px-6 py-3.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow Our Story on Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Brand Values Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#2B1A12]/10 dark:border-white/10">
        <div className="bg-white dark:bg-[#1E130B] p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FFF5F2] dark:bg-[#281810] text-[#DC5A06] flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Uncompromising Quality
          </h3>
          <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
            We use premium European butter, unadulterated Belgian chocolates, and freshly pressed Madagascar vanilla beans for rich, unforgettable flavors.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E130B] p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FFF5F2] dark:bg-[#281810] text-[#DC5A06] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Baked Strictly To Order
          </h3>
          <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
            Our 48-hour lead time guarantees your cakes are freshly baked on the morning of delivery, never frozen, never mass-produced days in advance.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E130B] p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FFF5F2] dark:bg-[#281810] text-[#DC5A06] flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Certified & Hygienic
          </h3>
          <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
            Our Abuja baking facility operates under rigorous food hygiene standards with certified food handling practices for peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};
