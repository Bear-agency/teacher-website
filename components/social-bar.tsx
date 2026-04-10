"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { siteMeta } from "@/lib/constants";

const linkClass =
  "inline-flex size-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm backdrop-blur transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-teal-500/50 dark:hover:text-teal-300";

export function SocialBar() {
  const t = useTranslations("Social");

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/90 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur-md dark:border-slate-700/90 dark:bg-slate-950/85 dark:shadow-black/40">
        <span className="hidden pl-2 text-xs font-medium text-slate-500 sm:inline dark:text-slate-400">
          {t("connect")}
        </span>
        <LanguageSwitcher />
        <a
          href={siteMeta.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label={t("github")}
        >
          <Github className="size-[18px]" aria-hidden />
        </a>
        <a
          href={siteMeta.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label={t("linkedin")}
        >
          <Linkedin className="size-[18px]" aria-hidden />
        </a>
        <a
          href={`mailto:${siteMeta.email}`}
          className={linkClass}
          aria-label={t("email")}
        >
          <Mail className="size-[18px]" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
