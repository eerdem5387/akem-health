import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export function FloatingCta() {
  const t = useTranslations("common");

  return (
    <>
      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 end-6 z-40 hidden flex-col gap-2.5 lg:flex">
        <a
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-transform hover:scale-105"
          href={site.phoneHref}
        >
          <Icon name="phone_in_talk" />
        </a>
        <a
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg transition-transform hover:scale-105"
          href={site.whatsapp}
          rel="noreferrer"
          target="_blank"
        >
          <Icon name="forum" />
          <span className="absolute -top-0.5 -end-0.5 h-3 w-3 rounded-full bg-secondary-container ring-2 ring-surface" />
        </a>
      </div>

      {/* Mobile WhatsApp pill */}
      <aside className="fixed end-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2 lg:hidden">
        <a
          aria-label={t("whatsappDirect")}
          className="flex h-12 items-center gap-2 rounded-full bg-secondary py-0 pe-4 ps-3 text-on-secondary shadow-[0_10px_25px_-4px_rgba(11,37,69,0.2)] transition-all active:scale-95 hover:opacity-95"
          href={site.whatsapp}
          rel="noreferrer"
          target="_blank"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-fixed opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary-fixed" />
          </span>
          <Icon name="chat" className="text-[22px]" />
          <span className="text-label-md tracking-wide">{t("whatsappDirect")}</span>
        </a>
      </aside>
    </>
  );
}
