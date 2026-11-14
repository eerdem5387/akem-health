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
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-space-md overflow-hidden px-6 font-body text-label-md whitespace-nowrap lg:px-12">
          <div className="flex min-w-0 items-center gap-space-lg">
            <div className="flex shrink-0 items-center gap-space-xs text-secondary-fixed">
              <Icon name="support_agent" className="shrink-0 text-sm" />
              <span className="hidden font-medium xl:inline">{t("common.supportLine")}</span>
              <a className="font-semibold text-on-primary hover:underline" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
            <div className="hidden shrink-0 items-center gap-space-xs text-secondary-fixed xl:flex">
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
          <div className="flex shrink-0 items-center gap-space-md">
            <div className="hidden items-center gap-space-xs text-on-primary-container 2xl:flex">
              <Icon name="verified" className="text-sm" />
              <span className="text-on-primary">{t("common.authorityLine")}</span>
            </div>
            <LanguageSwitcher variant="bar" />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto hidden min-h-20 max-w-7xl items-center justify-between gap-space-md px-6 lg:flex lg:px-8 xl:px-12">
        <Link className="shrink-0" href="/">
          <Logo size="sm" />
        </Link>

        <nav className="flex items-center gap-0.5 text-label-md xl:gap-1">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={
                  active
                    ? "rounded-lg bg-surface-container-high px-2.5 py-2 font-semibold whitespace-nowrap text-primary transition-colors xl:px-space-sm"
                    : "px-2.5 py-2 whitespace-nowrap text-on-surface-variant transition-colors hover:text-on-surface xl:px-space-sm"
                }
                href={item.href}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-space-sm">
          <div className="hidden items-center gap-space-xs rounded-full bg-surface-container-low py-1.5 ps-space-sm pe-space-md whitespace-nowrap xl:flex">
            <Icon name="support_agent" className="h-7 w-7 shrink-0 rounded-full bg-surface p-1.5 text-secondary" />
            <span className="text-label-md font-semibold text-on-surface">{t("common.coordinatorTitle")}</span>
          </div>
          <Link
            className="whitespace-nowrap rounded-lg bg-secondary px-space-sm py-2.5 text-center text-label-md text-on-secondary shadow-[0_4px_16px_rgba(0,106,96,0.2)] transition-transform hover:-translate-y-0.5 hover:bg-on-secondary-container xl:px-space-md xl:text-label-lg"
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
