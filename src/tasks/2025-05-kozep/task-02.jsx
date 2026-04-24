import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-02',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 2,
  title: 'Legkisebb közös többszörös (LKKT)',
  points: 2,
  topics: ['számelmélet'],
  difficulty: 1,
  fgvt: [{ page: 15, note: 'LKKT' }],
  estimatedMinutes: 2,
};

// Megjegyzés: az eredeti inventory.md fejlécében tévesen "legnagyobb közös többszörös"
// szerepelt, a feladat valójában a legkisebb közös többszöröst (LKKT) kérdezi,
// a hivatalos végeredmény pedig 60 = LKKT(12, 20).

function FactorChart({ highlight = 'none' }) {
  // Vizualizáció: a 12 és a 20 prímtényezős bontása hasáb-halmokként,
  // valamint az LKKT felépítése.
  // Kulcs: minden prím színe állandó (2 = kék, 3 = zöld, 5 = narancs).
  const colors = { 2: '#2563eb', 3: '#16a34a', 5: '#f59e0b' };
  const cell = (x, y, color, label, strong) => (
    <g key={`${x}-${y}-${label}`}>
      <rect
        x={x}
        y={y}
        width={48}
        height={40}
        rx={6}
        fill={color}
        fillOpacity={strong ? 0.9 : 0.35}
        stroke={color}
        strokeWidth={strong ? 3 : 1.5}
      />
      <text
        x={x + 24}
        y={y + 26}
        fontSize="18"
        fontWeight="bold"
        textAnchor="middle"
        fill={strong ? '#ffffff' : '#111827'}
      >
        {label}
      </text>
    </g>
  );

  const strong12 = highlight === 'factor12' || highlight === 'lkkt';
  const strong20 = highlight === 'factor20' || highlight === 'lkkt';
  const strongLkkt = highlight === 'lkkt';

  return (
    <SvgCanvas width={520} height={260} viewBox="0 0 520 260">
      {/* 12 = 2^2 · 3 */}
      <text x={20} y={36} fontSize="18" fontWeight="bold" fill="#1f2937">12 =</text>
      {cell(80, 14, colors[2], '2', strong12)}
      {cell(136, 14, colors[2], '2', strong12)}
      {cell(192, 14, colors[3], '3', strong12)}

      {/* 20 = 2^2 · 5 */}
      <text x={20} y={110} fontSize="18" fontWeight="bold" fill="#1f2937">20 =</text>
      {cell(80, 88, colors[2], '2', strong20)}
      {cell(136, 88, colors[2], '2', strong20)}
      {cell(192, 88, colors[5], '5', strong20)}

      {/* LKKT = 2^2 · 3 · 5 */}
      <text x={20} y={184} fontSize="18" fontWeight="bold" fill="#b91c1c">LKKT =</text>
      {cell(100, 162, colors[2], '2', strongLkkt)}
      {cell(156, 162, colors[2], '2', strongLkkt)}
      {cell(212, 162, colors[3], '3', strongLkkt)}
      {cell(268, 162, colors[5], '5', strongLkkt)}
      <text x={336} y={188} fontSize="20" fontWeight="bold" fill="#111827">= 60</text>

      {/* Legend */}
      <g transform="translate(360, 14)">
        <text x={0} y={14} fontSize="12" fontWeight="bold" fill="#6b7280">Jelmagyarázat</text>
        <circle cx={10} cy={34} r={8} fill={colors[2]} />
        <text x={24} y={38} fontSize="13" fill="#111827">prím: 2</text>
        <circle cx={10} cy={58} r={8} fill={colors[3]} />
        <text x={24} y={62} fontSize="13" fill="#111827">prím: 3</text>
        <circle cx={10} cy={82} r={8} fill={colors[5]} />
        <text x={24} y={86} fontSize="13" fill="#111827">prím: 5</text>
      </g>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adja meg a $12$ és a $20$ legkisebb közös többszörösét!`,
  asked: [{ key: 'lkkt', label: '$\\mathrm{LKKT}(12,\\ 20) = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Prímtényezős felbontás',
      points: 1,
      body: `A legkisebb közös többszörös (LKKT) meghatározásához először prímtényezőkre bontjuk a két számot.

A prímfaktorizáció azt jelenti, hogy a számot prímszámok szorzataként írjuk fel.

- $12 = 2 \\cdot 2 \\cdot 3 = 2^2 \\cdot 3$
- $20 = 2 \\cdot 2 \\cdot 5 = 2^2 \\cdot 5$

Az ábrán színekkel jelöltük a prímtényezőket: kék a $2$, zöld a $3$, narancs az $5$.`,
      figure: () => <FactorChart highlight="factor12" />,
    },
    {
      title: '2. lépés — Az LKKT felépítése',
      points: 1,
      body: `A legkisebb közös többszörös képlete: vegyük az összes előforduló prímtényezőt, mindegyiket a **legnagyobb** kitevőjén.

- A $2$ prím mindkettőben előfordul; a nagyobb kitevő: $2^2$.
- A $3$ csak a $12$-ben szerepel: kitevője $1$.
- Az $5$ csak a $20$-ban szerepel: kitevője $1$.

Tehát:
$$\\mathrm{LKKT}(12, 20) = 2^2 \\cdot 3 \\cdot 5 = 4 \\cdot 3 \\cdot 5 = 60.$$

**Ellenőrzés:** $60 : 12 = 5$ (egész), $60 : 20 = 3$ (egész). A $60$ tehát valóban közös többszörös, és mivel a prímtényezőket a legkisebb szükséges kitevőn vettük, ez a **legkisebb** is.`,
      figure: () => <FactorChart highlight="lkkt" />,
    },
  ],
  finalAnswer: '$\\mathrm{LKKT}(12, 20) = 60$',
  usedFormulas: [
    'prímfaktorizáció',
    'LKKT(a,b) = minden prím a legnagyobb kitevőjén',
  ],
};

export default { meta, problem, solution };
