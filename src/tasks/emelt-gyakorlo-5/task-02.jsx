import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-5-02',
  year: 2024,
  session: 'emelt gyakorló · 5. teszt',
  level: 'emelt',
  part: 'I',
  number: 2,
  title: 'Szimmetrikus egyenletrendszer — összeg és szorzat',
  points: 13,
  topics: ['egyenletek'],
  difficulty: 4,
  fgvt: [
    { page: 27, note: 'másodfokú megoldóképlet' },
    { page: 28, note: 'Viète-formulák' },
  ],
  estimatedMinutes: 15,
  check: { type: 'set', value: '{(2,5), (5,2)}' },
};

// Rendszer:
//   x + y = 7
//   x^2 + y^2 = 29
// ebből: xy = ((x+y)^2 - (x^2+y^2)) / 2 = (49 - 29)/2 = 10.
// Viète: x, y gyökei a t^2 - 7t + 10 = 0 egyenletnek. D = 49 - 40 = 9. t = (7 ± 3)/2 = 5 vagy 2.
// Megoldások: (2, 5) és (5, 2).

function GraphView() {
  const xMin = -1, xMax = 8;
  const yMin = -1, yMax = 8;
  const sx = (v) => 50 + ((v - xMin) / (xMax - xMin)) * 360;
  const sy = (v) => 40 + (1 - (v - yMin) / (yMax - yMin)) * 280;
  // x + y = 7 egyenes: y = 7 - x
  // x^2 + y^2 = 29 kör: középpont origó, sugár sqrt(29)
  const r = Math.sqrt(29);
  const circlePts = [];
  for (let t = 0; t <= 2 * Math.PI + 0.01; t += 0.02) {
    circlePts.push(`${sx(r * Math.cos(t))},${sy(r * Math.sin(t))}`);
  }
  return (
    <SvgCanvas width={460} height={360} viewBox="0 0 460 360">
      <Axes x={50} y={40} w={360} h={280} xMin={-1} xMax={8} yMin={-1} yMax={8} xStep={1} yStep={1} />
      {/* Kör: x^2 + y^2 = 29 */}
      <polyline points={circlePts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={sx(-0.6)} y={sy(5.6)} fontSize="12" fill="#1e40af">$x^2+y^2=29$</text>
      {/* egyenes: y = 7 - x */}
      <line x1={sx(-1)} y1={sy(8)} x2={sx(8)} y2={sy(-1)} stroke="#dc2626" strokeWidth="2" />
      <text x={sx(6.5)} y={sy(1.8)} fontSize="12" fill="#b91c1c">$x+y=7$</text>
      {/* metszéspontok */}
      <circle cx={sx(2)} cy={sy(5)} r="5" fill="#16a34a" />
      <text x={sx(2) - 18} y={sy(5) - 10} fontSize="13" fill="#15803d" fontWeight="bold">(2; 5)</text>
      <circle cx={sx(5)} cy={sy(2)} r="5" fill="#16a34a" />
      <text x={sx(5) + 8} y={sy(2) + 14} fontSize="13" fill="#15803d" fontWeight="bold">(5; 2)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számpárok halmazán a következő egyenletrendszert:

$$\\begin{cases} x + y = 7 \\\\ x^2 + y^2 = 29 \\end{cases}$$

A megoldást szemléltesse koordináta-rendszerben is!`,
  figure: () => <GraphView />,
  asked: [
    { key: 'megoldasok', label: 'Megoldáspárok $(x;\\ y)$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A szorzat kiszámítása',
      points: 3,
      body: `Ismert azonosság:
$$(x + y)^2 = x^2 + 2xy + y^2.$$

Ebből:
$$xy = \\dfrac{(x+y)^2 - (x^2 + y^2)}{2} = \\dfrac{7^2 - 29}{2} = \\dfrac{49 - 29}{2} = \\dfrac{20}{2} = 10.$$

Tehát az **összeg** $s = x + y = 7$, a **szorzat** $p = xy = 10$.`,
    },
    {
      title: '2. lépés — Viète-típusú átfogalmazás',
      points: 3,
      body: `Ha $x$ és $y$ gyökei a $t^2 - s t + p = 0$ egyenletnek (ahol $s$ és $p$ az összeg és a szorzat), akkor:
$$t^2 - 7t + 10 = 0.$$

Ez egy **másodfokú** egyenlet egyetlen változóval — a Viète-formulák szerint $x$ és $y$ éppen ennek a gyökei (sorrendtől eltekintve).`,
    },
    {
      title: '3. lépés — A másodfokú egyenlet megoldása',
      points: 3,
      body: `Diszkrimináns:
$$D = 7^2 - 4 \\cdot 1 \\cdot 10 = 49 - 40 = 9 > 0,$$

tehát két valós gyök van:
$$t_{1,2} = \\dfrac{7 \\pm \\sqrt{9}}{2} = \\dfrac{7 \\pm 3}{2}.$$

Ebből $t_1 = \\dfrac{10}{2} = 5$ és $t_2 = \\dfrac{4}{2} = 2$.`,
    },
    {
      title: '4. lépés — A megoldáspárok',
      points: 2,
      body: `Mivel a rendszer **szimmetrikus** $x$-ben és $y$-ban, a két gyök kétféleképpen osztható szét:
$$(x; y) = (2;\\ 5) \\quad \\text{vagy} \\quad (x; y) = (5;\\ 2).$$

Mindkét pár kielégíti az eredeti rendszert:
- $2 + 5 = 7$ ✓ és $2^2 + 5^2 = 4 + 25 = 29$ ✓,
- $5 + 2 = 7$ ✓ és $5^2 + 2^2 = 29$ ✓.`,
    },
    {
      title: '5. lépés — Grafikus értelmezés',
      points: 2,
      body: `A rendszer geometriailag:
- Az $x + y = 7$ egyenlet egy **egyenes** a síkban.
- Az $x^2 + y^2 = 29$ egyenlet egy origó középpontú, $\\sqrt{29} \\approx 5{,}39$ sugarú **kör**.

A megoldások az egyenes és a kör **metszéspontjai**. Mivel az origónak az egyenestől vett távolsága $\\dfrac{|7|}{\\sqrt{2}} = \\dfrac{7\\sqrt{2}}{2} \\approx 4{,}95 < \\sqrt{29}$, az egyenes átmegy a körön, pontosan **két** metszéspontot létrehozva.`,
      figure: () => <GraphView />,
    },
  ],
  finalAnswer: {
    megoldasok: '$(x;\\ y) \\in \\{(2;\\ 5),\\ (5;\\ 2)\\}$',
  },
  usedFormulas: [
    '$(x+y)^2 = x^2 + 2xy + y^2$',
    'Viète-formulák: $s = x+y$, $p = xy$ gyökei $t^2 - st + p = 0$ egyenletnek',
    'másodfokú megoldóképlet',
  ],
};

export default { meta, problem, solution };
