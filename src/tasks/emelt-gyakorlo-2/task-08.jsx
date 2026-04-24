import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-08',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'II',
  number: 8,
  title: 'Függvényvizsgálat + integrál-közelítés (választható)',
  points: 16,
  topics: ['függvények', 'egyenletek'],
  difficulty: 5,
  fgvt: [
    { page: 41, note: 'másodfokú függvény' },
    { page: 42, note: 'polinomfüggvények' },
  ],
  estimatedMinutes: 25,
};

// Függvény: f(x) = x^3 - 6x^2 + 9x + 1  ( x ∈ R )
// f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3).
//   zérushelyek: x = 1 (lokális maximum), x = 3 (lokális minimum).
//   f(1) = 1 - 6 + 9 + 1 = 5,  f(3) = 27 - 54 + 27 + 1 = 1.
// f''(x) = 6x - 12. Inflexió: x = 2, f(2) = 8 - 24 + 18 + 1 = 3.
// f(0) = 1,  f(5) = 125 - 150 + 45 + 1 = 21,  f(-1) = -1 - 6 - 9 + 1 = -15.
// Egyetlen valós zéróhely (a köbös monoton + lokális extrema értékei pozitívak, csak egy negatív gyök van).
//   Keressük: f(x) = 0 → x^3 - 6x^2 + 9x + 1 = 0.
//   f(-0.5) = -0.125 - 1.5 - 4.5 + 1 = -5.125 (negatív)
//   f(-0.1) = -0.001 - 0.06 - 0.9 + 1 = 0.039 (pozitív)
//   Tehát gyök x₀ ∈ (-0.5, -0.1). Lineáris interpoláció: x₀ ≈ -0.1 - 0.039 · (0.5-0.1)/(5.125+0.039) → nem fontos, csak hogy egy valós gyök van.
// a) monotonitás és szélsőérték
// b) konvexitás (inflexiós pont)
// c) integrál [1; 3]-on: F(x) = x^4/4 - 2x^3 + 9x^2/2 + x;
//    F(3) = 81/4 - 54 + 81/2 + 3 = 20.25 - 54 + 40.5 + 3 = 9.75.
//    F(1) = 0.25 - 2 + 4.5 + 1 = 3.75.
//    Integral = 9.75 - 3.75 = 6.
// d) Trapéz-közelítés n=4 részre [1; 3]-on, h = 0.5:
//    Pontok: x=1, 1.5, 2, 2.5, 3.
//    f(1) = 5,  f(1.5) = 3.375 - 13.5 + 13.5 + 1 = 4.375,  f(2) = 3,  f(2.5) = 15.625 - 37.5 + 22.5 + 1 = 1.625,  f(3) = 1.
//    Trapéz közelítés: I ≈ h · [(f(1) + f(3))/2 + f(1.5) + f(2) + f(2.5)]
//                        = 0.5 · [(5+1)/2 + 4.375 + 3 + 1.625]
//                        = 0.5 · [3 + 4.375 + 3 + 1.625]
//                        = 0.5 · 12 = 6.
//    Pontosan 6! (mert f(x) - vonal = másodfokú vonatkozásban érdekes, de itt a közelítés pont a pontos érték? Véletlen egybeesés? Ellenőrzés: a trapéz-közelítés akkor pontos, ha f lineáris a részintervallumokon. Itt nem az, csak véletlen.)
//    Ellenőrzés: Simpson n=4 → kb. még pontosabb.

function FunctionFigure({ showDeriv = false, showArea = false }) {
  const f = (x) => x ** 3 - 6 * x ** 2 + 9 * x + 1;
  const fp = (x) => 3 * x ** 2 - 12 * x + 9;

  // x: [-1, 5], y: [-15, 21]
  const sx = (x) => 50 + ((x + 1) / 6) * 420;
  const sy = (y) => 240 - ((y + 15) / 36) * 220;

  const pts = [];
  for (let x = -1; x <= 5.01; x += 0.05) pts.push(`${sx(x).toFixed(2)},${sy(f(x)).toFixed(2)}`);

  // Derivált grafikon
  const dPts = [];
  for (let x = -1; x <= 5.01; x += 0.05) dPts.push(`${sx(x).toFixed(2)},${sy(fp(x)).toFixed(2)}`);

  // Terület [1; 3]
  const areaPts = [`${sx(1)},${sy(0)}`];
  for (let x = 1; x <= 3.01; x += 0.05) areaPts.push(`${sx(x).toFixed(2)},${sy(f(x)).toFixed(2)}`);
  areaPts.push(`${sx(3)},${sy(0)}`);

  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      <Axes x={50} y={20} w={420} h={220} xMin={-1} xMax={5} yMin={-15} yMax={21} xStep={1} yStep={3} />
      {/* Terület kitöltése */}
      {showArea && (
        <polygon points={areaPts.join(' ')} fill="#bfdbfe" fillOpacity="0.55" stroke="none" />
      )}
      {/* Függvény */}
      <polyline points={pts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2.4" />
      {/* Derivált */}
      {showDeriv && (
        <polyline points={dPts.join(' ')} fill="none" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="5 4" />
      )}
      {/* Extrémumok */}
      <circle cx={sx(1)} cy={sy(5)} r="4" fill="#16a34a" />
      <text x={sx(1) - 30} y={sy(5) - 6} fontSize="11" fill="#15803d">max (1; 5)</text>
      <circle cx={sx(3)} cy={sy(1)} r="4" fill="#7c3aed" />
      <text x={sx(3) + 6} y={sy(1) + 14} fontSize="11" fill="#6d28d9">min (3; 1)</text>
      {/* Inflexió */}
      <circle cx={sx(2)} cy={sy(3)} r="3.5" fill="#f59e0b" />
      <text x={sx(2) + 6} y={sy(3) - 6} fontSize="11" fill="#b45309">infl. (2; 3)</text>

      {showArea && (
        <text x={sx(2)} y={sy(3) + 46} fontSize="12" textAnchor="middle" fill="#1e40af" fontWeight="bold">
          ∫₁³ f = 6
        </text>
      )}

      <text x={50} y={14} fontSize="12" fill="#111">f(x) = x³ − 6x² + 9x + 1</text>
      {showDeriv && (
        <text x={360} y={14} fontSize="11" fill="#b91c1c">f′(x) = 3(x−1)(x−3)</text>
      )}
    </SvgCanvas>
  );
}

function TrapezFigure() {
  const f = (x) => x ** 3 - 6 * x ** 2 + 9 * x + 1;
  const sx = (x) => 50 + ((x - 0.5) / 3) * 420;
  const sy = (y) => 240 - (y / 6) * 200;
  const xs = [1, 1.5, 2, 2.5, 3];
  const trapezPts = xs.map((x) => `${sx(x)},${sy(f(x))}`).join(' ');
  // Base segments
  const baseSeg = xs.map((x) => `${sx(x)},${sy(0)}`).join(' ');
  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      <Axes x={50} y={20} w={420} h={220} xMin={0.5} xMax={3.5} yMin={0} yMax={6} xStep={0.5} yStep={1} />
      {/* Trapézok kitöltése */}
      {xs.slice(0, -1).map((x1, i) => {
        const x2 = xs[i + 1];
        const y1 = f(x1), y2 = f(x2);
        return (
          <polygon
            key={i}
            points={`${sx(x1)},${sy(0)} ${sx(x1)},${sy(y1)} ${sx(x2)},${sy(y2)} ${sx(x2)},${sy(0)}`}
            fill="#fed7aa"
            fillOpacity="0.6"
            stroke="#ea580c"
            strokeWidth="1.5"
          />
        );
      })}
      {/* f görbe */}
      {(() => {
        const pts = [];
        for (let x = 0.5; x <= 3.51; x += 0.03) pts.push(`${sx(x).toFixed(2)},${sy(f(x)).toFixed(2)}`);
        return <polyline points={pts.join(' ')} fill="none" stroke="#2563eb" strokeWidth="2.4" />;
      })()}
      {/* Trapéz tetőélek */}
      <polyline points={trapezPts} fill="none" stroke="#c2410c" strokeWidth="2" />
      {xs.map((x, i) => (
        <g key={i}>
          <circle cx={sx(x)} cy={sy(f(x))} r="3.5" fill="#b45309" />
          <text x={sx(x)} y={sy(f(x)) - 8} fontSize="11" fill="#7c2d12" textAnchor="middle">
            f({x}) = {f(x).toFixed(3)}
          </text>
        </g>
      ))}
      <text x={50} y={14} fontSize="12" fill="#111">Trapéz-szabály n = 4, h = 0{','}5 → I ≈ 6 (pontos: 6)</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Tekintsük a $f(x) = x^3 - 6x^2 + 9x + 1$ harmadfokú függvényt ($x \\in \\mathbb{R}$).

**a)** Határozza meg a függvény **lokális szélsőértékeit** (differenciálhányados segítségével) és a megfelelő $x$ értékeket! ($5$ pont)

**b)** Hol van a függvénynek **inflexiós pontja**? Adja meg az inflexiós pont koordinátáit! ($3$ pont)

**c)** Számítsa ki a

$$I = \\int_{1}^{3} f(x)\\, dx$$

határozott integrált **pontosan**! ($4$ pont)

**d)** Közelítse meg $I$-t a **trapéz-szabállyal** $n = 4$ egyenlő részre osztva az $[1;\\ 3]$ intervallumot! Hasonlítsa össze a pontos értékkel! ($4$ pont)`,
  figure: () => <FunctionFigure showDeriv />,
  asked: [
    { key: 'extr', label: 'a) lokális szélsőértékek' },
    { key: 'infl', label: 'b) inflexiós pont' },
    { key: 'I', label: 'c) pontos integrál' },
    { key: 'trapez', label: 'd) trapéz-közelítés' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Első derivált',
      points: 2,
      body: `Differenciáljunk tagonként:
$$f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3).$$

Zérushelyek: $x_1 = 1$ és $x_2 = 3$.`,
    },
    {
      title: 'a/2. lépés — Előjelvizsgálat → monotonitás',
      points: 2,
      body: `$f'(x) = 3(x-1)(x-3)$ parabola, felfelé nyíló. Így:
- $x < 1$: $(x-1)<0, (x-3)<0 \\Rightarrow f'>0$ → **növekvő**,
- $1 < x < 3$: $(x-1)>0, (x-3)<0 \\Rightarrow f'<0$ → **csökkenő**,
- $x > 3$: $(x-1)>0, (x-3)>0 \\Rightarrow f'>0$ → **növekvő**.

Tehát $x = 1$-ben **lokális maximum**, $x = 3$-ban **lokális minimum** van.`,
    },
    {
      title: 'a/3. lépés — Szélsőérték-koordináták',
      points: 1,
      body: `$$f(1) = 1 - 6 + 9 + 1 = 5, \\quad f(3) = 27 - 54 + 27 + 1 = 1.$$

Lokális maximum: $(1;\\ 5)$; lokális minimum: $(3;\\ 1)$.`,
    },
    {
      title: 'b) lépés — Inflexiós pont',
      points: 3,
      body: `Második derivált:
$$f''(x) = 6x - 12.$$

$f''(x) = 0 \\iff x = 2$. Itt $f''$ előjelet vált ($x<2$: $f''<0$ konkáv; $x>2$: $f''>0$ konvex), tehát valóban **inflexiós pont**.

$f(2) = 8 - 24 + 18 + 1 = 3$. Az inflexiós pont: $(2;\\ 3)$.`,
      figure: () => <FunctionFigure showDeriv />,
    },
    {
      title: 'c/1. lépés — Primitív függvény',
      points: 2,
      body: `$$F(x) = \\int (x^3 - 6x^2 + 9x + 1)\\, dx = \\dfrac{x^4}{4} - 2x^3 + \\dfrac{9x^2}{2} + x + C.$$`,
    },
    {
      title: 'c/2. lépés — Newton–Leibniz',
      points: 2,
      body: `$$F(3) = \\dfrac{81}{4} - 54 + \\dfrac{81}{2} + 3 = 20{,}25 - 54 + 40{,}5 + 3 = 9{,}75.$$

$$F(1) = \\dfrac{1}{4} - 2 + \\dfrac{9}{2} + 1 = 0{,}25 - 2 + 4{,}5 + 1 = 3{,}75.$$

$$I = F(3) - F(1) = 9{,}75 - 3{,}75 = \\boxed{6}.$$`,
      figure: () => <FunctionFigure showArea />,
    },
    {
      title: 'd/1. lépés — Trapéz-szabály képlete',
      points: 1,
      body: `$n = 4$ részre, az $[1; 3]$ intervallum. A lépésköz: $h = \\dfrac{3-1}{4} = 0{,}5$. Osztópontok:
$$x_0 = 1,\\ x_1 = 1{,}5,\\ x_2 = 2,\\ x_3 = 2{,}5,\\ x_4 = 3.$$

Trapéz-szabály:
$$T_4 = h \\cdot \\left( \\dfrac{f(x_0) + f(x_4)}{2} + f(x_1) + f(x_2) + f(x_3) \\right).$$`,
    },
    {
      title: 'd/2. lépés — Függvényértékek',
      points: 2,
      body: `Számoljuk ki az öt értéket:

| $x$ | $f(x)$ |
|---|---|
| $1$ | $5$ |
| $1{,}5$ | $3{,}375 - 13{,}5 + 13{,}5 + 1 = 4{,}375$ |
| $2$ | $3$ |
| $2{,}5$ | $15{,}625 - 37{,}5 + 22{,}5 + 1 = 1{,}625$ |
| $3$ | $1$ |

Behelyettesítve:
$$T_4 = 0{,}5 \\cdot \\left( \\dfrac{5 + 1}{2} + 4{,}375 + 3 + 1{,}625 \\right) = 0{,}5 \\cdot (3 + 4{,}375 + 3 + 1{,}625) = 0{,}5 \\cdot 12 = 6.$$`,
      figure: () => <TrapezFigure />,
    },
    {
      title: 'd/3. lépés — Összehasonlítás a pontos értékkel',
      points: 1,
      body: `A trapéz-közelítés és a pontos érték:
$$T_4 = 6 = I.$$

A két érték **véletlenül** pontosan egyezik (trapéz-közelítés harmadfokú függvényen általában nem pontos, de ezen az intervallumon az elkerülhetetlen hibák kompenzálják egymást).

Megjegyzés: a trapéz-közelítés általában $O(h^2)$ rendű hibát vétne; ha $f$ lineáris az osztórészeken, akkor pontos. Itt az $f$ a **szimmetrikus** inflexiós pontban ($x=2$) középre esik — az "alulbecslés" és a "felülbecslés" kiegyenlíti egymást.`,
    },
  ],
  finalAnswer: {
    extr: 'Lokális maximum: $(1;\\ 5)$; lokális minimum: $(3;\\ 1)$.',
    infl: 'Inflexiós pont: $(2;\\ 3)$.',
    I: '$I = 6$.',
    trapez: '$T_4 = 6$, a pontos értékkel egyezik (itt véletlenül).',
  },
  usedFormulas: [
    'polinom deriváltja',
    'lokális szélsőérték: $f\'(x_0) = 0$ + előjelváltás',
    'inflexió: $f\'\'(x_0) = 0$ + előjelváltás',
    'Newton–Leibniz: $\\int_a^b f = F(b) - F(a)$',
    'trapéz-szabály: $T_n = h\\left(\\frac{f_0+f_n}{2} + \\sum_{i=1}^{n-1} f_i\\right)$',
  ],
};

export default { meta, problem, solution };
