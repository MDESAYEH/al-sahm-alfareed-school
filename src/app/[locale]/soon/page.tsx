"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, MessageSquare, Sparkles } from "lucide-react";

export default function SoonPage() {
    const t = useTranslations("Soon");

    return (
        <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 px-6">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] animate-pulse delay-700" />
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-12">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase"
                >
                    <Sparkles className="w-4 h-4" />
                    {t("badge")}
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        {t("title_part1")} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
                            {t("title_highlight")}
                        </span>
                    </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font- tajawal"
                >
                    {t("description")}
                </motion.p>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/25"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                        {t("back_home")}
                    </Link>
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold transition-all hover:bg-slate-200 dark:hover:bg-white/10 hover:scale-[1.02] active:scale-95"
                    >
                        <MessageSquare className="w-5 h-5" />
                        {t("contact")}
                    </Link>
                </motion.div>

                {/* Rocket Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        type: "spring",
                        stiffness: 100
                    }}
                    className="pt-12"
                >
                    <div className="relative inline-block">
                        <Rocket className="w-16 h-16 text-slate-300 dark:text-slate-700 animate-bounce" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
