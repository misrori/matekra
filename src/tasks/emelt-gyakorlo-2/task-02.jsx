import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-02',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'I',
  number: 2,
  title: 'Paraméteres másodfokú egyenlet — valós gyökök száma',
  points: 13,
  topics: ['egyenletek', 'függvények'],
  difficulty: 4,
  fgvt: [
    { page: 27, note: 'másodfokú megoldóképlet' },
    { page: 41, note: 'másodfokú függvény' },
  ],
  estimatedMinutes: 16,
};

// Egyenlet:  (p - 1) x^2 - 2 p x + (p + 2) = 0
// a) p = 1 esetén elsőfokú: -2x + 3 = 0  =>  x = 3/2.
// b) p != 1 esetén D = (2p)^2 - 4(p-1)(p+2) = 4p^2 - 4(p^2 + p - 2) = 4p^2 - 4p^2 - 4p + 8 = -4p + 8 = 4(2 - p).
//    - D > 0  <=>  p < 2  (és p != 1): két valós gyök.
//    - D = 0  <=>  p = 2: egy (kettős) valós gyök.
//    - D < 0  <=>  p > 2: nincs valós gyök.
// c) A gyökök szorzata Viète: x1*x2 = (p+2)/(p-1).
//    Kérdés: mely p-re lesz x1*x2 = 3?  (p+2)/(p-1) = 3 => p+2 = 3p - 3 => 5 = 2p => p = 5/2.
//    DE: p = 5/2 > 2, tehát D = 4(2 - 5/2) = -2 < 0 → nincs valós gyök.
//    Így az eredmény: nincs olyan p, amelyre két valós gyök szorzata 3.

function DiscriminantPlot() {
  // D(p) = 4(2 - p), p ∈ [-1, 4]
  const sx = (p) => 60 + ((p + 1) / 5) * 400;
  const sy = (d) => 160 - (d / 16) * 140;
  const pts = [];
  for (let p = -1; p <= 4.01; p += 0.05) {
    pts.push(`${sx(p).toFixed(2)},${sy(4 * (2 - p)).toFixed(2)}`);
  }
  return (
    <SvgCanvas width={520} height={260} viewBox="0 0 520 260">
      <Axes x={60} y={20} w={400} h={180} xMin={-1} xMax={4} yMin={-8} yMax={16} xStep={1} yStep={4} xLabel="p" yLabel="D" />
      {/* D(p) vonal */}
      <polyline points={pts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2.4" />
      {/* D = 0 pont p = 2 */}
      <circle cx={sx(2)} cy={sy(0)} r="5" fill="#dc2626" />
      <text x={sx(2) + 8} y={sy(0) - 6} fontSize="13" fill="#dc2626">p = 2 (D = 0)</text>
      {/* színezett tartományok */}
      <line x1={sx(-1)} y1={220} x2={sx(2)} y2={220} stroke="#16a34a" strokeWidth="5" />
      <line x1={sx(2)} y1={220} x2={sx(4)} y2={220} stroke="#dc2626" strokeWidth="5" />
      <text x={sx(0.5)} y={242} fontSize="12" textAnchor="middle" fill="#15803d">D &gt; 0: két valós gyök</text>
      <text x={sx(3)} y={242} fontSize="12" textAnchor="middle" fill="#b91c1c">D &lt; 0: nincs valós gyök</text>
      {/* p = 1 jelölés (elfajuló) */}
      <line x1={sx(1)} y1={20} x2={sx(1)} y2={200} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={sx(1) + 4} y={40} fontSize="11" fill="#7c3aed">p = 1 (lineáris)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Tekintsük az

$$(p - 1) x^2 - 2 p x + (p + 2) = 0$$

paraméteres egyenletet ($p \\in \\mathbb{R}$).

**a)** Oldja meg az egyenletet $p = 1$ esetén. ($2$ pont)

**b)** Határozza meg, a $p$ paraméter mely értékei mellett van az egyenletnek **két különböző valós** gyöke, **egy** (kettős) valós gyöke, illetve **nincs** valós gyöke. ($7$ pont)

**c)** Van-e olyan $p \\neq 1$ érték, amelyre az egyenletnek két valós gyöke van és a gyökök **szorzata 3**? Válaszát indokolja! ($4$ pont)`,
  figure: () => <DiscriminantPlot />,
  asked: [
    { key: 'p1', label: 'a) $p = 1$: $x = ?$' },
    { key: 'discriminant', label: 'b) gyökszám a $p$ függvényében' },
    { key: 'product', label: 'c) $p$ mellett $x_1 \\cdot x_2 = 3$?' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — $p = 1$ eset',
      points: 2,
      body: `Ha $p = 1$, akkor az $x^2$ együtthatója $(p-1) = 0$, tehát az egyenlet **elfajul** elsőfokúvá:

$$0 \\cdot x^2 - 2 \\cdot x + 3 = 0 \\Longleftrightarrow -2x + 3 = 0.$$

Ebből
$$x = \\dfrac{3}{2}.$$

Tehát $p = 1$ esetén **egyetlen** valós gyök van: $x = \\tfrac{3}{2}$.`,
    },
    {
      title: 'b/1. lépés — A diszkrimináns',
      points: 2,
      body: `Ha $p \\neq 1$, az egyenlet valódi másodfokú. A diszkrimináns:

$$D = b^2 - 4ac = (-2p)^2 - 4(p-1)(p+2)$$
$$= 4p^2 - 4(p^2 + 2p - p - 2) = 4p^2 - 4(p^2 + p - 2)$$
$$= 4p^2 - 4p^2 - 4p + 8 = -4p + 8 = 4(2 - p).$$

Az $D$ tehát **lineáris** függvénye $p$-nek; előjele csak attól függ, hogy $p$ kisebb vagy nagyobb-e $2$-nél.`,
    },
    {
      title: 'b/2. lépés — Két különböző valós gyök: $D > 0$',
      points: 2,
      body: `$$D > 0 \\iff 4(2-p) > 0 \\iff p < 2.$$

Mivel $p \\neq 1$ a valódi másodfokúság feltétele, így **két különböző valós gyök** akkor van, ha

$$p \\in (-\\infty;\\ 2) \\setminus \\{1\\}.$$`,
    },
    {
      title: 'b/3. lépés — Kettős (egy) valós gyök: $D = 0$',
      points: 1,
      body: `$$D = 0 \\iff p = 2.$$

Ellenőrzés: ekkor az egyenlet $(2-1)x^2 - 2\\cdot 2 \\cdot x + (2+2) = 0$, vagyis
$$x^2 - 4x + 4 = 0 \\iff (x-2)^2 = 0.$$

Tehát **egy kettős gyök**: $x_{1,2} = 2$.`,
    },
    {
      title: 'b/4. lépés — Nincs valós gyök: $D < 0$',
      points: 1,
      body: `$$D < 0 \\iff p > 2.$$

Ekkor az egyenletnek **nincs valós gyöke**.`,
    },
    {
      title: 'b/5. lépés — A $p = 1$ eset külön',
      points: 1,
      body: `A $p = 1$ érték nem másodfokú egyenletet ad, hanem elsőfokút egyetlen gyökkel ($x = 3/2$). Ez nem „kettős gyök", csak egy valós gyök — az ábrán külön jelezzük.

**Összefoglaló táblázat:**

| $p$ tartománya | gyökök száma |
|---|---|
| $p < 1$ | 2 különböző valós gyök |
| $p = 1$ | 1 valós gyök (elsőfokú) |
| $1 < p < 2$ | 2 különböző valós gyök |
| $p = 2$ | 1 kettős valós gyök |
| $p > 2$ | nincs valós gyök |`,
      figure: () => <DiscriminantPlot />,
    },
    {
      title: 'c/1. lépés — Viète-formula a szorzatra',
      points: 2,
      body: `A Viète-formulák szerint (ha $p \\neq 1$) a gyökök **szorzata**:

$$x_1 \\cdot x_2 = \\dfrac{c}{a} = \\dfrac{p+2}{p-1}.$$

Az $x_1 x_2 = 3$ feltétel:

$$\\dfrac{p+2}{p-1} = 3 \\iff p + 2 = 3(p - 1) = 3p - 3 \\iff 5 = 2p \\iff p = \\dfrac{5}{2}.$$`,
    },
    {
      title: 'c/2. lépés — A kapott $p$ ellenőrzése',
      points: 2,
      body: `Kiszámoljuk a $D(5/2)$ értéket, hogy van-e egyáltalán **valós** gyök a talált $p$-re:

$$D\\!\\left(\\tfrac{5}{2}\\right) = 4\\left(2 - \\tfrac{5}{2}\\right) = 4 \\cdot \\left(-\\tfrac{1}{2}\\right) = -2 < 0.$$

Tehát $p = 5/2$ esetén **nincs valós gyök**, vagyis az $x_1 x_2 = 3$ összefüggés csak formálisan (komplex gyökökre) teljesülne.

**Válasz:** nincs olyan $p \\neq 1$ valós szám, amelyre az egyenletnek **két valós gyöke** van és a szorzatuk $3$. A kérdésre tehát **nem** a válasz.`,
    },
  ],
  finalAnswer: {
    p1: '$p = 1$ esetén $x = \\dfrac{3}{2}$ (egyetlen gyök)',
    discriminant: '$D = 4(2-p)$. Két különböző valós gyök: $p < 2$, $p \\neq 1$. Egy kettős gyök: $p = 2$. Nincs valós gyök: $p > 2$. ($p = 1$: elsőfokú, egy gyök.)',
    product: 'Nincs ilyen $p$. A $x_1 x_2 = 3$ feltétel $p = 5/2$-t adna, de ott $D < 0$, így nincs valós gyök.',
  },
  usedFormulas: [
    'másodfokú egyenlet diszkriminánsa',
    'Viète-formulák (gyökök szorzata)',
    'esetvizsgálat paraméter szerint',
    'elfajuló másodfokú (lineáris) egyenlet',
  ],
};

export default { meta, problem, solution };
