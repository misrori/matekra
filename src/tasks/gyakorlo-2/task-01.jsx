import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-01',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 1,
  title: 'Halmazok — kedvenc sportágak',
  points: 2,
  topics: ['halmazok'],
  difficulty: 1,
  fgvt: [{ page: 10, note: 'halmazműveletek' }],
  estimatedMinutes: 2,
};

// K = kosárlabdázók, F = focizók
const K = ['Anna', 'Bence', 'Csilla', 'Dávid', 'Emma'];
const F = ['Bence', 'Csilla', 'Gábor', 'Hanna', 'István'];

function VennDiagram({ highlight = 'none' }) {
  const fillK = highlight === 'KminusF' ? '#fde68a' : '#dbeafe';
  const fillF = '#dbeafe';
  const fillI = highlight === 'KcapF' ? '#fca5a5' : '#c7d2fe';
  const onlyK = (x) => K.includes(x) && !F.includes(x);
  const both = (x) => K.includes(x) && F.includes(x);
  const onlyF = (x) => F.includes(x) && !K.includes(x);
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <circle cx="190" cy="160" r="120" fill={fillK} fillOpacity="0.5" stroke="#2563eb" strokeWidth="2" />
      <circle cx="330" cy="160" r="120" fill={fillF} fillOpacity="0.5" stroke="#9333ea" strokeWidth="2" />
      {highlight === 'KcapF' && (
        <g>
          <defs>
            <clipPath id="clipK-g2-01">
              <circle cx="190" cy="160" r="120" />
            </clipPath>
          </defs>
          <circle cx="330" cy="160" r="120" fill={fillI} fillOpacity="0.8" clipPath="url(#clipK-g2-01)" />
        </g>
      )}
      <text x="90" y="60" fontSize="20" fontWeight="bold" fill="#1e3a8a">K (kosár)</text>
      <text x="370" y="60" fontSize="20" fontWeight="bold" fill="#581c87">F (foci)</text>

      {K.filter(onlyK).map((n, i) => (
        <text key={`k${n}`} x={130} y={140 + i * 22} fontSize="14" textAnchor="middle">{n}</text>
      ))}
      {K.filter(both).map((n, i) => (
        <text key={`i${n}`} x={260} y={140 + i * 22} fontSize="14" textAnchor="middle" fontWeight={highlight === 'KcapF' ? 700 : 400}>{n}</text>
      ))}
      {F.filter(onlyF).map((n, i) => (
        <text key={`f${n}`} x={390} y={130 + i * 22} fontSize="14" textAnchor="middle">{n}</text>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy iskolai sportkörben a tanulók két sportág közül választhattak. A kosárlabdázók halmaza
$K = \\{\\text{Anna};\\ \\text{Bence};\\ \\text{Csilla};\\ \\text{Dávid};\\ \\text{Emma}\\}$, a focizóké pedig $F = \\{\\text{Bence};\\ \\text{Csilla};\\ \\text{Gábor};\\ \\text{Hanna};\\ \\text{István}\\}$.

Elemei felsorolásával adja meg a $K \\cap F$ és a $K \\setminus F$ halmazt!`,
  figure: () => <VennDiagram />,
  asked: [
    { key: 'KcapF', label: '$K \\cap F = ?$' },
    { key: 'KminusF', label: '$K \\setminus F = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A metszet ($K \\cap F$) meghatározása',
      points: 1,
      body: `A **metszet** azokat az elemeket tartalmazza, amelyek **mindkét** halmaznak elemei — tehát azok a tanulók, akik kosárlabdáznak **és** fociznak is.

Végignézzük $K$ elemeit, és megjelöljük, amelyek $F$-ben is szerepelnek:

- Anna — $F$-ben **nincs**.
- Bence — $F$-ben benne van.
- Csilla — $F$-ben benne van.
- Dávid — $F$-ben nincs.
- Emma — $F$-ben nincs.

Tehát $K \\cap F = \\{\\text{Bence};\\ \\text{Csilla}\\}$.`,
      figure: () => <VennDiagram highlight="KcapF" />,
    },
    {
      title: '2. lépés — A különbség ($K \\setminus F$) meghatározása',
      points: 1,
      body: `A $K \\setminus F$ halmaz azok nevét tartalmazza, akik $K$-ban benne vannak, de $F$-ben **nincsenek** (azaz kosaraznak, de nem fociznak).

- Anna — kosár, nem foci — **bekerül**.
- Bence — mindkettő — kizárjuk.
- Csilla — mindkettő — kizárjuk.
- Dávid — kosár, nem foci — **bekerül**.
- Emma — kosár, nem foci — **bekerül**.

Tehát $K \\setminus F = \\{\\text{Anna};\\ \\text{Dávid};\\ \\text{Emma}\\}$.`,
      figure: () => <VennDiagram highlight="KminusF" />,
    },
  ],
  finalAnswer: {
    KcapF: '$K \\cap F = \\{\\text{Bence};\\ \\text{Csilla}\\}$',
    KminusF: '$K \\setminus F = \\{\\text{Anna};\\ \\text{Dávid};\\ \\text{Emma}\\}$',
  },
  usedFormulas: ['halmazok metszete', 'halmazok különbsége'],
};

export default { meta, problem, solution };
