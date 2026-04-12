"use client";

import { useId } from "react";
import { Link } from "@/i18n/navigation";
import type { TechTooltipMatch } from "@/lib/tech-project-hints";

type TechnologyChipProps = {
  label: string;
  chipClassName: string;
  matches: TechTooltipMatch[];
  /** Heading above the list, e.g. “Used in:” */
  intro: string;
};

/**
 * Tech tag with a hover/focus panel: where it was used, short blurb, link to that place on the site.
 * Chip + bridge + panel share one `group` hover zone so the pointer can reach links without the menu closing.
 */
export function TechnologyChip({
  label,
  chipClassName,
  matches,
  intro,
}: TechnologyChipProps) {
  const tipId = useId();

  if (matches.length === 0) {
    return <span className={chipClassName}>{label}</span>;
  }

  return (
    <span className="group/chip relative z-0 inline-flex w-max max-w-full hover:z-[80] focus-within:z-[80]">
      <span
        className={`${chipClassName} cursor-help`}
        tabIndex={0}
        aria-describedby={tipId}
      >
        {label}
      </span>
      {/* Column under chip: invisible bridge (no gap) + panel — all inside group so hover is preserved */}
      <div
        className="pointer-events-none absolute left-1/2 top-full z-[200] flex w-max max-w-[min(22rem,calc(100vw-1.25rem))] -translate-x-1/2 flex-col items-stretch opacity-0 transition-opacity duration-150 group-hover/chip:pointer-events-auto group-hover/chip:opacity-100 group-focus-within/chip:pointer-events-auto group-focus-within/chip:opacity-100"
      >
        <div className="h-2.5 shrink-0" aria-hidden />
        <div
          role="tooltip"
          id={tipId}
          className="rounded-xl border border-stone-200/95 bg-white px-3 py-3 text-left shadow-xl shadow-stone-900/15 ring-1 ring-black/[0.04] dark:border-stone-600/90 dark:bg-stone-900 dark:shadow-black/50 dark:ring-white/[0.06]"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-[0.06em] text-stone-500 dark:text-stone-400">
            {intro}
          </span>
          <ul className="mt-2 max-h-56 space-y-3 overflow-y-auto overscroll-contain pr-0.5">
            {matches.map((m) => (
              <li
                key={m.key}
                className="border-b border-stone-100 pb-3 last:border-0 last:pb-0 dark:border-stone-700/80"
              >
                <p className="text-[12px] font-semibold leading-snug text-stone-900 dark:text-stone-100">
                  {m.title}
                </p>
                <p className="mt-1 line-clamp-4 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
                  {m.description}
                </p>
                <Link
                  prefetch={false}
                  href={m.href}
                  className="mt-2 inline-flex text-[11px] font-medium text-teal-700 underline decoration-teal-700/30 underline-offset-2 transition hover:decoration-teal-600 dark:text-teal-400 dark:decoration-teal-400/40 dark:hover:text-teal-300"
                >
                  {m.linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </span>
  );
}
