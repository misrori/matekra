import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-06',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'II',
  number: 6,
  title: 'Csonka kúp — térfogat, palást, hajlásszög',
  points: 16,
  topics: ['térgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 76, note: 'csonka kúp térfogata' },
    { page: 77, note: 'kúp palástja' },
    { page: 57, note: 'szögfüggvények' },
  ],
  estimatedMinutes: 22,
};

/*
  Csonka kúp:
    R = 6 cm (alsó sugár)
    r = 2 cm (felső sugár)
    m = 9 cm (magasság)
  Alkotó (palástvonal):
    a = sqrt( (R - r)^2 + m^2 ) = sqrt( 16 + 81 ) = sqrt(97) ≈ 9.849
  Térfogat:
    V = (π m / 3) (R^2 + R r + r^2) = (π · 9 / 3)(36 + 12 + 4) = 3π · 52 = 156 π ≈ 490.09
  Alapok területe:
    T_alap = R^2 π = 36 π
    T_felső = r^2 π = 4 π
  Palást (csonka kúp) területe:
    P = π (R + r) · a = π · 8 · sqrt(97) ≈ 247.69
  Felszín = T_alap + T_felső + P = 36π + 4π + 8π sqrt(97) = 40π + 8π sqrt(97) ≈ 125.66 + 247.69 ≈ 373.35
  Hajlásszög (alkotó és az alaplap szöge):
    tan φ = m / (R - r) = 9 / 4 = 2.25
    φ = arctan(2.25) ≈ 66.04°
  További kérdés: vízzel tölthető térfogat egy bizonyos szintig.
    Ha a csonka kúp "fordítva" áll (alsó sugár R = 6 a tálca felől, de a csonka kúp
    ilyenkor nyilván a nagyobb oldal alul), és 3 cm magas vízszintig töltjük, akkor
    a víz által elfoglalt rész egy kisebb csonka kúp:
      - alsó R = 6, felső r_3 = R - (R-r) * 3/9 = 6 - 4 * (1/3) = 6 - 4/3 = 14/3 ≈ 4.667
      - magasság 3
      V_víz = (π · 3 / 3)(R^2 + R r_3 + r_3^2)
            = π · (36 + 6 · 14/3 + (14/3)^2)
            = π · (36 + 28 + 196/9)
            = π · (64 + 196/9)
            = π · (576/9 + 196/9)
            = π · 772 / 9
            ≈ 269.44 cm³
*/

function Frustum({ step = 0 }) {
  // Ferde rajz: alsó kör ellipszissel
  const Rpx = 110; // R vetülete (cx = alul)
  const rpx = 38;  // r vetülete (cx = felül)
  const ry = 22;   // ellipszis rövid féltengelye
  const rry = 8;
  const cx = 260;
  const bottomY = 300;
  const topY = 100;
  // víz szintje (3 cm magasság, teljes magasság 9 cm)  -> a rajzon 1/3
  const waterY = bottomY - ((topY - bottomY) / 9) * -3; // bottomY + (topY - bottomY)*(3/9) -- numerikus:
  const wY = bottomY + (topY - bottomY) * (3 / 9);
  // interpolált sugár a víz felszínén
  const wR = Rpx + (rpx - Rpx) * (3 / 9); // = 110 + (38-110)/3 = 110 - 24 = 86
  const wRy = ry + (rry - ry) * (3 / 9);  // interpolált rövid féltengely
  return (
    <SvgCanvas width={560} height={360} viewBox="0 0 560 360">
      {/* víz kiemelése */}
      {step === 4 && (
        <path
          d={`
            M ${cx - Rpx} ${bottomY}
            A ${Rpx} ${ry} 0 0 0 ${cx + Rpx} ${bottomY}
            L ${cx + wR} ${wY}
            A ${wR} ${wRy} 0 0 1 ${cx - wR} ${wY}
            Z
          `}
          fill="#60a5fa"
          fillOpacity="0.55"
          stroke="#1e40af"
          strokeWidth="1"
        />
      )}
      {/* alsó kör */}
      <ellipse cx={cx} cy={bottomY} rx={Rpx} ry={ry} fill={step === 1 ? '#fde68a' : '#f3f4f6'} stroke="#111" strokeWidth="1.8" />
      {/* palást vonalai */}
      <line x1={cx - Rpx} y1={bottomY} x2={cx - rpx} y2={topY} stroke={step === 2 ? '#dc2626' : '#111'} strokeWidth={step === 2 ? 2.5 : 2} />
      <line x1={cx + Rpx} y1={bottomY} x2={cx + rpx} y2={topY} stroke={step === 2 ? '#dc2626' : '#111'} strokeWidth={step === 2 ? 2.5 : 2} />
      {/* felső kör */}
      <ellipse cx={cx} cy={topY} rx={rpx} ry={rry} fill={step === 1 ? '#fde68a' : '#f9fafb'} stroke="#111" strokeWidth="1.8" />
      {/* víz vonala a paláston kívül (ha step === 4) */}
      {step === 4 && (
        <ellipse cx={cx} cy={wY} rx={wR} ry={wRy} fill="none" stroke="#1e40af" strokeWidth="1.5" />
      )}
      {/* magasság szaggatott vonal belül */}
      <line x1={cx} y1={bottomY} x2={cx} y2={topY} stroke="#2563eb" strokeWidth="2" strokeDasharray="5 4" />
      <text x={cx + 8} y={(bottomY + topY) / 2} fontSize="13" fill="#2563eb" fontWeight="bold">m = 9</text>

      {/* méretfeliratok */}
      <text x={cx} y={bottomY + 38} fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">2R = 12 cm</text>
      <text x={cx} y={topY - 22} fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">2r = 4 cm</text>

      {/* alkotó szög (ha step = 3) */}
      {step === 3 && (
        <g>
          <path d={`M ${cx - Rpx + 28} ${bottomY} A 28 28 0 0 0 ${cx - Rpx + 28 - 22} ${bottomY - 18}`} fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x={cx - Rpx + 6} y={bottomY - 14} fontSize="13" fill="#dc2626" fontWeight="bold">φ</text>
          <text x={cx - Rpx + 26} y={bottomY - 50} fontSize="11" fill="#dc2626">R − r = 4</text>
        </g>
      )}
      {step === 2 && (
        <text x={cx + Rpx + 10} y={(bottomY + topY) / 2 - 20} fontSize="13" fontWeight="bold" fill="#dc2626">
          a = √97 ≈ 9,85
        </text>
      )}
      {step === 4 && (
        <>
          <text x={cx + wR + 4} y={wY + 4} fontSize="12" fill="#1e40af" fontWeight="bold">3 cm</text>
          <text x={cx - wR - 4} y={wY + 4} fontSize="12" fill="#1e40af" textAnchor="end">víz szint</text>
        </>
      )}
      <text x="280" y="24" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        Csonka kúp: R = 6, r = 2, m = 9 (cm)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy **forgási csonka kúp** alakú edény alsó körének sugara $R = 6$ cm, a felső körének sugara $r = 2$ cm, a magassága $m = 9$ cm. Az edény csúcsa felül van (a kisebb kör), tehát felülről tölthető.

**a)** Számítsa ki az edény alkotójának (palástvonalának) hosszát! ($2$ pont)

**b)** Mekkora az edény (csonka kúp) **térfogata**? Adja meg $\\pi$-vel és tizedes alakban is! ($3$ pont)

**c)** Számítsa ki az edény **teljes felszínét** (a két kör + a palást). ($4$ pont)

**d)** Mekkora szöget zár be az edény palástja (azaz egy alkotó) az **alaplappal**? Adja meg fokban, két tizedesjegyre kerekítve. ($3$ pont)

**e)** Feltöltjük az edényt $3$ cm **magasságig** vízzel (alulról mérve). Mennyi víz fért bele? ($4$ pont)`,
  figure: () => <Frustum step={0} />,
  asked: [
    { key: 'a', label: 'a) $a = ?$ cm' },
    { key: 'b', label: 'b) $V = ?$ cm³' },
    { key: 'c', label: 'c) $A = ?$ cm²' },
    { key: 'd', label: 'd) $\\varphi = ?°$' },
    { key: 'e', label: 'e) $V_{víz} = ?$ cm³' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — Az alkotó mint derékszögű háromszög átfogója',
      points: 1,
      body: `Ha a csonka kúpot egy axiális síkkal elvágjuk, az alkotó egy derékszögű háromszög átfogója, ahol a befogók:
- $R - r = 4$ cm (a két sugár különbsége, vízszintes),
- $m = 9$ cm (a magasság, függőleges).`,
      figure: () => <Frustum step={2} />,
    },
    {
      title: 'a) 2. lépés — Pitagorasz-tétel',
      points: 1,
      body: `$$a^2 = (R - r)^2 + m^2 = 4^2 + 9^2 = 16 + 81 = 97.$$

$$a = \\sqrt{97} \\approx 9{,}849 \\text{ cm}.$$

$$\\boxed{a = \\sqrt{97} \\approx 9{,}85 \\text{ cm}.}$$`,
    },
    {
      title: 'b) 1. lépés — Csonka kúp térfogatának képlete',
      points: 1,
      body: `A fgv. tábla (76. old.) szerint:

$$V = \\dfrac{\\pi m}{3} \\bigl( R^2 + R r + r^2 \\bigr).$$`,
      figure: () => <Frustum step={1} />,
    },
    {
      title: 'b) 2. lépés — Behelyettesítés',
      points: 2,
      body: `$R^2 = 36$, $R r = 12$, $r^2 = 4$, tehát:

$$V = \\dfrac{\\pi \\cdot 9}{3} \\cdot (36 + 12 + 4) = 3\\pi \\cdot 52 = 156\\,\\pi.$$

Számértékben ($\\pi \\approx 3{,}14159$):

$$V \\approx 156 \\cdot 3{,}14159 \\approx 490{,}088 \\text{ cm}^3.$$

$$\\boxed{V = 156\\pi \\text{ cm}^3 \\approx 490{,}09 \\text{ cm}^3.}$$`,
    },
    {
      title: 'c) 1. lépés — Az alapok területe',
      points: 1,
      body: `A két alap két kör:

$$T_R = R^2 \\pi = 36\\pi \\text{ cm}^2, \\qquad T_r = r^2 \\pi = 4\\pi \\text{ cm}^2.$$`,
    },
    {
      title: 'c) 2. lépés — A palást (csonka kúp palástjának) képlete',
      points: 1,
      body: `A csonka kúp palástja a fgv. tábla (77. old.) szerint:

$$P = \\pi (R + r) \\cdot a,$$

ahol $a$ az alkotó (az a/2 lépésből $a = \\sqrt{97}$).`,
    },
    {
      title: 'c) 3. lépés — A palást kiszámítása',
      points: 1,
      body: `$$P = \\pi (6 + 2) \\cdot \\sqrt{97} = 8\\pi \\sqrt{97}.$$

Számértékben: $P \\approx 8 \\cdot 3{,}14159 \\cdot 9{,}849 \\approx 247{,}69 \\text{ cm}^2.$`,
    },
    {
      title: 'c) 4. lépés — A teljes felszín',
      points: 1,
      body: `$$A = T_R + T_r + P = 36\\pi + 4\\pi + 8\\pi\\sqrt{97} = 40\\pi + 8\\pi\\sqrt{97}.$$

Számértékben: $A \\approx 125{,}66 + 247{,}69 \\approx 373{,}35 \\text{ cm}^2.$

$$\\boxed{A = 40\\pi + 8\\pi\\sqrt{97} \\approx 373{,}35 \\text{ cm}^2.}$$`,
    },
    {
      title: 'd) 1. lépés — A szög geometriai értelmezése',
      points: 1,
      body: `Egy alkotó és az alaplap szöge ($\\varphi$) abban a derékszögű háromszögben vizsgálható, amelynek befogói $(R - r) = 4$ cm és $m = 9$ cm; az átfogó az alkotó ($a$).

A $\\varphi$ szög az alkotónak az alaplappal bezárt szöge, tehát a „$m$ vs $(R-r)$" párban a **szemközti** befogó $m$, a **szomszédos** $(R - r)$.`,
      figure: () => <Frustum step={3} />,
    },
    {
      title: 'd) 2. lépés — Tangens és arctan',
      points: 2,
      body: `$$\\tan \\varphi = \\dfrac{m}{R - r} = \\dfrac{9}{4} = 2{,}25.$$

$$\\varphi = \\arctan(2{,}25) \\approx 66{,}0375°.$$

Két tizedesjegyre kerekítve:

$$\\boxed{\\varphi \\approx 66{,}04°.}$$

**Ellenőrzés:** $\\sin \\varphi = m/a = 9/\\sqrt{97} \\approx 0{,}9138$, $\\arcsin(0{,}9138) \\approx 66{,}04°$. ✓`,
    },
    {
      title: 'e) 1. lépés — A víz egy kisebb csonka kúp',
      points: 1,
      body: `A víz az edény aljánál 3 cm magas részét tölti ki. Mivel a sugár lineárisan változik a magassággal, a víz felszínén a sugár:

$$r_3 = R - (R - r) \\cdot \\dfrac{3}{9} = 6 - 4 \\cdot \\dfrac{1}{3} = 6 - \\dfrac{4}{3} = \\dfrac{14}{3} \\text{ cm} \\approx 4{,}667 \\text{ cm}.$$

A víz így egy csonka kúp: alsó sugara $R = 6$, felső sugara $r_3 = 14/3$, magassága $3$ cm.`,
      figure: () => <Frustum step={4} />,
    },
    {
      title: 'e) 2. lépés — A víz térfogata',
      points: 3,
      body: `$R^2 = 36$, $R \\cdot r_3 = 6 \\cdot \\frac{14}{3} = 28$, $r_3^2 = \\frac{196}{9}$.

$$V_\\text{víz} = \\dfrac{\\pi \\cdot 3}{3} \\cdot \\left( 36 + 28 + \\dfrac{196}{9} \\right) = \\pi \\cdot \\left( 64 + \\dfrac{196}{9} \\right).$$

Közös nevezőre hozva:

$$V_\\text{víz} = \\pi \\cdot \\left( \\dfrac{576}{9} + \\dfrac{196}{9} \\right) = \\pi \\cdot \\dfrac{772}{9} = \\dfrac{772\\pi}{9}.$$

Számértékben:

$$V_\\text{víz} \\approx \\dfrac{772 \\cdot 3{,}14159}{9} \\approx \\dfrac{2425{,}3}{9} \\approx 269{,}48 \\text{ cm}^3.$$

$$\\boxed{V_\\text{víz} = \\dfrac{772\\pi}{9} \\approx 269{,}48 \\text{ cm}^3 \\approx 0{,}269 \\text{ liter}.}$$`,
    },
  ],
  finalAnswer: {
    a: '$a = \\sqrt{97} \\approx 9{,}85$ cm',
    b: '$V = 156\\pi \\approx 490{,}09$ cm³',
    c: '$A = 40\\pi + 8\\pi\\sqrt{97} \\approx 373{,}35$ cm²',
    d: '$\\varphi \\approx 66{,}04°$',
    e: '$V_\\text{víz} = \\dfrac{772\\pi}{9} \\approx 269{,}48$ cm³',
  },
  usedFormulas: [
    'Pitagorasz-tétel',
    'csonka kúp térfogata: $V = \\frac{\\pi m}{3}(R^2+Rr+r^2)$',
    'csonka kúp palástja: $P = \\pi (R+r) \\cdot a$',
    '$\\tan \\varphi = m/(R-r)$',
    'lineáris interpoláció a magasság mentén',
  ],
};

export default { meta, problem, solution };
