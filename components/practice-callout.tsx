import { Terminal } from "lucide-react";
import type { ReactNode } from "react";

type PracticeCalloutProps = {
  title: string;
  children: ReactNode;
};

export function PracticeCallout({ title, children }: PracticeCalloutProps) {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-indigo-500/10 p-6 dark:from-emerald-500/10 dark:via-slate-950/60 dark:to-indigo-500/10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div className="relative flex gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30 dark:text-emerald-400">
          <Terminal className="size-5" aria-hidden />
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400/90">
            Practice first
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {title}
          </h3>
          <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
