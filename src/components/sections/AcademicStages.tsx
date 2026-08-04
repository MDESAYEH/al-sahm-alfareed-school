'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Baby, Book, FlaskConical, GraduationCap, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/cn';
import { ArrowPattern } from '@/components/ui/ArrowPattern';

const stages = {
  ar: [
    {
      icon: Baby,
      name: 'رياض الأطفال',
      ageRange: '3-5 سنوات',
      description: 'بداية مشرقة لمستقبل واعد من خلال التعلم باللعب وتنمية المهارات الأساسية',
      features: ['تعلم باللعب', 'تنمية المهارات', 'بيئة محفزة', 'أنشطة متنوعة'],
      color: 'rose',
      number: 1,
    },
    {
      icon: Book,
      name: 'المرحلة الابتدائية',
      ageRange: '6-11 سنة',
      description: 'بناء الأساس الأكاديمي القوي من خلال منهج متطور وأنشطة تفاعلية',
      features: ['منهج متطور', 'تعليم تفاعلي', 'أنشطة لامنهجية', 'رعاية شاملة'],
      color: 'sky',
      number: 2,
    },
    {
      icon: FlaskConical,
      name: 'المرحلة الإعدادية',
      ageRange: '12-14 سنة',
      description: 'تطوير المهارات الأكاديمية والشخصية مع التركيز على التفكير النقدي',
      features: ['تفكير نقدي', 'مختبرات حديثة', 'مشاريع بحثية', 'توجيه مهني'],
      color: 'violet',
      number: 3,
    },
    {
      icon: GraduationCap,
      name: 'المرحلة الثانوية',
      ageRange: '15-18 سنة',
      description: 'التحضير للجامعة والحياة المهنية من خلال برامج أكاديمية متقدمة',
      features: ['تحضير جامعي', 'برامج متقدمة', 'استشارات مهنية', 'قيادة وإبداع'],
      color: 'emerald',
      number: 4,
    },
  ],
  en: [
    {
      icon: Baby,
      name: 'Kindergarten',
      ageRange: '3-5 years',
      description: 'A bright start to a promising future through play-based learning and essential skill development',
      features: ['Play-based Learning', 'Skill Development', 'Nurturing Environment', 'Diverse Activities'],
      color: 'rose',
      number: 1,
    },
    {
      icon: Book,
      name: 'Primary School',
      ageRange: '6-11 years',
      description: 'Building strong academic foundations through advanced curriculum and interactive activities',
      features: ['Advanced Curriculum', 'Interactive Learning', 'Extracurriculars', 'Comprehensive Care'],
      color: 'sky',
      number: 2,
    },
    {
      icon: FlaskConical,
      name: 'Preparatory School',
      ageRange: '12-14 years',
      description: 'Developing academic and personal skills with focus on critical thinking',
      features: ['Critical Thinking', 'Modern Labs', 'Research Projects', 'Career Guidance'],
      color: 'violet',
      number: 3,
    },
    {
      icon: GraduationCap,
      name: 'Secondary School',
      ageRange: '15-18 years',
      description: 'Preparing for university and career through advanced academic programs',
      features: ['University Prep', 'Advanced Programs', 'Career Counseling', 'Leadership & Innovation'],
      color: 'emerald',
      number: 4,
    },
  ],
};

const stageColorSchemes: Record<string, {
  cardBg: string;
  cardBorder: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  descColor: string;
  ageBg: string;
  ageText: string;
  featureText: string;
  bulletColor: string;
  ctaText: string;
  glow: string;
  accentLine: string;
  stageNumberBg: string;
  stageNumberText: string;
}> = {
  rose: {
    cardBg: 'from-rose-50 via-pink-50 to-fuchsia-50',
    cardBorder: 'border-rose-200/70',
    iconBg: 'from-rose-400 via-pink-500 to-fuchsia-500',
    iconColor: 'text-white',
    titleColor: 'text-rose-950',
    descColor: 'text-rose-900/75',
    ageBg: 'from-rose-100 to-pink-100 border-rose-300/60',
    ageText: 'text-rose-700',
    featureText: 'text-rose-900/85',
    bulletColor: 'from-rose-400 to-pink-500',
    ctaText: 'text-rose-700 group-hover:text-rose-800',
    glow: 'shadow-rose-200/50 hover:shadow-rose-300/60',
    accentLine: 'from-rose-400 via-pink-400 to-fuchsia-500',
    stageNumberBg: 'from-rose-500 to-pink-600',
    stageNumberText: 'text-white',
  },
  sky: {
    cardBg: 'from-sky-50 via-blue-50 to-cyan-50',
    cardBorder: 'border-sky-200/70',
    iconBg: 'from-sky-400 via-blue-500 to-cyan-500',
    iconColor: 'text-white',
    titleColor: 'text-sky-950',
    descColor: 'text-sky-900/75',
    ageBg: 'from-sky-100 to-blue-100 border-sky-300/60',
    ageText: 'text-sky-700',
    featureText: 'text-sky-900/85',
    bulletColor: 'from-sky-400 to-blue-500',
    ctaText: 'text-sky-700 group-hover:text-sky-800',
    glow: 'shadow-sky-200/50 hover:shadow-sky-300/60',
    accentLine: 'from-sky-400 via-blue-400 to-cyan-500',
    stageNumberBg: 'from-sky-500 to-blue-600',
    stageNumberText: 'text-white',
  },
  violet: {
    cardBg: 'from-violet-50 via-purple-50 to-indigo-50',
    cardBorder: 'border-violet-200/70',
    iconBg: 'from-violet-400 via-purple-500 to-indigo-500',
    iconColor: 'text-white',
    titleColor: 'text-violet-950',
    descColor: 'text-violet-900/75',
    ageBg: 'from-violet-100 to-purple-100 border-violet-300/60',
    ageText: 'text-violet-700',
    featureText: 'text-violet-900/85',
    bulletColor: 'from-violet-400 to-purple-500',
    ctaText: 'text-violet-700 group-hover:text-violet-800',
    glow: 'shadow-violet-200/50 hover:shadow-violet-300/60',
    accentLine: 'from-violet-400 via-purple-400 to-indigo-500',
    stageNumberBg: 'from-violet-500 to-purple-600',
    stageNumberText: 'text-white',
  },
  emerald: {
    cardBg: 'from-emerald-50 via-teal-50 to-green-50',
    cardBorder: 'border-emerald-200/70',
    iconBg: 'from-emerald-400 via-teal-500 to-green-500',
    iconColor: 'text-white',
    titleColor: 'text-emerald-950',
    descColor: 'text-emerald-900/75',
    ageBg: 'from-emerald-100 to-teal-100 border-emerald-300/60',
    ageText: 'text-emerald-700',
    featureText: 'text-emerald-900/85',
    bulletColor: 'from-emerald-400 to-teal-500',
    ctaText: 'text-emerald-700 group-hover:text-emerald-800',
    glow: 'shadow-emerald-200/50 hover:shadow-emerald-300/60',
    accentLine: 'from-emerald-400 via-teal-400 to-green-500',
    stageNumberBg: 'from-emerald-500 to-teal-600',
    stageNumberText: 'text-white',
  },
};

export default function AcademicStages() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const items = stages[locale as 'ar' | 'en'];

  return (
    <section
      className="py-24 bg-gradient-to-br from-white via-purple-50/30 to-sky-50/40 relative overflow-hidden"
      aria-labelledby="academicstages-heading"
      aria-label={isRTL ? 'المراحل الدراسية' : 'Academic stages'}
    >
      {/* Decorative Background Blobs - Kindergarten→Primary→Prep→Secondary progression */}
      <div className="absolute top-10 right-0 w-[26rem] h-[26rem] bg-rose-300/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute top-1/3 left-10 w-[22rem] h-[22rem] bg-sky-300/20 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-violet-300/18 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emerald-300/18 rounded-full blur-3xl -z-10" aria-hidden="true" />

      {/* Arrow Pattern (existing) */}
      <ArrowPattern opacity={0.025} className="text-brand-signature" />

      {/* Centered subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-gradient-to-tr from-fuchsia-100/40 via-transparent to-sky-100/40 rounded-full blur-3xl -z-10" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <header id="academicstages-heading" className="mb-16">
          <SectionTitle
            badge={isRTL ? 'المراحل الدراسية' : 'Academic Stages'}
            title={isRTL ? 'رحلة تعليمية متكاملة' : 'Complete Educational Journey'}
            subtitle={isRTL ? 'من رياض الأطفال حتى الثانوية العامة' : 'From Kindergarten through Secondary School'}
          />
        </header>

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7 max-w-7xl mx-auto"
          role="list"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.01, delayChildren: 0 } }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {items.map((stage, i) => {
            const Icon = stage.icon;
            const scheme = stageColorSchemes[stage.color as keyof typeof stageColorSchemes] || stageColorSchemes.sky;
            return (
              <motion.article
                key={i}
                role="listitem"
                variants={{
                  hidden: { opacity: 0, y: 5, scale: 0.98 },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    transition: { duration: 0.08, ease: [0.4, 0, 0.2, 1] } 
                  }
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03, 
                  transition: { duration: 0.05, ease: [0.4, 0, 0.2, 1] } 
                }}
                className="group"
              >
                <div className={cn(
                  'relative h-full rounded-[2rem] p-7 lg:p-8 overflow-hidden transition-all duration-[50ms]',
                  'bg-gradient-to-br backdrop-blur-sm border',
                  'shadow-xl hover:shadow-2xl',
                  scheme.cardBg,
                  scheme.cardBorder,
                  scheme.glow,
                )}>
                  {/* Decorative stage number badge (top-right or top-left) */}
                  <div className={cn(
                    'absolute flex items-center justify-center font-extrabold rounded-2xl shadow-lg shadow-black/5 transition-all duration-[50ms]',
                    'bg-gradient-to-br',
                    scheme.stageNumberBg,
                    scheme.stageNumberText,
                    'w-12 h-12 lg:w-14 lg:h-14 text-xl lg:text-2xl',
                    'group-hover:scale-110 group-hover:rotate-3',
                    isRTL ? 'top-6 left-6' : 'top-6 right-6'
                  )} aria-hidden="true">
                    {stage.number}
                    <span className="absolute -bottom-1 text-[0.6rem] opacity-70 font-bold">
                      /{items.length}
                    </span>
                  </div>

                  {/* Shimmer Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[60ms] pointer-events-none"
                    style={{
                      background: `linear-gradient(${isRTL ? '225deg' : '135deg'}, rgba(255,255,255,0.7) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.45) 100%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Radial highlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[50ms] pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${isRTL ? '20% 20%' : '80% 20%'}, rgba(255,255,255,0.4), transparent 60%)`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Container */}
                    <div className={cn(
                      'rounded-2xl flex items-center justify-center mb-6 transition-all duration-[50ms] shadow-xl shadow-black/5',
                      'bg-gradient-to-br',
                      'group-hover:scale-110 group-hover:-rotate-3',
                      scheme.iconBg,
                      'w-16 h-16 lg:w-18 lg:h-18'
                    )}>
                      <Icon 
                        className={cn(
                          'drop-shadow-md transition-transform duration-[50ms]',
                          'w-8 h-8 lg:w-9 lg:h-9',
                          scheme.iconColor,
                          'group-hover:scale-110'
                        )} 
                      />
                    </div>

                    {/* Title + Age Range */}
                    <div className="mb-5">
                      <h3 className={cn(
                        'font-extrabold mb-3 leading-tight tracking-tight',
                        'text-2xl lg:text-3xl',
                        scheme.titleColor,
                        'group-hover:scale-[1.02] transition-transform duration-[50ms]'
                      )}>
                        {stage.name}
                      </h3>
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-3.5 py-1.5 border rounded-full text-sm font-bold backdrop-blur-sm',
                        'bg-gradient-to-r',
                        scheme.ageBg,
                        scheme.ageText,
                      )}>
                        <CheckCircle2 className="w-4 h-4" />
                        {stage.ageRange}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={cn(
                      'font-medium leading-relaxed mb-6',
                      'text-base lg:text-[1.05rem]',
                      scheme.descColor,
                    )}>
                      {stage.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8 flex-grow">
                      {stage.features.map((feature, j) => (
                        <li key={j} className={cn('flex items-start gap-3', scheme.featureText)}>
                          <CheckCircle2 
                            className={cn(
                              'w-5 h-5 mt-0.5 flex-shrink-0 transition-all duration-[40ms]',
                              'bg-clip-text',
                              scheme.ctaText,
                              'group-hover:scale-110'
                            )}
                            strokeWidth={2.75}
                          />
                          <span className="font-medium text-sm lg:text-base leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Accent Progress Line */}
                  <div className={cn(
                    'absolute bottom-0 h-1.5 rounded-b-[2rem] bg-gradient-to-r transition-all duration-[80ms] ease-out',
                    isRTL ? 'right-0' : 'left-0',
                    'w-0 group-hover:w-full',
                    scheme.accentLine
                  )} aria-hidden="true" />

                  {/* Corner decorative accent */}
                  <div className={cn(
                    'absolute w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] opacity-40 transition-all duration-[50ms]',
                    'bg-gradient-to-br pointer-events-none',
                    scheme.accentLine,
                    '-z-10 blur-[2px] scale-75',
                    isRTL ? '-bottom-4 -right-4' : '-bottom-4 -left-4',
                    'group-hover:scale-105 group-hover:opacity-65'
                  )} aria-hidden="true" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
