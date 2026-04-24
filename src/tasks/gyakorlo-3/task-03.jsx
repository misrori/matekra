import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-3-03',
  year: 2024,
  session: 'gyakorló · 3. teszt',
  level: 'közép',
  part: 'I',
  number: 3,
  title: 'Hatvány-kifejezés egyszerűsítése',
  points: 2,
  topics: ['hatvány'],
  difficulty: 2,
  fgvt: [{ page: 22, note: 'hatvány azonosságai' }],
  estimatedMinutes: 3,
};

function RuleStack() {
  return (
    <SvgCanvas width={520} height={220} viewBox="0 0 520 220">
      <text x="260" y="24" fontSize="15" fontWeight="700" textAnchor="middle" fill="#111827">
        Felhasznált hatványazonosságok
      </text>
      <g>
        <rect x="30" y="44" width="210" height="54" rx="6" fill="#dbeafe" stroke="#1e40af" />
        <text x="135" y="64" fontSize="13" fontWeight="700" textAnchor="middle" fill="#1e40af">Szorzás</text>
        <text x="135" y="88" fontSize="15" textAnchor="middle" fill="#111827">aⁿ · aᵐ = aⁿ⁺ᵐ</text>
      </g>
      <g>
        <rect x="280" y="44" width="210" height="54" rx="6" fill="#dcfce7" stroke="#166534" />
        <text x="385" y="64" fontSize="13" fontWeight="700" textAnchor="middle" fill="#166534">Osztás</text>
        <text x="385" y="88" fontSize="15" textAnchor="middle" fill="#111827">aⁿ / aᵐ = aⁿ⁻ᵐ</text>
      </g>
      <g>
        <rect x="30" y="118" width="210" height="54" rx="6" fill="#fef3c7" stroke="#b45309" />
        <text x="135" y="138" fontSize="13" fontWeight="700" textAnchor="middle" fill="#b45309">Hatvány hatványa</text>
        <text x="135" y="162" fontSize="15" textAnchor="middle" fill="#111827">(aⁿ)ᵐ = aⁿ·ᵐ</text>
      </g>
      <g>
        <rect x="280" y="118" width="210" height="54" rx="6" fill="#fce7f3" stroke="#be185d" />
        <text x="385" y="138" fontSize="13" fontWeight="700" textAnchor="middle" fill="#be185d">Negatív kitevő</text>
        <text x="385" y="162" fontSize="15" textAnchor="middle" fill="#111827">a⁻ⁿ = 1 / aⁿ</text>
      </g>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egyszerűsítse a következő kifejezést, és adja meg hatványalakban, $a \\neq 0$ feltétellel:

$$\\dfrac{(a^4)^3 \\cdot a^{-5}}{a^2}.$$

Megoldását részletezze!`,
  figure: () => <RuleStack />,
  asked: [{ key: 'result', label: 'Eredmény (hatvány formában): $?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A hatvány hatványának kifejtése',
      points: 1,
      body: `A **hatvány hatványa** azonosság szerint $(a^n)^m = a^{n \\cdot m}$, tehát:

$$(a^4)^3 = a^{4 \\cdot 3} = a^{12}.$$

A kifejezés így:

$$\\dfrac{a^{12} \\cdot a^{-5}}{a^2}.$$`,
      figure: () => <RuleStack />,
    },
    {
      title: '2. lépés — Szorzás és osztás a kitevőkkel',
      points: 1,
      body: `A számlálóban **szorzunk** azonos alapú hatványokat: $a^n \\cdot a^m = a^{n+m}$:

$$a^{12} \\cdot a^{-5} = a^{12 + (-5)} = a^{7}.$$

Majd az **osztásnál** $a^n / a^m = a^{n-m}$:

$$\\dfrac{a^{7}}{a^{2}} = a^{7 - 2} = a^{5}.$$

Tehát:

$$\\boxed{\\dfrac{(a^4)^3 \\cdot a^{-5}}{a^2} = a^{5}.}$$

**Ellenőrzés** $a = 2$-re: $(2^4)^3 = 16^3 = 4096$, $4096 \\cdot 2^{-5} = 4096/32 = 128$, $128/4 = 32 = 2^5$. ✓`,
      figure: () => <RuleStack />,
    },
  ],
  finalAnswer: { result: '$a^5$' },
  usedFormulas: [
    'hatvány hatványa: $(a^n)^m = a^{n\\cdot m}$',
    'szorzás: $a^n \\cdot a^m = a^{n+m}$',
    'osztás: $a^n / a^m = a^{n-m}$',
  ],
};

export default { meta, problem, solution };
