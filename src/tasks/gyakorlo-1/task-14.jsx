import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-14',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.A',
  number: 14,
  title: 'Háromszög — Pitagorasz, koszinusztétel és terület',
  points: 13,
  topics: ['síkgeometria', 'trigonometria'],
  difficulty: 3,
  fgvt: [
    { page: 55, note: 'koszinusztétel' },
    { page: 54, note: 'szinusztétel' },
    { page: 62, note: 'háromszög' },
    { page: 67, note: 'Pitagorasz-tétel' },
  ],
  estimatedMinutes: 20,
};

/*
  Háromszög ABC:
  AB = c = 10 cm, AC = b = 7 cm, BAC∠ = α = 60°
  a) BC = a: koszinusztétellel
     a² = b² + c² - 2bc cos α = 49 + 100 - 2·7·10·0,5 = 149 - 70 = 79
     a = √79 ≈ 8,888
  b) terület: T = (1/2) b c sin α = (1/2)·7·10·sin 60° = 35·(√3/2) ≈ 30,31
  c) beírt kör sugara: r = T / s, ahol s = (a+b+c)/2
     s = (√79 + 7 + 10)/2 ≈ (8,888 + 17)/2 ≈ 12,944
     r ≈ 30,31 / 12,944 ≈ 2,342
  d) a β szög a szinusztétellel vagy koszinusztétellel
     sin β / b = sin α / a → sin β = b sin α / a = 7 · 0,866 / 8,888 ≈ 0,682
     β ≈ arcsin(0,682) ≈ 42,99°
*/

const A = { x: 80, y: 240 };
const B = { x: 380, y: 240 };
// C-t úgy helyezzük, hogy az ábra olvasható legyen; a valódi számokat a magyarázat tartalmazza
const C = { x: 190, y: 65 };

function TriangleFig({ highlight = 'none' }) {
  return (
    <SvgCanvas width={480} height={300} viewBox="0 0 480 300">
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill={highlight === 'area' ? '#fde68a' : '#e0e7ff'}
        fillOpacity="0.35"
        stroke="#1e3a8a"
        strokeWidth="2"
      />
      {[A, B, C].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#111" />
      ))}
      <text x={A.x - 12} y={A.y + 18} fontSize="16" fontWeight="bold" fill="#111">A</text>
      <text x={B.x + 6} y={B.y + 18} fontSize="16" fontWeight="bold" fill="#111">B</text>
      <text x={C.x - 12} y={C.y - 6} fontSize="16" fontWeight="bold" fill="#111">C</text>
      {/* oldalcímkék */}
      <text x={(A.x + B.x) / 2} y={A.y + 22} fontSize="14" fill="#92400e" textAnchor="middle">
        c = 10 cm
      </text>
      <text x={(A.x + C.x) / 2 - 28} y={(A.y + C.y) / 2} fontSize="14" fill="#92400e">
        b = 7 cm
      </text>
      <text x={(B.x + C.x) / 2 + 4} y={(B.y + C.y) / 2 - 10} fontSize="14" fill={highlight === 'a' ? '#dc2626' : '#92400e'}>
        a = ?
      </text>
      {/* α szög az A-nál */}
      <path d="M 112 240 A 32 32 0 0 0 108 222" stroke="#2563eb" strokeWidth="2" fill="none" />
      <text x={125} y={220} fontSize="13" fill="#2563eb" fontWeight="bold">α = 60°</text>
      {/* β jelölése B-nél — csak d) lépésnél kiemelve */}
      {highlight === 'beta' && (
        <>
          <path d="M 350 240 A 30 30 0 0 0 355 225" stroke="#dc2626" strokeWidth="2" fill="none" />
          <text x={315} y={225} fontSize="13" fill="#dc2626" fontWeight="bold">β = ?</text>
        </>
      )}
      {/* beírt kör — csak c) lépésnél */}
      {highlight === 'inradius' && (
        <>
          <circle cx="195" cy="178" r="38" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
          <text x={200} y={180} fontSize="12" fill="#059669" fontWeight="bold">r</text>
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $ABC$ háromszögben $c = AB = 10$ cm, $b = AC = 7$ cm, és a $BAC$ szög $\\alpha = 60°$.

**a)** Mekkora az $a = BC$ oldal hossza? ($4$ pont)

**b)** Mekkora a háromszög területe? ($3$ pont)

**c)** Mekkora a háromszög beírt körének sugara? ($3$ pont)

**d)** Mekkora a $B$-nél lévő $\\beta$ szög? ($3$ pont)

Az eredményeket két tizedesjegyre kerekítve adja meg!`,
  figure: () => <TriangleFig />,
  asked: [
    { key: 'a', label: 'a) $a = ?$ cm' },
    { key: 'T', label: 'b) $T = ?$ cm²' },
    { key: 'r', label: 'c) $r = ?$ cm' },
    { key: 'beta', label: 'd) $\\beta = ?°$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — A koszinusztétel felírása',
      points: 2,
      body: `A háromszög két oldalát ($b = 7$, $c = 10$) és a közöttük lévő szöget ($\\alpha = 60°$) ismerjük — ez pont a **koszinusztétel** (fgv. tábla 55. old.) feltétele:

$$a^2 = b^2 + c^2 - 2 b c \\cos \\alpha.$$

$\\cos 60° = \\dfrac{1}{2}$ (nevezetes szög).`,
      figure: () => <TriangleFig highlight="a" />,
    },
    {
      title: 'a) 2. lépés — Behelyettesítés',
      points: 1,
      body: `$$a^2 = 7^2 + 10^2 - 2 \\cdot 7 \\cdot 10 \\cdot \\dfrac{1}{2} = 49 + 100 - 70 = 79.$$

Tehát:

$$a = \\sqrt{79} \\approx 8{,}888 \\ \\text{cm}.$$`,
      figure: () => <TriangleFig highlight="a" />,
    },
    {
      title: 'a) 3. lépés — Eredmény és plauzibilitás',
      points: 1,
      body: `Két tizedesjegyre: $\\boxed{a \\approx 8{,}89 \\ \\text{cm}}$.

**Plauzibilitás:** a háromszög-egyenlőtlenség szerint $|b - c| < a < b + c$, azaz $3 < a < 17$, és valóban $8{,}89$ ezen belül van. ✓`,
      figure: () => <TriangleFig highlight="a" />,
    },

    {
      title: 'b) 1. lépés — Terület képlet két oldal és közrefogott szöggel',
      points: 1,
      body: `A háromszög területe két oldal és a közöttük lévő szöggel:

$$T = \\dfrac{b c \\sin \\alpha}{2}.$$

$\\sin 60° = \\dfrac{\\sqrt{3}}{2} \\approx 0{,}866$.`,
      figure: () => <TriangleFig highlight="area" />,
    },
    {
      title: 'b) 2. lépés — Számolás',
      points: 2,
      body: `$$T = \\dfrac{7 \\cdot 10 \\cdot \\sin 60°}{2} = \\dfrac{70 \\sqrt{3}}{4} = \\dfrac{35 \\sqrt{3}}{2} \\approx \\dfrac{35 \\cdot 1{,}7321}{2} \\approx 30{,}31 \\ \\text{cm}^2.$$

$\\boxed{T \\approx 30{,}31 \\ \\text{cm}^2}$.`,
      figure: () => <TriangleFig highlight="area" />,
    },

    {
      title: 'c) 1. lépés — A beírt kör sugarának képlete',
      points: 1,
      body: `A **beírt kör sugara** a területből és a félkerületből számítható:

$$r = \\dfrac{T}{s}, \\quad \\text{ahol } s = \\dfrac{a + b + c}{2}.$$

(Ez az összefüggés a $T = r \\cdot s$ azonosságból adódik: a háromszög területe a beírt kör középpontjából a három oldalra húzott $r$ magasságú háromszögek területének összege.)`,
    },
    {
      title: 'c) 2. lépés — A félkerület kiszámítása',
      points: 1,
      body: `$$s = \\dfrac{a + b + c}{2} = \\dfrac{\\sqrt{79} + 7 + 10}{2} \\approx \\dfrac{8{,}888 + 17}{2} = \\dfrac{25{,}888}{2} \\approx 12{,}944.$$`,
    },
    {
      title: 'c) 3. lépés — A beírt kör sugara',
      points: 1,
      body: `$$r = \\dfrac{T}{s} \\approx \\dfrac{30{,}31}{12{,}944} \\approx 2{,}342 \\ \\text{cm}.$$

Két tizedesjegyre: $\\boxed{r \\approx 2{,}34 \\ \\text{cm}}$.`,
      figure: () => <TriangleFig highlight="inradius" />,
    },

    {
      title: 'd) 1. lépés — A szinusztétel felírása',
      points: 1,
      body: `A $\\beta$ szög a $b$ oldallal szemközt van. A szinusztétel (fgv. tábla 54. old.):

$$\\dfrac{b}{\\sin \\beta} = \\dfrac{a}{\\sin \\alpha} \\ \\Longrightarrow \\ \\sin \\beta = \\dfrac{b \\sin \\alpha}{a}.$$`,
      figure: () => <TriangleFig highlight="beta" />,
    },
    {
      title: 'd) 2. lépés — Behelyettesítés',
      points: 1,
      body: `$$\\sin \\beta = \\dfrac{7 \\cdot \\sin 60°}{\\sqrt{79}} = \\dfrac{7 \\cdot 0{,}8660}{8{,}888} \\approx \\dfrac{6{,}062}{8{,}888} \\approx 0{,}6821.$$`,
    },
    {
      title: 'd) 3. lépés — A szög kiszámítása',
      points: 1,
      body: `$$\\beta = \\arcsin(0{,}6821) \\approx 42{,}99°.$$

Két tizedesjegyre: $\\boxed{\\beta \\approx 42{,}99°}$.

**Ellenőrzés** (szögösszeg): $\\gamma = 180° - 60° - 42{,}99° \\approx 77{,}01°$. Mivel $b < c$, a vele szemközti $\\beta < \\gamma$ kell legyen, és valóban $42{,}99° < 77{,}01°$. ✓`,
      figure: () => <TriangleFig highlight="beta" />,
    },
  ],
  finalAnswer: {
    a: '$a = \\sqrt{79} \\approx 8{,}89$ cm',
    T: '$T \\approx 30{,}31$ cm²',
    r: '$r \\approx 2{,}34$ cm',
    beta: '$\\beta \\approx 42{,}99°$',
  },
  usedFormulas: [
    'koszinusztétel: $a^2 = b^2 + c^2 - 2bc \\cos \\alpha$',
    'terület: $T = \\dfrac{bc \\sin \\alpha}{2}$',
    'beírt kör sugara: $r = \\dfrac{T}{s}$',
    'szinusztétel: $\\dfrac{b}{\\sin \\beta} = \\dfrac{a}{\\sin \\alpha}$',
  ],
};

export default { meta, problem, solution };
