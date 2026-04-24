import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-08',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 8,
  title: 'Oszlopdiagram — átlag, medián, módusz',
  points: 4,
  topics: ['statisztika'],
  difficulty: 3,
  fgvt: [{ page: 100, note: 'átlag, medián, módusz' }],
  estimatedMinutes: 6,
};

// Egy matek dolgozat jegyei 25 diáktól:
// 1-es: 2, 2-es: 3, 3-as: 6, 4-es: 9, 5-ös: 5. Összesen 25.
// Összpont: 2·1 + 3·2 + 6·3 + 9·4 + 5·5 = 2+6+18+36+25 = 87
// Átlag: 87/25 = 3,48
// Medián: a 13. elem (rendezve: [1,1, 2,2,2, 3,3,3,3,3,3, 4,4,4,4,4,4,4,4,4, 5,5,5,5,5]), a 13. = 4
// Módusz: 4 (9-en kapták)
const GRADES = [
  { g: 1, n: 2 },
  { g: 2, n: 3 },
  { g: 3, n: 6 },
  { g: 4, n: 9 },
  { g: 5, n: 5 },
];

function GradeChart({ highlight = 'none' }) {
  const nMax = 10;
  return (
    <SvgCanvas width={520} height={330} viewBox="0 0 520 330">
      <text x="260" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Matematika dolgozat jegyeloszlása (25 fő)
      </text>
      <Axes x={60} y={40} w={420} h={240} xMin={0} xMax={6} yMin={0} yMax={nMax} xStep={1} yStep={1} xLabel="jegy" yLabel="fő" grid />
      {GRADES.map((d, i) => {
        const xCenter = 60 + (d.g / 6) * 420;
        const barW = 45;
        const yTop = 40 + 240 - (d.n / nMax) * 240;
        const barH = 40 + 240 - yTop;
        let fill = '#2563eb';
        if (highlight === 'mode' && d.g === 4) fill = '#dc2626';
        if (highlight === 'median' && d.g === 4) fill = '#16a34a';
        return (
          <g key={d.g}>
            <rect x={xCenter - barW / 2} y={yTop} width={barW} height={barH} fill={fill} fillOpacity="0.8" stroke="#1e3a8a" />
            <text x={xCenter} y={yTop - 6} fontSize="13" fontWeight="700" textAnchor="middle" fill="#1e3a8a">{d.n}</text>
          </g>
        );
      })}
      {highlight === 'mode' && (
        <text x="260" y="310" fontSize="14" fontWeight="700" textAnchor="middle" fill="#dc2626">
          Módusz = 4 (leggyakoribb)
        </text>
      )}
      {highlight === 'median' && (
        <text x="260" y="310" fontSize="14" fontWeight="700" textAnchor="middle" fill="#16a34a">
          Medián: a 13. (középső) jegy
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $25$ fős osztályban matematika dolgozatot írtak, a jegyek eloszlását az alábbi oszlopdiagram mutatja.

**a)** Hányan írták meg a dolgozatot legalább jó ($4$-es vagy $5$-ös) jegyre? ($1$ pont)

**b)** Mennyi az osztály átlaga? ($1$ pont)

**c)** Mennyi a jegyek mediánja? ($1$ pont)

**d)** Mennyi a módusz? ($1$ pont)`,
  figure: () => <GradeChart />,
  asked: [
    { key: 'jo', label: 'a) legalább jó: $?$ fő' },
    { key: 'atl', label: 'b) átlag: $?$' },
    { key: 'med', label: 'c) medián: $?$' },
    { key: 'mod', label: 'd) módusz: $?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) Legalább jó jegyek',
      points: 1,
      body: `„Legalább jó" = $4$-es **vagy** $5$-ös.

A diagram alapján: $4$-est $9$-en, $5$-öst $5$-en írtak.

$$9 + 5 = 14 \\text{ fő.}$$`,
      figure: () => <GradeChart />,
    },
    {
      title: 'b) Az osztály átlaga',
      points: 1,
      body: `A **számtani átlag**:

$$\\bar{x} = \\dfrac{\\sum_i g_i \\cdot n_i}{\\sum_i n_i}.$$

Számláló:

$$2 \\cdot 1 + 3 \\cdot 2 + 6 \\cdot 3 + 9 \\cdot 4 + 5 \\cdot 5 = 2 + 6 + 18 + 36 + 25 = 87.$$

Nevező: $25$ (összes diák).

$$\\bar{x} = \\dfrac{87}{25} = 3{,}48.$$`,
      figure: () => <GradeChart />,
    },
    {
      title: 'c) A medián',
      points: 1,
      body: `A **medián** páratlan elemszám esetén a rendezett adatsor **középső** eleme. $25$ elem esetén ez a $13.$ elem (mert $(25+1)/2 = 13$).

Rendezett halmozott elemszám:
- $1$-esek: 1–2. helyek
- $2$-esek: 3–5. helyek
- $3$-asok: 6–11. helyek
- $4$-esek: 12–20. helyek
- $5$-ösök: 21–25. helyek

A $13.$ hely a $4$-esek tartományába esik, így **medián = $4$**.`,
      figure: () => <GradeChart highlight="median" />,
    },
    {
      title: 'd) A módusz',
      points: 1,
      body: `A **módusz** a legtöbbször előforduló adat. A diagramon a legmagasabb oszlop a $4$-eshez tartozik ($9$ diák).

$$\\text{Módusz} = 4.$$`,
      figure: () => <GradeChart highlight="mode" />,
    },
  ],
  finalAnswer: {
    jo: '$14$ fő',
    atl: '$\\bar{x} = 3{,}48$',
    med: 'medián $= 4$',
    mod: 'módusz $= 4$',
  },
  usedFormulas: [
    'átlag: $\\bar{x} = \\sum g_i n_i / \\sum n_i$',
    'medián páratlan elemszámnál: a $(n+1)/2$-edik elem',
    'módusz: leggyakoribb érték',
  ],
};

export default { meta, problem, solution };
