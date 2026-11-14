"use client";

import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ContactForm() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const treatmentOptions = t.raw("treatmentOptions") as { value: string; label: string }[];

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-space-md rounded-2xl bg-surface-container-lowest p-10 text-center shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
          <Icon className="text-3xl" name="check_circle" filled />
        </span>
        <h3 className="text-headline-md font-bold text-primary">{t("successTitle")}</h3>
        <p className="max-w-sm text-body-md text-on-surface-variant">{t("successDesc")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm lg:p-8">
      <h3 className="text-headline-sm font-bold text-primary">{t("formTitle")}</h3>
      <p className="mt-1 mb-space-md text-body-sm text-on-surface-variant">{t("formDesc")}</p>
      <form className="flex flex-col gap-space-sm" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-label-md font-medium text-on-surface">{t("nameLabel")}</label>
          <input
            className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
            placeholder={t("namePlaceholder")}
            required
            type="text"
          />
        </div>
        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-label-md font-medium text-on-surface">{t("emailLabel")}</label>
            <input
              className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder={t("emailPlaceholder")}
              required
              type="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-label-md font-medium text-on-surface">{t("phoneLabel")}</label>
            <input
              className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder={t("phonePlaceholder")}
              required
              type="tel"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-label-md font-medium text-on-surface">{t("treatmentLabel")}</label>
          <select
            className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none"
            defaultValue=""
          >
            <option disabled value="">
              {t("treatmentPlaceholder")}
            </option>
            {treatmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-label-md font-medium text-on-surface">{t("messageLabel")}</label>
          <textarea
            className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
            placeholder={t("messagePlaceholder")}
            rows={4}
          />
        </div>
        <button
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-label-lg font-bold text-on-primary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-container"
          type="submit"
        >
          <span>{t("submitButton")}</span>
          <Icon className="rtl-flip text-sm" name="arrow_forward" />
        </button>
      </form>
    </div>
  );
}
