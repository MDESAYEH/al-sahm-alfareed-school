import { 
  HomeDTO, 
  ProjectCardDTO, 
  PostCardDTO, 
  FAQDTO, 
  AboutDTO, 
  ContactDTO,
  ComplaintPageDTO,
  ServicesPageDTO, 
  GlobalSettingsDTO 
} from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

/**
 * Normalizes a Strapi entity by unwrapping 'attributes' if present.
 */
const MAX_DEPTH = 10;

/**
 * Normalizes a Strapi entity by unwrapping 'attributes' and 'data' recursively.
 * Circular reference protection and depth guardrails included.
 */
export function unwrapEntity<T>(entity: any, visited = new WeakSet(), depth = 0): T {
  if (!entity || typeof entity !== 'object' || depth > MAX_DEPTH) return entity;
  if (visited.has(entity)) return entity; // Circular reference protection

  visited.add(entity);
  
  let result = entity;
  
  // Unwrap Strapi 4 style { id, attributes: { ... } }
  if (entity.attributes) {
    result = {
      id: entity.id,
      ...entity.attributes,
    };
  }
  
  // Recursively unwrap nested properties (Relations / Media)
  for (const key in result) {
    const value = result[key];
    if (value && typeof value === 'object') {
      // If it's a Strapi response object with 'data'
      if (Object.prototype.hasOwnProperty.call(value, 'data')) {
        if (Array.isArray(value.data)) {
          result[key] = value.data.map((item: any) => unwrapEntity(item, visited, depth + 1));
        } else {
          result[key] = unwrapEntity(value.data, visited, depth + 1);
        }
      }
    }
  }
  
  return result as T;
}

/**
 * Normalizes a Strapi response (Single or Collection).
 */
export function unwrapResponse<T>(json: any): T | T[] | null {
  if (!json || !json.data) return null;
  const data = json.data;

  if (Array.isArray(data)) {
    return data.map((item) => unwrapEntity<T>(item));
  }

  return unwrapEntity<T>(data);
}

/**
 * Normalizes media fields (Strapi 4/5).
 */
export function normalizeMedia(media: any): string | null {
  if (!media) return null;
  
  // If unwrapEntity already flattened it, it might be a direct object with url
  // Or it could still be the raw structure if passed before unwrapping
  const target = media.url ? media : (media.data || media);
  
  if (Array.isArray(target)) {
    const first = target[0];
    const url = first?.attributes?.url || first?.url || null;
    return getStrapiMedia(url);
  }
  
  const url = target?.attributes?.url || target?.url || null;
  return getStrapiMedia(url);
}

export async function getProjects(locale: string = "ar"): Promise<ProjectCardDTO[]> {
  try {
    const fields = ["Title", "Description", "Category", "Size", "Slug"];
    const fieldsQuery = fields.map((f, i) => `fields[${i}]=${f}`).join("&");
    const response = await fetch(`${STRAPI_URL}/api/projects?locale=${locale}&${fieldsQuery}&populate=Thumbnail`, {
      next: { 
        revalidate: 3600,
        tags: ['projects']
      },
    });
    
    if (response.status === 404) return [];
    if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const projects = Array.isArray(data) ? data : (data ? [data] : []);
    
    return projects.map(mapProjectToCardDTO);
  } catch (error) {
    console.error("Error fetching projects from Strapi:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string, locale: string = "ar") {
  try {
    const populate = ["Thumbnail", "Gallery"];
    const populateQuery = populate.map((p, i) => `populate[${i}]=${p}`).join("&");
    const response = await fetch(`${STRAPI_URL}/api/projects?locale=${locale}&filters[Slug][$eq]=${slug}&${populateQuery}`, {
      next: { 
        revalidate: 3600,
        tags: [`project-${slug}`]
      },
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch project: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const project = Array.isArray(data) ? data[0] : data;
    
    return project ? mapProjectToDTO(project) : null;
  } catch (error) {
    console.error(`Error fetching project by slug ${slug}:`, error);
    return null;
  }
}

export function mapProjectToCardDTO(p: any): ProjectCardDTO {
  return {
    id: p.id,
    title: p.Title,
    slug: p.Slug,
    category: p.Category,
    size: p.Size || "small",
    thumbnail: normalizeMedia(p.Thumbnail),
    description: p.Description,
  };
}

export function mapProjectToDTO(p: any) {
  return {
    ...mapProjectToCardDTO(p),
    gallery: (p.Gallery || []).map((img: any) => normalizeMedia(img)).filter(Boolean) as string[],
  };
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}

export async function getFAQs(locale: string = "ar"): Promise<FAQDTO[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/faqs?locale=${locale}&sort=Order:asc`, {
      next: { 
        revalidate: 3600,
        tags: ['faqs']
      },
    });
    
    if (response.status === 404) return [];
    if (!response.ok) throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const faqs = Array.isArray(data) ? data : (data ? [data] : []);
    
    return faqs.map(mapFAQToDTO);
  } catch (error) {
    console.error("Error fetching FAQs from Strapi:", error);
    return [];
  }
}

export function mapFAQToDTO(f: any): FAQDTO {
  return {
    id: f.id,
    question: f.Question,
    answer: f.Answer,
    order: f.Order,
  };
}


export async function getHome(locale: string = "ar"): Promise<HomeDTO | null> {
  try {
    const populate = [
      "heroBackgroundVideo",
      "heroBackgroundImage",
      "heroScenes.background",
      "servicesItems.image",
      "aboutImage"
    ];
    const populateQuery = populate.map((p, i) => `populate[${i}]=${p}`).join("&");
    
    const fields = [
      "heroBadge", "heroTitleLine1", "heroTitleLine2", "heroSubtitle",
      "servicesKicker", "servicesTitle", "servicesSubtitle",
      "aboutPanelTitle", "aboutPanelDesc", "aboutPoints",
      "techKicker", "techTitle", "techSubtitle",
      "aboutMetricProjectsValue", "aboutMetricExpertsValue", "aboutMetricYearsValue", "aboutMetricSolutionsValue",
      "impactKicker", "impactTitle", "impactSubtitle", "impactCTAText", "impactCTALink",
      "impactReliabilityTitle", "impactReliabilityDesc", "impactScalabilityTitle", "impactScalabilityDesc",
      "impactLogoBadgeText",
      "heroCTAPrimaryText", "heroCTAPrimaryLink", "heroCTASecondaryText", "heroCTASecondaryLink"
    ];
    const fieldsQuery = fields.map((f, i) => `fields[${i}]=${f}`).join("&");

    const response = await fetch(`${STRAPI_URL}/api/homes?locale=${locale}&${populateQuery}&${fieldsQuery}`, {
      next: { 
        revalidate: 600,
        tags: ['home']
      },
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch home: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const home = Array.isArray(data) ? data[0] : data;
    
    if (!home) return null;
    return mapHomeToDTO(home);
  } catch (error) {
    console.error("Error fetching home from Strapi:", error);
    return null;
  }
}

export function mapHomeToDTO(home: any): HomeDTO {
  const heroScenes = (home.heroScenes || []).map((s: any) => ({
    key: s.key || `scene-${s.id}`,
    kicker: s.kicker,
    eyebrow: s.eyebrow,
    title: s.title,
    desc: s.desc,
    tags: s.tags || [],
    background: normalizeMedia(s.background),
  }));

  const servicesItems = (home.servicesItems || []).map((it: any) => ({
    key: it.key || `service-${it.id}`,
    title: it.title,
    micro: it.micro,
    headline: it.headline,
    desc: it.desc,
    image: normalizeMedia(it.image),
  }));

  return {
    hero: {
      badge: home.heroBadge,
      titleLine1: home.heroTitleLine1,
      titleLine2: home.heroTitleLine2,
      subtitle: home.heroSubtitle,
      video: normalizeMedia(home.heroBackgroundVideo),
      backgroundImage: normalizeMedia(home.heroBackgroundImage),
      scenes: heroScenes,
      ctaPrimaryText: home.heroCTAPrimaryText,
      ctaPrimaryLink: home.heroCTAPrimaryLink,
      ctaSecondaryText: home.heroCTASecondaryText,
      ctaSecondaryLink: home.heroCTASecondaryLink,
    },
    impact: {
      kicker: home.impactKicker,
      title: home.impactTitle,
      subtitle: home.impactSubtitle,
      ctaText: home.impactCTAText,
      ctaLink: home.impactCTALink || "/contact",
      reliabilityTitle: home.impactReliabilityTitle,
      reliabilityDesc: home.impactReliabilityDesc,
      scalabilityTitle: home.impactScalabilityTitle,
      scalabilityDesc: home.impactScalabilityDesc,
      logoBadgeText: home.impactLogoBadgeText,
    },
    services: {
      kicker: home.servicesKicker,
      title: home.servicesTitle,
      subtitle: home.servicesSubtitle,
      items: servicesItems,
    },
    about: {
      panelTitle: home.aboutPanelTitle,
      panelDesc: home.aboutPanelDesc,
      points: home.aboutPoints || [],
      image: normalizeMedia(home.aboutImage),
    },
    tech: {
      kicker: home.techKicker,
      title: home.techTitle,
      subtitle: home.techSubtitle,
    },
    aboutMetrics: {
      projects: home.aboutMetricProjectsValue || "150+",
      experts: home.aboutMetricExpertsValue || "45+",
      years: home.aboutMetricYearsValue || "12+",
      solutions: home.aboutMetricSolutionsValue || "300+",
    },
  };
}

export async function getServices(locale: string = "ar") {
  try {
    const response = await fetch(`${STRAPI_URL}/api/services?locale=${locale}&populate=cover&sort=order:asc`, {
      next: { 
        revalidate: 3600,
        tags: ['services']
      },
    });
    
    if (response.status === 404) return [];
    if (!response.ok) throw new Error(`Failed to fetch services: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    return Array.isArray(data) ? data : (data ? [data] : []);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getPosts(locale: string = "ar"): Promise<PostCardDTO[]> {
  try {
    const fields = ["title", "excerpt", "slug", "publishedAt"];
    const fieldsQuery = fields.map((f, i) => `fields[${i}]=${f}`).join("&");
    const response = await fetch(`${STRAPI_URL}/api/posts?locale=${locale}&${fieldsQuery}&populate=cover&sort=publishedAt:desc&pagination[limit]=3`, {
      next: { 
        revalidate: 3600,
        tags: ['posts']
      },
    });
    
    if (response.status === 404) return [];
    if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const posts = Array.isArray(data) ? data : (data ? [data] : []);
    
    return posts.map(mapPostToCardDTO);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export function mapPostToCardDTO(p: any): PostCardDTO {
  return {
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    slug: p.slug,
    publishedAt: p.publishedAt,
    cover: normalizeMedia(p.cover),
  };
}

export async function getPartners(locale: string = "ar") {
  try {
    const response = await fetch(`${STRAPI_URL}/api/partners?locale=${locale}&populate=logo&sort=order:asc`, {
      next: { 
        revalidate: 3600,
        tags: ['partners']
      },
    });
    
    if (response.status === 404) return [];
    if (!response.ok) throw new Error(`Failed to fetch partners: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    return Array.isArray(data) ? data : (data ? [data] : []);
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}

export async function getAbout(locale: string = "ar"): Promise<AboutDTO | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/about-page?locale=${locale}&populate=values,heroBackgroundImage`, {
      next: { revalidate: 3600, tags: ['about-page'] },
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch about page: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const about = Array.isArray(data) ? data[0] : data;
    
    if (!about) return null;
    return mapAboutToDTO(about);
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

export function mapAboutToDTO(a: any): AboutDTO {
  return {
    badge: a.badge,
    titlePart1: a.titlePart1,
    titleHighlight: a.titleHighlight,
    subtitle: a.subtitle,
    heroBackgroundImage: normalizeMedia(a.heroBackgroundImage),
    philosophy: {
      title: a.philosophyTitle,
      subtitle: a.philosophySubtitle,
    },
    values: (a.values || []).map((v: any) => ({
      title: v.title,
      desc: v.desc,
      icon: v.icon,
    })),
    cta: {
      titlePart1: a.ctaTitlePart1,
      titleHighlight: a.ctaTitleHighlight,
      description: a.ctaDescription,
      primaryBtn: a.ctaPrimaryBtn,
      secondaryBtn: a.ctaSecondaryBtn,
    },
  };
}

export async function getContact(locale: string = "ar"): Promise<ContactDTO | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-page?locale=${locale}`, {
      next: { revalidate: 3600, tags: ['contact-page'] },
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch contact page: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const contact = Array.isArray(data) ? data[0] : data;
    
    if (!contact) return null;
    return mapContactToDTO(contact);
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return null;
  }
}

export function mapContactToDTO(c: any): ContactDTO {
  return {
    badge: c.badge,
    titlePart1: c.titlePart1,
    titleHighlight: c.titleHighlight,
    subtitle: c.subtitle,
    info: {
      title: c.infoTitle,
      description: c.infoDesc,
      emailLabel: c.emailLabel,
      emailValue: c.emailValue,
      phoneLabel: c.phoneLabel,
      phoneValue: c.phoneValue,
      locationLabel: c.locationLabel,
      locationValue: c.locationValue,
    },
    form: {
      title: c.formTitle,
      nameLabel: c.nameLabel,
      placeholderName: c.placeholderName,
      placeholderEmail: c.placeholderEmail,
      subjectLabel: c.subjectLabel,
      placeholderSubject: c.placeholderSubject,
      messageLabel: c.messageLabel,
      placeholderMessage: c.placeholderMessage,
      sendBtn: c.sendBtn,
    },
  };
}

export async function getComplaintPage(locale: string = "ar"): Promise<ComplaintPageDTO | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/complaint-page?locale=${locale}`, {
      next: { revalidate: 3600, tags: ['complaint-page'] },
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch complaint page: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const complaint = Array.isArray(data) ? data[0] : data;
    
    if (!complaint) return null;
    return mapComplaintToDTO(complaint);
  } catch (error) {
    console.error("Error fetching complaint page:", error);
    return null;
  }
}

export function mapComplaintToDTO(c: any): ComplaintPageDTO {
  return {
    badge: c.badge,
    titlePart1: c.titlePart1,
    titleHighlight: c.titleHighlight,
    subtitle: c.subtitle,
    info: {
      title: c.infoTitle,
      description: c.infoDesc,
      emailLabel: c.emailLabel,
      emailValue: c.emailValue,
      phoneLabel: c.phoneLabel,
      phoneValue: c.phoneValue,
      locationLabel: c.locationLabel,
      locationValue: c.locationValue,
      workingHoursLabel: c.workingHoursLabel,
      workingHoursValue: c.workingHoursValue,
    },
    form: {
      title: c.formTitle,
      stepsTitle: c.stepsTitle,
      submitBtn: c.submitBtn,
      successMessage: c.successMessage,
      errorMessage: c.errorMessage,
    },
  };
}

export async function getServicesPage(locale: string = "ar"): Promise<ServicesPageDTO | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/services-page?locale=${locale}&populate=processSteps,heroBackgroundImage`, {
      next: { revalidate: 3600, tags: ['services-page'] },
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch services page: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const services = Array.isArray(data) ? data[0] : data;
    
    if (!services) return null;
    return mapServicesPageToDTO(services);
  } catch (error) {
    console.error("Error fetching services page:", error);
    return null;
  }
}

export function mapServicesPageToDTO(s: any): ServicesPageDTO {
  return {
    badge: s.badge,
    titlePart1: s.titlePart1,
    titleHighlight: s.titleHighlight,
    subtitle: s.subtitle,
    heroBackgroundImage: normalizeMedia(s.heroBackgroundImage),
    capabilitiesTitle: s.capabilitiesTitle,
    process: {
      title: s.processTitle,
      subtitle: s.processSubtitle,
      steps: (s.processSteps || []).map((step: any) => ({
        step: step.step,
        title: step.title,
        desc: step.desc,
        icon: step.icon,
      })),
    },
    cta: {
      badge: s.ctaBadge,
      title: s.ctaTitle,
      features: (s.ctaFeatures || "").split("\n").filter(Boolean),
      btn: s.ctaBtnText,
    },
  };
}

export async function getGlobalSettings(locale: string = "ar"): Promise<GlobalSettingsDTO | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/global-setting?locale=${locale}&populate=socialLinks,siteLogoDark,siteLogoLight`, {
      next: { revalidate: 3600, tags: ['global-settings'] },
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch global settings: ${response.statusText}`);
    
    const json = await response.json();
    const data = unwrapResponse<any>(json);
    const global = Array.isArray(data) ? data[0] : data;
    
    if (!global) return null;
    return mapGlobalToDTO(global);
  } catch (error) {
    console.error("Error fetching global settings:", error);
    return null;
  }
}

export function mapGlobalToDTO(g: any): GlobalSettingsDTO {
  return {
    footer: {
      description: g.footerDescription,
      location: g.location,
      phone: g.phone,
      email: g.email,
      copyright: g.copyright,
    },
    socialLinks: (g.socialLinks || []).map((s: any) => ({
      name: s.name,
      url: s.url,
      icon: s.icon,
    })),
    siteName: g.siteName,
    siteDescription: g.siteDescription,
    siteKeywords: g.siteKeywords,
    logoDark: normalizeMedia(g.siteLogoDark),
    logoLight: normalizeMedia(g.siteLogoLight),
    navContactBtnText: g.navContactBtnText,
    navContactBtnLink: g.navContactBtnLink,
  };
}
