import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-04',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'I',
  number: 4,
  title: 'Anagrammák és „BANÁN"-típusú szavak',
  points: 13,
  topics: ['valószínűség'],
  difficulty: 4,
  fgvt: [
    { page: 93, note: 'permutáció ismétléssel' },
  ],
  estimatedMinutes: 18,
};

/*
  „KOMBINATORIKA" — 12 betű, minden betű különböző? Ellenőrzés:
     K O M B I N A T O R I K A
     K: 2, O: 2, M: 1, B: 1, I: 2, N: 1, A: 2, T: 1, R: 1
     összes betű: 2+2+1+1+2+1+2+1+1 = 13 — hmm. Kombinatorika = 13 betű.
  Inkább használjunk saját „szót": MATEMATIKA? — M:2, A:3, T:2, E:1, I:1, K:1  összes = 10. OK.
  Még egyszerűbb: saját koncepció, „ÉRETTSÉGI" — É:2, R:1, E:1, T:2, S:1, G:1, I:1 — 9 betű.
  Válasszuk: „MATEMATIKA" mint példa. n = 10, M:2, A:3, T:2, E:1, I:1, K:1.
  Ismétléses permutációk száma: 10! / (2! * 3! * 2!) = 3 628 800 / (2*6*2) = 3 628 800 / 24 = 151 200.

  Feladat részek:
  a) Hány különböző sorrend (anagramma) alakítható ki?  -> 151 200
  b) Hány sorrend van, amiben az összes magánhangzó egymás mellett áll?
     Magánhangzók: 3 A + 1 E + 1 I = 5 magánhangzó. Mássalhangzó: 2 M + 2 T + 1 K = 5 mssh.
     Kezeljük a magánhangzó-blokkot 1 "supersymbol"-ként: 6 objektum egymás mellett,
     ahol a 6 között 2 M és 2 T (ismétlés).
       blokk elrendezés külső: 6! / (2! * 2!) = 720 / 4 = 180
       blokk belső (A,A,A,E,I): 5! / 3! = 120 / 6 = 20
       összesen: 180 * 20 = 3600
  c) Mi a valószínűsége, hogy egy véletlenül kiválasztott sorrendben az összes magánhangzó
     egymás mellett van?  3600 / 151200 = 1/42.
  d) Hány sorrend van, ahol nincs két egymás melletti A?
     Először rakjuk le a többi 7 betűt (2M, 2T, 1E, 1I, 1K, ami 7 betű): 7!/(2!*2!) = 5040/4 = 1260.
     7 betű között és az elején/végén összesen 8 "hézag" van. 3 A-t kell behelyezni úgy, hogy
     egyik se ugyanabba a hézagba (csak 1 A/hézag).
       C(8, 3) = 56.
     összesen: 1260 * 56 = 70 560.
*/

function WordLayout({ highlight = 'none' }) {
  const word = ['M', 'A', 'T', 'E', 'M', 'A', 'T', 'I', 'K', 'A'];
  const isVowel = (c) => 'AEIOUÁÉÍÓÖŐÚÜŰ'.includes(c);
  return (
    <SvgCanvas width={520} height={220} viewBox="0 0 520 220">
      <text x="260" y="28" fontSize="14" fontWeight="bold" fill="#111" textAnchor="middle">
        A „MATEMATIKA" szó betűi (10 betű)
      </text>
      {word.map((c, i) => {
        const cx = 50 + i * 45;
        const cy = 90;
        const vowel = isVowel(c);
        const highlightMe = highlight === 'vowels' && vowel;
        const bgColor = highlightMe ? '#fde68a' : vowel ? '#fef3c7' : '#e0e7ff';
        const strokeColor = highlightMe ? '#d97706' : '#6b7280';
        return (
          <g key={i}>
            <rect x={cx - 18} y={cy - 22} width={36} height={44} fill={bgColor} stroke={strokeColor} strokeWidth="1.5" rx="4" />
            <text x={cx} y={cy + 8} fontSize="20" fontWeight="bold" fill="#111" textAnchor="middle">{c}</text>
          </g>
        );
      })}
      <text x="50" y="165" fontSize="12" fill="#111">
        M: 2, A: 3, T: 2, E: 1, I: 1, K: 1 — ismétlődő betűk.
      </text>
      <text x="50" y="185" fontSize="12" fill="#111">
        Magánhangzók (5 db): A, A, A, E, I. Mássalhangzók (5 db): M, M, T, T, K.
      </text>
    </SvgCanvas>
  );
}

function GapFigure() {
  // 7 mssh + E/I + 3 A: kirakjuk a 7-et és megmutatjuk a 8 hézagot
  const letters = ['M', 'T', 'E', 'M', 'I', 'T', 'K']; // 7 nem-A betű, csak illusztráció
  return (
    <SvgCanvas width={520} height={200} viewBox="0 0 520 200">
      <text x="260" y="26" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#111">
        Először rakjuk le a 7 nem-A betűt; a 8 hézagba kerül az „A"-k elhelyezése
      </text>
      {letters.map((c, i) => {
        const cx = 80 + i * 50;
        return (
          <g key={i}>
            <rect x={cx - 16} y={70} width={32} height={40} fill="#e0e7ff" stroke="#6b7280" rx="4" />
            <text x={cx} y={96} fontSize="18" fontWeight="bold" fill="#111" textAnchor="middle">{c}</text>
          </g>
        );
      })}
      {/* 8 hézag: 0,1,...,7 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 50 + i * 50;
        return (
          <g key={i}>
            <text x={x} y={140} fontSize="22" fill="#dc2626" fontWeight="bold" textAnchor="middle">↓</text>
            <text x={x} y={162} fontSize="12" fill="#dc2626" textAnchor="middle">{i + 1}.</text>
          </g>
        );
      })}
      <text x="260" y="188" fontSize="12" fill="#111" textAnchor="middle">
        8 hézag közül 3 kiválasztása: C(8, 3) = 56.
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Tekintsük a 10 betűs **„MATEMATIKA"** szót. A szóban a betűk előfordulása: $M: 2,\\ A: 3,\\ T: 2,\\ E: 1,\\ I: 1,\\ K: 1.$ A betűkből (mindegyiket egyszer használva) betűsorozatokat (anagrammákat) képzünk.

**a)** Hány különböző betűsorozat képezhető a szó betűinek felhasználásával? ($3$ pont)

**b)** Hány olyan betűsorozat van, amelyben a **magánhangzók** (a három A, az E és az I) **mind egymás mellett** (egy összefüggő blokkban) állnak? ($4$ pont)

**c)** Mi a valószínűsége, hogy egy egyenletes eloszlás szerint véletlenül választott betűsorozatban a magánhangzók egymás mellett állnak? ($2$ pont)

**d)** Hány olyan betűsorozat képezhető, amelyben **semelyik két A betű nem szomszédos**? ($4$ pont)`,
  figure: () => <WordLayout />,
  asked: [
    { key: 'a', label: 'a) összes sorrend' },
    { key: 'b', label: 'b) magánhangzók egy blokkban' },
    { key: 'c', label: 'c) P(magánhangzók egymás mellett)' },
    { key: 'd', label: 'd) nincs két A szomszédos' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — Ismétléses permutációk képlete',
      points: 1,
      body: `A szó 10 betűből áll, és a betűk között ismétlődések vannak. Az **ismétléses permutációk száma**:

$$P_{n}^{k_1, k_2, \\dots} = \\dfrac{n!}{k_1! \\cdot k_2! \\cdots},$$

ahol $k_i$ az $i$-edik típusú betű előfordulási száma.

Itt $n = 10$, és az ismétlődő betűk: M (2), A (3), T (2); a többi 1-es, ami nem módosítja a nevezőt.`,
    },
    {
      title: 'a) 2. lépés — Behelyettesítés',
      points: 2,
      body: `$$N = \\dfrac{10!}{2! \\cdot 3! \\cdot 2!} = \\dfrac{3\\,628\\,800}{2 \\cdot 6 \\cdot 2} = \\dfrac{3\\,628\\,800}{24} = 151\\,200.$$

$$\\boxed{151\\,200 \\text{ különböző sorrend.}}$$`,
    },
    {
      title: 'b) 1. lépés — Magánhangzó-blokk bevezetése',
      points: 1,
      body: `Tekintsük a 5 magánhangzót (A, A, A, E, I) egy összefüggő **blokknak**. Így összesen

$$\\underbrace{\\text{(blokk)}}_{\\text{1 objektum}} + 5 \\text{ mássalhangzó (M, M, T, T, K)} = 6 \\text{ objektum}$$

lesz, amit egy sorba rakunk.`,
      figure: () => <WordLayout highlight="vowels" />,
    },
    {
      title: 'b) 2. lépés — A 6 objektum elrendezése',
      points: 1,
      body: `A 6 objektum között két ismétlődés van: 2 M és 2 T. Az elrendezések száma:

$$E_\\text{külső} = \\dfrac{6!}{2! \\cdot 2!} = \\dfrac{720}{4} = 180.$$`,
    },
    {
      title: 'b) 3. lépés — A blokk belső sorrendjei',
      points: 1,
      body: `A blokkon belül az 5 magánhangzó (A, A, A, E, I) sorrendje is változhat:

$$E_\\text{belső} = \\dfrac{5!}{3!} = \\dfrac{120}{6} = 20.$$`,
    },
    {
      title: 'b) 4. lépés — A kettő szorzata',
      points: 1,
      body: `A független választások szorzódnak:

$$N_b = 180 \\cdot 20 = 3600.$$

$$\\boxed{3600 \\text{ betűsorozat, amelyben a magánhangzók egymás mellett állnak.}}$$`,
    },
    {
      title: 'c) — Valószínűség',
      points: 2,
      body: `Egyenletes eloszlás szerint (klasszikus valószínűség):

$$P = \\dfrac{\\text{kedvező}}{\\text{összes}} = \\dfrac{3600}{151\\,200}.$$

Egyszerűsítsünk:

$$P = \\dfrac{3600}{151\\,200} = \\dfrac{1}{42} \\approx 0{,}0238 \\approx 2{,}38\\%.$$

$$\\boxed{P = \\dfrac{1}{42}.}$$`,
    },
    {
      title: 'd) 1. lépés — Stratégia: előbb a nem-A betűk',
      points: 1,
      body: `A szóban **3 db A** és **7 db nem-A** (M, M, T, T, E, I, K) betű van. A „semelyik két A nem szomszédos" feltétel akkor teljesíthető, ha először a **7 nem-A** betűt rakjuk le, majd a **3 A**-t olyan **hézagokba** helyezzük, ahol nem ütköznek egymással.

A 7 nem-A betű elrendezéseinek száma:

$$N_1 = \\dfrac{7!}{2! \\cdot 2!} = \\dfrac{5040}{4} = 1260.$$`,
      figure: () => <GapFigure />,
    },
    {
      title: 'd) 2. lépés — A hézagok megszámlálása',
      points: 1,
      body: `7 betűnek 2 „külső" (elöl és hátul) és 6 „belső" hézaga van — összesen **8 hézag**. Ezek közül **3 különbözőt** kell kiválasztanunk a 3 A számára (minden hézagba legfeljebb 1 A, különben ismét szomszédosak lennének).

A kiválasztások száma (sorrend nem számít, az A-k egyformák):

$$N_2 = \\binom{8}{3} = \\dfrac{8!}{3!\\,5!} = \\dfrac{8 \\cdot 7 \\cdot 6}{6} = 56.$$`,
    },
    {
      title: 'd) 3. lépés — A szorzat',
      points: 2,
      body: `A két független lépés szorzódik:

$$N = 1260 \\cdot 56 = 70\\,560.$$

$$\\boxed{70\\,560 \\text{ olyan sorrend, amelyben nincs két szomszédos A.}}$$

**Ellenőrzés mérettel:** $N = 70\\,560 < 151\\,200$ (az összes), és $70\\,560 / 151\\,200 \\approx 0{,}467$. Érthető arány: az „A"-k véletlen elhelyezése körül kb. felénél teljesül a feltétel.`,
    },
  ],
  finalAnswer: {
    a: '$151\\,200$',
    b: '$3600$',
    c: '$P = \\dfrac{1}{42} \\approx 2{,}38\\%$',
    d: '$70\\,560$',
  },
  usedFormulas: [
    'ismétléses permutációk: $n!/(k_1!\\,k_2!\\cdots)$',
    'kombináció: $\\binom{n}{k}$',
    'klasszikus valószínűség',
    'blokk-technika (összefüggő csoport kezelése egy objektumként)',
    'hézag-technika (szomszédosság tiltása)',
  ],
};

export default { meta, problem, solution };
