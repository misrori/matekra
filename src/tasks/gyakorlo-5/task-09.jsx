import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-09',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 9,
  title: 'Síkgeometria — háromszög területe',
  points: 3,
  topics: ['síkgeometria', 'trigonometria'],
  difficulty: 2,
  fgvt: [
    { page: 62, note: 'háromszög területe' },
    { page: 57, note: 'szögfüggvény táblázat' },
  ],
  estimatedMinutes: 4,
  // T = ab·sin γ /2 = 8·11·sin(40°)/2 = 44·0,6428 ≈ 28,28 cm²
  check: { type: 'number', value: 28.28, tolerance: 0.1 },
};

function TriFigure() {
  // Háromszög: két oldal (a=8, b=11) és köztes szög γ=40°.
  // Elhelyezzük: C a bal alsó sarokban, CA = b = 11 jobbra, CB = a = 8 a γ=40° szögben
  const Cx = 80, Cy = 240;
  const scale = 15;
  const b = 11, a = 8;
  const gammaDeg = 40;
  const g = (gammaDeg * Math.PI) / 180;
  const Ax = Cx + b * scale;
  const Ay = Cy;
  const Bx = Cx + a * scale * Math.cos(g);
  const By = Cy - a * scale * Math.sin(g);
  return (
    <SvgCanvas width={480} height={300} viewBox="0 0 480 300">
      <polygon points={`${Cx},${Cy} ${Ax},${Ay} ${Bx},${By}`} fill="#fef3c7" stroke="#92400e" strokeWidth="1.8" />
      {/* Szög jel C-nél */}
      <path d={`M ${Cx + 26},${Cy} A 26,26 0 0,0 ${Cx + 26 * Math.cos(g)},${Cy - 26 * Math.sin(g)}`}
        fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <text x={Cx + 42} y={Cy - 12} fontSize="14" fill="#dc2626" fontWeight="bold">γ = 40°</text>

      <text x={Cx - 14} y={Cy + 6} fontSize="16" fontWeight="bold">C</text>
      <text x={Ax + 6} y={Ay + 6} fontSize="16" fontWeight="bold">A</text>
      <text x={Bx - 6} y={By - 6} fontSize="16" fontWeight="bold">B</text>

      <text x={(Cx + Ax) / 2} y={Cy + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        b = CA = 11 cm
      </text>
      <text x={(Cx + Bx) / 2 - 16} y={(Cy + By) / 2 - 4} fontSize="13" fontWeight="bold" fill="#1e3a8a">
        a = CB = 8 cm
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy háromszög $C$ csúcsából induló két oldalának hossza $a = CB = 8$ cm és $b = CA = 11$ cm. A két oldal által bezárt szög $\\gamma = 40°$.

Számítsa ki a háromszög **területét** cm²-ben, két tizedesjegyre kerekítve!`,
  figure: () => <TriFigure />,
  asked: [{ key: 'T', label: '$T = ?$ cm²' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A terület képlete két oldallal és a köztes szöggel',
      points: 1,
      body: `Ha egy háromszög két oldalát és a közöttük lévő szöget ismerjük, a terület:

$$T = \\dfrac{a \\cdot b \\cdot \\sin \\gamma}{2}.$$

Ez abból jön, hogy a magasság $b \\sin \\gamma$, így $T = \\dfrac{\\text{alap} \\cdot \\text{magasság}}{2} = \\dfrac{a \\cdot b \\sin \\gamma}{2}$.`,
    },
    {
      title: '2. lépés — Behelyettesítés',
      points: 1,
      body: `$a = 8$, $b = 11$, $\\gamma = 40°$:

$$T = \\dfrac{8 \\cdot 11 \\cdot \\sin 40°}{2} = \\dfrac{88 \\cdot \\sin 40°}{2} = 44 \\sin 40°.$$

A függvénytáblából: $\\sin 40° \\approx 0{,}6428$.`,
    },
    {
      title: '3. lépés — Számérték és kerekítés',
      points: 1,
      body: `$$T \\approx 44 \\cdot 0{,}6428 \\approx 28{,}28 \\ \\text{cm}^2.$$

Tehát $\\boxed{T \\approx 28{,}28 \\text{ cm}^2}$.

**Ellenőrzés becsléssel:** derékszög ($90°$) esetén a terület $8 \\cdot 11 / 2 = 44$ cm² volna; $40° < 90°$, ezért kisebb kell legyen — és a $28{,}28$ kisebb ✓.`,
    },
  ],
  finalAnswer: { T: '$T \\approx 28{,}28$ cm²' },
  usedFormulas: ['$T = \\dfrac{ab \\sin \\gamma}{2}$'],
};

export default { meta, problem, solution };
