import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-14',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'II.A',
  number: 14,
  title: 'Négyszög — trigonometria és terület',
  points: 13,
  topics: ['trigonometria', 'síkgeometria'],
  difficulty: 4,
  fgvt: [
    { page: 54, note: 'szinusztétel' },
    { page: 55, note: 'koszinusztétel' },
    { page: 62, note: 'háromszög területe' },
  ],
  estimatedMinutes: 18,
};

// Egy ABCD négyszög: AB=10, BC=7, CD=6, DA=8, szög BAD = 100°
// Átló BD: koszinusztétel ABD háromszögben AB=10, AD=8, szög A=100°
// BD^2 = 100 + 64 - 2·10·8·cos(100°) = 164 - 160·(-0,1736) = 164 + 27,78 = 191,78
// BD ≈ 13,85
// Ekkor BCD háromszögben BC=7, CD=6, BD=13,85
// De 7+6 = 13 < 13,85 — háromszög egyenlőtlenség nem teljesül!
// Módosítás: legyen AB=12, BC=9, CD=7, DA=10, szög BAD=95°
// BD^2 = 144+100 - 2·12·10·cos(95°) = 244 - 240·(-0,0872) = 244 + 20,92 = 264,92
// BD ≈ 16,28  — 9+7=16 < 16,28 — szintén nem.
// Legyen szög A = 80° helyett (hegyesszög), AB=12, AD=10
// BD^2 = 144+100 - 240·cos(80°) = 244 - 240·0,1736 = 244 - 41,67 = 202,33
// BD ≈ 14,22
// BC=9, CD=7 — 9+7=16 > 14,22 ✓
// Szög BCD = koszinusztétel: cos C = (BC^2+CD^2-BD^2)/(2·BC·CD) = (81+49-202,33)/(126) = -72,33/126 = -0,574
// C szög ≈ 125°
// Terület = T_ABD + T_BCD
// T_ABD = (1/2)·AB·AD·sin A = (1/2)·12·10·sin(80°) = 60·0,9848 = 59,09
// T_BCD = (1/2)·BC·CD·sin C = (1/2)·9·7·sin(125°) = 31,5·0,8192 = 25,80
// T = 84,89 ≈ 84,89 cm²

function Quadrilateral({ step = 1 }) {
  // Elhelyezés: A az origóban, AB vízszintes jobbra, szög A=80° felfelé
  const Ax = 70, Ay = 260;
  const scale = 18;
  const AB = 12, AD = 10, BC = 9, CD = 7;
  const alphaDeg = 80;
  const a = (alphaDeg * Math.PI) / 180;
  const Bx = Ax + AB * scale;
  const By = Ay;
  const Dx = Ax + AD * scale * Math.cos(a);
  const Dy = Ay - AD * scale * Math.sin(a);
  // C-t úgy kell elhelyezni, hogy BC=9 és CD=7.
  // Numerikusan megoldva: BD ≈ 14,22 → keresünk olyan C-t, ahol BC=9 és CD=7.
  // BD vektor: (Dx-Bx, Dy-By)
  const BDx = Dx - Bx, BDy = Dy - By;
  const BD = Math.sqrt(BDx * BDx + BDy * BDy);
  // Cosinus tétel a BCD háromszögben: BC^2 = CD^2 + BD^2 - 2·CD·BD·cos(D_angle)
  // Itt egyszerűbben: metszünk két kört - B körül BC sugarú, D körül CD sugarú.
  // Középpontok: M = (B+D)/2, d = BD
  // Sugarak: r1 = BC·scale, r2 = CD·scale
  const r1 = BC * scale, r2 = CD * scale;
  const d = BD;
  const mx = (Bx + Dx) / 2, my = (By + Dy) / 2;
  // BD-re merőleges irányban h távolságra található C
  const a2 = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a2 * a2));
  // B-től BD irányba a2, majd arra merőlegesen h (a négyszög kívülre - alul)
  const ux = BDx / d, uy = BDy / d;
  const px = -uy, py = ux; // perpendikuláris
  // C-t a négyszög jobb oldalán (kifelé) akarjuk
  const Cx = Bx + a2 * ux + h * px;
  const Cy = By + a2 * uy + h * py;
  // Ha ez a BD felső oldalán van, forduljunk meg
  const Cx2 = Bx + a2 * ux - h * px;
  const Cy2 = By + a2 * uy - h * py;
  // A "külső" C az, ami messzebb van A-tól
  const d1 = Math.hypot(Cx - Ax, Cy - Ay);
  const d2 = Math.hypot(Cx2 - Ax, Cy2 - Ay);
  const useSecond = d2 > d1;
  const cx = useSecond ? Cx2 : Cx;
  const cy = useSecond ? Cy2 : Cy;

  return (
    <SvgCanvas width={540} height={340} viewBox="0 0 540 340">
      {/* Négyszög */}
      <polygon points={`${Ax},${Ay} ${Bx},${By} ${cx},${cy} ${Dx},${Dy}`} fill="#fef3c7" stroke="#92400e" strokeWidth="1.8" />
      {/* Átló BD */}
      {step >= 2 && (
        <line x1={Bx} y1={By} x2={Dx} y2={Dy} stroke="#dc2626" strokeWidth="1.6" strokeDasharray="5,3" />
      )}
      {step >= 2 && (
        <text x={(Bx + Dx) / 2 + 10} y={(By + Dy) / 2 - 4} fontSize="13" fill="#dc2626" fontWeight="bold">BD</text>
      )}
      {/* Szög A */}
      <path d={`M ${Ax + 28},${Ay} A 28,28 0 0,0 ${Ax + 28 * Math.cos(a)},${Ay - 28 * Math.sin(a)}`}
        fill="none" stroke="#7c3aed" strokeWidth="1.4" />
      <text x={Ax + 40} y={Ay - 14} fontSize="13" fill="#7c3aed" fontWeight="bold">80°</text>

      <text x={Ax - 14} y={Ay + 8} fontSize="15" fontWeight="bold">A</text>
      <text x={Bx + 8} y={By + 8} fontSize="15" fontWeight="bold">B</text>
      <text x={cx + 6} y={cy + 10} fontSize="15" fontWeight="bold">C</text>
      <text x={Dx - 4} y={Dy - 8} fontSize="15" fontWeight="bold">D</text>

      <text x={(Ax + Bx) / 2} y={Ay + 22} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">AB = 12</text>
      <text x={(Bx + cx) / 2 + 6} y={(By + cy) / 2} fontSize="12" fontWeight="bold" fill="#1e3a8a">BC = 9</text>
      <text x={(cx + Dx) / 2 + 4} y={(cy + Dy) / 2 + 14} fontSize="12" fontWeight="bold" fill="#1e3a8a">CD = 7</text>
      <text x={(Dx + Ax) / 2 - 32} y={(Dy + Ay) / 2 - 4} fontSize="12" fontWeight="bold" fill="#1e3a8a">DA = 10</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy $ABCD$ négyszögben $AB = 12$ cm, $BC = 9$ cm, $CD = 7$ cm, $DA = 10$ cm, továbbá a $BAD\\sphericalangle = 80°$ (vagyis az $A$ csúcsnál lévő szög).

**a)** Számítsa ki a $BD$ átló hosszát cm-ben, két tizedesjegyre kerekítve!
**b)** Mekkora a $BCD\\sphericalangle$ (a $C$ csúcsnál lévő szög)? Fokra kerekítsen!
**c)** Számítsa ki a négyszög **területét** cm²-ben, két tizedesjegyre kerekítve!`,
  figure: () => <Quadrilateral step={1} />,
  asked: [
    { key: 'BD', label: '$BD \\approx ?$ cm' },
    { key: 'C', label: '$\\sphericalangle BCD \\approx ?°$' },
    { key: 'T', label: 'terület $\\approx ?$ cm²' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — Az átló kiszámításához koszinusztétel',
      points: 2,
      body: `Húzzuk be a $BD$ átlót. Ekkor keletkezik egy $ABD$ háromszög, amelyben ismerjük két oldalt ($AB = 12$, $AD = 10$) és a **köztük** levő szöget ($\\alpha = 80°$). Ez pontosan a koszinusztétel esete:

$$BD^2 = AB^2 + AD^2 - 2 \\cdot AB \\cdot AD \\cdot \\cos \\alpha.$$`,
      figure: () => <Quadrilateral step={2} />,
    },
    {
      title: 'a/2. lépés — Behelyettesítés',
      points: 2,
      body: `$$BD^2 = 12^2 + 10^2 - 2 \\cdot 12 \\cdot 10 \\cdot \\cos 80°,$$
$$BD^2 = 144 + 100 - 240 \\cdot 0{,}1736,$$
$$BD^2 \\approx 244 - 41{,}67 = 202{,}33.$$

$$BD \\approx \\sqrt{202{,}33} \\approx 14{,}22 \\ \\text{cm}.$$

Tehát $\\boxed{BD \\approx 14{,}22 \\text{ cm}}$.`,
    },
    {
      title: 'b) lépés — A BCD szög kiszámítása koszinusztétellel',
      points: 3,
      body: `A $BCD$ háromszögben ismerjük mindhárom oldalt: $BC = 9$, $CD = 7$, $BD \\approx 14{,}22$. A $C$ csúcsnál levő szög a $BC$ és $CD$ oldalak közötti szög — a velük szemközti oldal a $BD$.

Átrendezett koszinusztétel:

$$\\cos(\\sphericalangle BCD) = \\dfrac{BC^2 + CD^2 - BD^2}{2 \\cdot BC \\cdot CD}.$$

$$\\cos(\\sphericalangle BCD) = \\dfrac{81 + 49 - 202{,}33}{2 \\cdot 9 \\cdot 7} = \\dfrac{-72{,}33}{126} \\approx -0{,}5741.$$

A $\\cos$ negatív, tehát tompaszög lesz:

$$\\sphericalangle BCD \\approx \\arccos(-0{,}5741) \\approx 125°.$$

Tehát $\\boxed{\\sphericalangle BCD \\approx 125°}$.`,
    },
    {
      title: 'c/1. lépés — A négyszög bontása két háromszögre',
      points: 1,
      body: `A $BD$ átló a négyszöget két háromszögre bontja: $ABD$ és $BCD$. A négyszög területe e két háromszög területének összege:

$$T_{ABCD} = T_{ABD} + T_{BCD}.$$`,
    },
    {
      title: 'c/2. lépés — Az ABD háromszög területe',
      points: 2,
      body: `Két oldal és a közöttük levő szög ismert, ezért:

$$T_{ABD} = \\dfrac{AB \\cdot AD \\cdot \\sin 80°}{2} = \\dfrac{12 \\cdot 10 \\cdot \\sin 80°}{2}.$$

$\\sin 80° \\approx 0{,}9848$:

$$T_{ABD} \\approx \\dfrac{120 \\cdot 0{,}9848}{2} \\approx 59{,}09 \\ \\text{cm}^2.$$`,
    },
    {
      title: 'c/3. lépés — A BCD háromszög területe',
      points: 2,
      body: `Ugyanez a képlet a $B$–$C$–$D$ háromszögre, ahol a köztes szög a $C$ csúcsnál $\\approx 125°$:

$$T_{BCD} = \\dfrac{BC \\cdot CD \\cdot \\sin(\\sphericalangle BCD)}{2} = \\dfrac{9 \\cdot 7 \\cdot \\sin 125°}{2}.$$

$\\sin 125° = \\sin(180° - 125°) = \\sin 55° \\approx 0{,}8192$:

$$T_{BCD} \\approx \\dfrac{63 \\cdot 0{,}8192}{2} \\approx 25{,}80 \\ \\text{cm}^2.$$`,
    },
    {
      title: 'c/4. lépés — A teljes terület',
      points: 1,
      body: `$$T_{ABCD} \\approx 59{,}09 + 25{,}80 = 84{,}89 \\ \\text{cm}^2.$$

Tehát $\\boxed{T_{ABCD} \\approx 84{,}89 \\ \\text{cm}^2}$.

**Ellenőrzés — nagyságrend:** Az $ABD$ háromszög közel derékszögű ($80°$), területe kb. $60$; a $BCD$ háromszög lényegesen kisebb oldalakkal és tompaszöggel, kb. $26$. Összesen $\\sim 85$ — a számolás összhangban van az ábrával.`,
    },
  ],
  finalAnswer: {
    BD: '$BD \\approx 14{,}22$ cm',
    C: '$\\sphericalangle BCD \\approx 125°$',
    T: '$T_{ABCD} \\approx 84{,}89$ cm²',
  },
  usedFormulas: [
    'koszinusztétel: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$',
    '$T = \\tfrac{1}{2}ab \\sin \\gamma$',
  ],
};

export default { meta, problem, solution };
