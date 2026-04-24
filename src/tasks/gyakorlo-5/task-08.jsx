import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-08',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 8,
  title: 'Valószínűség — golyók az urnában',
  points: 4,
  topics: ['valószínűség'],
  difficulty: 3,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 93, note: 'kombinatorika' },
  ],
  estimatedMinutes: 6,
  // P(két piros) = C(5,2)/C(12,2) = 10/66 = 5/33 ≈ 0,1515
  check: { type: 'number', value: 0.1515, tolerance: 0.005 },
};

function UrnFigure() {
  // 5 piros + 7 kék golyó
  const reds = 5, blues = 7;
  return (
    <SvgCanvas width={480} height={260} viewBox="0 0 480 260">
      {/* Urna körvonala */}
      <path d="M 140,60 L 140,200 Q 140,220 160,220 L 320,220 Q 340,220 340,200 L 340,60" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
      <ellipse cx="240" cy="60" rx="100" ry="14" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
      <text x="240" y="248" fontSize="13" textAnchor="middle" fill="#334155" fontWeight="bold">
        Urna: {reds} piros + {blues} kék golyó
      </text>
      {/* Golyók */}
      {Array.from({ length: reds }).map((_, i) => (
        <circle key={`r${i}`} cx={170 + (i % 3) * 28} cy={180 - Math.floor(i / 3) * 28} r="11" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.2" />
      ))}
      {Array.from({ length: blues }).map((_, i) => (
        <circle key={`b${i}`} cx={260 + (i % 3) * 28} cy={180 - Math.floor(i / 3) * 28} r="11" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.2" />
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy urnában $5$ **piros** és $7$ **kék** golyó van. Egyszerre (találomra) kihúzunk $2$ golyót az urnából.

Mekkora a valószínűsége annak, hogy **mindkét** kihúzott golyó **piros**? Adja meg a valószínűséget négy tizedesjegyre kerekítve!`,
  figure: () => <UrnFigure />,
  asked: [{ key: 'P', label: '$P(\\text{2 piros}) = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A kísérlet modellje',
      points: 1,
      body: `Összesen $5 + 7 = 12$ golyó van. Egyszerre húzunk $2$-t — ez egy **rendezetlen** kiválasztás, azaz **kombináció**.

A klasszikus valószínűség képlete:

$$P = \\dfrac{\\text{kedvező esetek}}{\\text{összes eset}}.$$`,
    },
    {
      title: '2. lépés — Az összes eset száma',
      points: 1,
      body: `$12$ golyóból $2$-t kiválasztani (sorrend nélkül):

$$\\binom{12}{2} = \\dfrac{12!}{2! \\cdot 10!} = \\dfrac{12 \\cdot 11}{2} = 66.$$`,
    },
    {
      title: '3. lépés — A kedvező esetek száma',
      points: 1,
      body: `Kedvezőek: mindkét kihúzott piros, azaz az $5$ pirosból választunk ki $2$-t:

$$\\binom{5}{2} = \\dfrac{5 \\cdot 4}{2} = 10.$$`,
    },
    {
      title: '4. lépés — Valószínűség és kerekítés',
      points: 1,
      body: `$$P(\\text{2 piros}) = \\dfrac{\\binom{5}{2}}{\\binom{12}{2}} = \\dfrac{10}{66} = \\dfrac{5}{33} \\approx 0{,}1515.$$

Tehát $\\boxed{P \\approx 0{,}1515}$ (vagy pontosan $\\tfrac{5}{33}$, ami kb. $15{,}15\\%$).

**Ellenőrzés szorzatszabállyal** (egymás után, visszatevés nélkül):
$$P = \\dfrac{5}{12} \\cdot \\dfrac{4}{11} = \\dfrac{20}{132} = \\dfrac{5}{33} \\ \\checkmark.$$`,
    },
  ],
  finalAnswer: { P: '$P \\approx 0{,}1515 = \\tfrac{5}{33}$' },
  usedFormulas: [
    '$P = \\dfrac{\\text{kedvező}}{\\text{összes}}$',
    '$\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$',
  ],
};

export default { meta, problem, solution };
