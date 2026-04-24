export const meta = {
  id: 'gyakorlo-5-10',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 10,
  title: 'Egyenlet — törtes lineáris',
  points: 2,
  topics: ['egyenletek'],
  difficulty: 2,
  fgvt: [{ page: 27, note: 'lineáris egyenlet' }],
  estimatedMinutes: 3,
  // (x-3)/4 + (x+1)/3 = 2
  // 3(x-3) + 4(x+1) = 24
  // 3x-9 + 4x+4 = 24
  // 7x - 5 = 24
  // 7x = 29
  // x = 29/7 ≈ 4,142857
  check: { type: 'number', value: 29 / 7, tolerance: 0.001 },
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletet:

$$\\dfrac{x - 3}{4} + \\dfrac{x + 1}{3} = 2.$$`,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Nevezők kiejtése közös nevezővel',
      points: 1,
      body: `A nevezők $4$ és $3$, legkisebb közös többszörösük $12$. Szorozzuk mindkét oldalt $12$-vel:

$$12 \\cdot \\dfrac{x - 3}{4} + 12 \\cdot \\dfrac{x + 1}{3} = 12 \\cdot 2,$$

azaz:

$$3(x - 3) + 4(x + 1) = 24.$$`,
    },
    {
      title: '2. lépés — Zárójelek felbontása, összevonás',
      points: 1,
      body: `$$3x - 9 + 4x + 4 = 24,$$
$$7x - 5 = 24,$$
$$7x = 29,$$
$$x = \\dfrac{29}{7}.$$

Tehát $\\boxed{x = \\dfrac{29}{7} \\approx 4{,}143}$.

**Ellenőrzés:** $\\dfrac{29/7 - 3}{4} + \\dfrac{29/7 + 1}{3} = \\dfrac{8/7}{4} + \\dfrac{36/7}{3} = \\dfrac{2}{7} + \\dfrac{12}{7} = \\dfrac{14}{7} = 2$ ✓.`,
    },
  ],
  finalAnswer: { x: '$x = \\dfrac{29}{7}$' },
  usedFormulas: ['közös nevezővel szorzás', 'lineáris egyenlet megoldása'],
};

export default { meta, problem, solution };
