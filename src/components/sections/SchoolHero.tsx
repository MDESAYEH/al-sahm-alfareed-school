'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/navigation';
import { ArrowLeft, Play, CheckCircle, Users, Award, Sparkles, ChevronDown, WifiOff } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/cn';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useEffect, useState, useRef } from 'react';

interface HeroData {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  video?: string | null;
  videoFallbackFormats?: Array<{ src: string; type: string }>;
  backgroundImage?: string | null;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

interface SchoolHeroProps {
  data?: HeroData | null;
}

const defaultStats = [
  { value: 400, suffix: '+', label: { ar: 'طالب وطالبة', en: 'Students' }, icon: Users },
  { value: 20, suffix: '+', label: { ar: 'معلم متخصص', en: 'Teachers' }, icon: Users },
  { value: 87, suffix: '%', label: { ar: 'نسبة النجاح', en: 'Success Rate' }, icon: Award },
  { value: 12, suffix: '+', label: { ar: 'عام من التميز', en: 'Years of Excellence' }, icon: Sparkles },
];

const DEFAULT_BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkMjU1MTA+PCc4ODo8NjI+P0A+PDM/ODw8PDxAQEBAQEBAQEBAQED/2wBDARUXFyAeIB4gICBANjQ2QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQED/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA3V6IA/9k=";

export default function SchoolHero({ data }: SchoolHeroProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const badge = data?.badge || (isRTL ? 'مكان يصنع المستقبل منذ 2014' : 'Shaping Futures Since 2014');
  const title1 = data?.titleLine1 || (isRTL ? 'حيث يبدأ' : 'Where');
  const title2 = data?.titleLine2 || (isRTL ? 'مستقبل أبنأكم' : 'Futures Begin');
  const subtitle = data?.subtitle || (isRTL 
    ? ' قم في بيئة آمنة تشجع على الإبداع والتفوق' 
    : 'Nurturing academic excellence and personal growth in a safe environment that inspires creativity and achievement');
  const backgroundImage = data?.backgroundImage || 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1920&q=80';
  const videoSource = data?.video;

  useEffect(() => {
    let cancelled = false;
    if (typeof window === 'undefined') return;

    const runCheck = async () => {
      const nav = navigator as Navigator & {
        connection?: { saveData: boolean; effectiveType: string };
      };
      const conn = nav.connection;
      const saveData = conn?.saveData;
      const effectiveType = conn?.effectiveType || '4g';
      const isSlow = effectiveType === 'slow-2g' || effectiveType === '2g';

      if (!cancelled && !saveData && !isSlow && videoSource) {
        setCanPlayVideo(true);
      }
    };

    runCheck();
    return () => { cancelled = true; };
  }, [videoSource]);

  const handleVideoCanPlay = () => setVideoReady(true);
  const handleVideoError = () => {
    setVideoError(true);
    setCanPlayVideo(false);
  };

  const showVideo = canPlayVideo && !videoError && !!videoSource;

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      aria-describedby="hero-subtitle"
    >
      {/* Background Layer: Poster Image (always present for LCP/fallback) */}
      <motion.div 
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" as const }}
        aria-hidden="true"
      >
        <Image
          src={backgroundImage}
          alt={isRTL ? 'مدرسة السهم الفريد' : 'Al-Sahm Al-Fareed School'}
          fill
          priority
          quality={90}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Background Layer: HTML Video Element (network-aware, graceful fallback to poster) */}
      {showVideo && (
        <motion.video
          ref={videoRef}
          className={cn(
            "absolute inset-0 -z-10 w-full h-full object-cover transition-opacity duration-700",
            videoReady ? "opacity-100" : "opacity-0"
          )}
          poster={backgroundImage}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" as const }}
        >
          {data?.videoFallbackFormats && data.videoFallbackFormats.length > 0 ? (
            data.videoFallbackFormats.map((fmt, i) => (
              <source key={i} src={fmt.src} type={fmt.type} />
            ))
          ) : (
            <source src={videoSource} type="video/mp4" />
          )}
          <track kind="captions" srcLang={locale} label={isRTL ? "العربية" : "English"} default />
        </motion.video>
      )}

      {/* Low-Connection Indicator (subtle) — visible only when video skipped due to network */}
      {videoSource && !showVideo && !videoError && (
        <div className="absolute top-24 right-6 z-30 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md text-white/80 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10" aria-hidden="true">
          <WifiOff className="w-3.5 h-3.5 text-brand-accent" />
          <span>{isRTL ? "وفر البيانات - صورة فقط" : "Data saver - image only"}</span>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-900/80 via-navy-900/50 to-navy-900/30" />
      
      {/* Radial Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,168,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(11,90,168,0.15),transparent_50%)]" />

      <div className="container mx-auto px-6 pt-40 pb-56 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-brand-accent" />
            <span className="text-white font-medium">{badge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-snug lg:leading-normal text-rendering-optimizeLegibility"
            style={{ fontFeatureSettings: '"kern", "liga", "calt", "dlig", "arab";', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
          >
            <span className="block mb-3">{title1}</span>
            <span className="block bg-gradient-to-r from-brand-accent via-sky-300 to-white bg-clip-text text-transparent pb-1">
              {title2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl"
          >
            {subtitle}
          </motion.p>

          {/* CTAs with Magnetic Button Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-40"
            role="group"
            aria-label={isRTL ? "أزرار الدعوة للعمل" : "Call to action buttons"}
          >
          </motion.div>

        </div>

        {/* Floating Statistics - Positioned at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="absolute bottom-28 left-0 right-0 w-full px-4 hidden md:block"
          aria-label={isRTL ? "إحصائيات المدرسة" : "School statistics"}
          role="region"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-4 gap-4 lg:gap-6">
              {defaultStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + (i * 0.1), duration: 0.4 }}
                >
                  <GlassCard variant="dark" hover className="text-center p-6 lg:p-8">
                    <stat.icon className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-3 lg:mb-4 text-brand-accent" aria-hidden="true" />
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2 lg:mb-3" aria-label={`${stat.value}${stat.suffix} ${stat.label[locale as 'ar' | 'en']}`}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm lg:text-base text-white/90 font-medium">{stat.label[locale as 'ar' | 'en']}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden="true"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
}
