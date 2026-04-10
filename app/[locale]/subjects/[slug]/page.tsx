import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { OverviewBody } from "@/components/overview-body";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { siteMeta } from "@/lib/constants";
import { getAllSubjectSlugs, getSubjectBySlug } from "@/lib/subjects";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getAllSubjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const subject = await getSubjectBySlug(slug);
  if (!subject) return { title: "Subject" };
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("subjectTitle", { title: subject.title }),
    description: subject.summary,
  };
}

export default async function SubjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubjectPage");
  const subject = await getSubjectBySlug(slug);
  if (!subject) notFound();

  return (
    <main className="flex-1 pb-28 pt-10 sm:pt-14">
      <article className="mx-auto max-w-5xl px-6 sm:px-8">
        <ScrollReveal>
          <Link
            href={{ pathname: "/", hash: "subjects" }}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
            {t("eyebrow", { name: siteMeta.name })}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {subject.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {subject.summary}
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-12">
          <ScrollReveal>
            <section aria-labelledby="subject-overview-heading">
              <h2
                id="subject-overview-heading"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                {t("overview")}
              </h2>
              <div className="mt-4">
                <OverviewBody text={subject.overview} />
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <section aria-labelledby="subject-highlights-heading">
              <h2
                id="subject-highlights-heading"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                {t("topics")}
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-indigo-600 dark:text-slate-400 dark:marker:text-indigo-400">
                {subject.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          {subject.outcomes && subject.outcomes.length > 0 ? (
            <ScrollReveal delay={0.06}>
              <section aria-labelledby="subject-outcomes-heading">
                <h2
                  id="subject-outcomes-heading"
                  className="text-lg font-semibold text-slate-900 dark:text-white"
                >
                  {t("outcomes")}
                </h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-emerald-600 dark:text-slate-400 dark:marker:text-emerald-500">
                  {subject.outcomes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </section>
            </ScrollReveal>
          ) : null}
        </div>
      </article>
    </main>
  );
}
