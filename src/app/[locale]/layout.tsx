import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Alexandria } from 'next/font/google';
import { notFound } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PageTransition } from '@/components/ui/PageTransition';
import { getGlobalSettings } from '@/services/strapi.service';
import '@/styles/globals.css';

const alexandria = Alexandria({
    subsets: ['arabic', 'latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-alexandria',
    display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const settings = await getGlobalSettings(locale);

    const defaultTitle = locale === 'en' 
        ? 'Al-Sahm Al-Fareed Private School | Excellence in Education' 
        : 'مدرسة السهم الفريد الخاصة | التميز في التعليم';
    const defaultDesc = locale === 'en' 
        ? 'Building bright futures through innovative education and nurturing environment.' 
        : 'بناء مستقبل مشرق من خلال التعليم المبتكر والبيئة المحفزة.';

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
        title: {
            default: settings?.siteName || defaultTitle,
            template: `%s | ${settings?.siteName || defaultTitle}`,
        },
        description: settings?.siteDescription || defaultDesc,
        keywords: settings?.siteKeywords || "private school, education, Libya, Tripoli, مدرسة خاصة, تعليم, ليبيا",
        authors: [{ name: settings?.siteName || 'Al-Sahm Al-Fareed' }],
        creator: settings?.siteName || 'Al-Sahm Al-Fareed',
        publisher: settings?.siteName || 'Al-Sahm Al-Fareed',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            type: 'website',
            locale: locale === 'ar' ? 'ar_LY' : 'en_US',
            url: '/',
            siteName: settings?.siteName || defaultTitle,
            title: settings?.siteName || defaultTitle,
            description: settings?.siteDescription || defaultDesc,
            images: [
                {
                    url: '/logo.png',
                    width: 1200,
                    height: 630,
                    alt: settings?.siteName || defaultTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: settings?.siteName || defaultTitle,
            description: settings?.siteDescription || defaultDesc,
            images: ['/logo.png'],
        },
        alternates: {
            canonical: '/',
            languages: {
                'ar': '/ar',
                'en': '/en',
            },
        },
        icons: {
            icon: [
                { url: '/favicon.ico' },
                { url: '/logo.png', sizes: '32x32', type: 'image/png' },
            ],
            apple: [
                { url: '/logo.png' },
            ],
        },
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const locales = ['en', 'ar'];
    if (!locales.includes(locale as any)) notFound();

    const messages = await getMessages();
    const settings = await getGlobalSettings(locale);

    const isRtl = locale === 'ar';

    const skipLabel = isRtl ? 'تخطى إلى المحتوى الرئيسي' : 'Skip to main content';
    const skipNavLabel = isRtl ? 'تخطى إلى شريط التنقل' : 'Skip to navigation';
    const skipFooterLabel = isRtl ? 'تخطى إلى التذييل' : 'Skip to footer';

    return (
        <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
            <body className={`${alexandria.variable} font-sans antialiased`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
                        <a href="#main-content" className="skip-link" aria-label={skipLabel}>
                            {skipLabel}
                        </a>
                        <a href="#site-navigation" className="skip-link skip-link-secondary" aria-label={skipNavLabel}>
                            {skipNavLabel}
                        </a>
                        <a href="#site-footer" className="skip-link skip-link-secondary" aria-label={skipFooterLabel}>
                            {skipFooterLabel}
                        </a>

                        <ScrollProgress />
                        <div className="relative min-h-screen flex flex-col">
                            <div id="site-navigation">
                                <Navbar settings={settings} />
                            </div>
                            <main id="main-content" className="flex-grow" role="main" tabIndex={-1}>
                                <PageTransition>
                                    {children}
                                </PageTransition>
                            </main>
                        </div>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
