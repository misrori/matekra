import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-05',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 5,
  title: 'Síkgeometria — Thalesz-tétel a körben',
  points: 3,
  topics: ['síkgeometria'],
  difficulty: 2,
  fgvt: [
    { page: 62, note: 'Pitagorasz-tétel' },
    { page: 66, note: 'Thálész-tétel' },
  ],
  estimatedMinutes: 5,
};

// Adatok: AB a kör átmérője = 13 cm, AC = 12 cm, AB = 13, BC = ?
// Thalesz miatt ACB szög = 90°, így Pitagorasz: BC = sqrt(13^2 - 12^2) = 5
function ThalesFigure({ step = 1 }) {
  // Kör középpontja O, sugár r = 6.5 (AB = 13)
  const cx = 220, cy = 180, r = 110;
  // A bal oldalon, B jobb oldalon az átmérő mentén
  const Ax = cx - r, Ay = cy;
  const Bx = cx + r, By = cy;
  // C pont: AC = 12 és a derékszög ACB miatt C-t úgy helyezzük el, hogy megfeleljen.
  // Koordinátákban: AB = 13, AC = 12, BC = 5, szög C-nél = 90°.
  // Vegyük A origónak, B = (13,0); C-t keressük: (x-0)^2 + y^2 = 144, (x-13)^2 + y^2 = 25
  // Kivonva: x^2 - (x-13)^2 = 144 - 25 -> 26x - 169 = 119 -> 26x = 288 -> x = 11.08
  // y^2 = 144 - 11.08^2 ≈ 144 - 122.77 = 21.23 -> y ≈ 4.61
  // Az ábrán skálázva r=110 felel meg 6.5-nek, tehát egység = 110/6.5 ≈ 16.92
  const unit = r / 6.5;
  const Cxu = Ax + 11.08 * unit;
  const Cyu = Ay - 4.61 * unit;

  return (
    <SvgCanvas width={480} height={320} viewBox="0 0 480 320">
      {/* Kör */}
      <circle cx={cx} cy={cy} r={r} fill="#eff6ff" stroke="#1e3a8a" strokeWidth="1.8" />
      {/* Átmérő AB */}
      <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#1f2937" strokeWidth="2" />
      {/* Háromszög oldalai */}
      <line x1={Ax} y1={Ay} x2={Cxu} y2={Cyu} stroke={step >= 2 ? '#dc2626' : '#1f2937'} strokeWidth="2.5" />
      <line x1={Bx} y1={By} x2={Cxu} y2={Cyu} stroke={step >= 3 ? '#16a34a' : '#1f2937'} strokeWidth="2.5" />
      {/* Csúcsok */}
      <circle cx={Ax} cy={Ay} r="4" fill="#111" />
      <circle cx={Bx} cy={By} r="4" fill="#111" />
      <circle cx={Cxu} cy={Cyu} r="4" fill="#111" />
      <circle cx={cx} cy={cy} r="3" fill="#6b7280" />

      <text x={Ax - 14} y={Ay + 6} fontSize="16" fontWeight="bold" fill="#111">A</text>
      <text x={Bx + 8} y={By + 6} fontSize="16" fontWeight="bold" fill="#111">B</text>
      <text x={Cxu - 4} y={Cyu - 10} fontSize="16" fontWeight="bold" fill="#111">C</text>
      <text x={cx + 6} y={cy + 18} fontSize="12" fill="#6b7280">O</text>

      {/* Oldalcímkék */}
      <text x={(Ax + Bx) / 2} y={Ay + 22} fontSize="13" textAnchor="middle" fill="#111" fontWeight="bold">
        AB = 13 cm (átmérő)
      </text>
      <text x={(Ax + Cxu) / 2 - 10} y={(Ay + Cyu) / 2 - 4} fontSize="13" fill={step >= 2 ? '#dc2626' : '#111'} fontWeight="bold">
        AC = 12
      </text>
      <text x={(Bx + Cxu) / 2 + 8} y={(By + Cyu) / 2 - 4} fontSize="13" fill={step >= 3 ? '#16a34a' : '#111'} fontWeight="bold">
        BC = {step >= 3 ? '5' : '?'}
      </text>

      {/* Derékszög jel C-ben */}
      {step >= 2 && (
        <g>
          {/* A jelzés két oldalirányú vektorral */}
          <path d={`M ${Cxu - 10},${Cyu + 4} L ${Cxu - 10},${Cyu + 14} L ${Cxu},${Cyu + 14}`} fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <text x={Cxu + 10} y={Cyu + 18} fontSize="12" fill="#7c3aed" fontWeight="bold">90°</text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy kör átmérője $AB = 13$ cm. A körvonal egy $C$ pontjára teljesül, hogy $AC = 12$ cm. Mekkora a $BC$ oldal hossza?`,
  figure: () => <ThalesFigure step={1} />,
  asked: [{ key: 'BC', label: '$BC = ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Thalesz-tétel alkalmazása',
      points: 1,
      body: `A **Thalesz-tétel** szerint: ha egy háromszög egyik oldala egy kör átmérője, és a harmadik csúcs a körvonalon van, akkor a háromszög **derékszögű**, és a derékszög az átmérővel szemközti csúcsnál található.

Itt $AB$ átmérő, $C$ pedig a körvonalon van, így a $\\triangle ABC$ derékszögű, a derékszög a $C$ csúcsnál: $\\angle ACB = 90°$.`,
      figure: () => <ThalesFigure step={2} />,
    },
    {
      title: '2. lépés — Pitagorasz-tétel',
      points: 2,
      body: `A derékszögű háromszögben az **átfogó** $AB = 13$, a befogók $AC = 12$ és $BC$. A Pitagorasz-tétel szerint:

$$AC^2 + BC^2 = AB^2$$
$$12^2 + BC^2 = 13^2$$
$$144 + BC^2 = 169$$
$$BC^2 = 25$$
$$BC = 5 \\ \\text{cm}.$$

Tehát $\\boxed{BC = 5 \\ \\text{cm}}$. (Ez a klasszikus $5\\text{-}12\\text{-}13$ pitagoraszi számhármas.)`,
      figure: () => <ThalesFigure step={3} />,
    },
  ],
  finalAnswer: { BC: '$BC = 5$ cm' },
  usedFormulas: ['Thalesz-tétel', 'Pitagorasz-tétel: $a^2 + b^2 = c^2$'],
};

export default { meta, problem, solution };
