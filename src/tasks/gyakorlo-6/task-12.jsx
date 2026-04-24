import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-12',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 12,
  title: 'Másodfokú függvény — zéróhelyek',
  points: 3,
  topics: ['függvények', 'egyenletek'],
  difficulty: 2,
  fgvt: [{ page: 41, note: 'másodfokú függvény' }],
  estimatedMinutes: 4,
  // f(x) = x^2 - 4x - 5 = (x-5)(x+1) → x = 5 vagy -1. A pozitív gyök: 5.
  check: { type: 'number', value: 5 },
};

function ParabolaFigure({ highlight = 'none' }) {
  const f = (x) => x * x - 4 * x - 5;
  const xMin = -3, xMax = 7, yMin = -12, yMax = 10;
  const plot = { x: 50, y: 30, w: 440, h: 260 };
  const sx = (v) => plot.x + ((v - xMin) / (xMax - xMin)) * plot.w;
  const sy = (v) => plot.y + plot.h - ((v - yMin) / (yMax - yMin)) * plot.h;
  const pts = [];
  for (let x = xMin; x <= xMax; x += 0.1) pts.push(`${sx(x)},${sy(f(x))}`);
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes x={plot.x} y={plot.y} w={plot.w} h={plot.h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={2} xLabel="x" yLabel="y" grid />
      <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" points={pts.join(' ')} />
      <circle cx={sx(-1)} cy={sy(0)} r="6" fill={highlight === 'roots' ? '#dc2626' : '#16a34a'} />
      <circle cx={sx(5)} cy={sy(0)} r="6" fill={highlight === 'roots' ? '#dc2626' : '#16a34a'} />
      <text x={sx(-1) - 6} y={sy(0) - 10} fontSize="13" fontWeight="700" textAnchor="end" fill="#111827">x=−1</text>
      <text x={sx(5) + 6} y={sy(0) - 10} fontSize="13" fontWeight="700" fill="#111827">x=5</text>
      <circle cx={sx(2)} cy={sy(-9)} r="5" fill="#b45309" />
      <text x={sx(2) + 8} y={sy(-9) + 4} fontSize="12" fill="#b45309">csúcs: (2;−9)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott az $f: \\mathbb{R} \\to \\mathbb{R}, \\quad f(x) = x^2 - 4x - 5$ másodfokú függvény.

**a)** Határozza meg a függvény **zérushelyeit**!

**b)** A pozitív zérushely pontos értékét adja meg!`,
  figure: () => <ParabolaFigure />,
  asked: [
    { key: 'roots', label: 'a) zérushelyek: $?$' },
    { key: 'posRoot', label: 'b) pozitív zérushely: $?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A másodfokú egyenlet',
      points: 1,
      body: `A zérushelyek ott vannak, ahol $f(x) = 0$:

$$x^2 - 4x - 5 = 0.$$

Használjuk a megoldóképletet:

$$x_{1,2} = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.$$

$a = 1$, $b = -4$, $c = -5$.`,
      figure: () => <ParabolaFigure />,
    },
    {
      title: '2. lépés — Diszkrimináns és gyökök',
      points: 1,
      body: `$$D = (-4)^2 - 4 \\cdot 1 \\cdot (-5) = 16 + 20 = 36.$$

$$x_{1,2} = \\dfrac{4 \\pm \\sqrt{36}}{2} = \\dfrac{4 \\pm 6}{2}.$$

$$x_1 = \\dfrac{10}{2} = 5, \\qquad x_2 = \\dfrac{-2}{2} = -1.$$`,
      figure: () => <ParabolaFigure highlight="roots" />,
    },
    {
      title: '3. lépés — Faktorizálás-ellenőrzés',
      points: 1,
      body: `A gyökök ismeretében a függvény szorzattá alakítható:

$$f(x) = (x - 5)(x + 1).$$

Visszabontva: $x^2 + x - 5x - 5 = x^2 - 4x - 5$. ✓

A **pozitív** zérushely tehát $x = 5$.`,
      figure: () => <ParabolaFigure highlight="roots" />,
    },
  ],
  finalAnswer: {
    roots: '$x_1 = 5$, $x_2 = -1$',
    posRoot: '$x = 5$',
  },
  usedFormulas: [
    'másodfokú megoldóképlet',
    'diszkrimináns: $D = b^2 - 4ac$',
  ],
};

export default { meta, problem, solution };
