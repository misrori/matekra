import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-1-07',
  year: 2024,
  session: 'gyakorló · 1. teszt',
  level: 'közép',
  part: 'I',
  number: 7,
  title: 'Gömb alakú dísz térfogata',
  points: 2,
  topics: ['térgeometria'],
  difficulty: 2,
  fgvt: [{ page: 77, note: 'gömb térfogata' }],
  estimatedMinutes: 3,
};

function Sphere() {
  return (
    <SvgCanvas width={360} height={280} viewBox="0 0 360 280">
      <defs>
        <radialGradient id="grad-gy107" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="140" r="100" fill="url(#grad-gy107)" stroke="#1e3a8a" strokeWidth="2" />
      {/* ekvátor-ellipszis (elől) */}
      <ellipse cx="180" cy="140" rx="100" ry="22" fill="none" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* sugár */}
      <line x1="180" y1="140" x2="280" y2="140" stroke="#dc2626" strokeWidth="2" />
      <text x="220" y="132" fontSize="14" fontWeight="bold" fill="#dc2626">r = 5 cm</text>
      <circle cx="180" cy="140" r="3" fill="#111" />
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy karácsonyfára szánt gömb alakú üvegdísz **sugara** $r = 5$ cm.

Mekkora a dísz térfogata? Az eredményt két tizedesjegyre kerekítve adja meg!`,
  figure: () => <Sphere />,
  asked: [{ key: 'V', label: '$V = ?$ cm³' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A gömb térfogatának képlete',
      points: 0.5,
      body: `A gömb térfogata (fgv. tábla 77. old.):

$$V = \\dfrac{4}{3} r^3 \\pi.$$

A képletben $r$ a gömb sugara.`,
    },
    {
      title: '2. lépés — Behelyettesítés és számítás',
      points: 1,
      body: `$r = 5$ cm, így:

$$r^3 = 5^3 = 125 \\ \\text{cm}^3.$$

Innen:

$$V = \\dfrac{4}{3} \\cdot 125 \\cdot \\pi = \\dfrac{500 \\pi}{3} \\ \\text{cm}^3.$$`,
    },
    {
      title: '3. lépés — Közelítés és eredmény',
      points: 0.5,
      body: `Használjuk $\\pi \\approx 3{,}14159$ értékét:

$$V \\approx \\dfrac{500 \\cdot 3{,}14159}{3} \\approx \\dfrac{1\\,570{,}80}{3} \\approx 523{,}60 \\ \\text{cm}^3.$$

Tehát $V \\approx 523{,}60$ cm³.`,
    },
  ],
  finalAnswer: {
    V: '$V = \\dfrac{500 \\pi}{3} \\approx 523{,}60$ cm³',
  },
  usedFormulas: ['gömb térfogata: $V = \\dfrac{4}{3} r^3 \\pi$'],
};

export default { meta, problem, solution };
