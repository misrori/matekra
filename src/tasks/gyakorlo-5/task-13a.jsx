export const meta = {
  id: 'gyakorlo-5-13a',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  subpart: 'a',
  title: 'Másodfokú egyenlet — teljes megoldás',
  points: 5,
  topics: ['egyenletek'],
  difficulty: 3,
  fgvt: [{ page: 27, note: 'másodfokú megoldóképlet' }],
  estimatedMinutes: 8,
  // 2x^2 - 7x - 15 = 0
  // D = 49 + 120 = 169, sqrt(D) = 13
  // x = (7 ± 13)/4 → 20/4 = 5 vagy -6/4 = -3/2 = -1,5
  // Válasz: x1 = 5, x2 = -1,5 (szöveges, mindkettő)
  check: { type: 'text', value: 'x₁ = 5; x₂ = -1,5' },
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő másodfokú egyenletet! Megoldását részletezze és ellenőrizze!

$$2x^2 - 7x - 15 = 0.$$`,
  asked: [{ key: 'x', label: 'gyökök = ?' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az együtthatók azonosítása',
      points: 1,
      body: `A másodfokú egyenlet általános alakja $ax^2 + bx + c = 0$. Itt:

- $a = 2$
- $b = -7$
- $c = -15$`,
    },
    {
      title: '2. lépés — A diszkrimináns kiszámítása',
      points: 1,
      body: `$$D = b^2 - 4ac = (-7)^2 - 4 \\cdot 2 \\cdot (-15) = 49 + 120 = 169.$$

Mivel $D > 0$, **két különböző valós gyök** van. További előny: $\\sqrt{169} = 13$ pontos érték.`,
    },
    {
      title: '3. lépés — A megoldóképlet',
      points: 1,
      body: `$$x_{1,2} = \\dfrac{-b \\pm \\sqrt{D}}{2a} = \\dfrac{7 \\pm 13}{4}.$$

Tehát:
$$x_1 = \\dfrac{7 + 13}{4} = \\dfrac{20}{4} = 5,$$
$$x_2 = \\dfrac{7 - 13}{4} = \\dfrac{-6}{4} = -\\dfrac{3}{2} = -1{,}5.$$`,
    },
    {
      title: '4. lépés — Ellenőrzés',
      points: 1,
      body: `**Viète-formulák** szerint:
$$x_1 + x_2 = -\\dfrac{b}{a} = \\dfrac{7}{2} = 3{,}5, \\quad x_1 \\cdot x_2 = \\dfrac{c}{a} = -\\dfrac{15}{2} = -7{,}5.$$

Saját gyökeinkkel: $5 + (-1{,}5) = 3{,}5$ ✓ és $5 \\cdot (-1{,}5) = -7{,}5$ ✓.

**Behelyettesítéssel** $x = 5$-re: $2 \\cdot 25 - 7 \\cdot 5 - 15 = 50 - 35 - 15 = 0$ ✓.
$x = -1{,}5$-re: $2 \\cdot 2{,}25 - 7 \\cdot (-1{,}5) - 15 = 4{,}5 + 10{,}5 - 15 = 0$ ✓.`,
    },
    {
      title: '5. lépés — A megoldáshalmaz megadása',
      points: 1,
      body: `A valós gyökök: $x_1 = 5$ és $x_2 = -\\dfrac{3}{2}$ (azaz $-1{,}5$).

$$\\boxed{x \\in \\{-1{,}5;\\ 5\\}.}$$`,
    },
  ],
  finalAnswer: { x: '$x_1 = 5$, $x_2 = -1{,}5$' },
  usedFormulas: [
    '$x_{1,2} = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$',
    'Viète: $x_1 + x_2 = -\\tfrac{b}{a}$, $x_1 x_2 = \\tfrac{c}{a}$',
  ],
};

export default { meta, problem, solution };
