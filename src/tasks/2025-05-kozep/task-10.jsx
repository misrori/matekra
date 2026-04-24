import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-10',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 10,
  title: 'Párhuzamos egyenes egyenlete',
  points: 2,
  topics: ['koordináta-geometria', 'függvények'],
  difficulty: 1,
  fgvt: [{ page: 83, note: 'egyenes egyenlete' }],
  estimatedMinutes: 2,
};

// Ábra koordinátarendszere
const AX = { x: 40, y: 30, w: 400, h: 260, xMin: -6, xMax: 6, yMin: -4, yMax: 8, xStep: 1, yStep: 1 };
const sx = (v) => AX.x + ((v - AX.xMin) / (AX.xMax - AX.xMin)) * AX.w;
const sy = (v) => AX.y + AX.h - ((v - AX.yMin) / (AX.yMax - AX.yMin)) * AX.h;

function lineEndpoints(m, b, xMin, xMax, yMin, yMax) {
  // Két végpontot adunk a látható tartományban (eleg a tartomány szélein értékelni)
  const p1 = { x: xMin, y: m * xMin + b };
  const p2 = { x: xMax, y: m * xMax + b };
  // Esetleges y-túlcsordulás esetén levágjuk
  const clip = (p) => {
    if (p.y > yMax) {
      return { x: (yMax - b) / m, y: yMax };
    }
    if (p.y < yMin) {
      return { x: (yMin - b) / m, y: yMin };
    }
    return p;
  };
  return [clip(p1), clip(p2)];
}

function LineFigure({ step = 0 }) {
  // step 0 / 1 = csak a referenciaegyenes (y = 2x + 4)
  // step 2 = referenciaegyenes + megoldás (y = 2x + 1) + (0, 1) pont
  const refEnds = lineEndpoints(2, 4, AX.xMin, AX.xMax, AX.yMin, AX.yMax);
  const solEnds = lineEndpoints(2, 1, AX.xMin, AX.xMax, AX.yMin, AX.yMax);

  return (
    <SvgCanvas width={480} height={320} viewBox="0 0 480 320">
      <Axes
        x={AX.x}
        y={AX.y}
        w={AX.w}
        h={AX.h}
        xMin={AX.xMin}
        xMax={AX.xMax}
        yMin={AX.yMin}
        yMax={AX.yMax}
        xStep={AX.xStep}
        yStep={AX.yStep}
        xLabel="x"
        yLabel="y"
        grid
      />

      {/* Referenciaegyenes: y = 2x + 4 — szürke, szaggatott */}
      <line
        x1={sx(refEnds[0].x)}
        y1={sy(refEnds[0].y)}
        x2={sx(refEnds[1].x)}
        y2={sy(refEnds[1].y)}
        stroke="#6b7280"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x={sx(-3)} y={sy(-2) + 0} fontSize="12" fill="#6b7280">
        y = 2x + 4
      </text>

      {/* Megoldás egyenes: y = 2x + 1 — kék, folytonos (csak step >= 2) */}
      {step >= 2 && (
        <g>
          <line
            x1={sx(solEnds[0].x)}
            y1={sy(solEnds[0].y)}
            x2={sx(solEnds[1].x)}
            y2={sy(solEnds[1].y)}
            stroke="#1d4ed8"
            strokeWidth="2.5"
          />
          <text x={sx(2.1)} y={sy(5) - 4} fontSize="13" fontWeight="bold" fill="#1d4ed8">
            y = 2x + 1
          </text>
        </g>
      )}

      {/* (0, 1) pont — mindig megjelenik */}
      <circle cx={sx(0)} cy={sy(1)} r="5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      <text x={sx(0) + 8} y={sy(1) - 6} fontSize="12" fontWeight="bold" fill="#7f1d1d">
        P(0; 1)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Írja fel annak a $(0;\\ 1)$ ponton átmenő egyenesnek az egyenletét, amely **párhuzamos** az $y = 2x + 4$ egyenletű egyenessel!`,
  figure: () => <LineFigure step={1} />,
  asked: [{ key: 'egyenlet', label: 'Az egyenes egyenlete' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A meredekség meghatározása a párhuzamosság miatt',
      points: 1,
      body: `Az egyenes **meredekséges** (iránytangenses) alakja:

$$y = m x + b,$$

ahol $m$ a meredekség és $b$ az $y$-tengelymetszet.

**Párhuzamos egyenesek meredeksége egyenlő**, tehát a keresett egyenes meredeksége megegyezik az $y = 2x + 4$ egyenletű egyenes meredekségével:

$$m = 2.$$`,
      figure: () => <LineFigure step={1} />,
    },
    {
      title: '2. lépés — A tengelymetszet kiszámítása a ponton áthaladással',
      points: 1,
      body: `A keresett egyenes átmegy a $P(0;\\ 1)$ ponton. Használjuk a **pontos-meredekséges** alakot:

$$y - y_0 = m(x - x_0),$$

ahol $(x_0,\\ y_0) = (0,\\ 1)$ és $m = 2$:

$$y - 1 = 2(x - 0),$$

$$y - 1 = 2x,$$

$$\\boxed{y = 2x + 1.}$$

**Ellenőrzés:** ha $x = 0$, akkor $y = 2 \\cdot 0 + 1 = 1$, tehát valóban átmegy a $(0;\\ 1)$ ponton; a meredekség $2$, tehát párhuzamos az $y = 2x + 4$ egyenletű egyenessel.`,
      figure: () => <LineFigure step={2} />,
    },
  ],
  finalAnswer: {
    egyenlet: 'A keresett egyenes egyenlete: $y = 2x + 1$.',
  },
  usedFormulas: [
    'Egyenes meredekséges alakja: $y = mx + b$',
    'Párhuzamos egyenesek: $m_1 = m_2$',
    'Pontos-meredekséges alak: $y - y_0 = m(x - x_0)$',
  ],
};

export default { meta, problem, solution };
