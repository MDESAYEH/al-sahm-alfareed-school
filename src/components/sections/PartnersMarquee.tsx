'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Baby, Sparkles, BookOpen, Microscope, GraduationCap, Trophy } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/cn';

export default function GradesShowcase() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const grades = [
    { 
      id: 1, 
      nameAr: 'رياض الأطفال', 
      nameEn: 'Kindergarten',
      icon: Baby,
      color: 'from-pink-500 to-rose-500'
    },
    { 
      id: 2, 
      nameAr: 'تمهيدي', 
      nameEn: 'Pre-Primary',
      icon: Sparkles,
      color: 'from-purple-500 to-violet-500'
    },
    { 
      id: 3, 
      nameAr: 'أول ابتدائي', 
      nameEn: '1st Grade',
      icon: BookOpen,
      color: 'from-blue-500 to-sky-500'
    },
    { 
      id: 4, 
      nameAr: 'ثاني ابتدائي', 
      nameEn: '2nd Grade',
      icon: BookOpen,
      color: 'from-cyan-500 to-teal-500'
    },
    { 
      id: 5, 
      nameAr: 'ثالث ابتدائي', 
      nameEn: '3rd Grade',
      icon: BookOpen,
      color: 'from-teal-500 to-emerald-500'
    },
    { 
      id: 6, 
      nameAr: 'رابع ابتدائي', 
      nameEn: '4th Grade',
      icon: BookOpen,
      color: 'from-emerald-500 to-green-500'
    },
    { 
      id: 7, 
      nameAr: 'خامس ابتدائي', 
      nameEn: '5th Grade',
      icon: BookOpen,
      color: 'from-lime-500 to-green-600'
    },
    { 
      id: 8, 
      nameAr: 'سادس ابتدائي', 
      nameEn: '6th Grade',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500'
    },
    { 
      id: 9, 
      nameAr: 'أول إعدادي', 
      nameEn: '7th Grade',
      icon: Microscope,
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 10, 
      nameAr: 'ثاني إعدادي', 
      nameEn: '8th Grade',
      icon: Microscope,
      color: 'from-red-500 to-rose-600'
    },
    { 
      id: 11, 
      nameAr: 'ثالث إعدادي', 
      nameEn: '9th Grade',
      icon: Microscope,
      color: 'from-fuchsia-500 to-pink-600'
    },
    { 
      id: 12, 
      nameAr: 'أول ثانوي', 
      nameEn: '10th Grade',
      icon: GraduationCap,
      color: 'from-indigo-500 to-blue-600'
    },
    { 
      id: 13, 
      nameAr: 'ثاني ثانوي علمي', 
      nameEn: '11th Grade',
      icon: GraduationCap,
      color: 'from-violet-500 to-purple-600'
    },
        { 
      id: 14, 
      nameAr: 'ثاني ثانوي ادبي', 
      nameEn: '11th Grade',
      icon: GraduationCap,
      color: 'from-violet-500 to-purple-600'
    },
    { 
      id: 15, 
      nameAr: 'ثالث ثانوي علمي', 
      nameEn: '12th Grade',
      icon: Trophy,
      color: 'from-yellow-500 to-amber-600'
    },
        { 
      id: 16, 
      nameAr: 'ثالث ثانوي ادبي', 
      nameEn: '12th Grade',
      icon: Trophy,
      color: 'from-yellow-500 to-amber-600'
    },
  ];

  // Duplicate for seamless loop
  const duplicatedGrades = [...grades, ...grades];

  return (
    <section
      className="py-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 border-y border-indigo-100/50"
      aria-labelledby="grades-heading"
      aria-label={isRTL ? 'الصفوف الدراسية' : 'Academic Grades'}
    >
      <div className="container mx-auto px-6">
        <header id="grades-heading">
          <SectionTitle
            badge={isRTL ? '🎓 الصفوف الدراسية' : '🎓 Academic Grades'}
            title={isRTL ? 'رحلة تعليمية متكاملة من الحضانة إلى الثانوية' : 'Complete Educational Journey from KG to High School'}
            subtitle={isRTL ? 'نوفر تعليماً متميزاً لجميع المراحل الدراسية' : 'Providing exceptional education for all academic stages'}
            className="mb-16"
          />
        </header>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          {/* Scrolling Content - Infinite */}
          <motion.div
            animate={{
              x: isRTL ? [0, '50%'] : ['0%', '-50%'],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
            className="flex gap-5 items-center will-change-transform py-4"
            role="list"
          >
            {duplicatedGrades.map((grade, i) => {
              const Icon = grade.icon;
              return (
                <motion.div
                  key={`${grade.id}-${i}`}
                  role="listitem"
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-shrink-0 w-64 group"
                >
                  <div className={cn(
                    "relative p-5 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500",
                    "bg-white/90 border-slate-200/60",
                    "hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/20",
                    "overflow-hidden"
                  )}>
                    {/* Background gradient */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                      "bg-gradient-to-br",
                      grade.color
                    )} />

                    {/* Icon */}
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-500",
                      "bg-gradient-to-br shadow-lg",
                      grade.color,
                      "group-hover:scale-110 group-hover:rotate-6"
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Grade Name */}
                    <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">
                      {isRTL ? grade.nameAr : grade.nameEn}
                    </h3>

                    {/* Age Range */}
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        "bg-gradient-to-br",
                        grade.color
                      )} />
                    </div>

                    {/* Decorative line */}
                    <div className={cn(
                      "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500",
                      "bg-gradient-to-r",
                      grade.color
                    )} />

                    {/* Corner accent */}
                    <div className={cn(
                      "absolute top-3 w-8 h-8 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500",
                      "bg-gradient-to-br",
                      grade.color,
                      isRTL ? "left-3" : "right-3"
                    )} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Summary Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 mb-4">
            <GraduationCap className="w-6 h-6" />
            <span className="text-xl font-black">
              {isRTL ? '16 صف دراسي' : '16 Academic Grades'}
            </span>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {isRTL 
              ? 'من رياض الأطفال إلى الثانوية العامة، نرافق أبناءكم في كل خطوة من رحلتهم التعليمية بكادر متخصص ومناهج حديثة'
              : 'From kindergarten to high school, we accompany your children every step of their educational journey with specialized staff and modern curricula'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
