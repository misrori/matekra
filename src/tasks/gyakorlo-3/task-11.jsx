import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-11',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 11,
  title: 'Másodfokú függvény — zérushelyek és minimum',
  points: 3,
  topics: ['függvények'],
  difficulty: 3,
  fgvt: [{ page: 41, note: 'másodfokú függvény' }],
  estimatedMinutes: 5,
};

// f(x) = x² - 4x - 5
// zéróhelyek: (x-5)(x+1)=0 → x = 5, x = -1
// tengelypont: x₀ = -b/(2a) = 4/2 = 2, f(2) = 4 - 8 - 5 = -9. Min = -9 x=2-nél.
function Parabola({ showZeros = false, showMin = false }) {
  const xMin = -3, xMax = 7, yMin = -11, yMax = 7;
  const sx = (v) => 60 + ((v - xMin) / (xMax - xMin)) * 400;
  const sy = (v) => 30 + 260 - ((v - yMin) / (yMax - yMin)) * 260;
  const pts = [];
  for (let x = xMin; x <= xMax; x += 0.1) {
    const y = x * x - 4 * x - 5;
    if (y >= yMin - 1 && y <= yMax + 1) pts.push(`${sx(x)},${sy(y)}`);
  }
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes x={60} y={30} w={400} h={260} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={2} grid />
      <polyline points={pts.join(' ')} fill="none" stroke="#1e40af" strokeWidth="2.5" />
      <text x={sx(5)} y={sy(5.5)} fontSize="14" fontWeight="700" fill="#1e40af">f(x) = x² − 4x − 5</text>
      {showZeros && (
        <>
          <circle cx={sx(-1)} cy={sy(0)} r="5.5" fill="#dc2626" />
          <circle cx={sx(5)} cy={sy(0)} r="5.5" fill="#dc2626" />
          <text x={sx(-1)} y={sy(0) - 10} fontSize="13" fontWeight="700" fill="#dc2626" textAnchor="middle">(−1; 0)</text>
          <text x={sx(5)} y={sy(0) - 10} fontSize="13" fontWeight="700" fill="#dc2626" textAnchor="middle">(5; 0)</text>
        </>
      )}
      {showMin && (
        <>
          <circle cx={sx(2)} cy={sy(-9)} r="6" fill="#16a34a" stroke="#064e3b" strokeWidth="2" />
          <text x={sx(2) + 10} y={sy(-9) + 5} fontSize="13" fontWeight="700" fill="#064e3b">min: (2; −9)</text>
          <line x1={sx(2)} y1={sy(yMin)} x2={sx(2)} y2={sy(yMax)} stroke="#16a34a" strokeDasharray="4 4" strokeWidth="1.4" />
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Tekintsük az $f(x) = x^2 - 4x - 5$ függvényt a valós számok halmazán.

**a)** Határozza meg a függvény zérushelyeit! ($2$ pont)

**b)** Mekkora a függvény minimumának helye és értéke? ($1$ pont)`,
  figure: () => <Parabola />,
  asked: [
    { key: 'zeros', label: 'a) zérushelyek: $?$' },
    { key: 'min', label: 'b) minimum: $(x_0, f_{\\min}) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — A zérushelyek: $f(x) = 0$',
      points: 1,
      body: `Oldjuk meg a $x^2 - 4x - 5 = 0$ másodfokú egyenletet. **Szorzattá alakítással** keressünk két számot, melyek szorzata $-5$, összege $-4$: ezek a $-5$ és a $+1$.

$$x^2 - 4x - 5 = (x - 5)(x + 1) = 0.$$

Tehát $x_1 = 5$ vagy $x_2 = -1$.`,
      figure: () => <Parabola />,
    },
    {
      title: 'a) 2. lépés — Ellenőrzés megoldóképlettel',
      points: 1,
      body: `Ellenőrzésként használjuk a **megoldóképletet** ($a = 1, b = -4, c = -5$):

$$x = \\dfrac{4 \\pm \\sqrt{16 + 20}}{2} = \\dfrac{4 \\pm 6}{2}.$$

Ebből $x_1 = 5$ és $x_2 = -1$. ✓`,
      figure: () => <Parabola showZeros />,
    },
    {
      title: 'b) A minimum helye és értéke',
      points: 1,
      body: `Mivel $a = 1 > 0$, a parabola **felfelé nyíló**, így van minimuma a **tengelypontban**.

A tengelypont $x$-koordinátája:

$$x_0 = -\\dfrac{b}{2a} = -\\dfrac{-4}{2} = 2.$$

A függvényérték ezen a helyen:

$$f(2) = 2^2 - 4 \\cdot 2 - 5 = 4 - 8 - 5 = -9.$$

Tehát a függvény minimuma: $f_{\\min} = -9$, a helye $x_0 = 2$.

**Teljes négyzetté alakítással** ellenőrizve: $f(x) = (x-2)^2 - 9$, ami $(x-2)^2 \\ge 0$ miatt valóban $\\ge -9$, és egyenlőség $x = 2$-nél áll fenn.`,
      figure: () => <Parabola showZeros showMin />,
    },
  ],
  finalAnswer: {
    zeros: '$x_1 = 5, x_2 = -1$',
    min: '$x_0 = 2, \\ f_{\\min} = -9$',
  },
  usedFormulas: [
    'megoldóképlet: $x = (-b \\pm \\sqrt{b^2-4ac})/(2a)$',
    'tengelypont: $x_0 = -b/(2a)$',
    'teljes négyzetté alakítás',
  ],
};

export default { meta, problem, solution };
