import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-09',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'II',
  number: 9,
  title: 'Ellipszis — féltengelyek, fókuszok és érintő',
  points: 16,
  topics: ['koordináta-geometria'],
  difficulty: 4,
  fgvt: [
    { page: 85, note: 'kör, kúpszeletek' },
    { page: 88, note: 'ellipszis' },
  ],
  estimatedMinutes: 22,
  check: { type: 'list', value: ['a=5,b=3,c=4', 'F(±4;0)', 'érintő: 9x+20y=75'] },
};

// Ellipszis: x²/25 + y²/9 = 1
//   ⇒ a = 5 (nagyféltengely x irány), b = 3 (kisféltengely y irány)
//   ⇒ c² = a² − b² = 25 − 9 = 16 ⇒ c = 4
//   ⇒ F₁(−4; 0), F₂(4; 0)
// Pont ellenőrzés: P(3; 12/5) = (3; 2,4)
//   9/25 + (12/5)²/9 = 9/25 + (144/25)/9 = 9/25 + 16/25 = 25/25 = 1 ✓
// Érintő képlete: (x·x₀)/a² + (y·y₀)/b² = 1
//   3x/25 + (12/5)·y/9 = 1
//   3x/25 + 4y/15 = 1
// Közös nevező 75: 9x + 20y = 75

function EllipsisFigure({ highlight = 'none' }) {
  // Axes xMin=-8, xMax=8, yMin=-5, yMax=5
  const a = 5, b = 3;
  const pts = [];
  for (let t = 0; t <= 2 * Math.PI + 0.05; t += 0.05) {
    const x = a * Math.cos(t);
    const y = b * Math.sin(t);
    pts.push([x, y]);
  }
  const xAx = (v) => 40 + ((v + 8) / 16) * 460;
  const yAx = (v) => 40 + 240 - ((v + 5) / 10) * 240;
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${xAx(x).toFixed(1)} ${yAx(y).toFixed(1)}`).join(' ') + ' Z';

  return (
    <SvgCanvas width={540} height={300} viewBox="0 0 540 300">
      <Axes x={40} y={40} w={460} h={240}
        xMin={-8} xMax={8} yMin={-5} yMax={5}
        xStep={2} yStep={1} xLabel="x" yLabel="y" />
      <path d={pathD} fill="#dbeafe" fillOpacity="0.35" stroke="#1e40af" strokeWidth="2.4" />
      {/* féltengely és fókuszjelek */}
      {highlight === 'foci' && (
        <g>
          <circle cx={xAx(-4)} cy={yAx(0)} r="5" fill="#b91c1c" />
          <circle cx={xAx(4)} cy={yAx(0)} r="5" fill="#b91c1c" />
          <text x={xAx(-4)} y={yAx(0) - 10} fontSize="12" fontWeight="700" textAnchor="middle" fill="#b91c1c">
            F₁(−4;0)
          </text>
          <text x={xAx(4)} y={yAx(0) - 10} fontSize="12" fontWeight="700" textAnchor="middle" fill="#b91c1c">
            F₂(4;0)
          </text>
          {/* a tengely */}
          <line x1={xAx(-5)} y1={yAx(0)} x2={xAx(5)} y2={yAx(0)} stroke="#065f46" strokeWidth="2" />
          <text x={xAx(0)} y={yAx(0) - 25} fontSize="12" fill="#065f46" fontWeight="700" textAnchor="middle">
            a = 5
          </text>
          <line x1={xAx(0)} y1={yAx(-3)} x2={xAx(0)} y2={yAx(3)} stroke="#065f46" strokeWidth="2" />
          <text x={xAx(0) + 12} y={yAx(1.5)} fontSize="12" fill="#065f46" fontWeight="700">b = 3</text>
        </g>
      )}
      {highlight === 'tangent' && (
        <g>
          {/* érintőpont P(3; 2,4) */}
          <circle cx={xAx(3)} cy={yAx(2.4)} r="5" fill="#dc2626" />
          <text x={xAx(3) + 10} y={yAx(2.4) - 4} fontSize="13" fontWeight="700" fill="#dc2626">
            P(3; 12/5)
          </text>
          {/* érintő: 9x + 20y = 75 ⇒ y = (75 − 9x)/20 */}
          <line
            x1={xAx(-2)}
            y1={yAx((75 - 9 * -2) / 20)}
            x2={xAx(8)}
            y2={yAx((75 - 9 * 8) / 20)}
            stroke="#b45309"
            strokeWidth="2.2"
          />
          <text x={xAx(6.5)} y={yAx((75 - 9 * 6.5) / 20) - 6} fontSize="12" fill="#92400e" fontWeight="700">
            9x + 20y = 75
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott az

$$\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$$

egyenletű ellipszis a derékszögű koordináta-rendszerben.

**a)** Határozza meg az ellipszis **féltengelyeinek** hosszát, és adja meg a **fókuszpontok** koordinátáit! ($5$ pont)

**b)** Ellenőrizze, hogy a $P\\left(3;\\ \\dfrac{12}{5}\\right)$ pont **rajta van-e** az ellipszisen! ($3$ pont)

**c)** Írja fel a $P$ pontbeli **érintő** egyenletét *(Használhatja az ellipszis érintő-képletét: $\\dfrac{x\\,x_0}{a^2} + \\dfrac{y\\,y_0}{b^2} = 1$.)* ($8$ pont)`,
  figure: () => <EllipsisFigure />,
  asked: [
    { key: 'a', label: 'a) féltengelyek és fókuszok' },
    { key: 'b', label: 'b) illeszkedik-e $P$?' },
    { key: 'c', label: 'c) érintő egyenlete $P$-ben' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A féltengelyek',
      points: 2,
      body: `Az ellipszis kanonikus alakja $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$, ahol $a > b > 0$ esetén $a$ a **nagy** féltengely ($x$-irány), $b$ a **kis** féltengely ($y$-irány).

Itt:

$$a^2 = 25 \\Rightarrow a = 5, \\qquad b^2 = 9 \\Rightarrow b = 3.$$`,
    },
    {
      title: 'a/2. lépés — A fókuszok (lineáris excentricitás)',
      points: 3,
      body: `Az ellipszis **lineáris excentricitása** $c$, amelyre

$$c^2 = a^2 - b^2 = 25 - 9 = 16 \\;\\Longrightarrow\\; c = 4.$$

Mivel $a > b$, a fókuszok az $x$-tengelyen vannak:

$$F_1 = (-4;\\ 0), \\qquad F_2 = (4;\\ 0).$$`,
      figure: () => <EllipsisFigure highlight="foci" />,
    },
    {
      title: 'b) lépés — A $P$ pont illeszkedése',
      points: 3,
      body: `Behelyettesítjük $P\\left(3;\\ \\tfrac{12}{5}\\right)$ koordinátáit:

$$\\dfrac{3^2}{25} + \\dfrac{(12/5)^2}{9} = \\dfrac{9}{25} + \\dfrac{144/25}{9} = \\dfrac{9}{25} + \\dfrac{144}{225}.$$

Közös nevező $225$:

$$= \\dfrac{81}{225} + \\dfrac{144}{225} = \\dfrac{225}{225} = 1.$$

Mivel az összeg pontosan $1$, a $P$ pont **rajta van** az ellipszisen. ✓`,
    },
    {
      title: 'c/1. lépés — Az érintő-képlet',
      points: 3,
      body: `Egy $(x_0;\\ y_0)$ ponton áthaladó, az ellipszist **érintő** egyenes egyenlete:

$$\\dfrac{x \\cdot x_0}{a^2} + \\dfrac{y \\cdot y_0}{b^2} = 1.$$

($P$ az ellipszisen van, ahogy azt a $b)$ részben igazoltuk, tehát a képlet alkalmazható.)

Helyettesítsük be $x_0 = 3$, $y_0 = \\tfrac{12}{5}$, $a^2 = 25$, $b^2 = 9$:

$$\\dfrac{3x}{25} + \\dfrac{\\tfrac{12}{5} \\cdot y}{9} = 1.$$`,
    },
    {
      title: 'c/2. lépés — A második tag egyszerűsítése',
      points: 2,
      body: `$$\\dfrac{\\tfrac{12}{5} \\cdot y}{9} = \\dfrac{12 y}{5 \\cdot 9} = \\dfrac{12 y}{45} = \\dfrac{4 y}{15}.$$

Tehát:

$$\\dfrac{3x}{25} + \\dfrac{4y}{15} = 1.$$`,
    },
    {
      title: 'c/3. lépés — Közös nevezővel (egész együtthatók)',
      points: 2,
      body: `A legkisebb közös többszörös $25$ és $15$ között $75$. Szorozzuk meg mindkét oldalt $75$-tel:

$$75 \\cdot \\dfrac{3x}{25} + 75 \\cdot \\dfrac{4y}{15} = 75.$$

$$3 \\cdot 3 x + 5 \\cdot 4 y = 75.$$

$$\\boxed{9x + 20y = 75.}$$

**Ellenőrzés** a $P$ pontban: $9 \\cdot 3 + 20 \\cdot \\tfrac{12}{5} = 27 + 48 = 75$. ✓`,
    },
    {
      title: 'c/4. lépés — Az érintő ábrázolása',
      points: 1,
      body: `Az érintő egyenesen (meredekség-alak): $y = \\dfrac{75 - 9x}{20}$. A $P(3;\\ 2{,}4)$ pontban simul az ellipszisre, és — a pozitív $y$-tartományban — jobbra csökken.`,
      figure: () => <EllipsisFigure highlight="tangent" />,
    },
  ],
  finalAnswer: {
    a: '$a = 5$, $b = 3$; fókuszok: $F_1(-4;\\ 0)$, $F_2(4;\\ 0)$',
    b: '$P\\left(3;\\ \\tfrac{12}{5}\\right)$ **rajta van** az ellipszisen (behelyettesítve $1$-et kapunk).',
    c: 'érintő egyenlete $P$-ben: $9x + 20y = 75$',
  },
  usedFormulas: [
    'ellipszis kanonikus alakja: $x^2/a^2 + y^2/b^2 = 1$',
    'lineáris excentricitás: $c^2 = a^2 - b^2$ (ha $a > b$)',
    'érintő az $(x_0, y_0)$ pontban: $x x_0/a^2 + y y_0/b^2 = 1$',
  ],
};

export default { meta, problem, solution };
