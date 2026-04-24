import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-06',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 6,
  title: 'Körcikk területe és körívhossz',
  points: 2,
  topics: ['síkgeometria'],
  difficulty: 2,
  fgvt: [{ page: 66, note: 'kör, körcikk, körív' }],
  estimatedMinutes: 3,
};

// r = 6 cm, α = 120°.
// Körív: i = 2rπ·α/360 = 12π·120/360 = 4π ≈ 12,566
// Körcikk T: T = r²π·α/360 = 36π·120/360 = 12π ≈ 37,699
function SectorFigure({ highlight = 'none' }) {
  // Kör középpontja: (200, 180). r = 130.
  // α = 120°, kezdete 0° (jobbra), vége 120° (felfelé-balra).
  const cx = 220, cy = 180, r = 130;
  const a1 = 0;
  const a2 = 120;
  const rad = (d) => (d * Math.PI) / 180;
  const P1 = { x: cx + r * Math.cos(rad(a1)), y: cy - r * Math.sin(rad(a1)) };
  const P2 = { x: cx + r * Math.cos(rad(a2)), y: cy - r * Math.sin(rad(a2)) };
  const large = 0;
  const path = `M ${cx} ${cy} L ${P1.x} ${P1.y} A ${r} ${r} 0 ${large} 0 ${P2.x} ${P2.y} Z`;
  const arcPath = `M ${P1.x} ${P1.y} A ${r} ${r} 0 ${large} 0 ${P2.x} ${P2.y}`;
  return (
    <SvgCanvas width={520} height={360} viewBox="0 0 520 360">
      {/* Teljes kör háttérben */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Körcikk */}
      <path d={path} fill={highlight === 'area' ? '#fde68a' : '#dbeafe'} fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2" />
      {/* Körív kiemelése */}
      {highlight === 'arc' && (
        <path d={arcPath} fill="none" stroke="#dc2626" strokeWidth="4" />
      )}
      {/* Középpont */}
      <circle cx={cx} cy={cy} r="3.5" fill="#111827" />
      <text x={cx - 12} y={cy + 5} fontSize="14" fontWeight="700">O</text>
      {/* Sugár-címke */}
      <text x={cx + 55} y={cy - 4} fontSize="14" fontWeight="700" fill="#1e3a8a">r = 6 cm</text>
      {/* Szög-címke */}
      <path
        d={`M ${cx + 40} ${cy} A 40 40 0 0 0 ${cx + 40 * Math.cos(rad(a2))} ${cy - 40 * Math.sin(rad(a2))}`}
        fill="none"
        stroke="#b91c1c"
        strokeWidth="2"
      />
      <text x={cx + 8} y={cy - 30} fontSize="14" fontWeight="700" fill="#b91c1c">α = 120°</text>
      {/* Csúcsok */}
      <circle cx={P1.x} cy={P1.y} r="3" fill="#111827" />
      <circle cx={P2.x} cy={P2.y} r="3" fill="#111827" />
      {/* Magyarázat */}
      {highlight === 'area' && (
        <text x="260" y="340" fontSize="14" fontWeight="700" textAnchor="middle" fill="#b45309">
          Körcikk területe ∼ sárga
        </text>
      )}
      {highlight === 'arc' && (
        <text x="260" y="340" fontSize="14" fontWeight="700" textAnchor="middle" fill="#dc2626">
          Körív hossza ∼ piros ív
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy körcikk sugara $r = 6$ cm, középponti szöge $\\alpha = 120°$.

**a)** Mekkora a körcikkhez tartozó körív hossza? ($1$ pont)

**b)** Mekkora a körcikk területe? ($1$ pont)

Az eredményt két tizedesjegyre kerekítse! ($\\pi \\approx 3{,}14159$)`,
  figure: () => <SectorFigure />,
  asked: [
    { key: 'arc', label: 'a) körív: $i \\approx ?$ cm' },
    { key: 'area', label: 'b) körcikk: $T \\approx ?$ cm²' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A körív hossza',
      points: 1,
      body: `A **körív hossza** (középponti szög $\\alpha$ fokban):

$$i = \\dfrac{2 r \\pi \\cdot \\alpha}{360°}.$$

Behelyettesítve $r = 6$, $\\alpha = 120°$:

$$i = \\dfrac{2 \\cdot 6 \\cdot \\pi \\cdot 120}{360} = \\dfrac{1440 \\pi}{360} = 4 \\pi \\approx 12{,}57 \\text{ cm.}$$`,
      figure: () => <SectorFigure highlight="arc" />,
    },
    {
      title: '2. lépés — A körcikk területe',
      points: 1,
      body: `A **körcikk területe**:

$$T = \\dfrac{r^2 \\pi \\cdot \\alpha}{360°}.$$

Behelyettesítve:

$$T = \\dfrac{36 \\pi \\cdot 120}{360} = \\dfrac{4320 \\pi}{360} = 12 \\pi \\approx 37{,}70 \\text{ cm}^2.$$

**Szemléltetés:** $120° = \\frac{1}{3} \\cdot 360°$, így a körcikk területe pontosan a teljes körterület $(r^2\\pi = 36\\pi)$ harmada, a körív pedig a teljes kerület $(2r\\pi = 12\\pi)$ harmada — ez egyezik a számításunkkal.`,
      figure: () => <SectorFigure highlight="area" />,
    },
  ],
  finalAnswer: {
    arc: '$i = 4\\pi \\approx 12{,}57$ cm',
    area: '$T = 12\\pi \\approx 37{,}70$ cm²',
  },
  usedFormulas: [
    'körív: $i = \\dfrac{2r\\pi\\alpha}{360°}$',
    'körcikk: $T = \\dfrac{r^2\\pi\\alpha}{360°}$',
  ],
};

export default { meta, problem, solution };
