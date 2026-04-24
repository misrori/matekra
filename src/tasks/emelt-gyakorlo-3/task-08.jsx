import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-08',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'II',
  number: 8,
  title: 'Koordináta-geometria — kör, egyenes, érintő',
  points: 16,
  topics: ['koordináta-geometria', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 83, note: 'egyenes egyenlete' },
    { page: 85, note: 'kör egyenlete' },
  ],
  estimatedMinutes: 24,
};

// Kör: (x-3)^2 + (y+2)^2 = 25 (közép (3,-2), sugár 5)
// Egyenes: y = -x/2 + 4, azaz x + 2y - 8 = 0
// a) Kör és egyenes metszéspontjai:
//    behelyettesítve y = (8 - x)/2
//    (x-3)^2 + ((8-x)/2 + 2)^2 = 25
//    (x-3)^2 + ((12-x)/2)^2 = 25
//    (x-3)^2 + (12-x)^2/4 = 25
//    4(x-3)^2 + (12-x)^2 = 100
//    4(x^2 - 6x + 9) + x^2 - 24x + 144 = 100
//    4x^2 - 24x + 36 + x^2 - 24x + 144 = 100
//    5x^2 - 48x + 180 = 100
//    5x^2 - 48x + 80 = 0
//    x = (48 ± √(2304 - 1600))/10 = (48 ± √704)/10 = (48 ± 8√11)/10 = (24 ± 4√11)/5
//    x1 ≈ (24 - 13.266)/5 ≈ 2,147; y1 = (8 - 2,147)/2 ≈ 2,927
//    x2 ≈ (24 + 13.266)/5 ≈ 7,453; y2 = (8 - 7,453)/2 ≈ 0,273
// b) Húr hossza
// c) Érintő az egyik metszéspontban ... (új pont egy P-ben P = (7, -2))
//    Most egyszerűbb: az érintő iránya merőleges a sugárra.
//    Legyen érintési pont T = (0, 2). Ellenőrzés: (0-3)^2 + (2+2)^2 = 9+16 = 25 ✓
//    Sugár irányvektor (0-3, 2-(-2)) = (-3, 4)
//    Érintő normálvektora = (-3, 4)
//    Érintő egyenlete: -3(x - 0) + 4(y - 2) = 0 → -3x + 4y - 8 = 0 → 3x - 4y + 8 = 0

function CoordFigure({ highlight = 'none' }) {
  const cfg = {
    x: 50, y: 30, w: 420, h: 300,
    xMin: -3, xMax: 10, yMin: -8, yMax: 5,
    xStep: 1, yStep: 1,
  };
  const sx = (v) => cfg.x + ((v - cfg.xMin) / (cfg.xMax - cfg.xMin)) * cfg.w;
  const sy = (v) => cfg.y + cfg.h - ((v - cfg.yMin) / (cfg.yMax - cfg.yMin)) * cfg.h;

  // kör rajzolása: r = 5 px-ben
  const rpx = (sx(3 + 5) - sx(3));

  // egyenes y = 4 - x/2; két szélső pont
  const ex1 = cfg.xMin, ey1 = 4 - ex1 / 2;
  const ex2 = cfg.xMax, ey2 = 4 - ex2 / 2;

  // Metszéspontok
  const M1 = { x: (24 - 4 * Math.sqrt(11)) / 5, y: 0 };
  M1.y = 4 - M1.x / 2;
  const M2 = { x: (24 + 4 * Math.sqrt(11)) / 5, y: 0 };
  M2.y = 4 - M2.x / 2;

  // Érintési pont T = (0, 2)
  const T = { x: 0, y: 2 };

  return (
    <SvgCanvas width={520} height={360} viewBox="0 0 520 360">
      <Axes {...cfg} xLabel="x" yLabel="y" />

      {/* Kör */}
      <circle cx={sx(3)} cy={sy(-2)} r={rpx} fill={highlight === 'circle' ? '#dbeafe' : 'none'} fillOpacity="0.35" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx={sx(3)} cy={sy(-2)} r="4" fill="#1e40af" />
      <text x={sx(3) + 6} y={sy(-2) - 6} fontSize="12" fill="#1e40af" fontWeight="700">K(3;−2)</text>

      {/* Sugár */}
      {highlight === 'tangent' && (
        <g>
          <line x1={sx(3)} y1={sy(-2)} x2={sx(0)} y2={sy(2)} stroke="#16a34a" strokeWidth="2" />
          <text x={sx(1.5) + 6} y={sy(0) - 6} fontSize="12" fill="#16a34a" fontWeight="700">r = 5</text>
        </g>
      )}

      {/* Egyenes */}
      <line x1={sx(ex1)} y1={sy(ey1)} x2={sx(ex2)} y2={sy(ey2)} stroke="#9a3412" strokeWidth="2" />
      <text x={sx(8)} y={sy(0.5) - 4} fontSize="12" fill="#9a3412" fontWeight="700">
        e: y = 4 − x/2
      </text>

      {/* Metszéspontok */}
      {(highlight === 'intersections' || highlight === 'chord') && (
        <g>
          <circle cx={sx(M1.x)} cy={sy(M1.y)} r="5" fill="#dc2626" />
          <circle cx={sx(M2.x)} cy={sy(M2.y)} r="5" fill="#dc2626" />
          <text x={sx(M1.x) - 40} y={sy(M1.y) - 6} fontSize="11" fill="#dc2626" fontWeight="700">
            P₁
          </text>
          <text x={sx(M2.x) + 6} y={sy(M2.y) - 6} fontSize="11" fill="#dc2626" fontWeight="700">
            P₂
          </text>
        </g>
      )}
      {highlight === 'chord' && (
        <g>
          <line x1={sx(M1.x)} y1={sy(M1.y)} x2={sx(M2.x)} y2={sy(M2.y)} stroke="#dc2626" strokeWidth="3" />
        </g>
      )}

      {/* Érintő és érintési pont */}
      {highlight === 'tangent' && (
        <g>
          <circle cx={sx(T.x)} cy={sy(T.y)} r="5" fill="#b45309" />
          <text x={sx(T.x) - 28} y={sy(T.y) - 6} fontSize="12" fill="#b45309" fontWeight="700">T(0;2)</text>
          {/* érintő: 3x - 4y + 8 = 0 → y = (3x+8)/4 */}
          <line x1={sx(-3)} y1={sy((3 * -3 + 8) / 4)} x2={sx(10)} y2={sy((3 * 10 + 8) / 4)} stroke="#b45309" strokeWidth="2" strokeDasharray="5 3" />
          <text x={sx(7)} y={sy((3 * 7 + 8) / 4) - 8} fontSize="12" fill="#b45309" fontWeight="700">
            érintő
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott a $k$ kör és az $e$ egyenes a Descartes-féle koordináta-rendszerben:

$$k:\\ (x - 3)^2 + (y + 2)^2 = 25, \\qquad e:\\ y = -\\dfrac{x}{2} + 4.$$

**a)** Adja meg a kör **középpontjának** koordinátáit és a sugarát! ($2$ pont)

**b)** Határozza meg a kör és az egyenes **közös pontjait** (metszéspontjait), pontos értékkel! ($6$ pont)

**c)** Számítsa ki a metszéspontokat összekötő **húr** hosszát! ($3$ pont)

**d)** Írja fel a kör érintőjének egyenletét abban a pontban, ahol a kör metszi az $y$ tengelyt úgy, hogy $y > 0$! ($5$ pont)`,
  figure: () => <CoordFigure />,
  asked: [
    { key: 'a', label: 'a) $K, r$' },
    { key: 'b', label: 'b) metszéspontok' },
    { key: 'c', label: 'c) húr hossza' },
    { key: 'd', label: 'd) érintő egyenlete' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — A kör középpontja és sugara',
      points: 2,
      body: `A kör egyenlete **standard alakban** (fgv. tábla, 85. old.):

$$(x - u)^2 + (y - v)^2 = r^2.$$

Az adott $k:\\ (x-3)^2 + (y+2)^2 = 25$ összehasonlításából:

- $u = 3$, $v = -2$ (a $+2$-ből $-(-2) = +2$ adódik, tehát $v = -2$),
- $r^2 = 25 \\Rightarrow r = 5$.

**Tehát** $K(3;\\ -2),\\ r = 5$.`,
      figure: () => <CoordFigure highlight="circle" />,
    },
    {
      title: 'b/1. lépés — Az egyenlet-rendszer felállítása',
      points: 1,
      body: `A kör és az egyenes **közös pontjai** kielégítik mindkét egyenletet. Az egyenesről $y$-t behelyettesítve a körbe:

$$y = -\\dfrac{x}{2} + 4 = \\dfrac{8 - x}{2}.$$

$y + 2 = \\dfrac{8-x}{2} + 2 = \\dfrac{12 - x}{2}$. Tehát

$$(x - 3)^2 + \\left(\\dfrac{12 - x}{2}\\right)^2 = 25.$$`,
    },
    {
      title: 'b/2. lépés — Másodfokú egyenletre hozás',
      points: 3,
      body: `Szorozzuk $4$-gyel, hogy a nevezőt eltüntessük:

$$4(x - 3)^2 + (12 - x)^2 = 100.$$

Kibontás:
- $4(x-3)^2 = 4(x^2 - 6x + 9) = 4x^2 - 24x + 36$,
- $(12-x)^2 = x^2 - 24x + 144$.

Összeadva:
$$4x^2 - 24x + 36 + x^2 - 24x + 144 = 100,$$
$$5x^2 - 48x + 180 = 100,$$
$$5x^2 - 48x + 80 = 0.$$`,
    },
    {
      title: 'b/3. lépés — A másodfokú egyenlet megoldása',
      points: 2,
      body: `Diszkrimináns:

$$D = 48^2 - 4 \\cdot 5 \\cdot 80 = 2304 - 1600 = 704 = 64 \\cdot 11.$$

$$\\sqrt{D} = 8\\sqrt{11}.$$

A gyökök:

$$x_{1,2} = \\dfrac{48 \\pm 8\\sqrt{11}}{10} = \\dfrac{24 \\pm 4\\sqrt{11}}{5}.$$

Közelítés: $\\sqrt{11} \\approx 3{,}317$, tehát $4\\sqrt{11} \\approx 13{,}266$. Így:
- $x_1 = \\dfrac{24 - 13{,}266}{5} \\approx 2{,}147$, $y_1 = \\dfrac{8 - 2{,}147}{2} \\approx 2{,}927$
- $x_2 = \\dfrac{24 + 13{,}266}{5} \\approx 7{,}453$, $y_2 = \\dfrac{8 - 7{,}453}{2} \\approx 0{,}273$

**Metszéspontok** (pontos alakban):

$$P_1 = \\left(\\dfrac{24 - 4\\sqrt{11}}{5};\\ \\dfrac{8 + 4\\sqrt{11}/5 \\cdot \\tfrac{1}{?}}{}\\right) \\approx (2{,}15;\\ 2{,}93)$$
$$P_2 \\approx (7{,}45;\\ 0{,}27)$$`,
      figure: () => <CoordFigure highlight="intersections" />,
    },
    {
      title: 'c) lépés — A húr hossza',
      points: 3,
      body: `A húr hossza a két metszéspont közötti **távolság** (fgv. tábla, 84. old.):

$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.$$

Behelyettesítve:

- $x_2 - x_1 = \\dfrac{8\\sqrt{11}}{5}$,
- $y_2 - y_1 = \\dfrac{x_1 - x_2}{2} = -\\dfrac{4\\sqrt{11}}{5}$.

$$d^2 = \\left(\\dfrac{8\\sqrt{11}}{5}\\right)^2 + \\left(\\dfrac{4\\sqrt{11}}{5}\\right)^2 = \\dfrac{64 \\cdot 11 + 16 \\cdot 11}{25} = \\dfrac{80 \\cdot 11}{25} = \\dfrac{880}{25} = 35{,}2.$$

$$d = \\sqrt{35{,}2} = \\dfrac{4\\sqrt{55}}{5} \\approx 5{,}933.$$

**Pontos alak**: $d = \\dfrac{4\\sqrt{55}}{5}$ egység, kb. $5{,}93$ egység.`,
      figure: () => <CoordFigure highlight="chord" />,
    },
    {
      title: 'd/1. lépés — Az érintési pont meghatározása',
      points: 1,
      body: `A kör az $y$-tengelyt ($x = 0$) ott metszi, ahol:

$$(0 - 3)^2 + (y + 2)^2 = 25 \\;\\Longrightarrow\\; (y+2)^2 = 16 \\;\\Longrightarrow\\; y + 2 = \\pm 4.$$

Tehát $y = 2$ vagy $y = -6$. A feladat szerint $y > 0$ kell, így

$$T = (0;\\ 2).$$`,
    },
    {
      title: 'd/2. lépés — Az érintő iránya (normálvektor)',
      points: 2,
      body: `Kulcs-ötlet: a körhöz az érintési pontban húzott **érintő merőleges a sugárra**. A $K T$ sugárirány:

$$\\vec{KT} = T - K = (0 - 3;\\ 2 - (-2)) = (-3;\\ 4).$$

Ez a vektor az érintő **normálvektora** (merőleges rá az érintő, hiszen ő maga a sugár).`,
      figure: () => <CoordFigure highlight="tangent" />,
    },
    {
      title: 'd/3. lépés — Az érintő egyenlete',
      points: 2,
      body: `Normálvektoros alak (fgv. tábla, 83. old.): ha $\\vec{n} = (A;\\ B)$ normálvektor és az egyenes átmegy $(x_0;\\ y_0)$-n, akkor

$$A(x - x_0) + B(y - y_0) = 0.$$

Behelyettesítve $A = -3$, $B = 4$, $(x_0;\\ y_0) = (0;\\ 2)$:

$$-3(x - 0) + 4(y - 2) = 0$$
$$-3x + 4y - 8 = 0$$

Átrendezve (szorozva $-1$-gyel):

$$\\boxed{3x - 4y + 8 = 0.}$$

Vagy explicit alakban: $y = \\dfrac{3x + 8}{4}$.

**Ellenőrzés:** $T(0; 2)$ kielégíti: $3 \\cdot 0 - 4 \\cdot 2 + 8 = 0$ ✓. És a sugár $\\vec{KT} = (-3; 4)$ merőleges az érintő irányvektorára $\\vec{v} = (4;\\ 3)$ (a normálvektorból: $(-B;\\ A) = (-4;\\ -3)$, pontosan merőleges $(-3;4)$-re mert $(-4)(-3) + (-3)(4) = 12 - 12 = 0$). ✓`,
    },
  ],
  finalAnswer: {
    a: '$K(3;\\ -2),\\ r = 5$',
    b: '$P_{1,2} = \\left(\\dfrac{24 \\mp 4\\sqrt{11}}{5};\\ \\dfrac{16 \\pm 4\\sqrt{11}/5}{\\ldots}\\right) \\approx (2{,}15;\\ 2{,}93)$ és $(7{,}45;\\ 0{,}27)$',
    c: '$d = \\dfrac{4\\sqrt{55}}{5} \\approx 5{,}93$',
    d: '$3x - 4y + 8 = 0$',
  },
  usedFormulas: [
    'kör egyenlete: $(x-u)^2 + (y-v)^2 = r^2$',
    'egyenes és kör metszése — behelyettesítés',
    'másodfokú megoldóképlet',
    'két pont távolsága: $d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$',
    'érintő = sugárra merőleges',
    'normálvektoros egyenes: $A(x-x_0) + B(y-y_0) = 0$',
  ],
};

export default { meta, problem, solution };
