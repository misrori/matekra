export const meta = {
  id: 'gyakorlo-1-12',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 12,
  title: 'Valószínűség — osztályos bizottság',
  points: 3,
  topics: ['valószínűség'],
  difficulty: 3,
  fgvt: [
    { page: 92, note: 'klasszikus P' },
    { page: 93, note: 'kombinatorika' },
  ],
  estimatedMinutes: 5,
};

export const problem = {
  statement: `Egy osztályba $12$ lány és $18$ fiú jár. A tanár **véletlenszerűen** $3$ tanulót választ ki egy diákönkormányzati bizottságba (a sorrend nem számít).

Mennyi a valószínűsége, hogy a kiválasztott $3$ tanuló közül **mind a három fiú**?

Az eredményt adja meg négy tizedesjegyre kerekítve (is)!`,
  asked: [{ key: 'P', label: '$P(\\text{3 fiú}) = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az összes eset száma',
      points: 1,
      body: `Az osztály létszáma $12 + 18 = 30$ tanuló. A bizottság $3$ fős, és a kiválasztás sorrendje nem számít — ez egy **kombináció** (fgv. tábla 93. old.):

$$\\binom{30}{3} = \\dfrac{30 \\cdot 29 \\cdot 28}{3 \\cdot 2 \\cdot 1} = \\dfrac{24\\,360}{6} = 4\\,060.$$

Tehát $4\\,060$ féleképpen lehet $3$ tanulót választani a $30$-ból.`,
    },
    {
      title: '2. lépés — A kedvező esetek száma (3 fiú)',
      points: 1,
      body: `Kedvező eset: mind a $3$ fiú. A $18$ fiúból $3$-at kell kiválasztani, szintén kombináció:

$$\\binom{18}{3} = \\dfrac{18 \\cdot 17 \\cdot 16}{3 \\cdot 2 \\cdot 1} = \\dfrac{4\\,896}{6} = 816.$$`,
    },
    {
      title: '3. lépés — Klasszikus valószínűség',
      points: 1,
      body: `Mivel minden $3$-elemű kiválasztás egyforma valószínű, használhatjuk a **klasszikus valószínűséget** (fgv. tábla 92. old.):

$$P(\\text{3 fiú}) = \\dfrac{\\text{kedvező}}{\\text{összes}} = \\dfrac{816}{4\\,060} = \\dfrac{204}{1\\,015}.$$

Közelítő érték:

$$P(\\text{3 fiú}) \\approx 0{,}2010 \\approx 20{,}10\\%.$$

**Józansági ellenőrzés:** a fiúk aránya $18/30 = 0{,}6$. Ha visszatevéssel húznánk, a valószínűség $0{,}6^3 = 0{,}216$ lenne. A visszatevés nélküli eset ennél kissé kisebb ($0{,}2010$), mert a második-harmadik húzásnál csökken a fennmaradó fiúk aránya. ✓`,
    },
  ],
  finalAnswer: {
    P: '$P(\\text{3 fiú}) = \\dfrac{816}{4\\,060} = \\dfrac{204}{1\\,015} \\approx 0{,}2010$',
  },
  usedFormulas: [
    'kombináció: $\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$',
    'klasszikus valószínűség: $P = \\dfrac{\\text{kedvező}}{\\text{összes}}$',
  ],
};

export default { meta, problem, solution };
