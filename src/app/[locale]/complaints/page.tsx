import { getTranslations } from "next-intl/server";
import ComplaintsContent from "@/components/sections/ComplaintsContent";
import { getComplaintPageData } from "@/data/static-data";

export default async function ComplaintsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const isRTL = locale === 'ar';
  
  // استخدام البيانات الثابتة بدلاً من Strapi
  const complaintData = getComplaintPageData(locale);

  return (
    <ComplaintsContent
      complaintData={null}
      badge={complaintData.badge}
      title_part1={complaintData.titlePart1}
      title_highlight={complaintData.titleHighlight}
      subtitle={complaintData.subtitle}
      info_title={complaintData.info.title}
      info_desc={complaintData.info.description}
      email_label={complaintData.info.emailLabel}
      phone_label={complaintData.info.phoneLabel}
      location_label={complaintData.info.locationLabel}
      hours_label={complaintData.info.workingHoursLabel}
      form_title={complaintData.form.title}
      steps_title={complaintData.form.stepsTitle}
      submit_btn={complaintData.form.submitBtn}
      success_message={complaintData.form.successMessage}
      error_message={complaintData.form.errorMessage}
    />
  );
}
