import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SPECIALTIES_DATA } from '../data/medicalGrowthData';
import { trackEvent } from '../utils/analytics';
import {
  Sparkles,
  Smile,
  HeartPulse,
  Stethoscope,
  Building,
  Activity,
  CheckCircle2,
  ArrowLeft,
  TrendingUp,
} from 'lucide-react';

interface SpecialtiesSectionProps {
  onOpenAuditModal: (
    source: string,
    preselectedBottleneck?: string,
    preselectedSpecialty?: string
  ) => void;
}

const SPECIALTY_ICONS: Record<string, React.ElementType> = {
  'derma-aesthetic': Sparkles,
  dental: Smile,
  'plastic-surgery': HeartPulse,
  'ivf-fertility': Activity,
  'multi-specialty': Building,
  'specialized-private': Stethoscope,
};

const SPECIALTY_LIVE_METRICS: Record<
  string,
  {
    leads: string;
    leadsDelta: string;
    appointments: string;
    appointmentsDelta: string;
    convRate: string;
    sampleBooking: string;
    bars: number[];
  }
> = {
  'derma-aesthetic': {
    leads: '1,428',
    leadsDelta: '+32%',
    appointments: '623',
    appointmentsDelta: '+48%',
    convRate: '43%',
    sampleBooking: 'Patient booked Laser & Skin Booster package • 2h ago',
    bars: [35, 48, 62, 74, 88, 100],
  },
  dental: {
    leads: '980',
    leadsDelta: '+29%',
    appointments: '412',
    appointmentsDelta: '+52%',
    convRate: '42%',
    sampleBooking: 'Patient confirmed Dental Implant & 3D Scan • 1h ago',
    bars: [30, 45, 58, 70, 85, 96],
  },
  'plastic-surgery': {
    leads: '640',
    leadsDelta: '+36%',
    appointments: '245',
    appointmentsDelta: '+44%',
    convRate: '38%',
    sampleBooking: 'Qualified Surgical Consultation scheduled • 3h ago',
    bars: [28, 42, 55, 68, 82, 95],
  },
  'ivf-fertility': {
    leads: '520',
    leadsDelta: '+41%',
    appointments: '234',
    appointmentsDelta: '+56%',
    convRate: '45%',
    sampleBooking: 'Couple booked Private IVF Assessment • 45m ago',
    bars: [32, 50, 64, 78, 90, 100],
  },
  'multi-specialty': {
    leads: '2,850',
    leadsDelta: '+38%',
    appointments: '1,280',
    appointmentsDelta: '+49%',
    convRate: '44%',
    sampleBooking: 'Omnichannel routing assigned 14 clinic bookings • Live',
    bars: [40, 52, 66, 79, 91, 100],
  },
  'specialized-private': {
    leads: '890',
    leadsDelta: '+34%',
    appointments: '390',
    appointmentsDelta: '+46%',
    convRate: '43%',
    sampleBooking: 'Patient confirmed Specialist Evaluation • 1h ago',
    bars: [34, 46, 60, 75, 87, 98],
  },
};

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ onOpenAuditModal }) => {
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<string>('derma-aesthetic');

  const activeSpecialty =
    SPECIALTIES_DATA.find((item) => item.id === activeSpecialtyId) || SPECIALTIES_DATA[0];
  const liveMetrics =
    SPECIALTY_LIVE_METRICS[activeSpecialtyId] || SPECIALTY_LIVE_METRICS['derma-aesthetic'];

  const handleSelectSpecialty = (id: string, nameAr: string) => {
    setActiveSpecialtyId(id);
    trackEvent('specialty_selection', {
      specialty: nameAr,
      cta_location: 'specialties_interactive_grid',
    });
  };

  return (
    <section
      id="specialties"
      className="py-20 lg:py-24 bg-white text-[#0F1117] border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Interactive Layout matching "NO TWO CLINICS GROW THE SAME WAY" in reference mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1 (Right in RTL): Headline & Explanation */}
          <div className="lg:col-span-4 space-y-5">
            <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#E11D2E] block">
              NO TWO CLINICS GROW THE SAME WAY
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1117] leading-[1.25]">
              مفيش عيادتين بينموا بنفس الطريقة.
            </h2>

            <div className="space-y-2 text-sm sm:text-base text-[#475569] leading-relaxed">
              <p>
                <span className="font-en font-semibold text-[#0F1117]">Dermatology</span> مش زي{' '}
                <span className="font-en font-semibold text-[#0F1117]">Dentistry</span>.
              </p>
              <p>
                <span className="font-en font-semibold text-[#0F1117]">Aesthetic Clinic</span> مش
                زي <span className="font-en font-semibold text-[#0F1117]">Medical Center</span>.
              </p>
              <p>
                <span className="font-en font-semibold text-[#0F1117]">Plastic Surgery</span> مش زي{' '}
                <span className="font-en font-semibold text-[#0F1117]">IVF & Fertility</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0] text-xs sm:text-sm text-[#0F1117] font-semibold">
              لذلك المنظومة عندنا بتبدأ من:
              <span className="font-en text-[#E11D2E] block mt-1 font-bold">
                Specialty + Patient Journey + Business Model
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() =>
                onOpenAuditModal(
                  'specialties_section',
                  activeSpecialty.typicalBottleneck,
                  activeSpecialty.nameAr
                )
              }
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E11D2E] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-[0_8px_20px_rgba(225,29,46,0.28)] transition-all cursor-pointer"
            >
              <span>اختر تخصصك وشوف أمثلة للـ Growth System</span>
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Column 2 (Center): Interactive Specialty Icon Grid */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-[#64748B] block">
              اختر التخصص الطبي لمعاينة خطة النمو ومؤشرات التحويل:
            </span>

            <div className="grid grid-cols-2 gap-3">
              {SPECIALTIES_DATA.map((spec) => {
                const isSelected = spec.id === activeSpecialtyId;
                const IconComp = SPECIALTY_ICONS[spec.id] || Stethoscope;
                return (
                  <motion.button
                    key={spec.id}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleSelectSpecialty(spec.id, spec.nameAr)}
                    className={`p-4 rounded-2xl border text-right transition-all flex flex-col items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F1117] text-white border-[#E11D2E] shadow-lg ring-2 ring-[#E11D2E]/20'
                        : 'bg-[#F8F9FB] hover:bg-white text-[#0F1117] border-[#E2E8F0]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#E11D2E] text-white'
                          : 'bg-white border border-[#E2E8F0] text-[#E11D2E]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-en text-xs font-bold block">{spec.nameEn}</span>
                      <span
                        className={`text-[11px] mt-0.5 block ${
                          isSelected ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                        }`}
                      >
                        {spec.nameAr}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Column 3 (Left in RTL): Dynamic Specialty Growth Prescription + Live Funnel Preview Card */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpecialty.id}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.28 }}
                className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5">
                  <div>
                    <span className="text-xs text-[#64748B] block">أمثلة على خطة النمو —</span>
                    <h3 className="font-en text-lg font-extrabold text-[#E11D2E]">
                      {activeSpecialty.nameEn}
                    </h3>
                    <span className="text-xs font-bold text-[#0F1117]">
                      {activeSpecialty.nameAr}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#FEF2F2] text-[#E11D2E] font-en text-[10px] font-bold">
                    Custom Funnel
                  </span>
                </div>

                {/* Live Animated Specialty Dashboard Widget (Inspired by Mockups 3 & 4) */}
                <div
                  className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-2xs space-y-3"
                  dir="ltr"
                >
                  <div className="grid grid-cols-3 gap-2 text-left">
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#F1F5F9]">
                      <span className="font-en text-[10px] text-[#64748B] block">Total Leads</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-mono-num text-sm font-black text-[#0F1117]">
                          {liveMetrics.leads}
                        </span>
                        <span className="font-mono-num text-[10px] font-bold text-[#16A34A]">
                          {liveMetrics.leadsDelta}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#F1F5F9]">
                      <span className="font-en text-[10px] text-[#64748B] block">Appointments</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-mono-num text-sm font-black text-[#0F1117]">
                          {liveMetrics.appointments}
                        </span>
                        <span className="font-mono-num text-[10px] font-bold text-[#16A34A]">
                          {liveMetrics.appointmentsDelta}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#FEF2F2] p-2.5 rounded-lg border border-[#FECACA]">
                      <span className="font-en text-[10px] text-[#991B1B] font-semibold block">
                        Conv. Rate
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-mono-num text-sm font-black text-[#E11D2E]">
                          {liveMetrics.convRate}
                        </span>
                        <TrendingUp className="w-3.5 h-3.5 text-[#E11D2E]" />
                      </div>
                    </div>
                  </div>

                  {/* Mini Animated Bar Chart + Live Booking Pill */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping shrink-0" />
                      <span className="font-en text-[10px] font-semibold text-[#334155] truncate">
                        {liveMetrics.sampleBooking}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 h-6 shrink-0">
                      {liveMetrics.bars.map((b, bIdx) => (
                        <motion.span
                          key={bIdx}
                          initial={{ height: 0 }}
                          animate={{ height: `${b}%` }}
                          transition={{ duration: 0.4, delay: bIdx * 0.05 }}
                          className="w-1.5 rounded-t bg-[#E11D2E]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4 Core Pillars from the reference mockup */}
                <div className="grid grid-cols-2 gap-2" dir="ltr">
                  {[
                    'Service-specific campaigns',
                    'Consultation triage',
                    'Lead qualification flow',
                    'Follow-up & recall',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#E2E8F0] text-[11px] font-en font-semibold text-[#0F1117]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Arabic Specialty Bottleneck & Shavi Fix */}
                <div className="space-y-2.5 pt-2 border-t border-[#E2E8F0] text-xs">
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0]">
                    <strong className="text-[#E11D2E] block mb-0.5">
                      الفجوة المعتادة في التخصص:
                    </strong>
                    <p className="text-[#475569] leading-relaxed">
                      {activeSpecialty.typicalBottleneck}
                    </p>
                  </div>

                  <div className="bg-[#0F1117] text-white p-3 rounded-xl">
                    <strong className="text-[#4ADE80] block mb-0.5">كيف نبني المنظومة هنا؟</strong>
                    <p className="text-[#CBD5E1] leading-relaxed">
                      {activeSpecialty.shaviIntervention}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
