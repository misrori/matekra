import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-07',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 7,
  title: 'Térgeometria — téglatest testátlója',
  points: 2,
  topics: ['térgeometria', 'síkgeometria'],
  difficulty: 2,
  fgvt: [
    { page: 75, note: 'hasáb — téglatest' },
    { page: 62, note: 'Pitagorasz' },
  ],
  estimatedMinutes: 3,
};

// Téglatest: a = 6, b = 4, c = 3
// Testátló: d = sqrt(6^2 + 4^2 + 3^2) = sqrt(36+16+9) = sqrt(61) ≈ 7,81

function Cuboid({ highlight = 'none' }) {
  // Sematikus perspektivikus téglatest
  const ox = 90, oy = 240; // alsó-bal-első sarok
  const a = 240;            // hossz (x)
  const b = 110;            // szélesség (y)
  const c = 160;            // magasság (z)
  // Perspektivikus eltolás az y (mélység) irányában
  const dx = 70, dy = -40;

  // Csúcsok (8 db)
  const P = {
    A: [ox, oy],                       // elől-bal-lent
    B: [ox + a, oy],                   // elől-jobb-lent
    C: [ox + a + dx, oy + dy],         // hátul-jobb-lent
    D: [ox + dx, oy + dy],             // hátul-bal-lent
    A2: [ox, oy - c],                  // elől-bal-fent
    B2: [ox + a, oy - c],              // elől-jobb-fent
    C2: [ox + a + dx, oy + dy - c],    // hátul-jobb-fent
    D2: [ox + dx, oy + dy - c],        // hátul-bal-fent
  };
  const L = (p, q, stroke, sw = 2, dash = '') => (
    <line x1={P[p][0]} y1={P[p][1]} x2={P[q][0]} y2={P[q][1]} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
  );
  return (
    <SvgCanvas width={480} height={300} viewBox="0 0 480 300">
      {/* Hátsó (szaggatott) élek */}
      {L('D', 'C', '#6b7280', 1.2, '4 3')}
      {L('D', 'A', '#6b7280', 1.2, '4 3')}
      {L('D', 'D2', '#6b7280', 1.2, '4 3')}

      {/* Alap (elől) */}
      {L('A', 'B', '#111', 2)}
      {L('B', 'C', '#111', 2)}
      {/* Függőleges */}
      {L('A', 'A2', '#111', 2)}
      {L('B', 'B2', '#111', 2)}
      {L('C', 'C2', '#111', 2)}
      {/* Tető */}
      {L('A2', 'B2', '#111', 2)}
      {L('B2', 'C2', '#111', 2)}
      {L('C2', 'D2', '#111', 2)}
      {L('D2', 'A2', '#111', 2)}

      {/* Élcímkék */}
      <text x={(P.A[0] + P.B[0]) / 2} y={P.A[1] + 20} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#111">a = 6 cm</text>
      <text x={P.B[0] + 40} y={P.B[1] - 10} fontSize="14" fill="#111" fontWeight="bold">b = 4 cm</text>
      <text x={P.A[0] - 36} y={(P.A[1] + P.A2[1]) / 2} fontSize="14" fill="#111" fontWeight="bold">c = 3 cm</text>

      {/* A testátló: A -> C2 */}
      {highlight === 'space' && (
        <g>
          <line x1={P.A[0]} y1={P.A[1]} x2={P.C2[0]} y2={P.C2[1]} stroke="#dc2626" strokeWidth="2.5" />
          <text x={(P.A[0] + P.C2[0]) / 2 + 8} y={(P.A[1] + P.C2[1]) / 2} fontSize="14" fill="#dc2626" fontWeight="bold">d (testátló)</text>
        </g>
      )}
      {/* Az alap átlója A -> C (segédlépés) */}
      {highlight === 'base' && (
        <g>
          <line x1={P.A[0]} y1={P.A[1]} x2={P.C[0]} y2={P.C[1]} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="2 2" />
          <text x={(P.A[0] + P.C[0]) / 2 + 6} y={(P.A[1] + P.C[1]) / 2 + 16} fontSize="13" fill="#2563eb" fontWeight="bold">e (alap átló)</text>
        </g>
      )}

      {/* Csúcsok */}
      {Object.entries(P).map(([k, [px, py]]) => (
        <g key={k}>
          <circle cx={px} cy={py} r="2.5" fill="#111" />
        </g>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy téglatest élei $a = 6$ cm, $b = 4$ cm és $c = 3$ cm.

Mekkora a téglatest **testátlójának** hossza? Adja meg az eredményt két tizedesjegyre kerekítve!`,
  figure: () => <Cuboid />,
  asked: [{ key: 'd', label: '$d \\approx ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az alaplap átlója',
      points: 1,
      body: `Először számítsuk ki a téglatest **alaplapjának** átlóját Pitagorasz-tétellel (a téglalap átlója):

$$e^2 = a^2 + b^2 = 6^2 + 4^2 = 36 + 16 = 52.$$

Tehát $e = \\sqrt{52}$ cm. (Ezt még nem kell kerek számra hoznunk, mert a következő lépésben négyzetre emelünk.)`,
      figure: () => <Cuboid highlight="base" />,
    },
    {
      title: '2. lépés — A testátló kiszámítása',
      points: 1,
      body: `A testátló, az alaplap átlója ($e$) és a függőleges él ($c$) egy **derékszögű háromszöget** alkot (mert $c$ merőleges az alaplapra). Így ismét Pitagorasz-tétel:

$$d^2 = e^2 + c^2 = 52 + 3^2 = 52 + 9 = 61.$$

$$d = \\sqrt{61} \\approx 7{,}81 \\ \\text{cm}.$$

**Általánosítás:** a téglatest testátlója $d = \\sqrt{a^2 + b^2 + c^2}$, ami $3$D-ben a Pitagorasz-tétel kiterjesztése.

Tehát $\\boxed{d \\approx 7{,}81 \\text{ cm}}$.`,
      figure: () => <Cuboid highlight="space" />,
    },
  ],
  finalAnswer: { d: '$d = \\sqrt{61} \\approx 7{,}81$ cm' },
  usedFormulas: ['Pitagorasz-tétel', 'Téglatest testátlója: $d = \\sqrt{a^2 + b^2 + c^2}$'],
};

export default { meta, problem, solution };
