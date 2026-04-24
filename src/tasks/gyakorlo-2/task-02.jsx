import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-02',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 2,
  title: 'Százalékszámítás — ruha kedvezmény',
  points: 2,
  topics: ['százalékszámítás'],
  difficulty: 1,
  fgvt: [],
  estimatedMinutes: 3,
};

function PriceBar() {
  return (
    <SvgCanvas width={480} height={180} viewBox="0 0 480 180">
      {/* Eredeti ár (teljes sáv) */}
      <rect x="40" y="50" width="400" height="40" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.5" />
      <text x="240" y="40" fontSize="13" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">
        Eredeti ár: 18 000 Ft (100%)
      </text>
      {/* Csökkentett sáv (75%) */}
      <rect x="40" y="110" width="300" height="30" fill="#bbf7d0" stroke="#166534" strokeWidth="1.5" />
      <text x="190" y="132" fontSize="13" textAnchor="middle" fill="#14532d" fontWeight="bold">
        Akciós ár = 75%
      </text>
      {/* 25% kedvezmény kijelölve */}
      <rect x="340" y="110" width="100" height="30" fill="#fecaca" stroke="#991b1b" strokeWidth="1.5" />
      <text x="390" y="132" fontSize="12" textAnchor="middle" fill="#7f1d1d" fontWeight="bold">
        -25%
      </text>
      <text x="40" y="170" fontSize="11" fill="#555">0%</text>
      <text x="440" y="170" fontSize="11" textAnchor="end" fill="#555">100%</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy kabát eredeti ára $18\\,000$ Ft. Tavaszi akció keretében a boltos $25\\%$-kal leszállítja az árát. Mennyibe kerül a kabát az akció alatt?`,
  figure: () => <PriceBar />,
  asked: [{ key: 'akcio', label: 'Akciós ár (Ft) = ?' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A maradék százalék meghatározása',
      points: 1,
      body: `Ha a boltos $25\\%$-kal csökkenti az árat, akkor az új ár az eredeti $100\\% - 25\\% = 75\\%$-a.

A százalékos csökkenés képlete: $\\text{új} = \\text{régi} \\cdot (1 - p/100)$, ahol most $p = 25$.`,
    },
    {
      title: '2. lépés — Az akciós ár kiszámítása',
      points: 1,
      body: `Behelyettesítve:

$$\\text{akciós ár} = 18\\,000 \\cdot (1 - 0{,}25) = 18\\,000 \\cdot 0{,}75.$$

Számolva:

$$18\\,000 \\cdot 0{,}75 = 18\\,000 \\cdot \\dfrac{3}{4} = \\dfrac{54\\,000}{4} = 13\\,500 \\ \\text{Ft}.$$

Ellenőrzés: a kedvezmény összege $18\\,000 \\cdot 0{,}25 = 4\\,500$ Ft, és $18\\,000 - 4\\,500 = 13\\,500$ Ft — egyezik.

Tehát az akciós ár $\\boxed{13\\,500 \\text{ Ft}}$.`,
    },
  ],
  finalAnswer: { akcio: '$13\\,500$ Ft' },
  usedFormulas: ['Csökkentés $p\\%$-kal: $\\text{új} = \\text{régi} \\cdot (1 - p/100)$'],
};

export default { meta, problem, solution };
