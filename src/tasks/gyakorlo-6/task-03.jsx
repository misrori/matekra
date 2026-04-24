import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-6-03',
  year: 2024,
  session: 'gyakorló · 6. teszt',
  level: 'közép',
  part: 'I',
  number: 3,
  title: 'Hatvány egyszerűsítése',
  points: 2,
  topics: ['hatvány'],
  difficulty: 2,
  fgvt: [{ page: 22, note: 'hatvány azonosságai' }],
  estimatedMinutes: 3,
  check: { type: 'number', value: 8 },
};

// Egyszerűsítsd:  (2^5 · 2^{-2}) / (2^0)  = 2^{5-2-0} = 2^3 = 8.
// Legyen kihívósabb: (3^4 · 9^{-1}) / 3^0 = 3^4 · 3^{-2} / 1 = 3^{4-2} = 3^2 = 9. Jó de kérjünk 8-at → használjuk a 2^3 = 8-at különböző formák.
// Kihívásosabb: (4^3 · 2^{-3}) / 8^0 = (2^2)^3 · 2^{-3} / 1 = 2^6 · 2^{-3} = 2^3 = 8.

function PowerFigure({ step = 0 }) {
  return (
    <SvgCanvas width={540} height={240} viewBox="0 0 540 240">
      <text x="270" y="28" fontSize="14" fontWeight="700" textAnchor="middle" fill="#111827">
        Hatványok egyszerűsítése
      </text>
      <rect x="30" y="50" width="480" height="40" rx="6" fill={step >= 0 ? '#dbeafe' : '#f3f4f6'} stroke="#1e40af" />
      <text x="270" y="75" fontSize="14" textAnchor="middle" fill="#111827">4³ = (2²)³ = 2⁶, és 8⁰ = 1</text>
      <rect x="30" y="100" width="480" height="40" rx="6" fill={step >= 1 ? '#dcfce7' : '#f3f4f6'} stroke="#166534" />
      <text x="270" y="125" fontSize="14" textAnchor="middle" fill="#111827">2⁶ · 2⁻³ = 2^(6−3) = 2³</text>
      <rect x="30" y="150" width="480" height="40" rx="6" fill={step >= 2 ? '#fde68a' : '#f3f4f6'} stroke="#b45309" />
      <text x="270" y="175" fontSize="14" textAnchor="middle" fill="#111827">2³ = 8</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egyszerűsítse a következő kifejezést, és adja meg a végeredményt egész szám alakjában!

$$\\dfrac{4^3 \\cdot 2^{-3}}{8^0}$$`,
  figure: () => <PowerFigure />,
  asked: [{ key: 'E', label: 'Eredmény $= ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Az alapok közös alapra hozása',
      points: 1,
      body: `Minden tagot írjunk $2$ hatványaként:

$$4 = 2^2 \\Longrightarrow 4^3 = (2^2)^3 = 2^{6}.$$

$$8^0 = 1 \\quad (\\text{bármely nem nulla szám } 0. \\text{ hatványa } 1).$$

A tört tehát:

$$\\dfrac{2^6 \\cdot 2^{-3}}{1} = 2^6 \\cdot 2^{-3}.$$`,
      figure: () => <PowerFigure step={0} />,
    },
    {
      title: '2. lépés — A hatványozás azonosságai',
      points: 1,
      body: `Azonos alap szorzata: a kitevők összeadódnak.

$$2^6 \\cdot 2^{-3} = 2^{6 + (-3)} = 2^{3} = 8.$$`,
      figure: () => <PowerFigure step={2} />,
    },
  ],
  finalAnswer: { E: '$8$' },
  usedFormulas: [
    '$(a^n)^m = a^{nm}$',
    '$a^n \\cdot a^m = a^{n+m}$',
    '$a^0 = 1$ (ha $a \\neq 0$)',
  ],
};

export default { meta, problem, solution };
