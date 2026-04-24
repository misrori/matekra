export const meta = {
  id: 'gyakorlo-1-13a',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  sub: '.a',
  title: 'Másodfokú egyenlet megoldóképlettel',
  points: 5,
  topics: ['egyenletek'],
  difficulty: 3,
  fgvt: [{ page: 27, note: 'másodfokú megoldóképlet' }],
  estimatedMinutes: 10,
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletet!

$$2x^2 - 7x + 3 = 0.$$

Ellenőrizze az eredményt **Viète-formulák** segítségével is.`,
  asked: [{ key: 'roots', label: '$x_{1,2} = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az együtthatók azonosítása',
      points: 1,
      body: `A **másodfokú egyenlet** általános alakja $a x^2 + b x + c = 0$. Az egyenletünkben:

- $a = 2$
- $b = -7$
- $c = 3$`,
    },
    {
      title: '2. lépés — A diszkrimináns kiszámítása',
      points: 1,
      body: `A **diszkrimináns**: $D = b^2 - 4ac$ (fgv. tábla 27. old.).

$$D = (-7)^2 - 4 \\cdot 2 \\cdot 3 = 49 - 24 = 25.$$

$D = 25 > 0$, tehát **két különböző valós gyök** van.

$\\sqrt{D} = \\sqrt{25} = 5$.`,
    },
    {
      title: '3. lépés — A megoldóképlet alkalmazása',
      points: 2,
      body: `A másodfokú megoldóképlet:

$$x_{1,2} = \\dfrac{-b \\pm \\sqrt{D}}{2a}.$$

Behelyettesítve:

$$x_{1,2} = \\dfrac{-(-7) \\pm 5}{2 \\cdot 2} = \\dfrac{7 \\pm 5}{4}.$$

- $x_1 = \\dfrac{7 + 5}{4} = \\dfrac{12}{4} = 3$
- $x_2 = \\dfrac{7 - 5}{4} = \\dfrac{2}{4} = \\dfrac{1}{2}$`,
    },
    {
      title: '4. lépés — Ellenőrzés Viète-formulákkal',
      points: 1,
      body: `**Viète-formulák** (fgv. tábla 27. old.):

- $x_1 + x_2 = -\\dfrac{b}{a} = -\\dfrac{-7}{2} = \\dfrac{7}{2}$ &nbsp; Számítás: $3 + \\dfrac{1}{2} = \\dfrac{7}{2}$. ✓
- $x_1 \\cdot x_2 = \\dfrac{c}{a} = \\dfrac{3}{2}$ &nbsp; Számítás: $3 \\cdot \\dfrac{1}{2} = \\dfrac{3}{2}$. ✓

Mindkét Viète-azonosság teljesül, tehát a gyökök helyesek.

**Plusz ellenőrzés behelyettesítéssel** ($x_1 = 3$): $2 \\cdot 9 - 7 \\cdot 3 + 3 = 18 - 21 + 3 = 0$ ✓`,
    },
  ],
  finalAnswer: {
    roots: '$x_1 = 3,\\ x_2 = \\dfrac{1}{2}$',
  },
  usedFormulas: [
    'másodfokú egyenlet: $ax^2 + bx + c = 0$',
    'diszkrimináns: $D = b^2 - 4ac$',
    'megoldóképlet: $x_{1,2} = \\dfrac{-b \\pm \\sqrt{D}}{2a}$',
    'Viète: $x_1 + x_2 = -b/a$, $x_1 x_2 = c/a$',
  ],
};

export default { meta, problem, solution };
