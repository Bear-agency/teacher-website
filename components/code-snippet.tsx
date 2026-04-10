"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CodeSnippetProps = {
  filename?: string;
  code: string;
  label?: string;
};

export function CodeSnippet({
  filename,
  code,
  label = "Practice-first snippet",
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-950 shadow-lg shadow-indigo-950/20 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/50 px-4 py-2.5">
        <div className="flex min-w-0 flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            {label}
          </span>
          {filename ? (
            <span className="truncate font-mono text-xs text-slate-400">
              {filename}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-indigo-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="max-h-[min(420px,55vh)] overflow-auto p-4 text-[13px] leading-relaxed text-slate-100">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
