"use client";

import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="border-4 border-brand-signature/30 border-t-brand-signature rounded-full"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size={60} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-neutral-600 font-semibold"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
