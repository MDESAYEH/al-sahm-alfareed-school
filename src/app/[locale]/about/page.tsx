import React from "react";
import AboutContent from "./AboutContent";
import { getHome, getAbout } from "@/services/strapi.service";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const [home, aboutData] = await Promise.all([
        getHome(locale),
        getAbout(locale)
    ]);

    // Default values in case Strapi doesn't return data
    const metrics = home?.aboutMetrics || {
        projects: "150+",
        experts: "45+",
        years: "12+",
        solutions: "300+"
    };

    return <AboutContent locale={locale} metrics={metrics} aboutData={aboutData} />;
}
