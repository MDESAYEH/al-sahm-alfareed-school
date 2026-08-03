import dynamic from 'next/dynamic';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import SchoolFooter from "@/components/sections/SchoolFooter";
import { BookDivider } from "@/components/ui/BookDivider";
// تم إزالة استيراد Strapi

const SchoolHero = dynamic(() => import("@/components/sections/SchoolHero"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const TrustSection = dynamic(() => import("@/components/sections/TrustSection"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const AcademicStages = dynamic(() => import("@/components/sections/AcademicStages"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const Facilities = dynamic(() => import("@/components/sections/Facilities"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const AdmissionCTA = dynamic(() => import("@/components/sections/AdmissionCTA"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const Achievements = dynamic(() => import("@/components/sections/Achievements"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const PrincipalMessage = dynamic(() => import("@/components/sections/PrincipalMessage"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const PartnersMarquee = dynamic(() => import("@/components/sections/PartnersMarquee"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  ssr: true,
  loading: () => <SkeletonLoader />,
});

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // لم نعد بحاجة لجلب البيانات من Strapi
  // المكونات ستستخدم البيانات الثابتة أو props افتراضية

  return (
    <>
      <main className="font-alexandria">
        <SchoolHero data={null} />
        
        <BookDivider color="#F8FBFF" />
        
        <WhyChooseUs />
        
        <BookDivider color="#FFFFFF" flip />
        
        <TrustSection />
        
        <BookDivider color="#FFFFFF" />
        
        <AcademicStages />
        
        <BookDivider color="#F8FBFF" flip />
        
        <Facilities />
        
        <BookDivider color="#FFFFFF" />
        
        <Achievements />
        
        <BookDivider color="#F8FBFF" flip />
        
        <PrincipalMessage />
        
        <BookDivider color="#F8FBFF" flip />
        
        <PartnersMarquee />
        
        <AdmissionCTA />
        
        <FAQSection />
        
        <SchoolFooter />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Al-Sahm Al-Fareed Private School',
            alternateName: 'مدرسة السهم الفريد الخاصة',
            url: 'https://school.ly',
            logo: 'https://school.ly/logo.png',
            description: 'Leading private school in Libya providing excellence in education',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Tripoli',
              addressCountry: 'LY',
            },
            telephone: '0945437366',
            email: 'alsahmalfareedinfo@gmail.com',
            areaServed: 'Libya',
            foundingDate: '2003',
            sameAs: [
              'https://facebook.com/alsahmalfareed',
              'https://instagram.com/alsahmalfareed',
              'https://twitter.com/alsahmalfareed',
            ],
          }),
        }}
      />
    </>
  );
}
