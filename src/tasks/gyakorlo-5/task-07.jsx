import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-07',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 7,
  title: 'Térgeometria — henger palástja',
  points: 2,
  topics: ['térgeometria'],
  difficulty: 2,
  fgvt: [{ page: 75, note: 'hasáb, henger' }],
  estimatedMinutes: 3,
  // Palást = 2rπ·m = 2·4·π·10 = 80π ≈ 251,33 cm²
  check: { type: 'number', value: 251.33, tolerance: 0.5 },
};

function CylinderFigure() {
  // Henger: sugár=4, magasság=10
  const cx = 240, cy = 180;
  const rx = 60, ry = 18; // ellipszis (perspektíva)
  const h = 140;
  return (
    <SvgCanvas width={480} height={300} viewBox="0 0 480 300">
      {/* Alsó ellipszis */}
      <ellipse cx={cx} cy={cy + h / 2} rx={rx} ry={ry} fill="#e0e7ff" stroke="#1e3a8a" strokeWidth="1.8" />
      {/* Palástfelület */}
      <rect x={cx - rx} y={cy - h / 2} width={2 * rx} height={h} fill="#c7d2fe" fillOpacity="0.6" stroke="none" />
      <line x1={cx - rx} y1={cy - h / 2} x2={cx - rx} y2={cy + h / 2} stroke="#1e3a8a" strokeWidth="1.8" />
      <line x1={cx + rx} y1={cy - h / 2} x2={cx + rx} y2={cy + h / 2} stroke="#1e3a8a" strokeWidth="1.8" />
      {/* Felső ellipszis */}
      <ellipse cx={cx} cy={cy - h / 2} rx={rx} ry={ry} fill="#e0e7ff" stroke="#1e3a8a" strokeWidth="1.8" />
      {/* Sugár jel */}
      <line x1={cx} y1={cy - h / 2} x2={cx + rx} y2={cy - h / 2} stroke="#dc2626" strokeWidth="1.6" strokeDasharray="4,3" />
      <text x={cx + rx / 2} y={cy - h / 2 - 6} fontSize="13" textAnchor="middle" fill="#dc2626" fontWeight="bold">r = 4</text>
      {/* Magasság jel */}
      <line x1={cx + rx + 18} y1={cy - h / 2} x2={cx + rx + 18} y2={cy + h / 2} stroke="#16a34a" strokeWidth="1.4" />
      <line x1={cx + rx + 14} y1={cy - h / 2} x2={cx + rx + 22} y2={cy - h / 2} stroke="#16a34a" />
      <line x1={cx + rx + 14} y1={cy + h / 2} x2={cx + rx + 22} y2={cy + h / 2} stroke="#16a34a" />
      <text x={cx + rx + 30} y={cy + 5} fontSize="13" fill="#16a34a" fontWeight="bold">m = 10</text>
      <text x="240" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        Forgáshenger (r = 4 cm, m = 10 cm)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy egyenes körhenger alapkörének sugara $r = 4$ cm, magassága $m = 10$ cm. Számítsa ki a henger **palástjának** felszínét cm²-ben, két tizedesjegyre kerekítve! ($\\pi \\approx 3{,}14159$)`,
  figure: () => <CylinderFigure />,
  asked: [{ key: 'A', label: 'palást = ? cm²' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A palást képlete',
      points: 1,
      body: `A henger palástja — ha kiterítjük síkba — egy téglalap, amelynek egyik oldala az **alapkör kerülete** ($2r\\pi$), a másik a henger **magassága** ($m$).

$$A_{\\text{palást}} = 2 r \\pi \\cdot m.$$`,
    },
    {
      title: '2. lépés — Behelyettesítés és kerekítés',
      points: 1,
      body: `$r = 4$, $m = 10$:

$$A_{\\text{palást}} = 2 \\cdot 4 \\cdot \\pi \\cdot 10 = 80 \\pi.$$

Numerikusan:

$$80 \\pi \\approx 80 \\cdot 3{,}14159 \\approx 251{,}33 \\ \\text{cm}^2.$$

Tehát $\\boxed{A_{\\text{palást}} \\approx 251{,}33 \\ \\text{cm}^2}$.`,
    },
  ],
  finalAnswer: { A: '$\\approx 251{,}33$ cm²' },
  usedFormulas: ['$A_{\\text{palást}} = 2 r \\pi m$'],
};

export default { meta, problem, solution };
