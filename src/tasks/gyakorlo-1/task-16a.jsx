export const meta = {
  id: 'gyakorlo-1-16a',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.B',
  number: 16,
  sub: '.a',
  title: 'Mértani sorozat — bakteriumtenyészet növekedése',
  points: 9,
  topics: ['mértani sorozat', 'exponenciális'],
  difficulty: 4,
  fgvt: [
    { page: 35, note: 'mértani sorozat' },
    { page: 24, note: 'logaritmus azonosságai' },
  ],
  estimatedMinutes: 14,
};

/*
  Bakteriumtenyészet: induláskor 5 000 baktérium, óránként 20%-kal nő.
  a_n = 5000 · 1,20^(n-1) [n = óra száma + 1, de itt a_1 = induláskor]

  a) 6 óra múlva (a_7):  5000 · 1,2^6 = 5000 · 2,985984 ≈ 14 929,9 ≈ 14 930
  b) Mikor lesz először > 30 000?
     5000 · 1,2^n > 30000
     1,2^n > 6
     n > lg 6 / lg 1,2 ≈ 0,7782 / 0,0792 ≈ 9,827
     ⇒ n = 10 óra (a 10. óra végén)
  c) Az első 10 óra alatti átlagos létszám vagy összeg:
     S_10 = 5000 · (1,2^10 - 1)/(1,2 - 1) = 5000 · (6,1917 - 1)/0,2
                                           = 5000 · 25,959 ≈ 129 793 (órás „baktérium-óra")
     Ezt hagyjuk meg későbbre, itt csak egyszerűbb kérdések kellenek.

  LEVELÜNK: 3 alfeladat: a) 5 pont, b) 4 pont
*/

export const problem = {
  statement: `Egy laboratóriumi kísérletben bakteriumtenyészetet vizsgálnak. A kísérlet kezdetén (a $0.$ órában) $5\\,000$ baktérium van a tenyészetben, és a sejtszám a megfigyelés szerint **óránként $20\\%$-kal nő** (mértani sorozat szerinti növekedés).

**a)** Hány baktérium lesz a tenyészetben a $6.$ óra végén? ($5$ pont)

**b)** Az első hány egész óra elteltével haladja meg a baktériumok száma a $30\\,000$-et? ($4$ pont)`,
  asked: [
    { key: 'count6', label: 'a) $a_6 \\approx ?$' },
    { key: 'time', label: 'b) $n = ?$ óra' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — A modell felírása',
      points: 1,
      body: `Óránként $20\\%$-os növekedés azt jelenti, hogy minden óra végén az előző óra létszámát $1{,}2$-del kell megszorozni. Ez egy **mértani sorozat** $a_1 = 5\\,000$ kezdőtaggal és $q = 1{,}2$ hányadossal.

A kezdő időpontot $0.$ óraként jelölve, a $k.$ óra végi létszám:

$$a_k = 5\\,000 \\cdot 1{,}2^{k}.$$

(Ekkor $a_0 = 5\\,000 \\cdot 1 = 5\\,000$, ami egyezik a kiindulási értékkel.)`,
    },
    {
      title: 'a) 2. lépés — $1{,}2^6$ kiszámítása',
      points: 2,
      body: `Számítsuk ki a $1{,}2$ hatványait fokozatosan:

$$1{,}2^2 = 1{,}44.$$

$$1{,}2^3 = 1{,}44 \\cdot 1{,}2 = 1{,}728.$$

$$1{,}2^4 = 1{,}728 \\cdot 1{,}2 = 2{,}0736.$$

$$1{,}2^5 = 2{,}0736 \\cdot 1{,}2 \\approx 2{,}48832.$$

$$1{,}2^6 \\approx 2{,}48832 \\cdot 1{,}2 \\approx 2{,}985984.$$`,
    },
    {
      title: 'a) 3. lépés — A $6.$ óra végi létszám',
      points: 2,
      body: `$$a_6 = 5\\,000 \\cdot 1{,}2^6 \\approx 5\\,000 \\cdot 2{,}98598 \\approx 14\\,929{,}92.$$

Mivel a baktériumok száma egész szám kell legyen, kerekítve:

$$\\boxed{a_6 \\approx 14\\,930 \\text{ baktérium}.}$$

Tehát a $6.$ óra végére kb. háromszorosára nő a tenyészet létszáma.`,
    },

    {
      title: 'b) 1. lépés — A feladat egyenlete',
      points: 1,
      body: `Azt keressük, hogy a legkisebb hány egész $n$ óra teljesíti:

$$5\\,000 \\cdot 1{,}2^n > 30\\,000.$$

$5\\,000$-rel osztva:

$$1{,}2^n > 6.$$`,
    },
    {
      title: 'b) 2. lépés — Logaritmus alkalmazása',
      points: 2,
      body: `Mindkét oldal (tízes alapú) logaritmusát véve (mindkét oldal pozitív, és $\\lg$ monoton nő):

$$n \\cdot \\lg 1{,}2 > \\lg 6.$$

Számolás $\\lg$-értékekkel (fgv. tábla 24. old.):

- $\\lg 1{,}2 \\approx 0{,}07918$
- $\\lg 6 = \\lg 2 + \\lg 3 \\approx 0{,}30103 + 0{,}47712 = 0{,}77815$

Osztás ($\\lg 1{,}2 > 0$, tehát az egyenlőtlenség iránya megmarad):

$$n > \\dfrac{0{,}77815}{0{,}07918} \\approx 9{,}827.$$`,
    },
    {
      title: 'b) 3. lépés — Egész érték és ellenőrzés',
      points: 1,
      body: `A legkisebb egész $n$, amelyre $n > 9{,}827$: $n = 10$.

**Ellenőrzés:**

- $n = 9$: $a_9 = 5\\,000 \\cdot 1{,}2^9 \\approx 5\\,000 \\cdot 5{,}1598 \\approx 25\\,799 < 30\\,000$ — még nem elég.
- $n = 10$: $a_{10} = 5\\,000 \\cdot 1{,}2^{10} \\approx 5\\,000 \\cdot 6{,}1917 \\approx 30\\,959 > 30\\,000$ ✓

Tehát a $\\boxed{10.}$ óra végén lépi át először a baktériumok száma a $30\\,000$-et.`,
    },
  ],
  finalAnswer: {
    count6: '$a_6 \\approx 14\\,930$',
    time: '$n = 10$ óra',
  },
  usedFormulas: [
    'mértani sorozat $n$-edik tagja: $a_n = a_1 \\cdot q^{n-1}$',
    'logaritmus alkalmazása: $\\lg(q^n) = n \\lg q$',
    '$p\\%$-os növekedés: $\\cdot (1 + p/100)$',
  ],
};

export default { meta, problem, solution };
