import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-17',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.B',
  number: 17,
  title: 'Egyenes kúp — térfogat, palást, felszín, nyílásszög',
  points: 17,
  topics: ['térgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 76, note: 'gúla, kúp' },
    { page: 62, note: 'Pitagorasz-tétel' },
  ],
  estimatedMinutes: 28,
};

// r = 6 cm, m = 8 cm (tengelymetszet merőleges magassága)
// a (alkotó) = sqrt(r^2 + m^2) = sqrt(36 + 64) = sqrt(100) = 10
// V = (1/3) r^2 pi m = (1/3) * 36 pi * 8 = 96 pi ≈ 301,59
// Alap területe T = r^2 pi = 36 pi ≈ 113,10
// Palást: P = r pi a = 6 pi * 10 = 60 pi ≈ 188,50
// Felszín: A = T + P = 36 pi + 60 pi = 96 pi ≈ 301,59
// Nyílásszög (a tengelymetszetben, a csúcsnál): 2*atan(r/m) = 2*atan(6/8) = 2*atan(0.75) = 2*36,87 = 73,74°
// Vagy csúcsnál tangens: tg(φ) = r/m -> φ = atan(0.75) = 36,87°; teljes nyílásszög = 73,74°

function ConeFigure({ step = 1 }) {
  // Tengelymetszet: egyenlőszárú háromszög. csúcs C = (240, 40), alap AB: A(140, 240), B(340, 240)
  // r_px = 100 kb 6 cm
  // m_px = 200 kb 8 cm  (aránya 6:8 ~ 100:133, de tegyük 6:8 ~ 100:160 hogy szép legyen: m_px=160)
  // r = 6 -> 100 px; m = 8 -> 133 px; alkotó = 10 -> 166 px
  const Cx = 240, Cy = 60;
  const Ax = 140, Ay = 240;
  const Bx = 340, By = 240;
  const Ox = 240, Oy = 240; // Alap középpont

  return (
    <SvgCanvas width={480} height={320} viewBox="0 0 480 320">
      {/* Kúp ferde oldalnézet: ellipszis (alap) + két alkotó */}
      {/* Alap körvonala ellipszis formában */}
      <ellipse cx={Ox} cy={Oy} rx="100" ry="22" fill="#e0e7ff" stroke="#1e3a8a" strokeWidth="1.8" />
      {/* Elülső ellipszis fele (szaggatott a takart rész) */}
      <path d={`M ${Ax},${Ay} A 100 22 0 0 0 ${Bx},${By}`} fill="none" stroke="#1e3a8a" strokeWidth="1.8" strokeDasharray="4 3" />

      {/* Alkotók */}
      <line x1={Cx} y1={Cy} x2={Ax} y2={Ay} stroke="#111" strokeWidth="2.5" />
      <line x1={Cx} y1={Cy} x2={Bx} y2={By} stroke="#111" strokeWidth="2.5" />

      {/* Magasság */}
      {step >= 2 && (
        <g>
          <line x1={Cx} y1={Cy} x2={Ox} y2={Oy} stroke="#16a34a" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x={Cx + 6} y={(Cy + Oy) / 2} fontSize="13" fontWeight="bold" fill="#166534">m = 8</text>
          {/* Derékszög jel */}
          <path d={`M ${Ox - 10},${Oy - 10} L ${Ox},${Oy - 10} L ${Ox},${Oy}`} fill="none" stroke="#166534" strokeWidth="1.2" />
        </g>
      )}

      {/* Sugár */}
      <line x1={Ox} y1={Oy} x2={Bx} y2={By} stroke="#dc2626" strokeWidth="2" />
      <text x={(Ox + Bx) / 2} y={Oy - 6} fontSize="13" fontWeight="bold" fill="#b91c1c">r = 6</text>

      {/* Alkotó címke */}
      {step >= 2 && (
        <text x={(Cx + Bx) / 2 + 16} y={(Cy + By) / 2} fontSize="13" fontWeight="bold" fill="#1e40af">a = 10</text>
      )}
      {/* Nyílásszög */}
      {step === 5 && (
        <g>
          <path d={`M ${Cx - 18},${Cy + 26} A 22 22 0 0 0 ${Cx + 18},${Cy + 26}`} fill="none" stroke="#7c3aed" strokeWidth="2" />
          <text x={Cx} y={Cy + 50} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#7c3aed">2φ ≈ 73,74°</text>
        </g>
      )}

      {/* Csúcspont */}
      <circle cx={Cx} cy={Cy} r="4" fill="#111" />
      <text x={Cx + 10} y={Cy - 4} fontSize="13" fontWeight="bold" fill="#111">C (csúcs)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy egyenes körkúp alapjának sugara $r = 6$ cm, magassága $m = 8$ cm.

**a)** Számítsa ki a kúp **alkotójának** ($a$) hosszát! ($2$ pont)

**b)** Mekkora a kúp **térfogata** $V$? Adja meg $\\pi$-vel kifejezve és tizedes törtben is (két tizedesjegyre)! ($3$ pont)

**c)** Számítsa ki a **palástfelszínt** ($P$). ($3$ pont)

**d)** Számítsa ki a kúp teljes **felszínét** ($A$). ($3$ pont)

**e)** A kúp tengelymetszete egy egyenlőszárú háromszög. Mekkora a kúp **nyílásszöge** (a tengelymetszet csúcsánál lévő szög)? ($4$ pont)

**f)** A kúp belsejébe vizet töltünk $m/2 = 4$ cm magasságig (a csúcsra állítva, tölcsér-módon). Hány cm³ víz fér bele? ($2$ pont)`,
  figure: () => <ConeFigure step={1} />,
  asked: [
    { key: 'a', label: 'a) $a = ?$ cm' },
    { key: 'V', label: 'b) $V = ?$ cm³' },
    { key: 'P', label: 'c) $P = ?$ cm²' },
    { key: 'A', label: 'd) $A = ?$ cm²' },
    { key: 'nyitas', label: 'e) Nyílásszög = ?' },
    { key: 'viz', label: 'f) Víztérfogat = ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Alkotó Pitagorasszal',
      points: 2,
      body: `Az egyenes kúp **tengelymetszete** egy egyenlőszárú háromszög. Az alkotó ($a$), a magasság ($m$) és a sugár ($r$) **derékszögű háromszöget** alkotnak — a derékszög az alap középpontjában. Így Pitagorasz-tétel:

$$a^2 = r^2 + m^2 = 6^2 + 8^2 = 36 + 64 = 100.$$

$$a = \\sqrt{100} = 10 \\ \\text{cm}.$$

(Klasszikus $6\\text{-}8\\text{-}10$ pitagoraszi számhármas.) $\\boxed{a = 10 \\text{ cm}.}$`,
      figure: () => <ConeFigure step={2} />,
    },
    {
      title: 'b) lépés — Térfogat',
      points: 3,
      body: `A **kúp térfogata** (fgv. tábla 76. old.):

$$V = \\dfrac{r^2 \\pi \\, m}{3}.$$

Behelyettesítve:

$$V = \\dfrac{6^2 \\pi \\cdot 8}{3} = \\dfrac{36 \\pi \\cdot 8}{3} = \\dfrac{288 \\pi}{3} = 96 \\pi \\ \\text{cm}^3.$$

Közelítőleg: $V \\approx 96 \\cdot 3{,}1416 \\approx 301{,}59$ cm³.

$$\\boxed{V = 96\\pi \\approx 301{,}59 \\ \\text{cm}^3.}$$`,
      figure: () => <ConeFigure step={2} />,
    },
    {
      title: 'c) lépés — Palástfelszín',
      points: 3,
      body: `A kúp **palástjának** felszíne (a kiterített palást egy körcikk):

$$P = r \\pi \\, a.$$

Behelyettesítve:

$$P = 6 \\pi \\cdot 10 = 60 \\pi \\approx 188{,}50 \\ \\text{cm}^2.$$

$$\\boxed{P = 60 \\pi \\approx 188{,}50 \\ \\text{cm}^2.}$$`,
    },
    {
      title: 'd) lépés — Teljes felszín',
      points: 3,
      body: `A teljes felszín az **alapkör területének** és a **palást** területének összege:

$$A = r^2 \\pi + r \\pi a = r\\pi (r + a).$$

Behelyettesítve:

$$A = 6 \\pi (6 + 10) = 6 \\pi \\cdot 16 = 96 \\pi \\approx 301{,}59 \\ \\text{cm}^2.$$

$$\\boxed{A = 96\\pi \\approx 301{,}59 \\ \\text{cm}^2.}$$

Érdekesség: ebben a speciális esetben a térfogat és a felszín számértéke egybeesik — pusztán a választott számok miatt (egységek persze mások: cm³ és cm²).`,
    },
    {
      title: 'e/1. lépés — Félszög a derékszögű háromszögből',
      points: 2,
      body: `A tengelymetszet csúcsánál a **félszöget** ($\\varphi$) derékszögű háromszögben kapjuk, ahol a csúccsal szemközti „szár" a sugár, a csúccsal szomszédos befogó a magasság:

$$\\mathrm{tg}\\, \\varphi = \\dfrac{r}{m} = \\dfrac{6}{8} = 0{,}75.$$

$$\\varphi = \\arctan(0{,}75) \\approx 36{,}87°.$$`,
      figure: () => <ConeFigure step={5} />,
    },
    {
      title: 'e/2. lépés — Teljes nyílásszög',
      points: 2,
      body: `A tengelymetszet egyenlőszárú, tehát a csúcsánál lévő teljes szög a félszög **kétszerese**:

$$2 \\varphi \\approx 73{,}74°.$$

$$\\boxed{\\text{nyílásszög} \\approx 73{,}74°.}$$

**Ellenőrzés** szinusz oldaláról: $\\sin \\varphi = r/a = 6/10 = 0{,}6 \\Rightarrow \\varphi \\approx 36{,}87°$. Egyezik. ✓`,
      figure: () => <ConeFigure step={5} />,
    },
    {
      title: 'f) lépés — Kisebb, hasonló kúp térfogata',
      points: 2,
      body: `Amikor a csúcsára állított kúpba a csúcstól $m/2 = 4$ cm magasságig vizet töltünk, akkor a víz egy **kisebb, hasonló** kúpot tölt meg, amelynek minden lineáris mérete az eredetihez képest $\\dfrac{1}{2}$-szeres (arányossági szorzó $k = 1/2$).

A térfogatok arányát a **hasonlósági arány köbe** adja:

$$\\dfrac{V_{\\text{víz}}}{V_{\\text{teljes}}} = k^3 = \\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}.$$

Így:

$$V_{\\text{víz}} = \\dfrac{V}{8} = \\dfrac{96 \\pi}{8} = 12 \\pi \\approx 37{,}70 \\ \\text{cm}^3.$$

$$\\boxed{V_{\\text{víz}} = 12\\pi \\approx 37{,}70 \\ \\text{cm}^3.}$$`,
    },
  ],
  finalAnswer: {
    a: '$a = 10$ cm',
    V: '$V = 96\\pi \\approx 301{,}59$ cm³',
    P: '$P = 60\\pi \\approx 188{,}50$ cm²',
    A: '$A = 96\\pi \\approx 301{,}59$ cm²',
    nyitas: '$2\\varphi \\approx 73{,}74°$',
    viz: '$V_{\\text{víz}} = 12\\pi \\approx 37{,}70$ cm³',
  },
  usedFormulas: [
    'Pitagorasz-tétel',
    '$V_{\\text{kúp}} = \\dfrac{r^2 \\pi m}{3}$',
    '$P_{\\text{palást}} = r \\pi a$',
    '$A_{\\text{kúp}} = r^2 \\pi + r \\pi a$',
    'tangens-definíció derékszögű háromszögben',
    'hasonló kúpok térfogataránya: $V_1/V_2 = k^3$',
  ],
};

export default { meta, problem, solution };
