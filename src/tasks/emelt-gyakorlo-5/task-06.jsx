import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-5-06',
  year: 2024,
  session: 'emelt gyakorló · 5. teszt',
  level: 'emelt',
  part: 'II',
  number: 6,
  title: 'Koordináta-geometria — három egyenes metszéspontjai, háromszög területe',
  points: 16,
  topics: ['koordináta-geometria', 'síkgeometria'],
  difficulty: 4,
  fgvt: [
    { page: 83, note: 'egyenes egyenlete' },
    { page: 84, note: 'két egyenes metszéspontja' },
  ],
  estimatedMinutes: 22,
  check: { type: 'number', value: 16, tolerance: 0.01 },
};

// Három egyenes:
//   e1:  x + y = 6     (meredekség -1, tengelymetszetek (6,0), (0,6))
//   e2:  2x - y = 3    (meredekség 2)
//   e3:  x - 2y = -4   ( y = (x+4)/2)
// Metszéspontok:
// A = e1 ∩ e2:  x + y = 6,  2x - y = 3  => 3x = 9 => x = 3, y = 3. A = (3, 3).
// B = e2 ∩ e3:  2x - y = 3,  x - 2y = -4 => 4x - 2y = 6,  x - 2y = -4 => 3x = 10 => x = 10/3, y = 2x - 3 = 20/3 - 9/3 = 11/3. B = (10/3, 11/3).
// Nem szép számok. Keressünk tisztább egyeneseket:
// e1: y = x + 2
// e2: y = -2x + 8
// e3: y = x/2 - 1
// A = e1∩e2: x+2 = -2x+8 => 3x = 6 => x = 2, y = 4. A = (2, 4).
// B = e1∩e3: x+2 = x/2 - 1 => x/2 = -3 => x = -6, y = -4. B = (-6, -4).
// C = e2∩e3: -2x+8 = x/2 - 1 => -5x/2 = -9 => x = 18/5 = 3.6, y = 4/5 × ... nem szép.
// Próbáljunk:  e1: y = x,  e2: y = -x + 6,  e3: y = 3
// A = e1∩e2 = (3, 3).  B = e1∩e3 = (3, 3). Nem — itt a 3 egyenes egy pontban metszi. Szóval
// e1: y = x,  e2: y = -x + 6,  e3: y = -1.
// A = e1∩e2 = (3,3). B = e1∩e3: y=-1 => x=-1. B = (-1, -1). C = e2∩e3: -1 = -x+6 => x=7. C = (7, -1).
// Háromszög csúcsai: A(3,3), B(-1,-1), C(7,-1).
// Terület: BC a y=-1 egyenesen, hossza 7-(-1) = 8. Magasság A-tól y=-1-ig: 3-(-1) = 4. T = 8*4/2 = 16.
// Szép. De a check value = 10... Javítsuk: T = 16.

function GeometryFig() {
  const xMin = -3, xMax = 9, yMin = -3, yMax = 5;
  const sx = (v) => 50 + ((v - xMin) / (xMax - xMin)) * 420;
  const sy = (v) => 40 + (1 - (v - yMin) / (yMax - yMin)) * 280;
  return (
    <SvgCanvas width={520} height={360} viewBox="0 0 520 360">
      <Axes x={50} y={40} w={420} h={280} xMin={-3} xMax={9} yMin={-3} yMax={5} xStep={1} yStep={1} />
      {/* e1: y = x */}
      <line x1={sx(-3)} y1={sy(-3)} x2={sx(5)} y2={sy(5)} stroke="#2563eb" strokeWidth="1.8" />
      <text x={sx(4.6)} y={sy(4.6) - 6} fontSize="12" fill="#1e40af">$e_1: y = x$</text>
      {/* e2: y = -x + 6 */}
      <line x1={sx(-3)} y1={sy(9)} x2={sx(9)} y2={sy(-3)} stroke="#dc2626" strokeWidth="1.8" />
      <text x={sx(7.5)} y={sy(-1.4)} fontSize="12" fill="#b91c1c">$e_2: y = -x + 6$</text>
      {/* e3: y = -1 */}
      <line x1={sx(-3)} y1={sy(-1)} x2={sx(9)} y2={sy(-1)} stroke="#16a34a" strokeWidth="1.8" />
      <text x={sx(-2.7)} y={sy(-1) - 6} fontSize="12" fill="#15803d">$e_3: y = -1$</text>
      {/* Háromszög csúcsai és kitöltés */}
      <polygon
        points={`${sx(3)},${sy(3)} ${sx(-1)},${sy(-1)} ${sx(7)},${sy(-1)}`}
        fill="#fef3c7"
        fillOpacity="0.6"
        stroke="#111827"
        strokeWidth="1.5"
      />
      <circle cx={sx(3)} cy={sy(3)} r="4" fill="#111827" />
      <text x={sx(3) + 6} y={sy(3) - 6} fontSize="13" fontWeight="bold">A(3; 3)</text>
      <circle cx={sx(-1)} cy={sy(-1)} r="4" fill="#111827" />
      <text x={sx(-1) - 40} y={sy(-1) + 16} fontSize="13" fontWeight="bold">B(-1; -1)</text>
      <circle cx={sx(7)} cy={sy(-1)} r="4" fill="#111827" />
      <text x={sx(7) + 6} y={sy(-1) + 16} fontSize="13" fontWeight="bold">C(7; -1)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adottak a következő egyenesek:
- $e_1:\\ y = x$
- $e_2:\\ y = -x + 6$
- $e_3:\\ y = -1$

a) Határozza meg a három egyenes **páronkénti metszéspontjait**!
b) Számítsa ki az így keletkező háromszög **területét**!
c) Adja meg a háromszög **körülírt körének** egyenletét!`,
  figure: () => <GeometryFig />,
  asked: [
    { key: 'csucsok', label: 'a) A háromszög csúcsai' },
    { key: 'terulet', label: 'b) A háromszög területe' },
    { key: 'kor', label: 'c) Körülírt kör egyenlete' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — a) Metszéspontok kiszámítása',
      points: 5,
      body: `**$A = e_1 \\cap e_2$**: $x = -x + 6 \\Rightarrow 2x = 6 \\Rightarrow x = 3$, $y = 3$. Tehát $A(3;\\ 3)$.

**$B = e_1 \\cap e_3$**: $y = -1$ és $y = x$ miatt $x = -1$. Tehát $B(-1;\\ -1)$.

**$C = e_2 \\cap e_3$**: $-1 = -x + 6 \\Rightarrow x = 7$. Tehát $C(7;\\ -1)$.

A három egyenes tehát egy **háromszöget** alkot, csúcsai $A(3;\\ 3)$, $B(-1;\\ -1)$, $C(7;\\ -1)$.`,
      figure: () => <GeometryFig />,
    },
    {
      title: '2. lépés — b) Terület — alap és magasság',
      points: 3,
      body: `A $BC$ oldal a $y = -1$ egyenesen fekszik, tehát **vízszintes**. Hossza:
$$|BC| = |7 - (-1)| = 8.$$

Az $A$ csúcs merőleges távolsága ettől a vízszintes egyenestől:
$$m_A = |y_A - (-1)| = |3 - (-1)| = 4.$$

A háromszög területe:
$$T = \\dfrac{|BC| \\cdot m_A}{2} = \\dfrac{8 \\cdot 4}{2} = 16\\ \\text{területegység}.$$`,
    },
    {
      title: '3. lépés — Ellenőrzés determinánsképlettel',
      points: 2,
      body: `Használjuk a koordináta-geometriai területképletet:
$$T = \\dfrac{1}{2} \\left| x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B) \\right|.$$

Behelyettesítve:
$$T = \\dfrac{1}{2} \\left| 3(-1 - (-1)) + (-1)(-1 - 3) + 7(3 - (-1)) \\right|$$
$$= \\dfrac{1}{2} \\left| 0 + 4 + 28 \\right| = \\dfrac{32}{2} = 16. \\checkmark$$`,
    },
    {
      title: '4. lépés — c) A körülírt kör középpontjának keresése',
      points: 4,
      body: `A körülírt kör **középpontja** egyenlő távolságra van mindhárom csúcstól. A keresési elv: két oldal felezőmerőlegesének metszéspontja.

A $BC$ oldal felezőpontja $\\left(\\tfrac{-1 + 7}{2};\\ -1\\right) = (3;\\ -1)$. $BC$ vízszintes, így felezőmerőlegese **függőleges** egyenes:
$$x = 3.$$

Az $AB$ oldal felezőpontja $\\left(\\tfrac{3 + (-1)}{2};\\ \\tfrac{3 + (-1)}{2}\\right) = (1;\\ 1)$, iránya $(1;\\ 1)$, tehát a felezőmerőleges iránya $(1;\\ -1)$, ami a meredekség $-1$:
$$y - 1 = -1 \\cdot (x - 1) \\Rightarrow y = -x + 2.$$

Metszéspont ($x = 3$ és $y = -x + 2$ alapján): $y = -3 + 2 = -1$. **Középpont**: $K(3;\\ -1)$.

Sugár: $r = |KA| = \\sqrt{(3 - 3)^2 + (-1 - 3)^2} = \\sqrt{0 + 16} = 4$.

**Ellenőrzés**: $|KB| = \\sqrt{(3 - (-1))^2 + (-1 - (-1))^2} = \\sqrt{16} = 4$ ✓, $|KC| = \\sqrt{(3-7)^2 + 0} = 4$ ✓.`,
    },
    {
      title: '5. lépés — A kör egyenlete',
      points: 2,
      body: `A körülírt kör egyenlete:
$$(x - 3)^2 + (y + 1)^2 = 16.$$

**Érdekesség**: mivel a $K$ középpont pont a $BC$ oldal felezőpontja ($B$ és $C$ között, ráadásul $y = -1$-en), az $ABC$ háromszög **derékszögű** az $A$ csúcsban (Thálész-tétel megfordítása). Ez ellenőrizhető: $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = (-4) \\cdot 4 + (-4) \\cdot (-4) = -16 + 16 = 0$. ✓`,
    },
  ],
  finalAnswer: {
    csucsok: '$A(3;\\ 3)$, $B(-1;\\ -1)$, $C(7;\\ -1)$',
    terulet: '$T = 16$ területegység',
    kor: '$(x - 3)^2 + (y + 1)^2 = 16$',
  },
  usedFormulas: [
    'két egyenes metszéspontja: egyenletrendszerként',
    'háromszög területe: $T = \\dfrac{a \\cdot m_a}{2}$',
    'koordinátás területképlet (determináns)',
    'felezőmerőleges: adott szakaszra merőleges, felezőponton átmenő egyenes',
    'kör egyenlete: $(x-u)^2 + (y-v)^2 = r^2$',
  ],
};

export default { meta, problem, solution };
