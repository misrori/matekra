import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-5-03',
  year: 2024,
  session: 'emelt gyakorló · 5. teszt',
  level: 'emelt',
  part: 'I',
  number: 3,
  title: 'Trigonometrikus egyenlet — szorzattá alakítás',
  points: 12,
  topics: ['trigonometria', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 51, note: 'szorzattá alakítás képletei' },
    { page: 57, note: 'szögfüggvény értékek' },
  ],
  estimatedMinutes: 18,
  check: { type: 'formula', value: 'x = kπ/3 vagy x = π/4 + kπ/2, k ∈ Z' },
};

// Egyenlet: sin 4x + sin 2x = 0, x in [0, 2π]
// Összeg → szorzat: sin A + sin B = 2 sin((A+B)/2) cos((A-B)/2)
// sin 4x + sin 2x = 2 sin(3x) cos(x) = 0
// => sin 3x = 0  vagy  cos x = 0
// sin 3x = 0 : 3x = kπ => x = kπ/3, k ∈ Z.   [0,2π]-ben: 0, π/3, 2π/3, π, 4π/3, 5π/3, 2π  (7 db)
// cos x = 0 : x = π/2 + kπ.  [0,2π]-ben: π/2, 3π/2.  (2 db)
// Közös elem? π/2 = kπ/3 => k = 3/2 (nem egész) — nincs. 3π/2 hasonlóan nincs.
// Összesen 9 megoldás a [0, 2π]-ben.

function UnitCircle() {
  const cx = 220, cy = 200, R = 130;
  const solutions = [
    { x: 0, label: '0' },
    { x: Math.PI / 3, label: 'π/3' },
    { x: Math.PI / 2, label: 'π/2', kind: 'cos' },
    { x: 2 * Math.PI / 3, label: '2π/3' },
    { x: Math.PI, label: 'π' },
    { x: 4 * Math.PI / 3, label: '4π/3' },
    { x: 3 * Math.PI / 2, label: '3π/2', kind: 'cos' },
    { x: 5 * Math.PI / 3, label: '5π/3' },
  ];
  return (
    <SvgCanvas width={460} height={420} viewBox="0 0 460 420">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#111827" strokeWidth="1.4" />
      {/* tengelyek */}
      <line x1={cx - R - 30} y1={cy} x2={cx + R + 30} y2={cy} stroke="#9ca3af" strokeWidth="1" />
      <line x1={cx} y1={cy - R - 30} x2={cx} y2={cy + R + 30} stroke="#9ca3af" strokeWidth="1" />
      {/* megoldási pontok */}
      {solutions.map((s, i) => {
        const px = cx + R * Math.cos(s.x);
        const py = cy - R * Math.sin(s.x);
        const lx = cx + (R + 22) * Math.cos(s.x);
        const ly = cy - (R + 22) * Math.sin(s.x);
        return (
          <g key={i}>
            <circle cx={px} cy={py} r="5" fill={s.kind === 'cos' ? '#dc2626' : '#2563eb'} />
            <text x={lx} y={ly + 4} fontSize="11" textAnchor="middle" fill="#111827">{s.label}</text>
          </g>
        );
      })}
      <text x={20} y={30} fontSize="12" fill="#2563eb">kék: $\sin 3x = 0$ (6 db)</text>
      <text x={20} y={48} fontSize="12" fill="#dc2626">piros: $\cos x = 0$ (2 db)</text>
      <text x={20} y={400} fontSize="12" fill="#374151">Összesen 8 pont a $[0; 2\pi)$ intervallumon.</text>
    </SvgCanvas>
  );
}

function FunctionPlot() {
  const f = (x) => Math.sin(4 * x) + Math.sin(2 * x);
  const xMin = 0, xMax = 2 * Math.PI;
  const yMin = -2.5, yMax = 2.5;
  const sx = (v) => 50 + ((v - xMin) / (xMax - xMin)) * 420;
  const sy = (v) => 40 + (1 - (v - yMin) / (yMax - yMin)) * 200;
  const pts = [];
  for (let x = xMin; x <= xMax + 0.01; x += 0.02) pts.push(`${sx(x)},${sy(f(x))}`);
  // zéróhelyek a [0, 2π)-ban:
  const zeros = [0, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3, Math.PI, 4 * Math.PI / 3, 3 * Math.PI / 2, 5 * Math.PI / 3];
  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      <Axes x={50} y={40} w={420} h={200} xMin={0} xMax={2 * Math.PI} yMin={-2.5} yMax={2.5} xStep={Math.PI / 3} yStep={1} />
      <polyline points={pts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2" />
      {zeros.map((z, i) => (
        <circle key={i} cx={sx(z)} cy={sy(0)} r="4" fill="#16a34a" />
      ))}
      <text x={60} y={30} fontSize="12" fill="#1e40af">$f(x) = \sin 4x + \sin 2x$ — zéróhelyek zöldben</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletet:

$$\\sin 4x + \\sin 2x = 0$$

Sorolja fel a $[0;\\ 2\\pi)$ intervallumba eső összes megoldást!`,
  figure: () => <FunctionPlot />,
  asked: [
    { key: 'osszes', label: 'Általános megoldás' },
    { key: 'intervall', label: 'Megoldások a $[0; 2\\pi)$ intervallumban' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Szorzattá alakítás',
      points: 3,
      body: `Használjuk az **összeg szorzattá alakításának** képletét:
$$\\sin A + \\sin B = 2 \\sin \\dfrac{A + B}{2} \\cos \\dfrac{A - B}{2}.$$

Itt $A = 4x$, $B = 2x$, tehát:
$$\\sin 4x + \\sin 2x = 2 \\sin \\dfrac{6x}{2} \\cos \\dfrac{2x}{2} = 2 \\sin 3x \\cos x.$$

Az egyenlet így:
$$2 \\sin 3x \\cos x = 0 \\iff \\sin 3x = 0 \\ \\text{vagy}\\ \\cos x = 0.$$`,
    },
    {
      title: '2. lépés — Első tényező: $\\sin 3x = 0$',
      points: 3,
      body: `A szinusz zéróhelyei a $k\\pi$ alakú számok ($k \\in \\mathbb{Z}$):
$$3x = k\\pi \\Rightarrow x = \\dfrac{k\\pi}{3},\\ k \\in \\mathbb{Z}.$$

A $[0;\\ 2\\pi)$ intervallumba eső értékek ($k = 0, 1, 2, 3, 4, 5$):
$$x \\in \\left\\{0;\\ \\dfrac{\\pi}{3};\\ \\dfrac{2\\pi}{3};\\ \\pi;\\ \\dfrac{4\\pi}{3};\\ \\dfrac{5\\pi}{3}\\right\\}.$$

($k = 6$ a $2\\pi$-t adná, ami **nem** tartozik bele a félig nyílt intervallumba.)`,
    },
    {
      title: '3. lépés — Második tényező: $\\cos x = 0$',
      points: 3,
      body: `A koszinusz zéróhelyei:
$$x = \\dfrac{\\pi}{2} + k\\pi,\\ k \\in \\mathbb{Z}.$$

A $[0;\\ 2\\pi)$ intervallumba esők:
$$x \\in \\left\\{\\dfrac{\\pi}{2};\\ \\dfrac{3\\pi}{2}\\right\\}.$$`,
    },
    {
      title: '4. lépés — A két halmaz egyesítése',
      points: 2,
      body: `Nézzük meg, van-e közös megoldás. Ha $\\dfrac{k\\pi}{3} = \\dfrac{\\pi}{2} + m\\pi$, akkor $\\dfrac{k}{3} = \\dfrac{1}{2} + m$, azaz $2k = 3 + 6m$. Ennek a bal oldala páros, a jobb oldala páratlan — **ellentmondás**. Tehát a két halmaz **diszjunkt**.

Az $[0;\\ 2\\pi)$ intervallumban **összesen 8 megoldás**:
$$x \\in \\left\\{0;\\ \\dfrac{\\pi}{3};\\ \\dfrac{\\pi}{2};\\ \\dfrac{2\\pi}{3};\\ \\pi;\\ \\dfrac{4\\pi}{3};\\ \\dfrac{3\\pi}{2};\\ \\dfrac{5\\pi}{3}\\right\\}.$$`,
      figure: () => <UnitCircle />,
    },
    {
      title: '5. lépés — Grafikus ellenőrzés',
      points: 1,
      body: `Az $f(x) = \\sin 4x + \\sin 2x$ függvény grafikonján mind a 8 zéróhely kiolvasható. A függvény a $[0;\\ 2\\pi)$ intervallumon **periodikus**: a legkisebb közös periódusa $\\pi$ (mivel $\\sin 2x$ és $\\sin 4x$ is $\\pi$-periodikus az $x \\mapsto x + \\pi$-re).`,
      figure: () => <FunctionPlot />,
    },
  ],
  finalAnswer: {
    osszes: '$x = \\dfrac{k\\pi}{3}$ vagy $x = \\dfrac{\\pi}{2} + k\\pi,\\ k \\in \\mathbb{Z}$',
    intervall: '$\\left\\{0;\\ \\tfrac{\\pi}{3};\\ \\tfrac{\\pi}{2};\\ \\tfrac{2\\pi}{3};\\ \\pi;\\ \\tfrac{4\\pi}{3};\\ \\tfrac{3\\pi}{2};\\ \\tfrac{5\\pi}{3}\\right\\}$ (8 megoldás)',
  },
  usedFormulas: [
    '$\\sin A + \\sin B = 2 \\sin \\dfrac{A+B}{2} \\cos \\dfrac{A-B}{2}$',
    '$\\sin x = 0 \\iff x = k\\pi$',
    '$\\cos x = 0 \\iff x = \\dfrac{\\pi}{2} + k\\pi$',
    'szorzat = 0 $\\iff$ valamelyik tényező 0',
  ],
};

export default { meta, problem, solution };
