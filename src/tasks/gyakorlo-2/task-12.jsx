export const meta = {
  id: 'gyakorlo-2-12',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'I',
  number: 12,
  title: 'Logaritmus — egyenlet megoldása',
  points: 3,
  topics: ['logaritmus', 'egyenletek'],
  difficulty: 2,
  fgvt: [{ page: 24, note: 'logaritmus azonosságai' }],
  estimatedMinutes: 4,
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletet!

$$\\lg(x - 2) + \\lg(x + 5) = \\lg 18.$$`,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Értelmezési tartomány',
      points: 0,
      body: `A logaritmus csak **pozitív** argumentumra értelmezett. Két feltétel:

- $x - 2 > 0 \\Rightarrow x > 2$,
- $x + 5 > 0 \\Rightarrow x > -5$.

A két feltétel metszete: $x > 2$. **Ezen** a tartományon keressük a megoldásokat — a végén ellenőrizni kell, hogy a megoldás ebbe esik-e.`,
    },
    {
      title: '2. lépés — Logaritmus azonosság alkalmazása',
      points: 1,
      body: `A **szorzat logaritmusának azonossága** szerint (fgv. tábla 24. old.):

$$\\lg a + \\lg b = \\lg (a \\cdot b).$$

Így az egyenlet bal oldalát összevonjuk:

$$\\lg\\bigl((x - 2)(x + 5)\\bigr) = \\lg 18.$$

Mivel a $\\lg$ függvény **szigorúan monoton** növekvő (tehát kölcsönösen egyértelmű), a két oldal argumentuma is egyenlő:

$$(x - 2)(x + 5) = 18.$$`,
    },
    {
      title: '3. lépés — A másodfokú egyenlet megoldása',
      points: 1,
      body: `Bontsuk fel a szorzatot:

$$x^2 + 5x - 2x - 10 = 18$$
$$x^2 + 3x - 10 = 18$$
$$x^2 + 3x - 28 = 0.$$

Megoldóképlettel ($a = 1,\\ b = 3,\\ c = -28$):

$$D = 3^2 - 4 \\cdot 1 \\cdot (-28) = 9 + 112 = 121, \\quad \\sqrt{D} = 11.$$

$$x_{1,2} = \\dfrac{-3 \\pm 11}{2}.$$

Ezek: $x_1 = \\dfrac{8}{2} = 4$, és $x_2 = \\dfrac{-14}{2} = -7$.`,
    },
    {
      title: '4. lépés — Az értelmezési tartomány ellenőrzése',
      points: 1,
      body: `Csak az $x > 2$ feltételnek megfelelő gyök maradhat.

- $x_1 = 4 > 2$ — **elfogadjuk**.
- $x_2 = -7$ nem felel meg az $x > 2$ feltételnek — **kizárjuk**.

**Behelyettesítéses ellenőrzés** $x = 4$ mellett:

$$\\lg(4 - 2) + \\lg(4 + 5) = \\lg 2 + \\lg 9 = \\lg(2 \\cdot 9) = \\lg 18. \\ \\checkmark$$

Tehát a **megoldás:** $\\boxed{x = 4}$.`,
    },
  ],
  finalAnswer: { x: '$x = 4$' },
  usedFormulas: [
    '$\\lg a + \\lg b = \\lg(ab)$',
    '$\\lg$ szigorú monotonitása',
    'másodfokú egyenlet megoldóképlete',
  ],
};

export default { meta, problem, solution };
