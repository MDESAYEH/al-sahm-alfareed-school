import { getProjects, getProjectBySlug } from "@/services/strapi.service";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "./ProjectDetailsClient";

export async function generateStaticParams() {
    const locales = ["en", "ar"];
    const allParams = [];

    for (const locale of locales) {
        const projects = await getProjects(locale);
        allParams.push(...projects.map((p) => ({
            locale,
            slug: p.slug,
        })));
    }

    return allParams;
}

export default async function ProjectDetailsPage({
    params
}: {
    params: Promise<{ slug: string; locale: string }>
}) {
    const { slug, locale } = await params;
    // Fetch project details by slug
    const project = await getProjectBySlug(slug, locale);

    if (!project) notFound();

    return <ProjectDetailsClient project={project} />;
}
