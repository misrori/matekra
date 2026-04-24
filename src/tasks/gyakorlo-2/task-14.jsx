import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-14',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.A',
  number: 14,
  title: 'Háromszögtan — koszinusztétel, terület, magasság',
  points: 13,
  topics: ['trigonometria', 'síkgeometria'],
  difficulty: 4,
  fgvt: [
    { page: 54, note: 'szinusztétel' },
    { page: 55, note: 'koszinusztétel' },
    { page: 62, note: 'háromszög területe' },
  ],
  estimatedMinutes: 22,
};

// Adott háromszög: a = 7, b = 9, gamma = 52°
// c^2 = a^2 + b^2 - 2ab cos(gamma) = 49 + 81 - 2*7*9*cos(52°)
// cos(52°) ≈ 0,6157
// c^2 = 130 - 126 * 0,6157 ≈ 130 - 77,58 = 52,42
// c ≈ 7,24
// Terület T = ab sin(gamma) / 2 = 7*9*sin(52°)/2 = 31,5*0,7880 ≈ 24,82
// Az a oldalhoz tartozó magasság: m_a = 2T/a = 2*24,82/7 ≈ 7,09
// A-nál szög: sin(alpha)/a = sin(gamma)/c -> sin(alpha) = 7 * sin(52°) / c = 7*0,788/7,24 ≈ 0,7619 -> alpha ≈ 49,63°
// Beta = 180 - 52 - 49,63 ≈ 78,37°

function TriangleFigure({ step = 1 }) {
  // Sematikus háromszög
  // B bal alsó, C jobb alsó, A fent.
  // Válasszuk úgy: B=(40,240), C=(380,240), a=BC=340 px reprezentálja 7 egységet -> nem arányos.
  // Egyszerűen elrendezzük: B=(60, 240), C=(420, 240) alap=BC, a=7 (a háromszög a oldala a-val szemközti A csúcs).
  // Adjunk A pozíciót: a belső gamma=52° a C csúcsnál. Az A-ra ható ív szöge C-ből:
  //   BC egyenes x-tengely. C-ből B felé a szög 180°. C-ből A felé: 180° - 52° = 128°.
  //   A iránya C-ből: (cos128°, -sin128°) = (-0.616, -0.788)
  //   b = CA = 9 px reprezentálja. Skálázás: kb 260 px = 9 egység -> 1 egység = 28.9 px
  //   A = C + 9 * 28.9 * (-0.616, -0.788) = (420 - 160, 240 - 205) = (260, 35)
  const Bx = 60, By = 240;
  const Cx = 420, Cy = 240;
  const Ax = 260, Ay = 35;

  return (
    <SvgCanvas width={480} height={300} viewBox="0 0 480 300">
      {/* Terület kitöltés */}
      {step >= 3 && (
        <polygon points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`} fill="#e0e7ff" fillOpacity="0.7" />
      )}
      {/* Oldalak */}
      <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke={step === 2 ? '#dc2626' : '#111'} strokeWidth={step === 2 ? 3 : 2.5} />
      <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#111" strokeWidth="2.5" />
      <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke="#111" strokeWidth="2.5" />

      {/* Csúcsok */}
      <circle cx={Ax} cy={Ay} r="4" fill="#111" />
      <circle cx={Bx} cy={By} r="4" fill="#111" />
      <circle cx={Cx} cy={Cy} r="4" fill="#111" />

      <text x={Ax - 6} y={Ay - 10} fontSize="16" fontWeight="bold" fill="#111">A</text>
      <text x={Bx - 14} y={By + 18} fontSize="16" fontWeight="bold" fill="#111">B</text>
      <text x={Cx + 8} y={Cy + 18} fontSize="16" fontWeight="bold" fill="#111">C</text>

      {/* Oldalcímkék */}
      <text x={(Bx + Cx) / 2} y={By + 18} fontSize="13" textAnchor="middle" fontWeight="bold" fill={step === 2 ? '#dc2626' : '#111'}>
        a = 7 {step === 2 ? '(keressük? c!)' : 'cm'}
      </text>
      <text x={(Ax + Bx) / 2 - 22} y={(Ay + By) / 2} fontSize="13" fontWeight="bold" fill="#111">c = {step >= 2 ? '≈ 7,24' : '?'}</text>
      <text x={(Ax + Cx) / 2 + 10} y={(Ay + Cy) / 2} fontSize="13" fontWeight="bold" fill="#111">b = 9 cm</text>

      {/* Gamma szög C-nél */}
      <path d={`M ${Cx - 24},${Cy} A 24 24 0 0 0 ${Cx - 15},${Cy - 19}`} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={Cx - 42} y={Cy - 8} fontSize="13" fill="#1e40af" fontWeight="bold">γ = 52°</text>

      {/* Magasság (step 4) — A-ból merőleges BC-re */}
      {step >= 4 && (
        <g>
          <line x1={Ax} y1={Ay} x2={Ax} y2={By} stroke="#16a34a" strokeWidth="2" strokeDasharray="5 3" />
          <text x={Ax + 6} y={(Ay + By) / 2} fontSize="13" fontWeight="bold" fill="#166534">m_a ≈ 7,09</text>
          {/* Kis derékszög jelölés */}
          <path d={`M ${Ax - 10},${By - 10} L ${Ax - 10},${By} M ${Ax - 10},${By - 10} L ${Ax},${By - 10}`} fill="none" stroke="#166534" strokeWidth="1.2" />
        </g>
      )}

      {/* Terület felirat */}
      {step === 3 && (
        <text x={240} y={160} fontSize="14" fontWeight="bold" fill="#4338ca" textAnchor="middle">T ≈ 24,82 cm²</text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy háromszögben $a = 7$ cm, $b = 9$ cm, a két oldal közötti szög pedig $\\gamma = 52°$ (a megszokott jelöléssel $\\gamma$ a $c$ oldallal szemközti szög).

**a)** Számítsa ki a háromszög harmadik oldalának ($c$) hosszát! ($5$ pont)

**b)** Mekkora a háromszög területe? ($3$ pont)

**c)** Mekkora az $a$ oldalhoz tartozó magasság ($m_a$)? ($3$ pont)

**d)** Számítsa ki az $\\alpha$ szög (az $a$ oldallal szemközti szög) nagyságát! ($2$ pont)

Az eredményeket két tizedesjegyre kerekítve adja meg!`,
  figure: () => <TriangleFigure step={1} />,
  asked: [
    { key: 'c', label: 'a) $c \\approx ?$ cm' },
    { key: 'T', label: 'b) $T \\approx ?$ cm²' },
    { key: 'ma', label: 'c) $m_a \\approx ?$ cm' },
    { key: 'alpha', label: 'd) $\\alpha \\approx ?$ fok' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Koszinusztétel felírása',
      points: 2,
      body: `Két oldal és a közbezárt szög ismert, a harmadik oldalt keressük. Ez a **koszinusztétel** klasszikus esete:

$$c^2 = a^2 + b^2 - 2 \\, a \\, b \\, \\cos \\gamma.$$

Behelyettesítve:

$$c^2 = 7^2 + 9^2 - 2 \\cdot 7 \\cdot 9 \\cdot \\cos 52°.$$`,
      figure: () => <TriangleFigure step={2} />,
    },
    {
      title: 'a/2. lépés — Számolás',
      points: 2,
      body: `A $\\cos 52° \\approx 0{,}6157$ (fgv. tábla, szögfüggvény táblázat).

$$c^2 = 49 + 81 - 126 \\cdot 0{,}6157 \\approx 130 - 77{,}58 = 52{,}42.$$`,
      figure: () => <TriangleFigure step={2} />,
    },
    {
      title: 'a/3. lépés — Az eredmény',
      points: 1,
      body: `$$c \\approx \\sqrt{52{,}42} \\approx 7{,}24 \\ \\text{cm}.$$

**Ellenőrzés (háromszög-egyenlőtlenség):** $|a - b| < c < a + b$, azaz $2 < 7{,}24 < 16 \\ \\checkmark$.

$$\\boxed{c \\approx 7{,}24 \\ \\text{cm}.}$$`,
      figure: () => <TriangleFigure step={2} />,
    },
    {
      title: 'b) lépés — Terület két oldalból és a közbezárt szögből',
      points: 3,
      body: `Amikor két oldal és a közbezárt szög ismert, a **terület képlete:**

$$T = \\dfrac{a \\cdot b \\cdot \\sin \\gamma}{2}.$$

A $\\sin 52° \\approx 0{,}7880$. Behelyettesítve:

$$T = \\dfrac{7 \\cdot 9 \\cdot 0{,}7880}{2} = \\dfrac{63 \\cdot 0{,}7880}{2} = \\dfrac{49{,}64}{2} \\approx 24{,}82 \\ \\text{cm}^2.$$

$$\\boxed{T \\approx 24{,}82 \\ \\text{cm}^2.}$$`,
      figure: () => <TriangleFigure step={3} />,
    },
    {
      title: 'c) lépés — Magasság $m_a$ a területből',
      points: 3,
      body: `A háromszög területének **másik** klasszikus képlete:

$$T = \\dfrac{a \\cdot m_a}{2}.$$

Innen $m_a$ kifejezhető:

$$m_a = \\dfrac{2T}{a} = \\dfrac{2 \\cdot 24{,}82}{7} = \\dfrac{49{,}64}{7} \\approx 7{,}09 \\ \\text{cm}.$$

(Ez a magasság az $A$ csúcsból az $a$ oldalra állított merőleges hossza.)

$$\\boxed{m_a \\approx 7{,}09 \\ \\text{cm}.}$$`,
      figure: () => <TriangleFigure step={4} />,
    },
    {
      title: 'd/1. lépés — Az $\\alpha$ szög meghatározása szinusztétellel',
      points: 1,
      body: `A **szinusztétel** szerint:

$$\\dfrac{a}{\\sin \\alpha} = \\dfrac{c}{\\sin \\gamma}.$$

Átrendezve $\\sin \\alpha$-ra:

$$\\sin \\alpha = \\dfrac{a \\cdot \\sin \\gamma}{c} = \\dfrac{7 \\cdot \\sin 52°}{7{,}24} \\approx \\dfrac{7 \\cdot 0{,}7880}{7{,}24} \\approx \\dfrac{5{,}516}{7{,}24} \\approx 0{,}7619.$$`,
    },
    {
      title: 'd/2. lépés — A szög és kiválasztás',
      points: 1,
      body: `$$\\alpha = \\arcsin(0{,}7619) \\approx 49{,}63°.$$

A másik lehetőség $180° - 49{,}63° = 130{,}37°$ volna, de ez $\\gamma = 52°$-kal együtt már több, mint $180°$ — tehát kizárva. Így $\\alpha$ hegyesszög.

**Ellenőrzés:** $\\alpha + \\gamma \\approx 49{,}63° + 52° = 101{,}63°$, tehát $\\beta \\approx 180° - 101{,}63° = 78{,}37°$ — reális.

$$\\boxed{\\alpha \\approx 49{,}63°.}$$`,
    },
  ],
  finalAnswer: {
    c: '$c \\approx 7{,}24$ cm',
    T: '$T \\approx 24{,}82$ cm²',
    ma: '$m_a \\approx 7{,}09$ cm',
    alpha: '$\\alpha \\approx 49{,}63°$',
  },
  usedFormulas: [
    'koszinusztétel: $c^2 = a^2 + b^2 - 2ab \\cos \\gamma$',
    '$T = \\dfrac{ab \\sin \\gamma}{2}$',
    '$T = \\dfrac{a \\cdot m_a}{2}$',
    'szinusztétel: $\\dfrac{a}{\\sin \\alpha} = \\dfrac{c}{\\sin \\gamma}$',
    'háromszög-egyenlőtlenség',
  ],
};

export default { meta, problem, solution };
