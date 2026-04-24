export const meta = {
  id: 'gyakorlo-5-03',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 3,
  title: 'Logaritmus kiszámítása',
  points: 2,
  topics: ['logaritmus'],
  difficulty: 2,
  fgvt: [{ page: 24, note: 'logaritmus azonosságai' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 4, tolerance: 0.001 },
};

export const problem = {
  statement: `Számítsa ki a következő kifejezés értékét:

$$\\log_2 64 + \\log_3 \\dfrac{1}{9}.$$`,
  asked: [{ key: 'val', label: 'érték = ?' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az első tag: $\\log_2 64$',
      points: 1,
      body: `A logaritmus definíciója: $\\log_b a = x$ azt jelenti, hogy $b^x = a$.

Keressük azt a kitevőt, amelyre a $2$-t emelve $64$-et kapunk:

$$2^6 = 64 \\Rightarrow \\log_2 64 = 6.$$`,
    },
    {
      title: '2. lépés — A második tag és az összeg',
      points: 1,
      body: `Most azt a kitevőt keressük, amelyre $3$-at emelve $\\tfrac{1}{9}$-et kapunk:

$$\\dfrac{1}{9} = \\dfrac{1}{3^2} = 3^{-2} \\Rightarrow \\log_3 \\dfrac{1}{9} = -2.$$

**Összegzés:**

$$\\log_2 64 + \\log_3 \\dfrac{1}{9} = 6 + (-2) = 4.$$

**Ellenőrzés:** $2^6 = 64$ ✓ és $3^{-2} = \\tfrac{1}{9}$ ✓.

Tehát $\\boxed{4}$.`,
    },
  ],
  finalAnswer: { val: '$4$' },
  usedFormulas: ['$\\log_b b^k = k$', '$\\log_b \\tfrac{1}{b^k} = -k$'],
};

export default { meta, problem, solution };
