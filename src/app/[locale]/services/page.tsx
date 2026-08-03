import React from "react";
import { getProjects, getFAQs, getServicesPage } from "@/services/strapi.service";
import ServicesContent from "./ServicesContent";

export default async function ServicesPageWrapper({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Fetch data server-side for ISR
    const [projects, faqs, pageData] = await Promise.all([
        getProjects(locale),
        getFAQs(locale),
        getServicesPage(locale)
    ]);

    return <ServicesContent
        locale={locale}
        allProjects={projects || []}
        faqs={faqs || []}
        pageData={pageData}
    />;
}
