import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Truck,
  MapPin,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { CartItem, getCartSummary, clearCart } from '../lib/cart.ts';
import { getDeliveryAreas } from '../lib/content.ts';
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  formatNaira,
  OrderPayload
} from '../lib/whatsapp.ts';

interface CheckoutViewProps {
  items: CartItem[];
  onNavigateToMenu: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ items, onNavigateToMenu }) => {
  const deliveryAreas = getDeliveryAreas();
  const summary = getCartSummary(items);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fulfilment, setFulfilment] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryArea, setDeliveryArea] = useState('Gwarinpa');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // 48-Hour date rule: Calculate minimum allowed date (now + 48 hours)
  const minDateObj = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const minDateStr = minDateObj.toISOString().split('T')[0];

  const [eventDate, setEventDate] = useState(minDateStr);
  const [eventTime, setEventTime] = useState('14:00');
  const [allergyNotes, setAllergyNotes] = useState('');
  const [extraNotes, setExtraNotes] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+?234|0)[789][01]\d{8}$/;
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Phone number is required for WhatsApp ordering';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phoneNumber = 'Enter a valid Nigerian phone number (e.g. 08060320401 or +2348060320401)';
    }

    if (fulfilment === 'delivery' && !deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Please enter your Abuja street address';
    }

    // Verify 48-hour date rule
    const selectedDateObj = new Date(`${eventDate}T${eventTime}`);
    const nowTime = Date.now();
    const hoursDiff = (selectedDateObj.getTime() - nowTime) / (1000 * 60 * 60);

    if (isNaN(selectedDateObj.getTime()) || hoursDiff < 47.9) {
      newErrors.eventDate = 'Fatish Cakes requires at least 48 hours notice. Please pick a date at least 2 days from now.';
    }

    if (!consentChecked) {
      newErrors.consent = 'Please confirm that orders are settled and confirmed on WhatsApp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    const dateObj = new Date(`${eventDate}T${eventTime}`);
    const formattedDateTime = dateObj.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const orderPayload: OrderPayload = {
      customerName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      fulfilmentType: fulfilment,
      deliveryArea: fulfilment === 'delivery' ? deliveryArea : undefined,
      deliveryAddress: fulfilment === 'delivery' ? deliveryAddress : undefined,
      eventDateTime: formattedDateTime,
      allergyNotes: allergyNotes,
      extraNotes: extraNotes,
      items: items.map((i) => ({
        name: i.product.name,
        optionsSummary: i.optionsSummary,
        inscription: i.inscription,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        lineTotal: i.lineTotal
      })),
      totalEstimate: summary.subtotal
    };

    const message = buildOrderMessage(orderPayload);
    const url = buildWhatsAppUrl(message);

    setSubmittedWhatsAppUrl(url);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked, using fallback CTA link', err);
    }
  };

  // If cart is empty and not submitted
  if (items.length === 0 && !submittedWhatsAppUrl) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
        <h2 className="font-serif-display text-3xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
          Please select celebration cakes or treats from our menu before proceeding to checkout.
        </p>
        <button
          onClick={onNavigateToMenu}
          className="bg-[#DC5A06] text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-[#B84A04] transition-colors"
        >
          Explore Abuja Menu
        </button>
      </div>
    );
  }

  // SUCCESS SCREEN
  if (submittedWhatsAppUrl) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white dark:bg-[#1E130B] rounded-3xl p-6 sm:p-10 border border-[#2B1A12]/10 dark:border-white/10 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] mx-auto flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
              Almost Done!
            </span>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Complete Your Order on WhatsApp
            </h1>
            <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC] leading-relaxed">
              We've compiled your customized order into a structured chat for Fatish Cakes (+234 806 032 0401). If WhatsApp did not open automatically, tap the button below.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={submittedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Open WhatsApp Chat Now</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            <button
              onClick={() => {
                clearCart();
                setSubmittedWhatsAppUrl(null);
                onNavigateToMenu();
              }}
              className="w-full bg-[#FFF5F2] dark:bg-[#25170F] hover:bg-[#FBE6DF] dark:hover:bg-[#342016] text-[#6B4A3A] dark:text-[#D4B9AC] py-3 px-6 rounded-xl font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Cart and Return to Bakery Menu</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#2B1A12]/10 dark:border-white/10 text-left text-xs text-[#6B4A3A] dark:text-[#D4B9AC] space-y-2">
            <p className="font-bold text-[#2B1A12] dark:text-[#FFF5F2]">What happens next?</p>
            <p>1. Fatish Cakes reviews your requested event date and cake design on WhatsApp.</p>
            <p>2. We confirm the delivery rider schedule and send official bank payment details.</p>
            <p>3. Your 70% deposit locks in your date on our Abuja baking calendar.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#DC5A06] font-bold">
          Final Step
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#2B1A12] dark:text-[#FFF5F2]">
          Confirm Your <span className="text-[#DC5A06]">Order Details</span>
        </h1>
        <p className="text-sm text-[#6B4A3A] dark:text-[#D4B9AC]">
          Review your items, choose Abuja delivery or pickup, and send directly to our bakery WhatsApp chat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Customer Contact */}
          <div className="bg-white dark:bg-[#1E130B] p-5 sm:p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              1. Customer Information
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                Full Name <span className="text-[#DC5A06]">*</span>
              </label>
              <input
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Amina Bello"
                className={`w-full bg-[#FFFBF8] dark:bg-[#150D08] border rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06] ${
                  errors.fullName ? 'border-red-500' : 'border-[#2B1A12]/20 dark:border-white/15'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  WhatsApp Phone <span className="text-[#DC5A06]">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 08060320401"
                  className={`w-full bg-[#FFFBF8] dark:bg-[#150D08] border rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06] ${
                    errors.phoneNumber ? 'border-red-500' : 'border-[#2B1A12]/20 dark:border-white/15'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amina@example.com"
                  className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
                />
              </div>
            </div>
          </div>

          {/* Fulfilment: Delivery or Pickup */}
          <div className="bg-white dark:bg-[#1E130B] p-5 sm:p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              2. Fulfilment Method
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfilment('delivery')}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  fulfilment === 'delivery'
                    ? 'border-[#DC5A06] bg-[#FFF5F2] dark:bg-[#2A1B12] ring-1 ring-[#DC5A06]'
                    : 'border-[#2B1A12]/20 dark:border-white/15 bg-white dark:bg-[#150D08] hover:border-[#DC5A06]/50'
                }`}
              >
                <Truck className="w-5 h-5 text-[#DC5A06]" />
                <div>
                  <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Abuja Delivery</p>
                  <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">Delivered to your doorstep</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFulfilment('pickup')}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  fulfilment === 'pickup'
                    ? 'border-[#DC5A06] bg-[#FFF5F2] dark:bg-[#2A1B12] ring-1 ring-[#DC5A06]'
                    : 'border-[#2B1A12]/20 dark:border-white/15 bg-white dark:bg-[#150D08] hover:border-[#DC5A06]/50'
                }`}
              >
                <MapPin className="w-5 h-5 text-[#DC5A06]" />
                <div>
                  <p className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Bakery Pickup</p>
                  <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC]">Address shared on WhatsApp</p>
                </div>
              </button>
            </div>

            {fulfilment === 'delivery' ? (
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                    Abuja Area / District <span className="text-[#DC5A06]">*</span>
                  </label>
                  <select
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value)}
                    className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
                  >
                    {deliveryAreas.map((area) => (
                      <option key={area.name} value={area.name}>
                        {area.name} ({area.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                    Street Address & Landmark <span className="text-[#DC5A06]">*</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="street-address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. House 14, 4th Avenue, Near First Bank, Gwarinpa"
                    className={`w-full bg-[#FFFBF8] dark:bg-[#150D08] border rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06] ${
                      errors.deliveryAddress ? 'border-red-500' : 'border-[#2B1A12]/20 dark:border-white/15'
                    }`}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-xs text-red-600">{errors.deliveryAddress}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-[#FFF5F2] dark:bg-[#25170F] rounded-xl border border-[#DC5A06]/20 text-xs text-[#6B4A3A] dark:text-[#D4B9AC] space-y-1">
                <p className="font-bold text-[#2B1A12] dark:text-[#FFF5F2]">Pickup Instructions:</p>
                <p>Our bakery studio pickup address will be provided in our WhatsApp chat after order review. Please arrange a vehicle with working air conditioning.</p>
              </div>
            )}
          </div>

          {/* Date & Time Picker enforcing 48-Hour Minimum Lead Time */}
          <div className="bg-white dark:bg-[#1E130B] p-5 sm:p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                3. Event Date & Time
              </h3>
              <span className="text-[11px] bg-[#DC5A06]/10 text-[#DC5A06] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>48h Rule Enforced</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Date Needed <span className="text-[#DC5A06]">*</span>
                </label>
                <input
                  type="date"
                  min={minDateStr}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={`w-full bg-[#FFFBF8] dark:bg-[#150D08] border rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#DC5A06] ${
                    errors.eventDate ? 'border-red-500' : 'border-[#2B1A12]/20 dark:border-white/15'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                  Preferred Time <span className="text-[#DC5A06]">*</span>
                </label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
                />
              </div>
            </div>

            {errors.eventDate && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.eventDate}</span>
              </p>
            )}

            <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC] bg-[#FFF5F2] dark:bg-[#25170F] p-2.5 rounded-lg border border-[#2B1A12]/5 dark:border-white/5">
              All celebration cakes require 48 hours to ensure fresh sponge baking, structural setting, and delicate frosting. Earliest available date: <strong>{minDateStr}</strong>.
            </p>
          </div>

          {/* Allergies & Notes */}
          <div className="bg-white dark:bg-[#1E130B] p-5 sm:p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              4. Dietary & Special Notes
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                Any Allergies or Dietary Requirements?
              </label>
              <textarea
                rows={2}
                value={allergyNotes}
                onChange={(e) => setAllergyNotes(e.target.value)}
                placeholder="e.g. Peanut allergy, lactose sensitivity, or none"
                className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                Extra Notes or Gate Access Details
              </label>
              <textarea
                rows={2}
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                placeholder="e.g. Call upon reaching estate gate, surprise delivery..."
                className="w-full bg-[#FFFBF8] dark:bg-[#150D08] border border-[#2B1A12]/20 dark:border-white/15 rounded-lg p-3 text-sm text-[#2B1A12] dark:text-[#FFF5F2] placeholder-[#6B4A3A]/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#DC5A06]"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#DC5A06] rounded border-[#2B1A12]/30 dark:border-white/30 focus:ring-[#DC5A06]"
                />
                <span className="text-xs text-[#2B1A12] dark:text-[#FFF5F2] leading-relaxed">
                  I understand that my order is officially confirmed once Fatish Cakes replies on WhatsApp and verified payment details are shared.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-red-600 mt-1">{errors.consent}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-[0.99]"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Send Order on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        {/* Right Order Summary Sticky Column */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1E130B] p-5 sm:p-6 rounded-2xl border border-[#2B1A12]/10 dark:border-white/10 shadow-xs space-y-5 lg:sticky lg:top-24">
          <div className="border-b border-[#2B1A12]/10 dark:border-white/10 pb-4">
            <h3 className="font-serif-display text-xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
              Order Summary
            </h3>
            <p className="text-xs text-[#6B4A3A] dark:text-[#D4B9AC]">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-[#2B1A12]/5 dark:divide-white/5 pr-1">
            {items.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-start gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-[#FBE6DF] dark:bg-[#2A1B12] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#2B1A12] dark:text-[#FFF5F2] shrink-0 ml-2">
                      {item.lineTotal !== null ? formatNaira(item.lineTotal) : 'On request'}
                    </span>
                  </div>
                  {item.optionsSummary && (
                    <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC] truncate mt-0.5">
                      {item.optionsSummary}
                    </p>
                  )}
                  {item.inscription && (
                    <p className="text-[11px] italic text-[#DC5A06] truncate">
                      "{item.inscription}"
                    </p>
                  )}
                  <p className="text-[11px] text-[#6B4A3A] dark:text-[#D4B9AC] mt-0.5">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#2B1A12]/10 dark:border-white/10 space-y-2 text-sm">
            <div className="flex justify-between text-[#6B4A3A] dark:text-[#D4B9AC]">
              <span>Estimated Subtotal</span>
              <span className="font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                {summary.subtotal !== null
                  ? formatNaira(summary.subtotal)
                  : 'To be confirmed on WhatsApp'}
              </span>
            </div>
            <div className="flex justify-between text-[#6B4A3A] dark:text-[#D4B9AC]">
              <span>Delivery Fee</span>
              <span className="text-xs font-medium text-[#2B1A12] dark:text-[#FFF5F2]">
                {fulfilment === 'delivery' ? 'Confirmed on WhatsApp' : 'Free (Pickup)'}
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#FFF5F2] dark:bg-[#25170F] rounded-xl border border-[#DC5A06]/20 text-xs text-[#6B4A3A] dark:text-[#D4B9AC] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C9A24B] shrink-0" />
            <span>No payment is charged now. Payment is arranged directly with Fatish on WhatsApp.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
