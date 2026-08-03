'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
  duration?: number;
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className,
  duration = 0.6 
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const variants = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 },
    scale: { scale: 0.9, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : variants[direction]}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut" as const
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
