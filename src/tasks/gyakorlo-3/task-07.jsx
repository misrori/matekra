import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-07',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 7,
  title: 'Gömb felszíne és térfogata',
  points: 2,
  topics: ['térgeometria'],
  difficulty: 2,
  fgvt: [{ page: 77, note: 'gömb felszín, térfogat' }],
  estimatedMinutes: 3,
};

// r = 5 cm
// A = 4πr² = 100π ≈ 314,16
// V = (4/3)πr³ = 500π/3 ≈ 523,60
function SphereFigure() {
  const cx = 250, cy = 170, r = 110;
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      {/* Gömb sziluettje */}
      <defs>
        <radialGradient id="sp-grad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="url(#sp-grad)" stroke="#1e40af" strokeWidth="2" />
      {/* Egyenlítő — elöl folyamatos, hátul szaggatott */}
      <path d={`M ${cx - r} ${cy} A ${r} 30 0 0 0 ${cx + r} ${cy}`} fill="none" stroke="#111827" strokeWidth="1.6" />
      <path d={`M ${cx - r} ${cy} A ${r} 30 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#111827" strokeWidth="1.6" strokeDasharray="5 4" />
      {/* Sugár */}
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#dc2626" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="3.5" fill="#111827" />
      <text x={cx + r / 2} y={cy - 8} fontSize="14" fontWeight="700" fill="#dc2626" textAnchor="middle">r = 5 cm</text>
      <text x={cx - 10} y={cy + 16} fontSize="13" fill="#374151">O</text>
      {/* Címke */}
      <text x={cx} y="30" fontSize="15" fontWeight="700" textAnchor="middle">Gömb (r = 5 cm)</text>
      {/* Képletek */}
      <g>
        <rect x="30" y="260" width="210" height="44" rx="6" fill="#fde68a" stroke="#b45309" />
        <text x="135" y="278" fontSize="13" fontWeight="700" textAnchor="middle" fill="#78350f">Felszín</text>
        <text x="135" y="296" fontSize="14" textAnchor="middle">A = 4r²π</text>
      </g>
      <g>
        <rect x="280" y="260" width="210" height="44" rx="6" fill="#dcfce7" stroke="#166534" />
        <text x="385" y="278" fontSize="13" fontWeight="700" textAnchor="middle" fill="#166534">Térfogat</text>
        <text x="385" y="296" fontSize="14" textAnchor="middle">V = (4/3)r³π</text>
      </g>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy gömb sugara $r = 5$ cm.

**a)** Mekkora a gömb felszíne? ($1$ pont)

**b)** Mekkora a gömb térfogata? ($1$ pont)

Az eredményt két tizedesjegyre kerekítse! ($\\pi \\approx 3{,}14159$)`,
  figure: () => <SphereFigure />,
  asked: [
    { key: 'A', label: 'a) $A \\approx ?$ cm²' },
    { key: 'V', label: 'b) $V \\approx ?$ cm³' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A gömb felszíne',
      points: 1,
      body: `A **gömb felszíne** (fgv. tábla 77. old.):

$$A = 4 r^2 \\pi.$$

Behelyettesítve $r = 5$ cm:

$$A = 4 \\cdot 5^2 \\cdot \\pi = 4 \\cdot 25 \\cdot \\pi = 100 \\pi \\approx 314{,}16 \\text{ cm}^2.$$`,
      figure: () => <SphereFigure />,
    },
    {
      title: '2. lépés — A gömb térfogata',
      points: 1,
      body: `A **gömb térfogata**:

$$V = \\dfrac{4}{3} r^3 \\pi.$$

Behelyettesítve:

$$V = \\dfrac{4}{3} \\cdot 5^3 \\cdot \\pi = \\dfrac{4}{3} \\cdot 125 \\cdot \\pi = \\dfrac{500 \\pi}{3} \\approx 523{,}60 \\text{ cm}^3.$$

**Megjegyzés:** A felszín és a térfogat arányára: $\\dfrac{A}{V} = \\dfrac{4r^2\\pi}{(4/3) r^3 \\pi} = \\dfrac{3}{r}$, tehát minél nagyobb a gömb, annál kisebb a felszín/térfogat arány (fajlagos felszín).`,
      figure: () => <SphereFigure />,
    },
  ],
  finalAnswer: {
    A: '$A = 100\\pi \\approx 314{,}16$ cm²',
    V: '$V = \\dfrac{500\\pi}{3} \\approx 523{,}60$ cm³',
  },
  usedFormulas: [
    'gömb felszíne: $A = 4r^2\\pi$',
    'gömb térfogata: $V = \\dfrac{4}{3}r^3\\pi$',
  ],
};

export default { meta, problem, solution };
