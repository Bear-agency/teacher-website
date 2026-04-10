import { ExternalLink, FolderCode } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getPersonalProjects } from "@/lib/personal-projects";

export async function PersonalProjectsSection() {
  const t = await getTranslations("Projects");
  const personalProjects = await getPersonalProjects();

  return (
    <section
      id="projects"
      className="border-t border-slate-200/80 py-20 dark:border-slate-800/80 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 ring-1 ring-teal-500/25 dark:text-teal-400">
              <FolderCode className="size-6" aria-hidden />
            </div>
            <div>
              <h2
                id="projects-heading"
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

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {personalProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={0.06 * i}>
              <li>
                <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-transparent p-6 shadow-sm dark:border-slate-800">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                  {project.stack && project.stack.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((s) => (
                        <li key={s}>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 transition hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    {project.linkLabel}
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </article>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
