import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-16b',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.B',
  number: 16,
  title: 'Kombinatorika — ülésrend, nemzetközi konferencia',
  points: 7,
  topics: ['valószínűség'],
  difficulty: 4,
  fgvt: [
    { page: 93, note: 'permutáció, kombináció' },
  ],
  estimatedMinutes: 12,
};

// Feladat: egy konferencián 10 résztvevő van, 4 nő és 6 férfi. Kerek asztal, 10 szék.
// a) Hányféleképpen ülhet le a 10 ember egy sorba? (2 pt) 10! = 3 628 800
// b) Hányféleképpen ülhetnek le a körasztal köré? (2 pt) 9! = 362 880 (a körforgatást azonosnak vesszük)
// c) Hány sorba rendezés lesz olyan, hogy a 4 nő szomszédos? (3 pt)
//    „Blokkos" módszer: 4 nő mint 1 egység + 6 férfi = 7 egység → 7! ülésrendje, a 4 nő blokkon belül 4! sorrendje.
//    7! * 4! = 5040 * 24 = 120 960.
function TableFigure({ show = 'seats' }) {
  const cx = 260, cy = 170, R = 115;
  const N = 10;
  const seats = [];
  for (let i = 0; i < N; i++) {
    const a = (-Math.PI / 2) + (i / N) * 2 * Math.PI;
    const x = cx + R * Math.cos(a);
    const y = cy + R * Math.sin(a);
    // 4 nő szomszédosan (pl. 0, 1, 2, 3 székek) ha show === 'block'
    const isWoman = show === 'block' ? i < 4 : (i % 3 === 0 && i < 9);
    seats.push({ x, y, isWoman });
  }
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <text x="260" y="24" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Kerek asztal 10 hellyel
      </text>
      {/* Asztal */}
      <circle cx={cx} cy={cy} r="72" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      {/* Székek */}
      {seats.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="18" fill={s.isWoman ? '#fca5a5' : '#bfdbfe'} stroke="#1e3a8a" strokeWidth="1.8" />
          <text x={s.x} y={s.y + 5} fontSize="13" fontWeight="700" textAnchor="middle">
            {s.isWoman ? 'N' : 'F'}
          </text>
        </g>
      ))}
      {/* Legend */}
      <g>
        <circle cx="60" cy="300" r="10" fill="#fca5a5" stroke="#1e3a8a" />
        <text x="76" y="305" fontSize="13">N = nő</text>
        <circle cx="150" cy="300" r="10" fill="#bfdbfe" stroke="#1e3a8a" />
        <text x="166" y="305" fontSize="13">F = férfi</text>
      </g>
      {show === 'block' && (
        <text x="260" y="320" fontSize="14" fontWeight="700" textAnchor="middle" fill="#b91c1c">
          4 nő szomszédosan (egy blokkban)
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy konferencián $10$ résztvevő van: $4$ nő és $6$ férfi.

**a)** Hányféleképpen ülhet le a $10$ résztvevő egy $10$ ülőhelyes **egyenes padba**? ($2$ pont)

**b)** Hányféleképpen ülhetnek le egy **kerek asztal** köré, ha csak a résztvevők egymáshoz viszonyított sorrendje számít (két ültetést azonosnak tekintünk, ha az egyik a másik elforgatásával adódik)? ($2$ pont)

**c)** Az egyenes padra való ültetés során hány olyan sorrend van, amelyben a $4$ nő **egymás mellett** ül? ($3$ pont)`,
  figure: () => <TableFigure show="seats" />,
  asked: [
    { key: 'line', label: 'a) $?$' },
    { key: 'round', label: 'b) $?$' },
    { key: 'block', label: 'c) $?$' },
  ],
};

export const solution = {
  steps: [
    // a)
    {
      title: 'a) 1. lépés — Egyenes padon: permutáció',
      points: 1,
      body: `Ha $10$ különböző ember egy $10$ ülőhelyes sorban ül, akkor az összes sorrend a $10$ elem permutációinak száma:

$$P_{10} = 10!.$$`,
      figure: () => <TableFigure show="seats" />,
    },
    {
      title: 'a) 2. lépés — $10!$ kiszámítása',
      points: 1,
      body: `$$10! = 10 \\cdot 9 \\cdot 8 \\cdot 7 \\cdot 6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 3{\\,}628{\\,}800.$$`,
      figure: () => <TableFigure show="seats" />,
    },

    // b)
    {
      title: 'b) 1. lépés — Körkörös ültetés',
      points: 1,
      body: `Kerek asztal esetén az egymáshoz viszonyított sorrend számít. Rögzítsük az egyik résztvevő helyét (pl. az $1.$ széket) — ezután a maradék $9$ embert $9!$ féleképpen ültethetjük le a többi $9$ székbe.

Egyenértékű meggondolás: a $10!$ sorbarendezést minden $10$-es körforgatás **azonosnak** tekintjük, így elosztjuk $10$-zel:

$$\\dfrac{10!}{10} = 9!.$$`,
      figure: () => <TableFigure show="seats" />,
    },
    {
      title: 'b) 2. lépés — $9!$ kiszámítása',
      points: 1,
      body: `$$9! = 9 \\cdot 8 \\cdot 7 \\cdot 6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 362{\\,}880.$$`,
      figure: () => <TableFigure show="seats" />,
    },

    // c)
    {
      title: 'c) 1. lépés — „Blokkos" módszer',
      points: 1,
      body: `Kössük össze a $4$ nőt egy **blokkba** (tartsuk őket egymás mellett). Ekkor a padra $7$ egység kerül: $6$ férfi + $1$ nő-blokk.

Ez a $7$ egység $7!$ féleképpen rendezhető a pad-sorban.`,
      figure: () => <TableFigure show="block" />,
    },
    {
      title: 'c) 2. lépés — A blokkon belüli sorrend',
      points: 1,
      body: `A blokkon belül a $4$ nő egymáshoz viszonyított sorrendje is számít: $4!$ féleképpen ülhetnek.

A **szorzási szabály** alapján a teljes kedvező sorrend:

$$7! \\cdot 4!.$$`,
      figure: () => <TableFigure show="block" />,
    },
    {
      title: 'c) 3. lépés — Kiszámítás',
      points: 1,
      body: `$$7! = 5040, \\quad 4! = 24.$$

$$7! \\cdot 4! = 5040 \\cdot 24 = 120{\\,}960.$$

**Ellenőrzés a valószínűség oldaláról**: annak valószínűsége, hogy a $4$ nő egymás mellett ül:

$$P = \\dfrac{120\\,960}{3\\,628\\,800} = \\dfrac{1}{30} \\approx 3{,}33\\%.$$

Ez a nagyságrend hihető: egy „specifikus" konfiguráció, ritkán fordul elő véletlenszerű leülésnél.`,
      figure: () => <TableFigure show="block" />,
    },
  ],
  finalAnswer: {
    line: '$10! = 3\\,628\\,800$',
    round: '$9! = 362\\,880$',
    block: '$7! \\cdot 4! = 120\\,960$',
  },
  usedFormulas: [
    'permutáció: $n!$',
    'körkörös permutáció: $(n-1)!$',
    'blokkos módszer + szorzási szabály',
  ],
};

export default { meta, problem, solution };
