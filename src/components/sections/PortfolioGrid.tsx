"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProjectCardDTO } from "@/types/strapi";
import { getStrapiMedia, normalizeMedia } from "@/services/strapi.service";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import {
    Sparkles,
    Zap,
    ArrowRight,
    Filter,
    Layers,
    Monitor,
    ShieldCheck,
    Cloud,
    LayoutGrid,
    ArrowUpRight
} from "lucide-react";

interface PortfolioGridProps {
    initialProjects: ProjectCardDTO[];
    categories: any[];
}

export default function PortfolioGrid({
    initialProjects,
    categories
}: PortfolioGridProps) {
    const t = useTranslations("PortfolioGrid");
    const locale = useLocale();
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [filter, setFilter] = useState("all");

    // Internal icon mapping to avoid serialization issues from Server Components
    const iconMap: Record<string, any> = {
        all: Layers,
        web: Monitor,
        cyber: ShieldCheck,
        cloud: Cloud,
    };

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = (mounted
        ? resolvedTheme || theme
        : "dark") as "light" | "dark";

    const isDark = currentTheme === "dark";

    const filteredProjects = initialProjects.filter(
        (p: ProjectCardDTO) => filter === "all" || p.category === filter
    );

    // Animation Variants
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

    const bgImage = isDark
        ? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop";

    return (
        <section className={cn(
            "relative min-h-screen font-tajawal overflow-hidden transition-colors duration-700",
            isDark ? "bg-[#020617]" : "bg-[#f0f9ff]"
        )}>

            {/* ========== CINEMATIC STAGE ========== */}
            <div className="fixed inset-0 z-0">
                <AnimatePresence mode="wait">
                    {mounted && (
                        <motion.div
                            key={currentTheme}
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
                    "absolute top-[-5%] left-[-5%] w-[600px] h-[600px] blur-[120px] rounded-full",
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
                                locale === 'ar' ? "!tracking-normal font-bold normal-case" : "font-black tracking-[0.3em] uppercase"
                            )}
                        >
                            <Zap className="w-4 h-4 animate-pulse" />
                            {t("badge")}
                            <Sparkles className="w-3.5 h-3.5 opacity-60" />
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className={cn(
                                "text-3xl md:text-7xl lg:text-8xl leading-tight md:leading-[1]",
                                locale === 'ar' ? "font-bold !tracking-normal" : "font-black tracking-normal"
                            )}
                        >
                            <span className={cn(
                                "transition-colors",
                                isDark ? "text-white [text-shadow:0_10px_40px_rgba(0,0,0,0.5)]" : "text-sky-950"
                            )}>
                                {t("title_part1")}
                            </span>
                            <br className="hidden md:block" />
                            <span className="relative inline-block mt-2 md:mt-4">
                                <span className={cn(
                                    "absolute inset-0 blur-[80px] opacity-30",
                                    isDark ? "bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" : "bg-sky-400"
                                )} />
                                <span className={cn(
                                    "relative text-transparent bg-clip-text italic",
                                    locale === 'ar' ? "font-bold" : "font-black",
                                    isDark ? "bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" : "bg-gradient-to-r from-sky-600 to-blue-700"
                                )}>
                                    {t("title_highlight")}
                                </span>
                            </span>
                            <span className={cn(
                                "ml-2 md:ml-4 inline transition-colors mt-2 md:mt-0",
                                isDark ? "text-white" : "text-sky-950"
                            )}>
                                {t("title_part2")}
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className={cn(
                                "mt-8 text-base md:text-xl max-w-2xl mx-auto leading-loose md:leading-relaxed font-light",
                                isDark ? "text-white/50" : "text-sky-900/60"
                            )}
                        >
                            {t("subtitle")}
                        </motion.p>
                    </motion.div>
                </section>

                {/* ========== GRID & FILTERS ========== */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Elegant Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-12 md:mb-20 w-full overflow-hidden"
                    >
                        <div className={cn(
                            "flex p-2 rounded-3xl border backdrop-blur-3xl shadow-2xl max-w-full overflow-x-auto scrollbar-hide no-scrollbar items-center",
                            isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-sky-100"
                        )}>
                            <div className="flex items-center gap-1 md:gap-2 min-w-max px-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilter(cat.id)}
                                        className={cn(
                                            "relative px-4 md:px-8 py-2 md:py-3 rounded-2xl text-xs md:text-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap",
                                            filter === cat.id
                                                ? (isDark ? "text-[#020617]" : "text-white")
                                                : (isDark ? "text-white/40 hover:text-white" : "text-sky-900/40 hover:text-sky-600"),
                                            locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-black tracking-widest uppercase"
                                        )}
                                    >
                                        {filter === cat.id && (
                                            <motion.div
                                                layoutId="activeFilter"
                                                className={cn(
                                                    "absolute inset-0 rounded-2xl shadow-xl",
                                                    isDark ? "bg-primary" : "bg-sky-500"
                                                )}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        {(() => {
                                            const Icon = iconMap[cat.id] || Layers;
                                            return <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 relative z-10" />;
                                        })()}
                                        <span className="relative z-10">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Grid */}
                    <motion.div
                        layout
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-[300px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project: ProjectCardDTO) => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.6, ease: "easeOut" as const }}
                                        className={cn(
                                            "relative overflow-hidden rounded-[3rem] group cursor-pointer border transition-all duration-700",
                                            isDark ? "border-white/10 bg-white/[0.02]" : "border-sky-100 bg-white shadow-sm",
                                            project.size === "large" ? "md:col-span-2 md:row-span-2" :
                                                project.size === "medium" ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"
                                        )}
                                    >
                                        <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                                            {/* Background Image with Depth */}
                                            <div className="absolute inset-0 scale-[1.01]">
                                                <Image
                                                    src={normalizeMedia(project.thumbnail) || "/visuals/scene-city.svg"}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1"
                                                />
                                                <div className={cn(
                                                    "absolute inset-0 transition-opacity duration-700",
                                                    isDark
                                                        ? "bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-80 group-hover:opacity-60"
                                                        : "bg-gradient-to-t from-sky-950/80 via-sky-950/20 to-transparent opacity-60 group-hover:opacity-40"
                                                )} />
                                            </div>

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10">
                                                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                                                    <div className={cn(
                                                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border text-[10px]",
                                                        locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-black uppercase tracking-widest",
                                                        isDark ? "bg-white/10 border-white/10 text-primary" : "bg-sky-500/20 border-sky-400/20 text-white"
                                                    )}>
                                                        {categories.find(c => c.id === project.category)?.name}
                                                    </div>
                                                    <h3 className={cn(
                                                        "text-white text-3xl mb-3 leading-none transition-colors group-hover:text-primary",
                                                        locale === 'ar' ? "font-bold" : "font-black"
                                                    )}>
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-white/60 text-sm line-clamp-2 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-auto overflow-hidden">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Arrow Indicator */}
                                            <div className={cn(
                                                "absolute top-8 right-8 z-20 w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0",
                                                isDark ? "bg-white/10 border-white/10 text-white" : "bg-sky-500 text-white border-sky-400 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                                            )}>
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full text-center py-40 rounded-[3rem] border border-dashed border-white/10"
                                >
                                    <p className="text-xl text-slate-500 font-bold">{t("no_projects")}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Bottom Spacing */}
                <div className="h-40" />
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    100% { left: 200%; }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </section>
    );
}
