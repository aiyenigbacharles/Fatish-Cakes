import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { getAllFaqs } from '../lib/content.ts';
import { siteConfig } from '../data/site.ts';

export const FAQView: React.FC = () => {
  const allFaqs = getAllFaqs();
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string>('faq-lead-time');

  const filtered = allFaqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
          Got Questions?
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2]">
          Frequently Asked <span className="text-[#DC5A06]">Questions</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] font-light leading-relaxed">
          Everything you need to know about lead times, custom decorations, Abuja delivery logistics, and payments.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-[#6B4A3A] dark:text-[#D4B9AC] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search question (e.g. lead time, allergies, wedding...)"
          className="w-full bg-white dark:bg-[#1E130B] border border-[#2B1A12]/20 dark:border-white/10 rounded-full pl-9 pr-4 py-3 text-xs sm:text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/60 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06] shadow-xs"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 space-y-2">
            <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
              No answers matched "{search}".
            </p>
            <button
              onClick={() => setSearch('')}
              className="text-xs font-bold text-[#DC5A06] hover:underline uppercase"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors"
                >
                  <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#DC5A06] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-[#2B1A12]/5 dark:border-white/5 text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still need help CTA */}
      <div className="p-8 rounded-3xl bg-[#FFF5F2] dark:bg-[#1E130B] border border-[#DC5A06]/20 text-center space-y-3">
        <h4 className="font-serif-display text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
          Have a specific cake request not answered here?
        </h4>
        <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] max-w-md mx-auto">
          Our friendly bakery team in Abuja is always available to assist you directly on WhatsApp.
        </p>
        <div className="pt-2">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat With Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
