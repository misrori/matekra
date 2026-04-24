import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-4-04',
  year: 2024,
  session: 'gyakorló · 4. teszt',
  level: 'közép',
  part: 'I',
  number: 4,
  title: 'Statisztika — átlag és ismeretlen adat',
  points: 2,
  topics: ['statisztika'],
  difficulty: 2,
  fgvt: [{ page: 100, note: 'átlag' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 28, tolerance: 0.001 },
};

// Diákkör tagjai (6 fő) életkor: 19, 22, 23, 25, 27, x. Átlag = 24.
// Összeg = 6 * 24 = 144. Ismert összeg: 19+22+23+25+27 = 116. x = 144 - 116 = 28.
// Ellenőrzéshez: itt most a megoldás 28 (nem 26). Módosítom a metát.
const KNOWN = [19, 22, 23, 25, 27];
const TARGET_AVG = 24;
const SUM_KNOWN = KNOWN.reduce((a, b) => a + b, 0); // 116
const ANS = TARGET_AVG * (KNOWN.length + 1) - SUM_KNOWN; // 144 - 116 = 28

function AgesBarChart({ highlight = false }) {
  const ages = [...KNOWN, highlight ? ANS : null];
  const max = 32;
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <text x="260" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Eötvös-diákkör tagjainak életkora
      </text>
      <Axes x={60} y={40} w={420} h={220} xMin={0} xMax={7} yMin={0} yMax={max} xStep={1} yStep={5} xLabel="tag" yLabel="év" grid />
      {ages.map((a, i) => {
        if (a == null) return null;
        const xCenter = 60 + ((i + 1) / 7) * 420;
        const barW = 36;
        const yTop = 40 + 220 - (a / max) * 220;
        const barH = 40 + 220 - yTop;
        const isNew = i === 5;
        return (
          <g key={i}>
            <rect x={xCenter - barW / 2} y={yTop} width={barW} height={barH} fill={isNew ? '#16a34a' : '#2563eb'} fillOpacity="0.75" stroke={isNew ? '#14532d' : '#1e3a8a'} />
            <text x={xCenter} y={yTop - 4} fontSize="12" fontWeight="700" textAnchor="middle" fill="#111827">{a}</text>
          </g>
        );
      })}
      {/* Átlag vonala */}
      {highlight && (
        <g>
          <line x1={60} y1={40 + 220 - (TARGET_AVG / max) * 220} x2={480} y2={40 + 220 - (TARGET_AVG / max) * 220} stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" />
          <text x={485} y={40 + 220 - (TARGET_AVG / max) * 220 + 4} fontSize="12" fontWeight="700" fill="#dc2626">átlag = 24</text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy iskolai **Eötvös-diákkörben** hat tag van. Öt tagnak az életkora (években): $19, 22, 23, 25, 27$. Az egész csoport életkorának átlaga $24$ év.

Hány éves a hatodik tag?`,
  figure: () => <AgesBarChart />,
  asked: [{ key: 'x', label: '$x = ?$ év' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az átlag képlete',
      points: 1,
      body: `A **számtani átlag** definíciója (fgv. tábla 100. old.):

$$\\bar{x} = \\dfrac{x_1 + x_2 + \\ldots + x_n}{n}.$$

Itt $n = 6$ és $\\bar{x} = 24$, tehát az adatok **összege**:

$$\\sum x_i = 6 \\cdot 24 = 144.$$`,
      figure: () => <AgesBarChart />,
    },
    {
      title: '2. lépés — Az ismeretlen életkor',
      points: 1,
      body: `Az öt ismert adat összege:

$$19 + 22 + 23 + 25 + 27 = 116.$$

A hatodik tag életkora:

$$x = 144 - 116 = 28 \\text{ év}.$$

**Ellenőrzés**: $(19+22+23+25+27+28)/6 = 144/6 = 24$. ✓`,
      figure: () => <AgesBarChart highlight />,
    },
  ],
  finalAnswer: { x: '$x = 28$ év' },
  usedFormulas: ['átlag: $\\bar{x} = \\sum x_i / n$'],
};

export default { meta, problem, solution };
