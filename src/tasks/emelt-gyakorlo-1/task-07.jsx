import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-1-07',
  year: 2024,
  session: 'emelt gyakorló · 1. teszt',
  level: 'emelt',
  part: 'II',
  number: 7,
  title: 'Valószínűség — binomiális eloszlás és feltételes valószínűség',
  points: 16,
  topics: ['valószínűség'],
  difficulty: 4,
  fgvt: [
    { page: 92, note: 'klasszikus valószínűség' },
    { page: 94, note: 'binomiális eloszlás' },
  ],
  estimatedMinutes: 22,
};

/*
  Saját szöveg: minőség-ellenőr szalagon érkező csomagolt termékek hibaaránya p = 0,10.
  Véletlenül kiválasztunk n = 8 csomagot egymástól függetlenül.

  a) (3 pt) P(pontosan 2 selejtes) = C(8,2) * 0.1^2 * 0.9^6
     C(8,2) = 28
     = 28 * 0.01 * 0.531441
     = 28 * 0.00531441
     = 0.14880348  ≈ 0.1488  -> 14.88%
  b) (3 pt) P(legalább 1 selejtes) = 1 - 0.9^8
     0.9^8 = 0.43046721 -> 1 - 0.4305 = 0.5695 ≈ 56.95%
  c) (3 pt) Várható érték: E(X) = np = 0.8
     Szórás: sqrt(np(1-p)) = sqrt(8 * 0.1 * 0.9) = sqrt(0.72) ≈ 0.848
  d) (4 pt) Feltételes: annak a valószínűsége, hogy pontosan 2 selejtes, feltéve, hogy legalább 1.
     P(X=2 | X>=1) = P(X=2)/P(X>=1) = 0.1488 / 0.5695 ≈ 0.2613 ≈ 26.13%
  e) (3 pt) Bayes-típusú: adott egy csomag, amely egy véletlen üzem (A vagy B) terméke.
     A üzem selejtaránya 5%, B-é 15%. A üzem gyártja a csomagok 60%-át, B 40%-át.
     Véletlenül kiválasztott csomag selejtes. Mi a valószínűsége, hogy A üzemből származik?
     P(selejt) = 0.6*0.05 + 0.4*0.15 = 0.03 + 0.06 = 0.09
     P(A | selejt) = 0.6 * 0.05 / 0.09 = 0.03 / 0.09 = 1/3 ≈ 33.33%
*/

function Binomial() {
  // P(X=k) k=0..8 bar chart, n=8, p=0.1
  const n = 8, p = 0.1;
  const comb = (n, k) => {
    let res = 1;
    for (let i = 0; i < k; i++) res = (res * (n - i)) / (i + 1);
    return res;
  };
  const probs = [];
  for (let k = 0; k <= n; k++) {
    probs.push(comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k));
  }
  const x0 = 60, y0 = 20, w = 400, h = 250;
  const barW = w / (n + 1) - 6;
  const yMax = 0.5;
  return (
    <SvgCanvas width={520} height={340} viewBox="0 0 520 340">
      {/* Tengelyek — kézzel, mert kategorikus */}
      <line x1={x0} y1={y0 + h} x2={x0 + w} y2={y0 + h} stroke="#111" strokeWidth="1.5" />
      <line x1={x0} y1={y0} x2={x0} y2={y0 + h} stroke="#111" strokeWidth="1.5" />
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((t, i) => (
        <g key={i}>
          <line x1={x0 - 4} y1={y0 + h - (t / yMax) * h} x2={x0} y2={y0 + h - (t / yMax) * h} stroke="#111" />
          <text x={x0 - 8} y={y0 + h - (t / yMax) * h + 4} fontSize="11" textAnchor="end" fill="#444">{t.toFixed(1)}</text>
        </g>
      ))}
      {probs.map((pk, k) => {
        const xb = x0 + 10 + k * (w / (n + 1));
        const bh = (pk / yMax) * h;
        const yTop = y0 + h - bh;
        const isK2 = k === 2;
        return (
          <g key={k}>
            <rect x={xb} y={yTop} width={barW} height={bh} fill={isK2 ? '#dc2626' : '#1d4ed8'} fillOpacity={isK2 ? 0.85 : 0.7} />
            <text x={xb + barW / 2} y={y0 + h + 16} fontSize="12" fill="#111" textAnchor="middle">{k}</text>
            <text x={xb + barW / 2} y={yTop - 4} fontSize="10" fill="#444" textAnchor="middle">{(pk * 100).toFixed(1)}%</text>
          </g>
        );
      })}
      <text x="260" y="16" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        B(n=8, p=0,1): P(X = k)
      </text>
      <text x={x0 + w / 2} y={y0 + h + 34} fontSize="12" fill="#444" textAnchor="middle">k (selejtes termékek száma a 8-ból)</text>
    </SvgCanvas>
  );
}

function TreeDiagram() {
  // Diagram: A(60%) -> selejt(5%) / ép(95%), B(40%) -> selejt(15%) / ép(85%)
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <text x="260" y="22" fontSize="13" fontWeight="bold" fill="#111" textAnchor="middle">
        Faábra — két üzem és a selejtarányok
      </text>
      {/* Start */}
      <circle cx="70" cy="150" r="14" fill="#e5e7eb" stroke="#111" />
      <text x="70" y="154" fontSize="12" fill="#111" textAnchor="middle">start</text>
      {/* A és B csomópontok */}
      <line x1="84" y1="140" x2="196" y2="80" stroke="#1d4ed8" strokeWidth="1.8" />
      <line x1="84" y1="160" x2="196" y2="220" stroke="#9333ea" strokeWidth="1.8" />
      <text x="130" y="102" fontSize="12" fill="#1d4ed8" fontWeight="bold">0,6</text>
      <text x="130" y="200" fontSize="12" fill="#9333ea" fontWeight="bold">0,4</text>
      <circle cx="210" cy="80" r="16" fill="#dbeafe" stroke="#1d4ed8" />
      <text x="210" y="85" fontSize="13" fill="#1d4ed8" fontWeight="bold" textAnchor="middle">A</text>
      <circle cx="210" cy="220" r="16" fill="#ede9fe" stroke="#9333ea" />
      <text x="210" y="225" fontSize="13" fill="#9333ea" fontWeight="bold" textAnchor="middle">B</text>

      {/* A selejt, A ép */}
      <line x1="226" y1="72" x2="360" y2="40" stroke="#dc2626" strokeWidth="1.6" />
      <line x1="226" y1="88" x2="360" y2="120" stroke="#16a34a" strokeWidth="1.6" />
      <text x="286" y="52" fontSize="11" fill="#dc2626">0,05</text>
      <text x="286" y="112" fontSize="11" fill="#16a34a">0,95</text>
      <text x="380" y="42" fontSize="12" fill="#dc2626">A ∧ selejt (0,03)</text>
      <text x="380" y="122" fontSize="12" fill="#16a34a">A ∧ ép</text>

      <line x1="226" y1="212" x2="360" y2="180" stroke="#dc2626" strokeWidth="1.6" />
      <line x1="226" y1="228" x2="360" y2="260" stroke="#16a34a" strokeWidth="1.6" />
      <text x="286" y="192" fontSize="11" fill="#dc2626">0,15</text>
      <text x="286" y="252" fontSize="11" fill="#16a34a">0,85</text>
      <text x="380" y="182" fontSize="12" fill="#dc2626">B ∧ selejt (0,06)</text>
      <text x="380" y="262" fontSize="12" fill="#16a34a">B ∧ ép</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy gyár üvegcsomagokat állít elő. A **szalagon** érkező csomagok közül egy-egy, egymástól **függetlenül**, $p = 0{,}10$ valószínűséggel **selejtes** (azaz a „jó" tétel valószínűsége $0{,}9$). Kiválasztunk a szalagról $n = 8$ csomagot. Jelölje $X$ a kiválasztott $8$ között a selejtesek számát.

**a)** Mi a valószínűsége, hogy a $8$ között **pontosan 2** lesz selejtes? ($3$ pont)

**b)** Mi a valószínűsége, hogy **legalább 1** selejtes van köztük? ($3$ pont)

**c)** Számítsa ki $X$ **várható értékét** és **szórását**. ($3$ pont)

**d)** Feltéve, hogy legalább 1 selejtes volt, mi a valószínűsége, hogy **pontosan 2** volt selejtes? ($3$ pont)

**e)** Egy másik mérés: a gyár **A** és **B** üzeméből érkeznek csomagok az „A"-ból $60\\%$-ban, „B"-ből $40\\%$-ban. Az „A" selejtaránya $5\\%$, a „B"-é $15\\%$. Véletlenül kiválasztott csomag **selejtes**. Mi a valószínűsége, hogy ez a csomag az **A** üzemből származik? ($4$ pont)

Az eredményeket két tizedesjegyre kerekítve (százalékban) is adja meg.`,
  figure: () => <Binomial />,
  asked: [
    { key: 'a', label: 'a) $P(X=2)$' },
    { key: 'b', label: 'b) $P(X\\geq 1)$' },
    { key: 'c', label: 'c) $E(X),\\ D(X)$' },
    { key: 'd', label: 'd) $P(X=2 \\mid X\\geq 1)$' },
    { key: 'e', label: 'e) $P(A \\mid \\text{selejt})$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'Az eloszlás azonosítása',
      points: 1,
      body: `$X$ a selejtesek száma 8 független, azonos $p = 0{,}1$ valószínűségű kísérletből. Tehát $X \\sim \\mathcal{B}(n=8;\\ p=0{,}1)$ — **binomiális** eloszlás.

$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad k = 0, 1, \\dots, 8.$$`,
      figure: () => <Binomial />,
    },
    {
      title: 'a) lépés — $P(X = 2)$',
      points: 2,
      body: `$\\binom{8}{2} = 28$, $p^2 = 0{,}01$, $(1-p)^6 = 0{,}9^6$.

$0{,}9^2 = 0{,}81$, $0{,}9^4 = 0{,}6561$, $0{,}9^6 = 0{,}531441$.

$$P(X = 2) = 28 \\cdot 0{,}01 \\cdot 0{,}531441 = 28 \\cdot 0{,}00531441 \\approx 0{,}148803.$$

$$\\boxed{P(X=2) \\approx 0{,}1488 \\approx 14{,}88\\%.}$$`,
    },
    {
      title: 'b) lépés — $P(X \\geq 1)$',
      points: 3,
      body: `Ügyes trükk: a komplementer eseményt számoljuk.

$$P(X \\geq 1) = 1 - P(X = 0) = 1 - (1-p)^8 = 1 - 0{,}9^8.$$

$0{,}9^8 = (0{,}9^4)^2 = 0{,}6561^2 = 0{,}43046721.$

$$P(X \\geq 1) = 1 - 0{,}43046721 \\approx 0{,}5695.$$

$$\\boxed{P(X \\geq 1) \\approx 0{,}5695 \\approx 56{,}95\\%.}$$`,
    },
    {
      title: 'c) 1. lépés — Várható érték',
      points: 1,
      body: `Binomiális eloszlás esetén:

$$E(X) = n p = 8 \\cdot 0{,}1 = 0{,}8.$$`,
    },
    {
      title: 'c) 2. lépés — Szórás',
      points: 2,
      body: `$$D(X) = \\sqrt{n p (1-p)} = \\sqrt{8 \\cdot 0{,}1 \\cdot 0{,}9} = \\sqrt{0{,}72} \\approx 0{,}8485.$$

$$\\boxed{E(X) = 0{,}8, \\quad D(X) \\approx 0{,}85.}$$

**Értelmezés:** átlagosan $0{,}8$ selejtes csomag van a 8 között, és ettől jellemzően $\\pm 0{,}85$-nyi eltéréssel lehet találkozni.`,
    },
    {
      title: 'd) lépés — Feltételes valószínűség',
      points: 3,
      body: `A feltételes valószínűség definíciója:

$$P(X = 2 \\mid X \\geq 1) = \\dfrac{P(\\{X = 2\\} \\cap \\{X \\geq 1\\})}{P(X \\geq 1)}.$$

Mivel $\\{X = 2\\} \\subset \\{X \\geq 1\\}$, a metszet $\\{X = 2\\}$, tehát:

$$P(X = 2 \\mid X \\geq 1) = \\dfrac{P(X = 2)}{P(X \\geq 1)} = \\dfrac{0{,}1488}{0{,}5695} \\approx 0{,}2613.$$

$$\\boxed{P(X = 2 \\mid X \\geq 1) \\approx 0{,}2613 \\approx 26{,}13\\%.}$$`,
    },
    {
      title: 'e) 1. lépés — A fa-diagram és a teljes valószínűség',
      points: 1,
      body: `Jelölje $A, B$ az üzemet, $S$ a „selejt" eseményt.

Adott: $P(A) = 0{,}6$, $P(B) = 0{,}4$, $P(S \\mid A) = 0{,}05$, $P(S \\mid B) = 0{,}15$.

A **teljes valószínűség** tétele szerint:

$$P(S) = P(A) P(S \\mid A) + P(B) P(S \\mid B).$$`,
      figure: () => <TreeDiagram />,
    },
    {
      title: 'e) 2. lépés — A teljes selejt-valószínűség',
      points: 1,
      body: `$$P(S) = 0{,}6 \\cdot 0{,}05 + 0{,}4 \\cdot 0{,}15 = 0{,}03 + 0{,}06 = 0{,}09.$$`,
    },
    {
      title: 'e) 3. lépés — Bayes-tétel alkalmazása',
      points: 2,
      body: `$$P(A \\mid S) = \\dfrac{P(A) \\cdot P(S \\mid A)}{P(S)} = \\dfrac{0{,}6 \\cdot 0{,}05}{0{,}09} = \\dfrac{0{,}03}{0{,}09} = \\dfrac{1}{3}.$$

$$\\boxed{P(A \\mid S) = \\dfrac{1}{3} \\approx 0{,}3333 \\approx 33{,}33\\%.}$$

**Ellenőrzés:** $P(B \\mid S) = \\dfrac{0{,}06}{0{,}09} = \\dfrac{2}{3}$; összeg: $\\frac{1}{3} + \\frac{2}{3} = 1$ ✓.`,
    },
  ],
  finalAnswer: {
    a: '$P(X=2) \\approx 14{,}88\\%$',
    b: '$P(X\\geq 1) \\approx 56{,}95\\%$',
    c: '$E(X) = 0{,}8;\\ D(X) \\approx 0{,}85$',
    d: '$\\approx 26{,}13\\%$',
    e: '$P(A \\mid S) = 1/3 \\approx 33{,}33\\%$',
  },
  usedFormulas: [
    'binomiális eloszlás: $P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$',
    '$E(X) = np$, $D(X) = \\sqrt{np(1-p)}$',
    '$P(A|B) = P(A\\cap B)/P(B)$',
    'teljes valószínűség tétele',
    'Bayes-tétel',
  ],
};

export default { meta, problem, solution };
