"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServicesLayout from "@/components/sections/CapabilityCards";
import {
    Zap,
    Sparkles,
    Search,
    Compass,
    Code2,
    Rocket,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ServicesPageDTO } from "@/types/strapi";
import * as LucideIcons from "lucide-react";

const IconRenderer = ({ iconName, className }: { iconName: string; className?: string }) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <Icon className={className} />;
};

export default function ServicesContent({
    locale,
    allProjects,
    faqs,
    pageData
}: {
    locale: string,
    allProjects: any[],
    faqs: any[],
    pageData: ServicesPageDTO | null
}) {
    const t = useTranslations("ServicesPage");
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (resolvedTheme || theme) === "dark";

    const steps = pageData?.process?.steps?.length
        ? pageData.process.steps.map(s => ({
            step: s.step,
            title: s.title,
            desc: s.desc,
            icon: <IconRenderer iconName={s.icon} className="w-6 h-6" />
        }))
        : [
            { step: "01", title: t("steps.step1_title"), desc: t("steps.step1_desc"), icon: <Search className="w-6 h-6" /> },
            { step: "02", title: t("steps.step2_title"), desc: t("steps.step2_desc"), icon: <Compass className="w-6 h-6" /> },
            { step: "03", title: t("steps.step3_title"), desc: t("steps.step3_desc"), icon: <Code2 className="w-6 h-6" /> },
            { step: "04", title: t("steps.step4_title"), desc: t("steps.step4_desc"), icon: <Rocket className="w-6 h-6" /> },
        ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const bgImage = pageData?.heroBackgroundImage || (isDark
        ? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop");

    return (
        <main className={cn(
            "relative min-h-screen font-tajawal overflow-hidden transition-colors duration-700",
            isDark ? "bg-[#020617]" : "bg-[#f0f9ff]"
        )}>

            {/* ========== CINEMATIC STAGE ========== */}
            <div className="fixed inset-0 z-0">
                <AnimatePresence mode="wait">
                    {mounted && (
                        <motion.div
                            key={isDark ? "dark" : "light"}
                            initial={{ scale: 1.05, opacity: 0 }}
                            animate={{ scale: 1, opacity: isDark ? 0.4 : 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={bgImage}
                                alt="Cinematic Background"
                                fill
                                className="object-cover"
                                priority
                            />
                            {isDark ? (
                                <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#020617]/80 to-[#020617]" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff]/90 via-[#f0f9ff]/70 to-[#f0f9ff]" />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Azure Aura Leaks */}
                <div className={cn(
                    "absolute top-[-5%] right-[-5%] w-[600px] h-[600px] blur-[120px] rounded-full",
                    isDark ? "bg-primary/10" : "bg-sky-400/10"
                )} />
            </div>

            <div className="relative z-10">

                {/* ========== HERO SECTION (GRAND CINEMATIC) ========== */}
                <section className="flex flex-col items-center justify-center pt-32 pb-16 px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-[1200px] mx-auto text-center"
                    >
                        <motion.div
                            variants={itemVariants}
                            className={cn(
                                "inline-flex items-center gap-3 px-6 py-2 rounded-full border text-[10px] mb-8 shadow-lg backdrop-blur-3xl",
                                isDark ? "border-white/10 bg-white/5 text-primary" : "border-sky-200 bg-white/50 text-sky-600",
                                locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-black tracking-[0.3em] uppercase"
                            )}
                        >
                            <Zap className="w-4 h-4 animate-pulse" />
                            {pageData?.badge || t("badge")}
                            <Sparkles className="w-3.5 h-3.5 opacity-60" />
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className={cn(
                                "text-3xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1] tracking-tighter",
                                locale === 'ar' ? "font-bold !tracking-normal" : "font-black tracking-normal"
                            )}
                        >
                            <span className={cn(
                                "transition-colors",
                                isDark ? "text-white [text-shadow:0_10px_40px_rgba(0,0,0,0.5)]" : "text-sky-950"
                            )}>
                                {pageData?.titlePart1 || t("title_part1")}
                            </span>
                            <br />
                            <span className="relative inline-block mt-4">
                                <span className={cn(
                                    "absolute inset-0 blur-[80px] opacity-30",
                                    isDark ? "bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" : "bg-sky-400"
                                )} />
                                <span className={cn(
                                    "relative text-transparent bg-clip-text italic",
                                    locale === 'ar' ? "font-bold" : "font-black",
                                    isDark ? "bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" : "bg-gradient-to-r from-sky-600 to-blue-700"
                                )}>
                                    {pageData?.titleHighlight || t("title_highlight")}
                                </span>
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className={cn(
                                "mt-6 md:mt-8 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light",
                                isDark ? "text-white/50" : "text-sky-900/60"
                            )}
                        >
                            {pageData?.subtitle || t("subtitle")}
                        </motion.p>
                    </motion.div>
                </section>

                {/* ========== INTERACTIVE CAPABILITIES ========== */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-12 md:mb-20 flex items-center gap-6"
                        >
                            <div className={cn(
                                "w-16 h-1 bg-gradient-to-r rounded-full",
                                isDark ? "from-primary to-transparent" : "from-sky-500 to-transparent"
                            )} />
                            <h2 className={cn(
                                "text-2xl md:text-4xl tracking-tight uppercase",
                                locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-black",
                                isDark ? "text-white" : "text-sky-950"
                            )}>
                                {t("capabilities_title")}
                            </h2>
                        </motion.div>

                        <ServicesLayout allProjects={allProjects} />
                    </div>
                </section>

                {/* ========== THE PROCESS (CINEMATIC REFINED) ========== */}
                <section className="py-20 md:py-40 px-6 relative overflow-hidden">
                    <div className={cn(
                        "absolute inset-0 -z-10 transition-colors duration-700",
                        isDark ? "bg-white/[0.02]" : "bg-sky-900/[0.02]"
                    )} />

                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 md:mb-32">
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={cn(
                                    "text-3xl md:text-8xl font-black mb-6 md:mb-8 italic tracking-tighter",
                                    locale === 'ar' ? "font-bold !tracking-normal" : "font-black tracking-normal",
                                    isDark ? "text-white/90" : "text-sky-900/90"
                                )}
                            >
                                {pageData?.process?.title || t("process_title")}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed",
                                    isDark ? "text-white/40" : "text-sky-900/60"
                                )}
                            >
                                {pageData?.process?.subtitle || t("process_subtitle")}
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {steps.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" as const }}
                                    className={cn(
                                        "group relative h-full backdrop-blur-2xl p-10 rounded-[3rem] border transition-all duration-700 overflow-hidden",
                                        isDark
                                            ? "bg-white/5 border-white/5 hover:border-primary/40"
                                            : "bg-white/80 border-sky-100 hover:border-sky-400 shadow-xl shadow-sky-900/5"
                                    )}
                                >
                                    <span className={cn(
                                        "text-[5rem] font-black absolute -top-4 right-4 transition-all duration-700 group-hover:scale-110",
                                        isDark ? "text-white/[0.03] group-hover:text-primary/10" : "text-sky-400/[0.08] group-hover:text-sky-500/20"
                                    )}>
                                        {item.step}
                                    </span>
                                    <div className="relative z-10 flex flex-col h-full pt-10">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500",
                                            isDark ? "bg-white/5 text-primary group-hover:bg-primary group-hover:text-[#020617]" : "bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white"
                                        )}>
                                            {item.icon}
                                        </div>
                                        <h3 className={cn(
                                            "text-2xl font-black mb-4 tracking-tight transition-colors",
                                            locale === 'ar' ? "font-bold !tracking-normal" : "font-black tracking-normal",
                                            isDark ? "text-white group-hover:text-primary" : "text-sky-950 group-hover:text-sky-600"
                                        )}>
                                            {item.title}
                                        </h3>
                                        <p className={cn(
                                            "leading-relaxed font-light text-lg",
                                            isDark ? "text-white/40" : "text-sky-900/60"
                                        )}>
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className={cn(
                                        "absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left",
                                        isDark ? "bg-primary" : "bg-sky-500"
                                    )} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== GLOBAL CTA (REBORN) ========== */}
                <section className="py-40 px-6 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "relative overflow-hidden p-16 md:p-24 rounded-[5rem] border shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-20 backdrop-blur-3xl transition-all duration-700",
                                isDark
                                    ? "bg-transparent border-white/10 hover:border-white/20 shadow-primary/5"
                                    : "bg-transparent border-sky-200/50 hover:border-sky-300 shadow-sky-900/5"
                            )}
                        >
                            {/* Immersive Decorative Glows */}
                            <div className={cn(
                                "absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full transition-opacity duration-1000",
                                isDark ? "bg-primary/10 opacity-60" : "bg-sky-400/20 opacity-40"
                            )} />
                            <div className={cn(
                                "absolute -bottom-24 -left-24 w-96 h-96 blur-[120px] rounded-full transition-opacity duration-1000",
                                isDark ? "bg-blue-500/5 opacity-40" : "bg-blue-400/10 opacity-20"
                            )} />

                            <div className="max-w-3xl relative z-10 text-center lg:text-right">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className={cn(
                                        "inline-block px-4 py-1 rounded-full text-[10px] uppercase mb-8 border",
                                        isDark ? "bg-white/5 border-white/10 text-primary" : "bg-sky-50 border-sky-100 text-sky-600",
                                        locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-black tracking-[0.3em]"
                                    )}
                                >
                                    {pageData?.cta?.badge || t("badge")}
                                </motion.div>
                                <h2 className={cn(
                                    "text-3xl md:text-6xl font-black mb-8 md:mb-12 leading-[1.1] md:leading-[1] italic tracking-tight",
                                    locale === 'ar' ? "font-bold" : "font-black",
                                    isDark ? "text-white" : "text-sky-950"
                                )}>
                                    {pageData?.cta?.title || t("cta_title")}
                                </h2>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    {(pageData?.cta?.features || [t("cta_feat1"), t("cta_feat2"), t("cta_feat3")]).map((feat, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className={cn(
                                                "flex items-center gap-3 px-6 py-3 rounded-2xl border text-sm font-bold tracking-tight shadow-sm transition-all hover:scale-105",
                                                isDark ? "bg-white/5 border-white/10 text-sky-100" : "bg-white/80 border-sky-100 text-sky-800"
                                            )}
                                        >
                                            <CheckCircle2 className={cn("w-5 h-5", isDark ? "text-primary" : "text-sky-500")} />
                                            {feat}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className={cn(
                                    "relative z-10 px-10 py-5 md:px-16 md:py-8 font-black text-lg md:text-xl rounded-[2rem] flex items-center gap-4 md:gap-6 group transition-all transform hover:scale-105 shadow-2xl active:scale-95 whitespace-nowrap",
                                    locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-black tracking-normal uppercase",
                                    isDark ? "bg-primary text-[#020617] hover:bg-white" : "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/30"
                                )}
                            >
                                {pageData?.cta?.btn || t("cta_btn")}
                                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Bottom Spacing */}
                <div className="h-20" />
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    100% { left: 200%; }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </main>
    );
}
