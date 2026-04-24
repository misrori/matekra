import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-04',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'I',
  number: 4,
  title: 'Kongruenciák és oszthatóság — maradékos osztás',
  points: 13,
  topics: ['számelmélet'],
  difficulty: 4,
  fgvt: [
    { page: 15, note: 'LNKO, LKKT' },
    { page: 16, note: 'kongruenciák' },
  ],
  estimatedMinutes: 15,
};

// a) Mi a 7^2024 utolsó jegye?
//    7^1 = 7, 7^2 = 49 → 9, 7^3 = 343 → 3, 7^4 = 2401 → 1. Periódus: 4 hosszú.
//    2024 mod 4 = 0 → 7^2024 ≡ 7^4 ≡ 1 (mod 10). Utolsó jegye: 1.
// b) Mennyi a 7^2024 maradéka 11-gyel osztva?
//    Kis Fermat: 7^10 ≡ 1 (mod 11).  2024 = 202·10 + 4 → 7^2024 ≡ 7^4 (mod 11).
//    7^2 = 49 = 4·11 + 5 → 49 ≡ 5 (mod 11).  7^4 ≡ 25 ≡ 3 (mod 11).  Maradék: 3.
// c) Bizonyítsa, hogy minden n ∈ N+ esetén n^5 - n osztható 30-nal.
//    n^5 - n = n(n^4 - 1) = n(n^2 - 1)(n^2 + 1) = n(n-1)(n+1)(n^2 + 1)
//    Három egymás utáni: n-1, n, n+1 → osztható 2-vel és 3-mal, így 6-tal.
//    5-tel: kis Fermat: n^5 ≡ n (mod 5) → n^5 - n ≡ 0 (mod 5).
//    lnko(6, 5) = 1 → 30 | (n^5 - n). QED.

function Diagram() {
  return (
    <SvgCanvas width={520} height={240} viewBox="0 0 520 240">
      <text x={260} y={30} fontSize="14" fontWeight="bold" fill="#111827" textAnchor="middle">
        7 hatványainak utolsó jegye — periodicitás (modulo 10)
      </text>
      {[
        { k: 1, v: 7, m: 7 },
        { k: 2, v: 49, m: 9 },
        { k: 3, v: 343, m: 3 },
        { k: 4, v: 2401, m: 1 },
        { k: 5, v: 16807, m: 7 },
        { k: 6, v: 117649, m: 9 },
      ].map((r, i) => (
        <g key={i}>
          <rect x={40 + i * 75} y={60} width={65} height={50} rx={6} fill={r.m === 1 ? '#dcfce7' : '#e0e7ff'} stroke="#4f46e5" strokeWidth="1.3" />
          <text x={72.5 + i * 75} y={80} fontSize="12" textAnchor="middle" fill="#111">7^{r.k}</text>
          <text x={72.5 + i * 75} y={100} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">{r.v}</text>
          <text x={72.5 + i * 75} y={130} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
            → {r.m}
          </text>
        </g>
      ))}
      <text x={40} y={165} fontSize="13" fill="#374151">
        A <tspan fontWeight="bold">periódus 4</tspan>: {'{7, 9, 3, 1, 7, 9, 3, 1, …}'}.
      </text>
      <text x={40} y={190} fontSize="13" fill="#374151">
        2024 = 4 · 506, tehát 7^2024 utolsó jegye = 7^4 utolsó jegye = <tspan fontWeight="bold" fill="#15803d">1</tspan>.
      </text>
      <text x={40} y={214} fontSize="12" fill="#6b7280">
        Mod 11: kis Fermat-tétel miatt 7^10 ≡ 1 (mod 11), így 7^2024 ≡ 7^4 ≡ 3 (mod 11).
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `**a)** Mi a $7^{2024}$ szám utolsó (tízes helyi értékű) jegye? ($4$ pont)

**b)** Mennyi a $7^{2024}$ szám maradéka $11$-gyel osztva? ($4$ pont)

**c)** Bizonyítsa be, hogy minden $n$ pozitív egész szám esetén $n^5 - n$ osztható $30$-cal! ($5$ pont)`,
  figure: () => <Diagram />,
  asked: [
    { key: 'last', label: 'a) $7^{2024}$ utolsó jegye' },
    { key: 'mod11', label: 'b) $7^{2024} \\bmod 11$' },
    { key: 'proof', label: 'c) bizonyítás: $30 \\mid n^5 - n$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — $7$ hatványainak utolsó jegyei',
      points: 2,
      body: `Az utolsó jegy a **modulo $10$** maradékával egyezik. Számoljunk:

$$7^1 \\equiv 7,\\quad 7^2 = 49 \\equiv 9,\\quad 7^3 = 343 \\equiv 3,\\quad 7^4 = 2401 \\equiv 1 \\pmod{10}.$$

Mivel $7^4 \\equiv 1$, a további hatványok **4-hossz periodikusan** ismétlik ugyanezt a négy maradékot: $7, 9, 3, 1, 7, 9, 3, 1, \\ldots$`,
    },
    {
      title: 'a/2. lépés — $2024$ maradéka $4$-gyel osztva',
      points: 2,
      body: `$2024 = 4 \\cdot 506 + 0$, tehát $2024 \\equiv 0 \\pmod 4$.

Így
$$7^{2024} = (7^4)^{506} \\equiv 1^{506} = 1 \\pmod{10}.$$

Az utolsó jegy: **$1$**.`,
    },
    {
      title: 'b/1. lépés — Kis Fermat-tétel $p = 11$-re',
      points: 2,
      body: `A **kis Fermat-tétel** szerint ha $p$ prím és $\\mathrm{lnko}(a, p) = 1$, akkor
$$a^{p-1} \\equiv 1 \\pmod{p}.$$

$p = 11$ és $a = 7$ esetén $\\mathrm{lnko}(7, 11) = 1$, így
$$7^{10} \\equiv 1 \\pmod{11}.$$`,
    },
    {
      title: 'b/2. lépés — Kitevő redukálása $\\bmod 10$',
      points: 2,
      body: `$2024 = 10 \\cdot 202 + 4$, tehát $2024 \\equiv 4 \\pmod{10}$. Ezért

$$7^{2024} = (7^{10})^{202} \\cdot 7^4 \\equiv 1^{202} \\cdot 7^4 = 7^4 \\pmod{11}.$$

Számoljuk $7^4$-et modulo $11$-ben lépésenként:
- $7^2 = 49 = 4 \\cdot 11 + 5$, azaz $7^2 \\equiv 5 \\pmod{11}$,
- $7^4 = (7^2)^2 \\equiv 5^2 = 25 = 2\\cdot 11 + 3$, azaz $7^4 \\equiv 3 \\pmod{11}$.

Tehát $7^{2024} \\equiv \\boxed{3} \\pmod{11}$.`,
    },
    {
      title: 'c/1. lépés — $n^5 - n$ szorzattá alakítása',
      points: 2,
      body: `$$n^5 - n = n(n^4 - 1) = n(n^2 - 1)(n^2 + 1) = n(n-1)(n+1)(n^2 + 1).$$

Itt **három egymást követő egész szám** szerepel: $n-1$, $n$, $n+1$.`,
    },
    {
      title: 'c/2. lépés — Osztható $6$-tal',
      points: 2,
      body: `Három egymást követő egész szám közt:
- **legalább egy páros** (osztható $2$-vel),
- **pontosan egy osztható $3$-mal**.

Így a $(n-1) \\cdot n \\cdot (n+1)$ szorzat **osztható $2 \\cdot 3 = 6$-tal**, tehát $n^5 - n$ is.`,
    },
    {
      title: 'c/3. lépés — Osztható $5$-tel (kis Fermat)',
      points: 1,
      body: `A kis Fermat-tétel szerint minden $n$ egészre és $p = 5$ prímre:
$$n^5 \\equiv n \\pmod 5 \\iff 5 \\mid (n^5 - n).$$

(Ez igaz $n$-re akkor is, ha $5 \\mid n$, mert akkor mindkét oldal $\\equiv 0$.)`,
    },
    {
      title: 'c/4. lépés — Összevonás',
      points: 0,
      body: `$6 \\mid (n^5 - n)$ és $5 \\mid (n^5 - n)$, továbbá $\\mathrm{lnko}(6, 5) = 1$, ezért $6 \\cdot 5 = 30$ is osztja: **$30 \\mid n^5 - n$**. $\\quad \\square$

**Alternatív csoportosítás közvetlen ellenőrzéssel** (további elmélyítés): mivel $n^5 - n = n(n-1)(n+1)(n^2+1)$, és az $(n \\bmod 5) \\in \\{0,1,2,3,4\\}$ eseteket végigvéve mindig teljesül, hogy a szorzatnak valamelyik tényezője osztható $5$-tel.`,
    },
  ],
  finalAnswer: {
    last: 'Az utolsó jegy: $1$.',
    mod11: '$7^{2024} \\equiv 3 \\pmod{11}$, a maradék $3$.',
    proof: '$n^5 - n = n(n-1)(n+1)(n^2+1)$. Három egymást követő szám miatt osztható $6$-tal, a kis Fermat-tétel miatt $5$-tel is, így $30$-cal is.',
  },
  usedFormulas: [
    'modulo 10: utolsó jegy',
    'hatványmaradékok periodicitása',
    'kis Fermat-tétel: $a^{p-1} \\equiv 1 \\pmod p$',
    'egymást követő egészek oszthatósága',
  ],
};

export default { meta, problem, solution };
