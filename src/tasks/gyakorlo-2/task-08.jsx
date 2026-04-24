import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-08',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 8,
  title: 'Valószínűség — két piros golyó visszatevés nélkül',
  points: 4,
  topics: ['valószínűség'],
  difficulty: 3,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 93, note: 'kombinatorika' },
  ],
  estimatedMinutes: 5,
};

function UrnFigure({ step = 1 }) {
  // 4 piros, 6 kék, összesen 10 golyó
  const pirosak = 4, kekek = 6;
  return (
    <SvgCanvas width={480} height={240} viewBox="0 0 480 240">
      <rect x="40" y="40" width="200" height="160" rx="16" fill="#f3f4f6" stroke="#4b5563" strokeWidth="2" />
      <text x="140" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#111">
        Urna: 4 piros + 6 kék = 10 golyó
      </text>
      {/* Piros golyók */}
      {[...Array(pirosak)].map((_, i) => (
        <circle key={`p${i}`} cx={70 + (i % 4) * 28} cy={70 + Math.floor(i / 4) * 28} r="12" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.2" />
      ))}
      {/* Kék golyók */}
      {[...Array(kekek)].map((_, i) => (
        <circle key={`k${i}`} cx={70 + (i % 4) * 28} cy={110 + Math.floor(i / 4) * 28} r="12" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.2" />
      ))}

      {/* Jobbra: eseménystruktúra (fadiagram egyszerűsített) */}
      <text x="280" y="50" fontSize="13" fontWeight="bold" fill="#111">Visszatevés NÉLKÜL húzunk 2 golyót.</text>
      <text x="280" y="80" fontSize="12" fill="#111">{step >= 1 ? '1. húzás: 4 piros / 10 golyó' : ''}</text>
      <text x="280" y="105" fontSize="12" fill="#111">{step >= 2 ? '2. húzás (ha 1. piros): 3 piros / 9 golyó' : ''}</text>
      <text x="280" y="135" fontSize="13" fontWeight="bold" fill="#b91c1c">
        {step >= 3 ? 'P(mindkettő piros) = 4/10 · 3/9' : ''}
      </text>
      <text x="280" y="160" fontSize="13" fontWeight="bold" fill="#b91c1c">
        {step >= 3 ? '= 12/90 = 2/15 ≈ 0,1333' : ''}
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy urnában $4$ piros és $6$ kék, egyforma méretű golyó van (összesen $10$ golyó). Visszatevés **nélkül** kihúzunk egymás után $2$ golyót.

**a)** Mekkora annak a valószínűsége, hogy **mindkét** kihúzott golyó piros? ($2$ pont)

**b)** Mekkora annak a valószínűsége, hogy a két kihúzott golyó **különböző** színű? ($2$ pont)

Az eredményt közönséges törtben és tizedes törtben (négy tizedesjegyig) is adja meg!`,
  figure: () => <UrnFigure step={0} />,
  asked: [
    { key: 'a', label: 'a) $P(\\text{mindkettő piros}) = ?$' },
    { key: 'b', label: 'b) $P(\\text{különböző színű}) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Az első húzás valószínűsége',
      points: 1,
      body: `Az urnában $10$ egyforma golyó van, közülük $4$ piros. Az első húzás piros eseményének valószínűsége (klasszikus valószínűség):

$$P(\\text{1. piros}) = \\dfrac{4}{10} = \\dfrac{2}{5}.$$`,
      figure: () => <UrnFigure step={1} />,
    },
    {
      title: 'a/2. lépés — A második húzás feltételes valószínűsége',
      points: 1,
      body: `Ha az első húzás **piros** volt, akkor már csak $9$ golyó maradt, és közülük $3$ piros (a visszatevés nélkül egy pirosat elvettünk). Tehát

$$P(\\text{2. piros} \\mid \\text{1. piros}) = \\dfrac{3}{9} = \\dfrac{1}{3}.$$

A szorzási szabály szerint két (sorrendben) bekövetkező esemény együttes valószínűsége a feltételes valószínűségek szorzata:

$$P(\\text{mindkettő piros}) = \\dfrac{4}{10} \\cdot \\dfrac{3}{9} = \\dfrac{12}{90} = \\dfrac{2}{15}.$$

Tizedes törtben: $\\dfrac{2}{15} \\approx 0{,}1333$.

$$\\boxed{P(\\text{mindkettő piros}) = \\dfrac{2}{15} \\approx 0{,}1333.}$$`,
      figure: () => <UrnFigure step={3} />,
    },
    {
      title: 'b/1. lépés — A „különböző színű" esemény komplementere',
      points: 1,
      body: `Az elemi kimenetelek (szín-párok) négy csoportra oszthatók: **(piros, piros), (piros, kék), (kék, piros), (kék, kék)**. A „különböző színű" esemény a középső két eset: (piros, kék) és (kék, piros).

**Átfogalmazás:** a komplementer esemény az, hogy mindkettő **azonos** színű, tehát vagy mindkét piros, vagy mindkét kék:

$$P(\\text{különböző}) = 1 - P(\\text{mindkettő piros}) - P(\\text{mindkettő kék}).$$`,
    },
    {
      title: 'b/2. lépés — Mindkettő kék és az összegzés',
      points: 1,
      body: `Hasonló logikával:

$$P(\\text{mindkettő kék}) = \\dfrac{6}{10} \\cdot \\dfrac{5}{9} = \\dfrac{30}{90} = \\dfrac{1}{3}.$$

Így:

$$P(\\text{különböző}) = 1 - \\dfrac{2}{15} - \\dfrac{1}{3}.$$

Közös nevezőre ($15$):

$$= \\dfrac{15}{15} - \\dfrac{2}{15} - \\dfrac{5}{15} = \\dfrac{8}{15}.$$

Tizedes törtben: $\\dfrac{8}{15} \\approx 0{,}5333$.

**Ellenőrzés közvetlen úton:**
$$P(\\text{piros, kék}) + P(\\text{kék, piros}) = \\dfrac{4}{10}\\cdot\\dfrac{6}{9} + \\dfrac{6}{10}\\cdot\\dfrac{4}{9} = \\dfrac{24}{90} + \\dfrac{24}{90} = \\dfrac{48}{90} = \\dfrac{8}{15}. \\ \\checkmark$$

Tehát $\\boxed{P(\\text{különböző}) = \\dfrac{8}{15} \\approx 0{,}5333}$.`,
    },
  ],
  finalAnswer: {
    a: '$P = \\dfrac{2}{15} \\approx 0{,}1333$',
    b: '$P = \\dfrac{8}{15} \\approx 0{,}5333$',
  },
  usedFormulas: [
    'klasszikus valószínűség: $P(A) = |A| / |\\Omega|$',
    'szorzási szabály feltételes valószínűséggel',
    'komplementer: $P(\\bar{A}) = 1 - P(A)$',
  ],
};

export default { meta, problem, solution };
