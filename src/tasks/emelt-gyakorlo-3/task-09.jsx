import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-09',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'II',
  number: 9,
  title: 'Statisztika — hisztogram, átlag, medián becslése',
  points: 16,
  topics: ['statisztika'],
  difficulty: 3,
  fgvt: [
    { page: 100, note: 'átlag, medián' },
    { page: 102, note: 'hisztogram' },
  ],
  estimatedMinutes: 20,
};

// Adatok: Egy iskolai futóverseny 200 résztvevőjének idejét (perc) osztályokba soroltuk.
// Osztályok és gyakoriságok:
//   [10;12)   8
//   [12;14)   28
//   [14;16)   54
//   [16;18)   62
//   [18;20)   32
//   [20;22)   12
//   [22;24)   4
//   összesen 200
// Osztályközéppel számított átlag:
//   középpontok: 11, 13, 15, 17, 19, 21, 23
//   x̄ = (8·11 + 28·13 + 54·15 + 62·17 + 32·19 + 12·21 + 4·23) / 200
//      = (88 + 364 + 810 + 1054 + 608 + 252 + 92) / 200 = 3268/200 = 16,34 perc
// Medián osztály: a kummulatív 100. elem a [16;18) osztályban (korábbi: 8+28+54=90, 90+62=152; 100. elem benne van)
// Lineáris interpoláció:
//   m = L + (n/2 - F) / f · h
//   L = 16, n = 200, n/2 = 100, F = 90 (kummulatív az előző osztályig), f = 62, h = 2
//   med = 16 + (100 - 90)/62 · 2 = 16 + 20/62 ≈ 16,323 perc

function Histogram({ highlightMedian = false, showMean = false, showMedianEst = false }) {
  const classes = [
    { from: 10, to: 12, f: 8 },
    { from: 12, to: 14, f: 28 },
    { from: 14, to: 16, f: 54 },
    { from: 16, to: 18, f: 62 },
    { from: 18, to: 20, f: 32 },
    { from: 20, to: 22, f: 12 },
    { from: 22, to: 24, f: 4 },
  ];
  const yMax = 70;
  const cfg = { x: 50, y: 30, w: 420, h: 240, xMin: 10, xMax: 24, yMin: 0, yMax, xStep: 2, yStep: 10 };
  const sx = (v) => cfg.x + ((v - cfg.xMin) / (cfg.xMax - cfg.xMin)) * cfg.w;
  const sy = (v) => cfg.y + cfg.h - ((v - cfg.yMin) / (cfg.yMax - cfg.yMin)) * cfg.h;

  const mean = 16.34;
  const medEst = 16.323;

  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <Axes {...cfg} xLabel="idő (perc)" yLabel="gyakoriság" />
      {classes.map((c, i) => {
        const isMed = highlightMedian && c.from === 16;
        return (
          <g key={i}>
            <rect
              x={sx(c.from)}
              y={sy(c.f)}
              width={sx(c.to) - sx(c.from)}
              height={sy(0) - sy(c.f)}
              fill={isMed ? '#fbbf24' : '#93c5fd'}
              fillOpacity={isMed ? 0.85 : 0.75}
              stroke="#1e40af"
              strokeWidth="1.5"
            />
            <text x={sx((c.from + c.to) / 2)} y={sy(c.f) - 4} fontSize="12" textAnchor="middle" fill="#1e3a8a" fontWeight="700">
              {c.f}
            </text>
          </g>
        );
      })}
      {showMean && (
        <g>
          <line x1={sx(mean)} y1={sy(0)} x2={sx(mean)} y2={sy(yMax)} stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(mean) + 4} y={sy(65)} fontSize="12" fill="#dc2626" fontWeight="700">
            x̄ ≈ 16,34
          </text>
        </g>
      )}
      {showMedianEst && (
        <g>
          <line x1={sx(medEst)} y1={sy(0)} x2={sx(medEst)} y2={sy(yMax)} stroke="#065f46" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(medEst) + 4} y={sy(55)} fontSize="12" fill="#065f46" fontWeight="700">
            med ≈ 16,32
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

function CumulativeCurve() {
  const pts = [
    { x: 10, F: 0 },
    { x: 12, F: 8 },
    { x: 14, F: 36 },
    { x: 16, F: 90 },
    { x: 18, F: 152 },
    { x: 20, F: 184 },
    { x: 22, F: 196 },
    { x: 24, F: 200 },
  ];
  const cfg = { x: 60, y: 30, w: 410, h: 240, xMin: 10, xMax: 24, yMin: 0, yMax: 200, xStep: 2, yStep: 25 };
  const sx = (v) => cfg.x + ((v - cfg.xMin) / (cfg.xMax - cfg.xMin)) * cfg.w;
  const sy = (v) => cfg.y + cfg.h - ((v - cfg.yMin) / (cfg.yMax - cfg.yMin)) * cfg.h;
  const poly = pts.map((p) => `${sx(p.x)},${sy(p.F)}`).join(' ');

  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <Axes {...cfg} xLabel="idő (perc)" yLabel="kumulatív gyak." />
      <polyline points={poly} fill="none" stroke="#065f46" strokeWidth="2.5" />
      {pts.map((p) => (
        <circle key={p.x} cx={sx(p.x)} cy={sy(p.F)} r="3.5" fill="#065f46" />
      ))}
      {/* medián vonalak */}
      <line x1={sx(cfg.xMin)} y1={sy(100)} x2={sx(16.323)} y2={sy(100)} stroke="#dc2626" strokeWidth="1.8" strokeDasharray="3 3" />
      <line x1={sx(16.323)} y1={sy(100)} x2={sx(16.323)} y2={sy(0)} stroke="#dc2626" strokeWidth="1.8" strokeDasharray="3 3" />
      <text x={sx(16.323) + 6} y={sy(60)} fontSize="12" fill="#dc2626" fontWeight="700">
        med ≈ 16,32
      </text>
      <text x={sx(10.5)} y={sy(105)} fontSize="11" fill="#dc2626" fontWeight="700">
        n/2 = 100
      </text>
      <text x={260} y={22} fontSize="13" fontWeight="700" textAnchor="middle" fill="#111827">
        Kumulatív gyakoriság (osztály felső határaival)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy iskolai futóversenyen $200$ diák versenyzett. Az elért időket perc-ben osztályokba soroltuk:

| Időintervallum (perc) | Gyakoriság |
|---|---|
| $[10;\\ 12)$ | $8$ |
| $[12;\\ 14)$ | $28$ |
| $[14;\\ 16)$ | $54$ |
| $[16;\\ 18)$ | $62$ |
| $[18;\\ 20)$ | $32$ |
| $[20;\\ 22)$ | $12$ |
| $[22;\\ 24)$ | $4$ |
| **Összesen** | **200** |

**a)** Ábrázolja az adatokat **hisztogramon**! Az **osztályközepek** segítségével becsülje meg az átlagos futási időt! ($6$ pont)

**b)** A hisztogramból becsülje meg a **medián** helyét lineáris interpolációval! Adja meg a megfelelő képletet és a számolás menetét! ($6$ pont)

**c)** Mekkora a valószínűsége annak, hogy egy véletlenszerűen kiválasztott diák a $[14;\\ 18)$ időintervallumba tartozik? ($4$ pont)`,
  figure: () => <Histogram />,
  asked: [
    { key: 'mean', label: 'a) $\\bar x \\approx ?$ perc' },
    { key: 'med', label: 'b) medián $\\approx ?$ perc' },
    { key: 'p', label: 'c) $P([14;18)) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Az osztályközepek és a képlet',
      points: 2,
      body: `Osztály-gyakoriságokkal a **súlyozott átlag** képlete (fgv. tábla, 100. old.):

$$\\bar{x} \\approx \\dfrac{\\sum_i f_i \\cdot c_i}{\\sum_i f_i},$$

ahol $f_i$ az $i$. osztály gyakorisága, $c_i$ pedig az **osztályközéppontja** ($c_i = (\\text{osztály alsó} + \\text{osztály felső})/2$).

**Osztályközéppontok:**

| Osztály | $c_i$ | $f_i$ |
|---|---|---|
| [10;12) | 11 | 8 |
| [12;14) | 13 | 28 |
| [14;16) | 15 | 54 |
| [16;18) | 17 | 62 |
| [18;20) | 19 | 32 |
| [20;22) | 21 | 12 |
| [22;24) | 23 | 4 |`,
    },
    {
      title: 'a/2. lépés — A súlyozott összeg és az átlag',
      points: 4,
      body: `$$\\sum f_i c_i = 8 \\cdot 11 + 28 \\cdot 13 + 54 \\cdot 15 + 62 \\cdot 17 + 32 \\cdot 19 + 12 \\cdot 21 + 4 \\cdot 23.$$

Tagonként:
- $8 \\cdot 11 = 88$
- $28 \\cdot 13 = 364$
- $54 \\cdot 15 = 810$
- $62 \\cdot 17 = 1054$
- $32 \\cdot 19 = 608$
- $12 \\cdot 21 = 252$
- $4 \\cdot 23 = 92$

Összeg: $88 + 364 + 810 + 1054 + 608 + 252 + 92 = 3268$.

$$\\bar{x} \\approx \\dfrac{3268}{200} = 16{,}34 \\text{ perc}.$$`,
      figure: () => <Histogram showMean />,
    },
    {
      title: 'b/1. lépés — A medián osztálya',
      points: 2,
      body: `Mivel $n = 200$, a medián a **100. és 101. érték közötti** hely. Nézzük a **kumulatív gyakoriságokat** (az osztály felső határáig mennyi diák jött):

| Felső határ | Kumulatív |
|---|---|
| 12 | 8 |
| 14 | $8 + 28 = 36$ |
| 16 | $36 + 54 = 90$ |
| 18 | $90 + 62 = 152$ |
| 20 | $152 + 32 = 184$ |
| 22 | 196 |
| 24 | 200 |

A $100$-as kumulatív érték a **$[16;\\ 18)$** osztályba esik (mert $90 < 100 \\leq 152$). Ez a **medián-osztály**.`,
      figure: () => <Histogram highlightMedian />,
    },
    {
      title: 'b/2. lépés — Lineáris interpoláció a medián-osztályon belül',
      points: 3,
      body: `A medián-osztályon belül feltételezzük, hogy az adatok **egyenletesen** oszlanak el. Ekkor a medián helye:

$$\\text{med} \\approx L + \\dfrac{\\tfrac{n}{2} - F}{f} \\cdot h,$$

ahol
- $L = 16$ (a medián-osztály **alsó határa**),
- $n/2 = 100$ (a "keresett rang"),
- $F = 90$ (a medián-osztály **előtti** kumulatív gyakoriság),
- $f = 62$ (a medián-osztály **saját** gyakorisága),
- $h = 2$ (az osztály szélessége).

Behelyettesítve:

$$\\text{med} \\approx 16 + \\dfrac{100 - 90}{62} \\cdot 2 = 16 + \\dfrac{20}{62} \\approx 16 + 0{,}3226 \\approx 16{,}32 \\text{ perc}.$$`,
      figure: () => <CumulativeCurve />,
    },
    {
      title: 'b/3. lépés — Értelmezés',
      points: 1,
      body: `**Eredmény:** a medián becsült értéke kb. $16{,}32$ perc. Ez azt jelenti, hogy a diákok fele ennél gyorsabban, fele ennél lassabban futott.

A kapott átlag ($\\bar{x} \\approx 16{,}34$) és a medián ($\\approx 16{,}32$) nagyon **közel** vannak egymáshoz, ami arra utal, hogy az eloszlás viszonylag **szimmetrikus**. (Ha az átlag jóval nagyobb lenne, mint a medián, az **jobb ferdeségre** utalna — pl. kevés nagyon lassú futó felhúzná az átlagot.)`,
      figure: () => <Histogram showMean showMedianEst />,
    },
    {
      title: 'c) lépés — A [14; 18) intervallumba tartozás valószínűsége',
      points: 4,
      body: `A klasszikus valószínűség képlete alapján (fgv. tábla, 92. old.):

$$P([14;\\ 18)) = \\dfrac{\\text{a kedvező osztályok gyakorisága}}{\\text{összes diák}}.$$

Kedvező: a $[14;\\ 16)$ osztály $54$ tagja **plusz** a $[16;\\ 18)$ osztály $62$ tagja:

$$\\text{kedvező} = 54 + 62 = 116.$$

$$P = \\dfrac{116}{200} = \\dfrac{29}{50} = 0{,}58.$$

Tehát a véletlenszerűen választott diák $58\\%$ valószínűséggel fut $14$ és $18$ perc között.`,
    },
  ],
  finalAnswer: {
    mean: '$\\bar x \\approx 16{,}34$ perc',
    med: '$\\text{med} \\approx 16{,}32$ perc',
    p: '$P = \\dfrac{29}{50} = 0{,}58$',
  },
  usedFormulas: [
    'súlyozott átlag: $\\bar x = \\sum f_i c_i / n$',
    'medián-becslés: $\\text{med} = L + (n/2 - F)/f \\cdot h$',
    'klasszikus valószínűség: $P = k/n$',
  ],
};

export default { meta, problem, solution };
