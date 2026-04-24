import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-13a',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  title: 'Négyzetgyökös egyenlet',
  points: 5,
  topics: ['egyenletek'],
  difficulty: 4,
  fgvt: [{ page: 28, note: 'négyzetgyökös egyenletek' }],
  estimatedMinutes: 12,
  // sqrt(2x + 3) = x - 1
  // ÉT: 2x+3 >= 0 → x >= -3/2. Jobb oldal >= 0 → x >= 1.
  // Négyzetre emelve: 2x+3 = (x-1)^2 = x^2 - 2x + 1 → x^2 - 4x - 2 = 0.
  // x = (4 ± sqrt(16+8))/2 = (4 ± sqrt(24))/2 = 2 ± sqrt(6). sqrt(6) ≈ 2,449.
  // x1 = 2 + sqrt(6) ≈ 4,449. x2 = 2 - sqrt(6) ≈ -0,449. Az utóbbi nem >= 1, tehát kiesik.
  // Megoldás: x = 2 + sqrt(6) ≈ 4,449.
  check: { type: 'number', value: 4.449, tolerance: 0.01 },
};

function EqFigure({ step = 0 }) {
  return (
    <SvgCanvas width={540} height={260} viewBox="0 0 540 260">
      <text x="270" y="28" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Négyzetgyökös egyenlet — megoldási séma
      </text>
      <g>
        <rect x="30" y="50" width="480" height="36" rx="6" fill={step >= 0 ? '#dbeafe' : '#f3f4f6'} stroke="#1e40af" />
        <text x="270" y="73" fontSize="13" textAnchor="middle">1. ÉT: 2x+3 ≥ 0 és jobb oldal ≥ 0  ⟹  x ≥ 1</text>
      </g>
      <g>
        <rect x="30" y="95" width="480" height="36" rx="6" fill={step >= 1 ? '#dcfce7' : '#f3f4f6'} stroke="#166534" />
        <text x="270" y="118" fontSize="13" textAnchor="middle">2. Négyzetre emelés: 2x+3 = (x−1)²</text>
      </g>
      <g>
        <rect x="30" y="140" width="480" height="36" rx="6" fill={step >= 2 ? '#fde68a' : '#f3f4f6'} stroke="#b45309" />
        <text x="270" y="163" fontSize="13" textAnchor="middle">3. Másodfokú: x² − 4x − 2 = 0</text>
      </g>
      <g>
        <rect x="30" y="185" width="480" height="36" rx="6" fill={step >= 3 ? '#fca5a5' : '#f3f4f6'} stroke="#b91c1c" />
        <text x="270" y="208" fontSize="13" textAnchor="middle">4. Hamisgyök-kizárás (x ≥ 1)</text>
      </g>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletet:

$$\\sqrt{2x + 3} = x - 1.$$

A megoldás lépéseit részletezze, és ellenőrizze a kapott gyököket!`,
  figure: () => <EqFigure />,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Értelmezési tartomány',
      points: 1,
      body: `A **négyzetgyök alatt** nem negatív szám lehet: $2x + 3 \\geq 0$, azaz $x \\geq -\\dfrac{3}{2}$.

A **jobb oldal** $x - 1$ a négyzetgyök érték miatt **nem lehet negatív**: $x - 1 \\geq 0$, azaz $x \\geq 1$.

A szigorúbb feltétel: $\\boxed{x \\geq 1}$.`,
      figure: () => <EqFigure step={0} />,
    },
    {
      title: '2. lépés — Négyzetre emelés',
      points: 1,
      body: `Mivel mindkét oldal nem negatív, négyzetre emelhetünk ekvivalens átalakítással:

$$2x + 3 = (x - 1)^2.$$

Bontsuk ki:

$$2x + 3 = x^2 - 2x + 1.$$`,
      figure: () => <EqFigure step={1} />,
    },
    {
      title: '3. lépés — Másodfokú egyenlet rendezése',
      points: 1,
      body: `Vigyünk mindent az egyik oldalra:

$$0 = x^2 - 2x + 1 - 2x - 3 \\Longrightarrow x^2 - 4x - 2 = 0.$$`,
      figure: () => <EqFigure step={2} />,
    },
    {
      title: '4. lépés — A megoldóképlet',
      points: 1,
      body: `$a = 1$, $b = -4$, $c = -2$:

$$D = 16 + 8 = 24.$$

$$x_{1,2} = \\dfrac{4 \\pm \\sqrt{24}}{2} = 2 \\pm \\sqrt{6}.$$

$$x_1 = 2 + \\sqrt{6} \\approx 4{,}449, \\qquad x_2 = 2 - \\sqrt{6} \\approx -0{,}449.$$`,
      figure: () => <EqFigure step={2} />,
    },
    {
      title: '5. lépés — Hamisgyökök kiszűrése',
      points: 1,
      body: `Az ÉT szerint $x \\geq 1$. Ezt $x_2 \\approx -0{,}449$ **nem** teljesíti, tehát $x_2$ **hamisgyök** (a négyzetre emelés hozta be).

$x_1 \\approx 4{,}449 \\geq 1$, tehát az egyedüli megoldás: $x = 2 + \\sqrt{6}$.

**Ellenőrzés**: bal oldal $\\sqrt{2 \\cdot (2+\\sqrt{6}) + 3} = \\sqrt{7 + 2\\sqrt{6}}$. Jobb oldal $2 + \\sqrt{6} - 1 = 1 + \\sqrt{6}$. Négyzetre emelve $(1+\\sqrt{6})^2 = 1 + 2\\sqrt{6} + 6 = 7 + 2\\sqrt{6}$. ✓`,
      figure: () => <EqFigure step={3} />,
    },
  ],
  finalAnswer: { x: '$x = 2 + \\sqrt{6} \\approx 4{,}449$' },
  usedFormulas: [
    'négyzetre emelés ekvivalens ha mindkét oldal $\\geq 0$',
    'másodfokú megoldóképlet',
  ],
};

export default { meta, problem, solution };
