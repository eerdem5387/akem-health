import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

type Stat = { value: string; label: string };
type ValueItem = { icon: string; title: string; desc: string };

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const stats = t.raw("stats") as Stat[];
  const values = t.raw("values") as ValueItem[];
  const why = t.raw("why") as ValueItem[];
  const storyParagraphs = t.raw("storyParagraphs") as string[];

  return (
    <div className="flex w-full flex-col">
      <section className="relative w-full overflow-hidden bg-primary-container py-space-xl text-on-primary">
        <div className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-space-sm inline-flex items-center gap-2 rounded-full bg-surface-container-high/20 px-3 py-1 text-secondary-fixed backdrop-blur-md">
              <Icon name="favorite" className="text-sm" />
              <span className="text-label-badge tracking-wider uppercase">{t("badge")}</span>
            </div>
            <h1 className="text-display-lg-mobile font-bold tracking-tight text-on-primary lg:text-display-lg">
              {t("title")}
            </h1>
            <p className="mt-space-sm max-w-2xl text-body-lg text-on-primary-container">{t("desc")}</p>
          </div>
          <StaggerGroup className="mt-space-xl grid grid-cols-2 gap-space-sm sm:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="rounded-xl bg-surface/10 p-4 backdrop-blur-md">
                  <span className="block text-headline-md font-bold text-secondary-fixed">{s.value}</span>
                  <span className="mt-0.5 block text-label-md text-on-primary-container">{s.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-surface py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto mb-space-xl max-w-2xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("valuesEyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("valuesTitle")}
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="flex h-full flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon name={v.icon} className="text-2xl" />
                  </div>
                  <h3 className="text-headline-sm font-bold text-primary">{v.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-surface-container-low py-space-xl lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <Reveal className="mb-space-lg">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("storyEyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("storyTitle")}
            </h2>
          </Reveal>
          <div className="flex flex-col gap-space-md">
            {storyParagraphs.map((p, i) => (
              <Reveal delay={i * 0.08} key={p}>
                <p className="text-body-md text-on-surface-variant">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto mb-space-xl max-w-2xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("whyEyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("whyTitle")}
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
            {why.map((w) => (
              <StaggerItem key={w.title}>
                <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-lowest p-5 shadow-sm">
                  <Icon name={w.icon} className="mt-0.5 text-2xl text-secondary" />
                  <div>
                    <h4 className="text-headline-sm font-bold text-primary">{w.title}</h4>
                    <p className="text-body-sm text-on-surface-variant">{w.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
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
