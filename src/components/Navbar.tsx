import React, { useState } from 'react';
import { ShaviLogo } from './ShaviLogo';
import { buildWhatsAppUrl, trackEvent } from '../utils/analytics';
import { ArrowLeft, Phone, MessageCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAuditModal: (source: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuditModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { labelEn: 'Our System', labelAr: 'منظومة النمو', href: '#system' },
    { labelEn: 'Services', labelAr: 'الخدمات', href: '#services' },
    { labelEn: 'Case Studies', labelAr: 'قصص النمو', href: '#cases' },
    { labelEn: 'Packages', labelAr: 'الباقات', href: '#packages' },
    { labelEn: 'Why Shavi', labelAr: 'لماذا Shavi', href: '#why-shavi' },
    { labelEn: 'FAQ', labelAr: 'الأسئلة', href: '#faq' },
  ];

  const handleWhatsAppClick = (location: string) => {
    trackEvent('whatsapp_click', { cta_location: location });
  };

  const handlePrimaryCta = (location: string) => {
    trackEvent('cta_click', { cta_location: location, event_label: 'Book a Growth Audit' });
    setMobileMenuOpen(false);
    onOpenAuditModal(location);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090A0F]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="focus:outline-none shrink-0"
          aria-label="Shavi Smart Growth Solutions"
        >
          <ShaviLogo variant="light" size="md" showTagline={true} />
        </a>

        {/* Desktop Navigation matching reference header */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="التنقل الرئيسي">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center text-xs font-medium text-[#CBD5E1] hover:text-white transition-colors py-1"
            >
              <span>{item.labelAr}</span>
              <span className="font-en text-[10px] text-[#64748B] group-hover:text-[#E11D2E] transition-colors">
                {item.labelEn}
              </span>
            </a>
          ))}
        </nav>

        {/* Desktop Contact & Red Audit CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick('navbar_desktop')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#E2E8F0] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            title="تحدث عبر واتساب"
          >
            <MessageCircle className="w-4 h-4 text-[#22C55E]" />
            <Phone className="w-3.5 h-3.5 text-[#E11D2E]" />
            <span className="font-mono-num text-xs" dir="ltr">
              +20 111 504 2478
            </span>
          </a>

          <button
            type="button"
            onClick={() => handlePrimaryCta('navbar_desktop')}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E11D2E] to-[#B91C1C] hover:from-[#F43F5E] hover:to-[#E11D2E] rounded-lg shadow-[0_0_25px_rgba(225,29,46,0.4)] transition-all cursor-pointer"
          >
            <span className="font-en">Book a Growth Audit</span>
            <span className="text-white/70">|</span>
            <span>تشخيص العيادة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 text-white border border-white/15 bg-white/5 rounded-lg"
          aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0B0D13] px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col divide-y divide-white/10">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 flex items-center justify-between text-sm font-medium text-white hover:text-[#E11D2E]"
              >
                <span>{item.labelAr}</span>
                <span className="font-en text-xs text-[#94A3B8]">{item.labelEn}</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => handlePrimaryCta('navbar_mobile')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#E11D2E] to-[#B91C1C] rounded-lg"
            >
              <span>احجز جلسة Medical Growth Audit</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick('navbar_mobile')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/5 border border-white/15 rounded-lg"
            >
              <MessageCircle className="w-4 h-4 text-[#22C55E]" />
              <span>تحدث عبر واتساب الآن</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
