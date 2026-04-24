import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-04',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 4,
  title: 'Átlag táblázatból — napi bevétel',
  points: 2,
  topics: ['statisztika'],
  difficulty: 1,
  fgvt: [{ page: 100, note: 'számtani átlag' }],
  estimatedMinutes: 2,
};

const DAYS = [
  { day: 'hétfő', value: 568 },
  { day: 'kedd', value: 465 },
  { day: 'szerda', value: 497 },
  { day: 'csütörtök', value: 488 },
  { day: 'péntek', value: 882 },
];
const AVG = 580;

function BarChart({ showAverage = false, highlightSum = false }) {
  const width = 520;
  const height = 280;
  const padL = 56, padR = 24, padT = 30, padB = 50;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const maxV = 1000;
  const barW = plotW / DAYS.length * 0.62;
  const gap = plotW / DAYS.length;
  const sx = (i) => padL + i * gap + (gap - barW) / 2;
  const sy = (v) => padT + plotH - (v / maxV) * plotH;

  return (
    <SvgCanvas width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Y grid */}
      {[0, 200, 400, 600, 800, 1000].map((v) => (
        <g key={`g${v}`}>
          <line x1={padL} y1={sy(v)} x2={width - padR} y2={sy(v)} stroke="#e5e7eb" />
          <text x={padL - 8} y={sy(v) + 4} fontSize="11" textAnchor="end" fill="#6b7280">{v}</text>
        </g>
      ))}
      {/* Axes */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#111827" />
      <line x1={padL} y1={padT + plotH} x2={width - padR} y2={padT + plotH} stroke="#111827" />
      {/* Bars */}
      {DAYS.map((d, i) => (
        <g key={d.day}>
          <rect
            x={sx(i)}
            y={sy(d.value)}
            width={barW}
            height={padT + plotH - sy(d.value)}
            fill={highlightSum ? '#f59e0b' : '#2563eb'}
            fillOpacity={0.75}
            stroke={highlightSum ? '#b45309' : '#1e3a8a'}
            strokeWidth={1.5}
          />
          <text x={sx(i) + barW / 2} y={sy(d.value) - 6} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#111827">
            {d.value}
          </text>
          <text x={sx(i) + barW / 2} y={padT + plotH + 18} fontSize="12" textAnchor="middle" fill="#374151">
            {d.day}
          </text>
        </g>
      ))}
      {/* Average line */}
      {showAverage && (
        <g>
          <line
            x1={padL}
            y1={sy(AVG)}
            x2={width - padR}
            y2={sy(AVG)}
            stroke="#dc2626"
            strokeWidth={2.5}
            strokeDasharray="6 4"
          />
          <rect x={width - padR - 96} y={sy(AVG) - 24} width={96} height={20} fill="#dc2626" rx={4} />
          <text x={width - padR - 48} y={sy(AVG) - 10} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#ffffff">
            átlag = 580
          </text>
        </g>
      )}
      {/* Y label */}
      <text x={14} y={padT - 10} fontSize="11" fill="#374151">ezer Ft</text>
    </SvgCanvas>
  );
}

function DataTable({ highlight = 'none' }) {
  // highlight: 'none' | 'sum' | 'avg'
  const cellStyle = {
    border: '1px solid #9ca3af',
    padding: '6px 10px',
    textAlign: 'center',
    fontSize: 14,
  };
  const headStyle = { ...cellStyle, background: '#e5e7eb', fontWeight: 700 };
  return (
    <table style={{ borderCollapse: 'collapse', margin: '8px 0' }} className="data">
      <thead>
        <tr>
          <th style={headStyle}>nap</th>
          {DAYS.map((d) => <th key={d.day} style={headStyle}>{d.day}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ ...cellStyle, fontWeight: 700, background: '#f3f4f6' }}>
            bevétel (ezer Ft)
          </td>
          {DAYS.map((d) => (
            <td
              key={d.day}
              style={{
                ...cellStyle,
                background: highlight === 'sum' ? '#fef3c7' : 'white',
                fontWeight: highlight === 'sum' ? 700 : 400,
              }}
            >
              {d.value}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export const problem = {
  statement: `Az alábbi táblázat egy kisbolt napi bevételeit mutatja az egyik héten hétfőtől péntekig (ezer forintban). Hány ezer forint volt ezen az öt napon a bolt átlagos napi bevétele?`,
  figure: () => (
    <div>
      <DataTable />
      <BarChart />
    </div>
  ),
  asked: [{ key: 'avg', label: 'átlagos napi bevétel = ? (ezer Ft)' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A számtani átlag képlete',
      points: 0,
      body: `A **számtani átlag** az adatok összegének és az adatok számának a hányadosa:

$$\\bar{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}.$$

Itt $n = 5$ nap, és az adatok a táblázat bevétel-sorában találhatóak.`,
      figure: () => <DataTable highlight="sum" />,
    },
    {
      title: '2. lépés — Az adatok összegzése',
      points: 1,
      body: `Összegezzük a napi bevételeket (ezer Ft-ban):

$$568 + 465 + 497 + 488 + 882.$$

Lépésenként:
- $568 + 465 = 1033$
- $1033 + 497 = 1530$
- $1530 + 488 = 2018$
- $2018 + 882 = 2900$

Az összeg tehát **$2900$ ezer Ft**.`,
      figure: () => <BarChart highlightSum />,
    },
    {
      title: '3. lépés — Osztás az adatok számával',
      points: 1,
      body: `Az átlagot úgy kapjuk, hogy az összeget elosztjuk az adatok számával ($n = 5$):

$$\\bar{x} = \\dfrac{2900}{5} = 580.$$

Az ábrán piros szaggatott vonallal jelöltük az átlagot. Látható, hogy négy nap (hétfő, kedd, szerda, csütörtök) az átlag alatt, egyetlen nap (péntek) viszont jóval az átlag fölött van — ez utóbbi "húzza fel" az átlagot.`,
      figure: () => <BarChart showAverage />,
    },
  ],
  finalAnswer: 'Az átlagos napi bevétel **580 ezer Ft**.',
  usedFormulas: ['számtani átlag: $\\bar{x} = (x_1 + \\dots + x_n) / n$'],
};

export default { meta, problem, solution };
