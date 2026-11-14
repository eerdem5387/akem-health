import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const metrics = t.raw("metrics") as { value: string; label: string }[];

  return (
    <div className="flex w-full flex-col">
      <section className="relative w-full overflow-hidden bg-primary-container py-space-xl text-on-primary">
        <div className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-space-sm inline-flex items-center gap-2 rounded-full bg-surface-container-high/20 px-3 py-1 text-secondary-fixed backdrop-blur-md">
              <Icon name="support_agent" className="text-sm" />
              <span className="text-label-badge tracking-wider uppercase">{t("badge")}</span>
            </div>
            <h1 className="text-display-lg-mobile font-bold tracking-tight text-on-primary lg:text-display-lg">
              {t("title")}
            </h1>
            <p className="mt-space-sm max-w-2xl text-body-lg text-on-primary-container">{t("desc")}</p>
          </div>
          <StaggerGroup className="mt-space-xl grid grid-cols-3 gap-space-sm sm:max-w-xl">
            {metrics.map((m) => (
              <StaggerItem key={m.label}>
                <div className="rounded-xl bg-surface/10 p-4 text-center backdrop-blur-md">
                  <span className="block text-headline-md font-bold text-secondary-fixed">{m.value}</span>
                  <span className="mt-0.5 block text-label-md text-on-primary-container">{m.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-surface py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>
            <Reveal className="flex flex-col gap-space-md lg:col-span-5" delay={0.1}>
              <div className="rounded-2xl bg-surface-container-low p-6">
                <h3 className="text-headline-sm font-bold text-primary">{t("infoTitle")}</h3>
                <p className="mt-1 mb-space-md text-body-sm text-on-surface-variant">{t("infoDesc")}</p>
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <Icon className="text-secondary" name="call" />
                    <div>
                      <p className="text-label-badge text-on-surface-variant uppercase">{t("phonePanelLabel")}</p>
                      <a className="text-label-lg font-semibold text-primary" href={site.phoneHref}>
                        {site.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <Icon className="text-secondary" name="chat" />
                    <div>
                      <p className="text-label-badge text-on-surface-variant uppercase">{t("whatsappPanelLabel")}</p>
                      <a
                        className="text-label-lg font-semibold text-primary"
                        href={site.whatsapp}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {t("whatsappCta")}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <Icon className="text-secondary" name="mail" />
                    <div>
                      <p className="text-label-badge text-on-surface-variant uppercase">{t("emailPanelLabel")}</p>
                      <a className="text-label-lg font-semibold text-primary" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm">
                    <Icon className="mt-0.5 text-secondary" name="location_on" />
                    <div>
                      <p className="text-label-badge text-on-surface-variant uppercase">{t("addressPanelLabel")}</p>
                      <p className="text-body-sm text-on-surface">{site.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <Icon className="text-secondary" name="schedule" />
                    <div>
                      <p className="text-label-badge text-on-surface-variant uppercase">{t("hoursLabel")}</p>
                      <p className="text-body-sm text-on-surface">{t("hoursValue")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="flex items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-label-lg font-bold text-on-secondary shadow-md transition-all hover:-translate-y-0.5 hover:bg-on-secondary-container"
                href={site.whatsapp}
                rel="noreferrer"
                target="_blank"
              >
                <Icon name="forum" />
                <span>{t("whatsappCta")}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
