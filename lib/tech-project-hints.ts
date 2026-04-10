import { courseworkRegistry, personalProjectRegistry } from "./constants";
import { workHistory } from "./work-history-data";

export type TechProjectSource = {
  /** Shown in the tooltip (company, coursework title, or project title) */
  label: string;
  stack: string[];
};

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Text before the first `(` — the main name for a chip or stack line */
function primaryName(s: string): string {
  const idx = s.indexOf("(");
  const base = idx === -1 ? s : s.slice(0, idx);
  return norm(base);
}

/** Tokens inside parentheses, split on comma/slash for compound lists */
function parenTokens(stackEntry: string): string[] {
  const out: string[] = [];
  for (const m of stackEntry.matchAll(/\(([^)]+)\)/g)) {
    for (const part of m[1].split(/[,/]/)) {
      const t = norm(part.trim());
      if (t) out.push(t);
    }
  }
  return out;
}

/**
 * Whether a stack line from CV/coursework matches a technology chip label
 * shown in the Technologies section.
 */
export function stackEntryMatchesChip(
  chipLabel: string,
  stackEntry: string
): boolean {
  const cFull = norm(chipLabel);
  const sFull = norm(stackEntry);
  if (cFull === sFull) return true;

  const cPri = primaryName(chipLabel);
  const sPri = primaryName(stackEntry);
  if (cPri && sPri && cPri === sPri) return true;
  if (cPri && sFull === cPri) return true;
  if (sPri && cFull === sPri) return true;

  if (cPri && (sFull.startsWith(cPri + " (") || sFull.startsWith(cPri + " —")))
    return true;

  const segments = cFull
    .split(/\s*[/&]\s*/)
    .map((seg) => seg.split("(")[0].trim())
    .filter(Boolean);
  if (segments.length > 1) {
    for (const seg of segments) {
      if (!seg) continue;
      if (sFull === seg || sPri === seg || sFull.startsWith(seg + " ("))
        return true;
    }
  }

  if (cPri.length >= 3) {
    for (const t of parenTokens(stackEntry)) {
      if (t === cPri) return true;
      if (t.split(/\s+/).includes(cPri)) return true;
    }
  }

  if (cFull.includes("oauth") && sFull.includes("oauth")) return true;
  if (cFull.includes("jwt") && sFull.includes("jwt")) return true;

  if (cPri.startsWith("websocket") && sPri.startsWith("websocket"))
    return true;

  if (cPri.startsWith("aws") && sFull === "aws") return true;
  if (sFull === "aws" && cPri.startsWith("aws")) return true;

  if (cPri === "sql") {
    return sFull === "sql" || sPri === "sql";
  }

  return false;
}

export function buildTechProjectSources(options: {
  courseworkTitle: (slug: string) => string;
  personalTitle: (id: string) => string;
}): TechProjectSource[] {
  const fromWork: TechProjectSource[] = workHistory.map((w) => ({
    label: w.company,
    stack: w.techStack ?? [],
  }));

  const fromCoursework: TechProjectSource[] = courseworkRegistry.map((c) => ({
    label: options.courseworkTitle(c.slug),
    stack: c.techStack,
  }));

  const fromPersonal: TechProjectSource[] = personalProjectRegistry.map(
    (p) => ({
      label: options.personalTitle(p.id),
      stack: p.stack ?? [],
    })
  );

  return [...fromWork, ...fromCoursework, ...fromPersonal];
}

export function findExampleProjectLabel(
  techDisplayLabel: string,
  sources: TechProjectSource[]
): string | undefined {
  for (const src of sources) {
    for (const stackEntry of src.stack) {
      if (stackEntryMatchesChip(techDisplayLabel, stackEntry)) {
        return src.label;
      }
    }
  }
  return undefined;
}
