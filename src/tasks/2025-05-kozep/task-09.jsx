import { SvgCanvas, Arrow } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-09',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 9,
  title: 'Vektorok felírása szabályos hatszögben',
  points: 3,
  topics: ['vektor', 'síkgeometria'],
  difficulty: 2,
  fgvt: [
    { page: 82, note: 'vektorok' },
    { page: 86, note: 'vektorműveletek' },
  ],
  estimatedMinutes: 4,
};

// A szabályos hatszög középpontja és csúcsai
const CX = 240;
const CY = 150;
const R = 100;
const H = R * Math.sqrt(3) / 2; // ≈ 86,6

// Csúcsok (az óramutató járásával megegyező körüljárás, B bal oldalt)
const V = {
  A: { x: CX - R / 2, y: CY - H }, // fent-balra
  F: { x: CX + R / 2, y: CY - H }, // fent-jobbra
  E: { x: CX + R, y: CY }, // jobb oldalt
  D: { x: CX + R / 2, y: CY + H }, // lent-jobbra
  C: { x: CX - R / 2, y: CY + H }, // lent-balra
  B: { x: CX - R, y: CY }, // bal oldalt
  O: { x: CX, y: CY }, // középpont
};

function HexFigure({ step = 0 }) {
  // step: 0 = alapábra a vektorokkal; 1 = CA kiemelve (CB + BA); 2 = BE kiemelve 2(c - a) felbontással
  const hexPath = `M ${V.A.x} ${V.A.y} L ${V.F.x} ${V.F.y} L ${V.E.x} ${V.E.y} L ${V.D.x} ${V.D.y} L ${V.C.x} ${V.C.y} L ${V.B.x} ${V.B.y} Z`;

  return (
    <SvgCanvas width={480} height={320} viewBox="0 0 480 320">
      {/* Hatszög */}
      <path d={hexPath} fill="#f8fafc" stroke="#1a1a1a" strokeWidth="1.6" />

      {/* Csúcspont-jelölők és feliratok */}
      {Object.entries(V).map(([name, p]) => (
        <g key={name}>
          <circle cx={p.x} cy={p.y} r="3" fill="#1a1a1a" />
        </g>
      ))}
      {/* Betűk kicsit távolabb a csúcsoktól */}
      <text x={V.A.x - 12} y={V.A.y - 6} fontSize="16" fontWeight="bold" fill="#1a1a1a">A</text>
      <text x={V.F.x + 6} y={V.F.y - 6} fontSize="16" fontWeight="bold" fill="#1a1a1a">F</text>
      <text x={V.E.x + 8} y={V.E.y + 5} fontSize="16" fontWeight="bold" fill="#1a1a1a">E</text>
      <text x={V.D.x + 6} y={V.D.y + 18} fontSize="16" fontWeight="bold" fill="#1a1a1a">D</text>
      <text x={V.C.x - 14} y={V.C.y + 18} fontSize="16" fontWeight="bold" fill="#1a1a1a">C</text>
      <text x={V.B.x - 16} y={V.B.y + 5} fontSize="16" fontWeight="bold" fill="#1a1a1a">B</text>
      <text x={V.O.x + 6} y={V.O.y - 6} fontSize="13" fill="#6b7280">O</text>
      <circle cx={V.O.x} cy={V.O.y} r="2" fill="#6b7280" />

      {/* Alap vektorok: a = BA (piros), c = BC (zöld) */}
      <Arrow x1={V.B.x} y1={V.B.y} x2={V.A.x} y2={V.A.y} stroke="#dc2626" strokeWidth={2.5} id="vec-a" />
      <Arrow x1={V.B.x} y1={V.B.y} x2={V.C.x} y2={V.C.y} stroke="#059669" strokeWidth={2.5} id="vec-c" />
      {/* a, c feliratok */}
      <text x={(V.B.x + V.A.x) / 2 - 14} y={(V.B.y + V.A.y) / 2 - 6} fontSize="15" fontWeight="bold" fill="#dc2626">
        a
      </text>
      <text x={(V.B.x + V.C.x) / 2 - 16} y={(V.B.y + V.C.y) / 2 + 16} fontSize="15" fontWeight="bold" fill="#059669">
        c
      </text>

      {/* Step 1: CA vektor felbontása: CB + BA */}
      {step === 1 && (
        <g>
          {/* CB: C-ből B-be (a c ellentettje) */}
          <Arrow x1={V.C.x} y1={V.C.y} x2={V.B.x} y2={V.B.y} stroke="#ca8a04" strokeWidth={2.5} id="vec-cb" />
          {/* BA: már létezik (a), de újra húzzuk sárgával nem, inkább hagyjuk */}
          {/* CA eredő: C → A */}
          <Arrow x1={V.C.x} y1={V.C.y} x2={V.A.x} y2={V.A.y} stroke="#7c3aed" strokeWidth={3} id="vec-ca" />
          <text x={V.C.x + 10} y={V.C.y - 30} fontSize="14" fontWeight="bold" fill="#7c3aed">
            CA = a − c
          </text>
          <text x={(V.C.x + V.B.x) / 2 - 20} y={(V.C.y + V.B.y) / 2 - 6} fontSize="13" fill="#ca8a04">
            −c
          </text>
        </g>
      )}

      {/* Step 2: BE vektor = 2(c - a) */}
      {step === 2 && (
        <g>
          {/* BE főátló */}
          <Arrow x1={V.B.x} y1={V.B.y} x2={V.E.x} y2={V.E.y} stroke="#7c3aed" strokeWidth={3} id="vec-be" />
          {/* Középpont O kiemelése */}
          <circle cx={V.O.x} cy={V.O.y} r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
          {/* Jelöljük, hogy BO = c - a (félig a BE vektor) */}
          <text x={V.B.x + 20} y={V.B.y + 25} fontSize="13" fontWeight="bold" fill="#7c3aed">
            BO = c − a
          </text>
          <text x={V.E.x - 130} y={V.E.y - 14} fontSize="14" fontWeight="bold" fill="#7c3aed">
            BE = 2(c − a) = 2c − 2a
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az ábrán látható $ABCDEF$ szabályos hatszögben $\\vec{a} = \\overrightarrow{BA}$ és $\\vec{c} = \\overrightarrow{BC}$.

Fejezze ki $\\vec{a}$ és $\\vec{c}$ vektorok segítségével a $\\overrightarrow{CA}$ és $\\overrightarrow{BE}$ vektorokat!`,
  figure: () => <HexFigure step={0} />,
  asked: [
    { key: 'CA', label: '$\\overrightarrow{CA} = ?$' },
    { key: 'BE', label: '$\\overrightarrow{BE} = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Alapábra és jelölések',
      points: 0,
      body: `A szabályos hatszög középpontját jelöljük $O$-val. A hatszög tulajdonságai közül felhasználjuk, hogy

- az átellenes csúcsokat összekötő **főátlók** az $O$ középponton mennek át és kétszer akkorák, mint az oldalak (egy szabályos hatszögben a sugár = oldalhossz);
- az $\\overrightarrow{BO}$ vektort felírhatjuk $\\vec{a}$ és $\\vec{c}$ segítségével.

Két megadott vektor:

- $\\vec{a} = \\overrightarrow{BA}$ (piros nyíl $B \\to A$),
- $\\vec{c} = \\overrightarrow{BC}$ (zöld nyíl $B \\to C$).

A vektorokkal kapcsolatos két alapelvet fogjuk alkalmazni:

- **háromszög-szabály:** $\\overrightarrow{XZ} = \\overrightarrow{XY} + \\overrightarrow{YZ}$,
- **irányváltás:** $\\overrightarrow{YX} = -\\overrightarrow{XY}$.`,
      figure: () => <HexFigure step={0} />,
    },
    {
      title: '2. lépés — A $\\overrightarrow{CA}$ vektor kifejezése',
      points: 1,
      body: `A $C$ pontból az $A$ pontba közvetlenül nem ismerjük a vektort, de a $B$ ponton keresztül „átvezetve" bontsuk fel két részre a **háromszög-szabály** szerint:

$$\\overrightarrow{CA} = \\overrightarrow{CB} + \\overrightarrow{BA}.$$

Tudjuk, hogy

$$\\overrightarrow{CB} = -\\overrightarrow{BC} = -\\vec{c}, \\qquad \\overrightarrow{BA} = \\vec{a}.$$

Ezeket behelyettesítve:

$$\\overrightarrow{CA} = -\\vec{c} + \\vec{a} = \\vec{a} - \\vec{c}.$$`,
      figure: () => <HexFigure step={1} />,
    },
    {
      title: '3. lépés — A $\\overrightarrow{BE}$ vektor kifejezése',
      points: 2,
      body: `A $B$ és $E$ csúcsok **átellenesek**, így a $\\overrightarrow{BE}$ szakasz a hatszög egyik **főátlója**, ami áthalad a középponton:

$$\\overrightarrow{BE} = 2 \\cdot \\overrightarrow{BO}.$$

Fejezzük ki $\\overrightarrow{BO}$-t $\\vec{a}$ és $\\vec{c}$ segítségével. Figyeljük meg, hogy az $OABC$ négyszög **rombusz** (minden oldala a hatszög sugarával egyenlő, és $BA \\parallel CO$, illetve $BC \\parallel AO$), így $\\overrightarrow{BO} = \\overrightarrow{BA} + \\overrightarrow{AO}$, ahol $\\overrightarrow{AO} = \\overrightarrow{BC} - \\overrightarrow{BA}$ geometriai átrendezéssel. Röviden: az $O$ pont helyvektora $B$-ből

$$\\overrightarrow{BO} = \\vec{c} - \\vec{a},$$

hiszen a rombusz átlójának vetületeként kapjuk (másként: $\\overrightarrow{BO} = \\overrightarrow{BC} + \\overrightarrow{CO} = \\vec{c} + (-\\vec{a}) = \\vec{c} - \\vec{a}$, mivel $\\overrightarrow{CO} = -\\overrightarrow{BA} = -\\vec{a}$).

Innen:

$$\\overrightarrow{BE} = 2 \\cdot \\overrightarrow{BO} = 2(\\vec{c} - \\vec{a}) = 2\\vec{c} - 2\\vec{a}.$$`,
      figure: () => <HexFigure step={2} />,
    },
  ],
  finalAnswer: {
    CA: '$\\overrightarrow{CA} = \\vec{a} - \\vec{c}$',
    BE: '$\\overrightarrow{BE} = 2\\vec{c} - 2\\vec{a} = 2(\\vec{c} - \\vec{a})$',
  },
  usedFormulas: [
    'Háromszög-szabály: $\\overrightarrow{XZ} = \\overrightarrow{XY} + \\overrightarrow{YZ}$',
    'Ellentett vektor: $\\overrightarrow{YX} = -\\overrightarrow{XY}$',
    'Szabályos hatszög: a főátló kétszer akkora, mint a sugár, és átmegy a középponton',
  ],
};

export default { meta, problem, solution };
