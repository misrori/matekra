import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-03',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'I',
  number: 3,
  title: 'Logaritmusos egyenletrendszer',
  points: 12,
  topics: ['logaritmus', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 24, note: 'logaritmus azonosságai' },
    { page: 25, note: 'bázisváltás' },
  ],
  estimatedMinutes: 16,
};

/*
  Rendszer:
    log_2(x) + log_2(y) = 5
    log_3(x) - log_3(y) = 2
  Átírás:
    log_2(xy) = 5  =>  xy = 32
    log_3(x/y) = 2 =>  x/y = 9  =>  x = 9y
  9 y^2 = 32  =>  y^2 = 32/9  =>  y = sqrt(32)/3 = 4 sqrt(2) / 3
  x = 9y = 12 sqrt(2)
  Értelmezés: x, y > 0 — OK.
  Ellenőrzés:
    xy = 9y * y = 9 y^2 = 32 ✓
    x/y = 9 ✓
*/

function System() {
  // két egyenes ln tengelyekben (u = log_2 x, v = log_2 y) — az 1. egyenlet: u + v = 5 egyenes
  // és a 2. egyenlet átírva: log_3 x - log_3 y = 2 → log_3(x/y) = 2 → x/y = 9
  //   vagy (log_3 x)/(log_3 2) * log_2 x — érdemes simán log skálán ábrázolni.
  // Itt a (u, v) = (log_2 x, log_2 y) síkban:
  //   (1) u + v = 5
  //   (2) (u - v) * log_3 2 = 2 * log_3 2  -- helytelen; ehelyett:
  //       log_3 x - log_3 y = 2  →  log_2 x * (log 2 / log 3) - log_2 y * (log 2 / log 3) = 2
  //        -> (u - v) * log_3 2 = 2  ->  u - v = 2 / log_3 2 = 2 log_2 3 ≈ 3,17
  // Megoldás: u + v = 5, u - v = 2 log_2 3
  //   => u = (5 + 2 log_2 3)/2,  v = (5 - 2 log_2 3)/2
  // Ez pont megfelel x = 12√2, y = 4√2/3 -nak.
  const x0 = 50, y0 = 30, w = 400, h = 260;
  // u, v in [0, 6]
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <Axes x={x0} y={y0} w={w} h={h} xMin={0} xMax={6} yMin={0} yMax={6} xStep={1} yStep={1} xLabel="u = log₂ x" yLabel="v = log₂ y" />
      {/* Egyenes: u + v = 5 */}
      <line x1={x0 + ((0) / 6) * w} y1={y0 + h - ((5) / 6) * h} x2={x0 + ((5) / 6) * w} y2={y0 + h - ((0) / 6) * h} stroke="#1d4ed8" strokeWidth="2.5" />
      <text x={x0 + ((2.8) / 6) * w} y={y0 + h - ((2.7) / 6) * h - 6} fontSize="12" fill="#1d4ed8">u + v = 5</text>
      {/* Egyenes: u - v = 2 log_2 3 ≈ 3.170 */}
      {/* v = u - 3.170 ; x-tengellyel u = 3.170 -nél metszi */}
      <line x1={x0 + ((3.17) / 6) * w} y1={y0 + h} x2={x0 + ((6) / 6) * w} y2={y0 + h - ((2.83) / 6) * h} stroke="#dc2626" strokeWidth="2.5" />
      <text x={x0 + ((4.5) / 6) * w} y={y0 + h - ((0.8) / 6) * h + 2} fontSize="12" fill="#dc2626">u − v = 2·log₂3 ≈ 3,17</text>
      {/* Metszéspont: u = (5 + 3.17)/2 ≈ 4.085, v = (5 - 3.17)/2 ≈ 0.915 */}
      <circle cx={x0 + ((4.085) / 6) * w} cy={y0 + h - ((0.915) / 6) * h} r="5" fill="#16a34a" />
      <text x={x0 + ((4.085) / 6) * w + 8} y={y0 + h - ((0.915) / 6) * h - 6} fontSize="12" fill="#16a34a" fontWeight="bold">
        (u₀, v₀) ≈ (4,085; 0,915)
      </text>
      <text x="260" y="20" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#111">
        Lineáris rendszer az (u=log₂x, v=log₂y) síkon
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán az alábbi egyenletrendszert:

$$\\begin{cases} \\log_{2}(x) + \\log_{2}(y) = 5 \\\\ \\log_{3}(x) - \\log_{3}(y) = 2 \\end{cases}$$

**a)** Határozza meg az értelmezési tartományt. ($1$ pont)

**b)** Adja meg az egyenletrendszer valamennyi megoldását $(x; y)$ alakban. ($8$ pont)

**c)** Mutassa meg, hogy a kapott $x$ és $y$ értékek hányadosa pontosan $9$, **és** szorzata pontosan $32$. ($3$ pont)`,
  figure: () => <System />,
  asked: [
    { key: 'a', label: 'a) $D = ?$' },
    { key: 'b', label: 'b) $(x; y) = ?$' },
    { key: 'c', label: 'c) $x/y$ és $x \\cdot y$ ellenőrzése' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Értelmezési tartomány',
      points: 1,
      body: `A logaritmus definíciója miatt **mindkét** logaritmus érveléséhez pozitív szám kell: $x > 0$ és $y > 0$. Emellett $\\log_2$ és $\\log_3$ is csak pozitív argumentumra értelmes.

$$\\boxed{D = \\{(x; y) \\in \\mathbb{R}^2 : x > 0 \\text{ és } y > 0 \\}.}$$`,
    },
    {
      title: 'b) 1. lépés — Az 1. egyenlet tömörítése',
      points: 1,
      body: `A szorzat-logaritmus azonosság (fgv. tábla 24. old.):

$$\\log_b(A) + \\log_b(B) = \\log_b(A \\cdot B).$$

Így az első egyenlet:

$$\\log_2(x \\cdot y) = 5 \\iff x \\cdot y = 2^5 = 32. \\tag{I}$$`,
    },
    {
      title: 'b) 2. lépés — A 2. egyenlet tömörítése',
      points: 1,
      body: `A hányados-logaritmus azonosság:

$$\\log_b(A) - \\log_b(B) = \\log_b \\dfrac{A}{B}.$$

Tehát:

$$\\log_3 \\dfrac{x}{y} = 2 \\iff \\dfrac{x}{y} = 3^2 = 9. \\tag{II}$$`,
    },
    {
      title: 'b) 3. lépés — Átírás egyszerű algebrai rendszerré',
      points: 2,
      body: `A logaritmusokból két egyszerű egyenletünk lett:

$$\\begin{cases} x \\cdot y = 32 \\\\ \\dfrac{x}{y} = 9 \\end{cases}$$

A második egyenletből:

$$x = 9 y.$$

Helyettesítsük az elsőbe:

$$9 y \\cdot y = 32 \\iff 9 y^2 = 32.$$`,
    },
    {
      title: 'b) 4. lépés — $y$ kiszámítása',
      points: 2,
      body: `$$y^2 = \\dfrac{32}{9} \\iff y = \\pm \\dfrac{\\sqrt{32}}{3} = \\pm \\dfrac{4\\sqrt{2}}{3}.$$

Az értelmezési tartomány szerint $y > 0$, így a **negatív** gyököt elvetjük:

$$y = \\dfrac{4\\sqrt{2}}{3} \\approx 1{,}886.$$`,
    },
    {
      title: 'b) 5. lépés — $x$ kiszámítása',
      points: 2,
      body: `$x = 9y$-ból:

$$x = 9 \\cdot \\dfrac{4\\sqrt{2}}{3} = 12\\sqrt{2} \\approx 16{,}971.$$

Mindkét érték pozitív, tehát az értelmezési tartományba esik.

$$\\boxed{\\left(x;\\ y\\right) = \\left(12\\sqrt{2};\\ \\dfrac{4\\sqrt{2}}{3}\\right) \\approx (16{,}97;\\ 1{,}89).}$$`,
      figure: () => <System />,
    },
    {
      title: 'c) 1. lépés — A szorzat ellenőrzése',
      points: 1,
      body: `$$x \\cdot y = 12\\sqrt{2} \\cdot \\dfrac{4\\sqrt{2}}{3} = \\dfrac{48 \\cdot 2}{3} = \\dfrac{96}{3} = 32. \\ \\checkmark$$

Valóban az (I) egyenlet teljesül.`,
    },
    {
      title: 'c) 2. lépés — A hányados ellenőrzése',
      points: 1,
      body: `$$\\dfrac{x}{y} = \\dfrac{12\\sqrt{2}}{\\dfrac{4\\sqrt{2}}{3}} = 12\\sqrt{2} \\cdot \\dfrac{3}{4\\sqrt{2}} = \\dfrac{36\\sqrt{2}}{4\\sqrt{2}} = 9. \\ \\checkmark$$

A (II) egyenlet is teljesül.`,
    },
    {
      title: 'c) 3. lépés — Visszaellenőrzés az eredeti rendszerbe',
      points: 1,
      body: `$$\\log_2(xy) = \\log_2 32 = 5 \\checkmark \\qquad \\log_3(x/y) = \\log_3 9 = 2 \\checkmark.$$

Tehát a megoldás valóban

$$\\boxed{(x; y) = \\left(12\\sqrt{2};\\ \\tfrac{4\\sqrt{2}}{3}\\right).}$$`,
    },
  ],
  finalAnswer: {
    a: '$x > 0$ és $y > 0$',
    b: '$x = 12\\sqrt{2} \\approx 16{,}97;\\ y = \\tfrac{4\\sqrt{2}}{3} \\approx 1{,}89$',
    c: '$xy = 32$ és $x/y = 9$ (l. levezetés)',
  },
  usedFormulas: [
    '$\\log_b A + \\log_b B = \\log_b(AB)$',
    '$\\log_b A - \\log_b B = \\log_b(A/B)$',
    'logaritmus inverze: $\\log_b A = c \\Leftrightarrow A = b^c$',
  ],
};

export default { meta, problem, solution };
