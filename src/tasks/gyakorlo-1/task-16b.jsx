export const meta = {
  id: 'gyakorlo-1-16b',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'II.B',
  number: 16,
  sub: '.b',
  title: 'Számtani sorozat — Balaton-parti kiadások',
  points: 8,
  topics: ['számtani sorozat'],
  difficulty: 3,
  fgvt: [{ page: 34, note: 'számtani sorozat' }],
  estimatedMinutes: 12,
};

/*
  Anna az első nap 2 400 Ft-ot költ a Balatonon, minden nap 350 Ft-tal többet, mint előző nap.
  a_n = 2400 + (n-1)·350, d = 350
  a) a_10 = 2400 + 9·350 = 2400 + 3150 = 5 550 Ft
  b) S_14 = 14·(2·2400 + 13·350)/2 = 7·(4800 + 4550) = 7·9350 = 65 450 Ft
  c) Melyik első nap haladja meg a 8 000 Ft-ot?
      2400 + (n-1)·350 > 8000
      (n-1)·350 > 5600
      n-1 > 16
      n > 17  →  n = 18
*/

export const problem = {
  statement: `Anna két hetes balatoni nyaraláson van. Az első napon $2\\,400$ Ft-ot költ, és minden további napon **pontosan $350$ Ft-tal többet**, mint az előző napon (számtani sorozat szerinti kiadás).

**a)** Mennyit költött a nyaralás $10.$ napján? ($2$ pont)

**b)** Összesen mennyit költött a teljes $14$ napos nyaralás alatt? ($3$ pont)

**c)** A nyaralás hányadik napján haladja meg a napi kiadása **először** a $8\\,000$ Ft-ot? ($3$ pont)`,
  asked: [
    { key: 'a10', label: 'a) $a_{10} = ?$ Ft' },
    { key: 'S14', label: 'b) $S_{14} = ?$ Ft' },
    { key: 'firstN', label: 'c) $n = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) 1. lépés — A számtani sorozat felírása',
      points: 1,
      body: `Az első tag $a_1 = 2\\,400$ Ft, a differencia (napi növekedés) $d = 350$ Ft. Ez egy **számtani sorozat** (fgv. tábla 34. old.):

$$a_n = a_1 + (n - 1) \\cdot d.$$`,
    },
    {
      title: 'a) 2. lépés — A $10.$ napi kiadás',
      points: 1,
      body: `$$a_{10} = 2\\,400 + (10 - 1) \\cdot 350 = 2\\,400 + 9 \\cdot 350 = 2\\,400 + 3\\,150 = 5\\,550 \\ \\text{Ft}.$$

Tehát a $10.$ napon $\\boxed{5\\,550}$ Ft-ot költött.`,
    },

    {
      title: 'b) 1. lépés — A $14.$ napi kiadás',
      points: 1,
      body: `Az $S_n$-összegképlethez kell $a_{14}$:

$$a_{14} = 2\\,400 + 13 \\cdot 350 = 2\\,400 + 4\\,550 = 6\\,950 \\ \\text{Ft}.$$`,
    },
    {
      title: 'b) 2. lépés — Az összegképlet alkalmazása',
      points: 2,
      body: `Számtani sorozat első $n$ tagjának összege:

$$S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2}.$$

Behelyettesítve $n = 14$-gyel:

$$S_{14} = \\dfrac{(2\\,400 + 6\\,950) \\cdot 14}{2} = \\dfrac{9\\,350 \\cdot 14}{2} = 9\\,350 \\cdot 7 = 65\\,450 \\ \\text{Ft}.$$

Tehát a $14$ nap alatt $\\boxed{65\\,450}$ Ft-ot költött.

**Plauzibilitás:** az átlagos napi kiadás $65\\,450 / 14 \\approx 4\\,675$ Ft, ami pont $(2\\,400 + 6\\,950)/2$ — a középérték. ✓`,
    },

    {
      title: 'c) 1. lépés — Egyenlőtlenség felírása',
      points: 1,
      body: `Azt a legkisebb $n$-et keressük, amelyre $a_n > 8\\,000$:

$$2\\,400 + (n - 1) \\cdot 350 > 8\\,000.$$`,
    },
    {
      title: 'c) 2. lépés — Átrendezés',
      points: 1,
      body: `Vonjuk ki $2\\,400$-at mindkét oldalból:

$$(n - 1) \\cdot 350 > 5\\,600.$$

Osszuk el $350$-nel (pozitív, nem fordul az egyenlőtlenség):

$$n - 1 > \\dfrac{5\\,600}{350} = 16.$$

$$n > 17.$$`,
    },
    {
      title: 'c) 3. lépés — A legkisebb egész érték',
      points: 1,
      body: `A legkisebb egész $n$, amelyre $n > 17$: $n = 18$. De mivel a nyaralás csak $14$ napos, **érdemes megvizsgálni** ezt a plauzibilitás szempontjából is.

**Ellenőrzés:**

- $n = 17$: $a_{17} = 2\\,400 + 16 \\cdot 350 = 2\\,400 + 5\\,600 = 8\\,000$ Ft — **pontosan $8\\,000$**, nem haladja meg!
- $n = 18$: $a_{18} = 2\\,400 + 17 \\cdot 350 = 2\\,400 + 5\\,950 = 8\\,350 > 8\\,000$ ✓

Tehát matematikai értelemben a $\\boxed{18.}$ napon lépné át a napi kiadása a $8\\,000$ Ft-ot.

**Megjegyzés:** mivel Anna csak $14$ napot nyaral, ez a küszöb a nyaralás során nem kerül átlépésre — a válasz tehát feltételes.`,
    },
  ],
  finalAnswer: {
    a10: '$a_{10} = 5\\,550$ Ft',
    S14: '$S_{14} = 65\\,450$ Ft',
    firstN: '$n = 18$ (a 14 napos nyaralás során nem érhető el)',
  },
  usedFormulas: [
    'számtani sorozat $n$-edik tagja: $a_n = a_1 + (n-1)d$',
    'összegképlet: $S_n = \\dfrac{(a_1 + a_n) n}{2}$',
    'lineáris egyenlőtlenség rendezése',
  ],
};

export default { meta, problem, solution };
