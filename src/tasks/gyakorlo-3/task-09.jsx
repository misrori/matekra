import { SvgCanvas, Arrow } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-09',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 9,
  title: 'Vektorok paralelogrammában — átlók',
  points: 3,
  topics: ['vektor'],
  difficulty: 3,
  fgvt: [{ page: 86, note: 'vektorműveletek' }],
  estimatedMinutes: 5,
};

// ABCD paralelogramma. AB = a, AD = b.
// AC = a + b (átló)
// BD = -a + b = b - a (átló)
// Kérdés: add meg AC és BD vektorokat a és b segítségével.
function ParFigure({ showAC = false, showBD = false }) {
  // Paralelogramma csúcsai
  const A = { x: 100, y: 260 };
  const B = { x: 360, y: 260 };
  const D = { x: 180, y: 120 };
  const C = { x: B.x + (D.x - A.x), y: B.y + (D.y - A.y) };
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* Paralelogramma */}
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="#dbeafe" fillOpacity="0.4" stroke="#1e3a8a" strokeWidth="2" />
      {/* Csúcsok */}
      {[A, B, C, D].map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.8" fill="#111827" />)}
      <text x={A.x - 10} y={A.y + 16} fontSize="15" fontWeight="700" textAnchor="end">A</text>
      <text x={B.x + 10} y={B.y + 16} fontSize="15" fontWeight="700">B</text>
      <text x={C.x + 10} y={C.y - 4} fontSize="15" fontWeight="700">C</text>
      <text x={D.x - 10} y={D.y - 4} fontSize="15" fontWeight="700" textAnchor="end">D</text>
      {/* Vektor jelölések */}
      <Arrow x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#2563eb" strokeWidth="2.5" id="ab-09" />
      <text x={(A.x + B.x) / 2} y={A.y + 22} fontSize="15" fontWeight="700" fill="#2563eb" textAnchor="middle">a</text>
      <Arrow x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#16a34a" strokeWidth="2.5" id="ad-09" />
      <text x={(A.x + D.x) / 2 - 14} y={(A.y + D.y) / 2} fontSize="15" fontWeight="700" fill="#16a34a" textAnchor="end">b</text>
      {/* Átlók */}
      {showAC && (
        <>
          <Arrow x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#dc2626" strokeWidth="2.8" id="ac-09" />
          <text x={(A.x + C.x) / 2 + 10} y={(A.y + C.y) / 2 - 4} fontSize="15" fontWeight="700" fill="#dc2626">AC = a + b</text>
        </>
      )}
      {showBD && (
        <>
          <Arrow x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#9333ea" strokeWidth="2.8" id="bd-09" />
          <text x={(B.x + D.x) / 2 + 10} y={(B.y + D.y) / 2 - 4} fontSize="15" fontWeight="700" fill="#9333ea">BD = b − a</text>
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `$ABCD$ paralelogramma. Legyen $\\overrightarrow{AB} = \\vec{a}$ és $\\overrightarrow{AD} = \\vec{b}$.

Fejezze ki $\\vec{a}$ és $\\vec{b}$ segítségével a két átló-vektort: $\\overrightarrow{AC}$ és $\\overrightarrow{BD}$!
Megoldását részletezze!`,
  figure: () => <ParFigure />,
  asked: [
    { key: 'AC', label: '$\\overrightarrow{AC} = ?$' },
    { key: 'BD', label: '$\\overrightarrow{BD} = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az $\\overrightarrow{AC}$ átló',
      points: 1,
      body: `A paralelogramma-szabály (vagy: $A$-ból $C$-be $B$-n vagy $D$-n keresztül jutunk):

$$\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{BC}.$$

Mivel $ABCD$ paralelogramma, a szemközti oldalak vektorai **egyenlők**:

$$\\overrightarrow{BC} = \\overrightarrow{AD} = \\vec{b}.$$

Ezért:

$$\\boxed{\\overrightarrow{AC} = \\vec{a} + \\vec{b}.}$$`,
      figure: () => <ParFigure showAC />,
    },
    {
      title: '2. lépés — A $\\overrightarrow{BD}$ átló',
      points: 1,
      body: `$B$-ből $D$-be az $A$-n keresztül:

$$\\overrightarrow{BD} = \\overrightarrow{BA} + \\overrightarrow{AD}.$$

Tudjuk, hogy $\\overrightarrow{BA} = -\\overrightarrow{AB} = -\\vec{a}$, és $\\overrightarrow{AD} = \\vec{b}$. Ezért:

$$\\boxed{\\overrightarrow{BD} = -\\vec{a} + \\vec{b} = \\vec{b} - \\vec{a}.}$$`,
      figure: () => <ParFigure showBD />,
    },
    {
      title: '3. lépés — Ellenőrzés',
      points: 1,
      body: `**Ellenőrzés.** A paralelogramma átlói felezik egymást; legyen $M$ a közös felezőpont. Ekkor:

$$\\overrightarrow{AM} = \\tfrac{1}{2}(\\vec{a} + \\vec{b}), \\quad \\overrightarrow{BM} = \\tfrac{1}{2}(\\vec{b} - \\vec{a}).$$

$$\\overrightarrow{AM} + \\overrightarrow{MB} = \\overrightarrow{AB} \\;\\Longrightarrow\\; \\tfrac{1}{2}(\\vec{a}+\\vec{b}) - \\tfrac{1}{2}(\\vec{b}-\\vec{a}) = \\vec{a}. \\;\\checkmark$$`,
      figure: () => <ParFigure showAC showBD />,
    },
  ],
  finalAnswer: {
    AC: '$\\overrightarrow{AC} = \\vec{a} + \\vec{b}$',
    BD: '$\\overrightarrow{BD} = \\vec{b} - \\vec{a}$',
  },
  usedFormulas: [
    'vektor-összeadás: $\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{BC}$',
    'paralelogramma: szemközti oldalak vektorai egyenlők',
    '$\\overrightarrow{BA} = -\\overrightarrow{AB}$',
  ],
};

export default { meta, problem, solution };
