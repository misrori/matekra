export const meta = {
  id: 'gyakorlo-5-13b',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  subpart: 'b',
  title: 'Szöveges feladat — két szám különbsége és szorzata',
  points: 6,
  topics: ['egyenletek'],
  difficulty: 3,
  fgvt: [{ page: 27, note: 'másodfokú egyenlet' }],
  estimatedMinutes: 9,
  // Két egész szám különbsége 8, szorzata 105. Keresd őket.
  // x - y = 8, xy = 105 → x = y + 8, (y+8)y = 105 → y^2 + 8y - 105 = 0
  // D = 64 + 420 = 484, sqrt = 22
  // y = (-8 ± 22)/2 = 7 vagy -15
  // Ha y = 7: x = 15 (pozitív pár)
  // Ha y = -15: x = -7 (negatív pár, szintén helyes)
  check: { type: 'text', value: '7 és 15, vagy -15 és -7' },
};

export const problem = {
  statement: `Két egész szám **különbsége** $8$, **szorzata** pedig $105$. Melyik ez a két szám?

Ismertesse a megoldás menetét, és adja meg a feltételeket kielégítő összes számpárt!`,
  asked: [{ key: 'pair', label: 'számpár(ok) = ?' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Ismeretlenek bevezetése',
      points: 1,
      body: `Legyen a két szám $x$ és $y$, úgy, hogy $x$ a **nagyobbik**, azaz:

$$x - y = 8 \\quad \\text{és} \\quad x \\cdot y = 105.$$`,
    },
    {
      title: '2. lépés — Az egyik ismeretlen kifejezése',
      points: 1,
      body: `Az első egyenletből: $x = y + 8$. Ezt behelyettesítjük a másodikba:

$$(y + 8) \\cdot y = 105,$$
$$y^2 + 8y - 105 = 0.$$`,
    },
    {
      title: '3. lépés — A másodfokú egyenlet megoldása',
      points: 2,
      body: `Diszkrimináns: $D = 8^2 - 4 \\cdot 1 \\cdot (-105) = 64 + 420 = 484$.

$\\sqrt{484} = 22$.

$$y_{1,2} = \\dfrac{-8 \\pm 22}{2}.$$

$$y_1 = \\dfrac{14}{2} = 7, \\qquad y_2 = \\dfrac{-30}{2} = -15.$$`,
    },
    {
      title: '4. lépés — A párok meghatározása',
      points: 1,
      body: `**Első eset:** $y = 7 \\Rightarrow x = 7 + 8 = 15$. Számpár: $(15;\\ 7)$.

**Második eset:** $y = -15 \\Rightarrow x = -15 + 8 = -7$. Számpár: $(-7;\\ -15)$.

Mindkét pár **egész** számokból áll, mindkettő eleget tesz a feltételeknek.`,
    },
    {
      title: '5. lépés — Ellenőrzés és végeredmény',
      points: 1,
      body: `**Első eset:** $15 - 7 = 8$ ✓, $15 \\cdot 7 = 105$ ✓.

**Második eset:** $-7 - (-15) = -7 + 15 = 8$ ✓, $(-7) \\cdot (-15) = 105$ ✓.

Tehát **két** számpár elégíti ki a feltételeket:

$$\\boxed{\\{7;\\ 15\\} \\quad \\text{vagy} \\quad \\{-15;\\ -7\\}.}$$`,
    },
  ],
  finalAnswer: { pair: '$\\{7;\\ 15\\}$ vagy $\\{-15;\\ -7\\}$' },
  usedFormulas: ['két egyenletből álló rendszer behelyettesítéssel', 'másodfokú megoldóképlet'],
};

export default { meta, problem, solution };
