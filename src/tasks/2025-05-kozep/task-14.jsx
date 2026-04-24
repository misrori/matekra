import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-14',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.A',
  number: 14,
  title: 'ABCD négyszög — szögek, oldalak, terület',
  points: 13,
  topics: ['síkgeometria', 'trigonometria'],
  difficulty: 4,
  fgvt: [
    { page: 62, note: 'Pitagorasz-tétel' },
    { page: 64, note: 'négyszögek' },
    { page: 54, note: 'szinusztétel' },
    { page: 55, note: 'koszinusztétel' },
  ],
  estimatedMinutes: 25,
};

// Geometriai konstans adatok
const AB = 12;
const BC = 15;
const BD = 20;
const AD = 16; // Pitagorasz: sqrt(400 - 144)
const angleDBC = 63; // fok

// Négyszög rajza — koordinátákkal dolgozunk, aztán leképezzük SVG-re
// Helyezzük el: A = (0, 0), B = (12, 0), így AB derékszögben az x-tengelyen.
// AD merőleges AB-re (mert A-nál derékszög van), tehát D = (0, 16) (felfelé).
// BD = 20 (ellenőrzés: sqrt(144 + 256) = 20 ✓).
// ABD szög A-nál: tg(ABD) = AD/AB = 16/12 = 4/3  → ABD ≈ 53,13°.
// DBC = 63°, a DBC szöget BD-hez képest a D oldalon mérjük (ABD+DBC = beta, kifelé).
// B csúcsnál a B→D vektor iránya: D - B = (-12, 16) → szög x-től: atan2(16, -12) ≈ 126,87°.
// A B→C vektor ehhez képest 63°-kal tovább forgatva (C a D-vel ellentétes oldalra B-től? A hivatalos ábra szerint C a D-vel ugyanazon az oldalán fekszik a B-ből nézve; a konvex négyszög miatt a DBC szög BD-n túl, C felé van).
// BC = 15. Vegyük a BD iránytól 63°-kal ELFORGATVA (ugyanazon az oldalon, ahol A nincs, tehát C a négyszög külső tartománya felé).
// Egyszerűbb: BD irány szöge = 126,87°. C iránya = 126,87° + 63° = 189,87° (balra-lefelé) — ez nem konvex.
// Inkább: C iránya = 126,87° - 63° = 63,87° (jobbra-felfelé), így konvex négyszög.
// Valójában a hivatalos ábra: A jobbra lent, B jobbra lent mellette, C felül, D balra — egy konvex négyszög.
// Legyen: A = (0, 0), B = (12, 0), D = (0, 16), és C olyan, hogy BC = 15 és DBC = 63°.
// Így C iránya B-ből: 126,87° - 63° = 63,87°  (A fölötti térben).
// Cx = 12 + 15 cos(63,87°) ≈ 12 + 15·0,4408 ≈ 18,61
// Cy = 0 + 15 sin(63,87°) ≈ 15·0,8976 ≈ 13,46
const Cx = 12 + 15 * Math.cos((63.87 * Math.PI) / 180);
const Cy = 15 * Math.sin((63.87 * Math.PI) / 180);

// Koordináta -> SVG leképezés (y-tengely fordítva)
const scale = 14;
const ox = 60;
const oy = 280;
const P = (x, y) => [ox + x * scale, oy - y * scale];

const [axA, ayA] = P(0, 0);
const [bxB, byB] = P(12, 0);
const [dxD, dyD] = P(0, 16);
const [cxC, cyC] = P(Cx, Cy);

function Figure({ highlight = 'none' }) {
  // highlight: 'none' | 'abd' | 'beta' | 'bcd' | 'area' | 'diag'
  const abdFill = highlight === 'abd' ? '#fde68a' : 'none';
  const bcdFill = highlight === 'bcd' ? '#bbf7d0' : 'none';
  const wholeFill = highlight === 'area' ? '#e0e7ff' : 'none';

  return (
    <SvgCanvas width={560} height={360} viewBox="0 0 560 360">
      {/* Négyszög kitöltése (terület highlight) */}
      {wholeFill !== 'none' && (
        <polygon
          points={`${axA},${ayA} ${bxB},${byB} ${cxC},${cyC} ${dxD},${dyD}`}
          fill={wholeFill}
          fillOpacity="0.7"
        />
      )}

      {/* ABD háromszög kiemelve */}
      {abdFill !== 'none' && (
        <polygon
          points={`${axA},${ayA} ${bxB},${byB} ${dxD},${dyD}`}
          fill={abdFill}
          fillOpacity="0.75"
        />
      )}
      {/* BCD háromszög kiemelve */}
      {bcdFill !== 'none' && (
        <polygon
          points={`${bxB},${byB} ${cxC},${cyC} ${dxD},${dyD}`}
          fill={bcdFill}
          fillOpacity="0.75"
        />
      )}

      {/* Négyszög élei */}
      <polygon
        points={`${axA},${ayA} ${bxB},${byB} ${cxC},${cyC} ${dxD},${dyD}`}
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2.5"
      />

      {/* BD átló */}
      <line
        x1={bxB}
        y1={byB}
        x2={dxD}
        y2={dyD}
        stroke={highlight === 'diag' ? '#dc2626' : '#6b7280'}
        strokeWidth={highlight === 'diag' ? 2.5 : 1.5}
        strokeDasharray="4 3"
      />

      {/* Derékszög jelzés A-nál */}
      <polyline
        points={`${axA + 12},${ayA} ${axA + 12},${ayA - 12} ${axA},${ayA - 12}`}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.2"
      />

      {/* Szög beta jelzés B-nél */}
      {highlight === 'beta' && (
        <path
          d={`M ${bxB - 22},${byB} A 22 22 0 0 0 ${bxB + 22 * Math.cos((126.87 * Math.PI) / 180)},${byB - 22 * Math.sin((126.87 * Math.PI) / 180)}`}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2"
        />
      )}

      {/* Csúcsok címkéi */}
      <text x={axA - 14} y={ayA + 18} fontSize="16" fontWeight="bold" fill="#1e3a8a">A</text>
      <text x={bxB + 6} y={byB + 18} fontSize="16" fontWeight="bold" fill="#1e3a8a">B</text>
      <text x={cxC + 8} y={cyC} fontSize="16" fontWeight="bold" fill="#1e3a8a">C</text>
      <text x={dxD - 16} y={dyD - 4} fontSize="16" fontWeight="bold" fill="#1e3a8a">D</text>

      {/* Oldal címkék */}
      <text x={(axA + bxB) / 2 - 4} y={byB + 22} fontSize="13" fill="#111">AB = 12</text>
      <text x={(axA + dxD) / 2 - 48} y={(ayA + dyD) / 2} fontSize="13" fill="#111">
        AD = {highlight === 'abd' || highlight === 'beta' ? '16' : '?'}
      </text>
      <text x={(bxB + cxC) / 2 + 6} y={(byB + cyC) / 2 + 4} fontSize="13" fill="#111">BC = 15</text>
      <text x={(cxC + dxD) / 2 - 20} y={(cyC + dyD) / 2 - 6} fontSize="13" fill="#111">
        CD = {highlight === 'bcd' ? '≈ 18{,}6' : '?'}
      </text>
      <text x={(bxB + dxD) / 2 + 2} y={(byB + dyD) / 2 - 6} fontSize="12" fill="#6b7280">BD = 20</text>

      {/* DBC szög jelzés (63°) */}
      <path
        d={`M ${bxB - 18 * Math.cos((63.87 * Math.PI) / 180) * 0 + bxB - 18},${byB} `}
        fill="none"
      />
      <text x={bxB - 40} y={byB - 36} fontSize="12" fill="#7c3aed">∠DBC = 63°</text>
      <text x={axA + 18} y={ayA - 6} fontSize="11" fill="#6b7280">90°</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az $ABCD$ négyszögben $AB = 12$ cm, $BC = 15$ cm, $BD = 20$ cm. Az $A$ csúcsnál lévő belső szög derékszög, továbbá $\\angle DBC = 63°$ (az ábrának megfelelően).

**a)** Számítsa ki a négyszög $B$ csúcsánál lévő belső szögének ($\\beta$) nagyságát!

**b)** Számítsa ki a négyszög $AD$ és $CD$ oldalának hosszát, valamint a négyszög területét!

**c)** Határozza meg az alábbi állítás logikai értékét (igaz vagy hamis)! Válaszát indokolja!
*„Ha egy négyszög átlói felezik egymást, akkor a négyszög rombusz."*`,
  figure: () => <Figure />,
  asked: [
    { key: 'beta', label: '$\\beta = ?$ (fok)' },
    { key: 'AD', label: '$AD = ?$ cm' },
    { key: 'CD', label: '$CD = ?$ cm' },
    { key: 'T', label: 'Terület $T = ?$ cm²' },
    { key: 'logic', label: 'Igaz vagy hamis? Indoklás.' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — AD kiszámítása Pitagorasz-tétellel',
      points: 2,
      body: `A $\\triangle ABD$ háromszög derékszögű (az $A$ csúcsnál van a derékszög), tehát $BD$ az átfogó.

**Pitagorasz-tétel:**
$$AB^2 + AD^2 = BD^2$$

Behelyettesítve $AB = 12$ és $BD = 20$:
$$12^2 + AD^2 = 20^2$$
$$144 + AD^2 = 400$$
$$AD^2 = 256 \\Rightarrow AD = 16 \\text{ cm}$$`,
      figure: () => <Figure highlight="abd" />,
    },
    {
      title: 'a/2. lépés — az $\\angle ABD$ szög kiszámítása',
      points: 1,
      body: `A $\\triangle ABD$ derékszögű háromszögben a $B$ csúcsnál lévő szögre:
$$\\sin(\\angle ABD) = \\dfrac{AD}{BD} = \\dfrac{16}{20} = 0{,}8$$

Ebből:
$$\\angle ABD = \\arcsin(0{,}8) \\approx 53{,}13°$$

(Ellenőrzés: $\\cos(\\angle ABD) = \\frac{12}{20} = 0{,}6$, így $\\angle ABD \\approx 53{,}13°$ valóban helyes.)`,
      figure: () => <Figure highlight="abd" />,
    },
    {
      title: 'a/3. lépés — a $\\beta$ szög meghatározása',
      points: 3,
      body: `A $B$ csúcsnál lévő belső szög a $\\triangle ABD$ és a $\\triangle DBC$ háromszögek $B$-nél lévő szögeinek **összege**, mivel a $BD$ átló a $\\beta$ szöget két részre osztja.

$$\\beta = \\angle ABD + \\angle DBC$$
$$\\beta \\approx 53{,}13° + 63° = 116{,}13°$$

Tehát $\\boxed{\\beta \\approx 116{,}1°}$.`,
      figure: () => <Figure highlight="beta" />,
    },
    {
      title: 'b/1. lépés — $CD$ kiszámítása koszinusztétellel',
      points: 3,
      body: `A $\\triangle DBC$ háromszögben ismert: $BC = 15$, $BD = 20$, $\\angle DBC = 63°$.

**Koszinusztétel** a $CD$ oldalra (a $\\angle DBC$ szöggel szemközti oldal):
$$CD^2 = BC^2 + BD^2 - 2 \\cdot BC \\cdot BD \\cdot \\cos(\\angle DBC)$$

Behelyettesítve:
$$CD^2 = 15^2 + 20^2 - 2 \\cdot 15 \\cdot 20 \\cdot \\cos 63°$$
$$CD^2 = 225 + 400 - 600 \\cdot 0{,}4540$$
$$CD^2 \\approx 625 - 272{,}4 = 352{,}6$$
$$CD \\approx \\sqrt{352{,}6} \\approx 18{,}78 \\text{ cm}$$

Kerekítve: $\\boxed{CD \\approx 18{,}8 \\text{ cm}}$.`,
      figure: () => <Figure highlight="bcd" />,
    },
    {
      title: 'b/2. lépés — a $\\triangle ABD$ területe',
      points: 1,
      body: `Derékszögű háromszög, a két befogó $AB$ és $AD$:
$$T_{ABD} = \\dfrac{AB \\cdot AD}{2} = \\dfrac{12 \\cdot 16}{2} = 96 \\text{ cm}^2$$`,
      figure: () => <Figure highlight="abd" />,
    },
    {
      title: 'b/3. lépés — a $\\triangle DBC$ területe',
      points: 2,
      body: `Két oldal és a közbezárt szög ismert: $BC = 15$, $BD = 20$, $\\angle DBC = 63°$.

**Terület-képlet:**
$$T_{BDC} = \\dfrac{BC \\cdot BD \\cdot \\sin(\\angle DBC)}{2}$$

Behelyettesítve:
$$T_{BDC} = \\dfrac{15 \\cdot 20 \\cdot \\sin 63°}{2} = \\dfrac{300 \\cdot 0{,}8910}{2}$$
$$T_{BDC} \\approx \\dfrac{267{,}3}{2} \\approx 133{,}7 \\text{ cm}^2$$`,
      figure: () => <Figure highlight="bcd" />,
    },
    {
      title: 'b/4. lépés — a négyszög teljes területe',
      points: 1,
      body: `A $BD$ átló a négyszöget két háromszögre bontja, így:
$$T_{ABCD} = T_{ABD} + T_{BDC} \\approx 96 + 133{,}7 = 229{,}7 \\text{ cm}^2$$

Kerekítve: $\\boxed{T \\approx 229{,}7 \\text{ cm}^2 \\approx 230 \\text{ cm}^2}$.`,
      figure: () => <Figure highlight="area" />,
    },
    {
      title: 'c) lépés — logikai állítás értékelése',
      points: 2,
      body: `**Állítás:** „Ha egy négyszög átlói felezik egymást, akkor a négyszög rombusz."

Az átlók **felezik egymást** minden **paralelogrammában** (ez a paralelogramma egyik tulajdonsága). Azonban nem minden paralelogramma rombusz — például egy közönséges (nem rombusz) **téglalap** vagy egy ferde, nem egyenlő oldalú paralelogramma is olyan négyszög, amelyben az átlók felezik egymást, de nem rombusz.

Rombusz esetén nemcsak felezik egymást az átlók, hanem **merőlegesek is** egymásra — ez erősebb feltétel.

**Ellenpélda:** egy $6 \\times 4$-es téglalap átlói felezik egymást, de nem rombusz (hiszen az oldalai nem egyenlő hosszúak).

Az állítás tehát **hamis**.`,
      figure: () => <Figure highlight="diag" />,
    },
  ],
  finalAnswer: {
    beta: '$\\beta \\approx 116{,}1°$',
    AD: '$AD = 16$ cm',
    CD: '$CD \\approx 18{,}8$ cm',
    T: '$T \\approx 229{,}7$ cm² $\\approx 230$ cm²',
    logic: 'Az állítás **hamis**. Minden paralelogrammában felezik egymást az átlók, de nem minden paralelogramma rombusz (pl. egy téglalap ellenpélda).',
  },
  usedFormulas: [
    'Pitagorasz-tétel',
    'arcsin — hegyesszög szinuszából szög',
    'koszinusztétel',
    'háromszög területe két oldalból és a közbezárt szögből',
    'paralelogramma és rombusz tulajdonságai',
  ],
};

export default { meta, problem, solution };
