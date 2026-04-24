import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-4-01',
  year: 2024,
  session: 'emelt gyakorló · 4. teszt',
  level: 'emelt',
  part: 'I',
  number: 1,
  title: 'Paraméteres másodfokú egyenletrendszer (Viète)',
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
 *  Rendszer:
 *    x + y = 2p + 1
 *    x · y = p^2 + p - 2 = (p+2)(p-1)
 *
 *  x és y gyökei a t^2 - (2p+1) t + (p+2)(p-1) = 0 polinomnak.
 *  Diszkr: D = (2p+1)^2 - 4(p+2)(p-1) = 4p^2 + 4p + 1 - 4(p^2+p-2) = 4p^2+4p+1 -4p^2-4p+8 = 9.
 *  Tehát D = 9 konstans, √D = 3.
 *  t_{1,2} = ((2p+1) ± 3)/2 -> t_1 = p+2, t_2 = p-1.
 *
 *  Azaz {x, y} = {p+2, p-1} — mindkettő valós MINDIG. (a)
 *
 *  (b) x^2 + y^2 = (p+2)^2 + (p-1)^2 = p^2+4p+4 + p^2-2p+1 = 2p^2 + 2p + 5
 *      = 25 -> 2p^2 + 2p - 20 = 0 -> p^2 + p - 10 = 0 -> p = (-1 ± √41)/2.
 *
 *  (c) x^3 + y^3: Egyszerűbb: közvetlenül (p+2)^3 + (p-1)^3
 *      p=2 esetén x^3+y^3 = 4^3 + 1^3 = 64+1 = 65. Kérdezzük: melyik p-re lesz x^3+y^3 = 91?
 *      (p+2)^3 + (p-1)^3 = (p^3+6p^2+12p+8) + (p^3-3p^2+3p-1) = 2p^3 + 3p^2 + 15p + 7
 *      = 91 -> 2p^3 + 3p^2 + 15p - 84 = 0. Próba p=3: 54+27+45-84 = 42. Nem szép.
 *      Inkább használjuk a formulát: x^3+y^3 = (x+y)^3 - 3xy(x+y)
 *        = (2p+1)^3 - 3(p^2+p-2)(2p+1).
 *      Kérjük p-re, ahol ez = 7 -> p=0: (1)^3 - 3(-2)(1) = 1 + 6 = 7. ✓
 *      Ellenőrzés: p=0 -> x+y=1, xy=-2, gyökök 2 és -1: 2^3 + (-1)^3 = 8-1 = 7. ✓
 *
 *  (d) 1/x + 1/y = (x+y)/(xy) = (2p+1)/(p^2+p-2) = (2p+1)/((p+2)(p-1))
 *      Kérdezzük: mely p érték nem értelmes? p=-2 vagy p=1 (akkor xy=0, azaz valamelyik gyök 0).
 *      Ha p=-2: gyökök 0 és -3. Ha p=1: gyökök 3 és 0.
 */

function Graph({ showAux = 'none' }) {
  // Mutassuk a t_{1,2}(p) = p+2 és p-1 egyenest + a diszkriminánst (konstans 9)
  const x0 = 50, y0 = 30, w = 420, h = 260;
  const pMin = -4, pMax = 5;
  const yMin = -5, yMax = 8;
  const sx = (v) => x0 + ((v - pMin) / (pMax - pMin)) * w;
  const sy = (v) => y0 + h - ((v - yMin) / (yMax - yMin)) * h;

  const line = (f, color) => {
    const p1 = [pMin, f(pMin)];
    const p2 = [pMax, f(pMax)];
    return (
      <line
        x1={sx(p1[0])} y1={sy(Math.max(yMin, Math.min(yMax, p1[1])))}
        x2={sx(p2[0])} y2={sy(Math.max(yMin, Math.min(yMax, p2[1])))}
        stroke={color} strokeWidth="2.5"
      />
    );
  };

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes x={x0} y={y0} w={w} h={h} xMin={pMin} xMax={pMax} yMin={yMin} yMax={yMax} xStep={1} yStep={1} xLabel="p" yLabel="t" />
      {line((p) => p + 2, '#16a34a')}
      {line((p) => p - 1, '#dc2626')}
      <text x={sx(3)} y={sy(5) - 8} fontSize="13" fill="#16a34a" fontWeight="700">t₁ = p + 2</text>
      <text x={sx(3)} y={sy(2) - 8} fontSize="13" fill="#dc2626" fontWeight="700">t₂ = p − 1</text>
      {showAux === 'sum' && (
        <g>
          <circle cx={sx(0)} cy={sy(2)} r="5" fill="#16a34a" />
          <circle cx={sx(0)} cy={sy(-1)} r="5" fill="#dc2626" />
          <text x={sx(0) + 10} y={sy(2) - 6} fontSize="12" fill="#065f46">p=0 ⇒ 2</text>
          <text x={sx(0) + 10} y={sy(-1) + 14} fontSize="12" fill="#7f1d1d">p=0 ⇒ −1</text>
        </g>
      )}
      <text x={260} y={18} fontSize="14" fontWeight="700" fill="#1e3a8a" textAnchor="middle">
        A gyökök p függvényében: t = p+2 és t = p−1
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Legyen $p \\in \\mathbb{R}$ paraméter. Tekintsük a következő egyenletrendszert:

$$\\begin{cases} x + y = 2p + 1 \\\\ x \\cdot y = p^2 + p - 2 \\end{cases}$$

**a)** Igazolja, hogy a rendszernek **minden** valós $p$ esetén **két valós megoldása** van! Adja meg a gyököket $p$ függvényében! ($4$ pont)

**b)** Mely $p$ értékekre teljesül $x^2 + y^2 = 25$? ($3$ pont)

**c)** Határozza meg azt a $p$ valós számot, amelyre $x^3 + y^3 = 7$! ($3$ pont)

**d)** Adja meg $\\dfrac{1}{x} + \\dfrac{1}{y}$ értékét $p$ függvényében, és nevezze meg, mely $p$ értékekre **nem értelmezhető** a kifejezés! ($3$ pont)`,
  figure: () => <Graph />,
  asked: [
    { key: 'a', label: 'a) $\\{x,y\\} = ?$ ($p$ függ.)' },
    { key: 'b', label: 'b) $x^2+y^2=25 \\Rightarrow p=?$' },
    { key: 'c', label: 'c) $x^3+y^3=7 \\Rightarrow p=?$' },
    { key: 'd', label: 'd) $1/x+1/y = ?$, tiltott $p$?' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Átírás egyetlen másodfokú egyenletté',
      points: 1,
      body: `Ha $x$ és $y$ két szám, melyek **összege** $S = 2p+1$ és **szorzata** $P = p^2+p-2$, akkor (Viète-formulák alapján) $x$ és $y$ annak a másodfokú egyenletnek a gyökei, amelyre:

$$t^2 - S\\,t + P = 0, \\quad\\text{azaz}\\quad t^2 - (2p+1)\\,t + (p^2+p-2) = 0.$$

**Észrevétel:** $p^2 + p - 2 = (p+2)(p-1)$ — ez később segít a faktorizációban.`,
    },
    {
      title: 'a/1. lépés — A diszkrimináns kiszámítása',
      points: 1,
      body: `$$D = (2p+1)^2 - 4(p^2+p-2).$$

Kifejtjük: $(2p+1)^2 = 4p^2 + 4p + 1$, és $4(p^2+p-2) = 4p^2 + 4p - 8$. Különbségük:

$$D = 4p^2 + 4p + 1 - 4p^2 - 4p + 8 = 9.$$

**Kulcsfelismerés:** $D = 9 > 0$ **minden** $p$-re, tehát mindig két különböző valós gyök van. $\\sqrt{D} = 3$.`,
    },
    {
      title: 'a/2. lépés — A gyökök zárt alakja',
      points: 2,
      body: `$$t_{1,2} = \\dfrac{(2p+1) \\pm 3}{2}.$$

Két eset:
- $t_1 = \\dfrac{2p+1+3}{2} = \\dfrac{2p+4}{2} = p+2$,
- $t_2 = \\dfrac{2p+1-3}{2} = \\dfrac{2p-2}{2} = p-1$.

**Ellenőrzés — Viète:** $t_1 + t_2 = (p+2) + (p-1) = 2p+1$ ✓;  $t_1 \\cdot t_2 = (p+2)(p-1) = p^2+p-2$ ✓.

$$\\boxed{\\{x, y\\} = \\{p+2,\\ p-1\\} \\text{ minden valós } p\\text{-re}.}$$`,
      figure: () => <Graph />,
    },
    {
      title: 'b/1. lépés — $x^2 + y^2$ felírása $p$-vel',
      points: 1,
      body: `Használjuk a nevezetes azonosságot: $x^2 + y^2 = (x+y)^2 - 2xy$. Tehát

$$x^2+y^2 = (2p+1)^2 - 2(p^2+p-2) = 4p^2 + 4p + 1 - 2p^2 - 2p + 4 = 2p^2 + 2p + 5.$$

(Ellenőrzés: $p=0$ esetén $x=2, y=-1$, $4+1=5$ ✓; a képletből $0+0+5=5$ ✓.)`,
    },
    {
      title: 'b/2. lépés — Az egyenlet megoldása',
      points: 2,
      body: `$2p^2 + 2p + 5 = 25 \\Rightarrow 2p^2 + 2p - 20 = 0 \\Rightarrow p^2 + p - 10 = 0.$

Másodfokú megoldóképlet:

$$p_{1,2} = \\dfrac{-1 \\pm \\sqrt{1 + 40}}{2} = \\dfrac{-1 \\pm \\sqrt{41}}{2}.$$

Számszerűen $\\sqrt{41} \\approx 6{,}403$:
- $p_1 \\approx \\dfrac{-1 + 6{,}403}{2} \\approx 2{,}702$,
- $p_2 \\approx \\dfrac{-1 - 6{,}403}{2} \\approx -3{,}702$.

$$\\boxed{p = \\dfrac{-1 \\pm \\sqrt{41}}{2}.}$$`,
    },
    {
      title: 'c) lépés — $x^3 + y^3 = 7$ eset',
      points: 3,
      body: `Nevezetes azonosság: $x^3 + y^3 = (x+y)^3 - 3xy(x+y).$

$$= (2p+1)^3 - 3(p^2+p-2)(2p+1).$$

Érdemes faktorizálni: $(2p+1)^3 - 3(p+2)(p-1)(2p+1) = (2p+1)\\bigl[(2p+1)^2 - 3(p+2)(p-1)\\bigr].$

A szögletes zárójel:

$(2p+1)^2 - 3(p+2)(p-1) = (4p^2+4p+1) - 3(p^2+p-2) = 4p^2+4p+1 - 3p^2-3p+6 = p^2 + p + 7.$

Tehát

$$x^3 + y^3 = (2p+1)(p^2 + p + 7) = 7.$$

Próbáljuk $p = 0$-t: $(1)(0+0+7) = 7.$ **Találat!** $\\ p=0$ gyöke.

A $(2p+1)(p^2+p+7) - 7 = 0$ polinomot osztva $p$-vel (mert $p=0$ gyök): kifejtve $2p^3 + 3p^2 + 15p + 7 - 7 = 2p^3 + 3p^2 + 15p = p(2p^2+3p+15)$. A $2p^2+3p+15$ diszkriminánsa $9 - 120 = -111 < 0$ — nincs más valós gyök.

**Ellenőrzés $p=0$:** $x=2,\\ y=-1$, $2^3 + (-1)^3 = 8 - 1 = 7$ ✓.

$$\\boxed{p = 0, \\quad \\text{gyökök: } 2 \\text{ és } -1.}$$`,
      figure: () => <Graph showAux="sum" />,
    },
    {
      title: 'd) lépés — A reciprokok összege',
      points: 3,
      body: `$$\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{x+y}{xy} = \\dfrac{2p+1}{p^2 + p - 2} = \\dfrac{2p+1}{(p+2)(p-1)}.$$

A kifejezés akkor **nem értelmezhető**, ha a nevező $0$, vagyis ha **$x = 0$** vagy **$y = 0$** — ekkor a szorzat $xy = 0$, tehát $(p+2)(p-1) = 0$.

- $p = -2$: $x = p+2 = 0$, $y = p-1 = -3$. Az $\\tfrac{1}{x}$ nincs értelmezve.
- $p = 1$: $x = p+2 = 3$, $y = p-1 = 0$. Az $\\tfrac{1}{y}$ nincs értelmezve.

$$\\boxed{\\dfrac{1}{x}+\\dfrac{1}{y} = \\dfrac{2p+1}{(p+2)(p-1)}, \\quad p \\neq -2,\\ p \\neq 1.}$$`,
    },
  ],
  finalAnswer: {
    a: '$\\{x,y\\} = \\{p+2,\\ p-1\\}$ — mindig két valós megoldás ($D=9$)',
    b: '$p = \\dfrac{-1 \\pm \\sqrt{41}}{2}$',
    c: '$p = 0$ (gyökök: $2$ és $-1$)',
    d: '$\\dfrac{2p+1}{(p+2)(p-1)}$; tiltva: $p = -2$ és $p = 1$',
  },
  usedFormulas: [
    'Viète-formulák',
    'diszkrimináns',
    '$(x+y)^2 = x^2+2xy+y^2$',
    '$x^3+y^3 = (x+y)^3 - 3xy(x+y)$',
  ],
};

export default { meta, problem, solution };
