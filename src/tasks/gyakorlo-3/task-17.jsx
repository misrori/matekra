import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-17',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.B',
  number: 17,
  title: 'Csonka kúp — térfogat, felszín, oldalsíkszög',
  points: 17,
  topics: ['térgeometria', 'síkgeometria', 'trigonometria'],
  difficulty: 5,
  fgvt: [
    { page: 76, note: 'kúp, csonka kúp' },
    { page: 67, note: 'Pitagorasz-tétel' },
    { page: 57, note: 'szögfüggvények' },
  ],
  estimatedMinutes: 28,
};

// Csonka kúp:
// R = 10 cm (alsó sugár), r = 4 cm (felső sugár), m = 8 cm (magasság).
// a) V = (π·m/3) · (R² + R·r + r²) = (π·8/3)(100 + 40 + 16) = (8π/3)·156 = 1248π/3 = 416π ≈ 1306,90 cm³.
// b) alkotó: a = √(m² + (R-r)²) = √(64 + 36) = √100 = 10 cm.
// c) palást (csonka kúp): P = π·(R + r)·a = π·14·10 = 140π ≈ 439,82 cm².
//    felszín: A = R²π + r²π + P = 100π + 16π + 140π = 256π ≈ 804,25 cm².
// d) alkotó hajlásszöge az alaplappal: tan β = m / (R - r) = 8/6 = 4/3. β = arctg(4/3) ≈ 53,13°.
function FrustumFigure({ step = 0 }) {
  // 2D keresztmetszet elképzelés: trapéz (izoszkeles) + 3D "perspektíva" oldalsó ellipszissel.
  // Elhelyezés: alap középpontja (260, 260) y-nál. R = 120 (skálázott). m skálázva = 96, r = 48.
  const cxBase = 260, cyBase = 260;
  const Rs = 120, rs = 48, ms = 120;
  // Alapkör (ellipszis)
  const base = { cx: cxBase, cy: cyBase, rx: Rs, ry: Rs / 4 };
  const top = { cx: cxBase, cy: cyBase - ms, rx: rs, ry: rs / 4 };
  // Oldalélek
  const leftBottom = { x: cxBase - Rs, y: cyBase };
  const rightBottom = { x: cxBase + Rs, y: cyBase };
  const leftTop = { x: cxBase - rs, y: cyBase - ms };
  const rightTop = { x: cxBase + rs, y: cyBase - ms };

  return (
    <SvgCanvas width={520} height={380} viewBox="0 0 520 380">
      {/* Alap ellipszis — elöl folyamatos, hátsó szaggatott */}
      <path d={`M ${base.cx - base.rx} ${base.cy} A ${base.rx} ${base.ry} 0 0 0 ${base.cx + base.rx} ${base.cy}`} fill="none" stroke="#111827" strokeWidth="2.2" />
      <path d={`M ${base.cx - base.rx} ${base.cy} A ${base.rx} ${base.ry} 0 0 1 ${base.cx + base.rx} ${base.cy}`} fill="none" stroke="#6b7280" strokeWidth="1.6" strokeDasharray="5 4" />
      {/* Felső ellipszis */}
      <path d={`M ${top.cx - top.rx} ${top.cy} A ${top.rx} ${top.ry} 0 0 0 ${top.cx + top.rx} ${top.cy}`} fill="none" stroke="#111827" strokeWidth="2.2" />
      <path d={`M ${top.cx - top.rx} ${top.cy} A ${top.rx} ${top.ry} 0 0 1 ${top.cx + top.rx} ${top.cy}`} fill="none" stroke="#111827" strokeWidth="2.2" />
      {/* Oldalélek (alkotók) */}
      <line x1={leftBottom.x} y1={leftBottom.y} x2={leftTop.x} y2={leftTop.y} stroke={step === 2 ? '#dc2626' : '#111827'} strokeWidth={step === 2 ? 3 : 2.2} />
      <line x1={rightBottom.x} y1={rightBottom.y} x2={rightTop.x} y2={rightTop.y} stroke={step === 2 ? '#dc2626' : '#111827'} strokeWidth={step === 2 ? 3 : 2.2} />
      {/* Tengely (m) */}
      <line x1={cxBase} y1={cyBase - ms} x2={cxBase} y2={cyBase} stroke="#2563eb" strokeWidth="2" strokeDasharray="4 3" />
      {/* m cimke */}
      <text x={cxBase + 8} y={cyBase - ms / 2} fontSize="14" fontWeight="700" fill="#2563eb">m = 8</text>
      {/* R és r cimke */}
      <line x1={cxBase} y1={cyBase + 4} x2={cxBase + Rs} y2={cyBase + 4} stroke="#b45309" strokeWidth="2" />
      <text x={cxBase + Rs / 2} y={cyBase + 22} fontSize="14" fontWeight="700" fill="#b45309" textAnchor="middle">R = 10</text>
      <line x1={cxBase} y1={cyBase - ms - 4} x2={cxBase + rs} y2={cyBase - ms - 4} stroke="#b45309" strokeWidth="2" />
      <text x={cxBase + rs / 2} y={cyBase - ms - 10} fontSize="13" fontWeight="700" fill="#b45309" textAnchor="middle">r = 4</text>
      {/* Alkotó cimke (ha step = 2) */}
      {step === 2 && (
        <text x={leftBottom.x - 12} y={(leftBottom.y + leftTop.y) / 2} fontSize="14" fontWeight="700" fill="#dc2626" textAnchor="end">a = 10</text>
      )}
      {/* Hajlásszög (step = 4): jelölés a jobb oldalon, az alkotó és alap között */}
      {step === 4 && (
        <>
          <path d={`M ${rightBottom.x - 30} ${rightBottom.y} A 30 30 0 0 0 ${rightBottom.x - 30 * (120 / 150)} ${rightBottom.y - 30 * (96 / 150)}`} stroke="#9333ea" strokeWidth="2" fill="none" />
          <text x={rightBottom.x - 50} y={rightBottom.y - 14} fontSize="14" fontWeight="700" fill="#9333ea">β ≈ 53°</text>
        </>
      )}
      {/* Térfogat-kiemelés (step = 1) */}
      {step === 1 && (
        <polygon
          points={`${leftBottom.x},${leftBottom.y} ${rightBottom.x},${rightBottom.y} ${rightTop.x},${rightTop.y} ${leftTop.x},${leftTop.y}`}
          fill="#fde68a"
          fillOpacity="0.35"
        />
      )}
      {/* Felszín-kiemelés (step = 3): oldalsó palást */}
      {step === 3 && (
        <polygon
          points={`${leftBottom.x},${leftBottom.y} ${rightBottom.x},${rightBottom.y} ${rightTop.x},${rightTop.y} ${leftTop.x},${leftTop.y}`}
          fill="#bfdbfe"
          fillOpacity="0.45"
        />
      )}

      {/* Cím */}
      <text x="260" y="30" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Csonka kúp (R = 10 cm, r = 4 cm, m = 8 cm)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy **forgáskúp-szerű virágedény** csonka kúp alakú. Alsó kör alakú alapjának sugara $R = 10$ cm, felső kisebb körének sugara $r = 4$ cm, magassága $m = 8$ cm.

**a)** Mekkora a csonka kúp térfogata? ($4$ pont)

**b)** Mekkora a csonka kúp **alkotójának** hossza? ($3$ pont)

**c)** Mekkora a csonka kúp **felszíne** (alap + tető + palást)? ($5$ pont)

**d)** Mekkora szöget zár be az alkotó az alaplappal? ($5$ pont)

Minden eredményt két tizedesjegyre kerekítsen! ($\\pi \\approx 3{,}14159$)`,
  figure: () => <FrustumFigure step={0} />,
  asked: [
    { key: 'V', label: 'a) $V = ?$ cm³' },
    { key: 'a', label: 'b) alkotó $a = ?$ cm' },
    { key: 'A', label: 'c) $A = ?$ cm²' },
    { key: 'beta', label: 'd) $\\beta = ?$°' },
  ],
};

export const solution = {
  steps: [
    // a)
    {
      title: 'a) 1. lépés — A csonka kúp térfogatképlete',
      points: 2,
      body: `A csonka kúp térfogata (fgv. tábla $76.$ old.):

$$V = \\dfrac{\\pi \\cdot m}{3} \\cdot (R^2 + R r + r^2).$$

Értelmezés: a teljes kúp ($R$ sugarú, $m + m_1$ magasságú) térfogatából kivonjuk a levágott kis kúp térfogatát. A képlet ezt a különbséget adja zárt alakban.`,
      figure: () => <FrustumFigure step={1} />,
    },
    {
      title: 'a) 2. lépés — Behelyettesítés',
      points: 1,
      body: `Írjuk be $R = 10$, $r = 4$, $m = 8$:

$$R^2 + R r + r^2 = 100 + 40 + 16 = 156.$$`,
      figure: () => <FrustumFigure step={1} />,
    },
    {
      title: 'a) 3. lépés — Kiszámítás',
      points: 1,
      body: `$$V = \\dfrac{\\pi \\cdot 8}{3} \\cdot 156 = \\dfrac{1248 \\pi}{3} = 416 \\pi \\approx 1306{,}90 \\text{ cm}^3.$$`,
      figure: () => <FrustumFigure step={1} />,
    },

    // b)
    {
      title: 'b) 1. lépés — Az alkotó geometriai értelmezése',
      points: 1,
      body: `Az alkotó ($a$) az alsó kör egy pontjából a felső kör **felette** lévő pontjába vezető szakasz. Ha keresztmetszetben nézzük a csonka kúpot, akkor egy egyenlő szárú **trapézt** kapunk, az alkotó ennek az oldalszára.

Az alkotó, a magasság ($m$) és a két sugár különbsége ($R - r$) egy derékszögű háromszöget alkotnak, ahol:
- $m$ a magasság (függőleges befogó),
- $R - r = 6$ cm (vízszintes befogó),
- $a$ az átfogó (az alkotó).`,
      figure: () => <FrustumFigure step={2} />,
    },
    {
      title: 'b) 2. lépés — Pitagorasz-tétel',
      points: 2,
      body: `$$a^2 = m^2 + (R - r)^2 = 8^2 + 6^2 = 64 + 36 = 100.$$

$$a = \\sqrt{100} = 10 \\text{ cm}.$$

**Érdekes**: pontosan kerek szám — a $(6, 8, 10)$ klasszikus Pitagoraszi számhármas.`,
      figure: () => <FrustumFigure step={2} />,
    },

    // c)
    {
      title: 'c) 1. lépés — A csonka kúp palástjának képlete',
      points: 2,
      body: `A csonka kúp **palástja**:

$$P = \\pi (R + r) \\cdot a.$$

Ez a képlet azt fejezi ki, hogy a palást „kiterítve" egy körgyűrű-szeletre emlékeztet; a ($R+r$) a kerületek átlaga, $a$ pedig az alkotó (palást-magasság).

$$P = \\pi \\cdot (10 + 4) \\cdot 10 = 140 \\pi \\approx 439{,}82 \\text{ cm}^2.$$`,
      figure: () => <FrustumFigure step={3} />,
    },
    {
      title: 'c) 2. lépés — Alap- és fedőkör területe',
      points: 2,
      body: `$$T_{\\text{alap}} = R^2 \\pi = 100 \\pi, \\qquad T_{\\text{fedő}} = r^2 \\pi = 16 \\pi.$$

Összesen:

$$T_{\\text{alap}} + T_{\\text{fedő}} = 116 \\pi \\approx 364{,}42 \\text{ cm}^2.$$`,
      figure: () => <FrustumFigure step={3} />,
    },
    {
      title: 'c) 3. lépés — A teljes felszín',
      points: 1,
      body: `$$A = T_{\\text{alap}} + T_{\\text{fedő}} + P = 100\\pi + 16\\pi + 140\\pi = 256 \\pi \\approx 804{,}25 \\text{ cm}^2.$$`,
      figure: () => <FrustumFigure step={3} />,
    },

    // d)
    {
      title: 'd) 1. lépés — A hajlásszög értelmezése',
      points: 2,
      body: `Tekintsük az alkotó és az alaplap által meghatározott keresztmetszeti derékszögű háromszöget. A $\\beta$ szög az **alkotó** és az alap közötti szög, amelynek csúcsa az alsó körvonalon van.

A háromszögben:
- $\\beta$-val szemközti befogó: $m = 8$ cm (a magasság),
- $\\beta$ melletti befogó: $R - r = 6$ cm.

A **tangens** szögfüggvény szerint:

$$\\tan \\beta = \\dfrac{m}{R - r} = \\dfrac{8}{6} = \\dfrac{4}{3}.$$`,
      figure: () => <FrustumFigure step={4} />,
    },
    {
      title: 'd) 2. lépés — $\\beta$ meghatározása',
      points: 2,
      body: `$$\\beta = \\arctan\\left(\\dfrac{4}{3}\\right) \\approx 53{,}1301°.$$

Két tizedesjegyre kerekítve:

$$\\boxed{\\beta \\approx 53{,}13°.}$$`,
      figure: () => <FrustumFigure step={4} />,
    },
    {
      title: 'd) 3. lépés — Ellenőrzés szinusszal',
      points: 1,
      body: `**Ellenőrzés**: $\\sin \\beta = m / a = 8/10 = 0{,}8$, és $\\arcsin(0{,}8) \\approx 53{,}13°$. ✓
$\\cos \\beta = 6/10 = 0{,}6$, és $\\arccos(0{,}6) \\approx 53{,}13°$. ✓

A híres $(3,4,5)$ arányú derékszögű háromszöget kaptuk vissza — ez biztos jele annak, hogy jól számoltunk.`,
      figure: () => <FrustumFigure step={4} />,
    },
  ],
  finalAnswer: {
    V: '$V = 416\\pi \\approx 1306{,}90$ cm³',
    a: '$a = 10$ cm',
    A: '$A = 256\\pi \\approx 804{,}25$ cm²',
    beta: '$\\beta \\approx 53{,}13°$',
  },
  usedFormulas: [
    'csonka kúp térfogata: $V = \\dfrac{\\pi m}{3}(R^2 + Rr + r^2)$',
    'csonka kúp palástja: $P = \\pi(R+r)a$',
    'Pitagorasz-tétel: $a^2 = m^2 + (R-r)^2$',
    'szögfüggvény: $\\tan \\beta = m/(R-r)$',
  ],
};

export default { meta, problem, solution };
