"use client";

import { useEffect } from "react";

/** Scrolls to `#project-{id}` when present (e.g. from technology tooltips). */
export function ProjectHashScroll() {
  useEffect(() => {
    const run = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("project-")) return;
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 120);
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);
  return null;
}
