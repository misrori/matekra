import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-18',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'II.B',
  number: 18,
  title: 'Földrengés Richter-skálán — logaritmikus modell',
  points: 17,
  topics: ['logaritmus', 'exponenciális', 'függvények'],
  difficulty: 5,
  fgvt: [
    { page: 24, note: 'logaritmus azonosságai' },
    { page: 44, note: 'logaritmus függvény' },
  ],
  estimatedMinutes: 28,
};

/*
  ─────────────────────────────────────────────────────────────────────────────
  MODELL — földrengés Richter-skálája.

  A földrengések amplitúdóját (A) a Richter-skálán (M) összekapcsoló képlet:

        M = lg(A / A0),

  ahol A a szeizmogramon mért kitérés, A0 egy referencia-kitérés (rögzített).
  Ebből:  A / A0 = 10^M.

  Az általunk használt értékek (feladatként):
    a) Egy M1 = 6,2 magnitúdójú rengés kitérése A1. Az M2 = 7,7 magnitúdójú rengés
       kitérése hányszorosa az A1-nek?
       A2 / A1 = 10^(M2 - M1) = 10^1,5 ≈ 31,62.
    b) Mekkora magnitúdójú rengés kitérése háromszorosa az 5,0-szeres rengés
       kitérésének?  M' = 5,0 + lg 3 ≈ 5,0 + 0,4771 = 5,48.
    c) Az energiára ismert képlet:  log10(E) = 4,8 + 1,5·M
       (az energia joule-ban, E = 10^(4,8 + 1,5·M)).
       Egy M = 6,2 rengés energiája mekkora? Hányszorosa egy M = 4,2 energiájának?
       E6.2 = 10^(4,8 + 9,3) = 10^14,1 ≈ 1,2589 · 10^14 J.
       E6.2 / E4.2 = 10^(1,5·2) = 10^3 = 1000.  (tehát 1000-szeres!)
    d) Ha egy rengés energiája E = 1 · 10^12 J, mekkora a magnitúdó?
       log10(10^12) = 12 = 4,8 + 1,5·M → M = (12 - 4,8)/1,5 = 7,2/1,5 = 4,8.
*/

function RichterChart({ show = 'M' }) {
  // Tengely: M 0..9, y tengely: log10(A/A0) = M (tehát y = M)
  // Valójában a kitérés A = A0 · 10^M, logaritmikus tengely.
  // Itt szemléletessé tesszük: oszlopdiagram M = 4, 5, 6, 7, 8-ra, az érték log(A/A0) = M.
  const MAGNIT = [4, 5, 6, 7, 8];
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      <text x="260" y="24" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Richter-magnitúdó vs. relatív kitérés (log skálán)
      </text>
      <Axes x={60} y={40} w={420} h={260} xMin={0} xMax={10} yMin={0} yMax={9} xStep={1} yStep={1} xLabel="M" yLabel="lg(A/A0)" grid />
      {MAGNIT.map((m) => {
        const xC = 60 + (m / 10) * 420;
        const barW = 30;
        const yTop = 40 + 260 - (m / 9) * 260;
        const barH = 40 + 260 - yTop;
        const highlight = (show === 'M' && (m === 6 || m === 7)) || (show === 'energy' && m === 6);
        const fill = highlight ? '#dc2626' : '#2563eb';
        return (
          <g key={m}>
            <rect x={xC - barW / 2} y={yTop} width={barW} height={barH} fill={fill} fillOpacity="0.8" stroke="#1e3a8a" />
            <text x={xC} y={yTop - 6} fontSize="12" fontWeight="700" textAnchor="middle" fill={highlight ? '#7f1d1d' : '#1e3a8a'}>
              10^{m}
            </text>
          </g>
        );
      })}
      {/* Megjegyzés */}
      <text x="80" y="320" fontSize="12" fill="#6b7280">
        Egy egységnyi magnitúdó-növekedés → 10-szeres kitérés. 1,5 egység → √1000 ≈ 31,6-szoros.
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `A földrengések erősségét a **Richter-skálán** mért $M$ magnitúdóval jellemzzük. A szeizmográffal mért kitérés ($A$) és a magnitúdó ($M$) kapcsolatát a következő összefüggés írja le:

$$M = \\lg\\left(\\dfrac{A}{A_0}\\right),$$

ahol $A_0$ egy rögzített referencia-kitérés. Ebből átrendezve $A = A_0 \\cdot 10^M$.

**a)** Egy földrengés magnitúdója $M_1 = 6{,}2$, egy másik földrengésé $M_2 = 7{,}7$. Hányszorosa a második rengés kitérése az elsőének? ($4$ pont)

**b)** Egy $M = 5{,}0$ magnitúdójú rengés után egy olyan rengés történt, amelynek a kitérése **háromszorosa** volt az előzőnek. Mekkora az új magnitúdó? ($4$ pont)

**c)** A rengés energiája ($E$ joule-ban) a magnitúdóval az alábbi összefüggésben áll:

$$\\lg E = 4{,}8 + 1{,}5 \\cdot M.$$

Hányszorosa egy $M = 6{,}2$ rengés energiája egy $M = 4{,}2$ rengés energiájának? ($4$ pont)

**d)** Egy földrengés energiája $E = 10^{12}$ J. Mekkora a magnitúdója (a c) részben megadott képlet alapján)? ($5$ pont)

Eredményeket két tizedesjegyre kerekítsen! ($\\lg 3 \\approx 0{,}4771$, $10^{0{,}5} \\approx 3{,}162$)`,
  figure: () => <RichterChart show="M" />,
  asked: [
    { key: 'ratioA', label: 'a) $A_2 / A_1 = ?$' },
    { key: 'Mnew', label: "b) $M' = ?$" },
    { key: 'ratioE', label: 'c) $E_{6{,}2} / E_{4{,}2} = ?$' },
    { key: 'M', label: 'd) $M = ?$' },
  ],
};

export const solution = {
  steps: [
    // a)
    {
      title: 'a) 1. lépés — A két kitérés hányadosa',
      points: 2,
      body: `Az $M = \\lg(A / A_0)$ képletből $A = A_0 \\cdot 10^M$. Ezért a két rengés kitéréseinek aránya:

$$\\dfrac{A_2}{A_1} = \\dfrac{A_0 \\cdot 10^{M_2}}{A_0 \\cdot 10^{M_1}} = 10^{M_2 - M_1}.$$

A megadott adatokkal:

$$M_2 - M_1 = 7{,}7 - 6{,}2 = 1{,}5.$$`,
      figure: () => <RichterChart show="M" />,
    },
    {
      title: 'a) 2. lépés — $10^{1{,}5}$ kiszámítása',
      points: 2,
      body: `$$10^{1{,}5} = 10^1 \\cdot 10^{0{,}5} = 10 \\cdot \\sqrt{10} \\approx 10 \\cdot 3{,}162 = 31{,}62.$$

Tehát a második rengés kitérése kb. **$31{,}62$-szerese** az elsőének.

**Értelmezés**: egy $1{,}5$ egységnyi magnitúdó-különbség nem $\\sim 1{,}5$-szeres, hanem több mint $30$-szoros kitérést jelent — a logaritmikus skála könnyen megtévesztő.`,
      figure: () => <RichterChart show="M" />,
    },

    // b)
    {
      title: 'b) 1. lépés — Az új magnitúdó felírása',
      points: 2,
      body: `Ha az új kitérés $A' = 3 A$, ahol $A$ a régi $M = 5{,}0$ rengés kitérése, akkor az új magnitúdó:

$$M' = \\lg\\left(\\dfrac{A'}{A_0}\\right) = \\lg\\left(\\dfrac{3 A}{A_0}\\right) = \\lg 3 + \\lg\\left(\\dfrac{A}{A_0}\\right).$$

A **logaritmus szorzati azonosságot** használtuk: $\\lg(a b) = \\lg a + \\lg b$.`,
      figure: () => <RichterChart show="M" />,
    },
    {
      title: 'b) 2. lépés — Értékek behelyettesítése',
      points: 2,
      body: `Mivel $\\lg(A/A_0) = M = 5{,}0$ (az eredeti magnitúdó):

$$M' = \\lg 3 + 5{,}0 \\approx 0{,}4771 + 5{,}0 = 5{,}4771.$$

Két tizedesjegyre kerekítve:

$$\\boxed{M' \\approx 5{,}48.}$$

**Értelmezés**: a háromszoros kitérés csak $\\sim 0{,}48$ egységnyi magnitúdó-növekedést jelent — ez is a logaritmikus skála jellegzetessége.`,
      figure: () => <RichterChart show="M" />,
    },

    // c)
    {
      title: 'c) 1. lépés — Az energia-képlet átírása',
      points: 2,
      body: `A megadott képlet: $\\lg E = 4{,}8 + 1{,}5 M$, tehát $E = 10^{4{,}8 + 1{,}5 M}$.

A két energia aránya:

$$\\dfrac{E_{6{,}2}}{E_{4{,}2}} = \\dfrac{10^{4{,}8 + 1{,}5 \\cdot 6{,}2}}{10^{4{,}8 + 1{,}5 \\cdot 4{,}2}} = 10^{1{,}5 \\cdot (6{,}2 - 4{,}2)}.$$

(A $4{,}8$ additív konstans „kiesik".)`,
      figure: () => <RichterChart show="energy" />,
    },
    {
      title: 'c) 2. lépés — Az exponens kiszámítása',
      points: 2,
      body: `$$1{,}5 \\cdot (6{,}2 - 4{,}2) = 1{,}5 \\cdot 2 = 3.$$

Tehát:

$$\\dfrac{E_{6{,}2}}{E_{4{,}2}} = 10^{3} = 1000.$$

**Értelmezés**: egy 2 Richter-fokozatnyi különbség $1000$-szeres energiakülönbséget jelent! Ezért lehet egy-egy "kicsinek tűnő" magnitúdó-különbség valójában hatalmas pusztítás.`,
      figure: () => <RichterChart show="energy" />,
    },

    // d)
    {
      title: 'd) 1. lépés — Az egyenlet felírása',
      points: 2,
      body: `Az $E = 10^{12}$ joule esetén:

$$\\lg E = \\lg(10^{12}) = 12.$$

A megadott modellben $\\lg E = 4{,}8 + 1{,}5 M$, tehát

$$12 = 4{,}8 + 1{,}5 M.$$`,
      figure: () => <RichterChart show="M" />,
    },
    {
      title: 'd) 2. lépés — $M$ kifejezése',
      points: 2,
      body: `Rendezzük az egyenletet:

$$1{,}5 M = 12 - 4{,}8 = 7{,}2 \\;\\Longrightarrow\\; M = \\dfrac{7{,}2}{1{,}5} = 4{,}8.$$`,
      figure: () => <RichterChart show="M" />,
    },
    {
      title: 'd) 3. lépés — Ellenőrzés és magyarázat',
      points: 1,
      body: `**Ellenőrzés**: ha $M = 4{,}8$, akkor $\\lg E = 4{,}8 + 1{,}5 \\cdot 4{,}8 = 4{,}8 + 7{,}2 = 12$, tehát $E = 10^{12}$ J. ✓

**Értelmezés**: egy $10^{12}$ joule energia (1 TJ, tera-joule) egy közepes erősségű rengésnek felel meg (kb. épületkárokat okozhat, de nem katasztrofális).

$$\\boxed{M = 4{,}8.}$$`,
      figure: () => <RichterChart show="M" />,
    },
  ],
  finalAnswer: {
    ratioA: '$A_2 / A_1 = 10^{1{,}5} \\approx 31{,}62$',
    Mnew: "$M' \\approx 5{,}48$",
    ratioE: '$E_{6{,}2} / E_{4{,}2} = 10^3 = 1000$',
    M: '$M = 4{,}8$',
  },
  usedFormulas: [
    'Richter-magnitúdó: $M = \\lg(A/A_0)$, $A = A_0 \\cdot 10^M$',
    'energia-modell: $\\lg E = 4{,}8 + 1{,}5 M$',
    'logaritmus szorzati azonossága: $\\lg(ab) = \\lg a + \\lg b$',
    'hatvány azonosságok',
  ],
};

export default { meta, problem, solution };
