import { setRequestLocale } from "next-intl/server";
import { TreatmentsClient } from "@/components/treatments/TreatmentsClient";

export default async function TreatmentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TreatmentsClient />;
}
