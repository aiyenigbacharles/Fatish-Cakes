import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../data/site.ts';

interface FloatingWhatsAppProps {
  currentView: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentView }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  // Hidden on checkout per brief Section 4
  if (currentView === 'checkout') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#2B1A12] text-white px-3.5 py-2 rounded-lg shadow-lg border border-[#C9A24B]/30 animate-fade-in text-xs">
          <span>Need quick cake advice in Abuja?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Chat directly with Fatish Cakes on WhatsApp (+234 806 032 0401)"
      >
        {/* Subtle breathing ripple */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
      </a>
    </div>
  );
};
