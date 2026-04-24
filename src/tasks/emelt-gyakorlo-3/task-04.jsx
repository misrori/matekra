import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-04',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'I',
  number: 4,
  title: 'Kombinatorika és valószínűség — mintavétel',
  points: 13,
  topics: ['valószínűség'],
  difficulty: 4,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 93, note: 'kombinatorika' },
    { page: 94, note: 'binomiális eloszlás' },
  ],
  estimatedMinutes: 16,
};

// Urna: 12 golyó -> 5 piros, 4 kék, 3 zöld
// a) Visszatevés nélkül 3 golyót húzunk. Mennyi a val., hogy pontosan 2 piros lesz?
//    P = C(5,2)*C(7,1) / C(12,3) = 10*7/220 = 70/220 = 7/22 ≈ 0,3182
// b) Visszatevéssel 4-szer húzunk. Mennyi a val., hogy pontosan 2 kék lesz?
//    p = 4/12 = 1/3, binom(4,2)*p^2*(1-p)^2 = 6 * 1/9 * 4/9 = 24/81 = 8/27 ≈ 0,2963
// c) Visszatevés nélkül 3 golyót húzunk. Mennyi a val., hogy mindhárom KÜLÖNBÖZŐ szín?
//    P = (5*4*3 * 3!) / (12*11*10) hibás -> gondoljuk újra
//    Kedvező: egy piros, egy kék, egy zöld kiválasztása: 5*4*3 = 60 féle rendezett,
//      vagy válogatás: C(5,1)C(4,1)C(3,1) = 60 (rendezetlen kiválasztások száma)
//    Összes: C(12,3) = 220
//    P = 60/220 = 3/11 ≈ 0,2727

function UrnFigure({ stage = 0 }) {
  // Urnát és golyókat rajzolunk
  const reds = [
    { x: 80, y: 140 }, { x: 115, y: 120 }, { x: 150, y: 140 },
    { x: 95, y: 170 }, { x: 135, y: 170 },
  ];
  const blues = [
    { x: 220, y: 130 }, { x: 255, y: 150 }, { x: 200, y: 170 }, { x: 240, y: 180 },
  ];
  const greens = [
    { x: 310, y: 140 }, { x: 345, y: 125 }, { x: 325, y: 175 },
  ];
  return (
    <SvgCanvas width={520} height={260} viewBox="0 0 520 260">
      {/* urna */}
      <path d="M 50 80 L 50 220 Q 50 240 70 240 L 380 240 Q 400 240 400 220 L 400 80"
        fill="#e0f2fe" fillOpacity="0.4" stroke="#0369a1" strokeWidth="2.5" />
      <ellipse cx="225" cy="80" rx="175" ry="16" fill="#bae6fd" fillOpacity="0.4" stroke="#0369a1" strokeWidth="2" />

      {reds.map((p, i) => (
        <circle key={`r${i}`} cx={p.x} cy={p.y} r="14" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      ))}
      {blues.map((p, i) => (
        <circle key={`b${i}`} cx={p.x} cy={p.y} r="14" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
      ))}
      {greens.map((p, i) => (
        <circle key={`g${i}`} cx={p.x} cy={p.y} r="14" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
      ))}

      {/* feliratozás */}
      <text x="440" y="100" fontSize="14" fontWeight="700" fill="#7f1d1d">5 db piros</text>
      <text x="440" y="130" fontSize="14" fontWeight="700" fill="#1e3a8a">4 db kék</text>
      <text x="440" y="160" fontSize="14" fontWeight="700" fill="#14532d">3 db zöld</text>
      <text x="440" y="195" fontSize="14" fontWeight="700" fill="#111827">Össz: 12 db</text>

      {stage === 1 && (
        <text x="225" y="40" fontSize="16" fontWeight="700" textAnchor="middle" fill="#9a3412">
          a) 3 golyó húzása visszatevés NÉLKÜL
        </text>
      )}
      {stage === 2 && (
        <text x="225" y="40" fontSize="16" fontWeight="700" textAnchor="middle" fill="#9a3412">
          b) 4-szeri húzás VISSZATEVÉSSEL
        </text>
      )}
      {stage === 3 && (
        <text x="225" y="40" fontSize="16" fontWeight="700" textAnchor="middle" fill="#9a3412">
          c) 3 KÜLÖNBÖZŐ színű golyó?
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy urnában $12$ golyó van: $5$ piros, $4$ kék és $3$ zöld.

**a)** **Visszatevés nélkül** húzunk $3$ golyót. Mennyi a valószínűsége, hogy pontosan $2$ piros golyót húzunk? ($5$ pont)

**b)** **Visszatevéssel** húzunk négyszer egy-egy golyót. Mennyi a valószínűsége, hogy pontosan $2$ kék lesz a $4$ húzás között? ($4$ pont)

**c)** **Visszatevés nélkül** húzunk $3$ golyót. Mennyi a valószínűsége, hogy mind a három különböző színű lesz? ($4$ pont)

Az eredményeket közönséges tört alakban és négy tizedesjegyre kerekítve is adja meg!`,
  figure: () => <UrnFigure stage={0} />,
  asked: [
    { key: 'a', label: 'a) $P(\\text{pontosan 2 piros}) = ?$' },
    { key: 'b', label: 'b) $P(\\text{pontosan 2 kék}) = ?$' },
    { key: 'c', label: 'c) $P(\\text{három különböző szín}) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A mintatér',
      points: 1,
      body: `Visszatevés nélkül $12$ golyóból $3$-at sorrend nélkül ($\\binom{n}{k}$-val számolunk, mert a sorrend közömbös):

$$\\binom{12}{3} = \\dfrac{12 \\cdot 11 \\cdot 10}{3!} = \\dfrac{1320}{6} = 220.$$

Ez az **összes elemi eset** száma.`,
      figure: () => <UrnFigure stage={1} />,
    },
    {
      title: 'a/2. lépés — A kedvező esetek',
      points: 2,
      body: `"Pontosan 2 piros" azt jelenti: $2$ piros és $1$ nem-piros (a nem-piros golyók száma $4 + 3 = 7$).

- $2$ pirost $5$ közül: $\\binom{5}{2} = 10$ féleképpen,
- $1$ nem-pirosat $7$ közül: $\\binom{7}{1} = 7$ féleképpen.

A két választás független, tehát a **kedvező** esetek száma $10 \\cdot 7 = 70$.`,
    },
    {
      title: 'a/3. lépés — A valószínűség',
      points: 2,
      body: `A klasszikus valószínűség képlete:

$$P(A) = \\dfrac{\\text{kedvező}}{\\text{összes}} = \\dfrac{70}{220} = \\dfrac{7}{22}.$$

Tizedes tört: $\\dfrac{7}{22} \\approx 0{,}3182$.`,
    },
    {
      title: 'b/1. lépés — Visszatevéses kísérlet — binomiális eloszlás',
      points: 1,
      body: `Visszatevéssel minden húzás **független**, és a kék húzásának valószínűsége minden körben ugyanaz:

$$p = \\dfrac{4}{12} = \\dfrac{1}{3}, \\qquad 1 - p = \\dfrac{2}{3}.$$

A $4$ húzásból a kékek száma **binomiális eloszlású**: $X \\sim \\mathrm{Bin}(n = 4,\\ p = 1/3)$.`,
      figure: () => <UrnFigure stage={2} />,
    },
    {
      title: 'b/2. lépés — $P(X = 2)$ számolása',
      points: 3,
      body: `A binomiális eloszlás képlete (fgv. tábla, 94. old.):

$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}.$$

Beírva $n = 4$, $k = 2$, $p = 1/3$:

$$P(X = 2) = \\binom{4}{2} \\cdot \\left(\\dfrac{1}{3}\\right)^2 \\cdot \\left(\\dfrac{2}{3}\\right)^2 = 6 \\cdot \\dfrac{1}{9} \\cdot \\dfrac{4}{9} = \\dfrac{24}{81} = \\dfrac{8}{27}.$$

Tizedes tört: $\\dfrac{8}{27} \\approx 0{,}2963$.`,
    },
    {
      title: 'c/1. lépés — Kedvező esetek három különböző színre',
      points: 2,
      body: `"Három különböző szín" azt jelenti: egy piros + egy kék + egy zöld. A kiválasztás sorrendtől független, tehát

$$\\text{kedvező} = \\binom{5}{1} \\cdot \\binom{4}{1} \\cdot \\binom{3}{1} = 5 \\cdot 4 \\cdot 3 = 60.$$`,
      figure: () => <UrnFigure stage={3} />,
    },
    {
      title: 'c/2. lépés — A valószínűség',
      points: 2,
      body: `Az összes eset ugyanaz, mint a) pontban: $\\binom{12}{3} = 220$.

$$P(C) = \\dfrac{60}{220} = \\dfrac{3}{11} \\approx 0{,}2727.$$

**Ellenőrzés** másik módszerrel — valószínűségi láncszorzat, **bármelyik sorrendben**:

A golyókat egymás után húzva: a $3$ különböző szín **bármilyen sorrendben** jöhet. A feltétel-láncszorzat egy adott sorrendre, pl. piros-kék-zöld: $\\tfrac{5}{12} \\cdot \\tfrac{4}{11} \\cdot \\tfrac{3}{10} = \\tfrac{60}{1320} = \\tfrac{1}{22}$. Mivel $3! = 6$ sorrend van, összesen $6 \\cdot \\tfrac{1}{22} = \\tfrac{6}{22} = \\tfrac{3}{11}$ — egyezik.`,
    },
  ],
  finalAnswer: {
    a: '$P = \\dfrac{7}{22} \\approx 0{,}3182$',
    b: '$P = \\dfrac{8}{27} \\approx 0{,}2963$',
    c: '$P = \\dfrac{3}{11} \\approx 0{,}2727$',
  },
  usedFormulas: [
    'kombináció: $\\binom{n}{k}$',
    'klasszikus valószínűség: $P(A) = k/n$',
    'binomiális eloszlás: $P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$',
    'feltételes láncszorzat',
  ],
};

export default { meta, problem, solution };
