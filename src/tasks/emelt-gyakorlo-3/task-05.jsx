import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-05',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'II',
  number: 5,
  title: 'Optimalizálás — nyitott doboz maximális térfogata',
  points: 16,
  topics: ['függvények', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 41, note: 'másodfokú függvény' },
    { page: 27, note: 'harmadfokú, deriválás (emelt)' },
  ],
  estimatedMinutes: 22,
};

// Feladat: 40 cm x 24 cm lemezből négy sarokba x oldalú négyzetet vágunk ki, felhajtunk.
// V(x) = x (40 - 2x)(24 - 2x) = x (960 - 128x + 4x^2) = 4x^3 - 128x^2 + 960x
// V'(x) = 12 x^2 - 256 x + 960 = 0 -> 3 x^2 - 64 x + 240 = 0
// Diszkr = 64^2 - 4·3·240 = 4096 - 2880 = 1216
// x = (64 ± √1216) / 6 = (64 ± 34,871) / 6
// Két gyök: x1 = (64-34,871)/6 ≈ 4,855; x2 = (64+34,871)/6 ≈ 16,479
// x ∈ (0, 12) értelmezéstől (24 - 2x > 0 → x < 12)
// Tehát x ≈ 4,855 a max, x2 kívül esik
// V_max ≈ 4,855 · (40 - 9,71)·(24 - 9,71) = 4,855 · 30,29 · 14,29 ≈ 2102,0 cm³

function BoxPattern({ x = 4.855, showLabels = true }) {
  // Lemez kiterítve: 40 x 24, négy sarokban x oldalú négyzet kivágva (szürkével).
  const scale = 10; // 1 cm = 10 px
  const W = 40 * scale;
  const H = 24 * scale;
  const xs = x * scale;
  const offX = 40;
  const offY = 40;
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* lemez */}
      <rect x={offX} y={offY} width={W} height={H} fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
      {/* négy sarok kivágás */}
      <rect x={offX} y={offY} width={xs} height={xs} fill="#d4d4d8" stroke="#71717a" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x={offX + W - xs} y={offY} width={xs} height={xs} fill="#d4d4d8" stroke="#71717a" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x={offX} y={offY + H - xs} width={xs} height={xs} fill="#d4d4d8" stroke="#71717a" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x={offX + W - xs} y={offY + H - xs} width={xs} height={xs} fill="#d4d4d8" stroke="#71717a" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* alap (a felhajtás utáni doboz alja) */}
      <rect x={offX + xs} y={offY + xs} width={W - 2 * xs} height={H - 2 * xs} fill="#86efac" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
      {/* feliratok */}
      {showLabels && (
        <g>
          <text x={offX + W / 2} y={offY - 10} fontSize="14" fontWeight="700" textAnchor="middle" fill="#92400e">
            40 cm
          </text>
          <text x={offX - 10} y={offY + H / 2} fontSize="14" fontWeight="700" textAnchor="end" fill="#92400e">
            24 cm
          </text>
          <text x={offX + xs / 2} y={offY + xs + 14} fontSize="12" textAnchor="middle" fill="#7f1d1d">
            x
          </text>
          <text x={offX + xs + 6} y={offY + xs / 2 + 4} fontSize="12" fill="#7f1d1d">x</text>
          <text x={offX + W / 2} y={offY + H / 2 + 4} fontSize="13" textAnchor="middle" fill="#14532d" fontWeight="700">
            doboz alja
          </text>
        </g>
      )}
      {/* doboz 3D illusztráció */}
      <g transform={`translate(${offX + W + 40}, ${offY + H / 2 - 40})`}>
        <polygon points="0,0 60,-20 100,-20 40,0" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
        <polygon points="0,0 40,0 40,50 0,50" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
        <polygon points="40,0 100,-20 100,30 40,50" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
        <text x="30" y="75" fontSize="11" textAnchor="middle" fill="#78350f" fontWeight="700">doboz</text>
      </g>
    </SvgCanvas>
  );
}

function VPlot() {
  // V(x) = x(40-2x)(24-2x), x ∈ [0, 12]
  const N = 100;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const xv = (12 * i) / N;
    const V = xv * (40 - 2 * xv) * (24 - 2 * xv);
    pts.push({ x: xv, V });
  }
  const Vmax = Math.max(...pts.map((p) => p.V));
  const yMax = 2500;
  const sx = (v) => 50 + (v / 12) * 420;
  const sy = (v) => 30 + 240 - (v / yMax) * 240;
  const polyline = pts.map((p) => `${sx(p.x)},${sy(p.V)}`).join(' ');

  // Maximum hely
  const xOpt = 4.855;
  const Vopt = xOpt * (40 - 2 * xOpt) * (24 - 2 * xOpt);

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes
        x={50} y={30} w={420} h={240}
        xMin={0} xMax={12} yMin={0} yMax={yMax}
        xStep={2} yStep={500}
        xLabel="x (cm)" yLabel="V (cm³)"
        grid
      />
      <polyline points={polyline} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx={sx(xOpt)} cy={sy(Vopt)} r="6" fill="#dc2626" />
      <line x1={sx(xOpt)} y1={sy(Vopt)} x2={sx(xOpt)} y2={sy(0)} stroke="#dc2626" strokeDasharray="3 3" />
      <text x={sx(xOpt) + 6} y={sy(Vopt) - 10} fontSize="12" fill="#dc2626" fontWeight="700">
        max ≈ (4,86; 2102)
      </text>
      <text x={260} y={20} fontSize="13" textAnchor="middle" fill="#1e3a8a" fontWeight="700">
        V(x) = x(40 − 2x)(24 − 2x)
      </text>
      <text x={Math.min(yMax, Vmax).toFixed(0)} y={0}></text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $40 \\text{ cm} \\times 24 \\text{ cm}$ méretű téglalap alakú **kartonlap** mind a négy sarkából $x$ cm oldalú négyzeteket vágunk ki, majd az így keletkezett „füleket" felhajtjuk. Így nyitott tetejű dobozt kapunk.

**a)** Írja fel a doboz térfogatát $V(x)$ függvényként, és adja meg $x$ értelmezési tartományát! ($3$ pont)

**b)** Számítsa ki a doboz térfogatát $x = 4$ cm esetén! ($2$ pont)

**c)** Mely $x$ értékre lesz a doboz térfogata maximális? Adja meg pontos és közelítő értékkel! ($8$ pont)

**d)** Mekkora ez a legnagyobb térfogat? ($3$ pont)`,
  figure: () => <BoxPattern />,
  asked: [
    { key: 'Vx', label: 'a) $V(x) = ?$' },
    { key: 'V4', label: 'b) $V(4) = ?$ cm³' },
    { key: 'xopt', label: 'c) $x_{\\text{opt}} = ?$ cm' },
    { key: 'Vmax', label: 'd) $V_{\\max} = ?$ cm³' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — A térfogatfüggvény',
      points: 3,
      body: `A kivágások után a **doboz alapja** $(40 - 2x) \\times (24 - 2x)$, a **magassága** pedig $x$ (a felhajtott fül). Tehát

$$V(x) = x \\,(40 - 2x)\\,(24 - 2x).$$

Kibontva:
$$V(x) = x \\,(960 - 80x - 48x + 4x^2) = x\\,(4x^2 - 128x + 960) = 4x^3 - 128x^2 + 960x.$$

**Értelmezési tartomány** — fizikailag értelmes méretek:
- $x > 0$ (hogy legyen magasság),
- $40 - 2x > 0 \\Rightarrow x < 20$,
- $24 - 2x > 0 \\Rightarrow x < 12$.

A legszigorúbb feltétel: $x \\in (0;\\ 12)$.`,
      figure: () => <BoxPattern />,
    },
    {
      title: 'b) lépés — $V(4)$',
      points: 2,
      body: `$$V(4) = 4 \\cdot (40 - 8) \\cdot (24 - 8) = 4 \\cdot 32 \\cdot 16 = 2048 \\ \\text{cm}^3.$$

Vagyis $x = 4$ cm mellett már több mint $2$ liter a doboz térfogata.`,
    },
    {
      title: 'c/1. lépés — A szélsőérték keresése deriválással',
      points: 2,
      body: `A $V(x) = 4x^3 - 128x^2 + 960x$ egy harmadfokú függvény. A **szélsőérték helye** ott van, ahol a **derivált** $0$:

$$V'(x) = 12 x^2 - 256 x + 960.$$

$V'(x) = 0$ rendezve (osztjuk $4$-gyel):

$$3 x^2 - 64 x + 240 = 0.$$`,
    },
    {
      title: 'c/2. lépés — A másodfokú egyenlet megoldása',
      points: 3,
      body: `Másodfokú megoldóképlet:

$$x_{1,2} = \\dfrac{64 \\pm \\sqrt{64^2 - 4 \\cdot 3 \\cdot 240}}{2 \\cdot 3} = \\dfrac{64 \\pm \\sqrt{4096 - 2880}}{6} = \\dfrac{64 \\pm \\sqrt{1216}}{6}.$$

Egyszerűsítés: $\\sqrt{1216} = \\sqrt{64 \\cdot 19} = 8\\sqrt{19}$. Tehát

$$x_{1,2} = \\dfrac{64 \\pm 8\\sqrt{19}}{6} = \\dfrac{32 \\pm 4\\sqrt{19}}{3}.$$

Számszerűen $\\sqrt{19} \\approx 4{,}359$:

- $x_1 = \\dfrac{32 - 4\\sqrt{19}}{3} \\approx \\dfrac{32 - 17{,}435}{3} \\approx \\dfrac{14{,}565}{3} \\approx 4{,}855$,
- $x_2 = \\dfrac{32 + 4\\sqrt{19}}{3} \\approx \\dfrac{49{,}435}{3} \\approx 16{,}479$.`,
    },
    {
      title: 'c/3. lépés — Értelmezési tartomány szűrése + szélsőérték-típus',
      points: 2,
      body: `Az értelmezési tartomány $x \\in (0;\\ 12)$ — tehát $x_2 \\approx 16{,}48$ **kívül esik**, csak $x_1$ jön szóba.

A szélsőérték-típus: $V'(x) = 12x^2 - 256x + 960$ egy **fölfelé nyíló parabola**, amely $x_1 < x_2$-nél metszi az $x$-tengelyt. A tengelyek között $V' < 0$, kívül $V' > 0$. Tehát $x_1$-nél $V'$ előjelet vált $+$-ról $-$-ra: **lokális maximum**.

**Tehát** $x_{\\text{opt}} = \\dfrac{32 - 4\\sqrt{19}}{3} \\approx 4{,}86$ cm.`,
      figure: () => <VPlot />,
    },
    {
      title: 'c/4. lépés — Ellenőrzés a végpontokon',
      points: 1,
      body: `A függvény $(0;\\ 12)$-n folytonos, a végpontok felé nullához tart:
- $V(0) = 0$ (nincs doboz),
- $V(12) = 12 \\cdot (40 - 24) \\cdot 0 = 0$.

Tehát a belső szélsőérték ($x \\approx 4{,}86$) egy **globális maximum** is.`,
    },
    {
      title: 'd) lépés — A maximális térfogat',
      points: 3,
      body: `Behelyettesítjük $x = x_{\\text{opt}}$ értékét. Közelítő értékkel:

$$V_{\\max} \\approx 4{,}855 \\cdot (40 - 9{,}710) \\cdot (24 - 9{,}710) = 4{,}855 \\cdot 30{,}290 \\cdot 14{,}290.$$

Részszámítás: $30{,}290 \\cdot 14{,}290 \\approx 432{,}84$, így

$$V_{\\max} \\approx 4{,}855 \\cdot 432{,}84 \\approx 2101{,}4 \\ \\text{cm}^3.$$

**Eredmény:** a maximális térfogat kb. $2101$ cm³ $\\approx 2{,}1$ liter. A $V(4) = 2048$ cm³-hez képest ez mindössze $\\sim 53$ cm³-rel nagyobb, de fontos felismerni, hogy a **szélsőérték nem egész érték** — itt a deriváltas módszer adja a pontos helyet.

**Pontos alak:** $V_{\\max} = V\\!\\left(\\dfrac{32 - 4\\sqrt{19}}{3}\\right)$ — algebrailag bonyolult, de numerikusan $\\approx 2101{,}4$ cm³.`,
      figure: () => <VPlot />,
    },
  ],
  finalAnswer: {
    Vx: '$V(x) = x(40 - 2x)(24 - 2x),\\ x \\in (0;\\ 12)$',
    V4: '$V(4) = 2048$ cm³',
    xopt: '$x_{\\text{opt}} = \\dfrac{32 - 4\\sqrt{19}}{3} \\approx 4{,}86$ cm',
    Vmax: '$V_{\\max} \\approx 2101{,}4$ cm³',
  },
  usedFormulas: [
    'térfogat: alap · magasság',
    'polinomok deriváltja: $(x^n)\' = n x^{n-1}$',
    'másodfokú megoldóképlet',
    'szélsőérték: $V\'(x) = 0$ + előjelvizsgálat',
  ],
};

export default { meta, problem, solution };
