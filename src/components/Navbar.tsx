import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, MessageCircle, Sun, Moon } from 'lucide-react';
import { getCartItems, getCartSummary, CartItem } from '../lib/cart.ts';
import { getInitialTheme, applyTheme, ThemeMode } from '../lib/theme.ts';
import { siteConfig } from '../data/site.ts';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenCart }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);

    const themeHandler = (e: Event) => {
      const custom = e as CustomEvent<{ theme: ThemeMode }>;
      if (custom.detail?.theme) {
        setTheme(custom.detail.theme);
      }
    };
    window.addEventListener('fatish-theme-changed', themeHandler);
    return () => window.removeEventListener('fatish-theme-changed', themeHandler);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  useEffect(() => {
    setCartItems(getCartItems());
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ items: CartItem[] }>;
      setCartItems(custom.detail?.items || getCartItems());
    };
    window.addEventListener('fatish-cart-updated', handler);
    return () => window.removeEventListener('fatish-cart-updated', handler);
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const summary = getCartSummary(cartItems);

  // 'Reviews' is removed per user request
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'custom-orders', label: 'Custom Orders' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'delivery-policy', label: 'Delivery & Policy' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFBF8]/95 dark:bg-[#150D08]/95 backdrop-blur-md shadow-sm border-b border-[#2B1A12]/10 dark:border-white/10 py-3'
            : 'bg-[#FFFBF8] dark:bg-[#150D08] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark & Official Chef Hat Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC5A06] rounded-md shrink-0"
            aria-label="FATISH CAKES - Return to Homepage"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF5F2] dark:bg-[#23150D] border border-[#C9A24B]/30 flex items-center justify-center p-1 overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/brand/logo-160.webp"
                alt="Fatish Cakes Chef Hat Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#2B1A12] dark:text-[#FFF5F2] leading-none">
                FATISH <span className="text-[#DC5A06]">CAKES</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C9A24B] font-medium mt-0.5">
                Abuja Patisserie
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#6B4A3A] dark:text-[#D4B9AC]">
            {navLinks.slice(0, 5).map((link) => {
              const active = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-[#DC5A06] whitespace-nowrap ${
                    active ? 'text-[#DC5A06] font-semibold' : 'text-[#6B4A3A] dark:text-[#D4B9AC]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DC5A06] rounded-full" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('delivery-policy')}
              className={`py-1 transition-colors hover:text-[#DC5A06] whitespace-nowrap ${
                currentView === 'delivery-policy'
                  ? 'text-[#DC5A06] font-semibold'
                  : 'text-[#6B4A3A] dark:text-[#D4B9AC]'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`py-1 transition-colors hover:text-[#DC5A06] whitespace-nowrap ${
                currentView === 'contact'
                  ? 'text-[#DC5A06] font-semibold'
                  : 'text-[#6B4A3A] dark:text-[#D4B9AC]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Theme Toggle, Cart Trigger & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#FFF5F2] dark:hover:bg-[#23150D] text-[#2B1A12] dark:text-[#FFF5F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC5A06]"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[#2B1A12]" />
              ) : (
                <Sun className="w-5 h-5 text-[#C9A24B]" />
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-[#FFF5F2] dark:hover:bg-[#23150D] text-[#2B1A12] dark:text-[#FFF5F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC5A06]"
              aria-label={`Open shopping cart with ${summary.itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#2B1A12] dark:text-[#FFF5F2]" />
              {summary.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-[#DC5A06] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {summary.itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('menu')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#DC5A06] hover:bg-[#B84A04] text-white px-4 sm:px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-[#2B1A12] dark:text-[#FFF5F2] hover:bg-[#FFF5F2] dark:hover:bg-[#23150D] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC5A06]"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#FFF5F2] dark:bg-[#1A1009] flex flex-col pt-5 px-6 pb-8 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#2B1A12]/10 dark:border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <img
                src="/brand/logo-160.webp"
                alt="Fatish Cakes Logo"
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif-display text-2xl font-bold text-[#2B1A12] dark:text-[#FFF5F2]">
                FATISH <span className="text-[#DC5A06]">CAKES</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-[#2B1A12] dark:text-[#FFF5F2] rounded-full hover:bg-[#FBE6DF] dark:hover:bg-[#2E1C12]"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-6 h-6 text-[#2B1A12]" />
                ) : (
                  <Sun className="w-6 h-6 text-[#C9A24B]" />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#2B1A12] dark:text-[#FFF5F2] rounded-full hover:bg-[#FBE6DF] dark:hover:bg-[#2E1C12]"
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
          </div>

          <div className="flex-1 py-8 flex flex-col justify-center space-y-4">
            {navLinks.map((link) => {
              const active = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-2xl sm:text-3xl font-serif-display font-medium tracking-wide transition-colors py-1 ${
                    active
                      ? 'text-[#DC5A06] font-bold pl-2 border-l-4 border-[#DC5A06]'
                      : 'text-[#2B1A12] dark:text-[#FFF5F2] hover:text-[#DC5A06]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#2B1A12]/10 dark:border-white/10 space-y-4">
            <button
              onClick={() => handleNavClick('menu')}
              className="w-full bg-[#DC5A06] hover:bg-[#B84A04] text-white py-3.5 px-6 rounded-md font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#2B1A12] dark:bg-[#2E1C12] text-white py-3 px-6 rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#4A2F22]"
            >
              <MessageCircle className="w-4 h-4 text-[#C9A24B]" />
              <span>Chat on WhatsApp: {siteConfig.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
