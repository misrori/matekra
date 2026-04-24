export const meta = {
  id: 'gyakorlo-4-03',
  year: 2024,
  session: 'gyakorló · 4. teszt',
  level: 'közép',
  part: 'I',
  number: 3,
  title: 'Elsőfokú egyenlet megoldása',
  points: 2,
  topics: ['egyenletek'],
  difficulty: 1,
  fgvt: [{ page: 27, note: 'egyenlet' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 4, tolerance: 0.001 },
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán az alábbi egyenletet!

$$3(x - 2) + 5 = 2x + 3.$$`,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A zárójel felbontása',
      points: 1,
      body: `A disztributív törvény szerint $3(x-2) = 3x - 6$. Az egyenlet így:

$$3x - 6 + 5 = 2x + 3,$$

azaz:

$$3x - 1 = 2x + 3.$$`,
    },
    {
      title: '2. lépés — $x$ kifejezése',
      points: 1,
      body: `Vonjunk ki mindkét oldalból $2x$-et:

$$x - 1 = 3.$$

Majd adjunk $1$-et:

$$x = 4.$$

**Ellenőrzés** behelyettesítéssel: bal oldal $3(4-2) + 5 = 6 + 5 = 11$; jobb oldal $2\\cdot 4 + 3 = 11$. ✓`,
    },
  ],
  finalAnswer: { x: '$x = 4$' },
  usedFormulas: ['disztributív szabály: $a(b+c) = ab + ac$'],
};

export default { meta, problem, solution };
