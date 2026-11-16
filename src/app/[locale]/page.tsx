import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { HeroVideoBanner } from "@/components/home/HeroVideoBanner";
import { RemoteConsultationForm } from "@/components/home/RemoteConsultationForm";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Icon } from "@/components/ui/Icon";
import { accreditationPartners, homeDoctorsMeta, homePatientsMeta, homeTreatmentsMeta, hospitalImage } from "@/lib/home";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

type Step = { icon: string; title: string; desc: string; footer: string; footerIcon: string };
type Branch = { icon: string; label: string };
type Partner = { id: string; label: string };
type CostRow = { name: string; uk: string; price: string };
type FaqItem = { question: string; answer: string };
type ServiceItem = { icon: string; title: string; desc: string };

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const steps = t.raw("steps") as Step[];
  const serviceStages = t.raw("serviceBranchSection.stages") as string[];
  const serviceBranches = t.raw("serviceBranchSection.branches") as Branch[];
  const costRows = t.raw("costRows") as CostRow[];
  const faqs = t.raw("faqs") as FaqItem[];
  const accreditationLabels = t.raw("accreditationSection.partners") as Partner[];
  const remoteConsultChecklist = t.raw("remoteConsultSection.checklist") as string[];
  const serviceItems = t.raw("servicesSection.items") as ServiceItem[];

  return (
    <div className="flex w-full flex-col">
      <HeroVideoBanner />

      {/* Mobile stats */}
      <section className="px-gutter-mobile py-3 lg:hidden">
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface-container-low p-3">
          <div className="text-center">
            <p className="text-headline-sm font-bold text-primary">{t("mobileHero.statPatients")}</p>
            <p className="text-label-md text-on-surface-variant">{t("mobileHero.statPatientsLabel")}</p>
          </div>
          <div className="rounded-lg bg-surface-container-lowest py-1 text-center shadow-sm">
            <p className="text-headline-sm font-bold text-secondary">{t("mobileHero.statSuccess")}</p>
            <p className="text-label-md text-on-surface-variant">{t("mobileHero.statSuccessLabel")}</p>
          </div>
          <div className="text-center">
            <p className="text-headline-sm font-bold text-primary">{t("mobileHero.statCountries")}</p>
            <p className="text-label-md text-on-surface-variant">{t("mobileHero.statCountriesLabel")}</p>
          </div>
        </div>
      </section>

      {/* Service branches */}
      <section className="w-full bg-surface-container-lowest py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("serviceBranchSection.eyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("serviceBranchSection.title")}
            </h2>
            <p className="mt-3 text-body-md text-on-surface-variant">{t("serviceBranchSection.desc")}</p>
          </Reveal>

          <Reveal className="mt-space-md flex flex-wrap items-center justify-center gap-2" delay={0.05}>
            {serviceStages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <span className="rounded-full bg-surface-container px-3 py-1 text-label-md font-semibold text-primary">
                  {stage}
                </span>
                {i < serviceStages.length - 1 && (
                  <Icon name="arrow_forward" className="rtl-flip text-base text-outline" />
                )}
              </div>
            ))}
          </Reveal>

          <StaggerGroup className="mt-space-lg grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {serviceBranches.map((branch) => (
              <StaggerItem key={branch.label}>
                <div className="flex h-full flex-col items-center gap-2.5 rounded-xl bg-surface-container-lowest p-4 text-center shadow-sm ring-1 ring-outline-variant/40 transition-transform hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <Icon name={branch.icon} className="text-2xl" />
                  </span>
                  <span className="text-label-md leading-snug font-semibold text-on-surface">{branch.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Accreditation reference banner */}
      <section className="w-full bg-surface py-space-lg lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("accreditationSection.eyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("accreditationSection.title")}
            </h2>
            <p className="mt-3 text-body-md text-on-surface-variant">{t("accreditationSection.desc")}</p>
          </Reveal>

          <Reveal className="mt-space-lg grid grid-cols-2 gap-4 sm:grid-cols-4" delay={0.05}>
            {accreditationPartners.map((partner) => {
              const label = accreditationLabels.find((p) => p.id === partner.id)?.label ?? partner.id;
              return (
                <div
                  key={partner.id}
                  className="flex h-40 items-center justify-center rounded-xl bg-surface-container-low p-5"
                >
                  <Image
                    alt={label}
                    className="h-full max-h-32 w-full rounded-lg object-contain"
                    height={128}
                    width={240}
                    src={partner.image}
                    unoptimized
                  />
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Remote consultation */}
      <section className="bg-surface-container-low py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                {t("remoteConsultSection.eyebrow")}
              </span>
              <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
                {t("remoteConsultSection.title")}
              </h2>
              <p className="mt-3 text-body-md text-on-surface-variant">{t("remoteConsultSection.desc")}</p>
              <ul className="mt-6 flex flex-col gap-space-sm">
                {remoteConsultChecklist.map((item) => (
                  <li key={item} className="flex items-center gap-space-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                      <Icon name="check" className="text-base" />
                    </span>
                    <span className="text-body-md font-medium text-on-surface">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <RemoteConsultationForm branchOptions={serviceBranches.map((b) => b.label)} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service guarantees */}
      <section className="bg-surface py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto mb-space-xl max-w-2xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("servicesSection.eyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("servicesSection.title")}
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col gap-space-sm rounded-xl bg-surface-container-low p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon name={item.icon} className="text-2xl" />
                  </div>
                  <h3 className="text-headline-sm font-bold text-primary">{item.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Treatments */}
      <section className="bg-surface py-5 lg:py-24">
        <div className="mx-auto max-w-7xl px-gutter-mobile lg:px-12">
          <div className="mb-3 flex flex-col justify-between gap-space-md md:mb-space-xl md:flex-row md:items-end">
            <div>
              <span className="hidden text-label-badge font-bold tracking-wider text-secondary uppercase lg:inline">
                {t("treatmentsSection.eyebrow")}
              </span>
              <h2 className="mt-1 text-headline-sm font-bold text-primary lg:text-headline-lg">
                <span className="lg:hidden">{t("treatmentsSection.titleMobile")}</span>
                <span className="hidden lg:inline">{t("treatmentsSection.titleDesktop")}</span>
              </h2>
              <p className="mt-1 max-w-2xl text-body-sm text-on-surface-variant lg:text-body-md">
                <span className="lg:hidden">{t("treatmentsSection.descMobile")}</span>
                <span className="hidden lg:inline">{t("treatmentsSection.descDesktop")}</span>
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-label-lg font-semibold text-secondary transition-colors hover:text-on-secondary-container"
              href="/treatments"
            >
              <span className="lg:hidden">
                {t("treatmentsSection.viewAllMobile")} <Icon name="chevron_right" className="rtl-flip text-[16px]" />
              </span>
              <span className="hidden items-center gap-2 lg:inline-flex">
                {t("treatmentsSection.viewAllDesktop")}
                <Icon name="arrow_forward" className="rtl-flip text-sm" />
              </span>
            </Link>
          </div>

          {/* Mobile horizontal cards */}
          <div className="flex gap-3.5 overflow-x-auto pb-3 lg:hidden">
            {homeTreatmentsMeta.slice(0, 4).map((meta) => {
              const content = t.raw(`treatments.${meta.id}`) as {
                title: string;
                desc: string;
                topBadge: string;
              };
              return (
                <div
                  key={meta.id}
                  className="flex w-72 shrink-0 flex-col justify-between rounded-xl bg-surface-container-lowest p-3 shadow-md"
                >
                  <div>
                    <div className="relative mb-2.5 h-36 w-full overflow-hidden rounded-lg bg-surface-container">
                      <Image
                        alt={content.title}
                        className="object-cover"
                        fill
                        sizes="288px"
                        src={meta.image}
                        unoptimized
                      />
                      <span className="absolute top-2 end-2 rounded-md bg-surface-container-lowest/90 px-2 py-0.5 text-label-badge font-bold text-primary backdrop-blur">
                        {content.topBadge}
                      </span>
                    </div>
                    <h3 className="mb-1 text-[1.1rem] text-headline-sm text-primary">{content.title}</h3>
                    <p className="mb-3 line-clamp-2 text-body-sm text-on-surface-variant">{content.desc}</p>
                  </div>
                  <div className="-mx-3 -mb-3 flex items-center justify-between rounded-b-xl bg-surface-container-low p-3 pt-2">
                    <div>
                      <p className="text-label-badge text-on-surface-variant">{t("treatmentsSection.startingPrice")}</p>
                      <p className="text-headline-sm font-bold text-primary">{meta.price}</p>
                    </div>
                    <Link
                      className="rounded-lg bg-secondary px-3 py-1.5 text-label-md text-on-secondary shadow-sm"
                      href="/treatments"
                    >
                      {t("treatmentsSection.exploreCta")}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop grid */}
          <StaggerGroup className="hidden grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid lg:grid-cols-3">
            {homeTreatmentsMeta.map((meta) => {
              const content = t.raw(`treatments.${meta.id}`) as {
                title: string;
                desc: string;
                tags: string[];
                priceNote: string;
                topBadge: string;
                bottomBadge: string;
              };
              return (
                <StaggerItem key={meta.id}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        alt={content.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width:1024px) 50vw, 33vw"
                        src={meta.image}
                        unoptimized
                      />
                      <div className="absolute top-3 start-3 rounded-full bg-primary/80 px-3 py-1 text-label-badge font-semibold text-on-primary backdrop-blur-md">
                        {content.topBadge}
                      </div>
                      <div className="absolute end-3 bottom-3 rounded-full bg-secondary px-3 py-1 text-label-badge font-bold text-on-secondary">
                        {content.bottomBadge}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-space-md p-6">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="text-headline-sm font-bold text-primary">{content.title}</h3>
                          <Icon name="check_circle" className="text-secondary" />
                        </div>
                        <p className="text-body-sm text-on-surface-variant">{content.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {content.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-surface-container px-2 py-1 text-label-badge font-medium text-on-surface"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="-mx-6 -mb-6 flex items-center justify-between bg-surface-container-low p-6 pt-4">
                        <div>
                          <span className="block text-label-badge font-semibold text-on-surface-variant uppercase">
                            {t("treatmentsSection.packageStarting")}
                          </span>
                          <span className="text-headline-sm font-bold text-primary">
                            {meta.price}{" "}
                            <span className="text-body-sm font-normal text-on-surface-variant">
                              {content.priceNote}
                            </span>
                          </span>
                        </div>
                        <Link
                          className="rounded-lg bg-primary px-4 py-2 text-label-md font-semibold text-on-primary transition-colors hover:bg-primary-container"
                          href="/contact"
                        >
                          {t("treatmentsSection.detailCta")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
            <StaggerItem>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-primary p-8 text-on-primary shadow-xl">
                <div className="pointer-events-none absolute -end-8 -bottom-8 h-44 w-44 rounded-full bg-secondary opacity-20 blur-2xl" />
                <div>
                  <div className="mb-space-md flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container/20 text-secondary-container">
                    <Icon name="diamond" className="text-3xl" />
                  </div>
                  <span className="text-label-badge font-bold tracking-wider text-secondary-container uppercase">
                    {t("ctaCard.eyebrow")}
                  </span>
                  <h3 className="mt-2 text-headline-md font-bold text-on-primary">{t("ctaCard.title")}</h3>
                  <p className="mt-3 leading-relaxed text-body-sm text-surface-dim">{t("ctaCard.desc")}</p>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-label-md text-surface-container-high">
                    <Icon name="support_agent" className="text-base text-secondary-container" />
                    <span>{t("ctaCard.assistantLine")}</span>
                  </div>
                  <a
                    className="w-full rounded-lg bg-secondary py-3 text-center text-label-md font-bold text-on-secondary shadow-md transition-all hover:bg-on-secondary-container"
                    href={site.whatsapp}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("ctaCard.whatsappCta")}
                  </a>
                </div>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* 6 Steps */}
      <section className="bg-surface-container-low py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto mb-space-xl max-w-3xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("stepsSection.eyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("stepsSection.title")}
            </h2>
            <p className="mt-2 text-body-md text-on-surface-variant">{t("stepsSection.desc")}</p>
          </Reveal>
          <StaggerGroup className="relative grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="flex h-full flex-col justify-between rounded-xl bg-surface-container-lowest p-6 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-headline-sm font-bold text-secondary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon name={s.icon} className="text-outline-variant" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-headline-sm font-bold text-primary">{s.title}</h3>
                    <p className="text-body-sm text-on-surface-variant">{s.desc}</p>
                  </div>
                  <div className="-mx-6 -mb-6 mt-4 flex items-center rounded-b-xl bg-surface-container-low px-6 py-2.5 pt-3 text-label-badge font-semibold text-secondary">
                    <Icon name={s.footerIcon} className="me-1 text-xs" /> {s.footer}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Doctors */}
      <section className="bg-surface py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-space-xl flex flex-col justify-between gap-space-md md:flex-row md:items-end">
            <div>
              <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                {t("doctorsSection.eyebrow")}
              </span>
              <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
                {t("doctorsSection.title")}
              </h2>
              <p className="mt-1 max-w-2xl text-body-md text-on-surface-variant">{t("doctorsSection.desc")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="workspace_premium" className="text-secondary" />
              <span className="text-label-md font-semibold text-primary">{t("doctorsSection.certifiedLine")}</span>
            </div>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {homeDoctorsMeta.map((meta) => {
              const d = t.raw(`doctors.${meta.id}`) as {
                name: string;
                specialty: string;
                experience: string;
                bio: string;
                stats: { value: string; label: string }[];
              };
              return (
                <StaggerItem key={meta.id}>
                  <div className="flex h-full flex-col justify-between rounded-xl bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-lg">
                    <div>
                      <div className="mb-4 flex items-center gap-4">
                        <Image
                          alt={d.name}
                          className="h-20 w-20 rounded-full object-cover ring-2 ring-secondary-container"
                          height={80}
                          src={meta.image}
                          unoptimized
                          width={80}
                        />
                        <div>
                          <span className="text-label-badge font-bold text-secondary uppercase">
                            {d.specialty}
                          </span>
                          <h3 className="text-headline-sm font-bold text-primary">{d.name}</h3>
                          <p className="text-body-sm text-on-surface-variant">{d.experience}</p>
                        </div>
                      </div>
                      <p className="mb-4 text-body-sm text-on-surface-variant">{d.bio}</p>
                      <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-surface-container-low py-3 text-center">
                        {d.stats.map((s, i) => (
                          <div key={s.label}>
                            <span
                              className={`block text-headline-sm font-bold ${i === 1 ? "text-secondary" : "text-primary"}`}
                            >
                              {s.value}
                            </span>
                            <span className="text-label-badge text-on-surface-variant">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container py-2.5 text-label-md font-semibold text-primary transition-colors hover:bg-surface-container-high"
                      type="button"
                    >
                      <span>{t("doctorsSection.cvCta")}</span>
                      <Icon name="visibility" className="text-sm" />
                    </button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Patients */}
      <section className="bg-surface-container-low py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mx-auto mb-space-xl max-w-3xl text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("patientsSection.eyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("patientsSection.title")}
            </h2>
            <p className="mt-2 text-body-md text-on-surface-variant">{t("patientsSection.desc")}</p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {homePatientsMeta.map((meta) => {
              const p = t.raw(`patients.${meta.id}`) as {
                location: string;
                flag: string;
                treatment: string;
                date: string;
                quote: string;
              };
              return (
                <StaggerItem key={meta.id}>
                  <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.flag}</span>
                          <span className="text-body-sm text-on-surface-variant">{p.location}</span>
                        </div>
                        <div className="flex items-center text-tertiary-fixed-dim">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icon key={i} name="star" className="text-sm" filled />
                          ))}
                        </div>
                      </div>
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <Image
                          alt={p.treatment}
                          className="h-48 w-full object-cover"
                          height={192}
                          src={meta.image}
                          unoptimized
                          width={400}
                        />
                        <span className="absolute bottom-2 start-2 rounded bg-primary/90 px-2.5 py-0.5 text-label-badge font-semibold text-on-primary">
                          {p.treatment}
                        </span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant italic">&ldquo;{p.quote}&rdquo;</p>
                    </div>
                    <div className="flex items-center justify-between bg-surface-container-low px-6 py-3 text-label-badge font-semibold text-secondary">
                      <span>{p.date}</span>
                      <span className="flex items-center gap-1">
                        <Icon name="verified" className="text-xs" /> {t("patientsSection.verifiedLine")}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Cost comparison */}
      <section className="bg-surface py-space-xl lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
            <Reveal className="flex flex-col gap-space-md lg:col-span-6">
              <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
                {t("costSection.eyebrow")}
              </span>
              <h2 className="text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
                {t("costSection.title")}
              </h2>
              <p className="text-body-md text-on-surface-variant">{t("costSection.desc")}</p>
              <div className="mt-2 overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                <div className="grid grid-cols-4 bg-surface-container p-3 text-label-badge font-bold text-primary uppercase">
                  <div className="col-span-2">{t("costSection.tableBranch")}</div>
                  <div>{t("costSection.tableUk")}</div>
                  <div className="font-black text-secondary">{t("costSection.tableUs")}</div>
                </div>
                {costRows.map((row, i) => (
                  <div
                    key={row.name}
                    className={`grid grid-cols-4 p-3.5 text-body-sm ${i % 2 ? "bg-surface-container-low" : "bg-surface-container-lowest"}`}
                  >
                    <div className="col-span-2 font-medium text-primary">{row.name}</div>
                    <div className="text-outline line-through">{row.uk}</div>
                    <div className="font-bold text-secondary">{row.price}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-label-md text-on-surface-variant">
                <Icon name="info" className="text-base text-secondary" />
                <span>{t("costSection.disclaimer")}</span>
              </div>
            </Reveal>
            <div className="relative lg:col-span-6">
              <Reveal className="relative overflow-hidden rounded-xl bg-surface-container-high shadow-xl" delay={0.1}>
                <Image
                  alt="JCI accredited hospital"
                  className="h-96 w-full object-cover"
                  height={384}
                  src={hospitalImage}
                  unoptimized
                  width={640}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 via-transparent to-transparent p-6 text-on-primary">
                  <span className="text-label-badge font-bold tracking-widest text-secondary-container uppercase">
                    {t("costSection.partnerLabel")}
                  </span>
                  <h3 className="text-headline-sm font-bold">{t("costSection.partnerTitle")}</h3>
                  <p className="mt-1 text-body-sm text-surface-dim">{t("costSection.partnerDesc")}</p>
                </div>
              </Reveal>
              <div className="absolute -bottom-6 -start-6 hidden items-center gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-lg sm:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                  <Icon name="verified_user" className="text-2xl" />
                </div>
                <div>
                  <span className="text-label-badge font-bold text-on-surface-variant uppercase">
                    {t("costSection.assuranceLabel")}
                  </span>
                  <p className="text-label-md font-bold text-primary">{t("costSection.assuranceTitle")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-container-low py-space-xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <Reveal className="mb-space-lg text-center">
            <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
              {t("faqSection.eyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
              {t("faqSection.title")}
            </h2>
            <p className="mt-1 text-body-md text-on-surface-variant">{t("faqSection.desc")}</p>
          </Reveal>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-container to-primary py-space-xl text-on-primary lg:py-20">
        <div className="pointer-events-none absolute top-0 end-0 h-80 w-80 rounded-full bg-secondary opacity-15 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-space-xl lg:flex-row">
            <div className="max-w-2xl">
              <span className="text-label-badge font-bold tracking-wider text-secondary-container uppercase">
                {t("bottomCta.eyebrow")}
              </span>
              <h2 className="mt-2 text-headline-lg-mobile font-bold text-on-primary lg:text-headline-lg">
                {t("bottomCta.title")}
              </h2>
              <p className="mt-2 text-body-md text-surface-dim">{t("bottomCta.desc")}</p>
              <div className="mt-6 flex flex-wrap items-center gap-space-md">
                {(t.raw("bottomCta.features") as string[]).map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-secondary-container" />
                    <span className="text-label-md">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-space-md sm:flex-row lg:w-auto">
              <Link
                className="w-full rounded-lg bg-secondary px-8 py-4 text-center text-label-lg font-bold text-on-secondary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-on-secondary-container sm:w-auto"
                href="/contact"
              >
                {t("bottomCta.primaryCta")}
              </Link>
              <a
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container/20 px-6 py-4 text-label-lg font-semibold text-on-primary transition-all hover:bg-surface-container/30 sm:w-auto"
                href={site.whatsapp}
                rel="noreferrer"
                target="_blank"
              >
                <Icon name="chat" className="text-secondary-container" />
                <span>{t("bottomCta.whatsappCta")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
