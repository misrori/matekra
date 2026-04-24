import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-16a',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.B',
  number: 16,
  sub: '.a',
  title: 'Mértani sorozat — első tag és hányados meghatározása',
  points: 3,
  topics: ['mértani sorozat'],
  difficulty: 2,
  fgvt: [{ page: 35, note: 'mértani sorozat' }],
  estimatedMinutes: 6,
};

// A sorozat: a1 = 3, q = 3 → 3, 9, 27, 81, 243, 729
const terms = [3, 9, 27, 81, 243, 729];

function BarChart({ highlight = 'none' }) {
  // highlight: 'none' | 'given' | 'ratio' | 'all'
  const maxVal = 729;
  const barW = 54;
  const gap = 18;
  const baseY = 300;
  const chartH = 250;

  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* Alapvonal */}
      <line x1="30" y1={baseY} x2="490" y2={baseY} stroke="#1a1a1a" strokeWidth="1.5" />

      {terms.map((v, i) => {
        const x = 40 + i * (barW + gap);
        const h = (v / maxVal) * chartH;
        const isGiven = i === 2 || i === 5; // a3, a6
        const fill =
          highlight === 'all'
            ? '#2563eb'
            : (highlight === 'given' || highlight === 'ratio') && isGiven
              ? '#dc2626'
              : '#93c5fd';
        return (
          <g key={i}>
            <rect x={x} y={baseY - h} width={barW} height={h} fill={fill} stroke="#1e3a8a" strokeWidth="1" />
            <text
              x={x + barW / 2}
              y={baseY - h - 6}
              fontSize="13"
              textAnchor="middle"
              fontWeight={isGiven ? 'bold' : 'normal'}
              fill={isGiven && (highlight === 'given' || highlight === 'ratio') ? '#dc2626' : '#111'}
            >
              {v}
            </text>
            <text x={x + barW / 2} y={baseY + 18} fontSize="12" textAnchor="middle" fill="#444">
              a<tspan fontSize="10" dy="3">{i + 1}</tspan>
            </text>
          </g>
        );
      })}

      {/* Hányadost jelző felirat */}
      {highlight === 'ratio' && (
        <g>
          <text x="260" y="30" fontSize="14" fill="#7c3aed" fontWeight="bold" textAnchor="middle">
            a₆ / a₃ = 729 / 27 = 27 = q³
          </text>
          <text x="260" y="50" fontSize="14" fill="#7c3aed" fontWeight="bold" textAnchor="middle">
            ⇒ q = 3
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy mértani sorozat **harmadik tagja** $a_3 = 27$, **hatodik tagja** $a_6 = 729$.

Határozza meg a sorozat **első tagját** ($a_1$) és **hányadosát** ($q$)!`,
  figure: () => <BarChart highlight="given" />,
  asked: [
    { key: 'q', label: '$q = ?$' },
    { key: 'a1', label: '$a_1 = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — a mértani sorozat általános képlete',
      points: 1,
      body: `Mértani sorozat $n$-edik tagjának képlete:
$$a_n = a_1 \\cdot q^{n-1}$$

Ebből a két ismert tag:
$$a_3 = a_1 \\cdot q^{2} = 27$$
$$a_6 = a_1 \\cdot q^{5} = 729$$

Két egyenletünk van két ismeretlennel ($a_1$ és $q$).`,
      figure: () => <BarChart highlight="given" />,
    },
    {
      title: '2. lépés — a hányados ($q$) meghatározása',
      points: 1,
      body: `A két egyenletet egymással elosztva $a_1$ kiesik:
$$\\dfrac{a_6}{a_3} = \\dfrac{a_1 \\cdot q^5}{a_1 \\cdot q^2} = q^{5-2} = q^3$$

Behelyettesítve:
$$q^3 = \\dfrac{729}{27} = 27$$

Ebből:
$$q = \\sqrt[3]{27} = 3$$`,
      figure: () => <BarChart highlight="ratio" />,
    },
    {
      title: '3. lépés — az első tag ($a_1$) kiszámítása és ellenőrzés',
      points: 1,
      body: `Az $a_3 = a_1 \\cdot q^2$ egyenletbe behelyettesítve $q = 3$:
$$27 = a_1 \\cdot 3^2 = 9 a_1$$
$$a_1 = \\dfrac{27}{9} = 3$$

**Ellenőrzés:** a sorozat első hat tagja $3,\\ 9,\\ 27,\\ 81,\\ 243,\\ 729$.
- $a_3 = 27$ ✓
- $a_6 = 729$ ✓

Tehát $\\boxed{a_1 = 3,\\quad q = 3}$.`,
      figure: () => <BarChart highlight="all" />,
    },
  ],
  finalAnswer: {
    q: '$q = 3$',
    a1: '$a_1 = 3$',
  },
  usedFormulas: [
    'mértani sorozat általános tagja: $a_n = a_1 \\cdot q^{n-1}$',
    'hatványhányados: $\\dfrac{q^m}{q^k} = q^{m-k}$',
  ],
};

export default { meta, problem, solution };
