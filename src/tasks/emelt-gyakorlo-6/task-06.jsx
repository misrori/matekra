import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-06',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'II',
  number: 6,
  title: 'Szabályos tetraéder — magasság, térfogat, felszín, beírt gömb',
  points: 16,
  topics: ['térgeometria'],
  difficulty: 4,
  fgvt: [
    { page: 76, note: 'gúla térfogata' },
    { page: 77, note: 'gömb, félgömb' },
    { page: 62, note: 'szabályos háromszög magassága, területe' },
  ],
  estimatedMinutes: 22,
  check: { type: 'list', value: ['m=2√6', 'V=18√2', 'A=36√3', 'r=√6/2'] },
};

// Szabályos tetraéder élhossza a = 6 cm.
// a) magasság m = a√(2/3) = a√6/3 = 6√6/3 = 2√6 ≈ 4,899
//    — vagy: a magasságvonal talppontja az alaplap súlypontja; a szabályos háromszög
//      súlypontjának távolsága a csúcstól = (2/3)·alaplap magasság = (2/3)·(a√3/2) = a√3/3
//      Pitagorasz: a² = m² + (a√3/3)² ⇒ m² = a² - a²/3 = 2a²/3 ⇒ m = a√(2/3) = a√6/3
// b) térfogat: V = (T_alap · m)/3 = ((a²√3/4) · a√6/3)/3 = a³√18/36 = a³·3√2/36 = a³√2/12
//           a=6 ⇒ V = 216√2/12 = 18√2 ≈ 25,456 cm³
// c) felszín: 4 egybevágó szabályos háromszög
//    A = 4 · (a²√3/4) = a²√3; a=6 ⇒ A = 36√3 ≈ 62,354 cm²
// d) beírt gömb sugara: r = 3V / A = 3·18√2 / 36√3 = 54√2/36√3 = 3√2/(2√3) = 3√6/6 = √6/2 ≈ 1,2247

function TetraederFigure({ highlight = 'none' }) {
  // 3D tetraéder axonometrikus rajz
  // csúcsok: A(100,280), B(420,280), C(260,180) [alaplap], D(260,60) [csúcs]
  const A = [100, 280], B = [420, 280], C = [260, 180], D = [260, 60];
  const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]; // súlypont
  return (
    <SvgCanvas width={540} height={340} viewBox="0 0 540 340">
      {/* alaplap */}
      <polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}`}
        fill="#dbeafe" fillOpacity="0.6" stroke="#1e40af" strokeWidth="1.6" strokeDasharray="4 3" />
      {/* oldallapok — elöl 2 látszik */}
      <polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${D[0]},${D[1]}`}
        fill="#fef3c7" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2" />
      <polygon points={`${A[0]},${A[1]} ${C[0]},${C[1]} ${D[0]},${D[1]}`}
        fill="#fce7f3" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2" />
      <polygon points={`${B[0]},${B[1]} ${C[0]},${C[1]} ${D[0]},${D[1]}`}
        fill="#ede9fe" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2" />
      {/* csúcs címkék */}
      <text x={A[0] - 10} y={A[1] + 14} fontSize="13" fontWeight="700" fill="#111827">A</text>
      <text x={B[0] + 6} y={B[1] + 14} fontSize="13" fontWeight="700" fill="#111827">B</text>
      <text x={C[0] + 4} y={C[1] - 6} fontSize="13" fontWeight="700" fill="#111827">C</text>
      <text x={D[0] - 4} y={D[1] - 6} fontSize="13" fontWeight="700" fill="#111827">D</text>

      {highlight === 'height' && (
        <g>
          {/* magasságvonal D-ből az alaplap súlypontjához */}
          <line x1={D[0]} y1={D[1]} x2={G[0]} y2={G[1]} stroke="#dc2626" strokeWidth="2.2" />
          <text x={D[0] + 10} y={(D[1] + G[1]) / 2} fontSize="13" fontWeight="700" fill="#dc2626">
            m = ?
          </text>
          <circle cx={G[0]} cy={G[1]} r="4" fill="#dc2626" />
          <text x={G[0] + 6} y={G[1] + 14} fontSize="12" fill="#dc2626" fontWeight="700">S</text>
        </g>
      )}
      {highlight === 'inscribed' && (
        <g>
          {/* beírt gömb modellezése kicsi körrel középen */}
          <circle cx={260} cy={210} r="28" fill="#10b981" fillOpacity="0.4" stroke="#065f46" strokeWidth="1.8" />
          <text x={260} y={213} fontSize="12" fontWeight="700" textAnchor="middle" fill="#065f46">
            r = ?
          </text>
        </g>
      )}
      <text x={270} y={26} fontSize="15" fontWeight="700" textAnchor="middle" fill="#111827">
        Szabályos tetraéder, élhossza a = 6 cm
      </text>
    </SvgCanvas>
  );
}

function BaseCentroidFigure() {
  // A szabályos alaplap felülnézetből + súlypont-csúcs távolság
  // T a súlypont
  return (
    <SvgCanvas width={520} height={260} viewBox="0 0 520 260">
      <polygon points="140,220 380,220 260,40" fill="#dbeafe" fillOpacity="0.6" stroke="#1e40af" strokeWidth="2" />
      <circle cx={260} cy={160} r="4" fill="#065f46" />
      <text x={268} y={164} fontSize="13" fill="#065f46" fontWeight="700">S (súlypont)</text>
      {/* súlypont-csúcs vonal (C-hez) */}
      <line x1={260} y1={160} x2={260} y2={40} stroke="#b45309" strokeWidth="2" />
      <text x={268} y={100} fontSize="13" fill="#b45309" fontWeight="700">d = a√3/3</text>
      <text x={260} y={240} fontSize="13" fontWeight="700" textAnchor="middle" fill="#111827">
        Alaplap (szabályos háromszög), a súlypont 2/3-ra van a csúcstól.
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy **szabályos tetraéder** élhossza $a = 6$ cm.

**a)** Határozza meg a **tetraéder magasságát**! ($4$ pont)

**b)** Mekkora a **térfogata**? ($4$ pont)

**c)** Mekkora a **felszíne**? ($3$ pont)

**d)** Mekkora a tetraéderbe beírható **gömb sugara**? ($5$ pont)

A pontos értékeket gyökös/törtes alakban is, a közelítő értékeket három tizedesjegyre adja meg!`,
  figure: () => <TetraederFigure />,
  asked: [
    { key: 'a', label: 'a) $m = ?$ cm' },
    { key: 'b', label: 'b) $V = ?$ cm³' },
    { key: 'c', label: 'c) $A = ?$ cm²' },
    { key: 'd', label: 'd) $r = ?$ cm (beírt gömb)' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A súlypont távolsága egy alapcsúcstól',
      points: 2,
      body: `Az alaplap **szabályos háromszög** $a = 6$ cm oldallal. Egy szabályos háromszög magassága:

$$m_{\\triangle} = \\dfrac{a \\sqrt{3}}{2} = \\dfrac{6\\sqrt{3}}{2} = 3\\sqrt{3} \\text{ cm}.$$

A súlypont a súlyvonalat $2 : 1$ arányban osztja a csúcstól mérve, ezért a súlypont **távolsága egy csúcstól**:

$$d = \\dfrac{2}{3} \\cdot m_{\\triangle} = \\dfrac{2}{3} \\cdot 3\\sqrt{3} = 2\\sqrt{3} \\text{ cm} = \\dfrac{a\\sqrt{3}}{3}.$$`,
      figure: () => <BaseCentroidFigure />,
    },
    {
      title: 'a/2. lépés — A tetraéder magassága (Pitagorasz)',
      points: 2,
      body: `A $D$ tetőcsúcsból az alaplap $S$ súlypontjába mutató magasság és egy oldalél ($DA$, hossza $a$) egy derékszögű háromszöget alkot a $d$ befogóval.

Pitagorasz-tétel:

$$a^2 = m^2 + d^2 \\;\\Longrightarrow\\; m^2 = a^2 - d^2 = 36 - 12 = 24.$$

$$m = \\sqrt{24} = 2\\sqrt{6} \\text{ cm} \\approx 4{,}899 \\text{ cm}.$$

**Képlet általánosan**: $m = a \\sqrt{\\dfrac{2}{3}} = \\dfrac{a\\sqrt{6}}{3}$.`,
      figure: () => <TetraederFigure highlight="height" />,
    },
    {
      title: 'b) lépés — A térfogat',
      points: 4,
      body: `Az alaplap szabályos háromszög területe:

$$T_{\\text{alap}} = \\dfrac{a^2 \\sqrt{3}}{4} = \\dfrac{36\\sqrt{3}}{4} = 9\\sqrt{3} \\text{ cm}^2.$$

A tetraéder (mint gúla) térfogata:

$$V = \\dfrac{T_{\\text{alap}} \\cdot m}{3} = \\dfrac{9\\sqrt{3} \\cdot 2\\sqrt{6}}{3} = \\dfrac{18 \\sqrt{18}}{3} = 6 \\sqrt{18} = 6 \\cdot 3\\sqrt{2} = 18\\sqrt{2} \\text{ cm}^3.$$

Közelítés: $V \\approx 18 \\cdot 1{,}414 \\approx 25{,}456$ cm³.`,
    },
    {
      title: 'c) lépés — A felszín',
      points: 3,
      body: `A tetraéder **négy egybevágó** szabályos háromszögből áll:

$$A = 4 \\cdot T_{\\text{alap}} = 4 \\cdot 9\\sqrt{3} = 36\\sqrt{3} \\text{ cm}^2.$$

Közelítés: $A \\approx 36 \\cdot 1{,}732 \\approx 62{,}354$ cm².`,
    },
    {
      title: 'd/1. lépés — A beírt gömb sugarának képlete',
      points: 2,
      body: `Az egyes lapokra emelt piramisok térfogata összegzéssel egyenlő a tetraéder térfogatával:

$$V = \\dfrac{A \\cdot r}{3} \\;\\Longrightarrow\\; r = \\dfrac{3V}{A}.$$

Ez a **beírt gömb sugara**: a gömb középpontja egyenlő távolságra van mind a négy laptól, és ez a távolság $r$.`,
    },
    {
      title: 'd/2. lépés — Számolás',
      points: 3,
      body: `Helyettesítsük be:

$$r = \\dfrac{3 \\cdot 18 \\sqrt{2}}{36 \\sqrt{3}} = \\dfrac{54\\sqrt{2}}{36\\sqrt{3}} = \\dfrac{3\\sqrt{2}}{2\\sqrt{3}} = \\dfrac{3\\sqrt{2} \\cdot \\sqrt{3}}{2 \\cdot 3} = \\dfrac{\\sqrt{6}}{2} \\text{ cm}.$$

Közelítés: $r = \\dfrac{\\sqrt{6}}{2} \\approx \\dfrac{2{,}449}{2} \\approx 1{,}225$ cm.

**Ellenőrzés** képletből: általánosan $r = \\dfrac{a\\sqrt{6}}{12} = \\dfrac{6\\sqrt{6}}{12} = \\dfrac{\\sqrt{6}}{2}$ ✓.`,
      figure: () => <TetraederFigure highlight="inscribed" />,
    },
  ],
  finalAnswer: {
    a: '$m = 2\\sqrt{6} \\approx 4{,}899$ cm',
    b: '$V = 18\\sqrt{2} \\approx 25{,}456$ cm³',
    c: '$A = 36\\sqrt{3} \\approx 62{,}354$ cm²',
    d: '$r = \\dfrac{\\sqrt{6}}{2} \\approx 1{,}225$ cm',
  },
  usedFormulas: [
    'szabályos háromszög magassága: $m_\\triangle = a\\sqrt{3}/2$',
    'szabályos háromszög területe: $T = a^2 \\sqrt{3} / 4$',
    'súlypont távolsága csúcstól: $(2/3) \\cdot m_\\triangle$',
    'Pitagorasz-tétel',
    'gúla térfogata: $V = T_{\\text{alap}} \\cdot m / 3$',
    'beírt gömb sugara: $r = 3V / A$',
  ],
};

export default { meta, problem, solution };
