import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-01',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 1,
  title: 'Százalékszámítás — téli kabát árcsökkentése',
  points: 2,
  topics: ['százalékszámítás'],
  difficulty: 1,
  fgvt: [],
  estimatedMinutes: 2,
  check: { type: 'number', value: 28000, tolerance: 0.5 },
};

function PriceBar() {
  // Eredeti 35000 -> 20% árcsökkentés -> 28000
  const orig = 35000;
  const discount = 0.2;
  const newP = orig * (1 - discount);
  return (
    <SvgCanvas width={480} height={180} viewBox="0 0 480 180">
      <text x="240" y="24" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        Téli kabát — eredeti és akciós ár
      </text>
      {/* Eredeti ár sáv */}
      <rect x="60" y="50" width="360" height="28" fill="#dbeafe" stroke="#1e3a8a" strokeWidth="1.4" />
      <text x="240" y="69" fontSize="13" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">
        100% = {orig} Ft
      </text>
      {/* Akciós (80%) */}
      <rect x="60" y="100" width={360 * (1 - discount)} height="28" fill="#bbf7d0" stroke="#166534" strokeWidth="1.4" />
      <rect x={60 + 360 * (1 - discount)} y="100" width={360 * discount} height="28" fill="#fecaca" stroke="#991b1b" strokeWidth="1.4" />
      <text x={60 + 360 * (1 - discount) / 2} y="119" fontSize="13" textAnchor="middle" fill="#166534" fontWeight="bold">
        80% = ?
      </text>
      <text x={60 + 360 * (1 - discount) + 360 * discount / 2} y="119" fontSize="12" textAnchor="middle" fill="#991b1b">
        −20%
      </text>
      <text x="240" y="158" fontSize="12" textAnchor="middle" fill="#475569">
        Az árat 20%-kal csökkentik. Mi lesz az új ár?
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy téli kabát eredeti ára $35\\,000$ Ft. Az áruházban szezonvégi akcióban ezt az árat **$20\\%$-kal csökkentik**. Mennyi lesz a kabát új ára forintban?`,
  figure: () => <PriceBar />,
  asked: [{ key: 'newPrice', label: 'új ár = ? Ft' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A százalékos csökkentés képlete',
      points: 1,
      body: `Ha egy mennyiséget $p\\%$-kal **csökkentünk**, akkor az új érték az eredeti **$(1 - p/100)$**-szorosa:

$$\\text{új ár} = \\text{régi ár} \\cdot \\left(1 - \\dfrac{p}{100}\\right).$$

Itt $p = 20$, tehát a szorzó $1 - 0{,}20 = 0{,}80$, azaz az eredeti ár $80\\%$-a marad meg.`,
    },
    {
      title: '2. lépés — Behelyettesítés',
      points: 1,
      body: `$$\\text{új ár} = 35\\,000 \\cdot 0{,}80 = 28\\,000 \\ \\text{Ft.}$$

**Ellenőrzés — kivonással:**

$$35\\,000 \\cdot 0{,}20 = 7000 \\ \\text{Ft (a csökkentés összege)},$$
$$35\\,000 - 7000 = 28\\,000 \\ \\text{Ft.} \\ \\checkmark$$

Tehát $\\boxed{28\\,000 \\text{ Ft}}$ a kabát új ára.`,
    },
  ],
  finalAnswer: { newPrice: '$28\\,000$ Ft' },
  usedFormulas: ['$\\text{új} = \\text{régi} \\cdot (1 - p/100)$'],
};

export default { meta, problem, solution };
