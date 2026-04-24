import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-2-16a',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.B',
  number: 16,
  subpart: 'a',
  title: 'Valószínűség — dobókocka párbaj',
  points: 9,
  topics: ['valószínűség'],
  difficulty: 4,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 93, note: 'kombinatorika' },
    { page: 94, note: 'binomiális eloszlás' },
  ],
  estimatedMinutes: 12,
};

// Két dobókocka dobása. Esetek = 36.
// a) Legalább az egyiken 6-os: 1 - P(egyiken sem 6) = 1 - (5/6)^2 = 1 - 25/36 = 11/36
// b) Összeg = 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) -> 6 eset, P = 6/36 = 1/6
// c) 4-szer dobunk két kockával. Mekkora annak a valószínűsége, hogy pontosan 2-szer dobunk 7-et?
//    Binomiális: n=4, p = 1/6, k=2
//    P = C(4,2) * (1/6)^2 * (5/6)^2 = 6 * 1/36 * 25/36 = 150/1296 = 25/216 ≈ 0,1157

function DiceTable({ highlight = 'none' }) {
  const color = (a, b) => {
    const sum = a + b;
    if (highlight === 'six' && (a === 6 || b === 6)) return '#fecaca';
    if (highlight === 'sum7' && sum === 7) return '#bbf7d0';
    return '#f3f4f6';
  };
  return (
    <SvgCanvas width={420} height={380} viewBox="0 0 420 380">
      <text x="210" y="20" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        Két dobókocka — az összes (6 × 6 = 36) kimenetel
      </text>
      {/* Header */}
      {[1, 2, 3, 4, 5, 6].map((j) => (
        <text key={`h${j}`} x={80 + j * 45} y={48} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#111">{j}</text>
      ))}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <text key={`r${i}`} x={40} y={80 + (i - 1) * 45} fontSize="13" fontWeight="bold" fill="#111">{i}</text>
      ))}
      {/* Cellák */}
      {[1, 2, 3, 4, 5, 6].map((i) =>
        [1, 2, 3, 4, 5, 6].map((j) => (
          <g key={`${i}-${j}`}>
            <rect
              x={80 + j * 45 - 18}
              y={80 + (i - 1) * 45 - 18}
              width="36"
              height="36"
              fill={color(i, j)}
              stroke="#4b5563"
              strokeWidth="1"
            />
            <text
              x={80 + j * 45}
              y={80 + (i - 1) * 45 + 4}
              fontSize="11"
              textAnchor="middle"
              fill="#111"
            >
              {i + j}
            </text>
          </g>
        ))
      )}
      <text x="210" y="370" fontSize="11" textAnchor="middle" fill="#6b7280">
        cella érték = a két dobás összege
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Kockapárbajban két szabályos, hatoldalú dobókockát dobunk fel egyszerre.

**a)** Mekkora a valószínűsége, hogy legalább az **egyik** kockán $6$-ost dobunk? ($3$ pont)

**b)** Mekkora a valószínűsége, hogy a két dobott szám **összege** pontosan $7$? ($3$ pont)

**c)** A párbajt $4$ menetből álló sorozatban játsszuk. Mekkora a valószínűsége, hogy **pontosan** két menetben dobunk összeget $7$-et? ($3$ pont)

Az eredményeket közönséges törtben és tizedes törtben (négy tizedesjegyig) is adja meg!`,
  figure: () => <DiceTable />,
  asked: [
    { key: 'a', label: 'a) $P(\\text{legalább egy 6}) = ?$' },
    { key: 'b', label: 'b) $P(\\text{összeg } = 7) = ?$' },
    { key: 'c', label: 'c) $P(\\text{pontosan 2-ben 7-es összeg 4 menetből}) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — Komplementer-módszer',
      points: 3,
      body: `A „legalább egyik" események megoldásának elegáns módja a **komplementer esemény**:

- komplementer = „**egyik sem** 6-os".

Egy kockán az $1..5$ értékek dobása kompatibilis ezzel, tehát egy kockán $P(\\text{nem 6}) = \\dfrac{5}{6}$. A két dobás **független**, így:

$$P(\\text{egyiken sem 6}) = \\dfrac{5}{6} \\cdot \\dfrac{5}{6} = \\dfrac{25}{36}.$$

Így:

$$P(\\text{legalább egy 6}) = 1 - \\dfrac{25}{36} = \\dfrac{11}{36} \\approx 0{,}3056.$$

$$\\boxed{P = \\dfrac{11}{36} \\approx 0{,}3056.}$$`,
      figure: () => <DiceTable highlight="six" />,
    },
    {
      title: 'b) lépés — Klasszikus valószínűség',
      points: 3,
      body: `Az összes lehetséges kimenetel száma $6 \\cdot 6 = 36$ (rendezett párok).

**Kedvező esetek** (összeg = 7): a táblázatban egy átlót alkotnak:

$$(1,6), (2,5), (3,4), (4,3), (5,2), (6,1).$$

Ez $6$ eset. Klasszikus valószínűség:

$$P(\\text{összeg} = 7) = \\dfrac{6}{36} = \\dfrac{1}{6} \\approx 0{,}1667.$$

**Megjegyzés:** a $7$ a legvalószínűbb összeg két kockán, mert neki van a legtöbb felbontása.

$$\\boxed{P = \\dfrac{1}{6} \\approx 0{,}1667.}$$`,
      figure: () => <DiceTable highlight="sum7" />,
    },
    {
      title: 'c/1. lépés — Binomiális eloszlás modellje',
      points: 1,
      body: `Most $4$ **független** kísérletet ("menet") végzünk, mindegyikben a „siker" = az összeg $7$, valószínűsége $p = \\dfrac{1}{6}$. Annak a valószínűsége, hogy **pontosan** $k = 2$ menetben sikerül:

$$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k},$$

ahol $n = 4$, $k = 2$, $p = \\dfrac{1}{6}$, $1 - p = \\dfrac{5}{6}$.`,
    },
    {
      title: 'c/2. lépés — Számolás',
      points: 2,
      body: `$$\\binom{4}{2} = \\dfrac{4!}{2! \\cdot 2!} = 6.$$

$$P(X = 2) = 6 \\cdot \\left(\\dfrac{1}{6}\\right)^2 \\cdot \\left(\\dfrac{5}{6}\\right)^2 = 6 \\cdot \\dfrac{1}{36} \\cdot \\dfrac{25}{36}.$$

$$= \\dfrac{6 \\cdot 25}{36 \\cdot 36} = \\dfrac{150}{1296} = \\dfrac{25}{216}.$$

Tizedes törtben: $\\dfrac{25}{216} \\approx 0{,}1157$.

$$\\boxed{P = \\dfrac{25}{216} \\approx 0{,}1157.}$$`,
    },
  ],
  finalAnswer: {
    a: '$P = \\dfrac{11}{36} \\approx 0{,}3056$',
    b: '$P = \\dfrac{1}{6} \\approx 0{,}1667$',
    c: '$P = \\dfrac{25}{216} \\approx 0{,}1157$',
  },
  usedFormulas: [
    'komplementer: $P(\\bar{A}) = 1 - P(A)$',
    'klasszikus valószínűség: $P(A) = |A|/|\\Omega|$',
    'binomiális eloszlás: $P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$',
    'független események: $P(A \\cap B) = P(A) \\cdot P(B)$',
  ],
};

export default { meta, problem, solution };
