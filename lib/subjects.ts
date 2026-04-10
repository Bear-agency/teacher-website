import { getTranslations } from "next-intl/server";
import { subjectRegistry } from "./constants";
import type { Subject } from "./types";

export function getAllSubjectSlugs(): string[] {
  return subjectRegistry.map((s) => s.id);
}

export async function getSubjectBySlug(slug: string): Promise<Subject | undefined> {
  const base = subjectRegistry.find((s) => s.id === slug);
  if (!base) return undefined;

  const t = await getTranslations("Subjects.detail");
  const p = slug;

  return {
    id: base.id,
    icon: base.icon,
    title: t(`${p}.title`),
    summary: t(`${p}.summary`),
    overview: t(`${p}.overview`),
    highlights: t.raw(`${p}.highlights`) as string[],
    outcomes: t.raw(`${p}.outcomes`) as string[],
  };
}

export async function getAllSubjects(): Promise<Subject[]> {
  const out: Subject[] = [];
  for (const id of getAllSubjectSlugs()) {
    const s = await getSubjectBySlug(id);
    if (s) out.push(s);
  }
  return out;
}
