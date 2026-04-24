import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-17',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.B',
  number: 17,
  title: 'Egyenes körkúp — térfogat, felszín, nyílásszög',
  points: 17,
  topics: ['térgeometria', 'síkgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 76, note: 'kúp térfogata és felszíne' },
    { page: 67, note: 'Pitagorasz-tétel' },
    { page: 57, note: 'szögfüggvények' },
  ],
  estimatedMinutes: 24,
};

/*
  Egyenes körkúp:
    sugár r = 6 cm
    magasság m = 8 cm
    alkotó a = √(r² + m²) = √(36 + 64) = √100 = 10 cm  (szép szám!)

  a) Térfogat:   V = (r²·π·m)/3 = 36π·8/3 = 96π ≈ 301,59 cm³
  b) Palást:     P = r·π·a = 6·π·10 = 60π ≈ 188,50 cm²
     Felszín:    A = r²π + P = 36π + 60π = 96π ≈ 301,59 cm²
     (Érdekes egybeesés: V ≈ A számértéke. A viszonyítás miatt.)
  c) Nyílásszög féle — az alkotó és a tengely között:
        tan α/2 = r/m = 6/8 = 0,75  →  α/2 = arctan(0,75) ≈ 36,87°
        α = 73,74°
     Illetve a fél-nyílásszög 36,87°.
  d) Annak az üreges hengernek a térfogata, amely pont befogadja a kúpot (r, m):
        V_henger = r²π·m = 36π·8 = 288π ≈ 904,78 cm³
        Összehasonlítás: V_kúp / V_henger = 1/3 — ismert arány.

  Pont-elosztás javaslat: a) 3, b) 5, c) 5, d) 4  (összesen 17)
*/

function ConeFigure({ step = 0 }) {
  // 2D vetület: az alap középpontja O, az alap átmérője látszó "ellipszis"
  // O = (260, 250), csúcs V = (260, 70), r (látszólag) = 80 px
  const O = { x: 260, y: 250 };
  const V = { x: 260, y: 70 };
  const r = 80;
  const rY = 20; // látszólagos elliptikus eltérés a mélység miatt
  const A = { x: O.x - r, y: O.y };
  const B = { x: O.x + r, y: O.y };

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      {/* Alaplap körvonala (ellipszis) */}
      <ellipse cx={O.x} cy={O.y} rx={r} ry={rY} fill="#e0e7ff" fillOpacity="0.5" stroke="#1e3a8a" strokeWidth="2" />
      {/* Alkotók */}
      <line x1={V.x} y1={V.y} x2={A.x} y2={A.y} stroke="#111" strokeWidth="2" />
      <line x1={V.x} y1={V.y} x2={B.x} y2={B.y} stroke="#111" strokeWidth="2" />
      {/* Tengely (szaggatott) */}
      <line x1={V.x} y1={V.y} x2={O.x} y2={O.y} stroke="#2563eb" strokeWidth="2" strokeDasharray="4 3" />
      {/* Sugár vonala */}
      <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke="#dc2626" strokeWidth="2" />

      {/* Csúcsok */}
      <circle cx={V.x} cy={V.y} r="3.4" fill="#111" />
      <circle cx={O.x} cy={O.y} r="3.4" fill="#111" />
      <circle cx={A.x} cy={A.y} r="3.4" fill="#111" />
      <circle cx={B.x} cy={B.y} r="3.4" fill="#111" />

      <text x={V.x + 6} y={V.y - 4} fontSize="14" fontWeight="bold" fill="#111">V</text>
      <text x={O.x + 8} y={O.y + 12} fontSize="12" fill="#374151">O</text>

      {/* Címkék */}
      <text x={O.x + 14} y={(V.y + O.y) / 2} fontSize="14" fontWeight="bold" fill="#2563eb">
        m = 8 cm
      </text>
      <text x={(O.x + B.x) / 2} y={O.y - 10} fontSize="14" fontWeight="bold" fill="#dc2626" textAnchor="middle">
        r = 6 cm
      </text>

      {/* Step-függő kiemelés */}
      {step === 2 && (
        <>
          {/* alkotó (piros) — VB */}
          <line x1={V.x} y1={V.y} x2={B.x} y2={B.y} stroke="#059669" strokeWidth="3" />
          <text x={(V.x + B.x) / 2 + 14} y={(V.y + B.y) / 2 - 4} fontSize="14" fontWeight="bold" fill="#059669">
            a = 10 cm
          </text>
        </>
      )}
      {step === 3 && (
        <>
          {/* a nyílásszög fele: α/2 a csúcsnál */}
          <path d="M 260 95 A 28 28 0 0 1 278 92" stroke="#dc2626" strokeWidth="2" fill="none" />
          <text x={280} y={100} fontSize="14" fontWeight="bold" fill="#dc2626">α/2</text>
        </>
      )}
      {step === 4 && (
        <>
          {/* a befoglaló henger palástja szaggatottan */}
          <line x1={A.x} y1={A.y} x2={A.x} y2={V.y} stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 3" />
          <line x1={B.x} y1={B.y} x2={B.x} y2={V.y} stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 3" />
          <ellipse cx={O.x} cy={V.y} rx={r} ry={rY} fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 3" />
          <text x={A.x - 8} y={V.y + 18} fontSize="12" fill="#7c3aed" fontWeight="bold" textAnchor="end">
            befoglaló henger
          </text>
        </>
      )}

      {/* cím */}
      <text x="260" y="22" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        Egyenes körkúp: r = 6 cm, m = 8 cm
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy **egyenes körkúp** (csúcsa $V$, alapkörének középpontja $O$) alapkörének sugara $r = 6$ cm, magassága $m = 8$ cm.

**a)** Mekkora a kúp térfogata? ($3$ pont)

**b)** Mekkora a kúp felszíne? ($5$ pont)

**c)** Mekkora a kúp nyílásszöge (az alkotó és az alap tengelyéhez tartozó szög **kétszerese**, azaz a kúp teljes „nyitása")? ($5$ pont)

**d)** Hányszor nagyobb a kúpot pontosan befogadó (azonos $r$ és $m$ paraméterű) **henger** térfogata, mint a kúpé? ($4$ pont)

A mennyiségeket két tizedesjegyre kerekítve adja meg!`,
  figure: () => <ConeFigure step={0} />,
  asked: [
    { key: 'V', label: 'a) $V_{kúp} = ?$ cm³' },
    { key: 'A', label: 'b) $A_{felszín} = ?$ cm²' },
    { key: 'angle', label: 'c) $\\alpha = ?°$' },
    { key: 'ratio', label: 'd) $V_{henger}/V_{kúp} = ?$' },
  ],
};

export const solution = {
  steps: [
    // ============ a) TÉRFOGAT ============
    {
      title: 'a) 1. lépés — A kúp térfogatának képlete',
      points: 1,
      body: `Az **egyenes körkúp** térfogata (fgv. tábla 76. old.):

$$V = \\dfrac{T_{\\text{alap}} \\cdot m}{3} = \\dfrac{r^2 \\pi \\cdot m}{3}.$$

A kúp alapja egy kör, melynek területe $r^2 \\pi$.`,
      figure: () => <ConeFigure step={1} />,
    },
    {
      title: 'a) 2. lépés — Behelyettesítés',
      points: 1,
      body: `$r = 6$ cm, $m = 8$ cm:

$$V = \\dfrac{6^2 \\cdot \\pi \\cdot 8}{3} = \\dfrac{36 \\cdot 8 \\cdot \\pi}{3} = \\dfrac{288 \\pi}{3} = 96 \\pi \\ \\text{cm}^3.$$`,
      figure: () => <ConeFigure step={1} />,
    },
    {
      title: 'a) 3. lépés — Számérték',
      points: 1,
      body: `$\\pi \\approx 3{,}14159$:

$$V = 96 \\pi \\approx 96 \\cdot 3{,}14159 \\approx 301{,}59 \\ \\text{cm}^3.$$

$\\boxed{V \\approx 301{,}59 \\ \\text{cm}^3}$.`,
      figure: () => <ConeFigure step={1} />,
    },

    // ============ b) FELSZÍN ============
    {
      title: 'b) 1. lépés — Az alkotó hosszának kiszámítása',
      points: 2,
      body: `A kúp **alkotója** ($a$) a csúcs és az alapkör egy pontjának távolsága. Tekintsük a $V O B$ derékszögű háromszöget (ahol $O$ az alapkör középpontja, $B$ egy pont a körvonalon, és $VO \\perp OB$).

A befogók $m = 8$ és $r = 6$; az átfogó az alkotó. **Pitagorasz-tétel** (fgv. tábla 67. old.):

$$a^2 = r^2 + m^2 = 6^2 + 8^2 = 36 + 64 = 100.$$

$$a = 10 \\ \\text{cm}.$$

(Egy szép pythagoraszi hármas: $6, 8, 10$.)`,
      figure: () => <ConeFigure step={2} />,
    },
    {
      title: 'b) 2. lépés — A palást területe',
      points: 2,
      body: `A kúp palástja **körcikk** az alkotóval mint sugárral. Területe:

$$P = r \\pi a = 6 \\pi \\cdot 10 = 60 \\pi \\ \\text{cm}^2.$$

Másképp fogalmazva: a palást „kibontva" egy körcikk, amelynek sugara $a = 10$ cm, és körívhossza megegyezik az alapkör kerületével ($2 r \\pi = 12 \\pi$).`,
    },
    {
      title: 'b) 3. lépés — A teljes felszín',
      points: 1,
      body: `A felszín az alapkör területének és a palástnak az összege:

$$A = r^2 \\pi + P = 36 \\pi + 60 \\pi = 96 \\pi \\ \\text{cm}^2.$$

Számértékben:

$$A \\approx 96 \\cdot 3{,}14159 \\approx 301{,}59 \\ \\text{cm}^2.$$

$\\boxed{A \\approx 301{,}59 \\ \\text{cm}^2}$.

**Érdekesség:** itt a térfogat számértéke (cm³-ben) és a felszín számértéke (cm²-ben) véletlenül megegyezik ($96\\pi$) — ez csak ennél a konkrét kúpnál igaz.`,
    },

    // ============ c) NYÍLÁSSZÖG ============
    {
      title: 'c) 1. lépés — A nyílásszög fogalma',
      points: 1,
      body: `A kúp **teljes nyílásszöge** ($\\alpha$) az a szög, amit két szemközti alkotó a csúcsban bezár. Ez a szög a $V A B$ egyenlő szárú háromszög csúcsszöge, ahol $A$ és $B$ az alapkör átlósan szembeni pontjai.

Az $\\alpha$ szög fele ($\\alpha/2$) az alkotó és a tengely közötti szög, amely a $V O B$ derékszögű háromszögben mérhető.`,
      figure: () => <ConeFigure step={3} />,
    },
    {
      title: 'c) 2. lépés — A fél-nyílásszög számítása',
      points: 2,
      body: `A $V O B$ derékszögű háromszögben a $V$-nél lévő szög $\\alpha/2$. A szög szemközti befogója $r = 6$, szomszédos befogója $m = 8$, így:

$$\\tan \\dfrac{\\alpha}{2} = \\dfrac{\\text{szemközti}}{\\text{szomszédos}} = \\dfrac{r}{m} = \\dfrac{6}{8} = 0{,}75.$$

Függvénytáblából ($\\mathrm{tg}$, 57. old.):

$$\\dfrac{\\alpha}{2} = \\arctan(0{,}75) \\approx 36{,}8699°.$$`,
      figure: () => <ConeFigure step={3} />,
    },
    {
      title: 'c) 3. lépés — A teljes nyílásszög',
      points: 2,
      body: `A teljes nyílásszög ennek kétszerese:

$$\\alpha = 2 \\cdot 36{,}8699° \\approx 73{,}74°.$$

$\\boxed{\\alpha \\approx 73{,}74°}$.

**Ellenőrzés szinusszal:** $\\sin(\\alpha/2) = r/a = 6/10 = 0{,}6$, tehát $\\alpha/2 = \\arcsin(0{,}6) \\approx 36{,}87°$ — egyezik. ✓`,
      figure: () => <ConeFigure step={3} />,
    },

    // ============ d) HENGER : KÚP ============
    {
      title: 'd) 1. lépés — A befoglaló henger térfogata',
      points: 1,
      body: `A „befoglaló henger" azonos sugarú ($r = 6$ cm) és azonos magasságú ($m = 8$ cm) henger. A henger térfogata (fgv. tábla 75. old.):

$$V_{\\text{henger}} = r^2 \\pi \\cdot m = 36 \\pi \\cdot 8 = 288 \\pi \\ \\text{cm}^3.$$`,
      figure: () => <ConeFigure step={4} />,
    },
    {
      title: 'd) 2. lépés — Az arány',
      points: 2,
      body: `A kúp térfogata a) részből: $V_{\\text{kúp}} = 96 \\pi$ cm³.

$$\\dfrac{V_{\\text{henger}}}{V_{\\text{kúp}}} = \\dfrac{288 \\pi}{96 \\pi} = \\dfrac{288}{96} = 3.$$

Tehát a befoglaló henger térfogata **pontosan $3$-szor akkora**, mint a kúpé.`,
      figure: () => <ConeFigure step={4} />,
    },
    {
      title: 'd) 3. lépés — Értelmezés',
      points: 1,
      body: `Ez egy **általános** összefüggés: bármely kúp (és bármely gúla) térfogata a befoglaló henger (hasáb) térfogatának $\\frac{1}{3}$-a. Ezt rögzíti a $V = \\frac{T_{\\text{alap}} \\cdot m}{3}$ képletben az $\\frac{1}{3}$ tényező — szemben a henger $V = T_{\\text{alap}} \\cdot m$ képletével.

Tehát az arány **mindig** $3$, függetlenül attól, hogy $r$ és $m$ milyen konkrét értékeket vesznek fel.`,
      figure: () => <ConeFigure step={4} />,
    },
  ],
  finalAnswer: {
    V: '$V_{kúp} = 96\\pi \\approx 301{,}59$ cm³',
    A: '$A_{felszín} = 96\\pi \\approx 301{,}59$ cm²',
    angle: '$\\alpha \\approx 73{,}74°$',
    ratio: '$V_{henger}/V_{kúp} = 3$',
  },
  usedFormulas: [
    'kúp térfogata: $V = \\dfrac{r^2 \\pi \\cdot m}{3}$',
    'kúp palástja: $P = r \\pi a$',
    'kúp felszíne: $A = r^2 \\pi + r \\pi a$',
    'alkotó: $a = \\sqrt{r^2 + m^2}$',
    '$\\tan(\\alpha/2) = r/m$',
    'henger térfogata: $V = r^2 \\pi m$',
  ],
};

export default { meta, problem, solution };
