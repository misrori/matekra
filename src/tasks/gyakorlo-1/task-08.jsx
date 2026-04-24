import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-08',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 8,
  title: 'Futóverseny időeredményeinek sodródiagramja',
  points: 4,
  topics: ['statisztika'],
  difficulty: 2,
  fgvt: [
    { page: 100, note: 'medián' },
    { page: 102, note: 'sodródiagram' },
  ],
  estimatedMinutes: 7,
};

// 12 futó 10 km-es futóverseny idői (percben):
// 42, 43, 45, 45, 46, 48, 49, 50, 52, 54, 56, 60  (rendezve)
const DATA = [42, 43, 45, 45, 46, 48, 49, 50, 52, 54, 56, 60];

const BOX_W = 520;
const BOX_H = 220;
const X0 = 50;
const X1 = 490;
const Y_AXIS = 150;
const VAL_MIN = 40;
const VAL_MAX = 62;

const sx = (v) => X0 + ((v - VAL_MIN) / (VAL_MAX - VAL_MIN)) * (X1 - X0);

function Axis() {
  const ticks = [];
  for (let v = VAL_MIN; v <= VAL_MAX; v += 2) ticks.push(v);
  return (
    <g>
      <line x1={X0} y1={Y_AXIS} x2={X1} y2={Y_AXIS} stroke="#1a1a1a" strokeWidth="1.5" />
      {ticks.map((v) => (
        <g key={`t${v}`}>
          <line x1={sx(v)} y1={Y_AXIS - 4} x2={sx(v)} y2={Y_AXIS + 4} stroke="#1a1a1a" />
          <text x={sx(v)} y={Y_AXIS + 18} fontSize="11" textAnchor="middle" fill="#444">
            {v}
          </text>
        </g>
      ))}
      <text x={X1 + 6} y={Y_AXIS + 4} fontSize="11" fill="#444">perc</text>
    </g>
  );
}

function BoxPlot({ step = 0 }) {
  const MIN = 42;
  const Q1 = 45;
  const MED = 48.5;
  const Q3 = 53;
  const MAX = 60;

  return (
    <SvgCanvas width={BOX_W} height={BOX_H} viewBox={`0 0 ${BOX_W} ${BOX_H}`}>
      <Axis />

      {step <= 1 &&
        DATA.map((v, i) => {
          const isMiddle = step === 1 && (i === 5 || i === 6);
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

      {step === 1 && (
        <g>
          <line x1={sx(MED)} y1={Y_AXIS - 55} x2={sx(MED)} y2={Y_AXIS - 5} stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(MED)} y={Y_AXIS - 60} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            medián = 48,5
          </text>
        </g>
      )}

      {step === 2 && (
        <g>
          {DATA.map((v, i) => (
            <circle key={`p${i}`} cx={sx(v)} cy={Y_AXIS - 20} r={4} fill="#94a3b8" fillOpacity="0.6" />
          ))}
          <line x1={sx(Q1)} y1={Y_AXIS - 55} x2={sx(Q1)} y2={Y_AXIS - 5} stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(Q1)} y={Y_AXIS - 60} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#059669">Q₁ = 45</text>
          <line x1={sx(MED)} y1={Y_AXIS - 55} x2={sx(MED)} y2={Y_AXIS - 5} stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(MED)} y={Y_AXIS - 60} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#dc2626">Me = 48,5</text>
          <line x1={sx(Q3)} y1={Y_AXIS - 55} x2={sx(Q3)} y2={Y_AXIS - 5} stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
          <text x={sx(Q3)} y={Y_AXIS - 60} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#7c3aed">Q₃ = 53</text>
        </g>
      )}

      {step === 3 && (
        <g>
          <line x1={sx(MIN)} y1={Y_AXIS - 30} x2={sx(Q1)} y2={Y_AXIS - 30} stroke="#1e3a8a" strokeWidth="2" />
          <line x1={sx(Q3)} y1={Y_AXIS - 30} x2={sx(MAX)} y2={Y_AXIS - 30} stroke="#1e3a8a" strokeWidth="2" />
          <line x1={sx(MIN)} y1={Y_AXIS - 42} x2={sx(MIN)} y2={Y_AXIS - 18} stroke="#1e3a8a" strokeWidth="2" />
          <line x1={sx(MAX)} y1={Y_AXIS - 42} x2={sx(MAX)} y2={Y_AXIS - 18} stroke="#1e3a8a" strokeWidth="2" />
          <rect x={sx(Q1)} y={Y_AXIS - 50} width={sx(Q3) - sx(Q1)} height={40} fill="#bfdbfe" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2" />
          <line x1={sx(MED)} y1={Y_AXIS - 50} x2={sx(MED)} y2={Y_AXIS - 10} stroke="#dc2626" strokeWidth="3" />
          <text x={sx(MIN)} y={Y_AXIS - 56} fontSize="11" textAnchor="middle" fill="#1e3a8a">min = 42</text>
          <text x={sx(Q1)} y={Y_AXIS - 84} fontSize="11" textAnchor="middle" fill="#1e3a8a">Q₁ = 45</text>
          <text x={sx(MED)} y={Y_AXIS - 56} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#dc2626">Me = 48,5</text>
          <text x={sx(Q3)} y={Y_AXIS - 84} fontSize="11" textAnchor="middle" fill="#1e3a8a">Q₃ = 53</text>
          <text x={sx(MAX)} y={Y_AXIS - 56} fontSize="11" textAnchor="middle" fill="#1e3a8a">max = 60</text>
        </g>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy kerületi $10$ km-es tömegsport-versenyen $12$ induló mért ideje (percben):

$$42,\\ 43,\\ 45,\\ 45,\\ 46,\\ 48,\\ 49,\\ 50,\\ 52,\\ 54,\\ 56,\\ 60.$$

Ábrázolja **sodródiagrammal** (box-ploton) az adatokat! Adja meg az ötelemű statisztikát (min, $Q_1$, medián, $Q_3$, max)!`,
  figure: () => <BoxPlot step={0} />,
  asked: [{ key: 'sodro', label: 'Sodródiagram + ötelemű statisztika' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Rendezés, minimum és maximum',
      points: 1,
      body: `Az adatok már rendezett sorrendben vannak. Az elemszám $n = 12$ (páros).

$$42,\\ 43,\\ 45,\\ 45,\\ 46,\\ 48,\\ \\mathbf{48},\\ \\mathbf{49},\\ 50,\\ 52,\\ 54,\\ 56,\\ 60.$$

(A táblázatban jelöltem, hol van a középső két elem — alább ezekkel számolunk.)

- **Minimum:** $42$ perc.
- **Maximum:** $60$ perc.`,
      figure: () => <BoxPlot step={0} />,
    },
    {
      title: '2. lépés — A medián',
      points: 1,
      body: `Páros elemszám esetén a medián a középső két elem átlaga. $n = 12$, így a $6.$ és $7.$ elem átlaga kell.

- $6.$ elem: $48$
- $7.$ elem: $49$

$$\\text{Medián} = \\dfrac{48 + 49}{2} = 48{,}5 \\ \\text{perc}.$$`,
      figure: () => <BoxPlot step={1} />,
    },
    {
      title: '3. lépés — Alsó és felső kvartilis',
      points: 1,
      body: `A kvartilisek a rendezett adatsort **négy egyenlő részre** osztják.

Az alsó fél az első $6$ elem: $42, 43, 45, 45, 46, 48$. Ebből páros elemszám ($6$), az alsó kvartilis a $3.$ és $4.$ elem átlaga:

$$Q_1 = \\dfrac{45 + 45}{2} = 45.$$

A felső fél a $7.$–$12.$ elem: $49, 50, 52, 54, 56, 60$. Hasonlóan a felső kvartilis a $3.$ és $4.$ eleme (a felső fél $3.$-$4.$ tagja, vagyis $52$ és $54$):

$$Q_3 = \\dfrac{52 + 54}{2} = 53.$$`,
      figure: () => <BoxPlot step={2} />,
    },
    {
      title: '4. lépés — A sodródiagram megrajzolása',
      points: 1,
      body: `A box-plot rajzolásához:
1. Számegyenesen $40$–$62$ tartományt veszünk.
2. Doboz $Q_1 = 45$-től $Q_3 = 53$-ig.
3. A dobozban függőleges vonal a $48{,}5$-ös mediánnál.
4. „Bajuszok" a minimumhoz ($42$) és a maximumhoz ($60$).

Az **interkvartilis terjedelem**: $Q_3 - Q_1 = 53 - 45 = 8$ perc.`,
      figure: () => <BoxPlot step={3} />,
    },
  ],
  finalAnswer: {
    sodro: 'Ötelemű statisztika: min $= 42$, $Q_1 = 45$, Me $= 48{,}5$, $Q_3 = 53$, max $= 60$ perc.',
  },
  usedFormulas: [
    'medián páros $n$-re',
    'kvartilis = alsó / felső fél mediánja',
    'sodródiagram: min – $Q_1$ – Me – $Q_3$ – max',
  ],
};

export default { meta, problem, solution };
