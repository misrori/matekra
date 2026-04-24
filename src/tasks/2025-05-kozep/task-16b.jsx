import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-16b',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.B',
  number: 16,
  sub: '.b',
  title: 'Számtani sorozat — első tag és $S_{12}$ meghatározása',
  points: 6,
  topics: ['számtani sorozat', 'egyenletek'],
  difficulty: 3,
  fgvt: [
    { page: 34, note: 'számtani sorozat' },
    { page: 27, note: 'lineáris egyenlet' },
  ],
  estimatedMinutes: 12,
};

// Az inventory alapján: a_6 = 630, a_1 = 990 — de ezek ellentmondásosak
// a "számtani sorozat" szöveggel (nem azonos a1-ünk és a_6). A hivatalos
// megoldás logikája: d = (a_6 - a_1) / 5 = (630 - 990) / 5 = -72 — ez ellentmond,
// mert akkor a_1 nem lehet 990. Az útmutató ténylegesen:
// a_1 = 990, a_6 = 630 (csökkenő sorozat), d = -72.
// Ekkor a_12 = a_1 + 11d = 990 - 792 = 198.
// S_12 = 12 (a_1 + a_12) / 2 = 6 * (990 + 198) = 6 * 1188 = 7128.
const a1 = 990;
const a6 = 630;
const d = -72;
const a12 = a1 + 11 * d; // 198
const S12 = (12 * (a1 + a12)) / 2; // 7128

function SeqPlot({ highlight = 'none' }) {
  // highlight: 'none' | 'given' | 'd' | 'all' | 'sum'
  const n = 12;
  const values = [];
  for (let i = 1; i <= n; i++) values.push(a1 + (i - 1) * d);

  const maxVal = a1;
  const barW = 28;
  const gap = 8;
  const baseY = 300;
  const chartH = 250;
  const startX = 36;

  return (
    <SvgCanvas width={520} height={360} viewBox="0 0 520 360">
      <line x1="20" y1={baseY} x2="500" y2={baseY} stroke="#1a1a1a" strokeWidth="1.5" />

      {values.map((v, i) => {
        const x = startX + i * (barW + gap);
        const h = (v / maxVal) * chartH;
        const isGiven = i === 0 || i === 5;
        let fill = '#93c5fd';
        if (highlight === 'given' && isGiven) fill = '#dc2626';
        else if (highlight === 'd' && i < 6) fill = '#fde68a';
        else if (highlight === 'all') fill = '#2563eb';
        else if (highlight === 'sum') fill = '#bbf7d0';
        return (
          <g key={i}>
            <rect
              x={x}
              y={baseY - h}
              width={barW}
              height={h}
              fill={fill}
              stroke="#1e3a8a"
              strokeWidth="1"
            />
            <text
              x={x + barW / 2}
              y={baseY - h - 4}
              fontSize="10"
              textAnchor="middle"
              fontWeight={isGiven ? 'bold' : 'normal'}
              fill={isGiven && highlight === 'given' ? '#dc2626' : '#111'}
            >
              {v}
            </text>
            <text x={x + barW / 2} y={baseY + 16} fontSize="10" textAnchor="middle" fill="#444">
              a{i + 1}
            </text>
          </g>
        );
      })}

      {highlight === 'd' && (
        <text x="260" y="30" fontSize="14" fill="#7c3aed" fontWeight="bold" textAnchor="middle">
          d = (a₆ − a₁) / 5 = (630 − 990) / 5 = −72
        </text>
      )}
      {highlight === 'sum' && (
        <text x="260" y="30" fontSize="14" fill="#059669" fontWeight="bold" textAnchor="middle">
          S₁₂ = 12·(a₁ + a₁₂) / 2 = 6·1188 = 7128
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy számtani sorozat első tagja $a_1 = 990$, hatodik tagja $a_6 = 630$.

**a)** Határozza meg a sorozat differenciáját ($d$)!

**b)** Számítsa ki a sorozat első tizenkét tagjának összegét, $S_{12}$-t!`,
  figure: () => <SeqPlot highlight="given" />,
  asked: [
    { key: 'd', label: '$d = ?$' },
    { key: 'S12', label: '$S_{12} = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — a differencia ($d$) kiszámítása',
      points: 1,
      body: `Számtani sorozatban az $n$-edik tag:
$$a_n = a_1 + (n-1) \\cdot d$$

Az $n = 6$-os tagra:
$$a_6 = a_1 + 5d$$

Behelyettesítve $a_1 = 990$ és $a_6 = 630$:
$$630 = 990 + 5d$$`,
      figure: () => <SeqPlot highlight="given" />,
    },
    {
      title: '2. lépés — a $d$ értékének meghatározása',
      points: 1,
      body: `Rendezve:
$$5d = 630 - 990 = -360$$
$$d = \\dfrac{-360}{5} = -72$$

Tehát a sorozat **csökkenő**, mert $d < 0$. Az első néhány tagja: $990,\\ 918,\\ 846,\\ 774,\\ 702,\\ 630,\\ \\dots$

**Ellenőrzés:** $a_6 = 990 + 5 \\cdot (-72) = 990 - 360 = 630$ ✓`,
      figure: () => <SeqPlot highlight="d" />,
    },
    {
      title: '3. lépés — a 12. tag ($a_{12}$) kiszámítása',
      points: 1,
      body: `Az összegképlethez szükségünk van $a_{12}$-re:
$$a_{12} = a_1 + 11 d = 990 + 11 \\cdot (-72)$$

Számolás:
$$11 \\cdot (-72) = -792$$
$$a_{12} = 990 - 792 = 198$$`,
      figure: () => <SeqPlot highlight="all" />,
    },
    {
      title: '4. lépés — $S_{12}$ képlete és behelyettesítés',
      points: 2,
      body: `Az első $n$ tag összege számtani sorozatban:
$$S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2}$$

$n = 12$ esetén:
$$S_{12} = \\dfrac{(a_1 + a_{12}) \\cdot 12}{2} = \\dfrac{(990 + 198) \\cdot 12}{2}$$

Számolás:
$$990 + 198 = 1188$$
$$S_{12} = \\dfrac{1188 \\cdot 12}{2} = \\dfrac{14256}{2} = 7128$$`,
      figure: () => <SeqPlot highlight="sum" />,
    },
    {
      title: '5. lépés — ellenőrzés másik képlettel',
      points: 1,
      body: `Alternatív összegképlet: $S_n = \\dfrac{(2a_1 + (n-1)d) \\cdot n}{2}$.

$n = 12$, $a_1 = 990$, $d = -72$:
$$S_{12} = \\dfrac{(2 \\cdot 990 + 11 \\cdot (-72)) \\cdot 12}{2}$$
$$= \\dfrac{(1980 - 792) \\cdot 12}{2} = \\dfrac{1188 \\cdot 12}{2} = 7128 \\;\\checkmark$$

**Végeredmény:**
$$\\boxed{d = -72, \\quad S_{12} = 7128}$$`,
      figure: () => <SeqPlot highlight="sum" />,
    },
  ],
  finalAnswer: {
    d: '$d = -72$',
    S12: '$S_{12} = 7128$',
  },
  usedFormulas: [
    'számtani sorozat $n$-edik tagja: $a_n = a_1 + (n-1) d$',
    'első $n$ tag összege: $S_n = \\dfrac{(a_1 + a_n) n}{2}$',
    'alternatív összegképlet: $S_n = \\dfrac{(2a_1 + (n-1)d) n}{2}$',
  ],
};

export default { meta, problem, solution };
