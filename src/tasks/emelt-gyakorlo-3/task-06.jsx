import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-06',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'II',
  number: 6,
  title: 'Csonka kúp — felszín, térfogat és alkotó szöge',
  points: 16,
  topics: ['térgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 76, note: 'kúp, csonka kúp' },
    { page: 77, note: 'gömb' },
    { page: 57, note: 'szögfüggvények' },
  ],
  estimatedMinutes: 24,
};

// Csonka kúp:
//   R = 8 cm (nagyobb sugár, lent)
//   r = 3 cm (kisebb sugár, fent)
//   m = 12 cm (magasság)
// Alkotó: a = √((R-r)^2 + m^2) = √(25 + 144) = √169 = 13 cm
// Térfogat: V = m π (R^2 + R r + r^2) / 3 = 12 π (64 + 24 + 9)/3 = 12 π · 97 / 3 = 4 π · 97 = 388 π ≈ 1218,88 cm³
// Palást: P = (R + r) π a = 11 π · 13 = 143 π ≈ 449,25 cm²
// Felszín: A = R^2 π + r^2 π + (R + r) π a = π (64 + 9 + 143) = 216 π ≈ 678,58 cm²
// Alkotó és alaplap szöge: tan α = m / (R - r) = 12/5 = 2,4 → α = arctan(2,4) ≈ 67,38°

function FrustumFigure({ highlight = 'none' }) {
  // Csonka kúp oldalról nézve: trapéz alakzat + két ellipszis
  // Alsó ellipszis: nagyobb átmérő
  // A kontúr: két ferde vonal
  const cx = 260;
  const yBot = 270;
  const yTop = 90;
  const Rpx = 110; // R = 8 cm → rajzbeli félátmérő
  const rpx = 41;  // r = 3 cm → arányosan kisebb
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* körvonalak */}
      {/* alsó ellipszis */}
      <ellipse cx={cx} cy={yBot} rx={Rpx} ry={16} fill="#dbeafe" fillOpacity="0.6" stroke="#1e40af" strokeWidth="2" />
      {/* felső ellipszis */}
      <ellipse cx={cx} cy={yTop} rx={rpx} ry={8} fill="#dbeafe" fillOpacity="0.8" stroke="#1e40af" strokeWidth="2" />

      {/* oldalak */}
      <line x1={cx - Rpx} y1={yBot} x2={cx - rpx} y2={yTop} stroke="#1e40af" strokeWidth="2" />
      <line x1={cx + Rpx} y1={yBot} x2={cx + rpx} y2={yTop} stroke="#1e40af" strokeWidth="2" />

      {/* magasság */}
      <line x1={cx} y1={yBot} x2={cx} y2={yTop} stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
      <text x={cx + 8} y={(yBot + yTop) / 2} fontSize="14" fontWeight="700" fill="#dc2626">m = 12 cm</text>

      {/* sugárok */}
      <line x1={cx} y1={yBot} x2={cx + Rpx} y2={yBot} stroke="#065f46" strokeWidth="1.6" strokeDasharray="3 2" />
      <text x={cx + Rpx / 2} y={yBot + 18} fontSize="13" fontWeight="700" fill="#065f46" textAnchor="middle">
        R = 8 cm
      </text>
      <line x1={cx} y1={yTop} x2={cx + rpx} y2={yTop} stroke="#065f46" strokeWidth="1.6" strokeDasharray="3 2" />
      <text x={cx + rpx / 2} y={yTop - 6} fontSize="13" fontWeight="700" fill="#065f46" textAnchor="middle">
        r = 3 cm
      </text>

      {/* alkotó */}
      {highlight === 'slant' && (
        <g>
          <line x1={cx + Rpx} y1={yBot} x2={cx + rpx} y2={yTop} stroke="#b45309" strokeWidth="3" />
          <text x={cx + Rpx + 10} y={(yBot + yTop) / 2} fontSize="14" fill="#92400e" fontWeight="700">
            a = ?
          </text>
        </g>
      )}
      {highlight === 'angle' && (
        <g>
          <line x1={cx + Rpx} y1={yBot} x2={cx + rpx} y2={yTop} stroke="#b45309" strokeWidth="3" />
          <path d={`M ${cx + Rpx - 32} ${yBot} A 32 32 0 0 0 ${cx + Rpx - 20} ${yBot - 20}`} fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x={cx + Rpx - 44} y={yBot - 10} fontSize="14" fontWeight="700" fill="#dc2626">α</text>
        </g>
      )}
      {highlight === 'volume' && (
        <text x={cx} y={yBot + 60} fontSize="14" textAnchor="middle" fontWeight="700" fill="#065f46">
          V = (m · π / 3) · (R² + Rr + r²)
        </text>
      )}
      {highlight === 'surface' && (
        <text x={cx} y={yBot + 60} fontSize="14" textAnchor="middle" fontWeight="700" fill="#1e40af">
          A = R²π + r²π + (R+r) π a
        </text>
      )}
      <text x={260} y={28} fontSize="15" fontWeight="700" textAnchor="middle" fill="#111827">
        Csonka kúp: R = 8 cm, r = 3 cm, m = 12 cm
      </text>
    </SvgCanvas>
  );
}

function SlantTriangle() {
  // Derékszögű háromszög: R - r = 5, m = 12, a = 13
  return (
    <SvgCanvas width={520} height={240} viewBox="0 0 520 240">
      <polygon points="100,200 400,200 400,40" fill="#fef3c7" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2.5" />
      {/* derékszög jelzés */}
      <rect x={380} y={180} width={20} height={20} fill="none" stroke="#1e3a8a" strokeWidth="1.5" />
      <text x={250} y={220} fontSize="14" fontWeight="700" textAnchor="middle" fill="#065f46">
        R − r = 8 − 3 = 5 cm
      </text>
      <text x={420} y={120} fontSize="14" fontWeight="700" fill="#dc2626">
        m = 12 cm
      </text>
      <text x={210} y={110} fontSize="14" fontWeight="700" fill="#b45309">
        a (alkotó)
      </text>
      <path d="M 130 200 A 30 30 0 0 0 128 180" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={145} y={192} fontSize="14" fill="#dc2626" fontWeight="700">α</text>
      <text x={260} y={30} fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Csonka kúp "alkotó-háromszöge" (axiális metszet jobb fele)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy **csonka kúp** alsó körének sugara $R = 8$ cm, felső körének sugara $r = 3$ cm, magassága $m = 12$ cm.

**a)** Határozza meg az **alkotó** ($a$) hosszát! ($3$ pont)

**b)** Mekkora szöget zár be az alkotó az alaplappal? ($3$ pont)

**c)** Mekkora a csonka kúp **térfogata**? ($4$ pont)

**d)** Mekkora a csonka kúp **felszíne**? ($6$ pont)

A pontos értékeket $\\pi$-vel, a közelítő értékeket két tizedesjegyre kerekítve adja meg!`,
  figure: () => <FrustumFigure />,
  asked: [
    { key: 'a', label: 'a) $a = ?$ cm' },
    { key: 'alpha', label: 'b) $\\alpha = ?°$' },
    { key: 'V', label: 'c) $V = ?$ cm³' },
    { key: 'A', label: 'd) $A = ?$ cm²' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Az alkotó hosszának meghatározása',
      points: 3,
      body: `A csonka kúp **axiális metszete** egy szimmetrikus trapéz. Az alkotó és a **magasság** között derékszögű háromszög keletkezik, amelynek másik befogója a két sugár **különbsége**, $R - r$.

**Pitagorasz-tétellel:**

$$a^2 = m^2 + (R - r)^2 = 12^2 + (8 - 3)^2 = 144 + 25 = 169.$$

$$\\boxed{a = \\sqrt{169} = 13 \\ \\text{cm}}.$$`,
      figure: () => <SlantTriangle />,
    },
    {
      title: 'b) lépés — Az alkotó és alaplap szöge',
      points: 3,
      body: `Ugyanebben a derékszögű háromszögben, $\\alpha$ a $R - r = 5$ cm melletti szög; vele szemben $m = 12$ cm. Tehát

$$\\tan \\alpha = \\dfrac{m}{R - r} = \\dfrac{12}{5} = 2{,}4.$$

$$\\alpha = \\arctan(2{,}4) \\approx 67{,}38°.$$

**Ellenőrzés** szinusszal: $\\sin \\alpha = m / a = 12/13 \\approx 0{,}9231$, és $\\arcsin(0{,}9231) \\approx 67{,}38°$ ✓.`,
      figure: () => <FrustumFigure highlight="angle" />,
    },
    {
      title: 'c/1. lépés — A csonka kúp térfogatképlete',
      points: 2,
      body: `A csonka kúp térfogatának képlete (fgv. tábla, 76. old.):

$$V = \\dfrac{m \\pi}{3} \\,(R^2 + R r + r^2).$$

A képlet "háromtagú átlagos alapterületet" jelent: a kis és a nagy kör területe plusz a geometriai átlaguk.

**Nézzük először a csoportot** $R^2 + Rr + r^2$:

$$R^2 + Rr + r^2 = 64 + 24 + 9 = 97.$$`,
      figure: () => <FrustumFigure highlight="volume" />,
    },
    {
      title: 'c/2. lépés — Behelyettesítés',
      points: 2,
      body: `$$V = \\dfrac{12 \\pi}{3} \\cdot 97 = 4 \\pi \\cdot 97 = 388 \\pi \\ \\text{cm}^3.$$

Közelítés: $388 \\cdot \\pi \\approx 388 \\cdot 3{,}14159 \\approx 1218{,}88$ cm³.`,
    },
    {
      title: 'd/1. lépés — A csonka kúp palástja',
      points: 2,
      body: `A csonka kúp **palástja** (oldallapja) egy körgyűrűszelet, a képlet (fgv. tábla, 76. old.):

$$P = (R + r) \\pi \\, a.$$

Behelyettesítve:

$$P = (8 + 3) \\pi \\cdot 13 = 143 \\pi \\ \\text{cm}^2 \\approx 449{,}25 \\ \\text{cm}^2.$$`,
      figure: () => <FrustumFigure highlight="surface" />,
    },
    {
      title: 'd/2. lépés — A két alaplap területe',
      points: 2,
      body: `A **két alaplap** két különböző méretű kör:

- nagy alaplap: $T_R = R^2 \\pi = 64 \\pi$ cm²,
- kis alaplap: $T_r = r^2 \\pi = 9 \\pi$ cm².

Együtt: $T_R + T_r = 73 \\pi$ cm².`,
    },
    {
      title: 'd/3. lépés — A teljes felszín',
      points: 2,
      body: `A csonka kúp teljes felszíne:

$$A = T_R + T_r + P = 64 \\pi + 9 \\pi + 143 \\pi = 216 \\pi \\ \\text{cm}^2.$$

Közelítés:

$$A \\approx 216 \\cdot 3{,}14159 \\approx 678{,}58 \\ \\text{cm}^2.$$

**Ellenőrzés** — minden tag pozitív, és a palást (143π) indokoltan nagyobb, mint a nagyobb alaplap (64π), hiszen $(R+r) \\cdot a = 143$ és $R^2 = 64$, a geometriai szerkezet ezt magyarázza.`,
    },
  ],
  finalAnswer: {
    a: '$a = 13$ cm',
    alpha: '$\\alpha \\approx 67{,}38°$',
    V: '$V = 388 \\pi \\approx 1218{,}88$ cm³',
    A: '$A = 216 \\pi \\approx 678{,}58$ cm²',
  },
  usedFormulas: [
    'csonka kúp alkotója: $a = \\sqrt{m^2 + (R-r)^2}$',
    '$\\tan$ definíciója derékszögű háromszögben',
    'csonka kúp térfogata: $V = m \\pi (R^2 + Rr + r^2)/3$',
    'csonka kúp palástja: $P = (R+r) \\pi a$',
    'kör területe: $T = r^2 \\pi$',
  ],
};

export default { meta, problem, solution };
