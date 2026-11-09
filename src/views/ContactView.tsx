import React from 'react';
import {
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  Phone,
  ExternalLink,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { siteConfig } from '../data/site.ts';

export const ContactView: React.FC = () => {
  const genericWhatsAppUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hello Fatish Cakes 👋 I'm contacting you from your website and would like to inquire about ordering a cake in Abuja."
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
          Get In Touch
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2]">
          Contact <span className="text-[#DC5A06]">Fatish Cakes</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] font-light leading-relaxed">
          We arrange all orders, consultations, and delivery confirmations directly via WhatsApp Business and Instagram.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Direct WhatsApp Card */}
        <div className="bg-white dark:bg-[#1E130B] p-6 sm:p-8 rounded-3xl border border-[#2B1A12]/10 dark:border-white/10 shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">Primary Ordering & Inquiries Channel</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
            Have questions about flavor combinations, tier sizes, or urgent dates in Abuja? Tap below to open an immediate chat with our baking coordinator.
          </p>

          <div className="p-4 rounded-2xl bg-[#FFF5F2] dark:bg-[#25170F] border border-[#DC5A06]/20 space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#DC5A06] block">
              Official WhatsApp Line
            </span>
            <p className="text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              {siteConfig.whatsappDisplay}
            </p>
            <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
              Fastest response during baking hours (Mon-Sat: 8am - 6pm)
            </p>
          </div>

          <a
            href={genericWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>

        {/* Right Column: Social Channels & Location Facts */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1E130B] p-6 sm:p-8 rounded-3xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-5">
            <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Social & Online Profiles
            </h3>

            <div className="space-y-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#2B1A12]/10 dark:border-white/10 hover:border-[#DC5A06] hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF5F2] dark:bg-[#281810] text-[#DC5A06] flex items-center justify-center group-hover:bg-[#DC5A06] group-hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Instagram @fatishcakes</p>
                    <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">Celebration cakes, 16.8K followers</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#6B4A3A] group-hover:text-[#DC5A06]" />
              </a>

              <a
                href={siteConfig.snackBarIgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#2B1A12]/10 dark:border-white/10 hover:border-[#DC5A06] hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF5F2] dark:bg-[#281810] text-[#DC5A06] flex items-center justify-center group-hover:bg-[#DC5A06] group-hover:text-white transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Snack Bar @fatishsnackbar_abuja</p>
                    <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">Parfaits, small chops & quick bites</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#6B4A3A] group-hover:text-[#DC5A06]" />
              </a>

              <a
                href={siteConfig.linktreeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#2B1A12]/10 dark:border-white/10 hover:border-[#DC5A06] hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF5F2] dark:bg-[#281810] text-[#DC5A06] flex items-center justify-center group-hover:bg-[#DC5A06] group-hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Linktree Hub</p>
                    <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">All brand links & menus</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#6B4A3A] group-hover:text-[#DC5A06]" />
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E130B] p-6 sm:p-8 rounded-3xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Bakery Facts
            </h3>
            <div className="space-y-3 text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DC5A06] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Coverage Area</p>
                  <p>{siteConfig.coverage}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#DC5A06] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Hours & Ordering</p>
                  <p>{siteConfig.openingHoursNote}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#DC5A06] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Pickup Address</p>
                  <p>{siteConfig.pickupAddressNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
