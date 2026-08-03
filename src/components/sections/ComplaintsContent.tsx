"use client";

import React from "react";
import { ComplaintPageDTO } from "@/types/strapi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  FileText,
  Sparkles,
  Zap,
  MessageSquareWarning,
  User,
  Users,
  Ticket,
  Shield,
  CheckCircle2,
  AlertTriangle,
  UserCircle2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ComplaintType = "academic" | "administrative" | "facilities" | "staff" | "student" | "financial" | "other";
type RelationType = "parent" | "student" | "staff" | "visitor";
type PriorityLevel = "low" | "medium" | "high" | "urgent";

interface ComplaintsContentProps {
  complaintData: ComplaintPageDTO | null;
  badge: string;
  title_part1: string;
  title_highlight: string;
  subtitle: string;
  info_title: string;
  info_desc: string;
  email_label: string;
  phone_label: string;
  location_label: string;
  hours_label: string;
  form_title: string;
  steps_title: string;
  submit_btn: string;
  success_message: string;
  error_message: string;
}

const complaintTypeLabels: Record<"ar" | "en", Record<ComplaintType, { label: string; icon: React.ComponentType<any>; color: string }>> = {
  ar: {
    academic: { label: "شكوى أكاديمية", icon: FileText, color: "from-indigo-500 to-blue-500" },
    administrative: { label: "شكوى إدارية", icon: Users, color: "from-amber-500 to-orange-500" },
    facilities: { label: "شكوى مرافق", icon: MapPin, color: "from-teal-400 to-cyan-500" },
    staff: { label: "شكوى كادر تعليمي", icon: UserCircle2, color: "from-rose-400 to-pink-500" },
    student: { label: "شكوى طلابية", icon: User, color: "from-sky-400 to-blue-500" },
    financial: { label: "شكوى مالية", icon: Shield, color: "from-emerald-400 to-green-500" },
    other: { label: "شكوى أخرى", icon: AlertTriangle, color: "from-slate-400 to-slate-500" },
  },
  en: {
    academic: { label: "Academic Issue", icon: FileText, color: "from-indigo-500 to-blue-500" },
    administrative: { label: "Administrative", icon: Users, color: "from-amber-500 to-orange-500" },
    facilities: { label: "Facilities Issue", icon: MapPin, color: "from-teal-400 to-cyan-500" },
    staff: { label: "Staff Concern", icon: UserCircle2, color: "from-rose-400 to-pink-500" },
    student: { label: "Student Matter", icon: User, color: "from-sky-400 to-blue-500" },
    financial: { label: "Financial Issue", icon: Shield, color: "from-emerald-400 to-green-500" },
    other: { label: "Other Issue", icon: AlertTriangle, color: "from-slate-400 to-slate-500" },
  },
};

const relationLabels: Record<"ar" | "en", Record<RelationType, string>> = {
  ar: { parent: "ولي أمر", student: "طالب / طالبة", staff: "موظف / معلم", visitor: "زائر" },
  en: { parent: "Parent / Guardian", student: "Student", staff: "Staff / Teacher", visitor: "Visitor" },
};

const priorityLabels: Record<"ar" | "en", Record<PriorityLevel, { label: string; badge: string }>> = {
  ar: {
    low: { label: "عادي", badge: "bg-slate-100 text-slate-700 border-slate-200" },
    medium: { label: "متوسط", badge: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    high: { label: "مهم", badge: "bg-amber-100 text-amber-700 border-amber-200" },
    urgent: { label: "عاجل", badge: "bg-rose-100 text-rose-700 border-rose-200" },
  },
  en: {
    low: { label: "Low", badge: "bg-slate-100 text-slate-700 border-slate-200" },
    medium: { label: "Medium", badge: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    high: { label: "High", badge: "bg-amber-100 text-amber-700 border-amber-200" },
    urgent: { label: "Urgent", badge: "bg-rose-100 text-rose-700 border-rose-200" },
  },
};

// المراحل الدراسية والسنوات المتاحة لكل مرحلة
const educationStages: Record<"ar" | "en", Record<string, { label: string; years: string[] }>> = {
  ar: {
    kindergarten: { label: "رياض الأطفال", years: [] },
    primary: { label: "المرحلة الابتدائية", years: ["أول ابتدائي", "ثاني ابتدائي", "ثالث ابتدائي", "رابع ابتدائي", "خامس ابتدائي", "سادس ابتدائي"] },
    preparatory: { label: "المرحلة الإعدادية", years: ["أول إعدادي", "ثاني الإعدادي", "ثالث الإعدادي"] },
    secondary: { label: "المرحلة الثانوية", years: ["أول ثانوي", "ثاني ثانوي علمي", "ثاني ثانوي أدبي", "ثالث ثانوي علمي", "ثالث ثانوي أدبي"] },
  },
  en: {
    kindergarten: { label: "Kindergarten", years: [] },
    primary: { label: "Primary School", years: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"] },
    preparatory: { label: "Preparatory School", years: ["Grade 7", "Grade 8", "Grade 9"] },
    secondary: { label: "Secondary School", years: ["Grade 10", "Grade 11 Science", "Grade 11 Arts", "Grade 12 Science", "Grade 12 Arts"] },
  },
};

export default function ComplaintsContent({
  complaintData,
  badge,
  title_part1,
  title_highlight,
  subtitle,
  info_title,
  info_desc,
  email_label,
  phone_label,
  location_label,
  hours_label,
  form_title,
  steps_title,
  submit_btn,
  success_message,
  error_message,
}: ComplaintsContentProps) {
  const locale = useLocale();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const isRTL = locale === "ar";
  const lang = (locale === "ar" ? "ar" : "en") as "ar" | "en";

  const [formData, setFormData] = React.useState<{
    fullName: string;
    email: string;
    phone: string;
    studentName: string;
    studentStage: string;  // المرحلة الدراسية
    studentClass: string;  // السنة الدراسية
    complaintType: ComplaintType | "";
    relation: RelationType | "";
    priority: PriorityLevel;
    subject: string;
    description: string;
    privacyAgreed: boolean;
  }>({
    fullName: "",
    email: "",
    phone: "",
    studentName: "",
    studentStage: "",
    studentClass: "",
    complaintType: "",
    relation: "",
    priority: "medium",
    subject: "",
    description: "",
    privacyAgreed: false,
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [ticketInfo, setTicketInfo] = React.useState<{ code: string } | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (mounted ? (resolvedTheme || theme) : "dark") as "light" | "dark";
  const isDark = currentTheme === "dark";

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = isRTL ? "الاسم الكامل مطلوب" : "Full name is required";
    if (!formData.email.trim()) newErrors.email = isRTL ? "البريد الإلكتروني مطلوب" : "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = isRTL ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = isRTL ? "رقم الهاتف مطلوب" : "Phone number is required";
    if (!formData.complaintType) newErrors.complaintType = isRTL ? "نوع الشكوى مطلوب" : "Complaint type is required";
    if (!formData.relation) newErrors.relation = isRTL ? "الصلة بالمدرسة مطلوبة" : "Relation is required";
    if (!formData.subject.trim()) newErrors.subject = isRTL ? "موضوع الشكوى مطلوب" : "Subject is required";
    if (!formData.description.trim() || formData.description.trim().length < 20)
      newErrors.description = isRTL ? "الوصف مطلوب ويجب أن يحتوي على الأقل 20 حرفاً" : "Description must be at least 20 characters";
    if (!formData.privacyAgreed)
      newErrors.privacyAgreed = isRTL ? "يجب الموافقة على سياسة الخصوصية" : "You must agree to the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validateForm()) return;

    setStatus('loading');
    setTicketInfo(null);

    try {
      // استخدام Next.js API Route بدلاً من Strapi
      // دمج المرحلة والسنة في حقل studentClass إذا كانا موجودين
      let studentClassValue = formData.studentClass;
      if (formData.studentStage && !formData.studentClass) {
        // إذا تم اختيار المرحلة فقط (مثل رياض الأطفال)
        studentClassValue = educationStages[lang][formData.studentStage]?.label || formData.studentStage;
      }
      
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        studentName: formData.studentName || undefined,
        studentClass: studentClassValue || undefined,
        complaintType: formData.complaintType || undefined,
        relation: formData.relation || undefined,
        priority: formData.priority,
        subject: formData.subject,
        description: formData.description.replace(/\n/g, "<br/>"),
      };

      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error("Complaint submit error detail:", err);
        throw new Error('Submission failed');
      }

      const result = await response.json();
      const ticketCode = result?.data?.ticketCode || (lang === "ar" ? "SHK-" + Date.now().toString(36).toUpperCase() : "SHK-" + Date.now().toString(36).toUpperCase());
      
      setStatus('success');
      setTicketInfo({ code: ticketCode });
      setFormData({
        fullName: "", email: "", phone: "", studentName: "", studentStage: "", studentClass: "",
        complaintType: "", relation: "", priority: "medium", subject: "", description: "", privacyAgreed: false
      });
      setErrors({});

      setTimeout(() => { setStatus('idle'); setTicketInfo(null); }, 14000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  const processSteps = isRTL
    ? [
        { n: 1, t: "تقديم الشكوى", d: "املأ النموذج ببيانات دقيقة" },
        { n: 2, t: "تسجيل فوري", d: "يتم إنشاء رقم تذكرة فريد" },
        { n: 3, t: "الدراسة والمراجعة", d: "ادارة المدرسة تدرس الشكوى خلال 48 ساعة" },
        { n: 4, t: "حل المشكلة", d: "التواصل معكم وإخباركم بالنتيجة" },
      ]
    : [
        { n: 1, t: "Submit Complaint", d: "Fill the form with accurate details" },
        { n: 2, t: "Instant Registration", d: "A unique ticket code is generated" },
        { n: 3, t: "Review & Research", d: "Our team studies it within 48 hours" },
        { n: 4, t: "Resolution", d: "We contact you with the outcome" },
      ];

  return (
    <main className={cn(
      "relative min-h-screen font-tajawal overflow-hidden transition-colors duration-700 bg-white"
    )}>
      {/* ===== ATMOSPHERIC BACKGROUND ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] blur-[150px] rounded-full bg-brand-signature/5" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] blur-[150px] rounded-full bg-brand-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[200px] rounded-full bg-indigo-300/5" />
      </div>

      <div className="relative z-10">
        {/* ===== HERO SECTION ===== */}
        <section className="min-h-[60vh] flex flex-col justify-center items-center px-6 text-center pt-24 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border bg-white/60 backdrop-blur-md shadow-lg shadow-brand-signature/10 border-brand-signature/20 text-brand-signature font-bold text-xs uppercase tracking-wider mb-8"
          >
            <Zap className="w-4 h-4" />
            {badge}
            <Sparkles className="w-4 h-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 md:mb-6"
          >
            <span className="text-slate-800">{title_part1}</span>
          </motion.h1>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
          >
            <span className="bg-gradient-to-r from-brand-signature via-indigo-500 to-brand-accent bg-clip-text text-transparent">
              {title_highlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-600/80 leading-relaxed mb-8 md:mb-10 px-4 sm:px-0"
          >
            {subtitle}
          </motion.p>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="w-full max-w-5xl"
          >
            <div className="text-sm md:text-base font-bold text-slate-500/70 mb-5 text-center">
              {steps_title}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="relative group rounded-2xl p-4 md:p-5 bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-lg shadow-slate-900/5 hover:border-brand-signature/30 transition-all duration-300"
                >
                  <div className={cn(
                    "absolute w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg md:text-xl font-black shadow-xl",
                    "bg-gradient-to-br from-brand-signature to-brand-accent text-white",
                    isRTL ? "-right-3 top-3" : "-left-3 top-3"
                  )}>
                    {s.n}
                  </div>
                  <div className="pt-8 md:pt-6">
                    <h4 className="text-sm md:text-base font-extrabold text-slate-800 mb-1 leading-tight">{s.t}</h4>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{s.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===== INFO + FORM ===== */}
        <section className="py-10 px-6 pb-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* LEFT: INFO CARDS */}
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="px-4 mb-6"
                >
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{info_title}</h2>
                  <p className="text-base md:text-lg text-slate-600/70 leading-relaxed">{info_desc}</p>
                </motion.div>

                <div className="space-y-4">
                  {[
                    { 
                      icon: Mail, 
                      label: email_label, 
                      value: complaintData?.info?.emailValue || "alsahmalfareedinfo@gmail.com", 
                      color: "from-brand-signature to-indigo-500",
                      link: "mailto:alsahmalfareedinfo@gmail.com"
                    },
                    { 
                      icon: Phone, 
                      label: phone_label, 
                      value: complaintData?.info?.phoneValue || "0945437366", 
                      color: "from-brand-accent to-amber-500", 
                      isLtr: true,
                      link: "tel:0945437366"
                    },
                    { 
                      icon: MapPin, 
                      label: location_label, 
                      value: complaintData?.info?.locationValue || (isRTL ? "ليبيا - طرابلس - طريق المشتل" : "Libya - Tripoli"), 
                      color: "from-teal-400 to-cyan-500",
                      link: "https://maps.app.goo.gl/M8AT5xLvGNBny7Tw5"
                    },
                    { 
                      icon: Clock, 
                      label: hours_label, 
                      value: complaintData?.info?.workingHoursValue || (isRTL ? "الأحد إلى الخميس - 8:00 صباحاً حتى 2:00 ظهراً" : "Sun to Thu — 8:00 AM to 2:00 PM"), 
                      color: "from-amber-400 to-orange-500" 
                    }
                  ].map((item, idx) => {
                    const WrapperComponent = item.link ? 'a' : 'div';
                    const wrapperProps = item.link ? { 
                      href: item.link,
                      target: item.link.startsWith('http') ? '_blank' : undefined,
                      rel: item.link.startsWith('http') ? 'noopener noreferrer' : undefined
                    } : {};
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 }}
                        whileHover={{ scale: 1.02, x: isRTL ? -6 : 6 }}
                        className={cn(
                          "group relative flex items-center gap-5 p-5 rounded-2xl border bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-900/5 border-slate-200/60 hover:border-brand-signature/30 transition-all duration-300",
                          item.link && "cursor-pointer"
                        )}
                        {...(item.link ? {} : {})}
                      >
                        <WrapperComponent 
                          {...wrapperProps}
                          className="absolute inset-0 rounded-2xl"
                          aria-label={item.link ? item.label : undefined}
                        />
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6 relative z-10",
                          "bg-gradient-to-br text-white shadow-lg",
                          item.color
                        )}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0 relative z-10 pointer-events-none">
                          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500/70 mb-1">{item.label}</span>
                          <p className={cn(
                            "text-base md:text-lg font-bold text-slate-800",
                            item.isLtr && "tracking-wide"
                          )}>{item.value}</p>
                        </div>
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl",
                          item.color
                        )} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: FORM */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-12 xl:col-span-7 order-1 lg:order-2"
              >
                <div className="relative p-6 md:p-10 rounded-3xl border bg-white/80 backdrop-blur-lg shadow-2xl shadow-slate-900/10 border-slate-200/60 hover:border-brand-signature/20 transition-all duration-500">
                  {/* Decorative glow */}
                  <div className="absolute -top-24 -right-24 w-80 h-80 blur-[100px] rounded-full bg-brand-signature/10 pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 blur-[100px] rounded-full bg-brand-accent/10 pointer-events-none" />

                  <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-brand-signature to-brand-accent text-white shadow-lg shadow-brand-signature/30">
                      <MessageSquareWarning className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800">{form_title}</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row: Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FieldWrapper
                        label={isRTL ? "الاسم الكامل *" : "Full Name *"}
                        error={errors.fullName}
                        isRTL={isRTL}
                      >
                        <input
                          type="text"
                          dir={isRTL ? 'rtl' : 'ltr'}
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={inputClasses(!!errors.fullName)}
                          placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                        />
                      </FieldWrapper>

                      <FieldWrapper
                        label={isRTL ? "البريد الإلكتروني *" : "Email Address *"}
                        error={errors.email}
                        isRTL={isRTL}
                      >
                        <input
                          type="email"
                          dir="ltr"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClasses(!!errors.email)}
                          placeholder="you@example.com"
                        />
                      </FieldWrapper>
                    </div>

                    {/* Row: Phone */}
                    <FieldWrapper
                      label={isRTL ? "رقم الهاتف *" : "Phone Number *"}
                      error={errors.phone}
                      isRTL={isRTL}
                    >
                      <input
                        type="tel"
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClasses(!!errors.phone)}
                        placeholder="+218 XX XXX XXXX"
                      />
                    </FieldWrapper>

                    {/* Relation - Full Width with Buttons */}
                    <FieldWrapper
                      label={isRTL ? "صلة القرابة بالمدرسة *" : "Your Relation *"}
                      error={errors.relation}
                      isRTL={isRTL}
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                        {Object.entries(relationLabels[lang]).map(([k, v]) => {
                          const selected = formData.relation === k;
                          return (
                            <button
                              key={k}
                              type="button"
                              onClick={() => setFormData({ ...formData, relation: k as RelationType })}
                              className={cn(
                                "relative rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 border-2 text-center",
                                selected
                                  ? "border-brand-signature bg-brand-signature text-white shadow-lg scale-[1.02]"
                                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-brand-signature/40 hover:bg-brand-signature/5 hover:text-brand-signature"
                              )}
                            >
                              {v}
                              {selected && (
                                <CheckCircle2 
                                  className="absolute top-2 w-4 h-4" 
                                  style={{ [isRTL ? 'left' : 'right']: '0.5rem' }} 
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </FieldWrapper>

                    {/* Row: Student Name + Stage + Class */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FieldWrapper
                        label={isRTL ? "اسم الطالب / الطالبة" : "Student Name"}
                        hint={isRTL ? "(اختياري)" : "(Optional)"}
                        isRTL={isRTL}
                      >
                        <input
                          type="text"
                          dir={isRTL ? 'rtl' : 'ltr'}
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                          className={inputClasses(false)}
                          placeholder={isRTL ? "اسم الطالب الكامل" : "Full student name"}
                        />
                      </FieldWrapper>

                      <FieldWrapper
                        label={isRTL ? "المرحلة الدراسية" : "Education Stage"}
                        hint={isRTL ? "(اختياري)" : "(Optional)"}
                        isRTL={isRTL}
                      >
                        <select
                          dir={isRTL ? 'rtl' : 'ltr'}
                          value={formData.studentStage}
                          onChange={(e) => setFormData({ ...formData, studentStage: e.target.value, studentClass: "" })}
                          className={inputClasses(false)}
                        >
                          <option value="">{isRTL ? "اختر المرحلة" : "Select Stage"}</option>
                          {Object.entries(educationStages[lang]).map(([key, value]) => (
                            <option key={key} value={key}>{value.label}</option>
                          ))}
                        </select>
                      </FieldWrapper>

                      <FieldWrapper
                        label={isRTL ? "السنة الدراسية" : "Academic Year"}
                        hint={isRTL ? "(اختياري)" : "(Optional)"}
                        isRTL={isRTL}
                      >
                        <select
                          dir={isRTL ? 'rtl' : 'ltr'}
                          value={formData.studentClass}
                          onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                          className={inputClasses(false)}
                          disabled={!formData.studentStage || educationStages[lang][formData.studentStage]?.years.length === 0}
                        >
                          <option value="">
                            {!formData.studentStage 
                              ? (isRTL ? "اختر المرحلة أولاً" : "Select stage first")
                              : educationStages[lang][formData.studentStage]?.years.length === 0
                                ? (isRTL ? "لا يوجد سنوات" : "No years available")
                                : (isRTL ? "اختر السنة" : "Select year")
                            }
                          </option>
                          {formData.studentStage && educationStages[lang][formData.studentStage]?.years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </FieldWrapper>
                    </div>

                    {/* Complaint Type */}
                    <FieldWrapper
                      label={isRTL ? "نوع الشكوى *" : "Complaint Category *"}
                      error={errors.complaintType}
                      isRTL={isRTL}
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 pt-1">
                        {(Object.entries(complaintTypeLabels[lang]) as [ComplaintType, typeof complaintTypeLabels["ar"]["academic"]][]).map(([key, val]) => {
                          const CompIcon = val.icon;
                          const selected = formData.complaintType === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setFormData({ ...formData, complaintType: key })}
                              className={cn(
                                "relative group rounded-xl px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 flex flex-col items-center gap-1 sm:gap-2 border-2 min-h-[80px] sm:min-h-[90px]",
                                selected
                                  ? [
                                      "border-transparent text-white shadow-lg scale-[1.02]",
                                      cn("bg-gradient-to-br", val.color)
                                    ]
                                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-brand-signature/40 hover:bg-brand-signature/5 hover:text-brand-signature"
                              )}
                            >
                              <CompIcon className={cn("w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300", selected && "scale-110 -rotate-3")} />
                              <span className="leading-tight text-center text-[10px] sm:text-xs">{val.label}</span>
                              {selected && <CheckCircle2 className="absolute top-1 sm:top-1.5 w-3 h-3 sm:w-4 sm:h-4" style={{ [isRTL ? 'left' : 'right']: '0.4rem' }} />}
                            </button>
                          );
                        })}
                      </div>
                    </FieldWrapper>

                    {/* Priority */}
                    <FieldWrapper
                      label={isRTL ? "مستوى الأولوية" : "Priority Level"}
                      isRTL={isRTL}
                    >
                      <div className="flex flex-wrap gap-3 pt-1">
                        {(Object.entries(priorityLabels[lang]) as [PriorityLevel, typeof priorityLabels["ar"]["low"]][]).map(([key, val]) => (
                          <label key={key} className="cursor-pointer group">
                            <input
                              type="radio"
                              name="priority"
                              value={key}
                              checked={formData.priority === key}
                              onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
                              className="sr-only peer"
                            />
                            <span className={cn(
                              "inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-sm transition-all duration-300 peer-checked:scale-105",
                              formData.priority === key
                                ? val.badge + " border-current shadow-md"
                                : "bg-white/70 border-slate-200 text-slate-600 group-hover:border-brand-signature/40 group-hover:text-brand-signature"
                            )}>
                              <span className={cn(
                                "w-2.5 h-2.5 rounded-full",
                                key === "low" && "bg-slate-400",
                                key === "medium" && "bg-indigo-500",
                                key === "high" && "bg-amber-500",
                                key === "urgent" && "bg-rose-500 animate-pulse"
                              )} />
                              {val.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </FieldWrapper>

                    {/* Subject */}
                    <FieldWrapper
                      label={isRTL ? "موضوع الشكوى *" : "Subject *"}
                      error={errors.subject}
                      isRTL={isRTL}
                    >
                      <input
                        type="text"
                        dir={isRTL ? 'rtl' : 'ltr'}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={inputClasses(!!errors.subject)}
                        placeholder={isRTL ? "أدخل عنواناً مختصراً للشكوى" : "Short summary of the issue"}
                      />
                    </FieldWrapper>

                    {/* Description */}
                    <FieldWrapper
                      label={isRTL ? "تفاصيل الشكوى *" : "Detailed Description *"}
                      error={errors.description}
                      isRTL={isRTL}
                      hint={isRTL ? `${formData.description.length} / 20+ حرفاً` : `${formData.description.length} / 20+ chars`}
                    >
                      <textarea
                        rows={6}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={inputClasses(!!errors.description) + " resize-none text-sm md:text-base"}
                        placeholder={isRTL ? "صف الشكوى بالتفصيل..." : "Describe the issue in detail..."}
                      />
                    </FieldWrapper>

                    {/* Privacy Agreement */}
                    <div className="px-2">
                      <label className={cn(
                        "group relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                        errors.privacyAgreed
                          ? "bg-rose-50/80 border-rose-400 shadow-lg shadow-rose-900/10"
                          : formData.privacyAgreed
                            ? "bg-emerald-50/80 border-emerald-400 shadow-lg shadow-emerald-900/10"
                            : "bg-white/70 border-slate-200 hover:border-brand-signature/40 hover:bg-brand-signature/5"
                      )}>
                        <div className="relative shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.privacyAgreed}
                            onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                            className={cn(
                              "peer w-6 h-6 rounded-xl border-2 transition-all duration-300 cursor-pointer appearance-none",
                              "checked:bg-gradient-to-br checked:from-emerald-500 checked:to-teal-500 checked:border-emerald-400",
                              "focus:ring-4 focus:outline-none focus:ring-emerald-300/30",
                              errors.privacyAgreed
                                ? "border-rose-400 bg-rose-100"
                                : "border-slate-300 bg-white hover:border-brand-signature"
                            )}
                          />
                          <CheckCircle2 className={cn(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none transition-all duration-300",
                            formData.privacyAgreed ? "opacity-100 scale-100" : "opacity-0 scale-50"
                          )} />
                        </div>
                        <span className="flex-1 text-sm md:text-base text-slate-700 leading-relaxed">
                          {isRTL
                            ? <>أقر بأن البيانات المقدمة صحيحة وأنني قرأت <a className="font-bold text-brand-signature underline decoration-2 underline-offset-4 hover:text-brand-accent transition" href='/privacy' target='_blank'>سياسة الخصوصية</a> وأوافق على معالجة بياناتي.</>
                            : <>I certify that the information is accurate and I have read the <a className="font-bold text-brand-signature underline decoration-2 underline-offset-4 hover:text-brand-accent transition" href='/privacy' target='_blank'>Privacy Policy</a> and agree to the processing of my data.</>
                          }
                        </span>
                      </label>
                      {errors.privacyAgreed && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-rose-600 text-sm font-bold mt-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> {errors.privacyAgreed}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3 px-2">
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                        whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                        className={cn(
                          "w-full h-14 md:h-16 text-base md:text-xl rounded-2xl flex items-center justify-center gap-3 group transition-all shadow-2xl relative overflow-hidden font-black",
                          "bg-gradient-to-r from-brand-signature to-brand-accent text-white shadow-brand-signature/30",
                          "hover:shadow-brand-accent/40 hover:scale-[1.02]",
                          status === 'loading' && "opacity-75 cursor-wait"
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {status === 'loading'
                            ? (isRTL ? 'جاري إنشاء التذكرة...' : 'Creating ticket...')
                            : submit_btn}
                          {status !== 'loading' && status !== 'success' && (
                            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          )}
                        </span>
                        {status === 'loading' && (
                          <span className="absolute right-5 md:right-6 w-6 h-6 border-4 border-white/25 border-t-white rounded-full animate-spin" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                      </motion.button>
                    </div>

                    {/* Status Feedback */}
                    <AnimatePresence mode="wait">
                      {status === 'success' && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="rounded-2xl overflow-hidden border bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-emerald-500/40"
                        >
                          <div className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-8 h-8" strokeWidth={3} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base md:text-xl font-black text-emerald-800 mb-1.5">
                                {success_message || (isRTL ? "تم استلام شكواك بنجاح" : "Complaint received successfully")}
                              </h4>
                              <p className="text-sm md:text-base text-emerald-700/80 leading-relaxed mb-3">
                                {isRTL
                                  ? "سيتم دراسة شكواك خلال 48 ساعة عمل. يرجى الاحتفاظ برقم التذكرة."
                                  : "Your complaint will be reviewed within 48 business hours. Please keep your ticket code."}
                              </p>
                              {ticketInfo && (
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border bg-white border-emerald-300/80 text-emerald-800 font-bold shadow-md">
                                  <Ticket className="w-5 h-5" />
                                  <span>{isRTL ? "رقم التذكرة:" : "Ticket ID:"}</span>
                                  <span className="tracking-widest font-mono select-all">{ticketInfo.code}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
                        </motion.div>
                      )}

                      {status === 'error' && (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-500/40"
                        >
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0 mt-1" />
                            <div>
                              <p className="font-black text-rose-700 text-lg mb-1">
                                {isRTL ? "عذراً، تعذر إرسال الشكوى" : "Submission failed"}
                              </p>
                              <p className="text-rose-600/90 leading-relaxed">
                                {error_message || (isRTL ? "يرجى التحقق من الاتصال وإعادة المحاولة، أو التواصل مع الإدارة مباشرة." : "Please check your connection and try again, or contact the school directly.")}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// ===== HELPER COMPONENTS =====

function FieldWrapper({
  label,
  error,
  children,
  isRTL,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  isRTL: boolean;
  hint?: string;
}) {
  return (
    <div className="space-y-2.5 px-2">
      <label className={cn(
        "text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors",
        error ? "text-rose-600" : "text-slate-500/70"
      )}>
        {label}
        {hint && <span className="text-[10px] font-normal normal-case tracking-normal text-slate-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} className="text-xs md:text-sm font-bold text-rose-600 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" /> {error}
        </motion.p>
      )}
    </div>
  );
}

function inputClasses(hasError: boolean): string {
  return cn(
    "w-full h-12 md:h-13 px-5 rounded-xl border-2 outline-none transition-all text-base md:text-lg font-medium placeholder:tracking-normal",
    hasError
      ? "bg-rose-50/80 border-rose-300 text-rose-900 focus:border-rose-500 focus:bg-white focus:shadow-2xl focus:shadow-rose-500/15"
      : "bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-brand-signature focus:bg-white focus:shadow-2xl focus:shadow-brand-signature/10"
  );
}