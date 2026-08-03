import { getTranslations } from "next-intl/server";
import ContactContent from "@/components/sections/ContactContent";
import { getContact } from "@/services/strapi.service";

export default async function ContactPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const [t, contactData] = await Promise.all([
        getTranslations({ locale, namespace: "ContactPage" }),
        getContact(locale)
    ]);

    return (
        <ContactContent
            contactData={contactData}
            badge={contactData?.badge || t("badge")}
            title_part1={contactData?.titlePart1 || t("title_part1")}
            title_highlight={contactData?.titleHighlight || t("title_highlight")}
            subtitle={contactData?.subtitle || t("subtitle")}
            info_title={contactData?.info?.title || t("info_title")}
            info_desc={contactData?.info?.description || t("info_desc")}
            email_label={contactData?.info?.emailLabel || t("email_label")}
            phone_label={contactData?.info?.phoneLabel || t("phone_label")}
            location_label={contactData?.info?.locationLabel || t("location_label")}
            form_title={contactData?.form?.title || t("form_title")}
            name_label={contactData?.form?.nameLabel || t("name_label")}
            placeholder_name={contactData?.form?.placeholderName || t("placeholder_name")}
            placeholder_email={contactData?.form?.placeholderEmail || t("placeholder_email")}
            subject_label={contactData?.form?.subjectLabel || t("subject_label")}
            placeholder_subject={contactData?.form?.placeholderSubject || t("placeholder_subject")}
            message_label={contactData?.form?.messageLabel || t("message_label")}
            placeholder_message={contactData?.form?.placeholderMessage || t("placeholder_message")}
            send_btn={contactData?.form?.sendBtn || t("send_btn")}
        />
    );
}
