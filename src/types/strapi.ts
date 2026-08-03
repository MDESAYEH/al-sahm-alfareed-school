export interface StrapiMedia {
  id?: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: any;
}

export interface StrapiProject {
  id: number;
  Title: string;
  Description: string;
  Category: "web" | "cyber" | "cloud";
  Size: "small" | "medium" | "large";
  Slug: string;
  Thumbnail: StrapiMedia | any;
  Gallery?: StrapiMedia[] | any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiService {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  cover: StrapiMedia | any;
  order: number;
  content?: string;
  locale: string;
}

export interface StrapiPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  cover: StrapiMedia | any;
  content: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiPartner {
  id: number;
  name: string;
  logo: StrapiMedia | any;
  url?: string;
  order: number;
  locale: string;
}

export interface StrapiHeroScene {
  id: number;
  key?: string;
  kicker: string;
  eyebrow: string;
  title: string;
  desc: string;
  tags: string[];
  background: StrapiMedia | any;
}

export interface StrapiHome {
  heroBadge: string;
  heroBackgroundVideo: StrapiMedia | any;
  heroBackgroundImage: StrapiMedia | any;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroScenes: StrapiHeroScene[];
  servicesKicker: string;
  servicesTitle: string;
  servicesSubtitle: string;
  aboutPanelTitle: string;
  aboutPanelDesc: string;
  aboutPoints: string[];
  aboutImage: StrapiMedia | any;
  techKicker: string;
  techTitle: string;
  techSubtitle: string;
  aboutMetricProjectsValue?: string;
  aboutMetricExpertsValue?: string;
  aboutMetricYearsValue?: string;
  aboutMetricSolutionsValue?: string;
}

export interface StrapiFAQ {
  id: number;
  Question: string;
  Answer: string;
  Order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiAboutPage {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  philosophyTitle: string;
  philosophySubtitle: string;
  values: Array<{
    id: number;
    title: string;
    desc: string;
    icon: string;
  }>;
  ctaTitlePart1: string;
  ctaTitleHighlight: string;
  ctaDescription: string;
  ctaPrimaryBtn: string;
  ctaSecondaryBtn: string;
}

export interface StrapiContactPage {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  infoTitle: string;
  infoDesc: string;
  emailLabel: string;
  emailValue: string;
  phoneLabel: string;
  phoneValue: string;
  locationLabel: string;
  locationValue: string;
  formTitle: string;
  nameLabel: string;
  placeholderName: string;
  placeholderEmail: string;
  subjectLabel: string;
  placeholderSubject: string;
  messageLabel: string;
  placeholderMessage: string;
  sendBtn: string;
}

export interface StrapiComplaintPage {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  infoTitle: string;
  infoDesc: string;
  emailLabel: string;
  emailValue: string;
  phoneLabel: string;
  phoneValue: string;
  locationLabel: string;
  locationValue: string;
  workingHoursLabel: string;
  workingHoursValue: string;
  formTitle: string;
  stepsTitle: string;
  submitBtn: string;
  successMessage: string;
  errorMessage: string;
}

export interface StrapiServicesPage {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  capabilitiesTitle: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: Array<{
    id: number;
    step: string;
    title: string;
    desc: string;
    icon: string;
  }>;
  ctaTitle: string;
  ctaFeatures: string[];
  ctaBtn: string;
}

export interface StrapiGlobalSetting {
  footerDescription: string;
  location: string;
  phone: string;
  email: string;
  copyright: string;
  socialLinks: Array<{
    id: number;
    name: string;
    url: string;
    icon: string;
  }>;
  siteName: string;
  siteLogoDark: StrapiMedia | any;
  siteLogoLight: StrapiMedia | any;
}

export interface StrapiResponse<T> {
  data: T[] | T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// --- DTOs (Data Transfer Objects) ---

export interface ProjectCardDTO {
  id: number;
  title: string;
  slug: string;
  category: string;
  size: string;
  thumbnail: string | null;
  description: string;
}

export interface PostCardDTO {
  id: number;
  title: string;
  slug: string;
  cover: string | null;
  excerpt: string;
  publishedAt: string;
}

export interface HomeDTO {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    video: string | null;
    backgroundImage: string | null;
    scenes: Array<{
      key: string;
      kicker: string;
      eyebrow: string;
      title: string;
      desc: string;
      tags: string[];
      background: string | null;
    }>;
    ctaPrimaryText?: string;
    ctaPrimaryLink?: string;
    ctaSecondaryText?: string;
    ctaSecondaryLink?: string;
  };
  impact: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    reliabilityTitle: string;
    reliabilityDesc: string;
    scalabilityTitle: string;
    scalabilityDesc: string;
    logoBadgeText: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Array<{
      key: string;
      title: string;
      micro: string;
      headline: string;
      desc: string;
      image: string | null;
    }>;
  };
  about: {
    panelTitle: string;
    panelDesc: string;
    points: string[];
    image: string | null;
  };
  tech: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  aboutMetrics: {
    projects: string;
    experts: string;
    years: string;
    solutions: string;
  };
}

export interface FAQDTO {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface AboutDTO {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  heroBackgroundImage: string | null;
  philosophy: {
    title: string;
    subtitle: string;
  };
  values: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
  cta: {
    titlePart1: string;
    titleHighlight: string;
    description: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
}

export interface ContactDTO {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  info: {
    title: string;
    description: string;
    emailLabel: string;
    emailValue: string;
    phoneLabel: string;
    phoneValue: string;
    locationLabel: string;
    locationValue: string;
  };
  form: {
    title: string;
    nameLabel: string;
    placeholderName: string;
    placeholderEmail: string;
    subjectLabel: string;
    placeholderSubject: string;
    messageLabel: string;
    placeholderMessage: string;
    sendBtn: string;
  };
}

export interface ComplaintPageDTO {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  info: {
    title: string;
    description: string;
    emailLabel: string;
    emailValue: string;
    phoneLabel: string;
    phoneValue: string;
    locationLabel: string;
    locationValue: string;
    workingHoursLabel: string;
    workingHoursValue: string;
  };
  form: {
    title: string;
    stepsTitle: string;
    submitBtn: string;
    successMessage: string;
    errorMessage: string;
  };
}

export interface ServicesPageDTO {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  heroBackgroundImage: string | null;
  capabilitiesTitle: string;
  process: {
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
      icon: string;
    }>;
  };
  cta: {
    badge: string;
    title: string;
    features: string[];
    btn: string;
  };
}

export interface GlobalSettingsDTO {
  footer: {
    description: string;
    location: string;
    phone: string;
    email: string;
    copyright: string;
  };
  socialLinks: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  siteName: string;
  siteDescription?: string;
  siteKeywords?: string;
  logoDark: string | null;
  logoLight: string | null;
  navContactBtnText?: string;
  navContactBtnLink?: string;
}
