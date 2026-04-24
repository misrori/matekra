import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-4-05',
  year: 2024,
  session: 'gyakorló · 4. teszt',
  level: 'közép',
  part: 'I',
  number: 5,
  title: 'Szinusztétel — háromszög oldala',
  points: 3,
  topics: ['trigonometria'],
  difficulty: 3,
  fgvt: [
    { page: 54, note: 'szinusztétel' },
    { page: 57, note: 'szögfüggvény táblázat' },
  ],
  estimatedMinutes: 5,
  check: { type: 'number', value: 9.02, tolerance: 0.05 },
};

// Háromszög: a = 6 cm, α = 40°, β = 75°. Kérdés: b = ?
// b/sin β = a/sin α → b = a · sin β / sin α = 6 · sin 75° / sin 40°.
// sin 75° ≈ 0,9659; sin 40° ≈ 0,6428. b ≈ 6 · 0,9659 / 0,6428 ≈ 9,0166 ≈ 9,02.
function TriFigure({ showAnswer = false }) {
  // Rajz: A bal, B jobb alsó, C felül. α A-nál, β B-nél.
  const A = { x: 90, y: 270 };
  const B = { x: 430, y: 270 };
  // C az A-ból 40°-kal, B-ből (180 - 75) = 105° felülről.
  // Egyszerűsítés: számoljuk c = AB, aztán a = BC és b = AC.
  // AB = c — képletesen b-vel számoljuk. Itt csak illusztráció.
  const C = { x: 250, y: 90 };
  return (
    <SvgCanvas width={520} height={330} viewBox="0 0 520 330">
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#dbeafe" fillOpacity="0.55" stroke="#1e3a8a" strokeWidth="2" />
      {[A, B, C].map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#111827" />)}
      <text x={A.x - 12} y={A.y + 18} fontSize="15" fontWeight="700">A</text>
      <text x={B.x + 8} y={B.y + 18} fontSize="15" fontWeight="700">B</text>
      <text x={C.x} y={C.y - 10} fontSize="15" fontWeight="700" textAnchor="middle">C</text>
      {/* Szögjel α (A-nál) */}
      <path d={`M ${A.x + 32} ${A.y} A 32 32 0 0 0 ${A.x + 25.2} ${A.y - 19.7}`} stroke="#dc2626" strokeWidth="2" fill="none" />
      <text x={A.x + 42} y={A.y - 12} fontSize="13" fontWeight="700" fill="#dc2626">α = 40°</text>
      {/* Szögjel β (B-nél) */}
      <path d={`M ${B.x - 32} ${B.y} A 32 32 0 0 1 ${B.x - 8.3} ${B.y - 30.9}`} stroke="#9333ea" strokeWidth="2" fill="none" />
      <text x={B.x - 42} y={B.y - 12} fontSize="13" fontWeight="700" fill="#9333ea" textAnchor="end">β = 75°</text>
      {/* Oldalcímkék */}
      <text x={(A.x + B.x) / 2} y={A.y + 28} fontSize="14" fontWeight="700" fill="#1e3a8a" textAnchor="middle">c</text>
      <text x={(B.x + C.x) / 2 + 10} y={(B.y + C.y) / 2} fontSize="14" fontWeight="700" fill="#1e3a8a">a = 6 cm</text>
      <text x={(A.x + C.x) / 2 - 14} y={(A.y + C.y) / 2} fontSize="14" fontWeight="700" fill="#b91c1c" textAnchor="end">
        {showAnswer ? 'b ≈ 9,02 cm' : 'b = ?'}
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az $ABC$ háromszögben $a = 6$ cm (a $BC$ oldal, amely $A$-val szemközti), $\\alpha = 40°$ (az $A$-nál lévő szög), $\\beta = 75°$ (a $B$-nél lévő szög).

Mekkora a $b$ oldal (az $AC$, amely $B$-vel szemközti)? Az eredményt kettő tizedesjegyre kerekítse!`,
  figure: () => <TriFigure />,
  asked: [{ key: 'b', label: '$b = ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A szinusztétel',
      points: 1,
      body: `A **szinusztétel** (fgv. tábla 54. old.) szerint bármely háromszögben:

$$\\dfrac{a}{\\sin \\alpha} = \\dfrac{b}{\\sin \\beta} = \\dfrac{c}{\\sin \\gamma}.$$

Az oldal és a **vele szemközti** szög szinuszának hányadosa konstans.`,
      figure: () => <TriFigure />,
    },
    {
      title: '2. lépés — Kifejezés $b$-re',
      points: 1,
      body: `$$\\dfrac{a}{\\sin \\alpha} = \\dfrac{b}{\\sin \\beta} \\;\\Rightarrow\\; b = \\dfrac{a \\cdot \\sin \\beta}{\\sin \\alpha}.$$

Behelyettesítve $a = 6$, $\\alpha = 40°$, $\\beta = 75°$:

$$b = \\dfrac{6 \\cdot \\sin 75°}{\\sin 40°}.$$`,
      figure: () => <TriFigure />,
    },
    {
      title: '3. lépés — Numerikus kiszámítás',
      points: 1,
      body: `Függvénytábla (57. old.) alapján:

- $\\sin 75° \\approx 0{,}9659$
- $\\sin 40° \\approx 0{,}6428$

$$b \\approx \\dfrac{6 \\cdot 0{,}9659}{0{,}6428} = \\dfrac{5{,}7956}{0{,}6428} \\approx 9{,}016 \\approx 9{,}02 \\text{ cm}.$$

**Ellenőrzés**: $\\gamma = 180° - 40° - 75° = 65°$. $\\sin 65° \\approx 0{,}9063$.
$c/\\sin\\gamma = c/0{,}9063$, és $a/\\sin\\alpha = 6/0{,}6428 \\approx 9{,}335$. Tehát $c \\approx 8{,}46$ cm. A három oldal $(6,\\ 9{,}02,\\ 8{,}46)$ konzisztens a szögekkel.`,
      figure: () => <TriFigure showAnswer />,
    },
  ],
  finalAnswer: { b: '$b \\approx 9{,}02$ cm' },
  usedFormulas: [
    'szinusztétel: $\\dfrac{a}{\\sin\\alpha} = \\dfrac{b}{\\sin\\beta}$',
  ],
};

export default { meta, problem, solution };
