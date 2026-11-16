import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { fontVariables, localeFontClassName } from "@/lib/fonts";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const SITE_URL = "https://www.akemhealth.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? "/" : `/${l}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: t("metaKeywords")
      .split(",")
      .map((k) => k.trim()),
    alternates: {
      canonical: path,
      languages: { ...languages, "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      siteName: t("siteName"),
      locale,
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      className={`${fontVariables} ${localeFontClassName(locale)} h-full antialiased`}
      dir={dir}
      lang={locale}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface font-body text-on-surface">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="w-full flex-1 bg-surface pt-16 lg:pt-[7.5rem]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingCta />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
