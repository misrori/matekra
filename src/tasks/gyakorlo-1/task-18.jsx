import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-18',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.B',
  number: 18,
  title: 'Radioaktív bomlás — exponenciális modell és félélet',
  points: 17,
  topics: ['exponenciális', 'logaritmus', 'függvények'],
  difficulty: 4,
  fgvt: [
    { page: 43, note: 'exponenciális függvény' },
    { page: 24, note: 'logaritmus azonosságai' },
  ],
  estimatedMinutes: 25,
};

/*
  MODELL:  m(t) = m_0 · (1/2)^(t / T),  ahol T a felezési idő.
  Konkrét értékek:
    m_0 = 200 g,  T = 12 nap
    m(t) = 200 · (1/2)^(t/12)

  a) m(0) = 200 g
  b) m(30) = 200 · (1/2)^(30/12) = 200 · 0,5^2,5 = 200 · 0,17678 ≈ 35,36 g
  c) Mikor lesz 50 g?
      200 · (1/2)^(t/12) = 50
      (1/2)^(t/12) = 0,25 = (1/2)^2
      ⇒ t/12 = 2  ⇒  t = 24 nap  (szép szám!)
  d) Mennyi százaléka marad 1 hónap (30 nap) után?
      arány = (1/2)^(30/12) = 0,17678 ≈ 17,68%

  LEVELÜNK:
    a) 2 pont — behelyettesítés
    b) 5 pont — kitevőtörés, lg-használat
    c) 5 pont — egyenlet megoldása log-gal
    d) 5 pont — százalék, értelmezés
*/

const M0 = 200;
const T_HALF = 12; // nap
const mass = (t) => M0 * Math.pow(0.5, t / T_HALF);

function MassPlot({ step = 0 }) {
  const ax = { x: 60, y: 30, w: 420, h: 260, xMin: 0, xMax: 60, yMin: 0, yMax: 220 };
  const sx = (v) => ax.x + ((v - ax.xMin) / (ax.xMax - ax.xMin)) * ax.w;
  const sy = (v) => ax.y + ax.h - ((v - ax.yMin) / (ax.yMax - ax.yMin)) * ax.h;

  const N = 60;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * 60;
    pts.push([t, mass(t)]);
  }
  const pathD = pts
    .map(([t, m], i) => `${i === 0 ? 'M' : 'L'} ${sx(t).toFixed(2)} ${sy(m).toFixed(2)}`)
    .join(' ');

  const hB = 30;
  const mB = mass(30);
  const hC = 24;
  const mC = 50;

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes
        x={ax.x}
        y={ax.y}
        w={ax.w}
        h={ax.h}
        xMin={ax.xMin}
        xMax={ax.xMax}
        yMin={ax.yMin}
        yMax={ax.yMax}
        xStep={6}
        yStep={20}
        xLabel="t (nap)"
        yLabel="m (g)"
        grid
      />

      {/* Kiindulási 200 g szaggatott vonal */}
      <line x1={sx(0)} y1={sy(M0)} x2={sx(60)} y2={sy(M0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
      <text x={sx(58)} y={sy(M0) - 4} fontSize="10" fill="#6b7280" textAnchor="end">
        m₀ = 200 g
      </text>

      {/* 50 g szint c) lépésnél */}
      {step === 3 && (
        <>
          <line x1={sx(0)} y1={sy(mC)} x2={sx(60)} y2={sy(mC)} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
          <text x={sx(0.5)} y={sy(mC) - 4} fontSize="11" fontWeight="bold" fill="#dc2626">
            m = 50 g
          </text>
        </>
      )}

      {/* A görbe */}
      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* a) kiindulás kiemelve */}
      {step === 1 && (
        <g>
          <circle cx={sx(0)} cy={sy(M0)} r="6" fill="#16a34a" />
          <text x={sx(0) + 10} y={sy(M0) + 16} fontSize="13" fontWeight="bold" fill="#16a34a">
            (0; 200)
          </text>
        </g>
      )}
      {/* b) 30 nap — kb. 35,36 g */}
      {step === 2 && (
        <g>
          <line x1={sx(hB)} y1={sy(0)} x2={sx(hB)} y2={sy(mB)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={sx(0)} y1={sy(mB)} x2={sx(hB)} y2={sy(mB)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={sx(hB)} cy={sy(mB)} r="6" fill="#dc2626" />
          <text x={sx(hB) + 8} y={sy(mB) - 8} fontSize="13" fontWeight="bold" fill="#dc2626">
            (30; ≈35,36)
          </text>
        </g>
      )}
      {/* c) 50 g → 24 nap */}
      {step === 3 && (
        <g>
          <line x1={sx(hC)} y1={sy(0)} x2={sx(hC)} y2={sy(mC)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={sx(hC)} cy={sy(mC)} r="6" fill="#dc2626" />
          <text x={sx(hC) + 8} y={sy(mC) - 8} fontSize="13" fontWeight="bold" fill="#dc2626">
            t = 24 nap
          </text>
        </g>
      )}
      {/* d) 30 nap, százalékos arány */}
      {step === 4 && (
        <g>
          <circle cx={sx(30)} cy={sy(mB)} r="6" fill="#7c3aed" />
          <text x={sx(30) + 8} y={sy(mB) - 8} fontSize="13" fontWeight="bold" fill="#7c3aed">
            30 nap: ≈ 17,68%
          </text>
        </g>
      )}

      <text x="260" y="18" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        m(t) = 200 · (1/2)^(t/12)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy radioaktív preparátum tömege kezdetben $m_0 = 200$ gramm. Az izotóp **felezési ideje** $T = 12$ nap, így a tömeg a következő exponenciális modellel írható le:

$$m(t) = m_0 \\cdot \\left(\\dfrac{1}{2}\\right)^{t / T} = 200 \\cdot \\left(\\dfrac{1}{2}\\right)^{t / 12},$$

ahol $t$ az eltelt napok száma.

**a)** Mennyi a preparátum tömege a kezdő időpontban ($t = 0$)? ($2$ pont)

**b)** Mennyi a preparátum tömege $30$ nap elteltével? ($5$ pont)

**c)** Hány nap múlva lesz a preparátum tömege pontosan $50$ g? ($5$ pont)

**d)** A kezdeti tömeg hány százaléka marad $30$ nap elteltével? ($5$ pont)

Az eredményeket két tizedesjegyre kerekítve adja meg!`,
  figure: () => <MassPlot step={0} />,
  asked: [
    { key: 'a', label: 'a) $m(0) = ?$ g' },
    { key: 'b', label: 'b) $m(30) \\approx ?$ g' },
    { key: 'c', label: 'c) $t = ?$ nap' },
    { key: 'd', label: 'd) $m(30)/m_0 \\approx ?\\%$' },
  ],
};

export const solution = {
  steps: [
    // ============ a) ============
    {
      title: 'a) 1. lépés — Behelyettesítés $t = 0$-nál',
      points: 1,
      body: `$$m(0) = 200 \\cdot \\left(\\dfrac{1}{2}\\right)^{0/12} = 200 \\cdot \\left(\\dfrac{1}{2}\\right)^{0}.$$

Bármely pozitív szám $0.$ hatványa $1$ (fgv. tábla 22. old.), tehát $(1/2)^0 = 1$.`,
      figure: () => <MassPlot step={1} />,
    },
    {
      title: 'a) 2. lépés — Eredmény',
      points: 1,
      body: `$$\\boxed{m(0) = 200 \\cdot 1 = 200 \\ \\text{g}.}$$

Ez a modell kiindulási paramétere, amit a $t = 0$-nál helyesen ad vissza. ✓`,
      figure: () => <MassPlot step={1} />,
    },

    // ============ b) ============
    {
      title: 'b) 1. lépés — A kitevő kiszámítása',
      points: 1,
      body: `$t = 30$ napnál:

$$m(30) = 200 \\cdot \\left(\\dfrac{1}{2}\\right)^{30/12} = 200 \\cdot \\left(\\dfrac{1}{2}\\right)^{2{,}5}.$$

A kitevő $30/12 = 2{,}5$.`,
      figure: () => <MassPlot step={2} />,
    },
    {
      title: 'b) 2. lépés — $(1/2)^{2{,}5}$ kiszámítása',
      points: 2,
      body: `Bontsuk a kitevőt egész és tört részre:

$$\\left(\\dfrac{1}{2}\\right)^{2{,}5} = \\left(\\dfrac{1}{2}\\right)^{2} \\cdot \\left(\\dfrac{1}{2}\\right)^{0{,}5} = \\dfrac{1}{4} \\cdot \\dfrac{1}{\\sqrt{2}}.$$

Tudjuk, hogy $\\sqrt{2} \\approx 1{,}4142$, így:

$$\\left(\\dfrac{1}{2}\\right)^{0{,}5} = \\dfrac{1}{\\sqrt{2}} \\approx 0{,}7071.$$

Összevonva:

$$\\left(\\dfrac{1}{2}\\right)^{2{,}5} \\approx 0{,}25 \\cdot 0{,}7071 \\approx 0{,}17678.$$

Másképp, logaritmussal: $\\lg 0{,}17678 = -\\lg(2^{2{,}5}) = -2{,}5 \\cdot \\lg 2 \\approx -2{,}5 \\cdot 0{,}30103 = -0{,}75258$, és valóban $10^{-0{,}75258} \\approx 0{,}17678$. ✓`,
      figure: () => <MassPlot step={2} />,
    },
    {
      title: 'b) 3. lépés — Tömeg',
      points: 2,
      body: `Szorozzuk meg $m_0 = 200$-zal:

$$m(30) = 200 \\cdot 0{,}17678 \\approx 35{,}36 \\ \\text{g}.$$

$\\boxed{m(30) \\approx 35{,}36 \\ \\text{g}}$.

**Intuíció:** $30$ nap alatt eltelik $2{,}5$ felezési idő, tehát a tömeg a kezdeti érték $(1/2)^{2{,}5} \\approx 17{,}68\\%$-ára csökken.`,
      figure: () => <MassPlot step={2} />,
    },

    // ============ c) ============
    {
      title: 'c) 1. lépés — Egyenlet felírása',
      points: 1,
      body: `$50$ g a tömeg:

$$200 \\cdot \\left(\\dfrac{1}{2}\\right)^{t / 12} = 50.$$

Osszunk $200$-zal:

$$\\left(\\dfrac{1}{2}\\right)^{t / 12} = \\dfrac{50}{200} = \\dfrac{1}{4}.$$`,
      figure: () => <MassPlot step={3} />,
    },
    {
      title: 'c) 2. lépés — Kitevők azonosítása (hatványátírás)',
      points: 2,
      body: `Észrevesszük, hogy $\\dfrac{1}{4} = \\left(\\dfrac{1}{2}\\right)^{2}$, tehát:

$$\\left(\\dfrac{1}{2}\\right)^{t / 12} = \\left(\\dfrac{1}{2}\\right)^{2}.$$

Mivel a $(1/2)^x$ függvény szigorúan monoton csökken, az egyenlőségből a kitevők egyenlősége következik:

$$\\dfrac{t}{12} = 2.$$`,
      figure: () => <MassPlot step={3} />,
    },
    {
      title: 'c) 3. lépés — Az idő',
      points: 2,
      body: `$$t = 24 \\ \\text{nap}.$$

$\\boxed{t = 24 \\text{ nap}}$.

**Ellenőrzés:** $24$ nap $= 2 \\cdot 12$ nap $= 2$ felezési idő. Ez alatt a tömeg $200 \\to 100 \\to 50$ grammra csökken — pontosan $50$ g. ✓

**Alternatív megoldás** logaritmussal: $\\lg\\left((1/2)^{t/12}\\right) = \\lg(1/4)$, azaz $\\dfrac{t}{12} \\cdot \\lg(1/2) = \\lg(1/4)$. Mivel $\\lg(1/4) = 2 \\lg(1/2)$, kapjuk $t/12 = 2$.`,
      figure: () => <MassPlot step={3} />,
    },

    // ============ d) ============
    {
      title: 'd) 1. lépés — Az arány képlete',
      points: 1,
      body: `A maradék tömeg aránya a kezdetihez képest:

$$\\dfrac{m(t)}{m_0} = \\dfrac{m_0 \\cdot (1/2)^{t/12}}{m_0} = \\left(\\dfrac{1}{2}\\right)^{t/12}.$$

Ez **független** $m_0$-tól — ez az exponenciális csökkenés általános tulajdonsága.`,
      figure: () => <MassPlot step={4} />,
    },
    {
      title: 'd) 2. lépés — Behelyettesítés $t = 30$-nál',
      points: 2,
      body: `$$\\dfrac{m(30)}{m_0} = \\left(\\dfrac{1}{2}\\right)^{30/12} = \\left(\\dfrac{1}{2}\\right)^{2{,}5} \\approx 0{,}17678.$$

(Ez ugyanaz a szám, amit a b) részben kiszámoltunk.)`,
      figure: () => <MassPlot step={4} />,
    },
    {
      title: 'd) 3. lépés — Százalékra váltás és értelmezés',
      points: 2,
      body: `$$0{,}17678 \\cdot 100\\% \\approx 17{,}68\\%.$$

$\\boxed{\\text{A kezdeti tömeg kb. } 17{,}68\\%-a \\text{ marad meg.}}$

**Kettős ellenőrzés:** a b) részben $m(30) \\approx 35{,}36$ g; $35{,}36 / 200 = 0{,}1768 = 17{,}68\\%$. ✓

**Értelmezés:** minden felezési idő (itt $12$ nap) alatt a tömeg **pontosan a felére** csökken. $30$ nap az $2{,}5$ felezési idő, ami azt jelenti, hogy az anyag mintegy $82\\%$-a bomlott el — a korábbi mérési laborokban tehát $30$ nap elég hosszú ahhoz, hogy a preparátum aktivitása jelentősen lecsökkenjen.`,
      figure: () => <MassPlot step={4} />,
    },
  ],
  finalAnswer: {
    a: '$m(0) = 200$ g',
    b: '$m(30) \\approx 35{,}36$ g',
    c: '$t = 24$ nap',
    d: '$\\approx 17{,}68\\%$',
  },
  usedFormulas: [
    'exponenciális bomlás: $m(t) = m_0 \\cdot (1/2)^{t/T}$',
    '$a^0 = 1$',
    '$(1/2)^{2{,}5} = (1/2)^2 \\cdot (1/2)^{0{,}5} = \\frac{1}{4\\sqrt{2}}$',
    'egyenlő alapú hatványok: $a^x = a^y \\Rightarrow x = y$',
    '$\\lg 2 \\approx 0{,}30103$',
  ],
};

export default { meta, problem, solution };
