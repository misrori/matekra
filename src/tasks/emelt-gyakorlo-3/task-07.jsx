import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-07',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'II',
  number: 7,
  title: 'Exponenciális csökkenés és logaritmikus inverze',
  points: 16,
  topics: ['exponenciális', 'logaritmus', 'függvények'],
  difficulty: 4,
  fgvt: [
    { page: 24, note: 'logaritmus' },
    { page: 43, note: 'exponenciális függvény' },
    { page: 44, note: 'logaritmus függvény' },
  ],
  estimatedMinutes: 22,
};

// Radioaktív bomlás modellje: m(t) = 80 · (1/2)^(t/T) ahol T a felezési idő
// a) A felezési idő T = 5,3 év (Co-60-szerű). T = 8 év (kényelmes egész)
//    Legyen T = 8 év, kezdeti tömeg m_0 = 80 gramm.
//    m(t) = 80 · (1/2)^(t/8)
//    Kérdés: m(12) = ? → 80 · 2^(-1.5) = 80 / 2·√2 ≈ 80 / 2.828 ≈ 28,28 g
// b) Fordítva: t = ? amikor m = 5 g
//    5 = 80 · (1/2)^(t/8) → (1/2)^(t/8) = 1/16 = (1/2)^4 → t/8 = 4 → t = 32 év
// c) Az inverz függvény: t-t m függvényében kifejezzük
//    m/80 = 2^(-t/8) → log2(m/80) = -t/8 → t = -8 log2(m/80) = 8 log2(80/m)

function DecayPlot({ showT12 = false, showT5 = false }) {
  const N = 100;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (40 * i) / N;
    const m = 80 * Math.pow(0.5, t / 8);
    pts.push({ t, m });
  }
  const sx = (v) => 50 + (v / 40) * 420;
  const sy = (v) => 30 + 240 - (v / 100) * 240;
  const polyline = pts.map((p) => `${sx(p.t)},${sy(p.m)}`).join(' ');

  return (
    <SvgCanvas width={520} height={320} viewBox="0 0 520 320">
      <Axes
        x={50} y={30} w={420} h={240}
        xMin={0} xMax={40} yMin={0} yMax={100}
        xStep={5} yStep={10}
        xLabel="t (év)" yLabel="m (g)"
        grid
      />
      <polyline points={polyline} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      {/* felezési időket jelző függőleges vonalak */}
      {[8, 16, 24, 32].map((T, i) => (
        <g key={T}>
          <line x1={sx(T)} y1={sy(0)} x2={sx(T)} y2={sy(80 / Math.pow(2, i + 1))} stroke="#94a3b8" strokeDasharray="3 2" />
          <circle cx={sx(T)} cy={sy(80 / Math.pow(2, i + 1))} r="4" fill="#16a34a" />
        </g>
      ))}

      {showT12 && (
        <g>
          <line x1={sx(12)} y1={sy(0)} x2={sx(12)} y2={sy(28.28)} stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
          <line x1={sx(0)} y1={sy(28.28)} x2={sx(12)} y2={sy(28.28)} stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx={sx(12)} cy={sy(28.28)} r="6" fill="#dc2626" />
          <text x={sx(12) + 8} y={sy(28.28) - 6} fontSize="12" fill="#dc2626" fontWeight="700">
            (12; ≈28,28)
          </text>
        </g>
      )}

      {showT5 && (
        <g>
          <line x1={sx(32)} y1={sy(0)} x2={sx(32)} y2={sy(5)} stroke="#9a3412" strokeWidth="2" strokeDasharray="3 3" />
          <line x1={sx(0)} y1={sy(5)} x2={sx(32)} y2={sy(5)} stroke="#9a3412" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx={sx(32)} cy={sy(5)} r="6" fill="#9a3412" />
          <text x={sx(32) - 60} y={sy(5) - 8} fontSize="12" fill="#9a3412" fontWeight="700">
            (32; 5)
          </text>
        </g>
      )}

      <text x={sx(26)} y={sy(70)} fontSize="14" fill="#1e3a8a" fontWeight="700">
        m(t) = 80 · (½)^(t/8)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Egy radioaktív izotóp tömege a kezdeti időpontban ($t = 0$) $m_0 = 80$ gramm. Az izotóp **felezési ideje** $T = 8$ év, azaz minden $8$ évenként a tömeg a felére csökken. A tömeget $t$ év eltelte után a következő függvény modellezi:

$$m(t) = 80 \\cdot \\left(\\dfrac{1}{2}\\right)^{t/8}, \\qquad t \\geq 0.$$

**a)** Számítsa ki $m(12)$ értékét! Mekkora lesz a tömeg $12$ év múlva? Adjon pontos és közelítő értéket! ($5$ pont)

**b)** Mennyi idő múlva lesz a tömeg $5$ grammra csökkent? Adja meg a pontos eredményt! ($6$ pont)

**c)** Adja meg a modell **inverz függvényét**, $t(m)$-et, azaz fejezze ki, hogy mennyi idő szükséges ahhoz, hogy a tömeg $m$ grammra essen! Határozza meg az értelmezési tartományt! ($5$ pont)`,
  figure: () => <DecayPlot />,
  asked: [
    { key: 'a', label: 'a) $m(12) = ?$ g' },
    { key: 'b', label: 'b) $t = ?$ év ha $m = 5$ g' },
    { key: 'c', label: 'c) $t(m) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: 'a/1. lépés — A kitevő kiszámolása',
      points: 2,
      body: `$$m(12) = 80 \\cdot \\left(\\dfrac{1}{2}\\right)^{12/8} = 80 \\cdot \\left(\\dfrac{1}{2}\\right)^{3/2} = 80 \\cdot 2^{-3/2}.$$

A hatvány átírva:

$$2^{-3/2} = \\dfrac{1}{2^{3/2}} = \\dfrac{1}{2\\sqrt{2}} = \\dfrac{\\sqrt{2}}{4}.$$`,
    },
    {
      title: 'a/2. lépés — A pontos és közelítő érték',
      points: 3,
      body: `$$m(12) = 80 \\cdot \\dfrac{\\sqrt{2}}{4} = 20\\sqrt{2} \\ \\text{g}.$$

Közelítés: $20\\sqrt{2} \\approx 20 \\cdot 1{,}4142 \\approx 28{,}28$ g.

**Értelmezés:** $12$ év alatt a $80$ g-os minta kb. $28{,}28$ g-ra csökkent, ami **a kezdeti tömeg $\\sim 35{,}4\\%$-a**. Ez konzisztens a modellel: $8$ év alatt felére ($40$ g), $16$ év alatt negyedére ($20$ g) csökkenne, a $12$ év a kettő között van.`,
      figure: () => <DecayPlot showT12 />,
    },
    {
      title: 'b/1. lépés — Az egyenlet felírása',
      points: 2,
      body: `Keressük azt a $t$-t, amelyre $m(t) = 5$:

$$80 \\cdot \\left(\\dfrac{1}{2}\\right)^{t/8} = 5.$$

Osztva $80$-nal:

$$\\left(\\dfrac{1}{2}\\right)^{t/8} = \\dfrac{5}{80} = \\dfrac{1}{16}.$$`,
    },
    {
      title: 'b/2. lépés — Hatvány-egyenlet megoldása',
      points: 2,
      body: `Észrevesszük, hogy $\\dfrac{1}{16} = \\left(\\dfrac{1}{2}\\right)^4$, tehát:

$$\\left(\\dfrac{1}{2}\\right)^{t/8} = \\left(\\dfrac{1}{2}\\right)^4.$$

Mivel az $x \\mapsto (1/2)^x$ függvény **szigorúan csökkenő** (tehát **injektív**), az alapok egyenlőségéből a kitevők egyenlősége következik:

$$\\dfrac{t}{8} = 4 \\;\\Longrightarrow\\; t = 32 \\ \\text{év}.$$`,
      figure: () => <DecayPlot showT5 />,
    },
    {
      title: 'b/3. lépés — Ellenőrzés logaritmussal',
      points: 2,
      body: `**Alternatív módszer** (ha nem vennénk észre $1/16 = (1/2)^4$-et): logaritmust veszünk mindkét oldalból (fgv. tábla, 24. old.):

$$\\lg \\left(\\dfrac{1}{16}\\right) = \\dfrac{t}{8} \\cdot \\lg \\dfrac{1}{2}.$$

$$\\dfrac{t}{8} = \\dfrac{\\lg(1/16)}{\\lg(1/2)} = \\dfrac{-\\lg 16}{-\\lg 2} = \\dfrac{4 \\lg 2}{\\lg 2} = 4.$$

Tehát $t = 32$ év ✓.`,
    },
    {
      title: 'c/1. lépés — Az inverz függvény felírása',
      points: 3,
      body: `A **definíciós egyenlet** megfordítása: $y = m(t)$-ből $t$-t kifejezve.

Induljunk ki: $m = 80 \\cdot 2^{-t/8}$. Osszuk $80$-nal:

$$\\dfrac{m}{80} = 2^{-t/8}.$$

Logaritmust veszünk mindkét oldalból (2-es alap a legtermészetesebb itt):

$$\\log_2 \\dfrac{m}{80} = -\\dfrac{t}{8}.$$

Szorozva $-8$-cal:

$$\\boxed{t(m) = -8 \\log_2 \\dfrac{m}{80} = 8 \\log_2 \\dfrac{80}{m}.}$$

(Az utolsó alak a $\\log_2 (1/x) = -\\log_2 x$ azonosság felhasználásával.)`,
    },
    {
      title: 'c/2. lépés — Az értelmezési tartomány',
      points: 2,
      body: `Az eredeti $m(t) = 80 \\cdot 2^{-t/8}$ függvény értelmezési tartománya $t \\geq 0$ (nincs "negatív idő"). Ekkor a tömeg az értelmezés szerint:

- $t = 0$ esetén $m = 80$ g (kezdeti állapot),
- $t \\to \\infty$ esetén $m \\to 0$ (de sosem éri el).

Tehát a **képhalmaz** (értékkészlet): $m \\in (0; 80]$.

Az **inverz függvény** értelmezési tartománya így:

$$m \\in (0;\\ 80],$$

és az értékkészlete $t \\in [0;\\ \\infty)$.

**Ellenőrzés**: $t(80) = 8 \\log_2 1 = 0$ ✓; $t(5) = 8 \\log_2 16 = 8 \\cdot 4 = 32$ ✓; $t(20\\sqrt{2}) = 8 \\log_2(80 / (20\\sqrt{2})) = 8 \\log_2 (4/\\sqrt{2}) = 8 \\log_2 (2\\sqrt{2}) = 8 \\cdot 3/2 = 12$ ✓.`,
    },
  ],
  finalAnswer: {
    a: '$m(12) = 20\\sqrt{2} \\approx 28{,}28$ g',
    b: '$t = 32$ év',
    c: '$t(m) = 8 \\log_2 \\dfrac{80}{m},\\ m \\in (0;\\ 80]$',
  },
  usedFormulas: [
    'exponenciális bomlás: $m(t) = m_0 \\cdot 2^{-t/T}$',
    'hatvány-egyenlet: $a^x = a^y \\Rightarrow x = y$',
    'logaritmus azonosságai',
    'inverz függvény értelmezési tartománya = eredeti értékkészlete',
  ],
};

export default { meta, problem, solution };
