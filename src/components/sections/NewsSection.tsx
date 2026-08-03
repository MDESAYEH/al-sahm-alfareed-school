'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Calendar, ArrowLeft, Newspaper } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { cn } from '@/lib/cn';
import Image from 'next/image';

export default function NewsSection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const news = {
    ar: [
      {
        id: 1,
        title: 'افتتاح المختبر العلمي الجديد',
        excerpt: 'تم تجهيز مختبر علمي حديث بأحدث التقنيات والأجهزة',
        date: '2026-07-15',
        category: 'تطوير',
        image: '/images/news/lab.jpg',
        featured: true,
      },
      {
        id: 2,
        title: 'مسابقة القرآن الكريم السنوية',
        excerpt: 'تنظيم المسابقة السنوية لحفظ القرآن الكريم',
        date: '2026-07-10',
        category: 'فعاليات',
        image: '/images/news/quran.jpg',
      },
      {
        id: 3,
        title: 'رحلة تعليمية للمتحف الوطني',
        excerpt: 'زيارة طلاب المرحلة الإعدادية للمتحف الوطني',
        date: '2026-07-05',
        category: 'نشاط',
        image: '/images/news/museum.jpg',
      },
    ],
    en: [
      {
        id: 1,
        title: 'Opening of New Science Laboratory',
        excerpt: 'Modern science lab equipped with latest technology and equipment',
        date: '2026-07-15',
        category: 'Development',
        image: '/images/news/lab.jpg',
        featured: true,
      },
      {
        id: 2,
        title: 'Annual Quran Competition',
        excerpt: 'Annual Quran memorization competition organized',
        date: '2026-07-10',
        category: 'Events',
        image: '/images/news/quran.jpg',
      },
      {
        id: 3,
        title: 'Educational Trip to National Museum',
        excerpt: 'Preparatory students visited the National Museum',
        date: '2026-07-05',
        category: 'Activities',
        image: '/images/news/museum.jpg',
      },
    ],
  };

  const items = news[locale as 'ar' | 'en'];
  const featured = items.find(n => n.featured);
  const regular = items.filter(n => !n.featured);

  return (
    <section
      className="py-24 bg-white"
      aria-labelledby="newssection-heading"
      aria-label={isRTL ? 'أخبار وفعاليات المدرسة' : 'School news and events'}
    >
      <div className="container mx-auto px-6">
        <header id="newssection-heading" className="flex items-end justify-between mb-16">
          <SectionTitle
            badge={isRTL ? '📰 الأخبار' : '📰 News'}
            title={isRTL ? 'آخر الأخبار والفعاليات' : 'Latest News & Events'}
            subtitle={isRTL ? 'تابع كل جديد في مدرستنا' : 'Stay updated with our school activities'}
          />
          <PremiumButton
            variant="outline"
            icon={<ArrowLeft className={cn('w-5 h-5', isRTL && 'rotate-180')} />}
            iconPosition={isRTL ? 'left' : 'right'}
            className="hidden md:flex"
          >
            {isRTL ? 'جميع الأخبار' : 'All News'}
          </PremiumButton>
        </header>

        {items.length === 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2 flex items-center justify-center min-h-[300px] rounded-xl bg-white border border-slate-100 bg-gradient-to-br from-brand-accent/5 to-brand-signature/5">
              <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                  <Newspaper className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-brand-signature font-bold text-lg mb-2">
                  {isRTL ? 'لا توجد أخبار حالياً' : 'No news available yet'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {isRTL ? 'تابعنا لاحقاً للتفاصيل' : 'Stay tuned for updates'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            className="grid lg:grid-cols-2 gap-8"
            role="list"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Featured News */}
            {featured && (
              <motion.article
                role="listitem"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="lg:row-span-2 group cursor-pointer"
              >
                <div className="relative h-full bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 hover:border-brand-signature transition-colors">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
                      <span className="px-4 py-2 bg-brand-accent text-white text-sm font-semibold rounded-full">
                        {featured.category}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full flex items-center gap-2">
                        <Newspaper className="w-3 h-3" />
                        {isRTL ? 'خبر مميز' : 'Featured'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
                      <Calendar className="w-4 h-4" />
                      <time>{new Date(featured.date).toLocaleDateString(locale)}</time>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-brand-signature transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {featured.excerpt}
                    </p>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Regular News */}
            {regular.map((item) => (
              <motion.article
                key={item.id}
                role="listitem"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 hover:border-brand-signature transition-colors h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-signature text-xs font-semibold rounded-full">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <time>{new Date(item.date).toLocaleDateString(locale)}</time>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-signature transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <PremiumButton
            variant="outline"
            icon={<ArrowLeft className={cn('w-5 h-5', isRTL && 'rotate-180')} />}
            iconPosition={isRTL ? 'left' : 'right'}
          >
            {isRTL ? 'جميع الأخبار' : 'All News'}
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
