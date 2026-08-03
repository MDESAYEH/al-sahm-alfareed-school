'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { PremiumButton } from '@/components/ui/PremiumButton';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-error/10 mb-8"
        >
          <AlertTriangle className="w-12 h-12 text-error" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          عذراً، حدث خطأ
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          نعتذر عن هذا الإزعاج. يرجى المحاولة مرة أخرى.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <PremiumButton
            onClick={reset}
            icon={<RefreshCw className="w-5 h-5" />}
            iconPosition="left"
          >
            حاول مرة أخرى
          </PremiumButton>
          
          <Link href="/">
            <PremiumButton
              variant="outline"
              icon={<Home className="w-5 h-5" />}
              iconPosition="left"
            >
              العودة للرئيسية
            </PremiumButton>
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-neutral-100 rounded-xl text-left"
          >
            <p className="text-sm font-mono text-neutral-700 break-words">
              {error.message}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
