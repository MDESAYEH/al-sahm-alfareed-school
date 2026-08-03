"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Languages, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { GlobalSettingsDTO } from "@/types/strapi";
import { MagneticButton } from '@/components/ui/MagneticButton';

interface NavbarProps {
    settings: GlobalSettingsDTO | null;
}

export default function Navbar({ settings }: NavbarProps) {
    const t = useTranslations("Navbar");
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const currentLocale = useLocale();
    const isRTL = currentLocale === "ar";
    const menuButtonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => setMounted(true), []);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Immersive Lock Scroll (fixed body technique) + ESC Key
    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;
        const body = document.body;

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            const y = Math.abs(parseInt(body.style.top || "0", 10));
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.width = "";
            window.scrollTo(0, y);
            // Restore focus to menu button when closed
            menuButtonRef.current?.focus();
        };
    }, [isOpen]);

    const navigationLinks = [
        { href: "/", label: t("links.home") || (isRTL ? "الرئيسية" : "Home") },
        { href: "/complaints", label: t("links.complaints") || (isRTL ? "الشكاوي والملاحظات" : "Feedback") },
    ];

    const toggleLanguage = () => {
        const newLocale = currentLocale === "ar" ? "en" : "ar";
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
        const newPathname = newLocale === 'ar'
            ? `/ar${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
            : `/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
        router.push(newPathname);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: isRTL ? 20 : -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
    };

    const logoSrc = settings?.logoLight || "/logo.png";

    if (!mounted) return null;

    return (
        <nav className={cn(
            "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
            scrolled 
                ? "bg-white/95 backdrop-blur-lg shadow-md py-3" 
                : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={logoSrc}
                            alt={settings?.siteName || "Al-Sahm Al-Fareed"}
                            width={180}
                            height={60}
                            className="h-12 w-auto transition-all duration-300"
                            style={{ width: 'auto' }}
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className={cn('flex items-center gap-1', isRTL && 'flex-row-reverse')}>
                        {navigationLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'px-4 py-2 text-sm font-semibold transition-all rounded-full',
                                    pathname === link.href
                                        ? index === 0 
                                            ? 'text-blue-600 bg-blue-50 bg-white'
                                            : 'text-red-600 bg-red-50 bg-white'
                                        : index === 0
                                            ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 bg-white'
                                            : 'text-red-600 hover:text-red-700 hover:bg-red-50 bg-white'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLanguage}
                            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all bg-white border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                            <Languages className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    ref={menuButtonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center border transition-all bg-white border-slate-200 text-red-600 hover:bg-red-50"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[110] bg-gradient-to-br from-brand-signature via-brand-accent to-sky-500 lg:hidden overflow-hidden"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <Link href="/" onClick={() => setIsOpen(false)}>
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        width={150}
                                        height={50}
                                        className="h-10 w-auto"
                                        style={{ width: 'auto' }}
                                    />
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="flex-1 flex flex-col justify-center px-8 gap-4"
                            >
                                {navigationLinks.map((link) => (
                                    <motion.div key={link.href} variants={itemVariants}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-3xl text-white hover:text-white/80 transition-colors flex items-center gap-3 group font-bold",
                                                isRTL && 'flex-row-reverse text-right'
                                            )}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div variants={itemVariants} className="pt-6 flex items-center gap-3">
                                    <button
                                        onClick={toggleLanguage}
                                        className="flex-1 py-4 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold flex items-center justify-center gap-3"
                                    >
                                        <Languages className="w-5 h-5" />
                                        {currentLocale === "ar" ? "English" : "العربية"}
                                    </button>
                                </motion.div>
                            </motion.div>

                            {/* Footer CTA */}
                            <div className="p-6">
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
