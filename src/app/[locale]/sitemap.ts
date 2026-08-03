import type { MetadataRoute } from 'next';

const LOCALES = ['ar', 'en'] as const;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://school.ly';

const STATIC_PATHS = [
  { path: '', priority: 1.0, changeFreq: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/admission', priority: 0.9, changeFreq: 'monthly' as const },
  { path: '/academics', priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/facilities', priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/news', priority: 0.8, changeFreq: 'weekly' as const },
  { path: '/gallery', priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/contact', priority: 0.9, changeFreq: 'monthly' as const },
  { path: '/parents', priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/careers', priority: 0.5, changeFreq: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const item of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${item.path}`,
        lastModified: now,
        changeFrequency: item.changeFreq,
        priority: item.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${BASE_URL}/${l}${item.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
