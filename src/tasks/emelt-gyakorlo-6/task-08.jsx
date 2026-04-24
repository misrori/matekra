import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-6-08',
  year: 2024,
  session: 'emelt gyakorló · 6. teszt',
  level: 'emelt',
  part: 'II',
  number: 8,
  title: 'Lakáshitel-törlesztés — mértani sorozat és annuitás',
  points: 16,
  topics: ['exponenciális', 'mértani sorozat', 'százalékszámítás'],
  difficulty: 4,
  fgvt: [
    { page: 35, note: 'mértani sorozat összege' },
    { page: 36, note: 'kamatos kamat, annuitás' },
  ],
  estimatedMinutes: 24,
  check: { type: 'list', value: ['A≈101 258 Ft', 'össz≈18 226 500', 'kamat≈6 226 500'] },
};

// Adott:
//   K = 12 000 000 Ft (hitelösszeg)
//   havi kamatláb r = 0,5% = 0,005 (havi szinten)
//   futamidő n = 180 hónap (15 év)
//   a végi (azaz minden hónap végén) egyenlő törlesztőrészlet A
// Annuitás képlete (mértani sorozat összegéből levezethető):
//   A = K · r · (1+r)^n / ((1+r)^n − 1)
// (1+r)^n = 1,005^180 ≈ 2,4541 (pontosabban: 2,4540936...)
// A = 12 000 000 · 0,005 · 2,4540936 / (2,4540936 − 1)
//   = 60 000 · 2,4540936 / 1,4540936
//   = 147 245,6 / 1,4540936
//   ≈ 101 257,7 Ft  (≈ 101 258 Ft kerekítve)
// Visszafizetés össz = 180 · 101 258 ≈ 18 226 440 Ft (kerekítve: 18 226 440; pontosabban 18 226 386 Ft)
// Kamatteher = visszafizetés − tőke ≈ 6 226 386 Ft

function AnnuityDiagram() {
  // idővonal 180 hónap, havi törlesztés egyforma rés
  return (
    <SvgCanvas width={540} height={200} viewBox="0 0 540 200">
      <rect x="20" y="20" width="500" height="160" fill="#f9fafb" stroke="#374151" strokeWidth="1" rx="6" />
      <text x="270" y="46" fontSize="15" fontWeight="700" textAnchor="middle" fill="#111827">
        Annuitásos törlesztés — idővonal
      </text>
      <line x1={60} y1={120} x2={500} y2={120} stroke="#1e40af" strokeWidth="2" />
      {[0, 1, 2, 3, 178, 179, 180].map((k, i) => {
        const cx = k <= 3 ? 60 + k * 36 : k === 178 ? 440 : k === 179 ? 470 : 500;
        return (
          <g key={i}>
            <line x1={cx} y1={116} x2={cx} y2={124} stroke="#1e40af" strokeWidth="2" />
            <text x={cx} y={108} fontSize="11" textAnchor="middle" fill="#1e40af" fontWeight="700">
              {k === 0 ? '0' : `${k}. hó`}
            </text>
            {k !== 0 && (
              <text x={cx} y={144} fontSize="11" textAnchor="middle" fill="#b91c1c" fontWeight="700">
                A
              </text>
            )}
          </g>
        );
      })}
      {/* pont-pont */}
      <text x={395} y={124} fontSize="16" fontWeight="700" fill="#374151">...</text>
      <text x={60} y={164} fontSize="12" fill="#374151" textAnchor="middle">
        K = 12 000 000 Ft (felvétel)
      </text>
      <text x={270} y={164} fontSize="12" fill="#374151" textAnchor="middle">
        havi kamatláb r = 0,5% | n = 180 hónap
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy család **lakáshitelt** vett fel: a hitelösszeg $K = 12\\,000\\,000$ Ft, a **havi kamatláb** $r = 0{,}5\\%$ (kamatos kamat, havi tőkésítés), a futamidő $n = 180$ hónap ($15$ év). A hitelt havi, **egyforma** törlesztőrészletekkel fizetik vissza (minden hónap végén). Az utolsó törlesztéssel a hitel pontosan megszűnik.

**a)** Vezesse le — a mértani sorozat összegképletéből — az annuitás-képletet, majd számítsa ki a havi részletet (**$A$**) Ft-ban, egészre kerekítve! ($9$ pont)

**b)** Mennyi a **teljes visszafizetendő** összeg? ($3$ pont)

**c)** Mekkora a **kamatteher** (a ténylegesen kifizetett kamatok összege)? ($4$ pont)`,
  figure: () => <AnnuityDiagram />,
  asked: [
    { key: 'a', label: 'a) havi részlet $A \\approx ?$ Ft' },
    { key: 'b', label: 'b) összes visszafizetés ≈ ? Ft' },
    { key: 'c', label: 'c) kamatteher ≈ ? Ft' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A hitel dinamikája',
      points: 2,
      body: `Jelöljük $K_0 = K = 12\\,000\\,000$ Ft a kezdő tőkét, $q = 1 + r = 1{,}005$ a havi kamatszorzót és $A$ a keresett havi törlesztést.

A $k$-adik hónap végén (a kamatfizetés után, de a törlesztés előtt) a fennmaradó tőke:

$$K_k = K_{k-1} \\cdot q - A.$$

Az utolsó részlet után: $K_n = 0$.`,
    },
    {
      title: 'a/2. lépés — Iteráció és mértani sorozat',
      points: 3,
      body: `Gördítsük ki a képletet:

$$K_1 = K q - A,$$
$$K_2 = K q^2 - A q - A,$$
$$\\ \\vdots$$
$$K_n = K q^n - A \\left(q^{n-1} + q^{n-2} + \\dots + q + 1\\right).$$

A zárójelben **mértani sorozat összege**, $n$ tag, hányados $q$:

$$q^{n-1} + q^{n-2} + \\dots + 1 = \\dfrac{q^n - 1}{q - 1}.$$

A $K_n = 0$ feltétel:

$$K q^n = A \\cdot \\dfrac{q^n - 1}{q - 1} \\;\\Longrightarrow\\; A = K \\cdot \\dfrac{q^n \\cdot (q - 1)}{q^n - 1} = K \\cdot r \\cdot \\dfrac{q^n}{q^n - 1}.$$

Mivel $q - 1 = r$. Ez az **annuitás-képlet**.`,
    },
    {
      title: 'a/3. lépés — $q^n$ kiszámítása',
      points: 2,
      body: `$q^n = 1{,}005^{180}$. Logaritmussal:

$$\\lg q^n = 180 \\cdot \\lg 1{,}005 \\approx 180 \\cdot 0{,}00216606 \\approx 0{,}389891.$$

$$q^n \\approx 10^{0{,}389891} \\approx 2{,}45409.$$`,
    },
    {
      title: 'a/4. lépés — $A$ kiszámítása',
      points: 2,
      body: `Az annuitás-képletbe:

$$A = 12\\,000\\,000 \\cdot 0{,}005 \\cdot \\dfrac{2{,}45409}{2{,}45409 - 1}.$$

Nevező: $2{,}45409 - 1 = 1{,}45409$.

Számláló: $12\\,000\\,000 \\cdot 0{,}005 \\cdot 2{,}45409 = 60\\,000 \\cdot 2{,}45409 = 147\\,245{,}4$.

$$A \\approx \\dfrac{147\\,245{,}4}{1{,}45409} \\approx 101\\,257{,}7 \\text{ Ft}.$$

Egészre kerekítve: $\\boxed{A \\approx 101\\,258 \\text{ Ft}}$ havonta.`,
    },
    {
      title: 'b) lépés — Teljes visszafizetés',
      points: 3,
      body: `$180$ egyenlő részletet fizetnek:

$$T = 180 \\cdot A \\approx 180 \\cdot 101\\,258 = 18\\,226\\,440 \\text{ Ft}.$$

(A pontosabb számítás $A \\approx 101\\,257{,}7$-tel $T \\approx 18\\,226\\,386$ Ft, a kerekítéstől függ; kb. $18{,}23$ millió Ft.)`,
    },
    {
      title: 'c/1. lépés — Kamatteher',
      points: 3,
      body: `A ténylegesen kifizetett **kamatteher** a teljes visszafizetés és az eredeti tőke különbsége:

$$\\text{Kamat} = T - K \\approx 18\\,226\\,440 - 12\\,000\\,000 = 6\\,226\\,440 \\text{ Ft}.$$`,
    },
    {
      title: 'c/2. lépés — Értelmezés',
      points: 1,
      body: `A $15$ éves futamidő és $0{,}5\\%$ havi kamat mellett a kamatteher **kb. a tőke $52\\%$-a**:

$$\\dfrac{6\\,226\\,440}{12\\,000\\,000} \\approx 0{,}519 = 51{,}9\\%.$$

Ha a futamidő hosszabb volna, a kamatteher arányosan még nagyobb lenne — ez jól szemlélteti a kamatos kamat erejét.`,
    },
  ],
  finalAnswer: {
    a: 'havi részlet: $A \\approx 101\\,258$ Ft',
    b: 'teljes visszafizetés: $T \\approx 18\\,226\\,440$ Ft',
    c: 'kamatteher: kb. $6\\,226\\,440$ Ft (a tőke kb. $52\\%$-a)',
  },
  usedFormulas: [
    'mértani sorozat összege: $S_n = a_1 \\cdot (q^n - 1)/(q - 1)$',
    'annuitás-képlet: $A = K \\cdot r \\cdot q^n / (q^n - 1)$',
    'kamatos kamat: $q = 1 + r$, $q^n$ szorzó $n$ idő alatt',
  ],
};

export default { meta, problem, solution };
