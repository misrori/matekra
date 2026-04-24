import { SvgCanvas, Arrow } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-09',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 9,
  title: 'Vektorok kifejezése paralelogrammában',
  points: 3,
  topics: ['vektor'],
  difficulty: 2,
  fgvt: [{ page: 86, note: 'vektorműveletek' }],
  estimatedMinutes: 5,
};

// Paralelogramma ABCD: A (80, 240), B (300, 240), D (160, 80), C = B + (D-A) = (380, 80)
// AB = a, AD = b, M az AC átló középpontja
const PTS = {
  A: { x: 80, y: 240 },
  B: { x: 300, y: 240 },
  C: { x: 380, y: 80 },
  D: { x: 160, y: 80 },
};
const Mcoord = { x: (PTS.A.x + PTS.C.x) / 2, y: (PTS.A.y + PTS.C.y) / 2 };

function Parallelogram({ highlight = 'none' }) {
  return (
    <SvgCanvas width={480} height={320} viewBox="0 0 480 320">
      <polygon
        points={`${PTS.A.x},${PTS.A.y} ${PTS.B.x},${PTS.B.y} ${PTS.C.x},${PTS.C.y} ${PTS.D.x},${PTS.D.y}`}
        fill="#e0e7ff"
        fillOpacity="0.3"
        stroke="#1e3a8a"
        strokeWidth="2"
      />
      {/* átlók */}
      <line x1={PTS.A.x} y1={PTS.A.y} x2={PTS.C.x} y2={PTS.C.y} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
      <line x1={PTS.B.x} y1={PTS.B.y} x2={PTS.D.x} y2={PTS.D.y} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />

      {/* a vektor: AB */}
      <Arrow x1={PTS.A.x} y1={PTS.A.y} x2={PTS.B.x} y2={PTS.B.y} stroke="#2563eb" strokeWidth="2.5" id="gy109-a" />
      <text x={(PTS.A.x + PTS.B.x) / 2} y={PTS.A.y + 22} fontSize="16" fontWeight="bold" fill="#2563eb" textAnchor="middle">
        a
      </text>
      {/* b vektor: AD */}
      <Arrow x1={PTS.A.x} y1={PTS.A.y} x2={PTS.D.x} y2={PTS.D.y} stroke="#dc2626" strokeWidth="2.5" id="gy109-b" />
      <text x={(PTS.A.x + PTS.D.x) / 2 - 18} y={(PTS.A.y + PTS.D.y) / 2} fontSize="16" fontWeight="bold" fill="#dc2626">
        b
      </text>

      {/* BD vektor kiemelve */}
      {highlight === 'BD' && (
        <Arrow x1={PTS.B.x} y1={PTS.B.y} x2={PTS.D.x} y2={PTS.D.y} stroke="#059669" strokeWidth="3" id="gy109-bd" />
      )}
      {/* AM vektor kiemelve */}
      {highlight === 'AM' && (
        <Arrow x1={PTS.A.x} y1={PTS.A.y} x2={Mcoord.x} y2={Mcoord.y} stroke="#7c3aed" strokeWidth="3" id="gy109-am" />
      )}

      {/* csúcsok */}
      {Object.entries(PTS).map(([name, p]) => (
        <g key={name}>
          <circle cx={p.x} cy={p.y} r="4" fill="#111" />
          <text
            x={p.x + (name === 'A' || name === 'D' ? -12 : 12)}
            y={p.y + (name === 'A' || name === 'B' ? 18 : -8)}
            fontSize="16"
            fontWeight="bold"
            fill="#111"
          >
            {name}
          </text>
        </g>
      ))}
      <circle cx={Mcoord.x} cy={Mcoord.y} r="4" fill="#7c3aed" />
      <text x={Mcoord.x + 8} y={Mcoord.y - 6} fontSize="14" fontWeight="bold" fill="#7c3aed">M</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az $ABCD$ **paralelogrammában** legyen $\\overrightarrow{AB} = \\vec{a}$ és $\\overrightarrow{AD} = \\vec{b}$.
Jelölje $M$ a paralelogramma **átlóinak metszéspontját** (azaz az $AC$ és $BD$ átlók közös pontját).

Fejezze ki $\\vec{a}$ és $\\vec{b}$ segítségével:

**a)** a $\\overrightarrow{BD}$ vektort,

**b)** az $\\overrightarrow{AM}$ vektort!`,
  figure: () => <Parallelogram />,
  asked: [
    { key: 'BD', label: '$\\overrightarrow{BD} = ?$' },
    { key: 'AM', label: '$\\overrightarrow{AM} = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — $\\overrightarrow{BD}$ kifejezése',
      points: 1.5,
      body: `Vektorok összege „háromszög-szabállyal": ha $B$-ből eljutunk $A$-ba, majd $A$-ból $D$-be, az ugyanaz, mintha egyből $B$-ből $D$-be mennénk.

$$\\overrightarrow{BD} = \\overrightarrow{BA} + \\overrightarrow{AD}.$$

Mivel $\\overrightarrow{BA} = -\\overrightarrow{AB} = -\\vec{a}$, és $\\overrightarrow{AD} = \\vec{b}$:

$$\\overrightarrow{BD} = -\\vec{a} + \\vec{b} = \\vec{b} - \\vec{a}.$$`,
      figure: () => <Parallelogram highlight="BD" />,
    },
    {
      title: 'b) lépés — $\\overrightarrow{AM}$ kifejezése',
      points: 1.5,
      body: `A paralelogramma átlói **felezik** egymást, tehát $M$ az $AC$ átló felezőpontja:

$$\\overrightarrow{AM} = \\dfrac{1}{2} \\overrightarrow{AC}.$$

Írjuk fel $\\overrightarrow{AC}$-t $\\vec{a}$ és $\\vec{b}$ segítségével. $A$-ból $C$-be úgy jutunk el, hogy először $B$-be ($\\vec{a}$), onnan $C$-be (ami $\\overrightarrow{BC} = \\overrightarrow{AD} = \\vec{b}$, mert $BC \\parallel AD$ és egyforma hosszúak):

$$\\overrightarrow{AC} = \\vec{a} + \\vec{b}.$$

Innen:

$$\\overrightarrow{AM} = \\dfrac{1}{2} (\\vec{a} + \\vec{b}) = \\dfrac{\\vec{a} + \\vec{b}}{2}.$$`,
      figure: () => <Parallelogram highlight="AM" />,
    },
  ],
  finalAnswer: {
    BD: '$\\overrightarrow{BD} = \\vec{b} - \\vec{a}$',
    AM: '$\\overrightarrow{AM} = \\dfrac{\\vec{a} + \\vec{b}}{2}$',
  },
  usedFormulas: [
    '$\\overrightarrow{XY} = -\\overrightarrow{YX}$',
    'háromszög-szabály: $\\overrightarrow{BD} = \\overrightarrow{BA} + \\overrightarrow{AD}$',
    'paralelogramma átlói felezik egymást',
  ],
};

export default { meta, problem, solution };
