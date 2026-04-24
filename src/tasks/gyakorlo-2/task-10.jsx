import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-10',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 10,
  title: 'Függvény — másodfokú zéróhely és ábrázolás',
  points: 2,
  topics: ['függvények', 'egyenletek'],
  difficulty: 2,
  fgvt: [
    { page: 41, note: 'másodfokú függvény' },
    { page: 27, note: 'másodfokú egyenlet' },
  ],
  estimatedMinutes: 4,
};

// f(x) = x^2 - 4x + 3 = (x-1)(x-3)
// zéróhelyek: x=1, x=3
// tengelypont: x0 = 2, f(2) = 4 - 8 + 3 = -1
// y-tengelymetszet: f(0) = 3

function Parabola({ step = 0 }) {
  const ax = { x: 60, y: 30, w: 380, h: 260, xMin: -1, xMax: 5, yMin: -2, yMax: 5 };
  const sx = (v) => ax.x + ((v - ax.xMin) / (ax.xMax - ax.xMin)) * ax.w;
  const sy = (v) => ax.y + ax.h - ((v - ax.yMin) / (ax.yMax - ax.yMin)) * ax.h;
  const f = (x) => x * x - 4 * x + 3;
  // Görbe pontok
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const x = ax.xMin + (i / 60) * (ax.xMax - ax.xMin);
    const y = f(x);
    if (y >= ax.yMin - 1 && y <= ax.yMax + 1) pts.push([x, y]);
  }
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`).join(' ');
  return (
    <SvgCanvas width={480} height={320} viewBox="0 0 480 320">
      <Axes x={ax.x} y={ax.y} w={ax.w} h={ax.h} xMin={ax.xMin} xMax={ax.xMax} yMin={ax.yMin} yMax={ax.yMax} xStep={1} yStep={1} />
      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* Zéróhelyek */}
      {step >= 2 && (
        <g>
          <circle cx={sx(1)} cy={sy(0)} r="6" fill="#dc2626" />
          <circle cx={sx(3)} cy={sy(0)} r="6" fill="#dc2626" />
          <text x={sx(1)} y={sy(0) + 20} fontSize="12" textAnchor="middle" fill="#b91c1c" fontWeight="bold">x₁ = 1</text>
          <text x={sx(3)} y={sy(0) + 20} fontSize="12" textAnchor="middle" fill="#b91c1c" fontWeight="bold">x₂ = 3</text>
        </g>
      )}
      {/* Tengelypont */}
      {step >= 3 && (
        <g>
          <circle cx={sx(2)} cy={sy(-1)} r="5" fill="#16a34a" />
          <text x={sx(2) + 8} y={sy(-1) + 18} fontSize="12" fill="#166534" fontWeight="bold">min: (2; -1)</text>
        </g>
      )}

      <text x="260" y="20" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">
        f(x) = x² − 4x + 3
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott a valós számokon értelmezett függvény:

$$f(x) = x^2 - 4x + 3.$$

**a)** Számítsa ki a függvény **zéróhelyeit** (azokat az $x$ értékeket, amelyekre $f(x) = 0$)!

**b)** Határozza meg a függvény **minimumát** (a parabola tengelypontját)!`,
  figure: () => <Parabola step={0} />,
  asked: [
    { key: 'zero', label: 'a) Zéróhelyek = ?' },
    { key: 'min', label: 'b) Minimum (x₀; y_min) = ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Zéróhelyek szorzattá alakítással',
      points: 1,
      body: `A zéróhely-feltétel: $f(x) = 0$, azaz $x^2 - 4x + 3 = 0$.

Gyökök kereséséhez szorzattá alakítunk — két olyan számot keresünk, amelyek összege $-(-4) = 4$, szorzatuk $3$: ezek az $1$ és a $3$:

$$x^2 - 4x + 3 = (x - 1)(x - 3) = 0.$$

Szorzat akkor nulla, ha valamelyik tényező nulla:

$$x_1 = 1, \\qquad x_2 = 3.$$

**Ellenőrzés diszkriminánssal** ($a=1$, $b=-4$, $c=3$):

$$D = b^2 - 4ac = 16 - 12 = 4, \\quad x_{1,2} = \\dfrac{4 \\pm 2}{2} = 3 \\text{ vagy } 1. \\ \\checkmark$$`,
      figure: () => <Parabola step={2} />,
    },
    {
      title: 'b) lépés — A tengelypont (minimum helye)',
      points: 1,
      body: `Mivel $a = 1 > 0$, a parabola **felfelé nyílik**, tehát **minimuma** van. A tengelypont $x$-koordinátája:

$$x_0 = -\\dfrac{b}{2a} = -\\dfrac{-4}{2 \\cdot 1} = 2.$$

Behelyettesítéssel:

$$f(2) = 2^2 - 4 \\cdot 2 + 3 = 4 - 8 + 3 = -1.$$

Tehát a minimum $\\boxed{(2;\\ -1)}$, és $f$ minimális értéke $-1$.

Megjegyzés: a zéróhelyek szimmetrikusak a tengelypontra, $x_0 = \\dfrac{x_1 + x_2}{2} = \\dfrac{1+3}{2} = 2$ — egyezik.`,
      figure: () => <Parabola step={3} />,
    },
  ],
  finalAnswer: {
    zero: '$x_1 = 1,\\ x_2 = 3$',
    min: '$(2;\\ -1)$',
  },
  usedFormulas: [
    'másodfokú egyenlet: $ax^2 + bx + c = 0$ megoldóképlet',
    'szorzattá alakítás',
    'parabola tengelypontja: $x_0 = -b/(2a)$',
  ],
};

export default { meta, problem, solution };
