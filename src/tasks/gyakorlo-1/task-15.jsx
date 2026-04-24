import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-15',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.A',
  number: 15,
  title: 'Függvények — f, g, h vizsgálata és $j(x) = -(x+1)^2 + 4$ ábrázolása',
  points: 12,
  topics: ['függvények', 'egyenletek'],
  difficulty: 3,
  fgvt: [
    { page: 40, note: 'lineáris függvény' },
    { page: 41, note: 'másodfokú függvény' },
    { page: 43, note: 'exponenciális függvény' },
  ],
  estimatedMinutes: 22,
};

const axCfg = {
  x: 50,
  y: 30,
  w: 420,
  h: 280,
  xMin: -5,
  xMax: 3,
  yMin: -5,
  yMax: 5,
  xStep: 1,
  yStep: 1,
};
const sx = (v) => axCfg.x + ((v - axCfg.xMin) / (axCfg.xMax - axCfg.xMin)) * axCfg.w;
const sy = (v) => axCfg.y + axCfg.h - ((v - axCfg.yMin) / (axCfg.yMax - axCfg.yMin)) * axCfg.h;

// j(x) = -(x+1)^2 + 4;  csúcs (-1, 4), zéróhelyek: x = -3 és x = 1
const j = (x) => -(x + 1) * (x + 1) + 4;

function JPlot({ highlight = 'none' }) {
  const xs = [];
  const N = 80;
  // intervallum: [-4, 2]
  for (let i = 0; i <= N; i++) {
    const t = -4 + (6 * i) / N;
    xs.push(t);
  }
  const pts = xs.map((t) => `${sx(t)},${sy(j(t))}`).join(' ');

  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <Axes {...axCfg} xLabel="x" yLabel="y" />

      {highlight === 'domain' && (
        <rect
          x={sx(-4)}
          y={axCfg.y}
          width={sx(2) - sx(-4)}
          height={axCfg.h}
          fill="#fde68a"
          fillOpacity="0.3"
        />
      )}

      <polyline points={pts} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* végpontok */}
      <circle cx={sx(-4)} cy={sy(j(-4))} r="4" fill="#2563eb" />
      <circle cx={sx(2)} cy={sy(j(2))} r="4" fill="#2563eb" />

      {highlight === 'vertex' && (
        <>
          <circle cx={sx(-1)} cy={sy(4)} r="6" fill="#dc2626" />
          <line x1={sx(-1)} y1={sy(4)} x2={sx(-1)} y2={sy(0)} stroke="#dc2626" strokeDasharray="3 3" />
          <text x={sx(-1) + 8} y={sy(4) - 8} fontSize="13" fill="#dc2626" fontWeight="bold">
            csúcs: (−1; 4)
          </text>
        </>
      )}
      {highlight === 'zeros' && (
        <>
          <circle cx={sx(-3)} cy={sy(0)} r="5" fill="#059669" />
          <circle cx={sx(1)} cy={sy(0)} r="5" fill="#059669" />
          <text x={sx(-3) - 30} y={sy(0) + 20} fontSize="12" fill="#059669">x = −3</text>
          <text x={sx(1) + 5} y={sy(0) + 20} fontSize="12" fill="#059669">x = 1</text>
        </>
      )}

      <text x={sx(1.5)} y={sy(j(1.5)) + 22} fontSize="14" fill="#1e3a8a" fontWeight="bold">
        j(x) = −(x+1)² + 4
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott három, a valós számok halmazán értelmezett függvény:
- $f:\\ x \\mapsto -3x + 6$
- $g:\\ x \\mapsto x^2 - 4$
- $h:\\ x \\mapsto \\left(\\dfrac{1}{2}\\right)^x$

**a)** Határozza meg mindhárom függvény esetén a megadott állítások logikai értékét! Írja a táblázat celláiba az IGAZ, illetve HAMIS szavak közül a megfelelőt! ($6$ pont)

| Állítás | $f$ | $g$ | $h$ |
|---|---|---|---|
| A függvénynek van zérushelye. | | | |
| A függvénynek van minimuma. | | | |
| Szigorúan monoton csökkenő függvény. | | | |

**b)** Az $f$ függvény értelmezési tartományának mely elemét rendeli a függvény a $-3$-hoz? ($2$ pont)

Adott a valós számok halmazán értelmezett $j:\\ x \\mapsto -(x+1)^2 + 4$ függvény.

**c)** Ábrázolja a $j$ függvényt a $[-4;\\ 2]$ intervallumon! ($4$ pont)`,
  figure: () => <JPlot />,
  asked: [
    { key: 'table', label: 'a) táblázat — IGAZ/HAMIS' },
    { key: 'b', label: 'b) $x = ?$' },
    { key: 'c', label: 'c) $j$ grafikonja $[-4;\\ 2]$-en' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Az $f(x) = -3x + 6$ vizsgálata',
      points: 2,
      body: `$f$ egy **lineáris** függvény, meredeksége $m = -3 < 0$.

- **Zérushely**: $-3x + 6 = 0 \\Rightarrow x = 2$ — van zérushely, **IGAZ**.
- **Minimum**: a lineáris függvény értékkészlete $\\mathbb{R}$ (ha $m \\neq 0$), nincs legkisebb érték — **HAMIS**.
- **Szig. mon. csökkenő**: $m = -3 < 0$, tehát csökkenő — **IGAZ**.`,
    },
    {
      title: 'a/2. lépés — A $g(x) = x^2 - 4$ vizsgálata',
      points: 2,
      body: `$g$ egy **fölfelé nyíló parabola** (főegyüttható $1 > 0$), tengelypontja $(0; -4)$.

- **Zérushely**: $x^2 - 4 = 0 \\Rightarrow x = \\pm 2$ — van (sőt kettő), **IGAZ**.
- **Minimum**: a csúcsban van, $g(0) = -4$ a legkisebb érték — **IGAZ**.
- **Monotonitás**: $]-\\infty; 0]$-on csökken, $[0; +\\infty[$-n nő, így **nem** szig. mon. csökkenő — **HAMIS**.`,
    },
    {
      title: 'a/3. lépés — A $h(x) = (1/2)^x$ vizsgálata',
      points: 2,
      body: `$h$ egy **exponenciális** függvény $b = 1/2 < 1$ alappal. Mivel $(1/2)^x > 0$ minden $x$-re:

- **Zérushely**: $h(x) = 0 \\Leftrightarrow (1/2)^x = 0$ — nincs megoldás, **HAMIS**.
- **Minimum**: $h(x) \\to 0$, ha $x \\to +\\infty$, de ezt nem éri el; nincs minimum — **HAMIS**.
- **Monotonitás**: $0 < b < 1$ esetén szigorúan csökken — **IGAZ**.

**Összesítés:**

| Állítás | $f$ | $g$ | $h$ |
|---|---|---|---|
| Van zérushely | IGAZ | IGAZ | HAMIS |
| Van minimum | HAMIS | IGAZ | HAMIS |
| Szig. mon. csökkenő | IGAZ | HAMIS | IGAZ |`,
    },

    {
      title: 'b) lépés — Az $f$ inverzének konkrét értéke',
      points: 2,
      body: `Keressük azt az $x$-et, amelyre $f(x) = -3$.

$$-3x + 6 = -3.$$

Rendezés:

$$-3x = -9 \\ \\Longrightarrow \\ x = 3.$$

**Ellenőrzés:** $f(3) = -3 \\cdot 3 + 6 = -3$. ✓

Tehát $\\boxed{x = 3}$.`,
    },

    {
      title: 'c/1. lépés — A $j$ függvény csúcspontja',
      points: 1,
      body: `A $j(x) = -(x+1)^2 + 4$ **tengelyponti alakban** van: $a(x - u)^2 + v$, ahol $a = -1$, $u = -1$, $v = 4$.

- A parabola **lefelé** nyílik, mert $a = -1 < 0$.
- **Csúcspont**: $(u; v) = (-1;\\ 4)$.
- Ebben a csúcsban van a **maximum**: $j_{\\max} = 4$.`,
      figure: () => <JPlot highlight="vertex" />,
    },
    {
      title: 'c/2. lépés — Értéktáblázat',
      points: 2,
      body: `Számítsunk ki néhány pontot a $[-4;\\ 2]$ intervallumon:

| $x$ | $-4$ | $-3$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|---|---|---|
| $j(x)$ | $-5$ | $0$ | $3$ | $4$ | $3$ | $0$ | $-5$ |

Például $j(-4) = -(-4+1)^2 + 4 = -9 + 4 = -5$, $j(0) = -1 + 4 = 3$.

**Zéróhelyek**: ahol $j(x) = 0$, azaz $(x+1)^2 = 4 \\Rightarrow x+1 = \\pm 2 \\Rightarrow x \\in \\{-3;\\ 1\\}$ — mindkettő benne van a $[-4;\\ 2]$ intervallumban.`,
      figure: () => <JPlot highlight="zeros" />,
    },
    {
      title: 'c/3. lépés — A grafikon',
      points: 1,
      body: `Az értékeket koordináta-rendszerben ábrázolva egy lefelé nyíló parabolaív adódik.

- Bal végpont: $(-4;\\ -5)$
- Csúcs (maximum): $(-1;\\ 4)$
- Jobb végpont: $(2;\\ -5)$

A függvény $[-4;\\ -1]$-en **nő**, $[-1;\\ 2]$-n **csökken**. Szimmetriatengely: $x = -1$.`,
      figure: () => <JPlot highlight="domain" />,
    },
  ],
  finalAnswer: {
    table: `**a)** IGAZ/HAMIS táblázat:\n\n| | $f$ | $g$ | $h$ |\n|---|---|---|---|\n| Van zérushely | IGAZ | IGAZ | HAMIS |\n| Van minimum | HAMIS | IGAZ | HAMIS |\n| Szig. mon. csökkenő | IGAZ | HAMIS | IGAZ |`,
    b: '$x = 3$',
    c: 'Lefelé nyíló parabola, csúcs $(-1;\\ 4)$, végpontok $(-4;\\ -5)$ és $(2;\\ -5)$, zéróhelyek $x = -3$ és $x = 1$.',
  },
  usedFormulas: [
    'lineáris függvény zérushelye és monotonitása',
    'másodfokú csúcsponti alak: $a(x-u)^2 + v$',
    'exponenciális függvény tulajdonságai $b < 1$ esetén',
  ],
};

export default { meta, problem, solution };
