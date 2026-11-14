"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function MobileNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 start-0 z-50 w-full bg-surface/90 pb-safe shadow-[0_-4px_20px_-2px_rgba(11,37,69,0.06)] backdrop-blur-xl lg:hidden">
      <div className="flex h-16 items-center justify-around px-gutter-mobile">
        {site.mobileNav.map((item) => {
          const active = pathname === item.href;
          if ("cta" in item && item.cta) {
            return (
              <Link
                key={item.href}
                className="ms-1 flex h-11 items-center gap-1.5 rounded-xl bg-primary-container px-4 text-on-primary shadow-[0_4px_14px_rgba(11,37,69,0.2)] transition-all active:scale-95 hover:bg-primary"
                href={item.href}
              >
                <Icon name={item.icon} className="text-[20px] text-secondary-container" />
                <span className="whitespace-nowrap text-label-lg">{t(item.key)}</span>
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 px-2 transition-colors ${
                active ? "font-semibold text-secondary" : "text-on-surface-variant"
              }`}
              href={item.href}
            >
              <Icon name={item.icon} className="text-[22px]" />
              <span className="text-label-md">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
