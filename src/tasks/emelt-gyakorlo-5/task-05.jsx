import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-5-05',
  year: 2024,
  session: 'emelt gyakorló · 5. teszt',
  level: 'emelt',
  part: 'II',
  number: 5,
  title: 'Szélsőérték-keresés — négyzetgyökös függvény',
  points: 16,
  topics: ['függvények', 'egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 41, note: 'másodfokú függvény csúcspont' },
    { page: 23, note: 'gyökvonás azonosságai' },
  ],
  estimatedMinutes: 22,
  check: { type: 'number', value: 4.243, tolerance: 0.01 },
};

// Feladat: Az f(x) = sqrt(25 - x^2) + 3x   (x ∈ [-5, 5]) függvénynek hol van a maximuma és mennyi?
// Derivált (magyar érettségin deriválás nélkül is megoldható átparaméterezéssel: x = 5 sin t, t ∈ [-π/2, π/2])
// f(5 sin t) = 5 cos t + 15 sin t. Ez R = sqrt(25 + 225) = sqrt(250) = 5 sqrt(10) amplitúdójú.
// Max = 5 sqrt(10) ≈ 15.811, amikor sin t = 15/R = 3/sqrt(10), cos t = 5/R = 1/sqrt(10).
// Akkor x = 5 sin t = 5 * 3/sqrt(10) = 15/sqrt(10) = 3 sqrt(10)/2 * (kicsit ellenőrizzük)
// 15/sqrt(10) = 15 sqrt(10)/10 = 3 sqrt(10)/2 ≈ 4.743.
// A válasz nem szép, módosítom a példát, legyen  f(x) = sqrt(9 - x^2) + x, x ∈ [-3, 3].
// Átparaméterezés: x = 3 sin t, sqrt(9-x^2) = 3 cos t (t ∈ [-π/2, π/2] → cos t ≥ 0).
// f(3 sin t) = 3 cos t + 3 sin t = 3 sqrt(2) sin(t + π/4).
// Max: 3 sqrt(2) ≈ 4.243, amikor t + π/4 = π/2, azaz t = π/4.
// Akkor x = 3 sin(π/4) = 3 sqrt(2)/2 ≈ 2.121. Szép!
// Ellenőrzés: f(3√2/2) = sqrt(9 - 9/2) + 3√2/2 = sqrt(9/2) + 3√2/2 = 3/√2 + 3√2/2 = 3√2/2 + 3√2/2 = 3√2 ✓.
// Min: sin(t + π/4) = -1 => t = -3π/4 — de t ∈ [-π/2, π/2], tehát minimum a tartomány szélén:
// x = -3: f(-3) = 0 - 3 = -3.
// x = 3: f(3) = 0 + 3 = 3.
// A valódi minimum tehát -3, x = -3 helyen.
// check value = 7? inkább max = 3 sqrt(2) ≈ 4.243. Javítom: legyen a kérdés a maximum érték.
// Számérték: 3 * sqrt(2) ≈ 4.243.

function FunctionPlot() {
  const f = (x) => (Math.abs(x) <= 3 ? Math.sqrt(9 - x * x) + x : null);
  const xMin = -3.5, xMax = 3.5;
  const yMin = -4, yMax = 6;
  const sx = (v) => 50 + ((v - xMin) / (xMax - xMin)) * 420;
  const sy = (v) => 40 + (1 - (v - yMin) / (yMax - yMin)) * 260;
  const pts = [];
  for (let x = -3; x <= 3.001; x += 0.02) {
    const y = f(x);
    if (y !== null) pts.push(`${sx(x)},${sy(y)}`);
  }
  const xMax_pt = 3 * Math.sqrt(2) / 2;
  const yMax_pt = 3 * Math.sqrt(2);
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <Axes x={50} y={40} w={420} h={260} xMin={-3.5} xMax={3.5} yMin={-4} yMax={6} xStep={1} yStep={1} />
      <polyline points={pts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2.4" />
      <circle cx={sx(xMax_pt)} cy={sy(yMax_pt)} r="5" fill="#16a34a" />
      <text x={sx(xMax_pt) + 8} y={sy(yMax_pt) - 8} fontSize="12" fill="#15803d" fontWeight="bold">
        max: $\left(\tfrac{'{3\sqrt{2}}'}{2};\ 3\sqrt{'{2}'}\right)$
      </text>
      <circle cx={sx(-3)} cy={sy(-3)} r="5" fill="#dc2626" />
      <text x={sx(-3) + 8} y={sy(-3) + 14} fontSize="12" fill="#b91c1c" fontWeight="bold">min: (-3; -3)</text>
      <text x={60} y={30} fontSize="12" fill="#1e40af">$f(x) = \sqrt{'{9-x^2}'} + x$, $x \in [-3; 3]$</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott a következő függvény:

$$f(x) = \\sqrt{9 - x^2} + x,\\quad x \\in [-3;\\ 3].$$

a) Határozza meg az $f$ függvény **maximumhelyét** és **maximumértékét**!
b) Mi a függvény **minimumhelye** és **minimumértéke**?
c) Adja meg az $f(x) = 3$ egyenlet valós megoldásait!`,
  figure: () => <FunctionPlot />,
  asked: [
    { key: 'max', label: 'a) Maximumhely és -érték' },
    { key: 'min', label: 'b) Minimumhely és -érték' },
    { key: 'egyenlet', label: 'c) $f(x) = 3$ megoldásai' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Paraméterezés trigonometrikus helyettesítéssel',
      points: 3,
      body: `Mivel $x \\in [-3;\\ 3]$, vezessük be a $x = 3 \\sin t$, $t \\in \\left[-\\tfrac{\\pi}{2};\\ \\tfrac{\\pi}{2}\\right]$ helyettesítést. Ekkor:
$$\\sqrt{9 - x^2} = \\sqrt{9 - 9\\sin^2 t} = 3\\sqrt{\\cos^2 t} = 3 |\\cos t| = 3\\cos t$$
(mert a választott tartományon $\\cos t \\geq 0$).

Így:
$$f(x) = 3\\cos t + 3\\sin t = 3(\\sin t + \\cos t).$$`,
    },
    {
      title: '2. lépés — Amplitúdó-alak',
      points: 3,
      body: `Használjuk a **fázistolásos átírást**:
$$\\sin t + \\cos t = \\sqrt{2} \\sin \\left(t + \\dfrac{\\pi}{4}\\right).$$

Ezért:
$$f(x) = 3\\sqrt{2} \\cdot \\sin\\left(t + \\dfrac{\\pi}{4}\\right).$$

A $\\sin$ függvény értékkészlete $[-1;\\ 1]$, de itt $t + \\tfrac{\\pi}{4} \\in \\left[-\\tfrac{\\pi}{4};\\ \\tfrac{3\\pi}{4}\\right]$, és ezen a tartományon a szinusz értékkészlete $\\left[-\\tfrac{\\sqrt{2}}{2};\\ 1\\right]$.`,
    },
    {
      title: '3. lépés — Maximumhely és -érték',
      points: 3,
      body: `A maximum akkor áll be, ha $\\sin\\left(t + \\tfrac{\\pi}{4}\\right) = 1$, azaz $t + \\tfrac{\\pi}{4} = \\tfrac{\\pi}{2}$, tehát $t = \\tfrac{\\pi}{4}$.

Ekkor:
$$x_{\\max} = 3 \\sin \\dfrac{\\pi}{4} = \\dfrac{3\\sqrt{2}}{2}, \\qquad f(x_{\\max}) = 3\\sqrt{2}.$$

**Ellenőrzés**: $\\sqrt{9 - \\tfrac{9}{2}} + \\tfrac{3\\sqrt{2}}{2} = \\sqrt{\\tfrac{9}{2}} + \\tfrac{3\\sqrt{2}}{2} = \\tfrac{3}{\\sqrt{2}} + \\tfrac{3\\sqrt{2}}{2} = \\tfrac{3\\sqrt{2}}{2} + \\tfrac{3\\sqrt{2}}{2} = 3\\sqrt{2}$. ✓`,
    },
    {
      title: '4. lépés — Minimumhely és -érték',
      points: 3,
      body: `A $\\sin$ a $\\left[-\\tfrac{\\pi}{4};\\ \\tfrac{3\\pi}{4}\\right]$ zárt tartományon a $-\\tfrac{\\pi}{4}$ helyen veszi fel a legkisebb értékét ($\\sin(-\\tfrac{\\pi}{4}) = -\\tfrac{\\sqrt{2}}{2}$). Ez $t = -\\tfrac{\\pi}{2}$-nek felel meg, azaz $x = 3 \\sin(-\\tfrac{\\pi}{2}) = -3$.

$$f(-3) = \\sqrt{9 - 9} + (-3) = 0 + (-3) = -3.$$

**Minimum**: $x_{\\min} = -3$, $f(x_{\\min}) = -3$.

(A végponton, $x = 3$-ban is ellenőrizzünk: $f(3) = 0 + 3 = 3 < 3\\sqrt{2}$, tehát valóban nem ott a maximum.)`,
      figure: () => <FunctionPlot />,
    },
    {
      title: '5. lépés — c) Az $f(x) = 3$ egyenlet',
      points: 4,
      body: `$\\sqrt{9 - x^2} + x = 3$, átrendezve $\\sqrt{9 - x^2} = 3 - x$.

**Feltétel**: $3 - x \\geq 0 \\Rightarrow x \\leq 3$; valamint $9 - x^2 \\geq 0 \\Rightarrow x \\in [-3;\\ 3]$.

Négyzetre emelve:
$$9 - x^2 = 9 - 6x + x^2 \\Rightarrow 2x^2 - 6x = 0 \\Rightarrow 2x(x - 3) = 0.$$

Tehát $x = 0$ vagy $x = 3$. Mindkét érték a tartományban van, és kielégíti a feltételt ($3 - x \\ge 0$):
- $f(0) = \\sqrt{9} + 0 = 3$ ✓,
- $f(3) = 0 + 3 = 3$ ✓.

A megoldáshalmaz: $x \\in \\{0;\\ 3\\}$.`,
    },
  ],
  finalAnswer: {
    max: 'maximumhely $x = \\dfrac{3\\sqrt{2}}{2} \\approx 2{,}12$, maximumérték $f_{\\max} = 3\\sqrt{2} \\approx 4{,}24$',
    min: 'minimumhely $x = -3$, minimumérték $f_{\\min} = -3$',
    egyenlet: '$x \\in \\{0;\\ 3\\}$',
  },
  usedFormulas: [
    'trigonometrikus helyettesítés: $x = r \\sin t$',
    '$a \\sin t + b \\cos t = \\sqrt{a^2 + b^2} \\sin(t + \\varphi)$',
    'négyzetre emelés — feltételes ekvivalencia',
    'másodfokú egyenlet szorzattá alakítása',
  ],
};

export default { meta, problem, solution };
