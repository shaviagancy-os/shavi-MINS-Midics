import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/medicalGrowthData';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-white text-[#0F1117] border-b border-[#E2E8F0]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Right Header Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-en font-bold uppercase tracking-[0.2em] text-[#E11D2E]">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1117] leading-[1.25]">
              إجابات صريحة على تساؤلات الأطباء ومديري العيادات
            </h2>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              نحن لا نبيع وعوداً تسويقية مبالغاً فيها. هذه إجاباتنا الواضحة حول كيفية عمل منظومة{' '}
              <span className="font-en font-bold text-[#0F1117]">Shavi Medical Growth</span>:
            </p>

            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F1117]">
                <ShieldCheck className="w-4 h-4 text-[#E11D2E]" />
                <span>مبدأ التشخيص أولاً (Diagnosis First):</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                نبدأ دائماً بتشخيص النظام الحالي للعيادة، ولا نقترح استبدال ما يعمل بنجاح لديك، بل
                نعالج الحلقة المفقودة في الـ Qualification أو الـ Follow-up أو الـ Conversion.
              </p>
            </div>
          </div>

          {/* Left Accordion Column */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#E11D2E] shadow-md'
                      : 'bg-[#F8F9FB] border-[#E2E8F0]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono-num text-xs font-bold text-[#E11D2E] bg-[#FEF2F2] px-2.5 py-1 rounded-lg shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="text-base font-bold text-[#0F1117]">
                        &ldquo;{item.objection}&rdquo;
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#E11D2E]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 space-y-3 border-t border-[#F1F5F9]">
                      <p className="text-sm text-[#334155] leading-relaxed">{item.answer}</p>
                      <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F1117] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E11D2E] shrink-0" />
                        <span>{item.executiveTakeaway}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
