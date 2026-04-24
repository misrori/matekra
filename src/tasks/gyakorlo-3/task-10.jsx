import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-10',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 10,
  title: 'Két egyenes metszéspontja',
  points: 2,
  topics: ['koordináta-geometria'],
  difficulty: 2,
  fgvt: [{ page: 83, note: 'egyenes egyenlete' }],
  estimatedMinutes: 3,
};

// e: y = 2x - 1, f: y = -x + 5
// Metszéspont: 2x - 1 = -x + 5 → 3x = 6 → x = 2, y = 3. M(2, 3).
function LinesPlot({ showM = false }) {
  const sx = (v) => 60 + ((v + 2) / 10) * 400; // x: -2..8
  const sy = (v) => 40 + 240 - ((v + 2) / 10) * 240; // y: -2..8
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes x={60} y={40} w={400} h={240} xMin={-2} xMax={8} yMin={-2} yMax={8} xStep={1} yStep={1} grid />
      {/* e: y = 2x - 1  (x = -2: y=-5 [lejjebb], x=8: y=15 [fent]) → levágjuk a 2..8 intervallumra a láthatósághoz */}
      <line x1={sx(0.5)} y1={sy(0)} x2={sx(5)} y2={sy(9)} stroke="#2563eb" strokeWidth="2.6" />
      <text x={sx(4.5)} y={sy(8.2)} fontSize="14" fontWeight="700" fill="#2563eb">e: y = 2x − 1</text>
      {/* f: y = -x + 5 */}
      <line x1={sx(-2)} y1={sy(7)} x2={sx(7)} y2={sy(-2)} stroke="#dc2626" strokeWidth="2.6" />
      <text x={sx(6)} y={sy(-0.8)} fontSize="14" fontWeight="700" fill="#dc2626">f: y = −x + 5</text>
      {/* Metszéspont */}
      {showM && (
        <>
          <circle cx={sx(2)} cy={sy(3)} r="6" fill="#16a34a" stroke="#064e3b" strokeWidth="2" />
          <text x={sx(2) + 10} y={sy(3) - 10} fontSize="14" fontWeight="700" fill="#064e3b">M(2; 3)</text>
        </>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott két egyenes:

$$e: y = 2x - 1, \\qquad f: y = -x + 5.$$

Határozza meg a két egyenes metszéspontjának koordinátáit!
Megoldását részletezze!`,
  figure: () => <LinesPlot />,
  asked: [{ key: 'M', label: 'Metszéspont $M = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Egyenletrendszer felírása',
      points: 1,
      body: `A metszéspontban mindkét egyenlet teljesül, ezért az $y$-okat egyenlővé tesszük:

$$2x - 1 = -x + 5.$$

Innen $3x = 6$, tehát $x = 2$.`,
      figure: () => <LinesPlot />,
    },
    {
      title: '2. lépés — $y$-koordináta meghatározása',
      points: 1,
      body: `Behelyettesítve $x = 2$-t bármelyik egyenletbe:

$$y = 2 \\cdot 2 - 1 = 3.$$

**Ellenőrzés** a másik egyenletben: $y = -2 + 5 = 3$. ✓

A metszéspont: $M(2;\\ 3)$.`,
      figure: () => <LinesPlot showM />,
    },
  ],
  finalAnswer: { M: '$M(2;\\ 3)$' },
  usedFormulas: [
    'egyenletrendszer: két egyenlet egyenlővé tétele',
    'egyenes egyenlete: $y = mx + b$',
  ],
};

export default { meta, problem, solution };
