// ملف البيانات الثابتة - بديل Strapi
// Static Data File - Strapi Alternative

export const staticData = {
  // إعدادات عامة
  globalSettings: {
    siteName: {
      ar: "مدرسة السهم الفريد",
      en: "Al-Sahm Al-Fareed School"
    },
    logo: "/logo.png",
    contactInfo: {
      email: "alsahmalfareedinfo@gmail.com",
      phone: "091 3372084",
      address: {
        ar: "ليبيا - طرابلس - طريق المشتل",
        en: "Libya - Tripoli - Al-Mishtal Road"
      }
    },
    socialMedia: {
      facebook: "https://facebook.com/alsahmalfareed",
      twitter: "https://twitter.com/alsahmalfareed",
      instagram: "https://instagram.com/alsahmalfareed"
    }
  },

  // صفحة الشكاوى
  complaintPage: {
    ar: {
      badge: "الدعم والمتابعة",
      titlePart1: "صوتك يصلنا،",
      titleHighlight: " ونحن هنا للحل",
      subtitle: "نلتزم بمعالجة شكاوك واقتراحاتك بسرية تامة وإيجابية خلال 48 ساعة عمل. كل ملاحظة تساهم في تحسين تجربة أبنائكم.",
      info: {
        title: "قنوات التواصل المباشرة",
        description: "تواصل معنا عبر أي من القنوات التالية للحصول على رد سريع ومباشر من إدارة المدرسة.",
        emailLabel: "البريد الإلكتروني للشكاوى",
        emailValue: "alsahmalfareedinfo@gmail.com",
        phoneLabel: "الهاتف المباشر",
        phoneValue: "091 3372084",
        locationLabel: "مقر إدارة المدرسة",
        locationValue: "ليبيا - طرابلس - طريق المشتل",
        workingHoursLabel: "ساعات الدوام الرسمية",
        workingHoursValue: "الأحد إلى الخميس - 8:00 صباحاً حتى 2:00 ظهراً"
      },
      form: {
        title: "نموذج تقديم الشكوى",
        stepsTitle: "✅ آلية معالجة الشكاوى (4 خطوات)",
        submitBtn: "إرسال الشكوى وإنشاء رقم التذكرة",
        successMessage: "شكراً لك! تم استلام شكواك بنجاح.",
        errorMessage: "حدث خطأ أثناء إرسال الشكوى. يرجى التواصل مباشرة عبر الهاتف أو إعادة المحاولة لاحقاً."
      }
    },
    en: {
      badge: "Support & Feedback",
      titlePart1: "We hear",
      titleHighlight: "you, We solve",
      subtitle: "We are committed to addressing your complaints and suggestions with complete confidentiality and positivity within 48 business hours. Every feedback helps us improve.",
      info: {
        title: "Direct Contact Channels",
        description: "Reach out to us via any of the following channels for a quick and direct response from the school administration.",
        emailLabel: "Complaints Email",
        emailValue: "alsahmalfareedinfo@gmail.com",
        phoneLabel: "Direct Phone",
        phoneValue: "091 3372084",
        locationLabel: "School Administration",
        locationValue: "Libya - Tripoli - Al-Mishtal Road",
        workingHoursLabel: "Working Hours",
        workingHoursValue: "Sun to Thu — 8:00 AM to 2:00 PM"
      },
      form: {
        title: "Submit Your Complaint",
        stepsTitle: "✅ How we handle your feedback (4 steps)",
        submitBtn: "Submit Complaint & Generate Ticket",
        successMessage: "Thank you! Your complaint has been received successfully.",
        errorMessage: "An error occurred while sending your complaint. Please contact us by phone or try again later."
      }
    }
  },

  // صفحة الاتصال
  contactPage: {
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا للإجابة على استفساراتكم",
      email: "alsahmalfareedinfo@gmail.com",
      phone: "091 3372084",
      address: "ليبيا - طرابلس - طريق المشتل",
      workingHours: "الأحد إلى الخميس - 8:00 صباحاً حتى 2:00 ظهراً"
    },
    en: {
      title: "Contact Us",
      subtitle: "We're here to answer your questions",
      email: "alsahmalfareedinfo@gmail.com",
      phone: "091 3372084",
      address: "Libya - Tripoli - Al-Mishtal Road",
      workingHours: "Sun to Thu — 8:00 AM to 2:00 PM"
    }
  },

  // صفحة حول المدرسة
  aboutPage: {
    ar: {
      title: "عن المدرسة",
      vision: "رؤيتنا",
      visionText: "أن نكون منارة تعليمية رائدة في تقديم تعليم متميز يبني جيلاً واعياً ومبدعاً.",
      mission: "رسالتنا",
      missionText: "نلتزم بتوفير بيئة تعليمية محفزة تنمي قدرات الطلاب وتعزز قيم الإبداع والتفوق.",
      values: "قيمنا",
      valuesText: "التميز، الإبداع، الأمانة، الاحترام، التعاون"
    },
    en: {
      title: "About School",
      vision: "Our Vision",
      visionText: "To be a leading educational beacon providing distinguished education that builds a conscious and creative generation.",
      mission: "Our Mission",
      missionText: "We are committed to providing a stimulating educational environment that develops students' abilities and enhances the values of creativity and excellence.",
      values: "Our Values",
      valuesText: "Excellence, Creativity, Integrity, Respect, Cooperation"
    }
  },

  // الصفحة الرئيسية
  homePage: {
    hero: {
      ar: {
        badge: "مرحباً بكم",
        title: "مدرسة السهم الفريد",
        subtitle: "نبني المستقبل بالتعليم المتميز",
        cta: "اكتشف المزيد"
      },
      en: {
        badge: "Welcome",
        title: "Al-Sahm Al-Fareed School",
        subtitle: "Building the future with distinguished education",
        cta: "Discover More"
      }
    },
    stats: [
      { value: "500+", label: { ar: "طالب وطالبة", en: "Students" } },
      { value: "50+", label: { ar: "معلم ومعلمة", en: "Teachers" } },
      { value: "15+", label: { ar: "عاماً من التميز", en: "Years of Excellence" } },
      { value: "95%", label: { ar: "نسبة النجاح", en: "Success Rate" } }
    ]
  },

  // الأسئلة الشائعة
  faqs: {
    ar: [
      {
        question: "ما هي ساعات الدوام؟",
        answer: "ساعات الدوام من الأحد إلى الخميس من 8:00 صباحاً حتى 2:00 ظهراً."
      },
      {
        question: "كيف يمكنني التسجيل؟",
        answer: "يمكنك التسجيل بزيارة المدرسة أو التواصل معنا عبر الهاتف أو البريد الإلكتروني."
      },
      {
        question: "هل توفر المدرسة مواصلات؟",
        answer: "نعم، نوفر خدمة مواصلات آمنة ومريحة لجميع الطلاب."
      },
      {
        question: "ما هي الأنشطة اللاصفية؟",
        answer: "نوفر مجموعة متنوعة من الأنشطة الرياضية والثقافية والفنية."
      }
    ],
    en: [
      {
        question: "What are the working hours?",
        answer: "Working hours are Sunday to Thursday from 8:00 AM to 2:00 PM."
      },
      {
        question: "How can I register?",
        answer: "You can register by visiting the school or contacting us by phone or email."
      },
      {
        question: "Does the school provide transportation?",
        answer: "Yes, we provide safe and comfortable transportation service for all students."
      },
      {
        question: "What are the extracurricular activities?",
        answer: "We offer a variety of sports, cultural and artistic activities."
      }
    ]
  },

  // المشاريع (Projects)
  projects: []
};

// دوال مساعدة
export function getStaticData(key: string, locale: string = 'ar') {
  const keys = key.split('.');
  let result: any = staticData;
  
  for (const k of keys) {
    result = result?.[k];
  }
  
  if (result && typeof result === 'object' && (result.ar || result.en)) {
    return result[locale] || result.ar;
  }
  
  return result;
}

export function getComplaintPageData(locale: string = 'ar') {
  return staticData.complaintPage[locale as 'ar' | 'en'];
}

export function getContactData(locale: string = 'ar') {
  return staticData.contactPage[locale as 'ar' | 'en'];
}

export function getAboutData(locale: string = 'ar') {
  return staticData.aboutPage[locale as 'ar' | 'en'];
}

export function getHomeData(locale: string = 'ar') {
  return staticData.homePage;
}

export function getGlobalSettingsData() {
  return staticData.globalSettings;
}

export function getFAQsData(locale: string = 'ar') {
  return staticData.faqs[locale as 'ar' | 'en'];
}
