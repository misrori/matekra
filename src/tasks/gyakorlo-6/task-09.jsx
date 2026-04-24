import { SvgCanvas, Arrow } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-09',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 9,
  title: 'Vektorok összege és hossza',
  points: 3,
  topics: ['vektor'],
  difficulty: 2,
  fgvt: [{ page: 82, note: 'vektor koordináták, hossz' }],
  estimatedMinutes: 5,
  // a = (3,4), b = (5,-1). a+b = (8,3). |a+b| = sqrt(64+9) = sqrt(73) ≈ 8,544
  check: { type: 'number', value: 8.544, tolerance: 0.01 },
};

function VectorFigure({ show = 'all' }) {
  const O = { x: 80, y: 240 };
  const scale = 30;
  const sx = (vx) => O.x + vx * scale;
  const sy = (vy) => O.y - vy * scale;
  const A = { x: 3, y: 4 };
  const B = { x: 5, y: -1 };
  const SUM = { x: A.x + B.x, y: A.y + B.y };
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <text x="260" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Vektorok összege — paralelogramma szabály
      </text>
      {/* rács */}
      {[...Array(16).keys()].map((i) => (
        <line key={`gx${i}`} x1={O.x + i * scale} y1={40} x2={O.x + i * scale} y2={O.y} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {[...Array(8).keys()].map((i) => (
        <line key={`gy${i}`} x1={O.x} y1={O.y - i * scale} x2={O.x + 15 * scale} y2={O.y - i * scale} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {/* tengelyek */}
      <line x1={O.x} y1={40} x2={O.x} y2={O.y + 20} stroke="#111827" strokeWidth="1.5" />
      <line x1={O.x - 10} y1={O.y} x2={O.x + 15 * scale} y2={O.y} stroke="#111827" strokeWidth="1.5" />
      <text x={O.x - 12} y={O.y + 14} fontSize="12" textAnchor="end">0</text>
      {/* a vektor */}
      <Arrow x1={sx(0)} y1={sy(0)} x2={sx(A.x)} y2={sy(A.y)} stroke="#2563eb" strokeWidth={2.5} id="va" />
      <text x={sx(A.x / 2) - 20} y={sy(A.y / 2)} fontSize="14" fontWeight="700" fill="#2563eb">a=(3,4)</text>
      {/* b vektor a-tól */}
      {(show === 'all' || show === 'sum') && (
        <>
          <Arrow x1={sx(A.x)} y1={sy(A.y)} x2={sx(SUM.x)} y2={sy(SUM.y)} stroke="#16a34a" strokeWidth={2.5} id="vb" />
          <text x={sx(A.x + B.x / 2) + 4} y={sy(A.y + B.y / 2) - 4} fontSize="14" fontWeight="700" fill="#16a34a">b=(5,−1)</text>
        </>
      )}
      {/* eredő */}
      {(show === 'sum') && (
        <>
          <Arrow x1={sx(0)} y1={sy(0)} x2={sx(SUM.x)} y2={sy(SUM.y)} stroke="#dc2626" strokeWidth={3} id="vs" />
          <text x={sx(SUM.x / 2)} y={sy(SUM.y / 2) + 18} fontSize="14" fontWeight="700" fill="#dc2626">a+b=(8,3)</text>
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott két vektor koordinátákkal megadva:

$$\\vec{a} = (3;\\ 4), \\qquad \\vec{b} = (5;\\ -1).$$

**a)** Adja meg a $\\vec{a} + \\vec{b}$ vektor koordinátáit!

**b)** Számítsa ki az összegvektor **hosszát** (abszolút értékét)! Az eredményt két tizedesjegyre kerekítse!`,
  figure: () => <VectorFigure show="all" />,
  asked: [
    { key: 'sum', label: 'a) $\\vec{a} + \\vec{b} = ?$' },
    { key: 'len', label: 'b) $|\\vec{a} + \\vec{b}| = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az összeg koordinátái',
      points: 1,
      body: `Vektor-összeadásnál a koordináták tagonként adódnak:

$$\\vec{a} + \\vec{b} = (3 + 5;\\ 4 + (-1)) = (8;\\ 3).$$`,
      figure: () => <VectorFigure show="sum" />,
    },
    {
      title: '2. lépés — A vektor hossza',
      points: 1,
      body: `Egy $(u;\\ v)$ vektor hossza Pitagorasz-tétellel:

$$|\\vec{v}| = \\sqrt{u^2 + v^2}.$$`,
      figure: () => <VectorFigure show="sum" />,
    },
    {
      title: '3. lépés — A szám kiszámítása',
      points: 1,
      body: `$$|\\vec{a} + \\vec{b}| = \\sqrt{8^2 + 3^2} = \\sqrt{64 + 9} = \\sqrt{73} \\approx 8{,}54.$$`,
      figure: () => <VectorFigure show="sum" />,
    },
  ],
  finalAnswer: {
    sum: '$\\vec{a}+\\vec{b} = (8;\\ 3)$',
    len: '$|\\vec{a}+\\vec{b}| = \\sqrt{73} \\approx 8{,}54$',
  },
  usedFormulas: [
    'koordinátás összeadás: $(u_1, v_1) + (u_2, v_2) = (u_1+u_2, v_1+v_2)$',
    'vektor hossza: $|\\vec v| = \\sqrt{u^2 + v^2}$',
  ],
};

export default { meta, problem, solution };
