import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const badges = t.raw("badges") as string[];
  const popularTreatments = t.raw("popularTreatmentsList") as string[];
  const vipList = t.raw("vipList") as string[];
  const legalLinks = t.raw("legalLinks") as string[];

  return (
    <footer className="hidden w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:block">
      <div className="bg-surface-container-low py-space-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-space-lg px-6 lg:flex-row lg:px-12">
          <div className="max-w-xl">
            <span className="text-label-badge font-bold uppercase tracking-wider text-secondary">
              {t("newsletterLabel")}
            </span>
            <h3 className="mt-1 text-headline-sm text-primary">{t("newsletterTitle")}</h3>
            <p className="mt-1 text-body-sm text-on-surface-variant">{t("newsletterDesc")}</p>
          </div>
          <div className="flex w-full gap-space-xs lg:w-auto">
            <input
              className="w-full rounded-lg bg-surface px-space-md py-space-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary lg:w-72"
              placeholder={t("emailPlaceholder")}
              type="email"
            />
            <button
              className="whitespace-nowrap rounded-lg bg-primary px-space-md py-space-sm text-label-md text-on-primary transition-colors hover:bg-primary-container"
              type="button"
            >
              {t("downloadButton")}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-space-xl lg:px-12">
        <div className="grid grid-cols-1 gap-space-xl md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-space-md lg:col-span-2">
            <Logo size="sm" />
            <p className="pe-space-lg text-body-sm text-on-surface-variant">{t("description")}</p>
            <div className="flex flex-wrap gap-2">
              {badges.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-label-badge font-semibold text-on-surface-variant"
                >
                  <Icon name="award_star" className="text-xs text-secondary" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="text-label-lg font-bold text-primary">{t("popularTreatmentsTitle")}</span>
            {popularTreatments.map((label) => (
              <Link
                key={label}
                className="text-body-sm text-on-surface-variant hover:text-secondary"
                href="/treatments"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="text-label-lg font-bold text-primary">{t("vipTitle")}</span>
            {vipList.map((label) => (
              <Link
                key={label}
                className="text-body-sm text-on-surface-variant hover:text-secondary"
                href="/vip-experience"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="text-label-lg font-bold text-primary">{t("contactTitle")}</span>
            <p className="text-body-sm text-on-surface-variant">{site.address}</p>
            <p className="text-body-sm font-medium text-on-surface-variant">{site.email}</p>
            <p className="text-body-sm font-semibold text-primary">{site.phone}</p>
            <div className="flex items-center gap-space-sm text-secondary">
              <Icon name="hotel" />
              <span className="text-body-sm text-on-surface-variant">{t("partnerLine")}</span>
            </div>
          </div>
        </div>

        <div className="mt-space-xl flex flex-col items-center justify-between gap-space-md pt-space-lg text-body-sm text-on-surface-variant md:flex-row">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-space-lg">
            {legalLinks.map((label) => (
              <a key={label} className="hover:text-secondary" href="#">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
