import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-4-03',
  year: 2024,
  session: 'emelt gyakorló · 4. teszt',
  level: 'emelt',
  part: 'I',
  number: 3,
  title: 'Logaritmus egyenletrendszer',
  points: 12,
  topics: ['logaritmus', 'egyenletek'],
  difficulty: 3,
  fgvt: [
    { page: 24, note: 'logaritmus azonosságai' },
    { page: 27, note: 'másodfokú megoldóképlet' },
  ],
  estimatedMinutes: 16,
};

/**
 *  (I) rendszer:
 *     lg(xy) = 3
 *     lg x - lg y = 1
 *  Ebből: xy = 10^3 = 1000; x/y = 10 => x = 10y; 10y^2 = 1000 => y = 10, x = 100.
 *
 *  (II) rendszer (d pont):
 *     lg x + lg y = 3
 *     (lg x)(lg y) = 2
 *  Ha u = lg x, v = lg y:  u+v=3, uv=2 => t^2 - 3t + 2 = 0 => t=1 vagy t=2
 *  => {lg x, lg y} = {1, 2} => {x, y} = {10, 100}
 */

function LogPlot() {
  // mutatjuk a lg függvényt és x=100, y=10 pontokat
  const x0 = 50, y0 = 30, w = 430, h = 250;
  const xMin = 0, xMax = 120;
  const yMin = -1, yMax = 3;
  const sx = (v) => x0 + ((v - xMin) / (xMax - xMin)) * w;
  const sy = (v) => y0 + h - ((v - yMin) / (yMax - yMin)) * h;
  const pts = [];
  for (let i = 1; i <= 200; i++) {
    const x = (120 * i) / 200;
    pts.push([x, Math.log10(x)]);
  }
  const path = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`)
    .join(' ');

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={20} yStep={1} xLabel="x" yLabel="lg x" />
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      {/* megoldás pontok */}
      <g>
        <circle cx={sx(10)} cy={sy(1)} r="5" fill="#dc2626" />
        <line x1={sx(10)} y1={sy(1)} x2={sx(10)} y2={sy(0)} stroke="#dc2626" strokeDasharray="3 3" />
        <line x1={sx(10)} y1={sy(1)} x2={sx(0)} y2={sy(1)} stroke="#dc2626" strokeDasharray="3 3" />
        <text x={sx(10) + 5} y={sy(1) - 7} fontSize="12" fill="#7f1d1d" fontWeight="700">y = 10 (lg 10 = 1)</text>
      </g>
      <g>
        <circle cx={sx(100)} cy={sy(2)} r="5" fill="#16a34a" />
        <line x1={sx(100)} y1={sy(2)} x2={sx(100)} y2={sy(0)} stroke="#16a34a" strokeDasharray="3 3" />
        <line x1={sx(100)} y1={sy(2)} x2={sx(0)} y2={sy(2)} stroke="#16a34a" strokeDasharray="3 3" />
        <text x={sx(100) - 5} y={sy(2) - 7} fontSize="12" fill="#065f46" fontWeight="700" textAnchor="end">x = 100 (lg 100 = 2)</text>
      </g>
      <text x={260} y={18} fontSize="14" fontWeight="700" fill="#1e3a8a" textAnchor="middle">
        y = lg x, megoldások: (10; 1) és (100; 2)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Tekintsük az alábbi egyenletrendszert, ahol $\\lg = \\log_{10}$:

$$\\begin{cases} \\lg(x \\cdot y) = 3 \\\\ \\lg x - \\lg y = 1 \\end{cases}$$

**a)** Adja meg az értelmezési tartományt és alakítsa át a rendszert **hatvány-alakra** $x$-re és $y$-ra! ($3$ pont)

**b)** Oldja meg az így kapott rendszert! ($4$ pont)

**c)** Ellenőrizze a megoldást az **eredeti** rendszerben! ($2$ pont)

**d)** *Változat.* Oldja meg a következő rendszert is (indoklással, **Viète-formulák** segítségével):

$$\\begin{cases} \\lg x + \\lg y = 3 \\\\ \\lg x \\cdot \\lg y = 2 \\end{cases}\\quad (3\\ \\text{pont})$$`,
  figure: () => <LogPlot />,
  asked: [
    { key: 'dom', label: 'a) ÉT + $(xy) = ?$, $(x/y) = ?$' },
    { key: 'xy', label: 'b) $(x; y) = ?$' },
    { key: 'check', label: 'c) ellenőrzés' },
    { key: 'd', label: 'd) Viète-féle változat' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Értelmezési tartomány',
      points: 1,
      body: `A $\\lg$ függvény csak **pozitív** számokra van értelmezve. A rendszer tagjaiban $\\lg(xy)$, $\\lg x$, $\\lg y$ szerepelnek, tehát mindhárom argumentum pozitív:

$$\\text{ÉT:}\\quad x > 0 \\quad\\text{és}\\quad y > 0.$$

(Megjegyzés: $xy > 0$ automatikusan teljesül, ha $x, y > 0$.)`,
    },
    {
      title: 'a/2. lépés — Átalakítás hatvány-alakra',
      points: 2,
      body: `**Első egyenlet** — a logaritmus definíciója ($\\lg A = B \\Leftrightarrow A = 10^B$):

$$\\lg(xy) = 3 \\;\\Longrightarrow\\; xy = 10^3 = 1000.$$

**Második egyenlet** — a különbség-azonosság ($\\lg x - \\lg y = \\lg \\tfrac{x}{y}$) miatt:

$$\\lg\\dfrac{x}{y} = 1 \\;\\Longrightarrow\\; \\dfrac{x}{y} = 10^1 = 10.$$

A rendszer tehát egyszerű algebrai alakra hozva:

$$\\boxed{xy = 1000, \\qquad \\dfrac{x}{y} = 10.}$$`,
    },
    {
      title: 'b/1. lépés — Helyettesítés',
      points: 2,
      body: `A második egyenletből $x = 10\\,y$. Helyettesítsük be az elsőbe:

$$10y \\cdot y = 1000 \\;\\Longrightarrow\\; y^2 = 100 \\;\\Longrightarrow\\; y = \\pm 10.$$`,
    },
    {
      title: 'b/2. lépés — Értelmezési tartomány szűrése',
      points: 2,
      body: `Az ÉT szerint $y > 0$, tehát $y = -10$ **nem megoldás**. Marad:

$$y = 10 \\;\\Longrightarrow\\; x = 10 \\cdot 10 = 100.$$

$$\\boxed{(x;\\ y) = (100;\\ 10).}$$`,
      figure: () => <LogPlot />,
    },
    {
      title: 'c) lépés — Ellenőrzés az eredeti rendszerben',
      points: 2,
      body: `Behelyettesítünk $(x;y) = (100;10)$-t:

- Első egyenlet: $\\lg(100 \\cdot 10) = \\lg 1000 = \\lg 10^3 = 3.$ ✓
- Második egyenlet: $\\lg 100 - \\lg 10 = 2 - 1 = 1.$ ✓

Mindkettő teljesül, a megoldás helyes.`,
    },
    {
      title: 'd/1. lépés — A változat átírása új változókkal',
      points: 1,
      body: `Vezessük be: $u = \\lg x$, $v = \\lg y$. Az új rendszer:

$$\\begin{cases} u + v = 3 \\\\ u \\cdot v = 2 \\end{cases}$$

ÉT: $x, y > 0$ (mert $\\lg$). Viszont $u$ és $v$ **tetszőleges** valós szám lehet.`,
    },
    {
      title: 'd/2. lépés — Viète-formulák alkalmazása',
      points: 2,
      body: `Az $u, v$ számok egy olyan másodfokú egyenlet gyökei, amelynek **együtthatói** a Viète-formulák alapján adódnak: ha $u + v = s$ és $uv = p$, akkor:

$$t^2 - s\\,t + p = 0 \\;\\Longleftrightarrow\\; t^2 - 3t + 2 = 0.$$

Faktorizáció: $(t-1)(t-2) = 0$, tehát $t = 1$ vagy $t = 2$.

Így $\\{u, v\\} = \\{1, 2\\}$, azaz $\\{\\lg x, \\lg y\\} = \\{1, 2\\}$, ami $\\{x, y\\} = \\{10, 100\\}$.

**Két megoldás** (a sorrend szimmetrikus):

$$\\boxed{(x; y) = (10;\\ 100) \\quad\\text{vagy}\\quad (x; y) = (100;\\ 10).}$$

**Ellenőrzés** $(10;100)$-ra: $\\lg 10 + \\lg 100 = 1+2 = 3$ ✓; $\\lg 10 \\cdot \\lg 100 = 1 \\cdot 2 = 2$ ✓.`,
    },
  ],
  finalAnswer: {
    dom: 'ÉT: $x,y > 0$; $xy = 1000$, $x/y = 10$',
    xy: '$(x;y) = (100;\\ 10)$',
    check: '$\\lg 1000 = 3$ ✓, $\\lg 100 - \\lg 10 = 1$ ✓',
    d: '$\\{x,y\\} = \\{10,\\ 100\\}$ (Viète)',
  },
  usedFormulas: [
    '$\\lg A - \\lg B = \\lg(A/B)$',
    '$\\lg A = B \\Leftrightarrow A = 10^B$',
    'Viète-formulák',
  ],
};

export default { meta, problem, solution };
