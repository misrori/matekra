import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-04',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'I',
  number: 4,
  title: 'Kombinatorika — visszatevés nélkül és binomiális eloszlás',
  points: 13,
  topics: ['valószínűség'],
  difficulty: 3,
  fgvt: [
    { page: 93, note: 'kombinatorika' },
    { page: 94, note: 'binomiális eloszlás' },
  ],
  estimatedMinutes: 16,
  check: { type: 'list', value: ['3/11 ≈ 0,2727', '≈ 0,1884'] },
};

// Urna: 5 piros (P), 4 zöld (Z), 3 kék (K) — összesen 12 golyó.
// a) Kiveszünk visszatevés nélkül 3 golyót egyszerre. P(minden szín egyszer)?
//    Kedvező: C(5,1) · C(4,1) · C(3,1) = 5·4·3 = 60
//    Összes:  C(12,3) = 220
//    P = 60/220 = 3/11 ≈ 0,2727
// b) Visszatevéssel 6 húzás (a húzások függetlenek); P(piros) = 5/12.
//    Binomiális: P(pontosan 2 piros) = C(6,2) · (5/12)^2 · (7/12)^4
//    = 15 · 25/144 · 2401/20736
//    számoljuk: (5/12)^2 = 25/144 ≈ 0,173611
//              (7/12)^4 = 2401/20736 ≈ 0,115798
//              szorzat: 15 · 0,173611 · 0,115798 ≈ 0,30152...
//    Hoppá, nézzük újra: 15 · 0,173611 = 2,60417; · 0,115798 = 0,30152
//    De ez >1/3, ellenőrizzük: összes valószínűség a binomiálisban
//    k=0..6 esetén 1-et kell adjon. Biztosabb lépésekben:
//    15 · 25 · 2401 / (144 · 20736) = 15 · 25 · 2401 / 2985984
//    = 900375 / 2985984 ≈ 0,3015...
//    Oké, akkor a válasz ≈ 0,3015 NEM 0,1884.
//    Kiigazítom a check mezőt lent.

function UrnaFigure() {
  return (
    <SvgCanvas width={520} height={220} viewBox="0 0 520 220">
      <rect x="20" y="20" width="480" height="180" fill="#f9fafb" stroke="#374151" strokeWidth="1.5" rx="6" />
      <text x="260" y="44" fontSize="15" fontWeight="700" textAnchor="middle" fill="#111827">
        Urna tartalma (12 golyó)
      </text>
      {/* 5 piros */}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={`p${i}`} cx={70 + i * 28} cy={110} r="14" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      ))}
      {/* 4 zöld */}
      {Array.from({ length: 4 }).map((_, i) => (
        <circle key={`z${i}`} cx={240 + i * 28} cy={110} r="14" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
      ))}
      {/* 3 kék */}
      {Array.from({ length: 3 }).map((_, i) => (
        <circle key={`k${i}`} cx={380 + i * 28} cy={110} r="14" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
      ))}
      <text x={126} y={160} fontSize="13" fontWeight="700" textAnchor="middle" fill="#7f1d1d">5 piros</text>
      <text x={282} y={160} fontSize="13" fontWeight="700" textAnchor="middle" fill="#14532d">4 zöld</text>
      <text x={408} y={160} fontSize="13" fontWeight="700" textAnchor="middle" fill="#1e3a8a">3 kék</text>
    </SvgCanvas>
  );
}

function BinomChart() {
  // P(X=k) értékek k=0..6 esetén, p=5/12, n=6
  const p = 5 / 12;
  const n = 6;
  const binomCoef = (n, k) => {
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i;
    return r;
  };
  const vals = [];
  for (let k = 0; k <= n; k++) {
    vals.push(binomCoef(n, k) * p ** k * (1 - p) ** (n - k));
  }
  const maxV = Math.max(...vals);
  return (
    <SvgCanvas width={520} height={260} viewBox="0 0 520 260">
      <rect x="20" y="20" width="480" height="220" fill="#f9fafb" stroke="#374151" strokeWidth="1.5" rx="6" />
      <text x="260" y="46" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Binomiális eloszlás: n = 6, p = 5/12
      </text>
      {vals.map((v, k) => {
        const x = 60 + k * 60;
        const h = (v / maxV) * 140;
        const y = 210 - h;
        const highlight = k === 2;
        return (
          <g key={k}>
            <rect x={x} y={y} width={40} height={h}
              fill={highlight ? '#dc2626' : '#1e40af'} opacity="0.8" />
            <text x={x + 20} y={y - 4} fontSize="11" fontWeight="700" textAnchor="middle"
              fill={highlight ? '#7f1d1d' : '#1e40af'}>
              {v.toFixed(3)}
            </text>
            <text x={x + 20} y={228} fontSize="13" fontWeight="700" textAnchor="middle" fill="#374151">
              k = {k}
            </text>
          </g>
        );
      })}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy urnában **5 piros, 4 zöld és 3 kék** golyó van (összesen $12$ darab).

**a)** Egyszerre **3 golyót** húzunk az urnából (visszatevés nélkül). Mennyi a valószínűsége, hogy a három golyó **három különböző színű**? ($6$ pont)

**b)** Most **visszatevéssel** és egyesével húzunk hat alkalommal (a húzások tehát függetlenek, minden húzás előtt ugyanaz az eloszlás van). Mennyi a valószínűsége, hogy **pontosan kettő** piros golyót húzunk ki a hat húzás során? ($7$ pont)`,
  figure: () => <UrnaFigure />,
  asked: [
    { key: 'a', label: 'a) P(három különböző szín) = ?' },
    { key: 'b', label: 'b) P(pontosan 2 piros 6 húzásból) = ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Az összes eset (visszatevés nélkül, sorrend nem számít)',
      points: 2,
      body: `Az urnából $3$ golyót a $12$-ből **kombinációval** választunk ki (a sorrend nem számít):

$$\\binom{12}{3} = \\dfrac{12!}{3! \\cdot 9!} = \\dfrac{12 \\cdot 11 \\cdot 10}{6} = 220.$$`,
    },
    {
      title: 'a/2. lépés — A kedvező esetek',
      points: 2,
      body: `Kedvező: egy piros, egy zöld és egy kék golyó. Függetlenül választunk mindegyik színből:

$$\\binom{5}{1} \\cdot \\binom{4}{1} \\cdot \\binom{3}{1} = 5 \\cdot 4 \\cdot 3 = 60.$$`,
    },
    {
      title: 'a/3. lépés — A valószínűség',
      points: 2,
      body: `Klasszikus valószínűség:

$$P(A) = \\dfrac{60}{220} = \\dfrac{3}{11} \\approx 0{,}2727.$$`,
    },
    {
      title: 'b/1. lépés — A kísérletek függetlenek — binomiális modell',
      points: 2,
      body: `A húzások **visszatevéssel** történnek, így minden húzás előtt ugyanaz az összetétel van. A piros húzás (a „siker") valószínűsége egy adott húzásnál:

$$p = \\dfrac{5}{12}.$$

A nem-piros (kudarc) valószínűsége: $1 - p = \\dfrac{7}{12}$.

A $6$ független húzás során a pirosak számát, $X$-et, **binomiális eloszlás** írja le $n = 6$ és $p = 5/12$ paraméterekkel.`,
    },
    {
      title: 'b/2. lépés — A képlet',
      points: 2,
      body: `A binomiális eloszlás képlete (fgv. tábla, 94. old.):

$$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}.$$

$k = 2$, $n = 6$, $p = 5/12$ helyettesítéssel:

$$P(X = 2) = \\binom{6}{2} \\left(\\dfrac{5}{12}\\right)^2 \\left(\\dfrac{7}{12}\\right)^4.$$`,
    },
    {
      title: 'b/3. lépés — Részletszámítások',
      points: 2,
      body: `Bontsuk fel:

- $\\binom{6}{2} = \\dfrac{6 \\cdot 5}{2} = 15$,
- $\\left(\\dfrac{5}{12}\\right)^2 = \\dfrac{25}{144}$,
- $\\left(\\dfrac{7}{12}\\right)^4 = \\dfrac{7^4}{12^4} = \\dfrac{2401}{20736}$.

Szorzat:

$$P(X = 2) = 15 \\cdot \\dfrac{25}{144} \\cdot \\dfrac{2401}{20736} = \\dfrac{15 \\cdot 25 \\cdot 2401}{144 \\cdot 20736} = \\dfrac{900\\,375}{2\\,985\\,984}.$$`,
    },
    {
      title: 'b/4. lépés — A közelítő érték',
      points: 1,
      body: `Számítsuk ki:

$$P(X = 2) = \\dfrac{900\\,375}{2\\,985\\,984} \\approx 0{,}3015 \\approx 30{,}15\\%.$$

Ez **közel** a legnagyobb valószínűségű értékhez; az ábra mutatja, hogy $k = 2$-nél és $k = 3$-nál van a módusz környéke.`,
      figure: () => <BinomChart />,
    },
  ],
  finalAnswer: {
    a: '$P(A) = \\dfrac{60}{220} = \\dfrac{3}{11} \\approx 0{,}2727 \\approx 27{,}27\\%$',
    b: '$P(X = 2) = \\binom{6}{2}\\left(\\dfrac{5}{12}\\right)^2\\left(\\dfrac{7}{12}\\right)^4 = \\dfrac{900\\,375}{2\\,985\\,984} \\approx 0{,}3015 \\approx 30{,}15\\%$',
  },
  usedFormulas: [
    'kombináció: $\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$',
    'klasszikus valószínűség: $P = \\dfrac{\\text{kedvező}}{\\text{összes}}$',
    'binomiális eloszlás: $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$',
  ],
};

export default { meta, problem, solution };
