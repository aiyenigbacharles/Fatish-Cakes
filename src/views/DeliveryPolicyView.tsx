import React, { useState } from 'react';
import { Truck, Clock, ShieldCheck, MapPin, ChevronDown, ChevronUp, AlertCircle, AlertTriangle } from 'lucide-react';
import { getDeliveryAreas, getPolicies } from '../lib/content.ts';
import { siteConfig } from '../data/site.ts';

export const DeliveryPolicyView: React.FC = () => {
  const deliveryAreas = getDeliveryAreas();
  const policies = getPolicies();

  const [openSection, setOpenSection] = useState<string>('lead-time');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
          Customer Transparency
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2]">
          Delivery & Order <span className="text-[#DC5A06]">Policies</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] font-light leading-relaxed">
          Important information regarding our 48-hour baking lead time, Abuja coverage districts, pickup arrangements, and allergen notices.
        </p>
      </div>

      {/* Accordion Policy Sections */}
      <div className="space-y-4">
        {/* Accordion 1: 48h Lead Time */}
        <div className="bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('lead-time')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#DC5A06]" />
              <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                1. 48-Hour Minimum Lead Time
              </h3>
            </div>
            {openSection === 'lead-time' ? (
              <ChevronUp className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            )}
          </button>
          {openSection === 'lead-time' && (
            <div className="p-5 pt-0 border-t border-[#2B1A12]/5 dark:border-white/5 text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed space-y-3">
              <p>{policies.leadTimeSummary}</p>
              <div className="p-3 bg-[#FFF5F2] dark:bg-[#281810] rounded-xl border border-[#DC5A06]/20 text-xs text-[#DC5A06] font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  For multi-tiered wedding cakes or large event orders exceeding 100 guests, please book 5 to 7 days in advance.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Delivery Logistics & Coverage */}
        <div className="bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('delivery')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#DC5A06]" />
              <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                2. Abuja Delivery Guidelines & Handling
              </h3>
            </div>
            {openSection === 'delivery' ? (
              <ChevronUp className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            )}
          </button>
          {openSection === 'delivery' && (
            <div className="p-5 pt-0 border-t border-[#2B1A12]/5 dark:border-white/5 text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed space-y-3">
              <p>{policies.deliveryPolicy}</p>
              <p>
                Delivery fees are calculated based on your specific Abuja estate or district and are quoted transparently during WhatsApp confirmation.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 3: Bakery Studio Pickup */}
        <div className="bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('pickup')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#DC5A06]" />
              <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                3. Self-Pickup Terms & Studio Location
              </h3>
            </div>
            {openSection === 'pickup' ? (
              <ChevronUp className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            )}
          </button>
          {openSection === 'pickup' && (
            <div className="p-5 pt-0 border-t border-[#2B1A12]/5 dark:border-white/5 text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed space-y-3">
              <p>{policies.pickupPolicy}</p>
              <p className="text-xs italic text-[#DC5A06]">
                {siteConfig.pickupAddressNote}
              </p>
            </div>
          )}
        </div>

        {/* Accordion 4: Payment, Deposits & Cancellations */}
        <div className="bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('payment')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#DC5A06]" />
              <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                4. Payment, Deposits & Cancellations
              </h3>
            </div>
            {openSection === 'payment' ? (
              <ChevronUp className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            )}
          </button>
          {openSection === 'payment' && (
            <div className="p-5 pt-0 border-t border-[#2B1A12]/5 dark:border-white/5 text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed space-y-3">
              <p>{policies.paymentPolicy}</p>
              <p>{policies.cancellationPolicy}</p>
            </div>
          )}
        </div>

        {/* Accordion 5: Food Allergens & Dietary Notice */}
        <div className="bg-white dark:bg-[#1E130B] rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('allergies')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFF5F2] dark:hover:bg-[#25170F] transition-colors"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#DC5A06]" />
              <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                5. Food Allergens & Dietary Information
              </h3>
            </div>
            {openSection === 'allergies' ? (
              <ChevronUp className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B4A3A] dark:text-[#D4B9AC]" />
            )}
          </button>
          {openSection === 'allergies' && (
            <div className="p-5 pt-0 border-t border-[#2B1A12]/5 dark:border-white/5 text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed space-y-3">
              <p>{policies.allergenNotice}</p>
            </div>
          )}
        </div>
      </div>

      {/* Areas We Serve in Abuja Section */}
      <div className="bg-white dark:bg-[#1E130B] p-6 sm:p-8 rounded-3xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
            Federal Capital Territory Coverage
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2B1A12] dark:text-[#FFF5F2] mt-1">
            Popular Areas We Serve Across Abuja
          </h2>
          <p className="text-xs sm:text-sm text-[#6B4A3A] dark:text-[#D4B9AC] mt-1">
            We deliver on time to private residences, event centres, churches, mosques, and corporate headquarters.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {deliveryAreas.map((area) => (
            <div
              key={area.name}
              className="p-3 rounded-xl bg-[#FFF5F2] dark:bg-[#25170F] border border-[#2B1A12]/5 dark:border-white/5 hover:border-[#DC5A06]/30 transition-colors"
            >
              <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2]">{area.name}</p>
              <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">{area.district}</p>
              <p className="text-[10px] text-[#DC5A06] font-medium mt-1">
                ~{area.estimatedTransitTime}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
