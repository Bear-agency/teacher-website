import { courseworkRegistry, personalProjectRegistry } from "./constants";
import { workHistory } from "./work-history-data";

export type TechTooltipKind = "work" | "coursework" | "personal";

export type RichTechSource = {
  kind: TechTooltipKind;
  id: string;
  title: string;
  description: string;
  stack: string[];
};

/** Serializable for passing from Server → Client Component */
export type TechTooltipMatch = {
  key: string;
  kind: TechTooltipKind;
  title: string;
  description: string;
  href: { pathname: string; hash?: string };
  linkLabel: string;
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

export function buildRichTechProjectSources(options: {
  coursework: (slug: string) => { title: string; excerpt: string };
  personal: (id: string) => { title: string; description: string };
}): RichTechSource[] {
  const fromWork: RichTechSource[] = workHistory.map((w) => ({
    kind: "work",
    id: w.id,
    title: w.company,
    description: (w.domain ?? w.role).trim(),
    stack: w.techStack ?? [],
  }));

  const fromCoursework: RichTechSource[] = courseworkRegistry.map((c) => {
    const meta = options.coursework(c.slug);
    return {
      kind: "coursework",
      id: c.slug,
      title: meta.title,
      description: meta.excerpt.trim(),
      stack: c.techStack,
    };
  });

  const fromPersonal: RichTechSource[] = personalProjectRegistry.map((p) => {
    const meta = options.personal(p.id);
    return {
      kind: "personal",
      id: p.id,
      title: meta.title,
      description: meta.description.trim(),
      stack: p.stack ?? [],
    };
  });

  return [...fromWork, ...fromCoursework, ...fromPersonal];
}

const DESC_MAX = 240;

function clipDescription(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= DESC_MAX) return t;
  return `${t.slice(0, DESC_MAX - 1)}…`;
}

export function findMatchingTechTooltips(
  techDisplayLabel: string,
  sources: RichTechSource[],
  linkLabels: { work: string; coursework: string; personal: string }
): TechTooltipMatch[] {
  const seen = new Set<string>();
  const out: TechTooltipMatch[] = [];

  for (const src of sources) {
    const matched = src.stack.some((entry) =>
      stackEntryMatchesChip(techDisplayLabel, entry)
    );
    if (!matched) continue;

    const key = `${src.kind}:${src.id}`;
    if (seen.has(key)) continue;
    seen.add(key);

    let href: { pathname: string; hash?: string };
    if (src.kind === "work") {
      href = { pathname: "/", hash: `experience-${src.id}` };
    } else if (src.kind === "coursework") {
      href = { pathname: `/courseworks/${src.id}` };
    } else {
      href = { pathname: "/", hash: `project-${src.id}` };
    }

    const linkLabel =
      src.kind === "work"
        ? linkLabels.work
        : src.kind === "coursework"
          ? linkLabels.coursework
          : linkLabels.personal;

    out.push({
      key,
      kind: src.kind,
      title: src.title,
      description: clipDescription(src.description),
      href,
      linkLabel,
    });
  }

  return out;
}
