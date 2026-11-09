import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import { getAllGalleryItems } from '../lib/content.ts';
import { siteConfig } from '../data/site.ts';

export const GalleryView: React.FC = () => {
  const items = getAllGalleryItems();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = items.filter(
    (item) => selectedFilter === 'all' || item.category === selectedFilter
  );

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'parfait', label: 'Cake Parfait' },
    { id: 'chops', label: 'Small Chops' },
    { id: 'events', label: 'Events & Setups' },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        activeLightboxIndex > 0 ? activeLightboxIndex - 1 : filteredItems.length - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        activeLightboxIndex < filteredItems.length - 1 ? activeLightboxIndex + 1 : 0
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
          Visual Inspiration
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2]">
          Our Cake & Snack <span className="text-[#DC5A06]">Gallery</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] font-light leading-relaxed">
          Browse real creations freshly crafted for birthdays, anniversaries, and corporate events across Abuja.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedFilter === f.id
                ? 'bg-[#DC5A06] text-white shadow-xs'
                : 'bg-white dark:bg-[#1E130B] text-[#6B4A3A] dark:text-[#D4B9AC] border border-[#2B1A12]/15 dark:border-white/10 hover:border-[#DC5A06]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxIndex(idx)}
            className="group relative cursor-pointer bg-white dark:bg-[#1E130B] rounded-2xl overflow-hidden border border-[#2B1A12]/10 dark:border-white/10 shadow-xs hover:shadow-xl transition-all"
          >
            <div className="aspect-4/3 overflow-hidden bg-[#FBE6DF] dark:bg-[#2A1B12]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#DC5A06] font-bold">
                {item.categoryLabel}
              </span>
              <h3 className="font-serif-display text-lg font-bold text-[#2B1A12] dark:text-[#FFF5F2] group-hover:text-[#DC5A06] transition-colors truncate">
                {item.title}
              </h3>
              <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] line-clamp-1">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Follow Callout */}
      <div className="p-8 rounded-3xl bg-[#FFF5F2] dark:bg-[#1E130B] border border-[#DC5A06]/20 text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-[#DC5A06] text-white mx-auto flex items-center justify-center">
          <Instagram className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif-display text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Want to see daily fresh bakes?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] mt-1">
            We share behind-the-scenes videos, client deliveries, and decorating reels daily with 16.8K followers.
          </p>
        </div>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#DC5A06] hover:bg-[#B84A04] text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <span>Follow @fatishcakes on Instagram</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#1A0F09]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-black/50 hover:bg-black/80"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/80"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="max-w-3xl w-full bg-white dark:bg-[#1E130B] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={filteredItems[activeLightboxIndex].image}
                alt={filteredItems[activeLightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 sm:p-5 bg-white dark:bg-[#1E130B] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#DC5A06] font-bold">
                  {filteredItems[activeLightboxIndex].categoryLabel}
                </span>
                <span className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
                  {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
                {filteredItems[activeLightboxIndex].caption}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/80"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
