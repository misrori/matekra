import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-12',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 12,
  title: 'Valószínűség — urnából golyóhúzás',
  points: 3,
  topics: ['valószínűség'],
  difficulty: 3,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 93, note: 'kombinatorika' },
  ],
  estimatedMinutes: 5,
};

// Urna: 4 piros + 3 kék + 5 fehér = 12 golyó.
// Kihúzunk visszatevés NÉLKÜL 3-at. P(mindhárom piros) = ?
// C(4,3)/C(12,3) = 4 / 220 = 1/55 ≈ 0,0182
function UrnFigure({ highlight = 'none' }) {
  const R = 4, K = 3, F = 5;
  const balls = [];
  for (let i = 0; i < R; i++) balls.push({ color: 'red', i });
  for (let i = 0; i < K; i++) balls.push({ color: 'blue', i });
  for (let i = 0; i < F; i++) balls.push({ color: 'white', i });
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <text x="260" y="24" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Urna: 4 piros, 3 kék, 5 fehér
      </text>
      {/* Urna körvonal */}
      <path d="M 100 80 L 100 270 Q 100 295 130 295 L 390 295 Q 420 295 420 270 L 420 80" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
      <path d="M 85 80 L 435 80" stroke="#334155" strokeWidth="2.5" />
      {balls.map((b, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const cx = 160 + col * 70;
        const cy = 130 + row * 60;
        const color = b.color === 'red' ? '#dc2626' : b.color === 'blue' ? '#2563eb' : '#f8fafc';
        const stroke = b.color === 'white' ? '#334155' : '#111827';
        const strokeHL = highlight === 'red' && b.color === 'red';
        return (
          <circle
            key={`${b.color}-${b.i}`}
            cx={cx}
            cy={cy}
            r="22"
            fill={color}
            stroke={strokeHL ? '#16a34a' : stroke}
            strokeWidth={strokeHL ? 3.5 : 1.8}
          />
        );
      })}
      {highlight === 'red' && (
        <text x="260" y="316" fontSize="13" fontWeight="700" textAnchor="middle" fill="#16a34a">
          kedvező: 4 piros közül 3-at választunk
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy urnában $4$ piros, $3$ kék és $5$ fehér — összesen $12$ — egyforma méretű golyó van.
Visszatevés **nélkül** kihúzunk $3$ golyót.

Mennyi a valószínűsége annak, hogy mind a három golyó piros?
Megoldását részletezze! Az eredményt egyszerűsített tört és tizedes tört formájában is adja meg!`,
  figure: () => <UrnFigure />,
  asked: [{ key: 'P', label: '$P(\\text{három piros}) = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Összes eset (kombináció)',
      points: 1,
      body: `Visszatevés nélkül $12$ golyóból $3$-at kiválasztani — a sorrend nem számít —, így **kombinációról** van szó:

$$|\\Omega| = \\binom{12}{3} = \\dfrac{12!}{3! \\cdot 9!} = \\dfrac{12 \\cdot 11 \\cdot 10}{3 \\cdot 2 \\cdot 1} = \\dfrac{1320}{6} = 220.$$

A $220$ kiválasztás mindegyike **egyenlő valószínűségű**, így a klasszikus modell használható.`,
      figure: () => <UrnFigure />,
    },
    {
      title: '2. lépés — Kedvező esetek',
      points: 1,
      body: `„Mind a három piros" azt jelenti, hogy a $4$ piros közül választunk ki $3$-at, és a többi színből egyet sem. Ez:

$$\\text{kedvező} = \\binom{4}{3} \\cdot \\binom{8}{0} = 4 \\cdot 1 = 4.$$`,
      figure: () => <UrnFigure highlight="red" />,
    },
    {
      title: '3. lépés — A valószínűség',
      points: 1,
      body: `$$P = \\dfrac{\\text{kedvező}}{\\text{összes}} = \\dfrac{4}{220} = \\dfrac{1}{55} \\approx 0{,}0182.$$

**Ellenőrzés** (szorzatszabállyal, egymás utáni húzás): az első piros $\\tfrac{4}{12}$, a második már $\\tfrac{3}{11}$, a harmadik $\\tfrac{2}{10}$:

$$P = \\dfrac{4}{12} \\cdot \\dfrac{3}{11} \\cdot \\dfrac{2}{10} = \\dfrac{24}{1320} = \\dfrac{1}{55}. \\checkmark$$`,
      figure: () => <UrnFigure highlight="red" />,
    },
  ],
  finalAnswer: { P: '$P = \\dfrac{1}{55} \\approx 0{,}0182$' },
  usedFormulas: [
    'kombináció: $\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$',
    'klasszikus valószínűség: $P = \\dfrac{\\text{kedvező}}{\\text{összes}}$',
    'szorzatszabály (visszatevés nélkül)',
  ],
};

export default { meta, problem, solution };
