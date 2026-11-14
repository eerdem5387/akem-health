"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { type PackageCategory, packagesMeta } from "@/lib/packages";

type Benefit = { icon: string; title: string; desc: string };
type Category = { id: PackageCategory; label: string };
type PackageContent = {
  title: string;
  categoryLabel: string;
  badges: string[];
  euPrice: string;
  price: string;
  savings: string;
  duration: string;
  metrics: { icon: string; label: string; value: string }[];
  includes: { title: string; desc: string }[];
};

export function TreatmentsClient() {
  const t = useTranslations("treatmentsPage");
  const [filter, setFilter] = useState<PackageCategory>("all");

  const categories = t.raw("categories") as Category[];
  const benefits = t.raw("benefits") as Benefit[];

  const filtered = useMemo(
    () => (filter === "all" ? packagesMeta : packagesMeta.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className="flex w-full flex-col">
      <div className="relative w-full overflow-hidden bg-primary-container py-space-xl text-on-primary">
        <div className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-6rem] start-1/3 h-80 w-80 rounded-full bg-secondary-container/10 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-space-lg lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-space-sm inline-flex items-center gap-2 rounded-full bg-surface-container-high/20 px-3 py-1 text-secondary-fixed backdrop-blur-md">
                <Icon name="verified_user" className="text-sm" />
                <span className="text-label-badge tracking-wider uppercase">{t("badge")}</span>
              </div>
              <h1 className="text-display-lg-mobile font-bold tracking-tight text-on-primary lg:text-display-lg">
                {t("title")} <span className="text-secondary-fixed">{t("titleHighlight")}</span>{" "}
                {t("titleEnd")}
              </h1>
              <p className="mt-space-sm max-w-2xl text-body-lg text-on-primary-container">{t("desc")}</p>
            </div>
            <div className="flex flex-wrap items-start gap-space-sm lg:flex-col lg:items-end">
              <div className="flex items-center gap-space-md rounded-lg bg-surface/10 px-space-md py-space-sm backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container font-bold text-on-secondary-container">
                  <Icon name="payments" />
                </div>
                <div>
                  <p className="text-label-badge font-semibold text-secondary-fixed uppercase">
                    {t("savingsLabel")}
                  </p>
                  <p className="text-headline-sm font-bold text-on-primary">{t("savingsValue")}</p>
                </div>
              </div>
              <div className="flex items-center gap-space-md rounded-lg bg-surface/10 px-space-md py-space-sm backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed font-bold text-on-tertiary-fixed-variant">
                  <Icon name="verified" />
                </div>
                <div>
                  <p className="text-label-badge font-semibold text-tertiary-fixed uppercase">
                    {t("satisfactionLabel")}
                  </p>
                  <p className="text-headline-sm font-bold text-on-primary">{t("satisfactionValue")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-xl flex flex-wrap items-center gap-space-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`rounded-full px-space-md py-2.5 text-label-lg transition-all duration-200 ${
                  filter === c.id
                    ? "bg-secondary text-on-secondary shadow-md"
                    : "bg-surface/10 text-on-primary hover:bg-surface/20"
                }`}
                onClick={() => setFilter(c.id)}
                type="button"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-surface-container-low py-space-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex items-center gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-secondary">
                  <Icon name={b.icon} className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-label-lg font-bold text-primary">{b.title}</h4>
                  <p className="text-body-sm text-on-surface-variant">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-space-xl lg:px-12">
        <div className="mb-space-xl flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div>
            <span className="text-label-badge font-bold tracking-widest text-secondary uppercase">
              {t("featuredEyebrow")}
            </span>
            <h2 className="mt-1 text-headline-lg font-bold text-primary">{t("featuredTitle")}</h2>
          </div>
          <p className="max-w-md text-body-sm text-on-surface-variant">{t("featuredDesc")}</p>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-space-xl lg:grid-cols-2">
          {filtered.map((meta) => {
            const pkg = t.raw(`packages.${meta.id}`) as PackageContent;
            return (
              <StaggerItem key={meta.id}>
                <article className="flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl">
                  <div>
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        alt={pkg.title}
                        className="object-cover"
                        fill
                        sizes="(max-width:1024px) 100vw, 50vw"
                        src={meta.image}
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                      <div className="absolute top-4 start-4 flex gap-2">
                        {pkg.badges.map((b, i) => (
                          <span
                            key={b}
                            className={`rounded-full px-3 py-1 text-label-badge font-bold uppercase shadow-md ${
                              i === 0
                                ? "bg-secondary text-on-secondary"
                                : "bg-surface-container-lowest text-primary"
                            }`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                      <div className="absolute end-4 bottom-4 start-4 text-on-primary">
                        <span className="text-label-badge font-semibold tracking-wider text-secondary-fixed uppercase">
                          {pkg.categoryLabel}
                        </span>
                        <h3 className="mt-0.5 text-headline-md font-bold">{pkg.title}</h3>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-md p-space-lg">
                      <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-space-sm">
                        <div>
                          <span className="text-label-md text-on-surface-variant line-through">
                            {t("euPriceLabel")} {pkg.euPrice}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-headline-lg font-bold text-primary">{pkg.price}</span>
                            <span className="text-label-md font-bold text-secondary">{pkg.savings}</span>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="text-label-badge font-semibold text-on-surface-variant uppercase">
                            {t("durationLabel")}
                          </span>
                          <p className="text-label-lg font-bold text-primary">{pkg.duration}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-space-xs text-center">
                        {pkg.metrics.map((m) => (
                          <div key={m.label} className="rounded-lg bg-surface-container p-space-sm">
                            <Icon name={m.icon} className="text-base text-secondary" />
                            <p className="mt-1 text-label-badge text-on-surface-variant">{m.label}</p>
                            <p className="text-label-lg font-bold text-primary">{m.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <span className="text-label-badge font-semibold tracking-wider text-on-surface-variant uppercase">
                          {t("includesLabel")}
                        </span>
                        <ul className="space-y-2 text-body-sm text-on-surface">
                          {pkg.includes.map((item) => (
                            <li key={item.title} className="flex items-start gap-2">
                              <Icon name="check_circle" className="text-lg text-secondary" />
                              <span>
                                <strong>{item.title}:</strong> {item.desc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-space-sm p-space-lg pt-0">
                    <Link
                      className="w-full rounded-lg bg-primary py-3 text-center text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary-container"
                      href="/contact"
                    >
                      {t("bookCta")}
                    </Link>
                    <Link
                      className="flex items-center justify-center rounded-lg bg-surface-container px-space-md py-3 text-label-lg text-primary transition-colors hover:bg-surface-container-high"
                      href="/vip-experience"
                    >
                      <Icon name="info" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {filtered.length === 0 && (
          <div className="rounded-xl bg-surface-container-low p-10 text-center">
            <p className="text-body-md text-on-surface-variant">{t("emptyTitle")}</p>
            <Link
              className="mt-4 inline-flex rounded-lg bg-secondary px-6 py-3 text-label-lg font-bold text-on-secondary"
              href="/contact"
            >
              {t("emptyCta")}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
