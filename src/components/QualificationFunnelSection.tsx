import React, { useState, useEffect } from 'react';
import { buildWhatsAppUrl, trackEvent } from '../utils/analytics';
import { ShaviLogo } from './ShaviLogo';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Send,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface QualificationFunnelSectionProps {
  preselectedBottleneck?: string;
  preselectedSpecialty?: string;
}

const WIZARD_SPECIALTIES = [
  { id: 'Dermatology', labelEn: 'Dermatology', labelAr: 'جلدية وليزر' },
  { id: 'Dental', labelEn: 'Dental', labelAr: 'أسنان وزراعة' },
  { id: 'Aesthetic Clinic', labelEn: 'Aesthetic Clinic', labelAr: 'عيادة تجميل' },
  { id: 'Plastic Surgery', labelEn: 'Plastic Surgery', labelAr: 'جراحات تجميل' },
  { id: 'Medical Center', labelEn: 'Medical Center', labelAr: 'مركز متعدد التخصصات' },
  { id: 'IVF / Other', labelEn: 'IVF / Specialized', labelAr: 'خصوبة / تخصص دقيق' },
];

const WIZARD_GOALS = [
  {
    id: 'Full Growth Strategy',
    en: 'Full Growth Strategy',
    ar: 'بناء منظومة نمو متكاملة للعيادة',
  },
  {
    id: 'Lead Quality & Acquisition',
    en: 'More Qualified Leads',
    ar: 'رفع جودة الـ Leads وجذب المرضى المناسبين',
  },
  {
    id: 'Patient Follow-up & Conversion',
    en: 'Patient Funnel Optimization',
    ar: 'تنظيم الـ Follow-up ورفع تحويل الاستقبال',
  },
  {
    id: 'Chatwoot Unified Inbox',
    en: 'Chatwoot Follow-up & Automation',
    ar: 'توحيد محادثات المرضى عبر Shavi Chatwoot (اختياري)',
  },
];

const BUDGET_RANGES = [
  'أقل من 30,000 ج.م شهرياً',
  '30,000 - 75,000 ج.م شهرياً',
  '75,000 - 150,000 ج.م شهرياً',
  'أكثر من 150,000 ج.م شهرياً',
  'نحدد الميزانية بعد جلسة الـ Audit',
];

export const QualificationFunnelSection: React.FC<QualificationFunnelSectionProps> = ({
  preselectedBottleneck,
  preselectedSpecialty,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [specialty, setSpecialty] = useState<string>('Dermatology');
  const [mainGoal, setMainGoal] = useState<string>('Full Growth Strategy');
  const [monthlyBudget, setMonthlyBudget] = useState<string>(BUDGET_RANGES[1]);
  const [needChatwoot, setNeedChatwoot] = useState<string>('نحدد خلال التشخيص');
  const [fullName, setFullName] = useState<string>('');
  const [clinicName, setClinicName] = useState<string>('');
  const [cityCountry, setCityCountry] = useState<string>('');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedSpecialty) {
      setSpecialty(preselectedSpecialty);
    }
  }, [preselectedSpecialty]);

  useEffect(() => {
    if (preselectedBottleneck) {
      setMainGoal(preselectedBottleneck);
    }
  }, [preselectedBottleneck]);

  const handleNextStep = (next: 1 | 2 | 3) => {
    if (step === 1) {
      trackEvent('form_start', { specialty, cta_location: 'wizard_step_1' });
    }
    setStep(next);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('form_submit', {
      specialty,
      bottleneck: mainGoal,
      value: monthlyBudget,
      cta_location: 'wizard_final_step',
    });
    setSubmitted(true);
  };

  const structuredWhatsAppMessage = `مرحباً فريق Shavi Medical Growth،
أرغب في تأكيد جلسة تشخيص منظومة النمو (Medical Growth Audit):
• الاسم: ${fullName || '—'}
• العيادة/المركز: ${clinicName || '—'}
• التخصص: ${specialty}
• الأولوية الحالية: ${mainGoal}
• الميزانية الشهرية: ${monthlyBudget}
• الحاجة لـ Shavi Chatwoot: ${needChatwoot}
• المدينة/الدولة: ${cityCountry || '—'}
• رقم الموبايل/واتساب: ${phoneWhatsapp || '—'}`;

  return (
    <>
      {/* Bottom Dark Crimson & Obsidian Split Section matching both uploaded mockups */}
      <section
        id="audit-funnel"
        className="relative py-20 lg:py-28 bg-[#08090E] text-white overflow-hidden"
      >
        {/* Glowing Crimson Silk Wave Background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 25% 50%, rgba(225, 29, 46, 0.32) 0%, rgba(136, 19, 55, 0.15) 45%, transparent 70%), radial-gradient(circle at 85% 80%, rgba(225, 29, 46, 0.2) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Right/Left Dark Brand Narrative matching "YOUR CLINIC HAS A GROWTH OPPORTUNITY. Let's Find It." */}
            <div className="lg:col-span-6 space-y-6">
              <ShaviLogo variant="light" size="lg" showTagline={true} />

              <div className="space-y-3 pt-2">
                <span className="font-en text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#FB7185] block">
                  YOUR CLINIC HAS A GROWTH OPPORTUNITY.
                </span>
                <h2 className="font-en text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Let&apos;s Find It.
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-[#CBD5E1] leading-[1.8] max-w-xl">
                <p>
                  لو أنت حاسس إن الـ <span className="font-en text-white font-semibold">Marketing</span>{' '}
                  شغال لكن النتائج ممكن تكون أفضل… خلينا نبص على الصورة كاملة.
                </p>
                <p>
                  نحلل وضع العيادة، نكشف فجوات الـ{' '}
                  <span className="font-en text-white font-semibold">Growth</span>، ونشوف إيه اللي
                  يستحق يتطور أولاً — سواء في الإعلانات، فلترة الـ{' '}
                  <span className="font-en text-white font-semibold">Leads</span>، أو نظام الـ{' '}
                  <span className="font-en text-white font-semibold">Follow-up</span> والاستقبال.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', { cta_location: 'bottom_opportunity_banner' })
                  }
                  className="inline-flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#E11D2E] to-[#BE123C] hover:from-[#F43F5E] hover:to-[#E11D2E] text-white font-bold text-sm rounded-xl shadow-[0_10px_30px_rgba(225,29,46,0.4)] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-en">Medical Growth Audit</span>
                  <span>— تواصل مباشر</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>

                <div className="text-xs text-[#94A3B8] font-en" dir="ltr">
                  <strong className="text-white block">No commitment.</strong>
                  Built around your clinic.
                </div>
              </div>
            </div>

            {/* Interactive White Multi-Step Qualification Wizard Card matching Reference Mockups */}
            <div className="lg:col-span-6">
              <div className="bg-white text-[#0F1117] rounded-3xl p-6 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-white/20">
                {!submitted ? (
                  <div className="space-y-6">
                    {/* Top Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-en font-bold text-[#E11D2E]">
                          Step {step} of 3 — Medical Growth Audit
                        </span>
                        <span className="text-[#64748B] font-medium">
                          {step === 1
                            ? '1. تخصص العيادة'
                            : step === 2
                            ? '2. أولويات النمو والميزانية'
                            : '3. بيانات التواصل والتأكيد'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#E11D2E] transition-all duration-300"
                          style={{ width: `${(step / 3) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* STEP 1: Specialty Selection Grid */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1117]">
                            إيه تخصص العيادة أو المركز الطبي؟
                          </h3>
                          <p className="text-xs text-[#64748B] mt-1">
                            اختر التخصص لنجهز لك نموذج التشخيص ومسار المريض المناسب:
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {WIZARD_SPECIALTIES.map((sp) => {
                            const active = specialty === sp.id;
                            return (
                              <button
                                key={sp.id}
                                type="button"
                                onClick={() => {
                                  setSpecialty(sp.id);
                                  trackEvent('specialty_selection', {
                                    specialty: sp.id,
                                    cta_location: 'audit_wizard_step1',
                                  });
                                }}
                                className={`p-3.5 rounded-xl border text-right flex items-center justify-between transition-all cursor-pointer ${
                                  active
                                    ? 'bg-[#FEF2F2] border-[#E11D2E] text-[#0F1117] font-bold shadow-xs'
                                    : 'bg-[#F8F9FB] hover:bg-white border-[#E2E8F0] text-[#334155]'
                                }`}
                              >
                                <div>
                                  <span className="font-en text-xs font-bold block text-[#0F1117]">
                                    {sp.labelEn}
                                  </span>
                                  <span className="text-[11px] text-[#64748B] block">
                                    {sp.labelAr}
                                  </span>
                                </div>
                                <span
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    active
                                      ? 'border-[#E11D2E] bg-[#E11D2E]'
                                      : 'border-[#CBD5E1] bg-white'
                                  }`}
                                >
                                  {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleNextStep(2)}
                          className="w-full py-3.5 px-6 bg-[#E11D2E] hover:bg-[#BE123C] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                        >
                          <span>التالي: تحديد أولوية النمو</span>
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* STEP 2: Bottleneck / Priority & Monthly Budget */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl font-extrabold text-[#0F1117]">
                            ما الذي ترغب في تحسينه أولاً داخل العيادة؟
                          </h3>
                        </div>

                        <div className="space-y-2.5">
                          {WIZARD_GOALS.map((g) => {
                            const active = mainGoal === g.id;
                            return (
                              <button
                                key={g.id}
                                type="button"
                                onClick={() => setMainGoal(g.id)}
                                className={`w-full p-3.5 rounded-xl border text-right flex items-center justify-between transition-all cursor-pointer ${
                                  active
                                    ? 'bg-[#FEF2F2] border-[#E11D2E] font-bold'
                                    : 'bg-[#F8F9FB] border-[#E2E8F0]'
                                }`}
                              >
                                <div>
                                  <span className="font-en text-xs font-bold text-[#E11D2E] block">
                                    {g.en}
                                  </span>
                                  <span className="text-xs text-[#0F1117]">{g.ar}</span>
                                </div>
                                <span
                                  className={`w-4 h-4 rounded-full border ${
                                    active
                                      ? 'border-[#E11D2E] bg-[#E11D2E]'
                                      : 'border-[#CBD5E1] bg-white'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#0F1117] mb-1">
                              الميزانية التسويقية الشهرية:
                            </label>
                            <select
                              value={monthlyBudget}
                              onChange={(e) => setMonthlyBudget(e.target.value)}
                              className="w-full px-3 py-2.5 bg-[#F8F9FB] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F1117]"
                            >
                              {BUDGET_RANGES.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#0F1117] mb-1">
                              هل تحتاج Shavi Chatwoot؟ (اختياري)
                            </label>
                            <select
                              value={needChatwoot}
                              onChange={(e) => setNeedChatwoot(e.target.value)}
                              className="w-full px-3 py-2.5 bg-[#F8F9FB] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F1117]"
                            >
                              <option value="نعم — لدينا ضغط رسائل وفريق استقبال">
                                نعم — لدينا ضغط رسائل وفريق استقبال
                              </option>
                              <option value="نحدد خلال التشخيص">
                                نحدد مدى الحاجة له خلال التشخيص
                              </option>
                              <option value="لا — نحتاج منظومة التسويق الأساسية فقط">
                                لا — نحتاج المنظومة الأساسية فقط
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-4 py-3.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#475569] hover:text-[#0F1117] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4" />
                            <span>السابق</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleNextStep(3)}
                            className="flex-1 py-3.5 px-6 bg-[#E11D2E] hover:bg-[#BE123C] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                          >
                            <span>التالي: بيانات التواصل</span>
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Contact Details & Instant Diagnostic Submission */}
                    {step === 3 && (
                      <form onSubmit={handleFinalSubmit} className="space-y-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-[#0F1117]">
                            بيانات التواصل لتأكيد جلسة التشخيص
                          </h3>
                          <p className="text-xs text-[#64748B] mt-0.5">
                            سيتواصل معك استشاري النمو الطبي في Shavi لمراجعة ملف عيادتك:
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#0F1117] mb-1">
                              الاسم الكامل (دكتور / مدير العيادة) *
                            </label>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="د. أحمد محمود"
                              className="w-full px-3.5 py-2.5 bg-[#F8F9FB] border border-[#E2E8F0] focus:border-[#E11D2E] focus:outline-none rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#0F1117] mb-1">
                              اسم العيادة / المركز الطبي *
                            </label>
                            <input
                              type="text"
                              required
                              value={clinicName}
                              onChange={(e) => setClinicName(e.target.value)}
                              placeholder="عيادات ..."
                              className="w-full px-3.5 py-2.5 bg-[#F8F9FB] border border-[#E2E8F0] focus:border-[#E11D2E] focus:outline-none rounded-xl text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#0F1117] mb-1">
                              رقم الموبايل / واتساب *
                            </label>
                            <input
                              type="tel"
                              required
                              dir="ltr"
                              value={phoneWhatsapp}
                              onChange={(e) => setPhoneWhatsapp(e.target.value)}
                              placeholder="+20 100 000 0000"
                              className="w-full px-3.5 py-2.5 bg-[#F8F9FB] border border-[#E2E8F0] focus:border-[#E11D2E] focus:outline-none rounded-xl text-xs text-right font-mono-num"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#0F1117] mb-1">
                              المدينة / الدولة *
                            </label>
                            <input
                              type="text"
                              required
                              value={cityCountry}
                              onChange={(e) => setCityCountry(e.target.value)}
                              placeholder="القاهرة / الرياض / الإسكندرية"
                              className="w-full px-3.5 py-2.5 bg-[#F8F9FB] border border-[#E2E8F0] focus:border-[#E11D2E] focus:outline-none rounded-xl text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F1117] mb-1">
                            البريد الإلكتروني (اختياري)
                          </label>
                          <input
                            type="email"
                            dir="ltr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="doctor@clinic.com"
                            className="w-full px-3.5 py-2.5 bg-[#F8F9FB] border border-[#E2E8F0] focus:border-[#E11D2E] focus:outline-none rounded-xl text-xs text-right"
                          />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-4 py-3.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#475569] hover:text-[#0F1117] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4" />
                            <span>السابق</span>
                          </button>

                          <button
                            type="submit"
                            className="flex-1 py-3.5 px-6 bg-[#E11D2E] hover:bg-[#BE123C] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                          >
                            <span>إصدار ملخص التشخيص وحجز الجلسة</span>
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  /* Submitted State: Preliminary Diagnostic Brief + Direct WhatsApp Dispatch */
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F1117]">
                          تم تجهيز بطاقة التشخيص المبدئي لـ {clinicName}
                        </h4>
                        <p className="text-xs text-[#166534] mt-0.5">
                          اضغط بالأسفل لإرسال بطاقة التشخيص مباشرة لفريق Shavi عبر واتساب وتأكيد
                          موعدك.
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-5 space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                        <span className="font-en font-bold text-[#E11D2E]">
                          CLINIC AUDIT SUMMARY
                        </span>
                        <span className="font-bold text-[#0F1117]">{specialty}</span>
                      </div>
                      <p className="text-[#334155] leading-relaxed">
                        <strong>التركيز المقترح للجلسة:</strong> بناء مسار مخصص لـ ({mainGoal}) يناسب
                        عيادة <strong>{clinicName}</strong> في ({cityCountry})، مع مراجعة رحلة
                        الـ Lead من أول إعلان حتى إغلاق الحجز في الاستقبال.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={buildWhatsAppUrl(structuredWhatsAppMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent('booking_click', {
                            cta_location: 'wizard_whatsapp_confirm',
                            specialty,
                          })
                        }
                        className="flex-1 py-3.5 px-5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        <span>إرسال بطاقة التشخيص عبر واتساب الآن</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setStep(1);
                        }}
                        className="py-3.5 px-4 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F1117] text-xs font-bold rounded-xl inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sleek Dark Footer matching the bottom bar of both reference mockups */}
      <footer className="bg-[#050609] text-[#94A3B8] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            {/* Logo */}
            <ShaviLogo variant="light" size="md" showTagline={true} />

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 font-en text-xs font-semibold text-[#CBD5E1]">
              <a href="#system" className="hover:text-[#E11D2E] transition-colors">
                Our System
              </a>
              <a href="#services" className="hover:text-[#E11D2E] transition-colors">
                Services
              </a>
              <a href="#cases" className="hover:text-[#E11D2E] transition-colors">
                Case Studies
              </a>
              <a href="#packages" className="hover:text-[#E11D2E] transition-colors">
                Packages
              </a>
              <a href="#why-shavi" className="hover:text-[#E11D2E] transition-colors">
                Why Shavi
              </a>
              <a href="#faq" className="hover:text-[#E11D2E] transition-colors">
                FAQ
              </a>
            </div>

            {/* Social & Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white hover:text-[#E11D2E] font-mono-num"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-[#E11D2E]" />
                <span>+20 111 504 2478</span>
              </a>

              <a
                href="mailto:info@shaviagency.me"
                className="inline-flex items-center gap-1.5 text-white hover:text-[#E11D2E] font-en"
              >
                <Mail className="w-3.5 h-3.5 text-[#E11D2E]" />
                <span>info@shaviagency.me</span>
              </a>

              <span className="inline-flex items-center gap-1 text-[#94A3B8] font-en">
                <MapPin className="w-3.5 h-3.5 text-[#E11D2E]" />
                <span>Cairo - Egypt</span>
              </span>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <p className="font-en">© {new Date().getFullYear()} Shavi. All rights reserved.</p>

            <div className="flex items-center gap-3 font-en">
              <a
                href="https://www.facebook.com/Shavi.Agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Facebook
              </a>
              <span>•</span>
              <a
                href="https://www.instagram.com/shavi.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/company/shaviagency"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://www.tiktok.com/@shaviagency"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                TikTok
              </a>
            </div>

            <p className="font-en text-[#FB7185] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>More Patients. Better Lives.</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
