/**
 * Domain types for site content.
 * Data lives in `constants.ts`; keep types here for a thin domain boundary.
 */

export type Subject = {
  id: string;
  title: string;
  summary: string;
  icon: "algorithms" | "data-structures" | "databases";
  /** Longer narrative for `/subjects/[id]`; use `**text**` for emphasis */
  overview: string;
  /** Bullet themes / modules */
  highlights: string[];
  /** Optional learning outcomes list */
  outcomes?: string[];
};

/** One labeled cluster inside a technology row (see `TechnologyCategoryGrouped`). */
export type TechnologySubgroup = {
  subgroupId: string;
  items: string[];
};

/** Single flat list of tags */
export type TechnologyCategoryFlat = {
  id: string;
  items: string[];
};

/** Row with labeled sub-columns (e.g. UI vs APIs) */
export type TechnologyCategoryGrouped = {
  id: string;
  groups: TechnologySubgroup[];
};

export type TechnologyCategoryEntry =
  | TechnologyCategoryFlat
  | TechnologyCategoryGrouped;

/** Month 1–12, inclusive ranges for year grouping */
export type YearMonth = {
  year: number;
  month: number;
};

export type WorkHistoryEntry = {
  id: string;
  company: string;
  role: string;
  /** Human-readable range from CV */
  rangeLabel: string;
  start: YearMonth;
  end: YearMonth;
  domain?: string;
  techStack?: string[];
  teamSize?: string;
  contributions?: string[];
  responsibilities?: string[];
  accomplishments?: string[];
};

export type EducationEntry = {
  id: string;
  institution: string;
  location: string;
  field: string;
  degree: string;
  rangeLabel: string;
};

export type PersonalProject = {
  id: string;
  title: string;
  description: string;
  href: string;
  /** e.g. "GitHub", "Live demo" */
  linkLabel: string;
  stack?: string[];
};

export type Coursework = {
  slug: string;
  title: string;
  tagline: string;
  /** Short blurb for gallery cards */
  excerpt: string;
  /** Long-form overview for detail page */
  overview: string;
  techStack: string[];
  learningObjectives: string[];
  githubUrl: string;
  /** Optional flipped-learning practice hook */
  practiceFirst?: {
    title: string;
    prompt: string;
  };
  /** Optional snippet shown on detail page */
  codeExample?: {
    filename: string;
    code: string;
  };
};
