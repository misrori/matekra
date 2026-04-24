import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-06',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 6,
  title: 'Koordináta-geometria — felezőpont',
  points: 2,
  topics: ['koordináta-geometria'],
  difficulty: 1,
  fgvt: [{ page: 83, note: 'felezőpont, egyenes' }],
  estimatedMinutes: 3,
  check: { type: 'text', value: 'F(4; 1)' },
};

// A(-2, -3), B(10, 5)
// Felezőpont: ((-2+10)/2, (-3+5)/2) = (4, 1)
const A = { x: -2, y: -3 };
const B = { x: 10, y: 5 };
const F = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

function MidpointFigure({ showF = false }) {
  const xMin = -4, xMax = 12, yMin = -4, yMax = 6;
  const w = 380, h = 240, x0 = 50, y0 = 40;
  const sx = (v) => x0 + ((v - xMin) / (xMax - xMin)) * w;
  const sy = (v) => y0 + h - ((v - yMin) / (yMax - yMin)) * h;
  return (
    <SvgCanvas width={460} height={320} viewBox="0 0 460 320">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
      <line x1={sx(A.x)} y1={sy(A.y)} x2={sx(B.x)} y2={sy(B.y)} stroke="#2563eb" strokeWidth="2" />
      <circle cx={sx(A.x)} cy={sy(A.y)} r="4" fill="#1e40af" />
      <circle cx={sx(B.x)} cy={sy(B.y)} r="4" fill="#7c2d12" />
      <text x={sx(A.x) - 20} y={sy(A.y) + 20} fontSize="13" fontWeight="bold" fill="#1e40af">A(−2; −3)</text>
      <text x={sx(B.x) + 6} y={sy(B.y) - 6} fontSize="13" fontWeight="bold" fill="#7c2d12">B(10; 5)</text>
      {showF && (
        <>
          <circle cx={sx(F.x)} cy={sy(F.y)} r="5" fill="#dc2626" />
          <text x={sx(F.x) + 8} y={sy(F.y) - 6} fontSize="13" fontWeight="bold" fill="#dc2626">F(4; 1)</text>
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott a koordináta-rendszerben az $A(-2;\\ -3)$ és a $B(10;\\ 5)$ pont. Adja meg az $AB$ szakasz **felezőpontjának** koordinátáit!`,
  figure: () => <MidpointFigure />,
  asked: [{ key: 'F', label: '$F = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A felezőpont képlete',
      points: 1,
      body: `Két pont, $A(x_1;\\ y_1)$ és $B(x_2;\\ y_2)$ szakaszának **felezőpontja**:

$$F = \\left(\\dfrac{x_1 + x_2}{2};\\ \\dfrac{y_1 + y_2}{2}\\right).$$`,
    },
    {
      title: '2. lépés — Behelyettesítés',
      points: 1,
      body: `$A(-2;\\ -3)$, $B(10;\\ 5)$:

$$F_x = \\dfrac{-2 + 10}{2} = \\dfrac{8}{2} = 4,$$
$$F_y = \\dfrac{-3 + 5}{2} = \\dfrac{2}{2} = 1.$$

Tehát $\\boxed{F(4;\\ 1)}$.

**Ellenőrzés:** $\\overrightarrow{AF} = F - A = (4-(-2);\\ 1-(-3)) = (6;\\ 4)$.
$\\overrightarrow{FB} = B - F = (10-4;\\ 5-1) = (6;\\ 4)$. A két vektor egyenlő ✓.`,
      figure: () => <MidpointFigure showF />,
    },
  ],
  finalAnswer: { F: '$F(4;\\ 1)$' },
  usedFormulas: ['$F = \\left(\\dfrac{x_1+x_2}{2};\\ \\dfrac{y_1+y_2}{2}\\right)$'],
};

export default { meta, problem, solution };
