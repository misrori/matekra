import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-05',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'II',
  number: 5,
  title: 'Függvényanalízis — $f(x) = x^3 - 6x^2 + 9x + 2$',
  points: 16,
  topics: ['függvények'],
  difficulty: 4,
  fgvt: [
    { page: 42, note: 'polinomfüggvények' },
    { page: 47, note: 'derivált, szélsőérték (emelt)' },
  ],
  estimatedMinutes: 22,
};

/*
  f(x) = x^3 - 6x^2 + 9x + 2
  f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)
  kritikus pontok: x = 1 (lokális max), x = 3 (lokális min)
  f(1) = 1 - 6 + 9 + 2 = 6
  f(3) = 27 - 54 + 27 + 2 = 2
  f''(x) = 6x - 12 = 6(x - 2)
  inflexió: x = 2, f(2) = 8 - 24 + 18 + 2 = 4
  f(0) = 2

  Zéróhelyek: x^3 - 6x^2 + 9x + 2 = 0.  Racionális gyökpróba: x = -? Nem egyszerű.
  Lényegében 1 vagy 3 valós gyök, attól függően, hogy f(1) és f(3) előjelei ugyanazok-e.
  f(1) = 6 > 0, f(3) = 2 > 0, csak 1 valós gyök van (a minus-infinity ágról).
  f(-1) = -1 - 6 - 9 + 2 = -14  < 0
  f(0)  = 2  > 0   => zéróhely ]-1; 0[-ban.
  Pontosabb: f(-0.2) = -0.008 - 0.24 - 1.8 + 2 = -0.048 → ≈ 0 közel.
             f(-0.19) ≈ -0.0069 - 0.2166 - 1.71 + 2 ≈ 0.0665
             f(-0.196) ~ 0   -> x ≈ -0.196.
  Feladat részek (emelt):
  a) Első derivált, lokális szélsőértékek (hely, érték), jellegük. (6 pont)
  b) A monotonitás és a konvexitás vizsgálata; inflexiós pont. (5 pont)
  c) f([0; 4]) legnagyobb és legkisebb értéke. (3 pont)
  d) A [0; 4] intervallumon a görbe és az x-tengely közötti terület. (2 pont)
     Integrálás: ∫_0^4 (x^3 - 6x^2 + 9x + 2) dx  (de itt az f pozitív a teljes [0,4]-en?)
     f(0) = 2, f(1) = 6, f(2) = 4, f(3) = 2, f(4) = 64 - 96 + 36 + 2 = 6. Igen pozitív.
     F(x) = x^4/4 - 2 x^3 + 9 x^2 / 2 + 2x
     F(4) = 64 - 128 + 72 + 8 = 16
     F(0) = 0
     T = 16.
*/

function FnGraph({ step = 0 }) {
  const f = (x) => x * x * x - 6 * x * x + 9 * x + 2;
  const fp = (x) => 3 * x * x - 12 * x + 9;
  const x0 = 60, y0 = 20, w = 440, h = 320;
  const xMin = -1, xMax = 5;
  const yMin = -2, yMax = 10;
  const sx = (x) => x0 + ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y) => y0 + h - ((y - yMin) / (yMax - yMin)) * h;

  const pts = [];
  for (let i = 0; i <= 240; i++) {
    const x = xMin + ((xMax - xMin) * i) / 240;
    pts.push([x, f(x)]);
  }
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`).join(' ');

  const pts2 = [];
  for (let i = 0; i <= 240; i++) {
    const x = xMin + ((xMax - xMin) * i) / 240;
    pts2.push([x, fp(x)]);
  }
  const d2 = pts2.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`).join(' ');

  return (
    <SvgCanvas width={560} height={380} viewBox="0 0 560 380">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={2} />
      {/* integrál terület kiemelése */}
      {step === 4 && (
        <g>
          <path
            d={`M ${sx(0)} ${sy(0)} ` + pts.filter(([x]) => x >= 0 && x <= 4).map(([x, y], i) => `L ${sx(x).toFixed(1)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`).join(' ') + ` L ${sx(4)} ${sy(0)} Z`}
            fill="#fde68a"
            fillOpacity="0.6"
            stroke="none"
          />
        </g>
      )}
      <path d={d} fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      {step === 1 && <path d={d2} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />}
      {/* Lokális szélsőértékek */}
      {step >= 2 && (
        <g>
          <circle cx={sx(1)} cy={sy(6)} r="5" fill="#16a34a" />
          <text x={sx(1)} y={sy(6) - 10} fontSize="12" fill="#16a34a" textAnchor="middle">max (1; 6)</text>
          <circle cx={sx(3)} cy={sy(2)} r="5" fill="#dc2626" />
          <text x={sx(3)} y={sy(2) + 18} fontSize="12" fill="#dc2626" textAnchor="middle">min (3; 2)</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <circle cx={sx(2)} cy={sy(4)} r="5" fill="#7c3aed" />
          <text x={sx(2)} y={sy(4) - 10} fontSize="12" fill="#7c3aed" textAnchor="middle">infl. (2; 4)</text>
        </g>
      )}
      <text x="280" y="16" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#111">
        f(x) = x³ − 6x² + 9x + 2 {step === 1 ? '  (piros szaggatott: f ′(x))' : ''}
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Vizsgáljuk meg az

$$f(x) = x^3 - 6x^2 + 9x + 2, \\quad f : \\mathbb{R} \\to \\mathbb{R}$$

függvényt.

**a)** Határozza meg $f$ első deriváltját, valamint $f$ **lokális szélsőértékhelyeit** (helyük és értékük, jellegük). ($6$ pont)

**b)** Állapítsa meg $f$ **monotonitási** és **konvexitási** intervallumait, és adja meg az **inflexiós pontját**. ($5$ pont)

**c)** Határozza meg $f$ **legnagyobb** és **legkisebb** értékét a $[0;\\ 4]$ intervallumon. ($3$ pont)

**d)** Számítsa ki a görbe és az $x$-tengely által bezárt területet a $[0;\\ 4]$ intervallumon. ($2$ pont)`,
  figure: () => <FnGraph step={0} />,
  asked: [
    { key: 'a', label: 'a) $f\'$, szélsőértékek' },
    { key: 'b', label: 'b) monotonitás, konvexitás, inflexió' },
    { key: 'c', label: 'c) max és min a [0;4]-en' },
    { key: 'd', label: 'd) terület' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — Az első derivált kiszámítása',
      points: 1,
      body: `Hatványfüggvények deriválási szabálya: $(x^n)' = n \\cdot x^{n-1}$, a konstans deriváltja 0.

$$f'(x) = 3 x^2 - 12 x + 9.$$`,
    },
    {
      title: 'a) 2. lépés — $f\'(x) = 0$ megoldása',
      points: 1,
      body: `$$3x^2 - 12x + 9 = 0 \\iff x^2 - 4x + 3 = 0.$$

Faktorizálva:

$$(x - 1)(x - 3) = 0 \\Rightarrow x_1 = 1, \\quad x_2 = 3.$$`,
      figure: () => <FnGraph step={1} />,
    },
    {
      title: 'a) 3. lépés — Előjelelemzés és jelleg',
      points: 2,
      body: `$f'(x) = 3(x-1)(x-3)$ parabola, $a = 3 > 0$, gyökei $1$ és $3$.

- $x < 1$ esetén $f'(x) > 0$ — $f$ **növekvő**.
- $1 < x < 3$ esetén $f'(x) < 0$ — $f$ **csökkenő**.
- $x > 3$ esetén $f'(x) > 0$ — $f$ **növekvő**.

Tehát $x = 1$-nél **lokális maximum**, $x = 3$-nál **lokális minimum**.`,
    },
    {
      title: 'a) 4. lépés — A szélsőértékek kiszámítása',
      points: 2,
      body: `$$f(1) = 1 - 6 + 9 + 2 = 6.$$
$$f(3) = 27 - 54 + 27 + 2 = 2.$$

$$\\boxed{\\text{Lokális max: } (1;\\ 6), \\qquad \\text{Lokális min: } (3;\\ 2).}$$`,
      figure: () => <FnGraph step={2} />,
    },
    {
      title: 'b) 1. lépés — Monotonitási intervallumok',
      points: 1,
      body: `Az előjelelemzésből (l. a/3):

- $f$ **szigorúan növő** az $(-\\infty;\\ 1]$ és $[3;\\ +\\infty)$ zárt intervallumokon.
- $f$ **szigorúan csökkenő** a $[1;\\ 3]$ intervallumon.`,
    },
    {
      title: 'b) 2. lépés — A második derivált',
      points: 1,
      body: `$$f''(x) = 6x - 12 = 6(x - 2).$$

- $f''(x) < 0$ ha $x < 2$ — $f$ **konkáv** a $(-\\infty;\\ 2)$-n.
- $f''(x) > 0$ ha $x > 2$ — $f$ **konvex** a $(2;\\ +\\infty)$-en.

Az előjel $x = 2$-nél vált, és $f$ folytonos, tehát **inflexiós pont** van $x = 2$-nél.`,
    },
    {
      title: 'b) 3. lépés — Az inflexiós pont és összefoglaló',
      points: 3,
      body: `$$f(2) = 8 - 24 + 18 + 2 = 4.$$

$$\\boxed{\\text{Inflexiós pont: } (2;\\ 4).}$$

**Összefoglaló:**
- Monotonitás: $\\nearrow$ a $(-\\infty; 1]$ és $[3; +\\infty)$-en, $\\searrow$ a $[1; 3]$-on.
- Konvexitás: konkáv $(-\\infty; 2)$, konvex $(2; +\\infty)$.
- Inflexió: $(2;\\ 4)$.`,
      figure: () => <FnGraph step={3} />,
    },
    {
      title: 'c) 1. lépés — A jelölt pontok a $[0;\\ 4]$-en',
      points: 1,
      body: `Egy folytonos függvény zárt intervallumon felveszi legnagyobb és legkisebb értékét — az **intervallum belsejében lévő kritikus pontokban**, vagy az **intervallum végpontjaiban**.

A $[0; 4]$-en lévő kritikus pontok: $x = 1$ és $x = 3$ (mindkettő belül).
A végpontok: $x = 0$ és $x = 4$.

Tehát 4 értéket kell összehasonlítanunk.`,
    },
    {
      title: 'c) 2. lépés — A függvényértékek',
      points: 1,
      body: `$$f(0) = 0 - 0 + 0 + 2 = 2.$$
$$f(1) = 6 \\quad \\text{(a)-ból).}$$
$$f(3) = 2 \\quad \\text{(a)-ból).}$$
$$f(4) = 64 - 96 + 36 + 2 = 6.$$`,
    },
    {
      title: 'c) 3. lépés — A legnagyobb és legkisebb érték',
      points: 1,
      body: `Az értékek: $\\{2,\\ 6,\\ 2,\\ 6\\}$.

- **Maximum**: $6$, felvéve $x = 1$ és $x = 4$-ben.
- **Minimum**: $2$, felvéve $x = 0$ és $x = 3$-ban.

$$\\boxed{\\max_{[0;4]} f = 6 \\quad \\text{(}x=1\\text{ és }x=4\\text{)},\\quad \\min_{[0;4]} f = 2 \\quad \\text{(}x=0\\text{ és }x=3\\text{)}.}$$`,
    },
    {
      title: 'd) 1. lépés — A terület, mint integrál',
      points: 1,
      body: `A görbe az $[0;\\ 4]$-en **végig pozitív** (a minimum is $2$), tehát a görbe és az $x$-tengely által bezárt terület egyenlő az

$$T = \\int_{0}^{4} f(x)\\, dx = \\int_{0}^{4} \\bigl(x^3 - 6x^2 + 9x + 2 \\bigr)\\, dx$$

integrállal.`,
      figure: () => <FnGraph step={4} />,
    },
    {
      title: 'd) 2. lépés — Antiderivált és behelyettesítés',
      points: 1,
      body: `$$F(x) = \\dfrac{x^4}{4} - 2 x^3 + \\dfrac{9 x^2}{2} + 2 x.$$

$F(4)$ kiszámítása tagonként:
$\\frac{256}{4} - 2 \\cdot 64 + \\frac{9 \\cdot 16}{2} + 8 = 64 - 128 + 72 + 8 = 16.$

$F(0) = 0$.

$$T = F(4) - F(0) = 16 - 0 = 16.$$

$$\\boxed{T = 16 \\text{ területegység.}}$$`,
    },
  ],
  finalAnswer: {
    a: "$f'(x) = 3x^2 - 12x + 9$. Lokális max: $(1;\\ 6)$, lokális min: $(3;\\ 2)$.",
    b: 'Monotonitás: $\\nearrow$ $(-\\infty;1]\\cup[3;\\infty)$, $\\searrow$ $[1;3]$. Konkáv: $(-\\infty;2)$; konvex: $(2;\\infty)$. Inflexió: $(2;\\ 4)$.',
    c: '$\\max = 6$ ($x=1$ vagy $x=4$); $\\min = 2$ ($x=0$ vagy $x=3$).',
    d: '$T = 16$',
  },
  usedFormulas: [
    'hatványfüggvény deriválása',
    "elsőrendű szükséges feltétel: $f'(x)=0$",
    "második derivált előjele $\\Rightarrow$ konvexitás",
    'integrálás, Newton–Leibniz',
  ],
};

export default { meta, problem, solution };
