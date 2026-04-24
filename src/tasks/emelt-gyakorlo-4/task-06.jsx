import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-4-06',
  year: 2024,
  session: 'emelt gyakorló · 4. teszt',
  level: 'emelt',
  part: 'II',
  number: 6,
  title: 'Két kör közös érintői, hasonlósági középpontok',
  points: 16,
  topics: ['síkgeometria', 'koordináta-geometria'],
  difficulty: 4,
  fgvt: [
    { page: 62, note: 'Pitagorasz-tétel' },
    { page: 66, note: 'kör' },
    { page: 85, note: 'kör egyenlete' },
  ],
  estimatedMinutes: 25,
};

/**
 *  k1: O1=(0;0), r1=5
 *  k2: O2=(12;0), r2=3
 *
 *  a) d = 12,  r1+r2 = 8, r1-r2 = 2.  12 > 8 -> "külső" kölcsönös helyzet (nem metszik egymást, egyik sem tartalmazza a másikat).
 *  b) Külső közös érintő:  L_ext = sqrt(d^2 - (r1-r2)^2) = sqrt(144-4) = sqrt(140) = 2*sqrt(35) ~ 11,83
 *  c) Belső közös érintő: L_int = sqrt(d^2 - (r1+r2)^2) = sqrt(144-64) = sqrt(80) = 4*sqrt(5) ~ 8,944
 *  d) Külső hasonlósági középpont (külső érintők metszéspontja):
 *        P_ext = (r1*O2 - r2*O1)/(r1-r2) = (5*(12,0) - 3*(0,0))/(5-3) = (60/2, 0) = (30, 0)
 *     Belső hasonlósági középpont (belső érintők metszéspontja):
 *        P_int = (r1*O2 + r2*O1)/(r1+r2) = (60/8, 0) = (7,5; 0)
 */

function TwoCircles({ show = 'all' }) {
  // skála: 1 egység = 18 px; origo kb. 80;160
  const scale = 18;
  const ox = 90, oy = 180;
  const sx = (v) => ox + v * scale;
  const sy = (v) => oy - v * scale;
  const O1 = [0, 0];
  const O2 = [12, 0];
  const r1 = 5, r2 = 3;

  // külső érintők — tangens szög a centrálishoz: sin α = (r1-r2)/d = 2/12
  const alphaE = Math.asin((r1 - r2) / 12);
  // A külső érintő érintési pontjai:
  // T1 = O1 + r1*(sin α, ±cos α)  ... valójában a vektor merőleges a szárra
  // Egyszerűbb: a külső hasonlósági középpont P_ext = (30, 0); ettől indítva érint O1-et:
  //   érintő hossza P_extrő O1-ig: sqrt(30^2 - 5^2) = sqrt(875)
  //   É1 (felső) = érintési pont O1-n
  // Használjunk vektoros felírást:
  // t = O1 - r1 * n, ahol n=(sin α, cos α) a kör normálisa a külső érintő mentén.
  const T1a = [r1 * Math.sin(alphaE), r1 * Math.cos(alphaE)];
  const T2a = [12 + r2 * Math.sin(alphaE), r2 * Math.cos(alphaE)];
  const T1b = [r1 * Math.sin(alphaE), -r1 * Math.cos(alphaE)];
  const T2b = [12 + r2 * Math.sin(alphaE), -r2 * Math.cos(alphaE)];

  // belső érintők: sin β = (r1+r2)/d = 8/12 = 2/3
  const alphaI = Math.asin((r1 + r2) / 12);
  // érintési pontok O1-n és O2-n (ellenkező oldalon)
  const S1a = [r1 * Math.sin(alphaI), r1 * Math.cos(alphaI)];
  const S2a = [12 - r2 * Math.sin(alphaI), -r2 * Math.cos(alphaI)];
  const S1b = [r1 * Math.sin(alphaI), -r1 * Math.cos(alphaI)];
  const S2b = [12 - r2 * Math.sin(alphaI), r2 * Math.cos(alphaI)];

  // Pext = (30,0), Pint = (7.5, 0)
  return (
    <SvgCanvas width={640} height={340} viewBox="0 0 640 340">
      {/* koordináta-háttér */}
      <line x1={sx(-3)} y1={sy(0)} x2={sx(32)} y2={sy(0)} stroke="#bbb" strokeWidth="1" />
      <line x1={sx(0)} y1={sy(-5)} x2={sx(0)} y2={sy(5)} stroke="#bbb" strokeWidth="1" />

      {/* körök */}
      <circle cx={sx(0)} cy={sy(0)} r={r1 * scale} fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
      <circle cx={sx(12)} cy={sy(0)} r={r2 * scale} fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
      <circle cx={sx(0)} cy={sy(0)} r="3" fill="#1d4ed8" />
      <circle cx={sx(12)} cy={sy(0)} r="3" fill="#dc2626" />
      <text x={sx(0)} y={sy(0) + 18} fontSize="12" fontWeight="700" fill="#1d4ed8" textAnchor="middle">O₁(0;0), r₁=5</text>
      <text x={sx(12)} y={sy(0) + 18} fontSize="12" fontWeight="700" fill="#dc2626" textAnchor="middle">O₂(12;0), r₂=3</text>

      {(show === 'ext' || show === 'all' || show === 'both') && (
        <g>
          <line x1={sx(-3)} y1={sy(T1a[1] + ((T2a[1] - T1a[1]) * (-3 - T1a[0])) / (T2a[0] - T1a[0]))} x2={sx(32)} y2={sy(T1a[1] + ((T2a[1] - T1a[1]) * (32 - T1a[0])) / (T2a[0] - T1a[0]))} stroke="#059669" strokeWidth="2" />
          <line x1={sx(-3)} y1={sy(T1b[1] + ((T2b[1] - T1b[1]) * (-3 - T1b[0])) / (T2b[0] - T1b[0]))} x2={sx(32)} y2={sy(T1b[1] + ((T2b[1] - T1b[1]) * (32 - T1b[0])) / (T2b[0] - T1b[0]))} stroke="#059669" strokeWidth="2" />
          <circle cx={sx(T1a[0])} cy={sy(T1a[1])} r="4" fill="#059669" />
          <circle cx={sx(T2a[0])} cy={sy(T2a[1])} r="4" fill="#059669" />
          <circle cx={sx(T1b[0])} cy={sy(T1b[1])} r="4" fill="#059669" />
          <circle cx={sx(T2b[0])} cy={sy(T2b[1])} r="4" fill="#059669" />
          <circle cx={sx(30)} cy={sy(0)} r="5" fill="#059669" />
          <text x={sx(30)} y={sy(0) + 18} fontSize="12" fontWeight="700" fill="#059669" textAnchor="middle">Pₖ(30;0)</text>
        </g>
      )}

      {(show === 'int' || show === 'all' || show === 'both') && (
        <g>
          <line
            x1={sx(-3)}
            y1={sy(S1a[1] + ((S2a[1] - S1a[1]) * (-3 - S1a[0])) / (S2a[0] - S1a[0]))}
            x2={sx(20)}
            y2={sy(S1a[1] + ((S2a[1] - S1a[1]) * (20 - S1a[0])) / (S2a[0] - S1a[0]))}
            stroke="#7c3aed"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <line
            x1={sx(-3)}
            y1={sy(S1b[1] + ((S2b[1] - S1b[1]) * (-3 - S1b[0])) / (S2b[0] - S1b[0]))}
            x2={sx(20)}
            y2={sy(S1b[1] + ((S2b[1] - S1b[1]) * (20 - S1b[0])) / (S2b[0] - S1b[0]))}
            stroke="#7c3aed"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <circle cx={sx(S1a[0])} cy={sy(S1a[1])} r="4" fill="#7c3aed" />
          <circle cx={sx(S2a[0])} cy={sy(S2a[1])} r="4" fill="#7c3aed" />
          <circle cx={sx(S1b[0])} cy={sy(S1b[1])} r="4" fill="#7c3aed" />
          <circle cx={sx(S2b[0])} cy={sy(S2b[1])} r="4" fill="#7c3aed" />
          <circle cx={sx(7.5)} cy={sy(0)} r="5" fill="#7c3aed" />
          <text x={sx(7.5)} y={sy(0) - 10} fontSize="12" fontWeight="700" fill="#7c3aed" textAnchor="middle">Pᵦ(7,5;0)</text>
        </g>
      )}

      <text x={320} y={22} fontSize="14" fontWeight="700" fill="#111" textAnchor="middle">
        {show === 'ext' ? 'Külső közös érintők' : show === 'int' ? 'Belső közös érintők' : 'Két kör — közös érintők és hasonlósági pontok'}
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Adott a koordinátarendszerben két kör:

$$k_1:\\ x^2 + y^2 = 25, \\qquad k_2:\\ (x-12)^2 + y^2 = 9.$$

**a)** Igazolja, hogy a két körnek **négy közös érintője** van! Mi a két kör kölcsönös helyzete? ($3$ pont)

**b)** Számítsa ki a két kör **külső közös érintőszakaszának** hosszát! (A szakasz a két érintési pont között.) ($4$ pont)

**c)** Számítsa ki a két kör **belső közös érintőszakaszának** hosszát! ($4$ pont)

**d)** Adja meg a **külső hasonlósági középpont** $P_\\text{k}$ és a **belső hasonlósági középpont** $P_\\text{b}$ koordinátáit (ezek a külső, ill. a belső érintő-párok metszéspontjai)! ($5$ pont)`,
  figure: () => <TwoCircles show="all" />,
  asked: [
    { key: 'a', label: 'a) kölcsönös helyzet' },
    { key: 'b', label: 'b) külső érintőszakasz hossza' },
    { key: 'c', label: 'c) belső érintőszakasz hossza' },
    { key: 'd', label: 'd) $P_\\text{k}, P_\\text{b}$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a) lépés — A kölcsönös helyzet',
      points: 3,
      body: `A körök középpontjai $O_1(0;0)$ és $O_2(12;0)$, sugaraik $r_1 = 5$, $r_2 = 3$.

A középpontok távolsága:

$$d = \\lvert O_1 O_2 \\rvert = \\sqrt{(12-0)^2 + 0^2} = 12.$$

Összehasonlítjuk a sugarak összegével és különbségével:

$$r_1 + r_2 = 8, \\quad r_1 - r_2 = 2.$$

Mivel $d = 12 > r_1 + r_2 = 8$, a két kör **egymáson kívül helyezkedik el** (nem metszik egymást, és egyik sem tartalmazza a másikat).

**Következmény:** ebben az esetben pontosan **$4$ közös érintő** van — $2$ külső (a két kört ugyanazon az oldalon érintve) és $2$ belső (a körök között átmenve).`,
    },
    {
      title: 'b/1. lépés — A külső közös érintő képlete',
      points: 2,
      body: `**Megfontolás:** legyen $T_1 \\in k_1$ és $T_2 \\in k_2$ a külső érintő két érintési pontja. A sugarak $O_1 T_1$ és $O_2 T_2$ **párhuzamosak** egymással, és merőlegesek az érintőre.

Emeljünk $O_2$-ből merőlegest az $O_1 T_1$ sugárra: a keletkezett derékszögű háromszög egyik befogója $\\lvert T_1 T_2 \\rvert$, a másik $r_1 - r_2$ (a sugárkülönbség), az átfogó pedig $d = 12$.

Pitagorasz-tétel:

$$\\lvert T_1 T_2 \\rvert^2 = d^2 - (r_1 - r_2)^2 = 144 - 4 = 140.$$`,
      figure: () => <TwoCircles show="ext" />,
    },
    {
      title: 'b/2. lépés — A külső érintőszakasz hossza',
      points: 2,
      body: `$$\\lvert T_1 T_2 \\rvert = \\sqrt{140} = 2\\sqrt{35} \\approx 11{,}832.$$

$$\\boxed{L_{\\text{k}} = 2\\sqrt{35} \\approx 11{,}83\\ \\text{egység.}}$$`,
    },
    {
      title: 'c/1. lépés — A belső közös érintő képlete',
      points: 2,
      body: `**Megfontolás:** legyen $S_1 \\in k_1$ és $S_2 \\in k_2$ a belső érintő érintési pontjai. Itt a két sugár **ellentétes** irányú (a körök átellenes oldalán érint), ezért ha eltoljuk $O_1 S_1$-et úgy, hogy $O_1$-ből $O_2$-be érjen, akkor a szakasz $O_1 S_1$ és $O_2 S_2$ most ellenkező előjellel adódik össze.

A konstrukció Pitagorasz-tétele szerint:

$$\\lvert S_1 S_2 \\rvert^2 = d^2 - (r_1 + r_2)^2 = 144 - 64 = 80.$$`,
      figure: () => <TwoCircles show="int" />,
    },
    {
      title: 'c/2. lépés — A belső érintőszakasz hossza',
      points: 2,
      body: `$$\\lvert S_1 S_2 \\rvert = \\sqrt{80} = 4\\sqrt{5} \\approx 8{,}944.$$

$$\\boxed{L_{\\text{b}} = 4\\sqrt{5} \\approx 8{,}94\\ \\text{egység.}}$$

**Ellenőrzés:** a belső érintő ($4\\sqrt5 \\approx 8{,}94$) rövidebb, mint a külső ($2\\sqrt{35} \\approx 11{,}83$). Ez intuitíven is stimmel: a belső érintő „átmegy" a körök között, és kisebb teret enged.`,
    },
    {
      title: 'd/1. lépés — A hasonlósági középpontok fogalma',
      points: 1,
      body: `Két kör közös érintőinek metszéspontjait **hasonlósági középpontoknak** nevezzük. A két külső érintő metszéspontja a **külső** $P_\\text{k}$, a két belső érintőé a **belső** $P_\\text{b}$ hasonlósági középpont.

**Tétel (sugárarány):** $P_\\text{k}$ azt a pontot jelöli az $O_1 O_2$ egyenesen, amelyre

$$\\dfrac{\\lvert P_\\text{k} O_1 \\rvert}{\\lvert P_\\text{k} O_2 \\rvert} = \\dfrac{r_1}{r_2},$$

ahol $P_\\text{k}$ az $O_1 O_2$ szakasz **meghosszabbításán** van (a kisebb kör oldalán kívül). $P_\\text{b}$ pedig a szakaszt **belsőleg** osztja az $r_1 : r_2$ arányban.`,
    },
    {
      title: 'd/2. lépés — $P_\\text{k}$ koordinátái (külső hasonlósági középpont)',
      points: 2,
      body: `Legyen $P_\\text{k} = (x_\\text{k}; 0)$, mert az $O_1 O_2$ egyenes az $x$-tengely.

Külső osztás képlete: $P_\\text{k} = \\dfrac{r_1 \\cdot O_2 - r_2 \\cdot O_1}{r_1 - r_2}.$

$$x_\\text{k} = \\dfrac{5 \\cdot 12 - 3 \\cdot 0}{5 - 3} = \\dfrac{60}{2} = 30.$$

$$\\boxed{P_\\text{k} = (30;\\ 0).}$$

**Ellenőrzés** aránnyal: $|P_\\text{k} O_1| = 30$, $|P_\\text{k} O_2| = 18$, arány $30 : 18 = 5 : 3 = r_1 : r_2$ ✓.`,
    },
    {
      title: 'd/3. lépés — $P_\\text{b}$ koordinátái (belső hasonlósági középpont)',
      points: 2,
      body: `Belső osztás képlete: $P_\\text{b} = \\dfrac{r_1 \\cdot O_2 + r_2 \\cdot O_1}{r_1 + r_2}.$

$$x_\\text{b} = \\dfrac{5 \\cdot 12 + 3 \\cdot 0}{5 + 3} = \\dfrac{60}{8} = 7{,}5.$$

$$\\boxed{P_\\text{b} = (7{,}5;\\ 0).}$$

**Ellenőrzés** aránnyal: $|P_\\text{b} O_1| = 7{,}5$, $|P_\\text{b} O_2| = 4{,}5$, arány $7{,}5 : 4{,}5 = 5 : 3 = r_1 : r_2$ ✓.

**Megjegyzés:** $P_\\text{b}$ a két kör között van (mert $0 < 7{,}5 < 12$), $P_\\text{k}$ pedig a kis kör oldalán kívül (mert $x_\\text{k} = 30 > 12$).`,
      figure: () => <TwoCircles show="both" />,
    },
  ],
  finalAnswer: {
    a: '$d = 12 > r_1+r_2 = 8$ — egymáson kívül; 4 közös érintő',
    b: '$L_\\text{k} = 2\\sqrt{35} \\approx 11{,}83$',
    c: '$L_\\text{b} = 4\\sqrt{5} \\approx 8{,}94$',
    d: '$P_\\text{k}(30;0)$, $P_\\text{b}(7{,}5;0)$',
  },
  usedFormulas: [
    'Pitagorasz-tétel',
    'két kör kölcsönös helyzete $d \\lessgtr r_1 \\pm r_2$',
    'hasonlósági középpont: $r_1 : r_2$ arányú osztás',
  ],
};

export default { meta, problem, solution };
