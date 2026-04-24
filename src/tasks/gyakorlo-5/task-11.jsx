import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-11',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 11,
  title: 'Számtani sorozat — első n tag összege',
  points: 3,
  topics: ['számtani sorozat'],
  difficulty: 2,
  fgvt: [{ page: 34, note: 'számtani sorozat' }],
  estimatedMinutes: 4,
  // a1 = -3, d = 5, n = 25
  // a_25 = -3 + 24·5 = -3 + 120 = 117
  // S_25 = (-3 + 117)·25/2 = 114·25/2 = 2850/2 = 1425
  check: { type: 'number', value: 1425, tolerance: 0.5 },
};

function SequenceBars() {
  const a1 = -3, d = 5;
  const terms = Array.from({ length: 8 }, (_, i) => a1 + i * d);
  const min = Math.min(0, terms[0]);
  const max = terms[terms.length - 1];
  const barW = 36, gap = 12;
  const baseY = 160;
  const scale = 100 / (max - min);
  return (
    <SvgCanvas width={480} height={260} viewBox="0 0 480 260">
      <text x="240" y="22" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        Számtani sorozat első 8 tagja: a₁ = −3, d = 5
      </text>
      <line x1="30" y1={baseY - (0 - min) * scale} x2="450" y2={baseY - (0 - min) * scale} stroke="#111" strokeWidth="1.2" />
      {terms.map((v, i) => {
        const x = 40 + i * (barW + gap);
        const y0 = baseY - (0 - min) * scale;
        const h = v * scale;
        const y = v >= 0 ? y0 - h : y0;
        const hh = Math.abs(h);
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={hh} fill={v < 0 ? '#fecaca' : '#bfdbfe'} stroke={v < 0 ? '#991b1b' : '#1e3a8a'} strokeWidth="1.2" />
            <text x={x + barW / 2} y={v >= 0 ? y - 4 : y + hh + 14} fontSize="12" textAnchor="middle" fontWeight="bold" fill={v < 0 ? '#991b1b' : '#1e3a8a'}>{v}</text>
            <text x={x + barW / 2} y={218} fontSize="11" textAnchor="middle" fill="#555">a{i + 1}</text>
          </g>
        );
      })}
      <text x="240" y="244" fontSize="11" textAnchor="middle" fill="#6b7280">
        (minden tag az előző + 5)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy számtani sorozat első tagja $a_1 = -3$, különbsége $d = 5$.

Számítsa ki a sorozat első **huszonöt** tagjának összegét ($S_{25}$)!`,
  figure: () => <SequenceBars />,
  asked: [{ key: 'S25', label: '$S_{25} = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A huszonötödik tag meghatározása',
      points: 1,
      body: `A számtani sorozat $n$-edik tagjának képlete:

$$a_n = a_1 + (n - 1) d.$$

$n = 25$, $a_1 = -3$, $d = 5$:

$$a_{25} = -3 + (25 - 1) \\cdot 5 = -3 + 24 \\cdot 5 = -3 + 120 = 117.$$`,
    },
    {
      title: '2. lépés — Az összeg képlete',
      points: 1,
      body: `A számtani sorozat első $n$ tagjának összege:

$$S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2}.$$`,
    },
    {
      title: '3. lépés — Behelyettesítés és ellenőrzés',
      points: 1,
      body: `$$S_{25} = \\dfrac{(-3 + 117) \\cdot 25}{2} = \\dfrac{114 \\cdot 25}{2} = \\dfrac{2850}{2} = 1425.$$

Tehát $\\boxed{S_{25} = 1425}$.

**Ellenőrzés** a másik képlettel:
$$S_n = \\dfrac{(2 a_1 + (n-1)d) \\cdot n}{2} = \\dfrac{(-6 + 24 \\cdot 5) \\cdot 25}{2} = \\dfrac{(-6 + 120) \\cdot 25}{2} = \\dfrac{114 \\cdot 25}{2} = 1425 \\ \\checkmark.$$`,
    },
  ],
  finalAnswer: { S25: '$S_{25} = 1425$' },
  usedFormulas: [
    '$a_n = a_1 + (n-1)d$',
    '$S_n = \\dfrac{(a_1 + a_n) n}{2}$',
  ],
};

export default { meta, problem, solution };
