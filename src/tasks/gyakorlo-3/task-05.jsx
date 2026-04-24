import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-05',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 5,
  title: 'Koszinusztétel — harmadik oldal kiszámítása',
  points: 3,
  topics: ['trigonometria'],
  difficulty: 3,
  fgvt: [
    { page: 55, note: 'koszinusztétel' },
    { page: 57, note: 'szögfüggvény táblázat' },
  ],
  estimatedMinutes: 5,
};

// b = 7, c = 9, α = 60°. Ekkor a² = 49 + 81 - 2·7·9·cos60 = 130 - 63 = 67. a = √67 ≈ 8,185.
function TriFigure({ showAll = false }) {
  // Egyszerű háromszög: A(80,260), B(420,260), C magasan. α A-nál = 60°.
  // AB = c = 9, AC = b = 7. Elhelyezés: A-ból 60°-kal felfelé AC irány.
  const A = { x: 80, y: 270 };
  const B = { x: 420, y: 270 };
  // AC irány: 60° a felfelé (rajzban negatív y). Vektor: (cos(-60°), sin(-60°)) = (0.5, -0.866).
  // AC hossza a rajzon: ~260 (a c=9 vs b=7 vizuális arány).
  const AC_len = (420 - 80) * (7 / 9);
  const C = { x: A.x + AC_len * 0.5, y: A.y - AC_len * 0.866 };
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#dbeafe" fillOpacity="0.5" stroke="#1e3a8a" strokeWidth="2" />
      {/* Szögjel A-nál */}
      <path d={`M ${A.x + 28} ${A.y} A 28 28 0 0 0 ${A.x + 14} ${A.y - 24.25}`} stroke="#dc2626" strokeWidth="2" fill="none" />
      <text x={A.x + 38} y={A.y - 14} fontSize="14" fontWeight="700" fill="#dc2626">α = 60°</text>
      {/* Csúcsok */}
      {[A, B, C].map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#111827" />)}
      <text x={A.x - 12} y={A.y + 18} fontSize="15" fontWeight="700">A</text>
      <text x={B.x + 8} y={B.y + 18} fontSize="15" fontWeight="700">B</text>
      <text x={C.x} y={C.y - 10} fontSize="15" fontWeight="700" textAnchor="middle">C</text>
      {/* Oldalcímkék */}
      <text x={(A.x + B.x) / 2} y={A.y + 30} fontSize="14" fontWeight="700" fill="#1e3a8a" textAnchor="middle">c = 9</text>
      <text x={(A.x + C.x) / 2 - 18} y={(A.y + C.y) / 2} fontSize="14" fontWeight="700" fill="#1e3a8a" textAnchor="end">b = 7</text>
      <text x={(B.x + C.x) / 2 + 10} y={(B.y + C.y) / 2} fontSize="14" fontWeight="700" fill="#b91c1c">
        {showAll ? 'a ≈ 8,19' : 'a = ?'}
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy háromszög két oldala $b = 7$ cm és $c = 9$ cm, a közbezárt szög $\\alpha = 60°$ (az $A$ csúcsnál, $b$ és $c$ között).

Mekkora a harmadik oldal ($a$) hossza? Az eredményt két tizedesjegyre kerekítse!
Megoldását részletezze!`,
  figure: () => <TriFigure />,
  asked: [{ key: 'a', label: '$a = ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A koszinusztétel felírása',
      points: 1,
      body: `Tetszőleges háromszögre érvényes a **koszinusztétel** (fgv. tábla 55. old.):

$$a^2 = b^2 + c^2 - 2 b c \\cos \\alpha,$$

ahol $\\alpha$ a $b$ és $c$ oldalak **közbezárt** szöge (tehát az $a$-val **szemközti** szög).

Itt $b = 7$, $c = 9$, $\\alpha = 60°$.`,
      figure: () => <TriFigure />,
    },
    {
      title: '2. lépés — Behelyettesítés',
      points: 1,
      body: `Nevezetes szög: $\\cos 60° = \\dfrac{1}{2}$.

$$a^2 = 7^2 + 9^2 - 2 \\cdot 7 \\cdot 9 \\cdot \\dfrac{1}{2}.$$

$$a^2 = 49 + 81 - 63 = 67.$$`,
      figure: () => <TriFigure />,
    },
    {
      title: '3. lépés — Négyzetgyök és kerekítés',
      points: 1,
      body: `$$a = \\sqrt{67} \\approx 8{,}1854 \\approx 8{,}19 \\text{ cm.}$$

**Ellenőrzés háromszög-egyenlőtlenséggel**: $|b - c| < a < b + c$, azaz $2 < 8{,}19 < 16$. ✓`,
      figure: () => <TriFigure showAll />,
    },
  ],
  finalAnswer: { a: '$a \\approx 8{,}19$ cm' },
  usedFormulas: [
    'koszinusztétel: $a^2 = b^2 + c^2 - 2bc\\cos\\alpha$',
    'nevezetes szög: $\\cos 60° = 1/2$',
  ],
};

export default { meta, problem, solution };
