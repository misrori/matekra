import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-01',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'I',
  number: 1,
  title: 'Paraméteres negyedfokú egyenlet',
  points: 13,
  topics: ['egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 27, note: 'másodfokú megoldóképlet' },
    { page: 28, note: 'Viète-formulák' },
  ],
  estimatedMinutes: 18,
};

/**
 *  Az egyenlet:
 *    x^4 - (p+3) x^2 + 2p = 0
 *  Helyettesítés: y = x^2  (y >= 0)
 *    y^2 - (p+3) y + 2p = 0
 *  Diszkrimináns:
 *    D = (p+3)^2 - 8p = p^2 - 2p + 9 = (p-1)^2 + 8   ===> mindig > 0
 *  Gyökök y-ra:
 *    y_{1,2} = ((p+3) +/- sqrt((p-1)^2 + 8)) / 2
 *  Könnyen látszik: a polinom y-ban faktorizálható
 *    y^2 - (p+3)y + 2p = (y - p)(y - 2)  -> ellenőrzés: p+2 = p+2 de kibontva: y^2 - (p+2) y + 2p
 *  Tehát a jelenlegi együtthatóval NEM szorzat. Konstrukcióért inkább az egyenlet legyen:
 *    x^4 - (p+2) x^2 + 2p = 0
 *  Ekkor y^2 - (p+2)y + 2p = (y-2)(y-p), tehát y=2 vagy y=p.
 *  Gyökök:
 *    x^2 = 2  ->  x = ± sqrt(2)
 *    x^2 = p  ->  csak ha p >= 0: x = ± sqrt(p)  (p=0 esetén csak x=0)
 *
 *  Kérdések:
 *   a) p = 5 esetén keresse meg az összes valós gyököt.
 *   b) Mely p valós paraméterértékekre lesz pontosan 4 különböző valós gyök?
 *   c) Mely p érték mellett lesz pontosan 3 különböző valós gyök?
 *   d) Igazolja, hogy a gyökök szorzata (p>=0 esetén) $-2\sqrt{2p}\cdot \sqrt{2p} = ...$ — ehelyett
 *      helyesebb: a négy gyök összege 0, szorzata $2p \cdot 2 = ...$ — fogalmazzuk át:
 *      adja meg a gyökök négyzetösszegét p-vel kifejezve.
 */

function Graph({ p = 5, highlight = 'none' }) {
  // x^4 - (p+2) x^2 + 2p  az [-3,3] intervallumon
  const f = (x) => x * x * x * x - (p + 2) * x * x + 2 * p;
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const x = -3 + (6 * i) / 120;
    pts.push([x, f(x)]);
  }
  // y-skála: auto — a két gyök környékét lássuk
  const yMin = -8;
  const yMax = Math.max(14, 2 * p + 2);
  const x0 = 60, y0 = 20, w = 400, h = 280;
  const sx = (x) => x0 + ((x + 3) / 6) * w;
  const sy = (y) => y0 + h - ((y - yMin) / (yMax - yMin)) * h;

  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`).join(' ');

  // zérushelyek:  ± sqrt(2),  ± sqrt(p) (p>=0)
  const roots = [
    { x: Math.sqrt(2), label: '√2', color: '#16a34a' },
    { x: -Math.sqrt(2), label: '−√2', color: '#16a34a' },
  ];
  if (p > 0) {
    roots.push({ x: Math.sqrt(p), label: `√${p}`, color: '#dc2626' });
    roots.push({ x: -Math.sqrt(p), label: `−√${p}`, color: '#dc2626' });
  } else if (p === 0) {
    roots.push({ x: 0, label: '0', color: '#dc2626' });
  }

  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <Axes x={x0} y={y0} w={w} h={h} xMin={-3} xMax={3} yMin={yMin} yMax={yMax} xStep={1} yStep={Math.max(2, Math.round(yMax / 6))} />
      <path d={path} fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      {roots.map((r, i) => (
        <g key={i}>
          <circle cx={sx(r.x)} cy={sy(0)} r="4.5" fill={r.color} />
          <text x={sx(r.x)} y={sy(0) + 22} fontSize="12" textAnchor="middle" fill={r.color}>{r.label}</text>
        </g>
      ))}
      <text x="260" y="16" fontSize="14" fontWeight="bold" fill="#111" textAnchor="middle">
        f(x) = x⁴ − (p+2)x² + 2p, p = {p}
      </text>
      {highlight === 'substitute' && (
        <text x={sx(0)} y={sy(2 * p) - 6} fontSize="12" fill="#7c3aed" textAnchor="middle">f(0) = 2p = {2 * p}</text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Tekintsük az alábbi egyenletet, ahol $p \\in \\mathbb{R}$ paraméter:

$$x^4 - (p+2)\\,x^2 + 2p = 0.$$

**a)** Oldja meg az egyenletet $p = 5$ esetén! ($3$ pont)

**b)** Mely valós $p$ paraméterértékekre lesz az egyenletnek **pontosan négy** különböző valós gyöke? ($4$ pont)

**c)** Határozza meg azt a $p$ értéket, amelyre az egyenletnek **pontosan három** különböző valós gyöke van! Adja meg ezeket a gyököket! ($3$ pont)

**d)** Igazolja, hogy ha $p > 0$ és $p \\neq 2$, akkor a négy valós gyök **négyzetösszege** $2p + 4$. ($3$ pont)`,
  figure: () => <Graph p={5} />,
  asked: [
    { key: 'a', label: 'a) $x_{1,2,3,4} = ?$ ($p=5$)' },
    { key: 'b', label: 'b) 4 valós gyök $\\Leftrightarrow$ $p \\in$ ?' },
    { key: 'c', label: 'c) 3 valós gyök: $p=?$, gyökök?' },
    { key: 'd', label: 'd) $\\sum x_i^2$ igazolása' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A bikvadratikus egyenlet átalakítása',
      points: 1,
      body: `Az egyenlet $x$-nek csak páros hatványait tartalmazza. Vezessük be az $y = x^2$ helyettesítést, ahol **$y \\geq 0$** (hiszen négyzet).

$$y^2 - (p+2)\\,y + 2p = 0.$$

Ez $y$-ban **másodfokú** egyenlet.`,
      figure: () => <Graph p={5} highlight="substitute" />,
    },
    {
      title: '2. lépés — A másodfokú egyenlet szorzattá alakítása',
      points: 2,
      body: `A bal oldal szorzattá bontható:

$$y^2 - (p+2)\\,y + 2p = (y - 2)(y - p).$$

**Ellenőrzés kifejtéssel:** $(y-2)(y-p) = y^2 - p\\,y - 2y + 2p = y^2 - (p+2)\\,y + 2p.$ ✓

Tehát az $y$-egyenlet gyökei:

$$y_1 = 2 \\quad \\text{vagy} \\quad y_2 = p.$$`,
    },
    {
      title: 'a) — Megoldás $p = 5$ esetén',
      points: 2,
      body: `$p = 5$-öt visszahelyettesítve $y_1 = 2$ és $y_2 = 5$.

Visszalépünk $x$-re az $x^2 = y$ egyenlet segítségével:

- $x^2 = 2 \\Rightarrow x = \\pm \\sqrt{2}$
- $x^2 = 5 \\Rightarrow x = \\pm \\sqrt{5}$

Mind a négy érték valós és különböző, mert $2 \\neq 5$, és mindkettő pozitív.

**Ellenőrzés $x = \\sqrt{5}$-re:** $x^4 = 25$, $(p+2)x^2 = 7 \\cdot 5 = 35$, $2p = 10$, így $25 - 35 + 10 = 0$. ✓

$$\\boxed{x \\in \\{-\\sqrt{5},\\ -\\sqrt{2},\\ \\sqrt{2},\\ \\sqrt{5}\\}}.$$`,
      figure: () => <Graph p={5} />,
    },
    {
      title: 'b) 1. lépés — Mikor van 4 különböző valós gyök?',
      points: 2,
      body: `Ahhoz, hogy az eredeti egyenletnek **4** különböző valós gyöke legyen, az $y$-egyenlet mindkét gyökének **szigorúan pozitívnak** kell lennie, és $y_1 \\neq y_2$.

- $y_1 = 2$ — ez mindig teljesül (pozitív, független $p$-től).
- $y_2 = p$ — szükséges, hogy $p > 0$.
- Különbözőség: $p \\neq 2$.

Ha $p > 0$ és $p \\neq 2$, akkor:
- $x^2 = 2$ ad 2 gyököt: $\\pm \\sqrt{2}$,
- $x^2 = p$ ad 2 gyököt: $\\pm \\sqrt{p}$,

összesen 4 különböző valós gyök.`,
    },
    {
      title: 'b) 2. lépés — Az eredmény',
      points: 2,
      body: `$$\\boxed{p \\in (0; +\\infty) \\setminus \\{2\\}, \\quad \\text{azaz} \\quad p > 0 \\text{ és } p \\neq 2}.$$

**Esetellenőrzés:**
- $p = 2$: $y_1 = y_2 = 2$, csak $\\pm \\sqrt{2}$ — **2 gyök**.
- $p = 0$: $y_2 = 0$, így $x = 0$ (egyszeres $x$-gyök a $y=0$-hoz) + $\\pm\\sqrt{2}$ — **3 gyök**.
- $p < 0$: $y_2 < 0$ nem ad valós $x$-et — csak **2 gyök**.`,
    },
    {
      title: 'c) — Pontosan 3 gyök esete',
      points: 3,
      body: `A fenti eseteket áttekintve: pontosan 3 gyök csak $p = 0$-nál van. Ekkor:

$$x^4 - 2x^2 = 0 \\iff x^2 (x^2 - 2) = 0,$$

ami $x = 0$ (kétszeres a polinomban, de egyetlen **érték**) és $x = \\pm \\sqrt{2}$.

$$\\boxed{p = 0, \\quad x \\in \\{-\\sqrt{2},\\ 0,\\ \\sqrt{2}\\}}.$$

*Megjegyzés:* a $p = 2$ eset is „kétszeres" gyök, de az csak **2 különböző** valós értéket ad ($\\pm\\sqrt{2}$), nem 3-at.`,
      figure: () => <Graph p={0} />,
    },
    {
      title: 'd) 1. lépés — A gyökök négyzetösszegének felírása',
      points: 1,
      body: `Ha $p > 0$ és $p \\neq 2$, a 4 gyök: $\\pm \\sqrt{2}$ és $\\pm \\sqrt{p}$.

$$\\sum_{i=1}^{4} x_i^2 = (\\sqrt{2})^2 + (-\\sqrt{2})^2 + (\\sqrt{p})^2 + (-\\sqrt{p})^2.$$`,
    },
    {
      title: 'd) 2. lépés — Egyszerűsítés',
      points: 2,
      body: `A négyzet pozitívvá teszi az előjeleket:

$$\\sum x_i^2 = 2 + 2 + p + p = 4 + 2p = 2p + 4.$$

**Elegáns ellenőrzés Viète-formulával:** az $y$-egyenletben a gyökök összege $y_1 + y_2 = (p+2)$. Mivel $\\sum x_i^2 = 2(y_1) + 2(y_2) = 2(p+2) = 2p + 4$ (mert minden $y_i$-hez két $\\pm$ előjelű $x$-gyök tartozik). ✓

$$\\boxed{\\sum_{i=1}^{4} x_i^2 = 2p + 4.}$$`,
    },
  ],
  finalAnswer: {
    a: '$\\{-\\sqrt{5},\\ -\\sqrt{2},\\ \\sqrt{2},\\ \\sqrt{5}\\}$',
    b: '$p > 0$ és $p \\neq 2$',
    c: '$p = 0$, gyökök: $-\\sqrt{2},\\ 0,\\ \\sqrt{2}$',
    d: '$\\sum x_i^2 = 2p+4$ (l. levezetés)',
  },
  usedFormulas: [
    'bikvadratikus helyettesítés $y = x^2$',
    'másodfokú faktorizáció',
    'Viète-formulák',
  ],
};

export default { meta, problem, solution };
