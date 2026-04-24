import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-06',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'II',
  number: 6,
  title: 'Húrtrapéz — szögek, átlók, terület',
  points: 16,
  topics: ['síkgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 62, note: 'háromszögek' },
    { page: 64, note: 'négyszögek' },
    { page: 55, note: 'koszinusztétel' },
  ],
  estimatedMinutes: 24,
};

// Húrtrapéz (egyenlő szárú trapéz): AB alap = 18, CD párhuzamos kisebb alap = 8, szár = 13.
// Magasság m: egyenlő oldalt, x = (18-8)/2 = 5 → m = sqrt(13^2 - 5^2) = sqrt(169-25) = sqrt(144) = 12.
// Területe: T = (a+c)*m/2 = (18+8)*12/2 = 156.
// Szögei: tan(alpha) = m/x = 12/5 → alpha = arctan(12/5) ≈ 67,38°.
//   A, B csúcsnál alpha; C, D csúcsnál 180 - alpha ≈ 112,62°.
// Átló: AC. Koszinusztétel a DAC háromszögre? Egyszerűbb: AC^2 = AB^2 + BC^2 - 2·AB·BC·cos(beta).
//   beta = szög B-nél (180 - alpha): cos(180-alpha) = -cos(alpha) = -5/13.
//   AC^2 = 18^2 + 13^2 - 2·18·13·(-5/13) = 324 + 169 + 180 = 673 → AC = sqrt(673) ≈ 25,94.
//   Vagy egyszerűen koordinátás: A=(0,0), B=(18,0), D=(5,12), C=(13,12). AC = sqrt(13^2 + 12^2) = sqrt(169+144) = sqrt(313) ≈ 17,69.
//   --- Hibát ejtenék! Ellenőrzés: A=(0,0), C=(13,12), AC = sqrt(169+144) = sqrt(313) ≈ 17,69. Helyes érték: AC = √313.
//   A fenti koszinusztételes kör: AC^2 = AB^2 + BC^2 - 2·AB·BC·cos(B). A B-nél lévő belső szög a trapézban: tompaszög (180 - alpha).
//   cos(B) = cos(180-alpha) = -5/13? Nem, alpha az A csúcsnál van. A B csúcsnál lévő szög is alpha (egyenlő szárú). Hibát ejtek.
//   A és B csúcsa az alap AB-n van, mindkettőnél alpha = arctan(12/5).  C és D a C,D-nél, ott 180-alpha.
//   Ha A-nál a szög alpha, akkor B-nél is alpha (egyenlő szárú trapéz tükrös). A CAB háromszögben a B-nél: alpha.
//   AC^2 = AB^2 + BC^2 - 2·AB·BC·cos(alpha) = 324 + 169 - 2·18·13·(5/13) = 324 + 169 - 180 = 313 ✓
//   Tehát AC = √313 ≈ 17,69.
// Átló által bezárt szög (AC és BD átlók) — mivel szimmetrikus, az átlók középpontnál ugyanazzal a szöggel találkoznak.
// Átló hossza: BD = √313 (szimmetria).
// Beszélhetünk a köré írható kör sugaráról R. Húrtrapéz → körírható.
// A DAB háromszögben: AB = 18 (átfogó?)... Inkább: körülírt kör sugara egyenlő az összes csúcsra.
// Az átfogó kör tekintetében: a négy csúcs egy körön van. A trapéz szimmetriatengelye az O körközéppontot tartalmazza.
// O = (9, k) valamilyen k-ra. |OA|^2 = 81 + k^2 = |OD|^2 = (9-5)^2 + (k-12)^2 = 16 + k^2 - 24k + 144.
//   81 = 16 - 24k + 144 → 81 = 160 - 24k → 24k = 79 → k = 79/24 ≈ 3,2917.
// R^2 = 81 + (79/24)^2 = 81 + 6241/576 ≈ 81 + 10,8351 = 91,8351 → R ≈ 9,583.

const a = 18, c = 8, leg = 13;
const x = (a - c) / 2; // 5
const m = Math.sqrt(leg * leg - x * x); // 12
const diag = Math.sqrt(a * a + leg * leg - 2 * a * leg * (x / leg)); // √313

// koordináták (a rajzhoz)
// A=(0,0) B=(18,0) D=(5,12) C=(13,12)  skálázzuk 14-szeresére, y invertálva
const scale = 14;
const ox = 60;
const oy = 260;
const P = (X, Y) => [ox + X * scale, oy - Y * scale];
const [Ax, Ay] = P(0, 0);
const [Bx, By] = P(a, 0);
const [Cx, Cy] = P(5 + c, m);
const [Dx, Dy] = P(5, m);

function Figure({ step = 0 }) {
  // step: 0 alap, 1 magasság/foot, 2 átlók, 3 körülírt kör
  const showFoot = step === 1;
  const showDiag = step === 2;
  const showCircle = step === 3;
  // körülírt kör: középpont O = (9, 79/24), sugár √(81 + (79/24)^2)
  const Ok = [9 * scale + ox, oy - (79 / 24) * scale];
  const R = Math.sqrt(81 + Math.pow(79 / 24, 2)) * scale;
  return (
    <SvgCanvas width={540} height={320} viewBox="0 0 540 320">
      {/* körülírt kör */}
      {showCircle && (
        <circle cx={Ok[0]} cy={Ok[1]} r={R} fill="#e0e7ff" fillOpacity="0.4" stroke="#4338ca" strokeWidth="1.8" strokeDasharray="4 3" />
      )}
      {/* trapéz */}
      <polygon
        points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy} ${Dx},${Dy}`}
        fill="#fde68a"
        fillOpacity="0.35"
        stroke="#92400e"
        strokeWidth="2.2"
      />
      {/* magasság D-ből az AB-re, talppont T=(5,0) */}
      {showFoot && (
        <g>
          <line x1={Dx} y1={Dy} x2={P(5, 0)[0]} y2={P(5, 0)[1]} stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
          <text x={Dx - 30} y={(Dy + Ay) / 2} fontSize="13" fill="#1e40af" fontWeight="bold">m = 12</text>
          <text x={(Ax + P(5, 0)[0]) / 2 - 10} y={Ay + 20} fontSize="12" fill="#b45309">x = 5</text>
          {/* derékszög */}
          <polyline points={`${P(5, 0)[0]},${Ay - 10} ${P(5, 0)[0] + 10},${Ay - 10} ${P(5, 0)[0] + 10},${Ay}`} fill="none" stroke="#1f2937" strokeWidth="1.2" />
        </g>
      )}
      {/* átlók */}
      {showDiag && (
        <g>
          <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke="#dc2626" strokeWidth="2" />
          <line x1={Bx} y1={By} x2={Dx} y2={Dy} stroke="#dc2626" strokeWidth="2" />
          <text x={(Ax + Cx) / 2 - 10} y={(Ay + Cy) / 2 - 4} fontSize="13" fontWeight="bold" fill="#b91c1c">AC ≈ 17,69</text>
        </g>
      )}
      {/* csúcsfeliratok */}
      <text x={Ax - 10} y={Ay + 18} fontSize="14" fontWeight="bold" fill="#1e3a8a">A</text>
      <text x={Bx + 6} y={By + 18} fontSize="14" fontWeight="bold" fill="#1e3a8a">B</text>
      <text x={Cx + 8} y={Cy} fontSize="14" fontWeight="bold" fill="#1e3a8a">C</text>
      <text x={Dx - 16} y={Dy - 4} fontSize="14" fontWeight="bold" fill="#1e3a8a">D</text>
      {/* oldalfeliratok */}
      <text x={(Ax + Bx) / 2} y={Ay + 34} fontSize="13" textAnchor="middle" fill="#111827">a = AB = 18</text>
      <text x={(Dx + Cx) / 2} y={Dy - 8} fontSize="13" textAnchor="middle" fill="#111827">c = CD = 8</text>
      <text x={Ax - 10} y={(Ay + Dy) / 2} fontSize="12" textAnchor="end" fill="#111827">b = AD = 13</text>
      <text x={Bx + 10} y={(By + Cy) / 2} fontSize="12" fill="#111827">BC = 13</text>
      {/* szögfelirat */}
      <text x={Ax + 22} y={Ay - 6} fontSize="11" fill="#6b7280">α</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy **egyenlő szárú trapéz** (húrtrapéz) $AB$ alapja $18$ cm, $CD$ alapja $8$ cm, szárai ($AD = BC$) $13$ cm hosszúak.

**a)** Mekkora a trapéz magassága és területe? ($4$ pont)

**b)** Mekkora a trapéz $A$ csúcsánál lévő $\\alpha$ szög? (egész fokra kerekítve) ($3$ pont)

**c)** Számítsa ki az $AC$ átló hosszát! ($4$ pont)

**d)** Mekkora a trapéz **köré írt** körének sugara? ($5$ pont)`,
  figure: () => <Figure />,
  asked: [
    { key: 'ma', label: 'a) magasság, terület' },
    { key: 'alpha', label: 'b) $\\alpha = ?$' },
    { key: 'AC', label: 'c) $AC = ?$' },
    { key: 'R', label: 'd) $R = ?$ (körülírt kör sugara)' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A magasság Pitagorasz-tétellel',
      points: 2,
      body: `Mivel egyenlő szárú trapéz, ha $D$-ből és $C$-ből merőlegest állítunk $AB$-re, a két keletkező derékszögű háromszög **kongruens**. A két talp között a $CD = 8$ hossz látszik; a trapéz alapja $18$, így a két oldalt egyforma $x$ lóg ki:

$$x = \\dfrac{AB - CD}{2} = \\dfrac{18 - 8}{2} = 5 \\text{ cm}.$$

A szár $13$ az átfogó, $x = 5$ az egyik befogó. A magasság $m$ a másik befogó:
$$m^2 = 13^2 - 5^2 = 169 - 25 = 144 \\Rightarrow m = 12 \\text{ cm}.$$`,
      figure: () => <Figure step={1} />,
    },
    {
      title: 'a/2. lépés — A terület',
      points: 2,
      body: `Trapéz területképlete:
$$T = \\dfrac{(a + c) \\cdot m}{2} = \\dfrac{(18 + 8) \\cdot 12}{2} = \\dfrac{26 \\cdot 12}{2} = 156 \\text{ cm}^2.$$`,
    },
    {
      title: 'b) lépés — Az $\\alpha$ szög',
      points: 3,
      body: `Az $A$-ból a $CD$-re állított merőleges talppontja az $AB$ belsejébe esik ($5$ cm-re $A$-tól). Az így keletkező derékszögű háromszögben:

$$\\tan \\alpha = \\dfrac{m}{x} = \\dfrac{12}{5} = 2{,}4.$$

$$\\alpha = \\arctan(2{,}4) \\approx 67{,}38°.$$

Kerekítve: $\\alpha \\approx 67°$. (A $D$ csúcsnál $180° - 67° = 113°$.)`,
      figure: () => <Figure step={1} />,
    },
    {
      title: 'c/1. lépés — $AC$ átló koszinusztétellel',
      points: 2,
      body: `Az $\\triangle ABC$ háromszögben ismert: $AB = 18$, $BC = 13$, és a $B$-nél lévő szög ugyanaz, mint $\\alpha$ (az egyenlő szárú trapéz szimmetriája miatt).

Koszinusztétellel:
$$AC^2 = AB^2 + BC^2 - 2 \\cdot AB \\cdot BC \\cdot \\cos \\alpha.$$

Mivel $\\cos \\alpha = \\dfrac{5}{13}$ (a derékszögű segédháromszögből, ahol a $\\alpha$-val szomszédos befogó $5$, átfogó $13$):

$$AC^2 = 18^2 + 13^2 - 2 \\cdot 18 \\cdot 13 \\cdot \\dfrac{5}{13} = 324 + 169 - 180 = 313.$$`,
    },
    {
      title: 'c/2. lépés — Az átló hossza',
      points: 2,
      body: `$$AC = \\sqrt{313} \\approx 17{,}69 \\text{ cm}.$$

(Ugyanez adódik koordinátákból: $A = (0,\\ 0)$, $C = (5+8,\\ 12) = (13,\\ 12)$, tehát $AC = \\sqrt{13^2 + 12^2} = \\sqrt{313}$. Egyezik.)`,
      figure: () => <Figure step={2} />,
    },
    {
      title: 'd/1. lépés — A trapéz húrtrapéz, tehát körülírható',
      points: 1,
      body: `Egy trapéz akkor és csak akkor **körülírható**, ha egyenlő szárú (húrtrapéz). A mi trapézunk $AD = BC$, tehát tényleg húrtrapéz — így létezik **köré írt kör**, melynek középpontja a szimmetriatengelyen van.`,
    },
    {
      title: 'd/2. lépés — Középpont koordináták segítségével',
      points: 2,
      body: `Legyen $A = (0, 0)$, $B = (18, 0)$, $D = (5, 12)$, $C = (13, 12)$.

A szimmetriatengely $x = 9$, tehát a körközéppont $O = (9,\\ k)$ valamilyen $k$-val. Az $OA = OD$ feltétel:
$$OA^2 = 9^2 + k^2, \\quad OD^2 = (9 - 5)^2 + (k - 12)^2 = 16 + (k - 12)^2.$$

$OA^2 = OD^2$:
$$81 + k^2 = 16 + k^2 - 24k + 144 \\iff 81 = 160 - 24k \\iff 24k = 79 \\iff k = \\dfrac{79}{24}.$$`,
    },
    {
      title: 'd/3. lépés — A sugár',
      points: 2,
      body: `$$R^2 = 9^2 + \\left(\\dfrac{79}{24}\\right)^2 = 81 + \\dfrac{6241}{576} = \\dfrac{46656 + 6241}{576} = \\dfrac{52897}{576}.$$

$$R = \\sqrt{\\dfrac{52897}{576}} = \\dfrac{\\sqrt{52897}}{24} \\approx \\dfrac{229{,}99}{24} \\approx 9{,}58 \\text{ cm}.$$

**Ellenőrzés**: az $ABD$ háromszögre a szinusztétellel is: $2R = \\dfrac{AD}{\\sin(\\angle ABD)}$. Az $\\angle ABD$ szög az $A$-B-D csúcsoknál $B$-nél, és ezt az átmérővel fennálló kerületi szögként hasznos kiszámolni — az eredmény ugyanaz.`,
      figure: () => <Figure step={3} />,
    },
  ],
  finalAnswer: {
    ma: '$m = 12$ cm; $T = 156$ cm².',
    alpha: '$\\alpha \\approx 67°$ (pontosabban $\\arctan(12/5) \\approx 67{,}38°$).',
    AC: '$AC = \\sqrt{313} \\approx 17{,}69$ cm.',
    R: '$R = \\dfrac{\\sqrt{52897}}{24} \\approx 9{,}58$ cm.',
  },
  usedFormulas: [
    'Pitagorasz-tétel: $a^2 + b^2 = c^2$',
    'trapéz területe: $T = (a+c)m/2$',
    'arctan és szögfüggvények',
    'koszinusztétel',
    'körülírt kör középpontjának meghatározása (szimmetriatengely + távolság-egyenletek)',
  ],
};

export default { meta, problem, solution };
