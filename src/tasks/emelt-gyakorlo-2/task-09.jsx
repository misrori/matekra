import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-09',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'II',
  number: 9,
  title: 'Binomiális eloszlás — vizsgán több választós teszt',
  points: 16,
  topics: ['valószínűség', 'statisztika'],
  difficulty: 4,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 93, note: 'kombinatorika' },
    { page: 94, note: 'binomiális eloszlás' },
  ],
  estimatedMinutes: 22,
};

// Tesztkérdés: 20 kérdés, mindegyikhez 4 válaszlehetőség, 1 helyes. p = 0,25. n = 20.
// X = helyes válaszok száma. X ~ Bin(20, 0.25). E(X) = np = 5, D^2 = np(1-p) = 3,75, sigma ≈ 1,936.
// a) P(X = 5) = C(20,5) · 0,25^5 · 0,75^15.
//    C(20,5) = 15504.  0,25^5 = 1/1024 ≈ 0,0009766.  0,75^15 ≈ ?
//    log10(0,75) = log10(3/4) = log10(3) - log10(4) ≈ 0,4771 - 0,6021 = -0,1249.
//    15 · (-0,1249) = -1,874  → 0,75^15 ≈ 10^(-1,874) ≈ 0,01336.
//    P(X=5) ≈ 15504 · 0,0009766 · 0,01336 = 15504 · 1,3046e-5 ≈ 0,2023.
// b) P(X >= 10) = ?  (azaz átmenő vizsga, 50% fölötti találat random sejtéssel)
//    Terjedelmes, érdemes több tagot összeadni; megfelelő a táblázat vagy a "≤ 9" komplementer.
//    Normális közelítés: mu = 5, sigma ≈ 1,936. z = (10 - 0,5 - 5)/1,936 = 4,5/1,936 ≈ 2,324. (folytonossági korrekció)
//    P(X >= 10) ≈ P(Z >= 2,324) ≈ 1 - Phi(2,324) ≈ 1 - 0,9899 = 0,0101.
//    Pontos bin: P(X>=10) = Sum_{k=10..20} C(20,k) 0,25^k 0,75^(20-k) ≈ 0,0139 (ismert).
//    A közelítés: 0,0101, a pontos ~0,0139. Elfogadható közelítés.
// c) Hányszor kell legalább a tesztet kitölteni ahhoz, hogy legalább 0,95 legyen a valószínűsége, hogy legalább egyszer 10-et találjunk?
//    p_egy = 0,0139. P(legalább egy siker n kísérletből) = 1 - (1 - p)^n >= 0,95.
//    (1 - 0,0139)^n <= 0,05 → n · log(0,9861) <= log(0,05).
//    log(0,9861) ≈ -0,00608. log(0,05) ≈ -1,301.
//    n >= 1,301 / 0,00608 ≈ 214. Tehát legalább 214 próbálkozás kell.

function BinomialChart() {
  // Binomiális eloszlás Bin(20, 0.25) oszlopdiagram
  const n = 20;
  const p = 0.25;
  // C(n,k) · p^k · (1-p)^(n-k)
  function comb(n, k) {
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i;
    return r;
  }
  const bars = [];
  for (let k = 0; k <= 20; k++) {
    bars.push({ k, v: comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k) });
  }
  const maxV = Math.max(...bars.map((b) => b.v));
  const sx = (k) => 50 + (k / 20) * 420;
  const sy = (v) => 240 - (v / maxV) * 200;

  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      <Axes x={50} y={20} w={420} h={220} xMin={0} xMax={20} yMin={0} yMax={maxV * 1.1} xStep={2} yStep={maxV / 5} xLabel="k" yLabel="P(X=k)" grid={false} />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={sx(b.k) - 9}
          y={sy(b.v)}
          width={18}
          height={240 - sy(b.v)}
          fill={b.k === 5 ? '#16a34a' : b.k >= 10 ? '#dc2626' : '#60a5fa'}
          fillOpacity={b.k >= 10 || b.k === 5 ? 0.85 : 0.65}
          stroke="#1e40af"
          strokeWidth="0.6"
        />
      ))}
      {/* E(X) = 5 */}
      <line x1={sx(5)} y1={20} x2={sx(5)} y2={240} stroke="#15803d" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={sx(5) + 4} y={36} fontSize="11" fill="#15803d">μ = np = 5</text>
      {/* X ≥ 10 sáv */}
      <rect x={sx(9.6)} y={20} width={sx(20) - sx(9.6)} height={220} fill="#fecaca" fillOpacity="0.35" />
      <text x={sx(14.5)} y={36} fontSize="11" fill="#b91c1c">P(X ≥ 10) ≈ 0,014</text>
      <text x={50} y={14} fontSize="12" fill="#111">X ~ Bin(n = 20, p = 0,25)</text>
    </SvgCanvas>
  );
}

function NormalApprox() {
  // Piros: normális közelítő görbe μ=5, σ≈1,936 a bin oszlopokon
  const mu = 5, sigma = Math.sqrt(20 * 0.25 * 0.75);
  const sx = (k) => 50 + (k / 20) * 420;
  const sy = (v) => 240 - v * 1800;
  // oszlopdiagram mint előző fn
  function comb(n, k) {
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i;
    return r;
  }
  const bars = [];
  for (let k = 0; k <= 20; k++) {
    bars.push({ k, v: comb(20, k) * Math.pow(0.25, k) * Math.pow(0.75, 20 - k) });
  }
  // normális sűrűség (folytonos)
  const normPts = [];
  for (let x = 0; x <= 20.01; x += 0.1) {
    const v = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
    normPts.push(`${sx(x).toFixed(2)},${sy(v).toFixed(2)}`);
  }
  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      <Axes x={50} y={20} w={420} h={220} xMin={0} xMax={20} yMin={0} yMax={0.22} xStep={2} yStep={0.04} xLabel="k / x" yLabel="P / f" grid={false} />
      {bars.map((b, i) => (
        <rect key={i} x={sx(b.k) - 9} y={sy(b.v)} width={18} height={240 - sy(b.v)} fill="#93c5fd" fillOpacity="0.55" stroke="#2563eb" strokeWidth="0.6" />
      ))}
      <polyline points={normPts.join(' ')} fill="none" stroke="#dc2626" strokeWidth="2.2" />
      <text x={50} y={14} fontSize="12" fill="#b91c1c">Normális közelítés: N(μ=5; σ≈1,936)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy online vizsgán $n = 20$ kérdésre kell válaszolni. Minden kérdéshez $4$ válaszlehetőség tartozik, amelyekből pontosan $1$ a helyes. Egy diák **tudás nélkül**, teljesen véletlenszerűen tippel mindegyik kérdésnél, így minden kérdésnél $p = 0{,}25$ valószínűséggel talál helyeset, egymástól függetlenül. Jelölje $X$ a helyes válaszok számát.

**a)** Mekkora a valószínűsége, hogy pontosan **5** helyes választ ad? ($4$ pont)

**b)** Mekkora a valószínűsége, hogy a diák **legalább $10$** helyes választ ad (tehát "átmegy" a vizsgán)? Oldja meg **normális közelítéssel** (folytonossági korrekcióval), és hasonlítsa össze az intuitív becsléssel! ($6$ pont)

**c)** A diák **újra és újra** megírja ugyanezt a tesztet (függetlenül). Hány próbálkozás kell ahhoz, hogy **legalább $0{,}95$** valószínűséggel legalább **egy** próbálkozáson $\\geq 10$ helyes választ érjen el? ($6$ pont)

*Táblázatból:* $\\Phi(2{,}32) \\approx 0{,}9898$, $\\lg 2 \\approx 0{,}3010$, $\\lg 3 \\approx 0{,}4771$.`,
  figure: () => <BinomialChart />,
  asked: [
    { key: 'p5', label: 'a) $P(X = 5)$' },
    { key: 'p10', label: 'b) $P(X \\geq 10)$ (normális közelítés)' },
    { key: 'n95', label: 'c) legkisebb próbálkozásszám' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Binomiális eloszlás képlete',
      points: 2,
      body: `Mivel minden kérdésnél $p = 0{,}25$ valószínűséggel siker (helyes válasz), és a kérdések függetlenek, $X \\sim \\text{Bin}(20;\\ 0{,}25)$:

$$P(X = k) = \\binom{20}{k} (0{,}25)^k (0{,}75)^{20-k}.$$

$k = 5$ esetén:
$$P(X = 5) = \\binom{20}{5} \\cdot 0{,}25^5 \\cdot 0{,}75^{15}.$$`,
    },
    {
      title: 'a/2. lépés — A három tényező',
      points: 2,
      body: `- $\\binom{20}{5} = \\dfrac{20 \\cdot 19 \\cdot 18 \\cdot 17 \\cdot 16}{5!} = \\dfrac{1\\,860\\,480}{120} = 15\\,504$.
- $0{,}25^5 = (1/4)^5 = 1/1024 \\approx 0{,}0009766$.
- $0{,}75^{15}$: $\\lg 0{,}75 = \\lg 3 - \\lg 4 \\approx 0{,}4771 - 0{,}6021 = -0{,}1249$. Tehát $15 \\cdot (-0{,}1249) = -1{,}874$, és $0{,}75^{15} \\approx 10^{-1{,}874} \\approx 0{,}01336$.

Összeszorozva:
$$P(X = 5) \\approx 15\\,504 \\cdot 0{,}0009766 \\cdot 0{,}01336 \\approx 0{,}2023.$$

Tehát kb. **$20{,}2\\%$** eséllyel talál el pontosan $5$ választ.`,
    },
    {
      title: 'b/1. lépés — Várható érték, szórás',
      points: 2,
      body: `$X \\sim \\text{Bin}(n;p)$, ahol $n = 20$, $p = 0{,}25$.

$$E(X) = np = 20 \\cdot 0{,}25 = 5.$$
$$D^2(X) = np(1-p) = 20 \\cdot 0{,}25 \\cdot 0{,}75 = 3{,}75.$$
$$\\sigma = \\sqrt{3{,}75} \\approx 1{,}9365.$$

Az "átmenő" határ ($\\geq 10$) két szórásnál is messzebb van az átlagtól — erős **eltérés** várható, kis valószínűséggel.`,
    },
    {
      title: 'b/2. lépés — Normális közelítés folytonossági korrekcióval',
      points: 2,
      body: `A kontinuitási korrekció miatt $P(X \\geq 10) \\approx P(Y \\geq 9{,}5)$, ahol $Y \\sim N(\\mu;\\ \\sigma^2) = N(5;\\ 3{,}75)$.

Standardizáljuk:
$$z = \\dfrac{9{,}5 - 5}{1{,}9365} \\approx \\dfrac{4{,}5}{1{,}9365} \\approx 2{,}324.$$

$$P(X \\geq 10) \\approx 1 - \\Phi(2{,}32) \\approx 1 - 0{,}9898 = 0{,}0102.$$`,
      figure: () => <NormalApprox />,
    },
    {
      title: 'b/3. lépés — Összehasonlítás',
      points: 2,
      body: `A pontos binomiális érték (összegezve a $P(X=k)$-kat $k = 10, 11, \\ldots, 20$-ra):
$$P(X \\geq 10)_{\\text{pontos}} \\approx 0{,}0139.$$

A normális közelítés ($\\approx 0{,}0102$) kissé **alulbecsli** a valódi értéket — ez tipikus a szélére szoruló események esetén. Összességben azonban **mindkettő kb. $1\\%$ körüli**, tehát tudás nélkül **rendkívül alacsony** az esélye, hogy a diák legalább $10$ kérdést eltaláljon.`,
    },
    {
      title: 'c/1. lépés — A kérdés modellje',
      points: 2,
      body: `Legyen egy kísérlet "siker", ha $X \\geq 10$. Ennek valószínűsége $p_1 \\approx 0{,}0139$. A diák $m$-szer megírja a tesztet függetlenül; a **legalább egy siker** valószínűsége:
$$P_m = 1 - (1 - p_1)^m.$$

Azt kérdezzük, melyik legkisebb $m$ egész szám, amelyre $P_m \\geq 0{,}95$:
$$(1 - p_1)^m \\leq 0{,}05.$$`,
    },
    {
      title: 'c/2. lépés — Logaritmus',
      points: 2,
      body: `$$m \\cdot \\lg(1 - p_1) \\leq \\lg 0{,}05.$$

$\\lg(1 - 0{,}0139) = \\lg(0{,}9861)$. Taylor-közelítéssel $\\lg(1 + u) \\approx \\frac{u}{\\ln 10} \\approx 0{,}4343 \\cdot u$. $u = -0{,}0139$, így $\\lg(0{,}9861) \\approx -0{,}00608$.

$\\lg 0{,}05 = \\lg 5 - 2 = \\lg(10/2) - 2 = 1 - \\lg 2 - 2 = -1 - 0{,}3010 = -1{,}3010$.

Mivel $\\lg(0{,}9861) < 0$, egyenlőtlenség **megfordul** osztásnál:
$$m \\geq \\dfrac{\\lg 0{,}05}{\\lg 0{,}9861} = \\dfrac{-1{,}3010}{-0{,}00608} \\approx 214{,}0.$$`,
    },
    {
      title: 'c/3. lépés — A legkisebb egész',
      points: 2,
      body: `Mivel $m$ egész szám, és a fenti hányados kerekítetlen értéke $\\approx 213{,}98$, a legkisebb megfelelő érték:
$$m_{\\min} = 214.$$

**Ellenőrzés**: $m = 214$-re $P \\approx 1 - 0{,}9861^{214}$. Ez kb. $1 - e^{-214 \\cdot 0{,}0140} = 1 - e^{-2{,}996} \\approx 1 - 0{,}0500 = 0{,}9500$ — pont a küszöb közelében, pozitív oldalon. A kerekítési pontatlanság miatt biztonsággal $m = 215$-öt is írhatunk, de $214$ elegendő.

**Összegzés**: a diáknak legalább **$214$-szer** kell megírnia a tesztet, hogy legalább $95\\%$-os esélyen legyen $\\geq 10$ találatos próbálkozása. Gyakorlatban: tudás nélkül a véletlen siker nagyon drágán fizet.`,
    },
  ],
  finalAnswer: {
    p5: '$P(X = 5) \\approx 0{,}2023$ (kb. $20{,}2\\%$).',
    p10: '$P(X \\geq 10) \\approx 0{,}0102$ normális közelítéssel (pontosan $\\approx 0{,}0139$).',
    n95: 'Legalább $m = 214$ próbálkozás kell.',
  },
  usedFormulas: [
    'binomiális eloszlás: $P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$',
    'várható érték és szórás: $E = np$, $D^2 = np(1-p)$',
    'normális közelítés folytonossági korrekcióval',
    'ismételt független kísérletek: $P(\\text{legalább 1}) = 1 - (1-p)^m$',
    'logaritmus alapú egyenlőtlenség-megoldás',
  ],
};

export default { meta, problem, solution };
