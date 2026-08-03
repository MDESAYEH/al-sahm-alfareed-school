"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Sparkles, Briefcase, Users, Award, Lightbulb, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { AboutDTO } from "@/types/strapi";
import * as LucideIcons from "lucide-react";

const IconRenderer = ({ iconName, className }: { iconName: string; className?: string }) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <Icon className={className} />;
};

export default function AboutContent({
    locale,
    metrics: metricsData,
    aboutData
}: {
    locale: string,
    metrics: { projects: string, experts: string, years: string, solutions: string },
    aboutData: AboutDTO | null
}) {
    const t = useTranslations("About");
    const tDetails = useTranslations("AboutDetails");
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (resolvedTheme || theme) === "dark";

    const bgImage = aboutData?.heroBackgroundImage || (isDark
        ? "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2400&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2400&auto=format&fit=crop");

    const metrics = [
        { label: t("metrics.projects"), value: metricsData.projects, icon: <Briefcase className="w-6 h-6" /> },
        { label: t("metrics.experts"), value: metricsData.experts, icon: <Users className="w-6 h-6" /> },
        { label: t("metrics.years"), value: metricsData.years, icon: <Award className="w-6 h-6" /> },
        { label: t("metrics.solutions"), value: metricsData.solutions, icon: <Zap className="w-6 h-6" /> },
    ];

    const values = aboutData?.values?.length
        ? aboutData.values.map(v => ({
            title: v.title,
            desc: v.desc,
            icon: <IconRenderer iconName={v.icon} className="w-8 h-8" />
        }))
        : [
            { title: tDetails("innovation_title"), desc: tDetails("innovation_desc"), icon: <Lightbulb className="w-8 h-8" /> },
            { title: tDetails("trust_title"), desc: tDetails("trust_desc"), icon: <ShieldCheck className="w-8 h-8" /> },
            { title: tDetails("growth_title"), desc: tDetails("growth_desc"), icon: <TrendingUp className="w-8 h-8" /> },
        ];

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
                            animate={{ scale: 1, opacity: isDark ? 0.3 : 0.15 }}
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

                {/* Azure Aura Leak (Top Left) */}
                <div className={cn(
                    "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] blur-[150px] rounded-full transition-colors duration-1000",
                    isDark ? "bg-primary/5" : "bg-sky-400/10"
                )} />
            </div>

            <div className="relative z-10">
                {/* ========== SECTION 1: THE GRAND GENESIS (HERO) ========== */}
                <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center pt-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={cn(
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs mb-6",
                            locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-black tracking-widest uppercase"
                        )}
                    >
                        <Sparkles className="w-3 h-3" />
                        {aboutData?.badge || t("badge")}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className={cn(
                            "text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.1]",
                            locale === 'ar' ? "font-bold" : "font-black"
                        )}
                    >
                        <span className={cn(isDark ? "text-white" : "text-slate-900")}>
                            {aboutData?.titlePart1 || t("title_part1")}{" "}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                            {aboutData?.titleHighlight || t("title_highlight")}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className={cn(
                            "text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto",
                            isDark ? "text-slate-400" : "text-slate-600"
                        )}
                    >
                        {aboutData?.subtitle || t("subtitle")}
                    </motion.p>
                </section>

                {/* ========== SECTION 2: THE CORE ESSENCE (METRICS GRID) ========== */}
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {metrics.map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={cn(
                                        "group p-10 md:p-12 rounded-[4rem] border transition-all duration-700 backdrop-blur-3xl relative",
                                        isDark
                                            ? "bg-white/5 border-white/5 hover:border-white/10"
                                            : "bg-white/70 border-sky-100 shadow-xl shadow-sky-900/5 hover:border-sky-300"
                                    )}
                                >
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                                        isDark ? "bg-white/5 text-primary" : "bg-sky-50 text-sky-500"
                                    )}>
                                        {metric.icon}
                                    </div>
                                    <h3 className={cn(
                                        "text-3xl md:text-4xl font-black mb-2 tracking-tighter transition-colors",
                                        isDark ? "text-white" : "text-sky-950"
                                    )}>
                                        {metric.value}
                                    </h3>
                                    <p className={cn(
                                        "text-xs font-black uppercase tracking-[0.3em]",
                                        locale === 'ar' ? "tracking-normal font-bold" : "tracking-[0.3em] font-black",
                                        isDark ? "text-white/30" : "text-sky-900/40"
                                    )}>
                                        {metric.label}
                                    </p>
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                                        isDark ? "from-primary/5 to-transparent" : "from-sky-400/5 to-transparent"
                                    )} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SECTION 3: STRATEGIC PHILOSOPHY (VALUES) ========== */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "text-3xl md:text-4xl font-bold mb-6",
                                    isDark ? "text-white" : "text-slate-900"
                                )}
                            >
                                {aboutData?.philosophy?.title || tDetails("values_title")}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className={cn(
                                    "text-lg",
                                    isDark ? "text-slate-400" : "text-slate-600"
                                )}
                            >
                                {aboutData?.philosophy?.subtitle || tDetails("values_subtitle")}
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <SpotlightCard className={cn(
                                        "group p-10 h-full rounded-[3rem] border transition-all duration-700 backdrop-blur-3xl overflow-hidden",
                                        isDark
                                            ? "bg-white/5 border-white/5 hover:border-white/10"
                                            : "bg-white/80 border-sky-100 hover:border-sky-300 shadow-xl shadow-sky-900/5"
                                    )}>
                                        <div className={cn(
                                            "w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 transition-transform group-hover:rotate-6",
                                            isDark ? "bg-white/5 text-primary" : "bg-sky-50 text-sky-500"
                                        )}>
                                            {val.icon}
                                        </div>
                                        <h4 className={cn(
                                            "text-2xl mb-4 tracking-tight",
                                            locale === 'ar' ? "font-bold" : "font-black",
                                            isDark ? "text-white" : "text-sky-950"
                                        )}>
                                            {val.title}
                                        </h4>
                                        <p className={cn(
                                            "text-sm font-light leading-relaxed",
                                            isDark ? "text-white/40" : "text-sky-900/60"
                                        )}>
                                            {val.desc}
                                        </p>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SECTION 4: THE FINAL INVITATION (CTA) ========== */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "relative overflow-hidden p-12 md:p-16 rounded-[5rem] border shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 backdrop-blur-3xl transition-all duration-700",
                                isDark
                                    ? "bg-transparent border-white/10 hover:border-white/20 shadow-primary/5"
                                    : "bg-transparent border-sky-200/50 hover:border-sky-300 shadow-sky-900/5"
                            )}
                        >
                            {/* Decorative Glows */}
                            <div className={cn(
                                "absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full transition-opacity duration-1000",
                                isDark ? "bg-primary/10 opacity-60" : "bg-sky-400/20 opacity-40"
                            )} />

                            <div className="max-w-3xl relative z-10 text-center lg:text-right">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "inline-block px-4 py-1 rounded-full text-[10px] uppercase mb-6 border",
                                        locale === 'ar' ? "tracking-normal font-bold" : "tracking-[0.3em] font-black",
                                        isDark ? "bg-white/5 border-white/10 text-primary" : "bg-sky-50 border-sky-100 text-sky-600"
                                    )}
                                >
                                    {t("badge")}
                                </motion.div>
                                <h2 className={cn(
                                    "text-3xl md:text-5xl mb-6 leading-tight",
                                    isDark ? "text-white" : "text-sky-950",
                                    locale === 'ar' ? "font-bold" : "font-black"
                                )}>
                                    {aboutData?.cta?.titlePart1 || t("cta.title_part1")}{" "}
                                    <span className="text-blue-400">
                                        {aboutData?.cta?.titleHighlight || t("cta.title_highlight")}
                                    </span>
                                </h2>
                                <p className={cn(
                                    "text-lg mb-10 leading-relaxed",
                                    isDark ? "text-blue-100/80" : "text-sky-900/70"
                                )}>
                                    {aboutData?.cta?.description || t("cta.description")}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-10 w-full sm:w-auto">
                                <Link
                                    href="/contact"
                                    className={cn(
                                        "px-10 py-5 md:px-16 md:py-8 font-black text-lg md:text-xl rounded-[2rem] flex items-center justify-center gap-4 md:gap-6 group transition-all transform hover:scale-105 shadow-2xl active:scale-95 whitespace-nowrap",
                                        isDark ? "bg-primary text-[#020617] hover:bg-white" : "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/30"
                                    )}
                                >
                                    {t("cta.primary")}
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2" />
                                </Link>
                                <Link
                                    href="/projects"
                                    className={cn(
                                        "px-8 py-5 md:px-12 md:py-8 text-lg md:text-xl rounded-[2rem] flex items-center justify-center gap-4 md:gap-6 group transition-all transform hover:scale-105 shadow-xl active:scale-95 whitespace-nowrap border",
                                        locale === 'ar' ? "font-bold" : "font-black",
                                        isDark ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-sky-100 text-sky-900 hover:border-sky-300"
                                    )}
                                >
                                    {t("cta.secondary")}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="h-20" />
            </div>
        </main>
    );
}
