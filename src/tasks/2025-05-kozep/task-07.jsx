import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: '2025-05-kozep-07',
  year: 2025,
  session: 'május',
  level: 'közép',
  part: 'I',
  number: 7,
  title: 'Félgömb térfogata',
  points: 2,
  topics: ['térgeometria'],
  difficulty: 1,
  fgvt: [{ page: 77, note: 'gömb térfogat' }],
  estimatedMinutes: 2,
};

function HemisphereFigure({ step = 0 }) {
  // step: 0 = alap, 1 = sugár jelölés, 2 = kitöltött félgömb + eredmény
  const fill = step >= 2 ? '#bfdbfe' : 'none';
  return (
    <SvgCanvas width={400} height={260} viewBox="0 0 400 260">
      {/* A félgömb belseje (félkör + ellipszis alsó fele együtt adja a térbeli félgömb kontúrját) */}
      <path
        d="M 100 130 A 100 100 0 0 1 300 130 Z"
        fill={fill}
        stroke="#1e40af"
        strokeWidth="2"
      />
      {/* Alsó ellipszis (alapkör perspektívában) */}
      <ellipse
        cx="200"
        cy="130"
        rx="100"
        ry="24"
        fill={fill}
        fillOpacity={step >= 2 ? 0.8 : 0}
        stroke="#1e40af"
        strokeWidth="2"
      />
      {/* Ellipszis hátsó íve szaggatva (a belső térbeliség érzékeltetésére) */}
      <path
        d="M 100 130 A 100 24 0 0 1 300 130"
        fill="none"
        stroke="#1e40af"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      {/* Középpont */}
      <circle cx="200" cy="130" r="3" fill="#1e3a8a" />
      <text x="206" y="126" fontSize="13" fill="#1e3a8a">O</text>

      {/* Sugár jelölés step >= 1 esetén */}
      {step >= 1 && (
        <g>
          <line x1="200" y1="130" x2="300" y2="130" stroke="#dc2626" strokeWidth="2" />
          <text x="248" y="122" fontSize="14" fontWeight="bold" fill="#dc2626">
            r = 3 cm
          </text>
        </g>
      )}

      {/* Végeredmény felirata step 2 esetén */}
      {step >= 2 && (
        <text x="200" y="215" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#065f46">
          V ≈ 56,5 cm³
        </text>
      )}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Hány köbcentiméter egy $3$ cm sugarú **félgömb** térfogata?

Válaszát egy tizedesjegyre kerekítve adja meg!`,
  figure: () => <HemisphereFigure step={1} />,
  asked: [{ key: 'V', label: '$V = ?$ cm³' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A teljes gömb térfogatának kiszámítása',
      points: 1,
      body: `A gömb térfogatának képlete (függvénytáblázat, 77. oldal):

$$V_{\\text{gömb}} = \\frac{4}{3} r^3 \\pi$$

Itt a **mögöttes elv**: a gömb térfogata a sugár köbével arányos, az arányossági tényező $\\tfrac{4}{3}\\pi$.

Helyettesítsük be $r = 3$ cm-t:

$$V_{\\text{gömb}} = \\frac{4}{3} \\cdot 3^3 \\cdot \\pi = \\frac{4}{3} \\cdot 27 \\cdot \\pi = 36\\pi \\ \\text{cm}^3.$$

Ez a teljes gömb térfogata.`,
      figure: () => <HemisphereFigure step={1} />,
    },
    {
      title: '2. lépés — A félgömb térfogata és kerekítés',
      points: 1,
      body: `A **félgömb** térfogata a teljes gömb térfogatának a **fele** (hiszen egy síkkal pontosan középen elvágva két egybevágó félgömböt kapunk):

$$V = \\frac{1}{2} \\cdot V_{\\text{gömb}} = \\frac{1}{2} \\cdot 36\\pi = 18\\pi \\ \\text{cm}^3.$$

Számszerűen ($\\pi \\approx 3{,}14159$):

$$V = 18\\pi \\approx 18 \\cdot 3{,}14159 \\approx 56{,}5487 \\ \\text{cm}^3.$$

Egy tizedesjegyre kerekítve: $V \\approx 56{,}5$ cm³.`,
      figure: () => <HemisphereFigure step={2} />,
    },
  ],
  finalAnswer: {
    V: '$V = 18\\pi \\approx 56{,}5$ cm³',
  },
  usedFormulas: [
    'Gömb térfogata: $V_{gomb} = \\tfrac{4}{3} r^3 \\pi$',
    'Félgömb térfogata: $V_{1/2} = \\tfrac{2}{3} r^3 \\pi$',
  ],
};

export default { meta, problem, solution };
