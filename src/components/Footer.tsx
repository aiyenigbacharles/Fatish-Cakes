import React from 'react';
import { Instagram, MessageCircle, ExternalLink, MapPin, Clock, Phone, Heart } from 'lucide-react';
import { siteConfig } from '../data/site.ts';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const dessertStrip = [
    {
      img: '/assets/aistudio/Elegant_Gold_and_Chocolate_Birthday_Cake_c6c99068.png',
      alt: 'Luxury Chocolate Drip Cake in Abuja'
    },
    {
      img: '/assets/aistudio/Elegant__Happy_Birthday_Babe__Cake_3ba433ff.png',
      alt: 'Burgundy Floral Celebration Cake'
    },
    {
      img: '/assets/aistudio/Birthday_Cake_and_Festive_Pastry_Spread_ce3c38e8.png',
      alt: 'Pastry & Abuja Small Chops Platter'
    },
    {
      img: '/assets/aistudio/Blue_Ombre_Birthday_Cake_Box_60b9ebcf.png',
      alt: 'Blue Ombre Bento Cake and Cupcakes'
    },
    {
      img: '/assets/aistudio/Elegant_Pink_and_Gold_Cupcake_Tray_9166a0ff.png',
      alt: 'Luxury Pink & Gold Cupcakes Tray'
    },
    {
      img: '/assets/aistudio/Barbie_Princess_Birthday_Cake_ce2425ee.png',
      alt: 'Barbie Princess 2-Tier Cake'
    }
  ];

  return (
    <footer className="mt-20">
      {/* Real Bakery Photos Strip with Asymmetric Corners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-semibold">
              Real Bakes Fresh From Our Abuja Studio
            </span>
            <span className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">· @fatishcakes (16.8K Followers)</span>
          </div>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#DC5A06] hover:text-[#B84A04] flex items-center gap-1"
          >
            <span>View on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {dessertStrip.map((item, idx) => (
            <div
              key={idx}
              className={`h-24 sm:h-32 overflow-hidden shadow-xs hover:opacity-90 transition-opacity bg-[#FBE6DF] dark:bg-[#23150D] ${
                idx % 2 === 0
                  ? 'rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md'
                  : 'rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md'
              }`}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Orange & Cocoa Brand Footer */}
      <div className="bg-[#DC5A06] text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/20">
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white p-1 shadow-sm flex items-center justify-center">
                  <img
                    src="/brand/logo.png"
                    alt="Fatish Cakes Golden Chef Hat Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl font-bold tracking-tight text-white leading-none">
                    FATISH CAKES
                  </h3>
                  <p className="text-xs text-[#FBE6DF] uppercase tracking-wider mt-0.5">
                    Abuja, Nigeria
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/90 leading-relaxed font-light">
                {siteConfig.tagline}. Handcrafted with pristine ingredients, slow-baked sponges, and artistic precision.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#DC5A06] flex items-center justify-center transition-colors"
                  aria-label="Instagram @fatishcakes"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#DC5A06] flex items-center justify-center transition-colors"
                  aria-label="WhatsApp Fatish Cakes"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.linktreeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#DC5A06] flex items-center justify-center transition-colors"
                  aria-label="Fatish Cakes Linktree"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="font-serif-display text-lg font-bold uppercase tracking-wider text-white mb-4">
                Explore Bakery
              </h4>
              <ul className="space-y-2.5 text-sm text-[#FFF5F2]">
                <li>
                  <button
                    onClick={() => {
                      onNavigate('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Home & Highlights
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Order Celebration Cakes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Cake Parfait & Small Chops
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('custom-orders');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Bespoke Wedding & Milestone Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('gallery');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Cake Photo Gallery
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Policies & Quality */}
            <div>
              <h4 className="font-serif-display text-lg font-bold uppercase tracking-wider text-white mb-4">
                Ordering & Trust
              </h4>
              <ul className="space-y-2.5 text-sm text-[#FFF5F2]">
                <li>
                  <button
                    onClick={() => {
                      onNavigate('delivery-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors text-left"
                  >
                    48-Hour Minimum Lead Time
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('delivery-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors text-left"
                  >
                    Abuja-Wide Delivery Zones
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('delivery-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors text-left"
                  >
                    Allergen & Ingredient Transparency
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors text-left"
                  >
                    About the Founder & Certifications
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('faq');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline hover:text-white transition-colors text-left"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Quick Contact */}
            <div className="space-y-3">
              <h4 className="font-serif-display text-lg font-bold uppercase tracking-wider text-white mb-4">
                Abuja Kitchen
              </h4>
              <div className="flex items-start gap-2.5 text-sm text-[#FFF5F2]">
                <MapPin className="w-4 h-4 shrink-0 text-[#FBE6DF] mt-1" />
                <span>{siteConfig.coverage}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-[#FFF5F2]">
                <Phone className="w-4 h-4 shrink-0 text-[#FBE6DF] mt-1" />
                <span>WhatsApp: {siteConfig.whatsappDisplay}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-[#FFF5F2]">
                <Clock className="w-4 h-4 shrink-0 text-[#FBE6DF] mt-1" />
                <span className="text-xs leading-relaxed">{siteConfig.openingHoursNote}</span>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2B1A12] text-white px-4 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#4A2F22] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A24B]" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Notes */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-4">
            <p>© {new Date().getFullYear()} FATISH CAKES. All rights reserved. Abuja, Nigeria.</p>
            <p className="flex items-center gap-1 text-white/90">
              <span>Bespoke bakes made with</span>
              <Heart className="w-3.5 h-3.5 text-[#FBE6DF] fill-current" />
              <span>in the FCT</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
