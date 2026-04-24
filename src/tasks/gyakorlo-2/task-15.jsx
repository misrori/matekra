import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-15',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.A',
  number: 15,
  title: 'Függvény-jellemzés és ábrázolás — abszolútérték',
  points: 12,
  topics: ['függvények'],
  difficulty: 4,
  fgvt: [{ page: 40, note: 'abszolútérték-függvény' }],
  estimatedMinutes: 20,
};

// f(x) = |x - 2| - 3 a [-2, 7] intervallumon
// Minimum x=2-ben, értéke -3
// Zéróhelyek: |x-2| = 3 -> x-2 = ±3 -> x = 5 vagy x = -1
// Értékkészlet: min = -3 (x=2), max a végpontokban:
//   f(-2) = |-2-2| - 3 = 4 - 3 = 1
//   f(7) = |7-2| - 3 = 5 - 3 = 2
//   max = 2 (x=7)
// Értékkészlet: [-3, 2]

function Plot({ step = 0 }) {
  const ax = { x: 60, y: 30, w: 380, h: 280, xMin: -3, xMax: 8, yMin: -4, yMax: 3 };
  const sx = (v) => ax.x + ((v - ax.xMin) / (ax.xMax - ax.xMin)) * ax.w;
  const sy = (v) => ax.y + ax.h - ((v - ax.yMin) / (ax.yMax - ax.yMin)) * ax.h;
  const f = (x) => Math.abs(x - 2) - 3;
  // A függvény sarokban töri: bal ág x=-2..2, jobb ág x=2..7
  const pathPoints = [
    [-2, f(-2)],
    [2, f(2)],
    [7, f(7)],
  ];
  const d = pathPoints.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`).join(' ');

  return (
    <SvgCanvas width={480} height={340} viewBox="0 0 480 340">
      <Axes x={ax.x} y={ax.y} w={ax.w} h={ax.h} xMin={ax.xMin} xMax={ax.xMax} yMin={ax.yMin} yMax={ax.yMax} xStep={1} yStep={1} />
      {/* Függvény */}
      <path d={d} fill="none" stroke="#2563eb" strokeWidth="3" />

      {/* Végpontok zárt körrel (intervallum zárt) */}
      <circle cx={sx(-2)} cy={sy(f(-2))} r="5" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.2" />
      <circle cx={sx(7)} cy={sy(f(7))} r="5" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.2" />

      {/* Minimum */}
      {step >= 2 && (
        <g>
          <circle cx={sx(2)} cy={sy(-3)} r="6" fill="#16a34a" />
          <text x={sx(2) + 8} y={sy(-3) + 18} fontSize="13" fontWeight="bold" fill="#166534">min: (2; -3)</text>
        </g>
      )}
      {/* Zéróhelyek */}
      {step >= 3 && (
        <g>
          <circle cx={sx(-1)} cy={sy(0)} r="5" fill="#dc2626" />
          <circle cx={sx(5)} cy={sy(0)} r="5" fill="#dc2626" />
          <text x={sx(-1)} y={sy(0) + 18} fontSize="12" textAnchor="middle" fill="#b91c1c" fontWeight="bold">x₁ = -1</text>
          <text x={sx(5)} y={sy(0) + 18} fontSize="12" textAnchor="middle" fill="#b91c1c" fontWeight="bold">x₂ = 5</text>
        </g>
      )}
      {/* Értékkészlet megjelenítése (step 4) */}
      {step >= 4 && (
        <g>
          <line x1={sx(-3)} y1={sy(2)} x2={sx(8)} y2={sy(2)} stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={sx(-3)} y1={sy(-3)} x2={sx(8)} y2={sy(-3)} stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
          <text x={sx(-3) + 4} y={sy(2) - 4} fontSize="11" fill="#7e22ce" fontWeight="bold">max = 2</text>
          <text x={sx(-3) + 4} y={sy(-3) + 14} fontSize="11" fill="#7e22ce" fontWeight="bold">min = -3</text>
        </g>
      )}

      <text x="240" y="22" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">
        f(x) = |x − 2| − 3,     x ∈ [-2; 7]
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott a függvény:

$$f: [-2;\\ 7] \\to \\mathbb{R}, \\quad f(x) = |x - 2| - 3.$$

**a)** Ábrázolja a függvényt a koordinátarendszerben! ($3$ pont)

**b)** Határozza meg a **zéróhelyeit** (azokat az $x$ értékeket, amelyekre $f(x) = 0$)! ($3$ pont)

**c)** Adja meg a függvény **minimumát** és **maximumát** az adott intervallumon. ($3$ pont)

**d)** Adja meg a függvény **értékkészletét**! ($1$ pont)

**e)** Mekkora $x$ értékre teljesül, hogy $f(x) = 1$? ($2$ pont)`,
  figure: () => <Plot step={0} />,
  asked: [
    { key: 'zero', label: 'b) Zéróhelyek = ?' },
    { key: 'minmax', label: 'c) Min és Max = ?' },
    { key: 'range', label: 'd) Értékkészlet = ?' },
    { key: 'fx1', label: 'e) $f(x) = 1$ megoldása = ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Ábrázolás',
      points: 3,
      body: `Az $|x - 2| - 3$ függvény az $|x|$ alapfüggvényből kapható:
1) **eltolás jobbra 2 egységgel**: $|x - 2|$,
2) **eltolás lefelé 3 egységgel**: $|x - 2| - 3$.

Az eredmény egy „V" alakú görbe, amely **csúcsával lefelé** van eltolva. A csúcs a $(2;\\ -3)$ pontban van (ahol a $|\\ldots|$ értéke $0$).

Elegendő három pont a szakaszhoz:

- $f(-2) = |-4| - 3 = 4 - 3 = 1$ — bal végpont $(-2;\\ 1)$,
- $f(2) = 0 - 3 = -3$ — csúcs $(2;\\ -3)$,
- $f(7) = |5| - 3 = 5 - 3 = 2$ — jobb végpont $(7;\\ 2)$.

A függvényt ezt a három pontot két egyenes szakasszal összekötve rajzoljuk (csak az $[-2;\\ 7]$ intervallumon).`,
      figure: () => <Plot step={1} />,
    },
    {
      title: 'b) lépés — Zéróhelyek',
      points: 3,
      body: `Zéróhely: $f(x) = 0 \\Leftrightarrow |x - 2| - 3 = 0 \\Leftrightarrow |x - 2| = 3$.

Az abszolútérték definíciója szerint:

$$x - 2 = 3 \\quad \\text{vagy} \\quad x - 2 = -3.$$

Ezekből $x = 5$ vagy $x = -1$. **Mindkét** érték az $[-2;\\ 7]$ értelmezési tartományba esik, így mindkettő elfogadott:

$$\\boxed{x_1 = -1, \\quad x_2 = 5.}$$

**Grafikus ellenőrzés:** a V alak metszi az $x$-tengelyt ezekben a pontokban, és a csúcs alattuk középen van (valóban $x_0 = 2 = \\frac{-1 + 5}{2}$).`,
      figure: () => <Plot step={3} />,
    },
    {
      title: 'c) lépés — Minimum és maximum',
      points: 3,
      body: `A V alakú függvény **minimuma** a csúcsában van: $f(2) = -3$.

Maximum kereséséhez — mivel a függvény a csúcstól mindkét irányba monoton nő — elegendő a **végpontokat** megvizsgálni:

- $f(-2) = 1$,
- $f(7) = 2$.

Mivel $f(7) > f(-2)$, a **maximum** $x = 7$-ben $2$.

$$\\boxed{\\text{minimum: } f(2) = -3, \\quad \\text{maximum: } f(7) = 2.}$$`,
      figure: () => <Plot step={4} />,
    },
    {
      title: 'd) lépés — Értékkészlet',
      points: 1,
      body: `A függvény folytonos az $[-2;\\ 7]$ zárt intervallumon, és minden értéket felvesz a minimumtól a maximumig (**középérték-tétel** kvalitatív megfogalmazása). Így az **értékkészlet**:

$$\\boxed{\\{ f(x) \\mid x \\in [-2;\\ 7] \\} = [-3;\\ 2].}$$`,
      figure: () => <Plot step={4} />,
    },
    {
      title: 'e) lépés — $f(x) = 1$ megoldása',
      points: 2,
      body: `$$|x - 2| - 3 = 1 \\quad \\Longleftrightarrow \\quad |x - 2| = 4.$$

Ezekből:

$$x - 2 = 4 \\Rightarrow x = 6, \\quad \\text{vagy} \\quad x - 2 = -4 \\Rightarrow x = -2.$$

Mindkét érték az $[-2;\\ 7]$ intervallumba esik (a $-2$ éppen a bal végpont — **zárt** intervallum, tehát benne van). Ellenőrzés:

- $f(6) = |4| - 3 = 1 \\ \\checkmark$,
- $f(-2) = |{-4}| - 3 = 1 \\ \\checkmark$.

$$\\boxed{x = -2 \\quad \\text{vagy} \\quad x = 6.}$$`,
    },
  ],
  finalAnswer: {
    zero: '$x_1 = -1,\\ x_2 = 5$',
    minmax: 'min: $f(2) = -3$; max: $f(7) = 2$',
    range: '$R_f = [-3;\\ 2]$',
    fx1: '$x = -2$ vagy $x = 6$',
  },
  usedFormulas: [
    '$|x|$ alapfüggvény eltolásai',
    'abszolútérték-egyenlet: $|x - a| = b \\Leftrightarrow x = a \\pm b$',
    'zárt intervallumon folytonos függvény értékkészlete',
  ],
};

export default { meta, problem, solution };
