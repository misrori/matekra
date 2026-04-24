import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-5-04',
  year: 2024,
  session: 'emelt gyakorló · 5. teszt',
  level: 'emelt',
  part: 'I',
  number: 4,
  title: 'Maradékos osztás — maradékok modulo 7',
  points: 13,
  topics: ['számelmélet'],
  difficulty: 4,
  fgvt: [
    { page: 15, note: 'maradékos osztás' },
  ],
  estimatedMinutes: 18,
  check: { type: 'number', value: 6, tolerance: 0 },
};

// Feladat: Milyen maradékot ad 7-tel osztva a  3^2024 + 5^2024  szám?
// Megoldás: mod 7-ben periódus keresés.
// 3^1=3, 3^2=2, 3^3=6, 3^4=4, 3^5=5, 3^6=1, periódus 6.
// 2024 = 6*337 + 2 => 3^2024 ≡ 3^2 ≡ 2 (mod 7).
// 5^1=5, 5^2=4, 5^3=6, 5^4=2, 5^5=3, 5^6=1, periódus 6.
// 2024 ≡ 2 (mod 6) => 5^2024 ≡ 5^2 ≡ 4 (mod 7).
// Ezért 3^2024 + 5^2024 ≡ 2 + 4 = 6 (mod 7).
// Szóval maradék = 6. Frissítem a check value-t 6-ra.
// VÁRJUNK: check value = 4 fent — javítsuk 6-ra.

function PeriodTable() {
  const rows3 = [
    { n: 1, val: 3 }, { n: 2, val: 2 }, { n: 3, val: 6 },
    { n: 4, val: 4 }, { n: 5, val: 5 }, { n: 6, val: 1 },
  ];
  const rows5 = [
    { n: 1, val: 5 }, { n: 2, val: 4 }, { n: 3, val: 6 },
    { n: 4, val: 2 }, { n: 5, val: 3 }, { n: 6, val: 1 },
  ];
  const cell = (x, y, w, h, text, fill = '#fff', bold = false) => (
    <g key={`${x}-${y}-${text}`}>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="#111827" />
      <text x={x + w / 2} y={y + h / 2 + 5} fontSize="13" textAnchor="middle" fill="#111827" fontWeight={bold ? 'bold' : 'normal'}>{text}</text>
    </g>
  );
  const col = 70, h = 30;
  return (
    <SvgCanvas width={560} height={250} viewBox="0 0 560 250">
      <text x={20} y={24} fontSize="13" fill="#111827" fontWeight="bold">$3^n \bmod 7$ periódusa — 6 hosszú</text>
      {cell(20, 36, col, h, 'n', '#e0e7ff', true)}
      {rows3.map((r, i) => cell(20 + col * (i + 1), 36, col, h, r.n, '#e0e7ff'))}
      {cell(20, 66, col, h, '$3^n$ mod 7', '#fef3c7', true)}
      {rows3.map((r, i) => cell(20 + col * (i + 1), 66, col, h, r.val, r.n === 2 ? '#bbf7d0' : '#fff', r.n === 2))}
      <text x={20} y={130} fontSize="13" fill="#111827" fontWeight="bold">$5^n \bmod 7$ periódusa — szintén 6 hosszú</text>
      {cell(20, 146, col, h, 'n', '#e0e7ff', true)}
      {rows5.map((r, i) => cell(20 + col * (i + 1), 146, col, h, r.n, '#e0e7ff'))}
      {cell(20, 176, col, h, '$5^n$ mod 7', '#fef3c7', true)}
      {rows5.map((r, i) => cell(20 + col * (i + 1), 176, col, h, r.val, r.n === 2 ? '#bbf7d0' : '#fff', r.n === 2))}
      <text x={20} y={230} fontSize="12" fill="#15803d" fontWeight="bold">A zöld cellák: n = 2 → a 2024 ≡ 2 (mod 6) értéke miatt ezek a releváns maradékok.</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Milyen **maradékot** ad 7-tel osztva a következő szám?

$$3^{2024} + 5^{2024}$$

Részletesen indokolja a megoldást, a hatványok periódusait is megmutatva.`,
  figure: () => <PeriodTable />,
  asked: [
    { key: 'maradek', label: 'A maradék értéke' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A hatványok maradékának vizsgálata',
      points: 2,
      body: `Nagy kitevők esetén érdemes a **maradékok periódusát** keresni. A $3^n$ és $5^n$ alakú számok 7-tel vett maradékai előbb-utóbb ismétlődnek (a maradékok csak a $\\{0, 1, \\dots, 6\\}$ halmazból kerülhetnek ki).`,
    },
    {
      title: '2. lépés — $3^n \\bmod 7$ periódusa',
      points: 3,
      body: `Sorra kiszámítjuk az első néhány hatvány 7-es maradékát:
$$3^1 \\equiv 3,\\ 3^2 = 9 \\equiv 2,\\ 3^3 = 27 \\equiv 6,\\ 3^4 = 81 \\equiv 4,$$
$$3^5 \\equiv 3 \\cdot 4 = 12 \\equiv 5,\\ 3^6 \\equiv 3 \\cdot 5 = 15 \\equiv 1 \\pmod 7.$$

Mivel $3^6 \\equiv 1$, a **periódus hossza 6** (Fermat-kis tétel alapján is: $3^6 \\equiv 1 \\pmod 7$, mert $\\gcd(3, 7) = 1$).`,
    },
    {
      title: '3. lépés — $3^{2024}$ maradéka',
      points: 2,
      body: `A kitevőt redukáljuk modulo 6:
$$2024 = 6 \\cdot 337 + 2 \\Rightarrow 2024 \\equiv 2 \\pmod 6.$$

Ezért:
$$3^{2024} \\equiv 3^{2} \\equiv 2 \\pmod 7.$$`,
    },
    {
      title: '4. lépés — $5^n \\bmod 7$ periódusa',
      points: 2,
      body: `Ugyanígy:
$$5^1 \\equiv 5,\\ 5^2 = 25 \\equiv 4,\\ 5^3 \\equiv 5 \\cdot 4 = 20 \\equiv 6,\\ 5^4 \\equiv 5 \\cdot 6 = 30 \\equiv 2,$$
$$5^5 \\equiv 5 \\cdot 2 = 10 \\equiv 3,\\ 5^6 \\equiv 5 \\cdot 3 = 15 \\equiv 1 \\pmod 7.$$

A **periódus hossza ismét 6** (Fermat-tétel: $5^6 \\equiv 1 \\pmod 7$).`,
    },
    {
      title: '5. lépés — $5^{2024}$ maradéka',
      points: 2,
      body: `Mivel $2024 \\equiv 2 \\pmod 6$:
$$5^{2024} \\equiv 5^{2} \\equiv 4 \\pmod 7.$$`,
      figure: () => <PeriodTable />,
    },
    {
      title: '6. lépés — Az összeg maradéka',
      points: 2,
      body: `A maradékok összeadódnak modulo 7:
$$3^{2024} + 5^{2024} \\equiv 2 + 4 = 6 \\pmod 7.$$

Tehát a szám 7-tel osztva **6 maradékot ad**.

> **Gyors ellenőrzés.** Mivel $2024 \\equiv 2 \\pmod 6$, a Fermat-tétel miatt $3^{2024} \\equiv 3^2 = 9 \\equiv 2$ és $5^{2024} \\equiv 5^2 = 25 \\equiv 4$, összegük $6$ — egyezik.`,
    },
  ],
  finalAnswer: {
    maradek: '$3^{2024} + 5^{2024} \\equiv 6 \\pmod 7$, tehát a **maradék 6**.',
  },
  usedFormulas: [
    'maradékos osztás: $a = qb + r$, $0 \\le r < |b|$',
    'modulo aritmetika: $a + b \\pmod m$ és $a \\cdot b \\pmod m$',
    'Fermat-kis tétel: ha $\\gcd(a, p) = 1$, akkor $a^{p-1} \\equiv 1 \\pmod p$',
  ],
};

export default { meta, problem, solution };
