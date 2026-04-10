"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { PAGE_SECTION_ITEMS, type PageSectionId } from "@/lib/page-nav";

type Props = {
  children: ReactNode;
};

function pickActiveSection(
  entries: IntersectionObserverEntry[]
): string | null {
  const visible = entries.filter((e) => e.isIntersecting);
  if (visible.length === 0) return null;
  return visible.reduce((best, e) =>
    e.intersectionRatio > best.intersectionRatio ? e : best
  ).target.getAttribute("data-page-section");
}

const navLinkBase =
  "block rounded-lg px-3 py-2 text-left text-[13px] leading-snug transition";

function SectionContextPanelBody({
  activeId,
  onNavigate,
  idPrefix,
}: {
  activeId: string;
  onNavigate?: () => void;
  idPrefix: string;
}) {
  const tCtx = useTranslations("SectionContext");
  const tNav = useTranslations("Nav");
  const tSidebar = useTranslations("Sidebar");

  const sectionIds = PAGE_SECTION_ITEMS.map((i) => i.sectionId);
  const safeKey = sectionIds.includes(activeId as PageSectionId)
    ? (activeId as PageSectionId)
    : "top";

  const title = tCtx(`${safeKey}.title`);
  const body = tCtx(`${safeKey}.body`);

  return (
    <>
      <div className="shrink-0 border-b border-slate-200/80 p-6 dark:border-slate-800/80">
        <p
          id={`${idPrefix}-heading`}
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400"
        >
          {tSidebar("thisSection")}
        </p>
        <div className="mt-3 border-l-2 border-indigo-500/45 pl-4 dark:border-indigo-400/40">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <nav
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5"
        aria-labelledby={`${idPrefix}-nav-label`}
      >
        <p
          id={`${idPrefix}-nav-label`}
          className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500"
        >
          {tSidebar("allSections")}
        </p>
        <ul className="mt-3 space-y-0.5">
          {PAGE_SECTION_ITEMS.map((item) => {
            const isActive = activeId === item.sectionId;
            return (
              <li key={item.sectionId}>
                <Link
                  href={{ pathname: "/", hash: item.hash }}
                  onClick={onNavigate}
                  className={`${navLinkBase} ${
                    isActive
                      ? "bg-indigo-500/15 font-medium text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {tNav(item.sectionId)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

/**
 * Desktop: fixed left panel. Small screens: burger opens the same content in a drawer.
 */
export function SectionContextSidebar({ children }: Props) {
  const tSidebar = useTranslations("Sidebar");
  const [activeId, setActiveId] = useState<string>("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<Map<Element, IntersectionObserverEntry>>(new Map());
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const flush = useCallback(() => {
    const map = entriesRef.current;
    const list = [...map.values()];
    const id = pickActiveSection(list);
    if (id) setActiveId(id);
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const sections = root.querySelectorAll("[data-page-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entriesRef.current.set(entry.target, entry);
        }
        flush();
      },
      {
        threshold: [0, 0.08, 0.15, 0.25, 0.4, 0.6, 0.85, 1],
        rootMargin: "-12% 0px -12% 0px",
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [flush]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-[60] flex size-12 items-center justify-center rounded-xl border border-slate-200/90 bg-white/95 text-slate-800 shadow-lg shadow-slate-900/10 backdrop-blur-md transition hover:border-indigo-300 hover:text-indigo-700 lg:hidden dark:border-slate-700/90 dark:bg-slate-950/95 dark:text-slate-100 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
        aria-label={tSidebar("openMenu")}
        aria-expanded={menuOpen}
        aria-controls="mobile-section-drawer"
      >
        <Menu className="size-6" aria-hidden />
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-slate-950/55 backdrop-blur-[2px] lg:hidden"
              aria-label={tSidebar("closeMenu")}
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-section-drawer"
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-drawer-title"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 z-[56] flex h-dvh w-[min(22rem,calc(100vw-2.5rem))] max-w-[calc(100vw-2.5rem)] flex-col border-r border-slate-200/90 bg-white/98 shadow-2xl shadow-slate-900/20 backdrop-blur-md dark:border-slate-700/90 dark:bg-slate-950/98 dark:shadow-black/50 lg:hidden"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] dark:border-slate-800/80">
                <span
                  id="mobile-drawer-title"
                  className="text-sm font-semibold text-slate-900 dark:text-white"
                >
                  {tSidebar("drawerTitle")}
                </span>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-transparent text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label={tSidebar("closeMenu")}
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <SectionContextPanelBody
                  activeId={activeId}
                  onNavigate={closeMenu}
                  idPrefix="mobile"
                />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <aside
        className="fixed left-6 top-28 z-40 hidden w-72 lg:block"
        aria-label="Section context and page sections"
        aria-live="polite"
      >
        <div className="flex max-h-[calc(100dvh-7.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-lg shadow-slate-900/10 backdrop-blur-md dark:border-slate-700/90 dark:bg-slate-950/90 dark:shadow-black/35">
          <SectionContextPanelBody activeId={activeId} idPrefix="desktop" />
        </div>
      </aside>

      <div ref={contentRef} className="relative z-10 min-w-0">
        {children}
      </div>
    </>
  );
}
