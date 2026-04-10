import { workHistory } from "./work-history-data";
import type { WorkHistoryEntry } from "./types";

/** Calendar years touched by [start, end], inclusive */
export function activeCalendarYears(entry: WorkHistoryEntry): number[] {
  const years: number[] = [];
  for (let y = entry.start.year; y <= entry.end.year; y++) {
    years.push(y);
  }
  return years;
}

export type YearGroup = {
  year: number;
  entries: WorkHistoryEntry[];
};

/** Newest years first; each role appears under every year it was active */
export function groupWorkByYearDescending(): YearGroup[] {
  const byYear = new Map<number, WorkHistoryEntry[]>();

  for (const entry of workHistory) {
    for (const year of activeCalendarYears(entry)) {
      const list = byYear.get(year) ?? [];
      list.push(entry);
      byYear.set(year, list);
    }
  }

  const years = [...byYear.keys()].sort((a, b) => b - a);

  return years.map((year) => {
    const raw = byYear.get(year) ?? [];
    const seen = new Set<string>();
    const entries = raw.filter((e) => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    });
    return { year, entries };
  });
}
