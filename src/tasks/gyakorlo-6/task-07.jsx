import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-07',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 7,
  title: 'Gömb térfogata és felszíne',
  points: 2,
  topics: ['térgeometria'],
  difficulty: 2,
  fgvt: [{ page: 77, note: 'gömb térfogata és felszíne' }],
  estimatedMinutes: 3,
  // r=3 → V = 36π ≈ 113,10; A = 36π ≈ 113,10
  check: { type: 'number', value: 113.1, tolerance: 0.1 },
};

function SphereFigure() {
  return (
    <SvgCanvas width={480} height={300} viewBox="0 0 480 300">
      <text x="240" y="26" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Gömb (r = 3 cm)
      </text>
      <defs>
        <radialGradient id="sphereGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>
      <circle cx="240" cy="160" r="110" fill="url(#sphereGrad)" stroke="#1e40af" strokeWidth="2" />
      {/* Egyenlítő ellipszis */}
      <ellipse cx="240" cy="160" rx="110" ry="30" fill="none" stroke="#111827" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Sugár */}
      <line x1="240" y1="160" x2="350" y2="160" stroke="#dc2626" strokeWidth="2" />
      <text x="290" y="155" fontSize="14" fontWeight="700" fill="#dc2626">r = 3</text>
      <circle cx="240" cy="160" r="3" fill="#111827" />
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy gömb sugara $r = 3$ cm.

Mekkora a **térfogata** és a **felszíne**? Adja meg pontos ($\\pi$-vel) és közelítő értékkel (két tizedesre kerekítve, $\\pi \\approx 3{,}14159$)!`,
  figure: () => <SphereFigure />,
  asked: [
    { key: 'V', label: '$V = ?$ cm³' },
    { key: 'A', label: '$A = ?$ cm²' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Térfogat',
      points: 1,
      body: `A gömb térfogata (fgv. tábla $77.$ old.):

$$V = \\dfrac{4}{3} r^3 \\pi = \\dfrac{4}{3} \\cdot 27 \\pi = 36 \\pi \\approx 113{,}10 \\text{ cm}^3.$$`,
      figure: () => <SphereFigure />,
    },
    {
      title: '2. lépés — Felszín',
      points: 1,
      body: `A gömb felszíne:

$$A = 4 r^2 \\pi = 4 \\cdot 9 \\pi = 36 \\pi \\approx 113{,}10 \\text{ cm}^2.$$

**Érdekesség**: $r = 3$ esetén a térfogat (cm³-ben) és a felszín (cm²-ben) **számszerűleg** megegyezik — ez pontosan akkor teljesül, ha $r = 3$ (mértékegység nélkül).`,
      figure: () => <SphereFigure />,
    },
  ],
  finalAnswer: {
    V: '$V = 36\\pi \\approx 113{,}10$ cm³',
    A: '$A = 36\\pi \\approx 113{,}10$ cm²',
  },
  usedFormulas: ['$V = \\tfrac{4}{3}r^3\\pi$', '$A = 4r^2\\pi$'],
};

export default { meta, problem, solution };
