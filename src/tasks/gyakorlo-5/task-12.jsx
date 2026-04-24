import { SvgCanvas, Arrow, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-12',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 12,
  title: 'Vektor — koordináták és hossz',
  points: 3,
  topics: ['vektor'],
  difficulty: 2,
  fgvt: [
    { page: 82, note: 'vektor koordinátákkal' },
    { page: 86, note: 'vektorműveletek' },
  ],
  estimatedMinutes: 4,
  // AB = B-A = (5-(-1), -1-3) = (6, -4)
  // |AB| = sqrt(36+16) = sqrt(52) = 2·sqrt(13) ≈ 7,211
  check: { type: 'number', value: 7.21, tolerance: 0.02 },
};

const A = { x: -1, y: 3 };
const B = { x: 5, y: -1 };

function VectorFigure() {
  const xMin = -3, xMax = 7, yMin = -3, yMax = 5;
  const w = 360, h = 280, x0 = 50, y0 = 30;
  const sx = (v) => x0 + ((v - xMin) / (xMax - xMin)) * w;
  const sy = (v) => y0 + h - ((v - yMin) / (yMax - yMin)) * h;
  return (
    <SvgCanvas width={460} height={340} viewBox="0 0 460 340">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
      <Arrow x1={sx(A.x)} y1={sy(A.y)} x2={sx(B.x)} y2={sy(B.y)} stroke="#2563eb" strokeWidth="2.2" id="ab-t12" />
      <circle cx={sx(A.x)} cy={sy(A.y)} r="4" fill="#1e40af" />
      <circle cx={sx(B.x)} cy={sy(B.y)} r="4" fill="#7c2d12" />
      <text x={sx(A.x) - 22} y={sy(A.y) - 6} fontSize="13" fontWeight="bold" fill="#1e40af">A(−1; 3)</text>
      <text x={sx(B.x) + 6} y={sy(B.y) + 18} fontSize="13" fontWeight="bold" fill="#7c2d12">B(5; −1)</text>
      <text x={(sx(A.x) + sx(B.x)) / 2 + 10} y={(sy(A.y) + sy(B.y)) / 2 - 8} fontSize="14" fontWeight="bold" fill="#2563eb">
        AB⃗
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott a koordináta-rendszerben az $A(-1;\\ 3)$ és a $B(5;\\ -1)$ pont.

**a)** Adja meg az $\\overrightarrow{AB}$ vektor koordinátáit!

**b)** Számítsa ki az $\\overrightarrow{AB}$ vektor hosszát két tizedesjegyre kerekítve!`,
  figure: () => <VectorFigure />,
  asked: [
    { key: 'AB', label: '$\\overrightarrow{AB} = (?;\\ ?)$' },
    { key: 'len', label: '$|\\overrightarrow{AB}| = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — A vektor koordinátái',
      points: 1,
      body: `Két pont közötti vektor: $\\overrightarrow{AB} = B - A$ (végpont mínusz kezdőpont).

$$\\overrightarrow{AB} = (5 - (-1);\\ -1 - 3) = (6;\\ -4).$$`,
    },
    {
      title: 'b/1. lépés — A vektor hosszának képlete',
      points: 1,
      body: `Egy vektor hossza (abszolút értéke):

$$|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}.$$

(Pitagorasz-tétel a koordinátarendszerben.)`,
    },
    {
      title: 'b/2. lépés — Számolás',
      points: 1,
      body: `$$|\\overrightarrow{AB}| = \\sqrt{6^2 + (-4)^2} = \\sqrt{36 + 16} = \\sqrt{52}.$$

Egyszerűsítés: $\\sqrt{52} = \\sqrt{4 \\cdot 13} = 2 \\sqrt{13}$.

Numerikusan: $\\sqrt{13} \\approx 3{,}6056$, tehát $|\\overrightarrow{AB}| \\approx 7{,}2111 \\approx 7{,}21$.

Tehát $\\boxed{\\overrightarrow{AB} = (6;\\ -4)}$, $\\boxed{|\\overrightarrow{AB}| \\approx 7{,}21}$.`,
    },
  ],
  finalAnswer: {
    AB: '$\\overrightarrow{AB} = (6;\\ -4)$',
    len: '$|\\overrightarrow{AB}| \\approx 7{,}21$',
  },
  usedFormulas: ['$\\overrightarrow{AB} = B - A$', '$|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}$'],
};

export default { meta, problem, solution };
