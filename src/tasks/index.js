// Glob-alapú task registry. Minden `<mappa>/task-*.jsx` fájl automatikusan
// bekerül — nem kell minden új feladathoz ide szerkeszteni.

const modules = import.meta.glob('./*/task-*.jsx', { eager: true });

export const tasks = Object.entries(modules)
  .map(([path, mod]) => {
    const def = mod.default ?? { meta: mod.meta, problem: mod.problem, solution: mod.solution };
    // Defensive: skip malformed modules
    if (!def?.meta?.id) {
      console.warn('Task module missing meta.id:', path);
      return null;
    }
    return { ...def, __path: path };
  })
  .filter(Boolean)
  // Stable sort: level (közép/emelt) → session → part → number → sub
  .sort((a, b) => {
    const la = (a.meta.level || '').localeCompare(b.meta.level || '');
    if (la) return la;
    const sa = (a.meta.session || '').localeCompare(b.meta.session || '');
    if (sa) return sa;
    const pa = (a.meta.part || '').localeCompare(b.meta.part || '');
    if (pa) return pa;
    const na = (a.meta.number || 0) - (b.meta.number || 0);
    if (na) return na;
    return (a.meta.sub || '').localeCompare(b.meta.sub || '');
  });

/**
 * Finds the "next" task based on current task + difficulty delta.
 * delta = 0 → similar difficulty
 * delta = +1 → harder
 * delta = -1 → easier
 * Prefers same topic(s), then same level, then any.
 */
export function findNextTask(currentTask, delta = 0) {
  const cur = currentTask.meta;
  const targetDiff = (cur.difficulty ?? 3) + delta;

  const sameLevel = tasks.filter(
    (t) => t.meta.id !== cur.id && t.meta.level === cur.level
  );

  const sameTopic = sameLevel.filter((t) =>
    t.meta.topics?.some((tt) => cur.topics?.includes(tt))
  );

  const pool = sameTopic.length > 0 ? sameTopic : sameLevel;

  // Rank by: distance from targetDiff, then same part preference, then some randomness.
  const ranked = pool
    .map((t) => ({
      task: t,
      score:
        Math.abs((t.meta.difficulty ?? 3) - targetDiff) * 10 +
        (t.meta.part === cur.part ? 0 : 2) +
        Math.random() * 0.5,
    }))
    .sort((a, b) => a.score - b.score);

  return ranked[0]?.task ?? null;
}
