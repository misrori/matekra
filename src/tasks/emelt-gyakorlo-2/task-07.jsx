import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-07',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'II',
  number: 7,
  title: 'Nyugdíjcélú megtakarítás — sorozatok és pénzügy',
  points: 16,
  topics: ['mértani sorozat', 'számtani sorozat', 'exponenciális', 'százalékszámítás'],
  difficulty: 4,
  fgvt: [
    { page: 34, note: 'számtani sorozat' },
    { page: 35, note: 'mértani sorozat' },
    { page: 36, note: 'kamatos kamat' },
  ],
  estimatedMinutes: 24,
};

// Forgatókönyv:
// Egy 25 éves ügyfél havi 50 000 Ft-ot tesz félre, a bank 4,8% éves kamat (tőkésítés évente egyszer, év végén).
// Az év közben érkező befizetések nem kamatoznak az adott évben (egyszerűsítés), csak a következő évtől.
// Így minden évben 12 · 50 000 = 600 000 Ft kerül be. Ez összeg az év végén beszámol, és tőkésedik.
// 40 éves időtáv (65 éves korig).
// a) Éves betét és a sorozat típusa. (Éves betéteket tekintve: minden évi 600 000 Ft. Ezek kamatosan szorzódnak.)
// b) 40 év után mennyi pénz lesz?
//    Legyen r = 1,048. Az első év végén befizetett 600e Ft 39 évig kamatozik (még): 600 000 · 1,048^39.
//    A második év végén befizetett: 600 000 · 1,048^38.
//    ...
//    A 40. év végén befizetett: 600 000 · 1,048^0 = 600 000.
//    Összeg: S = 600 000 · (1 + 1,048 + ... + 1,048^39) = 600 000 · (1,048^40 - 1) / (1,048 - 1).
//    1,048^40 számítás: log(1,048) ≈ 0,02036. 40 · 0,02036 = 0,8144. 10^0,8144 ≈ 6,524.
//    Pontosabban: 1,048^40 ≈ 6,5229.
//    S ≈ 600 000 · (6,5229 - 1) / 0,048 = 600 000 · 5,5229 / 0,048 = 600 000 · 115,059 ≈ 69,04 millió.
// c) Ha ehelyett évenként 3%-kal emelné a befizetést (első évi 600 000, második 618 000, ...). Ez egy mértani sorozatú évjárulék.
//    Összesen az 1. év végén t évnyi kamatozás (40 - t): 600 000 · 1,03^(t-1) · 1,048^(40-t) (t=1..40).
//    S = 600 000 · Sum_{t=1..40} 1,03^(t-1) · 1,048^(40-t)
//      = 600 000 · 1,048^40 · Sum_{t=1..40} (1,03/1,048)^(t-1) · 1,048^(-1) * 1,048 --- egyszerűbben:
//    S = 600 000 · 1,048^39 · Sum_{t=0..39} (1,03 / 1,048)^t / 1,048^0 ... inkább indexezzük újra.
//    Legyen k = t-1, t = 1..40 → k = 0..39. Az összeg:
//    S = 600 000 · Sum_{k=0..39} 1,03^k · 1,048^(39-k) = 600 000 · 1,048^39 · Sum_{k=0..39} (1,03/1,048)^k.
//    Legyen x = 1,03/1,048 ≈ 0,98282.
//    Sum = (1 - x^40) / (1 - x) = (1 - 0,98282^40) / (1 - 0,98282).
//    x^40: log x = log 1,03 - log 1,048 ≈ 0,01284 - 0,02036 = -0,00752. 40·(-0,00752) = -0,3008. 10^(-0,3008) ≈ 0,5004.
//    Sum = (1 - 0,5004) / 0,01718 = 0,4996 / 0,01718 ≈ 29,08.
//    1,048^39 = 1,048^40 / 1,048 ≈ 6,5229 / 1,048 ≈ 6,2242.
//    S ≈ 600 000 · 6,2242 · 29,08 ≈ 600 000 · 181,00 ≈ 108,6 millió.
// d) Számtani emelés (pl. évente 20 000 Ft-tal több havi befizetés? Vagy évi 50 000 Ft-tal több?) — a feladat itt egyszerűbb: mennyi az első 10 év befizetett pénzeinek SZUMMÁJA (kamat nélkül)?
//    Ha évi 50 000 Ft-tal emelkedő havi befizetés: 1. év: 50 000/hó → 600 000/év. 2. év: 50 000 + 50 000 = 100 000/hó? Túl sok.
//    Nézzük: évente a havi díj 5000 Ft-tal nő. 1. évben 50 000/hó → 600 000/év. 2. évben 55 000/hó → 660 000/év. n. évben (50 000 + 5 000(n-1)) · 12 = 600 000 + 60 000(n-1) Ft/év.
//    Ez számtani sorozat: a_1 = 600 000, d = 60 000. Az első 10 év befizetései (kamat nélkül):
//    S_10 = (2·600 000 + 9·60 000)·10/2 = (1 200 000 + 540 000)·5 = 1 740 000 · 5 = 8 700 000 Ft.

// (Egyszerűsítés a "c" részben: 4 pontos kérdéssor számmal)

function InterestPlot() {
  // Évek végi tőke alakulása (b rész modellje)
  const r = 1.048;
  const annuity = 600000;
  const values = [];
  let S = 0;
  for (let t = 1; t <= 40; t++) {
    S = S * r + annuity; // (évi befizetés az év végén, előző tőke kamatozik)
    values.push({ t, S });
  }
  const maxS = values[values.length - 1].S;
  const sx = (t) => 50 + (t / 40) * 420;
  const sy = (v) => 240 - (v / maxS) * 200;

  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      <Axes
        x={50}
        y={20}
        w={420}
        h={220}
        xMin={0}
        xMax={40}
        yMin={0}
        yMax={maxS}
        xStep={5}
        yStep={maxS / 10}
        xLabel="t (év)"
        yLabel="S (Ft)"
        grid={false}
      />
      {/* oszlopdiagram jellegű kis körök */}
      {values.map((p, i) => (
        <circle key={i} cx={sx(p.t)} cy={sy(p.S)} r="2.5" fill="#2563eb" />
      ))}
      {/* görbe */}
      <polyline points={values.map((p) => `${sx(p.t).toFixed(2)},${sy(p.S).toFixed(2)}`).join(' ')} fill="none" stroke="#2563eb" strokeWidth="2" />
      {/* összesen bejött befizetés (kamat nélkül) egyenes */}
      <line x1={sx(0)} y1={sy(0)} x2={sx(40)} y2={sy(40 * annuity)} stroke="#16a34a" strokeWidth="1.6" strokeDasharray="5 4" />
      <text x={sx(25)} y={sy(40 * annuity) - 4} fontSize="11" fill="#15803d">csak befizetett tőke (kamat nélkül)</text>
      <text x={sx(26)} y={sy(maxS) - 2} fontSize="12" fontWeight="bold" fill="#1e40af">S₄₀ ≈ 69 MFt</text>
      <text x={50} y={30} fontSize="12" fill="#111">40 éves nyugdíjcélú megtakarítás, 4,8% éves kamat</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Anna $25$ éves, és **$65$ éves koráig** rendszeresen félrerak. Minden hónap elején $50\\,000$ Ft-ot helyez egy megtakarítási számlára. A számla **évente egyszer, az év végén** $4{,}8\\%$-ot kamatozik. Az év közben befizetett pénzek **csak** a rákövetkező évtől kamatoznak (év végi tőkésítés). Minden év befizetései együtt **évi $12 \\cdot 50\\,000 = 600\\,000$ Ft** egyösszegű éves befizetésnek tekinthetők (év végi díjbefizetés).

**a)** Milyen típusú sorozatot alkot az évek végi egyenleg? Indokolja! ($3$ pont)

**b)** Mennyi pénz lesz a számlán **$40$ év** után (Anna $65$ éves korában)? ($6$ pont)

**c)** Ha Anna a befizetést évente $3\\%$-kal emeli (tehát az $n$-edik év végi befizetés $600\\,000 \\cdot 1{,}03^{n-1}$ Ft), mennyi pénz lesz $40$ év múlva a számlán? ($5$ pont)

**d)** Tegyük fel, hogy Anna a havi befizetést **évenként $5\\,000$ Ft-tal** növeli (pl. 2. évben $55\\,000$ Ft/hó, 3. évben $60\\,000$ Ft/hó). Mennyi **pénzt** fizet be összesen **kamat nélkül** az első $10$ évben? ($2$ pont)`,
  figure: () => <InterestPlot />,
  asked: [
    { key: 'type', label: 'a) sorozattípus' },
    { key: 'S40', label: 'b) tőke $40$ év után' },
    { key: 'S40grow', label: 'c) tőke évi 3% díjemeléssel' },
    { key: 'sum10', label: 'd) első 10 év befizetései (kamat nélkül)' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — A sorozat típusa',
      points: 3,
      body: `Jelöljük $S_n$-nel az $n$-edik év végi tőkét (közvetlenül a kamatjóváírás + befizetés után). A kamatozás és az éves befizetés miatt:

$$S_n = S_{n-1} \\cdot 1{,}048 + 600\\,000,\\ \\ S_0 = 0.$$

Ez **sem tisztán számtani, sem tisztán mértani** sorozat, hanem **affin lineáris rekurzió** (mértani + számtani tag). Azonban az ismert technika: ha $a_n = q \\cdot a_{n-1} + d$ és $q \\neq 1$, akkor a sorozat az eltolással
$$a_n + \\dfrac{d}{q-1}$$
egy **mértani sorozatot** ad. Praktikusabban: a záró összeg egyszerűbben egy **mértani sorozat összegeként** kiszámolható (ld. b) rész).`,
    },
    {
      title: 'b/1. lépés — Az egyes befizetések külön-külön',
      points: 2,
      body: `Az $1.$ év végén befizetett $600\\,000$ Ft még $39$ évig kamatozik: $600\\,000 \\cdot 1{,}048^{39}$.
A $2.$ év végén befizetett rész $38$ évig: $600\\,000 \\cdot 1{,}048^{38}$.
…
A $40.$ év végén befizetett rész $0$ évig: $600\\,000 \\cdot 1{,}048^0 = 600\\,000$.

A teljes záró összeg:
$$S_{40} = 600\\,000 \\cdot \\left(1{,}048^{39} + 1{,}048^{38} + \\cdots + 1 \\right).$$

A zárójelben egy $40$ tagú **mértani sorozat összege** van, $a_1 = 1$, $q = 1{,}048$.`,
    },
    {
      title: 'b/2. lépés — A mértani összeg képlete',
      points: 2,
      body: `$$S_{40} = 600\\,000 \\cdot \\dfrac{1{,}048^{40} - 1}{1{,}048 - 1} = 600\\,000 \\cdot \\dfrac{1{,}048^{40} - 1}{0{,}048}.$$

Számítsuk ki $1{,}048^{40}$-et logaritmussal:
$$\\lg(1{,}048) \\approx 0{,}02036.$$
$$40 \\cdot 0{,}02036 = 0{,}8144.$$
$$1{,}048^{40} \\approx 10^{0{,}8144} \\approx 6{,}523.$$`,
    },
    {
      title: 'b/3. lépés — A végeredmény',
      points: 2,
      body: `$$S_{40} \\approx 600\\,000 \\cdot \\dfrac{6{,}523 - 1}{0{,}048} = 600\\,000 \\cdot \\dfrac{5{,}523}{0{,}048} \\approx 600\\,000 \\cdot 115{,}06 \\approx 69{,}04 \\cdot 10^6 \\text{ Ft}.$$

Tehát **kb. $69$ millió Ft** gyűlik össze $40$ év után.

Érdekesség: a kamat nélküli összes befizetés $40 \\cdot 600\\,000 = 24$ MFt; tehát a **kamat hozzájárulása** kb. $45$ MFt — majdnem kétszer annyi, mint maga a tőke.`,
    },
    {
      title: 'c/1. lépés — Évi díjemelés képlete',
      points: 2,
      body: `Az $n$-edik év végi befizetés: $600\\,000 \\cdot 1{,}03^{n-1}$, amely utána $(40-n)$ évig kamatozik:

$$F_n = 600\\,000 \\cdot 1{,}03^{n-1} \\cdot 1{,}048^{40-n}.$$

Az összeg:
$$S = \\sum_{n=1}^{40} F_n = 600\\,000 \\cdot 1{,}048^{39} \\cdot \\sum_{n=1}^{40} \\left(\\dfrac{1{,}03}{1{,}048}\\right)^{n-1}.$$`,
    },
    {
      title: 'c/2. lépés — Geometriai sor hányadossal',
      points: 2,
      body: `Legyen $x = \\dfrac{1{,}03}{1{,}048} \\approx 0{,}98282$.

$$\\sum_{n=1}^{40} x^{n-1} = \\dfrac{1 - x^{40}}{1 - x}.$$

$$\\lg x = \\lg 1{,}03 - \\lg 1{,}048 \\approx 0{,}01284 - 0{,}02036 = -0{,}00752.$$
$$x^{40} \\approx 10^{-0{,}3008} \\approx 0{,}500.$$
$$\\dfrac{1 - 0{,}500}{1 - 0{,}98282} = \\dfrac{0{,}500}{0{,}01718} \\approx 29{,}10.$$`,
    },
    {
      title: 'c/3. lépés — A végösszeg',
      points: 1,
      body: `$$1{,}048^{39} = \\dfrac{1{,}048^{40}}{1{,}048} \\approx \\dfrac{6{,}523}{1{,}048} \\approx 6{,}224.$$

$$S \\approx 600\\,000 \\cdot 6{,}224 \\cdot 29{,}10 \\approx 600\\,000 \\cdot 181{,}1 \\approx 108{,}66 \\cdot 10^6 \\text{ Ft}.$$

Tehát évi $3\\%$-os díjemeléssel **kb. $108{,}7$ millió Ft** gyűlik össze — a $b)$ részhez képest kb. $+40$ MFt.`,
    },
    {
      title: 'd) lépés — Számtani sorozat összege',
      points: 2,
      body: `Az $n$-edik évben a havi befizetés $50\\,000 + 5000(n-1)$ Ft, az éves összeg
$$a_n = 12 \\cdot (50\\,000 + 5000(n-1)) = 600\\,000 + 60\\,000(n-1).$$

Ez **számtani sorozat**, $a_1 = 600\\,000$, $d = 60\\,000$. Az első $10$ év befizetéseinek (kamat nélküli) összege:
$$S_{10} = \\dfrac{(2 a_1 + 9 d) \\cdot 10}{2} = \\dfrac{(1\\,200\\,000 + 540\\,000) \\cdot 10}{2} = \\dfrac{1\\,740\\,000 \\cdot 10}{2} = 8\\,700\\,000 \\text{ Ft}.$$

Azaz $10$ év alatt **$8{,}7$ millió Ft** kerül a számlára (kamat még nélkül).`,
    },
  ],
  finalAnswer: {
    type: 'Vegyes (affin lineáris rekurzió: $S_n = 1{,}048 S_{n-1} + 600\\,000$). A záró összeg mértani sorozat összegeként számítható.',
    S40: '$S_{40} \\approx 69{,}0$ millió Ft.',
    S40grow: 'Évi 3%-os díjemeléssel $S \\approx 108{,}7$ millió Ft.',
    sum10: '$S_{10} = 8{,}7$ millió Ft (kamat nélkül).',
  },
  usedFormulas: [
    'mértani sorozat összege: $S_n = a_1 \\frac{q^n - 1}{q - 1}$',
    'számtani sorozat összege: $S_n = \\frac{(2a_1 + (n-1)d) n}{2}$',
    'kamatos kamat: $T_n = T_0 (1+p)^n$',
    'logaritmus alapú nagy hatványszámítás',
  ],
};

export default { meta, problem, solution };
