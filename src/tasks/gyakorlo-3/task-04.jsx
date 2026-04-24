import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-04',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 4,
  title: 'Mértani sorozat — q és a_1 meghatározása',
  points: 2,
  topics: ['mértani sorozat'],
  difficulty: 2,
  fgvt: [{ page: 35, note: 'mértani sorozat n-edik tagja' }],
  estimatedMinutes: 3,
};

// a_3 = 18, a_5 = 162 → q^2 = 9 → q = 3 (feltesszük: pozitív q), a_1 = a_3/q^2 = 2.
// a_n: 2, 6, 18, 54, 162
const TERMS = [2, 6, 18, 54, 162];

function SeqBars({ highlight = 0 }) {
  const yMax = 180;
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <Axes x={50} y={30} w={420} h={220} xMin={0} xMax={6} yMin={0} yMax={yMax} xStep={1} yStep={30} xLabel="n" yLabel="a_n" grid />
      {TERMS.map((v, i) => {
        const n = i + 1;
        const barX = 50 + ((n - 0.3) / 6) * 420;
        const barW = (0.6 / 6) * 420;
        const barTopY = 30 + 220 - (v / yMax) * 220;
        const barH = 30 + 220 - barTopY;
        const hl = highlight === 0 || n === highlight || (highlight === 35 && (n === 3 || n === 5));
        const fill = hl ? '#2563eb' : '#cbd5e1';
        return (
          <g key={n}>
            <rect x={barX} y={barTopY} width={barW} height={barH} fill={fill} fillOpacity={hl ? 0.85 : 0.4} stroke="#1e3a8a" />
            <text x={barX + barW / 2} y={barTopY - 6} fontSize="13" fontWeight={hl ? 700 : 400} textAnchor="middle" fill="#1e3a8a">{v}</text>
          </g>
        );
      })}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy mértani sorozat harmadik tagja $a_3 = 18$, ötödik tagja $a_5 = 162$, és a hányados pozitív ($q > 0$).

Határozza meg az első tagot ($a_1$) és a hányadost ($q$)!
Megoldását részletezze!`,
  figure: () => <SeqBars highlight={35} />,
  asked: [
    { key: 'q', label: '$q = ?$' },
    { key: 'a1', label: '$a_1 = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A hányados négyzete a két adott tagból',
      points: 1,
      body: `A mértani sorozat $n$-edik tagja: $a_n = a_1 \\cdot q^{n-1}$. Két megadott tagra:

$$a_3 = a_1 q^2, \\qquad a_5 = a_1 q^4.$$

Osszuk el $a_5$-t $a_3$-mal:

$$\\dfrac{a_5}{a_3} = \\dfrac{a_1 q^4}{a_1 q^2} = q^2.$$

Behelyettesítve:

$$q^2 = \\dfrac{162}{18} = 9 \\;\\Longrightarrow\\; q = 3 \\text{ (mivel } q > 0\\text{).}$$`,
      figure: () => <SeqBars highlight={35} />,
    },
    {
      title: '2. lépés — Az első tag meghatározása',
      points: 1,
      body: `Az $a_3 = a_1 q^2$ képletbe behelyettesítve:

$$18 = a_1 \\cdot 9 \\;\\Longrightarrow\\; a_1 = 2.$$

**Ellenőrzés**: $a_1 = 2, a_2 = 6, a_3 = 18, a_4 = 54, a_5 = 162$ — mindkét feltétel teljesül. ✓`,
      figure: () => <SeqBars highlight={0} />,
    },
  ],
  finalAnswer: {
    q: '$q = 3$',
    a1: '$a_1 = 2$',
  },
  usedFormulas: [
    'mértani sorozat n-edik tagja: $a_n = a_1 q^{n-1}$',
    'két tag hányadosa: $a_{n+k}/a_n = q^k$',
  ],
};

export default { meta, problem, solution };
