import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-15',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.A',
  number: 15,
  title: 'Függvények tulajdonságai és $j(x)=(x-1)^2-2$ ábrázolása',
  points: 12,
  topics: ['függvények', 'egyenletek'],
  difficulty: 3,
  fgvt: [
    { page: 40, note: 'lineáris függvény' },
    { page: 41, note: 'másodfokú függvény' },
    { page: 43, note: 'exponenciális függvény' },
    { page: 24, note: 'logaritmus' },
  ],
  estimatedMinutes: 22,
};

// Axes paraméterek a j(x) ábrázoláshoz
const axCfg = {
  x: 50,
  y: 30,
  w: 420,
  h: 300,
  xMin: -2,
  xMax: 5,
  yMin: -3,
  yMax: 7,
  xStep: 1,
  yStep: 1,
};
const sx = (v) => axCfg.x + ((v - axCfg.xMin) / (axCfg.xMax - axCfg.xMin)) * axCfg.w;
const sy = (v) =>
  axCfg.y + axCfg.h - ((v - axCfg.yMin) / (axCfg.yMax - axCfg.yMin)) * axCfg.h;

// j(x) = (x-1)^2 - 2
const j = (x) => (x - 1) * (x - 1) - 2;

function JPlot({ highlight = 'none' }) {
  // highlight: 'none' | 'vertex' | 'zeros' | 'domain'
  const xs = [];
  const N = 80;
  for (let i = 0; i <= N; i++) {
    const t = -1 + (5 * i) / N; // [-1, 4] intervallumon
    xs.push(t);
  }
  const pts = xs.map((t) => `${sx(t)},${sy(j(t))}`).join(' ');

  // Zéróhelyek: (x-1)^2 = 2  ⇒  x = 1 ± √2 ≈ -0.414 és 2.414
  const z1 = 1 - Math.SQRT2;
  const z2 = 1 + Math.SQRT2;

  return (
    <SvgCanvas width={520} height={360} viewBox="0 0 520 360">
      <Axes {...axCfg} xLabel="x" yLabel="y" />

      {/* Értelmezési tartomány kiemelve (x ∈ [-1, 4]) */}
      {highlight === 'domain' && (
        <rect
          x={sx(-1)}
          y={axCfg.y}
          width={sx(4) - sx(-1)}
          height={axCfg.h}
          fill="#fde68a"
          fillOpacity="0.3"
        />
      )}

      {/* Parabola görbéje [-1,4]-en */}
      <polyline points={pts} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* Intervallum végpontok */}
      <circle cx={sx(-1)} cy={sy(j(-1))} r="4" fill="#2563eb" />
      <circle cx={sx(4)} cy={sy(j(4))} r="4" fill="#2563eb" />

      {/* Csúcspont (1, -2) */}
      {highlight === 'vertex' && (
        <>
          <circle cx={sx(1)} cy={sy(-2)} r="6" fill="#dc2626" />
          <line
            x1={sx(1)}
            y1={sy(-2)}
            x2={sx(1)}
            y2={sy(0)}
            stroke="#dc2626"
            strokeDasharray="3 3"
          />
          <text x={sx(1) + 8} y={sy(-2) + 18} fontSize="13" fill="#dc2626" fontWeight="bold">
            csúcs: (1; −2)
          </text>
        </>
      )}

      {/* Zéróhelyek */}
      {highlight === 'zeros' && (
        <>
          <circle cx={sx(z1)} cy={sy(0)} r="5" fill="#059669" />
          <circle cx={sx(z2)} cy={sy(0)} r="5" fill="#059669" />
          <text x={sx(z1) - 40} y={sy(0) - 10} fontSize="12" fill="#059669">
            x ≈ −0{','}41
          </text>
          <text x={sx(z2) + 6} y={sy(0) - 10} fontSize="12" fill="#059669">
            x ≈ 2{','}41
          </text>
        </>
      )}

      {/* Címke */}
      <text x={sx(3.2)} y={sy(j(3.2)) - 10} fontSize="14" fill="#1e3a8a" fontWeight="bold">
        j(x) = (x−1)² − 2
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott három, a valós számok halmazán értelmezett függvény:
- $f: x \\mapsto 2x - 3$
- $g: x \\mapsto -x^2$
- $h: x \\mapsto 2^x + 1$

**a)** Határozza meg mindhárom függvény esetén a megadott állítások logikai értékét! Írja a táblázat celláiba az IGAZ, illetve HAMIS szavak közül a megfelelőt!

| Állítás | $f$ | $g$ | $h$ |
|---|---|---|---|
| A függvénynek van zérushelye. | | | |
| A függvénynek van maximuma. | | | |
| Szigorúan monoton növekvő függvény. | | | |

**b)** Adja meg a $h$ függvény értelmezési tartományának azt az elemét, amelyhez a függvény $1{,}25$-öt rendel!

Adott a valós számok halmazán értelmezett $j: x \\mapsto (x-1)^2 - 2$ függvény.

**c)** Ábrázolja a $j$ függvényt a $[-1;\\ 4]$ intervallumon!`,
  figure: () => <JPlot />,
  asked: [
    { key: 'table', label: 'a) táblázat — IGAZ/HAMIS értékek' },
    { key: 'b', label: 'b) $x = ?$' },
    { key: 'c', label: 'c) $j$ grafikonja $[-1;\\ 4]$-en' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — az $f(x)=2x-3$ tulajdonságai',
      points: 1,
      body: `$f$ egy **lineáris** függvény, meredeksége $m = 2 > 0$.

- **Zérushely**: $2x - 3 = 0 \\Rightarrow x = \\dfrac{3}{2}$ — van zérushely, **IGAZ**.
- **Maximum**: a lineáris függvény értékkészlete $\\mathbb{R}$, nincs legnagyobb érték — **HAMIS**.
- **Monotonitás**: $m > 0$, tehát szigorúan monoton növekvő — **IGAZ**.`,
    },
    {
      title: 'a/2. lépés — a $g(x)=-x^2$ tulajdonságai',
      points: 1,
      body: `$g$ egy **lefelé nyíló parabola** (mert a főegyüttható $-1 < 0$), tengelypontja a $(0; 0)$ pontban.

- **Zérushely**: $-x^2 = 0 \\Rightarrow x = 0$ — van zérushely, **IGAZ**.
- **Maximum**: a csúcspontban $g(0) = 0$ a legnagyobb érték — **IGAZ**.
- **Monotonitás**: $]-\\infty; 0]$-on nő, $[0; +\\infty[$-en csökken, tehát **nem** szigorúan monoton növekvő — **HAMIS**.`,
    },
    {
      title: 'a/3. lépés — a $h(x)=2^x+1$ tulajdonságai',
      points: 3,
      body: `$h$ egy **exponenciális** függvény, $+1$-gyel eltolva fölfelé. Mivel $2^x > 0$ minden $x$-re, ezért $h(x) = 2^x + 1 > 1$ minden $x \\in \\mathbb{R}$-re.

- **Zérushely**: $h(x) = 0 \\Leftrightarrow 2^x = -1$, aminek nincs megoldása — **HAMIS**.
- **Maximum**: $h(x) \\to +\\infty$, ha $x \\to +\\infty$, nincs maximum — **HAMIS**.
- **Monotonitás**: $2^x$ szigorúan nő (alap $>1$), az eltolás nem változtatja, tehát **IGAZ**.

**Összefoglaló táblázat:**

| Állítás | $f$ | $g$ | $h$ |
|---|---|---|---|
| Van zérushely | IGAZ | IGAZ | HAMIS |
| Van maximum | HAMIS | IGAZ | HAMIS |
| Szig. mon. növekvő | IGAZ | HAMIS | IGAZ |`,
    },
    {
      title: 'b) lépés — a $h$ értelmezési tartományának eleme, melyhez $1{,}25$ tartozik',
      points: 3,
      body: `Az egyenlet:
$$h(x) = 1{,}25 \\;\\Longleftrightarrow\\; 2^x + 1 = 1{,}25$$

Rendezés:
$$2^x = 0{,}25$$

Észrevesszük, hogy $0{,}25 = \\dfrac{1}{4} = 2^{-2}$, így:
$$2^x = 2^{-2} \\;\\Longrightarrow\\; x = -2$$

**Ellenőrzés:** $h(-2) = 2^{-2} + 1 = \\dfrac{1}{4} + 1 = 1{,}25$ ✓

Tehát $\\boxed{x = -2}$.`,
    },
    {
      title: 'c/1. lépés — a $j$ függvény csúcspontja',
      points: 1,
      body: `$j(x) = (x-1)^2 - 2$ alakja **tengelyponti forma**: $a(x - u)^2 + v$, ahol $a = 1$, $u = 1$, $v = -2$.

- A parabola **fölfelé** nyílik (mert $a = 1 > 0$).
- **Csúcspont**: $(u; v) = (1; -2)$.
- A csúcsban van a minimum, $j_{\\min} = -2$.`,
      figure: () => <JPlot highlight="vertex" />,
    },
    {
      title: 'c/2. lépés — értéktáblázat az intervallumon',
      points: 2,
      body: `Néhány pont kiszámítása a $[-1; 4]$ intervallumon:

| $x$ | $-1$ | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|---|---|
| $j(x)$ | $2$ | $-1$ | $-2$ | $-1$ | $2$ | $7$ |

Például: $j(-1) = (-2)^2 - 2 = 4 - 2 = 2$, $j(4) = 3^2 - 2 = 7$.

**Zéróhelyek** (a koordináta-rendszerben a tengelymetszetekhez): $(x-1)^2 = 2 \\Rightarrow x = 1 \\pm \\sqrt{2}$, ami közelítőleg $x \\approx -0{,}41$ és $x \\approx 2{,}41$ — mindkettő az intervallumon belül van.`,
      figure: () => <JPlot highlight="zeros" />,
    },
    {
      title: 'c/3. lépés — a grafikon',
      points: 1,
      body: `Az értéktáblázat pontjait koordináta-rendszerben összekötve egy parabola-ívet kapunk a $[-1;\\ 4]$ intervallumon.

- Bal végpont: $(-1;\\ 2)$
- Csúcs (minimum): $(1;\\ -2)$
- Jobb végpont: $(4;\\ 7)$

A parabola szimmetrikus az $x = 1$ tengelyre. A függvény $[-1;\\ 1]$-en **csökken**, $[1;\\ 4]$-en **nő**.`,
      figure: () => <JPlot highlight="domain" />,
    },
  ],
  finalAnswer: {
    table: `**a)**\n\n| | $f$ | $g$ | $h$ |\n|---|---|---|---|\n| Van zérushely | IGAZ | IGAZ | HAMIS |\n| Van maximum | HAMIS | IGAZ | HAMIS |\n| Szig. mon. növekvő | IGAZ | HAMIS | IGAZ |`,
    b: '$x = -2$',
    c: 'Fölfelé nyíló parabola, csúcspont $(1;\\ -2)$, végpontok $(-1;\\ 2)$ és $(4;\\ 7)$.',
  },
  usedFormulas: [
    'lineáris függvény tulajdonságai',
    'másodfokú (parabola) csúcsponti alak',
    'exponenciális függvény $2^x$ tulajdonságai',
    '$2^x = 2^y \\Leftrightarrow x = y$',
  ],
};

export default { meta, problem, solution };
