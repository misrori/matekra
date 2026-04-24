import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-16a',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.B',
  number: 16,
  title: 'Kamatos kamat + számtani sorozat — megtakarítás',
  points: 10,
  topics: ['exponenciális', 'százalékszámítás', 'mértani sorozat', 'számtani sorozat'],
  difficulty: 4,
  fgvt: [
    { page: 36, note: 'kamatos kamat' },
    { page: 35, note: 'mértani sorozat' },
    { page: 34, note: 'számtani sorozat' },
  ],
  estimatedMinutes: 18,
};

// Adatok:
// Anna 2020. január 1-jén elhelyezett 800 000 Ft-ot évi 4%-os, fix kamatos kamatozású betétszámlán.
// a) Mennyi lesz 5 év múlva (2025. január 1-jén), ha évente kamatos kamatként kamatozik? (4 pt)
//    T_5 = 800 000 · 1,04^5 = 800 000 · 1,21665... = 973 324,8 Ft ≈ 973 325 Ft.
// b) Bálint ezzel szemben minden év január 1-jén 100 000 Ft-ot helyez el a takarékszámláján, kamat NÉLKÜL — de egy évvel korábban kezdi.
//    Az első befizetés 2019-ben, majd 2020, 2021, ... 2024. január 1-ig (6 befizetés).
//    Mennyi pénze lesz a 2024 utáni évben, tehát 2025. január 1-jén (6 év múlva)? Sn = 6 * 100 000 = 600 000 Ft
//    Számtani sorozat aspect: az n-edik befizetés után a számla egyenlege egy számtani sorozat: a_n = 100 000 · n.
// c) 2025. január 1-jén ki-kit előz meg? Hány Ft-tal? Anna 973 325 - 600 000 = 373 325 Ft-tal több.
// (4+3+3 = 10 pt)
function SavingsChart({ show = 'anna' }) {
  // Bar chart: Anna évenkénti egyenlegei vs Bálint évenkénti egyenlegei (2020, 2021, ..., 2025 januárjában)
  const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
  // Anna: 800000 * 1.04^k (k=0..5)
  const anna = YEARS.map((y, k) => 800000 * Math.pow(1.04, k));
  // Bálint: 100000 * (k+1 ha kezdett 2019-ben → 2020-ban 2 befizetés, stb.)
  // Kezdés: 2019. jan 1. → tehát 2020. jan. 1.-n 2 befizetés van (2019 és 2020). 2025.-re 7. De a feladatban végződés 2024. jan.-ra (6 befizetés).
  // 2020 jan 1: 2 befizetés, 2021: 3, ..., 2024: 6. 2025: már nincs befizetés 2025-ben, marad 6 · 100000 = 600 000.
  const balint = YEARS.map((y, k) => {
    // 2020 jan 1: 2 (2019, 2020). Ha k=0 → 2020 → 2 (ha 2019 már befizetve, de a 2020-at akkor fizeti).
    // Pontosabban: az "év elején" k-t fizeti be: 2019, 2020, 2021, 2022, 2023, 2024 — utolsó 2024.
    // 2020.jan.1: befizetve 2019-et + 2020-at = 2
    // 2021.jan.1: + 2021 = 3, stb.
    // 2024.jan.1: 6
    // 2025.jan.1: már nincs új befizetés (2025-öt nem tettük) → marad 6.
    if (y <= 2024) return (y - 2019 + 1) * 100000;
    return 6 * 100000;
  });
  const yMax = 1100000;
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <text x="260" y="24" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Évenkénti egyenlegek január 1-jén (Ft)
      </text>
      <Axes x={60} y={40} w={420} h={250} xMin={0} xMax={7} yMin={0} yMax={yMax / 1000} xStep={1} yStep={200} xLabel="" yLabel="ezer Ft" grid />
      {YEARS.map((y, i) => {
        const xC = 60 + ((i + 0.5) / 7) * 420;
        const wBar = 20;
        // Anna kék
        const va = anna[i] / 1000;
        const yaT = 40 + 250 - (va / (yMax / 1000)) * 250;
        const yaH = 40 + 250 - yaT;
        // Bálint zöld
        const vb = balint[i] / 1000;
        const ybT = 40 + 250 - (vb / (yMax / 1000)) * 250;
        const ybH = 40 + 250 - ybT;
        const showA = show === 'anna' || show === 'both';
        const showB = show === 'balint' || show === 'both';
        return (
          <g key={y}>
            {showA && (
              <>
                <rect x={xC - wBar - 2} y={yaT} width={wBar} height={yaH} fill="#2563eb" fillOpacity="0.85" stroke="#1e3a8a" />
                {show === 'anna' && (
                  <text x={xC - wBar / 2 - 2} y={yaT - 4} fontSize="10" fontWeight="700" textAnchor="middle" fill="#1e3a8a">
                    {Math.round(anna[i] / 1000)}
                  </text>
                )}
              </>
            )}
            {showB && (
              <>
                <rect x={xC + 2} y={ybT} width={wBar} height={ybH} fill="#16a34a" fillOpacity="0.85" stroke="#064e3b" />
                {show === 'balint' && (
                  <text x={xC + wBar / 2 + 2} y={ybT - 4} fontSize="10" fontWeight="700" textAnchor="middle" fill="#064e3b">
                    {Math.round(balint[i] / 1000)}
                  </text>
                )}
              </>
            )}
            <text x={xC} y={40 + 250 + 14} fontSize="11" textAnchor="middle" fill="#374151">{y}</text>
          </g>
        );
      })}
      {/* Jelmagyarázat */}
      <g>
        <rect x="350" y="50" width="14" height="14" fill="#2563eb" />
        <text x="368" y="62" fontSize="12">Anna (kamatos kamat, 4%)</text>
        <rect x="350" y="70" width="14" height="14" fill="#16a34a" />
        <text x="368" y="82" fontSize="12">Bálint (évi 100 ezer, kamat nélkül)</text>
      </g>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Anna $2020.$ január $1$-jén $800{\\,}000$ Ft-ot helyezett el egy évi $4\\%$-os, fix **kamatos kamatozású** betétszámlán.
A kamatokat mindig év végén jóváírják, és a következő évben már a megnövelt tőkére kapja a kamatot.

Bálint nem kamatos számlát használ: $2019.$ január $1$-jén elkezdte, és onnantól **minden év január $1$-jén** $100{\\,}000$ Ft-ot tesz a számlájára. Az utolsó befizetés $2024.$ január $1$-jén volt.

**a)** Mennyi pénze van Annának $2025.$ január $1$-jén? ($4$ pont)

**b)** Mennyi pénze van Bálintnak $2025.$ január $1$-jén? (Bálint teljes befizetése mekkora számtani sorozatot alkot évenként?) ($3$ pont)

**c)** $2025.$ január $1$-jén hány forinttal van több pénze annak, akinek több van? ($3$ pont)

A pénzösszegeket egész forintra kerekítse!`,
  figure: () => <SavingsChart show="both" />,
  asked: [
    { key: 'anna', label: 'a) Anna: $?$ Ft' },
    { key: 'balint', label: 'b) Bálint: $?$ Ft' },
    { key: 'diff', label: 'c) Különbség: $?$ Ft' },
  ],
};

export const solution = {
  steps: [
    // a)
    {
      title: 'a) 1. lépés — A kamatos kamat képlete',
      points: 1,
      body: `A **kamatos kamat** képlete (fgv. tábla $36.$ old.):

$$T_n = T_0 \\cdot (1 + p)^n,$$

ahol $T_0$ a kezdőtőke, $p$ az éves kamatláb **tizedes tört** alakja, $n$ az évek száma.

Anna esetében $T_0 = 800{\\,}000$ Ft, $p = 0{,}04$, és $n = 5$ év (a $2020$-tól $2025$-ig eltelt $5$ év).`,
      figure: () => <SavingsChart show="anna" />,
    },
    {
      title: 'a) 2. lépés — Az $1{,}04^5$ kiszámítása',
      points: 2,
      body: `Számoljuk ki $1{,}04^5$-t lépésenként:

$$1{,}04^2 = 1{,}0816.$$
$$1{,}04^4 = 1{,}0816^2 = 1{,}16985856.$$
$$1{,}04^5 = 1{,}04^4 \\cdot 1{,}04 = 1{,}16985856 \\cdot 1{,}04 \\approx 1{,}21665290.$$`,
      figure: () => <SavingsChart show="anna" />,
    },
    {
      title: 'a) 3. lépés — Anna egyenlege',
      points: 1,
      body: `$$T_5 = 800{\\,}000 \\cdot 1{,}21665290 \\approx 973{\\,}322{,}3 \\text{ Ft.}$$

Kerekítve egész forintra: **$T_5 \\approx 973{\\,}322$ Ft**.

(Egyes pontatlansági kerekítések miatt ez lehet $973{\\,}322$ – $973{\\,}325$ között; a lényeg a $\\sim 973\\,000$ Ft.)`,
      figure: () => <SavingsChart show="anna" />,
    },

    // b)
    {
      title: 'b) 1. lépés — Bálint befizetéseinek száma',
      points: 1,
      body: `Bálint az alábbi időpontokban fizetett $100{\\,}000$ Ft-ot:

$$2019, 2020, 2021, 2022, 2023, 2024 \\text{ (mindegyik év jan. 1.)}$$

Ez **6 befizetés**. $2025.$-ben nincs már befizetés.`,
      figure: () => <SavingsChart show="balint" />,
    },
    {
      title: 'b) 2. lépés — Számtani sorozat',
      points: 1,
      body: `Bálint számlájának egyenlege évente $100{\\,}000$ Ft-tal növekszik (kamat nincs). Az egyes január $1$-jei egyenlegek:

$$100{\\,}000,\\ 200{\\,}000,\\ 300{\\,}000,\\ 400{\\,}000,\\ 500{\\,}000,\\ 600{\\,}000.$$

Ez egy **számtani sorozat** $a_1 = 100{\\,}000$ Ft-tal és $d = 100{\\,}000$ Ft differenciával. Az $n$-edik tag:

$$a_n = a_1 + (n-1) d = 100{\\,}000 \\cdot n.$$`,
      figure: () => <SavingsChart show="balint" />,
    },
    {
      title: 'b) 3. lépés — Bálint egyenlege 2025-ben',
      points: 1,
      body: `$2024.$ jan. $1.$-n a $6$-dik befizetés után: $a_6 = 6 \\cdot 100{\\,}000 = 600{\\,}000$ Ft.
$2025.$ jan. $1.$-n (kamat nincs, újabb befizetés sincs) **ugyanennyi** marad:

$$B = 600{\\,}000 \\text{ Ft.}$$`,
      figure: () => <SavingsChart show="balint" />,
    },

    // c)
    {
      title: 'c) 1. lépés — Ki hozta jobban?',
      points: 1,
      body: `$$A \\approx 973{\\,}322 \\text{ Ft}, \\quad B = 600{\\,}000 \\text{ Ft.}$$

Mivel $A > B$, Annának van több pénze.`,
      figure: () => <SavingsChart show="both" />,
    },
    {
      title: 'c) 2. lépés — A különbség',
      points: 2,
      body: `$$A - B \\approx 973{\\,}322 - 600{\\,}000 = 373{\\,}322 \\text{ Ft.}$$

Azaz Annának kb. **$373{\\,}322$ Ft-tal** több pénze van.

**Kontextus**: Bár Bálint többet (összesen $600{\\,}000$ Ft-ot) fizetett be, mint amennyi Annánál a kezdőtőke „aktív" volt (aki csak az $800{\\,}000$-t tette fel, plusz hagyta kamatozni), a **kamatos kamat** hosszú távon nagyobb hozamot hozott.`,
      figure: () => <SavingsChart show="both" />,
    },
  ],
  finalAnswer: {
    anna: '$\\approx 973\\,322$ Ft',
    balint: '$600\\,000$ Ft',
    diff: 'Anna $\\approx 373\\,322$ Ft-tal többet',
  },
  usedFormulas: [
    'kamatos kamat: $T_n = T_0 \\cdot (1+p)^n$',
    'számtani sorozat n-edik tagja: $a_n = a_1 + (n-1)d$',
  ],
};

export default { meta, problem, solution };
