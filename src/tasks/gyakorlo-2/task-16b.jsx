import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-16b',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.B',
  number: 16,
  subpart: 'b',
  title: 'Statisztika — dolgozat-eredmények elemzése',
  points: 8,
  topics: ['statisztika'],
  difficulty: 3,
  fgvt: [
    { page: 100, note: 'átlag, medián' },
    { page: 102, note: 'sodródiagram' },
  ],
  estimatedMinutes: 12,
};

// Pontszámok (20-ból): 18, 15, 12, 17, 14, 19, 10, 13, 16, 11, 15, 18, 20, 9, 14 (15 diák)
const ertekek = [18, 15, 12, 17, 14, 19, 10, 13, 16, 11, 15, 18, 20, 9, 14];
const rendezett = [...ertekek].sort((a, b) => a - b);
// = [9, 10, 11, 12, 13, 14, 14, 15, 15, 16, 17, 18, 18, 19, 20]
// n = 15, medián = 8. elem = 15
// Q1 = alsó fele mediánja (1..7 elem): medián index = 4, érték = 12
// Q3 = felső fele mediánja (9..15 elem): medián index = 12, érték = 18
// Átlag: sum = 221, átlag = 221/15 ≈ 14,73
const sum = ertekek.reduce((a, b) => a + b, 0); // 221
const atlag = sum / ertekek.length;

function BoxPlot() {
  // Sodródiagram: min=9, Q1=12, median=15, Q3=18, max=20
  const ax = { x: 60, y: 100, w: 380, h: 60 };
  const xMin = 5, xMax = 22;
  const sx = (v) => ax.x + ((v - xMin) / (xMax - xMin)) * ax.w;
  return (
    <SvgCanvas width={480} height={220} viewBox="0 0 480 220">
      <text x="240" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        Sodródiagram — 15 tanuló pontszámai (20-ból)
      </text>

      {/* tengely */}
      <line x1={sx(xMin)} y1={ax.y + ax.h + 30} x2={sx(xMax)} y2={ax.y + ax.h + 30} stroke="#111" strokeWidth="1.5" />
      {[5, 10, 15, 20].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={ax.y + ax.h + 26} x2={sx(v)} y2={ax.y + ax.h + 34} stroke="#111" />
          <text x={sx(v)} y={ax.y + ax.h + 50} fontSize="12" textAnchor="middle" fill="#111">{v}</text>
        </g>
      ))}

      {/* Bajszok (min-max vonalak) */}
      <line x1={sx(9)} y1={ax.y + ax.h / 2} x2={sx(12)} y2={ax.y + ax.h / 2} stroke="#111" strokeWidth="1.5" />
      <line x1={sx(18)} y1={ax.y + ax.h / 2} x2={sx(20)} y2={ax.y + ax.h / 2} stroke="#111" strokeWidth="1.5" />
      {/* min és max vonalvégek */}
      <line x1={sx(9)} y1={ax.y + 10} x2={sx(9)} y2={ax.y + ax.h - 10} stroke="#111" strokeWidth="1.5" />
      <line x1={sx(20)} y1={ax.y + 10} x2={sx(20)} y2={ax.y + ax.h - 10} stroke="#111" strokeWidth="1.5" />

      {/* Doboz Q1 -> Q3 */}
      <rect x={sx(12)} y={ax.y} width={sx(18) - sx(12)} height={ax.h} fill="#dbeafe" stroke="#1e3a8a" strokeWidth="2" />
      {/* Medián */}
      <line x1={sx(15)} y1={ax.y} x2={sx(15)} y2={ax.y + ax.h} stroke="#dc2626" strokeWidth="2.5" />

      {/* Címkék */}
      <text x={sx(9)} y={ax.y - 6} fontSize="11" textAnchor="middle" fill="#111">min = 9</text>
      <text x={sx(12)} y={ax.y - 6} fontSize="11" textAnchor="middle" fill="#111">Q₁ = 12</text>
      <text x={sx(15)} y={ax.y - 6} fontSize="11" textAnchor="middle" fill="#b91c1c" fontWeight="bold">med = 15</text>
      <text x={sx(18)} y={ax.y - 6} fontSize="11" textAnchor="middle" fill="#111">Q₃ = 18</text>
      <text x={sx(20)} y={ax.y - 6} fontSize="11" textAnchor="middle" fill="#111">max = 20</text>

      <text x="240" y="200" fontSize="11" textAnchor="middle" fill="#6b7280">
        pontszám
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy osztályban $15$ tanuló dolgozat-pontszámai (max. $20$ pont):

$$18,\\ 15,\\ 12,\\ 17,\\ 14,\\ 19,\\ 10,\\ 13,\\ 16,\\ 11,\\ 15,\\ 18,\\ 20,\\ 9,\\ 14.$$

**a)** Adja meg az osztály **átlagpontszámát** (két tizedesjegyre kerekítve)! ($2$ pont)

**b)** Határozza meg az adatsor **mediánját** és **alsó/felső kvartilisét** ($Q_1$, $Q_3$)! ($3$ pont)

**c)** Rajzolja fel az adatsorhoz tartozó **sodródiagramot** (box-plot)! ($2$ pont)

**d)** Melyik érték adja az osztály „tipikusabb" teljesítményét, az átlag vagy a medián? Válaszát röviden indokolja. ($1$ pont)`,
  figure: () => <BoxPlot />,
  asked: [
    { key: 'atlag', label: 'a) Átlag = ?' },
    { key: 'kvart', label: 'b) med, Q₁, Q₃ = ?' },
    { key: 'boxplot', label: 'c) Sodródiagram leírása' },
    { key: 'reprez', label: 'd) Tipikusabb mérőszám és indoklás' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Átlag',
      points: 2,
      body: `A **számtani átlag** képlete: $\\bar{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}$.

Összegezzük a pontszámokat:

$$18 + 15 + 12 + 17 + 14 + 19 + 10 + 13 + 16 + 11 + 15 + 18 + 20 + 9 + 14 = 221.$$

$$\\bar{x} = \\dfrac{221}{15} \\approx 14{,}73.$$

$$\\boxed{\\bar{x} \\approx 14{,}73 \\ \\text{pont}.}$$`,
    },
    {
      title: 'b/1. lépés — Rendezés',
      points: 1,
      body: `Növekvő sorrendbe rendezve:

$$9,\\ 10,\\ 11,\\ 12,\\ 13,\\ 14,\\ 14,\\ \\underline{15},\\ 15,\\ 16,\\ 17,\\ 18,\\ 18,\\ 19,\\ 20.$$

$n = 15$ páratlan, így a **medián** a középső, $8.$ elem:

$$\\text{medián} = 15.$$`,
    },
    {
      title: 'b/2. lépés — Kvartilisek',
      points: 2,
      body: `A **két fele** (a medián nélkül): alsó $7$ elem és felső $7$ elem.

- Alsó fele: $9, 10, 11, 12, 13, 14, 14$. Középső (4.) elem: $\\mathbf{Q_1 = 12}$.
- Felső fele: $15, 16, 17, 18, 18, 19, 20$. Középső (4.) elem: $\\mathbf{Q_3 = 18}$.

Min $= 9$, Max $= 20$.

$$\\boxed{\\text{med} = 15, \\quad Q_1 = 12, \\quad Q_3 = 18.}$$`,
    },
    {
      title: 'c) lépés — Sodródiagram',
      points: 2,
      body: `A **sodródiagramot** (box-plot) a következő öt szám határozza meg:

- minimum: $9$
- alsó kvartilis $Q_1$: $12$
- medián: $15$
- felső kvartilis $Q_3$: $18$
- maximum: $20$

Rajz leírása: egy vízszintes számegyenesen a $[9,\\ 20]$ intervallumon készül egy **téglalap** $Q_1 = 12$-től $Q_3 = 18$-ig, benne a mediánnál ($15$) egy függőleges vonal. A téglalapból két **„bajusz"** nyúlik ki a minimumig ($9$) és a maximumig ($20$). Az interkvartilis terjedelem $Q_3 - Q_1 = 6$.`,
    },
    {
      title: 'd) lépés — Reprezentativitás',
      points: 1,
      body: `Az átlag $14{,}73$, a medián $15$. Ezek közel vannak egymáshoz, ami azt mutatja, hogy az adatsor **közel szimmetrikus**, nincs kirívó kilógó érték. Az átlag és a medián közötti kis eltérés abból adódik, hogy a sorozat alul kissé hosszabban elnyúlik ($9$-ig), ami az átlagot lehúzza.

**Kilógó (outlier) érték** jelenlétekor a **medián** robusztusabb (nem befolyásolja néhány szélsőséges adat), az átlag viszont érzékenyebb. Jelen esetben nincs kiugró érték, tehát mindkét mérőszám informatív, de a két szám közel egyezése arra utal, hogy az adatok eloszlása nagyjából **egyenletes**. Tipikusan a **mediánt** választjuk reprezentatív középnek, mert független a szélsőségektől.

$$\\boxed{\\text{Medián } \\approx \\text{átlag; a medián robusztusabb mérőszám.}}$$`,
    },
  ],
  finalAnswer: {
    atlag: '$\\bar{x} \\approx 14{,}73$ pont',
    kvart: 'medián $= 15$, $Q_1 = 12$, $Q_3 = 18$',
    boxplot: 'öt szám: $9$, $12$, $15$, $18$, $20$',
    reprez: 'Mindkettő közel egyezik; a medián robusztusabb az extrém értékekre.',
  },
  usedFormulas: [
    'számtani átlag: $\\bar{x} = \\sum x_i / n$',
    'medián (páratlan elemszámú rendezett sor középső eleme)',
    'alsó és felső kvartilis definíciója',
    'sodródiagram (box-plot) öt-szám-összefoglalója',
  ],
};

export default { meta, problem, solution };
