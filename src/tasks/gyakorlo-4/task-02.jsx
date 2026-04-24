export const meta = {
  id: 'gyakorlo-4-02',
  year: 2024,
  session: 'gyakorló · 4. teszt',
  level: 'közép',
  part: 'I',
  number: 2,
  title: 'Hatványozás azonosságai',
  points: 2,
  topics: ['hatvány'],
  difficulty: 1,
  fgvt: [{ page: 22, note: 'hatvány azonosságai' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 25, tolerance: 0.001 },
};

export const problem = {
  statement: `Számítsa ki az alábbi kifejezés pontos értékét!

$$\\dfrac{5^8 \\cdot 5^{-4}}{5^{2}}$$`,
  asked: [{ key: 'ert', label: 'érték $= ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A számláló egyszerűsítése',
      points: 1,
      body: `**Szabály**: azonos alapú hatványokat a kitevők **összeadásával** szorzunk.

$$a^n \\cdot a^m = a^{n+m}.$$

A számlálóban:

$$5^8 \\cdot 5^{-4} = 5^{8 + (-4)} = 5^{4}.$$`,
    },
    {
      title: '2. lépés — Osztás és kiszámítás',
      points: 1,
      body: `**Szabály**: azonos alapú hatványokat a kitevők **kivonásával** osztunk.

$$\\dfrac{a^n}{a^m} = a^{n-m}.$$

$$\\dfrac{5^{4}}{5^{2}} = 5^{4-2} = 5^{2} = 25.$$

Hmm — ellenőrizzük. Vigyázzunk a feladattal: az eredmény $5^{8 - 4 - 2} = 5^{2} = 25$. Azaz a várt szám $\\boxed{25}$.

Kézi ellenőrzés: $5^8 = 390625$, $5^{-4} = 1/625$; szorzat: $390625/625 = 625 = 5^4$. Osztva $5^2 = 25$-tel: $625/25 = 25$. ✓`,
    },
  ],
  finalAnswer: { ert: '$5^2 = 25$' },
  usedFormulas: [
    '$a^n \\cdot a^m = a^{n+m}$',
    '$a^n / a^m = a^{n-m}$',
  ],
};

export default { meta, problem, solution };
