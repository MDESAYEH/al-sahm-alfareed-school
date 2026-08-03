'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Award, Users, BookOpen, Shield, Sparkles, TrendingUp, Globe } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/cn';

const reasons = {
  ar: [
    {
      icon: Globe,
      title: 'شراكات دولية',
      description: 'قمنا بالتواصل مع مؤسسات تعليمية عالمية رائدة لتعزيز فرص التعاون وتبادل الخبرات.',
      size: 'medium',
      color: 'secondary',
    },
    {
      icon: Users,
      title: 'معلمون متخصصون',
      description: 'كادر تعليمي مؤهل بخبرات عالمية',
      size: 'small',
      color: 'accent',
    },
    {
      icon: BookOpen,
      title: 'مناهج حديثة',
      description: 'مزيج من المناهج الوطنية والدولية',
      size: 'small',
      color: 'secondary',
    },
    {
      icon: Shield,
      title: 'بيئة آمنة',
      description: 'نظام أمان متطور ومراقبة على مدار الساعة',
      size: 'medium',
      color: 'teal',
    },
    {
      icon: Sparkles,
      title: 'أنشطة متنوعة',
      description: 'برامج رياضية وفنية وثقافية لتنمية المواهب',
      size: 'medium',
      color: 'amber',
    },
    {
      icon: TrendingUp,
      title: 'تطوير مستمر',
      description: 'استثمار دائم في التقنيات والمرافق الحديثة',
      size: 'small',
      color: 'purple',
    },
  ],
  en: [
    {
      icon: Globe,
      title: 'Global Partnerships',
      description: 'Collaboration with leading international institutions',
      size: 'medium',
      color: 'secondary',
    },
    {
      icon: Users,
      title: 'Expert Teachers',
      description: 'Qualified staff with international experience',
      size: 'small',
      color: 'accent',
    },
    {
      icon: BookOpen,
      title: 'Modern Curriculum',
      description: 'Blend of national and international programs',
      size: 'small',
      color: 'secondary',
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'Advanced security and 24/7 monitoring',
      size: 'medium',
      color: 'teal',
    },
    {
      icon: Sparkles,
      title: 'Diverse Activities',
      description: 'Sports, arts, and cultural programs',
      size: 'medium',
      color: 'amber',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Development',
      description: 'Ongoing investment in modern facilities',
      size: 'small',
      color: 'purple',
    },
  ],
};

const colorSchemes: Record<string, { card: string; iconBg: string; icon: string; accent: string; glow: string }> = {
  primary: {
    card: 'from-blue-50 to-indigo-50 border-blue-200/70',
    iconBg: 'from-blue-500 to-indigo-600',
    icon: 'text-white',
    accent: 'text-blue-700',
    glow: 'shadow-blue-200/60 hover:shadow-blue-300/70',
  },
  accent: {
    card: 'from-teal-50 to-cyan-50 border-teal-200/70',
    iconBg: 'from-brand-accent to-teal-600',
    icon: 'text-white',
    accent: 'text-teal-700',
    glow: 'shadow-teal-200/60 hover:shadow-teal-300/70',
  },
  secondary: {
    card: 'from-sky-50 to-blue-50 border-sky-200/70',
    iconBg: 'from-sky-500 to-blue-600',
    icon: 'text-white',
    accent: 'text-sky-700',
    glow: 'shadow-sky-200/60 hover:shadow-sky-300/70',
  },
  teal: {
    card: 'from-emerald-50 to-teal-50 border-emerald-200/70',
    iconBg: 'from-emerald-500 to-teal-600',
    icon: 'text-white',
    accent: 'text-emerald-700',
    glow: 'shadow-emerald-200/60 hover:shadow-emerald-300/70',
  },
  amber: {
    card: 'from-amber-50 to-orange-50 border-amber-200/70',
    iconBg: 'from-amber-500 to-orange-500',
    icon: 'text-white',
    accent: 'text-amber-700',
    glow: 'shadow-amber-200/60 hover:shadow-amber-300/70',
  },
  purple: {
    card: 'from-purple-50 to-violet-50 border-purple-200/70',
    iconBg: 'from-purple-500 to-violet-600',
    icon: 'text-white',
    accent: 'text-purple-700',
    glow: 'shadow-purple-200/60 hover:shadow-purple-300/70',
  },
};

export default function WhyChooseUs() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const items = reasons[locale as 'ar' | 'en'];

  return (
    <section
      className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-teal-50/50"
      aria-labelledby="whychooseus-heading"
      aria-label={isRTL ? 'أسباب اختيار المدرسة' : 'Reasons to choose the school'}
    >
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 -left-32 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-blue-500/15 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-teal-100/60 via-transparent to-sky-100/60 rounded-full blur-3xl -z-10" aria-hidden="true" />
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(11, 90, 168) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <header id="whychooseus-heading" className="mb-16">
          <SectionTitle
            badge={isRTL ? 'لماذا نحن' : 'Why Us'}
            title={isRTL ? 'لماذا تختار مدرسة السهم الفريد؟' : 'Why Choose Al-Sahm Al-Fareed?'}
            subtitle={isRTL ? 'نجمع بين التميز الأكاديمي والبيئة المحفزة لبناء جيل المستقبل' : 'Combining academic excellence with an inspiring environment'}
          />
        </header>

        {/* Bento Grid - Asymmetric Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-7xl mx-auto"
          style={{ gridAutoRows: 'minmax(180px, auto)' }}
          role="list"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {items.map((reason, i) => {
            const Icon = reason.icon;
            const scheme = colorSchemes[reason.color as keyof typeof colorSchemes] || colorSchemes.primary;
            const sizes = {
              large: 'md:col-span-2 md:row-span-2 md:min-h-[380px]',
              medium: 'md:col-span-2 md:min-h-[180px]',
              small: 'md:col-span-1',
            };

            return (
              <motion.article
                key={i}
                role="listitem"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" as const } }
                }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.25 } }}
                className={cn(
                  'group relative bg-gradient-to-br rounded-3xl p-7 lg:p-8 transition-all duration-500 cursor-pointer',
                  'border backdrop-blur-sm',
                  'shadow-lg hover:shadow-2xl',
                  scheme.card,
                  scheme.glow,
                  sizes[reason.size as keyof typeof sizes]
                )}
              >
                {/* Shimmer Effect on Hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.4) 100%)'
                  }}
                  aria-hidden="true"
                />

                <div className={cn(
                  'flex flex-col h-full relative z-10',
                  reason.size === 'large' && 'lg:flex-row lg:items-center lg:gap-10'
                )}>
                  {/* Icon Container */}
                  <div className={cn(
                    'rounded-2xl flex items-center justify-center transition-all duration-400 flex-shrink-0',
                    'bg-gradient-to-br shadow-lg shadow-black/10',
                    'group-hover:scale-110 group-hover:rotate-3',
                    scheme.iconBg,
                    reason.size === 'large' ? 'w-20 h-20 lg:w-24 lg:h-24 mb-6 lg:mb-0' : 'w-14 h-14 mb-5'
                  )}>
                    <Icon 
                      className={cn(
                        'drop-shadow-sm transition-transform duration-400',
                        reason.size === 'large' ? 'w-10 h-10 lg:w-12 lg:h-12' : 'w-7 h-7',
                        scheme.icon
                      )} 
                    />
                  </div>

                  {/* Text Content */}
                  <div className={cn(
                    'flex flex-col flex-grow',
                    reason.size === 'large' && 'lg:justify-center'
                  )}>
                    <h3 className={cn(
                      'font-extrabold text-neutral-900 mb-2 tracking-tight',
                      reason.size === 'large' ? 'text-2xl md:text-3xl lg:text-4xl mb-4' : 'text-xl md:text-2xl',
                      'group-hover:scale-[1.02] transition-transform duration-300 origin-right'
                    )}>
                      {reason.title}
                    </h3>

                    <p className={cn(
                      'text-neutral-700 leading-relaxed font-medium',
                      reason.size === 'large' ? 'text-base md:text-lg lg:text-xl' : 'text-sm md:text-base',
                    )}>
                      {reason.description}
                    </p>

                    {reason.size === 'large' && (
                      <div className={cn(
                        'mt-8 items-center gap-2 font-bold',
                        scheme.accent,
                        isRTL ? 'self-start lg:self-end' : 'self-end'
                      )}>
                        <span className="inline-flex items-center gap-1.5 text-sm lg:text-base group-hover:gap-3 transition-all duration-300">
                          {isRTL ? 'اكتشف المزيد' : 'Discover more'}
                          <svg 
                            className={cn(
                              'w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300',
                              isRTL ? 'rotate-180' : ''
                            )} 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={cn(
                  'absolute transition-all duration-400 opacity-70 group-hover:opacity-100',
                  isRTL ? 'top-5 left-5' : 'top-5 right-5'
                )} aria-hidden="true">
                  <div className={cn('w-8 h-8 lg:w-10 lg:h-10 rounded-2xl bg-gradient-to-br opacity-60 group-hover:scale-125 transition-transform duration-500', scheme.iconBg)} />
                </div>

                {/* Bottom Accent Line */}
                <div className={cn(
                  'absolute bottom-0 h-1 rounded-b-3xl bg-gradient-to-r transition-all duration-500',
                  isRTL ? 'right-0' : 'left-0',
                  'w-0 group-hover:w-full',
                  scheme.iconBg
                )} aria-hidden="true" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
