import { Inter, Noto_Sans_Arabic, Noto_Sans_Georgian, Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
});

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-georgian",
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const fontVariables = `${plusJakarta.variable} ${inter.variable} ${notoGeorgian.variable} ${notoArabic.variable}`;

export function localeFontClassName(locale: string): string {
  if (locale === "ka") return "lang-ka";
  if (locale === "ar") return "lang-ar";
  if (locale === "ru") return "lang-ru";
  return "";
}
