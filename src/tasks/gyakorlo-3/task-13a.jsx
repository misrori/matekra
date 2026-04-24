import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-13a',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  title: 'Racionális törtes egyenlet',
  points: 5,
  topics: ['egyenletek'],
  difficulty: 3,
  fgvt: [{ page: 27, note: 'másodfokú megoldóképlet' }],
  estimatedMinutes: 10,
};

// Oldd meg:  (x+1)/(x-2) + 2 = (x+7)/(x-2)
// Értelmezési tartomány: x ≠ 2.
// Szorozzuk (x-2)-vel: (x+1) + 2(x-2) = (x+7)
// x + 1 + 2x - 4 = x + 7
// 3x - 3 = x + 7
// 2x = 10 → x = 5. Ellenőrzés: x=5 ≠ 2, OK.
function EquationFigure({ step = 0 }) {
  // Jobb képi "equation flow"
  return (
    <SvgCanvas width={520} height={240} viewBox="0 0 520 240">
      <text x="260" y="28" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Megoldási séma — racionális tört egyenlet
      </text>
      <g>
        <rect x="30" y="50" width="460" height="40" rx="6" fill={step >= 0 ? '#dbeafe' : '#f3f4f6'} stroke="#1e40af" />
        <text x="260" y="75" fontSize="13" textAnchor="middle">1. Értelmezési tartomány: x ≠ 2</text>
      </g>
      <g>
        <rect x="30" y="100" width="460" height="40" rx="6" fill={step >= 1 ? '#dcfce7' : '#f3f4f6'} stroke="#166534" />
        <text x="260" y="125" fontSize="13" textAnchor="middle">2. Szorozzuk (x − 2)-vel</text>
      </g>
      <g>
        <rect x="30" y="150" width="460" height="40" rx="6" fill={step >= 2 ? '#fde68a' : '#f3f4f6'} stroke="#b45309" />
        <text x="260" y="175" fontSize="13" textAnchor="middle">3. Lineáris egyenlet: x = 5</text>
      </g>
      <g>
        <rect x="30" y="200" width="460" height="30" rx="6" fill={step >= 3 ? '#fca5a5' : '#f3f4f6'} stroke="#b91c1c" />
        <text x="260" y="220" fontSize="12" textAnchor="middle">4. Ellenőrzés értelmezési tartomány szerint</text>
      </g>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán az alábbi egyenletet:

$$\\dfrac{x + 1}{x - 2} + 2 = \\dfrac{x + 7}{x - 2}.$$

A megoldás menetét részletezze!`,
  figure: () => <EquationFigure />,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Értelmezési tartomány',
      points: 1,
      body: `A nevező nem lehet $0$, tehát $x - 2 \\neq 0$, azaz **$x \\neq 2$**. Az egyenletet a $\\mathbb{R} \\setminus \\{2\\}$ halmazon vizsgáljuk.`,
      figure: () => <EquationFigure step={0} />,
    },
    {
      title: '2. lépés — Közös nevező és szorzás',
      points: 2,
      body: `Szorozzuk meg az egyenlet mindkét oldalát $(x - 2)$-vel (ez $\\neq 0$ az ÉT miatt):

$$(x + 1) + 2(x - 2) = (x + 7).$$

Bontsuk ki a zárójelet:

$$x + 1 + 2x - 4 = x + 7.$$

Összevonás:

$$3x - 3 = x + 7.$$`,
      figure: () => <EquationFigure step={1} />,
    },
    {
      title: '3. lépés — A lineáris egyenlet megoldása',
      points: 1,
      body: `Vigyük az $x$-es tagokat az egyik, a konstansokat a másik oldalra:

$$3x - x = 7 + 3 \\;\\Longrightarrow\\; 2x = 10 \\;\\Longrightarrow\\; x = 5.$$`,
      figure: () => <EquationFigure step={2} />,
    },
    {
      title: '4. lépés — Ellenőrzés',
      points: 1,
      body: `Először: $x = 5 \\neq 2$, tehát benne van az ÉT-ban.

Behelyettesítünk az eredeti egyenletbe:

$$\\text{bal oldal:}\\ \\dfrac{5 + 1}{5 - 2} + 2 = \\dfrac{6}{3} + 2 = 2 + 2 = 4.$$

$$\\text{jobb oldal:}\\ \\dfrac{5 + 7}{5 - 2} = \\dfrac{12}{3} = 4.$$

A két oldal egyenlő, tehát $x = 5$ valóban megoldás.`,
      figure: () => <EquationFigure step={3} />,
    },
  ],
  finalAnswer: { x: '$x = 5$' },
  usedFormulas: [
    'értelmezési tartomány (nevező $\\neq 0$)',
    'lineáris egyenlet rendezése',
    'behelyettesítéses ellenőrzés',
  ],
};

export default { meta, problem, solution };
