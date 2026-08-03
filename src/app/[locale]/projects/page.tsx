import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { getProjects } from "@/services/strapi.service";
import { getTranslations } from "next-intl/server";

export default async function ProjectsPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    // Fetch dynamic projects from Strapi (Server-side)
    const projects = await getProjects(locale);
    const t = await getTranslations({ locale, namespace: "PortfolioGrid" });

    const categories = [
        { id: "all", name: t("filter_all") },
        { id: "web", name: t("filter_web") },
        { id: "cyber", name: t("filter_cyber") },
        { id: "cloud", name: t("filter_cloud") },
    ];

    return (
        <main className="min-h-screen">
            <PortfolioGrid
                initialProjects={projects}
                categories={categories}
            />
        </main>
    );
}
