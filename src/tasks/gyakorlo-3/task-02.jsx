import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-02',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 2,
  title: 'Halmazok elemszáma — logikai szita',
  points: 2,
  topics: ['halmazok'],
  difficulty: 2,
  fgvt: [{ page: 10, note: 'halmazműveletek, szita' }],
  estimatedMinutes: 3,
};

// 30 tanulóból: 18 focizik (F), 14 kosarazik (K), 5 mindkettő. Egyik sem = ?
// |F ∪ K| = 18 + 14 - 5 = 27 → egyik sem = 30 - 27 = 3.
const TOTAL = 30;
const FOCI = 18;
const KOSAR = 14;
const BOTH = 5;

function VennThree({ highlight = 'none' }) {
  // highlight: 'none' | 'both' | 'onlyF' | 'onlyK' | 'none-set' | 'all'
  const fFill = highlight === 'onlyF' || highlight === 'all' ? '#bfdbfe' : '#dbeafe';
  const kFill = highlight === 'onlyK' || highlight === 'all' ? '#fecaca' : '#fee2e2';
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      {/* Univerzum keret */}
      <rect x="20" y="30" width="480" height="270" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
      <text x="470" y="52" fontSize="14" fontWeight="700" textAnchor="end" fill="#334155">U (30)</text>
      {/* F kör */}
      <circle cx="200" cy="165" r="110" fill={fFill} fillOpacity="0.6" stroke="#1e40af" strokeWidth="2" />
      {/* K kör */}
      <circle cx="320" cy="165" r="110" fill={kFill} fillOpacity="0.6" stroke="#b91c1c" strokeWidth="2" />
      {/* Metszet */}
      {(highlight === 'both' || highlight === 'all') && (
        <g>
          <defs>
            <clipPath id="cpF-02">
              <circle cx="200" cy="165" r="110" />
            </clipPath>
          </defs>
          <circle cx="320" cy="165" r="110" fill="#fca5a5" fillOpacity="0.85" clipPath="url(#cpF-02)" />
        </g>
      )}
      {/* Csak-sem tartomány kiemelés */}
      {highlight === 'none-set' && (
        <g>
          <rect x="20" y="30" width="480" height="270" fill="#fde68a" fillOpacity="0.5" />
          <circle cx="200" cy="165" r="110" fill="#f8fafc" />
          <circle cx="320" cy="165" r="110" fill="#f8fafc" />
          <circle cx="200" cy="165" r="110" fill="none" stroke="#1e40af" strokeWidth="2" />
          <circle cx="320" cy="165" r="110" fill="none" stroke="#b91c1c" strokeWidth="2" />
        </g>
      )}
      {/* Feliratok */}
      <text x="120" y="75" fontSize="18" fontWeight="700" fill="#1e40af">F (foci)</text>
      <text x="380" y="75" fontSize="18" fontWeight="700" fill="#b91c1c">K (kosár)</text>
      {/* Számok a régiókban */}
      <text x="150" y="175" fontSize="20" fontWeight="700" textAnchor="middle" fill="#1e40af">13</text>
      <text x="260" y="175" fontSize="20" fontWeight="700" textAnchor="middle" fill="#7f1d1d">5</text>
      <text x="370" y="175" fontSize="20" fontWeight="700" textAnchor="middle" fill="#b91c1c">9</text>
      {/* Egyik sem */}
      <text x="60" y="280" fontSize="18" fontWeight="700" fill="#b45309">
        egyik sem: {highlight === 'none-set' || highlight === 'all' ? '3' : '?'}
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $30$ fős osztályban egy sportfelmérés során $18$ tanuló mondta, hogy szokott focizni, $14$ tanuló mondta, hogy szokott kosarazni; közülük $5$-en **mindkét** sportot űzik.

Hány olyan tanuló van az osztályban, aki egyik sportot sem űzi?
Megoldását részletezze!`,
  figure: () => <VennThree />,
  asked: [{ key: 'none', label: 'Egyik sem: $?$ fő' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A Venn-diagram régióinak elemszáma',
      points: 1,
      body: `Jelölje $F$ a focistákat, $K$ a kosarazókat. Tudjuk:
$|F| = 18$, $|K| = 14$, $|F \\cap K| = 5$.

A $5$ mindkét halmaz elemszámában benne van, ezért:

- **Csak focizik**: $|F| - |F \\cap K| = 18 - 5 = 13$ fő.
- **Csak kosarazik**: $|K| - |F \\cap K| = 14 - 5 = 9$ fő.
- **Mindkettőt**: $5$ fő.`,
      figure: () => <VennThree highlight="both" />,
    },
    {
      title: '2. lépés — A logikai szita alkalmazása',
      points: 1,
      body: `Az uniót a **szita-formulával** kapjuk meg:

$$|F \\cup K| = |F| + |K| - |F \\cap K| = 18 + 14 - 5 = 27.$$

Tehát $27$ tanuló űzi legalább az egyik sportot. Az osztályban $30$-an vannak, így azoknak a száma, akik **egyik sportot sem** űzik:

$$30 - 27 = 3 \\text{ fő.}$$

**Ellenőrzés**: $13 + 5 + 9 + 3 = 30$. ✓`,
      figure: () => <VennThree highlight="all" />,
    },
  ],
  finalAnswer: { none: '$3$ fő' },
  usedFormulas: [
    'szita: $|A \\cup B| = |A| + |B| - |A \\cap B|$',
    'komplementer: $|\\overline{A \\cup B}| = |U| - |A \\cup B|$',
  ],
};

export default { meta, problem, solution };
