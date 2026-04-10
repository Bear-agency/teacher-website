"use client";

import { useId } from "react";

type TechnologyChipProps = {
  label: string;
  chipClassName: string;
  /** Distinct project / employer / coursework names */
  projects: string[];
  /** Short heading above the list, e.g. “Used in” */
  intro: string;
};

/**
 * Tech tag with a hover/focus panel listing projects where the stack appears.
 * Client component so the panel is not blocked by `transform` (ScrollReveal) or native `title` quirks.
 */
export function TechnologyChip({
  label,
  chipClassName,
  projects,
  intro,
}: TechnologyChipProps) {
  const tipId = useId();

  if (projects.length === 0) {
    return <span className={chipClassName}>{label}</span>;
  }

  return (
    <span className="group/chip relative z-0 inline-flex hover:z-[80] focus-within:z-[80]">
      <span
        className={`${chipClassName} cursor-help`}
        tabIndex={0}
        aria-describedby={tipId}
      >
        {label}
      </span>
      <span
        role="tooltip"
        id={tipId}
        className="pointer-events-none absolute bottom-full left-1/2 z-[200] mb-2 w-max max-w-[min(288px,calc(100vw-1.5rem))] -translate-x-1/2 translate-y-1 rounded-lg border border-stone-200/95 bg-white px-3 py-2.5 text-left text-[11px] leading-snug text-stone-700 opacity-0 shadow-lg shadow-stone-900/10 ring-1 ring-black/[0.04] transition-[opacity,transform] duration-150 group-hover/chip:translate-y-0 group-hover/chip:opacity-100 group-focus-within/chip:translate-y-0 group-focus-within/chip:opacity-100 dark:border-stone-600/90 dark:bg-stone-900 dark:text-stone-200 dark:shadow-black/40 dark:ring-white/[0.06]"
      >
        <span className="block font-semibold text-stone-800 dark:text-stone-100">
          {intro}
        </span>
        <ul className="mt-2 max-h-48 list-disc space-y-0.5 overflow-y-auto overscroll-contain pl-3.5 text-stone-600 marker:text-teal-600 dark:text-stone-400 dark:marker:text-teal-500">
          {projects.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </span>
    </span>
  );
}
