import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-13b',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.A',
  number: 13,
  sub: '.b',
  title: 'Téglalap kerülete területből — másodfokú egyenlet',
  points: 6,
  topics: ['egyenletek', 'síkgeometria'],
  difficulty: 2,
  fgvt: [
    { page: 27, note: 'másodfokú megoldóképlet' },
    { page: 64, note: 'téglalap területe' },
  ],
  estimatedMinutes: 10,
};

function Rectangle({ showLabels = 'vars', showResult = false }) {
  // Az arány ~75:27 túl nyújtott; stilizált arány: szélesség ~3x magasság
  const padX = 60;
  const padY = 70;
  const W = 360;
  const H = 130;
  const labelShort = showResult ? '27 cm' : 'x';
  const labelLong = showResult ? '75 cm' : 'x + 48';
  const areaText = showResult ? 'T = 27 · 75 = 2025 cm²' : 'T = 2025 cm²';
  return (
    <SvgCanvas width={480} height={280} viewBox="0 0 480 280">
      <rect
        x={padX}
        y={padY}
        width={W}
        height={H}
        fill="#dbeafe"
        stroke="#1d4ed8"
        strokeWidth="2"
      />
      {/* rövid oldal címke (bal) */}
      <line x1={padX - 18} y1={padY} x2={padX - 18} y2={padY + H} stroke="#1f2937" strokeWidth="1" />
      <line x1={padX - 22} y1={padY} x2={padX - 14} y2={padY} stroke="#1f2937" strokeWidth="1" />
      <line x1={padX - 22} y1={padY + H} x2={padX - 14} y2={padY + H} stroke="#1f2937" strokeWidth="1" />
      <text x={padX - 26} y={padY + H / 2 + 5} fontSize="16" textAnchor="end" fill="#1e3a8a" fontWeight="700">
        {labelShort}
      </text>
      {/* hosszú oldal címke (alul) */}
      <line x1={padX} y1={padY + H + 22} x2={padX + W} y2={padY + H + 22} stroke="#1f2937" strokeWidth="1" />
      <line x1={padX} y1={padY + H + 18} x2={padX} y2={padY + H + 26} stroke="#1f2937" strokeWidth="1" />
      <line x1={padX + W} y1={padY + H + 18} x2={padX + W} y2={padY + H + 26} stroke="#1f2937" strokeWidth="1" />
      <text x={padX + W / 2} y={padY + H + 42} fontSize="16" textAnchor="middle" fill="#1e3a8a" fontWeight="700">
        {labelLong}
      </text>
      {/* terület felirat középen */}
      <text x={padX + W / 2} y={padY + H / 2 + 6} fontSize="16" textAnchor="middle" fill="#7c2d12" fontWeight="700">
        {areaText}
      </text>
      {showLabels === 'vars' && (
        <text x={240} y={28} fontSize="14" textAnchor="middle" fill="#374151">
          Az egyik oldal 48 cm-rel hosszabb a másiknál.
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy téglalap egyik oldala $48$ cm-rel hosszabb, mint a másik oldala.
A téglalap területe $2025$ cm².
Számítsa ki a téglalap kerületét!`,
  figure: () => <Rectangle showLabels="vars" />,
  asked: [{ key: 'K', label: 'Kerület $K = ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Ismeretlen bevezetése, a másik oldal kifejezése',
      points: 1,
      body: `Jelölje $x$ (cm) a **rövidebb** oldalt. Ekkor a hosszabb oldal

$$x + 48 \\text{ (cm)}.$$

A feladat geometriai jellege miatt csak $x > 0$ jöhet szóba.`,
      figure: () => <Rectangle showLabels="vars" />,
    },
    {
      title: '2. lépés — Egyenlet felírása a területre',
      points: 1,
      body: `A téglalap **területképlete**: $T = a \\cdot b$. Jelen esetben $a = x$, $b = x + 48$, és $T = 2025$ cm², tehát

$$x(x + 48) = 2025.$$

Bontsuk ki a zárójelet és rendezzük nullára:

$$x^2 + 48x - 2025 = 0.$$`,
    },
    {
      title: '3. lépés — A másodfokú egyenlet megoldása',
      points: 2,
      body: `Az $ax^2 + bx + c = 0$ alakú egyenlet **megoldóképlete** ($a = 1$, $b = 48$, $c = -2025$):

$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.$$

A **diszkrimináns**:

$$D = 48^2 - 4 \\cdot 1 \\cdot (-2025) = 2304 + 8100 = 10\\,404.$$

$$\\sqrt{10\\,404} = 102 \\qquad (\\text{mivel } 102^2 = 10\\,404).$$

Tehát

$$x_{1,2} = \\frac{-48 \\pm 102}{2}.$$`,
    },
    {
      title: '4. lépés — A gyökök kiértékelése, értelmezés',
      points: 1,
      body: `A két gyök:

$$x_1 = \\frac{-48 + 102}{2} = \\frac{54}{2} = 27, \\qquad x_2 = \\frac{-48 - 102}{2} = \\frac{-150}{2} = -75.$$

Mivel a téglalap oldalának hossza nem lehet negatív, $x_2 = -75$ nem megoldás.

Tehát a rövidebb oldal $x = 27$ cm, a hosszabb oldal $27 + 48 = 75$ cm.`,
      figure: () => <Rectangle showResult />,
    },
    {
      title: '5. lépés — A kerület kiszámítása, ellenőrzés',
      points: 1,
      body: `A téglalap **kerülete**:

$$K = 2(a + b) = 2 \\cdot (27 + 75) = 2 \\cdot 102 = 204 \\text{ cm}.$$

**Ellenőrzés.**
- Oldalkülönbség: $75 - 27 = 48$ cm. ✓
- Terület: $27 \\cdot 75 = 2025$ cm². ✓

Tehát a téglalap kerülete $\\mathbf{204}$ cm.`,
      figure: () => <Rectangle showResult />,
    },
  ],
  finalAnswer: { K: 'Kerület: $K = 204$ cm (oldalak: $27$ cm és $75$ cm).' },
  usedFormulas: [
    'téglalap területe: $T = a \\cdot b$',
    'téglalap kerülete: $K = 2(a+b)$',
    'másodfokú megoldóképlet: $x_{1,2} = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$',
  ],
};

export default { meta, problem, solution };
