import { ArrowLeft, Github } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CodeSnippet } from "@/components/code-snippet";
import { OverviewBody } from "@/components/overview-body";
import { PracticeCallout } from "@/components/practice-callout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { getAllCourseworkSlugs, getCourseworkBySlug } from "@/lib/courseworks";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getAllCourseworkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await getCourseworkBySlug(slug);
  if (!project) return { title: "Coursework" };
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("courseworkTitle", { title: project.title }),
    description: project.excerpt,
  };
}

export default async function CourseworkPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CourseworkPage");
  const project = await getCourseworkBySlug(slug);
  if (!project) notFound();

  return (
    <main className="flex-1 pb-28 pt-10 sm:pt-14">
      <article className="mx-auto max-w-5xl px-6 sm:px-8">
        <ScrollReveal>
          <Link
            href={{ pathname: "/", hash: "courseworks" }}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
            {t("label")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {project.title}
          </h1>
          <p className="mt-2 text-base text-indigo-800/90 dark:text-indigo-300/90">
            {project.tagline}
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-14">
          <ScrollReveal>
            <section aria-labelledby="overview-heading">
              <h2
                id="overview-heading"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                {t("overview")}
              </h2>
              <div className="mt-4">
                <OverviewBody text={project.overview} />
              </div>
            </section>
          </ScrollReveal>

          {project.practiceFirst ? (
            <ScrollReveal delay={0.05}>
              <PracticeCallout title={project.practiceFirst.title}>
                {project.practiceFirst.prompt}
              </PracticeCallout>
            </ScrollReveal>
          ) : null}

          {project.codeExample ? (
            <ScrollReveal delay={0.06}>
              <CodeSnippet
                filename={project.codeExample.filename}
                code={project.codeExample.code}
              />
            </ScrollReveal>
          ) : null}

          <ScrollReveal>
            <section aria-labelledby="stack-heading">
              <h2
                id="stack-heading"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                {t("stack")}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li key={tech}>
                    <span className="inline-flex rounded-lg border border-slate-200/90 bg-transparent px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <section aria-labelledby="objectives-heading">
              <h2
                id="objectives-heading"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                {t("objectives")}
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-indigo-600 dark:text-slate-400 dark:marker:text-indigo-400">
                {project.learningObjectives.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ol>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-auto dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              <Github className="size-[18px]" aria-hidden />
              {t("github")}
            </a>
          </ScrollReveal>
        </div>
      </article>
    </main>
  );
}
