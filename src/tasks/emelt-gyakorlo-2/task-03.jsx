import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-03',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'I',
  number: 3,
  title: 'Trigonometrikus egyenlet — addíciós és összegzés szorzattá',
  points: 12,
  topics: ['trigonometria', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 57, note: 'szögfüggvények, nevezetes szögek' },
    { page: 58, note: 'addíciós képletek' },
  ],
  estimatedMinutes: 14,
};

// Egyenlet: sin(3x) + sin(x) = sqrt(3) * cos(x),  x ∈ [0, 2π)
// sin(3x) + sin(x) = 2 sin(2x) cos(x)  (összegzés szorzattá)
// =>  2 sin(2x) cos(x) = sqrt(3) cos(x)
// =>  cos(x) * (2 sin(2x) - sqrt(3)) = 0
// 1) cos(x) = 0  =>  x = π/2, 3π/2.
// 2) sin(2x) = sqrt(3)/2  =>  2x = π/3 + 2kπ  vagy  2x = 2π/3 + 2kπ
//    x = π/6 + kπ   vagy   x = π/3 + kπ
//    [0, 2π) tartományon: x ∈ {π/6, π/3, 7π/6, 4π/3}.
// Összes: {π/6, π/3, π/2, 7π/6, 4π/3, 3π/2}.

function SolutionsOnUnitCircle() {
  const cx = 260, cy = 150, r = 100;
  const solutions = [
    { a: Math.PI / 6, label: 'π/6' },
    { a: Math.PI / 3, label: 'π/3' },
    { a: Math.PI / 2, label: 'π/2' },
    { a: (7 * Math.PI) / 6, label: '7π/6' },
    { a: (4 * Math.PI) / 3, label: '4π/3' },
    { a: (3 * Math.PI) / 2, label: '3π/2' },
  ];
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      {/* egységkör */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      {/* tengelyek */}
      <line x1={cx - 140} y1={cy} x2={cx + 140} y2={cy} stroke="#d1d5db" strokeWidth="1" />
      <line x1={cx} y1={cy - 140} x2={cx} y2={cy + 140} stroke="#d1d5db" strokeWidth="1" />
      <text x={cx + 146} y={cy + 4} fontSize="12" fill="#6b7280">x</text>
      <text x={cx + 4} y={cy - 142} fontSize="12" fill="#6b7280">y</text>
      {solutions.map((s, i) => {
        const x = cx + r * Math.cos(s.a);
        const y = cy - r * Math.sin(s.a);
        const lx = cx + (r + 30) * Math.cos(s.a);
        const ly = cy - (r + 30) * Math.sin(s.a);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#2563eb" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="5" fill="#dc2626" />
            <text x={lx} y={ly + 4} fontSize="12" fontWeight="bold" fill="#b91c1c" textAnchor="middle">{s.label}</text>
          </g>
        );
      })}
      <text x={cx} y={30} fontSize="14" fontWeight="bold" fill="#111827" textAnchor="middle">
        Megoldások az egységkörön (6 gyök a [0, 2π) tartományon)
      </text>
    </SvgCanvas>
  );
}

function FunctionPlot() {
  const f = (x) => Math.sin(3 * x) + Math.sin(x) - Math.sqrt(3) * Math.cos(x);
  const sx = (x) => 40 + (x / (2 * Math.PI)) * 440;
  const sy = (y) => 160 - (y / 3) * 130;
  const pts = [];
  for (let x = 0; x <= 2 * Math.PI + 0.01; x += 0.02) {
    pts.push(`${sx(x).toFixed(2)},${sy(f(x)).toFixed(2)}`);
  }
  const roots = [Math.PI / 6, Math.PI / 3, Math.PI / 2, (7 * Math.PI) / 6, (4 * Math.PI) / 3, (3 * Math.PI) / 2];
  const labels = ['π/6', 'π/3', 'π/2', '7π/6', '4π/3', '3π/2'];
  return (
    <SvgCanvas width={520} height={260} viewBox="0 0 520 260">
      <line x1={40} y1={sy(0)} x2={480} y2={sy(0)} stroke="#111827" strokeWidth="1.2" />
      <line x1={sx(0)} y1={20} x2={sx(0)} y2={220} stroke="#111827" strokeWidth="1.2" />
      <polyline points={pts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2" />
      {roots.map((r, i) => (
        <g key={i}>
          <circle cx={sx(r)} cy={sy(0)} r="5" fill="#dc2626" />
          <text x={sx(r)} y={sy(0) + 18} fontSize="11" textAnchor="middle" fill="#b91c1c">{labels[i]}</text>
        </g>
      ))}
      <text x={40} y={30} fontSize="12" fill="#1e40af">f(x) = sin 3x + sin x − √3 cos x</text>
      <text x={400} y={30} fontSize="11" fill="#6b7280">zérushelyek = megoldások</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a következő trigonometrikus egyenletet a $[0;\\ 2\\pi)$ intervallumon:

$$\\sin 3x + \\sin x = \\sqrt{3}\\, \\cos x.$$

Adjon meg **minden** megoldást, és ellenőrizze!`,
  figure: () => <SolutionsOnUnitCircle />,
  asked: [
    { key: 'roots', label: 'Megoldások $[0;\\ 2\\pi)$-ben' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Összegzés szorzattá a bal oldalon',
      points: 3,
      body: `Az **összegzés szorzattá** képlet:
$$\\sin A + \\sin B = 2 \\sin\\dfrac{A+B}{2} \\cos\\dfrac{A-B}{2}.$$

$A = 3x$, $B = x$ választással:
$$\\sin 3x + \\sin x = 2 \\sin\\dfrac{3x + x}{2} \\cos\\dfrac{3x - x}{2} = 2 \\sin(2x) \\cos x.$$

Az egyenlet így átalakul:
$$2 \\sin(2x) \\cos x = \\sqrt{3}\\, \\cos x.$$`,
    },
    {
      title: '2. lépés — Kiemelés, szorzat = 0',
      points: 2,
      body: `Vigyünk mindent egy oldalra, és **emeljük ki** a közös $\\cos x$ tényezőt:

$$2 \\sin(2x) \\cos x - \\sqrt{3}\\, \\cos x = 0$$
$$\\cos x \\cdot \\left( 2\\sin(2x) - \\sqrt{3} \\right) = 0.$$

**Szorzat akkor nulla, ha valamelyik tényezője nulla**, így két esetet kell vizsgálnunk:

1. $\\cos x = 0$,
2. $2 \\sin(2x) - \\sqrt{3} = 0$, azaz $\\sin(2x) = \\dfrac{\\sqrt{3}}{2}$.

**Megjegyzés:** nem szabad azonnal $\\cos x$-szel **osztani**, mert ha $\\cos x = 0$, akkor elvesztenénk valós megoldást.`,
    },
    {
      title: '3. lépés — Első eset: $\\cos x = 0$',
      points: 1,
      body: `$\\cos x = 0$ megoldásai $[0;\\ 2\\pi)$-n:
$$x = \\dfrac{\\pi}{2}, \\quad x = \\dfrac{3\\pi}{2}.$$`,
    },
    {
      title: '4. lépés — Második eset: $\\sin(2x) = \\tfrac{\\sqrt{3}}{2}$',
      points: 3,
      body: `A $\\sin u = \\tfrac{\\sqrt{3}}{2}$ egyenlet **alapmegoldásai**:
$$u_1 = \\dfrac{\\pi}{3} + 2k\\pi, \\qquad u_2 = \\pi - \\dfrac{\\pi}{3} + 2k\\pi = \\dfrac{2\\pi}{3} + 2k\\pi \\quad (k \\in \\mathbb{Z}).$$

Mivel $u = 2x$, mindkét oldalt $2$-vel osztjuk:
$$2x = \\dfrac{\\pi}{3} + 2k\\pi \\Rightarrow x = \\dfrac{\\pi}{6} + k\\pi,$$
$$2x = \\dfrac{2\\pi}{3} + 2k\\pi \\Rightarrow x = \\dfrac{\\pi}{3} + k\\pi.$$

A $[0;\\ 2\\pi)$ tartományon $k = 0$ és $k = 1$ ad megoldást:

$k = 0$: $x = \\dfrac{\\pi}{6}, \\dfrac{\\pi}{3}$.

$k = 1$: $x = \\dfrac{\\pi}{6} + \\pi = \\dfrac{7\\pi}{6}, \\quad x = \\dfrac{\\pi}{3} + \\pi = \\dfrac{4\\pi}{3}$.`,
    },
    {
      title: '5. lépés — Összes megoldás és ábra',
      points: 2,
      body: `A két eset megoldáshalmazának **uniója** $[0;\\ 2\\pi)$-n:
$$M = \\left\\{ \\dfrac{\\pi}{6},\\ \\dfrac{\\pi}{3},\\ \\dfrac{\\pi}{2},\\ \\dfrac{7\\pi}{6},\\ \\dfrac{4\\pi}{3},\\ \\dfrac{3\\pi}{2} \\right\\}.$$

Hat megoldás. Az egységkörön és a függvénygrafikonon is hat metszéspont látható.`,
      figure: () => <FunctionPlot />,
    },
    {
      title: '6. lépés — Ellenőrzés (egy érték)',
      points: 1,
      body: `Próbáljuk ki $x = \\dfrac{\\pi}{6}$-ot:
- $\\sin(3 \\cdot \\tfrac{\\pi}{6}) = \\sin \\tfrac{\\pi}{2} = 1$
- $\\sin \\tfrac{\\pi}{6} = \\tfrac{1}{2}$
- $\\cos \\tfrac{\\pi}{6} = \\tfrac{\\sqrt{3}}{2}$

Bal oldal: $1 + \\tfrac{1}{2} = \\tfrac{3}{2}$.

Jobb oldal: $\\sqrt{3} \\cdot \\tfrac{\\sqrt{3}}{2} = \\tfrac{3}{2}$.

Egyezik, tehát $x = \\tfrac{\\pi}{6}$ valóban megoldás.`,
    },
  ],
  finalAnswer: {
    roots: 'Hat megoldás $[0;\\ 2\\pi)$-n: $x \\in \\left\\{\\tfrac{\\pi}{6},\\ \\tfrac{\\pi}{3},\\ \\tfrac{\\pi}{2},\\ \\tfrac{7\\pi}{6},\\ \\tfrac{4\\pi}{3},\\ \\tfrac{3\\pi}{2}\\right\\}$',
  },
  usedFormulas: [
    '$\\sin A + \\sin B = 2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$',
    'szorzat nulla: legalább egy tényező nulla',
    'trigonometrikus alapegyenletek általános megoldása',
    'nevezetes szögek',
  ],
};

export default { meta, problem, solution };
