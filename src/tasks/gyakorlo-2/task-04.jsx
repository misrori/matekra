import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-04',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 4,
  title: 'Statisztika — módusz, medián, átlag (dolgozatjegyek)',
  points: 2,
  topics: ['statisztika'],
  difficulty: 1,
  fgvt: [{ page: 100, note: 'átlag, medián' }],
  estimatedMinutes: 3,
};

const jegyek = [3, 5, 4, 2, 5, 4, 5, 3, 4, 5];
const rendezett = [...jegyek].sort((a, b) => a - b); // [2,3,3,4,4,4,5,5,5,5]

function BarChart() {
  // Számoljuk meg a gyakoriságot
  const counts = [0, 0, 0, 0, 0]; // 1..5
  jegyek.forEach((g) => { counts[g - 1]++; });
  const maxC = 4;
  const baseY = 170;
  const barH = 25;
  return (
    <SvgCanvas width={420} height={220} viewBox="0 0 420 220">
      <text x="210" y="20" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        10 tanuló dolgozat-jegyei (gyakoriságok)
      </text>
      {[1, 2, 3, 4, 5].map((g, i) => {
        const x = 60 + i * 65;
        const h = counts[i] * barH;
        return (
          <g key={g}>
            <rect x={x} y={baseY - h} width={50} height={h} fill={g === 5 ? '#fbbf24' : '#60a5fa'} stroke="#1e3a8a" strokeWidth="1.2" />
            <text x={x + 25} y={baseY + 18} fontSize="14" textAnchor="middle" fill="#111" fontWeight="bold">{g}</text>
            <text x={x + 25} y={baseY - h - 6} fontSize="12" textAnchor="middle" fill="#111">{counts[i]}</text>
          </g>
        );
      })}
      <line x1="40" y1={baseY} x2="400" y2={baseY} stroke="#111" strokeWidth="1.5" />
      <text x="40" y={baseY + 35} fontSize="11" fill="#555">jegy:</text>
      <text x="400" y={baseY + 35} fontSize="11" textAnchor="end" fill="#555">5 a leggyakoribb (módusz)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy matematika-dolgozaton 10 tanuló a következő osztályzatokat szerezte:

$$3,\\ 5,\\ 4,\\ 2,\\ 5,\\ 4,\\ 5,\\ 3,\\ 4,\\ 5.$$

Határozza meg a dolgozatjegyek **móduszát**, **mediánját** és az osztály **átlagát**!`,
  figure: () => <BarChart />,
  asked: [
    { key: 'mod', label: 'Módusz = ?' },
    { key: 'med', label: 'Medián = ?' },
    { key: 'atl', label: 'Átlag = ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Rendezés és módusz',
      points: 1,
      body: `Rendezzük az adatokat **növekvő sorrendbe**:

$$2,\\ 3,\\ 3,\\ 4,\\ 4,\\ 4,\\ 5,\\ 5,\\ 5,\\ 5.$$

A **módusz** a leggyakrabban előforduló érték. Az $5$-ös jegy $4$-szer szerepel, több mint bármely másik:

- $2$: 1-szer, $3$: 2-szer, $4$: 3-szor, $5$: **4-szer**.

Így **módusz** $= 5$.`,
    },
    {
      title: '2. lépés — Medián',
      points: 0,
      body: `Mivel $n = 10$ páros, a **medián** a rendezett adatsor két középső elemének számtani átlaga. A $5.$ és $6.$ elem:

$$\\text{rendezett}[5] = 4, \\quad \\text{rendezett}[6] = 4.$$

$$\\text{medián} = \\dfrac{4 + 4}{2} = 4.$$`,
    },
    {
      title: '3. lépés — Átlag',
      points: 1,
      body: `A **számtani átlag** képlete:

$$\\bar{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}.$$

Összeg: $3 + 5 + 4 + 2 + 5 + 4 + 5 + 3 + 4 + 5 = 40$.

$$\\bar{x} = \\dfrac{40}{10} = 4.$$

**Összefoglalva:** módusz $= 5$, medián $= 4$, átlag $= 4$.`,
    },
  ],
  finalAnswer: {
    mod: '$5$',
    med: '$4$',
    atl: '$\\bar{x} = 4$',
  },
  usedFormulas: ['módusz (leggyakoribb érték)', 'medián (középső elem)', 'számtani átlag: $\\bar{x} = \\sum x_i / n$'],
};

export default { meta, problem, solution };
