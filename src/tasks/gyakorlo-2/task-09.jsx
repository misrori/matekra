import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-09',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 9,
  title: 'Koordináta-geometria — két pont távolsága és felezőpont',
  points: 3,
  topics: ['koordináta-geometria'],
  difficulty: 2,
  fgvt: [{ page: 83, note: 'egyenes, távolság' }],
  estimatedMinutes: 4,
};

// A(-2, 1) és B(4, 9)
// Felezőpont: F((-2+4)/2, (1+9)/2) = (1, 5)
// Távolság: sqrt((4-(-2))^2 + (9-1)^2) = sqrt(36 + 64) = sqrt(100) = 10

function AxisPlot({ step = 0 }) {
  const ax = { x: 60, y: 40, w: 380, h: 260, xMin: -6, xMax: 10, yMin: -2, yMax: 12 };
  const sx = (v) => ax.x + ((v - ax.xMin) / (ax.xMax - ax.xMin)) * ax.w;
  const sy = (v) => ax.y + ax.h - ((v - ax.yMin) / (ax.yMax - ax.yMin)) * ax.h;
  const A = { x: -2, y: 1 };
  const B = { x: 4, y: 9 };
  const F = { x: 1, y: 5 };
  return (
    <SvgCanvas width={480} height={340} viewBox="0 0 480 340">
      <Axes x={ax.x} y={ax.y} w={ax.w} h={ax.h} xMin={ax.xMin} xMax={ax.xMax} yMin={ax.yMin} yMax={ax.yMax} xStep={2} yStep={2} />
      {/* AB szakasz */}
      <line x1={sx(A.x)} y1={sy(A.y)} x2={sx(B.x)} y2={sy(B.y)} stroke="#2563eb" strokeWidth="2.5" />

      {/* Távolság háromszög (ha step>=2) */}
      {step >= 2 && (
        <g>
          {/* vízszintes befogó */}
          <line x1={sx(A.x)} y1={sy(A.y)} x2={sx(B.x)} y2={sy(A.y)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* függőleges befogó */}
          <line x1={sx(B.x)} y1={sy(A.y)} x2={sx(B.x)} y2={sy(B.y)} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={(sx(A.x) + sx(B.x)) / 2} y={sy(A.y) + 16} fontSize="12" textAnchor="middle" fill="#b91c1c" fontWeight="bold">Δx = 6</text>
          <text x={sx(B.x) + 10} y={(sy(A.y) + sy(B.y)) / 2} fontSize="12" fill="#15803d" fontWeight="bold">Δy = 8</text>
        </g>
      )}

      {/* Felezőpont */}
      {step >= 3 && (
        <g>
          <circle cx={sx(F.x)} cy={sy(F.y)} r="6" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
          <text x={sx(F.x) + 10} y={sy(F.y) - 8} fontSize="13" fontWeight="bold" fill="#b45309">F(1; 5)</text>
        </g>
      )}

      {/* A, B pontok */}
      <circle cx={sx(A.x)} cy={sy(A.y)} r="5" fill="#1e3a8a" />
      <circle cx={sx(B.x)} cy={sy(B.y)} r="5" fill="#1e3a8a" />
      <text x={sx(A.x) - 14} y={sy(A.y) + 18} fontSize="13" fontWeight="bold" fill="#1e3a8a">A(-2; 1)</text>
      <text x={sx(B.x) + 6} y={sy(B.y) - 8} fontSize="13" fontWeight="bold" fill="#1e3a8a">B(4; 9)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `A koordinátarendszerben adott két pont: $A(-2;\\ 1)$ és $B(4;\\ 9)$.

**a)** Határozza meg a $\\overline{AB}$ szakasz $F$ **felezőpontját**!

**b)** Számítsa ki az $AB$ szakasz hosszát!`,
  figure: () => <AxisPlot step={0} />,
  asked: [
    { key: 'F', label: 'a) $F = ?$' },
    { key: 'AB', label: 'b) $|AB| = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Felezőpont koordinátái',
      points: 1,
      body: `A szakasz **felezőpontjának koordinátái** a végpontok koordinátáinak számtani átlagai:

$$F = \\left( \\dfrac{x_A + x_B}{2};\\ \\dfrac{y_A + y_B}{2} \\right).$$

Behelyettesítve:

$$F = \\left( \\dfrac{-2 + 4}{2};\\ \\dfrac{1 + 9}{2} \\right) = \\left( \\dfrac{2}{2};\\ \\dfrac{10}{2} \\right) = (1;\\ 5).$$

Tehát $\\boxed{F(1;\\ 5)}$.`,
      figure: () => <AxisPlot step={3} />,
    },
    {
      title: 'b/1. lépés — A koordinátakülönbségek',
      points: 1,
      body: `A két pont **távolságát** a Pitagorasz-tételre visszavezetett képlet adja:

$$d = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}.$$

Számítsuk ki a koordinátakülönbségeket:

$$\\Delta x = x_B - x_A = 4 - (-2) = 6,$$
$$\\Delta y = y_B - y_A = 9 - 1 = 8.$$`,
      figure: () => <AxisPlot step={2} />,
    },
    {
      title: 'b/2. lépés — A távolság kiszámítása',
      points: 1,
      body: `$$|AB| = \\sqrt{\\Delta x^2 + \\Delta y^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10.$$

(Ez a klasszikus $6\\text{-}8\\text{-}10$ pitagoraszi háromszög — a $3\\text{-}4\\text{-}5$ kétszerese.)

Tehát $\\boxed{|AB| = 10}$ egység hosszú.`,
      figure: () => <AxisPlot step={2} />,
    },
  ],
  finalAnswer: {
    F: '$F(1;\\ 5)$',
    AB: '$|AB| = 10$',
  },
  usedFormulas: [
    'felezőpont: $F = \\left(\\frac{x_A+x_B}{2},\\ \\frac{y_A+y_B}{2}\\right)$',
    'távolság: $d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$',
  ],
};

export default { meta, problem, solution };
