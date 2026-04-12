import { Cpu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { technologyCategories } from "@/lib/constants";
import {
  buildRichTechProjectSources,
  findMatchingTechTooltips,
} from "@/lib/tech-project-hints";
import type {
  TechnologyCategoryEntry,
  TechnologyCategoryGrouped,
} from "@/lib/types";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TechnologyChip } from "@/components/technology-chip";

function isGrouped(
  cat: TechnologyCategoryEntry
): cat is TechnologyCategoryGrouped {
  return "groups" in cat;
}

const chipBaseClass =
  "inline-flex rounded-md border border-slate-200/90 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700/90 dark:bg-slate-900/60 dark:text-slate-300";

export async function TechnologiesSection() {
  const t = await getTranslations("TechnologiesSection");
  const tCat = await getTranslations("TechCategories");
  const tGroup = await getTranslations("TechGroups");
  const tCourseworks = await getTranslations("Courseworks");
  const tProjects = await getTranslations("Projects");

  const richSources = buildRichTechProjectSources({
    coursework: (slug) => ({
      title: tCourseworks(`items.${slug}.title`),
      excerpt: tCourseworks(`items.${slug}.excerpt`),
    }),
    personal: (id) => ({
      title: tProjects(`items.${id}.title`),
      description: tProjects(`items.${id}.description`),
    }),
  });

  const tooltipIntro = t("projectsTooltipIntro");
  const tooltipLinks = {
    work: t("tooltipLinkWork"),
    coursework: t("tooltipLinkCoursework"),
    personal: t("tooltipLinkProject"),
  };

  const emptyLinks = [
    { label: t("tooltipEmptyLinkExperience"), href: { pathname: "/", hash: "experience" } },
    { label: t("tooltipEmptyLinkCourseworks"), href: { pathname: "/", hash: "courseworks" } },
    { label: t("tooltipEmptyLinkProjects"), href: { pathname: "/", hash: "projects" } },
    { label: t("tooltipEmptyLinkSubjects"), href: { pathname: "/", hash: "subjects" } },
  ] as const;

  function techMatches(item: string) {
    return findMatchingTechTooltips(item, richSources, tooltipLinks);
  }

  return (
    <section
      id="technologies"
      className="border-t border-slate-200/80 py-20 dark:border-slate-800/80 sm:py-24"
      aria-labelledby="technologies-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 ring-1 ring-teal-500/20 dark:text-teal-300">
              <Cpu className="size-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h2
                id="technologies-heading"
                className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50"
              >
                {t("heading")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("lead")}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-12">
          <div className="overflow-visible rounded-2xl border border-stone-200/90 bg-white/70 shadow-sm dark:border-stone-800/90 dark:bg-stone-950/50 dark:shadow-none">
            <div className="border-l-2 border-teal-500/70 dark:border-teal-500/50">
              <ol className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
                {technologyCategories.map((cat, i) => {
                  const groupGridClass =
                    isGrouped(cat) && cat.groups.length > 2
                      ? "grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
                      : "grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2";

                  return (
                    <li
                      key={cat.id}
                      className="grid gap-6 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[7rem_minmax(0,1fr)] lg:items-start lg:gap-6"
                    >
                      <div className="flex gap-3 lg:flex-col lg:gap-1.5">
                        <span className="font-mono text-[11px] font-medium tabular-nums text-slate-400 dark:text-slate-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[11px] font-semibold uppercase leading-snug tracking-[0.18em] text-teal-700 dark:text-teal-400">
                          {tCat(cat.id)}
                        </h3>
                      </div>

                      <div className="min-w-0 lg:pt-0.5">
                        {isGrouped(cat) ? (
                          <div className={groupGridClass}>
                            {cat.groups.map((g) => (
                              <div
                                key={g.subgroupId}
                                className="min-w-0 border-l border-slate-200/90 pl-4 dark:border-slate-700/80"
                              >
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                  {tGroup(g.subgroupId)}
                                </p>
                                <ul className="mt-3 flex flex-wrap gap-1.5">
                                  {g.items.map((item) => (
                                    <li key={item}>
                                      <TechnologyChip
                                        label={item}
                                        chipClassName={chipBaseClass}
                                        matches={techMatches(item)}
                                        matchedIntro={tooltipIntro}
                                        emptyIntro={t("tooltipEmptyIntro")}
                                        emptyBody={t("tooltipEmptyBody")}
                                        emptyLinks={[...emptyLinks]}
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="flex flex-wrap gap-1.5">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <TechnologyChip
                                  label={item}
                                  chipClassName={chipBaseClass}
                                  matches={techMatches(item)}
                                  matchedIntro={tooltipIntro}
                                  emptyIntro={t("tooltipEmptyIntro")}
                                  emptyBody={t("tooltipEmptyBody")}
                                  emptyLinks={[...emptyLinks]}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
