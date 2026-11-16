"use client";

import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type GenderOption = { value: string; label: string };

export function RemoteConsultationForm({ branchOptions }: { branchOptions: string[] }) {
  const t = useTranslations("remoteConsultForm");
  const [submitted, setSubmitted] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0] ?? "");

  const genderOptions = t.raw("genderOptions") as GenderOption[];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-lg ring-1 ring-outline-variant/40 lg:p-8">
      <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-secondary via-secondary-container to-primary" />
      <div className="flex items-center justify-between pb-space-md">
        <div>
          <span className="text-label-badge font-bold tracking-wider text-secondary uppercase">
            {t("badge")}
          </span>
          <h3 className="text-headline-sm font-bold text-primary">{t("title")}</h3>
        </div>
        <Icon name="stethoscope" className="text-2xl text-secondary" />
      </div>
      <p className="mb-space-md text-body-sm text-on-surface-variant">{t("desc")}</p>

      {submitted ? (
        <div className="flex flex-col items-center gap-space-sm rounded-lg bg-secondary-container p-6 text-center">
          <Icon name="check_circle" className="text-4xl text-on-secondary-container" />
          <p className="text-headline-sm font-bold text-on-secondary-container">{t("successTitle")}</p>
          <p className="text-body-sm text-on-secondary-container">{t("successDesc")}</p>
          {selectedBranch && (
            <div className="mt-1 rounded-full bg-surface-container-lowest/70 px-3 py-1 text-label-md font-semibold text-primary">
              {t("branchResultLabel")}: {selectedBranch}
            </div>
          )}
        </div>
      ) : (
        <form className="flex flex-col gap-space-sm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-label-md font-medium text-on-surface">{t("nameLabel")}</label>
              <input
                className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder={t("namePlaceholder")}
                required
                type="text"
              />
            </div>
            <div>
              <label className="mb-1 block text-label-md font-medium text-on-surface">{t("ageLabel")}</label>
              <input
                className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder={t("agePlaceholder")}
                required
                type="number"
                min={0}
                max={120}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-label-md font-medium text-on-surface">{t("phoneLabel")}</label>
              <input
                className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder={t("phonePlaceholder")}
                required
                type="tel"
              />
            </div>
            <div>
              <label className="mb-1 block text-label-md font-medium text-on-surface">{t("emailLabel")}</label>
              <input
                className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder={t("emailPlaceholder")}
                required
                type="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-label-md font-medium text-on-surface">{t("genderLabel")}</label>
              <select className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none">
                {genderOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-label-md font-medium text-on-surface">{t("branchLabel")}</label>
              <select
                className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none"
                onChange={(e) => setSelectedBranch(e.target.value)}
                value={selectedBranch}
              >
                {branchOptions.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-label-md font-medium text-on-surface">{t("healthInfoLabel")}</label>
            <textarea
              className="w-full rounded-lg bg-surface-container-low px-space-md py-2.5 text-body-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder={t("healthInfoPlaceholder")}
              required
              rows={3}
            />
          </div>

          <div className="flex cursor-pointer items-center justify-between rounded-lg bg-surface-container-low p-3 transition-colors hover:bg-surface-container">
            <div className="flex items-center gap-space-sm">
              <Icon name="cloud_upload" className="text-secondary" />
              <div className="flex flex-col">
                <span className="text-label-md font-medium text-primary">{t("uploadLabel")}</span>
                <span className="text-label-badge text-on-surface-variant">{t("uploadHint")}</span>
              </div>
            </div>
            <span className="rounded bg-surface px-2 py-1 text-label-badge font-semibold text-secondary">
              {t("uploadButton")}
            </span>
          </div>

          <button
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-label-lg font-bold text-on-primary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-container"
            type="submit"
          >
            <span>{t("submitButton")}</span>
            <Icon name="arrow_forward" className="rtl-flip text-sm" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-space-md pt-1 text-label-badge text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Icon name="payments" className="text-sm text-secondary" /> {t("freeLabel")}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="verified" className="text-sm text-secondary" /> {t("reviewLabel")}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="schedule" className="text-sm text-secondary" /> {t("responseLabel")}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
