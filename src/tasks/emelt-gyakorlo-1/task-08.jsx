import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-08',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'II',
  number: 8,
  title: 'Sorozatok — számtani és mértani együtt; pénzügy',
  points: 16,
  topics: ['számtani sorozat', 'mértani sorozat', 'exponenciális'],
  difficulty: 4,
  fgvt: [
    { page: 34, note: 'számtani sorozat' },
    { page: 35, note: 'mértani sorozat' },
    { page: 36, note: 'kamatos kamat' },
  ],
  estimatedMinutes: 22,
};

/*
  Saját feladat:
  Legyen (a_n) számtani sorozat: a_1 = 4, d = 3.
    a_n = 4 + 3(n-1) = 3n + 1.
    a_2 = 7, a_3 = 10, a_4 = 13, a_5 = 16, ...
    S_n = n(a_1 + a_n)/2 = n(4 + 3n+1)/2 = n(3n+5)/2
    S_10 = 10*35/2 = 175
  Mértani sorozat (b_n): b_1 = 2, q = 3.
    b_n = 2 * 3^(n-1)
    b_2 = 6, b_3 = 18, b_4 = 54, b_5 = 162
    S_n^(b) = 2 * (3^n - 1)/(3-1) = (3^n - 1)

  a) (3 pt) Határozza meg a_1, a_2, ..., a_10 sorozat első 10 tagjának összegét.
     S_10 = 175
  b) (3 pt) Az (a_n) sorozat mely n-edik tagja egyenlő 67-tel?
     3n + 1 = 67 -> n = 22.
  c) (3 pt) Hány tag összege éri el (először) az 1000-et?
     S_n = n(3n+5)/2 >= 1000
     3n^2 + 5n >= 2000
     3n^2 + 5n - 2000 >= 0
     n = (-5 + sqrt(25 + 24000))/6 = (-5 + sqrt(24025))/6 = (-5 + 155)/6 = 25
     S_25 = 25*(75+5)/2 = 25*40 = 1000 — pontosan elérjük n=25-nél.
  d) (3 pt) A (b_n) mértani sorozat első 8 tagjának összege?
     S_8 = 2 * (3^8 - 1)/2 = 6561 - 1 = 6560
  e) (4 pt) Pénzügyi rész: Ági 2024-től minden év január 1-jén elhelyez 300 000 Ft-ot egy
     számlán, amely évi 5%-os kamatot ad (kamatos kamat, évente). Mennyi pénze lesz a
     10. befizetést követő nap (azaz 2033. január 1. után, a kamatok hozzáírása nélkül ezen a napon)?
     Első befizetés: 300 000 * 1.05^9 (9 teljes év kamat érik)
     Utolsó befizetés: 300 000 * 1.05^0 = 300 000
     Ez egy mértani sorozat összeg, q = 1.05.
     S = 300 000 * (1.05^10 - 1)/(1.05 - 1) = 300 000 * (1.628894627 - 1)/0.05
       = 300 000 * 0.628894627 / 0.05
       = 300 000 * 12.57789254
       = 3 773 367.76
     Kerekítve: ~3 773 368 Ft.

     Ellenőrzés: 1.05^10 = 1.6288946268...
     -> S ≈ 3 773 368 Ft.
*/

function ArithGraph() {
  const x0 = 50, y0 = 20, w = 400, h = 240;
  const xMin = 0, xMax = 12, yMin = 0, yMax = 42;
  const sx = (x) => x0 + ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y) => y0 + h - ((y - yMin) / (yMax - yMin)) * h;
  const pts = [];
  for (let n = 1; n <= 11; n++) pts.push([n, 3 * n + 1]);
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={5} xLabel="n" yLabel="a_n" />
      {pts.map(([n, a], i) => (
        <g key={i}>
          <line x1={sx(n)} y1={sy(0)} x2={sx(n)} y2={sy(a)} stroke="#1d4ed8" strokeWidth="1.5" />
          <circle cx={sx(n)} cy={sy(a)} r="4" fill="#1d4ed8" />
          <text x={sx(n)} y={sy(a) - 8} fontSize="10" fill="#111" textAnchor="middle">{a}</text>
        </g>
      ))}
      <text x="260" y="16" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        (a_n) = 4, 7, 10, 13, … (számtani, d = 3)
      </text>
    </SvgCanvas>
  );
}

function GeomGraph() {
  const x0 = 50, y0 = 20, w = 400, h = 240;
  const xMin = 0, xMax = 9, yMin = 0, yMax = 200;
  const sx = (x) => x0 + ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y) => y0 + h - ((y - yMin) / (yMax - yMin)) * h;
  const pts = [];
  for (let n = 1; n <= 6; n++) pts.push([n, 2 * Math.pow(3, n - 1)]);
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={40} xLabel="n" yLabel="b_n" />
      {pts.map(([n, b], i) => (
        <g key={i}>
          <line x1={sx(n)} y1={sy(0)} x2={sx(n)} y2={sy(Math.min(yMax, b))} stroke="#dc2626" strokeWidth="1.5" />
          <circle cx={sx(n)} cy={sy(Math.min(yMax, b))} r="4" fill="#dc2626" />
          <text x={sx(n)} y={sy(Math.min(yMax, b)) - 8} fontSize="10" fill="#111" textAnchor="middle">{b}</text>
        </g>
      ))}
      <text x="260" y="16" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        (b_n) = 2, 6, 18, 54, … (mértani, q = 3; exponenciális növekedés)
      </text>
    </SvgCanvas>
  );
}

function SavingsGraph() {
  const x0 = 60, y0 = 20, w = 400, h = 240;
  const xMin = 0, xMax = 11, yMin = 0, yMax = 4000000;
  const sx = (x) => x0 + ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y) => y0 + h - ((y - yMin) / (yMax - yMin)) * h;
  // Az n-edik befizetés után a számlán lévő pénz:
  //   S_n = 300000 * ((1.05)^n - 1)/0.05   ha a kamatok épp aznap írtak, DE
  //   itt a kamatot év elején írják, tehát ez a rekurencia: S_n = (S_{n-1}) * 1.05 + 300000
  // Jól közelít az első képlettel (év eleji befizetés, aznap kamat is):
  const pts = [];
  let s = 0;
  for (let n = 1; n <= 10; n++) {
    // év elején először kamatozódik a régi összeg, majd hozzáadjuk az újat
    s = s * 1.05 + 300000;
    pts.push([n, s]);
  }
  const d = pts.map(([n, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(n).toFixed(1)} ${sy(y).toFixed(1)}`).join(' ');
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={500000} xLabel="n (év)" yLabel="S_n (Ft)" />
      <path d={d} fill="none" stroke="#16a34a" strokeWidth="2.5" />
      {pts.map(([n, y], i) => (
        <circle key={i} cx={sx(n)} cy={sy(y)} r="4" fill="#16a34a" />
      ))}
      <text x="280" y="16" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        Megtakarítás növekedése (éves 300 000 Ft befizetéssel, 5% kamattal)
      </text>
      <text x={sx(10) + 8} y={sy(pts[9][1]) + 4} fontSize="11" fill="#16a34a" fontWeight="bold">
        ≈ 3 773 368 Ft
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Legyen $(a_n)$ olyan **számtani** sorozat, amelyben $a_1 = 4$ és a differencia $d = 3$. Legyen $(b_n)$ olyan **mértani** sorozat, amelyben $b_1 = 2$ és a hányados $q = 3$.

**a)** Számítsa ki az $(a_n)$ sorozat első 10 tagjának összegét. ($3$ pont)

**b)** Hányadik tagja az $(a_n)$ sorozatnak $67$? ($3$ pont)

**c)** Határozza meg azt a legkisebb $n$ pozitív egész számot, amelyre $a_1 + a_2 + \\dots + a_n \\geq 1000$. ($3$ pont)

**d)** Számítsa ki a $(b_n)$ sorozat első 8 tagjának összegét. ($3$ pont)

**e)** **Pénzügy.** Ági $2024$. január $1$-jén és minden rákövetkező év január $1$-jén $300\\,000$ Ft-ot helyez el egy számlán, amely évente $5\\%$-os **kamatos kamatot** jóváír az év elején (közvetlenül a befizetés előtt). Mennyi pénz lesz a számlán a **$10$. befizetés** után ($2033$. január $1$-jén, az aznapi befizetést is beleértve)? ($4$ pont)`,
  figure: () => <ArithGraph />,
  asked: [
    { key: 'a', label: 'a) $S_{10}^{(a)} = ?$' },
    { key: 'b', label: 'b) $a_n = 67 \\Rightarrow n = ?$' },
    { key: 'c', label: 'c) legkisebb $n$: $S_n^{(a)} \\geq 1000$' },
    { key: 'd', label: 'd) $S_8^{(b)} = ?$' },
    { key: 'e', label: 'e) megtakarítás $10$ év után' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — A számtani sorozat általános tagja',
      points: 1,
      body: `A számtani sorozat $n$-edik tagja:

$$a_n = a_1 + (n-1) d = 4 + 3(n-1) = 3n + 1.$$

Így $a_{10} = 3 \\cdot 10 + 1 = 31.$`,
    },
    {
      title: 'a) 2. lépés — Az első 10 tag összege',
      points: 2,
      body: `Az $n$-edik részletösszeg:

$$S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2}.$$

$$S_{10} = \\dfrac{(4 + 31) \\cdot 10}{2} = \\dfrac{35 \\cdot 10}{2} = 175.$$

$$\\boxed{S_{10}^{(a)} = 175.}$$`,
      figure: () => <ArithGraph />,
    },
    {
      title: 'b) lépés — $a_n = 67$ megoldása',
      points: 3,
      body: `$$3n + 1 = 67 \\iff 3n = 66 \\iff n = 22.$$

Ellenőrzés: $a_{22} = 4 + 3 \\cdot 21 = 4 + 63 = 67$ ✓.

$$\\boxed{n = 22.}$$`,
    },
    {
      title: 'c) 1. lépés — A részösszeg általánosan',
      points: 1,
      body: `$$S_n = \\dfrac{(a_1 + a_n) n}{2} = \\dfrac{(4 + 3n + 1) n}{2} = \\dfrac{n(3n + 5)}{2}.$$

Feltétel: $S_n \\geq 1000$, azaz

$$\\dfrac{n(3n+5)}{2} \\geq 1000 \\iff n(3n+5) \\geq 2000 \\iff 3n^2 + 5n - 2000 \\geq 0.$$`,
    },
    {
      title: 'c) 2. lépés — Másodfokú egyenlőtlenség',
      points: 2,
      body: `A $3n^2 + 5n - 2000 = 0$ gyökei:

$$n = \\dfrac{-5 \\pm \\sqrt{25 + 24\\,000}}{6} = \\dfrac{-5 \\pm \\sqrt{24\\,025}}{6} = \\dfrac{-5 \\pm 155}{6}.$$

A két gyök: $n = 25$ és $n = -\\dfrac{160}{6} \\approx -26{,}67$.

Mivel a parabola felfele nyílik, $3n^2 + 5n - 2000 \\geq 0$ teljesül $n \\geq 25$ esetén (a negatív gyök nem érdekes, mert $n$ pozitív egész).

**Ellenőrzés:** $S_{25} = \\frac{25 \\cdot (75 + 5)}{2} = \\frac{25 \\cdot 80}{2} = 1000$ — pontosan. $S_{24} = \\frac{24 \\cdot 77}{2} = 924 < 1000$ ✓.

$$\\boxed{n_\\text{min} = 25.}$$`,
    },
    {
      title: 'd) lépés — A mértani sorozat részösszege',
      points: 3,
      body: `$b_n = b_1 q^{n-1} = 2 \\cdot 3^{n-1}$. A részösszeg képlete $q \\neq 1$-re:

$$S_n^{(b)} = b_1 \\cdot \\dfrac{q^n - 1}{q - 1}.$$

$n = 8$ és $q = 3$:

$$S_8^{(b)} = 2 \\cdot \\dfrac{3^8 - 1}{3 - 1} = 2 \\cdot \\dfrac{6561 - 1}{2} = 6560.$$

$$\\boxed{S_8^{(b)} = 6560.}$$`,
      figure: () => <GeomGraph />,
    },
    {
      title: 'e) 1. lépés — A befizetések modellezése',
      points: 1,
      body: `A szöveg szerint év elején kamatoznak a már számlán lévő pénzek $5\\%$-kal, és **utána** jóváírják a $300\\,000$ Ft-os befizetést.

Jelölje $S_n$ a számla egyenlegét a $n$-edik befizetés után. Rekurzív szabály:

$$S_n = S_{n-1} \\cdot 1{,}05 + 300\\,000, \\qquad S_0 = 0.$$

Ez egy **kamatozó annuitás**. A zárt alak (a kamatos kamat geometriai sor alkalmazásával):

$$S_n = 300\\,000 \\cdot \\dfrac{1{,}05^n - 1}{1{,}05 - 1} = 300\\,000 \\cdot \\dfrac{1{,}05^n - 1}{0{,}05}.$$`,
    },
    {
      title: 'e) 2. lépés — $1{,}05^{10}$ kiszámítása',
      points: 1,
      body: `$1{,}05^2 = 1{,}1025$; $1{,}05^4 = 1{,}1025^2 = 1{,}21550625$.
$1{,}05^5 = 1{,}05^4 \\cdot 1{,}05 = 1{,}2762815625$.
$1{,}05^{10} = (1{,}05^5)^2 \\approx 1{,}6288946268$.

A 4 tizedesjegyig: $1{,}05^{10} \\approx 1{,}6289$.`,
    },
    {
      title: 'e) 3. lépés — A végösszeg',
      points: 2,
      body: `$$S_{10} = 300\\,000 \\cdot \\dfrac{1{,}6288946268 - 1}{0{,}05} = 300\\,000 \\cdot \\dfrac{0{,}6288946268}{0{,}05}.$$

$$S_{10} = 300\\,000 \\cdot 12{,}5778925 \\approx 3\\,773\\,367{,}76 \\text{ Ft}.$$

Kerekítve:

$$\\boxed{S_{10} \\approx 3\\,773\\,368 \\text{ Ft (kb. 3,77 millió Ft).}}$$

**Alternatív ellenőrzés** — a 10 befizetés mértani sorozatot alkot a mai értékükre vetítve: az első 9 évet kamatozva érte el $300\\,000 \\cdot 1{,}05^9$, az utolsó most érkezett $300\\,000$. Összegük éppen a fenti képletet adja.`,
      figure: () => <SavingsGraph />,
    },
  ],
  finalAnswer: {
    a: '$S_{10}^{(a)} = 175$',
    b: '$n = 22$',
    c: '$n_\\min = 25$ (mert $S_{25} = 1000$)',
    d: '$S_8^{(b)} = 6560$',
    e: '$S_{10} \\approx 3\\,773\\,368$ Ft',
  },
  usedFormulas: [
    '$a_n = a_1 + (n-1)d$',
    '$S_n^{(a)} = (a_1 + a_n)n/2$',
    'másodfokú egyenlet megoldóképlete',
    '$b_n = b_1 q^{n-1}$',
    '$S_n^{(b)} = b_1 (q^n-1)/(q-1)$',
    'kamatos kamat és annuitás (mértani sorozat összegképlete)',
  ],
};

export default { meta, problem, solution };
