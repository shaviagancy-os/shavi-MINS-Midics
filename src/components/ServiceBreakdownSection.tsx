import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICE_COMPONENTS } from '../data/medicalGrowthData';
import {
  TrendingUp,
  UserPlus,
  RefreshCw,
  MessageSquare,
  Check,
  ArrowLeft,
} from 'lucide-react';

interface ServiceBreakdownSectionProps {
  onOpenAuditModal: (source: string) => void;
}

const FOUR_PILLAR_CARDS = [
  {
    step: '01',
    icon: TrendingUp,
    titleEn: 'Growth Marketing',
    titleAr: 'استراتيجية وتسويق نمو متكامل',
    desc: 'Strategy + Content + Campaigns مصممة لإبراز القيمة الطبية للعيادة وجذب الشريحة الصحيحة.',
    flowTag: 'Attract Right Patients',
  },
  {
    step: '02',
    icon: UserPlus,
    titleEn: 'Patient Acquisition',
    titleAr: 'استقطاب وتأهيل المرضى',
    desc: 'مسارات جذب وفلترة مخصصة لكل خدمة طبية لضمان وصول استفسارات جادة وقابلة للتحويل.',
    flowTag: 'Filter & Qualify Leads',
  },
  {
    step: '03',
    icon: RefreshCw,
    titleEn: 'Follow-up System',
    titleAr: 'منظومة متابعة وتأكيد الحجوزات',
    desc: 'تسلسلات متابعة واضحة للمرضى المترددين وتذكيرات تقلل الـ No-Show وترفع نسبة الحضور.',
    flowTag: 'Recover Hesitant Leads',
  },
  {
    step: '04',
    icon: MessageSquare,
    titleEn: 'Patient Communication System',
    titleAr: 'تنظيم محادثات المرضى والاستقبال',
    desc: 'ربط التسويق بفريق الاستقبال مع إمكانية تفعيل طبقة Shavi Chatwoot الاختيارية لتوحيد القنوات.',
    flowTag: 'Unified Reception SLA',
  },
];

export const ServiceBreakdownSection: React.FC<ServiceBreakdownSectionProps> = ({
  onOpenAuditModal,
}) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="py-20 lg:py-24 bg-white text-[#0F1117] border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Section Header matching "WHAT WE ACTUALLY DO" */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#E11D2E] block">
              WHAT WE ACTUALLY DO
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1117] leading-[1.25]">
              مش مجرد إدارة صفحات…{' '}
              <span className="text-[#E11D2E]">8 محركات تشغيلية تبني نمو العيادة</span>
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              نربط بين التسويق الطبي، صفحات الهبوط، فلترة الـ Leads، وتوجيه فريق الاستقبال في منظومة
              واحدة متكاملة:
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onOpenAuditModal('services_header')}
            className="self-start lg:self-auto inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0F1117] hover:bg-[#E11D2E] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer"
          >
            <span>احجز جلسة تشخيص لاختيار ما يناسب عيادتك</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </div>

        {/* 4 Highlight Pillar Cards from Reference Mockup with Animated Hover & Step Tag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FOUR_PILLAR_CARDS.map((card, i) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-[#F8F9FB] hover:bg-white border border-[#E2E8F0] hover:border-[#E11D2E] rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-[0_16px_35px_rgba(225,29,46,0.1)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#E11D2E] group-hover:bg-[#E11D2E] group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-mono-num text-xs font-extrabold text-[#94A3B8] group-hover:text-[#E11D2E]">
                      {card.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-en text-base font-extrabold text-[#0F1117]">
                      {card.titleEn}
                    </h3>
                    <p className="text-xs font-bold text-[#E11D2E] mt-0.5">{card.titleAr}</p>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{card.desc}</p>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between" dir="ltr">
                  <span className="font-en text-[10px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#E11D2E]">
                    {card.flowTag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#E11D2E] group-hover:scale-125 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed 8 Service Components Grid with Interactive Progress Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_COMPONENTS.map((service, idx) => {
            const isHovered = hoveredModule === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredModule(service.id)}
                onMouseLeave={() => setHoveredModule(null)}
                className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#0F1117] shadow-[0_4px_20px_rgba(15,17,23,0.03)] hover:shadow-[0_14px_30px_rgba(15,17,23,0.08)] flex flex-col justify-between transition-all relative overflow-hidden"
              >
                {/* Top Animated Highlight Bar */}
                <div className="absolute top-0 right-0 left-0 h-1 bg-[#F1F5F9]">
                  <motion.div
                    animate={{ width: isHovered ? '100%' : '22%' }}
                    transition={{ duration: 0.35 }}
                    className="h-full bg-[#E11D2E]"
                  />
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                    <span className="font-mono-num text-[11px] font-bold text-[#E11D2E] bg-[#FEF2F2] px-2.5 py-0.5 rounded-md">
                      {service.code}
                    </span>
                    <span className="font-en text-[11px] font-bold text-[#64748B] text-left">
                      {service.titleEn}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#0F1117] leading-snug">
                    {service.titleAr}
                  </h4>

                  <p className="text-xs text-[#64748B] leading-relaxed">{service.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F1F5F9] space-y-1.5">
                  {service.outputs.map((out, oIdx) => (
                    <div
                      key={oIdx}
                      className="text-xs text-[#0F1117] font-medium flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#E11D2E] shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
