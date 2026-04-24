import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-10',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 10,
  title: 'Egyenes egyenletének felírása két pontból',
  points: 2,
  topics: ['koordináta-geometria'],
  difficulty: 2,
  fgvt: [{ page: 83, note: 'egyenes egyenlete' }],
  estimatedMinutes: 4,
};

const P = { x: 2, y: 1 };
const Q = { x: 5, y: 7 };

function LinePlot() {
  const cfg = { x: 40, y: 20, w: 380, h: 260, xMin: -1, xMax: 7, yMin: -2, yMax: 9, xStep: 1, yStep: 1 };
  const sx = (v) => cfg.x + ((v - cfg.xMin) / (cfg.xMax - cfg.xMin)) * cfg.w;
  const sy = (v) => cfg.y + cfg.h - ((v - cfg.yMin) / (cfg.yMax - cfg.yMin)) * cfg.h;
  return (
    <SvgCanvas width={460} height={300} viewBox="0 0 460 300">
      <Axes {...cfg} xLabel="x" yLabel="y" />
      {/* egyenes — meredekség 2, átmegy (2,1): y = 2x - 3 → x=-1 → y=-5 (lóg le); x=7 → y=11 (lóg fel) */}
      <line x1={sx(-0.5)} y1={sy(2 * -0.5 - 3)} x2={sx(6.5)} y2={sy(2 * 6.5 - 3)} stroke="#2563eb" strokeWidth="2.5" />
      <circle cx={sx(P.x)} cy={sy(P.y)} r="5" fill="#dc2626" />
      <text x={sx(P.x) + 8} y={sy(P.y) + 18} fontSize="13" fontWeight="bold" fill="#dc2626">
        P(2; 1)
      </text>
      <circle cx={sx(Q.x)} cy={sy(Q.y)} r="5" fill="#dc2626" />
      <text x={sx(Q.x) + 8} y={sy(Q.y) - 8} fontSize="13" fontWeight="bold" fill="#dc2626">
        Q(5; 7)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az $e$ egyenes átmegy a $P(2;\\ 1)$ és a $Q(5;\\ 7)$ pontokon.

Írja fel az $e$ egyenes egyenletét $y = m x + b$ alakban!`,
  figure: () => <LinePlot />,
  asked: [{ key: 'line', label: '$y = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A meredekség kiszámítása',
      points: 1,
      body: `Két pont $P(x_1; y_1)$ és $Q(x_2; y_2)$ közötti egyenes **meredeksége** (fgv. tábla 83. old.):

$$m = \\dfrac{y_2 - y_1}{x_2 - x_1}.$$

Behelyettesítve a pontokat:

$$m = \\dfrac{7 - 1}{5 - 2} = \\dfrac{6}{3} = 2.$$

Tehát az egyenes meredeksége $m = 2$.`,
    },
    {
      title: '2. lépés — Az egyenlet felírása egy ponttal',
      points: 1,
      body: `Használhatjuk a **pont-meredekséges alakot**: $y - y_0 = m (x - x_0)$. Helyettesítsünk be a $P(2; 1)$ ponttal és $m = 2$-vel:

$$y - 1 = 2(x - 2).$$

Rendezzük $y = mx + b$ alakra:

$$y - 1 = 2x - 4 \\ \\Longrightarrow \\ y = 2x - 3.$$

**Ellenőrzés a $Q(5; 7)$ ponttal:** $y = 2 \\cdot 5 - 3 = 10 - 3 = 7$ ✓ — valóban átmegy a $Q$-n.`,
    },
  ],
  finalAnswer: {
    line: '$y = 2x - 3$',
  },
  usedFormulas: [
    'meredekség két pontból: $m = \\dfrac{y_2 - y_1}{x_2 - x_1}$',
    'pont-meredekséges alak: $y - y_0 = m(x - x_0)$',
  ],
};

export default { meta, problem, solution };
