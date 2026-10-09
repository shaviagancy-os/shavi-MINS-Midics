import React, { useState } from 'react';
import { COMPARISON_ROWS } from '../data/medicalGrowthData';
import {
  CheckCircle2,
  XCircle,
  Inbox,
  UserCheck,
  Tag,
  History,
  MessageSquareReply,
  Clock,
  Users,
  BarChart3,
  Sparkles,
  ArrowLeft,
  Send,
  Lock,
  Phone,
  Zap,
  Filter,
  CheckCheck,
  AlertCircle,
  Sliders,
  FileText,
} from 'lucide-react';

interface ComparisonAndChatwootSectionProps {
  onOpenAuditModal: (source: string) => void;
}

interface MockPatientConversation {
  id: string;
  patientName: string;
  phone: string;
  channel: 'WhatsApp' | 'Instagram DM' | 'Facebook' | 'Website Chat';
  channelBadgeColor: string;
  specialty: string;
  branch: string;
  assignedAgent: string;
  campaignSource: string;
  slaTime: string;
  statusTag: string;
  statusColor: string;
  labels: string[];
  messages: {
    sender: 'patient' | 'bot' | 'agent' | 'private_note';
    senderName: string;
    time: string;
    text: string;
  }[];
}

const LIVE_PATIENT_CONVERSATIONS: MockPatientConversation[] = [
  {
    id: 'conv-1',
    patientName: 'أ. سارة محمود',
    phone: '+20 109 482 1190',
    channel: 'WhatsApp',
    channelBadgeColor: 'bg-[#DCFCE7] text-[#15803D]',
    specialty: 'زراعة وتجميل الأسنان',
    branch: 'فرع التجمع الخامس',
    assignedAgent: 'مريم عادل (منسقة الزراعة)',
    campaignSource: 'Meta Ad — Immediate Implant Funnel',
    slaTime: 'أول رد خلال: 2 دقيقة',
    statusTag: 'Booked Appointment',
    statusColor: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]',
    labels: ['#dental-implant', '#hot-lead', '#booked-appointment'],
    messages: [
      {
        sender: 'patient',
        senderName: 'أ. سارة محمود',
        time: '11:14 ص',
        text: 'السلام عليكم، شفت إعلان دكتور الجراحة لزراعة الأسنان الفورية، كنت عايزة أعرف التكلفة وهل بتنفع لو خالعة الضرس من 6 شهور؟',
      },
      {
        sender: 'bot',
        senderName: 'Shavi Qualification Assistant',
        time: '11:14 ص',
        text: 'أهلاً بحضرتك يا أستاذة سارة في عياداتنا 🌸 لخدمتك بدقة من الفريق الطبي المختص:\n1️⃣ هل متوفر لديكِ أشعة بانوراما أو مقطعية حديثة؟\n2️⃣ أي فرع أقرب لحضرتك (التجمع الخامس أم الشيخ زايد)؟',
      },
      {
        sender: 'patient',
        senderName: 'أ. سارة محمود',
        time: '11:16 ص',
        text: 'أيوه معايا أشعة بانوراما على الموبايل، وفرع التجمع أقرب ليا.',
      },
      {
        sender: 'private_note',
        senderName: 'ملاحظة داخلية خاصة بالفريق (لا تظهر للمريض)',
        time: '11:17 ص',
        text: '🔒 @مريم_عادل تم تحويل المحادثة لكِ تلقائياً — حالة زراعة مؤهلة (Hot Lead) ومعاها أشعة البانوراما لفرع التجمع.',
      },
      {
        sender: 'agent',
        senderName: 'مريم عادل (منسقة الزراعة)',
        time: '11:18 ص',
        text: 'أهلاً بحضرتك يا أستاذة سارة، معاكي مريم منسقة حالات الزراعة. ممتاز جداً إن الأشعة متوفرة، تقدرين تبعتيها هنا وهيعرضها الدكتور قبل زيارتك، وعندنا موعد متاح يوم الأربعاء الساعة 6:00 مساءً للفحص وخطة العلاج الكاملة. يناسبك تأكيده؟',
      },
      {
        sender: 'patient',
        senderName: 'أ. سارة محمود',
        time: '11:20 ص',
        text: 'تمام جداً، أيوه الموعد مناسب وهبعتلك صورة الأشعة حالاً.',
      },
    ],
  },
  {
    id: 'conv-2',
    patientName: 'م. كريم عبد الرحمن',
    phone: '+20 112 830 5541',
    channel: 'Instagram DM',
    channelBadgeColor: 'bg-[#FCE7F3] text-[#BE185D]',
    specialty: 'الجلدية والتجميل والليزر',
    branch: 'فرع الشيخ زايد',
    assignedAgent: 'سلمى حسن (ريسبشن الجلدية)',
    campaignSource: 'Instagram Reel — Skin Booster Package',
    slaTime: 'أول رد خلال: 4 دقائق',
    statusTag: 'Follow-up 24h',
    statusColor: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
    labels: ['#derma-package', '#follow-up-24h', '#sheikh-zayed'],
    messages: [
      {
        sender: 'patient',
        senderName: 'م. كريم عبد الرحمن',
        time: 'أمس 08:30 م',
        text: 'لو سمحت باقة علاج آثار الحبوب بالليزر الفراكشنال بتحتاج كام جلسة؟',
      },
      {
        sender: 'agent',
        senderName: 'سلمى حسن (ريسبشن الجلدية)',
        time: 'أمس 08:34 م',
        text: 'أهلاً بك يا باشمهندس كريم، أغلب الحالات بتحتاج من 3 إلى 4 جلسات حسب عمق الندبات، وفي الكشف الأول الدكتورة بتحدد البروتوكول بالضبط. تحب نحجز موعد تقييم يوم الخميس؟',
      },
      {
        sender: 'patient',
        senderName: 'م. كريم عبد الرحمن',
        time: 'أمس 08:40 م',
        text: 'طيب هراجع جدول شغلي وأرد عليكم بكرة إن شاء الله.',
      },
      {
        sender: 'private_note',
        senderName: 'تذكير متابعة تلقائي (Shavi Follow-up Trigger)',
        time: 'اليوم 01:00 م',
        text: '⏰ تذكير للريسبشن: مرّت 16 ساعة على حالة (#follow-up-24h). أرسل رسالة المتابعة المعتمدة لتأكيد موعد الخميس.',
      },
    ],
  },
  {
    id: 'conv-3',
    patientName: 'د. نهى سامي',
    phone: '+966 55 412 8890',
    channel: 'Facebook',
    channelBadgeColor: 'bg-[#DBEAFE] text-[#1D4ED8]',
    specialty: 'جراحات التجميل وتنسيق القوام',
    branch: 'الفرع الرئيسي',
    assignedAgent: 'د. طارق (منسق الجراحات)',
    campaignSource: 'Facebook Lead Form — Body Contouring',
    slaTime: 'أول رد خلال: 3 دقائق',
    statusTag: 'Qualified VIP',
    statusColor: 'bg-[#FEF2F2] text-[#E11D2E] border-[#FECACA]',
    labels: ['#plastic-surgery', '#vip-consultation', '#qualified'],
    messages: [
      {
        sender: 'patient',
        senderName: 'د. نهى سامي',
        time: '02:10 م',
        text: 'مساء الخير، أرغب في حجز استشارة خاصة مع دكتور جراحة التجميل بخصوص شد البطن والنحت الرباعي.',
      },
      {
        sender: 'agent',
        senderName: 'د. طارق (منسق الجراحات)',
        time: '02:13 م',
        text: 'أهلاً بحضرتك يا دكتورة نهى، معك د. طارق منسق الجراحات. يشرفنا جداً، الاستشارة تشمل التقييم الطبي الشامل وشرح فترة التعافي بالتفصيل. سأرسل لحضرتك المواعيد المتاحة هذا الأسبوع.',
      },
    ],
  },
];

const PRACTICAL_WHAT_IT_DOES = [
  {
    step: '01',
    titleAr: 'يجمع كل رسائل العيادة في شاشة واحدة (بدل تشتت الموبايلات)',
    descAr:
      'بدل ما موظف الريسبشن يفتح موبايل للواتساب، وتابلت للإنستجرام، وكمبيوتر لصفحة الفيسبوك وتضيع الرسائل بينهم؛ كل القنوات بتنزل في شاشة واحدة منظمة لحظة بلحظة.',
    badgeEn: 'Omnichannel Inbox',
  },
  {
    step: '02',
    titleAr: 'يوزع كل مريض على الموظف أو القسم المختص تلقائياً',
    descAr:
      'لو المريض بيسأل عن "زراعة أسنان" المحادثة بتروح فوراً لمنسق الزراعة، ولو بيسأل عن "ليزر أو جلدية" بتروح لموظفة الجلدية، بدون تدخل يدوي أو فوضى.',
    badgeEn: 'Smart Lead Routing',
  },
  {
    step: '03',
    titleAr: 'يمنع الردود العشوائية عبر قوالب طبية معتمدة (Canned Responses)',
    descAr:
      'بضغطة زر واحدة (`/`) يختار موظف الاستقبال الرد الطبي المعتمد من الدكتور شاملاً شرح القيمة الطبية، فيديو الحالة، وطريقة الحجز بدل الردود المختصرة التي تُفقد العيادة المريض.',
    badgeEn: 'Approved Medical Scripts',
  },
  {
    step: '04',
    titleAr: 'يُذكّر الريسبشن بمتابعة المرضى المترددين (Follow-up System)',
    descAr:
      'أي مريض يقول "هفكر وأرجعلكم" يتم تصنيفه بـ Tag (#يحتاج_متابعة)، ويقوم النظام بتنبيه الموظف المسؤول بعد 24 و72 ساعة لإعادة التواصل معه واستعادة الحجز.',
    badgeEn: 'Automated Follow-up Alerts',
  },
  {
    step: '05',
    titleAr: 'يكشف لمدير العيادة سرعة الرد ومعدل تحويل كل موظف بالأرقام',
    descAr:
      'لوحة تقارير حية توضح: كم رسالة وصلت اليوم؟ كم دقيقة استغرق الريسبشن للرد على المريض؟ ومن هو الموظف الأعلى تحويلاً للرسائل إلى مواعيد فعلية؟',
    badgeEn: 'Real-Time SLA & Reports',
  },
];

const CHATWOOT_WORKFLOW_STEPS = [
  { en: 'New Inquiry', ar: 'رسالة من إعلان أو صفحة' },
  { en: 'Assigned', ar: 'توجيه تلقائي للمختص' },
  { en: 'Qualification', ar: 'تأهيل الحالة + رد معتمد' },
  { en: 'Follow-up', ar: 'جدولة متابعة المترددين' },
  { en: 'Appointment', ar: 'تأكيد الحجز في العيادة' },
];

export const ComparisonAndChatwootSection: React.FC<ComparisonAndChatwootSectionProps> = ({
  onOpenAuditModal,
}) => {
  const [activeSystemTab, setActiveSystemTab] = useState<
    'inbox' | 'automation' | 'canned' | 'reports'
  >('inbox');
  const [selectedConvId, setSelectedConvId] = useState<string>(LIVE_PATIENT_CONVERSATIONS[0].id);

  const activeConversation =
    LIVE_PATIENT_CONVERSATIONS.find((c) => c.id === selectedConvId) ||
    LIVE_PATIENT_CONVERSATIONS[0];

  return (
    <div id="why-shavi">
      {/* PART 1: Shavi Chatwoot — Real System Views & Practical Operational Breakdown */}
      <section className="py-20 lg:py-28 bg-[#F8F9FB] text-[#0F1117] border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Top Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#FEF2F2] border border-[#FECACA] text-[#E11D2E] font-en text-xs font-bold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OPTIONAL SMART LAYER // طبقة ذكية اختيارية</span>
                </span>
                <span className="px-3 py-1 rounded-md bg-white border border-[#E2E8F0] text-[#0F1117] font-en text-xs font-bold">
                  Powered by Chatwoot | Customized by Shavi
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F1117] leading-[1.22]">
                مش بنبيع <span className="font-en">Social Media</span> فقط…
                <br />
                <span className="text-[#E11D2E]">
                  شوف بنفسك إزاي بننظم محادثات المرضى والـ Reception من داخل النظام
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                بدل ما محادثات <span className="font-en font-semibold text-[#0F1117]">WhatsApp</span>{' '}
                و <span className="font-en font-semibold text-[#0F1117]">Instagram</span> و{' '}
                <span className="font-en font-semibold text-[#0F1117]">Facebook</span> تكون تايهة بين
                موبايلات الريسبشن، بنربط عيادتك بنظام{' '}
                <span className="font-en font-bold text-[#0F1117]">Shavi Chatwoot</span> المخصص
                للقطاع الطبي (إضافة اختيارية).
              </p>
              <p className="text-xs font-bold text-[#E11D2E]">
                👇 تصفح الشاشات الفعلية للنظام بالأسفل لتعرف ماذا يفعل بالضبط داخل عيادتك:
              </p>
            </div>
          </div>

          {/* Interactive System Screen Switcher (4 Real System Screens) */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                {[
                  {
                    id: 'inbox',
                    icon: Inbox,
                    titleAr: '1. شاشة صندوق الرسائل الموحد',
                    titleEn: 'Live Omnichannel Inbox',
                  },
                  {
                    id: 'automation',
                    icon: Zap,
                    titleAr: '2. شاشة التوزيع والأتمتة التلقائية',
                    titleEn: 'Smart Routing & Automation',
                  },
                  {
                    id: 'canned',
                    icon: MessageSquareReply,
                    titleAr: '3. شاشة الردود الطبية المعتمدة',
                    titleEn: 'Canned Scripts & Triage',
                  },
                  {
                    id: 'reports',
                    icon: BarChart3,
                    titleAr: '4. شاشة تقارير الريسبشن والـ SLA',
                    titleEn: 'Reception SLA & ROI Reports',
                  },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  const active = activeSystemTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setActiveSystemTab(
                          tab.id as 'inbox' | 'automation' | 'canned' | 'reports'
                        )
                      }
                      className={`p-3.5 rounded-xl text-right flex items-center gap-3 transition-all cursor-pointer ${
                        active
                          ? 'bg-[#0F1117] text-white shadow-md'
                          : 'bg-[#F8F9FB] hover:bg-[#F1F5F9] text-[#334155]'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          active ? 'bg-[#E11D2E] text-white' : 'bg-white text-[#E11D2E] border border-[#E2E8F0]'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold block truncate">{tab.titleAr}</span>
                        <span
                          className={`font-en text-[10px] block truncate ${
                            active ? 'text-[#FB7185]' : 'text-[#64748B]'
                          }`}
                        >
                          {tab.titleEn}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTUAL SYSTEM INTERFACE FRAME (Realistic Desktop Application Window) */}
            <div className="bg-[#0F1117] rounded-3xl p-2 sm:p-3.5 border border-[#1E293B] shadow-[0_25px_70px_rgba(15,17,23,0.18)]">
              {/* Browser / System Top Window Bar */}
              <div className="bg-[#181B24] rounded-t-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  <span className="ml-3 font-en text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
                    chat.shaviagency.me — Shavi Medical CRM & Chatwoot Workspace
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#22C55E]/15 text-[#4ADE80] font-en text-[11px] font-bold">
                    ● Channels Connected: WhatsApp • IG • FB • Web
                  </span>
                </div>
              </div>

              {/* SCREEN 1: LIVE OMNICHANNEL INBOX VIEW */}
              {activeSystemTab === 'inbox' && (
                <div className="bg-white rounded-b-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[560px] text-[#0F1117]">
                  {/* Pane 1: Channels & Clinic Labels Sidebar */}
                  <div className="lg:col-span-2 bg-[#0F1117] text-white p-4 space-y-6 border-l border-white/10">
                    <div className="space-y-2">
                      <span className="font-en text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                        INBOX CHANNELS // القنوات
                      </span>
                      <div className="space-y-1 text-xs">
                        <div className="px-3 py-2 rounded-lg bg-[#E11D2E] text-white font-bold flex items-center justify-between">
                          <span>كل المحادثات</span>
                          <span className="font-mono-num text-[11px] bg-black/25 px-1.5 py-0.5 rounded">
                            28
                          </span>
                        </div>
                        <div className="px-3 py-2 rounded-lg text-[#CBD5E1] hover:bg-white/5 flex items-center justify-between">
                          <span className="font-en">WhatsApp Official</span>
                          <span className="font-mono-num text-[11px] text-[#4ADE80]">16</span>
                        </div>
                        <div className="px-3 py-2 rounded-lg text-[#CBD5E1] hover:bg-white/5 flex items-center justify-between">
                          <span className="font-en">Instagram Direct</span>
                          <span className="font-mono-num text-[11px] text-[#F472B6]">8</span>
                        </div>
                        <div className="px-3 py-2 rounded-lg text-[#CBD5E1] hover:bg-white/5 flex items-center justify-between">
                          <span className="font-en">Facebook Page</span>
                          <span className="font-mono-num text-[11px] text-[#60A5FA]">4</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/10">
                      <span className="font-en text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                        CLINIC TAGS // تصنيف الحالات
                      </span>
                      <div className="space-y-1.5 text-[11px] font-en">
                        <div className="flex items-center gap-2 text-[#E2E8F0]">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]" />
                          <span>#booked-appointment</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#E2E8F0]">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#E11D2E]" />
                          <span>#hot-lead-qualified</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#E2E8F0]">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
                          <span>#follow-up-24h</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#E2E8F0]">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
                          <span>#dental-implant</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#E2E8F0]">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#EC4899]" />
                          <span>#derma-package</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pane 2: Interactive Patient Conversations List */}
                  <div className="lg:col-span-3 bg-[#F8F9FB] border-l border-[#E2E8F0] flex flex-col">
                    <div className="p-3.5 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#0F1117]">
                        محادثات المرضى الجارية (اضغط للمعاينة)
                      </span>
                      <Filter className="w-3.5 h-3.5 text-[#64748B]" />
                    </div>

                    <div className="divide-y divide-[#E2E8F0] flex-1">
                      {LIVE_PATIENT_CONVERSATIONS.map((conv) => {
                        const isSelected = conv.id === selectedConvId;
                        return (
                          <button
                            key={conv.id}
                            type="button"
                            onClick={() => setSelectedConvId(conv.id)}
                            className={`w-full text-right p-4 transition-all cursor-pointer block ${
                              isSelected
                                ? 'bg-white border-r-4 border-[#E11D2E] shadow-xs'
                                : 'hover:bg-white/70'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs sm:text-sm font-extrabold text-[#0F1117]">
                                {conv.patientName}
                              </span>
                              <span
                                className={`font-en text-[10px] font-bold px-2 py-0.5 rounded ${conv.channelBadgeColor}`}
                              >
                                {conv.channel}
                              </span>
                            </div>

                            <p className="text-xs font-semibold text-[#334155] mt-1">
                              {conv.specialty} — {conv.branch}
                            </p>

                            <p className="text-[11px] text-[#64748B] mt-1 line-clamp-1">
                              {conv.messages[conv.messages.length - 1].text}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-1.5 mt-2.5">
                              <span
                                className={`font-en text-[10px] font-bold px-2 py-0.5 rounded border ${conv.statusColor}`}
                              >
                                {conv.statusTag}
                              </span>
                              <span className="text-[10px] text-[#64748B] font-medium">
                                {conv.slaTime}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pane 3: Live Chat Thread + Private Notes + Canned Response Bar */}
                  <div className="lg:col-span-4 bg-white border-l border-[#E2E8F0] flex flex-col justify-between">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8F9FB]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold text-[#0F1117]">
                            {activeConversation.patientName}
                          </h4>
                          <span className="text-[11px] text-[#15803D] font-bold bg-[#DCFCE7] px-2 py-0.5 rounded">
                            {activeConversation.slaTime}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5">
                          المسؤول الحالي: <strong>{activeConversation.assignedAgent}</strong>
                        </p>
                      </div>

                      <div className="text-left font-en text-[10px] text-[#64748B]" dir="ltr">
                        {activeConversation.phone}
                      </div>
                    </div>

                    {/* Chat Messages Stream */}
                    <div className="p-4 space-y-3 overflow-y-auto max-h-[380px] bg-[#F8F9FB]/50">
                      {activeConversation.messages.map((msg, idx) => {
                        if (msg.sender === 'private_note') {
                          return (
                            <div
                              key={idx}
                              className="bg-[#FEF9C3] border border-[#FDE047] rounded-xl p-3 text-xs text-[#854D0E] space-y-1"
                            >
                              <div className="flex items-center justify-between font-bold text-[11px]">
                                <span className="flex items-center gap-1">
                                  <Lock className="w-3 h-3" />
                                  {msg.senderName}
                                </span>
                                <span>{msg.time}</span>
                              </div>
                              <p className="leading-relaxed">{msg.text}</p>
                            </div>
                          );
                        }

                        const isPatient = msg.sender === 'patient';
                        return (
                          <div
                            key={idx}
                            className={`rounded-2xl p-3.5 text-xs space-y-1 max-w-[92%] ${
                              isPatient
                                ? 'bg-white border border-[#E2E8F0] text-[#0F1117] mr-0 ml-auto'
                                : msg.sender === 'bot'
                                ? 'bg-[#0F1117] text-white ml-0 mr-auto'
                                : 'bg-[#FEF2F2] border border-[#FECACA] text-[#0F1117] ml-0 mr-auto'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] opacity-75 font-bold">
                              <span>{msg.senderName}</span>
                              <span>{msg.time}</span>
                            </div>
                            <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat Composer & Quick Canned Response Trigger */}
                    <div className="p-3 border-t border-[#E2E8F0] bg-white space-y-2">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-[#FEF2F2] text-[#E11D2E] font-bold">
                          رد سريع معتمد (/):
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155]">
                          /تفاصيل_الزراعة
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155]">
                          /لوكيشن_الفرع
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#F8F9FB] border border-[#E2E8F0] rounded-xl px-3 py-2">
                        <input
                          type="text"
                          readOnly
                          value="اكتب رداً للمريض أو اضغط '/' لإدراج سكريبت طبي معتمد..."
                          className="w-full bg-transparent text-xs text-[#64748B] focus:outline-none"
                        />
                        <Send className="w-4 h-4 text-[#E11D2E] shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Pane 4: Patient Medical CRM Card & Custom Attributes */}
                  <div className="lg:col-span-3 bg-white p-4 space-y-4">
                    <div className="border-b border-[#E2E8F0] pb-3">
                      <span className="font-en text-[10px] font-bold uppercase tracking-wider text-[#E11D2E] block">
                        PATIENT CRM PROFILE // ملف المريض
                      </span>
                      <h5 className="text-sm font-extrabold text-[#0F1117] mt-1">
                        {activeConversation.patientName}
                      </h5>
                      <span className="font-mono-num text-xs text-[#64748B] block" dir="ltr">
                        {activeConversation.phone}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="bg-[#F8F9FB] p-2.5 rounded-xl border border-[#E2E8F0]">
                        <span className="text-[10px] text-[#64748B] block">
                          مصدر الحملة الإعلانية (Ad Attribution):
                        </span>
                        <strong className="font-en text-[11px] text-[#0F1117]">
                          {activeConversation.campaignSource}
                        </strong>
                      </div>

                      <div className="bg-[#F8F9FB] p-2.5 rounded-xl border border-[#E2E8F0]">
                        <span className="text-[10px] text-[#64748B] block">الخدمة والفرع:</span>
                        <strong className="text-[#0F1117]">
                          {activeConversation.specialty} ({activeConversation.branch})
                        </strong>
                      </div>

                      <div className="bg-[#F8F9FB] p-2.5 rounded-xl border border-[#E2E8F0]">
                        <span className="text-[10px] text-[#64748B] block">
                          موظف الاستقبال المسؤول:
                        </span>
                        <strong className="text-[#E11D2E]">
                          {activeConversation.assignedAgent}
                        </strong>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                      <span className="text-[11px] font-bold text-[#0F1117] block">
                        الوسوم النشطة (Active Labels):
                      </span>
                      <div className="flex flex-wrap gap-1.5" dir="ltr">
                        {activeConversation.labels.map((lbl) => (
                          <span
                            key={lbl}
                            className="font-en text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF2F2] text-[#E11D2E] border border-[#FECACA]"
                          >
                            {lbl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SCREEN 2: SMART ROUTING & AUTOMATION BUILDER VIEW */}
              {activeSystemTab === 'automation' && (
                <div className="bg-white rounded-b-2xl p-6 sm:p-8 text-[#0F1117] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
                    <div>
                      <span className="font-en text-xs font-bold text-[#E11D2E] uppercase">
                        CHATWOOT AUTOMATION ENGINE — CUSTOMIZED BY SHAVI
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0F1117] mt-0.5">
                        قواعد التوزيع التلقائي والتنبيهات المبرمجة داخل العيادة
                      </h3>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-[#DCFCE7] text-[#15803D] font-en text-xs font-bold">
                      3 Active Clinic Rules Running
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {[
                      {
                        ruleName: 'Rule #01: توجيه حالات الزراعة والتجميل تلقائياً',
                        condition:
                          'عند وصول رسالة WhatsApp أو Instagram تحتوي على ("زراعة" أو "هوليود سمايل" أو "فينير")',
                        actions: [
                          'توجيه المحادثة فوراً إلى: منسق علاج الأسنان',
                          'إضافة وسم: #dental-implant + #high-value',
                          'إرسال سؤال التأهيل الأولي تلقائياً للمريض',
                        ],
                      },
                      {
                        ruleName: 'Rule #02: تذكير متابعة المرضى المترددين (24h Follow-up)',
                        condition:
                          'إذا مرّت 24 ساعة على محادثة موسومة بـ (#هفكر_وأرد) دون تأكيد موعد الحجز',
                        actions: [
                          'إرسال تنبيه داخلي لموظف الاستقبال المسؤول',
                          'اقتراح قالب متابعة طبية مطمئنة (توضيح خطوات الإجراء)',
                          'رفع أولوية المحادثة في قائمة المتابعة اليومية',
                        ],
                      },
                      {
                        ruleName: 'Rule #03: حماية العيادة من تأخر الرد (SLA Alert)',
                        condition:
                          'إذا وصلت رسالة مريض جديد ولم يرد موظف الاستقبال خلال 10 دقائق',
                        actions: [
                          'تحويل المحادثة تلقائياً للموظف المتاح التالي في الشيفت',
                          'إرسال إشعار لمشرف الاستقبال / مدير العيادة',
                          'تسجيل الحالة في تقرير سرعة الاستجابة الأسبوعي',
                        ],
                      },
                    ].map((rule, i) => (
                      <div
                        key={i}
                        className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-5 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-en text-xs font-bold text-white bg-[#0F1117] px-2.5 py-1 rounded-md">
                            ACTIVE RULE 0{i + 1}
                          </span>
                          <Zap className="w-4 h-4 text-[#E11D2E]" />
                        </div>
                        <h4 className="text-base font-extrabold text-[#0F1117]">{rule.ruleName}</h4>
                        <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs">
                          <strong className="text-[#E11D2E] block mb-1">الشرط (WHEN / IF):</strong>
                          <p className="text-[#475569]">{rule.condition}</p>
                        </div>
                        <div className="bg-[#DCFCE7]/40 p-3 rounded-xl border border-[#86EFAC] text-xs space-y-1.5">
                          <strong className="text-[#15803D] block">
                            ما يفعله النظام تلقائياً (THEN):
                          </strong>
                          {rule.actions.map((act, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[#0F1117]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREEN 3: CANNED RESPONSES & MEDICAL SCRIPTS VIEW */}
              {activeSystemTab === 'canned' && (
                <div className="bg-white rounded-b-2xl p-6 sm:p-8 text-[#0F1117] space-y-6">
                  <div className="border-b border-[#E2E8F0] pb-4">
                    <span className="font-en text-xs font-bold text-[#E11D2E] uppercase">
                      APPROVED MEDICAL CANNED RESPONSES LIBRARY
                    </span>
                    <h3 className="text-xl font-extrabold text-[#0F1117] mt-0.5">
                      مكتبة الردود الطبية المعتمدة — كيف نمنع إجابات الريسبشن العشوائية؟
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      بدلاً من أن يرد الموظف بكلمة &ldquo;الكشف بـ 500 جنيه&rdquo; ويصمت، نبرمج داخل
                      Chatwoot ردوداً طبية مقنعة تظهر بمجرد كتابة علامة <code className="font-mono-num text-[#E11D2E]">/</code>:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      {
                        shortcode: '/سعر_زراعة_الأسنان',
                        situation: 'عندما يسأل المريض: "بكام زرعة الضرس؟"',
                        wrongReply: 'الزرعة بتبدأ من 12 ألف جنيه.',
                        shaviScript:
                          'أهلاً بحضرتك 🌸 تكلفة زراعة الأسنان في مركزنا تشمل الزرعة السويسرية المعتمدة + التاج الخزفي + متابعة الالتئام الكاملة تحت إشراف استشاري جراحة الفم. لتحديد النوع الأنسب لكثافة العظم لديك، هل متوفر أشعة بانوراما حالياً أم نرتب موعد فحص وتشخيص؟',
                      },
                      {
                        shortcode: '/تأكيد_الحجز_وتقليل_NoShow',
                        situation: 'بعد اتفاق المريض على موعد الكشف',
                        wrongReply: 'تمام مستنيينك بكرة الساعة 6.',
                        shaviScript:
                          'تم تأكيد موعد حضرتك غداً الأربعاء الساعة 6:00 م مع د. أحمد (فرع التجمع الخامس) ✅\n📍 رابط الموقع على Google Maps: [الرابط]\nنرجو إحضار أي فحوصات سابقة، وسيتواصل معك فريق التنسيق قبل الموعد بساعتين للتأكيد.',
                      },
                      {
                        shortcode: '/متابعة_المتردد_48h',
                        situation: 'لمريض سأل عن إجراء تجميلي ولم يحجز منذ يومين',
                        wrongReply: '(لا يتم التواصل معه وتضيع الحالة)',
                        shaviScript:
                          'مرحباً أستاذة سارة، معكِ مريم من عيادة الجلدية والتجميل 🌸 حبينا نطمن لو عندك أي استفسار طبي إضافي بخصوص جلسة النضارة والعلاج، علماً بأنه متاح موعدان فقط في جدول الدكتورة نهاية هذا الأسبوع لو حابة نأكد أحدهما لحضرتك.',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-5 space-y-3.5 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono-num text-xs font-bold bg-[#FEF2F2] text-[#E11D2E] border border-[#FECACA] px-2.5 py-1 rounded-md">
                              {item.shortcode}
                            </span>
                            <FileText className="w-4 h-4 text-[#64748B]" />
                          </div>
                          <p className="text-xs font-bold text-[#0F1117]">{item.situation}</p>

                          <div className="bg-[#FEF2F2]/60 border border-[#FECACA] p-2.5 rounded-xl text-xs">
                            <span className="font-bold text-[#DC2626] block mb-0.5">
                              ❌ الرد التقليدي الذي يضيع المريض:
                            </span>
                            <p className="text-[#475569]">{item.wrongReply}</p>
                          </div>

                          <div className="bg-white border border-[#86EFAC] p-3 rounded-xl text-xs">
                            <span className="font-bold text-[#15803D] block mb-1">
                              ✅ رد Shavi Chatwoot المعتمد بضغطة زر:
                            </span>
                            <p className="text-[#0F1117] leading-relaxed">{item.shaviScript}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREEN 4: RECEPTION SLA & CONVERSION REPORTS VIEW */}
              {activeSystemTab === 'reports' && (
                <div className="bg-white rounded-b-2xl p-6 sm:p-8 text-[#0F1117] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
                    <div>
                      <span className="font-en text-xs font-bold text-[#E11D2E] uppercase">
                        LIVE CLINIC RECEPTION & CONVERSION ANALYTICS
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0F1117] mt-0.5">
                        لوحة قياس أداء الاستقبال — تقارير حقيقية لمدير العيادة
                      </h3>
                    </div>
                    <span className="text-xs font-bold bg-[#F8F9FB] border border-[#E2E8F0] px-3 py-1.5 rounded-lg">
                      تقرير آخر 30 يوماً (نموذج توضيحي من داخل النظام)
                    </span>
                  </div>

                  {/* Top 4 KPI Cards inside Chatwoot Report */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        labelAr: 'إجمالي محادثات المرضى',
                        labelEn: 'Total Conversations',
                        val: '640',
                        sub: 'WhatsApp + IG + FB',
                      },
                      {
                        labelAr: 'متوسط سرعة أول رد',
                        labelEn: 'Avg First Response Time',
                        val: '3m 42s',
                        sub: 'ضمن معيار الـ SLA الطبي',
                      },
                      {
                        labelAr: 'حالات مؤهلة (#Qualified)',
                        labelEn: 'Qualified Medical Leads',
                        val: '312',
                        sub: '48.7% من إجمالي الرسائل',
                      },
                      {
                        labelAr: 'مواعيد مؤكدة (#Booked)',
                        labelEn: 'Booked Appointments',
                        val: '148',
                        sub: 'مسجلة ومربوطة بالحملات',
                      },
                    ].map((kpi, idx) => (
                      <div
                        key={idx}
                        className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-4 space-y-1"
                      >
                        <span className="font-en text-[10px] font-bold text-[#64748B] uppercase block">
                          {kpi.labelEn}
                        </span>
                        <span className="text-xs font-bold text-[#0F1117] block">
                          {kpi.labelAr}
                        </span>
                        <div className="font-mono-num text-2xl font-extrabold text-[#E11D2E] pt-1">
                          {kpi.val}
                        </div>
                        <span className="text-[11px] text-[#15803D] font-medium block">
                          {kpi.sub}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Receptionist Agent Comparison Table */}
                  <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
                    <div className="bg-[#0F1117] text-white px-5 py-3 text-xs font-bold flex items-center justify-between">
                      <span>مقارنة أداء موظفي الاستقبال ومنسقي العلاج (Agent Performance)</span>
                      <span className="font-en text-[11px] text-[#94A3B8]">
                        Updated Real-Time
                      </span>
                    </div>
                    <div className="divide-y divide-[#E2E8F0] text-xs">
                      {[
                        {
                          agent: 'مريم عادل — منسقة زراعة وتجميل الأسنان',
                          chats: '215 محادثة',
                          responseTime: '2 دقيقة و15 ثانية',
                          followupDone: '96%',
                          booked: '68 حجز مؤكد',
                        },
                        {
                          agent: 'سلمى حسن — ريسبشن الجلدية والليزر',
                          chats: '260 محادثة',
                          responseTime: '4 دقائق و10 ثوانٍ',
                          followupDone: '91%',
                          booked: '54 حجز مؤكد',
                        },
                        {
                          agent: 'أحمد طارق — شيفت الكول سنتر المسائي',
                          chats: '165 محادثة',
                          responseTime: '5 دقائق و05 ثوانٍ',
                          followupDone: '88%',
                          booked: '26 حجز مؤكد',
                        },
                      ].map((ag, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white hover:bg-[#F8F9FB] grid grid-cols-1 sm:grid-cols-5 gap-2 items-center"
                        >
                          <strong className="sm:col-span-2 text-[#0F1117]">{ag.agent}</strong>
                          <span className="text-[#475569]">المحادثات: {ag.chats}</span>
                          <span className="text-[#15803D] font-bold">
                            سرعة الرد: {ag.responseTime}
                          </span>
                          <span className="bg-[#FEF2F2] text-[#E11D2E] font-bold px-3 py-1 rounded-lg text-center">
                            {ag.booked}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* What Chatwoot Actually Does Step-by-Step in the Clinic (5 Practical Cards) */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1117]">
                بالمختصر: ماذا يفعل <span className="font-en text-[#E11D2E]">Shavi Chatwoot</span>{' '}
                فعلياً داخل عيادتك يومياً؟
              </h3>
              <span className="text-xs text-[#64748B] font-semibold">
                * طبقة اختيارية (Optional Add-on) تُفعل حسب احتياج العيادة
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRACTICAL_WHAT_IT_DOES.map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-[#FEF2F2] text-[#E11D2E] font-mono-num text-xs font-bold flex items-center justify-center">
                        {item.step}
                      </span>
                      <span className="font-en text-[10px] font-bold text-[#64748B]">
                        {item.badgeEn}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-[#0F1117] leading-snug">
                      {item.titleAr}
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">{item.descAr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Connected Chatwoot Workflow Strip */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center">
              {CHATWOOT_WORKFLOW_STEPS.map((st, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-3 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#E11D2E] flex items-center justify-center font-mono-num text-xs font-bold mb-2">
                    0{i + 1}
                  </div>
                  <span className="font-en text-xs font-bold text-[#0F1117]">{st.en}</span>
                  <span className="text-[11px] text-[#64748B] mt-0.5">{st.ar}</span>
                </div>
              ))}
            </div>

            <p className="text-center font-en text-xs text-[#64748B] pt-2">
              Workflows, tags and scripts are customized around each clinic and its approved
              medical information.
            </p>
          </div>
        </div>
      </section>

      {/* PART 2: Why Shavi vs Traditional Agencies Matrix (Kept 100% Intact) */}
      <section className="py-20 lg:py-24 bg-white text-[#0F1117] border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#E11D2E] block">
                WHY SHAVI VS TRADITIONAL AGENCIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1117] leading-[1.25]">
                لماذا تختار العيادات والمراكز الطبية منظومة{' '}
                <span className="font-en text-[#E11D2E]">Shavi</span>؟
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onOpenAuditModal('comparison_table')}
              className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-3 bg-[#E11D2E] hover:bg-[#BE123C] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <span>قارن أداء عيادتك الحالي في جلسة تشخيص</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#0F1117] text-white">
              <div className="lg:col-span-3 p-5 font-bold text-sm border-b lg:border-b-0 lg:border-l border-white/10">
                وجه المقارنة
              </div>
              <div className="lg:col-span-4 p-5 font-bold text-sm text-[#94A3B8] border-b lg:border-b-0 lg:border-l border-white/10 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                <span>الوكالات التقليدية / إدارة الصفحات</span>
              </div>
              <div className="lg:col-span-5 p-5 font-bold text-sm bg-[#E11D2E] text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>منظومة Shavi Medical Growth System</span>
              </div>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 lg:grid-cols-12 hover:bg-[#F8F9FB] transition-colors"
                >
                  <div className="lg:col-span-3 p-5 font-bold text-sm text-[#0F1117] bg-[#F8F9FB]/60 lg:border-l border-[#E2E8F0] flex items-center">
                    {row.criterion}
                  </div>
                  <div className="lg:col-span-4 p-5 text-sm text-[#64748B] lg:border-l border-[#E2E8F0] flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                    <span>{row.traditionalAgency}</span>
                  </div>
                  <div className="lg:col-span-5 p-5 text-sm text-[#0F1117] font-semibold bg-[#FEF2F2]/30 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-1" />
                    <span>{row.shaviSystem}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
