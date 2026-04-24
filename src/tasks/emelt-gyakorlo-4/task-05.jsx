import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-4-05',
  year: 2024,
  session: 'emelt gyakorló · 4. teszt',
  level: 'emelt',
  part: 'II',
  number: 5,
  title: 'Harmadfokú polinom elemzése deriválással',
  points: 16,
  topics: ['függvények', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 41, note: 'másodfokú függvény' },
    { page: 27, note: 'deriválás (emelt)' },
  ],
  estimatedMinutes: 25,
};

/**
 *  f(x) = x^3 - 6x^2 + 9x + 2
 *
 *  f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)
 *  Kritikus pontok: x=1, x=3
 *
 *  Monotonitás:
 *    x < 1 -> f' > 0 (szig. nő)
 *    1 < x < 3 -> f' < 0 (szig. fogy)
 *    x > 3 -> f' > 0 (szig. nő)
 *
 *  Lokális max (x=1): f(1) = 1 - 6 + 9 + 2 = 6
 *  Lokális min (x=3): f(3) = 27 - 54 + 27 + 2 = 2
 *
 *  f''(x) = 6x - 12
 *  Inflexiós pont: x = 2, f(2) = 8 - 24 + 18 + 2 = 4
 *  Érintő az inflexiós pontban: f'(2) = 3*4 - 24 + 9 = 12 - 24 + 9 = -3
 *  y - 4 = -3(x - 2) -> y = -3x + 10
 *
 *  Értékkészlet [0;4]:
 *    f(0) = 2, f(1) = 6, f(3) = 2, f(4) = 64 - 96 + 36 + 2 = 6
 *    max a [0;4]-en: 6 (x=1 vagy x=4), min: 2 (x=0 vagy x=3)
 *    Értékkészlet: [2; 6]
 */

function FPlot({ show = 'all' }) {
  const x0 = 50, y0 = 30, w = 430, h = 260;
  const xMin = -1, xMax = 5;
  const yMin = -2, yMax = 8;
  const sx = (v) => x0 + ((v - xMin) / (xMax - xMin)) * w;
  const sy = (v) => y0 + h - ((v - yMin) / (yMax - yMin)) * h;

  const f = (x) => x ** 3 - 6 * x ** 2 + 9 * x + 2;
  const df = (x) => 3 * x ** 2 - 12 * x + 9;
  const pts = [];
  for (let i = 0; i <= 180; i++) {
    const x = xMin + ((xMax - xMin) * i) / 180;
    pts.push([x, f(x)]);
  }
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`).join(' ');

  // f' plot (optional)
  const dpts = [];
  for (let i = 0; i <= 180; i++) {
    const x = xMin + ((xMax - xMin) * i) / 180;
    dpts.push([x, df(x) / 3]);   // /3 hogy skálába férjen
  }
  const dpath = dpts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`).join(' ');

  // tangent at inflection point (x=2, y=4), slope -3
  const tang = [-1, 5].map((x) => [x, -3 * x + 10]);

  return (
    <SvgCanvas width={520} height={330} viewBox="0 0 520 330">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={1} />
      <path d={path} fill="none" stroke="#1d4ed8" strokeWidth="2.5" />

      {show === 'derivative' && (
        <path d={dpath} fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
      )}

      {show === 'extrema' && (
        <g>
          <circle cx={sx(1)} cy={sy(6)} r="5" fill="#dc2626" />
          <text x={sx(1) + 8} y={sy(6) - 6} fontSize="12" fill="#7f1d1d" fontWeight="700">max (1; 6)</text>
          <circle cx={sx(3)} cy={sy(2)} r="5" fill="#2563eb" />
          <text x={sx(3) + 8} y={sy(2) - 6} fontSize="12" fill="#1e3a8a" fontWeight="700">min (3; 2)</text>
        </g>
      )}

      {show === 'inflection' && (
        <g>
          <circle cx={sx(2)} cy={sy(4)} r="6" fill="#7c3aed" />
          <text x={sx(2) + 8} y={sy(4) - 6} fontSize="12" fill="#4c1d95" fontWeight="700">infl. (2; 4)</text>
          <line x1={sx(tang[0][0])} y1={sy(tang[0][1])} x2={sx(tang[1][0])} y2={sy(tang[1][1])} stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(4)} y={sy(-2) + 16} fontSize="12" fill="#4c1d95" fontWeight="700">y = −3x + 10</text>
        </g>
      )}

      {show === 'range' && (
        <g>
          <rect x={sx(0)} y={y0} width={sx(4) - sx(0)} height={h} fill="#fde68a" fillOpacity="0.3" />
          <circle cx={sx(0)} cy={sy(2)} r="4" fill="#16a34a" />
          <circle cx={sx(1)} cy={sy(6)} r="4" fill="#dc2626" />
          <circle cx={sx(3)} cy={sy(2)} r="4" fill="#16a34a" />
          <circle cx={sx(4)} cy={sy(6)} r="4" fill="#dc2626" />
          <text x={sx(4) + 4} y={sy(6) + 4} fontSize="12" fill="#7f1d1d">y=6</text>
          <text x={sx(3) - 30} y={sy(2) + 4} fontSize="12" fill="#166534">y=2</text>
        </g>
      )}

      <text x={260} y={18} fontSize="14" fontWeight="700" fill="#111" textAnchor="middle">
        f(x) = x³ − 6x² + 9x + 2
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Legyen $f \\colon \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^3 - 6x^2 + 9x + 2$.

**a)** Számítsa ki $f$ deriváltját és adja meg a kritikus pontjait! Hol szigorúan növekvő, hol szigorúan csökkenő a függvény? ($4$ pont)

**b)** Adja meg a lokális szélsőértékek helyét és értékét! ($3$ pont)

**c)** Határozza meg $f$ **inflexiós pontját**! ($3$ pont)

**d)** Írja fel $f$ **érintő egyenesének** egyenletét az inflexiós pontban! ($3$ pont)

**e)** Adja meg $f$ értékkészletét a $[0;\\ 4]$ intervallumon! ($3$ pont)`,
  figure: () => <FPlot show="all" />,
  asked: [
    { key: 'a', label: 'a) $f\'$, monotonitás' },
    { key: 'b', label: 'b) lok. max/min' },
    { key: 'c', label: 'c) inflexiós pont' },
    { key: 'd', label: 'd) érintő egyenes' },
    { key: 'e', label: 'e) értékkészlet [0;4]' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Deriválás',
      points: 1,
      body: `A polinom tagonkénti deriválása ($(x^n)' = n x^{n-1}$, konstans deriváltja $0$):

$$f'(x) = 3x^2 - 12 x + 9.$$

Kiemelhető **$3$**:

$$f'(x) = 3\\,(x^2 - 4x + 3) = 3\\,(x - 1)(x - 3).$$`,
    },
    {
      title: 'a/2. lépés — Kritikus pontok',
      points: 1,
      body: `$f'(x) = 0 \\Leftrightarrow (x-1)(x-3) = 0 \\Leftrightarrow x = 1 \\text{ vagy } x = 3.$

Tehát **két** kritikus pont van: $x_1 = 1$ és $x_2 = 3$.`,
    },
    {
      title: 'a/3. lépés — Előjelvizsgálat (monotonitás)',
      points: 2,
      body: `$f'(x) = 3(x-1)(x-3)$ egy **fölfelé nyíló parabola**, nullhelyei $1$ és $3$.

| intervallum | $(x-1)$ | $(x-3)$ | $f'(x)$ előjele | $f$ viselkedése |
|---|---|---|---|---|
| $x < 1$ | $-$ | $-$ | $+$ | **szigorúan növekvő** |
| $1 < x < 3$ | $+$ | $-$ | $-$ | **szigorúan csökkenő** |
| $x > 3$ | $+$ | $+$ | $+$ | **szigorúan növekvő** |

$$\\boxed{f\\ \\text{nő: } x \\in (-\\infty; 1] \\cup [3; +\\infty), \\quad f\\ \\text{csökken: } x \\in [1; 3].}$$`,
      figure: () => <FPlot show="derivative" />,
    },
    {
      title: 'b) lépés — Lokális szélsőértékek',
      points: 3,
      body: `Az előjelváltásokból közvetlenül leolvasható:

- $x = 1$-nél $f'$ $+ \\to -$ váltást mutat → **lokális maximum**.
- $x = 3$-nál $f'$ $- \\to +$ váltást mutat → **lokális minimum**.

Értékek:

$$f(1) = 1 - 6 + 9 + 2 = 6.$$
$$f(3) = 27 - 54 + 27 + 2 = 2.$$

$$\\boxed{\\text{lok. max: } (1;\\ 6), \\quad \\text{lok. min: } (3;\\ 2).}$$`,
      figure: () => <FPlot show="extrema" />,
    },
    {
      title: 'c/1. lépés — Második derivált',
      points: 1,
      body: `$f''$ az $f'$ deriváltja:

$$f''(x) = (3x^2 - 12x + 9)' = 6x - 12.$$`,
    },
    {
      title: 'c/2. lépés — Az inflexiós pont',
      points: 2,
      body: `Az **inflexiós pont** az, ahol $f''(x) = 0$ és a görbület előjelet vált.

$$6x - 12 = 0 \\;\\Longrightarrow\\; x = 2.$$

$f''(x) < 0$ ha $x < 2$ (konkáv), $f''(x) > 0$ ha $x > 2$ (konvex). Előjelváltás van, tehát valódi inflexiós pont.

$$f(2) = 8 - 24 + 18 + 2 = 4.$$

$$\\boxed{\\text{inflexiós pont: } (2;\\ 4).}$$`,
      figure: () => <FPlot show="inflection" />,
    },
    {
      title: 'd) lépés — Érintő egyenes az inflexiós pontban',
      points: 3,
      body: `Az érintő **meredeksége** a deriváltérték az adott pontban:

$$f'(2) = 3 \\cdot 4 - 12 \\cdot 2 + 9 = 12 - 24 + 9 = -3.$$

Az érintő egyenlete (pont–meredekség alak): $y - y_0 = m(x - x_0)$, ahol $(x_0;y_0) = (2;4)$, $m = -3$:

$$y - 4 = -3(x - 2) \\;\\Longrightarrow\\; y = -3x + 6 + 4 \\;\\Longrightarrow\\; y = -3x + 10.$$

$$\\boxed{y = -3x + 10.}$$

**Érdekesség:** az inflexiós pontban a görbület **előjelet** vált, ezért az érintő **átszeli** a görbét — szemben a sima konvex/konkáv tartományokkal, ahol csak érinti.`,
    },
    {
      title: 'e/1. lépés — A határértékek vizsgálata',
      points: 1,
      body: `A $[0;\\ 4]$ zárt intervallumon $f$ folytonos, tehát **Weierstrass-tétel** alapján felveszi szélsőértékeit. Azok vagy a belső kritikus pontokban ($x=1, x=3$), vagy a végpontokban ($x=0, x=4$) lehetnek.`,
    },
    {
      title: 'e/2. lépés — Értékek a négy pontban',
      points: 2,
      body: `$f(0) = 0 - 0 + 0 + 2 = 2.$

$f(1) = 6$ (b részből).

$f(3) = 2$ (b részből).

$f(4) = 64 - 96 + 36 + 2 = 6.$

A legnagyobb érték $6$ (mégpedig **két** helyen: $x=1$ és $x=4$), a legkisebb $2$ (két helyen: $x=0$ és $x=3$).

Mivel $f$ folytonos, minden közbenső értéket is felvesz:

$$\\boxed{\\text{értékkészlet } [0;4]\\text{-en: } [2;\\ 6].}$$`,
      figure: () => <FPlot show="range" />,
    },
  ],
  finalAnswer: {
    a: '$f\'(x) = 3(x-1)(x-3)$; nő: $(-\\infty,1] \\cup [3,\\infty)$; csökken: $[1;3]$',
    b: 'max $(1;6)$, min $(3;2)$',
    c: 'inflexiós pont: $(2;\\ 4)$',
    d: '$y = -3x + 10$',
    e: '$[2;\\ 6]$',
  },
  usedFormulas: [
    'polinom deriválás',
    'kritikus pont: $f\'(x)=0$',
    'inflexiós pont: $f\'\'(x)=0$ + előjelváltás',
    'érintő: $y - y_0 = f\'(x_0)(x - x_0)$',
    'Weierstrass-tétel (zárt int. folyt. fgv.)',
  ],
};

export default { meta, problem, solution };
