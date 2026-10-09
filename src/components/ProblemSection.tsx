import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShaviLogo } from './ShaviLogo';
import { trackEvent } from '../utils/analytics';
import {
  ArrowLeft,
  Inbox,
  Headphones,
  DollarSign,
  Layers,
  Eye,
  Unlink,
  Calculator,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  UserCheck,
  CalendarCheck2,
  Repeat,
  MessageSquare,
} from 'lucide-react';

interface ProblemSectionProps {
  onOpenAuditModal: (source: string, preselectedBottleneck?: string) => void;
}

const SIX_REAL_PROBLEMS = [
  {
    num: '01',
    icon: Inbox,
    titleAr: 'بيوصل Leads كتير… ومبتتحولش لحجوزات.',
    descAr:
      'صندوق الرسائل ممتلئ بسؤال "بكام الكشف أو الجلسة؟" دون وجود فلترة أو مسار يحول السائل إلى مريض داخل العيادة.',
    leakStageEn: 'Lead Qualification Gap',
    leakVisualLabel: '80% أسئلة سعرية بدون تأهيل',
    fixLabelAr: 'تأهيل المريض قبل تحويله للريسبشن',
    leakPercent: 78,
  },
  {
    num: '02',
    icon: Headphones,
    titleAr: 'الـ Reception بيرد… لكن مفيش Follow-up System واضح.',
    descAr:
      'المريض المتردد الذي يقول "هفكر وأرجعلكم" لا يتواصل معه أحد مرة أخرى، فتضيع أكثر من نصف الفرص البيعية.',
    leakStageEn: 'Follow-up Drop-off',
    leakVisualLabel: '55% من المترددين لا يتم متابعتهم',
    fixLabelAr: 'جدولة متابعة 24h / 72h تلقائياً',
    leakPercent: 65,
  },
  {
    num: '03',
    icon: DollarSign,
    titleAr: 'بتصرف إعلانات… لكن صعب تعرف إيه اللي فعلاً جاب Patient.',
    descAr:
      'تقارير التسويق تعرض أرقام التفاعل والرسائل، بدون ربط حقيقي بعدد الحجوزات الفعلية والعائد المالي لكل خدمة.',
    leakStageEn: 'Blind ROI Attribution',
    leakVisualLabel: 'ميزانية بدون تتبع تكلفة الحجز الفعلي',
    fixLabelAr: 'ربط كل حملة بعدد الحجوزات الفعلي',
    leakPercent: 70,
  },
  {
    num: '04',
    icon: Layers,
    titleAr: 'كل Service بتتسوق بنفس الطريقة.',
    descAr:
      'غياب مسارات مخصصة (Service Funnels) يفصل بين الكشف العادي وبين الخدمات عالية القيمة مثل الزراعة أو التجميل.',
    leakStageEn: 'Generic Service Funnel',
    leakVisualLabel: 'دمج الإجراءات الكبرى مع الكشف العادي',
    fixLabelAr: 'Funnel مستقل لكل خدمة عالية الربحية',
    leakPercent: 60,
  },
  {
    num: '05',
    icon: Eye,
    titleAr: 'المحتوى بيجيب Reach… لكن مش بالضرورة Business.',
    descAr:
      'مشاهدات عالية بدون بناء ثقة طبية حقيقية أو توجيه واضح للمريض نحو اتخاذ قرار الحجز.',
    leakStageEn: 'Low-Trust Content',
    leakVisualLabel: 'تفاعل مرتفع بدون نية حجز طبية',
    fixLabelAr: 'محتوى طبي يعالج مخاوف المريض ويدفعه للحجز',
    leakPercent: 72,
  },
  {
    num: '06',
    icon: Unlink,
    titleAr: 'الفرص بتضيع بين Marketing و Reception و Follow-up.',
    descAr:
      'انفصال كامل بين من يطلق الإعلان ومن يستقبل الرسالة داخل العيادة، مما يؤدي لهدر مستمر في الميزانية.',
    leakStageEn: 'Disconnected Operations',
    leakVisualLabel: 'فجوة بين التسويق وفريق الاستقبال',
    fixLabelAr: 'منظومة واحدة تربط الإعلان بالاستقبال',
    leakPercent: 82,
  },
];

const PATIENT_JOURNEY_STAGES = [
  {
    step: '01',
    en: 'ATTENTION',
    ar: 'المريض يكتشف العيادة',
    subEn: 'People discover your clinic',
    icon: Eye,
  },
  {
    step: '02',
    en: 'INTEREST',
    ar: 'يهتم بالخدمة الطبية',
    subEn: 'They show interest',
    icon: Sparkles,
  },
  {
    step: '03',
    en: 'LEAD',
    ar: 'يرسل رسالة أو استفسار',
    subEn: 'They contact you',
    icon: MessageSquare,
  },
  {
    step: '04',
    en: 'QUALIFICATION',
    ar: 'تأهيل الحالة طبياً ومادياً',
    subEn: 'They match your services',
    icon: UserCheck,
    isCriticalLeak: true,
  },
  {
    step: '05',
    en: 'BOOKING',
    ar: 'حجز موعد فعلي بالجدول',
    subEn: 'They schedule an appointment',
    icon: CalendarCheck2,
    isCriticalLeak: true,
  },
  {
    step: '06',
    en: 'ATTENDANCE',
    ar: 'حضور المريض للعيادة',
    subEn: 'They visit your clinic',
    icon: CheckCircle2,
  },
  {
    step: '07',
    en: 'RETURN',
    ar: 'إعادة الحجز والولاء',
    subEn: 'They come back & refer',
    icon: Repeat,
  },
];

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAuditModal }) => {
  const [showSimulator, setShowSimulator] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(3);
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(300);
  const [avgProcedureValue, setAvgProcedureValue] = useState<number>(4500);
  const [responseDelayLevel, setResponseDelayLevel] = useState<'fast' | 'medium' | 'slow'>('medium');
  const [hasStructuredFollowup, setHasStructuredFollowup] = useState<boolean>(false);

  // Auto-animate the 7-stage patient journey pulse so the viewer sees the flow
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveJourneyStep((prev) => (prev + 1) % PATIENT_JOURNEY_STAGES.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, []);

  const qualifiedLeads = Math.round(monthlyInquiries * 0.35);
  const responseFactor =
    responseDelayLevel === 'fast' ? 0.28 : responseDelayLevel === 'medium' ? 0.16 : 0.08;
  const followupFactor = hasStructuredFollowup ? 1.45 : 1.0;

  const estimatedCurrentBookings = Math.round(qualifiedLeads * responseFactor * followupFactor);
  const optimizedSystemBookings = Math.round(qualifiedLeads * 0.32 * 1.45);
  const recoverableBookings = Math.max(0, optimizedSystemBookings - estimatedCurrentBookings);
  const estimatedMissedValue = recoverableBookings * avgProcedureValue;

  const handleSelectGap = (gapTitle: string) => {
    trackEvent('bottleneck_selection', {
      bottleneck: gapTitle,
      cta_location: 'problem_cards',
    });
    onOpenAuditModal('problem_cards', gapTitle);
  };

  return (
    <div id="problem">
      {/* PART 1: Light Split Section matching "THE REAL PROBLEM" in uploaded design */}
      <section className="py-20 lg:py-24 bg-[#F8F9FB] text-[#0F1117]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Right Column (in RTL): The Real Problem Narrative */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#E11D2E] block">
                THE REAL PROBLEM
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1117] leading-[1.25]">
                عندك <span className="font-en">Marketing</span>…
                <br />
                بس هل عندك{' '}
                <span className="font-en text-[#E11D2E]">Growth System</span>؟
              </h2>

              <p className="text-base text-[#475569] leading-[1.8]">
                ممكن يكون عندك <span className="font-en font-semibold text-[#0F1117]">Ads</span>{' '}
                شغالة، وممكن يكون عندك{' '}
                <span className="font-en font-semibold text-[#0F1117]">Leads</span> كل يوم، وممكن
                الـ <span className="font-en font-semibold text-[#0F1117]">Reception</span> بيرد.
                <br />
                لكن السؤال الحقيقي:
              </p>

              <div className="p-4 rounded-xl bg-[#FEF2F2] border-r-4 border-[#E11D2E]">
                <p className="text-lg sm:text-xl font-bold text-[#E11D2E]">
                  كام فرصة اتحولت فعلاً لموعد؟
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAuditModal('problem_section_cta')}
                  className="inline-flex items-center justify-between gap-3 px-5 py-3.5 bg-white hover:bg-[#0F1117] text-[#0F1117] hover:text-white border border-[#E2E8F0] rounded-xl font-bold text-sm shadow-xs transition-all cursor-pointer group"
                >
                  <span>اكتشف أين توجد فجوات النمو في عيادتك</span>
                  <ArrowLeft className="w-4 h-4 text-[#E11D2E] group-hover:text-white transition-transform group-hover:-translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowSimulator(!showSimulator)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#E11D2E] py-1.5 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#E11D2E]" />
                  <span>
                    {showSimulator
                      ? 'إخفاء حاسبة تسريب الحجوزات'
                      : 'جرب حاسبة الحجوزات المهدرة في عيادتك الآن'}
                  </span>
                </button>
              </div>
            </div>

            {/* Left Column (in RTL): 6 Interactive Animated Diagnostic Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SIX_REAL_PROBLEMS.map((item, idx) => {
                const IconComp = item.icon;
                const isHovered = hoveredCard === item.num;
                return (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setHoveredCard(item.num)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleSelectGap(item.titleAr)}
                    className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#E11D2E] shadow-[0_4px_20px_rgba(15,17,23,0.04)] hover:shadow-[0_18px_38px_rgba(225,29,46,0.12)] transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
                  >
                    {/* Top Animated Progress Accent Line */}
                    <div className="absolute top-0 right-0 left-0 h-1 bg-[#F1F5F9] overflow-hidden">
                      <motion.div
                        initial={{ width: '25%' }}
                        animate={{ width: isHovered ? '100%' : '28%' }}
                        transition={{ duration: 0.35 }}
                        className="h-full bg-gradient-to-l from-[#E11D2E] to-[#FB7185]"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.08 : 1,
                            rotate: isHovered ? -4 : 0,
                          }}
                          transition={{ duration: 0.25 }}
                          className="w-11 h-11 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#E11D2E] group-hover:bg-[#E11D2E] group-hover:text-white transition-colors"
                        >
                          <IconComp className="w-5 h-5" />
                        </motion.div>
                        <div className="text-left" dir="ltr">
                          <span className="font-mono-num text-xs font-extrabold text-[#94A3B8] group-hover:text-[#E11D2E] block">
                            {item.num}
                          </span>
                          <span className="font-en text-[9px] font-bold uppercase tracking-wider text-[#CBD5E1] group-hover:text-[#E11D2E]/80">
                            {item.leakStageEn}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#0F1117] leading-snug group-hover:text-[#E11D2E] transition-colors">
                        {item.titleAr}
                      </h3>

                      <p className="text-xs text-[#64748B] leading-relaxed">{item.descAr}</p>
                    </div>

                    {/* Visual Comprehension Helper: Animated Leak vs. Fix Indicator */}
                    <div className="pt-4 mt-4 border-t border-[#F1F5F9] space-y-2.5">
                      <div className="bg-[#F8FAFC] group-hover:bg-[#FEF2F2]/70 rounded-xl p-2.5 border border-[#E2E8F0] group-hover:border-[#FECACA] transition-colors">
                        <div className="flex items-center justify-between text-[10px] font-bold mb-1.5">
                          <span className="text-[#64748B] group-hover:text-[#991B1B]">
                            {isHovered ? 'الحل داخل المنظومة:' : 'أثر الفجوة في العيادة:'}
                          </span>
                          <span
                            className={`font-en text-[10px] font-extrabold ${
                              isHovered ? 'text-[#16A34A]' : 'text-[#E11D2E]'
                            }`}
                          >
                            {isHovered ? 'System Fix ✓' : 'Leakage Risk'}
                          </span>
                        </div>

                        {/* Animated Visual Bar */}
                        <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden mb-1.5">
                          <motion.div
                            animate={{
                              width: isHovered ? '100%' : `${item.leakPercent}%`,
                              backgroundColor: isHovered ? '#16A34A' : '#E11D2E',
                            }}
                            transition={{ duration: 0.35 }}
                            className="h-full rounded-full"
                          />
                        </div>

                        <p className="text-[11px] font-bold text-[#0F1117]">
                          {isHovered ? item.fixLabelAr : item.leakVisualLabel}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-bold text-[#E11D2E]">
                        <span>اضغط لتشخيص هذه الفجوة في عيادتك</span>
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Expandable Interactive Leakage Calculator */}
          {showSimulator && (
            <div className="bg-[#0F1117] text-white rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-en font-bold uppercase tracking-wider text-[#FB7185]">
                    <Calculator className="w-4 h-4" />
                    <span>PATIENT FUNNEL LEAKAGE SIMULATOR</span>
                  </div>
                  <h3 className="text-xl font-bold">
                    احسب الحجوزات القابلة للاستعادة شهرياً عند ضبط الـ Qualification والـ Follow-up
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>عدد الرسائل شهرياً:</span>
                        <strong className="font-mono-num text-[#FB7185]">
                          {monthlyInquiries} Lead
                        </strong>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={1500}
                        step={50}
                        value={monthlyInquiries}
                        onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                        className="w-full accent-[#E11D2E] cursor-pointer"
                      />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>متوسط قيمة الإجراء/الكشف:</span>
                        <strong className="font-mono-num text-white">
                          {avgProcedureValue.toLocaleString()} EGP
                        </strong>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={25000}
                        step={500}
                        value={avgProcedureValue}
                        onChange={(e) => setAvgProcedureValue(Number(e.target.value))}
                        className="w-full accent-[#E11D2E] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2">
                      <span className="text-xs text-[#CBD5E1] block">سرعة رد الريسبشن:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'fast', label: '< 10 د' },
                          { id: 'medium', label: '1-3 ساعات' },
                          { id: 'slow', label: 'اليوم التالي' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setResponseDelayLevel(opt.id as 'fast' | 'medium' | 'slow')
                            }
                            className={`py-1.5 text-xs rounded-lg font-medium cursor-pointer ${
                              responseDelayLevel === opt.id
                                ? 'bg-[#E11D2E] text-white'
                                : 'bg-black/40 text-[#94A3B8]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2">
                      <span className="text-xs text-[#CBD5E1] block">نظام Follow-up للمترددين:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setHasStructuredFollowup(false)}
                          className={`py-1.5 text-xs rounded-lg font-medium cursor-pointer ${
                            !hasStructuredFollowup
                              ? 'bg-[#E11D2E] text-white'
                              : 'bg-black/40 text-[#94A3B8]'
                          }`}
                        >
                          غير موجود
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasStructuredFollowup(true)}
                          className={`py-1.5 text-xs rounded-lg font-medium cursor-pointer ${
                            hasStructuredFollowup
                              ? 'bg-[#16A34A] text-white'
                              : 'bg-black/40 text-[#94A3B8]'
                          }`}
                        >
                          منتظم
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                    <span>تقدير الفرص القابلة للاستعادة شهرياً</span>
                    <AlertTriangle className="w-4 h-4 text-[#E11D2E]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/40 p-3.5 rounded-lg border border-white/10">
                      <span className="text-[11px] text-[#94A3B8] block">حجوزات إضافية محتملة</span>
                      <span className="font-mono-num text-2xl font-bold text-[#FB7185]">
                        +{recoverableBookings} حجز
                      </span>
                    </div>
                    <div className="bg-black/40 p-3.5 rounded-lg border border-white/10">
                      <span className="text-[11px] text-[#94A3B8] block">عائد شهري مهدر تقديرياً</span>
                      <span className="font-mono-num text-xl font-bold text-white">
                        {estimatedMissedValue.toLocaleString()} ج.م
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenAuditModal('leakage_calculator')}
                    className="w-full py-3 bg-[#E11D2E] hover:bg-[#BE123C] text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    احجز جلسة تشخيص مجانية لإغلاق هذا التسريب
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PART 2: Dark Crimson Wave Banner — "More Leads Isn't Always The Answer" + Animated 7-Stage Patient Journey */}
      <section className="relative py-16 lg:py-20 bg-[#090B10] text-white overflow-hidden border-y border-white/10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 15% 50%, rgba(225, 29, 46, 0.28) 0%, transparent 55%), radial-gradient(circle at 85% 50%, rgba(185, 28, 28, 0.18) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* English Big Statement */}
            <div className="lg:col-span-5 text-left" dir="ltr">
              <h3 className="font-en text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                More <span className="text-[#E11D2E]">Leads</span> Isn&apos;t Always The Answer.
              </h3>
              <div className="font-en text-lg sm:text-xl font-bold text-[#FB7185] mt-3 space-y-0.5">
                <p>More Qualified Patients.</p>
                <p>Better Conversion.</p>
                <p className="text-white">Smarter Growth.</p>
              </div>
            </div>

            {/* Arabic Explanation */}
            <div className="lg:col-span-5 border-r-2 border-[#E11D2E]/60 pr-6 space-y-3 text-right">
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                إحنا مش بنقيس نجاح الـ <span className="font-en">Marketing</span> بعدد الـ{' '}
                <span className="font-en">Posts</span> أو الـ{' '}
                <span className="font-en">Messages</span> فقط.
              </p>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                بنبص على الرحلة كاملة: من أول ما المريض يسمع عنك… لحد ما يتواصل، يحجز، ويحصل على
                تجربة أفضل داخل عيادتك.
              </p>
            </div>

            {/* Brand Emblem */}
            <div className="lg:col-span-2 flex lg:justify-end">
              <ShaviLogo variant="light" size="md" showTagline={true} />
            </div>
          </div>

          {/* Animated 7-Stage Patient Journey Flow (Inspired by "Where does your clinic lose them?" in Mockup 4) */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-ping" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  رحلة المريض من الاكتشاف إلى العودة — أين تفقد عيادتك المرضى المحتملين؟
                </span>
              </div>
              <span className="font-en text-xs font-extrabold text-[#FB7185]" dir="ltr">
                Where does your clinic lose them? (Click any stage)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3" dir="ltr">
              {PATIENT_JOURNEY_STAGES.map((stage, idx) => {
                const IconComp = stage.icon;
                const isActive = activeJourneyStep === idx;
                return (
                  <motion.div
                    key={stage.en}
                    onClick={() => setActiveJourneyStep(idx)}
                    whileHover={{ y: -4 }}
                    className={`relative rounded-2xl p-4 border text-center cursor-pointer transition-all ${
                      isActive
                        ? 'bg-gradient-to-b from-[#E11D2E]/25 to-[#12151E] border-[#E11D2E] shadow-[0_10px_28px_rgba(225,29,46,0.28)]'
                        : 'bg-[#12151E]/80 border-white/10 hover:border-white/25'
                    }`}
                  >
                    {stage.isCriticalLeak && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#E11D2E] text-white font-en text-[8px] font-extrabold uppercase tracking-wider whitespace-nowrap">
                        Most Clinics Leak Here
                      </span>
                    )}

                    <div
                      className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                        isActive
                          ? 'bg-[#E11D2E] text-white shadow-md'
                          : 'bg-white/5 text-[#FB7185] border border-white/10'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <span className="font-en text-xs font-extrabold text-white block tracking-wide">
                      {stage.en}
                    </span>
                    <span className="text-[11px] font-bold text-[#FB7185] block mt-0.5" dir="rtl">
                      {stage.ar}
                    </span>
                    <span className="font-en text-[10px] text-[#94A3B8] block mt-1">
                      {stage.subEn}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
