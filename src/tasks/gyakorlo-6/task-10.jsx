import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-10',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 10,
  title: 'Kör egyenletéből sugár és középpont',
  points: 2,
  topics: ['koordináta-geometria'],
  difficulty: 2,
  fgvt: [{ page: 85, note: 'kör egyenlete' }],
  estimatedMinutes: 3,
  // (x-3)^2 + (y+2)^2 = 25 → K(3,-2), r = 5
  check: { type: 'number', value: 5 },
};

function CircleFigure() {
  return (
    <SvgCanvas width={460} height={340} viewBox="0 0 460 340">
      <Axes x={40} y={30} w={380} h={280} xMin={-3} xMax={10} yMin={-9} yMax={4} xStep={1} yStep={1} xLabel="x" yLabel="y" grid />
      {/* A körünk: K(3,-2), r=5 → képernyőn */}
      {(() => {
        const xMin = -3, xMax = 10, yMin = -9, yMax = 4;
        const sx = (v) => 40 + ((v - xMin) / (xMax - xMin)) * 380;
        const sy = (v) => 30 + 280 - ((v - yMin) / (yMax - yMin)) * 280;
        const cxP = sx(3), cyP = sy(-2);
        const rP = sx(3 + 5) - sx(3);
        return (
          <>
            <circle cx={cxP} cy={cyP} r={rP} fill="#dbeafe" fillOpacity="0.45" stroke="#1e40af" strokeWidth="2" />
            <circle cx={cxP} cy={cyP} r="4" fill="#dc2626" />
            <text x={cxP + 6} y={cyP - 8} fontSize="13" fontWeight="700" fill="#dc2626">K(3; −2)</text>
            <line x1={cxP} y1={cyP} x2={cxP + rP} y2={cyP} stroke="#b45309" strokeWidth="2" strokeDasharray="4 3" />
            <text x={cxP + rP / 2} y={cyP - 6} fontSize="13" fontWeight="700" fill="#b45309" textAnchor="middle">r = 5</text>
          </>
        );
      })()}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott az alábbi kör-egyenlet:

$$(x - 3)^2 + (y + 2)^2 = 25.$$

**a)** Adja meg a kör **középpontját**!

**b)** Adja meg a kör **sugarát**!`,
  figure: () => <CircleFigure />,
  asked: [
    { key: 'K', label: 'a) $K = ?$' },
    { key: 'r', label: 'b) $r = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A kör egyenletének normál alakja',
      points: 1,
      body: `A kör egyenlete (fgv. tábla $85.$ old.):

$$(x - u)^2 + (y - v)^2 = r^2,$$

ahol a középpont $(u;\\ v)$, és $r$ a sugár.

Összevetve a feladatbeli egyenlettel: $(x - 3)^2 + (y + 2)^2 = 25$. Figyeljük, hogy $(y + 2) = (y - (-2))$, tehát $v = -2$.

$$u = 3, \\quad v = -2 \\Longrightarrow K(3;\\ -2).$$`,
      figure: () => <CircleFigure />,
    },
    {
      title: '2. lépés — A sugár',
      points: 1,
      body: `$r^2 = 25 \\Longrightarrow r = \\sqrt{25} = 5$.`,
      figure: () => <CircleFigure />,
    },
  ],
  finalAnswer: { K: '$K(3;\\ -2)$', r: '$r = 5$' },
  usedFormulas: ['kör egyenlete: $(x-u)^2+(y-v)^2 = r^2$'],
};

export default { meta, problem, solution };
