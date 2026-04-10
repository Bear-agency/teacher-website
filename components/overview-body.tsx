import type { ReactNode } from "react";

function emphasize(text: string): ReactNode[] {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong
        key={i}
        className="font-semibold text-slate-900 dark:text-slate-100"
      >
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function OverviewBody({ text }: { text: string }) {
  const paragraphs = text.trim().split(/\n\n+/);
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
      {paragraphs.map((p, i) => (
        <p key={i}>{emphasize(p)}</p>
      ))}
    </div>
  );
}
