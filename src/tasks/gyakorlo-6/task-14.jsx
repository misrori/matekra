import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-14',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'II.A',
  number: 14,
  title: 'Paralelogramma és trapéz — terület, átló',
  points: 13,
  topics: ['síkgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 64, note: 'négyszögek területe' },
    { page: 55, note: 'koszinusztétel' },
  ],
  estimatedMinutes: 18,
};

// Paralelogramma ABCD: AB = 12, AD = 8, BAD szög = 60°.
// a) T = ab·sin(60°) = 12·8·(√3/2) = 48√3 ≈ 83,138 cm²
// b) BD átló koszinusztétellel az ABD háromszögben: BD² = 12² + 8² − 2·12·8·cos(60°) = 144 + 64 − 96 = 112. BD = √112 = 4√7 ≈ 10,583
// c) AC átló (hosszabbik): AC² = 12² + 8² + 2·12·8·cos(60°) (mert az ACB szög 180-60 = 120, cos(120°)=-0,5). Vagy: AC² = a² + b² − 2ab·cos(120°) = 144+64+96 = 304. AC = √304 = 4√19 ≈ 17,436.
// d) Ellenőrzés: a paralelogramma két átlójára: AC² + BD² = 2(a² + b²) → 304 + 112 = 2(144+64) → 416 = 416. ✓
//
// Most kihívásosabb: tegyük meg trapézként is. Trapéz EFGH az előbbihez kapcsolódik: EF = 12, GH = 4, m = 6 → T = (12+4)/2·6 = 48 cm².

function ParallelogramFigure({ highlight = 'none' }) {
  // Paralelogramma: AB=12 vízszintes, szög 60°, AD=8.
  // Koordináták (cm-ben): A(0,0), B(12,0), D(8cos60°, 8sin60°) = (4, 4√3), C = B + AD = (16, 4√3).
  const A = { x: 80, y: 220 };
  const scale = 20;
  const B = { x: A.x + 12 * scale, y: A.y };
  const D = { x: A.x + 4 * scale, y: A.y - Math.round(4 * Math.sqrt(3) * scale) };
  const C = { x: B.x + 4 * scale, y: B.y - Math.round(4 * Math.sqrt(3) * scale) };
  return (
    <SvgCanvas width={600} height={300} viewBox="0 0 600 300">
      <text x="300" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Paralelogramma ABCD — AB = 12, AD = 8, ∠BAD = 60°
      </text>
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
        fill={highlight === 'area' ? '#fde68a' : '#dbeafe'} fillOpacity="0.6" stroke="#1e40af" strokeWidth="2" />
      {/* Átlók */}
      {highlight === 'diag' && (
        <>
          <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 3" />
          <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#16a34a" strokeWidth="2.5" strokeDasharray="6 3" />
          <text x={(A.x + C.x) / 2 + 12} y={(A.y + C.y) / 2} fontSize="12" fontWeight="700" fill="#dc2626">AC</text>
          <text x={(B.x + D.x) / 2 + 10} y={(B.y + D.y) / 2} fontSize="12" fontWeight="700" fill="#16a34a">BD</text>
        </>
      )}
      {/* Csúcs-címkék */}
      <text x={A.x - 14} y={A.y + 18} fontSize="14" fontWeight="700" fill="#111827">A</text>
      <text x={B.x + 6} y={B.y + 18} fontSize="14" fontWeight="700" fill="#111827">B</text>
      <text x={C.x + 6} y={C.y} fontSize="14" fontWeight="700" fill="#111827">C</text>
      <text x={D.x - 14} y={D.y} fontSize="14" fontWeight="700" fill="#111827">D</text>
      {/* Oldalhosszak */}
      <text x={(A.x + B.x) / 2} y={A.y + 18} fontSize="12" textAnchor="middle" fill="#374151">12 cm</text>
      <text x={A.x - 20} y={(A.y + D.y) / 2} fontSize="12" textAnchor="end" fill="#374151">8 cm</text>
      {/* Szög ív A-nál */}
      <path d={`M ${A.x + 26} ${A.y} A 26 26 0 0 0 ${A.x + 13} ${A.y - 22.5}`} fill="none" stroke="#b45309" strokeWidth="1.8" />
      <text x={A.x + 34} y={A.y - 14} fontSize="12" fontWeight="700" fill="#b45309">60°</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $ABCD$ paralelogrammában $AB = 12$ cm, $AD = 8$ cm, az $A$ csúcsnál lévő szög $\\angle BAD = 60°$.

**a)** Mekkora a paralelogramma **területe**? ($4$ pont)

**b)** Mekkora a **BD átló** hossza? ($4$ pont)

**c)** Mekkora az **AC átló** hossza? ($3$ pont)

**d)** Igazolja számítással, hogy a paralelogramma két átlójára teljesül a

$$|AC|^2 + |BD|^2 = 2(|AB|^2 + |AD|^2)$$

egyenlőség! ($2$ pont)

A hosszakat három tizedesre kerekítse!`,
  figure: () => <ParallelogramFigure />,
  asked: [
    { key: 'T', label: 'a) $T = ?$ cm²' },
    { key: 'BD', label: 'b) $|BD| = ?$ cm' },
    { key: 'AC', label: 'c) $|AC| = ?$ cm' },
    { key: 'check', label: 'd) azonosság ellenőrzése' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — A terület képlete',
      points: 2,
      body: `A paralelogramma területe kiszámítható két oldal és a köztük lévő szög alapján:

$$T = a \\cdot b \\cdot \\sin \\gamma,$$

ahol $a = AB = 12$, $b = AD = 8$, $\\gamma = 60°$.`,
      figure: () => <ParallelogramFigure highlight="area" />,
    },
    {
      title: 'a) 2. lépés — Behelyettesítés',
      points: 2,
      body: `$$T = 12 \\cdot 8 \\cdot \\sin 60° = 96 \\cdot \\dfrac{\\sqrt{3}}{2} = 48 \\sqrt{3} \\approx 83{,}138 \\text{ cm}^2.$$`,
      figure: () => <ParallelogramFigure highlight="area" />,
    },

    {
      title: 'b) 1. lépés — Az ABD háromszögben koszinusztétel',
      points: 2,
      body: `A $BD$ átló az $ABD$ háromszög oldala, ahol $AB = 12$, $AD = 8$, és a közrezárt szög $\\angle BAD = 60°$. Alkalmazzuk a **koszinusztételt** (fgv. tábla $55.$ old.):

$$|BD|^2 = |AB|^2 + |AD|^2 - 2 \\cdot |AB| \\cdot |AD| \\cdot \\cos 60°.$$`,
      figure: () => <ParallelogramFigure highlight="diag" />,
    },
    {
      title: 'b) 2. lépés — Számítás',
      points: 2,
      body: `$$|BD|^2 = 144 + 64 - 2 \\cdot 12 \\cdot 8 \\cdot \\dfrac{1}{2} = 208 - 96 = 112.$$

$$|BD| = \\sqrt{112} = 4\\sqrt{7} \\approx 10{,}583 \\text{ cm}.$$`,
      figure: () => <ParallelogramFigure highlight="diag" />,
    },

    {
      title: 'c) 1. lépés — Az ABC háromszögben koszinusztétel',
      points: 2,
      body: `Az $AC$ átló az $ABC$ háromszög oldala. Mivel paralelogrammáról van szó, a $B$ csúcsnál lévő belső szög:

$$\\angle ABC = 180° - 60° = 120°.$$

(A paralelogramma szemközti szögei egyenlők, a szomszédosak kiegészítők.)

$$|AC|^2 = |AB|^2 + |BC|^2 - 2 \\cdot |AB| \\cdot |BC| \\cdot \\cos 120°.$$`,
      figure: () => <ParallelogramFigure highlight="diag" />,
    },
    {
      title: 'c) 2. lépés — Számítás',
      points: 1,
      body: `$|BC| = |AD| = 8$ (szemközti oldalak egyenlők), $\\cos 120° = -\\dfrac{1}{2}$:

$$|AC|^2 = 144 + 64 - 2 \\cdot 12 \\cdot 8 \\cdot \\left(-\\dfrac{1}{2}\\right) = 208 + 96 = 304.$$

$$|AC| = \\sqrt{304} = 4\\sqrt{19} \\approx 17{,}436 \\text{ cm}.$$`,
      figure: () => <ParallelogramFigure highlight="diag" />,
    },

    {
      title: 'd) Paralelogramma-azonosság',
      points: 2,
      body: `Bal oldal:

$$|AC|^2 + |BD|^2 = 304 + 112 = 416.$$

Jobb oldal:

$$2(|AB|^2 + |AD|^2) = 2(144 + 64) = 2 \\cdot 208 = 416.$$

A két érték megegyezik, tehát az azonosság teljesül. ✓

Ez egy általános tétel a paralelogrammára: az átlók négyzeteinek összege a négy oldal négyzetösszegével egyenlő.`,
      figure: () => <ParallelogramFigure highlight="diag" />,
    },
  ],
  finalAnswer: {
    T: '$T = 48\\sqrt{3} \\approx 83{,}138$ cm²',
    BD: '$|BD| = 4\\sqrt{7} \\approx 10{,}583$ cm',
    AC: '$|AC| = 4\\sqrt{19} \\approx 17{,}436$ cm',
    check: '$416 = 416$ ✓',
  },
  usedFormulas: [
    'paralelogramma területe: $T = ab\\sin\\gamma$',
    'koszinusztétel: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$',
    'paralelogramma szomszédos szögei: $\\alpha + \\beta = 180°$',
  ],
};

export default { meta, problem, solution };
