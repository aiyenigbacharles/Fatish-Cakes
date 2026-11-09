import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Clock, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import { buildCustomOrderMessage, buildWhatsAppUrl, CustomOrderPayload } from '../lib/whatsapp.ts';

export const CustomOrdersView: React.FC = () => {
  // 48-Hour date rule
  const minDateObj = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const minDateStr = minDateObj.toISOString().split('T')[0];

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [servings, setServings] = useState('20 - 30 Guests');
  const [budgetRange, setBudgetRange] = useState('₦40,000 - ₦70,000');
  const [themeAndColours, setThemeAndColours] = useState('');
  const [inscription, setInscription] = useState('');
  const [eventDate, setEventDate] = useState(minDateStr);
  const [eventTime, setEventTime] = useState('14:00');
  const [fulfilment, setFulfilment] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [allergyNotes, setAllergyNotes] = useState('');
  const [extraNotes, setExtraNotes] = useState('');

  const [error, setError] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim()) {
      setError('Please provide your name and WhatsApp phone number');
      return;
    }

    if (!themeAndColours.trim()) {
      setError('Please describe your cake theme or desired color scheme');
      return;
    }

    if (fulfilment === 'delivery' && !deliveryAddress.trim()) {
      setError('Please enter your full delivery address in Abuja (street, estate, or area)');
      return;
    }

    // Verify 48h lead time
    const selectedDate = new Date(`${eventDate}T${eventTime}`);
    const nowTime = Date.now();
    const hoursDiff = (selectedDate.getTime() - nowTime) / (1000 * 60 * 60);
    if (isNaN(selectedDate.getTime()) || hoursDiff < 47.9) {
      setError('Custom orders require at least 48 hours notice in Abuja. Please pick a date at least 2 days out.');
      return;
    }

    setError('');

    const formattedDateTime = selectedDate.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const payload: CustomOrderPayload = {
      customerName,
      phoneNumber,
      occasion,
      servingsOrGuests: servings,
      budgetRange,
      themeAndColours,
      inscription,
      eventDateTime: formattedDateTime,
      fulfilmentType: fulfilment,
      deliveryAddress: fulfilment === 'delivery' ? deliveryAddress : undefined,
      allergyNotes,
      extraNotes
    };

    const message = buildCustomOrderMessage(payload);
    const url = buildWhatsAppUrl(message);
    setSubmittedUrl(url);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked', err);
    }
  };

  if (submittedUrl) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] mx-auto flex items-center justify-center">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
            Inquiry Prepared
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Send Your Custom Cake Concept on WhatsApp
          </h2>
          <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
            Tap the button below to send your structured custom cake brief to Fatish Cakes. You can immediately attach your Pinterest or Instagram reference photos in the chat!
          </p>
        </div>
        <div className="space-y-3">
          <a
            href={submittedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Open WhatsApp & Send Brief</span>
          </a>
          <button
            onClick={() => setSubmittedUrl(null)}
            className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] hover:underline"
          >
            Edit Custom Order Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Bespoke Cake Artistry</span>
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2]">
          Design Your Dream <span className="text-[#DC5A06]">Custom Cake</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed font-light">
          From multi-tiered wedding centrepieces and sculpted cartoon themes to luxury gold-leaf birthday cakes. Tell us your concept and send your inspiration images directly to our baker on WhatsApp.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1E130B] p-6 sm:p-10 rounded-3xl border border-[#2B1A12]/10 dark:border-white/10 shadow-sm space-y-6">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Your Full Name <span className="text-[#DC5A06]">*</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Hajiya Fatima"
              className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              WhatsApp Phone Number <span className="text-[#DC5A06]">*</span>
            </label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 08060320401"
              className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            >
              <option value="Birthday Celebration">Birthday Celebration</option>
              <option value="Wedding / Engagement">Wedding / Engagement</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Bridal / Baby Shower">Bridal / Baby Shower</option>
              <option value="Corporate Event / Gala">Corporate Event / Gala</option>
              <option value="Graduation / Milestone">Graduation / Milestone</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Estimated Servings / Guests
            </label>
            <select
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            >
              <option value="10 - 15 Guests (Small Gathering)">10 - 15 Guests</option>
              <option value="20 - 30 Guests (Medium Party)">20 - 30 Guests</option>
              <option value="50 - 80 Guests (2-Tier Event)">50 - 80 Guests</option>
              <option value="100 - 150+ Guests (Grand Wedding)">100 - 150+ Guests</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Budget Guide (Optional)
            </label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            >
              <option value="Under ₦40,000">Under ₦40,000</option>
              <option value="₦40,000 - ₦70,000">₦40,000 - ₦70,000</option>
              <option value="₦70,000 - ₦120,000">₦70,000 - ₦120,000</option>
              <option value="₦150,000+ (Luxury Multi-Tier)">₦150,000+ (Luxury Multi-Tier)</option>
              <option value="Flexible / Quote Needed">Flexible / Quote Needed</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
            Theme, Colour Palette & Vision <span className="text-[#DC5A06]">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={themeAndColours}
            onChange={(e) => setThemeAndColours(e.target.value)}
            placeholder="e.g. Royal emerald green and gold drip with fresh white roses and edible gold leaf, or 3-tier Spiderman theme with chocolate ganache..."
            className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Piped Inscription on Cake
            </label>
            <input
              type="text"
              value={inscription}
              onChange={(e) => setInscription(e.target.value)}
              placeholder='e.g. "Happy 40th Birthday Senator"'
              className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Event Date (Min 48h Notice) <span className="text-[#DC5A06]">*</span>
            </label>
            <input
              type="date"
              min={minDateStr}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
            />
          </div>
        </div>

        {/* Fulfilment & Full Address Input (Replaces dropdown) */}
        <div className="space-y-4 pt-2 border-t border-[#2B1A12]/10 dark:border-white/10">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Fulfilment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfilment('delivery')}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                  fulfilment === 'delivery'
                    ? 'border-[#DC5A06] bg-[#FFF5F2] dark:bg-[#2A1B12] text-[#DC5A06] ring-1 ring-[#DC5A06]'
                    : 'border-[#2B1A12]/20 dark:border-white/15 bg-white dark:bg-[#150D08] text-[#6B4A3A] dark:text-[#D4B9AC]'
                }`}
              >
                Abuja Delivery
              </button>
              <button
                type="button"
                onClick={() => setFulfilment('pickup')}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                  fulfilment === 'pickup'
                    ? 'border-[#DC5A06] bg-[#FFF5F2] dark:bg-[#2A1B12] text-[#DC5A06] ring-1 ring-[#DC5A06]'
                    : 'border-[#2B1A12]/20 dark:border-white/15 bg-white dark:bg-[#150D08] text-[#6B4A3A] dark:text-[#D4B9AC]'
                }`}
              >
                Bakery Pickup
              </button>
            </div>
          </div>

          {fulfilment === 'delivery' ? (
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                Full Delivery Address <span className="text-[#DC5A06]">*</span>
              </label>
              <input
                type="text"
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Type your full address in Abuja (e.g. House 14, 4th Avenue, Near First Bank, Gwarinpa)"
                className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3.5 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
              />
              <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">
                We deliver across all districts and satellite towns of Abuja, FCT.
              </p>
            </div>
          ) : (
            <div className="p-3.5 bg-[#FFF5F2] dark:bg-[#23150D] rounded-xl border border-[#DC5A06]/20 text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
              Bakery studio pickup address in Abuja will be shared upon WhatsApp order confirmation.
            </div>
          )}
        </div>

        {/* Photo Prompt Box */}
        <div className="p-4 rounded-2xl bg-[#FFF5F2] dark:bg-[#23150D] border border-[#DC5A06]/20 flex items-start gap-3">
          <ImageIcon className="w-5 h-5 text-[#DC5A06] shrink-0 mt-0.5" />
          <div className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] space-y-1">
            <p className="font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Have an inspiration photo from Pinterest or Instagram?</p>
            <p>Once you click the button below, your brief will open in WhatsApp. Simply attach your saved cake pictures right in our chat!</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Send Custom Inquiry to WhatsApp</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </form>
    </div>
  );
};
