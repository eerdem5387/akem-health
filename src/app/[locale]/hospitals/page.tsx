import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { accreditationPartners } from "@/lib/home";
import { hospitalsMeta } from "@/lib/hospitals";
import { site } from "@/lib/site";

type Partner = { id: string; label: string };

export default async function HospitalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hospitals");
  const tHome = await getTranslations("home");
  const accreditationLabels = tHome.raw("accreditationSection.partners") as Partner[];

  return (
    <div className="flex w-full flex-col">
      <section className="relative w-full overflow-hidden bg-primary-container py-space-xl text-on-primary">
        <div className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-space-sm inline-flex items-center gap-2 rounded-full bg-surface-container-high/20 px-3 py-1 text-secondary-fixed backdrop-blur-md">
              <Icon name="local_hospital" className="text-sm" />
              <span className="text-label-badge tracking-wider uppercase">{t("badge")}</span>
            </div>
            <h1 className="text-display-lg-mobile font-bold tracking-tight text-on-primary lg:text-display-lg">
              {t("title")}
            </h1>
            <p className="mt-space-sm max-w-2xl text-body-lg text-on-primary-container">{t("desc")}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-lowest py-space-lg shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-space-lg px-6 lg:px-12">
          <p className="text-headline-sm font-bold text-primary">{t("accreditationTitle")}</p>
          <div className="flex flex-wrap items-center gap-4">
            {accreditationPartners.map((partner) => {
              const label = accreditationLabels.find((p) => p.id === partner.id)?.label ?? partner.id;
              return (
                <div
                  key={partner.id}
                  className="flex h-14 w-28 items-center justify-center rounded-lg bg-surface-container-low p-2"
                >
                  <Image
                    alt={label}
                    className="h-full max-h-10 w-full rounded object-contain"
                    height={40}
                    width={112}
                    src={partner.image}
                    unoptimized
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto mb-space-lg max-w-2xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("listEyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("listTitle")}
            </h2>
            <p className="mt-2 text-body-sm text-on-surface-variant">{t("listDesc")}</p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {hospitalsMeta.map((meta) => {
              const h = t.raw(`items.${meta.id}`) as {
                name: string;
                city: string;
                desc: string;
                specialties: string[];
                badges: string[];
              };
              return (
                <StaggerItem key={meta.id}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md">
                    <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary via-primary-container to-secondary/40">
                      <Icon name={meta.icon} className="text-5xl text-on-primary/90" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {h.badges.map((b) => (
                            <span
                              key={b}
                              className="rounded-full bg-surface-container px-2.5 py-1 text-label-badge font-semibold text-on-surface-variant"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-headline-sm font-bold text-primary">{h.name}</h3>
                        <p className="mb-2 text-body-sm font-medium text-secondary">{h.city}</p>
                        <p className="text-body-sm text-on-surface-variant">{h.desc}</p>
                      </div>
                      <div className="mt-4 border-t border-outline-variant/20 pt-3">
                        <span className="text-label-badge font-semibold tracking-wider text-on-surface-variant uppercase">
                          {t("specialtiesLabel")}
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {h.specialties.map((s) => (
                            <span key={s} className="rounded bg-surface-container-low px-2 py-0.5 text-label-badge text-on-surface">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-container to-primary py-space-xl text-on-primary lg:py-20">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-space-lg px-6 text-center lg:flex-row lg:px-12 lg:text-start">
          <div className="max-w-2xl">
            <h2 className="text-headline-lg-mobile font-bold text-on-primary lg:text-headline-lg">
              {t("ctaTitle")}
            </h2>
            <p className="mt-2 text-body-md text-surface-dim">{t("ctaDesc")}</p>
          </div>
          <div className="flex w-full flex-col items-center gap-space-md sm:flex-row lg:w-auto">
            <Link
              className="w-full rounded-lg bg-secondary px-8 py-4 text-center text-label-lg font-bold text-on-secondary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-on-secondary-container sm:w-auto"
              href="/contact"
            >
              {t("ctaPrimary")}
            </Link>
            <a
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container/20 px-6 py-4 text-label-lg font-semibold text-on-primary transition-all hover:bg-surface-container/30 sm:w-auto"
              href={site.whatsapp}
              rel="noreferrer"
              target="_blank"
            >
              <Icon name="chat" className="text-secondary-container" />
              <span>{t("ctaSecondary")}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
