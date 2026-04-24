export const meta = {
  id: 'gyakorlo-1-04',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 4,
  title: 'Átlag és medián egy tanuló jegyeiből',
  points: 2,
  topics: ['statisztika'],
  difficulty: 1,
  fgvt: [{ page: 100, note: 'átlag, medián' }],
  estimatedMinutes: 3,
};

const GRADES = [3, 5, 4, 2, 5, 4, 3, 5, 4];

export const problem = {
  statement: `Egy gimnáziumi tanuló félév végi matematika jegyei a következők voltak (a dolgozatok időrendi sorrendjében):

$$3,\\ 5,\\ 4,\\ 2,\\ 5,\\ 4,\\ 3,\\ 5,\\ 4.$$

**a)** Mennyi a jegyek **átlaga**?

**b)** Mennyi a jegyek **mediánja**?`,
  asked: [
    { key: 'mean', label: '$\\bar{x} = ?$' },
    { key: 'median', label: '$\\text{medián} = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az átlag ($\\bar{x}$) kiszámítása',
      points: 1,
      body: `A **számtani átlag** képlete (fgv. tábla 100. old.):

$$\\bar{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}.$$

Az adatok száma $n = 9$. Az összeg:

$$3 + 5 + 4 + 2 + 5 + 4 + 3 + 5 + 4 = 35.$$

Így:

$$\\bar{x} = \\dfrac{35}{9} \\approx 3{,}89.$$`,
    },
    {
      title: '2. lépés — A medián meghatározása',
      points: 1,
      body: `A medián kiszámításához először **nagyság szerint rendezni** kell az adatokat:

$$2,\\ 3,\\ 3,\\ 4,\\ \\boxed{4},\\ 4,\\ 5,\\ 5,\\ 5.$$

Mivel $n = 9$ páratlan, a medián a középső, azaz az $(n+1)/2 = 5.$ elem.

Leszámolva: $1.\\ 2,\\ 2.\\ 3,\\ 3.\\ 3,\\ 4.\\ 4,\\ \\mathbf{5.\\ 4},\\ 6.\\ 4,\\ \\dots$

Tehát a medián $\\mathbf{4}$.`,
    },
  ],
  finalAnswer: {
    mean: '$\\bar{x} = \\dfrac{35}{9} \\approx 3{,}89$',
    median: '$\\text{medián} = 4$',
  },
  usedFormulas: [
    'átlag: $\\bar{x} = \\frac{\\sum x_i}{n}$',
    'medián: rendezett sor középső eleme (páratlan $n$)',
  ],
};

export default { meta, problem, solution };
