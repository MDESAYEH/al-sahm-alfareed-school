'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/cn';
import { type ReactNode } from 'react';

type MotionButtonProps = HTMLMotionProps<'button'>;

interface PremiumButtonProps extends MotionButtonProps {
  variant?: 'primary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className,
  ...props
}: PremiumButtonProps) {
  const variants = {
    primary: 'bg-brand-signature hover:bg-brand-signature/90 text-white shadow-brand',
    accent: 'bg-brand-accent hover:bg-brand-accent/90 text-white shadow-accent',
    outline: 'border-2 border-brand-signature text-brand-signature hover:bg-brand-signature hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full font-bold',
        'transition-all duration-300 overflow-hidden btn-ripple',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-signature focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </motion.button>
  );
}
