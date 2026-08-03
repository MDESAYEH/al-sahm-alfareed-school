'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { TrendingUp, GraduationCap, Award, Heart } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { cn } from '@/lib/cn';

const trustStats = {
  ar: [
    {
      value: 87,
      suffix: '%',
      label: 'معدل النجاح في الشهادة الإعدادية',
      subtext: 'أعلى من المعدل الوطني بـ 14%',
      icon: TrendingUp,
      color: 'emerald',
    },
    {
      value: 400,
      suffix: '+',
      label: 'خريج ناجح',
      subtext: 'في جامعات ومعاهد مختلفة',
      icon: GraduationCap,
      color: 'primary',
    },
    {
      value: 89,
      suffix: '%',
      label: 'رضا أولياء الأمور',
      subtext: 'بناءً على استبيان سنوي',
      icon: Heart,
      color: 'rose',
    },
  ],
  en: [
    {
      value: 95,
      suffix: '%',
      label: 'High School Success Rate',
      subtext: '20% above national average',
      icon: TrendingUp,
      color: 'emerald',
    },
    {
      value: 3500,
      suffix: '+',
      label: 'Successful Graduates',
      subtext: 'In local and international universities',
      icon: GraduationCap,
      color: 'primary',
    },
    {
      value: 50,
      suffix: '+',
      label: 'National Awards',
      subtext: 'In science, sports, and arts',
      icon: Award,
      color: 'amber',
    },
    {
      value: 98,
      suffix: '%',
      label: 'Parent Satisfaction',
      subtext: 'Based on annual survey',
      icon: Heart,
      color: 'rose',
    },
  ],
};

const statColorSchemes: Record<string, {
  cardBg: string;
  cardBorder: string;
  iconBg: string;
  iconColor: string;
  numberGradient: string;
  labelColor: string;
  subtextColor: string;
  glow: string;
  accentLine: string;
  cornerAccent: string;
}> = {
  emerald: {
    cardBg: 'from-emerald-50 via-teal-50 to-cyan-50',
    cardBorder: 'border-emerald-200/70',
    iconBg: 'from-emerald-400 via-emerald-500 to-teal-600',
    iconColor: 'text-white',
    numberGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    labelColor: 'text-emerald-950',
    subtextColor: 'text-emerald-800/80',
    glow: 'shadow-emerald-200/50 hover:shadow-emerald-300/60',
    accentLine: 'from-emerald-400 via-teal-400 to-cyan-500',
    cornerAccent: 'from-emerald-400 to-teal-500',
  },
  primary: {
    cardBg: 'from-blue-50 via-sky-50 to-indigo-50',
    cardBorder: 'border-blue-200/70',
    iconBg: 'from-blue-500 via-sky-500 to-indigo-600',
    iconColor: 'text-white',
    numberGradient: 'from-blue-700 via-sky-600 to-indigo-700',
    labelColor: 'text-blue-950',
    subtextColor: 'text-blue-800/80',
    glow: 'shadow-blue-200/50 hover:shadow-blue-300/60',
    accentLine: 'from-blue-400 via-sky-400 to-indigo-500',
    cornerAccent: 'from-blue-400 to-indigo-500',
  },
  amber: {
    cardBg: 'from-amber-50 via-orange-50 to-yellow-50',
    cardBorder: 'border-amber-200/70',
    iconBg: 'from-amber-400 via-orange-500 to-red-500',
    iconColor: 'text-white',
    numberGradient: 'from-amber-600 via-orange-600 to-red-700',
    labelColor: 'text-amber-950',
    subtextColor: 'text-amber-800/80',
    glow: 'shadow-amber-200/50 hover:shadow-amber-300/60',
    accentLine: 'from-amber-400 via-orange-400 to-red-500',
    cornerAccent: 'from-amber-400 to-orange-500',
  },
  rose: {
    cardBg: 'from-rose-50 via-pink-50 to-fuchsia-50',
    cardBorder: 'border-rose-200/70',
    iconBg: 'from-rose-400 via-pink-500 to-fuchsia-600',
    iconColor: 'text-white',
    numberGradient: 'from-rose-600 via-pink-600 to-fuchsia-700',
    labelColor: 'text-rose-950',
    subtextColor: 'text-rose-800/80',
    glow: 'shadow-rose-200/50 hover:shadow-rose-300/60',
    accentLine: 'from-rose-400 via-pink-400 to-fuchsia-500',
    cornerAccent: 'from-rose-400 to-fuchsia-500',
  },
};

export default function TrustSection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const stats = trustStats[locale as 'ar' | 'en'];

  return (
    <section
      className="py-24 bg-gradient-to-b from-white via-sky-50/60 to-indigo-50/50 relative overflow-hidden"
      aria-labelledby="trustsection-heading"
      aria-label={isRTL ? 'ثقة أولياء الأمور والإحصائيات' : 'Parent trust and statistics'}
    >
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-sky-300/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-20 left-0 w-[32rem] h-[32rem] bg-fuchsia-300/15 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] bg-gradient-to-br from-emerald-100/50 via-transparent to-sky-100/40 rounded-full blur-3xl -z-10" aria-hidden="true" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] -z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 90, 168, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 90, 168, 1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <header id="trustsection-heading" className="mb-16">
          <SectionTitle
            badge={isRTL ? 'الثقة' : 'Trust'}
            title={isRTL ? 'لماذا يثق بنا الآلاف؟' : 'Why Thousands Trust Us'}
            subtitle={isRTL ? 'أرقام تتحدث عن نفسها' : 'Numbers that speak for themselves'}
          />
        </header>

        {/* Statistics Grid */}
        <motion.div
          className={cn(
            'grid gap-6 lg:gap-8 mb-16 max-w-7xl mx-auto',
            stats.length === 3 
              ? 'md:grid-cols-2 xl:grid-cols-3' 
              : 'md:grid-cols-2 xl:grid-cols-4'
          )}
          role="list"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const scheme = statColorSchemes[stat.color as keyof typeof statColorSchemes] || statColorSchemes.primary;
            return (
              <motion.article
                key={i}
                role="listitem"
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    transition: { 
                      duration: 0.6, 
                      ease: "easeOut" as const,
                    } 
                  }
                }}
                whileHover={{ 
                  y: -14, 
                  scale: 1.03, 
                  transition: { duration: 0.3, ease: 'easeOut' } 
                }}
                className={cn(
                  'group relative overflow-hidden rounded-[2rem] p-8 lg:p-10',
                  'bg-gradient-to-br backdrop-blur-sm border',
                  'shadow-xl hover:shadow-2xl transition-shadow duration-500',
                  scheme.cardBg,
                  scheme.cardBorder,
                  scheme.glow,
                )}
              >
                {/* Glow Shimmer Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `linear-gradient(${isRTL ? '225deg' : '135deg'}, rgba(255,255,255,0.7) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.5) 100%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Radial highlight on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${isRTL ? '85% 15%' : '15% 15%'}, rgba(255,255,255,0.4), transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Top Row: Icon + Corner Accent */}
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon Container */}
                    <div className={cn(
                      'rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl shadow-black/5',
                      'bg-gradient-to-br',
                      'group-hover:scale-115 group-hover:-rotate-6',
                      scheme.iconBg,
                      'w-14 h-14 lg:w-16 lg:h-16'
                    )}>
                      <Icon 
                        className={cn(
                          'drop-shadow-md transition-transform duration-500',
                          'w-7 h-7 lg:w-8 lg:h-8',
                          scheme.iconColor,
                          'group-hover:scale-110'
                        )} 
                      />
                    </div>

                    {/* Corner Accent */}
                    <div 
                      className={cn(
                        'w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br opacity-50 transition-all duration-500',
                        'group-hover:scale-130 group-hover:opacity-80 group-hover:rotate-45',
                        scheme.cornerAccent
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Big Value Number */}
                  <div className={cn(
                    'font-extrabold mb-4 tracking-tight bg-gradient-to-br bg-clip-text text-transparent leading-none',
                    'text-6xl md:text-7xl lg:text-[5.5rem]',
                    scheme.numberGradient,
                  )}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Divider */}
                  <div className={cn(
                    'h-[3px] w-16 rounded-full bg-gradient-to-r mb-5 transition-all duration-500 group-hover:w-28',
                    scheme.accentLine
                  )} aria-hidden="true" />

                  {/* Label */}
                  <h4 className={cn(
                    'font-bold mb-2.5 leading-snug',
                    'text-xl lg:text-2xl',
                    scheme.labelColor
                  )}>
                    {stat.label}
                  </h4>

                  {/* Subtext */}
                  <p className={cn(
                    'text-base lg:text-lg font-medium leading-relaxed mt-auto',
                    scheme.subtextColor
                  )}>
                    {stat.subtext}
                  </p>
                </div>

                {/* Bottom Progress Accent */}
                <div className={cn(
                  'absolute bottom-0 h-1.5 rounded-b-[2rem] bg-gradient-to-r transition-all duration-700 ease-out',
                  isRTL ? 'right-0' : 'left-0',
                  'w-0 group-hover:w-full',
                  scheme.accentLine
                )} aria-hidden="true" />

                {/* Floating decorative badge */}
                <div className={cn(
                  'absolute transition-all duration-500 opacity-40 group-hover:opacity-80 group-hover:scale-110',
                  isRTL ? 'bottom-6 left-6' : 'bottom-6 right-6'
                )} aria-hidden="true">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/80">
                    <div className={cn('w-2 h-2 rounded-full animate-pulse bg-gradient-to-r', scheme.accentLine)} />
                    <span className={cn('text-xs font-bold', scheme.labelColor)}>
                      {isRTL ? 'مصدق' : 'Verified'}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
