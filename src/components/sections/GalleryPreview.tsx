'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { cn } from '@/lib/cn';
import { useState } from 'react';

export default function GalleryPreview() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = {
    ar: [
      { id: 'all', label: 'الكل' },
      { id: 'activities', label: 'الأنشطة' },
      { id: 'facilities', label: 'المرافق' },
      { id: 'events', label: 'الفعاليات' },
    ],
    en: [
      { id: 'all', label: 'All' },
      { id: 'activities', label: 'Activities' },
      { id: 'facilities', label: 'Facilities' },
      { id: 'events', label: 'Events' },
    ],
  };

  const gallery = [
    {
      id: 1,
      image: '/images/gallery/science.jpg',
      title: { ar: 'معمل العلوم', en: 'Science Lab' },
      category: 'facilities',
      size: 'large',
    },
    {
      id: 2,
      image: '/images/gallery/sports.jpg',
      title: { ar: 'النشاط الرياضي', en: 'Sports Activity' },
      category: 'activities',
      size: 'medium',
    },
    {
      id: 3,
      image: '/images/gallery/library.jpg',
      title: { ar: 'المكتبة', en: 'Library' },
      category: 'facilities',
      size: 'medium',
    },
    {
      id: 4,
      image: '/images/gallery/art.jpg',
      title: { ar: 'الفنون', en: 'Arts' },
      category: 'activities',
      size: 'small',
    },
    {
      id: 5,
      image: '/images/gallery/graduation.jpg',
      title: { ar: 'حفل التخرج', en: 'Graduation' },
      category: 'events',
      size: 'small',
    },
    {
      id: 6,
      image: '/images/gallery/classroom.jpg',
      title: { ar: 'الفصول الدراسية', en: 'Classrooms' },
      category: 'facilities',
      size: 'medium',
    },
  ];

  const cats = categories[locale as 'ar' | 'en'];
  const filtered = activeCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  return (
    <section 
      id="gallery-preview-section"
      className="py-24 bg-neutral-50"
      aria-label={isRTL ? 'معرض صور المدرسة' : 'School photo gallery'}
    >
      <div className="container mx-auto px-6">
        <header className="flex items-end justify-between mb-12">
          <SectionTitle
            badge={isRTL ? '📸 معرض الصور' : '📸 Photo Gallery'}
            title={isRTL ? 'لحظات من حياتنا المدرسية' : 'Moments from Our School Life'}
            subtitle={isRTL ? 'اكتشف بيئتنا التعليمية' : 'Explore our educational environment'}
          />
          <PremiumButton
            variant="outline"
            icon={<ArrowLeft className={cn('w-5 h-5', isRTL && 'rotate-180')} />}
            iconPosition={isRTL ? 'left' : 'right'}
            className="hidden md:flex"
          >
            {isRTL ? 'المزيد من الصور' : 'More Photos'}
          </PremiumButton>
        </header>

        {/* Category Filter */}
        <div 
          className="flex flex-wrap gap-3 mb-12 justify-center"
          role="tablist"
          aria-label={isRTL ? 'تصنيفات المعرض' : 'Gallery categories'}
        >
          {cats.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-6 py-3 rounded-full font-semibold transition-all',
                activeCategory === cat.id
                  ? 'bg-brand-signature text-white shadow-brand'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {gallery.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center min-h-[300px] rounded-xl bg-white border border-slate-100 bg-gradient-to-br from-brand-accent/5 to-brand-signature/5">
              <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-brand-signature font-bold text-lg mb-2">
                  {isRTL ? 'لا توجد صور حالياً' : 'No images available yet'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {isRTL ? 'سيتم إضافة صور قريباً' : 'Gallery coming soon'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            layout
            role="list"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                role="listitem"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1 }
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={cn(
                  'group cursor-pointer relative overflow-hidden rounded-2xl',
                  item.size === 'large' && 'col-span-2 row-span-2',
                  item.size === 'medium' && 'col-span-1 row-span-1',
                  item.size === 'small' && 'col-span-1 row-span-1'
                )}
              >
                <article>
                  {/* Image Container */}
                  <div className={cn(
                    'relative w-full bg-neutral-200',
                    item.size === 'large' ? 'h-96' : 'h-48'
                  )}>
                    <ParallaxImage
                      src={item.image}
                      alt={item.title[locale as 'ar' | 'en']}
                      className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-xs font-medium opacity-80">
                          {cats.find(c => c.id === item.category)?.label}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg">
                        {item.title[locale as 'ar' | 'en']}
                      </h4>
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mobile CTA */}
        <div className="mt-12 flex justify-center md:hidden">
          <PremiumButton
            variant="outline"
            icon={<ArrowLeft className={cn('w-5 h-5', isRTL && 'rotate-180')} />}
            iconPosition={isRTL ? 'left' : 'right'}
          >
            {isRTL ? 'المزيد من الصور' : 'More Photos'}
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
