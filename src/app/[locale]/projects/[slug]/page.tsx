import { notFound } from "next/navigation";
import ProjectDetailsClient from "./ProjectDetailsClient";

export async function generateStaticParams() {
    // تم تعطيل Strapi - إرجاع مصفوفة فارغة
    return [];
}

export default async function ProjectDetailsPage({
    params
}: {
    params: Promise<{ slug: string; locale: string }>
}) {
    const { slug, locale } = await params;
    // تم تعطيل Strapi - إرجاع 404 دائماً
    notFound();
}
