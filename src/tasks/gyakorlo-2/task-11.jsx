import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-11',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 11,
  title: 'Számtani sorozat — n. tag és részletösszeg',
  points: 3,
  topics: ['számtani sorozat'],
  difficulty: 2,
  fgvt: [{ page: 34, note: 'számtani sorozat' }],
  estimatedMinutes: 4,
};

// a_1 = 7, d = 4
// a_20 = 7 + 19*4 = 7 + 76 = 83
// S_20 = (7 + 83)*20/2 = 90*10 = 900

function SequenceBars() {
  // Ábrázoljunk 8 tagot oszlopdiagramon (vizuális érzék)
  const a1 = 7, d = 4;
  const terms = Array.from({ length: 8 }, (_, i) => a1 + i * d);
  const max = terms[terms.length - 1]; // 7 + 7*4 = 35
  const barW = 36, gap = 12;
  const baseY = 220;
  const scale = 160 / max;
  return (
    <SvgCanvas width={480} height={260} viewBox="0 0 480 260">
      <text x="240" y="24" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        Számtani sorozat első 8 tagja: a₁ = 7, d = 4
      </text>
      {terms.map((v, i) => {
        const x = 40 + i * (barW + gap);
        const h = v * scale;
        return (
          <g key={i}>
            <rect x={x} y={baseY - h} width={barW} height={h} fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="1.2" />
            <text x={x + barW / 2} y={baseY - h - 6} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{v}</text>
            <text x={x + barW / 2} y={baseY + 16} fontSize="11" textAnchor="middle" fill="#555">a{i + 1}</text>
          </g>
        );
      })}
      <line x1="30" y1={baseY} x2="450" y2={baseY} stroke="#111" strokeWidth="1.2" />
      <text x="240" y="250" fontSize="11" textAnchor="middle" fill="#6b7280">
        (Minden tag az előző + 4)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy számtani sorozat első tagja $a_1 = 7$, különbsége $d = 4$.

**a)** Határozza meg a sorozat **huszadik tagját** ($a_{20}$)!

**b)** Számítsa ki a sorozat első **húsz** tagjának összegét ($S_{20}$)!`,
  figure: () => <SequenceBars />,
  asked: [
    { key: 'a20', label: '$a_{20} = ?$' },
    { key: 'S20', label: '$S_{20} = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — A 20. tag kiszámítása',
      points: 1,
      body: `Egy számtani sorozat **n-edik tagjának képlete:**

$$a_n = a_1 + (n - 1) \\cdot d.$$

Behelyettesítve $a_1 = 7$, $d = 4$, $n = 20$:

$$a_{20} = 7 + (20 - 1) \\cdot 4 = 7 + 19 \\cdot 4 = 7 + 76 = 83.$$

Tehát $\\boxed{a_{20} = 83}$.`,
    },
    {
      title: 'b/1. lépés — A részletösszeg képletének felírása',
      points: 1,
      body: `A számtani sorozat első $n$ tagjának összege:

$$S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2}.$$

(Intuíció: a szélső tagok összege $= $ második és utolsó-előtti tag összege, és így tovább — ezért szorzunk $n/2$-vel.)`,
    },
    {
      title: 'b/2. lépés — Behelyettesítés',
      points: 1,
      body: `Az előző részből $a_{20} = 83$, így:

$$S_{20} = \\dfrac{(a_1 + a_{20}) \\cdot 20}{2} = \\dfrac{(7 + 83) \\cdot 20}{2} = \\dfrac{90 \\cdot 20}{2} = \\dfrac{1800}{2} = 900.$$

**Ellenőrzés** a másik képlettel:

$$S_n = \\dfrac{(2 a_1 + (n-1) d) \\cdot n}{2} = \\dfrac{(14 + 19 \\cdot 4) \\cdot 20}{2} = \\dfrac{(14 + 76) \\cdot 20}{2} = \\dfrac{90 \\cdot 20}{2} = 900. \\ \\checkmark$$

Tehát $\\boxed{S_{20} = 900}$.`,
    },
  ],
  finalAnswer: {
    a20: '$a_{20} = 83$',
    S20: '$S_{20} = 900$',
  },
  usedFormulas: [
    '$a_n = a_1 + (n - 1) d$',
    '$S_n = \\dfrac{(a_1 + a_n) n}{2}$',
  ],
};

export default { meta, problem, solution };
