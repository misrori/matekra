import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-01',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'I',
  number: 1,
  title: 'Gyökös egyenlőtlenség megoldása',
  points: 13,
  topics: ['egyenletek', 'függvények'],
  difficulty: 4,
  fgvt: [
    { page: 27, note: 'másodfokú megoldóképlet' },
    { page: 25, note: 'egyenlőtlenségek' },
  ],
  estimatedMinutes: 16,
  check: { type: 'interval', value: '[-7/2; 2+sqrt(10))' },
};

// Feladat: √(2x+7) > x − 1
// ÉT: 2x+7 ≥ 0 ⇒ x ≥ −7/2
// Eset 1: x − 1 < 0 (azaz x < 1) — ekkor bal oldal ≥ 0 > jobb, mindig igaz az ÉT-n
//   Megoldás ezen ágban: x ∈ [−7/2; 1)
// Eset 2: x ≥ 1 — mindkét oldal nemnegatív, négyzetre emelhetjük:
//   2x+7 > (x−1)² = x² − 2x + 1 ⇒ x² − 4x − 6 < 0
//   Gyökök: x = (4 ± √(16+24))/2 = 2 ± √10
//   x ∈ (2 − √10 ; 2 + √10) ≈ (−1,162 ; 5,162)
//   Az x ≥ 1 feltétellel: x ∈ [1 ; 2+√10)
// Unió: x ∈ [−7/2 ; 2+√10), azaz x ∈ [−3,5 ; ≈5,162)

function GyokFuggveny({ highlight = 'none' }) {
  // Rajzolunk: y = √(2x+7) kék, y = x−1 piros, az intervallumot kiemeljük.
  const pts = [];
  for (let x = -3.5; x <= 6; x += 0.1) {
    const y = Math.sqrt(2 * x + 7);
    pts.push([x, y]);
  }
  const xAx = (v) => 40 + ((v + 4) / 10) * 460;
  const yAx = (v) => 40 + 260 - ((v + 2) / 8) * 260;
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${xAx(x).toFixed(1)} ${yAx(y).toFixed(1)}`).join(' ');

  return (
    <SvgCanvas width={540} height={320} viewBox="0 0 540 320">
      <Axes x={40} y={40} w={460} h={260}
        xMin={-4} xMax={6} yMin={-2} yMax={6}
        xStep={1} yStep={1} xLabel="x" yLabel="y" />
      {/* f(x) = √(2x+7) */}
      <path d={pathD} fill="none" stroke="#1e40af" strokeWidth="2.4" />
      <text x={130} y={100} fontSize="13" fill="#1e40af" fontWeight="700">y = √(2x+7)</text>
      {/* g(x) = x − 1, értelmezve mindenhol */}
      <line x1={xAx(-4)} y1={yAx(-5)} x2={xAx(6)} y2={yAx(5)} stroke="#b91c1c" strokeWidth="2" />
      <text x={440} y={yAx(5) - 6} fontSize="13" fill="#b91c1c" fontWeight="700">y = x − 1</text>
      {/* metszéspont (2+√10 ≈ 5,16) */}
      {highlight === 'zone' && (
        <g>
          <rect x={xAx(-3.5)} y={40} width={xAx(2 + Math.sqrt(10)) - xAx(-3.5)} height={260}
            fill="#fef3c7" fillOpacity="0.4" />
          <text x={xAx(0)} y={58} fontSize="13" fill="#92400e" fontWeight="700" textAnchor="middle">
            f(x) {'>'} g(x) itt
          </text>
        </g>
      )}
      {/* metszéspont markerei */}
      <circle cx={xAx(2 + Math.sqrt(10))} cy={yAx(1 + Math.sqrt(10))} r="4" fill="#b91c1c" />
      <text x={xAx(2 + Math.sqrt(10)) + 6} y={yAx(1 + Math.sqrt(10)) - 6} fontSize="12" fill="#b91c1c">
        x ≈ 5,16
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenlőtlenséget:

$$\\sqrt{2x + 7} > x - 1.$$

Adja meg a megoldáshalmazt **intervallum-jelöléssel**! Részletesen indokolja a megoldás menetét!`,
  figure: () => <GyokFuggveny />,
  asked: [
    { key: 'set', label: 'Megoldáshalmaz = ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Értelmezési tartomány',
      points: 2,
      body: `A bal oldalon négyzetgyök szerepel, ezért a gyök alatti kifejezésnek **nemnegatívnak** kell lennie:

$$2x + 7 \\ge 0 \\;\\Longleftrightarrow\\; x \\ge -\\dfrac{7}{2}.$$

Az értelmezési tartomány tehát: $\\mathcal{D} = \\left[-\\dfrac{7}{2};\\ +\\infty\\right)$.`,
    },
    {
      title: '2. lépés — Esetszétválasztás a jobb oldal előjele szerint',
      points: 2,
      body: `A bal oldal, $\\sqrt{2x+7}$ **sohasem negatív**. A jobb oldal, $x - 1$, előjele attól függ, hogy $x < 1$ vagy $x \\ge 1$.

**Eset (A):** $x < 1$. Ekkor a jobb oldal negatív, a bal oldal viszont $\\ge 0$. Ezért az egyenlőtlenség **automatikusan teljesül** az értelmezési tartomány minden $x < 1$ pontjában.

**Eset (B):** $x \\ge 1$. Ekkor mindkét oldal nemnegatív, így a négyzetre emelés **ekvivalens** átalakítás.`,
    },
    {
      title: '3. lépés — Az (A) eset megoldáshalmaza',
      points: 2,
      body: `Az (A) esetben csak az értelmezési tartomány és az $x < 1$ feltétel metszete:

$$\\left[-\\dfrac{7}{2};\\ 1\\right).$$`,
    },
    {
      title: '4. lépés — A (B) eset: négyzetre emelés',
      points: 3,
      body: `Négyzetre emelve az egyenlőtlenséget:

$$2x + 7 > (x - 1)^2 = x^2 - 2x + 1.$$

Rendezve:

$$x^2 - 2x + 1 - 2x - 7 < 0$$

$$x^2 - 4x - 6 < 0.$$`,
    },
    {
      title: '5. lépés — A másodfokú egyenlőtlenség megoldása',
      points: 2,
      body: `Az $x^2 - 4x - 6 = 0$ gyökei:

$$x_{1,2} = \\dfrac{4 \\pm \\sqrt{16 + 24}}{2} = \\dfrac{4 \\pm \\sqrt{40}}{2} = 2 \\pm \\sqrt{10}.$$

Tehát $x_1 = 2 - \\sqrt{10} \\approx -1{,}162$ és $x_2 = 2 + \\sqrt{10} \\approx 5{,}162$.

Mivel a parabola főegyütthatója pozitív, az $x^2 - 4x - 6 < 0$ egyenlőtlenség megoldása:

$$x \\in \\left(2 - \\sqrt{10};\\ 2 + \\sqrt{10}\\right).$$`,
    },
    {
      title: '6. lépés — A (B) eset megoldása',
      points: 1,
      body: `A $x \\ge 1$ feltétellel metszve:

$$\\left[1;\\ 2 + \\sqrt{10}\\right).$$

(Mivel $1 > 2 - \\sqrt{10} \\approx -1{,}162$, az alsó határ $1$ marad.)`,
    },
    {
      title: '7. lépés — A két megoldáshalmaz uniója',
      points: 1,
      body: `A két eset uniója:

$$\\left[-\\dfrac{7}{2};\\ 1\\right) \\cup \\left[1;\\ 2 + \\sqrt{10}\\right) = \\left[-\\dfrac{7}{2};\\ 2 + \\sqrt{10}\\right).$$

Tizedestörttel: megközelítőleg $[-3{,}5;\\ 5{,}162)$.`,
      figure: () => <GyokFuggveny highlight="zone" />,
    },
  ],
  finalAnswer: {
    set: 'Megoldáshalmaz: $\\left[-\\dfrac{7}{2};\\ 2 + \\sqrt{10}\\right) \\approx [-3{,}5;\\ 5{,}162)$',
  },
  usedFormulas: [
    'négyzetgyök értelmezési tartománya: $\\sqrt{A} \\Rightarrow A \\ge 0$',
    'ekvivalens négyzetre emelés feltétele (mindkét oldal $\\ge 0$)',
    'másodfokú egyenlet: $x_{1,2} = (-b \\pm \\sqrt{b^2-4ac}) / (2a)$',
    'másodfokú egyenlőtlenség előjelvizsgálata',
  ],
};

export default { meta, problem, solution };
