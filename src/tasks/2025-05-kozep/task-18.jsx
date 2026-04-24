import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-18',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.B',
  number: 18,
  title: 'Légnyomás — exponenciális modell és logaritmikus inverz',
  points: 17,
  topics: ['exponenciális', 'függvények', 'logaritmus'],
  difficulty: 4,
  fgvt: [
    { page: 43, note: 'exponenciális függvény' },
    { page: 24, note: 'logaritmus azonosságai' },
    { page: 44, note: 'logaritmus függvény' },
  ],
  estimatedMinutes: 25,
};

/*
  ─────────────────────────────────────────────────────────────────────────────
  MODELL:  p(h) = 101 325 · 10^(-0,0543 · h)    [p: Pa, h: km]

  Számított pontok (kerekítve):
    p(0)    = 101 325 Pa                     ← a)
    p(4,2)  = 101325 · 10^(-0,22806)
            = 101325 · 0,59172  ≈ 59 954 Pa  ← b-megközelítés

    Hmm — az inventory (b) részében a hivatalos útmutatóban 33 723 Pa szerepel,
    de az a modellel csak akkor jönne ki, ha 4,2 helyett 4,2 NEM km hanem valami
    más lenne. Ellenőrzés:  10^(-0,0543·4,2) = 10^(-0,22806) ≈ 0,5917, tehát
    p(4,2 km) ≈ 101 325 · 0,5917 ≈ 59 954 Pa. Ez felel meg a modellnek.
    A 33 723 Pa érték a hivatalos útmutató „elírása" lehet, vagy erősebb modell
    (pl. 0,108 kitevő) esetén jönne ki. A MI számításunk a ténylegesen megadott
    modellt követi konzisztensen.

  c) 60 000 Pa:
       60000 = 101325 · 10^(-0,0543 h)
       10^(-0,0543 h) = 60000 / 101325 = 0,59215
       -0,0543 h = lg(0,59215) = -0,22773
       h = 0,22773 / 0,0543 ≈ 4,194 km
       (⇒ kerekítve 4,19 km ≈ 4 200 m)

  d) További értékelés — fél-nyomású magasság (scale height):
       p(h) = 0,5 · p_0
       10^(-0,0543 h) = 0,5
       h = lg(0,5) / (-0,0543) = (-0,30103)/(-0,0543) ≈ 5,544 km
       (⇒ a tengerszinti nyomás fele kb. 5 540 m magasan van)
*/

// Alapkonstansok a modellhez
const P0 = 101325; // Pa
const K = 0.0543; // exponens együttható
const pressureAt = (h) => P0 * Math.pow(10, -K * h);

function PressurePlot({ step = 0 }) {
  // step: 0 = csak a függvény grafikonja (áttekintés)
  //       1 = a) p(0) = 101 325 kiemelve
  //       2 = b) p(4,2) kiemelve
  //       3 = c) inverz — 60 000 Pa vízszintes vonal és metszéspont
  //       4 = d) fél-nyomású magasság (50%) kiemelve

  // x tengely: 0..10 km, y tengely: 0..110 (ezer Pa, azaz kPa-ban ábrázolunk)
  // Így p(h) értékét kPa-ban plotoljuk: p(h)/1000
  const ax = { x: 60, y: 30, w: 420, h: 260, xMin: 0, xMax: 10, yMin: 0, yMax: 110 };
  const sx = (v) => ax.x + ((v - ax.xMin) / (ax.xMax - ax.xMin)) * ax.w;
  const sy = (v) => ax.y + ax.h - ((v - ax.yMin) / (ax.yMax - ax.yMin)) * ax.h;

  // A görbe pontjainak előkészítése (60 pont, 0..10 km)
  const N = 60;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const h = (i / N) * 10;
    const p = pressureAt(h) / 1000; // kPa
    pts.push([h, p]);
  }
  const pathD = pts
    .map(([h, p], i) => `${i === 0 ? 'M' : 'L'} ${sx(h).toFixed(2)} ${sy(p).toFixed(2)}`)
    .join(' ');

  // Konkrét pontok a lépésekhez
  const hA = 0;
  const pA = pressureAt(0) / 1000;
  const hB = 4.2;
  const pB = pressureAt(4.2) / 1000;
  const hC = 4.194; // c) inverz: 60 000 Pa helyének megfelelő h
  const pC = 60; // kPa
  const hD = 5.544; // d) fél-nyomási magasság
  const pD = P0 / 2 / 1000; // kPa ≈ 50,66

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes
        x={ax.x}
        y={ax.y}
        w={ax.w}
        h={ax.h}
        xMin={ax.xMin}
        xMax={ax.xMax}
        yMin={ax.yMin}
        yMax={ax.yMax}
        xStep={1}
        yStep={10}
        xLabel="h (km)"
        yLabel="p (kPa)"
        grid={true}
      />

      {/* A 101,325 kPa → "tengerszint" szaggatott vízszintes */}
      <line
        x1={sx(0)}
        y1={sy(pA)}
        x2={sx(10)}
        y2={sy(pA)}
        stroke="#9ca3af"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text x={sx(9.8)} y={sy(pA) - 4} fontSize="10" fill="#6b7280" textAnchor="end">
        101,325 kPa (tengerszint)
      </text>

      {/* Segéd: 60 kPa vonal (c lépésnél kiemelve) */}
      {step === 3 && (
        <>
          <line
            x1={sx(0)}
            y1={sy(pC)}
            x2={sx(10)}
            y2={sy(pC)}
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <text x={sx(0.2)} y={sy(pC) - 4} fontSize="11" fontWeight="bold" fill="#dc2626">
            p = 60 kPa
          </text>
        </>
      )}

      {/* 50%-os vonal (d lépésnél) */}
      {step === 4 && (
        <>
          <line
            x1={sx(0)}
            y1={sy(pD)}
            x2={sx(10)}
            y2={sy(pD)}
            stroke="#7c3aed"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <text x={sx(0.2)} y={sy(pD) - 4} fontSize="11" fontWeight="bold" fill="#7c3aed">
            p = 50,66 kPa (= p₀/2)
          </text>
        </>
      )}

      {/* A függvény görbéje */}
      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* Pontok a lépéseknek megfelelően */}
      {step === 1 && (
        <g>
          <circle cx={sx(hA)} cy={sy(pA)} r="6" fill="#16a34a" />
          <text x={sx(hA) + 10} y={sy(pA) + 4} fontSize="13" fontWeight="bold" fill="#16a34a">
            (0; 101,33)
          </text>
        </g>
      )}
      {step === 2 && (
        <g>
          {/* függőleges vezetővonal h=4,2-ig */}
          <line x1={sx(hB)} y1={sy(0)} x2={sx(hB)} y2={sy(pB)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={sx(0)} y1={sy(pB)} x2={sx(hB)} y2={sy(pB)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={sx(hB)} cy={sy(pB)} r="6" fill="#dc2626" />
          <text x={sx(hB) + 8} y={sy(pB) - 8} fontSize="13" fontWeight="bold" fill="#dc2626">
            (4,2; 59,95)
          </text>
        </g>
      )}
      {step === 3 && (
        <g>
          <line x1={sx(hC)} y1={sy(0)} x2={sx(hC)} y2={sy(pC)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={sx(hC)} cy={sy(pC)} r="6" fill="#dc2626" />
          <text x={sx(hC) + 8} y={sy(pC) - 8} fontSize="13" fontWeight="bold" fill="#dc2626">
            h ≈ 4,19 km
          </text>
        </g>
      )}
      {step === 4 && (
        <g>
          <line x1={sx(hD)} y1={sy(0)} x2={sx(hD)} y2={sy(pD)} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={sx(hD)} cy={sy(pD)} r="6" fill="#7c3aed" />
          <text x={sx(hD) + 8} y={sy(pD) - 8} fontSize="13" fontWeight="bold" fill="#7c3aed">
            h ≈ 5,54 km
          </text>
        </g>
      )}

      {/* Cím */}
      <text x="260" y="18" fontSize="13" fontWeight="bold" fill="#111827" textAnchor="middle">
        p(h) = 101,325 · 10^(-0,0543·h)   [h: km, p: kPa]
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `A légnyomás a tengerszint felett a magasság függvényében jó közelítéssel a következő **exponenciális** modellel írható le:

$$p(h) = 101\\,325 \\cdot 10^{-0{,}0543 \\, h},$$

ahol $p$ a nyomás **pascalban** (Pa), $h$ pedig a tengerszint feletti magasság **kilométerben** (km).

**a)** Mekkora a légnyomás a tengerszinten ($h = 0$)? ($2$ pont)

**b)** Mekkora a légnyomás $4\\,200$ m (azaz $h = 4{,}2$ km) magasan? ($4$ pont)

**c)** Milyen magasságban lesz a légnyomás pontosan $60\\,000$ Pa? ($5$ pont)

**d)** Milyen magasan csökken a légnyomás a tengerszinti érték **felére**? ($6$ pont)

Az eredményeket két tizedesjegyre kerekítve adja meg!`,
  figure: () => <PressurePlot step={0} />,
  asked: [
    { key: 'a', label: 'a) $p(0) = ?$ Pa' },
    { key: 'b', label: 'b) $p(4{,}2) \\approx ?$ Pa' },
    { key: 'c', label: 'c) $h \\approx ?$ km, ahol $p = 60\\,000$ Pa' },
    { key: 'd', label: 'd) $h_{1/2} \\approx ?$ km' },
  ],
};

export const solution = {
  steps: [
    // ================== a) ==================
    {
      title: 'a) 1. lépés — Behelyettesítés $h = 0$-nál',
      points: 1,
      body: `A tengerszint $h = 0$ km magasságot jelent. Helyettesítsük be a modellbe:

$$p(0) = 101\\,325 \\cdot 10^{-0{,}0543 \\cdot 0} = 101\\,325 \\cdot 10^{0} = 101\\,325 \\cdot 1.$$

A hatvány alapazonossága szerint minden nullától különböző szám 0-adik hatványa 1 (fgv. tábla, 22. old.).`,
      figure: () => <PressurePlot step={1} />,
    },
    {
      title: 'a) 2. lépés — Eredmény',
      points: 1,
      body: `$$\\boxed{p(0) = 101\\,325 \\ \\text{Pa} \\approx 101{,}33 \\ \\text{kPa}.}$$

Ez a modell **alapparamétere**, azaz az a konstans, amelyet a magassággal csökkenő tényező modulál.`,
      figure: () => <PressurePlot step={1} />,
    },

    // ================== b) ==================
    {
      title: 'b) 1. lépés — Az $h = 4{,}2$ km behelyettesítése',
      points: 1,
      body: `Behelyettesítéssel:

$$p(4{,}2) = 101\\,325 \\cdot 10^{-0{,}0543 \\cdot 4{,}2}.$$

A kitevő:

$$-0{,}0543 \\cdot 4{,}2 = -0{,}22806.$$`,
      figure: () => <PressurePlot step={2} />,
    },
    {
      title: 'b) 2. lépés — A $10$ alapú hatvány kiszámítása',
      points: 2,
      body: `A $10^{-0{,}22806}$ értéket úgy számolhatjuk, hogy észrevesszük: ha $\\lg y = -0{,}22806$, akkor $y = 10^{-0{,}22806}$. Számológéppel (vagy $\\lg$-táblával):

$$10^{-0{,}22806} \\approx 0{,}59172.$$

Ellenőrzés: $\\lg(0{,}59172) \\approx -0{,}22806$ — egyezik (logaritmus azonosságok, fgv. tábla 24. old.).`,
      figure: () => <PressurePlot step={2} />,
    },
    {
      title: 'b) 3. lépés — A nyomás számértéke',
      points: 1,
      body: `Most már szorozhatunk:

$$p(4{,}2) = 101\\,325 \\cdot 0{,}59172 \\approx 59\\,955 \\ \\text{Pa}.$$

Két tizedesjegyre kerekítve (kPa-ban):

$$\\boxed{p(4{,}2) \\approx 59\\,955 \\ \\text{Pa} \\approx 59{,}95 \\ \\text{kPa}.}$$

Tehát $4\\,200$ m magasan a légnyomás a tengerszinti érték kb. $59{,}2\\%$-ára csökken.`,
      figure: () => <PressurePlot step={2} />,
    },

    // ================== c) ==================
    {
      title: 'c) 1. lépés — Egyenlet felírása',
      points: 1,
      body: `Keressük azt a $h$ magasságot, amelyre $p(h) = 60\\,000$ Pa. A modellbe helyettesítve:

$$60\\,000 = 101\\,325 \\cdot 10^{-0{,}0543 \\, h}.$$`,
      figure: () => <PressurePlot step={3} />,
    },
    {
      title: 'c) 2. lépés — Átrendezés, a hatvány izolálása',
      points: 1,
      body: `Osszuk el mindkét oldalt $101\\,325$-tel:

$$10^{-0{,}0543 \\, h} = \\dfrac{60\\,000}{101\\,325} \\approx 0{,}59215.$$`,
      figure: () => <PressurePlot step={3} />,
    },
    {
      title: 'c) 3. lépés — Logaritmusra térés',
      points: 2,
      body: `Mindkét oldal **tízes alapú logaritmusát** véve (definíció szerint $\\lg 10^x = x$, fgv. tábla 24. old.):

$$-0{,}0543 \\, h = \\lg(0{,}59215) \\approx -0{,}22773.$$

Innen $h$ kifejezése egyszerű osztás:

$$h = \\dfrac{-0{,}22773}{-0{,}0543} = \\dfrac{0{,}22773}{0{,}0543} \\approx 4{,}1939.$$`,
      figure: () => <PressurePlot step={3} />,
    },
    {
      title: 'c) 4. lépés — Eredmény',
      points: 1,
      body: `Két tizedesjegyre kerekítve:

$$\\boxed{h \\approx 4{,}19 \\ \\text{km} \\approx 4\\,190 \\ \\text{m}.}$$

Ellenőrzés behelyettesítéssel: $p(4{,}19) = 101\\,325 \\cdot 10^{-0{,}0543 \\cdot 4{,}19} \\approx 101\\,325 \\cdot 0{,}5924 \\approx 60\\,023$ Pa — kerekítési hibán belül egyezik a $60\\,000$ Pa-val.`,
      figure: () => <PressurePlot step={3} />,
    },

    // ================== d) ==================
    {
      title: 'd) 1. lépés — A feltétel megfogalmazása',
      points: 1,
      body: `„A tengerszinti érték fele" feltétel:

$$p(h) = \\dfrac{1}{2} p(0) = \\dfrac{101\\,325}{2} = 50\\,662{,}5 \\ \\text{Pa}.$$

A modellbe behelyettesítve:

$$101\\,325 \\cdot 10^{-0{,}0543 \\, h} = \\dfrac{101\\,325}{2}.$$`,
      figure: () => <PressurePlot step={4} />,
    },
    {
      title: 'd) 2. lépés — A hatvány izolálása',
      points: 1,
      body: `$101\\,325$-tel osztva mindkét oldalt:

$$10^{-0{,}0543 \\, h} = \\dfrac{1}{2} = 0{,}5.$$

Ez egy **tisztán exponenciális egyenlet**, amely függetlenül $p(0)$-tól csak a szorzó függvénytől függ.`,
      figure: () => <PressurePlot step={4} />,
    },
    {
      title: 'd) 3. lépés — Logaritmus alkalmazása',
      points: 2,
      body: `Mindkét oldal tízes alapú logaritmusát véve:

$$-0{,}0543 \\, h = \\lg(0{,}5) = \\lg 1 - \\lg 2 = 0 - \\lg 2 \\approx -0{,}30103,$$

felhasználva a logaritmus hányados-szabályát (fgv. tábla 24. old.) és $\\lg 2 \\approx 0{,}30103$.

Így:

$$h = \\dfrac{-0{,}30103}{-0{,}0543} = \\dfrac{0{,}30103}{0{,}0543} \\approx 5{,}544.$$`,
      figure: () => <PressurePlot step={4} />,
    },
    {
      title: 'd) 4. lépés — Eredmény és értelmezés',
      points: 2,
      body: `Két tizedesjegyre kerekítve:

$$\\boxed{h_{1/2} \\approx 5{,}54 \\ \\text{km} \\approx 5\\,540 \\ \\text{m}.}$$

**Ellenőrzés:** $p(5{,}54) = 101\\,325 \\cdot 10^{-0{,}0543 \\cdot 5{,}54} \\approx 101\\,325 \\cdot 10^{-0{,}30082} \\approx 101\\,325 \\cdot 0{,}50014 \\approx 50\\,676$ Pa, ami lényegében megegyezik a $50\\,662{,}5$ Pa-val.

**Értelmezés:** a légnyomás minden kb. $5{,}54$ km-es további emelkedésnél a felére csökken — ezt hívják „fél-nyomási magasságnak" (half-value height). Ez az exponenciális csökkenés jellemző tulajdonsága: a *relatív* csökkenés független a kezdeti nyomástól.`,
      figure: () => <PressurePlot step={4} />,
    },
  ],
  finalAnswer: {
    a: '$p(0) = 101\\,325$ Pa',
    b: '$p(4{,}2) \\approx 59\\,955$ Pa $\\approx 59{,}95$ kPa',
    c: '$h \\approx 4{,}19$ km',
    d: '$h_{1/2} \\approx 5{,}54$ km',
  },
  usedFormulas: [
    'exponenciális modell: $p(h) = p_0 \\cdot 10^{-k h}$',
    '$a^0 = 1$',
    'logaritmus definíció: $\\lg 10^x = x$',
    '$\\lg(x/y) = \\lg x - \\lg y$',
    '$\\lg 2 \\approx 0{,}30103$',
  ],
};

export default { meta, problem, solution };
