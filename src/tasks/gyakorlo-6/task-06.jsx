import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-06',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 6,
  title: 'Körcikk területe',
  points: 2,
  topics: ['síkgeometria'],
  difficulty: 2,
  fgvt: [{ page: 66, note: 'körcikk területe' }],
  estimatedMinutes: 3,
  // r=6, α=120° → T = r²π·α/360 = 36π·(1/3) = 12π ≈ 37,70 cm²
  check: { type: 'number', value: 37.7, tolerance: 0.05 },
};

function SectorFigure() {
  const cx = 250, cy = 180, r = 130;
  // 120 fok, kiindulva -30° (óramutatóval 0 felfelé irányba)
  const startDeg = -60;
  const endDeg = 60;
  const toXY = (deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const [x1, y1] = toXY(startDeg);
  const [x2, y2] = toXY(endDeg);
  return (
    <SvgCanvas width={500} height={340} viewBox="0 0 500 340">
      <text x="250" y="28" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Körcikk (r = 6 cm, α = 120°)
      </text>
      {/* Teljes kör halvány */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Cikk */}
      <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`} fill="#fde68a" fillOpacity="0.75" stroke="#b45309" strokeWidth="2" />
      {/* Sugarak jelölése */}
      <text x={(cx + x1) / 2 + 8} y={(cy + y1) / 2 + 8} fontSize="13" fontWeight="700" fill="#b45309">r = 6</text>
      <text x={(cx + x2) / 2 + 10} y={(cy + y2) / 2 - 4} fontSize="13" fontWeight="700" fill="#b45309">r = 6</text>
      {/* Szög ív */}
      <path d={`M ${cx + 30 * Math.cos((startDeg * Math.PI) / 180)} ${cy + 30 * Math.sin((startDeg * Math.PI) / 180)} A 30 30 0 0 1 ${cx + 30 * Math.cos((endDeg * Math.PI) / 180)} ${cy + 30 * Math.sin((endDeg * Math.PI) / 180)}`} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={cx + 48} y={cy + 4} fontSize="14" fontWeight="700" fill="#dc2626">α = 120°</text>
      {/* Középpont */}
      <circle cx={cx} cy={cy} r="3" fill="#111827" />
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $6$ cm sugarú körben egy körcikk középponti szöge $120°$.

Mekkora a körcikk **területe** cm²-ben? Adja meg pontos alakban (szorzatban) és közelítő értékkel, két tizedesre kerekítve!`,
  figure: () => <SectorFigure />,
  asked: [{ key: 'T', label: '$T = ?$ cm²' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A körcikk területképlete',
      points: 1,
      body: `A körcikk területe (fgv. tábla $66.$ old.):

$$T_{\\text{cikk}} = \\dfrac{r^2 \\pi \\cdot \\alpha}{360°}.$$

Ez úgy értelmezhető: a teljes kör területének ($r^2\\pi$) a **középponti szög**-gel arányos hányada.`,
      figure: () => <SectorFigure />,
    },
    {
      title: '2. lépés — Behelyettesítés és számítás',
      points: 1,
      body: `$$T = \\dfrac{6^2 \\pi \\cdot 120}{360} = \\dfrac{36 \\pi \\cdot 120}{360} = \\dfrac{36 \\pi}{3} = 12 \\pi.$$

Közelítőleg:

$$T \\approx 12 \\cdot 3{,}14159 \\approx 37{,}70 \\text{ cm}^2.$$`,
      figure: () => <SectorFigure />,
    },
  ],
  finalAnswer: { T: '$T = 12\\pi \\approx 37{,}70$ cm²' },
  usedFormulas: ['körcikk területe: $T = \\dfrac{r^2 \\pi \\alpha}{360°}$'],
};

export default { meta, problem, solution };
