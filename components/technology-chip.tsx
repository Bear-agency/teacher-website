"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type {
  TechTooltipMatch,
  TechTooltipSectionLink,
} from "@/lib/tech-project-hints";

function TooltipNavLink({
  href,
  className,
  children,
}: {
  href: { pathname: string; hash?: string };
  className: string;
  children: ReactNode;
}) {
  const locale = useLocale();
  if (href.pathname === "/" && href.hash) {
    return (
      <a href={`/${locale}#${href.hash}`} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link prefetch={false} href={href} className={className}>
      {children}
    </Link>
  );
}

type TechnologyChipProps = {
  label: string;
  chipClassName: string;
  matches: TechTooltipMatch[];
  /** Heading when at least one project row matches */
  matchedIntro: string;
  /** Heading when nothing matched the site data */
  emptyIntro: string;
  emptyBody: string;
  emptyLinks: TechTooltipSectionLink[];
};

const linkClass =
  "inline-flex text-[11px] font-medium text-teal-700 underline decoration-teal-700/30 underline-offset-2 transition hover:decoration-teal-600 dark:text-teal-400 dark:decoration-teal-400/40 dark:hover:text-teal-300";

/**
 * Hover-only panel for every technology chip: matched projects with links, or fallback section links.
 */
export function TechnologyChip({
  label,
  chipClassName,
  matches,
  matchedIntro,
  emptyIntro,
  emptyBody,
  emptyLinks,
}: TechnologyChipProps) {
  const hasMatches = matches.length > 0;

  return (
    <span className="group/chip relative z-0 inline-flex w-max max-w-full hover:z-[80]">
      <span className={`${chipClassName} cursor-help select-none`}>{label}</span>
      <div
        className="pointer-events-none absolute left-1/2 top-full z-[200] flex w-max max-w-[min(22rem,calc(100vw-1.25rem))] -translate-x-1/2 flex-col items-stretch opacity-0 transition-opacity duration-150 group-hover/chip:pointer-events-auto group-hover/chip:opacity-100"
      >
        <div className="h-2.5 shrink-0" aria-hidden />
        <div
          role="tooltip"
          className="rounded-xl border border-stone-200/95 bg-white px-3 py-3 text-left shadow-xl shadow-stone-900/15 ring-1 ring-black/[0.04] dark:border-stone-600/90 dark:bg-stone-900 dark:shadow-black/50 dark:ring-white/[0.06]"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-[0.06em] text-stone-500 dark:text-stone-400">
            {hasMatches ? matchedIntro : emptyIntro}
          </span>

          {hasMatches ? (
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
                  <TooltipNavLink href={m.href} className={`mt-2 ${linkClass}`}>
                    {m.linkLabel}
                  </TooltipNavLink>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-2 space-y-2">
              <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
                {emptyBody}
              </p>
              <ul className="flex flex-col gap-1.5">
                {emptyLinks.map((l) => (
                  <li key={l.label}>
                    <TooltipNavLink href={l.href} className={linkClass}>
                      {l.label}
                    </TooltipNavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </span>
  );
}
