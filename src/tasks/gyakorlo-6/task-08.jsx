import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-08',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 8,
  title: 'Sodródiagram (box-plot) leolvasása',
  points: 4,
  topics: ['statisztika'],
  difficulty: 3,
  fgvt: [{ page: 102, note: 'sodródiagram, kvartilisek' }],
  estimatedMinutes: 6,
};

// Sodródiagram: min=12, Q1=18, Q2 (medián) = 24, Q3 = 30, max = 40.
// Kérdések:
// a) Mi a medián? 24
// b) Mekkora az interkvartilis terjedelem (IQR)? 30 - 18 = 12
// c) Mekkora a teljes terjedelem? 40 - 12 = 28
// d) Az adatok legalább 25%-a legalább mekkora? (Q3 = 30 → a 25% a felső negyed, tehát 30)

const STATS = { min: 12, q1: 18, med: 24, q3: 30, max: 40 };

function BoxPlot({ highlight = 'none' }) {
  const xMin = 0, xMax = 50;
  const plot = { x: 40, y: 110, w: 440, h: 70 };
  const sx = (v) => plot.x + ((v - xMin) / (xMax - xMin)) * plot.w;
  const ticks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const boxColor = (part) => (highlight === part ? '#fca5a5' : '#dbeafe');
  return (
    <SvgCanvas width={520} height={240} viewBox="0 0 520 240">
      <text x="260" y="26" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Sodródiagram — matekdolgozat pontszámai
      </text>
      {/* Tengely */}
      <line x1={plot.x} y1={plot.y + plot.h + 10} x2={plot.x + plot.w} y2={plot.y + plot.h + 10} stroke="#111827" strokeWidth="1.5" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} y1={plot.y + plot.h + 6} x2={sx(t)} y2={plot.y + plot.h + 14} stroke="#111827" />
          <text x={sx(t)} y={plot.y + plot.h + 30} fontSize="11" textAnchor="middle" fill="#374151">{t}</text>
        </g>
      ))}
      {/* bal bajusz */}
      <line x1={sx(STATS.min)} y1={plot.y + plot.h / 2} x2={sx(STATS.q1)} y2={plot.y + plot.h / 2} stroke="#1e40af" strokeWidth="1.5" />
      <line x1={sx(STATS.min)} y1={plot.y + 15} x2={sx(STATS.min)} y2={plot.y + plot.h - 15} stroke="#1e40af" strokeWidth="2" />
      {/* box */}
      <rect x={sx(STATS.q1)} y={plot.y + 10} width={sx(STATS.q3) - sx(STATS.q1)} height={plot.h - 20} fill={boxColor('box')} stroke="#1e40af" strokeWidth="2" />
      {/* Medián vonal */}
      <line x1={sx(STATS.med)} y1={plot.y + 10} x2={sx(STATS.med)} y2={plot.y + plot.h - 10} stroke={highlight === 'med' ? '#dc2626' : '#1e40af'} strokeWidth="3" />
      {/* jobb bajusz */}
      <line x1={sx(STATS.q3)} y1={plot.y + plot.h / 2} x2={sx(STATS.max)} y2={plot.y + plot.h / 2} stroke="#1e40af" strokeWidth="1.5" />
      <line x1={sx(STATS.max)} y1={plot.y + 15} x2={sx(STATS.max)} y2={plot.y + plot.h - 15} stroke="#1e40af" strokeWidth="2" />
      {/* címkék */}
      <text x={sx(STATS.min)} y={plot.y - 4} fontSize="12" textAnchor="middle" fill="#111827">min=12</text>
      <text x={sx(STATS.q1)} y={plot.y - 4} fontSize="12" textAnchor="middle" fill="#111827">Q₁=18</text>
      <text x={sx(STATS.med)} y={plot.y - 4} fontSize="12" fontWeight="700" textAnchor="middle" fill={highlight === 'med' ? '#dc2626' : '#111827'}>med=24</text>
      <text x={sx(STATS.q3)} y={plot.y - 4} fontSize="12" textAnchor="middle" fill="#111827">Q₃=30</text>
      <text x={sx(STATS.max)} y={plot.y - 4} fontSize="12" textAnchor="middle" fill="#111827">max=40</text>
      {highlight === 'iqr' && (
        <g>
          <line x1={sx(STATS.q1)} y1={plot.y + plot.h + 42} x2={sx(STATS.q3)} y2={plot.y + plot.h + 42} stroke="#dc2626" strokeWidth="2" />
          <text x={sx(24)} y={plot.y + plot.h + 58} fontSize="13" fontWeight="700" textAnchor="middle" fill="#dc2626">IQR = 12</text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Az alábbi **sodródiagram** egy osztály matematikadolgozatának pontszámait mutatja.

A diagramról leolvasható: minimum $= 12$, $Q_1 = 18$, medián $= 24$, $Q_3 = 30$, maximum $= 40$.

**a)** Mekkora a **medián**? ($1$ pont)

**b)** Mekkora az **interkvartilis terjedelem** ($Q_3 - Q_1$)? ($1$ pont)

**c)** Mekkora a **teljes terjedelem** (max $-$ min)? ($1$ pont)

**d)** Legalább hány pontot ért el a diákok **felső $25\\%$**-a? ($1$ pont)`,
  figure: () => <BoxPlot />,
  asked: [
    { key: 'med', label: 'a) medián $= ?$' },
    { key: 'iqr', label: 'b) IQR $= ?$' },
    { key: 'range', label: 'c) terjedelem $= ?$' },
    { key: 'top25', label: 'd) felső 25%: legalább $?$ pont' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) A medián',
      points: 1,
      body: `A sodródiagramon a **medián** a doboz belsejében lévő függőleges vonal. Leolvasva:

$$\\text{medián} = Q_2 = 24.$$`,
      figure: () => <BoxPlot highlight="med" />,
    },
    {
      title: 'b) Interkvartilis terjedelem (IQR)',
      points: 1,
      body: `A doboz **szélessége** a $Q_1$ és $Q_3$ közötti távolság:

$$\\text{IQR} = Q_3 - Q_1 = 30 - 18 = 12.$$`,
      figure: () => <BoxPlot highlight="iqr" />,
    },
    {
      title: 'c) Teljes terjedelem',
      points: 1,
      body: `A teljes terjedelem a két bajusz vége közti különbség:

$$R = \\text{max} - \\text{min} = 40 - 12 = 28.$$`,
      figure: () => <BoxPlot highlight="box" />,
    },
    {
      title: 'd) Felső 25%',
      points: 1,
      body: `$Q_3$ **definíciója**: a $Q_3$ érték alatt van az adatok $75\\%$-a, tehát **fölötte** (beleértve $Q_3$-at) a felső $25\\%$.

Tehát a diákok felső negyede legalább:

$$Q_3 = 30 \\text{ pontot ért el.}$$`,
      figure: () => <BoxPlot highlight="box" />,
    },
  ],
  finalAnswer: {
    med: '$24$',
    iqr: '$12$',
    range: '$28$',
    top25: 'legalább $30$ pont',
  },
  usedFormulas: [
    'medián: a középső érték ($Q_2$)',
    'IQR $= Q_3 - Q_1$',
    'terjedelem $=$ max $-$ min',
    '$Q_3$: a felső $25\\%$ határa',
  ],
};

export default { meta, problem, solution };
