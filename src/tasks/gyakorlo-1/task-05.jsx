import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-05',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 5,
  title: 'Szinusztétel alkalmazása háromszögben',
  points: 3,
  topics: ['trigonometria'],
  difficulty: 2,
  fgvt: [
    { page: 54, note: 'szinusztétel' },
    { page: 57, note: 'szögfüggvény táblázat' },
  ],
  estimatedMinutes: 5,
};

function Triangle() {
  // Háromszög koordináták: alfa = 50° (A-nál), béta = 70° (B-nél), gamma = 60° (C-nél)
  // AB = 12 (c), B-nél 70°, A-nál 50°
  return (
    <SvgCanvas width={480} height={280} viewBox="0 0 480 280">
      {/* A (100, 220), B (380, 220), C ≈ derive */}
      <polygon points="100,220 380,220 260,60" fill="#e0e7ff" fillOpacity="0.4" stroke="#1e3a8a" strokeWidth="2" />
      <circle cx="100" cy="220" r="4" fill="#111" />
      <circle cx="380" cy="220" r="4" fill="#111" />
      <circle cx="260" cy="60" r="4" fill="#111" />
      <text x="90" y="240" fontSize="16" fontWeight="bold" fill="#111">A</text>
      <text x="385" y="240" fontSize="16" fontWeight="bold" fill="#111">B</text>
      <text x="255" y="50" fontSize="16" fontWeight="bold" fill="#111">C</text>
      {/* AB = c = 12 cm */}
      <text x="240" y="245" fontSize="14" fill="#92400e" textAnchor="middle">c = 12 cm</text>
      {/* α = 50° A-nál */}
      <path d="M 130 220 A 30 30 0 0 0 120 205" stroke="#2563eb" strokeWidth="2" fill="none" />
      <text x="145" y="215" fontSize="13" fill="#2563eb">α = 50°</text>
      {/* β = 70° B-nél */}
      <path d="M 350 220 A 30 30 0 0 0 360 208" stroke="#dc2626" strokeWidth="2" fill="none" />
      <text x="320" y="210" fontSize="13" fill="#dc2626">β = 70°</text>
      {/* keresett oldal: a = BC (B-vel szemben A), de kérjük a-t az α-val szemben */}
      <text x="175" y="140" fontSize="13" fill="#059669" fontWeight="bold">a = ?</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy háromszög $AB$ oldalának hossza $c = 12$ cm. Az $A$ csúcsnál lévő szög $\\alpha = 50°$, a $B$ csúcsnál lévő szög $\\beta = 70°$.

Számítsa ki az $\\alpha$-val szemközti $a$ oldal hosszát két tizedesjegyre kerekítve!`,
  figure: () => <Triangle />,
  asked: [{ key: 'a', label: '$a = ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A harmadik szög meghatározása',
      points: 1,
      body: `Egy háromszög belső szögeinek összege $180°$, tehát a $C$ csúcsnál lévő szög:

$$\\gamma = 180° - \\alpha - \\beta = 180° - 50° - 70° = 60°.$$

Ez az a szög, amelyik a megadott $c = 12$ cm oldallal **szemközt** van — ezt használjuk a szinusztétel „szemközti oldal / szemközti szög szinusza" hányadosában.`,
    },
    {
      title: '2. lépés — A szinusztétel felírása',
      points: 1,
      body: `A szinusztétel (fgv. tábla 54. old.) szerint egy háromszögben bármely oldalt a vele szemközti szög szinuszával elosztva ugyanazt a számot kapjuk:

$$\\dfrac{a}{\\sin \\alpha} = \\dfrac{c}{\\sin \\gamma}.$$

Innen $a$ kifejezhető:

$$a = c \\cdot \\dfrac{\\sin \\alpha}{\\sin \\gamma} = 12 \\cdot \\dfrac{\\sin 50°}{\\sin 60°}.$$`,
    },
    {
      title: '3. lépés — A szögfüggvények számértékei és $a$ kiszámítása',
      points: 1,
      body: `Függvénytáblából (vagy számológéppel, fgv. tábla 57. old.):

- $\\sin 50° \\approx 0{,}7660$
- $\\sin 60° = \\dfrac{\\sqrt{3}}{2} \\approx 0{,}8660$

Behelyettesítve:

$$a = 12 \\cdot \\dfrac{0{,}7660}{0{,}8660} \\approx 12 \\cdot 0{,}8845 \\approx 10{,}61 \\ \\text{cm}.$$

**Ellenőrzés plauzibilitásra:** $\\alpha < \\gamma$, ezért $a < c$, és valóban $10{,}61 < 12$. ✓`,
    },
  ],
  finalAnswer: {
    a: '$a \\approx 10{,}61$ cm',
  },
  usedFormulas: [
    'háromszög szögeinek összege: $\\alpha + \\beta + \\gamma = 180°$',
    'szinusztétel: $\\dfrac{a}{\\sin \\alpha} = \\dfrac{c}{\\sin \\gamma}$',
  ],
};

export default { meta, problem, solution };
