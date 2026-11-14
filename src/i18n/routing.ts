import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ru", "ka", "tr", "az", "ar", "ro"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales: readonly Locale[] = ["ar"];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
});
