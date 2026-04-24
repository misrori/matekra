export const meta = {
  id: 'gyakorlo-1-11',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 11,
  title: 'Mértani sorozat első $n$ tagjának összege',
  points: 3,
  topics: ['mértani sorozat'],
  difficulty: 3,
  fgvt: [{ page: 35, note: 'mértani sorozat' }],
  estimatedMinutes: 5,
};

export const problem = {
  statement: `Egy mértani sorozat első tagja $a_1 = 4$, hányadosa $q = 3$.

Mennyi a sorozat **első $6$ tagjának összege**?`,
  asked: [{ key: 'S6', label: '$S_6 = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az összegképlet felírása',
      points: 1,
      body: `A mértani sorozat első $n$ tagjának összege (fgv. tábla 35. old., feltéve hogy $q \\neq 1$):

$$S_n = a_1 \\cdot \\dfrac{q^n - 1}{q - 1}.$$

A mi feladatunkban $a_1 = 4$, $q = 3$, $n = 6$.`,
    },
    {
      title: '2. lépés — $q^n$ kiszámítása',
      points: 1,
      body: `Kiszámítjuk a $3^6$ hatványt lépésről lépésre:

$$3^1 = 3,\\ 3^2 = 9,\\ 3^3 = 27,\\ 3^4 = 81,\\ 3^5 = 243,\\ 3^6 = 729.$$

Tehát $q^6 - 1 = 729 - 1 = 728$, és $q - 1 = 3 - 1 = 2$.`,
    },
    {
      title: '3. lépés — Behelyettesítés, eredmény',
      points: 1,
      body: `Az összeg:

$$S_6 = 4 \\cdot \\dfrac{728}{2} = 4 \\cdot 364 = 1\\,456.$$

**Ellenőrzés** (összeadással): $a_1 = 4,\\ a_2 = 12,\\ a_3 = 36,\\ a_4 = 108,\\ a_5 = 324,\\ a_6 = 972$. Összeg: $4 + 12 + 36 + 108 + 324 + 972 = 1\\,456$. ✓`,
    },
  ],
  finalAnswer: {
    S6: '$S_6 = 1\\,456$',
  },
  usedFormulas: [
    'mértani sorozat $n$-edik tagja: $a_n = a_1 \\cdot q^{n-1}$',
    'mértani sorozat első $n$ tagjának összege: $S_n = a_1 \\cdot \\dfrac{q^n - 1}{q - 1}$',
  ],
};

export default { meta, problem, solution };
