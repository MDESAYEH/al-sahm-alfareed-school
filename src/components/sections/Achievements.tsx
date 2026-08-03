'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Award, Trophy, Target, Zap } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/cn';

export default function Achievements() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const achievements = {
    ar: [
      {
        year: '2026',
        title: 'تنظيم الفعاليات التعليمية',
        description: 'المشاركة في تنظيم الأنشطة والفعاليات التعليمية والثقافية داخل المدرسة.',
        icon: Trophy,
        color: 'from-amber-400 to-orange-500',
        bgGlow: 'shadow-amber-400/20',
      },
      {
        year: '2025',
        title: 'دعم الأنشطة الطلابية',
        description: 'الاهتمام بالأنشطة الطلابية وتشجيع الطلبة على المشاركة والتفاعل داخل البيئة المدرسية.',
        icon: Award,
        color: 'from-emerald-400 to-teal-500',
        bgGlow: 'shadow-emerald-400/20',
      },
      {
        year: '2024',
        title: 'متابعة التحصيل الدراسي',
        description: 'متابعة المستوى الدراسي للطلاب والعمل على دعمهم وتحسين أدائهم الأكاديمي.',
        icon: Target,
        color: 'from-sky-400 to-blue-600',
        bgGlow: 'shadow-sky-400/20',
      },
      {
        year: '2023',
        title: 'تعزيز البيئة التعليمية',
        description: 'العمل على توفير بيئة مدرسية مناسبة تساعد الطلاب على التعلم وتنمية مهاراتهم.',
        icon: Zap,
        color: 'from-purple-400 to-pink-500',
        bgGlow: 'shadow-purple-400/20',
      },
    ],
    en: [
      {
        year: '2026',
        title: 'First Place National Competition',
        description: 'Our students excelled in the national science competition',
        icon: Trophy,
        color: 'from-amber-400 to-orange-500',
        bgGlow: 'shadow-amber-400/20',
      },
      {
        year: '2025',
        title: 'Educational Excellence Award',
        description: 'School received excellence award from Ministry of Education',
        icon: Award,
        color: 'from-emerald-400 to-teal-500',
        bgGlow: 'shadow-emerald-400/20',
      },
      {
        year: '2024',
        title: '100% Secondary Certificate Success',
        description: 'Achieved complete success rate for secondary students',
        icon: Target,
        color: 'from-sky-400 to-blue-600',
        bgGlow: 'shadow-sky-400/20',
      },
      {
        year: '2023',
        title: 'International Curriculum Accreditation',
        description: 'School received international academic accreditation',
        icon: Zap,
        color: 'from-purple-400 to-pink-500',
        bgGlow: 'shadow-purple-400/20',
      },
    ],
  };

  const items = achievements[locale as 'ar' | 'en'];

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-blue-50/30"
      aria-label={isRTL ? 'إنجازات المدرسة' : 'School achievements'}
      aria-labelledby="achievements-heading"
    >
      {/* Decorative background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-accent/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-brand-signature/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <header id="achievements-heading">
          <SectionTitle
            badge={isRTL ? '🏆 إنجازاتنا' : '🏆 Our Achievements'}
            title={isRTL ? 'رحلة من التميز والنجاح' : 'A Journey of Excellence'}
            subtitle={isRTL ? 'نفتخر بإنجازات طلابنا ومدرستنا' : 'We are proud of our students and school achievements'}
          />
        </header>

        <div className="mt-16 relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-signature via-brand-accent to-transparent hidden lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          <motion.div
            role="list"
            className="space-y-12"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {items.map((achievement, i) => {
              const Icon = achievement.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.article
                  key={i}
                  role="listitem"
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 40,
                      rotateY: isEven ? -10 : 10,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                      rotateY: 0,
                      transition: { duration: 0.6, ease: 'easeOut' }
                    }
                  }}
                  className={cn(
                    'lg:grid lg:grid-cols-2 lg:gap-16 items-center',
                    isEven ? 'lg:text-right' : 'lg:text-left'
                  )}
                >
                  <div className={cn(isEven ? 'lg:col-start-1' : 'lg:col-start-2')}>
                    <motion.div
                      className="relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 group overflow-hidden"
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Glowing background accent */}
                      <div
                        className={cn(
                          'absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl',
                          achievement.color
                        )}
                      />

                      <div className="relative z-10">
                        <div className={cn(
                          'flex items-center gap-4 mb-4',
                          isRTL ? 'flex-row-reverse' : 'flex-row'
                        )}>
                          <div className={cn(
                            'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
                            achievement.color
                          )}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <span className={cn(
                            'text-sm font-bold uppercase tracking-wider bg-gradient-to-r bg-clip-text text-transparent',
                            achievement.color
                          )}>
                            {achievement.year}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-neutral-900 mb-3 mt-2">
                          {achievement.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>

                      {/* Decorative corner gradient */}
                      <div className={cn(
                        'absolute bottom-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity',
                        isRTL ? 'left-0 rounded-tr-3xl' : 'right-0 rounded-tl-3xl',
                        `bg-gradient-to-br ${achievement.color}`
                      )} />
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <motion.div
                      className={cn(
                        'w-7 h-7 rounded-full bg-gradient-to-br shadow-lg border-4 border-white',
                        achievement.color
                      )}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <div className="absolute inset-0 rounded-full animate-ping bg-white/30" />
                    </motion.div>
                  </div>

                  <div className={cn('hidden lg:block', isEven ? 'lg:col-start-2' : 'lg:col-start-1')} />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}