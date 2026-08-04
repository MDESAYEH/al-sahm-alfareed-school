'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ArrowLeft, Calendar, FileText, Phone } from 'lucide-react';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { cn } from '@/lib/cn';
import { ArrowPattern } from '@/components/ui/ArrowPattern';

export default function AdmissionCTA() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const actions = {
    ar: [
      { icon: Phone, label: 'اتصل بنا', href: 'tel:0945437366' },
    ],
    en: [
      { icon: Phone, label: 'Contact Us', href: 'tel:0945437366' },
    ],
  };

  const items = actions[locale as 'ar' | 'en'];

  return (
    <section
      className="py-24 relative overflow-hidden bg-gradient-to-br from-brand-accent via-turquoise-500 to-sky-400"
      aria-label={isRTL ? 'التسجيل والقبول' : 'Admissions and registration'}
      aria-labelledby="admission-heading"
    >
      <ArrowPattern opacity={0.08} className="text-white" />
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold mb-6"
          >
            {isRTL ? '🎓 التسجيل مفتوح الآن' : '🎓 Admissions Open Now'}
          </motion.div>

          <motion.h2
            id="admission-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {isRTL ? 'انضم إلى عائلتنا' : 'Join Our Family'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
          >
            {isRTL 
              ? 'التسجيل مفتوح الآن للعام الدراسي 2026-2027. ابدأ رحلة التميز مع أبنائك'
              : 'Registration now open for 2026-2027 academic year. Start your journey of excellence'}
          </motion.p>

          <motion.div
            role="list"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {items.map((action, i) => {
              const Icon = action.icon;
              return (
                <div key={i} role="listitem">
                  <a href={action.href}>
                    <PremiumButton
                      variant="outline"
                      size="lg"
                      icon={i === 1 ? <ArrowLeft className={cn('w-5 h-5', isRTL && 'rotate-180')} /> : <Icon className="w-5 h-5" />}
                      iconPosition={i === 1 ? (isRTL ? 'left' : 'right') : 'left'}
                      className={cn(
                        'border-2 border-white text-white backdrop-blur-md',
                        i === 1 
                          ? 'bg-white text-brand-accent hover:bg-white/90 hover:text-brand-accent shadow-2xl' 
                          : 'bg-white/10 hover:bg-white/20 hover:border-white'
                      )}
                    >
                      {action.label}
                    </PremiumButton>
                  </a>
                </div>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-sm"
          >
            {isRTL ? (
              <>للاستفسارات: <a href="tel:0945437366" className="underline hover:text-white">📞 0945437366</a> | <a href="mailto:alsahmalfareedinfo@gmail.com" className="underline hover:text-white">✉️ alsahmalfareedinfo@gmail.com</a></>
            ) : (
              <>For inquiries: <a href="tel:0945437366" className="underline hover:text-white">📞 0945437366</a> | <a href="mailto:alsahmalfareedinfo@gmail.com" className="underline hover:text-white">✉️ alsahmalfareedinfo@gmail.com</a></>
            )}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
