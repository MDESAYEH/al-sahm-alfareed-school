import React from "react";
import ServicesContent from "./ServicesContent";

export default async function ServicesPageWrapper({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // تم تعطيل Strapi - استخدام بيانات فارغة
    const projects: any[] = [];
    const faqs: any[] = [];
    const pageData: any = null;

    return <ServicesContent
        locale={locale}
        allProjects={projects}
        faqs={faqs}
        pageData={pageData}
    />;
}
