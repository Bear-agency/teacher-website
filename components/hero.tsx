import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteMeta } from "@/lib/constants";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="top"
      className="relative border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {siteMeta.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-indigo-900/80 dark:text-indigo-200/80">
            {t("role")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-10 max-w-2xl">
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {t("bio")}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {t("detail")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
