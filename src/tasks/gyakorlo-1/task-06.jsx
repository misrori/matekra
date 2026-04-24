import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-06',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 6,
  title: 'Fokszámösszeg gráfban',
  points: 2,
  topics: ['gráfelmélet'],
  difficulty: 2,
  fgvt: [{ page: 106, note: 'gráf alapok' }],
  estimatedMinutes: 3,
};

// Egyszerű gráf 6 csúcson: A B C D E F
// Fokszámok: A=3, B=4, C=2, D=3, E=2, F=2 → összeg 16 → 8 él
// Élek: A-B, A-C, A-D, B-C, B-E, B-D, D-F, E-F  → 8 él

const V = {
  A: { x: 100, y: 80 },
  B: { x: 260, y: 50 },
  C: { x: 180, y: 170 },
  D: { x: 380, y: 120 },
  E: { x: 340, y: 220 },
  F: { x: 200, y: 260 },
};
const EDGES = [
  ['A', 'B'],
  ['A', 'C'],
  ['A', 'D'],
  ['B', 'C'],
  ['B', 'E'],
  ['B', 'D'],
  ['D', 'F'],
  ['E', 'F'],
];

function Graph() {
  return (
    <SvgCanvas width={480} height={320} viewBox="0 0 480 320">
      {EDGES.map(([u, v], i) => (
        <line
          key={i}
          x1={V[u].x}
          y1={V[u].y}
          x2={V[v].x}
          y2={V[v].y}
          stroke="#374151"
          strokeWidth="2"
        />
      ))}
      {Object.entries(V).map(([name, p]) => (
        <g key={name}>
          <circle cx={p.x} cy={p.y} r="14" fill="#dbeafe" stroke="#1e3a8a" strokeWidth="2" />
          <text x={p.x} y={p.y + 5} fontSize="14" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">
            {name}
          </text>
        </g>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az ábrán egy egyszerű gráf látható, melynek $6$ csúcsa van: $A$, $B$, $C$, $D$, $E$, $F$.

**a)** Adja meg az összes csúcs fokszámát!

**b)** Hány éle van a gráfnak?`,
  figure: () => <Graph />,
  asked: [
    { key: 'deg', label: 'Fokszámok felsorolása' },
    { key: 'edges', label: 'Élek száma $|E| = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A csúcsok fokszámának leolvasása',
      points: 1,
      body: `Egy csúcs **fokszáma** a rá illeszkedő élek száma. Számoljuk össze a rajzról, melyik csúcsból hány él indul:

- $A$ → $A$–$B$, $A$–$C$, $A$–$D$ &nbsp; ⇒ &nbsp; $\\deg(A) = 3$
- $B$ → $B$–$A$, $B$–$C$, $B$–$E$, $B$–$D$ &nbsp; ⇒ &nbsp; $\\deg(B) = 4$
- $C$ → $C$–$A$, $C$–$B$ &nbsp; ⇒ &nbsp; $\\deg(C) = 2$
- $D$ → $D$–$A$, $D$–$B$, $D$–$F$ &nbsp; ⇒ &nbsp; $\\deg(D) = 3$
- $E$ → $E$–$B$, $E$–$F$ &nbsp; ⇒ &nbsp; $\\deg(E) = 2$
- $F$ → $F$–$D$, $F$–$E$ &nbsp; ⇒ &nbsp; $\\deg(F) = 2$`,
    },
    {
      title: '2. lépés — Az élek száma a fokszámösszeg-tételből',
      points: 1,
      body: `A **fokszámösszeg tétele** (fgv. tábla 106. old.):

$$\\sum_v \\deg(v) = 2 \\cdot |E|,$$

azaz a csúcsok fokszámainak összege az élek számának kétszerese (mivel minden él pontosan két csúcs fokszámát növeli).

A fokszámok összege:

$$3 + 4 + 2 + 3 + 2 + 2 = 16.$$

Innen:

$$|E| = \\dfrac{16}{2} = 8.$$

**Ellenőrzés:** a páratlan fokszámú csúcsok $A$ és $D$ — **pontosan két darab** (páros szám), ami a kézfogási lemmának megfelel. ✓`,
    },
  ],
  finalAnswer: {
    deg: '$\\deg(A)=3,\\ \\deg(B)=4,\\ \\deg(C)=2,\\ \\deg(D)=3,\\ \\deg(E)=2,\\ \\deg(F)=2$',
    edges: '$|E| = 8$',
  },
  usedFormulas: [
    'fokszámösszeg-tétel: $\\sum \\deg(v) = 2|E|$',
    'kézfogási lemma: páratlan fokszámú csúcsok száma páros',
  ],
};

export default { meta, problem, solution };
