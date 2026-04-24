import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-02',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'I',
  number: 2,
  title: 'Trigonometrikus egyenlet — kettős szög',
  points: 13,
  topics: ['trigonometria', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 57, note: 'szögfüggvény-azonosságok' },
    { page: 58, note: 'addíciós és kettős szög képletek' },
  ],
  estimatedMinutes: 18,
};

/*
  Az egyenlet:    cos(2x) + 3 sin x + 1 = 0
  Azonosság: cos(2x) = 1 - 2 sin^2 x
  -> 1 - 2 sin^2 x + 3 sin x + 1 = 0
  -> -2 s^2 + 3 s + 2 = 0  (s := sin x)
  -> 2 s^2 - 3 s - 2 = 0
  -> s = (3 ± sqrt(9+16)) / 4 = (3 ± 5)/4
  -> s = 2  (nem lehet)   vagy   s = -1/2
  sin x = -1/2  ->  x = -π/6 + 2kπ  vagy  x = π + π/6 + 2kπ = 7π/6 + 2kπ
  vagy: x = -π/6 + 2kπ  vagy  x = 7π/6 + 2kπ  (azaz 11π/6 + 2kπ és 7π/6 + 2kπ
  pozitív szögekben).
*/

function UnitCircle({ step = 0 }) {
  const cx = 260, cy = 170, R = 130;
  const P = (ang) => [cx + R * Math.cos(ang), cy - R * Math.sin(ang)];
  const angs = [
    { a: -Math.PI / 6, label: '−π/6 (=330°)', color: '#16a34a' },
    { a: (7 * Math.PI) / 6, label: '7π/6 (=210°)', color: '#16a34a' },
  ];
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* koordináta-tengelyek */}
      <line x1={cx - R - 20} y1={cy} x2={cx + R + 30} y2={cy} stroke="#111" strokeWidth="1.5" />
      <line x1={cx} y1={cy - R - 20} x2={cx} y2={cy + R + 20} stroke="#111" strokeWidth="1.5" />
      {/* egység kör */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#6b7280" strokeWidth="1.5" />
      {/* sin = -1/2 egyenes */}
      {step >= 1 && (
        <line x1={cx - R - 10} y1={cy + R / 2} x2={cx + R + 10} y2={cy + R / 2} stroke="#dc2626" strokeDasharray="5 4" strokeWidth="1.8" />
      )}
      {step >= 1 && (
        <text x={cx + R + 14} y={cy + R / 2 + 4} fontSize="12" fill="#dc2626">sin x = −½</text>
      )}
      {step >= 2 && angs.map((m, i) => {
        const [x, y] = P(m.a);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={m.color} strokeWidth="2" />
            <circle cx={x} cy={y} r="5" fill={m.color} />
            <text x={x + (m.a === -Math.PI / 6 ? 10 : -10)} y={y + 18} fontSize="12" fill={m.color} textAnchor={m.a === -Math.PI / 6 ? 'start' : 'end'}>{m.label}</text>
          </g>
        );
      })}
      {/* tengelyfeliratok */}
      <text x={cx + R + 14} y={cy - 6} fontSize="12" fill="#444">cos</text>
      <text x={cx + 6} y={cy - R - 6} fontSize="12" fill="#444">sin</text>
      <text x={cx - 6} y={cy + 14} fontSize="12" fill="#444">O</text>
      <text x={cx + R / 2.1} y={cy + R + 18} fontSize="14" fill="#111" textAnchor="middle">
        Egységkör, sin x = −1/2
      </text>
    </SvgCanvas>
  );
}

function SineGraph() {
  // f(x) = cos(2x) + 3 sin x + 1 a [0, 2π] intervallumon
  const f = (x) => Math.cos(2 * x) + 3 * Math.sin(x) + 1;
  const pts = [];
  const N = 200;
  for (let i = 0; i <= N; i++) {
    const x = (2 * Math.PI * i) / N;
    pts.push([x, f(x)]);
  }
  const x0 = 40, y0 = 20, w = 440, h = 260;
  const xMax = 2 * Math.PI;
  const yMin = -2, yMax = 4.5;
  const sx = (x) => x0 + (x / xMax) * w;
  const sy = (y) => y0 + h - ((y - yMin) / (yMax - yMin)) * h;
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join(' ');
  const roots = [(7 * Math.PI) / 6, (11 * Math.PI) / 6];
  const labels = ['7π/6', '11π/6'];
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes x={x0} y={y0} w={w} h={h} xMin={0} xMax={xMax} yMin={yMin} yMax={yMax} xStep={Math.PI / 2} yStep={1} />
      {/* π/2, π, 3π/2, 2π feliratok */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI].map((v, i) => (
        <text key={i} x={sx(v)} y={y0 + h + 26} fontSize="11" fill="#444" textAnchor="middle">
          {['0', 'π/2', 'π', '3π/2', '2π'][i]}
        </text>
      ))}
      <path d={d} fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      {roots.map((r, i) => (
        <g key={i}>
          <circle cx={sx(r)} cy={sy(0)} r="5" fill="#dc2626" />
          <text x={sx(r)} y={sy(0) - 10} fontSize="12" fill="#dc2626" textAnchor="middle">{labels[i]}</text>
        </g>
      ))}
      <text x="260" y="16" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#111">
        f(x) = cos(2x) + 3 sin x + 1
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán az alábbi egyenletet:

$$\\cos(2x) + 3\\sin x + 1 = 0.$$

**a)** Adja meg az egyenlet **összes** valós megoldását (általános megoldás). ($8$ pont)

**b)** Adja meg az egyenlet megoldásait a $[0;\\ 2\\pi]$ **zárt** intervallumon. ($3$ pont)

**c)** Határozza meg $\\sin x + \\cos x$ **pontos** értékét a $[0;\\ 2\\pi]$ intervallum azon megoldásaira, amelyekre $\\cos x > 0$. ($2$ pont)`,
  figure: () => <SineGraph />,
  asked: [
    { key: 'a', label: 'a) általános megoldás' },
    { key: 'b', label: 'b) megoldások $[0;\\ 2\\pi]$-ben' },
    { key: 'c', label: 'c) $\\sin x + \\cos x$ értéke' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — $\\cos(2x)$ kifejezése $\\sin x$-szel',
      points: 1,
      body: `A kettős szög egyik formája (fgv. tábla, 58. old.):

$$\\cos(2x) = 1 - 2\\sin^2 x.$$

Ezt beírva az egyenletbe:

$$(1 - 2\\sin^2 x) + 3\\sin x + 1 = 0.$$`,
    },
    {
      title: '2. lépés — Másodfokú egyenletté átalakítás',
      points: 2,
      body: `Összevonva a konstansokat:

$$-2\\sin^2 x + 3\\sin x + 2 = 0.$$

Szorozzuk $-1$-gyel, hogy a vezető együttható pozitív legyen:

$$2\\sin^2 x - 3\\sin x - 2 = 0.$$

Vezessük be: $s = \\sin x$. Így $s$-ben másodfokú egyenletet kaptunk:

$$2 s^2 - 3 s - 2 = 0.$$`,
    },
    {
      title: '3. lépés — A másodfokú egyenlet gyökei',
      points: 2,
      body: `Megoldóképlettel:

$$s_{1,2} = \\dfrac{3 \\pm \\sqrt{(-3)^2 - 4 \\cdot 2 \\cdot (-2)}}{2 \\cdot 2} = \\dfrac{3 \\pm \\sqrt{9 + 16}}{4} = \\dfrac{3 \\pm 5}{4}.$$

Innen $s_1 = 2$ és $s_2 = -\\frac{1}{2}$.

Mivel $-1 \\leq \\sin x \\leq 1$, a $s_1 = 2$ **nem** lehet $\\sin x$ értéke — ezt a gyököt **kizárjuk**.

Tehát egyedül a

$$\\sin x = -\\dfrac{1}{2}$$

egyenletet kell megoldanunk.`,
      figure: () => <UnitCircle step={1} />,
    },
    {
      title: 'a) 1. lépés — $\\sin x = -\\frac{1}{2}$ általános megoldása',
      points: 2,
      body: `Az alap szög: $\\sin \\alpha_0 = \\frac{1}{2}$-hez $\\alpha_0 = \\frac{\\pi}{6}$. Mivel itt $-\\frac{1}{2}$ szerepel, a III. és IV. síknegyedben keresünk szögeket.

A két „fészek-megoldás" a $[0;\\ 2\\pi)$ intervallumon:
- IV. síknegyed: $x = 2\\pi - \\frac{\\pi}{6} = \\frac{11\\pi}{6}$,
- III. síknegyed: $x = \\pi + \\frac{\\pi}{6} = \\frac{7\\pi}{6}$.`,
      figure: () => <UnitCircle step={2} />,
    },
    {
      title: 'a) 2. lépés — Az általános megoldás',
      points: 3,
      body: `A szinuszfüggvény $2\\pi$-szerint periodikus, így minden megoldás:

$$\\boxed{x_1 = -\\dfrac{\\pi}{6} + 2k\\pi \\quad \\text{vagy} \\quad x_2 = \\dfrac{7\\pi}{6} + 2k\\pi, \\quad k \\in \\mathbb{Z}.}$$

(Az első felírás ekvivalens a $\\frac{11\\pi}{6} + 2k\\pi$ alakkal, csak más kezdőpontból számol.)

**Ellenőrzés** $x = \\frac{7\\pi}{6}$-ra: $\\sin x = -\\frac{1}{2}$, $\\cos 2x = \\cos \\frac{7\\pi}{3} = \\cos \\frac{\\pi}{3} = \\frac{1}{2}$.
$\\frac{1}{2} + 3 \\cdot (-\\frac{1}{2}) + 1 = \\frac{1}{2} - \\frac{3}{2} + 1 = 0$ ✓.`,
    },
    {
      title: 'b) — Megoldások $[0;\\ 2\\pi]$ intervallumon',
      points: 3,
      body: `A $[0;\\ 2\\pi]$ intervallumon a két megoldás:

$$\\boxed{x = \\dfrac{7\\pi}{6} \\quad \\text{és} \\quad x = \\dfrac{11\\pi}{6}.}$$

(Ugyanezek láthatók a $f(x) = \\cos(2x) + 3\\sin x + 1$ grafikonjának zérushelyeiként.)`,
      figure: () => <SineGraph />,
    },
    {
      title: 'c) 1. lépés — A $\\cos x > 0$ feltétel szűrése',
      points: 1,
      body: `A két megoldásra megnézzük $\\cos x$ előjelét:
- $x = \\frac{7\\pi}{6}$: III. síknegyed $\\Rightarrow \\cos x < 0$, **kizárva**.
- $x = \\frac{11\\pi}{6}$: IV. síknegyed $\\Rightarrow \\cos x > 0$, **megfelel**.

Tehát csak $x = \\frac{11\\pi}{6}$ jön szóba.`,
    },
    {
      title: 'c) 2. lépés — $\\sin x + \\cos x$ pontos értéke',
      points: 1,
      body: `$x = \\frac{11\\pi}{6}$-nál:

$$\\sin \\frac{11\\pi}{6} = -\\dfrac{1}{2}, \\qquad \\cos \\frac{11\\pi}{6} = \\dfrac{\\sqrt{3}}{2}.$$

Így:

$$\\sin x + \\cos x = -\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2} = \\dfrac{\\sqrt{3} - 1}{2}.$$

$$\\boxed{\\sin x + \\cos x = \\dfrac{\\sqrt{3} - 1}{2} \\approx 0{,}366.}$$`,
    },
  ],
  finalAnswer: {
    a: '$x = -\\pi/6 + 2k\\pi$ vagy $x = 7\\pi/6 + 2k\\pi,\\ k\\in\\mathbb{Z}$',
    b: '$x = 7\\pi/6$ vagy $x = 11\\pi/6$',
    c: '$\\sin x + \\cos x = (\\sqrt{3} - 1)/2$',
  },
  usedFormulas: [
    '$\\cos 2x = 1 - 2\\sin^2 x$',
    'másodfokú megoldóképlet',
    'szinusz értékkészlete $[-1; 1]$',
    'nevezetes szögek szögfüggvényei',
  ],
};

export default { meta, problem, solution };
