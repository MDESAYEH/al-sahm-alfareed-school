'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Library, FlaskConical, Monitor, Dumbbell, Bus, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { cn } from '@/lib/cn';

const facilities = {
  ar: [
    {
      title: 'المكتبة الإلكترونية',
      description: 'أكثر من 10,000 كتاب ومرجع علمي',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
      size: 'large',
      icon: Library,
      color: 'amber',
      tag: 'معرفة',
    },
    {
      title: 'المختبرات العلمية',
      description: 'مجهزة بأحدث التقنيات',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
      size: 'tall',
      icon: FlaskConical,
      color: 'blue',
      tag: 'علوم',
    },
    {
      title: 'العيادة الطبية',
      description: 'رعاية صحية متكاملة',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      size: 'tall',
      icon: Heart,
      color: 'rose',
      tag: 'رعاية',
    },
    {
      title: 'النقل المدرسي',
      description: 'أسطول حديث وآمن',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      size: 'small',
      icon: Bus,
      color: 'orange',
      tag: 'نقل',
    },
    {
      title: 'الملاعب الرياضية',
      description: 'مساحات واسعة للأنشطة',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
      size: 'small',
      icon: Dumbbell,
      color: 'green',
      tag: 'رياضة',
    },
    {
      title: 'الفصول الذكية',
      description: 'تقنيات تعليمية متطورة',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      size: 'wide',
      icon: Monitor,
      color: 'teal',
      tag: 'تقنية',
    },
  ],
  en: [
    {
      title: 'Digital Library',
      description: 'Over 10,000 books and references',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
      size: 'large',
      icon: Library,
      color: 'amber',
      tag: 'Knowledge',
    },
    {
      title: 'Science Labs',
      description: 'Equipped with latest technology',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
      size: 'tall',
      icon: FlaskConical,
      color: 'blue',
      tag: 'Science',
    },
    {
      title: 'Medical Clinic',
      description: 'Comprehensive healthcare',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      size: 'tall',
      icon: Heart,
      color: 'rose',
      tag: 'Healthcare',
    },
    {
      title: 'School Transport',
      description: 'Modern and safe fleet',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      size: 'small',
      icon: Bus,
      color: 'orange',
      tag: 'Transport',
    },
    {
      title: 'Sports Fields',
      description: 'Spacious areas for activities',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
      size: 'small',
      icon: Dumbbell,
      color: 'green',
      tag: 'Sports',
    },
    {
      title: 'Smart Classrooms',
      description: 'Advanced educational technology',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      size: 'wide',
      icon: Monitor,
      color: 'teal',
      tag: 'Tech',
    },
  ],
};

const facilityColorSchemes: Record<string, {
  tagBg: string;
  iconBg: string;
  accent: string;
  glow: string;
  overlayAccent: string;
  borderHover: string;
  expandBg: string;
  expandIcon: string;
}> = {
  amber: {
    tagBg: 'from-amber-400 to-orange-500',
    iconBg: 'from-amber-400/95 via-orange-400/95 to-orange-500/95',
    accent: 'text-amber-200',
    glow: 'hover:shadow-2xl hover:shadow-amber-500/40',
    overlayAccent: 'from-amber-900/70 via-navy-900/50 to-transparent',
    borderHover: 'hover:border-amber-400/60',
    expandBg: 'from-amber-400 to-orange-500',
    expandIcon: 'text-white',
  },
  blue: {
    tagBg: 'from-blue-400 to-indigo-500',
    iconBg: 'from-blue-400/95 via-sky-400/95 to-indigo-500/95',
    accent: 'text-blue-200',
    glow: 'hover:shadow-2xl hover:shadow-blue-500/40',
    overlayAccent: 'from-indigo-900/70 via-navy-900/50 to-transparent',
    borderHover: 'hover:border-blue-400/60',
    expandBg: 'from-blue-400 to-indigo-500',
    expandIcon: 'text-white',
  },
  teal: {
    tagBg: 'from-teal-400 to-cyan-500',
    iconBg: 'from-teal-400/95 via-cyan-400/95 to-sky-500/95',
    accent: 'text-teal-200',
    glow: 'hover:shadow-2xl hover:shadow-teal-500/40',
    overlayAccent: 'from-teal-900/70 via-navy-900/50 to-transparent',
    borderHover: 'hover:border-teal-400/60',
    expandBg: 'from-teal-400 to-cyan-500',
    expandIcon: 'text-white',
  },
  green: {
    tagBg: 'from-emerald-400 to-green-500',
    iconBg: 'from-emerald-400/95 via-green-400/95 to-lime-500/95',
    accent: 'text-emerald-200',
    glow: 'hover:shadow-2xl hover:shadow-emerald-500/40',
    overlayAccent: 'from-emerald-900/70 via-navy-900/50 to-transparent',
    borderHover: 'hover:border-emerald-400/60',
    expandBg: 'from-emerald-400 to-green-500',
    expandIcon: 'text-white',
  },
  orange: {
    tagBg: 'from-orange-400 to-red-500',
    iconBg: 'from-orange-400/95 via-amber-400/95 to-red-500/95',
    accent: 'text-orange-200',
    glow: 'hover:shadow-2xl hover:shadow-orange-500/40',
    overlayAccent: 'from-orange-900/70 via-navy-900/50 to-transparent',
    borderHover: 'hover:border-orange-400/60',
    expandBg: 'from-orange-400 to-red-500',
    expandIcon: 'text-white',
  },
  rose: {
    tagBg: 'from-rose-400 to-pink-500',
    iconBg: 'from-rose-400/95 via-pink-400/95 to-fuchsia-500/95',
    accent: 'text-rose-200',
    glow: 'hover:shadow-2xl hover:shadow-rose-500/40',
    overlayAccent: 'from-rose-900/70 via-navy-900/50 to-transparent',
    borderHover: 'hover:border-rose-400/60',
    expandBg: 'from-rose-400 to-pink-500',
    expandIcon: 'text-white',
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" as const,
    } 
  },
};

export default function Facilities() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const items = facilities[locale as 'ar' | 'en'];

  return (
    <section
      className="py-24 bg-gradient-to-br from-slate-50/80 via-indigo-50/30 to-emerald-50/40 relative overflow-hidden"
      aria-labelledby="facilities-heading"
      aria-label={isRTL ? 'مرافق المدرسة' : 'School facilities'}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[36rem] h-[36rem] bg-amber-200/25 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute top-1/4 -left-24 w-[32rem] h-[32rem] bg-blue-300/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/3 w-[28rem] h-[28rem] bg-emerald-200/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-1/3 left-1/4 w-[30rem] h-[30rem] bg-rose-200/20 rounded-full blur-3xl -z-10" aria-hidden="true" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15, 23, 42) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <header id="facilities-heading" className="mb-16">
          <SectionTitle
            badge={isRTL ? 'المرافق' : 'Facilities'}
            title={isRTL ? 'بيئة تعليمية متكاملة' : 'Comprehensive Learning Environment'}
            subtitle={isRTL ? 'مرافق حديثة مجهزة بأحدث التقنيات' : 'Modern facilities equipped with latest technology'}
          />
        </header>

        {/* Bento Grid - with reduced gaps */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[220px] max-w-7xl mx-auto"
          role="list"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {items.map((facility, i) => {
            const Icon = facility.icon;
            const scheme = facilityColorSchemes[facility.color as keyof typeof facilityColorSchemes] || facilityColorSchemes.teal;
            const sizes = {
              large: 'col-span-2 row-span-2',
              wide: 'col-span-2 row-span-1',
              tall: 'col-span-1 row-span-2',
              small: 'col-span-1 row-span-1',
            };

            return (
              <motion.article
                key={i}
                role="listitem"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.03, 
                  y: -6,
                  transition: { duration: 0.35, ease: 'easeOut' }
                }}
                className={cn(
                  'relative overflow-hidden rounded-[1.8rem] group cursor-pointer',
                  'shadow-xl hover:shadow-3xl transition-shadow duration-500',
                  'border border-white/30 hover:border-white/60',
                  scheme.borderHover,
                  scheme.glow,
                  sizes[facility.size as keyof typeof sizes],
                  'transform-gpu will-change-transform'
                )}
              >
                {/* Background Image with zoom */}
                <motion.div 
                  className="absolute inset-0"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <ParallaxImage 
                    src={facility.image} 
                    alt={facility.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Overlay gradients */}
                <div className={cn(
                  'absolute inset-0 transition-all duration-700',
                  'bg-gradient-to-t',
                  scheme.overlayAccent,
                  'opacity-90 group-hover:opacity-95'
                )} />

                {/* Color wash on hover */}
                <div className={cn(
                  'absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 mix-blend-soft-light',
                  'bg-gradient-to-br',
                  scheme.expandBg
                )} aria-hidden="true" />

                {/* Shimmer effect */}
                <div className={cn(
                  'absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out',
                  'bg-gradient-to-r from-transparent via-white/15 to-transparent',
                  'skew-x-12'
                )} aria-hidden="true" />

                {/* Top Row: Tag + Expand Button */}
                <div className={cn(
                  'absolute top-3 md:top-4 flex items-center justify-between z-20 w-full px-3 md:px-4',
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                )}>
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.4 } }}
                    viewport={{ once: true }}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full shadow-lg shadow-black/25 backdrop-blur-md font-bold text-xs md:text-sm',
                      'bg-gradient-to-r',
                      scheme.tagBg,
                      'text-white border border-white/20'
                    )}
                  >
                    <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {facility.tag}
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.3 + i * 0.06, duration: 0.4 } }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: -45, scale: 1.15 }}
                    className={cn(
                      'w-9 h-9 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-400 border border-white/40',
                      'bg-gradient-to-br',
                      scheme.expandBg,
                      'scale-90 opacity-70 group-hover:scale-110 group-hover:opacity-100',
                      isRTL && '-scale-x-100'
                    )}
                  >
                    <ArrowUpRight className={cn('w-4 h-4 md:w-5 md:h-5', scheme.expandIcon)} />
                  </motion.div>
                </div>

                {/* Bottom Content */}
                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end z-10">
                  {/* Glass platform */}
                  <div className={cn(
                    'absolute transition-all duration-500 rounded-[1.5rem] backdrop-blur-md border border-white/10',
                    'bg-gradient-to-t from-black/40 via-black/5 to-transparent',
                    facility.size === 'large' 
                      ? (isRTL ? 'right-2 left-2 bottom-2 h-36 md:h-40' : 'left-2 right-2 bottom-2 h-36 md:h-40')
                      : (isRTL ? 'right-2 left-2 bottom-2 h-28 md:h-32' : 'left-2 right-2 bottom-2 h-28 md:h-32'),
                    'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100'
                  )} aria-hidden="true" />

                  <motion.div 
                    className="relative z-10 transition-all duration-500 ease-out group-hover:-translate-y-1"
                  >
                    {/* Icon */}
                    <div className={cn(
                      'flex items-center justify-center shadow-2xl shadow-black/20 backdrop-blur-sm border border-white/30 mb-2 md:mb-3',
                      'bg-gradient-to-br rounded-2xl transition-all duration-500',
                      scheme.iconBg,
                      facility.size === 'large' ? 'w-12 h-12 md:w-14 md:h-14' : 'w-10 h-10 md:w-11 md:h-11',
                      'group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-2xl'
                    )}>
                      <Icon 
                        className={cn(
                          scheme.expandIcon,
                          'drop-shadow-md transition-transform duration-500 group-hover:scale-110',
                          facility.size === 'large' ? 'w-6 h-6 md:w-7 md:h-7' : 'w-5 h-5 md:w-5.5 md:h-5.5'
                        )} 
                      />
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                      'font-extrabold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-1 leading-tight tracking-tight',
                      facility.size === 'large' ? 'text-xl md:text-2xl lg:text-3xl' : 'text-lg md:text-xl',
                    )}>
                      {facility.title}
                    </h3>

                    {/* Description */}
                    <p className={cn(
                      'font-medium leading-relaxed transition-all duration-500',
                      scheme.accent,
                      'text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]',
                      facility.size === 'large' ? 'text-sm md:text-base' : 'text-xs md:text-sm',
                      facility.size === 'small' && 'line-clamp-2'
                    )}>
                      {facility.description}
                    </p>

                    {/* CTA reveal */}
                    <div className={cn(
                      'overflow-hidden transition-all duration-500 ease-out',
                      'max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 mt-0 group-hover:mt-2 md:group-hover:mt-3',
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    )}>
                      <div className={cn('flex items-center gap-2 font-bold', scheme.accent, isRTL ? 'justify-start' : 'justify-end')}>
                        <span className="text-xs md:text-sm drop-shadow-md">
                          {isRTL ? 'استكشف المرفق' : 'Explore facility'}
                        </span>
                        <ArrowUpRight className={cn(
                          'w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-400',
                          'group-hover:translate-x-1',
                          isRTL ? 'rotate-90' : ''
                        )} />
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Border glow on hover */}
                <div className={cn(
                  'absolute inset-0 rounded-[1.8rem] pointer-events-none border-2 border-white/0',
                  'group-hover:border-white/50 transition-all duration-700'
                )} />

                {/* Corner glow accent */}
                <div className={cn(
                  'absolute w-20 h-20 md:w-24 md:h-24 rounded-full opacity-0 blur-3xl transition-all duration-700 pointer-events-none',
                  isRTL ? '-right-6 -top-6' : '-left-6 -top-6',
                  'group-hover:opacity-70 group-hover:scale-125',
                  'bg-gradient-to-br',
                  scheme.expandBg
                )} aria-hidden="true" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}