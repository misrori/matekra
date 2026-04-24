import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-05',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'II',
  number: 5,
  title: 'Bakteriális populáció — exponenciális növekedés és logaritmus',
  points: 16,
  topics: ['exponenciális', 'logaritmus', 'függvények'],
  difficulty: 4,
  fgvt: [
    { page: 43, note: 'exponenciális függvény' },
    { page: 44, note: 'logaritmus' },
    { page: 24, note: 'logaritmus azonosságai' },
  ],
  estimatedMinutes: 22,
};

// Modell:  N(t) = N0 * q^t,  t órában.
// N0 = 5 000,  N(3) = 13 500.  =>  q^3 = 13500/5000 = 2,7  =>  q = 2,7^(1/3).
// log10(q) = (1/3) * log10(2,7) ≈ (1/3) * 0,4314 = 0,1438 → q ≈ 10^0,1438 ≈ 1,3924.
// a) q ≈ 1,39 (azaz óránként kb. 39%-os növekedés)
// b) Mikor éri el N = 100 000-et?
//    N0 q^t = 100 000  => q^t = 20  => t = log(20) / log(q) = log(20) / ((1/3) log(2,7)) = 3 log 20 / log 2,7
//    log 20 = log 2 + 1 = 0,30103 + 1 = 1,30103;  log 2,7 ≈ 0,43136
//    t ≈ 3 · 1,30103 / 0,43136 ≈ 3,9031 / 0,43136 ≈ 9,049 óra.
// c) Egy baktérium átlagos osztódási ideje (dupláz-idő, T_2):
//    q^T = 2  =>  T = log 2 / log q = log 2 / ((1/3) log 2,7) = 3 log 2 / log 2,7
//    ≈ 3 · 0,30103 / 0,43136 ≈ 0,90309 / 0,43136 ≈ 2,094 óra ≈ 2 óra 6 perc.
// d) Javaslat: újragondolni a modellt (véges környezeti kapacitás miatt exp. nem tartható).

function GrowthPlot() {
  const q = Math.pow(2.7, 1 / 3);
  const N = (t) => 5000 * Math.pow(q, t);
  const sx = (t) => 60 + (t / 12) * 380;
  const sy = (n) => 240 - (n / 160000) * 200;
  const pts = [];
  for (let t = 0; t <= 12.01; t += 0.2) pts.push(`${sx(t).toFixed(2)},${sy(N(t)).toFixed(2)}`);

  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <Axes x={60} y={40} w={380} h={200} xMin={0} xMax={12} yMin={0} yMax={160000} xStep={1} yStep={20000} xLabel="t (óra)" yLabel="N (db)" />
      {/* 100 000 szint */}
      <line x1={sx(0)} y1={sy(100000)} x2={sx(12)} y2={sy(100000)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={sx(0.2)} y={sy(100000) - 6} fontSize="11" fill="#b91c1c">N = 100 000</text>
      {/* exponenciális görbe */}
      <polyline points={pts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2.4" />
      {/* t ≈ 9,05 pont */}
      <circle cx={sx(9.05)} cy={sy(100000)} r="5" fill="#dc2626" />
      <text x={sx(9.05) + 6} y={sy(100000) + 16} fontSize="12" fill="#b91c1c">t ≈ 9,05 h</text>
      {/* N(3) = 13500 jelölés */}
      <circle cx={sx(3)} cy={sy(13500)} r="5" fill="#16a34a" />
      <text x={sx(3) + 6} y={sy(13500) - 4} fontSize="11" fill="#15803d">N(3) = 13 500</text>
      {/* N(0) = 5000 */}
      <circle cx={sx(0)} cy={sy(5000)} r="5" fill="#7c3aed" />
      <text x={sx(0) + 6} y={sy(5000) - 4} fontSize="11" fill="#6d28d9">N(0) = 5000</text>
      <text x={sx(0.3)} y={60} fontSize="12" fill="#1e40af">N(t) = 5000 · q^t,  q ≈ 1,392</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy biológiai kísérletben egy **baktériumtörzs** populációjának egyedszámát óránként mérik. A kezdeti (t = 0) egyedszám $N_0 = 5000$. Három óra múlva (t = 3) a mért egyedszám $N(3) = 13\\,500$. A növekedés jó közelítéssel **exponenciális**, azaz

$$N(t) = N_0 \\cdot q^t,$$

ahol $q$ az óránkénti **szorzótényező**.

**a)** Számítsa ki a $q$ szorzótényező értékét, és adja meg, óránként hány **százalékkal** nő a populáció! ($5$ pont)

**b)** Mikor éri el a populáció az $N = 100\\,000$ egyedet? ($5$ pont)

**c)** Mekkora a baktériumtörzs **duplázási ideje** (az az idő, amely alatt az egyedszám kétszeresére nő)? Adja meg órában és percben! ($4$ pont)

**d)** Indokolja, miért **nem** használható ez a modell tetszőlegesen hosszú időre! ($2$ pont)

Számoláshoz használja: $\\lg 2 \\approx 0{,}30103$, $\\lg 2{,}7 \\approx 0{,}43136$.`,
  figure: () => <GrowthPlot />,
  asked: [
    { key: 'q', label: 'a) $q = ?$ és a növekedés %-a' },
    { key: 't100k', label: 'b) $t$, amikor $N = 100\\,000$' },
    { key: 'double', label: 'c) duplázási idő' },
    { key: 'limit', label: 'd) miért nem tartható örökké?' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A $q^3$ kiszámítása',
      points: 2,
      body: `A modellből $N(3) = N_0 \\cdot q^3$, ahonnan:
$$q^3 = \\dfrac{N(3)}{N_0} = \\dfrac{13\\,500}{5\\,000} = 2{,}7.$$`,
    },
    {
      title: 'a/2. lépés — $q$ kifejezése logaritmussal',
      points: 2,
      body: `Köbgyököt vonunk, illetve logaritmust használunk:
$$q = \\sqrt[3]{2{,}7} = 2{,}7^{1/3}.$$

10-es alapú logaritmussal:
$$\\lg q = \\dfrac{1}{3} \\lg 2{,}7 \\approx \\dfrac{0{,}43136}{3} \\approx 0{,}14379.$$

$$q \\approx 10^{0{,}14379} \\approx 1{,}3924.$$

Kerekítve: $q \\approx 1{,}39$.`,
    },
    {
      title: 'a/3. lépés — Százalékos növekedés',
      points: 1,
      body: `Ha $q = 1 + p$, akkor $p$ az óránkénti relatív változás:
$$p \\approx 1{,}3924 - 1 = 0{,}3924 \\approx 39{,}2\\%.$$

Tehát a populáció **óránként kb. $39{,}2\\%$-kal nő**.`,
    },
    {
      title: 'b/1. lépés — Egyenlet $t$-re',
      points: 2,
      body: `Keressük azt a $t$-t, amelyre $N(t) = 100\\,000$:
$$5000 \\cdot q^t = 100\\,000 \\iff q^t = \\dfrac{100\\,000}{5\\,000} = 20.$$`,
    },
    {
      title: 'b/2. lépés — Logaritmus mindkét oldalán',
      points: 2,
      body: `$$\\lg (q^t) = \\lg 20 \\iff t \\cdot \\lg q = \\lg 20.$$

Tehát
$$t = \\dfrac{\\lg 20}{\\lg q} = \\dfrac{\\lg 20}{\\tfrac{1}{3} \\lg 2{,}7} = \\dfrac{3 \\lg 20}{\\lg 2{,}7}.$$

$\\lg 20 = \\lg 2 + \\lg 10 = 0{,}30103 + 1 = 1{,}30103$.`,
    },
    {
      title: 'b/3. lépés — Numerikus eredmény',
      points: 1,
      body: `$$t \\approx \\dfrac{3 \\cdot 1{,}30103}{0{,}43136} \\approx \\dfrac{3{,}9031}{0{,}43136} \\approx 9{,}05 \\text{ óra}.$$

Tehát a populáció kb. **$9$ óra $3$ perc** alatt éri el a $100\\,000$ egyedet.`,
    },
    {
      title: 'c/1. lépés — Duplázási idő definíciója',
      points: 2,
      body: `A duplázási idő az a $T$, amelyre $N(t+T) = 2 \\cdot N(t)$. Mivel a modell exponenciális:
$$q^T = 2 \\iff T = \\dfrac{\\lg 2}{\\lg q} = \\dfrac{\\lg 2}{\\tfrac{1}{3} \\lg 2{,}7} = \\dfrac{3 \\lg 2}{\\lg 2{,}7}.$$`,
    },
    {
      title: 'c/2. lépés — Szám szerint',
      points: 2,
      body: `$$T \\approx \\dfrac{3 \\cdot 0{,}30103}{0{,}43136} \\approx \\dfrac{0{,}90309}{0{,}43136} \\approx 2{,}094 \\text{ óra}.$$

Ez $2$ óra + $0{,}094 \\cdot 60 \\approx 5{,}6$ perc, tehát kb. **$2$ óra $6$ perc** (kerekítve).`,
    },
    {
      title: 'd) lépés — A modell korlátai',
      points: 2,
      body: `Egy **tényleges** baktériumtenyészetben a környezet véges: fogy a tápanyag, halmozódnak a bomlástermékek, limitált a hely. A tisztán exponenciális modell ezt **nem veszi figyelembe**, így tetszőlegesen hosszú időn át alkalmazva abszurd, fizikailag lehetetlen értékeket adna (pl. a Föld tömegét meghaladó baktériumtömeget néhány napon belül).

A valóságban a növekedés egy idő után **telítődik**, és logisztikus (S-alakú) görbével írható le jobban:
$$N(t) = \\dfrac{K}{1 + A e^{-rt}},$$
ahol $K$ a környezet **eltartóképessége**. A most vizsgált szakasz, amíg $N \\ll K$, jó közelítéssel exponenciális.`,
    },
  ],
  finalAnswer: {
    q: '$q = \\sqrt[3]{2{,}7} \\approx 1{,}39$; óránként kb. $39{,}2\\%$-os növekedés.',
    t100k: '$t \\approx 9{,}05$ óra (kb. $9$ óra $3$ perc).',
    double: '$T \\approx 2{,}09$ óra $\\approx$ $2$ óra $6$ perc.',
    limit: 'A környezet véges (tápanyag, hely), ezért az exponenciális modell csak rövid időre érvényes; valós populáció logisztikus görbe szerint telítődik.',
  },
  usedFormulas: [
    'exponenciális modell: $N(t) = N_0 q^t$',
    'logaritmus: $\\lg(a^b) = b\\lg a$',
    'duplázási idő: $T = \\lg 2 / \\lg q$',
    'köbgyök / tört hatvány: $q = 2{,}7^{1/3}$',
  ],
};

export default { meta, problem, solution };
