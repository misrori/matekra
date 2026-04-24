import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-01',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 1,
  title: 'Halmazok uniója és különbsége',
  points: 2,
  topics: ['halmazok'],
  difficulty: 1,
  fgvt: [{ page: 10, note: 'halmazműveletek' }],
  estimatedMinutes: 2,
};

const P = [2, 4, 6, 8, 10, 12];
const Q = [3, 6, 9, 12];

function VennDiagram({ highlight = 'none' }) {
  const fillP = highlight === 'union' ? '#bbf7d0' : '#dbeafe';
  const fillQ = highlight === 'union' ? '#bbf7d0' : '#fde68a';
  const only = (x) => P.includes(x) && !Q.includes(x);
  const both = (x) => P.includes(x) && Q.includes(x);
  const onlyQ = (x) => Q.includes(x) && !P.includes(x);
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <circle cx="190" cy="150" r="120" fill={fillP} fillOpacity="0.5" stroke="#2563eb" strokeWidth="2" />
      <circle cx="330" cy="150" r="120" fill={fillQ} fillOpacity="0.5" stroke="#d97706" strokeWidth="2" />
      {highlight === 'PminusQ' && (
        <g>
          <defs>
            <clipPath id="clipQ-gy1-01">
              <circle cx="330" cy="150" r="120" />
            </clipPath>
            <mask id="mask-PnotQ-gy1-01">
              <rect x="0" y="0" width="520" height="300" fill="white" />
              <circle cx="330" cy="150" r="120" fill="black" />
            </mask>
          </defs>
          <circle cx="190" cy="150" r="120" fill="#fca5a5" fillOpacity="0.7" mask="url(#mask-PnotQ-gy1-01)" />
        </g>
      )}
      <text x="90" y="50" fontSize="22" fontWeight="bold" fill="#1e3a8a">P</text>
      <text x="420" y="50" fontSize="22" fontWeight="bold" fill="#92400e">Q</text>
      {P.filter(only).map((n, i) => (
        <text key={`p${n}`} x={120 + (i % 3) * 28} y={130 + Math.floor(i / 3) * 26} fontSize="16" textAnchor="middle">{n}</text>
      ))}
      {P.filter(both).map((n, i) => (
        <text key={`i${n}`} x={245 + i * 28} y={160} fontSize="16" textAnchor="middle" fontWeight="bold">{n}</text>
      ))}
      {Q.filter(onlyQ).map((n, i) => (
        <text key={`q${n}`} x={365 + (i % 2) * 28} y={130 + Math.floor(i / 2) * 26} fontSize="16" textAnchor="middle">{n}</text>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adottak a következő halmazok: $P = \\{2;\\ 4;\\ 6;\\ 8;\\ 10;\\ 12\\}$ (a $12$-nél nem nagyobb pozitív páros számok), illetve $Q = \\{3;\\ 6;\\ 9;\\ 12\\}$ (a $12$-nél nem nagyobb háromnak pozitív többszörösei).

Elemei felsorolásával adja meg az $P \\cup Q$ és az $P \\setminus Q$ halmazt!`,
  figure: () => <VennDiagram />,
  asked: [
    { key: 'union', label: '$P \\cup Q = ?$' },
    { key: 'PminusQ', label: '$P \\setminus Q = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az unió ($P \\cup Q$) meghatározása',
      points: 1,
      body: `Az **unió** azon elemeket tartalmazza, amelyek legalább az egyik halmazban benne vannak (ismétlés nélkül).

- $P$ elemei: $2, 4, 6, 8, 10, 12$
- $Q$ elemei: $3, 6, 9, 12$

Összegyűjtjük mindkettőből, a közöseket csak egyszer: $2, 3, 4, 6, 8, 9, 10, 12$.

Tehát $P \\cup Q = \\{2;\\ 3;\\ 4;\\ 6;\\ 8;\\ 9;\\ 10;\\ 12\\}$ — összesen $8$ elem.`,
      figure: () => <VennDiagram highlight="union" />,
    },
    {
      title: '2. lépés — A különbség ($P \\setminus Q$) meghatározása',
      points: 1,
      body: `A $P \\setminus Q$ azon elemeket tartalmazza, amelyek $P$-ben benne vannak, de $Q$-ban **nincsenek**.

Végigmegyünk $P$ elemein:
- $2$ — $Q$-ban nincs, bekerül.
- $4$ — $Q$-ban nincs, bekerül.
- $6$ — $Q$-ban is benne van, **nem** kerül be.
- $8$ — $Q$-ban nincs, bekerül.
- $10$ — $Q$-ban nincs, bekerül.
- $12$ — $Q$-ban is benne van, **nem** kerül be.

Tehát $P \\setminus Q = \\{2;\\ 4;\\ 8;\\ 10\\}$.`,
      figure: () => <VennDiagram highlight="PminusQ" />,
    },
  ],
  finalAnswer: {
    union: '$P \\cup Q = \\{2;\\ 3;\\ 4;\\ 6;\\ 8;\\ 9;\\ 10;\\ 12\\}$',
    PminusQ: '$P \\setminus Q = \\{2;\\ 4;\\ 8;\\ 10\\}$',
  },
  usedFormulas: ['halmazok uniója', 'halmazok különbsége'],
};

export default { meta, problem, solution };
