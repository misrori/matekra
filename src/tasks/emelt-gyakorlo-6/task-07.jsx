import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-07',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'II',
  number: 7,
  title: 'Feltételes valószínűség, Bayes-tétel és várható érték',
  points: 16,
  topics: ['valószínűség'],
  difficulty: 4,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 95, note: 'feltételes valószínűség, Bayes' },
    { page: 96, note: 'várható érték' },
  ],
  estimatedMinutes: 22,
  check: { type: 'list', value: ['P(W)=0,52', 'P(A|W)=7/13≈0,5385', 'E(X)=13,6'] },
};

// Modell:
//   Pénzérmét dobunk: P(fej) = 0,4, P(írás) = 0,6. (A pénzérme "csaló".)
//   Ha fej → A doboz (7 fehér + 3 fekete = 10 golyó), P(W|A) = 0,7.
//   Ha írás → B doboz (4 fehér + 6 fekete = 10 golyó), P(W|B) = 0,4.
// a) teljes valószínűség: P(W) = P(A)·P(W|A) + P(B)·P(W|B) = 0,4·0,7 + 0,6·0,4 = 0,28+0,24 = 0,52
// b) Bayes: P(A|W) = P(A)·P(W|A) / P(W) = 0,28/0,52 = 28/52 = 7/13 ≈ 0,5385
// c) Várható érték: ha fehér → +100 Ft, ha fekete → −80 Ft
//    E(X) = P(W)·100 + (1−P(W))·(−80) = 0,52·100 + 0,48·(−80) = 52 − 38,4 = 13,6 Ft

function TreeDiagram() {
  return (
    <SvgCanvas width={600} height={320} viewBox="0 0 600 320">
      <rect x="10" y="10" width="580" height="300" fill="#f9fafb" stroke="#374151" strokeWidth="1" rx="6" />

      {/* gyökér */}
      <circle cx="80" cy="160" r="18" fill="#fde68a" stroke="#92400e" strokeWidth="1.8" />
      <text x="80" y="165" fontSize="13" fontWeight="700" textAnchor="middle" fill="#78350f">Ω</text>

      {/* fej / írás */}
      <line x1="98" y1="150" x2="220" y2="80" stroke="#1e40af" strokeWidth="1.6" />
      <text x="155" y="108" fontSize="12" fill="#1e40af" fontWeight="700">P(A)=0,4</text>
      <circle cx="240" cy="80" r="18" fill="#dbeafe" stroke="#1e40af" strokeWidth="1.8" />
      <text x="240" y="85" fontSize="12" fontWeight="700" textAnchor="middle" fill="#1e40af">A</text>

      <line x1="98" y1="170" x2="220" y2="240" stroke="#b91c1c" strokeWidth="1.6" />
      <text x="155" y="220" fontSize="12" fill="#b91c1c" fontWeight="700">P(B)=0,6</text>
      <circle cx="240" cy="240" r="18" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1.8" />
      <text x="240" y="245" fontSize="12" fontWeight="700" textAnchor="middle" fill="#b91c1c">B</text>

      {/* A-ból W/K */}
      <line x1="258" y1="70" x2="400" y2="40" stroke="#065f46" strokeWidth="1.4" />
      <text x="310" y="50" fontSize="11" fill="#065f46" fontWeight="700">0,7</text>
      <text x="420" y="44" fontSize="13" fontWeight="700" fill="#065f46">W (fehér) · 0,28</text>

      <line x1="258" y1="90" x2="400" y2="120" stroke="#374151" strokeWidth="1.4" />
      <text x="310" y="120" fontSize="11" fill="#374151" fontWeight="700">0,3</text>
      <text x="420" y="124" fontSize="13" fontWeight="700" fill="#374151">K (fekete) · 0,12</text>

      {/* B-ből W/K */}
      <line x1="258" y1="230" x2="400" y2="200" stroke="#065f46" strokeWidth="1.4" />
      <text x="310" y="207" fontSize="11" fill="#065f46" fontWeight="700">0,4</text>
      <text x="420" y="204" fontSize="13" fontWeight="700" fill="#065f46">W (fehér) · 0,24</text>

      <line x1="258" y1="250" x2="400" y2="280" stroke="#374151" strokeWidth="1.4" />
      <text x="310" y="277" fontSize="11" fill="#374151" fontWeight="700">0,6</text>
      <text x="420" y="284" fontSize="13" fontWeight="700" fill="#374151">K (fekete) · 0,36</text>

      <text x="300" y="25" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Feltételes valószínűségek fája
      </text>
    </SvgCanvas>
  );
}

function BoxesFigure() {
  return (
    <SvgCanvas width={540} height={240} viewBox="0 0 540 240">
      <rect x="20" y="40" width="220" height="170" fill="#dbeafe" stroke="#1e40af" strokeWidth="2" rx="6" />
      <text x="130" y="64" fontSize="15" fontWeight="700" textAnchor="middle" fill="#1e40af">
        A doboz
      </text>
      {/* 7 fehér */}
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={`aw${i}`} cx={50 + (i % 4) * 34} cy={100 + Math.floor(i / 4) * 34} r="13"
          fill="#f9fafb" stroke="#1e40af" strokeWidth="1.4" />
      ))}
      {/* 3 fekete */}
      {Array.from({ length: 3 }).map((_, i) => (
        <circle key={`ak${i}`} cx={50 + i * 34} cy={170} r="13" fill="#1f2937" stroke="#0b1020" strokeWidth="1.4" />
      ))}
      <text x="130" y="226" fontSize="12" textAnchor="middle" fill="#1e40af">7 fehér + 3 fekete</text>

      <rect x="300" y="40" width="220" height="170" fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" rx="6" />
      <text x="410" y="64" fontSize="15" fontWeight="700" textAnchor="middle" fill="#b91c1c">
        B doboz
      </text>
      {Array.from({ length: 4 }).map((_, i) => (
        <circle key={`bw${i}`} cx={330 + i * 34} cy={100} r="13" fill="#f9fafb" stroke="#b91c1c" strokeWidth="1.4" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={`bk${i}`} cx={330 + (i % 4) * 34} cy={140 + Math.floor(i / 4) * 34} r="13"
          fill="#1f2937" stroke="#0b1020" strokeWidth="1.4" />
      ))}
      <text x="410" y="226" fontSize="12" textAnchor="middle" fill="#b91c1c">4 fehér + 6 fekete</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Két dobozt használunk. Az **A** dobozban $7$ fehér és $3$ fekete, a **B** dobozban $4$ fehér és $6$ fekete golyó van (mindkettőben $10$ golyó).

Feldobunk egy **cinkelt pénzérmét**, amelynek $P(\\text{fej}) = 0{,}4$. Ha az érme fej, **A**-ból, ha írás, **B**-ből húzunk egy golyót (véletlenszerűen).

**a)** Mennyi annak a valószínűsége, hogy a kihúzott golyó **fehér**? ($5$ pont)

**b)** Tudjuk, hogy **fehér golyót** húztunk. Mi a valószínűsége, hogy az **A** dobozból származott? ($6$ pont)

**c)** Egy játék szabálya: ha fehér golyót húzunk, **+100 Ft** nyereményt kapunk; ha fekete, **−80 Ft** (vagyis fizetünk). Mennyi a játék **várható értéke** egy fordulóra? ($5$ pont)`,
  figure: () => <BoxesFigure />,
  asked: [
    { key: 'a', label: 'a) $P(\\text{fehér}) = ?$' },
    { key: 'b', label: 'b) $P(A \\,|\\, \\text{fehér}) = ?$' },
    { key: 'c', label: 'c) $E(X) = ?$ Ft' },
  ],
};

export const solution = {
  steps: [
    {
      title: '0. lépés — A modell rögzítése',
      points: 1,
      body: `Jelöljük:
- $A$: az $A$ dobozból húzunk (pénzérme fej), $P(A) = 0{,}4$.
- $B$: a $B$ dobozból húzunk (pénzérme írás), $P(B) = 1 - 0{,}4 = 0{,}6$.
- $W$: fehér golyót húzunk.

A feltételes valószínűségek a dobozok összetételéből:

$$P(W \\mid A) = \\dfrac{7}{10} = 0{,}7, \\qquad P(W \\mid B) = \\dfrac{4}{10} = 0{,}4.$$`,
      figure: () => <TreeDiagram />,
    },
    {
      title: 'a/1. lépés — A teljes valószínűség tétele',
      points: 3,
      body: `Mivel $\\{A, B\\}$ **teljes eseményrendszer** (egymást kizárók és uniójuk $\\Omega$):

$$P(W) = P(A) \\cdot P(W \\mid A) + P(B) \\cdot P(W \\mid B).$$

Behelyettesítve:

$$P(W) = 0{,}4 \\cdot 0{,}7 + 0{,}6 \\cdot 0{,}4 = 0{,}28 + 0{,}24 = 0{,}52.$$`,
    },
    {
      title: 'a/2. lépés — Ellenőrzés — diszjunkt részek összege',
      points: 1,
      body: `A fa másik ága:

$$P(K) = 0{,}4 \\cdot 0{,}3 + 0{,}6 \\cdot 0{,}6 = 0{,}12 + 0{,}36 = 0{,}48.$$

Összeg: $0{,}52 + 0{,}48 = 1{,}00$ ✓.`,
    },
    {
      title: 'b/1. lépés — Bayes-tétel felírása',
      points: 3,
      body: `A fordított feltételes valószínűség a Bayes-tétellel:

$$P(A \\mid W) = \\dfrac{P(A \\cap W)}{P(W)} = \\dfrac{P(A) \\cdot P(W \\mid A)}{P(W)}.$$`,
    },
    {
      title: 'b/2. lépés — Helyettesítés',
      points: 3,
      body: `A számláló:

$$P(A) \\cdot P(W \\mid A) = 0{,}4 \\cdot 0{,}7 = 0{,}28.$$

A nevező (az a) részből): $P(W) = 0{,}52$.

$$P(A \\mid W) = \\dfrac{0{,}28}{0{,}52} = \\dfrac{28}{52} = \\dfrac{7}{13} \\approx 0{,}5385 \\approx 53{,}85\\%.$$

**Értelmezés**: ha fehér golyót húztunk, az valamivel nagyobb valószínűséggel az $A$ dobozból származott, mint a $B$-ből (hiszen $A$-ban több a fehér arány).`,
    },
    {
      title: 'c/1. lépés — A valószínűségi változó',
      points: 2,
      body: `Legyen $X$ a forduló nyereménye (Ft-ban). Ekkor

$$X = \\begin{cases} +100, & \\text{ha fehér,} \\\\ -80, & \\text{ha fekete.} \\end{cases}$$

Az eloszlás:

$$P(X = 100) = P(W) = 0{,}52, \\qquad P(X = -80) = P(K) = 0{,}48.$$`,
    },
    {
      title: 'c/2. lépés — Várható érték',
      points: 3,
      body: `$$E(X) = 100 \\cdot 0{,}52 + (-80) \\cdot 0{,}48 = 52 - 38{,}4 = 13{,}6 \\text{ Ft}.$$

Mivel $E(X) = 13{,}6 > 0$, hosszú távon a **játékosnak kedvez** ez a szabály: átlagosan $13{,}6$ Ft-ot nyer fordulónként.`,
    },
  ],
  finalAnswer: {
    a: '$P(W) = 0{,}52 = 52\\%$',
    b: '$P(A \\mid W) = \\dfrac{7}{13} \\approx 0{,}5385 \\approx 53{,}85\\%$',
    c: '$E(X) = 13{,}6$ Ft (a játékos javára)',
  },
  usedFormulas: [
    'teljes valószínűség: $P(W) = \\sum_i P(H_i) P(W \\mid H_i)$',
    'Bayes-tétel: $P(H \\mid W) = P(H) P(W \\mid H) / P(W)$',
    'várható érték: $E(X) = \\sum x_i P(X = x_i)$',
  ],
};

export default { meta, problem, solution };
