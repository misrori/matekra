import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-4-02',
  year: 2024,
  session: 'emelt gyakorló · 4. teszt',
  level: 'emelt',
  part: 'I',
  number: 2,
  title: 'Abszolút értékes trigonometriai egyenlet',
  points: 13,
  topics: ['trigonometria', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 57, note: 'szögfüggvény értékek' },
    { page: 58, note: 'trigonometriai azonosságok' },
  ],
  estimatedMinutes: 20,
};

/**
 *  |2 sin x - 1| = cos 2x   [0; 2π]
 *  cos 2x = 1 - 2 sin^2 x
 *  s = sin x:    |2s - 1| = 1 - 2s^2
 *  RHS ≥ 0  <=>  s^2 ≤ 1/2  <=>  -√2/2 ≤ s ≤ √2/2
 *
 *  Eset A (2s-1 ≥ 0, azaz s ≥ 1/2):
 *      2s - 1 = 1 - 2s^2  =>  2s^2 + 2s - 2 = 0  =>  s^2 + s - 1 = 0
 *      s = (-1 ± √5) / 2.  Pozitív gyök: s = (√5 - 1)/2 ≈ 0,618.
 *      (√5-1)/2 ≈ 0,618 > 1/2, és < √2/2 ≈ 0,707 ✓
 *
 *  Eset B (s < 1/2):
 *      1 - 2s = 1 - 2s^2 =>  2s^2 - 2s = 0  =>  s(s - 1) = 0 => s = 0 (s=1 nem kell).
 *
 *  Megoldások [0; 2π]-ban:
 *   s = 0:                x ∈ {0, π, 2π}
 *   s = (√5-1)/2:         x ≈ 0,6662 rad ≈ 38,17°; x ≈ π - 0,6662 ≈ 2,4754 rad ≈ 141,83°
 *   Összesen 5 gyök.
 */

function TrigPlot({ highlight = 'none' }) {
  // f(x) = |2 sin x - 1| - cos 2x;  megjelenítsük külön a két oldalt
  const x0 = 40, y0 = 30, w = 450, h = 250;
  const xMin = 0, xMax = 2 * Math.PI;
  const yMin = -1.5, yMax = 3.5;
  const sx = (v) => x0 + ((v - xMin) / (xMax - xMin)) * w;
  const sy = (v) => y0 + h - ((v - yMin) / (yMax - yMin)) * h;

  const N = 360;
  const lhs = [], rhs = [];
  for (let i = 0; i <= N; i++) {
    const x = xMin + ((xMax - xMin) * i) / N;
    lhs.push([x, Math.abs(2 * Math.sin(x) - 1)]);
    rhs.push([x, Math.cos(2 * x)]);
  }
  const mkPath = (pts) => pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(2)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(2)}`).join(' ');

  // megoldások
  const s1 = (Math.sqrt(5) - 1) / 2;
  const xA = Math.asin(s1);
  const sols = [
    { x: 0, label: '0' },
    { x: xA, label: '≈0,67' },
    { x: Math.PI - xA, label: '≈2,48' },
    { x: Math.PI, label: 'π' },
    { x: 2 * Math.PI, label: '2π' },
  ];
  // π tick jelölések
  const xTicks = [
    { v: 0, lab: '0' },
    { v: Math.PI / 2, lab: 'π/2' },
    { v: Math.PI, lab: 'π' },
    { v: (3 * Math.PI) / 2, lab: '3π/2' },
    { v: 2 * Math.PI, lab: '2π' },
  ];

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      {/* háttér rácsvonal x tengely mentén π-ekhez */}
      {xTicks.map((t) => (
        <line key={`gx${t.v}`} x1={sx(t.v)} y1={y0} x2={sx(t.v)} y2={y0 + h} stroke="#eee" />
      ))}
      {/* y=0 tengely */}
      <line x1={x0} y1={sy(0)} x2={x0 + w} y2={sy(0)} stroke="#1a1a1a" strokeWidth="1.3" />
      {/* x=0 tengely */}
      <line x1={sx(0)} y1={y0} x2={sx(0)} y2={y0 + h} stroke="#1a1a1a" strokeWidth="1.3" />

      {/* y labels */}
      {[-1, 0, 1, 2, 3].map((v) => (
        <g key={`yt${v}`}>
          <line x1={x0 - 3} y1={sy(v)} x2={x0 + 3} y2={sy(v)} stroke="#1a1a1a" />
          <text x={x0 - 6} y={sy(v) + 3} fontSize="11" textAnchor="end" fill="#444">{v}</text>
        </g>
      ))}
      {xTicks.map((t) => (
        <g key={`xt${t.v}`}>
          <line x1={sx(t.v)} y1={sy(0) - 3} x2={sx(t.v)} y2={sy(0) + 3} stroke="#1a1a1a" />
          <text x={sx(t.v)} y={sy(0) + 14} fontSize="11" textAnchor="middle" fill="#444">{t.lab}</text>
        </g>
      ))}

      <path d={mkPath(lhs)} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <path d={mkPath(rhs)} fill="none" stroke="#dc2626" strokeWidth="2.5" />

      <text x={x0 + 10} y={y0 + 14} fontSize="12" fill="#2563eb" fontWeight="700">|2 sin x − 1|</text>
      <text x={x0 + 10} y={y0 + 30} fontSize="12" fill="#dc2626" fontWeight="700">cos 2x</text>

      {/* metszéspontok */}
      {sols.map((p, i) => (
        <g key={`sol${i}`}>
          <circle cx={sx(p.x)} cy={sy(Math.abs(2 * Math.sin(p.x) - 1))} r="5" fill="#16a34a" />
          {highlight !== 'none' && (
            <text x={sx(p.x)} y={sy(Math.abs(2 * Math.sin(p.x) - 1)) - 10} fontSize="11" textAnchor="middle" fill="#166534" fontWeight="700">{p.label}</text>
          )}
        </g>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg az alábbi egyenletet a $[0;\\ 2\\pi]$ intervallumon:

$$\\lvert 2\\sin x - 1 \\rvert \\;=\\; \\cos 2x.$$

**a)** Adja meg, milyen feltételnek kell teljesülnie a $\\cos 2x$-re ahhoz, hogy az egyenletnek legyen megoldása! Mit jelent ez $\\sin x$-re? ($3$ pont)

**b)** Bontsa esetekre az abszolút érték feloldásával és keresse meg $\\sin x$ összes lehetséges értékét! ($6$ pont)

**c)** Adja meg az $x$ megoldásokat a $[0;\\ 2\\pi]$ intervallumon (radiánban, négy tizedesjegyre)! ($4$ pont)`,
  figure: () => <TrigPlot />,
  asked: [
    { key: 'cond', label: 'a) feltétel $\\sin x$-re' },
    { key: 'sinx', label: 'b) $\\sin x \\in$ ?' },
    { key: 'x', label: 'c) $x \\in$ ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Átalakítás egyváltozós egyenletté',
      points: 1,
      body: `A bal oldalon $\\sin x$ szerepel, a jobb oldalon pedig $\\cos 2x$. A **cosinus kettős szögének** egyik alakja (függvénytábla, 58. o.):

$$\\cos 2x = 1 - 2\\sin^2 x.$$

Vezessük be az $s = \\sin x$ jelölést (ahol $-1 \\le s \\le 1$). Az egyenlet:

$$\\lvert 2s - 1 \\rvert = 1 - 2s^2.$$`,
    },
    {
      title: 'a) lépés — A jobb oldal előjele',
      points: 2,
      body: `Az abszolút érték **mindig nemnegatív**, ezért az egyenlet csak akkor oldható meg, ha a jobb oldal is $\\ge 0$:

$$1 - 2s^2 \\ge 0 \\;\\Longleftrightarrow\\; s^2 \\le \\dfrac{1}{2} \\;\\Longleftrightarrow\\; -\\dfrac{\\sqrt{2}}{2} \\le s \\le \\dfrac{\\sqrt{2}}{2}.$$

Azaz $\\lvert \\sin x \\rvert \\le \\tfrac{\\sqrt{2}}{2}$ — tehát csak olyan $x$ jöhet szóba, ahol $\\sin x$ legfeljebb $\\approx 0{,}707$.`,
    },
    {
      title: 'b/1. lépés — Az abszolút érték feloldása, A eset',
      points: 2,
      body: `**A eset: $2s - 1 \\ge 0$, azaz $s \\ge \\tfrac{1}{2}$.**

Ekkor $\\lvert 2s-1 \\rvert = 2s - 1$:

$$2s - 1 = 1 - 2s^2 \\;\\Longrightarrow\\; 2s^2 + 2s - 2 = 0 \\;\\Longrightarrow\\; s^2 + s - 1 = 0.$$

Megoldóképlet:

$$s = \\dfrac{-1 \\pm \\sqrt{1 + 4}}{2} = \\dfrac{-1 \\pm \\sqrt{5}}{2}.$$

A két érték kb. $0{,}618$ és $-1{,}618$. A feltétel ($s \\ge \\tfrac12$) és a korábbi $s \\le \\tfrac{\\sqrt2}{2} \\approx 0{,}707$ miatt csak:

$$s_1 = \\dfrac{\\sqrt{5} - 1}{2} \\approx 0{,}6180.$$`,
    },
    {
      title: 'b/2. lépés — A B eset',
      points: 2,
      body: `**B eset: $2s - 1 < 0$, azaz $s < \\tfrac{1}{2}$.**

Ekkor $\\lvert 2s - 1 \\rvert = 1 - 2s$:

$$1 - 2s = 1 - 2s^2 \\;\\Longrightarrow\\; 2s^2 - 2s = 0 \\;\\Longrightarrow\\; 2s(s - 1) = 0.$$

Így $s = 0$ vagy $s = 1$. A $s < \\tfrac{1}{2}$ feltétel miatt **$s = 1$ kiesik**, marad $s_2 = 0$.

**Ellenőrzés** $s=0$: $|0 - 1| = 1$, $1 - 0 = 1$. ✓`,
    },
    {
      title: 'b/3. lépés — A $\\sin x$ lehetséges értékei',
      points: 2,
      body: `Összegezve:

$$\\boxed{\\sin x = 0 \\quad\\text{vagy}\\quad \\sin x = \\dfrac{\\sqrt{5} - 1}{2}.}$$

**Érdekesség:** a $\\tfrac{\\sqrt{5}-1}{2}$ az aranymetszés reciproka, $\\Phi - 1 \\approx 0{,}6180$.`,
    },
    {
      title: 'c/1. lépés — A $\\sin x = 0$ megoldásai',
      points: 2,
      body: `A $[0;\\ 2\\pi]$ intervallumon $\\sin x = 0$:

$$x = 0, \\quad x = \\pi, \\quad x = 2\\pi.$$

**Ellenőrzés** $x = \\pi/2$-vel kapcsolatban: ott $\\sin x = 1$, ami **nem** tartozik az egyenlet megoldásához (a feltétel miatt sem).`,
    },
    {
      title: 'c/2. lépés — A $\\sin x = \\tfrac{\\sqrt5 - 1}{2}$ megoldásai',
      points: 2,
      body: `Legyen $\\alpha = \\arcsin\\!\\left(\\tfrac{\\sqrt{5}-1}{2}\\right)$.

Számológéppel: $\\alpha \\approx 0{,}6662$ rad ($\\approx 38{,}17°$).

A $[0;\\ 2\\pi]$ intervallumon $\\sin x = \\text{pozitív}$ két helyen:

- $x = \\alpha \\approx 0{,}6662$ rad,
- $x = \\pi - \\alpha \\approx 3{,}1416 - 0{,}6662 = 2{,}4754$ rad.

**Összes megoldás a $[0;\\ 2\\pi]$-n:**

$$\\boxed{x \\in \\{0,\\ 0{,}6662,\\ 2{,}4754,\\ \\pi,\\ 2\\pi\\}\\ \\text{rad}.}$$

**Ellenőrzés $x \\approx 0{,}6662$-re:** $\\sin x \\approx 0{,}618$, $|2 \\cdot 0{,}618 - 1| = |0{,}236| = 0{,}236$; $\\cos(2 \\cdot 0{,}6662) = \\cos 1{,}3324 \\approx 0{,}236$. ✓`,
      figure: () => <TrigPlot highlight="labels" />,
    },
  ],
  finalAnswer: {
    cond: '$1 - 2\\sin^2 x \\ge 0$, azaz $|\\sin x| \\le \\tfrac{\\sqrt2}{2}$',
    sinx: '$\\sin x = 0$ vagy $\\sin x = \\tfrac{\\sqrt{5}-1}{2}$',
    x: '$\\{0,\\ 0{,}6662,\\ 2{,}4754,\\ \\pi,\\ 2\\pi\\}$ rad',
  },
  usedFormulas: [
    '$\\cos 2x = 1 - 2\\sin^2 x$',
    'abszolút érték esetbontás',
    'másodfokú megoldóképlet',
    '$\\arcsin$ és a szinusz szimmetriája ($\\pi - \\alpha$)',
  ],
};

export default { meta, problem, solution };
