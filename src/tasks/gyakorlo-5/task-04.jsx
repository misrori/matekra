import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-04',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 4,
  title: 'Statisztika — medián',
  points: 2,
  topics: ['statisztika'],
  difficulty: 1,
  fgvt: [{ page: 100, note: 'átlag, medián' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 7, tolerance: 0.001 },
};

// Adatsor: 3, 8, 5, 11, 7, 9, 4 (7 elem)
// Rendezve: 3, 4, 5, 7, 8, 9, 11
// Medián (4. elem) = 7
const raw = [3, 8, 5, 11, 7, 9, 4];
const sorted = [...raw].sort((a, b) => a - b);
const median = sorted[Math.floor(sorted.length / 2)];

function SortedStrip({ highlight = false }) {
  const xs = sorted;
  return (
    <SvgCanvas width={480} height={140} viewBox="0 0 480 140">
      <text x="240" y="24" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        Rendezett adatsor (7 elem)
      </text>
      {xs.map((v, i) => {
        const x = 40 + i * 60;
        const isMid = i === 3;
        return (
          <g key={i}>
            <rect x={x} y={50} width={50} height={44}
              fill={highlight && isMid ? '#fde68a' : '#e0e7ff'}
              stroke={highlight && isMid ? '#d97706' : '#1e3a8a'} strokeWidth="1.4" />
            <text x={x + 25} y={80} fontSize="17" textAnchor="middle" fontWeight={isMid ? 700 : 400}>{v}</text>
            <text x={x + 25} y={112} fontSize="11" textAnchor="middle" fill="#64748b">{i + 1}.</text>
          </g>
        );
      })}
      {highlight && (
        <text x={40 + 3 * 60 + 25} y={132} fontSize="12" textAnchor="middle" fill="#b45309" fontWeight="bold">medián</text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy dolgozatsorozat pontszámai: $3$; $8$; $5$; $11$; $7$; $9$; $4$.

Határozza meg az adatsor **mediánját**!`,
  figure: () => <SortedStrip highlight={false} />,
  asked: [{ key: 'med', label: 'medián = ?' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az adatok növekvő rendezése',
      points: 1,
      body: `A medián meghatározásához **rendezzük** az adatokat növekvő sorrendbe:

Eredeti: $3;\\ 8;\\ 5;\\ 11;\\ 7;\\ 9;\\ 4.$

Rendezve: $3;\\ 4;\\ 5;\\ 7;\\ 8;\\ 9;\\ 11.$

Összesen $n = 7$ elem van (páratlan).`,
    },
    {
      title: '2. lépés — A középső elem kiválasztása',
      points: 1,
      body: `Páratlan elemszám esetén a medián a rendezett sor **középső** eleme, tehát a
$\\left(\\dfrac{n+1}{2}\\right)$-edik, azaz a $\\dfrac{7+1}{2} = 4.$ helyen álló érték.

A rendezett sor 4. eleme: $7$.

Tehát $\\boxed{\\text{medián} = 7}$.

(Három elem kisebb, mint 7: a $3$, $4$, $5$; három elem nagyobb: $8$, $9$, $11$ — a $7$ pontosan középen van.)`,
      figure: () => <SortedStrip highlight />,
    },
  ],
  finalAnswer: { med: '$\\text{medián} = 7$' },
  usedFormulas: ['medián páratlan $n$ esetén: $x_{(n+1)/2}$'],
};

export default { meta, problem, solution };
