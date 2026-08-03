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
        question: 'ما هي المراحل الدراسية المتوفرة؟',
        answer: 'توفر المدرسة جميع المراحل التعليمية: رياض الأطفال، الابتدائي، الإعدادي، والثانوي، مع مناهج متطورة تواكب أحدث معايير التعليم.',
      },
      {
        question: 'كيف يمكنني التسجيل لطفلي؟',
        answer: 'يمكنك التسجيل من خلال زيارة المدرسة أو تعبئة نموذج التسجيل الإلكتروني على موقعنا، ثم سيتم التواصل معك لإكمال الإجراءات.',
      },
      {
        question: 'ما هي الرسوم الدراسية؟',
        answer: 'تختلف الرسوم حسب المرحلة الدراسية. يرجى التواصل مع قسم القبول للحصول على تفاصيل دقيقة ومعرفة خيارات السداد المتاحة.',
      },
      {
        question: 'هل توفر المدرسة وسائل نقل؟',
        answer: 'نعم، توفر المدرسة خدمة النقل المدرسي بحافلات حديثة ومجهزة بكامل معايير السلامة، وتغطي معظم مناطق المدينة.',
      },
      {
        question: 'ما هي الأنشطة اللامنهجية المتوفرة؟',
        answer: 'نوفر مجموعة متنوعة من الأنشطة مثل الرياضة، الفنون، الموسيقى، البرمجة، اللغات، والنوادي الثقافية والعلمية.',
      },
      {
        question: 'هل المدرسة معتمدة؟',
        answer: 'نعم، المدرسة معتمدة من وزارة التربية والتعليم وحاصلة على اعتمادات دولية من عدة مؤسسات تعليمية عالمية.',
      },
    ],
    en: [
      {
        question: 'What educational stages are available?',
        answer: 'The school offers all educational stages: Kindergarten, Primary, Preparatory, and Secondary, with advanced curricula that meet the latest educational standards.',
      },
      {
        question: 'How can I register my child?',
        answer: 'You can register by visiting the school or filling out the online registration form on our website, then we will contact you to complete the procedures.',
      },
      {
        question: 'What are the tuition fees?',
        answer: 'Fees vary by educational stage. Please contact the admissions department for accurate details and available payment options.',
      },
      {
        question: 'Does the school provide transportation?',
        answer: 'Yes, the school provides school transportation with modern buses equipped with full safety standards, covering most city areas.',
      },
      {
        question: 'What extracurricular activities are available?',
        answer: 'We offer a variety of activities such as sports, arts, music, programming, languages, and cultural and scientific clubs.',
      },
      {
        question: 'Is the school accredited?',
        answer: 'Yes, the school is accredited by the Ministry of Education and has international accreditations from several global educational institutions.',
      },
    ],
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
