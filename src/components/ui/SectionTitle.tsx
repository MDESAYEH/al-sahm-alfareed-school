'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  id?: string;
}

export function SectionTitle({ badge, title, subtitle, align = 'center', className, id }: SectionTitleProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn('flex flex-col gap-4 mb-12', alignClass[align], className)}
    >
      {badge && (
        <span className="inline-block px-4 py-2 bg-brand-accent/10 text-brand-accent text-sm font-bold rounded-full border border-brand-accent/20">
          {badge}
        </span>
      )}
      <h2 id={id} className="text-4xl md:text-5xl font-bold text-neutral-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
