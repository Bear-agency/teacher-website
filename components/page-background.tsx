/**
 * Full-viewport decorative layer behind all page content.
 */
export function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_-35%,rgba(99,102,241,0.2),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(16,185,129,0.14),transparent_50%),radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(99,102,241,0.12),transparent_45%)] dark:bg-[radial-gradient(ellipse_120%_90%_at_50%_-35%,rgba(99,102,241,0.28),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(16,185,129,0.16),transparent_50%),radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(129,140,248,0.14),transparent_45%)]" />
    </div>
  );
}
