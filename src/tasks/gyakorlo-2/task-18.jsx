import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-18',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.B',
  number: 18,
  title: 'Exponenciális csökkenés — gyógyszerkoncentráció vérben',
  points: 17,
  topics: ['exponenciális', 'logaritmus', 'függvények'],
  difficulty: 4,
  fgvt: [
    { page: 43, note: 'exponenciális függvény' },
    { page: 24, note: 'logaritmus azonosságai' },
  ],
  estimatedMinutes: 28,
};

// Modell: c(t) = 80 * 0,85^t  (mg/L, t: óra)
// Felezési idő: 0,85^t = 0,5 -> t = lg 0,5 / lg 0,85 = -0,30103 / -0,07058 ≈ 4,265 óra
// a) c(0) = 80
// b) c(6) = 80 * 0,85^6. 0,85^6 = 0,85^2^3*0,85^0
//    0,85^2 = 0,7225
//    0,85^4 = 0,7225^2 = 0,52200625
//    0,85^6 = 0,85^4 * 0,85^2 = 0,52200625 * 0,7225 ≈ 0,37714952
//    c(6) ≈ 80 * 0,3771 ≈ 30,17 mg/L
// c) c(t) = 20 mg/L -> 80 * 0,85^t = 20 -> 0,85^t = 0,25
//    t = lg(0,25) / lg(0,85) = -0,60206 / -0,07058 ≈ 8,53 óra
// d) Felezési idő: 0,85^T = 0,5 -> T = lg(0,5)/lg(0,85) ≈ 4,27 óra
// e) Hány óra múlva csökken a koncentráció 5 mg/L alá?
//    0,85^t < 5/80 = 0,0625 -> t > lg(0,0625)/lg(0,85) = -1,20412 / -0,07058 ≈ 17,06
//    Tehát kb. 17 óra 4 perc múlva.

function PlotFigure({ step = 0 }) {
  const ax = { x: 60, y: 30, w: 380, h: 260, xMin: 0, xMax: 24, yMin: 0, yMax: 90 };
  const sx = (v) => ax.x + ((v - ax.xMin) / (ax.xMax - ax.xMin)) * ax.w;
  const sy = (v) => ax.y + ax.h - ((v - ax.yMin) / (ax.yMax - ax.yMin)) * ax.h;
  const c = (t) => 80 * Math.pow(0.85, t);
  const N = 60;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * 24;
    pts.push([t, c(t)]);
  }
  const d = pts.map(([t, v], i) => `${i === 0 ? 'M' : 'L'} ${sx(t).toFixed(2)} ${sy(v).toFixed(2)}`).join(' ');

  return (
    <SvgCanvas width={480} height={330} viewBox="0 0 480 330">
      <Axes x={ax.x} y={ax.y} w={ax.w} h={ax.h} xMin={ax.xMin} xMax={ax.xMax} yMin={ax.yMin} yMax={ax.yMax} xStep={4} yStep={10} xLabel="t (óra)" yLabel="c (mg/L)" />

      {/* Görbe */}
      <path d={d} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* a) c(0) pont */}
      {step >= 1 && (
        <g>
          <circle cx={sx(0)} cy={sy(80)} r="5" fill="#16a34a" />
          <text x={sx(0) + 10} y={sy(80) - 6} fontSize="12" fontWeight="bold" fill="#16a34a">(0; 80)</text>
        </g>
      )}
      {/* b) c(6) */}
      {step >= 2 && (
        <g>
          <line x1={sx(6)} y1={sy(0)} x2={sx(6)} y2={sy(c(6))} stroke="#dc2626" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={sx(0)} y1={sy(c(6))} x2={sx(6)} y2={sy(c(6))} stroke="#dc2626" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={sx(6)} cy={sy(c(6))} r="5" fill="#dc2626" />
          <text x={sx(6) + 6} y={sy(c(6)) - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">(6; ≈30,17)</text>
        </g>
      )}
      {/* c) c(t) = 20 */}
      {step >= 3 && (
        <g>
          <line x1={sx(0)} y1={sy(20)} x2={sx(24)} y2={sy(20)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1={sx(8.53)} y1={sy(0)} x2={sx(8.53)} y2={sy(20)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx={sx(8.53)} cy={sy(20)} r="5" fill="#f59e0b" />
          <text x={sx(8.53) + 6} y={sy(20) - 6} fontSize="12" fontWeight="bold" fill="#b45309">t ≈ 8,53</text>
        </g>
      )}
      {/* d) felezési idő */}
      {step >= 4 && (
        <g>
          <line x1={sx(0)} y1={sy(40)} x2={sx(24)} y2={sy(40)} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx={sx(4.27)} cy={sy(40)} r="5" fill="#7c3aed" />
          <text x={sx(4.27) + 6} y={sy(40) - 6} fontSize="12" fontWeight="bold" fill="#6d28d9">T ≈ 4,27 (feleződés)</text>
        </g>
      )}

      <text x="240" y="22" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        c(t) = 80 · 0,85^t   [mg/L, t: óra]
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy gyógyszer alkalmazása után a vérben mért koncentrációját (mg/L-ben) a következő modell írja le:

$$c(t) = 80 \\cdot 0{,}85^{\\,t},$$

ahol $t$ az órákban mért idő a bevételtől számítva.

**a)** Mekkora a gyógyszer **kezdeti** koncentrációja ($t = 0$)? ($1$ pont)

**b)** Mekkora a koncentráció $6$ óra elteltével? (Négy tizedesjegy pontossággal számoljon a közbülső hatványban.) ($4$ pont)

**c)** Mikor csökken a koncentráció $20$ mg/L-re? ($4$ pont)

**d)** Mennyi a gyógyszer **felezési ideje**, azaz milyen óránként feleződik a koncentráció? ($4$ pont)

**e)** Egy újabb adag csak akkor adható be, ha a koncentráció $5$ mg/L alá esett. **Hány óra múlva** lehet legkorábban újra adagolni (legalább hány egész óra múlva)? ($4$ pont)

Az időket két tizedesjegyre kerekítve adja meg!`,
  figure: () => <PlotFigure step={0} />,
  asked: [
    { key: 'a', label: 'a) $c(0) = ?$ mg/L' },
    { key: 'b', label: 'b) $c(6) \\approx ?$ mg/L' },
    { key: 'c', label: 'c) $t \\approx ?$ óra (amikor $c = 20$)' },
    { key: 'd', label: 'd) Felezési idő $T \\approx ?$ óra' },
    { key: 'e', label: 'e) Mikor csökken 5 mg/L alá? (egész órában)' },
  ],
};

export const solution = {
  steps: [
    // a)
    {
      title: 'a) lépés — Kezdeti koncentráció',
      points: 1,
      body: `Behelyettesítve $t = 0$:

$$c(0) = 80 \\cdot 0{,}85^0 = 80 \\cdot 1 = 80 \\ \\text{mg/L}.$$

Minden nullától különböző szám $0$-adik hatványa $1$ (hatvány-azonosság).

$$\\boxed{c(0) = 80 \\ \\text{mg/L}.}$$`,
      figure: () => <PlotFigure step={1} />,
    },

    // b)
    {
      title: 'b/1. lépés — Behelyettesítés $t = 6$-nál',
      points: 1,
      body: `$$c(6) = 80 \\cdot 0{,}85^6.$$

Számítsuk ki $0{,}85^6$-t lépésről lépésre:

- $0{,}85^2 = 0{,}7225$
- $0{,}85^4 = (0{,}85^2)^2 = 0{,}7225^2 \\approx 0{,}5220$
- $0{,}85^6 = 0{,}85^4 \\cdot 0{,}85^2 \\approx 0{,}5220 \\cdot 0{,}7225 \\approx 0{,}3771.$`,
      figure: () => <PlotFigure step={2} />,
    },
    {
      title: 'b/2. lépés — A koncentráció számértéke',
      points: 3,
      body: `$$c(6) \\approx 80 \\cdot 0{,}3771 \\approx 30{,}17 \\ \\text{mg/L}.$$

$$\\boxed{c(6) \\approx 30{,}17 \\ \\text{mg/L}.}$$

(A kezdeti érték kb. $37{,}7\\%$-ára csökkent — ez illeszkedik az exponenciális csökkenés mintázatához.)`,
      figure: () => <PlotFigure step={2} />,
    },

    // c)
    {
      title: 'c/1. lépés — Egyenlet felírása',
      points: 1,
      body: `Keressük azt a $t$ értéket, amelyre $c(t) = 20$:

$$80 \\cdot 0{,}85^t = 20.$$

Osszunk mindkét oldalt $80$-nal:

$$0{,}85^t = \\dfrac{20}{80} = \\dfrac{1}{4} = 0{,}25.$$`,
    },
    {
      title: 'c/2. lépés — Logaritmus alkalmazása',
      points: 2,
      body: `Vegyük mindkét oldal **tízes alapú logaritmusát** (a logaritmus monotonitása miatt ekvivalens egyenlet):

$$\\lg(0{,}85^t) = \\lg(0{,}25).$$

A hatványkitevő azonosság szerint $\\lg(a^t) = t \\lg a$, így:

$$t \\cdot \\lg 0{,}85 = \\lg 0{,}25.$$

Táblából (fgv. tábla 24. old.): $\\lg 0{,}85 \\approx -0{,}07058$, $\\lg 0{,}25 = \\lg \\dfrac{1}{4} = -\\lg 4 \\approx -0{,}60206$.`,
    },
    {
      title: 'c/3. lépés — Az idő kiszámítása',
      points: 1,
      body: `$$t = \\dfrac{\\lg 0{,}25}{\\lg 0{,}85} = \\dfrac{-0{,}60206}{-0{,}07058} \\approx 8{,}53.$$

$$\\boxed{t \\approx 8{,}53 \\ \\text{óra} \\approx 8 \\text{ óra } 32 \\text{ perc}.}$$`,
      figure: () => <PlotFigure step={3} />,
    },

    // d) felezési idő
    {
      title: 'd/1. lépés — A feltétel felírása',
      points: 1,
      body: `A **felezési idő** $T$ az az időtartam, ami alatt a koncentráció a felére csökken:

$$c(t + T) = \\dfrac{1}{2} c(t).$$

Az exponenciális modell miatt:

$$80 \\cdot 0{,}85^{t+T} = \\dfrac{1}{2} \\cdot 80 \\cdot 0{,}85^t.$$

Egyszerűsítve $80 \\cdot 0{,}85^t$-vel:

$$0{,}85^T = \\dfrac{1}{2}.$$

Tehát a felezési idő **független** attól, hogy mikor mérjük — ez az exponenciális csökkenés alapvető tulajdonsága.`,
    },
    {
      title: 'd/2. lépés — Logaritmussal megoldva',
      points: 3,
      body: `$$T = \\dfrac{\\lg 0{,}5}{\\lg 0{,}85} = \\dfrac{-0{,}30103}{-0{,}07058} \\approx 4{,}265.$$

Tehát **kb. $T \\approx 4{,}27$ óra** a felezési idő.

**Ellenőrzés:** $c(T) = 80 \\cdot 0{,}85^{4{,}27} \\approx 80 \\cdot 0{,}500 \\approx 40$ mg/L = $c(0)/2$ ✓.

$$\\boxed{T \\approx 4{,}27 \\ \\text{óra} \\approx 4 \\text{ óra } 16 \\text{ perc}.}$$`,
      figure: () => <PlotFigure step={4} />,
    },

    // e)
    {
      title: 'e/1. lépés — Egyenlőtlenség felírása',
      points: 1,
      body: `Azt a legkisebb egész $t$-t keressük, amelyre már teljesül $c(t) \\leq 5$:

$$80 \\cdot 0{,}85^t \\leq 5.$$

Osszunk $80$-nal:

$$0{,}85^t \\leq \\dfrac{5}{80} = \\dfrac{1}{16} = 0{,}0625.$$`,
    },
    {
      title: 'e/2. lépés — Logaritmus — vigyázat a negatív számmal',
      points: 2,
      body: `Vegyük a tízes alapú logaritmust (monoton növő, de $\\lg 0{,}85 < 0$!):

$$t \\cdot \\lg 0{,}85 \\leq \\lg 0{,}0625.$$

Mindkét oldalt osztva $\\lg 0{,}85$-tel, **az egyenlőtlenség iránya megfordul**, mivel $\\lg 0{,}85 < 0$:

$$t \\geq \\dfrac{\\lg 0{,}0625}{\\lg 0{,}85}.$$

Értékek: $\\lg 0{,}0625 = \\lg(1/16) = -\\lg 16 = -4 \\lg 2 \\approx -1{,}20412$, és $\\lg 0{,}85 \\approx -0{,}07058$.

$$t \\geq \\dfrac{-1{,}20412}{-0{,}07058} \\approx 17{,}06.$$`,
    },
    {
      title: 'e/3. lépés — A legkisebb egész $t$',
      points: 1,
      body: `Tehát $t$ legalább $17{,}06$ óra legyen. Egész órában megfogalmazva a legkisebb érték $\\lceil 17{,}06 \\rceil = 18$ óra (mert $17$ óra múlva még $c(17) = 80 \\cdot 0{,}85^{17} \\approx 80 \\cdot 0{,}0631 \\approx 5{,}05$ mg/L, ami **még nincs** $5$ mg/L alatt).

**Ellenőrzés:**
- $c(17) \\approx 5{,}05$ mg/L — éppen fölötte.
- $c(18) = 80 \\cdot 0{,}85^{18} \\approx 80 \\cdot 0{,}0536 \\approx 4{,}29$ mg/L — már alatta.

$$\\boxed{t = 18 \\ \\text{óra múlva lehet legkorábban újra adagolni}.}$$`,
    },
  ],
  finalAnswer: {
    a: '$c(0) = 80$ mg/L',
    b: '$c(6) \\approx 30{,}17$ mg/L',
    c: '$t \\approx 8{,}53$ óra',
    d: '$T \\approx 4{,}27$ óra',
    e: '$t = 18$ óra',
  },
  usedFormulas: [
    'exponenciális modell: $c(t) = c_0 \\cdot q^t$',
    '$a^0 = 1$',
    '$\\lg(a^t) = t \\cdot \\lg a$',
    '$\\lg(1/x) = -\\lg x$',
    'logaritmus monoton növő volta',
    'negatív számmal való osztás megfordítja az egyenlőtlenség irányát',
  ],
};

export default { meta, problem, solution };
