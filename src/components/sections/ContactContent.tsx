"use client";

import React from "react";
import { ContactDTO } from "@/types/strapi";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Sparkles,
    Zap,
    ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ContactContentProps {
    contactData: ContactDTO | null;
    badge: string;
    // ... other props
}

export default function ContactContent({
    contactData,
    badge,
    title_part1,
    title_highlight,
    subtitle,
    info_title,
    info_desc,
    email_label,
    phone_label,
    location_label,
    form_title,
    name_label,
    placeholder_name,
    placeholder_email,
    subject_label,
    placeholder_subject,
    message_label,
    placeholder_message,
    send_btn,
}: ContactContentProps & {
    // Redefine the props to appease TS if needed, but since we are using Omit or partial it might be better to just extend
    badge: string;
    title_part1: string;
    title_highlight: string;
    subtitle: string;
    info_title: string;
    info_desc: string;
    email_label: string;
    phone_label: string;
    location_label: string;
    form_title: string;
    name_label: string;
    placeholder_name: string;
    placeholder_email: string;
    subject_label: string;
    placeholder_subject: string;
    message_label: string;
    placeholder_message: string;
    send_btn: string;
}) {
    const locale = useLocale();
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Form State
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = (mounted ? (resolvedTheme || theme) : "dark") as "light" | "dark";
    const isDark = currentTheme === "dark";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'loading') return;

        setStatus('loading');

        try {
            const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
            const response = await fetch(`${STRAPI_URL}/api/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: formData }),
            });

            if (!response.ok) throw new Error('Submission failed');

            setStatus('success');
            setFormData({ name: "", email: "", subject: "", message: "" });

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const bgImage = isDark
        ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2400&auto=format&fit=crop";

    return (
        <main className={cn(
            "relative min-h-screen font-tajawal overflow-hidden transition-colors duration-700",
            isDark ? "bg-[#020617]" : "bg-[#f8fcff]"
        )}>
            {/* ========== ATMOSPHERIC REBIRTH STAGE ========== */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="wait">
                    {mounted && (
                        <motion.div
                            key={isDark ? "dark" : "light"}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: isDark ? 0.35 : 0.15 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeOut" as const }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={bgImage}
                                alt="Cinematic Stage"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-b",
                                isDark
                                    ? "from-[#020617]/95 via-[#020617]/80 to-[#020617]"
                                    : "from-[#f8fcff]/90 via-[#f8fcff]/70 to-[#f8fcff]"
                            )} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Azure Aura Leak (Top Right) */}
                <div className={cn(
                    "absolute top-[-10%] right-[-10%] w-[800px] h-[800px] blur-[150px] rounded-full transition-colors duration-1000",
                    isDark ? "bg-primary/5" : "bg-sky-400/10"
                )} />
            </div>

            <div className="relative z-10">
                {/* ========== SECTION 1: THE GRAND GENESIS (HERO) ========== */}
                <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center pt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                            "inline-flex items-center gap-3 px-6 py-2 rounded-full border text-[10px] font-black uppercase mb-8 shadow-lg backdrop-blur-3xl",
                            locale === 'ar' ? "tracking-normal font-bold" : "tracking-[0.4em] font-black",
                            isDark ? "border-white/10 bg-white/5 text-primary" : "border-sky-200 bg-white/50 text-sky-600"
                        )}
                    >
                        <Zap className="w-4 h-4 animate-pulse" />
                        {badge}
                        <Sparkles className="w-4 h-4" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: "easeOut" as const }}
                        className={cn(
                            "text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8",
                            locale === 'ar' ? "font-bold" : "font-black"
                        )}
                    >
                        <span className={isDark ? "text-white" : "text-sky-950"}>
                            {title_part1}
                        </span>
                        <br />
                        <span className={cn(
                            "text-transparent bg-clip-text italic pb-2 inline-block",
                            locale === 'ar' ? "font-bold" : "font-black",
                            isDark ? "bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" : "bg-gradient-to-r from-sky-600 to-blue-700"
                        )}>
                            {title_highlight}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className={cn(
                            "max-w-3xl text-base md:text-lg font-light leading-relaxed mb-6",
                            isDark ? "text-white/40" : "text-sky-900/60"
                        )}
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex flex-col items-center gap-4 mt-4"
                    >
                        <div className={cn(
                            "w-px h-12",
                            isDark ? "bg-gradient-to-b from-primary/50 to-transparent" : "bg-gradient-to-b from-sky-300 to-transparent"
                        )} />
                    </motion.div>
                </section>

                {/* ========== SECTION 2: CRYSTAL HUB (INFO & FORM) ========== */}
                <section className="py-10 px-6">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                            {/* LEFT: INFO CRYSTALS */}
                            <div className="lg:col-span-5 space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="px-4 mb-8"
                                >
                                    <h2 className={cn(
                                        "text-2xl mb-2",
                                        locale === 'ar' ? "font-bold" : "font-black",
                                        isDark ? "text-white" : "text-sky-950"
                                    )}>
                                        {info_title}
                                    </h2>
                                    <p className={cn(
                                        "text-base font-light leading-relaxed",
                                        isDark ? "text-white/40" : "text-sky-900/60"
                                    )}>
                                        {info_desc}
                                    </p>
                                </motion.div>

                                <div className="space-y-4">
                                    {[
                                        { icon: Mail, label: email_label, value: contactData?.info?.emailValue || "info@alrawafid.ly", color: "from-blue-500 to-sky-400" },
                                        { icon: Phone, label: phone_label, value: contactData?.info?.phoneValue || "+218 91 000 0000", color: "from-emerald-500 to-teal-400", isLtr: true },
                                        { icon: MapPin, label: location_label, value: contactData?.info?.locationValue || (locale === 'ar' ? "ليبيا - طرابلس" : "Libya - Tripoli"), color: "from-orange-500 to-amber-400" }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ scale: 1.02, x: 10 }}
                                            className={cn(
                                                "group relative flex items-center gap-5 p-5 rounded-[2rem] border transition-all duration-500 backdrop-blur-3xl overflow-hidden",
                                                isDark
                                                    ? "bg-white/5 border-white/5 hover:border-white/15"
                                                    : "bg-white/70 border-sky-100 shadow-xl shadow-sky-900/5 hover:border-sky-300"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6",
                                                isDark ? "bg-white/5 text-primary" : "bg-sky-50 text-sky-500"
                                            )}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <span className={cn(
                                                    "mb-1 block",
                                                    locale === 'ar' ? "!tracking-normal font-bold text-[11px] normal-case" : "tracking-[0.3em] font-black text-[9px] uppercase",
                                                    isDark ? "text-primary/50" : "text-sky-500/70"
                                                )}>
                                                    {item.label}
                                                </span>
                                                <p className={cn(
                                                    "text-xl md:text-2xl tracking-normal font-tajawal",
                                                    locale === 'ar' ? "font-bold" : "font-black",
                                                    isDark ? "text-white" : "text-sky-950"
                                                )}>
                                                    {item.value}
                                                </p>
                                            </div>
                                            <div className={cn(
                                                "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none",
                                                item.color
                                            )} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: THE CRYSTAL FORM */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-12 xl:col-span-7"
                            >
                                <div className={cn(
                                    "relative p-6 md:p-10 rounded-[2.5rem] border shadow-2xl backdrop-blur-3xl overflow-hidden group",
                                    isDark
                                        ? "bg-white/5 border-white/10 hover:border-white/20 shadow-primary/5"
                                        : "bg-white/80 border-sky-100/50 shadow-sky-900/10 hover:border-sky-300/50"
                                )}>
                                    {/* Decorative Glow */}
                                    <div className={cn(
                                        "absolute -top-24 -right-24 w-80 h-80 blur-[100px] rounded-full transition-opacity duration-1000 pointer-events-none",
                                        isDark ? "bg-primary/10 opacity-60" : "bg-sky-400/20 opacity-40"
                                    )} />

                                    <div className="flex items-center gap-3 mb-6 px-2">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shadow-2xl",
                                            isDark ? "bg-primary text-[#020617]" : "bg-sky-500 text-white shadow-sky-500/20"
                                        )}>
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <h2 className={cn(
                                            "text-xl md:text-2xl",
                                            locale === 'ar' ? "font-bold" : "font-black",
                                            isDark ? "text-white" : "text-sky-950"
                                        )}>
                                            {form_title}
                                        </h2>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3 px-2">
                                                <label className={cn(
                                                    "text-xs transition-colors",
                                                    locale === 'ar' ? "!tracking-normal font-bold normal-case" : "tracking-[0.4em] font-black uppercase",
                                                    isDark ? "text-white/30" : "text-sky-900/40"
                                                )}>{name_label}</label>
                                                <input
                                                    type="text"
                                                    required
                                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={cn(
                                                        "w-full h-12 px-5 rounded-xl border outline-none transition-all text-base font-medium font-tajawal tracking-normal placeholder:tracking-normal",
                                                        isDark
                                                            ? "bg-white/5 border-white/5 text-white focus:border-primary focus:bg-white/10"
                                                            : "bg-white/60 border-sky-100 text-sky-950 focus:border-sky-400 focus:bg-white focus:shadow-2xl focus:shadow-sky-500/10"
                                                    )}
                                                    placeholder={placeholder_name}
                                                />
                                            </div>
                                            <div className="space-y-3 px-2">
                                                <label className={cn(
                                                    "text-xs transition-colors",
                                                    locale === 'ar' ? "!tracking-normal font-bold normal-case" : "tracking-[0.4em] font-black uppercase",
                                                    isDark ? "text-white/30" : "text-sky-900/40"
                                                )}>{email_label}</label>
                                                <input
                                                    type="email"
                                                    required
                                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={cn(
                                                        "w-full h-12 px-5 rounded-xl border outline-none transition-all text-base font-medium font-tajawal tracking-normal placeholder:tracking-normal",
                                                        isDark
                                                            ? "bg-white/5 border-white/5 text-white focus:border-primary focus:bg-white/10"
                                                            : "bg-white/60 border-sky-100 text-sky-950 focus:border-sky-400 focus:bg-white focus:shadow-2xl focus:shadow-sky-500/10"
                                                    )}
                                                    placeholder={placeholder_email}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3 px-2">
                                            <label className={cn(
                                                "text-xs transition-colors",
                                                locale === 'ar' ? "!tracking-normal font-bold normal-case" : "tracking-[0.4em] font-black uppercase",
                                                isDark ? "text-white/30" : "text-sky-900/40"
                                            )}>{subject_label}</label>
                                            <input
                                                type="text"
                                                required
                                                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className={cn(
                                                    "w-full h-12 px-5 rounded-xl border outline-none transition-all text-base font-medium font-tajawal tracking-normal placeholder:tracking-normal",
                                                    isDark
                                                        ? "bg-white/5 border-white/5 text-white focus:border-primary focus:bg-white/10"
                                                        : "bg-white/60 border-sky-100 text-sky-950 focus:border-sky-400 focus:bg-white focus:shadow-2xl focus:shadow-sky-500/10"
                                                )}
                                                placeholder={placeholder_subject}
                                            />
                                        </div>

                                        <div className="space-y-3 px-2">
                                            <label className={cn(
                                                "text-xs transition-colors",
                                                locale === 'ar' ? "!tracking-normal font-bold normal-case" : "tracking-[0.4em] font-black uppercase",
                                                isDark ? "text-white/30" : "text-sky-900/40"
                                            )}>{message_label}</label>
                                            <textarea
                                                rows={4}
                                                required
                                                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className={cn(
                                                    "w-full p-5 rounded-2xl border outline-none transition-all text-base font-medium font-tajawal resize-none tracking-normal placeholder:tracking-normal",
                                                    isDark
                                                        ? "bg-white/5 border-white/5 text-white focus:border-primary focus:bg-white/10"
                                                        : "bg-white/60 border-sky-100 text-sky-950 focus:border-sky-400 focus:bg-white focus:shadow-2xl focus:shadow-sky-500/10"
                                                )}
                                                placeholder={placeholder_message}
                                            ></textarea>
                                        </div>

                                        <div className="pt-4 px-2">
                                            <motion.button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                                className={cn(
                                                    "w-full h-12 md:h-14 text-base md:text-lg rounded-xl flex items-center justify-center gap-3 group transition-all shadow-2xl relative overflow-hidden",
                                                    locale === 'ar' ? "font-bold" : "font-black",
                                                    isDark ? "bg-primary text-[#020617]" : "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/30",
                                                    status === 'loading' && "opacity-70 cursor-wait"
                                                )}
                                            >
                                                <span className="relative z-10 flex items-center gap-3">
                                                    {status === 'loading'
                                                        ? (locale === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                                                        : send_btn}
                                                    <Send className={cn(
                                                        "w-4 h-4 transition-transform",
                                                        status === 'idle' && "group-hover:translate-x-3 group-hover:-translate-y-1"
                                                    )} />
                                                </span>
                                                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-700" />
                                            </motion.button>
                                        </div>

                                        <AnimatePresence>
                                            {status === 'success' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-center font-bold text-sm"
                                                >
                                                    {locale === 'ar' ? 'تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.' : 'Your message has been sent successfully! Thank you for contacting us.'}
                                                </motion.div>
                                            )}
                                            {status === 'error' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center font-bold text-sm"
                                                >
                                                    {locale === 'ar' ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.' : 'An error occurred while sending. Please try again later.'}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <div className="h-12" />
            </div>
        </main>
    );
}