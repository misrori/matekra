import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-15',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'II.A',
  number: 15,
  title: 'Másodfokú függvény vizsgálata',
  points: 12,
  topics: ['függvények', 'egyenletek'],
  difficulty: 3,
  fgvt: [
    { page: 41, note: 'másodfokú függvény' },
    { page: 27, note: 'másodfokú egyenlet' },
  ],
  estimatedMinutes: 15,
};

// f(x) = x^2 - 4x - 5 = (x-5)(x+1)
// Zéróhelyek: x = 5, x = -1
// Tengelypont: x_0 = -b/(2a) = 4/2 = 2, y = 4 - 8 - 5 = -9
// Metszi y tengelyt: f(0) = -5
// f(x) = 7 esetén: x^2 - 4x - 5 = 7 → x^2 - 4x - 12 = 0 → D = 16+48 = 64, x = (4±8)/2 = 6 vagy -2

function ParabolaPlot({ showRoots = false, showVertex = false, showTarget = false, showY = false }) {
  const xMin = -4, xMax = 8, yMin = -12, yMax = 12;
  const w = 380, h = 300, x0 = 50, y0 = 30;
  const sx = (v) => x0 + ((v - xMin) / (xMax - xMin)) * w;
  const sy = (v) => y0 + h - ((v - yMin) / (yMax - yMin)) * h;
  const f = (x) => x * x - 4 * x - 5;
  const N = 200;
  const path = [];
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = f(x);
    if (y >= yMin && y <= yMax) {
      path.push(`${path.length === 0 ? 'M' : 'L'} ${sx(x)},${sy(y)}`);
    }
  }
  return (
    <SvgCanvas width={460} height={360} viewBox="0 0 460 360">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={2} />
      <path d={path.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2" />
      {showY && (
        <>
          <circle cx={sx(0)} cy={sy(-5)} r="4" fill="#8b5cf6" />
          <text x={sx(0) + 8} y={sy(-5) + 4} fontSize="12" fontWeight="bold" fill="#8b5cf6">(0; −5)</text>
        </>
      )}
      {showRoots && (
        <>
          <circle cx={sx(-1)} cy={sy(0)} r="4" fill="#dc2626" />
          <circle cx={sx(5)} cy={sy(0)} r="4" fill="#dc2626" />
          <text x={sx(-1) - 10} y={sy(0) - 8} fontSize="12" fontWeight="bold" fill="#dc2626">−1</text>
          <text x={sx(5) + 6} y={sy(0) - 8} fontSize="12" fontWeight="bold" fill="#dc2626">5</text>
        </>
      )}
      {showVertex && (
        <>
          <circle cx={sx(2)} cy={sy(-9)} r="5" fill="#16a34a" />
          <text x={sx(2) + 8} y={sy(-9) + 4} fontSize="12" fontWeight="bold" fill="#16a34a">(2; −9)</text>
        </>
      )}
      {showTarget && (
        <>
          <line x1={sx(xMin)} y1={sy(7)} x2={sx(xMax)} y2={sy(7)} stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5,3" />
          <circle cx={sx(-2)} cy={sy(7)} r="4" fill="#f59e0b" />
          <circle cx={sx(6)} cy={sy(7)} r="4" fill="#f59e0b" />
          <text x={sx(-2) - 10} y={sy(7) - 8} fontSize="12" fontWeight="bold" fill="#f59e0b">−2</text>
          <text x={sx(6) + 6} y={sy(7) - 8} fontSize="12" fontWeight="bold" fill="#f59e0b">6</text>
          <text x={sx(xMax) - 2} y={sy(7) - 6} fontSize="11" fill="#f59e0b">y = 7</text>
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott az $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2 - 4x - 5$ függvény.

**a)** Hol metszi a függvény grafikonja az $x$-tengelyt (zéróhelyek)? Írja fel a hozzájuk tartozó pontok koordinátáit!
**b)** Hol metszi a grafikon az $y$-tengelyt?
**c)** Határozza meg a függvény **szélsőértékét** (minimumát vagy maximumát), és jelölje meg, hol veszi azt fel!
**d)** Mely valós $x$ értékekre lesz $f(x) = 7$?`,
  figure: () => <ParabolaPlot />,
  asked: [
    { key: 'roots', label: 'zéróhelyek = ?' },
    { key: 'yint', label: '$f(0) = ?$' },
    { key: 'ext', label: 'szélsőérték = ?' },
    { key: 'x7', label: '$f(x) = 7 \\Rightarrow x = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A zéróhelyek képlete',
      points: 1,
      body: `A zéróhelyek azok az $x$ értékek, ahol $f(x) = 0$, azaz:

$$x^2 - 4x - 5 = 0.$$`,
    },
    {
      title: 'a/2. lépés — Szorzattá alakítás vagy megoldóképlet',
      points: 2,
      body: `Keressünk két olyan számot, amelyek összege $4$ és szorzata $-5$: ezek a $5$ és a $-1$.

$$x^2 - 4x - 5 = (x - 5)(x + 1) = 0.$$

Tehát $x_1 = 5$, $x_2 = -1$.

**Ellenőrzés diszkriminánssal:** $D = 16 + 20 = 36$, $\\sqrt{D} = 6$; $x = \\tfrac{4 \\pm 6}{2} = 5$ vagy $-1$ ✓.

A grafikon az $x$-tengelyt a $(5;\\ 0)$ és a $(-1;\\ 0)$ pontban metszi.`,
      figure: () => <ParabolaPlot showRoots />,
    },
    {
      title: 'b) lépés — Az y-tengelymetszet',
      points: 1,
      body: `Az $y$-tengelyt ott metszi a grafikon, ahol $x = 0$:

$$f(0) = 0^2 - 4 \\cdot 0 - 5 = -5.$$

A metszéspont: $(0;\\ -5)$.`,
      figure: () => <ParabolaPlot showY />,
    },
    {
      title: 'c/1. lépés — A parabola nyílásiránya',
      points: 1,
      body: `A főegyüttható $a = 1 > 0$, ezért a parabola **felfelé** nyílik. Így létezik **minimum** (nincs maximuma), és a minimum a parabola **tengelypontjában** (csúcsában) van.`,
    },
    {
      title: 'c/2. lépés — A tengelypont meghatározása',
      points: 3,
      body: `A másodfokú függvény csúcspontjának $x$-koordinátája:

$$x_0 = -\\dfrac{b}{2a} = -\\dfrac{-4}{2 \\cdot 1} = 2.$$

A minimum értéke:

$$f(2) = 2^2 - 4 \\cdot 2 - 5 = 4 - 8 - 5 = -9.$$

Tehát a függvénynek **$x = 2$** helyen **minimuma** van, értéke $-9$. A tengelypont: $(2;\\ -9)$.

**Teljes négyzetté alakítással** is ellenőrizhetjük:
$$f(x) = x^2 - 4x - 5 = (x - 2)^2 - 4 - 5 = (x - 2)^2 - 9.$$
A $(x-2)^2 \\geq 0$, minimuma $0$ (amikor $x = 2$), így $f$ minimuma $-9$ ✓.`,
      figure: () => <ParabolaPlot showVertex />,
    },
    {
      title: 'd/1. lépés — Az f(x) = 7 egyenlet',
      points: 2,
      body: `$$x^2 - 4x - 5 = 7,$$
$$x^2 - 4x - 12 = 0.$$

Diszkrimináns: $D = 16 + 48 = 64$, $\\sqrt{D} = 8$.

$$x = \\dfrac{4 \\pm 8}{2}.$$

$x_1 = 6$, $x_2 = -2$.`,
    },
    {
      title: 'd/2. lépés — Ellenőrzés',
      points: 2,
      body: `**Ellenőrzés:**
- $f(6) = 36 - 24 - 5 = 7$ ✓
- $f(-2) = 4 + 8 - 5 = 7$ ✓

Tehát $\\boxed{x \\in \\{-2;\\ 6\\}}$.

Szimmetria: a két megoldás egyenlő távolságra van a $x_0 = 2$ tengelytől ($2 - (-2) = 4$ és $6 - 2 = 4$) ✓.`,
      figure: () => <ParabolaPlot showVertex showTarget />,
    },
  ],
  finalAnswer: {
    roots: '$(-1;\\ 0)$ és $(5;\\ 0)$',
    yint: '$(0;\\ -5)$',
    ext: 'minimum $-9$ (az $x = 2$ helyen)',
    x7: '$x = -2$ vagy $x = 6$',
  },
  usedFormulas: [
    '$x_0 = -\\tfrac{b}{2a}$ (tengelypont)',
    'teljes négyzetté alakítás',
    '$x_{1,2} = \\tfrac{-b \\pm \\sqrt{D}}{2a}$',
  ],
};

export default { meta, problem, solution };
