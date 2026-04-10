"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Language");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 border-l border-slate-200/90 pl-2 dark:border-slate-700/90">
      <span className="sr-only">{t("label")}</span>
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            disabled={isActive}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`rounded-lg px-2 py-1 text-[11px] font-semibold uppercase tracking-wide transition ${
              isActive
                ? "bg-teal-500/15 text-teal-800 dark:bg-teal-500/25 dark:text-teal-200"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            }`}
            aria-current={isActive ? "true" : undefined}
            aria-label={loc === "en" ? t("switchToEn") : t("switchToUk")}
          >
            {loc === "en" ? "EN" : "UK"}
          </button>
        );
      })}
    </div>
  );
}
