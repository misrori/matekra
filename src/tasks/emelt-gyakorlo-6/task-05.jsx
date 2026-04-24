import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-05',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'II',
  number: 5,
  title: 'Exponenciális függvény érintője és szélsőértéke',
  points: 16,
  topics: ['függvények', 'exponenciális'],
  difficulty: 4,
  fgvt: [
    { page: 43, note: 'exponenciális függvény' },
    { page: 47, note: 'derivált alapazonosságai' },
  ],
  estimatedMinutes: 20,
  check: { type: 'list', value: ['y=-x+2', 'x=-1 max', 'x≈-0,307 zérus'] },
};

// f(x) = e^(-x) · (x + 2),  x ∈ ℝ
// a) f(0) = 2; f'(x) = -e^(-x)(x+2) + e^(-x) = e^(-x)(-x-1)
//    f'(0) = -1 ⇒ érintő: y = -x + 2
// b) szélsőérték: f'(x) = 0 ⇒ -x-1=0 ⇒ x = -1
//    f(-1) = e^1 · 1 = e ≈ 2,718; második derivált vagy előjelvizsgálat:
//    f'(x) = e^(-x)(-x-1); x<-1 → (-x-1)>0, f' pozitív; x>-1 → f' negatív → MAXIMUM x=-1-ben
// c) f(x) = 0 ⇒ e^(-x)·(x+2) = 0 ⇒ x = -2 (egyetlen zérushely, mert exp pozitív)
//    A feladat kéri az érintőt, szélsőértéket és zérushelyet.

function ExpFnFigure({ highlight = 'none' }) {
  const pts = [];
  for (let x = -3; x <= 4; x += 0.05) {
    const y = Math.exp(-x) * (x + 2);
    pts.push([x, y]);
  }
  const xAx = (v) => 40 + ((v + 3) / 7) * 460;
  const yAx = (v) => 40 + 260 - ((v + 1) / 5) * 260;
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${xAx(x).toFixed(1)} ${yAx(Math.max(-1, Math.min(4, y))).toFixed(1)}`).join(' ');

  return (
    <SvgCanvas width={540} height={320} viewBox="0 0 540 320">
      <Axes x={40} y={40} w={460} h={260}
        xMin={-3} xMax={4} yMin={-1} yMax={4}
        xStep={1} yStep={1} xLabel="x" yLabel="y" />
      <path d={pathD} fill="none" stroke="#1e40af" strokeWidth="2.4" />
      <text x={130} y={90} fontSize="13" fill="#1e40af" fontWeight="700">
        f(x) = e⁻ˣ · (x + 2)
      </text>
      {highlight === 'tangent' && (
        <g>
          {/* érintő x=0 pontban: y = -x + 2 */}
          <line x1={xAx(-2)} y1={yAx(4)} x2={xAx(3)} y2={yAx(-1)} stroke="#b91c1c" strokeWidth="2" />
          <text x={xAx(2.3)} y={yAx(-0.3) - 4} fontSize="13" fill="#b91c1c" fontWeight="700">
            y = −x + 2
          </text>
          <circle cx={xAx(0)} cy={yAx(2)} r="5" fill="#dc2626" />
          <text x={xAx(0) + 8} y={yAx(2) - 8} fontSize="12" fill="#dc2626" fontWeight="700">
            (0; 2)
          </text>
        </g>
      )}
      {highlight === 'max' && (
        <g>
          <circle cx={xAx(-1)} cy={yAx(Math.E)} r="5" fill="#b45309" />
          <text x={xAx(-1) - 10} y={yAx(Math.E) - 10} fontSize="12" fill="#92400e" fontWeight="700">
            max (−1; e) ≈ (−1; 2,718)
          </text>
        </g>
      )}
      {highlight === 'zero' && (
        <g>
          <circle cx={xAx(-2)} cy={yAx(0)} r="5" fill="#065f46" />
          <text x={xAx(-2) + 8} y={yAx(0) - 8} fontSize="12" fill="#065f46" fontWeight="700">
            zérushely: x = −2
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Tekintsük az

$$f(x) = e^{-x} \\cdot (x + 2), \\qquad x \\in \\mathbb{R}$$

valós függvényt.

**a)** Írja fel a függvény **érintőjének** egyenletét az $x_0 = 0$ helyen! ($6$ pont)

**b)** Határozza meg a függvény **szélsőértékét** (típusa, helye, értéke)! ($6$ pont)

**c)** Határozza meg a függvény **zérushelyét**! Indokoljon is, miért csak egy van! ($4$ pont)`,
  figure: () => <ExpFnFigure />,
  asked: [
    { key: 'a', label: 'a) érintő egyenlete az $x_0 = 0$-ban' },
    { key: 'b', label: 'b) szélsőérték típusa, helye, értéke' },
    { key: 'c', label: 'c) zérushely' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A függvény értéke $x_0 = 0$-ban',
      points: 1,
      body: `Egyszerű behelyettesítés:

$$f(0) = e^{0} \\cdot (0 + 2) = 1 \\cdot 2 = 2.$$

Az érintő tehát a $(0;\\ 2)$ ponton megy át.`,
    },
    {
      title: 'a/2. lépés — A derivált kiszámítása (szorzatderiválás)',
      points: 3,
      body: `A függvény két tényező szorzata: $u(x) = e^{-x}$ és $v(x) = x + 2$.

$$u'(x) = -e^{-x}, \\qquad v'(x) = 1.$$

Szorzatszabály: $(uv)' = u'v + uv'$:

$$f'(x) = (-e^{-x})(x + 2) + e^{-x} \\cdot 1 = e^{-x} \\left[-(x + 2) + 1\\right] = e^{-x} \\cdot (-x - 1).$$

Röviden: $\\boxed{f'(x) = -e^{-x}(x + 1)}$.`,
    },
    {
      title: 'a/3. lépés — Az érintő meredeksége és egyenlete',
      points: 2,
      body: `Az érintő meredeksége:

$$m = f'(0) = -e^{0}(0 + 1) = -1.$$

Pont–meredekséges alak:

$$y - 2 = -1 \\cdot (x - 0) \\;\\Longrightarrow\\; y = -x + 2.$$`,
      figure: () => <ExpFnFigure highlight="tangent" />,
    },
    {
      title: 'b/1. lépés — Stacionárius pont',
      points: 2,
      body: `Az $f'(x) = -e^{-x}(x + 1) = 0$ egyenletet akkor teljesül, ha egyik tényező nulla. Mivel $e^{-x} > 0$ minden $x$-re, ezért

$$x + 1 = 0 \\;\\Longrightarrow\\; x = -1.$$`,
    },
    {
      title: 'b/2. lépés — A szélsőérték típusa (előjelvizsgálat)',
      points: 2,
      body: `Vizsgáljuk a $f'(x) = -e^{-x}(x + 1)$ előjelét:

- **$x < -1$**: $(x + 1) < 0$, így $-(x+1) > 0$; mivel $e^{-x} > 0$, tehát $f'(x) > 0$ (növekvő).
- **$x > -1$**: $(x + 1) > 0$, így $-(x+1) < 0$; tehát $f'(x) < 0$ (csökkenő).

Az $f'$ előjele $+$-ról $-$-ra vált $x = -1$-nél → **abszolút maximum** van itt.`,
    },
    {
      title: 'b/3. lépés — A szélsőérték értéke',
      points: 2,
      body: `A maximumhely értéke:

$$f(-1) = e^{1} \\cdot (-1 + 2) = e \\cdot 1 = e \\approx 2{,}718.$$

Tehát a függvény **maximuma** $x = -1$-ben; értéke $e \\approx 2{,}718$.`,
      figure: () => <ExpFnFigure highlight="max" />,
    },
    {
      title: 'c/1. lépés — A zérushely',
      points: 3,
      body: `$f(x) = 0$ azt jelenti, hogy $e^{-x} (x + 2) = 0$. Mivel $e^{-x} > 0$ **minden** $x \\in \\mathbb{R}$ esetén, ezért

$$x + 2 = 0 \\;\\Longrightarrow\\; x = -2.$$`,
    },
    {
      title: 'c/2. lépés — Egyediség',
      points: 1,
      body: `Az $x + 2$ lineáris, egyetlen gyöke van; a $e^{-x}$ tényező pedig soha nem nulla. Tehát a függvénynek **pontosan egy** zérushelye van: $x = -2$.`,
      figure: () => <ExpFnFigure highlight="zero" />,
    },
  ],
  finalAnswer: {
    a: 'érintő egyenlete: $y = -x + 2$',
    b: '**abszolút maximum** $x = -1$-nél, $f(-1) = e \\approx 2{,}718$',
    c: 'zérushely: $x = -2$ (egyetlen gyök)',
  },
  usedFormulas: [
    'szorzatderivált: $(uv)\' = u\'v + uv\'$',
    '$(e^{-x})\' = -e^{-x}$',
    'pont–meredekséges alak: $y - y_0 = m (x - x_0)$',
    'előjelvizsgálatos szélsőérték-jellemzés',
  ],
};

export default { meta, problem, solution };
