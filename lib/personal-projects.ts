import { getTranslations } from "next-intl/server";
import { personalProjectRegistry } from "./constants";
import type { PersonalProject } from "./types";

export async function getPersonalProjects(): Promise<PersonalProject[]> {
  const t = await getTranslations("Projects");
  return personalProjectRegistry.map((p) => ({
    id: p.id,
    href: p.href,
    linkLabel: p.linkLabel,
    stack: p.stack,
    title: t(`items.${p.id}.title`),
    description: t(`items.${p.id}.description`),
  }));
}
