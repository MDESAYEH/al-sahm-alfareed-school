import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { PremiumButton } from '@/components/ui/PremiumButton';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-signature/5 via-white to-brand-accent/5 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-signature to-brand-accent">
            404
          </div>
        </div>

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-signature/10 mb-6">
          <Search className="w-10 h-10 text-brand-signature" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <PremiumButton
              icon={<Home className="w-5 h-5" />}
              iconPosition="left"
            >
              العودة للرئيسية
            </PremiumButton>
          </Link>
          
          <Link href="/contact">
            <PremiumButton
              variant="outline"
              icon={<ArrowLeft className="w-5 h-5 rotate-180" />}
              iconPosition="left"
            >
              تواصل معنا
            </PremiumButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
