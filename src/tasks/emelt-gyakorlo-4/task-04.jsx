import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-4-04',
  year: 2024,
  session: 'emelt gyakorló · 4. teszt',
  level: 'emelt',
  part: 'I',
  number: 4,
  title: 'Ciklikus permutáció — kerek asztal',
  points: 13,
  topics: ['valószínűség'],
  difficulty: 3,
  fgvt: [{ page: 93, note: 'kombinatorika: permutáció' }],
  estimatedMinutes: 15,
};

/**
 *  8 ember ül le egy kerek asztalhoz (a forgatással egymásba vihető sorrendeket
 *  azonosnak tekintjük).
 *
 *  a) Összes leülés: (8-1)! = 7! = 5040
 *  b) Anna (A) és Bence (B) szomszédos: blokk összehúzás
 *     (7-1)! * 2! = 6! * 2 = 720 * 2 = 1440
 *  c) Anna és Bence NEM szomszédos: 5040 - 1440 = 3600
 *  d) 4 fiú és 4 lány felváltva ülnek: rögzítsünk egy fiút (forgatás miatt),
 *     a többi 3 fiú 3!, a 4 lány 4! módon ülhet.
 *     3! * 4! = 6 * 24 = 144
 */

function Table({ mode = 'all' }) {
  const cx = 200, cy = 150, r = 100;
  const people = [];
  for (let i = 0; i < 8; i++) {
    const a = (-Math.PI / 2) + (2 * Math.PI * i) / 8;
    people.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), a, idx: i });
  }
  const labels = mode === 'ab'
    ? ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    : mode === 'gender'
    ? ['F', 'L', 'F', 'L', 'F', 'L', 'F', 'L']
    : ['1', '2', '3', '4', '5', '6', '7', '8'];
  const colors = mode === 'ab'
    ? people.map((p, i) => (i === 0 || i === 1 ? '#dc2626' : '#64748b'))
    : mode === 'gender'
    ? people.map((p, i) => (i % 2 === 0 ? '#1d4ed8' : '#db2777'))
    : people.map(() => '#334155');

  return (
    <SvgCanvas width={420} height={320} viewBox="0 0 420 320">
      {/* asztal */}
      <circle cx={cx} cy={cy} r={r - 35} fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      <text x={cx} y={cy + 4} fontSize="13" textAnchor="middle" fill="#78350f" fontWeight="700">asztal</text>
      {/* székek */}
      {people.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="18" fill={colors[i]} />
          <text x={p.x} y={p.y + 5} fontSize="14" fontWeight="700" fill="#fff" textAnchor="middle">{labels[i]}</text>
        </g>
      ))}
      {/* szomszédossági ív A és B között */}
      {mode === 'ab' && (
        <path
          d={`M ${people[0].x} ${people[0].y} Q ${cx + (r + 30) * Math.cos(-Math.PI / 2 + Math.PI / 8)} ${cy + (r + 30) * Math.sin(-Math.PI / 2 + Math.PI / 8)} ${people[1].x} ${people[1].y}`}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          strokeDasharray="4 3"
        />
      )}
      <text x={210} y={20} fontSize="14" fontWeight="700" fill="#111" textAnchor="middle">
        {mode === 'ab' ? 'A és B szomszédos' : mode === 'gender' ? 'Felváltva fiú–lány' : '8 ember kerek asztalnál'}
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy kerek asztalhoz $8$ ember ül le. A **forgatással egymásba vihető ülésrendet azonosnak** tekintjük.

**a)** Hányféleképpen ülhetnek le az asztalhoz? ($2$ pont)

**b)** Anna és Bence is a $8$ ember között van. Hányféle ülésrendben **szomszédosak**? ($4$ pont)

**c)** Hányféle ülésrendben **nem szomszédosak** Anna és Bence? ($3$ pont)

**d)** A $8$ ember között $4$ fiú és $4$ lány van. Hányféleképpen ülhetnek le úgy, hogy **fiúk és lányok felváltva** kövessék egymást? ($4$ pont)`,
  figure: () => <Table mode="all" />,
  asked: [
    { key: 'a', label: 'a) összes elrendezés' },
    { key: 'b', label: 'b) A és B szomszédos' },
    { key: 'c', label: 'c) A és B nem szomszédos' },
    { key: 'd', label: 'd) fiú–lány váltakozva' },
  ],
  check: { type: 'number', value: 5040 },
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Ciklikus permutáció',
      points: 2,
      body: `$n$ ember **kerek** asztal körüli leültetéseinek száma (a forgatástól függetlenül) $(n-1)!$.

*Magyarázat:* egy „szabványos" lineáris permutáció $n!$ féle, de egy kör körüli elrendezés $n$ különböző forgatása ugyanaz, ezért osztunk $n$-nel.

$n = 8$:

$$(8-1)! = 7! = 5040.$$

$$\\boxed{a)\\ 5040\\ \\text{féleképpen.}}$$`,
      figure: () => <Table mode="all" />,
    },
    {
      title: 'b/1. lépés — A "blokk-trükk"',
      points: 2,
      body: `Ha Anna és Bence szomszédosak, ragasszuk össze őket egyetlen **blokká** (AB). Így már nem $8$, hanem $7$ egységet kell elhelyeznünk a kerek asztalnál:

$$(7-1)! = 6! = 720 \\ \\text{féleképpen.}$$

**De vigyázat:** a blokkon belül Anna és Bence kétféleképpen helyezkedhet el: AB vagy BA. Ez további $2! = 2$ szorzótényező.`,
      figure: () => <Table mode="ab" />,
    },
    {
      title: 'b/2. lépés — Az eredmény',
      points: 2,
      body: `$$\\text{szomszédos} = (7-1)! \\cdot 2! = 720 \\cdot 2 = 1440.$$

$$\\boxed{b)\\ 1440\\ \\text{olyan ülésrend van, amelyben Anna és Bence szomszédos.}}$$

**Arány:** $\\dfrac{1440}{5040} = \\dfrac{2}{7} \\approx 28{,}6\\%$. Ez jól illeszkedik az intuícióhoz: egy adott emberhez $8-1 = 7$ másik ember lehetne „a szomszéd"; a $8$-ból $2$ szomszédot lehet választani, tehát a „másik konkrét személy szomszéd" valószínűség $\\tfrac{2}{7}$.`,
    },
    {
      title: 'c) lépés — A komplementer',
      points: 3,
      body: `A „nem szomszédos" eset az összes elrendezésből kivonva a „szomszédos" esetet:

$$\\text{nem szomszédos} = 5040 - 1440 = 3600.$$

$$\\boxed{c)\\ 3600\\ \\text{olyan ülésrend van.}}$$`,
    },
    {
      title: 'd/1. lépés — Felváltva ülés fiú–lány',
      points: 2,
      body: `A körpálya körül két „parkettaminta" lehetséges, de **forgatás** miatt egyetlen mintát kell tekintenünk. Rögzítsünk egy fiút a „$12$-es" helyen (ez kiküszöböli a $8$-szoros forgatási szimmetriát).

Ekkor a páros helyeket ($2., 4., 6., 8.$) kell lányokkal, a páratlanokat ($3., 5., 7.$ — mert $1.$ már foglalt) a maradék $3$ fiúval kitöltenünk.`,
      figure: () => <Table mode="gender" />,
    },
    {
      title: 'd/2. lépés — Az eredmény',
      points: 2,
      body: `- A maradék $3$ fiú elhelyezése a $3$ „fiú-helyen": $3! = 6$ féleképpen.
- A $4$ lány elhelyezése a $4$ „lány-helyen": $4! = 24$ féleképpen.

$$3! \\cdot 4! = 6 \\cdot 24 = 144.$$

$$\\boxed{d)\\ 144\\ \\text{olyan ülésrend van, amelyben a nemek felváltva ülnek.}}$$

**Megjegyzés:** ha lineáris asztalról lenne szó (nem kerek), akkor **két minta** (F–L–F–L… és L–F–L–F…) is lehetne, ami $2 \\cdot 4! \\cdot 4! = 1152$. A kerek elrendezés kétszeresen megfogja ezt a szimmetriát, innen a $144$-es érték.`,
    },
  ],
  finalAnswer: {
    a: '$5040$',
    b: '$1440$',
    c: '$3600$',
    d: '$144$',
  },
  usedFormulas: [
    'ciklikus permutáció: $(n-1)!$',
    'blokk-módszer',
    'komplementer elv',
  ],
};

export default { meta, problem, solution };
