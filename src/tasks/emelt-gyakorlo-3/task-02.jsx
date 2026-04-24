import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-02',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'I',
  number: 2,
  title: 'Háromszög szinusztétellel — nevezetes szögek',
  points: 13,
  topics: ['trigonometria', 'síkgeometria'],
  difficulty: 4,
  fgvt: [
    { page: 54, note: 'szinusztétel' },
    { page: 55, note: 'koszinusztétel' },
    { page: 57, note: 'nevezetes szögek' },
  ],
  estimatedMinutes: 18,
};

// Adatok:
//   α = 75°, β = 60°, γ = 45°
//   a = 12 cm (α-val szemben)
//   Szinusztétellel: b = a sin β / sin α = 12 · sin 60° / sin 75°
//                    c = a sin γ / sin α = 12 · sin 45° / sin 75°
//   sin 75° = sin(45°+30°) = (√6+√2)/4
//   sin 60° = √3/2, sin 45° = √2/2
//   b = 12 · (√3/2) / ((√6+√2)/4) = 24√3 / (√6+√2)
//     = 24√3 (√6-√2) / ((√6)^2-(√2)^2) = 24√3 (√6-√2) / 4 = 6√3(√6-√2)
//     = 6(√18 - √6) = 6(3√2 - √6) = 18√2 - 6√6 ≈ 25,456 - 14,697 = 10,76
//   c = 12 · (√2/2) / ((√6+√2)/4) = 24√2/(√6+√2) = 24√2(√6-√2)/4
//     = 6√2(√6-√2) = 6(√12-2) = 6(2√3-2) = 12√3 - 12 ≈ 20,785 - 12 = 8,785
// Terület: T = ab sin γ / 2 = a c sin β / 2

function TriangleFigure({ highlight = 'none' }) {
  // Háromszöget rajzolunk: A lenn bal, B lenn jobb, C fent
  // α = A-nál = 75°, β = B-nél = 60°, γ = C-nél = 45°
  const A = { x: 80, y: 280 };
  const B = { x: 440, y: 280 };
  // C helye: α = 75°, az AC él A-ból 75°-os szögben emelkedik
  // Lépték: a = BC szemközti α-val = 12 cm → AB hosszát később számítjuk ki
  // Egyszerűen rajzoljuk a háromszöget szép arányokkal.
  const C = { x: 230, y: 60 };
  const Mid = (p, q) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });

  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill={highlight === 'area' ? '#fef3c7' : '#f0f9ff'}
        fillOpacity="0.6"
        stroke="#1e3a8a"
        strokeWidth="2.5"
      />

      {/* Csúcsok */}
      <circle cx={A.x} cy={A.y} r="4" fill="#111827" />
      <circle cx={B.x} cy={B.y} r="4" fill="#111827" />
      <circle cx={C.x} cy={C.y} r="4" fill="#111827" />
      <text x={A.x - 14} y={A.y + 20} fontSize="16" fontWeight="700">A</text>
      <text x={B.x + 8} y={B.y + 20} fontSize="16" fontWeight="700">B</text>
      <text x={C.x - 6} y={C.y - 10} fontSize="16" fontWeight="700">C</text>

      {/* Oldal-címkék */}
      <text x={Mid(B, C).x + 14} y={Mid(B, C).y} fontSize="14" fill="#1e3a8a" fontWeight="700">
        a = 12 cm
      </text>
      <text x={Mid(A, C).x - 40} y={Mid(A, C).y} fontSize="14" fill="#065f46" fontWeight="700">
        b = ?
      </text>
      <text x={Mid(A, B).x - 16} y={Mid(A, B).y + 22} fontSize="14" fill="#9a3412" fontWeight="700">
        c = ?
      </text>

      {/* Szög-ívek + címke */}
      {/* α = 75° A-ban */}
      <path d={`M ${A.x + 30} ${A.y} A 30 30 0 0 0 ${A.x + 30 * Math.cos(-Math.atan2(C.y - A.y, C.x - A.x))} ${A.y + 30 * Math.sin(-Math.atan2(C.y - A.y, C.x - A.x))}`} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 40} y={A.y - 14} fontSize="14" fill="#dc2626" fontWeight="700">α = 75°</text>

      {/* β = 60° B-ben */}
      <text x={B.x - 70} y={B.y - 16} fontSize="14" fill="#2563eb" fontWeight="700">β = 60°</text>
      {/* γ = 45° C-ben */}
      <text x={C.x - 6} y={C.y + 20} fontSize="14" fill="#16a34a" fontWeight="700">γ = 45°</text>

      {/* Magasság a területhez (m_c az AB-re merőleges) */}
      {highlight === 'area' && (
        <g>
          <line x1={C.x} y1={C.y} x2={C.x} y2={A.y} stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x={C.x + 6} y={(C.y + A.y) / 2} fontSize="12" fill="#92400e">m_c</text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $ABC$ háromszögben $\\alpha = 75°$, $\\beta = 60°$, és az $\\alpha$-val szemközti oldal hossza $a = 12$ cm.

**a)** Határozza meg a hiányzó $\\gamma$ szöget! ($1$ pont)

**b)** Számítsa ki a $b$ és $c$ oldalak pontos értékét gyökös alakban, majd két tizedesjegyre kerekítve! ($7$ pont)

**c)** Mekkora a háromszög területe? Adja meg két tizedesjegyre kerekítve! ($5$ pont)`,
  figure: () => <TriangleFigure />,
  asked: [
    { key: 'gamma', label: 'a) $\\gamma = ?$' },
    { key: 'sides', label: 'b) $b, c = ?$' },
    { key: 'area', label: 'c) $T = ?$ cm²' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — A harmadik szög meghatározása',
      points: 1,
      body: `Minden háromszögben a belső szögek összege $180°$:

$$\\alpha + \\beta + \\gamma = 180° \\;\\Longrightarrow\\; \\gamma = 180° - 75° - 60° = 45°.$$`,
    },
    {
      title: 'b/1. lépés — A szinusztétel felírása',
      points: 1,
      body: `A szinusztétel tetszőleges háromszögre (fgv. tábla, 54. old.):

$$\\dfrac{a}{\\sin \\alpha} = \\dfrac{b}{\\sin \\beta} = \\dfrac{c}{\\sin \\gamma}.$$

Innen:
$$b = a \\cdot \\dfrac{\\sin \\beta}{\\sin \\alpha}, \\quad c = a \\cdot \\dfrac{\\sin \\gamma}{\\sin \\alpha}.$$`,
    },
    {
      title: 'b/2. lépés — A szögek szinuszai',
      points: 2,
      body: `A nevezetes szögek szinuszai (fgv. tábla, 57. old.):

- $\\sin 60° = \\dfrac{\\sqrt{3}}{2}$,
- $\\sin 45° = \\dfrac{\\sqrt{2}}{2}$.

A $\\sin 75°$ **nem nevezetes szög**, de összegként felírható: $75° = 45° + 30°$, és

$$\\sin 75° = \\sin(45° + 30°) = \\sin 45° \\cos 30° + \\cos 45° \\sin 30°.$$

Behelyettesítve:

$$\\sin 75° = \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{1}{2} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}.$$`,
    },
    {
      title: 'b/3. lépés — A $b$ oldal gyökös alakja',
      points: 2,
      body: `$$b = 12 \\cdot \\dfrac{\\sin 60°}{\\sin 75°} = 12 \\cdot \\dfrac{\\sqrt{3}/2}{(\\sqrt{6} + \\sqrt{2})/4} = 12 \\cdot \\dfrac{2\\sqrt{3}}{\\sqrt{6} + \\sqrt{2}} = \\dfrac{24\\sqrt{3}}{\\sqrt{6} + \\sqrt{2}}.$$

Racionalizáljuk (szorozzuk a nevező konjugáltjával):

$$b = \\dfrac{24\\sqrt{3} \\,(\\sqrt{6} - \\sqrt{2})}{(\\sqrt{6} + \\sqrt{2})(\\sqrt{6} - \\sqrt{2})} = \\dfrac{24\\sqrt{3}(\\sqrt{6} - \\sqrt{2})}{6 - 2} = 6\\sqrt{3}\\,(\\sqrt{6} - \\sqrt{2}).$$

Tovább egyszerűsítve: $\\sqrt{3}\\cdot\\sqrt{6} = \\sqrt{18} = 3\\sqrt{2}$ és $\\sqrt{3}\\cdot\\sqrt{2} = \\sqrt{6}$, így

$$b = 6(3\\sqrt{2} - \\sqrt{6}) = 18\\sqrt{2} - 6\\sqrt{6}.$$

Közelítő érték: $18 \\cdot 1{,}4142 - 6 \\cdot 2{,}4495 \\approx 25{,}456 - 14{,}697 \\approx 10{,}76$ cm.`,
    },
    {
      title: 'b/4. lépés — A $c$ oldal gyökös alakja',
      points: 2,
      body: `$$c = 12 \\cdot \\dfrac{\\sin 45°}{\\sin 75°} = 12 \\cdot \\dfrac{\\sqrt{2}/2}{(\\sqrt{6} + \\sqrt{2})/4} = \\dfrac{24\\sqrt{2}}{\\sqrt{6} + \\sqrt{2}}.$$

Racionalizálás:

$$c = \\dfrac{24\\sqrt{2}\\,(\\sqrt{6} - \\sqrt{2})}{4} = 6\\sqrt{2}\\,(\\sqrt{6} - \\sqrt{2}) = 6(\\sqrt{12} - 2) = 6(2\\sqrt{3} - 2) = 12\\sqrt{3} - 12.$$

Közelítés: $12 \\cdot 1{,}7321 - 12 \\approx 20{,}785 - 12 = 8{,}78$ cm.

**Eredmény:** $b \\approx 10{,}76$ cm, $c \\approx 8{,}78$ cm.`,
    },
    {
      title: 'c/1. lépés — A terület képlete',
      points: 2,
      body: `A terület **két oldallal és a köztük lévő szöggel** számolható (fgv. tábla, 55–62. old.):

$$T = \\dfrac{b \\cdot c \\cdot \\sin \\alpha}{2} = \\dfrac{a \\cdot c \\cdot \\sin \\beta}{2} = \\dfrac{a \\cdot b \\cdot \\sin \\gamma}{2}.$$

Válasszuk a harmadikat — legyakrabban itt a legegyszerűbb, mert $a = 12$ és $\\sin 45° = \\sqrt{2}/2$.`,
      figure: () => <TriangleFigure highlight="area" />,
    },
    {
      title: 'c/2. lépés — Behelyettesítés és számítás',
      points: 3,
      body: `$$T = \\dfrac{a \\cdot b \\cdot \\sin \\gamma}{2} = \\dfrac{12 \\cdot (18\\sqrt{2} - 6\\sqrt{6}) \\cdot \\sin 45°}{2}.$$

Bontva:

$$T = 6 \\cdot (18\\sqrt{2} - 6\\sqrt{6}) \\cdot \\dfrac{\\sqrt{2}}{2} = 3\\sqrt{2} \\cdot (18\\sqrt{2} - 6\\sqrt{6}).$$

Tagonként:
- $3\\sqrt{2} \\cdot 18\\sqrt{2} = 54 \\cdot 2 = 108$
- $3\\sqrt{2} \\cdot 6\\sqrt{6} = 18\\sqrt{12} = 18 \\cdot 2\\sqrt{3} = 36\\sqrt{3}$

Tehát

$$T = 108 - 36\\sqrt{3} \\ \\text{cm}^2.$$

Közelítés: $108 - 36 \\cdot 1{,}7321 \\approx 108 - 62{,}354 \\approx 45{,}65$ cm².

**Ellenőrzés** (másik képlettel): $T = \\tfrac{a c \\sin \\beta}{2} = \\tfrac{12 \\cdot 8{,}78 \\cdot \\sin 60°}{2} = \\tfrac{12 \\cdot 8{,}78 \\cdot 0{,}8660}{2} \\approx 45{,}6$ cm². ✓`,
      figure: () => <TriangleFigure highlight="area" />,
    },
  ],
  finalAnswer: {
    gamma: '$\\gamma = 45°$',
    sides: '$b = 18\\sqrt{2} - 6\\sqrt{6} \\approx 10{,}76$ cm, $\\;c = 12\\sqrt{3} - 12 \\approx 8{,}78$ cm',
    area: '$T = 108 - 36\\sqrt{3} \\approx 45{,}65$ cm²',
  },
  usedFormulas: [
    'háromszög szögösszege: $\\alpha + \\beta + \\gamma = 180°$',
    'szinusztétel: $a/\\sin\\alpha = b/\\sin\\beta = c/\\sin\\gamma$',
    'addíciós képlet: $\\sin(x+y) = \\sin x \\cos y + \\cos x \\sin y$',
    'terület: $T = \\tfrac{ab\\sin\\gamma}{2}$',
  ],
};

export default { meta, problem, solution };
