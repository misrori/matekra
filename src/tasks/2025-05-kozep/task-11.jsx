import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-11',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 11,
  title: 'Mértani sorozat első hat tagjának összege',
  points: 3,
  topics: ['mértani sorozat'],
  difficulty: 2,
  fgvt: [{ page: 35, note: 'mértani sorozat' }],
  estimatedMinutes: 5,
};

// A sorozat: a_1 = 16, q = 1,5 -> 16, 24, 36, 54, 81, 121,5
const TERMS = [16, 24, 36, 54, 81, 121.5];

function SequenceBars({ highlightFirst = 0, showFormula = false, cumulative = false }) {
  // highlightFirst: hány tagot emeljünk ki vizuálisan (0..6)
  // cumulative: ha true, a magasságokat halmozva is megjelenítjük az összeg illusztrálására
  const yMax = 140;
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes
        x={50} y={30} w={420} h={240}
        xMin={0} xMax={7} yMin={0} yMax={yMax}
        xStep={1} yStep={20}
        xLabel="n" yLabel="a_n"
        grid
      />
      {TERMS.map((val, i) => {
        const n = i + 1;
        const barX = 50 + ((n - 0.3) / 7) * 420;
        const barW = (0.6 / 7) * 420;
        const barTopY = 30 + 240 - (val / yMax) * 240;
        const barH = 30 + 240 - barTopY;
        const isHl = highlightFirst === 0 ? true : n <= highlightFirst;
        const fill = isHl ? '#2563eb' : '#cbd5e1';
        return (
          <g key={`b${n}`}>
            <rect x={barX} y={barTopY} width={barW} height={barH} fill={fill} fillOpacity={isHl ? 0.85 : 0.4} stroke="#1e3a8a" strokeWidth="1" />
            <text x={barX + barW / 2} y={barTopY - 6} fontSize="12" textAnchor="middle" fill="#1e3a8a">
              {Number.isInteger(val) ? val : val.toString().replace('.', ',')}
            </text>
          </g>
        );
      })}
      {cumulative && (
        <g>
          {/* halmozott csík: a teljes összeg vízszintes „fénysávja" a diagramon */}
          <text x={260} y={20} fontSize="14" fontWeight="700" textAnchor="middle" fill="#b45309">
            S₆ = 16 + 24 + 36 + 54 + 81 + 121,5 = 332,5
          </text>
        </g>
      )}
      {showFormula && (
        <g>
          <rect x={260} y={45} width={205} height={55} fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" rx="4" />
          <text x={362} y={65} fontSize="13" textAnchor="middle" fill="#78350f" fontWeight="700">
            Mértani sorozat
          </text>
          <text x={362} y={86} fontSize="12" textAnchor="middle" fill="#78350f">
            aₙ = a₁ · qⁿ⁻¹
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy mértani sorozat második tagja $24$, harmadik tagja $36$.
Határozza meg a sorozat első hat tagjának összegét! Megoldását részletezze!`,
  figure: () => <SequenceBars highlightFirst={0} />,
  asked: [{ key: 'S6', label: '$S_6 = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A hányados ($q$) meghatározása',
      points: 1,
      body: `A mértani sorozat **hányadosa** (kvóciense) bármely két egymás utáni tag hányadosaként kapható meg:

$$q = \\frac{a_{n+1}}{a_n}.$$

A megadott adatok szerint $a_2 = 24$ és $a_3 = 36$, így

$$q = \\frac{a_3}{a_2} = \\frac{36}{24} = \\frac{3}{2} = 1{,}5.$$`,
      figure: () => <SequenceBars highlightFirst={3} showFormula />,
    },
    {
      title: '2. lépés — Az első tag ($a_1$) meghatározása',
      points: 1,
      body: `A mértani sorozat **n-edik tagjának** képlete alapján

$$a_n = a_1 \\cdot q^{n-1}.$$

Az $n = 2$ esetre behelyettesítve:

$$a_2 = a_1 \\cdot q \\;\\Longrightarrow\\; a_1 = \\frac{a_2}{q} = \\frac{24}{1{,}5} = 16.$$

Így az első hat tag: $16,\\; 24,\\; 36,\\; 54,\\; 81,\\; 121{,}5$.`,
      figure: () => <SequenceBars highlightFirst={6} />,
    },
    {
      title: '3. lépés — Az első hat tag összege',
      points: 1,
      body: `A mértani sorozat első $n$ tagjának **összegképlete** ($q \\neq 1$):

$$S_n = a_1 \\cdot \\frac{q^n - 1}{q - 1}.$$

Helyettesítsünk $a_1 = 16$, $q = 1{,}5$, $n = 6$ értékekkel:

$$S_6 = 16 \\cdot \\frac{1{,}5^6 - 1}{1{,}5 - 1}.$$

Számoljuk $1{,}5^6$-t: $1{,}5^2 = 2{,}25$, $1{,}5^3 = 3{,}375$, $1{,}5^6 = 3{,}375^2 = 11{,}390625$.

$$S_6 = 16 \\cdot \\frac{11{,}390625 - 1}{0{,}5} = 16 \\cdot \\frac{10{,}390625}{0{,}5} = 16 \\cdot 20{,}78125 = 332{,}5.$$

**Ellenőrzés** (közvetlen összeadással):
$16 + 24 + 36 + 54 + 81 + 121{,}5 = 332{,}5$. ✓`,
      figure: () => <SequenceBars highlightFirst={6} cumulative />,
    },
  ],
  finalAnswer: { S6: '$S_6 = 332{,}5$' },
  usedFormulas: [
    'mértani sorozat hányadosa: $q = a_{n+1}/a_n$',
    'mértani sorozat n-edik tagja: $a_n = a_1 q^{n-1}$',
    'mértani sorozat összegképlete: $S_n = a_1 \\cdot \\dfrac{q^n - 1}{q - 1}$',
  ],
};

export default { meta, problem, solution };
