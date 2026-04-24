export const meta = {
  id: 'gyakorlo-2-03',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 3,
  title: 'Kétismeretlenes lineáris egyenletrendszer',
  points: 2,
  topics: ['egyenletek'],
  difficulty: 2,
  fgvt: [{ page: 27, note: 'lineáris egyenletrendszer' }],
  estimatedMinutes: 4,
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletrendszert!

$$\\begin{cases} 2x + 3y = 19 \\\\ 4x - y = 17 \\end{cases}$$`,
  asked: [
    { key: 'x', label: '$x = ?$' },
    { key: 'y', label: '$y = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — $y$ kifejezése a második egyenletből',
      points: 1,
      body: `A második egyenletből fejezzük ki $y$-t (ez a behelyettesítő módszer):

$$4x - y = 17 \\ \\Longrightarrow \\ y = 4x - 17.$$

Ezt szabadon használhatjuk, mert a lépés **ekvivalens** átalakítás.`,
    },
    {
      title: '2. lépés — Behelyettesítés az első egyenletbe és $x$ meghatározása',
      points: 1,
      body: `Az $y = 4x - 17$ kifejezést írjuk be az első egyenletbe:

$$2x + 3(4x - 17) = 19.$$

Felbontva a zárójelet és összevonva:

$$2x + 12x - 51 = 19$$
$$14x = 70$$
$$x = 5.$$

Visszahelyettesítve: $y = 4 \\cdot 5 - 17 = 20 - 17 = 3$.

**Ellenőrzés:**
- $2 \\cdot 5 + 3 \\cdot 3 = 10 + 9 = 19$ ✓
- $4 \\cdot 5 - 3 = 20 - 3 = 17$ ✓

Tehát a megoldás $\\boxed{x = 5, \\ y = 3}$.`,
    },
  ],
  finalAnswer: { x: '$x = 5$', y: '$y = 3$' },
  usedFormulas: ['behelyettesítő módszer', 'ekvivalens egyenlet-átalakítás'],
};

export default { meta, problem, solution };
