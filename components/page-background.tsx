/**
 * Full-viewport decorative layer — soft paper tone, minimal tint (no loud gradients).
 */
export function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#f0ebe3] dark:bg-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(13,148,136,0.07),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(120,113,108,0.06),transparent_45%)] dark:bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(45,212,191,0.06),transparent_55%),radial-gradient(ellipse_70%_45%_at_0%_100%,rgba(68,64,60,0.35),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.35] dark:opacity-[0.12] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
