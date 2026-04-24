import { SvgCanvas, Axes } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-2-01',
  year: 2024,
  session: 'emelt gyakorló · 2. teszt',
  level: 'emelt',
  part: 'I',
  number: 1,
  title: 'Abszolút értékes egyenlőtlenség — esetszétválasztással',
  points: 13,
  topics: ['egyenletek', 'függvények'],
  difficulty: 4,
  fgvt: [
    { page: 27, note: 'másodfokú megoldóképlet' },
    { page: 41, note: 'másodfokú függvény' },
  ],
  estimatedMinutes: 14,
};

// Egyenlőtlenség:  |2x - 3| + |x + 4| <= 11
// Esetszétválasztás három részre: x < -4,  -4 <= x < 3/2,  x >= 3/2.
// 1) x < -4 :  -(2x-3) + -(x+4) = -3x - 1 <= 11  =>  -3x <= 12  =>  x >= -4. Metszet: üres (x<-4, de x>=-4).
//    Tehát ebben az ágban nincs megoldás.
// 2) -4 <= x < 3/2 :  -(2x-3) + (x+4) = -x + 7 <= 11  =>  -x <= 4  =>  x >= -4. Metszet: [-4, 3/2).
// 3) x >= 3/2 :  (2x-3) + (x+4) = 3x + 1 <= 11  =>  3x <= 10  =>  x <= 10/3. Metszet: [3/2, 10/3].
// Egyesítve: [-4, 10/3].

function NumberLine() {
  const xMin = -6, xMax = 5;
  const sx = (v) => 40 + ((v - xMin) / (xMax - xMin)) * 440;
  const y = 120;
  return (
    <SvgCanvas width={520} height={180} viewBox="0 0 520 180">
      <line x1={40} y1={y} x2={480} y2={y} stroke="#111827" strokeWidth="1.5" />
      {/* töréspontok: -4 és 3/2 */}
      {[-6, -4, -2, 0, 1.5, 10 / 3, 4].map((v, i) => (
        <g key={i}>
          <line x1={sx(v)} y1={y - 6} x2={sx(v)} y2={y + 6} stroke="#111827" />
          <text x={sx(v)} y={y + 22} fontSize="12" textAnchor="middle" fill="#374151">
            {Number.isInteger(v) ? v : v === 1.5 ? '3/2' : v.toFixed(2)}
          </text>
        </g>
      ))}
      {/* megoldáshalmaz vastagon */}
      <line x1={sx(-4)} y1={y - 14} x2={sx(10 / 3)} y2={y - 14} stroke="#16a34a" strokeWidth="5" />
      <circle cx={sx(-4)} cy={y - 14} r="5" fill="#16a34a" />
      <circle cx={sx(10 / 3)} cy={y - 14} r="5" fill="#16a34a" />
      <text x={sx((-4 + 10 / 3) / 2)} y={y - 26} fontSize="13" fill="#15803d" textAnchor="middle" fontWeight="bold">
        megoldás: [-4; 10/3]
      </text>
      <text x={40} y={30} fontSize="13" fill="#6b7280">Töréspontok: $x=-4$ és $x=3/2$ → 3 eset</text>
    </SvgCanvas>
  );
}

function FunctionPlot() {
  const f = (x) => Math.abs(2 * x - 3) + Math.abs(x + 4);
  const pts = [];
  for (let x = -6; x <= 5.02; x += 0.1) pts.push(`${x.toFixed(3)},${f(x).toFixed(3)}`);
  // SVG leképezés: x: [-6, 5] -> [40, 460], y: [0, 18] -> [260, 20]
  const sx = (x) => 40 + ((x + 6) / 11) * 420;
  const sy = (y) => 260 - (y / 18) * 240;
  const poly = pts.map((p) => {
    const [x, y] = p.split(',').map(Number);
    return `${sx(x)},${sy(y)}`;
  }).join(' ');
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <Axes x={40} y={20} w={420} h={240} xMin={-6} xMax={5} yMin={0} yMax={18} xStep={1} yStep={2} />
      {/* y = 11 vízszintes vonal */}
      <line x1={sx(-6)} y1={sy(11)} x2={sx(5)} y2={sy(11)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x={sx(-6) + 6} y={sy(11) - 6} fontSize="12" fill="#dc2626">y = 11</text>
      {/* függvény */}
      <polyline points={poly} fill="none" stroke="#2563eb" strokeWidth="2.4" />
      {/* megoldás szakasz az x-tengelyen */}
      <line x1={sx(-4)} y1={sy(0)} x2={sx(10 / 3)} y2={sy(0)} stroke="#16a34a" strokeWidth="5" />
      <circle cx={sx(-4)} cy={sy(0)} r="4" fill="#16a34a" />
      <circle cx={sx(10 / 3)} cy={sy(0)} r="4" fill="#16a34a" />
      <text x={sx(-1.5)} y={sy(0) + 18} fontSize="12" fill="#15803d" textAnchor="middle">x ∈ [-4; 10/3]</text>
      <text x={sx(-6) + 6} y={30} fontSize="12" fill="#1e40af">f(x) = |2x-3| + |x+4|</text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő egyenlőtlenséget:

$$|2x - 3| + |x + 4| \\leq 11$$

Adja meg a megoldáshalmazt intervallum formában, és ábrázolja számegyenesen!`,
  figure: () => <NumberLine />,
  asked: [
    { key: 'megoldas', label: 'Megoldáshalmaz $M = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — Töréspontok meghatározása',
      points: 2,
      body: `Az abszolút értékes kifejezések **töréspontjait** ott kapjuk, ahol a belső kifejezés eltűnik:

- $2x - 3 = 0 \\Rightarrow x = \\dfrac{3}{2}$
- $x + 4 = 0 \\Rightarrow x = -4$

A számegyenes a töréspontoktól **három részre** bomlik:
$$(-\\infty;\\ -4),\\ \\ [-4;\\ \\tfrac{3}{2}),\\ \\ [\\tfrac{3}{2};\\ +\\infty).$$

Mindegyik intervallumon az abszolút értékek **előjelfüggő** felírása szerint más-más egyenlőtlenséget kapunk.`,
    },
    {
      title: '2. lépés — Első eset: $x < -4$',
      points: 3,
      body: `Ha $x < -4$, akkor
- $2x - 3 < 2\\cdot(-4) - 3 = -11 < 0 \\Rightarrow |2x-3| = -(2x-3) = -2x+3$,
- $x + 4 < 0 \\Rightarrow |x+4| = -(x+4) = -x-4$.

Az egyenlőtlenség:
$$(-2x + 3) + (-x - 4) \\leq 11$$
$$-3x - 1 \\leq 11$$
$$-3x \\leq 12$$
$$x \\geq -4.$$

Ez **ellentmond** a $x < -4$ feltételnek, tehát **ebben az ágban nincs megoldás**.`,
    },
    {
      title: '3. lépés — Második eset: $-4 \\leq x < \\tfrac{3}{2}$',
      points: 3,
      body: `Ebben a tartományban:
- $2x - 3 < 0 \\Rightarrow |2x-3| = -2x+3$,
- $x + 4 \\geq 0 \\Rightarrow |x+4| = x+4$.

Az egyenlőtlenség:
$$(-2x + 3) + (x + 4) \\leq 11$$
$$-x + 7 \\leq 11$$
$$-x \\leq 4 \\Rightarrow x \\geq -4.$$

A feltétellel metszve: $-4 \\leq x < \\tfrac{3}{2}$, tehát **az egész intervallum megoldás**: $\\left[-4;\\ \\tfrac{3}{2}\\right)$.`,
    },
    {
      title: '4. lépés — Harmadik eset: $x \\geq \\tfrac{3}{2}$',
      points: 3,
      body: `Most mindkét kifejezés nem-negatív:
- $|2x-3| = 2x-3$,
- $|x+4| = x+4$.

Az egyenlőtlenség:
$$(2x - 3) + (x + 4) \\leq 11$$
$$3x + 1 \\leq 11$$
$$3x \\leq 10 \\Rightarrow x \\leq \\dfrac{10}{3}.$$

A feltétellel metszve: $\\dfrac{3}{2} \\leq x \\leq \\dfrac{10}{3}$, ami a $\\left[\\tfrac{3}{2};\\ \\tfrac{10}{3}\\right]$ intervallum.`,
    },
    {
      title: '5. lépés — Az esetek egyesítése',
      points: 1,
      body: `A három ágból kapott részhalmazok uniója:
$$M = \\emptyset \\cup \\left[-4;\\ \\tfrac{3}{2}\\right) \\cup \\left[\\tfrac{3}{2};\\ \\tfrac{10}{3}\\right] = \\left[-4;\\ \\dfrac{10}{3}\\right].$$

A $\\tfrac{3}{2}$ töréspontnál a két rész **csatlakozik**, ezért az összevonás egy zárt intervallumot ad.`,
      figure: () => <NumberLine />,
    },
    {
      title: '6. lépés — Grafikus ellenőrzés',
      points: 1,
      body: `Tekintsük az $f(x) = |2x-3| + |x+4|$ függvényt. Ez **szakaszonként lineáris**, minimuma a $x = \\tfrac{3}{2}$ pontban, ahol $f(\\tfrac{3}{2}) = 0 + \\tfrac{11}{2} = 5{,}5$. A függvény mindkét irányba lineárisan nő (meredekség $-3$ és $+3$).

Az $f(x) \\leq 11$ feltétel azt kérdezi, hol van a függvény az $y = 11$ egyenes alatt. Az egyenes két metszéspontja:
- bal oldal: $f(x) = -3x - 1 = 11 \\Rightarrow x = -4$,
- jobb oldal: $f(x) = 3x + 1 = 11 \\Rightarrow x = \\tfrac{10}{3}$.

A grafikon alapján $M = [-4;\\ \\tfrac{10}{3}]$, ami **egyezik** az algebrai eredménnyel.`,
      figure: () => <FunctionPlot />,
    },
  ],
  finalAnswer: {
    megoldas: '$M = \\left[-4;\\ \\dfrac{10}{3}\\right]$',
  },
  usedFormulas: [
    'abszolút érték előjelfüggő felbontása',
    'esetszétválasztás töréspontok szerint',
    'lineáris egyenlőtlenség-megoldás',
    'abszolútérték-függvény grafikus vizsgálata',
  ],
};

export default { meta, problem, solution };
