"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, GraduationCap, TreeDeciduous } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteMeta } from "@/lib/constants";
import {
  educationHistory,
  languageSkills,
  workHistory,
} from "@/lib/work-history-data";
import {
  activeCalendarYears,
  groupWorkByYearDescending,
} from "@/lib/work-history";
import type { WorkHistoryEntry } from "@/lib/types";

function EntryCard({ entry }: { entry: WorkHistoryEntry }) {
  const t = useTranslations("WorkHistory");
  const bullets =
    entry.contributions ?? entry.responsibilities ?? [];
  const extraAccomplishments = entry.accomplishments;

  return (
    <article
      id={`experience-${entry.id}`}
      className="scroll-mt-36 rounded-xl border border-slate-200/90 bg-transparent p-5 shadow-sm dark:border-slate-700"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          {entry.company}
        </h3>
        <span className="font-mono text-xs text-teal-600 dark:text-teal-400">
          {entry.rangeLabel}
        </span>
      </div>
      <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
        {entry.role}
      </p>
      {entry.domain ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {entry.domain}
        </p>
      ) : null}
      {entry.techStack && entry.techStack.length > 0 ? (
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
            {t("techStack")}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {entry.techStack.map((tech) => (
              <li key={tech}>
                <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {entry.teamSize ? (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
          {t("teamSize", { size: entry.teamSize })}
        </p>
      ) : null}
      {bullets.length > 0 ? (
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700/90 dark:text-teal-400/90">
            {entry.contributions
              ? t("keyContributions")
              : t("responsibilities")}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-slate-600 marker:text-teal-500 dark:text-slate-400 dark:marker:text-teal-400">
            {bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {extraAccomplishments && extraAccomplishments.length > 0 ? (
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            {t("accomplishments")}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-slate-600 marker:text-teal-600 dark:text-slate-400 dark:marker:text-teal-500">
            {extraAccomplishments.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export function WorkHistorySection() {
  const t = useTranslations("WorkHistory");
  const grouped = useMemo(() => groupWorkByYearDescending(), []);
  const [openYears, setOpenYears] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggleYear = useCallback((year: number) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  }, []);

  useEffect(() => {
    const applyExperienceHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("experience-")) return;
      const entryId = hash.slice("experience-".length);
      const entry = workHistory.find((e) => e.id === entryId);
      if (!entry) return;
      const years = activeCalendarYears(entry);
      const yearToOpen = Math.max(...years);
      setOpenYears((prev) => {
        const next = new Set(prev);
        next.add(yearToOpen);
        return next;
      });
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 380);
    };

    applyExperienceHash();
    window.addEventListener("hashchange", applyExperienceHash);
    return () => window.removeEventListener("hashchange", applyExperienceHash);
  }, []);

  const expandAll = useCallback(() => {
    setOpenYears(new Set(grouped.map((g) => g.year)));
  }, [grouped]);

  const collapseAll = useCallback(() => setOpenYears(new Set()), []);

  return (
    <section
      id="experience"
      className="border-t border-slate-200/80 py-20 dark:border-slate-800/80 sm:py-24"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 ring-1 ring-teal-500/20 dark:text-teal-300">
              <TreeDeciduous className="size-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h2
                id="experience-heading"
                className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50"
              >
                {t("heading")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("lead", { name: siteMeta.name })}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={expandAll}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-teal-500"
                >
                  {t("expandAll")}
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  {t("collapseAll")}
                </button>
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-500">
                {languageSkills.map((l) => (
                  <li key={l.language}>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {l.language}
                    </span>
                    : {l.level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative mt-14">
          <div
            className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-teal-400/50 via-slate-300 to-transparent dark:from-teal-500/40 dark:via-slate-700"
            aria-hidden
          />
          <ol className="relative space-y-2">
            {grouped.map(({ year, entries }, idx) => {
              const isOpen = openYears.has(year);
              const panelId = `${baseId}-year-${year}`;
              return (
                <ScrollReveal key={year} delay={0.04 * Math.min(idx, 8)}>
                  <li className="relative pl-10">
                    <span
                      className="absolute left-[10px] top-5 size-3 rounded-full border-2 border-white bg-teal-500 shadow dark:border-slate-950 dark:bg-teal-400"
                      aria-hidden
                    />
                    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800">
                      <button
                        type="button"
                        id={`${panelId}-trigger`}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleYear(year)}
                        className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left transition hover:bg-slate-100/60 dark:hover:bg-slate-800/40 sm:px-5"
                      >
                        <span className="flex items-center gap-3">
                          <motion.span
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex text-teal-600 dark:text-teal-400"
                          >
                            <ChevronRight className="size-5" aria-hidden />
                          </motion.span>
                          <span className="text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                            {year}
                          </span>
                          <span className="rounded-full bg-teal-500/15 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:text-teal-200">
                            {entries.length}{" "}
                            {entries.length === 1 ? t("role") : t("roles")}
                          </span>
                        </span>
                        <span className="hidden text-xs text-slate-500 sm:inline dark:text-slate-500">
                          {isOpen ? t("hideDetail") : t("showDetail")}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            key={`panel-${year}`}
                            id={panelId}
                            role="region"
                            aria-labelledby={`${panelId}-trigger`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden border-t border-slate-200/80 dark:border-slate-800"
                          >
                            <div className="space-y-4 p-4 sm:p-5">
                              {entries.map((entry) => (
                                <EntryCard key={entry.id} entry={entry} />
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>

        <ScrollReveal className="mt-16">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-400">
              <GraduationCap className="size-5" aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t("education")}
            </h3>
          </div>
          <ul className="mt-6 space-y-4">
            {educationHistory.map((ed) => (
              <li
                key={ed.id}
                className="rounded-xl border border-slate-200/90 bg-transparent p-4 dark:border-slate-800"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {ed.institution}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {ed.rangeLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {ed.field} · {ed.degree}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{ed.location}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
