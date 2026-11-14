"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LanguageSwitcherProps = {
  variant?: "bar" | "compact";
};

export function LanguageSwitcher({ variant = "bar" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("languages");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchTo(nextLocale: string) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  if (variant === "bar") {
    return (
      <div className="flex items-center gap-1.5 rounded bg-primary/40 px-space-sm py-0.5 text-on-primary">
        <Icon name="language" className="text-sm" />
        {routing.locales.map((l, i) => (
          <span key={l} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-on-primary-container">|</span>}
            <button
              className={
                l === locale
                  ? "font-semibold text-on-primary"
                  : "text-on-primary-container transition-colors hover:text-on-primary"
              }
              onClick={() => switchTo(l)}
              type="button"
            >
              {l.toUpperCase()}
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        aria-label="Language"
        className="relative flex items-center rounded-full bg-surface-container-low px-2 py-1 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <Icon name="language" className="me-1 text-[16px] text-secondary" />
        <span className="pe-3 text-label-md text-on-surface">{locale.toUpperCase()}</span>
        <Icon
          name="expand_more"
          className={`pointer-events-none absolute end-1 text-[14px] text-on-surface-variant transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-xl bg-surface-container-lowest p-1.5 shadow-xl"
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {routing.locales.map((l) => (
              <button
                key={l}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-label-lg transition-colors ${
                  l === locale
                    ? "bg-surface-container-high font-semibold text-primary"
                    : "text-on-surface hover:bg-surface-container"
                }`}
                onClick={() => switchTo(l)}
                type="button"
              >
                <span>{t(l)}</span>
                {l === locale && <Icon name="check" className="text-base text-secondary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
