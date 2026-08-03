'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'light' | 'dark';
  hover?: boolean;
  className?: string;
}

export function GlassCard({ children, variant = 'light', hover = true, className }: GlassCardProps) {
  const variants = {
    light: 'glass-card',
    dark: 'glass-dark',
  };

  return (
    <motion.div
      className={cn(
        'rounded-2xl p-6',
        variants[variant],
        hover && 'transition-all duration-300',
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
    >
      {children}
    </motion.div>
  );
}
