export const meta = {
  id: 'gyakorlo-1-03',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 3,
  title: 'Hatvány-egyenlet megoldása',
  points: 2,
  topics: ['hatvány'],
  difficulty: 2,
  fgvt: [{ page: 22, note: 'hatvány azonosságai' }],
  estimatedMinutes: 3,
};

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenletet:

$$3^{x+2} = 81 \\cdot 3^{2x-1}.$$`,
  asked: [{ key: 'x', label: '$x = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Mindkét oldalt ugyanarra az alapra írjuk',
      points: 1,
      body: `Észrevesszük, hogy $81 = 3^4$, hiszen $3^4 = 3 \\cdot 3 \\cdot 3 \\cdot 3 = 81$.

A jobb oldal így átírható:

$$81 \\cdot 3^{2x-1} = 3^4 \\cdot 3^{2x-1}.$$

Alkalmazzuk a $a^n \\cdot a^m = a^{n+m}$ hatványazonosságot (fgv. tábla 22. old.):

$$3^4 \\cdot 3^{2x-1} = 3^{4 + (2x-1)} = 3^{2x+3}.$$

Az egyenlet most:

$$3^{x+2} = 3^{2x+3}.$$`,
    },
    {
      title: '2. lépés — Az exponensek összehasonlítása',
      points: 0.5,
      body: `Ha két hatvány egyenlő és az alapjuk is egyenlő ($3 > 0$ és $\\neq 1$), akkor a kitevőknek is meg kell egyezniük — mivel a $3^t$ függvény szigorúan monoton.

$$x + 2 = 2x + 3.$$`,
    },
    {
      title: '3. lépés — A lineáris egyenlet megoldása',
      points: 0.5,
      body: `Rendezzük $x$-re:

$$x + 2 = 2x + 3 \\ \\Longrightarrow \\ 2 - 3 = 2x - x \\ \\Longrightarrow \\ -1 = x.$$

Tehát $x = -1$.

**Ellenőrzés:** bal oldal = $3^{-1+2} = 3^1 = 3$. Jobb oldal = $81 \\cdot 3^{-2-1} = 81 \\cdot 3^{-3} = \\frac{81}{27} = 3$. ✓`,
    },
  ],
  finalAnswer: {
    x: '$x = -1$',
  },
  usedFormulas: [
    '$a^n \\cdot a^m = a^{n+m}$',
    '$a^x = a^y \\Leftrightarrow x = y$ (ha $a > 0, a \\neq 1$)',
  ],
};

export default { meta, problem, solution };
