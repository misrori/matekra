import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-05',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 5,
  title: 'Nevezetes szögek — pontos érték',
  points: 3,
  topics: ['trigonometria'],
  difficulty: 2,
  fgvt: [{ page: 57, note: 'nevezetes szögek szinusza és koszinusza' }],
  estimatedMinutes: 4,
  // Végérték: 3/4.
  check: { type: 'number', value: 0.75, tolerance: 0.0001 },
};

// Adjuk meg pontosan: sin²60° + cos²30° − sin 30°·cos 60°
// = (√3/2)² + (√3/2)² − (1/2)(1/2)
// = 3/4 + 3/4 − 1/4 = 5/4. Nem 3/4.
// Másik: sin²30° + cos²60° + sin 60°·cos 30°
// = 1/4 + 1/4 + (√3/2)(√3/2) = 1/2 + 3/4 = 5/4. Nem.
// sin²45° + sin 30°·cos 60° = 1/2 + 1/4 = 3/4. ✓ Egyszerűbb.

function TrigTriangle() {
  return (
    <SvgCanvas width={520} height={280} viewBox="0 0 520 280">
      <text x="260" y="22" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Nevezetes szögek — 30°, 45°, 60°
      </text>
      {/* 45°-os egyenlő szárú derékszögű */}
      <polygon points="60,220 200,220 200,100" fill="#dbeafe" stroke="#1e40af" strokeWidth="2" />
      <text x="130" y="238" fontSize="13" textAnchor="middle">1</text>
      <text x="215" y="165" fontSize="13">1</text>
      <text x="125" y="158" fontSize="13" transform="rotate(-45 125 158)">√2</text>
      <text x="78" y="212" fontSize="12" fill="#dc2626" fontWeight="700">45°</text>
      <text x="185" y="116" fontSize="12" fill="#dc2626" fontWeight="700">45°</text>
      {/* 30-60-90 */}
      <polygon points="290,220 490,220 490,104" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      <text x="385" y="238" fontSize="13" textAnchor="middle">√3</text>
      <text x="505" y="165" fontSize="13">1</text>
      <text x="378" y="158" fontSize="13" transform="rotate(-30 378 158)">2</text>
      <text x="298" y="212" fontSize="12" fill="#dc2626" fontWeight="700">30°</text>
      <text x="475" y="116" fontSize="12" fill="#dc2626" fontWeight="700">60°</text>
      <text x="260" y="265" fontSize="12" textAnchor="middle" fill="#374151">
        sin 45° = cos 45° = √2/2; sin 30° = 1/2; cos 60° = 1/2; sin 60° = √3/2
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Számítsa ki az alábbi kifejezés **pontos** értékét (nevezetes szögekkel dolgozzon, ne használjon zsebszámológépet):

$$\\sin^2 45° + \\sin 30° \\cdot \\cos 60°.$$`,
  figure: () => <TrigTriangle />,
  asked: [{ key: 'E', label: 'Érték $= ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A nevezetes szögek értékei',
      points: 1,
      body: `A függvénytábla ($57.$ old.) szerint:

$$\\sin 45° = \\cos 45° = \\dfrac{\\sqrt{2}}{2}, \\quad \\sin 30° = \\dfrac{1}{2}, \\quad \\cos 60° = \\dfrac{1}{2}.$$`,
      figure: () => <TrigTriangle />,
    },
    {
      title: '2. lépés — A négyzet és a szorzat kiszámítása',
      points: 1,
      body: `$$\\sin^2 45° = \\left(\\dfrac{\\sqrt{2}}{2}\\right)^2 = \\dfrac{2}{4} = \\dfrac{1}{2}.$$

$$\\sin 30° \\cdot \\cos 60° = \\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}.$$`,
      figure: () => <TrigTriangle />,
    },
    {
      title: '3. lépés — Az összeg',
      points: 1,
      body: `$$\\sin^2 45° + \\sin 30° \\cdot \\cos 60° = \\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4} = 0{,}75.$$`,
      figure: () => <TrigTriangle />,
    },
  ],
  finalAnswer: { E: '$\\dfrac{3}{4} = 0{,}75$' },
  usedFormulas: [
    '$\\sin 45° = \\cos 45° = \\sqrt{2}/2$',
    '$\\sin 30° = \\cos 60° = 1/2$',
  ],
};

export default { meta, problem, solution };
