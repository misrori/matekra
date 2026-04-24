import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-15',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.A',
  number: 15,
  title: 'Másodfokú függvény teljes elemzése',
  points: 12,
  topics: ['függvények'],
  difficulty: 4,
  fgvt: [{ page: 41, note: 'másodfokú függvény, tengelypont' }],
  estimatedMinutes: 20,
};

// f(x) = -x² + 6x - 5
// Zérus: x = (−6 ± √(36 - 20)) / -2 = (−6 ± 4)/−2 → x = 1, x = 5.
// Tengelypont: x0 = -b/(2a) = -6/(-2) = 3. f(3) = -9 + 18 - 5 = 4.
// a = -1 < 0 → max függvény, max = 4.
// y-tengelymetszet: f(0) = -5.
// Csökkenő [3, +inf), növekvő (-inf, 3].
// Értékkészlet: (-∞, 4].
function Parabola15({ show = 'all' }) {
  const xMin = -1, xMax = 7, yMin = -7, yMax = 6;
  const sx = (v) => 60 + ((v - xMin) / (xMax - xMin)) * 400;
  const sy = (v) => 30 + 240 - ((v - yMin) / (yMax - yMin)) * 240;
  const pts = [];
  for (let x = xMin; x <= xMax; x += 0.1) {
    const y = -x * x + 6 * x - 5;
    if (y >= yMin - 1 && y <= yMax + 1) pts.push(`${sx(x)},${sy(y)}`);
  }
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <Axes x={60} y={30} w={400} h={240} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={1} grid />
      <polyline points={pts.join(' ')} fill="none" stroke="#1e40af" strokeWidth="2.6" />
      <text x={sx(5.4)} y={sy(5.5)} fontSize="14" fontWeight="700" fill="#1e40af">f(x) = −x² + 6x − 5</text>
      {/* Zérushelyek */}
      {(show === 'zeros' || show === 'all') && (
        <>
          <circle cx={sx(1)} cy={sy(0)} r="5" fill="#dc2626" />
          <circle cx={sx(5)} cy={sy(0)} r="5" fill="#dc2626" />
          <text x={sx(1) - 4} y={sy(0) - 10} fontSize="13" fontWeight="700" fill="#dc2626" textAnchor="end">x = 1</text>
          <text x={sx(5) + 4} y={sy(0) - 10} fontSize="13" fontWeight="700" fill="#dc2626">x = 5</text>
        </>
      )}
      {/* Tengelypont / max */}
      {(show === 'max' || show === 'all') && (
        <>
          <circle cx={sx(3)} cy={sy(4)} r="6" fill="#16a34a" stroke="#064e3b" strokeWidth="2" />
          <text x={sx(3) + 8} y={sy(4) - 6} fontSize="13" fontWeight="700" fill="#064e3b">max: (3; 4)</text>
        </>
      )}
      {/* y-tengelymetszet */}
      {(show === 'yint' || show === 'all') && (
        <>
          <circle cx={sx(0)} cy={sy(-5)} r="5" fill="#9333ea" />
          <text x={sx(0) + 8} y={sy(-5) + 4} fontSize="13" fontWeight="700" fill="#9333ea">(0; −5)</text>
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott az $f(x) = -x^2 + 6x - 5$ valós függvény.

**a)** Határozza meg az $f$ függvény zérushelyeit! ($3$ pont)

**b)** Határozza meg a tengelypont koordinátáit, és állapítsa meg, hogy ez maximum- vagy minimumhely! ($3$ pont)

**c)** Számítsa ki az $y$-tengellyel vett metszéspont koordinátáit, és adja meg a függvény **értékkészletét**! ($3$ pont)

**d)** Adja meg a függvény monoton (növekvő / csökkenő) szakaszait! ($3$ pont)`,
  figure: () => <Parabola15 show="all" />,
  asked: [
    { key: 'zeros', label: 'a) zérushelyek: $?$' },
    { key: 'vertex', label: 'b) tengelypont: $?$ — min vagy max?' },
    { key: 'range', label: 'c) $y$-tengelymetszet, értékkészlet: $?$' },
    { key: 'mono', label: 'd) monotonitás: $?$' },
  ],
};

export const solution = {
  steps: [
    // a)
    {
      title: 'a) 1. lépés — $f(x) = 0$ egyenlet',
      points: 1,
      body: `Megoldandó: $-x^2 + 6x - 5 = 0$. Szorozzuk mindkét oldalt $-1$-gyel (a gyökök nem változnak):

$$x^2 - 6x + 5 = 0.$$`,
      figure: () => <Parabola15 show="zeros" />,
    },
    {
      title: 'a) 2. lépés — Megoldóképlet',
      points: 2,
      body: `Megoldóképlettel ($a=1, b=-6, c=5$):

$$x = \\dfrac{6 \\pm \\sqrt{36 - 20}}{2} = \\dfrac{6 \\pm 4}{2}.$$

Ebből $x_1 = 5$ és $x_2 = 1$.

(Szorzattá alakítással szebben: $(x - 5)(x - 1) = 0$.)`,
      figure: () => <Parabola15 show="zeros" />,
    },

    // b)
    {
      title: 'b) 1. lépés — A tengelypont $x$-koordinátája',
      points: 1,
      body: `A tengelypont $x$-koordinátája:

$$x_0 = -\\dfrac{b}{2a} = -\\dfrac{6}{2 \\cdot (-1)} = 3.$$

(A zérushelyek számtani közepével is: $(5 + 1)/2 = 3$.)`,
      figure: () => <Parabola15 show="max" />,
    },
    {
      title: 'b) 2. lépés — A tengelypont $y$-koordinátája',
      points: 1,
      body: `$$f(3) = -9 + 18 - 5 = 4.$$

Tehát a tengelypont $T(3;\\ 4)$.`,
      figure: () => <Parabola15 show="max" />,
    },
    {
      title: 'b) 3. lépés — Minimum vagy maximum?',
      points: 1,
      body: `A főegyüttható $a = -1 < 0$, tehát a parabola **lefelé nyíló** → a tengelypont **maximum**.

Legnagyobb érték: $f_{\\max} = 4$, helye $x = 3$.`,
      figure: () => <Parabola15 show="max" />,
    },

    // c)
    {
      title: 'c) 1. lépés — Metszéspont az $y$-tengellyel',
      points: 1,
      body: `Az $y$-tengely az $x = 0$ egyenes, tehát $f(0) = -5$. A metszéspont: $(0;\\ -5)$.`,
      figure: () => <Parabola15 show="yint" />,
    },
    {
      title: 'c) 2. lépés — Értékkészlet',
      points: 2,
      body: `Mivel a parabola lefelé nyíló, és a legnagyobb érték $4$ (a tengelypontban), a függvény **minden** $4$-nél kisebb/egyenlő értéket felvesz (az $x$ teljes valósra futtatva $-\\infty$-ig lemegy):

$$\\text{Értékkészlet} = (-\\infty;\\ 4].$$`,
      figure: () => <Parabola15 show="all" />,
    },

    // d)
    {
      title: 'd) 1. lépés — A monotonitás helye',
      points: 1,
      body: `Felfelé/lefelé nyíló parabolánál a monotonitás határa a tengelypont $x$-koordinátája.

A $-x^2 + 6x - 5$ lefelé nyíló parabola, így:
- a tengelyponttól **balra növekvő**,
- jobbra **csökkenő**.`,
      figure: () => <Parabola15 show="max" />,
    },
    {
      title: 'd) 2. lépés — Intervallumok',
      points: 2,
      body: `Az $x_0 = 3$ határ alapján:

$$f \\text{ növekvő } \\text{a } (-\\infty;\\ 3]\\text{ intervallumon,}$$
$$f \\text{ csökkenő } \\text{a } [3;\\ +\\infty)\\text{ intervallumon.}$$

(Az $x = 3$ pontban a függvény maximumot vesz fel, ezért mindkét intervallumban bennefoglaljuk — ez nem okoz ütközést, mert az egy pont.)`,
      figure: () => <Parabola15 show="all" />,
    },
  ],
  finalAnswer: {
    zeros: '$x_1 = 1, x_2 = 5$',
    vertex: '$T(3;\\ 4)$ — maximum',
    range: '$y$-metszet: $(0;\\ -5)$; értékkészlet: $(-\\infty;\\ 4]$',
    mono: 'növekvő $(-\\infty; 3]$, csökkenő $[3; +\\infty)$',
  },
  usedFormulas: [
    'megoldóképlet',
    'tengelypont: $x_0 = -b/(2a)$',
    'a < 0 → maximum, a > 0 → minimum',
  ],
};

export default { meta, problem, solution };
