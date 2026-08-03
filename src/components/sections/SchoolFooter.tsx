'use client';

import { useLocale } from 'next-intl';
import { Facebook, Mail, Phone, MapPin, ArrowUp, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import Image from 'next/image';

export default function SchoolFooter() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = {
    ar: {
      tagline: 'تعليم متميز... مستقبل واعد',
      about: 'مدرسة السهم الفريد الخاصة، مؤسسة تعليمية رائدة في ليبيا، نسعى لتقديم تعليم عالي الجودة يجمع بين الأصالة والمعاصرة.',
      contact: {
        title: 'تواصل معنا',
        address: 'ليبيا - طرابلس - طريق المشتل',
        phone: '0945437366',
        email: 'alsahmalfareedinfo@gmail.com',
        hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      },
      social: {
        title: 'تابعنا',
      },
      copyright: '© 2026 مدرسة السهم الفريد الخاصة. جميع الحقوق محفوظة.',
      backToTop: 'العودة للأعلى',
    },
    en: {
      tagline: 'Excellence in Education... Promising Future',
      about: 'Al-Sahm Al-Fareed Private School, a leading educational institution in Libya, we strive to provide high-quality education that combines authenticity and modernity.',
      contact: {
        title: 'Contact Us',
        address: 'Tripoli, Libya',
        phone: '0945437366',
        email: 'alsahmalfareedinfo@gmail.com',
        hours: 'Sunday - Thursday: 8:00 AM - 3:00 PM',
      },
      social: {
        title: 'Follow Us',
      },
      copyright: '© 2026 Al-Sahm Al-Fareed Private School. All rights reserved.',
      backToTop: 'Back to Top',
    },
  };

  const data = content[(locale as 'ar' | 'en') || 'ar'];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/19FK4XGdqH/', label: 'Facebook', name: 'Facebook' },
    { icon: MapPin, href: 'https://maps.app.goo.gl/M8AT5xLvGNBny7Tw5', label: isRTL ? 'موقعنا على الخريطة' : 'Our Location', name: 'Google Maps' },
  ];

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={isRTL ? 'تذييل موقع مدرسة السهم الفريد' : 'Al-Sahm Al-Fareed School site footer'}
      className="bg-white text-slate-700 relative border-t border-slate-200 overflow-hidden"
    >
      {/* خلفية ناعمة بإضاءة زاوية أنيقة ودون خطوط شبكية */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 ltr:-left-40 rtl:-right-40 w-96 h-96 bg-brand-accent/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">
          
          {/* قسم شعار المدرسة والتفاصيل */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block p-2.5 bg-slate-50/90 rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src="/logo.png"
                alt="Al-Sahm Al-Fareed"
                width={180}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </div>
            
            <p className="text-brand-accent font-semibold text-base tracking-wide">
              {data.tagline}
            </p>
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              {data.about}
            </p>
            
            {/* منصات التواصل الاجتماعي */}
            <div className="pt-3">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3">
                {data.social.title}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 hover:border-brand-accent/50 hover:bg-brand-accent/10 hover:text-brand-accent text-slate-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* رابط صفحة الشكاوى */}
            <div className="pt-2">
              <a
                href={`/${locale}/complaints`}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-signature to-brand-accent text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span>📝</span>
                <span>{isRTL ? 'الشكاوى والملاحظات' : 'Complaints & Feedback'}</span>
              </a>
            </div>
          </div>

          {/* قسم معلومات التواصل */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent inline-block" />
                {data.contact.title}
              </h4>
              
              <div className="space-y-3">
                {/* العنوان - Google Maps Link */}
                <a
                  href="https://maps.app.goo.gl/M8AT5xLvGNBny7Tw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-brand-accent/40 transition-colors cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-white text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 group-hover:text-slate-900 text-sm transition-colors">{data.contact.address}</span>
                </a>

                {/* رقم الهاتف */}
                <a
                  href={`tel:${data.contact.phone}`}
                  className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-brand-accent/40 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-white text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 group-hover:text-slate-900 text-sm transition-colors" dir="ltr">
                    {data.contact.phone}
                  </span>
                </a>

                {/* البريد الإلكتروني */}
                <a
                  href={`mailto:${data.contact.email}`}
                  className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-brand-accent/40 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-white text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 group-hover:text-slate-900 text-sm transition-colors">
                    {data.contact.email}
                  </span>
                </a>
              </div>
            </div>

            {/* ساعات العمل */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-slate-600 text-xs">
              <Clock className="w-4 h-4 text-brand-accent flex-shrink-0" />
              <span>{data.contact.hours}</span>
            </div>
          </div>

        </div>

        {/* الشريط السفلي */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-start">
            {data.copyright}
          </p>

          {/* زر العودة للأعلى */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 group"
          >
            <span>{data.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 text-brand-accent group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}