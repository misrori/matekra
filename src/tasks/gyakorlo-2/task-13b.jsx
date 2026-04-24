export const meta = {
  id: 'gyakorlo-2-13b',
  year: 2024,
  session: 'gyakorló · 2. teszt',
  level: 'közép',
  part: 'II.A',
  number: 13,
  subpart: 'b',
  title: 'Szöveges feladat — életkor jellemzői',
  points: 6,
  topics: ['egyenletek'],
  difficulty: 3,
  fgvt: [{ page: 27, note: 'egyenletek' }],
  estimatedMinutes: 12,
};

export const problem = {
  statement: `Egy apa és a fia életkorának összege jelenleg $52$ év. Hat évvel ezelőtt az apa **négyszer** annyi éves volt, mint a fia.

Hány éves most az apa és a fia?`,
  asked: [
    { key: 'apa', label: 'Apa életkora most (év) = ?' },
    { key: 'fiu', label: 'Fia életkora most (év) = ?' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Ismeretlenek és feltételek felírása',
      points: 1,
      body: `Jelöljük a jelenlegi életkorokat:

- $a$ = az apa jelenlegi életkora (év),
- $f$ = a fiú jelenlegi életkora (év).

**Első feltétel (jelenlegi összeg):**

$$a + f = 52. \\qquad (1)$$

**Második feltétel (6 évvel ezelőtt):** hat évvel ezelőtt az apa $a - 6$, a fia $f - 6$ éves volt, és az apa négyszer annyi volt:

$$a - 6 = 4 (f - 6). \\qquad (2)$$`,
    },
    {
      title: '2. lépés — Egyenletek átrendezése',
      points: 1,
      body: `A $(2)$-es egyenlet jobb oldalát felbontva:

$$a - 6 = 4f - 24.$$

Rendezve $a$-ra:

$$a = 4f - 18. \\qquad (2')$$`,
    },
    {
      title: '3. lépés — Behelyettesítés',
      points: 2,
      body: `A $(2')$ kifejezést beírjuk $(1)$-be:

$$\\underbrace{(4f - 18)}_{a} + f = 52$$
$$5f - 18 = 52$$
$$5f = 70$$
$$f = 14.$$

Vissza $(2')$-be: $a = 4 \\cdot 14 - 18 = 56 - 18 = 38$.`,
    },
    {
      title: '4. lépés — Értelmezés és ellenőrzés',
      points: 2,
      body: `**Értelmezés:** az apa jelenleg $38$, a fia $14$ éves.

**Ellenőrzés:**
- Összeg: $38 + 14 = 52 \\ \\checkmark$
- Hat évvel ezelőtt: apa $38 - 6 = 32$ éves, fia $14 - 6 = 8$ éves. Arány: $32 : 8 = 4$ — valóban négyszer annyi. ✓

**Realitás-ellenőrzés:** $a = 38, f = 14$ reálisak (apa idősebb, fia pozitív életkorú), tehát a megoldás értelmes.

$$\\boxed{\\text{Apa: } 38 \\text{ év, fia: } 14 \\text{ év.}}$$`,
    },
  ],
  finalAnswer: {
    apa: '$38$ év',
    fiu: '$14$ év',
  },
  usedFormulas: [
    'kétismeretlenes lineáris egyenletrendszer',
    'behelyettesítő módszer',
    'szöveges feladat lefordítása egyenletbe',
  ],
};

export default { meta, problem, solution };
