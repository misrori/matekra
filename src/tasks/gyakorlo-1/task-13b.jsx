export const meta = {
  id: 'gyakorlo-1-13b',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  sub: '.b',
  title: 'Törtes egyenlet — értelmezési tartomány és gyök',
  points: 6,
  topics: ['egyenletek'],
  difficulty: 3,
  fgvt: [{ page: 27, note: 'másodfokú megoldóképlet' }],
  estimatedMinutes: 12,
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletet!

$$\\dfrac{x+3}{x-1} + \\dfrac{2}{x+2} = 3.$$

A megoldás megadása előtt **vizsgálja meg az értelmezési tartományt**.`,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Értelmezési tartomány',
      points: 1,
      body: `A nevezőknek nullától különbözőnek kell lennie:

- $x - 1 \\neq 0 \\Rightarrow x \\neq 1$
- $x + 2 \\neq 0 \\Rightarrow x \\neq -2$

Az **értelmezési tartomány**: $D = \\mathbb{R} \\setminus \\{-2;\\ 1\\}$.

Ha a későbbi megoldások bármelyike $1$ vagy $-2$, akkor azt kizárjuk.`,
    },
    {
      title: '2. lépés — Közös nevezőre hozás',
      points: 2,
      body: `A két tört közös nevezője $(x-1)(x+2)$. Az egyenletet beszorozzuk ezzel a nevezővel (ez az értelmezési tartományon nem $0$):

$$(x + 3)(x + 2) + 2(x - 1) = 3(x - 1)(x + 2).$$

Kibontva mindegyik oldalt:

- Bal oldal:
  - $(x+3)(x+2) = x^2 + 5x + 6$
  - $2(x-1) = 2x - 2$
  - Összesen: $x^2 + 7x + 4$

- Jobb oldal:
  - $(x-1)(x+2) = x^2 + x - 2$
  - $3 \\cdot (x^2 + x - 2) = 3x^2 + 3x - 6$`,
    },
    {
      title: '3. lépés — Átrendezés másodfokú alakra',
      points: 1,
      body: `A kibontás után:

$$x^2 + 7x + 4 = 3x^2 + 3x - 6.$$

Rendezzük $0$-ra úgy, hogy a másodfokú tag pozitív legyen (vonjuk ki a bal oldalt):

$$0 = 3x^2 + 3x - 6 - x^2 - 7x - 4 = 2x^2 - 4x - 10.$$

Egyszerűsíthetünk $2$-vel:

$$x^2 - 2x - 5 = 0.$$`,
    },
    {
      title: '4. lépés — A másodfokú egyenlet megoldása',
      points: 1.5,
      body: `Alkalmazzuk a megoldóképletet $a = 1$, $b = -2$, $c = -5$-tel:

$$D = (-2)^2 - 4 \\cdot 1 \\cdot (-5) = 4 + 20 = 24.$$

$D = 24 > 0$, tehát két valós gyök van. $\\sqrt{24} = 2\\sqrt{6}$.

$$x_{1,2} = \\dfrac{-(-2) \\pm 2\\sqrt{6}}{2 \\cdot 1} = \\dfrac{2 \\pm 2\\sqrt{6}}{2} = 1 \\pm \\sqrt{6}.$$

Közelítő értékek ($\\sqrt{6} \\approx 2{,}449$):
- $x_1 = 1 + \\sqrt{6} \\approx 3{,}449$
- $x_2 = 1 - \\sqrt{6} \\approx -1{,}449$`,
    },
    {
      title: '5. lépés — Értelmezési tartomány ellenőrzése',
      points: 0.5,
      body: `Meg kell nézni, hogy a gyökök benne vannak-e az értelmezési tartományban:

- $x_1 = 1 + \\sqrt{6} \\approx 3{,}449$ — nem $1$ és nem $-2$, tehát **érvényes**.
- $x_2 = 1 - \\sqrt{6} \\approx -1{,}449$ — nem $1$ és nem $-2$, tehát **érvényes**.

Mindkét megoldás megmarad.

**Plusz ellenőrzés** közelítőleg $x_1 \\approx 3{,}449$-re: $\\dfrac{6{,}449}{2{,}449} + \\dfrac{2}{5{,}449} \\approx 2{,}633 + 0{,}367 \\approx 3{,}000$ ✓`,
    },
  ],
  finalAnswer: {
    x: '$x_{1,2} = 1 \\pm \\sqrt{6}$',
  },
  usedFormulas: [
    'értelmezési tartomány tört esetén: nevezők $\\neq 0$',
    'közös nevezőre hozás',
    'másodfokú megoldóképlet: $x_{1,2} = \\dfrac{-b \\pm \\sqrt{D}}{2a}$',
  ],
};

export default { meta, problem, solution };
