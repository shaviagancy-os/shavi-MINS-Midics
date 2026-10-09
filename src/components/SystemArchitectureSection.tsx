import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYSTEM_LAYERS } from '../data/medicalGrowthData';
import {
  Building2,
  Search,
  Compass,
  Megaphone,
  MessageSquareMore,
  Settings2,
  ArrowLeft,
  CheckCircle2,
  Activity,
  Sparkles,
} from 'lucide-react';

interface SystemArchitectureSectionProps {
  onOpenAuditModal?: (source: string) => void;
}

const SIX_NODE_FLOW = [
  {
    id: 'clinic',
    labelEn: 'Clinic',
    labelAr: 'العيادة وتخصصها',
    detailAr: 'فهم الخدمات الأعلى ربحية، الطاقة الاستيعابية، وطبيعة المريض المستهدف.',
    icon: Building2,
  },
  {
    id: 'diagnosis',
    labelEn: 'Diagnosis',
    labelAr: 'تشخيص الفجوات',
    detailAr: 'تحليل أين تتسرب الفرص حالياً بين الإعلانات والريسبشن والحضور الفعلي.',
    icon: Search,
  },
  {
    id: 'strategy',
    labelEn: 'Strategy',
    labelAr: 'التموضع والعرض',
    detailAr: 'بناء باقات علاجية واضحة القيمة وتموضع طبي يغنيك عن حرق الأسعار.',
    icon: Compass,
  },
  {
    id: 'acquisition',
    labelEn: 'Acquisition',
    labelAr: 'جذب المرضى',
    detailAr: 'إطلاق حملات ومحتوى طبي موجه يستقطب المريض الباحث عن الحل الطبي.',
    icon: Megaphone,
  },
  {
    id: 'followup',
    labelEn: 'Follow-up',
    labelAr: 'المتابعة والتحويل',
    detailAr: 'فلترة الاستفسارات، سكريبتات الريسبشن، وجدولة متابعة الحالات المترددة.',
    icon: MessageSquareMore,
  },
  {
    id: 'optimization',
    labelEn: 'Optimization',
    labelAr: 'التحسين والتوسع',
    detailAr: 'قياس تكلفة المريض الفعلي وتوسيع الميزانية في الخدمات الأعلى عائداً.',
    icon: Settings2,
  },
];

const FIVE_ENGINE_STEPS = [
  {
    num: '01',
    titleEn: 'DIAGNOSE',
    titleAr: 'التشخيص وتحليل الفجوات',
    desc: 'نفهم السوق، المنافسين، الأداء الحالي، وأين توجد فجوات النمو (Growth Gaps) في عيادتك.',
    outputTag: 'Clinic Audit & Gap Map',
  },
  {
    num: '02',
    titleEn: 'POSITION',
    titleAr: 'التموضع الطبي والعرض',
    desc: 'نحدد إزاي العيادة تظهر، لمين، وبأي Offer ورسالة طبية تبرز قيمتك دون حرق أسعار.',
    outputTag: 'Medical Value Proposition',
  },
  {
    num: '03',
    titleEn: 'ATTRACT',
    titleAr: 'الجذب والاستقطاب الدقيق',
    desc: 'نبني حملات ومحتوى وقنوات جذب مناسبة للخدمات الأعلى ربحية وللجمهور المستهدف.',
    outputTag: 'Targeted Patient Campaigns',
  },
  {
    num: '04',
    titleEn: 'CONVERT',
    titleAr: 'التأهيل والتحويل للحجز',
    desc: 'نحسن رحلة الـ Lead من أول استفسار ورسالة لحد Appointment مؤكد داخل جدول العيادة.',
    outputTag: 'Lead Triage & Follow-up SLA',
  },
  {
    num: '05',
    titleEn: 'OPTIMIZE',
    titleAr: 'القياس والتوسع المستمر',
    desc: 'نقيس، نختبر، نحسن، ونوسع القنوات والخدمات التي تحقق أفضل عائد فعلي للعيادة.',
    outputTag: 'ROI & Capacity Scaling',
  },
];

const PROGRAM_STRUCTURE = [
  {
    num: '01',
    titleEn: 'Diagnosis & Market Fit',
    descAr: 'تحليل السوق، التموضع، والجمهور المستهدف.',
  },
  {
    num: '02',
    titleEn: 'Strategy & Planning',
    descAr: 'خطة استراتيجية ومسارات مخصصة لكل عيادة.',
  },
  {
    num: '03',
    titleEn: 'Launch & Automation',
    descAr: 'تنفيذ الحملات وتنظيم المتابعة والعمليات.',
  },
  {
    num: '04',
    titleEn: 'Optimization & Iteration',
    descAr: 'تقارير دورية وتوسيع مستمر للنمو.',
  },
];

export const SystemArchitectureSection: React.FC<SystemArchitectureSectionProps> = ({
  onOpenAuditModal,
}) => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(SYSTEM_LAYERS[0].id);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [isNodeFlowPaused, setIsNodeFlowPaused] = useState<boolean>(false);
  const [activeEngineStep, setActiveEngineStep] = useState<number>(0);

  // Auto-cycle the 6-Node Flow pulse so the viewer visually follows how the system connects
  useEffect(() => {
    if (isNodeFlowPaused) return;
    const timer = window.setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % SIX_NODE_FLOW.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isNodeFlowPaused]);

  // Auto-cycle the 5-Step Engine highlight
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveEngineStep((prev) => (prev + 1) % FIVE_ENGINE_STEPS.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const currentLayer =
    SYSTEM_LAYERS.find((layer) => layer.id === selectedLayerId) || SYSTEM_LAYERS[0];
  const activeNode = SIX_NODE_FLOW[activeNodeIndex];

  return (
    <div id="system">
      {/* PART A: Light Section — "What Is SHAVI Medical Growth?" with Animated 6-Node Connected Flow */}
      <section className="py-20 lg:py-24 bg-white text-[#0F1117] border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Right Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#E11D2E] block">
                WHAT IS SHAVI MEDICAL GROWTH?
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1117] leading-[1.25]">
                <span className="font-en text-[#E11D2E]">Growth Marketing</span> معمول على مقاس
                عيادتك.
              </h2>

              <p className="text-sm sm:text-base text-[#475569] leading-[1.8]">
                <strong className="text-[#0F1117] font-en">Shavi</strong> مش بتبيع{' '}
                <span className="font-en">Package</span> جاهزة. إحنا بنفهم العيادة: تخصصها،
                خدماتها، المرضى المستهدفين، المنافسين، طريقة استقبال الـ{' '}
                <span className="font-en">Leads</span>، الـ <span className="font-en">Offers</span>،
                ونقاط التسريب في الـ <span className="font-en">Funnel</span>.
              </p>
              <p className="text-sm font-bold text-[#0F1117]">
                وبعدها بنبني خطة <span className="font-en text-[#E11D2E]">Growth</span> متكاملة
                مناسبة لطريقة شغلك.
              </p>
            </div>

            {/* Left Connected 6-Node Horizontal Flow with Animated Pulse & Live Step Explanation */}
            <div
              className="lg:col-span-7"
              onMouseEnter={() => setIsNodeFlowPaused(true)}
              onMouseLeave={() => setIsNodeFlowPaused(false)}
            >
              <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span className="font-bold text-[#0F1117] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D2E]" />
                    <span>اضغط أو مرر على أي مرحلة لمعرفة دورها في المنظومة:</span>
                  </span>
                  <span className="font-en text-[11px] font-bold text-[#E11D2E]">
                    Step 0{activeNodeIndex + 1} / 06
                  </span>
                </div>

                <div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center relative"
                  dir="ltr"
                >
                  {SIX_NODE_FLOW.map((node, index) => {
                    const IconComp = node.icon;
                    const isActive = index === activeNodeIndex;
                    return (
                      <motion.div
                        key={node.id}
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveNodeIndex(index)}
                        onMouseEnter={() => setActiveNodeIndex(index)}
                        className="relative flex flex-col items-center text-center group cursor-pointer"
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.25 }}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all relative ${
                            isActive
                              ? 'bg-[#E11D2E] text-white shadow-[0_8px_24px_rgba(225,29,46,0.38)] ring-4 ring-[#E11D2E]/20'
                              : 'bg-[#0F1117] text-white group-hover:bg-[#E11D2E]'
                          }`}
                        >
                          <IconComp className="w-6 h-6" />
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-[#0F1117] border border-[#E2E8F0] font-mono-num text-[10px] font-extrabold flex items-center justify-center shadow-2xs">
                            0{index + 1}
                          </span>
                        </motion.div>
                        <span
                          className={`font-en text-xs font-extrabold mt-3 block transition-colors ${
                            isActive ? 'text-[#E11D2E]' : 'text-[#0F1117]'
                          }`}
                        >
                          {node.labelEn}
                        </span>
                        <span className="text-[11px] text-[#64748B] mt-0.5 block" dir="rtl">
                          {node.labelAr}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Animated Live Description Box for the Active Node */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#FEF2F2] text-[#E11D2E] font-en text-xs font-extrabold shrink-0">
                        0{activeNodeIndex + 1}. {activeNode.labelEn}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#0F1117]">
                        {activeNode.detailAr}
                      </p>
                    </div>
                    <span className="font-en text-[10px] font-bold uppercase tracking-wider text-[#64748B] shrink-0">
                      Connected Flow
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART B: Dark Carbon Section — "The Shavi Medical Growth Engine" (5 Connected Cards + 5-Layer Interactive Explorer) */}
      <section className="relative py-20 lg:py-28 bg-[#090B10] text-white overflow-hidden border-b border-white/10">
        {/* Atmospheric Crimson Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 75% 25%, rgba(225, 29, 46, 0.22) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(225, 29, 46, 0.15) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#FB7185] block">
                THE SHAVI MEDICAL GROWTH ENGINE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight">
                <span className="font-en">The Shavi Medical Growth Engine</span>
                <span className="block text-xl sm:text-2xl text-[#CBD5E1] font-bold mt-2">
                  من أول التشخيص لحد النمو والتوسع.
                </span>
              </h2>
            </div>

            {onOpenAuditModal && (
              <button
                type="button"
                onClick={() => onOpenAuditModal('growth_engine_header')}
                className="self-start lg:self-auto inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E11D2E] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-[0_8px_25px_rgba(225,29,46,0.35)] transition-all cursor-pointer"
              >
                <span>اعرف أكثر عن المنظومة لعيادتك</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 5-Step Engine Cards with Animated Step Highlight & Progress Beam */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FIVE_ENGINE_STEPS.map((step, idx) => {
              const isHighlighted = activeEngineStep === idx;
              return (
                <motion.div
                  key={step.num}
                  onMouseEnter={() => setActiveEngineStep(idx)}
                  whileHover={{ y: -6 }}
                  className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all cursor-pointer overflow-hidden ${
                    isHighlighted
                      ? 'bg-[#171B26] border-2 border-[#E11D2E] shadow-[0_16px_38px_rgba(225,29,46,0.22)]'
                      : 'bg-[#12151E]/90 hover:bg-[#171B26] border border-white/10 hover:border-[#E11D2E]/60'
                  }`}
                >
                  {/* Top Animated Progress Bar */}
                  <div className="absolute top-0 right-0 left-0 h-1 bg-white/5">
                    <motion.div
                      animate={{ width: isHighlighted ? '100%' : '20%' }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-gradient-to-l from-[#E11D2E] to-[#FB7185]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-9 h-9 rounded-full font-mono-num text-xs font-bold flex items-center justify-center transition-colors ${
                          isHighlighted
                            ? 'bg-[#E11D2E] text-white shadow-md'
                            : 'bg-[#E11D2E]/15 border border-[#E11D2E]/40 text-[#FB7185]'
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="font-en text-[11px] font-bold tracking-widest text-[#64748B]">
                        STEP {step.num}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-en text-lg font-extrabold text-white tracking-wide">
                        {step.titleEn}
                      </h3>
                      <p className="text-xs font-bold text-[#FB7185] mt-0.5">{step.titleAr}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span className="font-en font-bold text-[#CBD5E1]">{step.outputTag}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isHighlighted ? 'bg-[#4ADE80] animate-ping' : 'bg-[#E11D2E]'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive 5-Layer Deep-Dive Explorer (Acquisition -> Qualification -> Follow-up -> Conversion -> Retention) */}
          <div className="bg-[#12151E] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="font-en text-xs font-bold uppercase tracking-wider text-[#E11D2E]">
                  INTERACTIVE 5-LAYER SYSTEM SPECIFICATIONS
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  تصفح الطبقات الـ 5 لمنظومة التحويل الطبي بالتفصيل:
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {SYSTEM_LAYERS.map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedLayerId === layer.id
                        ? 'bg-[#E11D2E] text-white shadow-md'
                        : 'bg-white/5 text-[#94A3B8] hover:text-white border border-white/10'
                    }`}
                  >
                    <span className="font-en">
                      {layer.step}. {layer.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs text-[#FB7185] font-semibold">
                    <Activity className="w-4 h-4" />
                    <span>{currentLayer.tagline}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white">
                    {currentLayer.nameAr}{' '}
                    <span className="font-en text-base text-[#94A3B8]">
                      ({currentLayer.nameEn})
                    </span>
                  </h4>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">
                    {currentLayer.description}
                  </p>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#4ADE80]">
                    <strong>مؤشر القياس (Primary KPI):</strong> {currentLayer.keyMetric}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-2.5 bg-black/30 p-5 rounded-xl border border-white/10">
                  <span className="text-xs font-bold text-[#94A3B8] block mb-2">
                    المخرجات التنفيذية لهذه الطبقة:
                  </span>
                  {currentLayer.deliverables.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.06 }}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-white bg-white/5 p-3 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PART C: Light Strip — "SHAVI ORIGINAL PROGRAM STRUCTURE" */}
      <section className="py-16 bg-[#F8F9FB] text-[#0F1117] border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-en text-xs font-bold tracking-[0.18em] uppercase text-[#E11D2E] block">
                FROM THE ORIGINAL SHAVI PROGRAM
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1117] mt-1">
                مش حملة وتنتهي… <span className="font-en text-[#E11D2E]">System</span> بيتطور كل
                شهر.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAM_STRUCTURE.map((prog, idx) => (
              <motion.div
                key={prog.num}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[#E2E8F0] hover:border-[#E11D2E]/50 rounded-2xl p-5 flex items-start gap-3.5 shadow-xs hover:shadow-md transition-all"
              >
                <span className="w-9 h-9 rounded-xl bg-[#E11D2E] text-white font-mono-num text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                  {prog.num}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-en text-sm font-bold text-[#0F1117]">{prog.titleEn}</h4>
                    <span className="font-en text-[10px] font-bold text-[#E11D2E]">
                      • Phase 0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{prog.descAr}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
