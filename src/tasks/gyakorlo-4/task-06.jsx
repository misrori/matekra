import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-4-06',
  year: 2024,
  session: 'gyakorló · 4. teszt',
  level: 'közép',
  part: 'I',
  number: 6,
  title: 'Gráf — fokszámösszeg és élszám',
  points: 2,
  topics: ['gráfelmélet'],
  difficulty: 2,
  fgvt: [{ page: 106, note: 'gráf fokszámok' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 9, tolerance: 0.001 },
};

// Egy diákköri gráf: 6 csúcs (A, B, C, D, E, F). Fokszámok: A=2, B=4, C=3, D=3, E=2, F=4. Sum = 18 → él = 9.
const NODES = [
  { id: 'A', x: 120, y: 80, deg: 2 },
  { id: 'B', x: 260, y: 70, deg: 4 },
  { id: 'C', x: 400, y: 80, deg: 3 },
  { id: 'D', x: 120, y: 240, deg: 3 },
  { id: 'E', x: 260, y: 260, deg: 2 },
  { id: 'F', x: 400, y: 240, deg: 4 },
];
// 9 él, amely ezeket a fokszámokat adja.
// Élek: AB, BC, BF, BD, CF, DE, EF, AD, CE. Ellenőrzés: A:{B,D}=2, B:{A,C,F,D}=4,
// C:{B,F,E}=3, D:{B,E,A}=3, E:{D,F,C}=3 (hm, E-nek 3 kell hogy 2 legyen),
// Javítsuk: AB, BC, BF, BD, CF, DE, EF, AD. E:{D,F}=2, A:{B,D}=2, B:{A,C,F,D}=4,
// C:{B,F}=2 (de C=3 kell). Add CE: C:{B,F,E}=3, E:{D,F,C}=3 — túl magas.
// Próbálkozzunk: él: AB, BC, BD, BF, CF, CE, DE, EF, AD.
// A: B,D = 2 ✓. B: A,C,D,F = 4 ✓. C: B,F,E = 3 ✓. D: B,E,A = 3 ✓. E: C,D,F = 3 ✗ (kell 2).
// Megint. Próbáljuk: AB, BC, BD, BF, CF, CE, DE, AD.
// A: B,D = 2. B: A,C,D,F = 4. C: B,F,E = 3. D: B,E,A = 3. E: C,D = 2. F: B,C = 2 (kell 4). Nem jó.
// Lépjünk vissza — fokszámsorozatot módosítsunk: A=2, B=4, C=3, D=3, E=2, F=4, összeg = 18 → 9 él.
// Próbálkozás: AB, AF, BC, BD, BE, CF, CD, DF, EF.
// A: B,F = 2 ✓. B: A,C,D,E = 4 ✓. C: B,F,D = 3 ✓. D: B,C,F = 3 ✓. E: B,F = 2 ✓. F: A,C,D,E = 4 ✓.
// Élek: [A,B],[A,F],[B,C],[B,D],[B,E],[C,F],[C,D],[D,F],[E,F].
const EDGES = [
  ['A', 'B'], ['A', 'F'], ['B', 'C'], ['B', 'D'], ['B', 'E'],
  ['C', 'F'], ['C', 'D'], ['D', 'F'], ['E', 'F'],
];

function GraphFigure({ highlightEdges = false }) {
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <text x="260" y="24" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Diákkör-gráf (csúcsok: $6$, élek: $?$)
      </text>
      {EDGES.map(([u, v], i) => (
        <line key={i}
          x1={byId[u].x} y1={byId[u].y}
          x2={byId[v].x} y2={byId[v].y}
          stroke={highlightEdges ? '#dc2626' : '#1e40af'}
          strokeWidth={highlightEdges ? 3 : 2}
        />
      ))}
      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="18" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
          <text x={n.x} y={n.y + 5} fontSize="15" fontWeight="700" textAnchor="middle" fill="#92400e">{n.id}</text>
          <text x={n.x} y={n.y - 24} fontSize="12" fontWeight="700" textAnchor="middle" fill="#1e3a8a">deg={n.deg}</text>
        </g>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy iskolai szakkör $6$ tagja baráti kapcsolatot tart egymással az alábbi gráf szerint. A csúcsok mellett a fokszámok (vagyis az adott csúcs **szomszédainak száma**) szerepelnek:

| csúcs | $A$ | $B$ | $C$ | $D$ | $E$ | $F$ |
|---|---|---|---|---|---|---|
| fokszám | $2$ | $4$ | $3$ | $3$ | $2$ | $4$ |

Hány **éle** van a gráfnak (azaz hány baráti párkapcsolat áll fenn)?`,
  figure: () => <GraphFigure />,
  asked: [{ key: 'el', label: 'élek száma $= ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Fokszámösszeg tétele',
      points: 1,
      body: `**Tétel** (fgv. tábla 106. old.): egy egyszerű gráf csúcsainak fokszámösszege az élek számának **kétszerese**:

$$\\sum_{v} \\deg(v) = 2 \\cdot |E|.$$

Ennek oka: minden él **két** csúcs fokszámához egy-egy egységet ad.`,
      figure: () => <GraphFigure />,
    },
    {
      title: '2. lépés — Behelyettesítés',
      points: 1,
      body: `Fokszámösszeg:

$$2 + 4 + 3 + 3 + 2 + 4 = 18.$$

Tehát:

$$2 \\cdot |E| = 18 \\;\\Rightarrow\\; |E| = 9.$$

A gráfnak **$9$** éle van.`,
      figure: () => <GraphFigure highlightEdges />,
    },
  ],
  finalAnswer: { el: '$|E| = 9$' },
  usedFormulas: ['fokszámösszeg: $\\sum \\deg(v) = 2|E|$'],
};

export default { meta, problem, solution };
