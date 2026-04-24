import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-17',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.B',
  number: 17,
  title: 'Négyzet alapú gúla — térfogat, felszín, szögek',
  points: 17,
  topics: ['térgeometria', 'síkgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 76, note: 'gúla térfogata és felszíne' },
    { page: 67, note: 'Pitagorasz-tétel' },
    { page: 57, note: 'szögfüggvények' },
  ],
  estimatedMinutes: 25,
};

/*
  ─────────────────────────────────────────────────────────────────────────────
  GEOMETRIA — négyzet alapú egyenes gúla
    - alapél:            a = 8 cm
    - test-magasság:     m = 10 cm
    - alap átlója:       d = a·√2 = 8√2 ≈ 11,314 cm
    - félátló (alap kp.-tól sarokig): d/2 = 4√2 ≈ 5,657 cm
    - oldalél:           b = √((d/2)² + m²) = √(32 + 100) = √132 ≈ 11,489 cm
    - alapél felezőpont — alap középpont távolság: a/2 = 4 cm
    - oldallap-magasság: m_l = √((a/2)² + m²) = √(16 + 100) = √116 ≈ 10,770 cm
    - oldallap és alaplap hajlásszöge (ϕ):  tan ϕ = m / (a/2) = 10/4 = 2,5
                                             ϕ = arctg(2,5) ≈ 68,20°
    - testátló/oldalél és alaplap szöge (ψ): tan ψ = m / (d/2) = 10 / (4√2) ≈ 1,7678
                                              ψ = arctg(1,7678) ≈ 60,50°
    - térfogat:          V = a² · m / 3 = 64·10/3 ≈ 213,33 cm³
    - egy oldallap területe:  T_l = a · m_l / 2 = 8 · √116 / 2 = 4√116 ≈ 43,08 cm²
    - palást:                 P = 4 · T_l = 16√116 ≈ 172,32 cm²
    - felszín:                A = a² + P = 64 + 16√116 ≈ 236,32 cm²
*/

// 2D perspektivikus "ferdetengelyes" vetület a gúlához.
// A pyramid viewBox-a: 520 × 360.
// Alap középpontja a rajzon: (260, 240).
// Az alap négyzetét "ferdén" rajzoljuk (trapéz-szerű alakzattal).
//   Csúcsok (rajzban):
//     A (elől-bal)    = (150, 285)
//     B (elől-jobb)   = (370, 285)
//     C (hátul-jobb)  = (330, 205)
//     D (hátul-bal)   = (190, 205)
//     E (csúcs)       = (260,  50)
//     O (alap közép)  = (260, 245)
//     M_AB (AB felez.) = (260, 285)  — az elülső oldalél felezőpontja
//     M_CD (CD felez.) = (260, 205)  — a hátsó oldalél felezőpontja (a rajzon)
//
// Hátsó élek (AD, DC, CB közül a D és C érintett részei) szaggatottak.

function PyramidFigure({ step = 0 }) {
  // step: 0 = alap ábra feliratokkal (a, m)
  //       1 = térfogat — a, m, O kiemelve, alap kitöltve
  //       2 = oldalél — félátló és oldalél derékszögű háromszög kiemelve
  //       3 = felszín — oldallap-magasság (m_l) kiemelve, egy oldallap kitöltve
  //       4 = hajlásszög — ϕ (oldallap-alaplap) kiemelve az elülső háromszögben
  const A = { x: 150, y: 285 };
  const B = { x: 370, y: 285 };
  const C = { x: 330, y: 205 };
  const D = { x: 190, y: 205 };
  const E = { x: 260, y: 50 };
  const O = { x: 260, y: 245 };
  const Mab = { x: 260, y: 285 }; // AB felezőpontja (elölső)
  // A hátsó szaggatott élek: DA, DC. Az oldalélek közül DE szaggatott.
  const showV = step === 1;
  const showEdge = step === 2;
  const showLat = step === 3;
  const showAngle = step === 4;

  return (
    <SvgCanvas width={520} height={360} viewBox="0 0 520 360">
      {/* Alap kitöltése a térfogat lépésben */}
      {showV && (
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="#fde68a"
          fillOpacity="0.55"
          stroke="none"
        />
      )}
      {/* Egy oldallap kitöltése a felszín lépésben — az elülső EAB háromszög */}
      {showLat && (
        <polygon
          points={`${E.x},${E.y} ${A.x},${A.y} ${B.x},${B.y}`}
          fill="#bfdbfe"
          fillOpacity="0.6"
          stroke="none"
        />
      )}

      {/* Alap élei — a látható (AB, BC) folyamatos, a hátsó (CD, DA) szaggatott */}
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#111827" strokeWidth="2.5" />
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#111827" strokeWidth="2.5" />
      <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="#6b7280" strokeWidth="1.8" strokeDasharray="5 4" />
      <line x1={D.x} y1={D.y} x2={A.x} y2={A.y} stroke="#6b7280" strokeWidth="1.8" strokeDasharray="5 4" />

      {/* Oldalélek: EA, EB folyamatos; EC folyamatos; ED szaggatott */}
      <line x1={E.x} y1={E.y} x2={A.x} y2={A.y} stroke="#111827" strokeWidth="2.5" />
      <line x1={E.x} y1={E.y} x2={B.x} y2={B.y} stroke="#111827" strokeWidth="2.5" />
      <line
        x1={E.x}
        y1={E.y}
        x2={C.x}
        y2={C.y}
        stroke={showEdge ? '#dc2626' : '#111827'}
        strokeWidth={showEdge ? 3 : 2.5}
      />
      <line x1={E.x} y1={E.y} x2={D.x} y2={D.y} stroke="#6b7280" strokeWidth="1.8" strokeDasharray="5 4" />

      {/* Gúla magassága E -> O (szaggatott, mert belső vonal) */}
      <line
        x1={E.x}
        y1={E.y}
        x2={O.x}
        y2={O.y}
        stroke={showV || showEdge || showAngle ? '#2563eb' : '#2563eb'}
        strokeWidth={showV || showEdge || showAngle ? 2.5 : 2}
        strokeDasharray="4 3"
      />
      {/* Alap félátlója O -> C (piros, az oldalél kiszámításához) */}
      {showEdge && (
        <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} stroke="#dc2626" strokeWidth="2.2" strokeDasharray="3 3" />
      )}
      {/* Oldallap-magasság: E -> M_AB (az elülső oldallapon) */}
      {(showLat || showAngle) && (
        <line x1={E.x} y1={E.y} x2={Mab.x} y2={Mab.y} stroke="#16a34a" strokeWidth="2.5" />
      )}
      {/* A szög-lépésben O -> M_AB is kell (a síkbeli alap-felező) */}
      {showAngle && (
        <line x1={O.x} y1={O.y} x2={Mab.x} y2={Mab.y} stroke="#dc2626" strokeWidth="2.2" strokeDasharray="3 3" />
      )}

      {/* Csúcsok */}
      {[A, B, C, D, E, O].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.4" fill="#111827" />
      ))}

      {/* Csúcsfeliratok */}
      <text x={A.x - 8} y={A.y + 16} fontSize="14" fontWeight="bold" fill="#111827" textAnchor="end">A</text>
      <text x={B.x + 8} y={B.y + 16} fontSize="14" fontWeight="bold" fill="#111827" textAnchor="start">B</text>
      <text x={C.x + 10} y={C.y - 4} fontSize="14" fontWeight="bold" fill="#111827" textAnchor="start">C</text>
      <text x={D.x - 10} y={D.y - 4} fontSize="14" fontWeight="bold" fill="#111827" textAnchor="end">D</text>
      <text x={E.x} y={E.y - 10} fontSize="14" fontWeight="bold" fill="#111827" textAnchor="middle">E</text>
      <text x={O.x + 10} y={O.y + 4} fontSize="12" fill="#374151" textAnchor="start">O</text>

      {/* Alapél-címke "a = 8 cm" */}
      <text x={(A.x + B.x) / 2} y={A.y + 30} fontSize="14" fontWeight="bold" fill="#92400e" textAnchor="middle">
        a = 8 cm
      </text>
      {/* Magasság-címke "m = 10 cm" */}
      <text x={O.x + 16} y={(E.y + O.y) / 2} fontSize="14" fontWeight="bold" fill="#2563eb" textAnchor="start">
        m = 10 cm
      </text>

      {/* Lépésspecifikus extra címkék */}
      {showEdge && (
        <>
          {/* félátló jelölése: d/2 = 4√2 */}
          <text x={(O.x + C.x) / 2 + 6} y={(O.y + C.y) / 2 - 4} fontSize="12" fill="#dc2626">
            d/2 = 4√2
          </text>
          {/* oldalél EC-n */}
          <text x={(E.x + C.x) / 2 + 12} y={(E.y + C.y) / 2} fontSize="13" fontWeight="bold" fill="#dc2626">
            b = √132 ≈ 11,49
          </text>
        </>
      )}
      {showLat && (
        <>
          {/* oldallap-magasság címke */}
          <text x={E.x + 14} y={(E.y + Mab.y) / 2} fontSize="13" fontWeight="bold" fill="#16a34a">
            m_l ≈ 10,77
          </text>
          {/* egy oldallap területe a színezett háromszögben */}
          <text x={(E.x + A.x + B.x) / 3} y={(E.y + A.y + B.y) / 3 + 28} fontSize="12" fill="#1d4ed8" textAnchor="middle">
            T_l = a·m_l/2
          </text>
        </>
      )}
      {showAngle && (
        <>
          {/* ϕ szögjel az M_AB pontban (oldallap-alaplap szöge) */}
          <path d="M 260 260 A 24 24 0 0 1 278 252" stroke="#dc2626" strokeWidth="2" fill="none" />
          <text x={285} y={260} fontSize="14" fontWeight="bold" fill="#dc2626">ϕ</text>
          <text x={Mab.x - 6} y={Mab.y - 6} fontSize="12" fill="#dc2626" textAnchor="end">4 cm</text>
          <text x={(Mab.x + O.x) / 2} y={Mab.y - 4} fontSize="11" fill="#6b7280" textAnchor="middle">(= a/2)</text>
        </>
      )}

      {/* Cím */}
      <text x="260" y="24" fontSize="14" fontWeight="bold" fill="#111827" textAnchor="middle">
        Négyzet alapú gúla: ABCD alap, E csúcs
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy négyzet alapú **egyenes gúla** (csúcsa $E$, alapja $ABCD$) alapéle $a = 8$ cm, testmagassága $m = 10$ cm.

**a)** Mekkora a gúla térfogata? ($3$ pont)

**b)** Mekkora a gúla oldalélének hossza? ($4$ pont)

**c)** Mekkora a gúla felszíne? ($5$ pont)

**d)** Mekkora szöget zár be egy oldallap az alaplappal? ($5$ pont)

A válaszokat két tizedesjegyre kerekítve adja meg!`,
  figure: () => <PyramidFigure step={0} />,
  asked: [
    { key: 'V', label: 'a) $V = ?$ cm³' },
    { key: 'edge', label: 'b) oldalél $b = ?$ cm' },
    { key: 'A', label: 'c) $A_{felszín} = ?$ cm²' },
    { key: 'phi', label: 'd) $\\varphi = ?$° (oldallap-alaplap)' },
  ],
};

export const solution = {
  steps: [
    // ================== a) TÉRFOGAT ==================
    {
      title: 'a) 1. lépés — A gúla térfogatának képlete',
      points: 1,
      body: `A **gúla térfogatára** vonatkozó képlet (fgv. tábla, 76. old.):

$$V = \\dfrac{T_{\\text{alap}} \\cdot m}{3}.$$

Mivel a gúla alapja **négyzet** $a = 8$ cm oldallal, az alap területe:

$$T_{\\text{alap}} = a^2 = 8^2 = 64 \\ \\text{cm}^2.$$`,
      figure: () => <PyramidFigure step={1} />,
    },
    {
      title: 'a) 2. lépés — Behelyettesítés és számítás',
      points: 2,
      body: `A testmagasság $m = 10$ cm, így:

$$V = \\dfrac{64 \\cdot 10}{3} = \\dfrac{640}{3} \\approx 213{,}33 \\ \\text{cm}^3.$$

**Eredmény:** $V \\approx 213{,}33$ cm³.`,
      figure: () => <PyramidFigure step={1} />,
    },

    // ================== b) OLDALÉL ==================
    {
      title: 'b) 1. lépés — Az alap átlója és félátlója',
      points: 1,
      body: `Az **oldalél** egy egyenes gúlánál az a szakasz, amely a csúcsot (E) az alap egy sarkával (pl. C) köti össze.

Tekintsük az $E O C$ **derékszögű háromszöget** (ahol $O$ az alap középpontja, és $EO \\perp$ alaplap). A befogók:
- $EO = m = 10$ cm (testmagasság),
- $OC = d/2$ = az alap félátlója.

A négyzet **átlójának** képlete (Pitagorasz-tétellel):

$$d = a \\sqrt{2} = 8\\sqrt{2} \\ \\text{cm}, \\quad \\text{tehát} \\quad \\dfrac{d}{2} = 4\\sqrt{2} \\approx 5{,}657 \\ \\text{cm}.$$`,
      figure: () => <PyramidFigure step={2} />,
    },
    {
      title: 'b) 2. lépés — Pitagorasz-tétel az $EOC$ háromszögben',
      points: 2,
      body: `Az $EOC$ derékszögű háromszögben az **átfogó** éppen a keresett $b = EC$ oldalél:

$$b^2 = m^2 + \\left(\\dfrac{d}{2}\\right)^2 = 10^2 + (4\\sqrt{2})^2 = 100 + 32 = 132.$$

Tehát:

$$b = \\sqrt{132} = 2\\sqrt{33} \\approx 11{,}489 \\ \\text{cm}.$$`,
      figure: () => <PyramidFigure step={2} />,
    },
    {
      title: 'b) 3. lépés — Az oldalél eredménye',
      points: 1,
      body: `Két tizedesjegyre kerekítve:

$$\\boxed{b \\approx 11{,}49 \\ \\text{cm}}.$$

**Ellenőrzés:** az oldalélnek nagyobbnak kell lennie mint $m = 10$ cm (hiszen a magasság csak az $EOC$ háromszög egyik befogója), és valóban $11{,}49 > 10$.`,
      figure: () => <PyramidFigure step={2} />,
    },

    // ================== c) FELSZÍN ==================
    {
      title: 'c) 1. lépés — Az oldallap-magasság',
      points: 2,
      body: `A gúla **felszíne** az alap + palást, vagyis:

$$A = T_{\\text{alap}} + P = a^2 + 4 T_l,$$

ahol $T_l$ egy oldallap területe. Mivel egy oldallap **egyenlő szárú háromszög**, amelynek alapja $a = 8$ cm, szükségünk van az **oldallap-magasságra** ($m_l$): ez az oldallap csúcsból az alapjára bocsátott merőleges hossza, vagyis az $EM_{AB}$ szakasz, ahol $M_{AB}$ az $AB$ alapél felezőpontja.

Tekintsük az $E O M_{AB}$ derékszögű háromszöget:
- $EO = m = 10$ cm,
- $OM_{AB} = \\dfrac{a}{2} = 4$ cm (a négyzet középpontja és egy oldalának felezőpontja közti távolság).

Pitagorasz-tétellel:

$$m_l^2 = m^2 + \\left(\\dfrac{a}{2}\\right)^2 = 100 + 16 = 116, \\quad m_l = \\sqrt{116} \\approx 10{,}770 \\ \\text{cm}.$$`,
      figure: () => <PyramidFigure step={3} />,
    },
    {
      title: 'c) 2. lépés — Egy oldallap területe és a palást',
      points: 2,
      body: `Egy oldallap (egyenlő szárú háromszög $a$ alappal, $m_l$ magassággal) területe:

$$T_l = \\dfrac{a \\cdot m_l}{2} = \\dfrac{8 \\cdot \\sqrt{116}}{2} = 4\\sqrt{116} \\approx 43{,}08 \\ \\text{cm}^2.$$

Négy egybevágó oldallap van, tehát a **palást**:

$$P = 4 T_l = 16\\sqrt{116} \\approx 172{,}33 \\ \\text{cm}^2.$$`,
      figure: () => <PyramidFigure step={3} />,
    },
    {
      title: 'c) 3. lépés — A teljes felszín',
      points: 1,
      body: `A felszín az alap + palást:

$$A = a^2 + P = 64 + 16\\sqrt{116} \\approx 64 + 172{,}33 = 236{,}33 \\ \\text{cm}^2.$$

Két tizedesjegyre kerekítve:

$$\\boxed{A \\approx 236{,}33 \\ \\text{cm}^2}.$$`,
      figure: () => <PyramidFigure step={3} />,
    },

    // ================== d) HAJLÁSSZÖG ==================
    {
      title: 'd) 1. lépés — Az oldallap és alaplap hajlásszögének értelmezése',
      points: 2,
      body: `Két sík (oldallap és alaplap) **hajlásszögét** úgy mérjük, hogy a közös élre mindkét síkban merőleges félegyenest állítunk, és ezek szögét vesszük.

Itt a közös él pl. $AB$; az alaplapban $AB$-re merőleges és a gúla belseje felé mutató irány $O M_{AB}$ irány (hossza $\\frac{a}{2} = 4$ cm), az oldallapban pedig $E M_{AB}$ irány (hossza $m_l = \\sqrt{116}$).

Így az $O M_{AB} E$ **derékszögű háromszöget** tekintjük, amelyben:
- $EO = m = 10$ cm (az $OM_{AB}$-re merőleges befogó),
- $O M_{AB} = \\dfrac{a}{2} = 4$ cm (a szomszédos befogó),
- a keresett szög $\\varphi = \\angle(M_{AB})$.`,
      figure: () => <PyramidFigure step={4} />,
    },
    {
      title: 'd) 2. lépés — Tangens szögfüggvény',
      points: 2,
      body: `A derékszögű $O M_{AB} E$ háromszögben $\\varphi$ a $M_{AB}$-nél lévő szög; a vele **szemközti** befogó $EO = m$, a **szomszédos** befogó $O M_{AB} = a/2$. Így:

$$\\tan \\varphi = \\dfrac{\\text{szemközti}}{\\text{szomszédos}} = \\dfrac{m}{a/2} = \\dfrac{10}{4} = 2{,}5.$$

Ebből:

$$\\varphi = \\arctan(2{,}5) \\approx 68{,}1986°.$$`,
      figure: () => <PyramidFigure step={4} />,
    },
    {
      title: 'd) 3. lépés — Az eredmény és ellenőrzés',
      points: 1,
      body: `Két tizedesjegyre kerekítve:

$$\\boxed{\\varphi \\approx 68{,}20°}.$$

**Ellenőrzés** (koszinusszal): $\\cos \\varphi = \\dfrac{a/2}{m_l} = \\dfrac{4}{\\sqrt{116}} \\approx \\dfrac{4}{10{,}770} \\approx 0{,}3714$, és $\\arccos(0{,}3714) \\approx 68{,}20°$ — egyezik.`,
      figure: () => <PyramidFigure step={4} />,
    },
  ],
  finalAnswer: {
    V: '$V \\approx 213{,}33$ cm³',
    edge: '$b = \\sqrt{132} \\approx 11{,}49$ cm',
    A: '$A \\approx 236{,}33$ cm²',
    phi: '$\\varphi \\approx 68{,}20°$',
  },
  usedFormulas: [
    'gúla térfogata: $V = T_{\\text{alap}} \\cdot m / 3$',
    'négyzet átlója: $d = a\\sqrt{2}$',
    'Pitagorasz-tétel: $c^2 = a^2 + b^2$',
    'oldallap-magasság: $m_l^2 = m^2 + (a/2)^2$',
    'felszín: $A = T_{\\text{alap}} + 4 T_l$',
    'szögfüggvény: $\\tan \\varphi = m / (a/2)$',
  ],
};

export default { meta, problem, solution };
