export const meta = {
  id: 'gyakorlo-1-02',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 2,
  title: 'LNKO és LKKT — prímtényezős felbontás',
  points: 2,
  topics: ['számelmélet'],
  difficulty: 1,
  fgvt: [{ page: 15, note: 'LNKO, LKKT' }],
  estimatedMinutes: 3,
};

export const problem = {
  statement: `Tekintsük a $72$ és $60$ számokat.

**a)** Adja meg a két szám legnagyobb közös osztóját (LNKO)!

**b)** Adja meg a két szám legkisebb közös többszörösét (LKKT)!`,
  asked: [
    { key: 'lnko', label: '$\\mathrm{LNKO}(72, 60) = ?$' },
    { key: 'lkkt', label: '$\\mathrm{LKKT}(72, 60) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A számok prímtényezős felbontása',
      points: 1,
      body: `Első lépésben mindkét számot prímtényezőkre bontjuk.

**$72$ prímtényezős alakja:**
$72 = 2 \\cdot 36 = 2 \\cdot 2 \\cdot 18 = 2 \\cdot 2 \\cdot 2 \\cdot 9 = 2^3 \\cdot 3^2$

**$60$ prímtényezős alakja:**
$60 = 2 \\cdot 30 = 2 \\cdot 2 \\cdot 15 = 2 \\cdot 2 \\cdot 3 \\cdot 5 = 2^2 \\cdot 3 \\cdot 5$

Táblázatban az egyes prímek kitevői:

| prím | $72$ | $60$ | közös |
|---|---|---|---|
| $2$ | $2^3$ | $2^2$ | $2^2$ |
| $3$ | $3^2$ | $3^1$ | $3^1$ |
| $5$ | — | $5^1$ | — |`,
    },
    {
      title: '2. lépés — LNKO kiszámítása',
      points: 0.5,
      body: `A **legnagyobb közös osztó** a közös prímek **legkisebb** kitevőjén vett szorzat (fgv. tábla 15. old.):

$$\\mathrm{LNKO}(72, 60) = 2^2 \\cdot 3^1 = 4 \\cdot 3 = 12.$$

**Ellenőrzés:** $72 / 12 = 6$ és $60 / 12 = 5$ — mindkettő egész, és $\\mathrm{lnko}(6, 5) = 1$, tehát $12$ tényleg a legnagyobb. ✓`,
    },
    {
      title: '3. lépés — LKKT kiszámítása',
      points: 0.5,
      body: `A **legkisebb közös többszörös** a felbukkanó prímek **legnagyobb** kitevőjén vett szorzat:

$$\\mathrm{LKKT}(72, 60) = 2^3 \\cdot 3^2 \\cdot 5 = 8 \\cdot 9 \\cdot 5 = 360.$$

**Ellenőrzés** az $\\mathrm{LNKO} \\cdot \\mathrm{LKKT} = a \\cdot b$ azonossággal:
$12 \\cdot 360 = 4\\,320 = 72 \\cdot 60$ ✓`,
    },
  ],
  finalAnswer: {
    lnko: '$\\mathrm{LNKO}(72, 60) = 12$',
    lkkt: '$\\mathrm{LKKT}(72, 60) = 360$',
  },
  usedFormulas: [
    'prímtényezős felbontás',
    'LNKO: közös prímek legkisebb kitevőjével',
    'LKKT: felbukkanó prímek legnagyobb kitevőjével',
    '$\\mathrm{LNKO}(a,b) \\cdot \\mathrm{LKKT}(a,b) = a \\cdot b$',
  ],
};

export default { meta, problem, solution };
