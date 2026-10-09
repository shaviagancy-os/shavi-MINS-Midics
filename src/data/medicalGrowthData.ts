export interface ProblemItem {
  id: string;
  number: string;
  titleAr: string;
  titleEn: string;
  symptom: string;
  impact: string;
  rootCause: string;
}

export interface SystemLayer {
  id: string;
  step: string;
  nameEn: string;
  nameAr: string;
  tagline: string;
  description: string;
  deliverables: string[];
  keyMetric: string;
  failureWithoutIt: string;
}

export interface ServiceComponentItem {
  id: string;
  code: string;
  titleEn: string;
  titleAr: string;
  description: string;
  outputs: string[];
}

export interface SpecialtyProfile {
  id: string;
  nameAr: string;
  nameEn: string;
  typicalBottleneck: string;
  patientJourneyInsight: string;
  shaviIntervention: string;
  highValueServices: string[];
  recommendedChatwootUse: string;
}

export interface ComparisonRow {
  criterion: string;
  traditionalAgency: string;
  shaviSystem: string;
}

export interface RoadmapMonth {
  month: string;
  phaseTitleEn: string;
  phaseTitleAr: string;
  summary: string;
  milestones: string[];
  expectedOutcome: string;
}

export interface FaqItem {
  id: string;
  objection: string;
  answer: string;
  executiveTakeaway: string;
}

export const PROBLEMS_DATA: ProblemItem[] = [
  {
    id: 'unqualified-leads',
    number: '01',
    titleAr: 'إعلانات تجلب رسائل كثيرة بدون حجوزات فعلية',
    titleEn: 'High Message Volume, Low Actual Bookings',
    symptom: 'دفتر الرسائل ممتلئ بالاستفسارات عن "بكام الكشف؟" أو "بكام الإجراء؟" ثم يختفي المريض تماماً.',
    impact: 'استنزاف وقت فريق الاستقبال وميزانية الإعلانات على شريحة غير مؤهلة أو باحثة عن الأرخص فقط.',
    rootCause: 'غياب بناء القيمة الطبية (Medical Positioning) وغياب فلترة المريض قبل دخوله للمحادثة.',
  },
  {
    id: 'weak-lead-quality',
    number: '02',
    titleAr: 'ضعف جودة الـLeads وعدم تطابقها مع خدماتك الأعلى ربحية',
    titleEn: 'Misaligned Lead Quality & Low-Margin Inquiries',
    symptom: 'العيادة تمتلك تجهيزات متقدمة وخدمات ذات قيمة عالية، لكن أغلب الاستفسارات تتركز على الكشف العادي أو العروض المخفضة.',
    impact: 'انخفاض متوسط العائد لكل مريض (Average Patient Value) وصعوبة تغطية تكاليف التشغيل والتسويق.',
    rootCause: 'الاعتماد على إعلانات الخصومات بدلاً من مسارات (Funnels) مخصصة لكل خدمة علاجية أو تجميلية.',
  },
  {
    id: 'delayed-response',
    number: '03',
    titleAr: 'تأخر الرد على المرضى المحتملين في اللحظة الحاسمة',
    titleEn: 'Slow First-Response Time & Missed Patient Intent',
    symptom: 'المريض يرسل استفساره مساءً أو أثناء انشغال الريسبشن في العيادة، ويتلقى رداً بعد ساعات.',
    impact: 'في القطاع الطبي، تأخر الرد أكثر من 10 دقائق يخفض احتمالية الحجز بنسبة تتجاوز 60% لصالح عيادة منافسة ردت فوراً.',
    rootCause: 'عدم وجود نظام استجابة أولية ذكي وتوزيع واضح للمحادثات بين فريق الحجز.',
  },
  {
    id: 'no-followup',
    number: '04',
    titleAr: 'غياب نظام Follow-up منظم للمترددين',
    titleEn: 'Zero Structured Follow-up for Undecided Patients',
    symptom: 'المريض يسأل عن تفاصيل الإجراء ويقول "هفكر وأرجعلكم"، ولا يتواصل معه أحد مرة أخرى.',
    impact: 'خسارة أكثر من 45% من الحجوزات المحتملة التي تحتاج فقط إلى متابعة طبية مطمئنة أو تذكير منظم.',
    rootCause: 'إدارة المحادثات بشكل عشوائي عبر الهواتف الشخصية بدون تصنيف (Tags) أو جدولة متابعة.',
  },
  {
    id: 'disconnected-marketing',
    number: '05',
    titleAr: 'انفصال التسويق عن الاستقبال والمبيعات داخل العيادة',
    titleEn: 'Disconnected Marketing & Reception Handoff',
    symptom: 'شركة التسويق تقول "بعتنالك 500 رسالة"، والعيادة تقول "محدش حجز"، ولا أحد يعرف أين المشكلة.',
    impact: 'تبادل الاتهامات بين التسويق والريسبشن مع استمرار نزيف الميزانية الشهرية دون تشخيص دقيق.',
    rootCause: 'انتهاء دور الوكالة التقليدية عند نقرة الإعلان وعدم تدريب أو هيكلة مسار التحويل داخل الاستقبال.',
  },
  {
    id: 'blind-roi',
    number: '06',
    titleAr: 'عدم وضوح العائد الحقيقي من الإعلانات (Blind ROI)',
    titleEn: 'No Visibility on Cost Per Show-Up & Case Value',
    symptom: 'التقارير الشهرية تعرض أرقام التفاعل والـReach والـClicks، بدون أي ربط بعدد المرضى الفعليين في العيادة.',
    impact: 'استحالة اتخاذ قرار علمي بزيادة الميزانية أو إيقاف الحملات غير المربحة.',
    rootCause: 'غياب تتبع مسار المريض الكامل من أول إعلان حتى إتمام الكشف أو الإجراء الطبي.',
  },
];

export const SYSTEM_LAYERS: SystemLayer[] = [
  {
    id: 'acquisition',
    step: '01',
    nameEn: 'Acquisition',
    nameAr: 'جذب الشريحة الصحيحة من المرضى',
    tagline: 'استهداف دقيق مبني على القيمة الطبية وليس حرق الأسعار',
    description:
      'نصمم الرسالة الطبية، الهوية الإعلانية، والحملات المدفوعة والمحتوى التخصصي لجذب المريض الذي يبحث عن الكفاءة الطبية والنتيجة الآمنة، وليس الباحث عن أرخص عرض.',
    deliverables: [
      'صياغة الـMedical Positioning وهيكلة العروض العلاجية عالية القيمة',
      'إدارة حملات Meta & Google & TikTok الموجهة حسب كل تخصص وإجراء',
      'توجيه المحتوى الطبي المرئي (Educational & Authority Content Direction)',
    ],
    keyMetric: 'Cost Per High-Intent Inquiry (تكلفة الاستفسار الجاد)',
    failureWithoutIt: 'بدون هذه الطبقة: رسائل عشوائية تستنزف وقت الاستقبال بدون نية حقيقية للحجز.',
  },
  {
    id: 'qualification',
    step: '02',
    nameEn: 'Qualification',
    nameAr: 'فلترة وتأهيل الـLeads قبل إرهاق فريقك',
    tagline: 'تمييز المريض الجاد وتحديد حالته واحتياجه بدقة',
    description:
      'بدلاً من تحويل كل نقرة إلى محادثة فوضوية، نبني مسار تأهيل ذكي يجمع البيانات الأساسية (نوع الإجراء، مدى الاستعجال، الفرع المناسب) ليعرف فريق الحجز كيف يتعامل مع كل حالة.',
    deliverables: [
      'صفحات هبوط طبية متخصصة لكل خدمة (Service-Specific Landing Funnels)',
      'أسئلة تأهيل ذكية (Lead Qualification Flows) عبر الفورم أو واتساب',
      'تصنيف تلقائي للعملاء المحتملين حسب القيمة والأولوية (Hot / Warm / Cold)',
    ],
    keyMetric: 'Qualified Lead Ratio (نسبة العملاء المؤهلين للحجز)',
    failureWithoutIt: 'بدون هذه الطبقة: يعامل موظف الحجز مريض زراعة الأسنان أو التجميل المتقدم بنفس طريقة الاستفسار العام.',
  },
  {
    id: 'followup',
    step: '03',
    nameEn: 'Follow-up',
    nameAr: 'متابعة منظمة تمنع ضياع المرضى المترددين',
    tagline: 'المريض الطبي يحتاج طمأنة ومتابعة قبل اتخاذ قرار الحجز',
    description:
      'أغلب القرارات الطبية والتجميلية لا تتم في أول دقيقة. نبني تسلسلات متابعة وتذكير مدروسة تحول المترددين إلى حجوزات مؤكدة وتقلل نسبة عدم الحضور (No-Show).',
    deliverables: [
      'مسارات متابعة منظمة للحالات التي لم تكمل الحجز خلال 24 و72 ساعة',
      'رسائل تثقيفية وبناء ثقة تعالج مخاوف المريض قبل الإجراء',
      'تذكيرات ما قبل الموعد لتقليل نسبة الـNo-Show ورفع الالتزام بالحضور',
    ],
    keyMetric: 'Follow-up Recovery Rate & Show-up Rate (معدل استعادة الحجوزات والحضور)',
    failureWithoutIt: 'بدون هذه الطبقة: أكثر من نصف ميزانيتك الإعلانية يضيع في محادثات مفتوحة لم يتابعها أحد.',
  },
  {
    id: 'conversion',
    step: '04',
    nameEn: 'Conversion',
    nameAr: 'تحويل الاستفسار إلى حجز فعلي داخل العيادة',
    tagline: 'ربط التسويق بفريق الاستقبال والمبيعات الطبية',
    description:
      'نحن لا نتركك عند إرسال الـLead. نضع أدلة وسيناريوهات واضحة لفريق الريسبشن والكول سنتر لكيفية الرد على اعتراضات السعر، تقديم القيمة الطبية، وإغلاق الحجز باحترافية.',
    deliverables: [
      'أدلة وسكريبتات التحويل الطبي لفريق الاستقبال (Reception & Booking Playbooks)',
      'تحديد معايير سرعة الاستجابة (Response Time SLA) ومراقبة جودة الردود',
      'تقارير أسبوعية وشهرية تربط الإنفاق الإعلاني بعدد الحجوزات الفعلية',
    ],
    keyMetric: 'Lead-to-Booking & Show-up Conversion Rate (معدل التحويل الفعلي للعيادة)',
    failureWithoutIt: 'بدون هذه الطبقة: حملات إعلانية ممتازة تفشل عند أول مكالمة أو رسالة مع موظف غير مدرب.',
  },
  {
    id: 'retention',
    step: '05',
    nameEn: 'Retention',
    nameAr: 'إعادة تفعيل المرضى ومضاعفة القيمة الدائمة',
    tagline: 'النمو المستدام يأتي من قاعدة مرضاك الحاليين بجانب الجدد',
    description:
      'تكلفة استقطاب مريض جديد أعلى بـ 5 أضعاف من إعادة تفعيل مريض زار عيادتك سابقاً. نبني مسارات متابعة بعد الخدمة، إعادة حجز الجلسات الدورية، وتحفيز الترشيحات.',
    deliverables: [
      'حملات إعادة تفعيل قواعد البيانات السابقة (Patient Reactivation Campaigns)',
      'مسارات المتابعة الدورية للجلسات التكميلية والفحوصات الموسمية',
      'نظام جمع التقييمات وبناء السمعة الطبية الموثوقة (Ethical Reputation Loop)',
    ],
    keyMetric: 'Patient Lifetime Value - LTV (القيمة الدائمة للمريض)',
    failureWithoutIt: 'بدون هذه الطبقة: تضطر العيادة للبدء من الصفر كل شهر وكأنها تفتح لأول مرة.',
  },
];

export const SERVICE_COMPONENTS: ServiceComponentItem[] = [
  {
    id: 'positioning',
    code: 'SYS-01',
    titleEn: 'Medical Positioning & Offer Structure',
    titleAr: 'التموضع الطبي وهيكلة العروض العلاجية',
    description:
      'تحليل نقاط القوة التنافسية للعيادة أو الطبيب وصياغة باقات وخدمات واضحة تبرز القيمة الطبية دون اللجوء لحرق الأسعار.',
    outputs: ['خريطة الخدمات الأعلى ربحية', 'صياغة الـValue Proposition الطبي', 'هيكلة عروض الاستشارة والفحص'],
  },
  {
    id: 'paid-ads',
    code: 'SYS-02',
    titleEn: 'Paid Ads Management',
    titleAr: 'إدارة الحملات الإعلانية الموجهة',
    description:
      'تخطيط وإدارة حملات Meta وGoogle Search وTikTok بهيكلة دقيقة تفصل بين خدمات العيادة المختلفة وتخاطب نية البحث والشراء.',
    outputs: ['حملات مخصصة لكل إجراء طبي', 'إعادة استهداف (Retargeting) للمترددين', 'ضبط الميزانيات حسب العائد الفعلي'],
  },
  {
    id: 'content-direction',
    code: 'SYS-03',
    titleEn: 'Content Direction',
    titleAr: 'توجيه المحتوى الطبي وبناء الثقة',
    description:
      'إعداد خطة المحتوى والـScripts الطبية التي تظهر خبرة الطبيب وتجيب عن مخاوف المريض قبل أن يسأل عن السعر.',
    outputs: ['أدلة تصوير Reels/Videos للأطباء', 'محتوى تفكيك الاعتراضات الطبية', 'إشراف كامل على الهوية البصرية'],
  },
  {
    id: 'landing-funnels',
    code: 'SYS-04',
    titleEn: 'Landing Pages & Funnel Structure',
    titleAr: 'صفحات الهبوط وهندسة مسار المريض',
    description:
      'بناء صفحات مخصصة عالية التحويل لكل خدمة طبية بدلاً من التوجيه العشوائي لصفحات السوشيال ميديا المزدحمة.',
    outputs: ['صفحات مخصصة للخدمات الكبرى', 'ربط مباشر مع أنظمة التتبع', 'تجربة سريعة متوافقة مع الموبايل'],
  },
  {
    id: 'qualification-flow',
    code: 'SYS-05',
    titleEn: 'Lead Qualification Flow',
    titleAr: 'مسار فلترة وتأهيل العملاء المحتملين',
    description:
      'تصميم خطوات ذكية تفرز الاستفسارات حسب نوع الخدمة، الميزانية المتوقعة، والجدية قبل تحويلها لفريق الحجز.',
    outputs: ['نماذج تأهيل تفاعلية', 'تصفية الرسائل غير الجادة', 'توجيه كل حالة للقسم المختص'],
  },
  {
    id: 'followup-sequences',
    code: 'SYS-06',
    titleEn: 'Follow-up & Reminder Sequences',
    titleAr: 'تسلسلات المتابعة وتأكيد المواعيد',
    description:
      'نظام متابعة منظم للمرضى الذين استفسروا ولم يحجزوا، بالإضافة إلى تذكيرات قبل الموعد لرفع نسبة الحضور.',
    outputs: ['جدول متابعة الـLeads المفتوحة', 'رسائل تقليل الـNo-Show', 'إعادة تفعيل الحالات المؤجلة'],
  },
  {
    id: 'reporting',
    code: 'SYS-07',
    titleEn: 'Weekly & Monthly Performance Reporting',
    titleAr: 'تقارير الأداء والنمو الأسبوعية والشهرية',
    description:
      'لوحة قياس واضحة تربط بين الإنفاق الإعلاني، جودة الـLeads، سرعة رد الاستقبال، وعدد الحجوزات الفعلية.',
    outputs: ['تقرير أسبوعي لمعدلات التحويل', 'تحليل تكلفة الحجز الفعلي', 'توصيات تحسين مستمرة'],
  },
  {
    id: 'handoff-guidance',
    code: 'SYS-08',
    titleEn: 'Reception / Sales Handoff Guidance',
    titleAr: 'توجيه وتطوير أداء فريق الاستقبال والحجز',
    description:
      'تزويد فريق الريسبشن والكول سنتر بسيناريوهات الرد الطبي الاحترافي وتحويل الاستفسارات السعرية إلى مواعيد مؤكدة.',
    outputs: ['سكريبتات الرد على "بكام؟"', 'معايير جودة المكالمات والرسائل', 'مراجعة دورية لأداء التحويل'],
  },
];

export const SPECIALTIES_DATA: SpecialtyProfile[] = [
  {
    id: 'dental',
    nameAr: 'عيادات ومراكز الأسنان',
    nameEn: 'Dental Clinics & Centers',
    typicalBottleneck:
      'تركز أغلب الرسائل على "سعر التركيبات أو التبييض" مع تردد كبير في اتخاذ قرار زراعة الأسنان أو هوليود سمايل.',
    patientJourneyInsight:
      'مريض الأسنان التجميلي والجراحي يحتاج إلى رؤية حالات مشابهة، فهم خطة العلاج بدون ألم، وجلسة تشخيص واضحة قبل الحسم.',
    shaviIntervention:
      'فصل مسارات الخدمات العادية عن مسارات (Implants / Veneers / Orthodontics) مع تأهيل المريض وبناء متابعة تقلل إلغاء المواعيد.',
    highValueServices: ['زراعة الأسنان الفورية', 'تجميل الابتسامة (Veneers)', 'التقويم الشفاف والجراحي'],
    recommendedChatwootUse:
      'توزيع محادثات الزراعة والتقويم على منسق علاج مختص بدلاً من الريسبشن العام.',
  },
  {
    id: 'derma-aesthetic',
    nameAr: 'عيادات الجلدية والتجميل والليزر',
    nameEn: 'Dermatology & Aesthetic Clinics',
    typicalBottleneck:
      'المنافسة السعرية الشرسة في عروض الليزر والفيلر، وضياع المريضات بين مئات الرسائل اليومية غير المصنفة.',
    patientJourneyInsight:
      'في التجميل والجلدية، الربحية الحقيقية تأتي من الباقات العلاجية المتكاملة وإعادة الحجز الدوري (Retention) وليس الجلسة الواحدة.',
    shaviIntervention:
      'هيكلة عروض مبنية على النتيجة العلاجية، بناء نظام متابعة للجلسات الدورية، ورفع معدل التحويل للخدمات الأعلى هامش ربح.',
    highValueServices: ['الحقن التجميلي المتقدم (Filler/Botox)', 'برامج نضارة وعلاج البشرة', 'باقات الليزر الموسمية'],
    recommendedChatwootUse:
      'تصنيف المريضات حسب نوع الإجراء وجدولة تذكيرات تلقائية لمواعيد الجلسات القادمة.',
  },
  {
    id: 'plastic-surgery',
    nameAr: 'جراحات التجميل وتنسيق القوام',
    nameEn: 'Plastic Surgery Practices',
    typicalBottleneck:
      'دورة قرار طويلة جداً؛ المريض يتواصل مع 4 أو 5 جراحين ويحتاج ثقة عالية جداً وخصوصية كاملة قبل حجز الاستشارة.',
    patientJourneyInsight:
      'المريض هنا لا يشتري بإعلان سطحي؛ هو يبحث عن الأمان الطبي، خبرة الجراح، والمتابعة الدقيقة من منسق الجراحات.',
    shaviIntervention:
      'بناء Funnel استشاري راقٍ يفلتر الحالات الجادة، مع نظام متابعة طويل المدى لمنسقي الجراحات (Patient Coordinators).',
    highValueServices: ['عمليات تنسيق القوام والنحت', 'جراحات الوجه والأنف', 'جراحات الثدي والترميم'],
    recommendedChatwootUse:
      'ملف محادثة موحد وسري لكل حالة جراحية يربط بين الاستفسار الأول، الاستشارة، ومتابعة ما قبل العملية.',
  },
  {
    id: 'ivf-fertility',
    nameAr: 'مراكز الخصوبة والحقن المجهري',
    nameEn: 'Fertility / IVF & OB-GYN Centers',
    typicalBottleneck:
      'حساسية الحالة النفسية والطبية للأزواج، والحاجة إلى ردود علمية مطمئنة وسريعة دون شعور بالتعامل التجاري.',
    patientJourneyInsight:
      'قرار اختيار مركز الحقن المجهري يعتمد على الثقة في نسب النجاح الواقعية، الرعاية الإنسانية، ووضوح خطوات البروتوكول العلاجي.',
    shaviIntervention:
      'تصميم مسارات محتوى تثقيفي وتأهيل أولي يحترم خصوصية الزوجين، مع تدريب فريق التنسيق الطبي على الاستجابة الاحترافية.',
    highValueServices: ['برامج الحقن المجهري (ICSI/IVF)', 'تأخر الإنجاب الوراثي', 'متابعة الحمل الحرج'],
    recommendedChatwootUse:
      'توجيه الحالات الحرجة مباشرة للأطباء المساعدين أو منسقي الخصوبة مع تتبع دقيق لكل مرحلة.',
  },
  {
    id: 'multi-specialty',
    nameAr: 'المراكز الطبية متعددة التخصصات',
    nameEn: 'Multi-Specialty Medical Centers',
    typicalBottleneck:
      'تشتت الميزانية التسويقية بين عشرات العيادات الداخلية، وازدحام الكول سنتر باستفسارات غير موجهة للقسم الصحيح.',
    patientJourneyInsight:
      'المركز الطبي يحتاج إلى تحديد 3-4 تخصصات قاطرة للنمو (Growth Drivers) ثم عمل Cross-selling لباقي العيادات الداخلية.',
    shaviIntervention:
      'إعادة هيكلة الميزانية على التخصصات الأعلى عائداً، وبناء نظام توجيه مركزي يقيس أداء كل عيادة داخل المركز بشكل مستقل.',
    highValueServices: ['الفحوصات الشاملة', 'عيادات التخصصات الدقيقة', 'وحدات العلاج الطبيعي والتأهيل'],
    recommendedChatwootUse:
      'حاسِم جداً للمراكز: Inbox موحد يوزع رسائل الأسنان، الجلدية، والباطنة على كل موظف مختص بتقارير منفصلة.',
  },
  {
    id: 'specialized-private',
    nameAr: 'العيادات التخصصية الخاصة (عظام، عيون، سمنة)',
    nameEn: 'Specialized Private Clinics (Ortho, Eye, Bariatric)',
    typicalBottleneck:
      'الاعتماد الكامل على الإحالات التقليدية فقط، أو تشغيل إعلانات لا تعكس المكانة العلمية للاستشاري.',
    patientJourneyInsight:
      'المريض الذي يبحث عن عملية ليزك، منظار مفاصل، أو جراحة سمنة يريد التأكد من تشخيص حالته بدقة قبل اتخاذ الخطوة.',
    shaviIntervention:
      'بناء حضور رقمي يليق بمكانة الاستشاري، مع مسار تقييم أولي للحالة يحول الباحثين عن الحل الجذري إلى حجوزات فعلية.',
    highValueServices: ['جراحات السمنة والمناظير', 'تصحيح الإبصار والعيون', 'جراحات العظام والعمود الفقري'],
    recommendedChatwootUse:
      'تنظيم إرسال الفحوصات والأشعات الأولية عبر الواتساب وربطها بملف المريض قبل موعد الاستشارة.',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: 'الهدف الأساسي (Core Objective)',
    traditionalAgency: 'تسليم عدد بوستات وفيديوهات وإطلاق إعلانات لجمع أكبر عدد من الرسائل الرخيصة.',
    shaviSystem: 'بناء منظومة نمو كاملة تقاس بجودة الـLeads، معدل التحويل للحجز، والعائد الفعلي للعيادة.',
  },
  {
    criterion: 'التعامل مع جودة الـLeads',
    traditionalAgency: 'أي رسالة تعتبر "Lead ناجح" حتى لو كان السائل يبحث عن خدمة غير موجودة أو سعر غير منطقي.',
    shaviSystem: 'بناء طبقة Qualification تفرز المريض الجاد وتوجهه للخدمة المناسبة قبل استهلاك وقت الاستقبال.',
  },
  {
    criterion: 'العلاقة مع فريق الاستقبال (Reception)',
    traditionalAgency: 'انفصال تام؛ ينتهي دور الوكالة عند نقرة الإعلان وتبدأشكوى "الريسبشن مش بيعرف يبيع".',
    shaviSystem: 'توجيه عملي لفريق الحجز، سكريبتات الرد على الاعتراضات، وضبط معايير سرعة وجودة الاستجابة.',
  },
  {
    criterion: 'متابعة المرضى المترددين (Follow-up)',
    traditionalAgency: 'لا يوجد؛ الرسالة التي لا تحجز من أول مرة تضيع للأبد وسط مئات المحادثات.',
    shaviSystem: 'تسلسلات متابعة منظمة (Follow-up & Reminder Flows) لاستعادة الحجوزات وتقليل الـNo-Show.',
  },
  {
    criterion: 'تقارير الأداء (Reporting)',
    traditionalAgency: 'تقارير شكلية تركز على الـReach, Impressions, Likes وتكلفة الرسالة فقط.',
    shaviSystem: 'تقارير تنفيذية تربط الإنفاق الإعلاني بعدد العملاء المؤهلين، سرعة الرد، ومعدلات الحجز.',
  },
  {
    criterion: 'البنية التقنية وإدارة المحادثات',
    traditionalAgency: 'ترك العيادة تدير مئات الرسائل عشوائياً من هاتف واحد بدون أي تتبع أو رقابة.',
    shaviSystem: 'إمكانية تفعيل طبقة Shavi Chatwoot الاختيارية لتوحيد القنوات ومراقبة أداء الفريق لحظياً.',
  },
];

export const ROADMAP_MONTHS: RoadmapMonth[] = [
  {
    month: 'الشهر الأول — Month 01',
    phaseTitleEn: 'Audit, Positioning, Funnel & Tracking Setup',
    phaseTitleAr: 'التشخيص، ضبط التموضع الطبي، وبناء البنية التحتية للتتبع',
    summary:
      'لا نطلق إعلانات عشوائية من اليوم الأول. نبدأ بتشخيص أين تتسرب الحجوزات حالياً، نحدد الخدمات الأعلى ربحية، ونبني مسار التحويل والتتبع.',
    milestones: [
      'إجراء تشخيص شامل للحملات الحالية، صفحات السوشيال، وأداء فريق الاستقبال (Full Growth Audit)',
      'تحديد الـMedical Positioning وهيكلة العروض والخدمات ذات الأولوية القصوى للعيادة',
      'تجهيز صفحات الهبوط، نماذج التأهيل (Qualification Flows)، وربط أنظمة التتبع (GA4 / Pixels)',
      'إعداد أدلة الرد التحويلي لفريق الحجز (وإعداد Shavi Chatwoot في حال اختياره)',
    ],
    expectedOutcome: 'منظومة جاهزة للعمل بوضوح تام، بدون ثغرات تسريب في رحلة المريض.',
  },
  {
    month: 'الشهر الثاني — Month 02',
    phaseTitleEn: 'Launch, Testing, Qualification & Follow-up Optimization',
    phaseTitleAr: 'الإطلاق، الاختبار المنهجي، وتحسين التأهيل والمتابعة',
    summary:
      'نطلق الحملات الموجهة والمحتوى الطبي، ونراقب رحلة الـLead لحظة بلحظة من أول نقرة حتى رد موظف الاستقبال.',
    milestones: [
      'إطلاق الحملات الإعلانية المقسمة حسب الخدمات الطبية والشرائح المستهدفة',
      'مراقبة جودة الـLeads الواردة وتعديل أسئلة الفلترة لرفع نسبة الحالات الجادة',
      'تفعيل تسلسلات الـFollow-up للحالات المترددة وتذكيرات المواعيد لتقليل الـNo-Show',
      'مراجعة أسبوعية لأداء فريق الحجز ومعالجة أي اختناقات في سرعة أو طريقة الرد',
    ],
    expectedOutcome: 'ارتفاع ملموس في جودة الاستفسارات وانتظام عملية المتابعة والتحويل داخل العيادة.',
  },
  {
    month: 'الشهر الثالث — Month 03',
    phaseTitleEn: 'Scaling, Retention, Reactivation & System Refinement',
    phaseTitleAr: 'التوسع المدروس، إعادة تفعيل المرضى، وتعظيم العائد',
    summary:
      'بعد ثبات معدلات التحويل ومعرفة تكلفة الحجز الفعلي لكل خدمة، نضاعف التركيز على القنوات الرابحة ونفعل قاعدة بيانات المرضى.',
    milestones: [
      'توسيع الميزانية الإعلانية (Scaling) على الخدمات والحملات ذات العائد الأعلى للعيادة',
      'إطلاق حملات إعادة تفعيل المرضى السابقين (Reactivation) للجلسات الدورية والخدمات التكميلية',
      'تحسين القيمة الدائمة للمريض (Patient LTV) وبناء مسار ترشيحات وتقييمات موثوقة',
      'تسليم تقرير ربع سنوي استراتيجي يوضح أرقام النمو وخطة التوسع للمرحلة التالية',
    ],
    expectedOutcome: 'نظام نمو طبي مستقر وقابل للتوسع (Predictable & Scalable Medical Growth System).',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'have-agency',
    objection: 'أنا عندي Marketing Agency بالفعل.',
    answer:
      'Shavi لا تبدأ من فرضية أنك محتاج تنقل كل شيء. نبدأ بتشخيص النظام الحالي ونحدد أين توجد فرصة النمو — سواء كانت الفجوة في التموضع الطبي، جودة تأهيل الـLeads، أو ما يحدث بعد وصول الرسالة إلى فريق الاستقبال.',
    executiveTakeaway: 'Diagnosis First: نشخص الفجوة أولاً ولا نفرض استبدال كل شيء بدون مبرر رقمي.',
  },
  {
    id: 'have-leads',
    objection: 'أنا عندي Leads بالفعل ومش محتاج رسائل أكثر.',
    answer:
      'ممكن تكون المشكلة في الـQualification أو الـFollow-up أو الـConversion داخل الاستقبال، وليس الـAcquisition فقط. كثرة الرسائل غير المؤهلة عبء تشغيلي؛ دورنا هنا هو تحويل التدفق الحالي إلى حجوزات فعلية ورفع العائد من كل مريض.',
    executiveTakeaway: 'Conversion Optimization: نعالج تسريب الحجوزات بعد وصول الرسالة.',
  },
  {
    id: 'no-chatwoot',
    objection: 'أنا مش محتاج Chatwoot حالياً.',
    answer:
      'Chatwoot اختياري تماماً (Optional Add-on). العرض الأساسي لدينا هو منظومة النمو الطبي (Medical Growth System) التي تشمل التموضع، الإعلانات، المحتوى، مسارات التأهيل، وتطوير التحويل. نقترح تفعيل Chatwoot فقط عندما يكون لديك ضغط رسائل وتعدد موظفين يحتاج إلى ضبط.',
    executiveTakeaway: 'Modular Architecture: المنظومة الأساسية تعمل بكفاءة كاملة، وChatwoot طبقة ذكية اختيارية.',
  },
  {
    id: 'guarantee-patients',
    objection: 'هل تضمنوا عدد معين من المرضى كل شهر؟',
    answer:
      'No. We don’t guarantee an artificial number. We build, measure and optimize the growth system. أي جهة تعدك برقم ثابت ومصطنع من المرضى قبل فحص تخصصك، تسعيرك، الطاقة الاستيعابية لعيادتك، وأداء فريق الاستقبال إما تبالغ أو تجلب لك استفسارات وهمية رخيصة.',
    executiveTakeaway: 'Ethical Transparency: نلتزم ببناء وقياس وتحسين منظومة النمو بأرقام حقيقية وشفافة.',
  },
  {
    id: 'doctor-time',
    objection: 'وقت الأطباء والإدارة ضيق جداً، كم سيستغرق التعاون من وقتنا؟',
    answer:
      'صممنا المنظومة لتخفيف العبء عن الطبيب والمدير التنفيذي وليس زيادته. نحتاج منك جلسة التشخيص والتخطيط الأولى، وموافقة سريعة على التوجه الطبي، ثم نتولى التنفيذ الكامل مع تقارير تنفيذية مركزة وواضحة.',
    executiveTakeaway: 'Executive Efficiency: تنفيذ متكامل يوفر وقت الطبيب للعمل الإكلينيكي وإدارة العيادة.',
  },
];
