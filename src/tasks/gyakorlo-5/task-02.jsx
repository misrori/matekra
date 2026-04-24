import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-02',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 2,
  title: 'Halmazok — egész számok',
  points: 2,
  topics: ['halmazok'],
  difficulty: 1,
  fgvt: [{ page: 10, note: 'halmazműveletek' }],
  estimatedMinutes: 2,
  check: { type: 'text', value: '{2; 4; 6; 8; 10}' },
};

// P = pozitív páros számok 10-ig = {2,4,6,8,10}
// Q = 1 és 10 közötti egész számok, melyek 3-mal oszthatók = {3,6,9}
// P ∪ Q = {2,3,4,6,8,9,10}
// P \ Q = {2,4,8,10}

function VennDiagram({ highlight = 'none' }) {
  const P = [2, 4, 6, 8, 10];
  const Q = [3, 6, 9];
  const fillP = highlight === 'PminusQ' ? '#fde68a' : '#dbeafe';
  const fillQ = '#dbeafe';
  const fillI = highlight === 'PcupQ' ? '#c7d2fe' : '#c7d2fe';
  const onlyP = (x) => P.includes(x) && !Q.includes(x);
  const both = (x) => P.includes(x) && Q.includes(x);
  const onlyQ = (x) => Q.includes(x) && !P.includes(x);
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <circle cx="190" cy="150" r="120" fill={fillP} fillOpacity="0.5" stroke="#2563eb" strokeWidth="2" />
      <circle cx="330" cy="150" r="120" fill={fillQ} fillOpacity="0.5" stroke="#9333ea" strokeWidth="2" />
      {highlight === 'PcupQ' && (
        <>
          <circle cx="190" cy="150" r="120" fill="#93c5fd" fillOpacity="0.7" />
          <circle cx="330" cy="150" r="120" fill="#93c5fd" fillOpacity="0.7" />
        </>
      )}
      <text x="100" y="50" fontSize="20" fontWeight="bold" fill="#1e3a8a">P (pár. ≤10)</text>
      <text x="400" y="50" fontSize="20" fontWeight="bold" fill="#581c87">Q (3 többsz.)</text>

      {P.filter(onlyP).map((n, i) => (
        <text key={`p${n}`} x={130 + i * 22} y={160} fontSize="18" textAnchor="middle" fontWeight={highlight === 'PminusQ' ? 700 : 400}>{n}</text>
      ))}
      {P.filter(both).map((n, i) => (
        <text key={`i${n}`} x={260} y={160} fontSize="18" textAnchor="middle" fontWeight={700}>{n}</text>
      ))}
      {Q.filter(onlyQ).map((n, i) => (
        <text key={`q${n}`} x={360 + i * 22} y={160} fontSize="18" textAnchor="middle">{n}</text>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Legyen $P$ a 10-nél nem nagyobb **pozitív páros egész számok** halmaza, $Q$ pedig az 1 és 10 közötti egész számok közül a **3-mal oszthatók** halmaza.

Adja meg elemei felsorolásával a $P \\cup Q$ halmazt és a $P \\setminus Q$ halmazt!`,
  figure: () => <VennDiagram />,
  asked: [
    { key: 'PcupQ', label: '$P \\cup Q = ?$' },
    { key: 'PminusQ', label: '$P \\setminus Q = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A halmazok elemeinek felsorolása',
      points: 1,
      body: `- $P$ — pozitív páros, legfeljebb 10: $P = \\{2;\\ 4;\\ 6;\\ 8;\\ 10\\}$.
- $Q$ — 1 és 10 közötti, 3-mal osztható: $Q = \\{3;\\ 6;\\ 9\\}$.

Közös elem csak a $6$ (páros **és** 3-mal osztható).`,
    },
    {
      title: '2. lépés — Unió és különbség',
      points: 1,
      body: `**Unió** ($P \\cup Q$): minden elem, ami legalább az egyikben benne van:

$$P \\cup Q = \\{2;\\ 3;\\ 4;\\ 6;\\ 8;\\ 9;\\ 10\\}.$$

**Különbség** ($P \\setminus Q$): $P$ azon elemei, melyek $Q$-ban nincsenek — kiejtjük a 6-ot:

$$P \\setminus Q = \\{2;\\ 4;\\ 8;\\ 10\\}.$$

**Ellenőrzés** a szita-formulával: $|P \\cup Q| = |P| + |Q| - |P \\cap Q| = 5 + 3 - 1 = 7$ ✓.`,
      figure: () => <VennDiagram highlight="PminusQ" />,
    },
  ],
  finalAnswer: {
    PcupQ: '$P \\cup Q = \\{2;\\ 3;\\ 4;\\ 6;\\ 8;\\ 9;\\ 10\\}$',
    PminusQ: '$P \\setminus Q = \\{2;\\ 4;\\ 8;\\ 10\\}$',
  },
  usedFormulas: ['halmazok uniója', 'halmazok különbsége'],
};

export default { meta, problem, solution };
