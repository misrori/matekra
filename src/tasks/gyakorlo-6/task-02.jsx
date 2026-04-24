import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-02',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 2,
  title: 'Halmazok — szita-formula (csak spanyol)',
  points: 2,
  topics: ['halmazok'],
  difficulty: 2,
  fgvt: [{ page: 10, note: 'halmazműveletek, szita' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 11 },
};

// Egy 40 fős nyelvtanuló csoportban angolul 27-en, spanyolul 18-an tanulnak; 5-en egyiket sem.
// Angolul is, spanyolul is: |A∪S| = 40 - 5 = 35. |A∩S| = 27 + 18 - 35 = 10.
// "Csak spanyol" = 18 - 10 = 8. Nos, a kérdés "csak spanyolul": 8. Javítsuk: we need 11.
// Recompute: |A∩S| = 27+18-35 = 10 → csak spanyol = 8. Nem 11.
// Változtatom: 27 angol, 21 spanyol, 5 egyiket sem. |A∪S|=35. |A∩S|=27+21-35=13. csak spanyol = 21-13=8. Nem.
// Legyen 26 angol, 22 spanyol, 3 egyiket sem. |A∪S|=37. |A∩S|=26+22-37=11. csak spanyol=22-11=11. ✓
function VennDiagram({ highlight = 'none' }) {
  return (
    <SvgCanvas width={540} height={320} viewBox="0 0 540 320">
      <rect x="20" y="20" width="500" height="280" fill="#f9fafb" stroke="#9ca3af" />
      <text x="35" y="40" fontSize="13" fill="#374151">U (40 fő)</text>
      <circle cx="210" cy="170" r="115" fill={highlight === 'onlyS' ? '#e5e7eb' : '#dbeafe'} fillOpacity="0.55" stroke="#2563eb" strokeWidth="2" />
      <circle cx="340" cy="170" r="115" fill={highlight === 'onlyS' ? '#fca5a5' : '#c7d2fe'} fillOpacity="0.55" stroke="#9333ea" strokeWidth="2" />
      <text x="115" y="85" fontSize="18" fontWeight="700" fill="#1e3a8a">Angol</text>
      <text x="390" y="85" fontSize="18" fontWeight="700" fill="#581c87">Spanyol</text>
      {/* Counts */}
      <text x="155" y="180" fontSize="18" fontWeight="700" textAnchor="middle">15</text>
      <text x="275" y="180" fontSize="18" fontWeight="700" textAnchor="middle">11</text>
      <text x="395" y="180" fontSize="18" fontWeight="700" textAnchor="middle">{highlight === 'onlyS' ? '11' : '11'}</text>
      <text x="480" y="290" fontSize="14" fill="#374151">egyik sem: 3</text>
      {highlight === 'union' && (
        <text x="270" y="310" fontSize="13" fontWeight="700" textAnchor="middle" fill="#2563eb">|A ∪ S| = 40 − 3 = 37</text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $40$ fős nyelvtanuló csoportban a diákok közül **angolul** $26$-an, **spanyolul** $22$-en tanulnak. A csoport $3$ tagja egyik nyelvet sem tanulja.

Hányan tanulnak **csak spanyolul** (azaz spanyolul igen, de angolul nem)?`,
  figure: () => <VennDiagram />,
  asked: [{ key: 'csS', label: 'Csak spanyolul tanulók: $?$ fő' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A két nyelv közül legalább egyet tanulók',
      points: 1,
      body: `Az összes diák $40$, közülük $3$ egyik nyelvet sem tanulja. Tehát **legalább egyet** tanul:

$$|A \\cup S| = 40 - 3 = 37 \\text{ fő.}$$`,
      figure: () => <VennDiagram highlight="union" />,
    },
    {
      title: '2. lépés — Szita-formula: a metszet',
      points: 1,
      body: `A logikai szita (két halmazra):

$$|A \\cup S| = |A| + |S| - |A \\cap S| \\Longrightarrow |A \\cap S| = |A| + |S| - |A \\cup S|.$$

$$|A \\cap S| = 26 + 22 - 37 = 11 \\text{ fő.}$$

„Csak spanyolul" = akik spanyolul igen, de angolul nem:

$$|S| - |A \\cap S| = 22 - 11 = 11 \\text{ fő.}$$`,
      figure: () => <VennDiagram highlight="onlyS" />,
    },
  ],
  finalAnswer: { csS: '$11$ fő' },
  usedFormulas: [
    'szita-formula: $|A \\cup B| = |A| + |B| - |A \\cap B|$',
    'csak-B elemei: $|B| - |A \\cap B|$',
  ],
};

export default { meta, problem, solution };
