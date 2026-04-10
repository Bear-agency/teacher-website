import { getTranslations } from "next-intl/server";
import { courseworkRegistry } from "./constants";
import type { Coursework } from "./types";

export function getAllCourseworkSlugs(): string[] {
  return courseworkRegistry.map((c) => c.slug);
}

export async function getCourseworkBySlug(
  slug: string
): Promise<Coursework | undefined> {
  const base = courseworkRegistry.find((c) => c.slug === slug);
  if (!base) return undefined;

  const t = await getTranslations("Courseworks");
  const p = `items.${slug}`;

  return {
    slug: base.slug,
    title: t(`${p}.title`),
    tagline: t(`${p}.tagline`),
    excerpt: t(`${p}.excerpt`),
    overview: t(`${p}.overview`),
    techStack: base.techStack,
    learningObjectives: t.raw(`${p}.objectives`) as string[],
    githubUrl: base.githubUrl,
    practiceFirst: {
      title: t(`${p}.practiceTitle`),
      prompt: t(`${p}.practicePrompt`),
    },
    codeExample: base.codeExample,
  };
}

export async function getAllCourseworks(): Promise<Coursework[]> {
  const out: Coursework[] = [];
  for (const slug of getAllCourseworkSlugs()) {
    const c = await getCourseworkBySlug(slug);
    if (c) out.push(c);
  }
  return out;
}
