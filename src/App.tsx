import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SystemArchitectureSection } from './components/SystemArchitectureSection';
import { ServiceBreakdownSection } from './components/ServiceBreakdownSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { ComparisonAndChatwootSection } from './components/ComparisonAndChatwootSection';
import { ProofAndRoadmapSection } from './components/ProofAndRoadmapSection';
import { FaqSection } from './components/FaqSection';
import { QualificationFunnelSection } from './components/QualificationFunnelSection';
import { buildWhatsAppUrl, trackEvent } from './utils/analytics';
import { MessageSquare, ArrowUpLeft } from 'lucide-react';

export default function App() {
  const [preselectedBottleneck, setPreselectedBottleneck] = useState<string | undefined>(undefined);
  const [preselectedSpecialty, setPreselectedSpecialty] = useState<string | undefined>(undefined);

  useEffect(() => {
    trackEvent('page_view', {
      event_category: 'landing_page',
      event_label: 'Shavi Medical Growth System',
    });

    const firedThresholds = new Set<number>();
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 90].forEach((threshold) => {
        if (scrollPercent >= threshold && !firedThresholds.has(threshold)) {
          firedThresholds.add(threshold);
          trackEvent('scroll_depth', { scroll_percentage: threshold });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateToAudit = (
    source: string,
    bottleneck?: string,
    specialty?: string
  ) => {
    trackEvent('booking_click', {
      cta_location: source,
      bottleneck,
      specialty,
    });

    if (bottleneck) setPreselectedBottleneck(bottleneck);
    if (specialty) setPreselectedSpecialty(specialty);

    const el = document.getElementById('audit-funnel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090E] text-[#0F1117] selection:bg-[#E11D2E] selection:text-white">
      <Navbar onOpenAuditModal={(source) => handleNavigateToAudit(source)} />

      <main className="flex-1">
        <HeroSection onOpenAuditModal={(source) => handleNavigateToAudit(source)} />

        <ProblemSection
          onOpenAuditModal={(source, bottleneck) =>
            handleNavigateToAudit(source, bottleneck)
          }
        />

        <SpecialtiesSection
          onOpenAuditModal={(source, bottleneck, specialty) =>
            handleNavigateToAudit(source, bottleneck, specialty)
          }
        />

        <SystemArchitectureSection
          onOpenAuditModal={(source) => handleNavigateToAudit(source)}
        />

        <ServiceBreakdownSection
          onOpenAuditModal={(source) => handleNavigateToAudit(source)}
        />

        <ComparisonAndChatwootSection
          onOpenAuditModal={(source) => handleNavigateToAudit(source)}
        />

        <ProofAndRoadmapSection
          onOpenAuditModal={(source) => handleNavigateToAudit(source)}
        />

        <FaqSection />

        <QualificationFunnelSection
          preselectedBottleneck={preselectedBottleneck}
          preselectedSpecialty={preselectedSpecialty}
        />
      </main>

      {/* Sticky Mobile Bottom Conversion Bar */}
      <div className="sm:hidden fixed bottom-0 right-0 left-0 z-40 bg-[#08090E]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleNavigateToAudit('mobile_sticky_bar')}
          className="flex-1 py-3 px-4 bg-[#E11D2E] text-white text-xs font-bold rounded-xl inline-flex items-center justify-center gap-1.5"
        >
          <span>Medical Growth Audit | احجز تشخيص</span>
          <ArrowUpLeft className="w-4 h-4" />
        </button>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('whatsapp_click', { cta_location: 'mobile_sticky_bar' })
          }
          className="py-3 px-4 bg-[#16A34A] text-white text-xs font-bold rounded-xl inline-flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>واتساب</span>
        </a>
      </div>
    </div>
  );
}

