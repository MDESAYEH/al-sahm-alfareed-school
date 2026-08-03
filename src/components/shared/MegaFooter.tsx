"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { GlobalSettingsDTO } from "@/types/strapi";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaFooterProps {
    settings: GlobalSettingsDTO | null;
}

export default function MegaFooter({ settings }: MegaFooterProps) {
    const t = useTranslations("Footer");
    const navT = useTranslations("Navbar");
    const locale = useLocale();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const footerNavigation = {
        support: [
            { name: navT("home"), href: "/" },
            { name: navT("services"), href: "/services" },
            { name: navT("portfolio"), href: "/projects" },
            { name: navT("about"), href: "/about" },
            { name: navT("contact"), href: "/contact" },
            { name: navT("complaints"), href: "/complaints" },
        ],
    };

    return (
        <footer
            className="relative z-50 bg-white dark:bg-[#020617] text-slate-700 dark:text-slate-300 font-tajawal border-t border-slate-200 dark:border-white/5 overflow-hidden"
            aria-labelledby="footer-heading"
        >
            {/* الخلفية التجميلية العلوية (اختياري - يعطي تدرج خفيف) */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>

            <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
                <div className="grid gap-12 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-start">
                    
                    {/* العمود الأول: الشعار والوصف */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="inline-block">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-4"
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-lg transition-opacity opacity-0 group-hover:opacity-100" />
                                    <Image
                                        src={mounted && theme === "dark" ? (settings?.logoDark || "/logo.png") : (settings?.logoLight || "/logo.png")}
                                        alt={settings?.siteName || "ALRawafed United"}
                                        width={160}
                                        height={48}
                                        className="relative h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                        priority
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <span className={cn(
                                        "text-xl sm:text-2xl text-[#222556] dark:text-white leading-none tracking-tight",
                                        locale === 'ar' ? "font-bold" : "font-black"
                                    )}>
                                        {settings?.siteName || "الروافد المتحدة"}
                                    </span>
                                    <span className={cn(
                                        "text-[10px] font-bold text-primary/80 dark:text-blue-400/80 uppercase mt-1",
                                        locale === 'ar' ? "tracking-normal" : "tracking-[0.22em]"
                                    )}>
                                        {settings?.siteName ? settings.siteName.toUpperCase() : "ALRAWAFED ALMUTAHIDA"}
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm text-slate-600 dark:text-slate-400 font-tajawal">
                            {settings?.footer?.description || t("description")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}