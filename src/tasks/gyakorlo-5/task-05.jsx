import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-5-05',
  year: 2024,
  session: 'gyakorló · 5. teszt',
  level: 'közép',
  part: 'I',
  number: 5,
  title: 'Trigonometria — derékszögű háromszög',
  points: 3,
  topics: ['trigonometria'],
  difficulty: 2,
  fgvt: [
    { page: 57, note: 'szögfüggvény táblázat' },
    { page: 54, note: 'derékszögű háromszög' },
  ],
  estimatedMinutes: 4,
  // Az átfogó cos(35°) · 20 ≈ 16.383 → kerekítve 16,38
  check: { type: 'number', value: 16.38, tolerance: 0.05 },
};

// Derékszögű háromszög, átfogó AB = 20 cm, A-nál 35°-os szög, B-nél 55°.
// Szomszédos befogó (A-val szomszédos, B felé): AC = 20 · cos(35°) ≈ 16,38
function RightTriangle({ highlight = 'none' }) {
  // Az átfogó vízszintes A-ból B-be, C fent
  const Ax = 60, Ay = 230;
  const Bx = 400, By = 230;
  const alphaDeg = 35;
  const c = 340; // vizuális hossz
  // Derékszög C-nél: AC vízszintes? Nem — A-nál 35°.
  // Tegyük a derékszöget C-be úgy, hogy AC vízszintes a befogó, CB függőleges.
  // AC = c·cos35, CB = c·sin35
  const rad = (alphaDeg * Math.PI) / 180;
  const AC = c * Math.cos(rad);
  const Cx = Ax + AC, Cy = Ay;
  // Bx kell, hogy B fent legyen? Rendezzük: A balra lent, C jobbra lent, B jobbra fent.
  const Bx2 = Cx, By2 = Ay - c * Math.sin(rad);
  return (
    <SvgCanvas width={480} height={280} viewBox="0 0 480 280">
      {/* Háromszög */}
      <polygon
        points={`${Ax},${Ay} ${Cx},${Cy} ${Bx2},${By2}`}
        fill="#e0f2fe" stroke="#0c4a6e" strokeWidth="1.8"
      />
      {/* Derékszög jel C-ben */}
      <path d={`M ${Cx - 14},${Cy} L ${Cx - 14},${Cy - 14} L ${Cx},${Cy - 14}`} fill="none" stroke="#7c3aed" strokeWidth="1.4" />
      {/* Csúcsok */}
      <text x={Ax - 12} y={Ay + 6} fontSize="16" fontWeight="bold">A</text>
      <text x={Cx + 6} y={Cy + 18} fontSize="16" fontWeight="bold">C</text>
      <text x={Bx2 + 6} y={By2} fontSize="16" fontWeight="bold">B</text>

      {/* Szög A-ban */}
      <path d={`M ${Ax + 30},${Ay} A 30,30 0 0,0 ${Ax + 30 * Math.cos(rad)},${Ay - 30 * Math.sin(rad)}`}
        fill="none" stroke="#dc2626" strokeWidth="1.4" />
      <text x={Ax + 42} y={Ay - 10} fontSize="14" fill="#dc2626" fontWeight="bold">35°</text>

      {/* Oldalcímkék */}
      <text x={(Ax + Bx2) / 2 - 10} y={(Ay + By2) / 2 - 6} fontSize="13" fill={highlight === 'c' ? '#dc2626' : '#111'} fontWeight="bold">
        c = 20 cm (átfogó)
      </text>
      <text x={(Ax + Cx) / 2} y={Ay + 20} fontSize="13" fill={highlight === 'AC' ? '#16a34a' : '#111'} fontWeight="bold" textAnchor="middle">
        AC = ?
      </text>
      <text x={Cx + 10} y={(Cy + By2) / 2} fontSize="12" fill="#64748b">CB</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy derékszögű háromszögben a derékszög a $C$ csúcsnál van. Az átfogó hossza $AB = 20$ cm, az $A$ csúcsnál levő szög nagysága $35°$.

Mekkora az $A$-val szomszédos befogó, $AC$ hossza centiméterben, két tizedesjegyre kerekítve?`,
  figure: () => <RightTriangle />,
  asked: [{ key: 'AC', label: '$AC = ?$ cm' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A megfelelő szögfüggvény kiválasztása',
      points: 1,
      body: `A derékszögű háromszögben a **koszinusz** a szomszédos befogó és az átfogó hányadosa:

$$\\cos \\alpha = \\dfrac{\\text{szomszédos befogó}}{\\text{átfogó}}.$$

Itt $\\alpha = 35°$, a szomszédos befogó $AC$, az átfogó $AB = 20$. Ezért:

$$\\cos 35° = \\dfrac{AC}{20}.$$`,
    },
    {
      title: '2. lépés — Átrendezés és számítás',
      points: 1,
      body: `Szorozzunk $20$-szal:

$$AC = 20 \\cdot \\cos 35°.$$

A négyjegyű függvénytáblázatból (vagy számológépből):

$$\\cos 35° \\approx 0{,}8192.$$

Ezért:

$$AC \\approx 20 \\cdot 0{,}8192 = 16{,}384 \\ \\text{cm}.$$`,
    },
    {
      title: '3. lépés — Kerekítés és ellenőrzés',
      points: 1,
      body: `Két tizedesjegyre: $\\boxed{AC \\approx 16{,}38 \\text{ cm}}$.

**Ellenőrzés:** a másik befogó $CB = 20 \\sin 35° \\approx 20 \\cdot 0{,}5736 \\approx 11{,}47$ cm.
Pitagorasz: $16{,}38^2 + 11{,}47^2 \\approx 268{,}30 + 131{,}56 \\approx 399{,}86 \\approx 20^2 = 400$ ✓.`,
      figure: () => <RightTriangle highlight="AC" />,
    },
  ],
  finalAnswer: { AC: '$AC \\approx 16{,}38$ cm' },
  usedFormulas: ['$\\cos \\alpha = \\dfrac{\\text{szomszédos}}{\\text{átfogó}}$'],
};

export default { meta, problem, solution };
