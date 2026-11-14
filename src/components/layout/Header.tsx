"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 start-0 z-50 w-full bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      {/* Desktop top bar */}
      <div className="hidden bg-primary-container text-on-primary lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 font-body text-label-md lg:px-12">
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs text-secondary-fixed">
              <Icon name="support_agent" className="text-sm" />
              <span className="font-medium">{t("common.supportLine")}</span>
              <a className="font-semibold text-on-primary hover:underline" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
            <div className="flex items-center gap-space-xs text-secondary-fixed">
              <Icon name="chat" className="text-sm" />
              <a
                className="text-on-primary hover:underline"
                href={site.whatsapp}
                rel="noreferrer"
                target="_blank"
              >
                {t("common.whatsappDirect")}
              </a>
              <span className="inline-block h-2 w-2 rounded-full bg-secondary-container" />
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs text-on-primary-container">
              <Icon name="verified" className="text-sm" />
              <span className="text-on-primary">{t("common.authorityLine")}</span>
            </div>
            <LanguageSwitcher variant="bar" />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto hidden h-20 max-w-7xl items-center justify-between gap-space-lg px-6 lg:flex lg:px-12">
        <Link href="/">
          <Logo size="sm" />
        </Link>

        <nav className="flex items-center gap-space-xs text-label-lg">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={
                  active
                    ? "rounded-lg bg-surface-container-high px-space-md py-space-sm font-semibold text-primary transition-colors"
                    : "px-space-md py-space-sm text-on-surface-variant transition-colors hover:text-on-surface"
                }
                href={item.href}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-sm rounded-full bg-surface-container-low py-1 ps-space-sm pe-space-md">
            <Icon name="support_agent" className="h-8 w-8 rounded-full bg-surface p-1.5 text-secondary" />
            <div className="flex flex-col text-left">
              <span className="text-label-badge font-bold uppercase text-secondary">
                {t("common.coordinatorTitle")}
              </span>
              <span className="text-label-md font-medium text-on-surface">{t("common.coordinatorRole")}</span>
            </div>
          </div>
          <Link
            className="whitespace-nowrap rounded-lg bg-secondary px-space-md py-2.5 text-center text-label-lg text-on-secondary shadow-[0_4px_16px_rgba(0,106,96,0.2)] transition-transform hover:-translate-y-0.5 hover:bg-on-secondary-container"
            href="/contact"
          >
            {t("common.ctaConsultation")}
          </Link>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex h-16 items-center justify-between gap-space-sm px-gutter-mobile pt-safe lg:hidden">
        <div className="flex items-center gap-space-sm">
          <button
            aria-label={t("common.menu")}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container-high"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-[24px]" />
          </button>
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher variant="compact" />
          <a
            aria-label={t("common.emergencyCall")}
            className="flex h-11 w-11 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface-container-high"
            href={site.phoneHref}
          >
            <Icon name="phone_in_talk" className="text-[22px]" />
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-outline-variant/20 bg-surface px-gutter-mobile py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                className="rounded-lg px-3 py-3 text-label-lg text-on-surface hover:bg-surface-container-high"
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
