import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-13b',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  title: 'Másodfokú egyenlőtlenség',
  points: 6,
  topics: ['egyenletek', 'függvények'],
  difficulty: 3,
  fgvt: [
    { page: 27, note: 'másodfokú megoldóképlet' },
    { page: 41, note: 'másodfokú függvény' },
  ],
  estimatedMinutes: 12,
};

// Oldd meg: x² - x - 6 ≤ 0
// Zéróhelyek: x = (1 ± √25)/2 = (1 ± 5)/2 → x = 3 vagy x = -2
// A a > 0 esetben a parabola felfelé nyíló, ≤ 0 a zérók közti zárt intervallumon: x ∈ [-2, 3].
function InequalityPlot({ show = 'curve' }) {
  const xMin = -4, xMax = 5, yMin = -8, yMax = 10;
  const sx = (v) => 60 + ((v - xMin) / (xMax - xMin)) * 400;
  const sy = (v) => 30 + 240 - ((v - yMin) / (yMax - yMin)) * 240;
  const pts = [];
  for (let x = xMin; x <= xMax; x += 0.1) {
    const y = x * x - x - 6;
    if (y >= yMin && y <= yMax) pts.push(`${sx(x)},${sy(y)}`);
  }
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <Axes x={60} y={30} w={400} h={240} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} xStep={1} yStep={2} grid />
      {/* Kiemelés: [-2, 3] x-tengely sáv */}
      {(show === 'solution') && (
        <rect x={sx(-2)} y={sy(0) - 4} width={sx(3) - sx(-2)} height={8} fill="#16a34a" fillOpacity="0.7" />
      )}
      <polyline points={pts.join(' ')} fill="none" stroke="#1e40af" strokeWidth="2.5" />
      <text x={sx(4)} y={sy(8)} fontSize="14" fontWeight="700" fill="#1e40af">f(x) = x² − x − 6</text>
      {(show === 'zeros' || show === 'solution') && (
        <>
          <circle cx={sx(-2)} cy={sy(0)} r="5" fill="#dc2626" />
          <circle cx={sx(3)} cy={sy(0)} r="5" fill="#dc2626" />
          <text x={sx(-2) - 4} y={sy(0) - 10} fontSize="13" fontWeight="700" fill="#dc2626" textAnchor="end">x = −2</text>
          <text x={sx(3) + 4} y={sy(0) - 10} fontSize="13" fontWeight="700" fill="#dc2626">x = 3</text>
        </>
      )}
      {show === 'solution' && (
        <text x="260" y="290" fontSize="14" fontWeight="700" textAnchor="middle" fill="#166534">
          Megoldás: x ∈ [−2; 3]
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán az alábbi egyenlőtlenséget:

$$x^2 - x - 6 \\leq 0.$$

A megoldás menetét részletezze!`,
  figure: () => <InequalityPlot />,
  asked: [{ key: 'set', label: 'Megoldás: $x \\in ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A kapcsolódó másodfokú egyenlet gyökei',
      points: 2,
      body: `Először keressük meg az $f(x) = x^2 - x - 6 = 0$ egyenlet gyökeit (a parabola zérushelyeit).

A **megoldóképlet** ($a = 1, b = -1, c = -6$):

$$x = \\dfrac{1 \\pm \\sqrt{1 + 24}}{2} = \\dfrac{1 \\pm 5}{2}.$$

Ebből $x_1 = 3$ és $x_2 = -2$.`,
      figure: () => <InequalityPlot show="zeros" />,
    },
    {
      title: '2. lépés — A parabola „nyílásiránya"',
      points: 1,
      body: `A főegyüttható $a = 1 > 0$, ezért a parabola **felfelé nyíló**.
Tehát a függvény értéke:
- **$ \\geq 0$** a zérushelyeken kívül ($x \\leq -2$ vagy $x \\geq 3$),
- **$\\leq 0$** a zérushelyek között ($-2 \\leq x \\leq 3$).`,
      figure: () => <InequalityPlot show="zeros" />,
    },
    {
      title: '3. lépés — Az egyenlőtlenség megoldásának felírása',
      points: 2,
      body: `A kérdés: hol teljesül $x^2 - x - 6 \\leq 0$?

Az előbbiek alapján a megoldáshalmaz:

$$x \\in [-2;\\ 3].$$

(A **zárt** intervallum, mert a $\\leq$ jelet használjuk — a zérushelyek is megoldások.)`,
      figure: () => <InequalityPlot show="solution" />,
    },
    {
      title: '4. lépés — Ellenőrzés (próbaérték)',
      points: 1,
      body: `Válasszunk **három** helyen próbaértéket:
- $x = -3$ (kívül balról): $f(-3) = 9 + 3 - 6 = 6 > 0$ → **nem** megoldás. ✓
- $x = 0$ (belül): $f(0) = -6 < 0$ → megoldás. ✓
- $x = 4$ (kívül jobbról): $f(4) = 16 - 4 - 6 = 6 > 0$ → **nem** megoldás. ✓
- Határok: $f(-2) = 4 + 2 - 6 = 0$ és $f(3) = 9 - 3 - 6 = 0$ — egyenlőség, tehát a zárt intervallum helyes.`,
      figure: () => <InequalityPlot show="solution" />,
    },
  ],
  finalAnswer: { set: '$x \\in [-2;\\ 3]$' },
  usedFormulas: [
    'másodfokú megoldóképlet',
    'másodfokú függvény előjele a gyökök környékén',
  ],
};

export default { meta, problem, solution };
