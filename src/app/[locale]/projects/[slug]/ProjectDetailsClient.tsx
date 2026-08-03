import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Globe, Calendar, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailsClient({ project }: { project: any }) {
    const t = useTranslations("ProjectDetails");
    const locale = useLocale();
    const { title, description, thumbnail, category, gallery } = project;

    return (
        <main className="min-h-screen bg-white dark:bg-black font-tajawal">
            {/* Hero Section */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
                {thumbnail && (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                <div className="container relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={cn(
                            "inline-block px-4 py-1 rounded-full border border-sky-400/30 text-sky-400 mb-6 text-sm",
                            locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-bold tracking-widest uppercase"
                        )}>
                            {category}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl">
                            {title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6 relative">
                {/* Floating background element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 dark:bg-slate-900/20 -z-10" />

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Project Details / Quick Facts */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24 space-y-6">
                                <div className="p-8 bg-white dark:bg-slate-900 rounded-apple border border-slate-200 dark:border-white/10 shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-white/5 pb-4">
                                        {t("overview_title")}
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                                                <Globe className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-500 mb-1">{t("client_label")}</h4>
                                                <p className="text-slate-900 dark:text-white font-semibold">{t("client_val")}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                                                <Calendar className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-500 mb-1">{t("duration_label")}</h4>
                                                <p className="text-slate-900 dark:text-white font-semibold">{t("duration_val")}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                                                <Cpu className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-500 mb-1">{t("tech_label")}</h4>
                                                <p className="text-slate-900 dark:text-white font-semibold">Next.js, Strapi, Cloudflare</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/${locale}/projects`}
                                    className="flex items-center justify-between p-6 bg-primary text-white rounded-apple font-bold hover:bg-primary-dark transition-all group"
                                >
                                    <span>{t("more_btn")}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Main Description */}
                        <div className="lg:col-span-8">
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{t("success_story")}</h2>
                                    <div className="prose prose-lg dark:prose-invert max-w-none">
                                        <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                                            {description}
                                        </p>
                                    </div>
                                </div>

                                {/* Example of a Case Study Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100 dark:border-white/5">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-primary">{t("challenge_title")}</h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {t("challenge_desc")}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-green-600">{t("solution_title")}</h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {t("solution_desc")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 1. Dynamic Gallery Section */}
            {gallery && gallery.length > 0 && (
                <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">{t("gallery_title")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gallery.map((img: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-apple overflow-hidden h-72 shadow-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800"
                                >
                                    <Image
                                        src={img}
                                        alt={`${title} execution detail ${idx + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 2. Specialized Contact Form Section (Premium Design) */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="p-12 bg-ocean-gradient rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                        {/* Design accents */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl animate-pulse" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <span className={cn(
                                    "inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs",
                                    locale === 'ar' ? "font-bold !tracking-normal normal-case" : "font-bold uppercase tracking-widest"
                                )}>
                                    {t("cta_badge")}
                                </span>
                                <h2 className="text-4xl font-bold leading-tight">
                                    {t("cta_title_part1")} <br />
                                    <span className="text-sky-300">"{title}"</span>{t("cta_title_part2")}
                                </h2>
                                <p className="text-lg opacity-80 leading-relaxed font-light">
                                    {t("cta_desc")}
                                </p>
                            </div>

                            <form className="space-y-4">
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        placeholder={t("form_name")}
                                        className="w-full p-5 rounded-apple bg-white/10 border border-white/20 backdrop-blur-xl placeholder:text-white/50 focus:outline-none focus:ring-2 ring-white/40 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="email"
                                        placeholder={t("form_email")}
                                        className="w-full p-5 rounded-apple bg-white/10 border border-white/20 backdrop-blur-xl placeholder:text-white/50 focus:outline-none focus:ring-2 ring-white/40 transition-all"
                                    />
                                </div>
                                <button className="w-full py-5 bg-white text-primary font-bold rounded-apple hover:bg-sky-50 transition-all transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 shadow-lg">
                                    {t("form_btn")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-pearl dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
                <div className="container px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 mb-12 max-w-2xl mx-auto">
                        {t("bottom_cta")}
                    </h2>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-block px-12 py-5 bg-primary text-white font-bold rounded-apple hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 scale-105"
                    >
                        {t("bottom_btn")}
                    </Link>
                </div>
            </section>
        </main>
    );
}

import { getStrapiMedia } from "@/services/strapi.service";
