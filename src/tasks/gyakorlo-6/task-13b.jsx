import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-13b',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  title: 'Szöveges feladat — életkori arány',
  points: 6,
  topics: ['egyenletek', 'százalékszámítás'],
  difficulty: 3,
  fgvt: [{ page: 27, note: 'lineáris egyenletek' }],
  estimatedMinutes: 10,
  // Ildikó és Zoli jelenlegi életkora.
  // Ildikó 6 évvel idősebb Zolinál. 4 év múlva Ildikó életkora éppen a másfélszerese lesz Zolinak.
  // Jelölés: Z = Zoli, I = Z + 6.
  // 4 év múlva: (I+4) = 1,5(Z+4) → Z + 6 + 4 = 1,5Z + 6 → Z + 10 = 1,5Z + 6 → 4 = 0,5Z → Z = 8.
  // Ildikó = 14. Ellenőrzés 4 év múlva: Zoli 12, Ildikó 18 = 1,5·12 ✓.
  check: { type: 'number', value: 8 },
};

function AgeFigure({ step = 0 }) {
  // Simple bar diagram of ages now and in 4 years
  const bar = (x, y, w, h, fill, label) => (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="#1e3a8a" />
      <text x={x + w / 2} y={y + h / 2 + 4} fontSize="13" fontWeight="700" textAnchor="middle" fill="#fff">{label}</text>
    </g>
  );
  return (
    <SvgCanvas width={540} height={320} viewBox="0 0 540 320">
      <text x="270" y="24" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Életkor jelenleg és 4 év múlva
      </text>
      <text x="40" y="66" fontSize="13" fontWeight="700">Most</text>
      {bar(120, 50, step >= 1 ? 80 : 180, 30, '#2563eb', 'Zoli: Z')}
      {bar(120, 90, step >= 1 ? 140 : 240, 30, '#9333ea', 'Ildikó: Z+6')}
      <text x="40" y="186" fontSize="13" fontWeight="700">4 év múlva</text>
      {bar(120, 170, step >= 2 ? 120 : 220, 30, '#2563eb', 'Zoli: Z+4')}
      {bar(120, 210, step >= 2 ? 180 : 280, 30, '#9333ea', 'Ildikó: Z+10')}
      {step >= 3 && (
        <g>
          <rect x="30" y="260" width="480" height="40" rx="6" fill="#fde68a" stroke="#b45309" />
          <text x="270" y="285" fontSize="14" fontWeight="700" textAnchor="middle" fill="#78350f">
            Z + 10 = 1,5 · (Z + 4)  ⟹  Z = 8
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Ildikó $6$ évvel idősebb, mint Zoli. $4$ év múlva Ildikó életkora pontosan a **másfélszerese** lesz Zoli életkorának.

**a)** Hány éves jelenleg Zoli?

**b)** Hány éves jelenleg Ildikó?

A megoldás menetét egyenlettel részletezze!`,
  figure: () => <AgeFigure />,
  asked: [
    { key: 'Z', label: 'a) Zoli most: $?$ éves' },
    { key: 'I', label: 'b) Ildikó most: $?$ éves' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A változók bevezetése',
      points: 1,
      body: `Legyen $Z$ Zoli jelenlegi életkora (évben). Mivel Ildikó $6$ évvel idősebb:

$$I = Z + 6.$$`,
      figure: () => <AgeFigure step={1} />,
    },
    {
      title: '2. lépés — 4 év múlva',
      points: 1,
      body: `$4$ év múlva Zoli $(Z + 4)$ éves, Ildikó $(I + 4) = (Z + 10)$ éves.`,
      figure: () => <AgeFigure step={2} />,
    },
    {
      title: '3. lépés — Az egyenlet felírása',
      points: 1,
      body: `A szöveg szerint Ildikó életkora ekkor a **másfélszerese** Zoliénak:

$$Z + 10 = 1{,}5 \\cdot (Z + 4).$$`,
      figure: () => <AgeFigure step={3} />,
    },
    {
      title: '4. lépés — Megoldás',
      points: 2,
      body: `Bontsuk ki a jobb oldalt:

$$Z + 10 = 1{,}5 Z + 6.$$

Vigyünk mindent az egyik oldalra:

$$10 - 6 = 1{,}5 Z - Z \\Longrightarrow 4 = 0{,}5 Z \\Longrightarrow Z = 8.$$

Így $I = 8 + 6 = 14$.`,
      figure: () => <AgeFigure step={3} />,
    },
    {
      title: '5. lépés — Ellenőrzés',
      points: 1,
      body: `Most: Zoli $8$ éves, Ildikó $14$ éves, a korkülönbség $6$ év ✓.

$4$ év múlva: Zoli $12$, Ildikó $18$. És tényleg $18 = 1{,}5 \\cdot 12$ ✓.`,
      figure: () => <AgeFigure step={3} />,
    },
  ],
  finalAnswer: { Z: '$Z = 8$ éves', I: '$I = 14$ éves' },
  usedFormulas: ['lineáris egyenlet felírása és megoldása'],
};

export default { meta, problem, solution };
