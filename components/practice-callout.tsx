import { Terminal } from "lucide-react";
import type { ReactNode } from "react";

type PracticeCalloutProps = {
  title: string;
  children: ReactNode;
};

export function PracticeCallout({ title, children }: PracticeCalloutProps) {
  return (
    <aside className="rounded-2xl border border-stone-200/90 bg-stone-50/80 p-6 dark:border-stone-700/90 dark:bg-stone-900/40">
      <div className="flex gap-4 border-l-2 border-teal-600/70 pl-4 dark:border-teal-500/50">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-600/10 text-teal-800 ring-1 ring-teal-600/20 dark:text-teal-300">
          <Terminal className="size-5" aria-hidden />
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-800 dark:text-teal-400/95">
            Practice first
          </p>
          <h3 className="font-serif text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            {title}
          </h3>
          <div className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
