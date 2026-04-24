import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-03',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'I',
  number: 3,
  title: 'Trigonometrikus egyenlet addíciós tétellel',
  points: 12,
  topics: ['trigonometria', 'egyenletek'],
  difficulty: 3,
  fgvt: [
    { page: 56, note: 'addíciós tételek' },
    { page: 57, note: 'szögfüggvény értékek' },
  ],
  estimatedMinutes: 14,
  check: { type: 'list', value: ['x≈0,9553', 'x≈5,3279'] },
};

// Oldja meg a [0; 2π] intervallumon:
//   cos(x + π/6) + cos(x − π/6) = 1
// Addíciós (összeg): cos A + cos B = 2 cos((A+B)/2) cos((A-B)/2)
//   A = x + π/6, B = x − π/6 ⇒ (A+B)/2 = x, (A−B)/2 = π/6
//   ⇒ 2 cos x · cos(π/6) = 1
//   cos(π/6) = √3/2
//   ⇒ √3 · cos x = 1 ⇒ cos x = 1/√3 = √3/3 ≈ 0,5774
// [0; 2π]-ban: x₁ = arccos(1/√3) ≈ 0,9553 rad (≈ 54,74°)
//              x₂ = 2π − x₁ ≈ 5,3279 rad (≈ 305,26°)

function CosHelyFigure({ highlight = 'none' }) {
  // f(x) = √3 cos x  vs  y = 1  a [0; 2π] intervallumon
  const pts = [];
  for (let x = 0; x <= 2 * Math.PI; x += 0.05) {
    const y = Math.sqrt(3) * Math.cos(x);
    pts.push([x, y]);
  }
  const xAx = (v) => 40 + (v / (2 * Math.PI)) * 460;
  const yAx = (v) => 40 + 220 - ((v + 2) / 4) * 220;
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${xAx(x).toFixed(1)} ${yAx(y).toFixed(1)}`).join(' ');

  const x1 = Math.acos(1 / Math.sqrt(3));
  const x2 = 2 * Math.PI - x1;

  return (
    <SvgCanvas width={540} height={300} viewBox="0 0 540 300">
      <Axes x={40} y={40} w={460} h={220}
        xMin={0} xMax={2 * Math.PI} yMin={-2} yMax={2}
        xStep={Math.PI / 2} yStep={1} xLabel="x" yLabel="y" />
      <path d={pathD} fill="none" stroke="#1e40af" strokeWidth="2.4" />
      <text x={120} y={60} fontSize="13" fill="#1e40af" fontWeight="700">y = √3 · cos x</text>
      <line x1={xAx(0)} y1={yAx(1)} x2={xAx(2 * Math.PI)} y2={yAx(1)} stroke="#b91c1c" strokeWidth="1.8" strokeDasharray="5 3" />
      <text x={xAx(2 * Math.PI) - 20} y={yAx(1) - 5} fontSize="13" fill="#b91c1c" fontWeight="700">y = 1</text>
      {highlight === 'roots' && (
        <g>
          <circle cx={xAx(x1)} cy={yAx(1)} r="5" fill="#dc2626" />
          <circle cx={xAx(x2)} cy={yAx(1)} r="5" fill="#dc2626" />
          <text x={xAx(x1)} y={yAx(1) + 20} fontSize="12" fill="#dc2626" fontWeight="700" textAnchor="middle">
            x₁ ≈ 0,955
          </text>
          <text x={xAx(x2)} y={yAx(1) + 20} fontSize="12" fill="#dc2626" fontWeight="700" textAnchor="middle">
            x₂ ≈ 5,328
          </text>
        </g>
      )}
      <text x={270} y={28} fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        √3 · cos x = 1 megoldásai [0; 2π]-ben
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a $[0;\\ 2\\pi]$ intervallumon a következő egyenletet:

$$\\cos\\left(x + \\dfrac{\\pi}{6}\\right) + \\cos\\left(x - \\dfrac{\\pi}{6}\\right) = 1.$$

Adja meg a megoldásokat **radiánban** és közelítőleg **fokban** is! Részletesen indokoljon!`,
  figure: () => <CosHelyFigure />,
  asked: [
    { key: 'x', label: 'a megoldások $[0;\\ 2\\pi]$-ben' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az összegképlet kiválasztása',
      points: 3,
      body: `A $\\cos A + \\cos B$ alakú összegre az **összegből szorzatot képző** azonosságot alkalmazzuk (fgv. tábla, 56. old.):

$$\\cos A + \\cos B = 2 \\cos\\dfrac{A + B}{2} \\cos\\dfrac{A - B}{2}.$$

Itt $A = x + \\dfrac{\\pi}{6}$, $B = x - \\dfrac{\\pi}{6}$, tehát

$$\\dfrac{A + B}{2} = x, \\qquad \\dfrac{A - B}{2} = \\dfrac{\\pi}{6}.$$`,
    },
    {
      title: '2. lépés — Az egyenlet egyszerűsítése',
      points: 3,
      body: `Az azonosság felhasználásával:

$$\\cos\\left(x + \\tfrac{\\pi}{6}\\right) + \\cos\\left(x - \\tfrac{\\pi}{6}\\right) = 2 \\cos x \\cos\\dfrac{\\pi}{6}.$$

Tudjuk: $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$. Ezért az egyenlet:

$$2 \\cos x \\cdot \\dfrac{\\sqrt{3}}{2} = 1 \\;\\Longleftrightarrow\\; \\sqrt{3}\\, \\cos x = 1.$$

Ebből:

$$\\cos x = \\dfrac{1}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3} \\approx 0{,}5774.$$`,
    },
    {
      title: '3. lépés — A megoldások a $[0;\\ 2\\pi]$ intervallumon',
      points: 4,
      body: `A $\\cos x = c$ egyenletnek (ahol $|c| < 1$) a $[0;\\ 2\\pi]$ intervallumon **két** megoldása van:

$$x_1 = \\arccos c \\qquad \\text{és} \\qquad x_2 = 2\\pi - \\arccos c.$$

Zsebszámológéppel:

$$x_1 = \\arccos\\dfrac{\\sqrt{3}}{3} \\approx 0{,}9553 \\text{ rad} \\approx 54{,}736°.$$

$$x_2 = 2\\pi - 0{,}9553 \\approx 5{,}3279 \\text{ rad} \\approx 305{,}264°.$$`,
      figure: () => <CosHelyFigure highlight="roots" />,
    },
    {
      title: '4. lépés — Ellenőrzés',
      points: 2,
      body: `$x_1 \\approx 0{,}9553$ behelyettesítve: $x_1 + \\pi/6 \\approx 1{,}4789$, $x_1 - \\pi/6 \\approx 0{,}4317$.

$$\\cos 1{,}4789 \\approx 0{,}0919, \\quad \\cos 0{,}4317 \\approx 0{,}9082.$$

Összeg: $\\approx 1{,}0001 \\approx 1$. ✓ (kerekítési hiba miatt nem pontosan 1)

$x_2 \\approx 5{,}3279$-re: a koszinusz páros $2\\pi$-re periodikus és szimmetrikus $\\pi$-re; az összeg ugyanúgy $1$ lesz.`,
    },
  ],
  finalAnswer: {
    x: '$x_1 = \\arccos\\dfrac{\\sqrt{3}}{3} \\approx 0{,}9553$ rad $\\approx 54{,}74°$, és $x_2 = 2\\pi - x_1 \\approx 5{,}3279$ rad $\\approx 305{,}26°$.',
  },
  usedFormulas: [
    'összeg $\\to$ szorzat: $\\cos A + \\cos B = 2 \\cos\\tfrac{A+B}{2} \\cos\\tfrac{A-B}{2}$',
    '$\\cos\\tfrac{\\pi}{6} = \\tfrac{\\sqrt{3}}{2}$',
    '$\\cos x = c$ megoldásai $[0; 2\\pi]$-n: $\\arccos c$ és $2\\pi - \\arccos c$',
  ],
};

export default { meta, problem, solution };
