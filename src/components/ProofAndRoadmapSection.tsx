import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Play,
  Sliders,
  Sparkles,
  X,
  TrendingUp,
  CheckCheck,
  Star,
  Maximize2,
  MessageCircle,
} from 'lucide-react';
import { ShaviLogo } from './ShaviLogo';
import heroExecutiveImg from '../assets/images/hero_medical_executive_1791478971909.jpg';
import clinicInteriorImg from '../assets/images/clinic_environment_editorial_1791478982759.jpg';
import growthShowcaseImg from '../assets/images/medical_growth_showcase_1791478992755.jpg';
import doctorHeroStudioImg from '../assets/images/doctor_hero_studio_1791483274683.jpg';

interface ProofAndRoadmapSectionProps {
  onOpenAuditModal: (source: string) => void;
}

const CASE_STUDIES_CARDS = [
  {
    titleEn: 'Dermatology & Aesthetic Clinic - Cairo',
    titleAr: 'عيادة جلدية وتجميل وليزر — القاهرة',
    img: clinicInteriorImg,
    problemAr: 'كثرة الرسائل السعرية على عروض الليزر مع ضعف حجز باقات الفيلر والنضارة.',
    interventionAr: 'فصل مسارات الباقات العلاجية + أتمتة المتابعة وإعادة الحجز الدوري.',
    metric1: 'Structured Qualification Flow',
    metric2: 'Higher Package Booking Ratio',
  },
  {
    titleEn: 'Dental & Implant Center - Alexandria',
    titleAr: 'مركز زراعة وتجميل الأسنان — الإسكندرية',
    img: heroExecutiveImg,
    problemAr: 'تردد المرضى بعد معرفة الأسعار المبدئية وغياب متابعة الحالات الجراحية.',
    interventionAr: 'بناء Funnel مخصص لزراعة الأسنان وتجميل الابتسامة + تدريب منسق العلاج.',
    metric1: 'Dedicated Implant Funnel',
    metric2: '48h Follow-up Recovery SLA',
  },
  {
    titleEn: 'Multi-Specialty Medical Center - KSA',
    titleAr: 'مركز طبي متعدد التخصصات — السعودية',
    img: growthShowcaseImg,
    problemAr: 'تشتت المحادثات بين 8 عيادات داخلية وتأخر الرد في أوقات الذروة.',
    interventionAr: 'ربط القنوات بـ Shavi Chatwoot وتوجيه كل مريض لموظف القسم المختص.',
    metric1: 'Unified Omnichannel Inbox',
    metric2: 'Response Time < 10 Mins',
  },
];

const ACTION_PLAYBOOKS = [
  {
    id: 'campaign-breakdown',
    category: 'Campaigns',
    titleEn: 'Campaign Breakdown',
    titleAr: 'هيكلة الحملات الطبية حسب الخدمة',
    img: growthShowcaseImg,
    summary:
      'كيف نفصل بين حملات الكشف العام وحملات الإجراءات عالية القيمة (مثل الزراعة، النحت، والحقن التجميلي) لضمان عدم استنزاف الميزانية.',
    bullets: [
      'تقسيم الميزانية حسب هامش ربح كل إجراء طبي',
      'صياغة زوايا إعلانية تخاطب المشكلة الطبية وليس السعر فقط',
      'إعادة استهداف (Retargeting) لزوار صفحة الخدمة الذين لم يكملوا الحجز',
    ],
  },
  {
    id: 'growth-strategy',
    category: 'Strategy',
    titleEn: 'Clinic Growth Strategy',
    titleAr: 'بناء استراتيجية التموضع والعرض الطبي',
    img: doctorHeroStudioImg,
    summary:
      'تحويل خدمات العيادة من قائمة أسعار تقليدية إلى باقات علاجية واضحة القيمة تسهل على المريض اتخاذ قرار الحجز.',
    bullets: [
      'تحليل المنافسين في النطاق الجغرافي للعيادة',
      'تصميم العرض الاستشاري الأول (Consultation Entry Offer)',
      'تحديد مؤشرات الأداء الأسبوعية والشهرية',
    ],
  },
  {
    id: 'creative-direction',
    category: 'Creatives',
    titleEn: 'Creative Direction',
    titleAr: 'توجيه المحتوى الطبي المرئي للأطباء',
    img: heroExecutiveImg,
    summary:
      'إعداد السكريبتات الطبية وتوجيه التصوير ليظهر الطبيب بمظهر الخبير الموثوق ويجيب عن مخاوف المريض قبل الكشف.',
    bullets: [
      'سكريبتات فيديوهات قصيرة تفكك مخاوف الألم والتكلفة',
      'هوية بصرية تحترم الوقار الطبي وأخلاقيات المهنة',
      'محتوى يبني الثقة ويرفع معدل التحويل في الاستقبال',
    ],
  },
  {
    id: 'patient-journey',
    category: 'Patient Journey',
    titleEn: 'Patient Journey & Qualification',
    titleAr: 'رحلة المريض وفلترة الـ Leads',
    img: clinicInteriorImg,
    summary:
      'ماذا يحدث منذ لحظة ضغط المريض على الإعلان وحتى جلوسه في غرفة الكشف؟ مسار متكامل بدون تسريب.',
    bullets: [
      'صفحة هبوط سريعة توضح تفاصيل الإجراء وتجمع بيانات التأهيل',
      'فرز تلقائي للحالات الجادة والمستعجلة',
      'تذكيرات ما قبل الموعد لتقليل الـ No-Show',
    ],
  },
  {
    id: 'behind-system',
    category: 'Behind The System',
    titleEn: 'Behind The System',
    titleAr: 'ربط التسويق بالاستقبال والتقارير',
    img: growthShowcaseImg,
    summary:
      'كيف نراقب سرعة رد الريسبشن، جودة المحادثات، وعدد الحجوزات الفعلية لكل حملة إعلانية.',
    bullets: [
      'لوحة قياس واضحة لمدير العيادة',
      'سكريبتات الرد على اعتراضات السعر لفريق الحجز',
      'إمكانية التوحيد عبر Shavi Chatwoot الاختياري',
    ],
  },
];

interface RealClientReview {
  id: string;
  doctorName: string;
  clinicRole: string;
  clinicShort: string;
  highlightBadge: string;
  hasWhatsAppBadge?: boolean;
  paragraphs: string[];
}

const CLIENT_TESTIMONIALS: RealClientReview[] = [
  {
    id: 'eman-saleh',
    doctorName: 'DR.Eman Saleh',
    clinicRole: 'Owner of Remal Clinic',
    clinicShort: 'Remal Clinic',
    highlightBadge: 'Operations & Media Quality',
    paragraphs: [
      'البشمهندس والتيم بتاعه من أفضل الشركات اللي بتحترم وبتحب شغلها جدا وبشغف عالي قوي وبتقدم بجد مجهود جبار عشان تطلع بأعلى نتيجة في الـClinic',
      'غير إنهم بيشرحوا بجد كل Point بتحل مشاكل كتير قوي في الـOperations ومع الـPatients عندنا غير تيم التصوير والـMedia اللي بجد شابوه على جودتهم واحترافيتهم وتنظيمهم العالي أول مرة أشوف بجد كده.',
      'أنا فخورة إنكم فعلا شريك لينا ❤️❤️',
    ],
  },
  {
    id: 'engy-fahad',
    doctorName: 'DR.Engy Fahad',
    clinicRole: 'Owner of Revive Medical Center',
    clinicShort: 'Revive Medical Center',
    highlightBadge: 'Reception Training & Marketing',
    paragraphs: [
      'أنا مش عارفة أقول إيه غير إنكم شركة كنت بدور على عقليات بجد بالنظام ده وإنكم بجد فاهمين بتعملوا إيه فعلا',
      'في الأول مكنتش فاهمة إنتوا هتعملوا إيه 😂 بس إنتوا فاهمين قوي أغلب مشاكل الـClinic وبتحلوا حاجات أي شركة تانية بتستجاهلها قوي برغم انها مهمة فعلا وبيقولوا مش شغلنا 😂',
      'اما معاكو ركزتو ف تدريب الـReception وآلية التشغيل الداخلي اللي كانت بتضيع Patients كتير جدا ودي حاجة مكنتش واخدة بالي منها مع تكملة الـMarketing اللي فعلا جابلي الـPatients بتوعنا وعلمني إزاي نتعامل معاهم باحترافية عالية وظهرت فعلا جودة شغلنا اللي بسببكم الـPatient بقى واثق في أي حاجة معانا زي ما إحنا واثقين فيكم.',
      'إنتوا فعلا الـSlogan بتاعكم عجبني: دايما معاك Shavi وطلعت حقيقة 😂❤️',
      'بالتوفيق يا رب لكل فرد عندكو و انتو شاطرين واي حد معاكو بيتقدم بجد ❤️',
    ],
  },
  {
    id: 'rania-mohamed',
    doctorName: 'DR.Rania Mohamed',
    clinicRole: 'Owner of Wellora Clinic',
    clinicShort: 'Wellora Clinic',
    highlightBadge: 'Operations & Team Structure',
    paragraphs: [
      'شكرا بجد على كل المجهود اللي قدمتوه معانا ومع الـTeam بتاعي في الـClinic ساعدتونا ننظم الـTeam والخدمات ونفهم مشاكل كتير كانت بتحصل مع الـPatients ومكناش عارفين سببها الحقيقي',
      'أنا كنت قلقان في البداية، خصوصا إني سمعت كلام كتير قبل كده من شركات عن شراكات وحلول وفي الآخر مبيحصلش حاجة.',
      'لكن التجربة معاكم كانت مختلفة فعلا.',
      'اللي عجبني إنكم مش بتقولوا كلام وخلاص بتشوفوا المشكلة وبتحاولوا تفهموا سببها وتحلوا من جوه الـOperations.',
      'بصراحة فرق معانا جدا وغير طريقة الشغل عندنا. شكرا ليكم وتستحقوا كل كلمة حلوة تتقال في حقكم 👍',
    ],
  },
  {
    id: 'salma-emad',
    doctorName: 'DR.Salma Emad',
    clinicRole: 'Owner of Apex Dental Center',
    clinicShort: 'Apex Dental Center',
    highlightBadge: '3 Years Partnership & Media',
    hasWhatsAppBadge: true,
    paragraphs: [
      'أنا قبل ما أشتغل معاكم كنت بتوتر جدا من الـCamera ومكنتش بعرف أطلع أتكلم أو أشرح من غير ما أتلبخ',
      'دلوقتي الموضوع اختلف جدا 😂 بقيت أعرف أطلع Social Media وأتكلم براحة وأوصل المعلومة بشكل أبسط وأوضح وسهله وإحنا بقالنا مع بعض تقريبا 3 سنين وبعد فضل ربنا طبعا الفضل يرجع ليكم في جزء كبير من التطور ده وأكتر جملة فضلت فاكرها منكم وغيرت طريقة تفكيري فعلا:',
      '«يادوك انتي مش بتتكلمي قدام الكاميرا وخلاص إنتي بتوصلي معلومة لمريض مش مهم يبقى Patient عندك بس الامانه في المعلومه والسهوله في توصلها الي هتخلي الناس تثق فيكي وربنا يجزيكي عليها خير 🤍»',
      'الجملة دي خلتني أفكر بشكل مختلف في كل كلمة بقولها. شكرا على صبركم ومجهودكم معايا ومع كل الـTeam عندنا، بجد كل فرد عندكم بيعمل شغله باهتمام واضح وده شيء أنا بقدره جدا 💙💙',
    ],
  },
  {
    id: 'ddm-clinic',
    doctorName: 'DR. — DDM Clinic',
    clinicRole: 'Owner of DDM Clinic',
    clinicShort: 'DDM Clinic',
    highlightBadge: 'Custom Clinic Strategy',
    paragraphs: [
      'أنا دايمًا برشحكم بقوه لأي حد بيسألني 😂❤️ حتى لزمايلي اللي عندهم Clinics تانية',
      'اللي مميز فيكم بالنسبالي مش بس الشغل نفسه لكن طريقة تفكيركم.. بتسمعوا الأول تفهموا المشكلة وبعد كده تبدأوا تقترحوا حلول ومش بتتعاملوا مع كل الـClinics بنفس الطريقة ودا الي اكتشفته من نفسي مع دكتورة في Clinics تانية زميلتي 😂 فاستغربت ويمكن انتو متعرفوش حاجه زي دي بس انا بحترمكو جدا ❤️',
      'حتى في حاجات أنا كنت ببقي مصممة عليها كنتوا بتوضحولي ليه ممكن متكونش مناسبة لينا وده بصراحة خلاني أثق فيكم أكتر، حسيت إنكم فعلا بتفكروا في مصلحة الشغل مش مجرد إنكم تنفذوا وخلاص',
      'ربنا يوفقكم ويجازيكم خير على شغلكم 💙',
    ],
  },
  {
    id: 'mona-yasser',
    doctorName: 'DR.Mona Yasser',
    clinicRole: 'Owner of Pharmatex Clinic',
    clinicShort: 'Pharmatex Clinic',
    highlightBadge: 'Speed, System & Application',
    paragraphs: [
      'اللي عنده Clinic ومجربش يشتغل معاكم ففاته كتير فعلا',
      'أكتر حاجة فرقت معانا هي السرعة والتنظيم بقى عندنا طريقة واضحة في التعامل مع الـPatient وتسجيل كل حاجة والأسئلة اللي بتستخدموها والـApplication ساعدونا جدا إننا نوصل للمعلومة أسرع ومننساش تفاصيل مهمة',
      'ده غير الـMarketing والـMedia والـOperations اللي اشتغلتوا عليها معانا.. بصراحة حسيت إننا بقينا بنشتغل بطريقة مختلفة تماما ومنظمين ومرتاحين أكتر في الشغل',
      'بشكركم شخصيًا، وبشكركم كـClinic وTeam بالتوفيق دايمًا ❤️❤️',
    ],
  },
  {
    id: 'mohamed-salem',
    doctorName: 'DR.Mohamed SaleM',
    clinicRole: 'Owner of Sezima Clinic',
    clinicShort: 'Sezima Clinic',
    highlightBadge: 'Full System & Team Revival',
    paragraphs: [
      'هتكلم بصراحة أنا كنت متردد جدا قبل ما أتعاقد معاكم خصوصا بسبب تجارب قديمة مع شركات تانية خلتني أخاف أجرب تاني لكن بصراحة الشغل معاكم فرق معايا',
      'حتى طريقة التدريب نفسها خلتني أبدأ أبص للشغل بشكل مختلف، وبقيت أشوف حاجات مكنتش باخد بالي منها قبل كده حقيقي رجعتولي الحماس للشغل تاني 😂💙',
      'الـClinic والـTeam بتاعي والـSystem والـMarketing، كل حاجة بدأت تبقى منظمة أكتر وبتشتغل بسرعه فعلا',
      'برافو جدا على اللي بتعملوه 🤍',
    ],
  },
];

const THREE_PACKAGES = [
  {
    nameEn: 'Foundation',
    nameAr: 'منظومة التأسيس للعيادات',
    tagline: 'لعيادة تخصصية واحدة تبدأ هيكلة نظام النمو',
    popular: false,
    features: [
      'Growth Strategy & Medical Positioning',
      'Monthly Campaign & Content Planning',
      'Content Direction & Medical Scripts',
      'Paid Ads Campaign Management',
      'Lead Qualification Flow Setup',
      'Basic Performance Reporting',
      'Monthly Strategy Review',
    ],
    ctaLabel: 'اطلب تسعير Foundation بعد التشخيص',
  },
  {
    nameEn: 'Growth',
    nameAr: 'منظومة النمو المتكاملة',
    tagline: 'الأكثر اختياراً للعيادات والمراكز الباحثة عن نمو مستقر',
    popular: true,
    features: [
      'Everything in Foundation +',
      'Advanced Multi-Service Campaign Strategy',
      'Dedicated Landing Pages & Funnel Optimization',
      'Structured Follow-up & No-Show Reminder System',
      'Reception Conversion Scripts & Guidance',
      'Patient Communication System (Shavi Chatwoot Option)',
      'Bi-Weekly Conversion & ROI Reporting',
    ],
    ctaLabel: 'ابني نظام النمو لعيادتي',
  },
  {
    nameEn: 'Scale',
    nameAr: 'منظومة التوسع والمراكز الكبرى',
    tagline: 'للمراكز متعددة التخصصات والعيادات ذات الفروع',
    popular: false,
    features: [
      'Everything in Growth +',
      'Multi-Branch & Multi-Specialty Acquisition',
      'Full Shavi Chatwoot Omnichannel Deployment',
      'Reception & Call Center Team SLA Management',
      'Patient Retention & Database Reactivation',
      'Custom Executive Dashboards & Attribution',
      'Weekly Growth Board Consulting',
    ],
    ctaLabel: 'احجز استشارة التوسع (Scale)',
  },
];

const NINETY_DAY_CARDS = [
  {
    month: 'Month 01',
    titleEn: 'Understand & Build',
    titleAr: 'التشخيص وبناء البنية التحتية',
    items: ['Diagnosis & Funnel Audit', 'Medical Positioning', 'Strategy & Offers', 'Tracking & Landing Setup', 'Reception Foundation'],
  },
  {
    month: 'Month 02',
    titleEn: 'Launch & Optimize',
    titleAr: 'الإطلاق وضبط التأهيل والمتابعة',
    items: ['Targeted Campaigns', 'Authority Content', 'Lead Qualification Flow', 'Follow-up Sequences', 'A/B Testing'],
  },
  {
    month: 'Month 03',
    titleEn: 'Optimize & Scale',
    titleAr: 'التوسع وتعظيم العائد الدائم',
    items: ['Performance Review', 'Conversion Optimization', 'Budget Scaling', 'Patient Reactivation', 'Next Growth Opportunities'],
  },
];

export const ProofAndRoadmapSection: React.FC<ProofAndRoadmapSectionProps> = ({
  onOpenAuditModal,
}) => {
  const [activePlaybookFilter, setActivePlaybookFilter] = useState<string>('All');
  const [selectedPlaybook, setSelectedPlaybook] = useState<(typeof ACTION_PLAYBOOKS)[0] | null>(
    null
  );
  const [includeChatwootToggle, setIncludeChatwootToggle] = useState<boolean>(false);
  const [activeReviewModal, setActiveReviewModal] = useState<RealClientReview | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState<boolean>(false);
  const reviewsScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollReviews = (direction: 'prev' | 'next') => {
    const container = reviewsScrollRef.current;
    if (!container) return;
    const cardWidth = 370;
    // In RTL layout, scrolling left/right
    const delta = direction === 'next' ? -cardWidth : cardWidth;
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isCarouselPaused || activeReviewModal) return;
    const timer = window.setInterval(() => {
      const container = reviewsScrollRef.current;
      if (!container) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (Math.abs(container.scrollLeft) >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -370, behavior: 'smooth' });
      }
    }, 4800);
    return () => window.clearInterval(timer);
  }, [isCarouselPaused, activeReviewModal]);

  const filterCategories = [
    'All',
    'Campaigns',
    'Strategy',
    'Creatives',
    'Patient Journey',
    'Behind The System',
  ];

  const filteredPlaybooks =
    activePlaybookFilter === 'All'
      ? ACTION_PLAYBOOKS
      : ACTION_PLAYBOOKS.filter((p) => p.category === activePlaybookFilter);

  return (
    <div id="cases">
      {/* SECTION 1: REAL GROWTH STORIES — From Marketing Activity To Business Growth */}
      <section className="py-20 lg:py-24 bg-[#090B10] text-white border-b border-white/10 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 18% 30%, rgba(225, 29, 46, 0.22) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#FB7185] block">
                REAL GROWTH STORIES & DIAGNOSTIC BLUEPRINTS
              </span>
              <h2 className="font-en text-3xl sm:text-4xl font-extrabold text-white">
                From Marketing Activity To{' '}
                <span className="text-[#E11D2E]">Business Growth.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                نماذج تطبيقية توضح كيف نحول الإنفاق الإعلاني إلى نظام حجز قابل للقياس (بدون أرقام
                وهمية أو مبالغات غير أخلاقية):
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenAuditModal('real_growth_stories')}
              className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-3 bg-[#E11D2E] hover:bg-[#BE123C] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <span>اطلب دراسة حالة مشابهة لتخصصك</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES_CARDS.map((cs, idx) => (
              <div
                key={idx}
                className="bg-[#12151E] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#E11D2E]/50 transition-all"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cs.img}
                      alt={cs.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12151E] via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-en font-bold text-[#FB7185] border border-white/10">
                      NDA Anonymized Case
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-en text-base font-bold text-white">{cs.titleEn}</h3>
                      <p className="text-xs font-bold text-[#FB7185] mt-0.5">{cs.titleAr}</p>
                    </div>

                    <div className="space-y-2 text-xs text-[#CBD5E1]">
                      <p className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <strong className="text-white block mb-0.5">التحدي السابق:</strong>
                        {cs.problemAr}
                      </p>
                      <p className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <strong className="text-[#4ADE80] block mb-0.5">حل المنظومة:</strong>
                        {cs.interventionAr}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-white/10 grid grid-cols-2 gap-2" dir="ltr">
                  <div className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-center">
                    <span className="font-en text-[11px] font-bold text-[#4ADE80] block">
                      {cs.metric1}
                    </span>
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-center">
                    <span className="font-en text-[11px] font-bold text-[#FB7185] block">
                      {cs.metric2}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: See Shavi In Action (Interactive Playbook & Walkthrough Cards) */}
      <section className="py-20 lg:py-24 bg-white text-[#0F1117] border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#E11D2E] block">
                INSIDE THE GROWTH PROCESS
              </span>
              <h2 className="font-en text-3xl sm:text-4xl font-extrabold text-[#0F1117]">
                See Shavi In Action.
              </h2>
              <p className="text-base font-bold text-[#475569]">
                مش بس كلام… اضغط على أي مرحلة لتستعرض طريقة شغلنا من الداخل:
              </p>
            </div>

            {/* Category Filter Tabs matching reference mockup */}
            <div className="flex flex-wrap gap-2" dir="ltr">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActivePlaybookFilter(cat)}
                  className={`px-3.5 py-2 rounded-lg font-en text-xs font-bold transition-all cursor-pointer ${
                    activePlaybookFilter === cat
                      ? 'bg-[#E11D2E] text-white shadow-sm'
                      : 'bg-[#F8F9FB] text-[#475569] hover:text-[#0F1117] border border-[#E2E8F0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Visual Action Cards + 6th Audit Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {filteredPlaybooks.map((pb) => (
              <div
                key={pb.id}
                onClick={() => setSelectedPlaybook(pb)}
                className="group relative h-64 rounded-2xl overflow-hidden border border-[#E2E8F0] cursor-pointer shadow-sm"
              >
                <img
                  src={pb.img}
                  alt={pb.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-[#090B10]/45 to-transparent" />

                {/* Center Play / Inspect Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#E11D2E]/90 group-hover:bg-[#E11D2E] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 left-3 text-right">
                  <span className="font-en text-[10px] font-bold uppercase text-[#FB7185] block">
                    {pb.titleEn}
                  </span>
                  <span className="text-xs font-bold text-white block mt-0.5">{pb.titleAr}</span>
                </div>
              </div>
            ))}

            {/* 6th Card: Custom Audit Box matching reference mockup */}
            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-en text-xs font-bold text-[#E11D2E] block">
                  Custom Clinic Scope
                </span>
                <p className="font-en text-xs text-[#475569] leading-relaxed" dir="ltr">
                  Every clinic is different. Final scope and investment are determined after the
                  Growth Audit.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenAuditModal('see_shavi_in_action')}
                className="w-full py-2.5 px-4 bg-[#E11D2E] hover:bg-[#BE123C] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                تواصل معنا للتشخيص
              </button>
            </div>
          </div>

          {/* Interactive Playbook Preview Modal */}
          {selectedPlaybook && (
            <div className="bg-[#0F1117] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-en text-xs font-bold text-[#FB7185] uppercase">
                    {selectedPlaybook.titleEn}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {selectedPlaybook.titleAr}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPlaybook(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-[#CBD5E1] leading-relaxed">{selectedPlaybook.summary}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedPlaybook.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real Client Reviews Horizontal Carousel matching uploaded WhatsApp Review Cards */}
          <div
            className="pt-8 border-t border-[#E2E8F0] space-y-5"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FECDD3] mb-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#E11D2E]" />
                  <span className="font-en text-[11px] font-bold uppercase tracking-wider text-[#E11D2E]">
                    VERIFIED WHATSAPP CLIENT REVIEWS (7 REAL CLINICS)
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1117]">
                  آراء وريفيوهات حقيقية من أطباء ومؤسسي العيادات شركاء{' '}
                  <span className="font-en text-[#E11D2E]">Shavi</span>
                </h3>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] font-bold text-[#64748B] ml-2 hidden md:inline-block">
                  اسحب للجانب أو تنقل بين الآراء ({CLIENT_TESTIMONIALS.length})
                </span>
                <button
                  type="button"
                  onClick={() => scrollReviews('prev')}
                  aria-label="الريفيو السابق"
                  className="w-9 h-9 rounded-xl bg-[#F8F9FB] hover:bg-[#E11D2E] text-[#0F1117] hover:text-white border border-[#E2E8F0] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollReviews('next')}
                  aria-label="الريفيو التالي"
                  className="w-9 h-9 rounded-xl bg-[#0F1117] hover:bg-[#E11D2E] text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Compact Doctor Filter Pills for Quick Jump */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CLIENT_TESTIMONIALS.map((rev, idx) => (
                <button
                  key={rev.id}
                  type="button"
                  onClick={() => {
                    const container = reviewsScrollRef.current;
                    if (container) {
                      container.scrollTo({ left: -idx * 366, behavior: 'smooth' });
                    }
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-[#F8F9FB] hover:bg-[#FEF2F2] border border-[#E2E8F0] hover:border-[#FECDD3] text-[11px] font-en font-bold text-[#334155] hover:text-[#E11D2E] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                  <span>{rev.doctorName}</span>
                  <span className="text-[#94A3B8] font-normal">({rev.clinicShort})</span>
                </button>
              ))}
            </div>

            {/* Horizontal Scroll Strip — Compact Height so it doesn't bloat the page */}
            <div
              ref={reviewsScrollRef}
              className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {CLIENT_TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="w-[315px] sm:w-[355px] shrink-0 snap-start bg-white border-2 border-[#E2E8F0] hover:border-[#E11D2E]/60 rounded-2xl overflow-hidden shadow-[0_8px_28px_rgba(15,17,23,0.06)] flex flex-col justify-between transition-all group relative"
                >
                  {/* Top White Branded Header matching Uploaded Red & White Review Post */}
                  <div className="px-4 pt-3.5 pb-2.5 bg-white border-b border-[#F1F5F9] flex items-center justify-between gap-2" dir="ltr">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Verified Blue Double Check + Red-Ringed Avatar */}
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#990F1C] to-[#E11D2E] shadow-xs">
                          <div className="w-full h-full rounded-full bg-[#0F1117] text-white flex items-center justify-center font-en text-xs font-extrabold">
                            {item.doctorName.replace('DR.', '').trim().slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <span
                          className="absolute -bottom-0.5 -left-1 w-4 h-4 rounded-full bg-white shadow-2xs flex items-center justify-center"
                          title="Verified Client Review"
                        >
                          <CheckCheck className="w-3 h-3 text-[#38BDF8]" />
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-en text-sm font-black text-[#C8102E] truncate">
                            {item.doctorName}
                          </h4>
                          {item.hasWhatsAppBadge && (
                            <span className="px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] font-en text-[9px] font-bold">
                              WhatsApp
                            </span>
                          )}
                        </div>
                        <p className="font-en text-[11px] font-bold text-[#991B1B] truncate">
                          {item.clinicRole}
                        </p>
                        {/* 5 Crimson Stars */}
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {[...Array(5)].map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="w-2.5 h-2.5 fill-[#C8102E] text-[#C8102E]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Official Shavi Calligraphic Emblem on Top Right */}
                    <div className="shrink-0">
                      <ShaviLogo variant="dark" size="sm" showTagline={false} />
                    </div>
                  </div>

                  {/* Middle Dark WhatsApp Chat Container (Compact Fixed Height with internal scroll) */}
                  <div className="px-3 py-2.5 bg-white flex-1 flex flex-col">
                    <div
                      className="relative rounded-xl bg-[#181E22] text-white p-3.5 h-[195px] overflow-y-auto border border-[#2A3238] shadow-inner space-y-2 text-right"
                      dir="rtl"
                      style={{
                        backgroundImage:
                          'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 0)',
                        backgroundSize: '16px 16px',
                      }}
                    >
                      <div className="bg-[#222A30]/95 rounded-lg p-3 border border-white/5 space-y-2">
                        {item.paragraphs.map((para, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-[12px] sm:text-[12.5px] text-[#F1F5F9] leading-[1.65] font-medium"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Shavi "Thank U ❤️" Footer Bar matching Uploaded Review Images */}
                  <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#E2E8F0]/70 via-[#F8FAFC] to-[#E2E8F0]/70 border-t border-[#E2E8F0] flex items-center justify-between gap-2 relative">
                    <div className="text-right flex-1">
                      <p className="text-[10px] font-extrabold text-[#0F1117] leading-snug">
                        من كل فرد في <span className="font-en text-[#C8102E]">Shavi</span> ليك ولـ
                        <span className="font-en">Team</span> الـ
                        <span className="font-en">Clinic</span> عندك، شكرًا على ثقتكم فينا.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0" dir="ltr">
                      <span className="font-en text-xs font-black text-[#C8102E] tracking-tight flex items-center gap-0.5">
                        Thank U <span className="text-red-600">❤️</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveReviewModal(item)}
                        title="عرض الريفيو كاملاً"
                        className="p-1.5 rounded-lg bg-white hover:bg-[#C8102E] text-[#475569] hover:text-white border border-[#CBD5E1] transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Bottom Crimson Accent Bar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-t-full bg-[#8B0D18]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Full Review Lightbox Modal when user clicks Expand */}
            {activeReviewModal && (
              <div
                className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
                onClick={() => setActiveReviewModal(null)}
              >
                <div
                  className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border-2 border-[#E11D2E] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="px-5 py-4 bg-white border-b border-[#E2E8F0] flex items-center justify-between" dir="ltr">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#990F1C] to-[#E11D2E]">
                        <div className="w-full h-full rounded-full bg-[#0F1117] text-white flex items-center justify-center font-en text-xs font-extrabold">
                          {activeReviewModal.doctorName
                            .replace('DR.', '')
                            .trim()
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-en text-base font-black text-[#C8102E]">
                          {activeReviewModal.doctorName}
                        </h4>
                        <p className="font-en text-xs font-bold text-[#991B1B]">
                          {activeReviewModal.clinicRole}
                        </p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {[...Array(5)].map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="w-3 h-3 fill-[#C8102E] text-[#C8102E]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ShaviLogo variant="dark" size="sm" showTagline={false} />
                      <button
                        type="button"
                        onClick={() => setActiveReviewModal(null)}
                        className="p-2 rounded-xl bg-[#F1F5F9] hover:bg-[#E11D2E] text-[#0F1117] hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Modal WhatsApp Message Body */}
                  <div className="p-4 bg-white">
                    <div
                      className="rounded-2xl bg-[#181E22] text-white p-5 border border-[#2A3238] space-y-3 text-right max-h-[60vh] overflow-y-auto"
                      dir="rtl"
                    >
                      {activeReviewModal.paragraphs.map((para, i) => (
                        <p key={i} className="text-sm sm:text-base text-[#F8FAFC] leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="px-5 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                    <p className="text-xs font-bold text-[#0F1117]">
                      من كل فرد في <span className="font-en text-[#C8102E]">Shavi</span> ليك ولـ
                      <span className="font-en">Team</span> الـ
                      <span className="font-en">Clinic</span> عندك، شكرًا على ثقتكم فينا وعلى الرحلة اللي بنبنيها سوا.
                    </p>
                    <span className="font-en text-sm font-black text-[#C8102E] shrink-0 mr-3">
                      Thank U ❤️
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Choose Your Growth Package (Foundation / Growth / Scale) */}
      <section id="packages" className="py-20 lg:py-24 bg-[#F8F9FB] text-[#0F1117] border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#E11D2E] block">
                FLEXIBLE GROWTH PACKAGES
              </span>
              <h2 className="font-en text-3xl sm:text-4xl font-extrabold text-[#0F1117]">
                Choose Your Growth Package
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                تُخصص تفاصيل كل باقة بعد جلسة التشخيص وفقاً لتخصص العيادة، عدد الفروع، وحجم الفريق:
              </p>
            </div>

            {/* Optional Chatwoot Toggle */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
              <Sliders className="w-4 h-4 text-[#E11D2E]" />
              <span className="text-xs font-bold text-[#0F1117]">
                تضمين طبقة Shavi Chatwoot الاختيارية؟
              </span>
              <button
                type="button"
                onClick={() => setIncludeChatwootToggle(!includeChatwootToggle)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  includeChatwootToggle
                    ? 'bg-[#E11D2E] text-white'
                    : 'bg-[#F1F5F9] text-[#475569]'
                }`}
              >
                {includeChatwootToggle ? 'مفعّل (+Chatwoot)' : 'اختياري'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {THREE_PACKAGES.map((pkg) => (
              <div
                key={pkg.nameEn}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'bg-white border-2 border-[#E11D2E] shadow-[0_20px_50px_rgba(225,29,46,0.12)] relative'
                    : 'bg-white border border-[#E2E8F0] shadow-xs'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-6 px-3 py-1 rounded-full bg-[#0F1117] text-white font-en text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div className="space-y-5">
                  <div className="border-b border-[#F1F5F9] pb-4">
                    <h3 className="font-en text-2xl font-extrabold text-[#0F1117]">{pkg.nameEn}</h3>
                    <p className="text-sm font-bold text-[#E11D2E] mt-0.5">{pkg.nameAr}</p>
                    <p className="text-xs text-[#64748B] mt-1">{pkg.tagline}</p>
                  </div>

                  <ul className="space-y-3" dir="ltr">
                    {pkg.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-en text-[#334155] font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E11D2E] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {includeChatwootToggle && (
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm font-en text-[#E11D2E] font-bold bg-[#FEF2F2] p-2 rounded-lg">
                        <Sparkles className="w-4 h-4 text-[#E11D2E] shrink-0 mt-0.5" />
                        <span>+ Shavi Chatwoot Unified Inbox & Team Routing</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => onOpenAuditModal(`package_${pkg.nameEn.toLowerCase()}`)}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#E11D2E] hover:bg-[#BE123C] text-white shadow-md'
                        : 'bg-[#0F1117] hover:bg-[#E11D2E] text-white'
                    }`}
                  >
                    <span>{pkg.ctaLabel}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center font-en text-xs text-[#64748B]">
            Every clinic is different. Final scope and investment are determined after the Medical
            Growth Audit.
          </p>
        </div>
      </section>

      {/* SECTION 4: Dark 90-Day Roadmap Section matching bottom-middle of reference mockup */}
      <section
        id="roadmap"
        className="py-20 lg:py-24 bg-[#090B10] text-white border-b border-white/10 relative overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 80% 50%, rgba(225, 29, 46, 0.2) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-en text-xs font-bold tracking-[0.2em] uppercase text-[#FB7185] block">
              90-DAY IMPLEMENTATION ROADMAP
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-[1.3]">
              خلال <span className="text-[#E11D2E] font-mono-num">90</span> يوم نضع أساس قوي،
              نطلق، نحسن، ونبني نمو أوضح.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {NINETY_DAY_CARDS.map((card) => (
                <div
                  key={card.month}
                  className="bg-[#12151E] border border-white/10 rounded-2xl p-6 space-y-4"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E11D2E]/20 border border-[#E11D2E]/40 text-[#FB7185] font-en text-xs font-bold">
                    {card.month}
                  </span>
                  <div>
                    <h3 className="font-en text-lg font-extrabold text-white">{card.titleEn}</h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{card.titleAr}</p>
                  </div>
                  <ul className="space-y-2 pt-2 border-t border-white/10" dir="ltr">
                    {card.items.map((it, idx) => (
                      <li
                        key={idx}
                        className="font-en text-xs text-[#CBD5E1] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 bg-gradient-to-br from-[#E11D2E]/20 to-transparent border border-[#E11D2E]/40 rounded-2xl p-6 space-y-4 text-left" dir="ltr">
              <TrendingUp className="w-8 h-8 text-[#E11D2E]" />
              <p className="font-en text-lg font-extrabold text-white leading-snug">
                &ldquo;The goal isn&apos;t to launch more. It&apos;s to learn faster and{' '}
                <span className="text-[#FB7185]">grow smarter.</span>&rdquo;
              </p>
              <p className="text-xs text-[#CBD5E1] text-right" dir="rtl">
                هدفنا ليس مجرد إطلاق إعلانات أكثر، بل بناء نظام يتعلم ويتطور كل شهر ليضاعف حجوزاتك.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
