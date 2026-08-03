'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Quote, GraduationCap, Heart, Users } from 'lucide-react';
import { cn } from '@/lib/cn';
import Image from 'next/image';

export default function PrincipalMessage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const content = {
    ar: {
      name: 'أ. رمضان محمد العالم',
      title: 'مدير المدرسة',
      message: `بسم الله الرحمن الرحيم

أبنائي وبناتي الطلبة، وأولياء الأمور الكرام...

يسعدني أن أرحب بكم في مدرسة السهم الفريد، حيث نؤمن بأن التعليم رسالة، وأن بناء الإنسان هو أعظم استثمار للمستقبل.

نعمل على توفير بيئة تعليمية آمنة ومحفزة تجمع بين الجودة الأكاديمية، وغرس القيم، وتنمية الإبداع، وصقل المهارات، حتى يصبح طلابنا قادرين على التفكير، والابتكار، وتحمل المسؤولية، والمساهمة الإيجابية في خدمة مجتمعهم ووطنهم.

إن نجاح المدرسة لا يتحقق إلا بالشراكة الحقيقية بين الإدارة والمعلمين وأولياء الأمور، لذلك نحرص على بناء جسور من الثقة والتواصل المستمر بما يحقق مصلحة أبنائنا الطلبة.

نسأل الله أن يجعل هذا العام الدراسي عامًا مليئًا بالنجاح والتميز والإنجاز، وأن يوفق أبناءنا لتحقيق طموحاتهم العلمية والعملية.

أهلاً وسهلاً بكم في مدرسة السهم الفريد... حيث يبدأ التميز.`,
      quote: 'في مدرسة السهم الفريد لا نعلّم أبناءنا كيف ينجحون في الاختبارات فقط، بل نهيئهم ليقودوا مستقبلهم بثقة، وأخلاق، ومعرفة.',
      values: [
        { icon: GraduationCap, label: 'التميز الأكاديمي' },
        { icon: Heart, label: 'بناء الشخصية' },
        { icon: Users, label: 'الشراكة مع الأسرة' },
      ],
      image: '/images/principal.jpg',
    },
    en: {
      name: 'Mr. Ramadan Mohammed Al-Alam',
      title: 'School Principal',
      message: `Welcome to Al-Sahm Al-Fareed School, where education is more than classrooms and textbooks—it is a journey of character, knowledge, and lifelong growth.

Our mission is to provide a safe, inspiring, and innovative learning environment that empowers every student to discover their potential, develop critical thinking, embrace strong values, and become confident contributors to society.

We believe that genuine success is achieved through the partnership between the school, teachers, students, and parents. Together, we prepare a generation capable of shaping a brighter future with excellence, responsibility, and creativity.

We look forward to welcoming you to a community where every learner is valued and every achievement is celebrated.`,
      quote: 'We don\'t simply prepare students for exams—we prepare them for life.',
      values: [
        { icon: GraduationCap, label: 'Academic Excellence' },
        { icon: Heart, label: 'Character Building' },
        { icon: Users, label: 'Partnership with Family' },
      ],
      image: '/images/principal.jpg',
    },
  };

  const data = content[locale as 'ar' | 'en'];

  return (
    <section
      className="py-24 bg-gradient-to-br from-slate-50/90 via-white to-amber-50/30 relative overflow-hidden"
      aria-label={isRTL ? 'كلمة مدير المدرسة' : 'Principal message'}
      aria-labelledby="principal-heading"
    >
      {/* School Logo as subtle background watermark */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="relative w-[600px] h-[600px]">
          <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Decorative elements - more elegant */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl -z-10" aria-hidden="true" />
      
      {/* Simple decorative border on top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-brand-signature/40 to-transparent rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm border border-brand-signature/20 rounded-full text-brand-signature font-semibold text-sm shadow-lg shadow-brand-signature/5">
            {isRTL ? '💼 كلمة المدير' : '💼 Principal\'s Message'}
          </span>
          <h2 id="principal-heading" className="sr-only">
            {isRTL ? 'كلمة مدير المدرسة' : 'Principal Message'}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className={cn(
            'grid lg:grid-cols-5 gap-12 lg:gap-16 items-start',
            isRTL && 'lg:grid-flow-dense'
          )}>
            {/* Left side - Principal Photo with elegant frame */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'lg:col-span-2 relative',
                isRTL ? 'lg:col-start-4' : 'lg:col-start-1'
              )}
            >
              <div className="relative max-w-sm mx-auto">
                {/* Photo frame with golden border - School Logo */}
                <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl shadow-brand-signature/20 border-4 border-white/80 ring-4 ring-brand-signature/20 ring-offset-4 ring-offset-white bg-white/90 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo.png"
                      alt={isRTL ? 'شعار مدرسة السهم الفريد' : 'Al-Sahm Al-Fareed School Logo'}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Decorative golden crescent/pattern above */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-amber-300/30 via-brand-signature/20 to-amber-300/30 rounded-full blur-sm" />
                
                {/* Quote card - floating elegantly */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className={cn(
                    'absolute -bottom-8 w-[90%] bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50',
                    isRTL ? 'left-0' : 'right-0'
                  )}
                >
                  <Quote className="w-5 h-5 text-brand-accent mb-1.5 opacity-70" />
                  <p className="text-sm text-neutral-700 italic leading-relaxed font-medium">
                    &ldquo;{data.quote}&rdquo;
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Message content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'lg:col-span-3 space-y-6',
                isRTL ? 'lg:col-start-1 lg:pr-8' : 'lg:pl-8'
              )}
            >
              {/* Name & Title */}
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1 tracking-tight">
                  {data.name}
                </h3>
                <p className="text-brand-signature font-medium flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-accent" />
                  {data.title}
                </p>
              </div>

              {/* Main message - formatted with proper spacing */}
              <div className={cn(
                'prose prose-lg max-w-none',
                isRTL ? 'prose-arabic text-right' : 'text-left',
              )}>
                <div className="text-neutral-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                  {data.message}
                </div>
              </div>

              {/* Values - replacing stats */}
              <div role="list" className="grid grid-cols-3 gap-3 pt-2">
                {data.values.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      role="listitem"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-center gap-2 bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-neutral-200/50 shadow-sm"
                    >
                      <Icon className="w-5 h-5 text-brand-signature flex-shrink-0" />
                      <span className="text-sm font-medium text-neutral-700">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}