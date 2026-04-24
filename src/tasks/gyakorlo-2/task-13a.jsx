export const meta = {
  id: 'gyakorlo-2-13a',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  subpart: 'a',
  title: 'Másodfokú egyenlőtlenség — előjeltáblázat',
  points: 5,
  topics: ['egyenletek', 'függvények'],
  difficulty: 3,
  fgvt: [
    { page: 27, note: 'másodfokú egyenlet' },
    { page: 41, note: 'másodfokú függvény' },
  ],
  estimatedMinutes: 10,
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenlőtlenséget! Megoldását részletezze és ábrázolja a megoldáshalmazt a számegyenesen!

$$x^2 - 5x + 6 \\leq 0.$$`,
  asked: [{ key: 'x', label: 'Megoldáshalmaz = ?' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A megfelelő egyenlet gyökei',
      points: 2,
      body: `Először megkeressük a $x^2 - 5x + 6 = 0$ egyenlet gyökeit — ezek a parabola **zéróhelyei**, és ezek osztják a számegyenest azokra a tartományokra, amelyeken a kifejezés előjele állandó.

Szorzattá alakítással (két szám összege $5$, szorzata $6$: az $2$ és a $3$):

$$x^2 - 5x + 6 = (x - 2)(x - 3) = 0.$$

Tehát $x_1 = 2$, $x_2 = 3$.

**Ellenőrzés diszkriminánssal:** $D = 25 - 24 = 1$, $x_{1,2} = \\frac{5 \\pm 1}{2} = 3$ vagy $2$. ✓`,
    },
    {
      title: '2. lépés — A parabola alakja',
      points: 1,
      body: `A főegyüttható $a = 1 > 0$, tehát a parabola **felfelé** nyílik. Így a kifejezés
$(x-2)(x-3)$

- **negatív** a két gyök **között** (ott van a parabola az $x$-tengely alatt),
- **pozitív** a gyökökön kívül (ott van a parabola az $x$-tengely fölött),
- **nulla** pontosan a két gyökben.`,
    },
    {
      title: '3. lépés — Előjeltáblázat',
      points: 1,
      body: `| $x$        | $x < 2$ | $x = 2$ | $2 < x < 3$ | $x = 3$ | $x > 3$ |
|------------|---------|---------|-------------|---------|---------|
| $x - 2$    | $-$     | $0$     | $+$         | $+$     | $+$     |
| $x - 3$    | $-$     | $-$     | $-$         | $0$     | $+$     |
| szorzat    | $+$     | $0$     | $-$         | $0$     | $+$     |

Az egyenlőtlenség $\\leq 0$-t kér, tehát az **negatív vagy nulla** tartomány a jó: $2 \\leq x \\leq 3$.`,
    },
    {
      title: '4. lépés — Megoldáshalmaz megadása',
      points: 1,
      body: `A megoldáshalmaz zárt intervallum (a gyökök **beleveendők**, mert $\\leq 0$, és ott a kifejezés éppen $0$):

$$\\boxed{\\{ x \\in \\mathbb{R} \\mid 2 \\leq x \\leq 3 \\} = [2;\\ 3].}$$

**Ellenőrzés** egy belső pontban, pl. $x = 2{,}5$: $2{,}5^2 - 5 \\cdot 2{,}5 + 6 = 6{,}25 - 12{,}5 + 6 = -0{,}25 \\leq 0 \\ \\checkmark$.
Egy külső pontban, pl. $x = 1$: $1 - 5 + 6 = 2 > 0$ — **nem** eleme a megoldáshalmaznak, ahogy vártuk.`,
    },
  ],
  finalAnswer: { x: '$x \\in [2;\\ 3]$' },
  usedFormulas: [
    'másodfokú szorzattá alakítás',
    'előjelelemzés gyökintervallumonként',
    'felfelé nyíló parabola: gyökök között negatív, kívül pozitív',
  ],
};

export default { meta, problem, solution };
