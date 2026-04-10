import { ArrowUpRight, Binary, Database, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { getAllSubjects } from "@/lib/subjects";
import type { Subject } from "@/lib/types";

const iconMap: Record<Subject["icon"], LucideIcon> = {
  algorithms: Binary,
  "data-structures": Share2,
  databases: Database,
};

export async function SubjectsSection() {
  const t = await getTranslations("Subjects");
  const subjects = await getAllSubjects();

  return (
    <section
      id="subjects"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24"
      aria-labelledby="subjects-heading"
    >
      <ScrollReveal>
        <h2
          id="subjects-heading"
          className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50"
        >
          {t("heading")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {t("lead")}
        </p>
      </ScrollReveal>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, i) => {
          const Icon = iconMap[subject.icon];
          return (
            <ScrollReveal key={subject.id} delay={0.06 * i}>
              <li>
                <Link
                  href={`/subjects/${subject.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-transparent p-6 shadow-sm transition hover:border-teal-300/60 hover:shadow-md dark:border-slate-800 dark:hover:border-teal-500/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 ring-1 ring-teal-500/20 dark:text-teal-300">
                      <Icon className="size-6" aria-hidden />
                    </div>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    {subject.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {subject.summary}
                  </p>
                  <span className="mt-5 text-sm font-medium text-teal-600 dark:text-teal-400">
                    {t("viewCta")}
                    <span className="ml-1 transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            </ScrollReveal>
          );
        })}
      </ul>
    </section>
  );
}
