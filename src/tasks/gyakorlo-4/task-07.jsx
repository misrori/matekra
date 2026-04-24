import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-4-07',
  year: 2024,
  session: 'gyakorló · 4. teszt',
  level: 'közép',
  part: 'I',
  number: 7,
  title: 'Kocka testátlója',
  points: 2,
  topics: ['térgeometria'],
  difficulty: 2,
  fgvt: [
    { page: 75, note: 'kocka' },
    { page: 62, note: 'Pitagorasz' },
  ],
  estimatedMinutes: 3,
  check: { type: 'number', value: 10.39, tolerance: 0.05 },
};

// Kocka: a = 6 cm. Testátló: d = a·√3 ≈ 6·1,7320 ≈ 10,39 cm.
function CubeFigure({ showDiagonal = false }) {
  // 2D-es kockarajz (axonometrikus). Front: (80,140) - (320,140) - (320,280) - (80,280).
  // Perspektíva: eltolás (80, -60) a hátsó laphoz.
  const fa = { x: 80, y: 280 };
  const fb = { x: 320, y: 280 };
  const fc = { x: 320, y: 140 };
  const fd = { x: 80, y: 140 };
  const dx = 80, dy = -60;
  const ba = { x: fa.x + dx, y: fa.y + dy };
  const bb = { x: fb.x + dx, y: fb.y + dy };
  const bc = { x: fc.x + dx, y: fc.y + dy };
  const bd = { x: fd.x + dx, y: fd.y + dy };
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* Hátsó él szaggatott */}
      <line x1={ba.x} y1={ba.y} x2={bb.x} y2={bb.y} stroke="#6b7280" strokeDasharray="5 4" strokeWidth="1.5" />
      <line x1={ba.x} y1={ba.y} x2={bd.x} y2={bd.y} stroke="#6b7280" strokeDasharray="5 4" strokeWidth="1.5" />
      <line x1={ba.x} y1={ba.y} x2={fa.x} y2={fa.y} stroke="#6b7280" strokeDasharray="5 4" strokeWidth="1.5" />
      {/* Elülső lap */}
      <polygon points={`${fa.x},${fa.y} ${fb.x},${fb.y} ${fc.x},${fc.y} ${fd.x},${fd.y}`}
        fill="#dbeafe" fillOpacity="0.5" stroke="#1e3a8a" strokeWidth="2" />
      {/* Tető */}
      <polygon points={`${fd.x},${fd.y} ${fc.x},${fc.y} ${bc.x},${bc.y} ${bd.x},${bd.y}`}
        fill="#c7d2fe" fillOpacity="0.5" stroke="#1e3a8a" strokeWidth="2" />
      {/* Jobb oldal */}
      <polygon points={`${fb.x},${fb.y} ${bb.x},${bb.y} ${bc.x},${bc.y} ${fc.x},${fc.y}`}
        fill="#bfdbfe" fillOpacity="0.5" stroke="#1e3a8a" strokeWidth="2" />
      {/* Él címke */}
      <text x={(fa.x + fb.x) / 2} y={fb.y + 20} fontSize="14" fontWeight="700" textAnchor="middle" fill="#1e3a8a">a = 6 cm</text>
      {/* Testátló: fa → bc (átellenes csúcsok) */}
      {showDiagonal && (
        <g>
          <line x1={fa.x} y1={fa.y} x2={bc.x} y2={bc.y} stroke="#dc2626" strokeWidth="2.5" />
          <circle cx={fa.x} cy={fa.y} r="4" fill="#dc2626" />
          <circle cx={bc.x} cy={bc.y} r="4" fill="#dc2626" />
          <text x={(fa.x + bc.x) / 2 + 8} y={(fa.y + bc.y) / 2 + 6} fontSize="14" fontWeight="700" fill="#dc2626">d</text>
          {/* Lapátló segédvonal: fa → fc */}
          <line x1={fa.x} y1={fa.y} x2={fc.x} y2={fc.y} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={fa.x + 10} y={fa.y - 70} fontSize="12" fontWeight="700" fill="#16a34a">lap-átló</text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy kocka élhossza $a = 6$ cm. Mekkora a kocka **testátlójának** hossza? (A testátló a kocka két átellenes csúcsát köti össze.) Az eredményt két tizedesjegyre kerekítse!`,
  figure: () => <CubeFigure />,
  asked: [{ key: 'd', label: 'testátló $d = ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A testátló képlete',
      points: 1,
      body: `A kocka lap-átlójának hossza $a\\sqrt{2}$ (Pitagorasz az egyik lapra). A testátló az egyik csúcsból az átellenes csúcsba mutat, és a lap-átló + egy oldalél derékszögű háromszögében átfogó.

$$d^2 = (a\\sqrt{2})^2 + a^2 = 2a^2 + a^2 = 3a^2,$$

tehát:

$$d = a \\sqrt{3}.$$`,
      figure: () => <CubeFigure showDiagonal />,
    },
    {
      title: '2. lépés — Numerikus érték',
      points: 1,
      body: `$$d = 6 \\cdot \\sqrt{3} \\approx 6 \\cdot 1{,}7320508 \\approx 10{,}39 \\text{ cm}.$$

**Ellenőrzés**: $10{,}39^2 \\approx 107{,}95 \\approx 108 = 3 \\cdot 36$. ✓`,
      figure: () => <CubeFigure showDiagonal />,
    },
  ],
  finalAnswer: { d: '$d = 6\\sqrt{3} \\approx 10{,}39$ cm' },
  usedFormulas: [
    'kocka testátlója: $d = a\\sqrt{3}$',
    'Pitagorasz-tétel',
  ],
};

export default { meta, problem, solution };
