import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-02',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'I',
  number: 2,
  title: 'Paraméteres függvénytranszformáció',
  points: 13,
  topics: ['függvények'],
  difficulty: 3,
  fgvt: [
    { page: 41, note: 'másodfokú függvény' },
    { page: 42, note: 'függvénytranszformáció' },
  ],
  estimatedMinutes: 15,
  check: { type: 'list', value: ['max=5', 'x=3', 'x=3±√2'] },
};

// f(x) = −2(x − 3)² + 5
// a) transzformációs lépések g(x) = x² -ből
// b) maximumhely és maximumérték
// c) f(x) = 1 megoldása
//    −2(x−3)² + 5 = 1 ⇒ (x−3)² = 2 ⇒ x = 3 ± √2

function ParabolaFigure({ highlight = 'none' }) {
  const pts = [];
  for (let x = 0; x <= 6; x += 0.1) {
    const y = -2 * (x - 3) ** 2 + 5;
    pts.push([x, y]);
  }
  const xAx = (v) => 40 + (v / 6) * 460;
  const yAx = (v) => 40 + 260 - ((v + 5) / 12) * 260;
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${xAx(x).toFixed(1)} ${yAx(y).toFixed(1)}`).join(' ');

  return (
    <SvgCanvas width={540} height={320} viewBox="0 0 540 320">
      <Axes x={40} y={40} w={460} h={260}
        xMin={0} xMax={6} yMin={-5} yMax={7}
        xStep={1} yStep={1} xLabel="x" yLabel="y" />
      <path d={pathD} fill="none" stroke="#1e40af" strokeWidth="2.6" />
      <text x={120} y={60} fontSize="14" fill="#1e40af" fontWeight="700">
        f(x) = −2(x − 3)² + 5
      </text>
      {/* maximum pont */}
      <circle cx={xAx(3)} cy={yAx(5)} r="5" fill="#dc2626" />
      <text x={xAx(3) + 10} y={yAx(5) - 8} fontSize="13" fontWeight="700" fill="#dc2626">
        (3; 5) max
      </text>
      {highlight === 'roots' && (
        <g>
          {/* y = 1 egyenes */}
          <line x1={xAx(0)} y1={yAx(1)} x2={xAx(6)} y2={yAx(1)} stroke="#065f46" strokeWidth="1.6" strokeDasharray="4 3" />
          <text x={xAx(5.3)} y={yAx(1) - 4} fontSize="12" fill="#065f46" fontWeight="700">y = 1</text>
          {/* metszéspontok 3 ± √2 */}
          <circle cx={xAx(3 - Math.SQRT2)} cy={yAx(1)} r="4" fill="#065f46" />
          <circle cx={xAx(3 + Math.SQRT2)} cy={yAx(1)} r="4" fill="#065f46" />
          <text x={xAx(3 - Math.SQRT2)} y={yAx(1) + 16} fontSize="11" fill="#065f46" textAnchor="middle">
            3−√2
          </text>
          <text x={xAx(3 + Math.SQRT2)} y={yAx(1) + 16} fontSize="11" fill="#065f46" textAnchor="middle">
            3+√2
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Legyen $f(x) = -2(x - 3)^2 + 5$, ahol $x \\in \\mathbb{R}$.

**a)** Írja le a függvény előállításának **lépéseit** a $g(x) = x^2$ alapfüggvényből kiindulva (transzformációs lépések)! ($4$ pont)

**b)** Határozza meg a függvény **szélsőértékét**: hol és mekkora? ($3$ pont)

**c)** Oldja meg az $f(x) = 1$ egyenletet! ($6$ pont)`,
  figure: () => <ParabolaFigure />,
  asked: [
    { key: 'a', label: 'a) transzformációs lépések' },
    { key: 'b', label: 'b) maximum: hol és mennyi' },
    { key: 'c', label: 'c) $f(x)=1$ gyökei' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Transzformációs lépések sorozata',
      points: 4,
      body: `A célfüggvényt így olvassuk:

$$f(x) = \\underbrace{-2}_{\\text{függőleges nyújtás + tükrözés}} \\cdot \\underbrace{(x - 3)^2}_{\\text{eltolás jobbra 3-mal}} + \\underbrace{5}_{\\text{eltolás felfelé 5-tel}}$$

A négy **transzformáció** $g(x) = x^2$-ből sorrendben:

1. **Vízszintes eltolás** jobbra 3 egységgel: $g_1(x) = (x - 3)^2$ — a parabola csúcsa $(3; 0)$.
2. **Függőleges nyújtás** 2-szeresére (a "meredekség" kétszeresére nő): $g_2(x) = 2(x - 3)^2$ — a parabola csúcsa marad $(3; 0)$, de keskenyebb.
3. **Tükrözés** az $x$-tengelyre (mínusszal szorzás): $g_3(x) = -2(x - 3)^2$ — most **lefelé nyíló** parabola, csúcsa $(3; 0)$.
4. **Függőleges eltolás** felfelé 5 egységgel: $f(x) = -2(x - 3)^2 + 5$ — a csúcs $(3; 5)$.`,
    },
    {
      title: 'b) lépés — Szélsőérték leolvasása',
      points: 3,
      body: `A csúcspont-alak segít: $f(x) = -2(x - 3)^2 + 5$.

Mivel $-2(x - 3)^2 \\le 0$ **minden** valós $x$-re, és pontosan $x = 3$-nál egyenlő nullával, ezért

$$f(x) = -2(x-3)^2 + 5 \\le 5,$$

és az egyenlőség csak $x = 3$-nál teljesül.

**Maximum**: $f_{\\max} = 5$, a **maximumhely** $x = 3$.

Minimum nincs (lefelé $-\\infty$).`,
      figure: () => <ParabolaFigure />,
    },
    {
      title: 'c/1. lépés — Az $f(x) = 1$ egyenlet átrendezése',
      points: 3,
      body: `Beírva:

$$-2(x - 3)^2 + 5 = 1.$$

Vonjuk ki $5$-öt:

$$-2(x - 3)^2 = -4.$$

Osszuk el $-2$-vel:

$$(x - 3)^2 = 2.$$`,
    },
    {
      title: 'c/2. lépés — Gyökvonás',
      points: 3,
      body: `Négyzetgyököt vonva mindkét oldalból (nem felejtve a $\\pm$-et):

$$x - 3 = \\pm \\sqrt{2} \\;\\Longrightarrow\\; x = 3 \\pm \\sqrt{2}.$$

A két megoldás:

$$x_1 = 3 - \\sqrt{2} \\approx 1{,}586, \\qquad x_2 = 3 + \\sqrt{2} \\approx 4{,}414.$$

**Ellenőrzés** ($x_1$-re):

$f(3 - \\sqrt{2}) = -2(-\\sqrt{2})^2 + 5 = -2 \\cdot 2 + 5 = -4 + 5 = 1.$ ✓`,
      figure: () => <ParabolaFigure highlight="roots" />,
    },
  ],
  finalAnswer: {
    a: 'Jobbra eltolás 3-mal → függőleges nyújtás 2-szeresére → tükrözés az $x$-tengelyre → felfelé eltolás 5-tel.',
    b: '$x = 3$-ban **maximum**, $f_{\\max} = 5$. Minimum nincs.',
    c: '$x_{1,2} = 3 \\pm \\sqrt{2} \\approx \\{1{,}586;\\ 4{,}414\\}$',
  },
  usedFormulas: [
    'csúcspont-alak: $f(x) = a(x - p)^2 + q$, csúcs: $(p; q)$',
    '$a < 0$ esetén maximum van $p$-ben, értéke $q$',
    'gyökvonás: $X^2 = c > 0 \\Rightarrow X = \\pm\\sqrt{c}$',
  ],
};

export default { meta, problem, solution };
