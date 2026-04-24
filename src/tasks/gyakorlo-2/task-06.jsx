import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-06',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 6,
  title: 'Gráfelmélet — fokszámok összege',
  points: 2,
  topics: ['gráfelmélet'],
  difficulty: 2,
  fgvt: [{ page: 106, note: 'gráf alapok, fokszám' }],
  estimatedMinutes: 3,
};

// Egy 6 csúcsú egyszerű gráf:
// Csúcsok: A, B, C, D, E, F
// Ismert fokszámok: A:3, B:4, C:2, D:1, E:3  -- F: ?
// Összeg 2|E| = 2 * 8 = 16 (feltesszük, hogy 8 él van)
// Tehát 3+4+2+1+3+F = 16  -> F = 3
// Hmm, ellenőrizzük: páratlan fokszámú csúcsok száma legyen páros.
// A:3(p), B:4, C:2, D:1(p), E:3(p), F:3(p)  -> 4 páratlan (páros) ✓

function GraphDiagram({ highlight = false }) {
  // Csúcsok pozíciói
  const nodes = [
    { id: 'A', x: 120, y: 80, deg: 3 },
    { id: 'B', x: 260, y: 60, deg: 4 },
    { id: 'C', x: 400, y: 80, deg: 2 },
    { id: 'D', x: 420, y: 220, deg: 1 },
    { id: 'E', x: 260, y: 260, deg: 3 },
    { id: 'F', x: 100, y: 220, deg: highlight ? 3 : '?' },
  ];
  // Élek úgy, hogy a fokszámok megfeleljenek:
  // A: B, E, F -> deg 3
  // B: A, C, E, F -> deg 4
  // C: B, D -> deg 2
  // D: C -> deg 1
  // E: A, B, F -> deg 3
  // F: A, B, E -> deg 3
  const edges = [
    ['A', 'B'], ['A', 'E'], ['A', 'F'],
    ['B', 'C'], ['B', 'E'], ['B', 'F'],
    ['C', 'D'],
    ['E', 'F'],
  ];
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      {/* Élek */}
      {edges.map(([u, v], i) => (
        <line
          key={i}
          x1={pos[u].x}
          y1={pos[u].y}
          x2={pos[v].x}
          y2={pos[v].y}
          stroke="#1f2937"
          strokeWidth="2"
        />
      ))}
      {/* Csúcsok */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="20" fill={n.id === 'F' && highlight ? '#fde68a' : '#dbeafe'} stroke="#1e3a8a" strokeWidth="2" />
          <text x={n.x} y={n.y + 5} fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{n.id}</text>
          <text x={n.x} y={n.y - 28} fontSize="12" textAnchor="middle" fill={n.id === 'F' ? '#b91c1c' : '#374151'} fontWeight="bold">
            deg = {n.deg}
          </text>
        </g>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy iskolai gráf-projektben $6$ csúcsú egyszerű gráfot rajzoltak a tanulók. Az ábrán $A$, $B$, $C$, $D$, $E$ csúcsok fokszámai rendre $3, 4, 2, 1, 3$, a $F$ csúcsé pedig ismeretlen. A gráf összesen $8$ élből áll.

Mekkora az $F$ csúcs **fokszáma**? Válaszát indokolja!`,
  figure: () => <GraphDiagram />,
  asked: [{ key: 'degF', label: '$\\deg(F) = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Fokszámösszeg tétele',
      points: 1,
      body: `A gráfban a **fokszámok összege** az élek számának kétszerese (hiszen minden él két csúcs fokszámához járul hozzá eggyel):

$$\\sum_{v} \\deg(v) = 2 \\cdot |E|.$$

Itt $|E| = 8$, tehát:

$$\\deg(A) + \\deg(B) + \\deg(C) + \\deg(D) + \\deg(E) + \\deg(F) = 2 \\cdot 8 = 16.$$`,
    },
    {
      title: '2. lépés — Behelyettesítés és megoldás',
      points: 1,
      body: `Az ismert fokszámok összege:

$$3 + 4 + 2 + 1 + 3 = 13.$$

Így:

$$13 + \\deg(F) = 16 \\ \\Longrightarrow \\ \\deg(F) = 3.$$

**Ellenőrzés (kézfogási lemma):** a páratlan fokszámú csúcsok száma mindig páros. Páratlan fokszámúak: $A(3), D(1), E(3), F(3)$ — ez $4$ csúcs, valóban páros ✓.

Tehát $\\boxed{\\deg(F) = 3}$.`,
      figure: () => <GraphDiagram highlight />,
    },
  ],
  finalAnswer: { degF: '$\\deg(F) = 3$' },
  usedFormulas: [
    'Fokszámösszeg tétele: $\\sum_v \\deg(v) = 2|E|$',
    'Kézfogási lemma: páratlan fokszámú csúcsok száma páros',
  ],
};

export default { meta, problem, solution };
