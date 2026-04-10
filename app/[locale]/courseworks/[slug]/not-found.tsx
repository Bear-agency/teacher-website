"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CourseworkNotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-6 pb-32 pt-20 text-center">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        {t("courseworkTitle")}
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        {t("courseworkBody")}
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-teal-600 dark:text-teal-400"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
