import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-08',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 8,
  title: 'Lakásárak sodródiagramja',
  points: 4,
  topics: ['statisztika'],
  difficulty: 2,
  fgvt: [
    { page: 102, note: 'sodródiagram' },
    { page: 100, note: 'medián' },
  ],
  estimatedMinutes: 6,
};

const DATA_SORTED = [50, 50, 55, 55, 55, 70, 70, 80, 80, 90, 110, 115, 130, 145];

// Sodródiagram paraméterek
const BOX_W = 520;
const BOX_H = 220;
const X0 = 50;
const X1 = 490;
const Y_AXIS = 150; // tengely függőleges pozíciója
const VAL_MIN = 40;
const VAL_MAX = 150;

const sx = (v) => X0 + ((v - VAL_MIN) / (VAL_MAX - VAL_MIN)) * (X1 - X0);

function BoxPlotAxis() {
  const ticks = [];
  for (let v = 40; v <= 150; v += 10) ticks.push(v);
  return (
    <g>
      {/* Főtengely */}
      <line x1={X0} y1={Y_AXIS} x2={X1} y2={Y_AXIS} stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Osztások */}
      {ticks.map((v) => (
        <g key={`t${v}`}>
          <line x1={sx(v)} y1={Y_AXIS - 4} x2={sx(v)} y2={Y_AXIS + 4} stroke="#1a1a1a" />
          <text x={sx(v)} y={Y_AXIS + 18} fontSize="11" textAnchor="middle" fill="#444">
            {v}
          </text>
        </g>
      ))}
      <text x={X1 + 6} y={Y_AXIS + 4} fontSize="11" fill="#444">
        millió Ft
      </text>
    </g>
  );
}

function BoxPlot({ step = 0 }) {
  // step:
  // 0 = csak az adatok a számegyenesen (pontok)
  // 1 = medián kiemelve
  // 2 = kvartilisek kiemelve
  // 3 = teljes box-plot
  const MIN = 50;
  const Q1 = 55;
  const MED = 75;
  const Q3 = 110;
  const MAX = 145;

  return (
    <SvgCanvas width={BOX_W} height={BOX_H} viewBox={`0 0 ${BOX_W} ${BOX_H}`}>
      <BoxPlotAxis />

      {/* Adatpontok (step 0 és step 1) */}
      {step <= 1 &&
        DATA_SORTED.map((v, i) => {
          const isMiddle = step === 1 && (i === 6 || i === 7);
          return (
            <circle
              key={`p${i}`}
              cx={sx(v)}
              cy={Y_AXIS - 20}
              r={isMiddle ? 6 : 4}
              fill={isMiddle ? '#dc2626' : '#1e40af'}
              fillOpacity="0.7"
              stroke={isMiddle ? '#7f1d1d' : '#1e3a8a'}
            />
          );
        })}

      {/* Medián jelölése (step 1) */}
      {step === 1 && (
        <g>
          <line
            x1={sx(MED)}
            y1={Y_AXIS - 55}
            x2={sx(MED)}
            y2={Y_AXIS - 5}
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text x={sx(MED)} y={Y_AXIS - 60} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            medián = 75
          </text>
          <text x={sx(70)} y={Y_AXIS - 34} fontSize="11" textAnchor="middle" fill="#7f1d1d">
            70
          </text>
          <text x={sx(80)} y={Y_AXIS - 34} fontSize="11" textAnchor="middle" fill="#7f1d1d">
            80
          </text>
        </g>
      )}

      {/* Kvartilisek (step 2) */}
      {step === 2 && (
        <g>
          {/* Adatpontok halványan */}
          {DATA_SORTED.map((v, i) => (
            <circle
              key={`p${i}`}
              cx={sx(v)}
              cy={Y_AXIS - 20}
              r={4}
              fill="#94a3b8"
              fillOpacity="0.6"
            />
          ))}
          {/* Q1 */}
          <line x1={sx(Q1)} y1={Y_AXIS - 55} x2={sx(Q1)} y2={Y_AXIS - 5} stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(Q1)} y={Y_AXIS - 60} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#059669">
            Q₁ = 55
          </text>
          {/* Medián */}
          <line x1={sx(MED)} y1={Y_AXIS - 55} x2={sx(MED)} y2={Y_AXIS - 5} stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(MED)} y={Y_AXIS - 60} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            Q₂ = 75
          </text>
          {/* Q3 */}
          <line x1={sx(Q3)} y1={Y_AXIS - 55} x2={sx(Q3)} y2={Y_AXIS - 5} stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(Q3)} y={Y_AXIS - 60} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#7c3aed">
            Q₃ = 110
          </text>
        </g>
      )}

      {/* Teljes sodródiagram (step 3) */}
      {step === 3 && (
        <g>
          {/* Bajuszok (whiskers) */}
          <line x1={sx(MIN)} y1={Y_AXIS - 30} x2={sx(Q1)} y2={Y_AXIS - 30} stroke="#1e3a8a" strokeWidth="2" />
          <line x1={sx(Q3)} y1={Y_AXIS - 30} x2={sx(MAX)} y2={Y_AXIS - 30} stroke="#1e3a8a" strokeWidth="2" />
          {/* Min és max kis függőleges zárójel */}
          <line x1={sx(MIN)} y1={Y_AXIS - 42} x2={sx(MIN)} y2={Y_AXIS - 18} stroke="#1e3a8a" strokeWidth="2" />
          <line x1={sx(MAX)} y1={Y_AXIS - 42} x2={sx(MAX)} y2={Y_AXIS - 18} stroke="#1e3a8a" strokeWidth="2" />

          {/* A doboz Q1-től Q3-ig */}
          <rect
            x={sx(Q1)}
            y={Y_AXIS - 50}
            width={sx(Q3) - sx(Q1)}
            height={40}
            fill="#bfdbfe"
            fillOpacity="0.7"
            stroke="#1e3a8a"
            strokeWidth="2"
          />
          {/* Medián vonal */}
          <line x1={sx(MED)} y1={Y_AXIS - 50} x2={sx(MED)} y2={Y_AXIS - 10} stroke="#dc2626" strokeWidth="3" />

          {/* Feliratok */}
          <text x={sx(MIN)} y={Y_AXIS - 56} fontSize="11" textAnchor="middle" fill="#1e3a8a">
            min = 50
          </text>
          <text x={sx(Q1)} y={Y_AXIS - 84} fontSize="11" textAnchor="middle" fill="#1e3a8a">
            Q₁ = 55
          </text>
          <text x={sx(MED)} y={Y_AXIS - 56} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            Me = 75
          </text>
          <text x={sx(Q3)} y={Y_AXIS - 84} fontSize="11" textAnchor="middle" fill="#1e3a8a">
            Q₃ = 110
          </text>
          <text x={sx(MAX)} y={Y_AXIS - 56} fontSize="11" textAnchor="middle" fill="#1e3a8a">
            max = 145
          </text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy új építésű házban a megvehető $14$ lakás ára (millió forintban):
$$50,\\ 50,\\ 55,\\ 55,\\ 55,\\ 70,\\ 70,\\ 80,\\ 80,\\ 90,\\ 110,\\ 115,\\ 130,\\ 145.$$

Ábrázolja **sodródiagramon** (box-ploton) ezeket az adatokat!`,
  figure: () => <BoxPlot step={0} />,
  asked: [{ key: 'sodro', label: 'Sodródiagram az ötelemű statisztikával' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az adatok rendezése nagyság szerint',
      points: 1,
      body: `A sodródiagram elkészítéséhez először nagyság szerint rendezzük az adatokat. Jelen esetben az adatok már rendezett sorrendben vannak megadva:

$$50,\\ 50,\\ 55,\\ 55,\\ 55,\\ 70,\\ 70,\\ \\mathbf{80},\\ \\mathbf{80},\\ 90,\\ 110,\\ 115,\\ 130,\\ 145.$$

Az adatok száma: $n = 14$ (páros).

A **minimum** az első elem: $50$ millió Ft.
A **maximum** a tizennegyedik elem: $145$ millió Ft.`,
      figure: () => <BoxPlot step={0} />,
    },
    {
      title: '2. lépés — A medián meghatározása',
      points: 1,
      body: `A **medián** a rendezett adatsor középső eleme. Mivel itt $n = 14$ (páros elemszám), a medián a $7.$ és a $8.$ elem **számtani átlaga**:

- 7. elem: $70$
- 8. elem: $80$

$$\\text{Medián} = \\frac{70 + 80}{2} = \\frac{150}{2} = 75 \\text{ millió Ft.}$$`,
      figure: () => <BoxPlot step={1} />,
    },
    {
      title: '3. lépés — Az alsó és a felső kvartilis',
      points: 1,
      body: `A kvartilisek a rendezett adatsort **négy egyenlő részre** osztják.

**Alsó kvartilis ($Q_1$):** az adatsor **alsó felének** (1–7. elem, $7$ db) mediánja. Ez a $4.$ elem:
$$Q_1 = 55 \\text{ millió Ft.}$$

**Felső kvartilis ($Q_3$):** az adatsor **felső felének** (8–14. elem, $7$ db) mediánja. Ez a felső fél $4.$ eleme, azaz a teljes sorozat $11.$ eleme:
$$Q_3 = 110 \\text{ millió Ft.}$$

Az ötelemű statisztika eddig:
- minimum: $50$
- $Q_1 = 55$
- medián: $75$
- $Q_3 = 110$
- maximum: $145$`,
      figure: () => <BoxPlot step={2} />,
    },
    {
      title: '4. lépés — A sodródiagram (box-plot) megrajzolása',
      points: 1,
      body: `A sodródiagram rajzolásának lépései:

1. Vízszintes számegyenesen jelöljük ki a tartományt (pl. $40$-től $150$-ig, $10$-esével osztva).
2. Rajzolunk egy **téglalapot** (a „dobozt") $Q_1 = 55$-től $Q_3 = 110$-ig.
3. A doboz belsejébe a mediánnál ($75$) függőleges vonalat húzunk.
4. A dobozból kiinduló **„bajuszok"** (whiskers) a minimumig ($50$) és a maximumig ($145$) tartanak.

A doboz hossza az ún. **interkvartilis terjedelem**: $Q_3 - Q_1 = 110 - 55 = 55$.`,
      figure: () => <BoxPlot step={3} />,
    },
  ],
  finalAnswer: {
    sodro: 'Sodródiagram: min $= 50$, $Q_1 = 55$, medián $= 75$, $Q_3 = 110$, max $= 145$ (millió Ft).',
  },
  usedFormulas: [
    'Medián páros $n$ esetén: $\\tfrac{x_{n/2} + x_{n/2+1}}{2}$',
    'Kvartilisek: az alsó / felső fél mediánja',
    'Sodródiagram (box-plot): min – $Q_1$ – Me – $Q_3$ – max',
  ],
};

export default { meta, problem, solution };
