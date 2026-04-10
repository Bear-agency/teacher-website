import { Github, Linkedin, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteMeta } from "@/lib/constants";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="top"
      className="relative border-b border-stone-200/90 dark:border-stone-800/90"
    >
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <ScrollReveal>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-800 dark:text-teal-400/95">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif mt-5 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight text-stone-900 sm:text-[2.75rem] sm:leading-[1.1] dark:text-stone-50">
            {siteMeta.name}
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-lg font-medium text-stone-700 dark:text-stone-300">
            {t("role")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-10 max-w-2xl space-y-5">
          <p className="font-sans text-base leading-[1.7] text-stone-600 dark:text-stone-400">
            {t("bio")}
          </p>
          <p className="font-sans text-sm leading-[1.75] text-stone-600 dark:text-stone-400">
            {t("detail")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-12 border-t border-stone-200/90 pt-10 dark:border-stone-800/90">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-stone-500 dark:text-stone-500">
            {t("proofLabel")}
          </p>
          <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {t("proofHint")}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
            <li>
              <a
                href={siteMeta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-teal-800 underline decoration-teal-800/25 underline-offset-4 transition hover:decoration-teal-600 dark:text-teal-400 dark:decoration-teal-400/30 dark:hover:text-teal-300"
              >
                <Github className="size-4 shrink-0 opacity-80" aria-hidden />
                {t("proofGithub")}
              </a>
            </li>
            <li>
              <a
                href={siteMeta.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-teal-800 underline decoration-teal-800/25 underline-offset-4 transition hover:decoration-teal-600 dark:text-teal-400 dark:decoration-teal-400/30 dark:hover:text-teal-300"
              >
                <Linkedin className="size-4 shrink-0 opacity-80" aria-hidden />
                {t("proofLinkedIn")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteMeta.email}`}
                className="inline-flex items-center gap-2 font-medium text-teal-800 underline decoration-teal-800/25 underline-offset-4 transition hover:decoration-teal-600 dark:text-teal-400 dark:decoration-teal-400/30 dark:hover:text-teal-300"
              >
                <Mail className="size-4 shrink-0 opacity-80" aria-hidden />
                {siteMeta.email}
              </a>
            </li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
