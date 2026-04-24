import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-15',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'II.A',
  number: 15,
  title: 'Másodfokú függvény — csúcspont, zérushelyek, terület',
  points: 12,
  topics: ['függvények', 'egyenletek', 'síkgeometria'],
  difficulty: 4,
  fgvt: [{ page: 41, note: 'másodfokú függvény' }],
  estimatedMinutes: 16,
};

// f(x) = -x^2 + 6x - 5, tehát a = -1, b = 6, c = -5.
// a) zérushelyek: x^2 - 6x + 5 = 0 → (x-1)(x-5)=0 → x=1, x=5.
// b) csúcs: x0 = -b/(2a) = -6/-2 = 3. f(3) = -9+18-5 = 4. Csúcs: (3, 4). Maximum, mert a<0.
// c) y-tengelymetszet: f(0) = -5.
// d) a parabola ÉS az x-tengely által bezárt terület — középszinten ritkán, de: háromszög-szerű közelítés?
//    Inkább: f(x) = -x^2 + 6x - 5 grafikonja és a P_1(1,0), P_2(5,0), V(3,4) pontok — háromszög területe T = (1/2)·4·4 = 8. (Alap = 5-1 = 4, magasság 4.)

function ParabolaFigure({ highlight = 'none' }) {
  const f = (x) => -x * x + 6 * x - 5;
  const xMin = -1, xMax = 7, yMin = -6, yMax = 6;
  const plot = { x: 50, y: 30, w: 440, h: 280 };
  const sx = (v) => plot.x + ((v - xMin) / (xMax - xMin)) * plot.w;
  const sy = (v) => plot.y + plot.h - ((v - yMin) / (yMax - yMin)) * plot.h;
  const pts = [];
  for (let x = xMin; x <= xMax; x += 0.1) pts.push(`${sx(x)},${sy(f(x))}`);
  const P1 = { x: 1, y: 0 };
  const P2 = { x: 5, y: 0 };
  const V = { x: 3, y: 4 };
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <Axes x={plot.x} y={plot.y} w={plot.w} h={plot.h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={1} xLabel="x" yLabel="y" grid />
      {highlight === 'triangle' && (
        <polygon points={`${sx(P1.x)},${sy(P1.y)} ${sx(P2.x)},${sy(P2.y)} ${sx(V.x)},${sy(V.y)}`} fill="#fde68a" fillOpacity="0.65" stroke="#b45309" strokeWidth="1.5" />
      )}
      <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" points={pts.join(' ')} />
      {/* Zéróhelyek */}
      <circle cx={sx(P1.x)} cy={sy(P1.y)} r="5" fill="#16a34a" />
      <circle cx={sx(P2.x)} cy={sy(P2.y)} r="5" fill="#16a34a" />
      <text x={sx(P1.x)} y={sy(P1.y) + 18} fontSize="12" textAnchor="middle" fill="#111827">x=1</text>
      <text x={sx(P2.x)} y={sy(P2.y) + 18} fontSize="12" textAnchor="middle" fill="#111827">x=5</text>
      {/* Csúcs */}
      <circle cx={sx(V.x)} cy={sy(V.y)} r="6" fill="#dc2626" />
      <text x={sx(V.x) + 8} y={sy(V.y) - 8} fontSize="13" fontWeight="700" fill="#dc2626">V(3;4)</text>
      {/* y-tengelymetszet */}
      <circle cx={sx(0)} cy={sy(-5)} r="5" fill="#9333ea" />
      <text x={sx(0) - 6} y={sy(-5) + 5} fontSize="12" textAnchor="end" fill="#9333ea">(0;−5)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott az $f: \\mathbb{R} \\to \\mathbb{R}, \\quad f(x) = -x^2 + 6x - 5$ másodfokú függvény.

**a)** Határozza meg a függvény **zérushelyeit**! ($3$ pont)

**b)** Adja meg a parabola **csúcspontját**, és állapítsa meg, hogy ott lokális minimum vagy maximum van. ($4$ pont)

**c)** Adja meg a függvény **értékkészletét** ($\\text{Rf}$)! ($2$ pont)

**d)** A parabola és az $x$-tengely által közrezárt tartományba beírt **háromszög** (a két zérushely és a csúcs csúcspontjaival) területét számítsa ki! ($3$ pont)`,
  figure: () => <ParabolaFigure />,
  asked: [
    { key: 'roots', label: 'a) zérushelyek: $?$' },
    { key: 'V', label: 'b) csúcs: $?$' },
    { key: 'Rf', label: 'c) $\\text{Rf} = ?$' },
    { key: 'T', label: 'd) $T = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — Az $f(x) = 0$ egyenlet',
      points: 1,
      body: `$-x^2 + 6x - 5 = 0$ — szorozzuk $-1$-gyel:

$$x^2 - 6x + 5 = 0.$$

Keressünk szorzattá alakítást: olyan $p, q$, amelyre $p + q = 6$, $p \\cdot q = 5$. Egyértelmű: $p = 1$, $q = 5$.

$$x^2 - 6x + 5 = (x - 1)(x - 5) = 0.$$`,
      figure: () => <ParabolaFigure />,
    },
    {
      title: 'a) 2. lépés — A zérushelyek',
      points: 2,
      body: `$$x_1 = 1, \\quad x_2 = 5.$$

(Ellenőrzés a megoldóképlettel: $D = 36 - 20 = 16$, $x = (6 \\pm 4)/2 = 5$ vagy $1$ ✓.)`,
      figure: () => <ParabolaFigure />,
    },

    {
      title: 'b) 1. lépés — A csúcspont $x$-koordinátája',
      points: 2,
      body: `A másodfokú függvény csúcspontjának $x$-koordinátája:

$$x_0 = -\\dfrac{b}{2a}.$$

Itt $a = -1$, $b = 6$:

$$x_0 = -\\dfrac{6}{2 \\cdot (-1)} = -\\dfrac{6}{-2} = 3.$$`,
      figure: () => <ParabolaFigure />,
    },
    {
      title: 'b) 2. lépés — A csúcs $y$-koordinátája és típusa',
      points: 2,
      body: `$$f(3) = -9 + 18 - 5 = 4.$$

A csúcs: $V(3;\\ 4)$.

Mivel $a = -1 < 0$, a parabola **lefelé** nyílik, tehát ez **maximum**.`,
      figure: () => <ParabolaFigure />,
    },

    {
      title: 'c) Értékkészlet',
      points: 2,
      body: `A lefelé nyíló parabola legnagyobb értéke $4$, lefelé pedig $-\\infty$-ig megy:

$$\\text{Rf} = (-\\infty;\\ 4\\,].$$`,
      figure: () => <ParabolaFigure />,
    },

    {
      title: 'd) 1. lépés — A háromszög csúcsai',
      points: 1,
      body: `A háromszög csúcspontjai: $P_1(1;\\ 0)$, $P_2(5;\\ 0)$, $V(3;\\ 4)$.

Az alap az $x$-tengelyen van, hossza:

$$|P_1 P_2| = 5 - 1 = 4.$$

A hozzá tartozó magasság a $V$ csúcs távolsága az $x$-tengelytől: $4$.`,
      figure: () => <ParabolaFigure highlight="triangle" />,
    },
    {
      title: 'd) 2. lépés — A terület',
      points: 2,
      body: `$$T = \\dfrac{\\text{alap} \\cdot \\text{magasság}}{2} = \\dfrac{4 \\cdot 4}{2} = 8.$$

A háromszög területe **$8$ területegység**.`,
      figure: () => <ParabolaFigure highlight="triangle" />,
    },
  ],
  finalAnswer: {
    roots: '$x_1 = 1$, $x_2 = 5$',
    V: '$V(3;\\ 4)$ — maximum',
    Rf: '$\\text{Rf} = (-\\infty;\\ 4]$',
    T: '$T = 8$',
  },
  usedFormulas: [
    'másodfokú egyenlet szorzattá alakítása',
    'csúcspont: $x_0 = -b/(2a)$',
    'háromszög területe: $T = ah/2$',
  ],
};

export default { meta, problem, solution };
