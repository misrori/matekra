import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-12',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 12,
  title: 'Valószínűség — két dobókocka, 6-os és páratlan',
  points: 3,
  topics: ['valószínűség'],
  difficulty: 2,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 93, note: 'kombinatorika — esetszámlálás' },
  ],
  estimatedMinutes: 5,
};

// A 6x6 rács: piros kocka a sorokban (1..6), kék kocka az oszlopokban (1..6).
// Kedvező esemény: (piros=6 ÉS kék páratlan) VAGY (kék=6 ÉS piros páratlan).
function isFavorable(redRow, blueCol) {
  const redIs6 = redRow === 6;
  const blueOdd = blueCol % 2 === 1;
  const blueIs6 = blueCol === 6;
  const redOdd = redRow % 2 === 1;
  return (redIs6 && blueOdd) || (blueIs6 && redOdd);
}

function DiceGrid({ highlight = 'none' }) {
  // highlight: 'none' | 'all' | 'favorable'
  const cell = 40;
  const x0 = 80;
  const y0 = 60;
  const cells = [];
  for (let r = 1; r <= 6; r++) {
    for (let c = 1; c <= 6; c++) {
      const fav = isFavorable(r, c);
      let fill = '#fff';
      if (highlight === 'all') fill = '#e5e7eb';
      if (highlight === 'favorable' && fav) fill = '#fca5a5';
      cells.push(
        <g key={`r${r}c${c}`}>
          <rect
            x={x0 + (c - 1) * cell}
            y={y0 + (r - 1) * cell}
            width={cell}
            height={cell}
            fill={fill}
            stroke="#334155"
            strokeWidth="1"
          />
          <text
            x={x0 + (c - 1) * cell + cell / 2}
            y={y0 + (r - 1) * cell + cell / 2 + 5}
            fontSize="14"
            textAnchor="middle"
            fontWeight={highlight === 'favorable' && fav ? 700 : 400}
            fill={highlight === 'favorable' && fav ? '#7f1d1d' : '#111'}
          >
            ({r},{c})
          </text>
        </g>
      );
    }
  }
  return (
    <SvgCanvas width={420} height={360} viewBox="0 0 420 360">
      {/* Fejlécek */}
      <text x={x0 + 6 * cell / 2} y={30} fontSize="14" fontWeight="700" textAnchor="middle" fill="#1e3a8a">
        Kék kocka (oszlop)
      </text>
      <text
        x={25}
        y={y0 + 6 * cell / 2}
        fontSize="14"
        fontWeight="700"
        textAnchor="middle"
        fill="#b91c1c"
        transform={`rotate(-90 25 ${y0 + 6 * cell / 2})`}
      >
        Piros kocka (sor)
      </text>
      {/* Oszlop-cimkék */}
      {[1, 2, 3, 4, 5, 6].map((c) => (
        <text key={`ch${c}`} x={x0 + (c - 1) * cell + cell / 2} y={y0 - 6} fontSize="12" textAnchor="middle" fill="#1e3a8a">
          {c}
        </text>
      ))}
      {/* Sor-cimkék */}
      {[1, 2, 3, 4, 5, 6].map((r) => (
        <text key={`rh${r}`} x={x0 - 8} y={y0 + (r - 1) * cell + cell / 2 + 4} fontSize="12" textAnchor="end" fill="#b91c1c">
          {r}
        </text>
      ))}
      {cells}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy piros és egy kék színű szabályos dobókockával egyszerre dobunk.
Mennyi a valószínűsége annak, hogy az egyik kockával $6$-ost, a másikkal pedig páratlan számot dobunk?
Megoldását részletezze!`,
  figure: () => <DiceGrid highlight="all" />,
  asked: [{ key: 'P', label: '$P = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az összes lehetséges kimenetel száma',
      points: 1,
      body: `A két megkülönböztethető (piros és kék) kocka dobása egymástól függetlenül $6$-$6$ eredményt adhat. A **szorzási szabály** szerint

$$|\\Omega| = 6 \\cdot 6 = 36.$$

A $36$ kimenetel egyenlően valószínű, így használhatjuk a **klasszikus valószínűségi modellt**:

$$P(A) = \\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}.$$`,
      figure: () => <DiceGrid highlight="all" />,
    },
    {
      title: '2. lépés — A kedvező esetek megszámlálása',
      points: 1,
      body: `Az esemény: *„az egyik kockával 6-ost, a másikkal páratlant dobunk"*.
Két egymást **kizáró** esetre bonthatjuk:

- **I. eset:** piros = $6$, kék páratlan ($1, 3, 5$) → $3$ eset
- **II. eset:** kék = $6$, piros páratlan ($1, 3, 5$) → $3$ eset

(A kettő között nincs átfedés, mivel a $6$ nem páratlan.)

$$\\text{kedvező} = 3 + 3 = 6 \\text{ eset.}$$

Felsorolva: $(6,1),\\ (6,3),\\ (6,5),\\ (1,6),\\ (3,6),\\ (5,6)$ — ahol az első koordináta a piros, a második a kék kocka értéke.`,
      figure: () => <DiceGrid highlight="favorable" />,
    },
    {
      title: '3. lépés — A valószínűség kiszámítása',
      points: 1,
      body: `A klasszikus valószínűségi képlet alapján

$$P = \\frac{6}{36} = \\frac{1}{6} \\approx 0{,}167.$$

**Ellenőrzés.** A komplementer egyszerűbb felírása helyett közvetlenül is láthatjuk az ábrán: a $36$ cellából pontosan $6$ került kiemelésre, ami $\\frac{1}{6}$ arány.`,
      figure: () => <DiceGrid highlight="favorable" />,
    },
  ],
  finalAnswer: { P: '$P = \\dfrac{1}{6} \\approx 0{,}167$' },
  usedFormulas: [
    'klasszikus valószínűség: $P(A) = \\dfrac{\\text{kedvező}}{\\text{összes}}$',
    'szorzási szabály (független kísérletek esetszáma)',
  ],
};

export default { meta, problem, solution };
