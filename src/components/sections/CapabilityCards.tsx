"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Cpu, Globe, ShieldCheck, LineChart, Link as LinkIcon, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function ServicesLayout({ allProjects }: { allProjects: any[] }) {
    const t = useTranslations("CapabilityCards");
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (resolvedTheme || theme) === "dark";

    const categories = [
        {
            id: "web",
            title: t("categories.web_title"),
            description: t("categories.web_desc"),
            icon: <Globe className={cn("w-10 h-10", isDark ? "text-primary" : "text-sky-500")} />,
            glow: isDark ? "rgba(0, 112, 243, 0.15)" : "rgba(14, 165, 233, 0.1)"
        },
        {
            id: "cyber",
            title: t("categories.cyber_title"),
            description: t("categories.cyber_desc"),
            icon: <ShieldCheck className={cn("w-10 h-10", isDark ? "text-green-400" : "text-emerald-500")} />,
            glow: isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(16, 185, 129, 0.1)"
        },
        {
            id: "cloud",
            title: t("categories.cloud_title"),
            description: t("categories.cloud_desc"),
            icon: <Cpu className={cn("w-10 h-10", isDark ? "text-sky-400" : "text-blue-500")} />,
            glow: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(59, 130, 246, 0.1)"
        },
        {
            id: "data",
            title: t("categories.data_title"),
            description: t("categories.data_desc"),
            icon: <LineChart className={cn("w-10 h-10", isDark ? "text-purple-400" : "text-indigo-500")} />,
            glow: isDark ? "rgba(168, 85, 247, 0.15)" : "rgba(99, 102, 241, 0.1)"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {categories.map((cat) => (
                <ServiceCard
                    key={cat.id}
                    title={cat.title}
                    description={cat.description}
                    icon={cat.icon}
                    category={cat.id}
                    glow={cat.glow}
                    isDark={isDark}
                    relatedProjects={allProjects.filter(p => p.attributes.Category === cat.id).slice(0, 3)}
                    relatedTitle={t("related_title")}
                />
            ))}
        </div>
    );
}

const ServiceCard = ({ title, description, icon, glow, relatedProjects, relatedTitle, isDark }: any) => {
    const locale = useLocale();

    return (
        <SpotlightCard
            spotlightColor={glow}
            className={cn(
                "group relative h-full flex flex-col justify-between backdrop-blur-3xl p-10 rounded-[3rem] transition-all duration-700 hover:scale-[1.01] shadow-2xl overflow-hidden border",
                isDark
                    ? "bg-slate-900/40 border-white/5 hover:border-white/10"
                    : "bg-white/70 border-sky-100 hover:border-sky-300 shadow-sky-900/5"
            )}
        >
            <div className="flex flex-col h-full relative z-10">
                {/* Floating 3D Icon Container */}
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className={cn(
                        "mb-10 p-6 rounded-[2rem] w-fit border shadow-xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
                        isDark ? "bg-white/5 border-white/10" : "bg-sky-50 border-sky-100"
                    )}
                >
                    {icon}
                </motion.div>

                <h3 className={cn(
                    "text-3xl font-black mb-6 tracking-tight transition-colors",
                    isDark ? "text-white group-hover:text-primary" : "text-sky-950 group-hover:text-sky-600"
                )}>
                    {title}
                </h3>

                <p className={cn(
                    "text-xl leading-relaxed mb-10 flex-grow font-light",
                    isDark ? "text-white/40" : "text-sky-900/60"
                )}>
                    {description}
                </p>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className={cn(
                        "pt-8 border-t mt-auto",
                        isDark ? "border-white/5" : "border-sky-100"
                    )}>
                        <h4 className={cn(
                            "text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3",
                            isDark ? "text-white/30" : "text-sky-500/60"
                        )}>
                            <LinkIcon className="w-3.5 h-3.5" /> {relatedTitle}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {relatedProjects.map((project: any) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.attributes.Slug}`}
                                    className={cn(
                                        "text-sm px-6 py-3 rounded-2xl border transition-all flex items-center gap-3 group/btn font-bold",
                                        isDark
                                            ? "bg-white/5 border-white/10 text-white hover:bg-primary hover:text-[#020617] hover:border-primary"
                                            : "bg-white border-sky-100 text-sky-950 hover:bg-sky-500 hover:text-white hover:border-sky-500 shadow-sm"
                                    )}
                                >
                                    {project.attributes.Title}
                                    <ArrowRight className="w-4 h-4 translate-x-1 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Corner Accent Glow */}
            <div className={cn(
                "absolute -top-10 -right-10 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0 rounded-full",
                isDark ? "bg-primary/20" : "bg-sky-400/10"
            )} />
        </SpotlightCard>
    );
};
