'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  loading?: 'lazy' | 'eager' | undefined;
  sizes?: string;
  quality?: number;
}

export function ParallaxImage({ src, alt, className, speed = 0.5, loading = 'lazy', sizes, quality = 75 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" loading={loading} sizes={sizes} quality={quality} />
      </motion.div>
    </div>
  );
}
