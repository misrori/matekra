import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-06',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 6,
  title: 'Gráf megadott fokszámokkal',
  points: 2,
  topics: ['gráfelmélet'],
  difficulty: 1,
  fgvt: [{ page: 106, note: 'gráf, fokszám' }],
  estimatedMinutes: 3,
};

// Konstrukció: 6 csúcs (A, B, C, D, E, F) úgy, hogy a fokszámok 5, 4, 3, 2, 2, 2.
// Egy lehetséges (és az útmutatóban is ekvivalens) gráf:
//   A (fok 5): kössük össze B, C, D, E, F mindegyikével
//   B (fok 4): A + 3 másik, legyen C, D, E  -> B kapcsolatai: A, C, D, E
//   C (fok 3): A + B (már megvannak) + 1 másik -> C kapcsolata: A, B, D -> D fokszáma már 3 lenne!
// Módosítás — tervezzünk pontosan:
//  élek halmaza: A–B, A–C, A–D, A–E, A–F, B–C, B–D, B–E, C–D
//   -> fokszámok:
//      A: {B,C,D,E,F} = 5  ✓
//      B: {A,C,D,E}   = 4  ✓
//      C: {A,B,D}     = 3  ✓
//      D: {A,B,C}     = 3  ✗ (kell 2)
// Újratervezés — legyen C-nek csak 3 szomszédja, de ne legyen D-vel:
//  élek: A–B, A–C, A–D, A–E, A–F, B–C, B–D, B–E, B-?  -- B-nek 4 kell, A,C,D,E már van.
//  C-nek 3 kell: A, B, és még egy. Legyen C–F.
//  Akkor:
//      A: {B,C,D,E,F} = 5  ✓
//      B: {A,C,D,E}   = 4  ✓
//      C: {A,B,F}     = 3  ✓
//      D: {A,B}       = 2  ✓
//      E: {A,B}       = 2  ✓
//      F: {A,C}       = 2  ✓
// Összeg: 5+4+3+2+2+2 = 18 = 2·9 élek.
// Élek: A–B, A–C, A–D, A–E, A–F, B–C, B–D, B–E, C–F.  (9 él)
// Remek, ezt rajzoljuk.

const nodes = [
  // Kör mentén elhelyezett 6 csúcs, középpont (240, 140), sugár 100.
  { id: 'A', x: 240, y: 40, deg: 5 },
  { id: 'B', x: 327, y: 90, deg: 4 },
  { id: 'C', x: 327, y: 190, deg: 3 },
  { id: 'D', x: 240, y: 240, deg: 2 },
  { id: 'E', x: 153, y: 190, deg: 2 },
  { id: 'F', x: 153, y: 90, deg: 2 },
];

const edges = [
  ['A', 'B'],
  ['A', 'C'],
  ['A', 'D'],
  ['A', 'E'],
  ['A', 'F'],
  ['B', 'C'],
  ['B', 'D'],
  ['B', 'E'],
  ['C', 'F'],
];

function nodeById(id) {
  return nodes.find((n) => n.id === id);
}

function GraphFigure({ mode = 'points' }) {
  // mode: 'points' -> csak 6 csúcs (feladat)
  //       'edges'  -> teljes gráf (megoldás)
  //       'highlight' -> csúcsok + élek, fokszámok színezve
  const showEdges = mode !== 'points';
  const showDeg = mode === 'highlight' || mode === 'edges';

  const degColor = (deg) => {
    if (deg === 5) return '#dc2626';
    if (deg === 4) return '#ea580c';
    if (deg === 3) return '#ca8a04';
    return '#2563eb';
  };

  return (
    <SvgCanvas width={480} height={280} viewBox="0 0 480 280">
      {/* Élek */}
      {showEdges && edges.map(([u, v], i) => {
        const nu = nodeById(u);
        const nv = nodeById(v);
        return (
          <line
            key={`e${i}`}
            x1={nu.x}
            y1={nu.y}
            x2={nv.x}
            y2={nv.y}
            stroke="#374151"
            strokeWidth={2}
          />
        );
      })}

      {/* Csúcsok */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={18}
            fill={showDeg ? degColor(n.deg) : '#e5e7eb'}
            stroke="#111827"
            strokeWidth={2}
          />
          <text
            x={n.x}
            y={n.y + 5}
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            fill={showDeg ? '#ffffff' : '#111827'}
          >
            {n.id}
          </text>
          {showDeg && (
            <text
              x={n.x + (n.x > 240 ? 26 : n.x < 240 ? -26 : 0)}
              y={n.y - 22}
              fontSize="13"
              textAnchor={n.x > 240 ? 'start' : n.x < 240 ? 'end' : 'middle'}
              fill={degColor(n.deg)}
              fontWeight="bold"
            >
              fok: {n.deg}
            </text>
          )}
        </g>
      ))}

      {/* Cím / infó */}
      {mode === 'points' && (
        <text x={240} y={270} fontSize="12" textAnchor="middle" fill="#6b7280">
          6 csúcs — élek nélkül
        </text>
      )}
      {mode === 'edges' && (
        <text x={240} y={270} fontSize="12" textAnchor="middle" fill="#6b7280">
          9 él; fokszámok: 5, 4, 3, 2, 2, 2
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Rajzoljon egy olyan hatpontú egyszerű gráfot, melyben a csúcsok fokszámai $5,\\ 4,\\ 3,\\ 2,\\ 2,\\ 2$!`,
  figure: () => <GraphFigure mode="points" />,
  asked: [{ key: 'graph', label: 'Megfelelő gráf rajza (6 csúcs, megadott fokszámokkal)' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Teljesíthetőség ellenőrzése (fokszámösszeg-tétel)',
      points: 0,
      body: `A **fokszámösszeg tétele** szerint minden gráfban:

$$\\sum_{v} \\deg(v) = 2 \\cdot |E|,$$

ahol $|E|$ az élek száma. Ez azt jelenti, hogy a fokszámok összege mindig **páros** kell legyen, és az élek száma ennek a fele.

Adott fokszámok: $5, 4, 3, 2, 2, 2$.

Összeg: $5 + 4 + 3 + 2 + 2 + 2 = 18$ — **páros** ✓

Élek száma: $|E| = 18 / 2 = 9$.

Tehát a gráfunk (ha létezik) $9$ élű lesz.`,
      figure: () => <GraphFigure mode="points" />,
    },
    {
      title: '2. lépés — Konkrét gráf megkonstruálása',
      points: 2,
      body: `Nevezzük el a csúcsokat $A, B, C, D, E, F$ úgy, hogy rendre a fokszámuk $5, 4, 3, 2, 2, 2$ legyen. Építsük fel az éleket a legnagyobb fokszámú csúccsal kezdve:

- **$A$ (fokszám $5$):** egy $6$ csúcsú egyszerű gráfban legfeljebb $5$ szomszédja lehet, ezért $A$-t összekötjük **mindenki mással**: élei $A{-}B,\\ A{-}C,\\ A{-}D,\\ A{-}E,\\ A{-}F$. (5 él)
- **$B$ (fokszám $4$):** $B$-nek már van $1$ éle ($A$-val), még $3$ kell. Vegyük fel a $B{-}C,\\ B{-}D,\\ B{-}E$ éleket. (összesen 8 él)
- **$C$ (fokszám $3$):** $C$-nek most $A, B$ a szomszédai — ez $2$. Még $1$ kell. Vegyük fel: $C{-}F$. (összesen 9 él)
- **$D$ (fokszám $2$):** $D$-nek már $A, B$ — pont $2$. ✓
- **$E$ (fokszám $2$):** $E$-nek már $A, B$ — pont $2$. ✓
- **$F$ (fokszám $2$):** $F$-nek $A, C$ — pont $2$. ✓

Ez megfelel a követelménynek. Élek száma: $9$, fokszámösszeg $18$. ✓

Egy ilyen gráf rajzát az ábra mutatja.`,
      figure: () => <GraphFigure mode="edges" />,
    },
    {
      title: '3. lépés — Ellenőrzés csúcsonként',
      points: 0,
      body: `Minden csúcsnál olvassuk le a fokszámot (a belőle kiinduló élek száma):

- $A$: szomszédai $B, C, D, E, F$ — **fokszám $5$** ✓
- $B$: szomszédai $A, C, D, E$ — **fokszám $4$** ✓
- $C$: szomszédai $A, B, F$ — **fokszám $3$** ✓
- $D$: szomszédai $A, B$ — **fokszám $2$** ✓
- $E$: szomszédai $A, B$ — **fokszám $2$** ✓
- $F$: szomszédai $A, C$ — **fokszám $2$** ✓

A fokszámok rendre $5, 4, 3, 2, 2, 2$ — a feladat minden feltételét teljesíti.

**Megjegyzés:** Nem ez az egyetlen helyes megoldás; más élkiosztások is vezethetnek ugyanerre a fokszám-sorozatra.`,
      figure: () => <GraphFigure mode="highlight" />,
    },
  ],
  finalAnswer: 'Egy megfelelő gráf élei: $AB, AC, AD, AE, AF, BC, BD, BE, CF$ (9 él, fokszámok: $A{=}5, B{=}4, C{=}3, D{=}2, E{=}2, F{=}2$).',
  usedFormulas: [
    'fokszámösszeg tétele: $\\sum \\deg(v) = 2 |E|$',
    'egyszerű gráf: nincs hurokél és nincs többszörös él',
  ],
};

export default { meta, problem, solution };
