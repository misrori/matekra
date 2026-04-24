import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-11',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 11,
  title: 'Mértani sorozat — első 6 tag összege',
  points: 3,
  topics: ['mértani sorozat'],
  difficulty: 3,
  fgvt: [{ page: 35, note: 'mértani sorozat összege' }],
  estimatedMinutes: 5,
  // a_1 = 3, q = 2 → S_6 = 3·(2^6 − 1)/(2 − 1) = 3·63 = 189.
  check: { type: 'number', value: 189 },
};

const TERMS = [3, 6, 12, 24, 48, 96];

function SeqBars() {
  const yMax = 110;
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <text x="260" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Mértani sorozat — a₁ = 3, q = 2
      </text>
      <Axes x={50} y={40} w={420} h={220} xMin={0} xMax={7} yMin={0} yMax={yMax} xStep={1} yStep={20} xLabel="n" yLabel="aₙ" grid />
      {TERMS.map((v, i) => {
        const n = i + 1;
        const barX = 50 + ((n - 0.3) / 7) * 420;
        const barW = (0.6 / 7) * 420;
        const yTop = 40 + 220 - (v / yMax) * 220;
        const barH = 40 + 220 - yTop;
        return (
          <g key={n}>
            <rect x={barX} y={yTop} width={barW} height={barH} fill="#2563eb" fillOpacity="0.8" stroke="#1e3a8a" />
            <text x={barX + barW / 2} y={yTop - 6} fontSize="12" fontWeight="700" textAnchor="middle" fill="#1e3a8a">{v}</text>
          </g>
        );
      })}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy mértani sorozat első tagja $a_1 = 3$, a hányadosa $q = 2$.

Számítsa ki a sorozat **első hat tagjának összegét** ($S_6$)! A megoldás lépéseit részletezze!`,
  figure: () => <SeqBars />,
  asked: [{ key: 'S', label: '$S_6 = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A mértani sorozat összegképlete',
      points: 1,
      body: `Az első $n$ tag összege (fgv. tábla $35.$ old.):

$$S_n = a_1 \\cdot \\dfrac{q^n - 1}{q - 1}, \\quad q \\neq 1.$$`,
      figure: () => <SeqBars />,
    },
    {
      title: '2. lépés — Behelyettesítés',
      points: 1,
      body: `$a_1 = 3$, $q = 2$, $n = 6$:

$$S_6 = 3 \\cdot \\dfrac{2^6 - 1}{2 - 1} = 3 \\cdot \\dfrac{64 - 1}{1} = 3 \\cdot 63.$$`,
      figure: () => <SeqBars />,
    },
    {
      title: '3. lépés — Kiszámítás',
      points: 1,
      body: `$$S_6 = 3 \\cdot 63 = 189.$$

**Ellenőrzés** közvetlen összeadással: $3 + 6 + 12 + 24 + 48 + 96 = 189.$ ✓`,
      figure: () => <SeqBars />,
    },
  ],
  finalAnswer: { S: '$S_6 = 189$' },
  usedFormulas: ['$S_n = a_1(q^n-1)/(q-1)$ ha $q \\neq 1$'],
};

export default { meta, problem, solution };
