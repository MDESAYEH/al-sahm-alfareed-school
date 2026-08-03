'use client';

import { motion } from 'framer-motion';

interface ArrowPatternProps {
  className?: string;
  opacity?: number;
}

export function ArrowPattern({ className = '', opacity = 0.02 }: ArrowPatternProps) {
  return (
    <svg 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="arrow-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <motion.path 
            d="M60 90 L60 30 M60 30 L50 40 M60 30 L70 40" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            fill="none"
            strokeDasharray="40"
            initial={{ strokeDashoffset: 40, opacity: 0.6 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={{
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#arrow-pattern)" />
    </svg>
  );
}
