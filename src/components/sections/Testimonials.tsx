'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Quote, Star } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/cn';
import Image from 'next/image';

export default function Testimonials() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const testimonials = {
    ar: [
      {
        id: 1,
        name: 'أحمد محمد',
        role: 'ولي أمر - المرحلة الابتدائية',
        content: 'مدرسة السهم الفريد غيرت حياة ابني للأفضل. المعلمون متميزون والمرافق ممتازة.',
        rating: 5,
        avatar: '/images/testimonials/parent1.jpg',
      },
      {
        id: 2,
        name: 'فاطمة علي',
        role: 'ولية أمر - المرحلة الإعدادية',
        content: 'أفضل قرار اتخذته هو تسجيل بناتي في هذه المدرسة. التعليم والقيم على أعلى مستوى.',
        rating: 5,
        avatar: '/images/testimonials/parent2.jpg',
      },
      {
        id: 3,
        name: 'خالد سالم',
        role: 'ولي أمر - المرحلة الثانوية',
        content: 'الاهتمام الفردي بكل طالب والمتابعة المستمرة جعلت ابني يتفوق أكاديمياً وشخصياً.',
        rating: 5,
        avatar: '/images/testimonials/parent3.jpg',
      },
    ],
    en: [
      {
        id: 1,
        name: 'Ahmed Mohammed',
        role: 'Parent - Primary Stage',
        content: 'Al-Sahm Al-Fareed School changed my son\'s life for the better. Teachers are excellent and facilities are outstanding.',
        rating: 5,
        avatar: '/images/testimonials/parent1.jpg',
      },
      {
        id: 2,
        name: 'Fatima Ali',
        role: 'Parent - Preparatory Stage',
        content: 'Best decision I made was enrolling my daughters in this school. Education and values are top-notch.',
        rating: 5,
        avatar: '/images/testimonials/parent2.jpg',
      },
      {
        id: 3,
        name: 'Khaled Salem',
        role: 'Parent - Secondary Stage',
        content: 'Individual attention to each student and continuous follow-up made my son excel academically and personally.',
        rating: 5,
        avatar: '/images/testimonials/parent3.jpg',
      },
    ],
  };

  const items = testimonials[locale as 'ar' | 'en'];

  return (
    <section aria-labelledby="testimonials-heading" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-signature rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <header>
          <SectionTitle
            id="testimonials-heading"
            badge={isRTL ? '💬 آراء أولياء الأمور' : '💬 Parent Testimonials'}
            title={isRTL ? 'ماذا يقول أولياء الأمور' : 'What Parents Say'}
            subtitle={isRTL ? 'آراء حقيقية من أولياء أمور طلابنا' : 'Real feedback from our parents'}
          />
        </header>

        {items.length === 0 ? (
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="md:col-span-2 lg:col-span-3 flex items-center justify-center min-h-[300px] rounded-xl bg-white border border-slate-100 bg-gradient-to-br from-brand-accent/5 to-brand-signature/5">
              <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                  <Quote className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-brand-signature font-bold text-lg mb-2">
                  {isRTL ? 'لا توجد شهادات حالياً' : 'No testimonials yet'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {isRTL ? 'ستظهر قريباً' : 'Coming soon'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div role="list" className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <article aria-label={isRTL ? `شهادة من ${testimonial.name}` : `Testimonial from ${testimonial.name}`} className="relative bg-neutral-50 p-8 rounded-2xl border border-neutral-200 hover:border-brand-signature hover:shadow-lg transition-all h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-brand-signature/10 rounded-full flex items-center justify-center group-hover:bg-brand-signature/20 transition-colors">
                      <Quote className="w-6 h-6 text-brand-signature" />
                    </div>

                    {/* Stars */}
                    <div className={cn('flex gap-1 mb-4', isRTL && 'flex-row-reverse')}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-neutral-700 leading-relaxed mb-6 flex-1 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className={cn('flex items-center gap-4', isRTL && 'flex-row-reverse')}>
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="48px"
                    />
                  </div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h4 className="font-bold text-neutral-900">{testimonial.name}</h4>
                        <p className="text-sm text-neutral-600">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className={cn(
                      'absolute bottom-0 w-20 h-20 bg-gradient-to-br from-brand-accent/5 to-transparent',
                      isRTL ? 'right-0 rounded-bl-2xl' : 'left-0 rounded-br-2xl'
                    )} />
                  </article>
                </motion.div>
              ))}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-signature/10 to-brand-accent/10 rounded-full border border-brand-signature/20">
                <div className="flex -space-x-2">
                  {items.slice(0, 3).map((t, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-neutral-200">
                  <Image src={t.avatar} alt={isRTL ? `صورة ${t.name}` : `Avatar of ${t.name}`} fill className="object-cover" loading="lazy" sizes="40px" />
                </div>
              ))}
                </div>
                <div className={cn('text-sm font-semibold text-neutral-900', isRTL && 'text-right')}>
                  {isRTL ? '250+ عائلة تثق بنا' : '250+ Families Trust Us'}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
