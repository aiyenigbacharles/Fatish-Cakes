import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PAGE_META_MAP } from '../lib/seo.ts';

interface BreadcrumbsProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentPageTitle?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentView,
  onNavigate,
  currentPageTitle
}) => {
  if (currentView === 'home') return null;

  const meta = PAGE_META_MAP[currentView] || PAGE_META_MAP['404'];
  const breadcrumbs = meta.breadcrumbs;

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
    >
      <ol
        className="flex items-center flex-wrap gap-1.5 text-xs text-[#6B4A3A] dark:text-[#D4B9AC]"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          const targetView =
            crumb.path === '#/' ? 'home' : crumb.path.replace('#/', '');

          return (
            <li
              key={crumb.path}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(idx + 1)} />
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#2B1A12]/30 dark:text-white/30 shrink-0" />
              )}
              {isLast ? (
                <span
                  className="font-semibold text-[#DC5A06] truncate max-w-[200px] sm:max-w-none"
                  itemProp="name"
                  aria-current="page"
                >
                  {currentPageTitle || crumb.name}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(targetView)}
                  className="hover:text-[#DC5A06] transition-colors flex items-center gap-1"
                  itemProp="item"
                >
                  {idx === 0 && <Home className="w-3.5 h-3.5" />}
                  <span itemProp="name">{crumb.name}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
