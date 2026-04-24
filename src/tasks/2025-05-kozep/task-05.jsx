import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-05',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 5,
  title: 'Szinusztétel — hegyesszögű háromszög',
  points: 3,
  topics: ['trigonometria', 'síkgeometria'],
  difficulty: 2,
  fgvt: [{ page: 54, note: 'szinusztétel' }],
  estimatedMinutes: 5,
};

// Háromszög elrendezése a rajzon:
//  - B bal alsó csúcs, C jobb alsó csúcs; az alap BC = 6 cm (a 6 cm-es oldal).
//  - A felső csúcs; AB = 5 cm (az 5 cm-es oldal).
//  - A 6 cm-es oldal (BC) "szomszéd szöge" a C csúcsnál van: 60° (γ).
//  - Az 5 cm-es oldal (AB) "szomszéd szöge" a B csúcsnál van: α (keressük).
//
// Koordináta-számítás (SVG-hez):
//   B = (0, 0), C = (6, 0) (matekos koord.rendszerben, cm egység).
//   A szög C-nél 60°, tehát a CA oldal irányvektora (-cos60°, sin60°) = (-0.5, 0.866).
//   CA hossza legyen b; ekkor A = C + b · (-0.5, 0.866).
//   A B-nél lévő szög α ≈ 46.2°, a C-nél 60°, tehát A-nál 180° - 60° - 46.2° = 73.8°.
//   A szinusztétel: b / sin α = 6 / sin 73.8°, és AB = 5 = c / sin γ ·... itt AB = c = 5.
//   A rajzhoz elég egy szemléletes, pontos arányú háromszög. Használjuk a
//   BC = 6 és AB = 5, γ = 60° adatokat: szinusztétel szerint a megoldást később mutatjuk;
//   itt helyileg számoljuk ki A-t úgy, hogy AB = 5 valóban teljesüljön.
//
// Számítás:
//   B = (0,0), C = (6,0). A C-nél lévő belső szög 60°, tehát a CA oldal a BC-től
//   mérve (C-ből kifelé) 180° - 60° = 120°-os szöget zár be az x-tengellyel pozitív irányban.
//   A = C + b · (cos 120°, sin 120°) = (6 - 0.5 b, 0.866 b).
//   AB-nek 5-nek kell lennie: |A - B| = sqrt((6 - 0.5b)^2 + (0.866b)^2) = 5.
//   (6 - 0.5b)^2 + 0.75 b^2 = 25
//   36 - 6b + 0.25 b^2 + 0.75 b^2 = 25
//   b^2 - 6b + 11 = 0   ->  b = (6 ± sqrt(36-44))/2  -> diszkrimináns negatív!
// Ez azt mutatja, hogy a 6 cm oldal és a vele szomszédos 60° + 5 cm átellenes oldal
// kombináció nem állít elő konzisztens háromszöget a fenti koord-elrendezésben.
// Az SVG-ábrához tehát egy KÖZEL-pontos, sematikus háromszöget rajzolunk, ahol
// az oldalak címkézése és a szögek nagyjából arányosak. A matematikai eredmény
// (α ≈ 46,2°) a szinusztételből független az ábra pontosságától.
//
// Sematikus rajz (SVG px):
//  B = (80, 220), C = (400, 220)  -> a BC "alap" vízszintes.
//  A = (260, 60)  -> hegyesszögű, A kb. felül középen.
//
// Címkézés:
//   - BC (alap) = 6 cm (szomszéd szöge C-nél = 60°)
//   - AB = 5 cm (szomszéd szöge B-nél = α keresett)
//   - CA = b cm (szemközti szöge B-nél, illetve az A-nál lévő szög szemközti oldala BC)
//
// A szinusztétel alkalmazása a feladatban:
//   a = BC = 6,   α' = szemközti szög A-nál (legyen γ_A)
//   c = AB = 5,   γ' = szemközti szög C-nél = 60° ??? — ÁLLJ.
//
// Pontosítás: az inventory szerint a 6 cm oldal szomszéd szöge 60°, vagyis ez a 60° szög
// azon csúcsnál van, amelyikben a 6 cm oldal találkozik egy másik oldallal. Ennek a
// 60°-os szögnek a szemközti oldala viszont NEM a 6 cm-es oldal, hanem a harmadik oldal.
// A hivatalos megoldás viszont a sin α / sin 60° = 5/6 arányt használja — tehát a
// szinusztétel itt úgy alkalmazódik, hogy a 60°-os szög SZEMKÖZTI oldala 6 cm, és az
// α SZEMKÖZTI oldala 5 cm. Eszerint "a 6 cm oldal szomszéd szöge" itt azt jelenti:
// a 6 cm oldallal szemben lévő szög 60°. Ezt a szöveget az útmutatóhoz igazítjuk.
//
// A rajzon: a 60° szöget az A csúcsnál helyezzük el (szemközti oldal: BC = 6),
// az α szöget pedig a B csúcsnál (szemközti oldal: AC = ?? — nem, szemben van CA,
// ami nem 5). Hmm.
//
// Másik értelmezés, ami egybevág a hivatalos válasszal: a szinusztétel szerint
//   a / sin α = b / sin β,
// és a hivatalos arány sin α / sin 60° = 5/6 ekvivalens azzal, hogy
//   5 / sin α = 6 / sin 60°,
// tehát az α SZEMKÖZTI oldala 5, a 60° SZEMKÖZTI oldala 6.
// A "6 cm oldal szomszédos szöge 60°" mondat egy kicsit pontatlan magyar megfogalmazás;
// a hivatalos útmutatót követjük.
//
// Rajz: A csúcs legyen a 60°-os szög csúcsa (szemközti oldala a = BC = 6).
//       B csúcsnál van α (szemközti oldala b = AC = 5).
//       C csúcsnál van γ (szemközti oldala c = AB).
//
// Sematikus koordináták a fent megadottakkal: B(80, 220), C(400, 220), A(260, 60).
//   AB hossza px-ben = sqrt((260-80)^2 + (60-220)^2) = sqrt(32400 + 25600) = sqrt(58000) ≈ 240.8
//   AC hossza px-ben = sqrt((400-260)^2 + (220-60)^2) = sqrt(19600 + 25600) = sqrt(45200) ≈ 212.6
//   BC = 320
// Az arány b:a:c = 212.6:320:240.8 ≈ 0.66:1:0.75. A valós 5:6:? arány (b=5, a=6).
// A c-t az 5 cm-nek felelteti meg a rajz (~0.75·6 ≈ 4.5, kicsit kisebb mint 5),
// de közel van — ez elegendő oktatási vizualizációnak.

function TriangleFigure({ step = 1 }) {
  // step: 1 = alap ábra adatokkal
  //       2 = szinusztétel kiemelése (szemközti oldalakat színezzük)
  //       3 = szögek kiszámítása
  //       4 = végső megoldás
  const Bx = 80, By = 220;
  const Cx = 400, Cy = 220;
  const Ax = 260, Ay = 60;

  const highlightOpposites = step >= 2;
  const showSin = step >= 3;
  const showResult = step >= 4;

  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      {/* Háromszög oldalai */}
      <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke={highlightOpposites ? '#dc2626' : '#1f2937'} strokeWidth={highlightOpposites ? 3.5 : 2.5} />
      <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#1f2937" strokeWidth={2.5} />
      <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke={highlightOpposites ? '#2563eb' : '#1f2937'} strokeWidth={highlightOpposites ? 3.5 : 2.5} />

      {/* Csúcsok */}
      <circle cx={Ax} cy={Ay} r={4} fill="#111827" />
      <circle cx={Bx} cy={By} r={4} fill="#111827" />
      <circle cx={Cx} cy={Cy} r={4} fill="#111827" />

      {/* Csúcsfeliratok */}
      <text x={Ax} y={Ay - 12} fontSize="16" fontWeight="bold" textAnchor="middle" fill="#111827">A</text>
      <text x={Bx - 14} y={By + 6} fontSize="16" fontWeight="bold" textAnchor="end" fill="#111827">B</text>
      <text x={Cx + 14} y={Cy + 6} fontSize="16" fontWeight="bold" textAnchor="start" fill="#111827">C</text>

      {/* Oldal címkék */}
      {/* BC = 6 (az A-val szemközti oldal, azaz "a") */}
      <text x={(Bx + Cx) / 2} y={By + 22} fontSize="14" textAnchor="middle" fill={highlightOpposites ? '#dc2626' : '#374151'} fontWeight="bold">
        a = 6 cm
      </text>
      {/* AC = 5 (a B-vel szemközti oldal, azaz "b") */}
      <text x={(Ax + Cx) / 2 + 22} y={(Ay + Cy) / 2 - 4} fontSize="14" fill={highlightOpposites ? '#2563eb' : '#374151'} fontWeight="bold">
        b = 5 cm
      </text>
      {/* AB = c (nem kérdéses, nincs megadva) */}
      <text x={(Ax + Bx) / 2 - 24} y={(Ay + By) / 2} fontSize="14" fill="#6b7280">
        c
      </text>

      {/* Szögjelek */}
      {/* 60° az A csúcsnál (szemben BC = 6) */}
      <path d={`M ${Ax - 18} ${Ay + 6} A 20 20 0 0 0 ${Ax + 18} ${Ay + 6}`} stroke="#dc2626" strokeWidth={2} fill="none" />
      <text x={Ax} y={Ay + 30} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#dc2626">60°</text>

      {/* α a B csúcsnál (szemben b = 5) */}
      <path d={`M ${Bx + 24} ${By - 4} A 26 26 0 0 0 ${Bx + 26} ${By - 14}`} stroke="#2563eb" strokeWidth={2} fill="none" />
      <text x={Bx + 38} y={By - 10} fontSize="14" fontWeight="bold" fill="#2563eb">α{showResult ? ' ≈ 46,2°' : ''}</text>

      {/* γ a C csúcsnál (nem kérdezett) */}
      <path d={`M ${Cx - 26} ${Cy - 10} A 26 26 0 0 0 ${Cx - 24} ${Cy - 2}`} stroke="#6b7280" strokeWidth={1.5} fill="none" />
      <text x={Cx - 40} y={Cy - 8} fontSize="13" textAnchor="end" fill="#6b7280">γ</text>

      {/* Szinusztétel formula kiemelése */}
      {showSin && (
        <g>
          <rect x={20} y={14} width={220} height={48} rx={8} fill="#fef3c7" stroke="#d97706" strokeWidth={1.5} />
          <text x={130} y={34} fontSize="13" textAnchor="middle" fill="#92400e" fontWeight="bold">Szinusztétel:</text>
          <text x={130} y={54} fontSize="14" textAnchor="middle" fill="#111827">a / sin A = b / sin B</text>
        </g>
      )}

      {/* Megjegyzés: hegyesszögű */}
      {step === 1 && (
        <text x={260} y={260} fontSize="12" textAnchor="middle" fill="#6b7280">
          hegyesszögű háromszög
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az ábrán látható hegyesszögű háromszög $6$ cm hosszú oldalával szemközti szög $60°$-os. Mekkora a háromszög $5$ cm hosszú oldalával szemközti szög? Megoldását részletezze!`,
  figure: () => <TriangleFigure step={1} />,
  asked: [{ key: 'alpha', label: '$\\alpha = ?$ (fokban)' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A szinusztétel felírása',
      points: 1,
      body: `A **szinusztétel** tetszőleges háromszögben kimondja, hogy egy oldal és a vele **szemközti** szög szinuszának hányadosa minden oldalra ugyanaz:

$$\\dfrac{a}{\\sin \\alpha_a} = \\dfrac{b}{\\sin \\alpha_b} = \\dfrac{c}{\\sin \\alpha_c} = 2R,$$

ahol $R$ a körülírt kör sugara.

Jelöljük:
- $a = 6$ cm — a $60°$-os szöggel szemközti oldal,
- $b = 5$ cm — a keresett $\\alpha$ szöggel szemközti oldal.

A szinusztétel rájuk felírva:

$$\\dfrac{5}{\\sin \\alpha} = \\dfrac{6}{\\sin 60°}.$$

Átrendezve a keresett szinusz kifejezhető.`,
      figure: () => <TriangleFigure step={2} />,
    },
    {
      title: '2. lépés — $\\sin \\alpha$ kiszámítása',
      points: 1,
      body: `Az előző arányból keresztbe szorozva:

$$\\sin \\alpha = \\dfrac{5 \\cdot \\sin 60°}{6} = \\dfrac{5}{6} \\cdot \\sin 60°.$$

A nevezetes szög értéke $\\sin 60° = \\dfrac{\\sqrt{3}}{2}$, így:

$$\\sin \\alpha = \\dfrac{5}{6} \\cdot \\dfrac{\\sqrt{3}}{2} = \\dfrac{5\\sqrt{3}}{12}.$$

Számértékben:

$$\\sin \\alpha \\approx \\dfrac{5 \\cdot 1{,}7320}{12} \\approx 0{,}7217.$$`,
      figure: () => <TriangleFigure step={3} />,
    },
    {
      title: '3. lépés — A szög meghatározása és a hegyesszög kiválasztása',
      points: 1,
      body: `A $\\sin \\alpha \\approx 0{,}7217$ egyenletnek a $[0°, 180°]$ tartományon két megoldása van:

- $\\alpha_1 = \\arcsin(0{,}7217) \\approx 46{,}2°$ (hegyesszög),
- $\\alpha_2 = 180° - 46{,}2° = 133{,}8°$ (tompaszög).

A feladat szerint a háromszög **hegyesszögű**, tehát minden szöge $90°$-nál kisebb. Így $\\alpha_2$ nem lehet megoldás, marad:

$$\\boxed{\\alpha \\approx 46{,}2°}.$$

**Ellenőrzés (vázlatos):** $60° + 46{,}2° = 106{,}2°$, tehát a harmadik szög $180° - 106{,}2° = 73{,}8°$ — valóban minden szög hegyesszög.`,
      figure: () => <TriangleFigure step={4} />,
    },
  ],
  finalAnswer: '$\\alpha \\approx 46{,}2°$',
  usedFormulas: [
    'szinusztétel: $\\dfrac{a}{\\sin \\alpha} = \\dfrac{b}{\\sin \\beta}$',
    '$\\sin 60° = \\dfrac{\\sqrt{3}}{2}$',
    'hegyesszögre az arcsin egyértelmű',
  ],
};

export default { meta, problem, solution };
