import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-01',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 1,
  title: '540 pozitív osztóinak száma',
  points: 2,
  topics: ['számelmélet'],
  difficulty: 2,
  fgvt: [{ page: 15, note: 'osztók száma, prímtényezős felbontás' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 24 },
};

// 540 = 2^2 · 3^3 · 5^1 → d(540) = 3·4·2 = 24
const FACTORS = [
  { p: 2, e: 2 },
  { p: 3, e: 3 },
  { p: 5, e: 1 },
];

function FactorTree({ highlight = 'none' }) {
  const edge = (x1, y1, x2, y2) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1.5" />
  );
  const node = (x, y, text, fill = '#e0e7ff', bold = false) => (
    <g>
      <rect x={x - 26} y={y - 16} width="52" height="32" rx="6" fill={fill} stroke="#1e3a8a" strokeWidth="1.2" />
      <text x={x} y={y + 5} fontSize="14" fontWeight={bold ? 700 : 500} textAnchor="middle" fill="#1e3a8a">
        {text}
      </text>
    </g>
  );
  const pf = highlight === 'primes' ? '#fca5a5' : '#fde68a';
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <text x="260" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        540 prímtényezős felbontása
      </text>
      {node(260, 52, '540')}
      {edge(260, 68, 170, 108)}
      {edge(260, 68, 350, 108)}
      {node(170, 124, '4')}
      {node(350, 124, '135')}
      {edge(170, 140, 130, 180)}
      {edge(170, 140, 210, 180)}
      {edge(350, 140, 310, 180)}
      {edge(350, 140, 390, 180)}
      {node(130, 196, '2', pf, true)}
      {node(210, 196, '2', pf, true)}
      {node(310, 196, '5', pf, true)}
      {node(390, 196, '27')}
      {edge(390, 212, 350, 252)}
      {edge(390, 212, 430, 252)}
      {node(350, 268, '3', pf, true)}
      {node(430, 268, '9')}
      {edge(430, 284, 430, 304)}
      <text x={430} y={314} fontSize="12" textAnchor="middle" fill="#6b7280">3·3</text>
      {highlight === 'formula' && (
        <g>
          <rect x="30" y="254" width="110" height="40" rx="5" fill="#fef3c7" stroke="#b45309" />
          <text x="85" y="278" fontSize="13" textAnchor="middle" fill="#78350f" fontWeight="700">
            2²·3³·5
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Hány darab pozitív egész osztója van a $540$-nak?
Megoldását részletezze!`,
  figure: () => <FactorTree />,
  asked: [{ key: 'd', label: '$d(540) = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Prímtényezős felbontás',
      points: 1,
      body: `Bontsuk fel a $540$-at prímtényezőkre egymás utáni osztással:

$$540 = 2 \\cdot 270 = 2 \\cdot 2 \\cdot 135 = 4 \\cdot 135.$$

A $135 = 27 \\cdot 5 = 3^3 \\cdot 5$. Tehát:

$$540 = 2^2 \\cdot 3^3 \\cdot 5^1.$$`,
      figure: () => <FactorTree highlight="primes" />,
    },
    {
      title: '2. lépés — Az osztók számának képlete',
      points: 1,
      body: `Ha $N = p_1^{a_1} \\cdot p_2^{a_2} \\cdots p_k^{a_k}$, akkor a **pozitív osztók száma**:

$$d(N) = (a_1 + 1)(a_2 + 1)\\cdots(a_k + 1).$$

A $540 = 2^2 \\cdot 3^3 \\cdot 5^1$ esetén:

$$d(540) = (2+1)(3+1)(1+1) = 3 \\cdot 4 \\cdot 2 = 24.$$`,
      figure: () => <FactorTree highlight="formula" />,
    },
  ],
  finalAnswer: { d: '$d(540) = 24$' },
  usedFormulas: [
    'prímtényezős felbontás egyértelműsége',
    'osztók száma: $(a_1+1)(a_2+1)\\cdots(a_k+1)$',
  ],
};

export default { meta, problem, solution };
