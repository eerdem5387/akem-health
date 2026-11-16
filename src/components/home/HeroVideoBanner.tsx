"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { HeroQuoteForm } from "@/components/home/HeroQuoteForm";
import { Icon } from "@/components/ui/Icon";
import { patientAvatars } from "@/lib/home";
import { site } from "@/lib/site";

const HERO_VIDEO_SRC = "/videos/hero-banner.mp4";
const HERO_POSTER_SRC = "/images/hero-poster.jpg";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function HeroVideoBanner() {
  const t = useTranslations("heroVideo");
  const tHome = useTranslations("home");
  const [videoFailed, setVideoFailed] = useState(false);

  const metrics = tHome.raw("metrics") as { icon: string; label: string }[];

  return (
    <section className="relative isolate min-h-[640px] w-full overflow-hidden lg:min-h-[94vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#0b2545] to-secondary/40" />

      {!videoFailed && (
        <video
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          onError={() => setVideoFailed(true)}
          playsInline
          poster={HERO_POSTER_SRC}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />

      <motion.div
        animate="visible"
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center gap-space-lg px-gutter-mobile py-28 text-on-primary lg:flex-row lg:items-center lg:justify-between lg:gap-space-xl lg:px-12"
        initial="hidden"
        variants={container}
      >
        <div className="flex max-w-2xl flex-col gap-space-md lg:gap-space-lg">
          <motion.div
            className="inline-flex items-center gap-2 self-start rounded-full bg-surface-container-lowest/15 px-3.5 py-1.5 backdrop-blur-md"
            variants={item}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed" />
            <span className="text-label-badge font-bold tracking-widest text-secondary-fixed uppercase">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            className="text-display-lg-mobile tracking-tight text-on-primary lg:text-display-lg"
            variants={item}
          >
            {t("title")} <span className="text-secondary-fixed">{t("titleHighlight")}</span>
          </motion.h1>

          <motion.p className="max-w-xl text-body-md text-surface-container-high lg:text-body-lg" variants={item}>
            {t("desc")}
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-space-sm pt-space-xs sm:grid-cols-4"
            variants={item}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-1.5 rounded-lg bg-surface-container-lowest/10 p-3 backdrop-blur-md"
              >
                <Icon name={m.icon} className="text-2xl text-secondary-fixed" />
                <span className="text-label-md leading-snug text-surface-container-high">{m.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-space-md pt-space-xs" variants={item}>
            <div className="flex -space-x-2">
              {patientAvatars.map((src) => (
                <Image
                  key={src}
                  alt="Patient avatar"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-primary"
                  height={36}
                  src={src}
                  unoptimized
                  width={36}
                />
              ))}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-label-badge font-bold text-on-secondary">
                {tHome("hero.avatarMore")}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-label-md font-semibold text-on-primary">{tHome("hero.patientsLine")}</span>
              <span className="text-body-sm text-surface-container-high">
                {tHome("hero.responseLine")}{" "}
                <strong className="font-medium text-secondary-fixed">{tHome("hero.responseTime")}</strong>
              </span>
            </div>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-space-sm pt-space-xs lg:hidden" variants={item}>
            <a
              className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary px-4 text-label-lg font-bold text-on-secondary shadow-lg transition-transform active:scale-95"
              href={site.whatsapp}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="text-[18px]" name="forum" />
              <span>{tHome("mobileHero.whatsappCta")}</span>
            </a>
          </motion.div>
        </div>

        <motion.div className="hidden w-full max-w-md lg:block" variants={item}>
          <HeroQuoteForm />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-on-primary/70 lg:flex"
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-label-badge uppercase tracking-widest">{t("scrollHint")}</span>
        <Icon name="keyboard_arrow_down" />
      </motion.div>
    </section>
  );
}
