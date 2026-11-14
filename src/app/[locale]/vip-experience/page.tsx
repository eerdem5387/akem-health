import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { vipHotelsMeta, vipImages } from "@/lib/vip";
import { site } from "@/lib/site";

type Step = { icon: string; title: string; desc: string; footer: string; footerIcon: string };
type Feature = { icon: string; title: string; desc: string };

export default async function VipExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("vipPage");

  const metrics = t.raw("metrics") as { value: string; label: string }[];
  const steps = t.raw("steps") as Step[];
  const transferFeatures = t.raw("transferFeatures") as Feature[];
  const languages = t.raw("languages") as string[];
  const languageFeatures = t.raw("languageFeatures") as Feature[];
  const wellnessFeatures = t.raw("wellnessFeatures") as Feature[];
  const portalRows = t.raw("portalRows") as string[];

  return (
    <div className="flex w-full flex-col">
      <section className="relative w-full overflow-hidden bg-primary text-on-primary">
        <div className="pointer-events-none absolute -top-32 -end-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -start-24 h-80 w-80 rounded-full bg-secondary-container/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary-container px-3.5 py-1.5 text-label-badge tracking-wider text-secondary-fixed uppercase shadow-sm">
                <Icon name="stars" className="text-sm" filled />
                <span>{t("badge")}</span>
              </div>
              <h1 className="text-display-lg-mobile tracking-tight text-on-primary lg:text-display-lg">
                {t("title")} <span className="text-secondary-fixed">{t("titleHighlight")}</span>
                {t("titleEnd")}
              </h1>
              <p className="max-w-2xl text-body-lg text-primary-fixed-dim">{t("desc")}</p>
              <div className="grid max-w-xl grid-cols-3 gap-4 pt-4">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-primary-container/80 p-4 backdrop-blur-sm">
                    <span className="block text-headline-md text-secondary-fixed">{m.value}</span>
                    <span className="mt-0.5 block text-label-md text-on-primary-container">{m.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-3.5 text-label-lg text-on-secondary shadow-md transition-all hover:bg-on-secondary-container"
                  href="/contact"
                >
                  <span>{t("primaryCta")}</span>
                  <Icon name="arrow_forward" className="rtl-flip text-sm" />
                </Link>
                <a
                  className="flex items-center gap-2 rounded-lg bg-surface/10 px-6 py-3.5 text-label-lg text-on-primary transition-all hover:bg-surface/20"
                  href="#transfer-section"
                >
                  <Icon name="play_circle" className="text-sm" />
                  <span>{t("secondaryCta")}</span>
                </a>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="relative w-full overflow-hidden rounded-2xl bg-primary-container shadow-2xl">
                <Image
                  alt="VIP transfer experience"
                  className="h-[460px] w-full object-cover"
                  height={460}
                  src={vipImages.hero}
                  unoptimized
                  width={560}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <div className="absolute end-6 bottom-6 start-6 flex items-center justify-between rounded-xl bg-surface/90 p-4 text-on-surface shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container font-bold text-on-secondary-container">
                      <Icon name="hotel_class" className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-headline-sm text-primary">{t("overlayTitle")}</h4>
                      <p className="text-body-sm text-on-surface-variant">{t("overlayDesc")}</p>
                    </div>
                  </div>
                  <Icon name="verified" className="text-2xl text-secondary" />
                </div>
              </div>
              <div className="absolute -top-6 -start-6 hidden items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 text-on-surface shadow-xl sm:flex">
                <Icon name="flight_land" className="text-2xl text-secondary" />
                <div className="flex flex-col">
                  <span className="text-label-badge text-on-surface-variant uppercase">{t("arrivalLabel")}</span>
                  <span className="text-label-lg font-bold text-primary">{t("arrivalValue")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                {t("stepsEyebrow")}
              </span>
              <h2 className="mt-1 text-headline-lg text-primary">{t("stepsTitle")}</h2>
            </div>
            <p className="max-w-md text-body-md text-on-surface-variant">{t("stepsDesc")}</p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="flex h-full flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container text-headline-sm font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon name={s.icon} className="text-2xl text-secondary" />
                    </div>
                    <h3 className="mb-2 text-headline-sm text-primary">{s.title}</h3>
                    <p className="text-body-sm text-on-surface-variant">{s.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-label-md text-on-surface-variant">
                    <Icon name={s.footerIcon} className="text-sm text-secondary" />
                    <span>{s.footer}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="w-full bg-surface py-16 lg:py-24" id="transfer-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <Reveal className="flex flex-col gap-4 lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl bg-surface-container shadow-xl">
                <Image
                  alt="VIP airport welcome"
                  className="h-80 w-full object-cover"
                  height={320}
                  src={vipImages.transferMain}
                  unoptimized
                  width={560}
                />
                <div className="absolute bottom-4 start-4 flex items-center gap-1.5 rounded-lg bg-primary/90 px-3 py-1.5 text-label-md text-on-primary backdrop-blur">
                  <Icon name="badge" className="text-sm text-secondary-fixed" />
                  <span>{t("transferBadge")}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {vipImages.transferSide.map((src) => (
                  <div key={src} className="overflow-hidden rounded-xl bg-surface-container shadow-sm">
                    <Image alt="VIP vehicle detail" className="h-40 w-full object-cover" height={160} src={src} unoptimized width={280} />
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="flex flex-col gap-6 lg:col-span-6">
              <Reveal>
                <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                  {t("transferEyebrow")}
                </span>
                <h2 className="mt-1 text-headline-lg text-primary">{t("transferTitle")}</h2>
              </Reveal>
              <Reveal>
                <p className="text-body-md text-on-surface-variant">{t("transferDesc")}</p>
              </Reveal>
              <StaggerGroup className="space-y-4">
                {transferFeatures.map((f) => (
                  <StaggerItem key={f.title}>
                    <div className="flex items-start gap-4 rounded-xl bg-surface-container-low p-4">
                      <Icon name={f.icon} className="mt-0.5 text-2xl text-secondary" />
                      <div>
                        <h4 className="text-headline-sm text-primary">{f.title}</h4>
                        <p className="text-body-sm text-on-surface-variant">{f.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                {t("hotelsEyebrow")}
              </span>
              <h2 className="mt-1 text-headline-lg text-primary">{t("hotelsTitle")}</h2>
            </div>
            <p className="max-w-md text-body-md text-on-surface-variant">{t("hotelsDesc")}</p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {vipHotelsMeta.map((meta) => {
              const h = t.raw(`hotels.${meta.id}`) as { name: string; badge: string; desc: string; features: string[] };
              return (
                <StaggerItem key={meta.id}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md">
                    <div className="relative h-60 w-full">
                      <Image alt={h.name} className="object-cover" fill sizes="33vw" src={meta.image} unoptimized />
                      <span
                        className={`absolute top-3 end-3 rounded-full px-3 py-1 text-label-badge uppercase ${
                          meta.badgeTone === "secondary"
                            ? "bg-secondary text-on-secondary"
                            : "bg-primary/80 text-on-primary backdrop-blur"
                        }`}
                      >
                        {h.badge}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="mb-2 flex items-center gap-1 text-on-tertiary-container">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icon key={i} name="star" className="text-sm" filled />
                          ))}
                          <span className="ms-1 text-label-md font-semibold text-on-surface-variant">
                            {t("ratingLabel")}
                          </span>
                        </div>
                        <h3 className="mb-2 text-headline-sm text-primary">{h.name}</h3>
                        <p className="text-body-sm text-on-surface-variant">{h.desc}</p>
                      </div>
                      <ul className="mt-6 space-y-2 pt-4 text-body-sm text-on-surface">
                        {h.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <Icon name="check_circle" className="text-base text-secondary" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <Reveal>
                <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                  {t("languageEyebrow")}
                </span>
                <h2 className="mt-1 text-headline-lg text-primary">{t("languageTitle")}</h2>
              </Reveal>
              <Reveal>
                <p className="text-body-md text-on-surface-variant">{t("languageDesc")}</p>
              </Reveal>
              <Reveal className="flex flex-wrap gap-2.5">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="flex items-center gap-1.5 rounded-full bg-surface-container px-3.5 py-1.5 text-label-md font-semibold text-primary"
                  >
                    <span className="h-2 w-2 rounded-full bg-secondary" /> {lang}
                  </span>
                ))}
              </Reveal>
              <StaggerGroup className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                {languageFeatures.map((f) => (
                  <StaggerItem key={f.title}>
                    <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-4">
                      <Icon name={f.icon} className="text-secondary" />
                      <h4 className="text-headline-sm text-primary">{f.title}</h4>
                      <p className="text-body-sm text-on-surface-variant">{f.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
            <Reveal className="flex flex-col gap-6 rounded-3xl bg-surface-container-lowest p-8 shadow-xl lg:col-span-6" delay={0.1}>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container font-bold text-on-secondary-container">
                    <Icon name="badge" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-primary">{t("coordinatorCardTitle")}</h3>
                    <span className="text-label-md font-semibold text-secondary">{t("coordinatorCertified")}</span>
                  </div>
                </div>
                <span className="rounded bg-secondary-container px-2.5 py-1 text-label-badge font-bold text-on-secondary-container">
                  {t("coordinatorStatus")}
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4">
                <Image
                  alt={t("coordinatorCardTitle")}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-secondary"
                  height={64}
                  src={vipImages.coordinator}
                  unoptimized
                  width={64}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-headline-sm text-primary">{site.name} Care</h4>
                    <span className="text-label-badge text-on-surface-variant">{t("coordinatorLocation")}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-label-md text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <Icon name="call" className="text-xs text-secondary" /> {t("coordinatorPhoneLine")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="chat" className="text-xs text-secondary" /> {t("coordinatorWhatsappLine")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-surface-container-high/60 p-4">
                <Icon name="format_quote" className="text-2xl text-secondary" />
                <p className="text-body-sm text-on-surface italic">
                  &ldquo;{t("testimonialQuote")}&rdquo;
                  <span className="mt-1 block text-label-md font-bold text-primary not-italic">
                    {t("testimonialAuthor")}
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <Reveal className="relative lg:col-span-6">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  alt="Bosphorus boat tour"
                  className="h-[400px] w-full object-cover"
                  height={400}
                  src={vipImages.bosphorus}
                  unoptimized
                  width={640}
                />
              </div>
              <div className="absolute -end-6 -bottom-6 hidden w-56 overflow-hidden rounded-2xl bg-surface-container-lowest p-3 shadow-xl sm:block">
                <Image
                  alt="Wellness"
                  className="h-28 w-full rounded-xl object-cover"
                  height={112}
                  src={vipImages.spa}
                  unoptimized
                  width={224}
                />
              </div>
            </Reveal>
            <div className="flex flex-col gap-6 lg:col-span-6">
              <Reveal>
                <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                  {t("wellnessEyebrow")}
                </span>
                <h2 className="mt-1 text-headline-lg text-primary">{t("wellnessTitle")}</h2>
              </Reveal>
              <Reveal>
                <p className="text-body-md text-on-surface-variant">{t("wellnessDesc")}</p>
              </Reveal>
              <StaggerGroup className="space-y-4">
                {wellnessFeatures.map((f) => (
                  <StaggerItem key={f.title}>
                    <div className="flex items-start gap-4 rounded-xl bg-surface-container-lowest p-4">
                      <Icon name={f.icon} className="mt-0.5 text-2xl text-secondary" />
                      <div>
                        <h4 className="text-headline-sm text-primary">{f.title}</h4>
                        <p className="text-body-sm text-on-surface-variant">{f.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-primary py-16 text-on-primary lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <Reveal className="inline-flex items-center gap-2 self-start rounded-full bg-primary-container px-3.5 py-1 text-label-badge tracking-wider text-secondary-fixed uppercase">
                <Icon name="hub" className="text-sm" />
                <span>{t("followUpEyebrow")}</span>
              </Reveal>
              <Reveal>
                <h2 className="text-headline-lg text-on-primary">{t("followUpTitle")}</h2>
              </Reveal>
              <Reveal>
                <p className="text-body-md text-primary-fixed-dim">{t("followUpDesc")}</p>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl bg-primary-container/60 p-4">
                  <Icon name="calendar_month" className="mb-1 text-2xl text-secondary-fixed" />
                  <h4 className="text-headline-sm text-on-primary">{t("followUpCard1Title")}</h4>
                  <p className="mt-1 text-body-sm text-on-primary-container">{t("followUpCard1Desc")}</p>
                </div>
                <div className="rounded-xl bg-primary-container/60 p-4">
                  <Icon name="photo_library" className="mb-1 text-2xl text-secondary-fixed" />
                  <h4 className="text-headline-sm text-on-primary">{t("followUpCard2Title")}</h4>
                  <p className="mt-1 text-body-sm text-on-primary-container">{t("followUpCard2Desc")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Icon name="verified" className="text-2xl text-secondary-fixed" />
                <span className="text-body-sm text-primary-fixed">{t("complianceLine")}</span>
              </div>
            </div>
            <Reveal className="relative overflow-hidden rounded-3xl bg-primary-container p-8 shadow-2xl lg:col-span-6" delay={0.1}>
              <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-secondary-container" />
                  <span className="text-headline-sm font-bold text-on-primary">{t("portalTitle")}</span>
                </div>
                <span className="text-label-badge text-secondary-fixed">{t("portalActive")}</span>
              </div>
              <div className="space-y-3">
                {portalRows.map((row) => (
                  <div key={row} className="flex items-center justify-between rounded-xl bg-primary/40 px-4 py-3">
                    <span className="text-label-md text-on-primary">{row}</span>
                    <Icon name="check_circle" className="text-secondary-fixed" />
                  </div>
                ))}
              </div>
              <Link
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-label-lg font-bold text-on-secondary"
                href="/contact"
              >
                {t("portalCta")}
                <Icon name="arrow_forward" className="rtl-flip text-sm" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
