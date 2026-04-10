/** Section anchors on the home page — labels come from `Nav.*` messages */
export const PAGE_SECTION_ITEMS = [
  { sectionId: "top", hash: "top" },
  { sectionId: "technologies", hash: "technologies" },
  { sectionId: "subjects", hash: "subjects" },
  { sectionId: "courseworks", hash: "courseworks" },
  { sectionId: "projects", hash: "projects" },
  { sectionId: "experience", hash: "experience" },
] as const;

export type PageSectionId = (typeof PAGE_SECTION_ITEMS)[number]["sectionId"];
