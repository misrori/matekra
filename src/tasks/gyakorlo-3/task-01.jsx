import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-01',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 1,
  title: 'Osztók száma — prímtényezős felbontás',
  points: 2,
  topics: ['számelmélet'],
  difficulty: 2,
  fgvt: [{ page: 15, note: 'prímtényezős felbontás, osztók száma' }],
  estimatedMinutes: 3,
};

// N = 360 = 2^3 · 3^2 · 5
// osztók száma: (3+1)(2+1)(1+1) = 24
const N = 360;
const FACTORS = [
  { p: 2, e: 3 },
  { p: 3, e: 2 },
  { p: 5, e: 1 },
];

function FactorTree({ highlight = 'none' }) {
  // A 360 prímfaktorizációjának fa-ábrája.
  // highlight: 'none' | 'primes' | 'exponents'
  const edge = (x1, y1, x2, y2) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1.5" />
  );
  const node = (x, y, text, fill = '#e0e7ff', bold = false) => (
    <g>
      <rect x={x - 24} y={y - 16} width="48" height="32" rx="6" fill={fill} stroke="#1e3a8a" strokeWidth="1.2" />
      <text x={x} y={y + 5} fontSize="14" fontWeight={bold ? 700 : 500} textAnchor="middle" fill="#1e3a8a">
        {text}
      </text>
    </g>
  );
  const primeFill = highlight === 'primes' ? '#fca5a5' : '#fde68a';
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <text x="260" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        360 prímtényezős felbontása
      </text>
      {/* gyökér 360 */}
      {node(260, 52, '360')}
      {edge(260, 68, 180, 108)}
      {edge(260, 68, 340, 108)}
      {/* 360 = 8 · 45 */}
      {node(180, 124, '8')}
      {node(340, 124, '45')}
      {edge(180, 140, 140, 180)}
      {edge(180, 140, 220, 180)}
      {edge(340, 140, 300, 180)}
      {edge(340, 140, 380, 180)}
      {/* 8 = 2 · 4, 45 = 5 · 9 */}
      {node(140, 196, '2', primeFill, true)}
      {node(220, 196, '4')}
      {node(300, 196, '5', primeFill, true)}
      {node(380, 196, '9')}
      {edge(220, 212, 190, 252)}
      {edge(220, 212, 250, 252)}
      {edge(380, 212, 350, 252)}
      {edge(380, 212, 410, 252)}
      {/* 4 = 2·2, 9 = 3·3 */}
      {node(190, 268, '2', primeFill, true)}
      {node(250, 268, '2', primeFill, true)}
      {node(350, 268, '3', primeFill, true)}
      {node(410, 268, '3', primeFill, true)}
      {highlight === 'exponents' && (
        <g>
          <rect x="40" y="254" width="80" height="34" rx="5" fill="#fef3c7" stroke="#b45309" />
          <text x="80" y="276" fontSize="13" textAnchor="middle" fill="#78350f" fontWeight="700">
            2³·3²·5
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Hány darab pozitív egész osztója van a $360$-nak?
Megoldását részletezze!`,
  figure: () => <FactorTree />,
  asked: [{ key: 'd', label: 'Osztók száma $d(360) = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A 360 prímtényezős felbontása',
      points: 1,
      body: `Bontsuk fel a $360$-at prímtényezőkre egymás utáni osztással:

$$360 = 2 \\cdot 180 = 2 \\cdot 2 \\cdot 90 = 2 \\cdot 2 \\cdot 2 \\cdot 45 = 2^3 \\cdot 45.$$

A $45 = 9 \\cdot 5 = 3^2 \\cdot 5$. Tehát:

$$360 = 2^3 \\cdot 3^2 \\cdot 5^1.$$`,
      figure: () => <FactorTree highlight="primes" />,
    },
    {
      title: '2. lépés — Az osztók számának képlete',
      points: 1,
      body: `Ha $N = p_1^{a_1} \\cdot p_2^{a_2} \\cdots p_k^{a_k}$ a prímtényezős felbontás, akkor a **pozitív osztók száma**:

$$d(N) = (a_1 + 1)(a_2 + 1)\\cdots(a_k + 1).$$

(Mert minden $p_i$-nél $0, 1, \\dots, a_i$ kitevőt választhatunk, ez $a_i + 1$ lehetőség, és a választások függetlenek.)

A $360 = 2^3 \\cdot 3^2 \\cdot 5^1$ esetén:

$$d(360) = (3+1)(2+1)(1+1) = 4 \\cdot 3 \\cdot 2 = 24.$$

**Ellenőrzés**: pl. $1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360$ — valóban $24$ osztó.`,
      figure: () => <FactorTree highlight="exponents" />,
    },
  ],
  finalAnswer: { d: '$d(360) = 24$' },
  usedFormulas: [
    'prímtényezős felbontás egyértelműsége',
    'osztók száma: $(a_1+1)(a_2+1)\\cdots(a_k+1)$',
  ],
};

export default { meta, problem, solution };
