export const meta = {
  id: '2025-05-kozep-13a',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'II.A',
  number: 13,
  sub: '.a',
  title: 'Lineáris egyenlet — törtes kifejezés',
  points: 5,
  topics: ['egyenletek'],
  difficulty: 2,
  fgvt: [],
  estimatedMinutes: 7,
};

export const problem = {
  statement: `Oldja meg az alábbi egyenletet a valós számok halmazán!

$$\\frac{x + 8}{20} + \\frac{x - 5}{25} = 2$$`,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Közös nevező meghatározása',
      points: 1,
      body: `A két tört nevezője $20$ és $25$. A legkisebb közös többszörös

$$\\mathrm{LKKT}(20, 25) = 100.$$

(Prímtényezős felbontásban $20 = 2^2 \\cdot 5$, $25 = 5^2$, így $\\mathrm{LKKT} = 2^2 \\cdot 5^2 = 100$.)

Szorozzuk meg az egyenlet **mindkét oldalát** $100$-zal (ez ekvivalens átalakítás, mert $100 \\neq 0$):

$$100 \\cdot \\left( \\frac{x+8}{20} + \\frac{x-5}{25} \\right) = 100 \\cdot 2.$$`,
    },
    {
      title: '2. lépés — A tagok felbontása a közös nevezővel',
      points: 1,
      body: `Az egyes törteknél a közös nevezőhöz tartozó szorzó:

- $\\dfrac{100}{20} = 5$, tehát $\\dfrac{x+8}{20}$-t $5$-tel szorozzuk: $5(x+8)$.
- $\\dfrac{100}{25} = 4$, tehát $\\dfrac{x-5}{25}$-t $4$-gyel szorozzuk: $4(x-5)$.
- A jobb oldalon: $100 \\cdot 2 = 200$.

Így az egyenlet **tört nélküli** alakja:

$$5(x + 8) + 4(x - 5) = 200.$$`,
    },
    {
      title: '3. lépés — A zárójelek felbontása',
      points: 1,
      body: `A disztributivitás alapján

$$5(x+8) = 5x + 40, \\qquad 4(x-5) = 4x - 20.$$

Behelyettesítve:

$$5x + 40 + 4x - 20 = 200.$$`,
    },
    {
      title: '4. lépés — Összevonás',
      points: 1,
      body: `Az azonos típusú tagokat összevonjuk a bal oldalon:

$$(5x + 4x) + (40 - 20) = 200,$$

$$9x + 20 = 200.$$

Vonjunk ki $20$-at mindkét oldalból:

$$9x = 180.$$`,
    },
    {
      title: '5. lépés — Az egyenlet megoldása és ellenőrzés',
      points: 1,
      body: `Osszuk el mindkét oldalt $9$-cel:

$$x = \\frac{180}{9} = 20.$$

**Ellenőrzés** (behelyettesítés az eredeti egyenletbe):

$$\\frac{20 + 8}{20} + \\frac{20 - 5}{25} = \\frac{28}{20} + \\frac{15}{25} = \\frac{7}{5} + \\frac{3}{5} = \\frac{10}{5} = 2. \\checkmark$$

Mivel csak ekvivalens átalakításokat végeztünk, és az ellenőrzés is helyes, az egyenlet egyetlen valós megoldása $x = 20$.`,
    },
  ],
  finalAnswer: { x: '$x = 20$' },
  usedFormulas: [
    'lineáris egyenlet ekvivalens átalakításai',
    'közös nevezőre hozás (LKKT)',
    'disztributivitás: $a(b+c) = ab + ac$',
  ],
};

export default { meta, problem, solution };
