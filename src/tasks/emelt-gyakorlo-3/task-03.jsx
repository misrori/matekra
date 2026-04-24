import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-03',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'I',
  number: 3,
  title: 'Rekurzív sorozat zárt alakra hozása',
  points: 12,
  topics: ['számtani sorozat', 'mértani sorozat'],
  difficulty: 4,
  fgvt: [
    { page: 34, note: 'számtani sorozat' },
    { page: 35, note: 'mértani sorozat' },
  ],
  estimatedMinutes: 18,
};

// Rekurzió: a_{n+1} = 3 a_n - 4, a_1 = 5
// Fixpont: L = 3L - 4 -> L = 2
// b_n = a_n - 2,  b_{n+1} = a_{n+1} - 2 = 3 a_n - 4 - 2 = 3 a_n - 6 = 3(a_n - 2) = 3 b_n
// b_1 = a_1 - 2 = 3
// b_n = 3 · 3^{n-1} = 3^n
// a_n = 3^n + 2
// Ellenőrzés: a_1 = 3 + 2 = 5 ✓, a_2 = 9 + 2 = 11, ellenőr: 3·5 - 4 = 11 ✓
// a_3 = 27 + 2 = 29, 3·11 - 4 = 29 ✓
// S_n = sum(3^k + 2) k=1..n = (3^{n+1}-3)/2 + 2n

function SequencePlot({ showFormula = false, cumulative = false }) {
  const terms = [5, 11, 29, 83, 245]; // n = 1..5
  const yMax = 260;
  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes
        x={50} y={30} w={420} h={240}
        xMin={0} xMax={6} yMin={0} yMax={yMax}
        xStep={1} yStep={50}
        xLabel="n" yLabel="a_n"
        grid
      />
      {terms.map((v, i) => {
        const n = i + 1;
        const xPos = 50 + (n / 6) * 420;
        const yPos = 30 + 240 - (v / yMax) * 240;
        return (
          <g key={n}>
            <circle cx={xPos} cy={yPos} r="6" fill="#2563eb" />
            <text x={xPos} y={yPos - 10} fontSize="12" textAnchor="middle" fill="#1e3a8a" fontWeight="700">
              {v}
            </text>
          </g>
        );
      })}
      {showFormula && (
        <g>
          <rect x={70} y={50} width={180} height={54} fill="#fef3c7" stroke="#b45309" rx="4" />
          <text x={160} y={72} fontSize="13" textAnchor="middle" fill="#78350f" fontWeight="700">
            Zárt alak:
          </text>
          <text x={160} y={94} fontSize="14" textAnchor="middle" fill="#78350f" fontFamily="monospace">
            aₙ = 3ⁿ + 2
          </text>
        </g>
      )}
      {cumulative && (
        <text x={260} y={20} fontSize="12" textAnchor="middle" fill="#065f46" fontWeight="700">
          gyors növekedés — exponenciális jelleg
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $(a_n)$ sorozatot a következő **rekurzív** módon definiálunk:

$$a_1 = 5, \\qquad a_{n+1} = 3 a_n - 4 \\quad (n \\geq 1).$$

**a)** Számítsa ki $a_2, a_3, a_4$ értékét! ($2$ pont)

**b)** Igazolja, hogy létezik olyan $L$ szám, amelyre ha $b_n = a_n - L$, akkor $(b_n)$ mértani sorozat, és adja meg ezt az $L$ értéket! ($4$ pont)

**c)** Hozza zárt alakra az $(a_n)$ sorozatot! ($3$ pont)

**d)** Számítsa ki az első $n$ tag összegét, $S_n$-t, zárt alakban! ($3$ pont)`,
  figure: () => <SequencePlot />,
  asked: [
    { key: 'abc', label: 'a) $a_2, a_3, a_4$' },
    { key: 'L', label: 'b) $L = ?$' },
    { key: 'an', label: 'c) $a_n = ?$' },
    { key: 'Sn', label: 'd) $S_n = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Az első néhány tag',
      points: 2,
      body: `Behelyettesítünk sorban:

- $a_2 = 3 a_1 - 4 = 3 \\cdot 5 - 4 = 11$
- $a_3 = 3 a_2 - 4 = 3 \\cdot 11 - 4 = 29$
- $a_4 = 3 a_3 - 4 = 3 \\cdot 29 - 4 = 83$

Megfigyelhető, hogy a sorozat **gyorsan nő** — ez mértani/exponenciális jellegre utal.`,
    },
    {
      title: 'b/1. lépés — A fixpont ($L$) meghatározása',
      points: 2,
      body: `Ha létezne olyan állandó sorozat $a_n = L$, amely kielégíti a rekurziót, akkor $L = 3L - 4$, ahonnan

$$2L = 4 \\;\\Longrightarrow\\; L = 2.$$

Ezt nevezzük a rekurzió **fixpontjának**. (A kiinduló sorozat nem ez, de ez lesz a „tolás", amely segít a mértani szerkezetet kihozni.)`,
    },
    {
      title: 'b/2. lépés — $b_n = a_n - 2$ mértani sorozat',
      points: 2,
      body: `Definiáljuk $b_n = a_n - 2$. Ekkor $b_1 = 5 - 2 = 3$. Nézzük meg, milyen rekurziónak tesz eleget $(b_n)$:

$$b_{n+1} = a_{n+1} - 2 = (3 a_n - 4) - 2 = 3 a_n - 6 = 3(a_n - 2) = 3 b_n.$$

Ez pedig éppen egy **mértani sorozat** definíciója: $b_{n+1} = q \\cdot b_n$ ahol $q = 3$. Tehát $(b_n)$ mértani sorozat $b_1 = 3$, $q = 3$ paraméterekkel.

**Tehát $L = 2$.**`,
    },
    {
      title: 'c) lépés — Zárt alak',
      points: 3,
      body: `A mértani sorozat $n$-edik tagjának képletéből (fgv. tábla, 35. old.):

$$b_n = b_1 \\cdot q^{n-1} = 3 \\cdot 3^{n-1} = 3^n.$$

Ebből $a_n = b_n + 2$, tehát

$$\\boxed{a_n = 3^n + 2}.$$

**Ellenőrzés:**
- $a_1 = 3^1 + 2 = 5$ ✓
- $a_2 = 3^2 + 2 = 11$ ✓
- $a_3 = 3^3 + 2 = 29$ ✓
- $a_4 = 3^4 + 2 = 83$ ✓`,
      figure: () => <SequencePlot showFormula />,
    },
    {
      title: 'd/1. lépés — Az összeg szétbontása',
      points: 1,
      body: `Az első $n$ tag összege:

$$S_n = \\sum_{k=1}^{n} a_k = \\sum_{k=1}^{n} (3^k + 2) = \\underbrace{\\sum_{k=1}^{n} 3^k}_{\\text{mértani}} + \\underbrace{\\sum_{k=1}^{n} 2}_{\\text{konstans}}.$$`,
    },
    {
      title: 'd/2. lépés — A két részösszeg kiszámolása',
      points: 2,
      body: `**A mértani rész** (első tag $3$, hányados $3$, $n$ tag):

$$\\sum_{k=1}^{n} 3^k = 3 \\cdot \\dfrac{3^n - 1}{3 - 1} = \\dfrac{3 (3^n - 1)}{2} = \\dfrac{3^{n+1} - 3}{2}.$$

**A konstans rész:** $\\sum_{k=1}^{n} 2 = 2n.$

Összegezve:

$$\\boxed{S_n = \\dfrac{3^{n+1} - 3}{2} + 2n.}$$

**Ellenőrzés** $n = 3$-ra: $S_3 = 5 + 11 + 29 = 45$, illetve a zárt alakból $\\tfrac{81 - 3}{2} + 6 = 39 + 6 = 45$ ✓.`,
      figure: () => <SequencePlot showFormula cumulative />,
    },
  ],
  finalAnswer: {
    abc: '$a_2 = 11,\\ a_3 = 29,\\ a_4 = 83$',
    L: '$L = 2$',
    an: '$a_n = 3^n + 2$',
    Sn: '$S_n = \\dfrac{3^{n+1} - 3}{2} + 2n$',
  },
  usedFormulas: [
    'rekurzió fixpontja: $L = f(L)$',
    'mértani sorozat tagjai: $b_n = b_1 \\cdot q^{n-1}$',
    'mértani sorozat összege: $S_n = b_1 \\tfrac{q^n-1}{q-1}$',
    'szummák linearitása',
  ],
};

export default { meta, problem, solution };
