import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-04',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 4,
  title: 'Szórás kiszámítása',
  points: 2,
  topics: ['statisztika'],
  difficulty: 3,
  fgvt: [{ page: 100, note: 'szórás képlete' }],
  estimatedMinutes: 4,
  check: { type: 'number', value: 2, tolerance: 0.01 },
};

// Adatok: 4, 6, 8, 10, 12. Átlag = 40/5 = 8.
// Eltérések: -4, -2, 0, 2, 4. Négyzetek: 16, 4, 0, 4, 16 → összeg 40.
// Szórás (populációs): σ = sqrt(40/5) = sqrt(8) ≈ 2,828.
// Nehogy rossz legyen, válasszuk a feladatot úgy, hogy σ = 2 legyen.
// Adatok: 6, 7, 8, 9, 10. Átlag = 40/5 = 8. Eltérések: -2,-1,0,1,2. Négyzetek: 4,1,0,1,4 → összeg 10.
// σ = sqrt(10/5) = sqrt(2) ≈ 1,414. Még mindig nem 2.
// Legyen: 2, 4, 6, 8, 10. Átlag = 6. Eltérések: -4,-2,0,2,4. Négyzetek: 16,4,0,4,16 → 40. σ = sqrt(40/5)=sqrt(8)≈2,83.
// Legyen: 0, 2, 4, 6, 8. Átlag = 4. Eltérések: -4,-2,0,2,4 → négyzetek 16,4,0,4,16 → 40, σ=sqrt(8).
// Legyen 4 adat úgy, hogy σ=2: pl. 4, 6, 8, 10 → átlag 7. Eltérések: -3,-1,1,3 → 9+1+1+9=20. σ=sqrt(20/4)=sqrt(5)≈2,24.
// Legyen 5 adat: 5, 7, 8, 9, 11. Átlag = 40/5 = 8. Eltérések: -3,-1,0,1,3. Négyzetek: 9,1,0,1,9=20. σ=sqrt(20/5)=2. ✓
const DATA = [5, 7, 8, 9, 11];
const MEAN = 8;

function DataChart() {
  const yMax = 14;
  const xMin = 0, xMax = 6;
  const width = 540, height = 260;
  const plot = { x: 50, y: 40, w: 460, h: 180 };
  const sx = (i) => plot.x + ((i + 0.5) / DATA.length) * plot.w;
  const sy = (v) => plot.y + plot.h - (v / yMax) * plot.h;
  return (
    <SvgCanvas width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="270" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Adatok: 5, 7, 8, 9, 11 — átlag 8
      </text>
      {/* Átlag vonal */}
      <line x1={plot.x} y1={sy(MEAN)} x2={plot.x + plot.w} y2={sy(MEAN)} stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" />
      <text x={plot.x + plot.w - 10} y={sy(MEAN) - 6} fontSize="12" textAnchor="end" fill="#dc2626" fontWeight="700">átlag = 8</text>
      {DATA.map((v, i) => {
        const cx = sx(i);
        const cy = sy(v);
        const dy = sy(MEAN);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={cx} y2={dy} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 3" />
            <circle cx={cx} cy={cy} r="8" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
            <text x={cx} y={cy - 14} fontSize="13" fontWeight="700" textAnchor="middle" fill="#1e3a8a">{v}</text>
          </g>
        );
      })}
      <line x1={plot.x} y1={plot.y + plot.h} x2={plot.x + plot.w} y2={plot.y + plot.h} stroke="#111827" strokeWidth="1.5" />
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $5$ elemű adatsor: $5,\\ 7,\\ 8,\\ 9,\\ 11$.

Mennyi az adatsor (populációs) **szórása**? Írja le a számítás lépéseit!`,
  figure: () => <DataChart />,
  asked: [{ key: 'sigma', label: '$\\sigma = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az átlag',
      points: 1,
      body: `Az adatok számtani átlaga:

$$\\bar{x} = \\dfrac{5 + 7 + 8 + 9 + 11}{5} = \\dfrac{40}{5} = 8.$$`,
      figure: () => <DataChart />,
    },
    {
      title: '2. lépés — Az átlagtól való eltérések négyzete, majd a szórás',
      points: 1,
      body: `A populációs szórás képlete (fgv. tábla $100.$ old.):

$$\\sigma = \\sqrt{\\dfrac{1}{n} \\sum_{i=1}^{n} (x_i - \\bar{x})^2}.$$

Eltérések és négyzeteik:

$$(5-8)^2 = 9,\\ (7-8)^2 = 1,\\ (8-8)^2 = 0,\\ (9-8)^2 = 1,\\ (11-8)^2 = 9.$$

Ezek összege: $9 + 1 + 0 + 1 + 9 = 20.$

$$\\sigma = \\sqrt{\\dfrac{20}{5}} = \\sqrt{4} = 2.$$`,
      figure: () => <DataChart />,
    },
  ],
  finalAnswer: { sigma: '$\\sigma = 2$' },
  usedFormulas: [
    'átlag: $\\bar{x} = \\dfrac{\\sum x_i}{n}$',
    'szórás: $\\sigma = \\sqrt{\\dfrac{1}{n}\\sum (x_i - \\bar{x})^2}$',
  ],
};

export default { meta, problem, solution };
