'use client';

import { motion } from 'framer-motion';

interface BookDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export function BookDivider({ color = 'currentColor', flip = false, className = '' }: BookDividerProps) {
  return (
    <svg 
      viewBox="0 0 1200 100" 
      className={`w-full ${flip ? 'rotate-180' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path 
        d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" 
        fill={color}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}
