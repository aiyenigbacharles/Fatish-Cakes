/**
 * FATISH CAKES: Main Application Component
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { StickyCartBar } from './components/StickyCartBar.tsx';

import { HomeView } from './views/HomeView.tsx';
import { MenuView } from './views/MenuView.tsx';
import { CustomOrdersView } from './views/CustomOrdersView.tsx';
import { GalleryView } from './views/GalleryView.tsx';
import { AboutView } from './views/AboutView.tsx';
import { DeliveryPolicyView } from './views/DeliveryPolicyView.tsx';
import { FAQView } from './views/FAQView.tsx';
import { ContactView } from './views/ContactView.tsx';
import { CheckoutView } from './views/CheckoutView.tsx';
import { NotFoundView } from './views/NotFoundView.tsx';
import { Breadcrumbs } from './components/Breadcrumbs.tsx';

import { getCartItems, CartItem } from './lib/cart.ts';
import { Product } from './data/products.ts';
import { updatePageMeta } from './lib/seo.ts';

const VALID_VIEWS = new Set([
  'home',
  'menu',
  'custom-orders',
  'gallery',
  'about',
  'delivery-policy',
  'faq',
  'contact',
  'checkout'
]);

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  // Sync cart state
  useEffect(() => {
    setCartItems(getCartItems());
    const cartHandler = (e: Event) => {
      const custom = e as CustomEvent<{ items: CartItem[] }>;
      setCartItems(custom.detail?.items || getCartItems());
    };
    window.addEventListener('fatish-cart-updated', cartHandler);
    return () => window.removeEventListener('fatish-cart-updated', cartHandler);
  }, []);

  // Sync hash routing so back/forward and direct links work with 404 fallback
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').trim();
      if (!hash || hash === '') {
        setCurrentView('home');
      } else if (VALID_VIEWS.has(hash)) {
        setCurrentView(hash);
      } else {
        // Unknown route goes to custom 404 page
        setCurrentView('404');
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic page titles, canonical tags, and meta descriptions whenever route changes
  useEffect(() => {
    updatePageMeta(currentView);
  }, [currentView]);

  const navigateTo = (view: string) => {
    const target = VALID_VIEWS.has(view) ? view : '404';
    setCurrentView(target);
    window.location.hash = target === 'home' ? '#/' : `#/${target}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8] dark:bg-[#150D08] text-[#2B1A12] dark:text-[#FFF5F2] selection:bg-[#DC5A06]/20 transition-colors duration-200">
      {/* Sticky Header */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Accessible SEO Breadcrumbs */}
      <Breadcrumbs currentView={currentView} onNavigate={navigateTo} />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {currentView === 'menu' && (
          <MenuView
            onSelectProduct={handleSelectProduct}
            onNavigateToCustom={() => navigateTo('custom-orders')}
          />
        )}
        {currentView === 'custom-orders' && <CustomOrdersView />}
        {currentView === 'gallery' && <GalleryView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'delivery-policy' && <DeliveryPolicyView />}
        {currentView === 'faq' && <FAQView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'checkout' && (
          <CheckoutView
            items={cartItems}
            onNavigateToMenu={() => navigateTo('menu')}
          />
        )}
        {currentView === '404' && <NotFoundView onNavigate={navigateTo} />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Concierge */}
      <FloatingWhatsApp currentView={currentView} />

      {/* Mobile Sticky Bottom Cart Indicator Bar */}
      <StickyCartBar
        items={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        currentView={currentView}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onNavigateToCheckout={() => {
          setIsCartOpen(false);
          navigateTo('checkout');
        }}
        onNavigateToMenu={() => {
          setIsCartOpen(false);
          navigateTo('menu');
        }}
      />

      {/* Product Customizer Modal / Bottom Sheet */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
