'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Plus, Minus } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/cn';
import { useState } from 'react';

export default function FAQSection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = {
    ar: [
      {
        question: "ما هي ساعات الدوام؟",
        answer: "ساعات الدوام من الأحد إلى الخميس من 8:00 صباحاً حتى 2:00 ظهراً."
      },
      {
        question: "كيف يمكنني التسجيل؟",
        answer: "يمكنك التسجيل بزيارة المدرسة أو التواصل معنا عبر الهاتف أو البريد الإلكتروني."
      },
      {
        question: "هل توفر المدرسة مواصلات؟",
        answer: "نعم، نوفر خدمة مواصلات آمنة ومريحة لجميع الطلاب."
      },
      {
        question: "ما هي الأنشطة اللاصفية؟",
        answer: "نوفر مجموعة متنوعة من الأنشطة الرياضية والثقافية والفنية."
      }
    ],
    en: [
      {
        question: "What are the working hours?",
        answer: "Working hours are Sunday to Thursday from 8:00 AM to 2:00 PM."
      },
      {
        question: "How can I register?",
        answer: "You can register by visiting the school or contacting us by phone or email."
      },
      {
        question: "Does the school provide transportation?",
        answer: "Yes, we provide safe and comfortable transportation service for all students."
      },
      {
        question: "What are the extracurricular activities?",
        answer: "We offer a variety of sports, cultural and artistic activities."
      }
    ]
  };


  const items = faqs[locale as 'ar' | 'en'];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-24 bg-neutral-50"
      aria-label={isRTL ? 'الأسئلة الشائعة' : 'Frequently asked questions'}
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6">
        <header id="faq-heading">
          <SectionTitle
            badge={isRTL ? '❓ الأسئلة الشائعة' : '❓ FAQ'}
            title={isRTL ? 'أسئلة يتكرر طرحها' : 'Frequently Asked Questions'}
            subtitle={isRTL ? 'إجابات لأهم الأسئلة حول مدرستنا' : 'Answers to the most common questions about our school'}
          />
        </header>

        <div className="mt-16 max-w-4xl mx-auto">
          <motion.div
            role="list"
            className="space-y-4"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {items.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <motion.div
                  key={i}
                  role="listitem"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className={cn(
                      'w-full bg-white rounded-2xl border-2 transition-all text-left',
                      isOpen 
                        ? 'border-brand-signature shadow-lg' 
                        : 'border-neutral-200 hover:border-neutral-300 shadow-sm'
                    )}
                  >
                    <div className={cn(
                      'flex items-center justify-between gap-4 p-6',
                      isRTL && 'flex-row-reverse text-right'
                    )}>
                      <h3
                        id={`faq-question-${i}`}
                        className={cn(
                          'text-lg font-bold transition-colors flex-1',
                          isOpen ? 'text-brand-signature' : 'text-neutral-900'
                        )}
                      >
                        {faq.question}
                      </h3>
                      
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                        isOpen 
                          ? 'bg-brand-signature text-white' 
                          : 'bg-neutral-100 text-neutral-600'
                      )}>
                        {isOpen ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`faq-question-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className={cn(
                            'px-6 pb-6 pt-2',
                            isRTL && 'text-right'
                          )}>
                            <div className="w-full h-px bg-gradient-to-r from-brand-signature/20 via-brand-accent/20 to-transparent mb-4" />
                            <p className="text-neutral-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center p-8 bg-gradient-to-br from-brand-signature/5 to-brand-accent/5 rounded-2xl border border-brand-signature/20"
          >
            <h4 className="text-xl font-bold text-neutral-900 mb-3">
              {isRTL ? 'لديك سؤال آخر؟' : 'Have another question?'}
            </h4>
            <p className="text-neutral-600 mb-4">
              {isRTL 
                ? 'لا تتردد في التواصل معنا، فريقنا جاهز لمساعدتك'
                : "Don't hesitate to contact us, our team is ready to help"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <a href="tel:0945437366" className="flex items-center gap-2 text-brand-signature hover:text-brand-signature/80 font-semibold">
                📞 0945437366
              </a>
              <span className="text-neutral-300">|</span>
              <a href="mailto:alsahmalfareedinfo@gmail.com" className="flex items-center gap-2 text-brand-signature hover:text-brand-signature/80 font-semibold">
                ✉️ alsahmalfareedinfo@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
