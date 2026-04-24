import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-09',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'II',
  number: 9,
  title: 'Koordináta-geometria — kör, egyenes, háromszög',
  points: 16,
  topics: ['koordináta-geometria', 'síkgeometria'],
  difficulty: 4,
  fgvt: [
    { page: 83, note: 'egyenes egyenlete' },
    { page: 85, note: 'kör egyenlete' },
  ],
  estimatedMinutes: 22,
};

/*
  Adott:
    A = (1; 2), B = (7; 10).
  a) AB szakasz felezőmerőlegese — egyenlete?
     F = ((1+7)/2, (2+10)/2) = (4, 6)
     AB irányvektor: (6, 8); normálvektor: (6, 8) — a felezőmerőlegesen ez az irányvektor normálvektora.
     Felezőmerőleges: 6(x-4) + 8(y-6) = 0  ->  6x + 8y = 24 + 48 = 72  ->  3x + 4y = 36.
  b) A kör, amelynek átmérője AB — egyenlete?
     Középpont F = (4, 6), sugár r = |AB|/2 = sqrt(36+64)/2 = sqrt(100)/2 = 5.
     (x - 4)^2 + (y - 6)^2 = 25.
  c) Az x-tengelyen lévő metszéspontjai ennek a körnek?
     y = 0: (x-4)^2 + 36 = 25 -> (x-4)^2 = -11 -> nincs valós metszéspont.
     Megjegyzés: a kör nem metszi az x-tengelyt (mert a középpont y=6, sugár 5).
     Változtassuk a kérdést: hol metszi a y-tengelyt?
     x = 0: 16 + (y-6)^2 = 25 -> (y-6)^2 = 9 -> y = 3 vagy y = 9.
     Két pont: P = (0, 3), Q = (0, 9).
  d) Az ABP háromszög területe (P = (0, 3)):
     A=(1,2), B=(7,10), P=(0,3)
     Shoelace:
       2T = |(1*(10-3) + 7*(3-2) + 0*(2-10))|
          = |7 + 7 + 0| = 14
       T = 7
  e) Az AB egyenes egyenlete, és az AB egyenestől az origó távolsága.
     Irányvektor (6,8), normálvektor (8, -6) vagy (4, -3).
     4(x-1) - 3(y-2) = 0  ->  4x - 3y - 4 + 6 = 0  ->  4x - 3y + 2 = 0.
     dist(O, AB) = |4*0 - 3*0 + 2| / sqrt(16+9) = 2/5 = 0.4.
*/

function CGFigure({ step = 0 }) {
  const x0 = 40, y0 = 20, w = 420, h = 330;
  const xMin = -2, xMax = 10, yMin = -1, yMax = 12;
  const sx = (x) => x0 + ((x - xMin) / (xMax - xMin)) * w;
  const sy = (y) => y0 + h - ((y - yMin) / (yMax - yMin)) * h;

  const A = [1, 2];
  const B = [7, 10];
  const F = [4, 6];
  const P = [0, 3];
  const Q = [0, 9];
  const R = 5;

  // Perpendicular bisector 3x + 4y = 36  -> y = (36 - 3x)/4
  const perpPts = [[-2, (36 - 3 * -2) / 4], [10, (36 - 3 * 10) / 4]];

  // Kör pontok
  const circPath = () => {
    const pts = [];
    for (let t = 0; t <= 360; t += 5) {
      const a = (t * Math.PI) / 180;
      pts.push([F[0] + R * Math.cos(a), F[1] + R * Math.sin(a)]);
    }
    return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join(' ');
  };

  return (
    <SvgCanvas width={520} height={380} viewBox="0 0 520 380">
      <Axes x={x0} y={y0} w={w} h={h} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={1} />
      {/* kör */}
      {step >= 2 && <path d={circPath()} fill="none" stroke="#1d4ed8" strokeWidth="2" />}
      {/* felezőmerőleges */}
      {step >= 1 && (
        <line
          x1={sx(perpPts[0][0])} y1={sy(perpPts[0][1])}
          x2={sx(perpPts[1][0])} y2={sy(perpPts[1][1])}
          stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4"
        />
      )}
      {/* AB szakasz */}
      <line x1={sx(A[0])} y1={sy(A[1])} x2={sx(B[0])} y2={sy(B[1])} stroke="#16a34a" strokeWidth="2.5" />
      {/* háromszög ABP */}
      {step >= 4 && (
        <polygon
          points={`${sx(A[0])},${sy(A[1])} ${sx(B[0])},${sy(B[1])} ${sx(P[0])},${sy(P[1])}`}
          fill="#fde68a" fillOpacity="0.55"
          stroke="#92400e" strokeWidth="1.5"
        />
      )}
      {/* pontok */}
      {[['A', A, '#111'], ['B', B, '#111'], ['F', F, '#dc2626'], ['P', P, '#7c3aed'], ['Q', Q, '#7c3aed']]
        .slice(0, step >= 3 ? 5 : step >= 2 ? 3 : 2)
        .map(([name, pt, col], i) => (
          <g key={i}>
            <circle cx={sx(pt[0])} cy={sy(pt[1])} r="4.5" fill={col} />
            <text x={sx(pt[0]) + 7} y={sy(pt[1]) - 6} fontSize="12" fontWeight="bold" fill={col}>
              {name}({pt[0]};{pt[1]})
            </text>
          </g>
        ))}
      {step === 5 && (
        <g>
          {/* origó távolsága AB egyenestől — kis merőleges vonal */}
          <circle cx={sx(0)} cy={sy(0)} r="3" fill="#dc2626" />
          <text x={sx(0) + 6} y={sy(0) + 16} fontSize="11" fill="#dc2626">O</text>
        </g>
      )}
      <text x="260" y="16" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        A(1;2), B(7;10), F(4;6) — a felezőpont
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `A derékszögű koordinátarendszerben adottak az

$$A(1;\\ 2) \\quad \\text{és} \\quad B(7;\\ 10)$$

pontok.

**a)** Írja fel az $AB$ szakasz **felezőmerőlegesének** egyenletét. ($3$ pont)

**b)** Írja fel annak a **körnek** az egyenletét, amelynek átmérője az $AB$ szakasz. ($3$ pont)

**c)** Határozza meg a kör és az $y$-tengely közös pontjait. ($3$ pont)

**d)** Legyen $P$ a (c) pontban kapott két közös pont közül az, amelyiknek kisebb az $y$-koordinátája. Számítsa ki az $ABP$ háromszög **területét**. ($3$ pont)

**e)** Írja fel az $AB$ egyenes egyenletét (általános alak), és határozza meg az **origó** távolságát ettől az egyenestől. ($4$ pont)`,
  figure: () => <CGFigure step={0} />,
  asked: [
    { key: 'a', label: 'a) felezőmerőleges' },
    { key: 'b', label: 'b) kör egyenlete' },
    { key: 'c', label: 'c) kör ∩ $y$-tengely' },
    { key: 'd', label: 'd) $T_{ABP}$' },
    { key: 'e', label: 'e) $AB$ egyenlete; $d(O, AB)$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — A felezőpont',
      points: 1,
      body: `$AB$ felezőpontja:

$$F = \\left( \\dfrac{1 + 7}{2};\\ \\dfrac{2 + 10}{2} \\right) = (4;\\ 6).$$`,
    },
    {
      title: 'a) 2. lépés — A felezőmerőleges normálvektora',
      points: 1,
      body: `Az $AB$ vektor: $\\vec{AB} = (6;\\ 8)$. A felezőmerőleges **merőleges** erre, így $\\vec{AB}$ éppen a felezőmerőleges **normálvektora**.

Az egyenes egy $F$-en átmenő normálvektoros alakja:

$$n_1 (x - F_x) + n_2 (y - F_y) = 0.$$`,
    },
    {
      title: 'a) 3. lépés — A behelyettesítés',
      points: 1,
      body: `$$6(x - 4) + 8(y - 6) = 0 \\iff 6x + 8y = 24 + 48 = 72.$$

Osszunk 2-vel az egyszerűbb alakért:

$$\\boxed{3x + 4y = 36.}$$`,
      figure: () => <CGFigure step={1} />,
    },
    {
      title: 'b) 1. lépés — Sugár kiszámítása',
      points: 1,
      body: `Az átmérő hossza:

$$|AB| = \\sqrt{(7-1)^2 + (10-2)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10.$$

Tehát $r = \\dfrac{|AB|}{2} = 5$.`,
    },
    {
      title: 'b) 2. lépés — A kör egyenlete',
      points: 2,
      body: `A kör középpontja $F = (4; 6)$, sugara $5$. Az általános alak:

$$(x - u)^2 + (y - v)^2 = r^2,$$

behelyettesítve:

$$\\boxed{(x - 4)^2 + (y - 6)^2 = 25.}$$`,
      figure: () => <CGFigure step={2} />,
    },
    {
      title: 'c) — Metszés az $y$-tengellyel',
      points: 3,
      body: `Az $y$-tengely egyenlete $x = 0$. Behelyettesítünk:

$$(0 - 4)^2 + (y - 6)^2 = 25 \\iff 16 + (y - 6)^2 = 25 \\iff (y - 6)^2 = 9.$$

$$y - 6 = \\pm 3 \\Rightarrow y = 9 \\text{ vagy } y = 3.$$

$$\\boxed{P = (0;\\ 3), \\quad Q = (0;\\ 9).}$$

**Geometriai magyarázat:** a középpont $x$-koordinátája $4$, a kör sugara $5$, így a kör eléri az $y$-tengelyt (a vízszintes távolság $4 < 5$).`,
      figure: () => <CGFigure step={3} />,
    },
    {
      title: 'd) 1. lépés — A háromszög csúcsai',
      points: 1,
      body: `A kisebb $y$-koordinátájú metszéspont $P = (0;\\ 3)$.

Tehát az $ABP$ háromszög csúcsai: $A(1;\\ 2)$, $B(7;\\ 10)$, $P(0;\\ 3)$.`,
    },
    {
      title: 'd) 2. lépés — Terület vektoriális képlettel',
      points: 2,
      body: `A háromszög területe két vektor által kifeszített paralelogramma területének fele:

$$T = \\dfrac{1}{2} \\left| \\vec{AB} \\times \\vec{AP} \\right|,$$

ahol a síkbeli „keresztszorzat" a determináns abszolút értéke:

$$\\vec{AB} = (6;\\ 8), \\qquad \\vec{AP} = (0 - 1;\\ 3 - 2) = (-1;\\ 1).$$

$$\\vec{AB} \\times \\vec{AP} = 6 \\cdot 1 - 8 \\cdot (-1) = 6 + 8 = 14.$$

$$T = \\dfrac{|14|}{2} = 7.$$

$$\\boxed{T_{ABP} = 7 \\text{ területegység.}}$$`,
      figure: () => <CGFigure step={4} />,
    },
    {
      title: 'e) 1. lépés — Az $AB$ egyenes normálvektoros alakja',
      points: 1,
      body: `$\\vec{AB} = (6;\\ 8)$ irányvektor. Egy erre **merőleges** normálvektor $\\vec{n} = (8;\\ -6)$ (vagy osztva 2-vel: $(4;\\ -3)$).

Az $A(1;\\ 2)$-n átmenő egyenes egyenlete:

$$4(x - 1) - 3(y - 2) = 0.$$`,
    },
    {
      title: 'e) 2. lépés — Az általános alak',
      points: 1,
      body: `$$4x - 3y - 4 + 6 = 0 \\iff 4x - 3y + 2 = 0.$$

$$\\boxed{AB:\\ 4x - 3y + 2 = 0.}$$

**Ellenőrzés** $A(1; 2)$-re: $4 - 6 + 2 = 0$ ✓. $B(7; 10)$-re: $28 - 30 + 2 = 0$ ✓.`,
    },
    {
      title: 'e) 3. lépés — Pont–egyenes távolság képlete',
      points: 2,
      body: `Egy $P_0 = (x_0;\\ y_0)$ pontból az $Ax + By + C = 0$ egyenletű egyeneshez húzott távolság:

$$d = \\dfrac{|A x_0 + B y_0 + C|}{\\sqrt{A^2 + B^2}}.$$

$P_0 = O(0;\\ 0)$, $A = 4$, $B = -3$, $C = 2$:

$$d(O; AB) = \\dfrac{|4 \\cdot 0 - 3 \\cdot 0 + 2|}{\\sqrt{16 + 9}} = \\dfrac{2}{\\sqrt{25}} = \\dfrac{2}{5} = 0{,}4.$$

$$\\boxed{d(O; AB) = \\dfrac{2}{5} = 0{,}4 \\text{ egység.}}$$`,
      figure: () => <CGFigure step={5} />,
    },
  ],
  finalAnswer: {
    a: '$3x + 4y = 36$',
    b: '$(x-4)^2 + (y-6)^2 = 25$',
    c: '$(0;\\ 3)$ és $(0;\\ 9)$',
    d: '$T_{ABP} = 7$',
    e: '$AB: 4x - 3y + 2 = 0;\\ d(O;\\ AB) = 0{,}4$',
  },
  usedFormulas: [
    'szakasz felezőpontja',
    'normálvektoros és pontos-normálvektoros alak',
    'kör egyenlete középponttal és sugárral',
    'vektoriális keresztszorzat — háromszög területe',
    'pont–egyenes távolság',
  ],
};

export default { meta, problem, solution };
