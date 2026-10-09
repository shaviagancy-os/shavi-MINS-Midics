import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { buildWhatsAppUrl, trackEvent } from '../utils/analytics';
import {
  ArrowLeft,
  TrendingUp,
  Target,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  UserCheck,
  Activity,
  Zap,
  RefreshCw,
} from 'lucide-react';
import doctorHeroStudioImg from '../assets/images/doctor_hero_studio_1791483274683.jpg';
import clinicInteriorImg from '../assets/images/clinic_environment_editorial_1791478982759.jpg';
import heroExecutiveImg from '../assets/images/hero_medical_executive_1791478971909.jpg';
import growthShowcaseImg from '../assets/images/medical_growth_showcase_1791478992755.jpg';

interface HeroSectionProps {
  onOpenAuditModal: (source: string) => void;
}

const LIVE_LEAD_NOTIFICATIONS = [
  {
    id: 'derma',
    badge: 'New Qualified Lead',
    textEn: 'Patient booked an appointment for Dermatology Laser',
    textAr: 'تم تأكيد حجز جلسة ليزر ونضارة — فرع القاهرة',
    time: '10:24 AM',
    source: 'Instagram Ads',
    metric: '+218% Bookings',
  },
  {
    id: 'dental',
    badge: 'Appointment Confirmed',
    textEn: 'Patient confirmed Dental Implant Consultation',
    textAr: 'تم تأهيل وتأكيد موعد استشارة زراعة أسنان',
    time: '11:42 AM',
    source: 'WhatsApp Funnel',
    metric: '43% Conv. Rate',
  },
  {
    id: 'aesthetic',
    badge: 'Follow-up Recovered',
    textEn: 'Hesitant lead converted via 48h Follow-up Sequence',
    textAr: 'استعادة مريض متردد وتحويله لموعد كشف فعلي',
    time: '02:15 PM',
    source: 'Shavi System',
    metric: '-38% Cost/Booking',
  },
];

const HERO_FIVE_STAGES = [
  {
    id: 'marketing',
    labelEn: 'Growth Marketing',
    labelAr: 'تسويق طبي استراتيجي',
    icon: TrendingUp,
    href: '#system',
  },
  {
    id: 'acquisition',
    labelEn: 'Patient Acquisition',
    labelAr: 'استقطاب المريض المناسب',
    icon: UserCheck,
    href: '#services',
  },
  {
    id: 'conversion',
    labelEn: 'Conversion',
    labelAr: 'تحويل الرسائل لحجوزات',
    icon: Target,
    href: '#why-shavi',
  },
  {
    id: 'followup',
    labelEn: 'Follow-up',
    labelAr: 'متابعة منظمة للمترددين',
    icon: RefreshCw,
    href: '#why-shavi',
  },
  {
    id: 'optimization',
    labelEn: 'Optimization',
    labelAr: 'تحسين وتوسيع العائد',
    icon: Zap,
    href: '#roadmap',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuditModal }) => {
  const [activeLeadIdx, setActiveLeadIdx] = useState(0);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveLeadIdx((prev) => (prev + 1) % LIVE_LEAD_NOTIFICATIONS.length);
    }, 3800);
    return () => window.clearInterval(interval);
  }, []);

  const handleAuditClick = () => {
    trackEvent('cta_click', {
      cta_location: 'hero_primary',
      event_label: 'Medical Growth Audit',
    });
    onOpenAuditModal('hero_primary');
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      cta_location: 'hero_secondary',
    });
  };

  const currentNotification = LIVE_LEAD_NOTIFICATIONS[activeLeadIdx];

  return (
    <section className="relative bg-[#08090E] text-white overflow-hidden border-b border-white/10">
      {/* 1. Blended Luxury Clinic Architectural Backdrop (Inspired by uploaded Mockups) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={clinicInteriorImg}
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.14] scale-105 filter blur-[2px]"
        />
        {/* Deep Obsidian & Crimson Vignette Mask blending the clinic photo seamlessly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,9,14,0.75) 0%, rgba(8,9,14,0.88) 45%, rgba(8,9,14,0.97) 100%), radial-gradient(circle at 24% 38%, rgba(225, 29, 46, 0.34) 0%, rgba(136, 19, 55, 0.15) 38%, transparent 70%), radial-gradient(circle at 82% 20%, rgba(225, 29, 46, 0.18) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* 2. Animated Flowing Crimson Silk Wave SVG Lines */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          initial={{ pathLength: 0.4, opacity: 0.25 }}
          animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          d="M-100 520 C 300 320, 650 640, 1100 380 C 1300 260, 1450 310, 1600 220"
          stroke="#E11D2E"
          strokeWidth="1.8"
        />
        <path
          d="M-100 560 C 320 350, 680 670, 1120 410 C 1320 290, 1450 340, 1600 250"
          stroke="#FB7185"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <path
          d="M-50 180 C 400 360, 820 40, 1500 280"
          stroke="#E11D2E"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
      </svg>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Right Column (in RTL): Persuasive Medical Growth Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-right z-10"
          >
            {/* Eyebrow Badge matching Reference Mockup */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E11D2E]/15 border border-[#E11D2E]/40 shadow-[0_0_20px_rgba(225,29,46,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-ping" />
              <span className="font-en text-xs font-bold tracking-[0.18em] uppercase text-[#FB7185]">
                MEDICAL GROWTH PARTNER • SHAVI
              </span>
            </div>

            {/* Main Headline matching uploaded reference */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-bold text-white leading-[1.22] tracking-tight">
                عيادتك تستحق أكثر من{' '}
                <span className="font-en font-extrabold">Marketing.</span>
                <br />
                تستحق{' '}
                <span className="text-[#E11D2E] font-en font-extrabold drop-shadow-[0_2px_22px_rgba(225,29,46,0.55)]">
                  Growth System
                </span>
                <br />
                معمول مخصوص عشانها.
              </h1>

              <div className="space-y-3 text-base sm:text-lg text-[#CBD5E1] leading-[1.8] max-w-2xl">
                <p>
                  مش كل عيادة محتاجة <span className="font-en text-white font-semibold">Ads</span>{' '}
                  أكثر. أحياناً المشكلة مش في عدد الـ{' '}
                  <span className="font-en text-white font-semibold">Leads</span>… المشكلة في اللي
                  بيحصل للـ <span className="font-en text-white font-semibold">Lead</span> بعد ما
                  يوصل.
                </p>
                <p className="text-sm sm:text-base text-[#94A3B8]">
                  <span className="font-en text-white font-bold">Shavi</span> بتبني للعيادات
                  والمراكز الطبية منظومة نمو متكاملة بين{' '}
                  <span className="font-en text-[#F8FAFC] font-medium">
                    Marketing, Patient Acquisition, Conversion, Follow-up
                  </span>{' '}
                  و <span className="font-en text-[#F8FAFC] font-medium">Optimization</span> — حسب
                  تخصص العيادة وطريقة شغلها.
                </p>
              </div>
            </div>

            {/* CTA Buttons matching reference mockup */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleAuditClick}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-[#E11D2E] to-[#BE123C] hover:from-[#F43F5E] hover:to-[#E11D2E] text-white font-bold text-base rounded-xl shadow-[0_10px_30px_rgba(225,29,46,0.45)] transition-all cursor-pointer"
              >
                <span className="font-en">Medical Growth Audit</span>
                <span className="text-white/80 text-sm font-normal">| احجز تشخيص المنظومة</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </motion.button>

              <a
                href="#system"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold text-sm rounded-xl backdrop-blur-md transition-all"
              >
                <span>شوف الـ System بيشتغل إزاي</span>
              </a>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#15803D]/20 hover:bg-[#15803D]/30 text-[#4ADE80] border border-[#22C55E]/30 font-semibold text-sm rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب مباشر</span>
              </a>
            </div>

            {/* Bottom Signature Sub-Note */}
            <div className="flex items-center gap-3 pt-1 text-xs sm:text-sm text-[#94A3B8]">
              <div className="w-6 h-6 rounded-full bg-[#E11D2E]/20 border border-[#E11D2E]/50 flex items-center justify-center text-[#E11D2E] shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p className="font-en">
                <strong className="text-white">Built around your clinic.</strong> Not another
                ready-made marketing package.
              </p>
            </div>
          </motion.div>

          {/* Left Column (in RTL): Blended Multi-Image Visual Scene + Animated Live Growth HUD */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Crimson & Warm Amber Ambient Glows */}
            <div
              className="pointer-events-none absolute -top-6 right-8 w-72 h-72 rounded-full bg-[#E11D2E]/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-8 left-6 w-72 h-72 rounded-full bg-[#BE123C]/25 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative w-full max-w-[600px]">
              {/* Main Blended Visual Stage (Inspired by Blueprint & Mockup Hero) */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#0D1017] shadow-[0_25px_70px_rgba(0,0,0,0.75)]">
                {/* Ambient Luxury Clinic Interior Layer blended behind Doctor */}
                <img
                  src={clinicInteriorImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#08090E] via-[#190A10]/70 to-transparent"
                  aria-hidden="true"
                />

                {/* Primary Doctor Studio Portrait */}
                <img
                  src={doctorHeroStudioImg}
                  alt="Shavi Medical Growth System — Doctor & Clinic Growth Partner"
                  className="relative w-full h-[410px] sm:h-[480px] object-cover object-top mix-blend-normal"
                />

                {/* Seamless Edge Feathering Vignette */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #08090E 2%, rgba(8,9,14,0.45) 28%, transparent 65%), linear-gradient(to right, rgba(8,9,14,0.65) 0%, transparent 35%)',
                  }}
                  aria-hidden="true"
                />

                {/* Subtle Embedded Clinic Environment Thumbnail Strip (Top Left Inside Stage) */}
                <div className="hidden sm:flex absolute top-4 left-4 items-center gap-2 bg-[#0B0E17]/80 backdrop-blur-md border border-white/15 rounded-xl p-1.5 pr-3 shadow-lg" dir="ltr">
                  <div className="flex -space-x-2">
                    <img
                      src={heroExecutiveImg}
                      alt="Clinic Consultation"
                      className="w-8 h-8 rounded-lg object-cover border border-white/20"
                    />
                    <img
                      src={growthShowcaseImg}
                      alt="Clinic Analytics"
                      className="w-8 h-8 rounded-lg object-cover border border-white/20"
                    />
                  </div>
                  <div className="text-left">
                    <span className="font-en text-[10px] font-extrabold text-white block leading-none">
                      Real Growth • Real Patients
                    </span>
                    <span className="font-en text-[9px] text-[#FB7185] font-semibold">
                      Custom Clinic Ecosystem
                    </span>
                  </div>
                </div>
              </div>

              {/* ANIMATED CARD 1: Live Rising Growth Chart Card (+218% Patient Bookings) matching Mockup */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.2 },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="hidden sm:block absolute -top-5 -right-5 w-56 bg-[#10131C]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
                dir="ltr"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-en text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                    More Qualified Patients
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono-num text-2xl font-black text-white">+218%</span>
                  <span className="font-en text-[10px] font-bold text-[#FB7185]">
                    Patient Bookings
                  </span>
                </div>

                {/* Animated 7-Bar Rising Crimson Chart */}
                <div className="mt-3 h-12 flex items-end gap-1.5 pt-2 border-t border-white/10">
                  {[28, 38, 45, 58, 72, 86, 100].map((heightPct, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-full flex items-end bg-white/[0.04] rounded-t overflow-hidden"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.3 + idx * 0.1,
                          ease: 'easeOut',
                        }}
                        className={`w-full rounded-t ${
                          idx >= 5
                            ? 'bg-gradient-to-t from-[#E11D2E] to-[#FB7185]'
                            : 'bg-[#E11D2E]/60'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ANIMATED CARD 2: Higher Conversion Floating Badge (Middle Left) */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.35 },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="hidden sm:flex absolute top-1/3 -left-6 bg-[#10131C]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 items-center gap-3 shadow-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E11D2E]/20 border border-[#E11D2E]/40 flex items-center justify-center text-[#FB7185]">
                  <Target className="w-5 h-5" />
                </div>
                <div className="text-left" dir="ltr">
                  <div className="flex items-center gap-1.5">
                    <span className="font-en text-xs font-extrabold text-white">
                      Higher Conversion
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#4ADE80]/15 text-[#4ADE80] font-mono-num text-[9px] font-bold">
                      Funnel SLA
                    </span>
                  </div>
                  <span className="text-[11px] text-[#94A3B8] block">
                    تحويل أعلى من الرسائل إلى حجوزات مؤكدة
                  </span>
                </div>
              </motion.div>

              {/* ANIMATED CARD 3: Live Cycling Patient Booking Notification (Bottom Overlay matching Mockups 3 & 4) */}
              <div className="absolute bottom-3 right-3 left-3 sm:left-4 sm:-right-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNotification.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="bg-[#10131C]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#4ADE80] shrink-0 relative">
                        <MessageSquareHeart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-ping" />
                      </div>
                      <div className="text-right min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-en text-[10px] font-extrabold uppercase tracking-wider text-[#4ADE80]">
                            {currentNotification.badge}
                          </span>
                          <span className="text-[10px] font-en text-[#94A3B8]">
                            • {currentNotification.source} • {currentNotification.time}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white truncate mt-0.5">
                          {currentNotification.textAr}
                        </p>
                        <p className="font-en text-[10px] text-[#94A3B8] truncate" dir="ltr">
                          {currentNotification.textEn}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end shrink-0 pl-2 border-r border-white/10 pr-3">
                      <span className="font-mono-num text-xs font-extrabold text-[#FB7185]">
                        {currentNotification.metric}
                      </span>
                      <span className="font-en text-[9px] text-[#64748B]">Live System Flow</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 5-Stage Hero Process Strip matching Mockups 3 & 4 ("Growth Marketing • Patient Acquisition • Conversion • Follow-up • Optimization") */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-2.5" dir="ltr">
            {HERO_FIVE_STAGES.map((stage, idx) => {
              const IconComp = stage.icon;
              const isHovered = hoveredStage === stage.id;
              return (
                <motion.a
                  key={stage.id}
                  href={stage.href}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  whileHover={{ y: -3 }}
                  className={`flex-1 min-w-[170px] rounded-xl px-3.5 py-2.5 border transition-all flex items-center gap-3 ${
                    isHovered
                      ? 'bg-[#E11D2E]/20 border-[#E11D2E] shadow-[0_8px_20px_rgba(225,29,46,0.25)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isHovered
                        ? 'bg-[#E11D2E] text-white'
                        : 'bg-[#E11D2E]/15 text-[#FB7185] border border-[#E11D2E]/30'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-num text-[10px] font-bold text-[#FB7185]">
                        0{idx + 1}
                      </span>
                      <span className="font-en text-xs font-extrabold text-white truncate">
                        {stage.labelEn}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#94A3B8] block truncate" dir="rtl">
                      {stage.labelAr}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom 4-Pillar Trust Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              en: 'Medical Growth Strategy',
              ar: 'استراتيجية نمو مخصصة على مقاس العيادة',
            },
            {
              en: 'Performance Marketing for Clinics',
              ar: 'حملات إعلانية مربوطة بالحجوزات الفعلية',
            },
            {
              en: 'Lead Qualification & Follow-up Systems',
              ar: 'فلترة الـ Leads ونظام متابعة واضح للاستقبال',
            },
            {
              en: 'Optional Smart Layer (Shavi Chatwoot)',
              ar: 'منظومة إدارة محادثات المرضى الموحدة (اختياري)',
            },
          ].map((pillar, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#E11D2E]/40 rounded-xl p-4 flex items-start gap-3 transition-all"
            >
              <ShieldCheck className="w-5 h-5 text-[#E11D2E] shrink-0 mt-0.5" />
              <div>
                <p className="font-en text-xs font-bold text-white">{pillar.en}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{pillar.ar}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
