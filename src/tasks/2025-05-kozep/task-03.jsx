import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-03',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 3,
  title: 'Hatvány egyenlet',
  points: 2,
  topics: ['hatvány', 'egyenletek'],
  difficulty: 1,
  fgvt: [{ page: 22, note: 'hatvány azonosságai' }],
  estimatedMinutes: 2,
};

function ExpTower({ phase = 'original' }) {
  // A bal oldalt egy "torony"-szerű ábrán mutatjuk meg,
  // ahol minden szint egy-egy 2-es tényezőt jelent.
  // phase: 'original' | 'inner' | 'numerator' | 'divide' | 'final'
  const box = (x, y, label, color = '#2563eb', strong = false) => (
    <g key={`${x}-${y}-${label}`}>
      <rect
        x={x}
        y={y}
        width={42}
        height={36}
        rx={6}
        fill={color}
        fillOpacity={strong ? 0.9 : 0.3}
        stroke={color}
        strokeWidth={strong ? 2.5 : 1.5}
      />
      <text
        x={x + 21}
        y={y + 24}
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
        fill={strong ? '#ffffff' : '#1e3a8a'}
      >
        {label}
      </text>
    </g>
  );

  const strongInner = phase === 'inner' || phase === 'numerator';
  const strongNum = phase === 'numerator';
  const strongDivide = phase === 'divide' || phase === 'final';
  const strongFinal = phase === 'final';

  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      {/* Numerator */}
      <text x={20} y={38} fontSize="16" fontWeight="bold" fill="#374151">
        Számláló:
      </text>
      <text x={20} y={64} fontSize="18" fill="#111827">
        2 · (2²)³
      </text>
      {/* Visualize 2 · (2^2)^3 = 2 · 2^6 = 2^7 */}
      {/* single 2 */}
      {box(140, 20, '2', '#2563eb', strongNum)}
      <text x={186} y={44} fontSize="20" fill="#111827">·</text>
      {/* (2^2)^3 = 6 copies of 2 */}
      {[0, 1, 2, 3, 4, 5].map((i) => box(200 + i * 46, 20, '2', '#16a34a', strongInner))}
      <text x={478} y={44} fontSize="16" fill="#065f46">= $2^7$</text>

      {/* divider */}
      <line x1={20} y1={110} x2={500} y2={110} stroke="#6b7280" strokeWidth={1.5} strokeDasharray="4 3" />

      {/* Denominator */}
      <text x={20} y={148} fontSize="16" fontWeight="bold" fill="#374151">
        Nevező:
      </text>
      <text x={20} y={174} fontSize="18" fill="#111827">
        2⁴
      </text>
      {[0, 1, 2, 3].map((i) => box(140 + i * 46, 130, '2', '#dc2626', strongDivide))}

      {/* Result */}
      <line x1={20} y1={220} x2={500} y2={220} stroke="#6b7280" strokeWidth={1.5} />
      <text x={20} y={250} fontSize="16" fontWeight="bold" fill="#374151">
        Eredmény:
      </text>
      {/* After cancellation: 7 - 4 = 3 */}
      {[0, 1, 2].map((i) => box(140 + i * 46, 230, '2', '#7c3aed', strongFinal))}
      <text x={300} y={256} fontSize="18" fontWeight="bold" fill={strongFinal ? '#7c3aed' : '#374151'}>
        = $2^3 = 8$
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg az alábbi egyenletet a valós számok halmazán!

$$\\frac{2 \\cdot (2^2)^3}{2^4} = 2^x$$`,
  figure: () => <ExpTower phase="original" />,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A belső hatvány egyszerűsítése: $(2^2)^3$',
      points: 0,
      body: `A **hatvány hatványozása** szabály szerint: a kitevőket összeszorozzuk.

$$(a^n)^m = a^{n \\cdot m}$$

Alkalmazva a $(2^2)^3$ kifejezésre:

$$(2^2)^3 = 2^{2 \\cdot 3} = 2^6.$$

Szemléletesen: $(2^2)^3$ azt jelenti, hogy háromszor szorozzuk össze $2^2$-t önmagával, vagyis összesen hat darab $2$-es szorzata, amelyet az ábrán zöld téglalapokkal jelöltünk.`,
      figure: () => <ExpTower phase="inner" />,
    },
    {
      title: '2. lépés — A számláló összevonása: $2 \\cdot 2^6$',
      points: 1,
      body: `**Azonos alapú hatványok szorzása**: a kitevőket összeadjuk.

$$a^n \\cdot a^m = a^{n+m}$$

Itt a $2$ önmagában tulajdonképpen $2^1$, így:

$$2 \\cdot 2^6 = 2^1 \\cdot 2^6 = 2^{1+6} = 2^7.$$

A számláló tehát $2^7$. Ezzel az egyenlet:

$$\\frac{2^7}{2^4} = 2^x.$$`,
      figure: () => <ExpTower phase="numerator" />,
    },
    {
      title: '3. lépés — Osztás azonos alappal: $\\dfrac{2^7}{2^4}$',
      points: 1,
      body: `**Azonos alapú hatványok osztása**: a kitevőket kivonjuk egymásból.

$$\\dfrac{a^n}{a^m} = a^{n-m}$$

Behelyettesítve:

$$\\dfrac{2^7}{2^4} = 2^{7-4} = 2^3.$$

Így az egyenlet:

$$2^3 = 2^x.$$`,
      figure: () => <ExpTower phase="divide" />,
    },
    {
      title: '4. lépés — Az egyenlet megoldása',
      points: 0,
      body: `Mivel a $2^x$ **exponenciális függvény szigorúan monoton** (injektív), a $2^a = 2^b$ egyenlet pontosan akkor teljesül, ha $a = b$.

Tehát:

$$2^3 = 2^x \\ \\Longrightarrow \\ x = 3.$$

**Ellenőrzés:** $\\dfrac{2 \\cdot (2^2)^3}{2^4} = \\dfrac{2 \\cdot 64}{16} = \\dfrac{128}{16} = 8 = 2^3$. ✓`,
      figure: () => <ExpTower phase="final" />,
    },
  ],
  finalAnswer: '$x = 3$',
  usedFormulas: [
    '$(a^n)^m = a^{n \\cdot m}$',
    '$a^n \\cdot a^m = a^{n+m}$',
    '$\\dfrac{a^n}{a^m} = a^{n-m}$',
    'az exponenciális függvény injektív',
  ],
};

export default { meta, problem, solution };
