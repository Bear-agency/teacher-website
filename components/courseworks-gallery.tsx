import { ArrowUpRight, Layers } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { getAllCourseworks } from "@/lib/courseworks";

export async function CourseworksGallery() {
  const t = await getTranslations("Courseworks");
  const projects = await getAllCourseworks();

  return (
    <section
      id="courseworks"
      className="border-t border-slate-200/80 py-20 dark:border-slate-800/80 sm:py-24"
      aria-labelledby="courseworks-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="courseworks-heading"
                className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                {t("heading")}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("lead")}
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={0.07 * i}>
              <li>
                <Link
                  href={`/courseworks/${project.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-transparent p-6 shadow-sm transition hover:border-indigo-400/50 hover:shadow-md dark:border-slate-800 dark:hover:border-indigo-500/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-400">
                      <Layers className="size-5" aria-hidden />
                    </div>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {project.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {t("openDeepDive")}
                    <span className="ml-1 transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
