import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-01',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 1,
  title: 'Halmazok metszete és különbsége',
  points: 2,
  topics: ['halmazok'],
  difficulty: 1,
  fgvt: [{ page: 10, note: 'halmazműveletek' }],
  estimatedMinutes: 2,
};

const A = [1, 2, 3, 4, 5];
const B = [1, 3, 5, 7, 9];

function VennDiagram({ highlight = 'none' }) {
  // highlight: 'none' | 'intersection' | 'AminusB' | 'AunionB'
  const fillA = highlight === 'AminusB' ? '#fde68a' : highlight === 'intersection' ? '#e5e7eb' : '#dbeafe';
  const fillB = highlight === 'AminusB' ? '#e5e7eb' : '#dbeafe';
  const fillI = highlight === 'intersection' ? '#fca5a5' : highlight === 'AminusB' ? '#e5e7eb' : '#c7d2fe';
  const only = (x) => A.includes(x) && !B.includes(x);
  const both = (x) => A.includes(x) && B.includes(x);
  const onlyB = (x) => B.includes(x) && !A.includes(x);
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      {/* Left circle: A */}
      <circle cx="190" cy="150" r="120" fill={fillA} fillOpacity="0.5" stroke="#2563eb" strokeWidth="2" />
      {/* Right circle: B */}
      <circle cx="330" cy="150" r="120" fill={fillB} fillOpacity="0.5" stroke="#9333ea" strokeWidth="2" />
      {/* Intersection overlay (just colored by overlap; using clip) */}
      {highlight === 'intersection' && (
        <g>
          <defs>
            <clipPath id="clipA-01">
              <circle cx="190" cy="150" r="120" />
            </clipPath>
          </defs>
          <circle cx="330" cy="150" r="120" fill={fillI} fillOpacity="0.8" clipPath="url(#clipA-01)" />
        </g>
      )}
      <text x="100" y="50" fontSize="22" fontWeight="bold" fill="#1e3a8a">A</text>
      <text x="420" y="50" fontSize="22" fontWeight="bold" fill="#581c87">B</text>

      {/* A only: 2, 4 */}
      {A.filter(only).map((n, i) => (
        <text key={`a${n}`} x={130 + i * 25} y={170} fontSize="18" textAnchor="middle">{n}</text>
      ))}
      {/* Both: 1, 3, 5 */}
      {A.filter(both).map((n, i) => (
        <text key={`i${n}`} x={235 + i * 25} y={170} fontSize="18" textAnchor="middle" fontWeight={highlight === 'intersection' ? 700 : 400}>{n}</text>
      ))}
      {/* B only: 7, 9 */}
      {B.filter(onlyB).map((n, i) => (
        <text key={`b${n}`} x={360 + i * 25} y={170} fontSize="18" textAnchor="middle">{n}</text>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adottak a következő halmazok: $A = \\{1;\\ 2;\\ 3;\\ 4;\\ 5\\}$ és $B = \\{1;\\ 3;\\ 5;\\ 7;\\ 9\\}$.
Elemei felsorolásával adja meg az $A \\cap B$ és az $A \\setminus B$ halmazt!`,
  figure: () => <VennDiagram />,
  asked: [
    { key: 'AandB', label: '$A \\cap B = ?$' },
    { key: 'AminusB', label: '$A \\setminus B = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A metszet ($A \\cap B$) meghatározása',
      points: 1,
      body: `A **metszet** azokat az elemeket tartalmazza, amelyek **mindkét** halmazban benne vannak.

- $A$ elemei: $1, 2, 3, 4, 5$
- $B$ elemei: $1, 3, 5, 7, 9$

Közös elemek: $1$, $3$, $5$.

Tehát $A \\cap B = \\{1;\\ 3;\\ 5\\}$.`,
      figure: () => <VennDiagram highlight="intersection" />,
    },
    {
      title: '2. lépés — A különbség ($A \\setminus B$) meghatározása',
      points: 1,
      body: `Az $A \\setminus B$ halmaz azokat az elemeket tartalmazza, amelyek $A$-ban benne vannak, de $B$-ben **nincsenek**.

$A$ elemei közül:
- $1$ — $B$-ben is benne van, tehát **nem** kerül be.
- $2$ — $B$-ben nincs, tehát **bekerül**.
- $3$ — $B$-ben is benne van.
- $4$ — $B$-ben nincs, tehát **bekerül**.
- $5$ — $B$-ben is benne van.

Tehát $A \\setminus B = \\{2;\\ 4\\}$.`,
      figure: () => <VennDiagram highlight="AminusB" />,
    },
  ],
  finalAnswer: {
    AandB: '$A \\cap B = \\{1;\\ 3;\\ 5\\}$',
    AminusB: '$A \\setminus B = \\{2;\\ 4\\}$',
  },
  usedFormulas: ['halmazok metszete', 'halmazok különbsége'],
};

export default { meta, problem, solution };
