import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-14',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.A',
  number: 14,
  title: 'Paralelogramma — szögek, átló, terület',
  points: 13,
  topics: ['síkgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 54, note: 'szinusztétel' },
    { page: 55, note: 'koszinusztétel' },
    { page: 64, note: 'paralelogramma' },
  ],
  estimatedMinutes: 20,
};

// ABCD paralelogramma:
// AB = a = 10 cm, AD = b = 6 cm, A-szög = 70°.
// a) másik szöge: 180 - 70 = 110°
// b) BD átló (az ABD háromszögben, DAB szöge 70°, AD = 6, AB = 10):
//    BD² = 10² + 6² - 2·10·6·cos70° = 100 + 36 - 120·cos70°
//    cos70° ≈ 0,3420 → 120·0,3420 = 41,042
//    BD² ≈ 94,958 → BD ≈ 9,745
// c) terület: T = a·b·sin A = 10·6·sin70° ≈ 60·0,9397 ≈ 56,38 cm²
// d) magasság a-hoz: m_a = T/a = 56,38/10 = 5,638 ≈ 5,64 cm  (vagy b·sin(A) = 6·sin70° ≈ 5,64)
function ParallelFig({ step = 0 }) {
  // A paralelogramma
  // Elhelyezés: A(80, 280), B(430, 280). AD 70°-kal A-ból, hossza 120 (6 egységet képvisel az 10-es AB=350-hez).
  const A = { x: 80, y: 280 };
  const B = { x: 430, y: 280 };
  const lenAB = 350;
  const lenAD = lenAB * (6 / 10);
  const angle = 70 * Math.PI / 180;
  const D = { x: A.x + lenAD * Math.cos(angle), y: A.y - lenAD * Math.sin(angle) };
  const C = { x: B.x + (D.x - A.x), y: B.y + (D.y - A.y) };
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* Paralelogramma */}
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="#dbeafe" fillOpacity="0.5" stroke="#1e3a8a" strokeWidth="2" />
      {/* Szögjel A-nál (70°) */}
      <path d={`M ${A.x + 36} ${A.y} A 36 36 0 0 0 ${A.x + 36 * Math.cos(angle)} ${A.y - 36 * Math.sin(angle)}`} stroke="#dc2626" strokeWidth="2" fill="none" />
      <text x={A.x + 48} y={A.y - 18} fontSize="14" fontWeight="700" fill="#dc2626">70°</text>
      {/* Másik szög B-nél (110°) ha mutatjuk */}
      {step >= 1 && (
        <>
          <path d={`M ${B.x - 36} ${B.y} A 36 36 0 0 1 ${B.x - 36 * Math.cos(angle)} ${B.y - 36 * Math.sin(angle)}`} stroke="#9333ea" strokeWidth="2" fill="none" />
          <text x={B.x - 70} y={B.y - 22} fontSize="14" fontWeight="700" fill="#9333ea">110°</text>
        </>
      )}
      {/* BD átló */}
      {step >= 2 && (
        <>
          <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#b91c1c" strokeWidth="2.4" strokeDasharray="5 4" />
          <text x={(B.x + D.x) / 2 + 5} y={(B.y + D.y) / 2 - 4} fontSize="14" fontWeight="700" fill="#b91c1c">
            BD ≈ 9,75
          </text>
        </>
      )}
      {/* Magasság A-hoz — a D-ből AB-re bocsátott merőleges */}
      {step >= 4 && (
        <>
          <line x1={D.x} y1={D.y} x2={D.x} y2={A.y} stroke="#16a34a" strokeWidth="2.2" strokeDasharray="3 3" />
          <text x={D.x + 8} y={(D.y + A.y) / 2} fontSize="13" fontWeight="700" fill="#16a34a">m_a ≈ 5,64</text>
          {/* derékszög kis négyzete */}
          <rect x={D.x - 8} y={A.y - 8} width="8" height="8" fill="none" stroke="#16a34a" strokeWidth="1.2" />
        </>
      )}
      {/* Csúcsok */}
      {[A, B, C, D].map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.8" fill="#111827" />)}
      <text x={A.x - 10} y={A.y + 18} fontSize="15" fontWeight="700" textAnchor="end">A</text>
      <text x={B.x + 10} y={B.y + 18} fontSize="15" fontWeight="700">B</text>
      <text x={C.x + 10} y={C.y - 4} fontSize="15" fontWeight="700">C</text>
      <text x={D.x - 10} y={D.y - 4} fontSize="15" fontWeight="700" textAnchor="end">D</text>
      {/* Oldalcímkék */}
      <text x={(A.x + B.x) / 2} y={A.y + 28} fontSize="14" fontWeight="700" fill="#1e3a8a" textAnchor="middle">a = 10 cm</text>
      <text x={(A.x + D.x) / 2 - 18} y={(A.y + D.y) / 2} fontSize="14" fontWeight="700" fill="#1e3a8a" textAnchor="end">b = 6 cm</text>
      {/* Terület-kiemelés */}
      {step === 3 && (
        <text x="260" y="30" fontSize="14" fontWeight="700" textAnchor="middle" fill="#b45309">
          T = a · b · sin A ≈ 56,38 cm²
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $ABCD$ paralelogramma oldalai $a = AB = 10$ cm és $b = AD = 6$ cm, az $A$-nál lévő szög $\\alpha = 70°$.

**a)** Mekkora a paralelogramma **másik** (tompa) szöge? ($2$ pont)

**b)** Mekkora a $BD$ átló hossza? ($4$ pont)

**c)** Mekkora a paralelogramma területe? ($4$ pont)

**d)** Mekkora a paralelogramma $a$ oldalához tartozó magassága ($m_a$)? ($3$ pont)

Minden eredményt két tizedesjegyre kerekítsen! ($\\sin 70° \\approx 0{,}9397$, $\\cos 70° \\approx 0{,}3420$)`,
  figure: () => <ParallelFig step={0} />,
  asked: [
    { key: 'beta', label: 'a) tompaszög: $\\beta = ?$°' },
    { key: 'BD', label: 'b) $BD = ?$ cm' },
    { key: 'T', label: 'c) $T = ?$ cm²' },
    { key: 'ma', label: 'd) $m_a = ?$ cm' },
  ],
};

export const solution = {
  steps: [
    // a)
    {
      title: 'a) A paralelogramma másik szöge',
      points: 2,
      body: `A paralelogramma **szomszédos szögei kiegészítő szögek** (összegük $180°$), mert az egyik oldal a két szög szárai közt „elforgat" egy egyenes mentén:

$$\\alpha + \\beta = 180° \\;\\Longrightarrow\\; \\beta = 180° - 70° = 110°.$$

Tehát a $B$-nél és $D$-nél lévő tompaszög $\\beta = 110°$. (Az $A$-nál és $C$-nél lévő szögek pedig egyaránt $70°$, hiszen a szemközti szögek egyenlők.)`,
      figure: () => <ParallelFig step={1} />,
    },

    // b)
    {
      title: 'b) 1. lépés — A $BD$ átló az $ABD$ háromszögben',
      points: 1,
      body: `Tekintsük az $ABD$ háromszöget. Ennek oldalai: $AB = 10$, $AD = 6$, és a közbezárt szög $\\angle DAB = 70°$.

A **koszinusztétel** alapján ($a^2 = b^2 + c^2 - 2bc \\cos \\alpha$, ahol $\\alpha$ a közbezárt szög):

$$BD^2 = AB^2 + AD^2 - 2 \\cdot AB \\cdot AD \\cdot \\cos(\\angle DAB).$$`,
      figure: () => <ParallelFig step={2} />,
    },
    {
      title: 'b) 2. lépés — Behelyettesítés',
      points: 2,
      body: `$$BD^2 = 10^2 + 6^2 - 2 \\cdot 10 \\cdot 6 \\cdot \\cos 70°.$$

$$BD^2 = 100 + 36 - 120 \\cdot 0{,}3420 = 136 - 41{,}04 = 94{,}96.$$`,
      figure: () => <ParallelFig step={2} />,
    },
    {
      title: 'b) 3. lépés — Négyzetgyök',
      points: 1,
      body: `$$BD = \\sqrt{94{,}96} \\approx 9{,}7447 \\approx 9{,}74 \\text{ cm.}$$

**Ellenőrzés**: a háromszög-egyenlőtlenség $|10 - 6| < BD < 10 + 6$, azaz $4 < 9{,}74 < 16$. ✓`,
      figure: () => <ParallelFig step={2} />,
    },

    // c)
    {
      title: 'c) 1. lépés — A paralelogramma területének képlete',
      points: 2,
      body: `A paralelogramma területe **két szomszédos oldal és a köztük lévő szög szinuszának szorzata**:

$$T = a \\cdot b \\cdot \\sin \\alpha.$$

(Ezt úgy kaphatjuk, hogy a paralelogrammát két egybevágó háromszögre osztjuk az $AC$ átlóval, és használjuk a háromszög $T = \\frac{1}{2} bc \\sin A$ képletét — a két háromszög együtt duplája lesz ennek.)`,
      figure: () => <ParallelFig step={3} />,
    },
    {
      title: 'c) 2. lépés — Behelyettesítés',
      points: 2,
      body: `$$T = 10 \\cdot 6 \\cdot \\sin 70° = 60 \\cdot 0{,}9397 \\approx 56{,}382.$$

Két tizedesjegyre kerekítve:

$$\\boxed{T \\approx 56{,}38 \\text{ cm}^2.}$$`,
      figure: () => <ParallelFig step={3} />,
    },

    // d)
    {
      title: 'd) 1. lépés — A magasság és a terület kapcsolata',
      points: 2,
      body: `A paralelogramma területe az **alap** és a **hozzá tartozó magasság** szorzatával is kifejezhető:

$$T = a \\cdot m_a \\;\\Longrightarrow\\; m_a = \\dfrac{T}{a}.$$

Másik megközelítés: $m_a$ a $D$-ből $AB$-re bocsátott merőleges. Az $AD = 6$ oldalból indulva a magasság a derékszögű háromszögben:

$$m_a = b \\cdot \\sin \\alpha = 6 \\cdot \\sin 70°.$$`,
      figure: () => <ParallelFig step={4} />,
    },
    {
      title: 'd) 2. lépés — Számítás',
      points: 1,
      body: `$$m_a = 6 \\cdot 0{,}9397 \\approx 5{,}638 \\approx 5{,}64 \\text{ cm.}$$

**Ellenőrzés** a $T = a \\cdot m_a$ képlettel: $10 \\cdot 5{,}64 = 56{,}40 \\approx 56{,}38$ cm² (a kis eltérés a kerekítésből ered). ✓`,
      figure: () => <ParallelFig step={4} />,
    },
  ],
  finalAnswer: {
    beta: '$\\beta = 110°$',
    BD: '$BD \\approx 9{,}74$ cm',
    T: '$T \\approx 56{,}38$ cm²',
    ma: '$m_a \\approx 5{,}64$ cm',
  },
  usedFormulas: [
    'paralelogramma szomszédos szögeinek összege: $180°$',
    'koszinusztétel: $a^2 = b^2 + c^2 - 2bc\\cos\\alpha$',
    'paralelogramma területe: $T = ab\\sin\\alpha$',
    '$T = a \\cdot m_a$',
  ],
};

export default { meta, problem, solution };
