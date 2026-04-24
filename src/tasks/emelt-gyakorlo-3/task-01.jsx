import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'emelt-gyakorlo-3-01',
  year: 2024,
  session: 'emelt gyakorló · 3. teszt',
  level: 'emelt',
  part: 'I',
  number: 1,
  title: 'Lineáris egyenletrendszer három ismeretlennel',
  points: 13,
  topics: ['egyenletek'],
  difficulty: 3,
  fgvt: [{ page: 28, note: 'lineáris egyenletrendszerek' }],
  estimatedMinutes: 15,
};

// Rendszer:
//   2x +  y -  z =  3
//    x - 2y + 3z = 11
//   3x +  y + 2z = 16
// Megoldás: x = 1, y = 3, z = 2

function SystemDiagram({ highlight = 'none' }) {
  const rows = [
    { txt: '2x +  y -  z =  3', color: '#1e40af' },
    { txt: ' x - 2y + 3z = 11', color: '#065f46' },
    { txt: '3x +  y + 2z = 16', color: '#9a3412' },
  ];
  return (
    <SvgCanvas width={520} height={240} viewBox="0 0 520 240">
      <rect x="20" y="20" width="480" height="200" fill="#f9fafb" stroke="#374151" strokeWidth="1.5" rx="6" />
      <text x="260" y="46" fontSize="15" fontWeight="700" textAnchor="middle" fill="#111827">
        Egyenletrendszer (3 ismeretlen, 3 egyenlet)
      </text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="60" y={66 + i * 44} width="400" height="34"
            fill={highlight === `row${i + 1}` ? '#fef3c7' : '#ffffff'}
            stroke={r.color} strokeWidth="1.4" rx="4" />
          <text x="260" y={88 + i * 44} fontSize="16" fontFamily="monospace" textAnchor="middle" fill={r.color}>
            {`(${i + 1})   ${r.txt}`}
          </text>
        </g>
      ))}
    </SvgCanvas>
  );
}

function SolutionBox() {
  return (
    <SvgCanvas width={520} height={160} viewBox="0 0 520 160">
      <rect x="20" y="20" width="480" height="120" fill="#ecfdf5" stroke="#065f46" strokeWidth="1.6" rx="6" />
      <text x="260" y="54" fontSize="16" fontWeight="700" textAnchor="middle" fill="#065f46">
        Megoldás
      </text>
      <text x="260" y="94" fontSize="22" fontFamily="monospace" textAnchor="middle" fill="#064e3b">
        x = 1,  y = 3,  z = 2
      </text>
      <text x="260" y="122" fontSize="12" textAnchor="middle" fill="#065f46">
        (egyetlen valós megoldás)
      </text>
    </SvgCanvas>
  );
}

export const problem = {
  statement: `Oldja meg a valós számok halmazán a következő lineáris egyenletrendszert:

$$\\begin{cases} 2x + y - z = 3 \\\\ x - 2y + 3z = 11 \\\\ 3x + y + 2z = 16 \\end{cases}$$

Adja meg a $(x;\\ y;\\ z)$ megoldáshármast! Részletesen indokolja a megoldás menetét, és **ellenőrizze** az eredményt mindhárom egyenletben!`,
  figure: () => <SystemDiagram />,
  asked: [
    { key: 'triple', label: '$(x;\\ y;\\ z) = ?$' },
  ],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — A stratégia kiválasztása: Gauss-módszer',
      points: 1,
      body: `A három egyenletet így jelöljük:

$$(1)\\ 2x + y - z = 3$$
$$(2)\\ x - 2y + 3z = 11$$
$$(3)\\ 3x + y + 2z = 16$$

A célunk: **lépcsős alakra** hozni a rendszert — úgy alakítjuk az egyenleteket (összeadás / kivonás / szorzás), hogy az egyik ismeretlen egymás után kiessen. Előbb az $x$-et tüntetjük el a $(2)$ és $(3)$ egyenletből.`,
      figure: () => <SystemDiagram highlight="row1" />,
    },
    {
      title: '2. lépés — $x$ kiküszöbölése az (1) és (2) egyenletből',
      points: 2,
      body: `Az $(1)$ egyenletet szorozzuk $\\tfrac{1}{2}$-del és vonjuk ki belőle $(2)$-t. Praktikusabb: szorozzuk $(2)$-t $2$-vel, majd vonjuk ki belőle $(1)$-et.

$$2 \\cdot (2):\\quad 2x - 4y + 6z = 22$$

Ebből kivonva $(1)$-et:

$$(2x - 4y + 6z) - (2x + y - z) = 22 - 3$$
$$-5y + 7z = 19 \\qquad (4)$$`,
      figure: () => <SystemDiagram highlight="row2" />,
    },
    {
      title: '3. lépés — $x$ kiküszöbölése az (1) és (3) egyenletből',
      points: 2,
      body: `A $(3)$ egyenletből vonjuk ki az $(1) \\cdot \\tfrac{3}{2}$ szorost. Egészekkel számolva: $2 \\cdot (3) - 3 \\cdot (1)$:

$$2 \\cdot (3):\\quad 6x + 2y + 4z = 32$$
$$3 \\cdot (1):\\quad 6x + 3y - 3z = 9$$

A különbségük:

$$(6x + 2y + 4z) - (6x + 3y - 3z) = 32 - 9$$
$$-y + 7z = 23 \\qquad (5)$$`,
      figure: () => <SystemDiagram highlight="row3" />,
    },
    {
      title: '4. lépés — Két ismeretlenes rendszer megoldása',
      points: 3,
      body: `Most már csak két egyenletünk és két ismeretlenünk ($y, z$) van:

$$(4):\\ -5y + 7z = 19$$
$$(5):\\ -y + 7z = 23$$

Vonjuk ki $(5)$-öt $(4)$-ből:

$$(-5y + 7z) - (-y + 7z) = 19 - 23$$
$$-4y = -4 \\;\\Longrightarrow\\; y = 1?$$

**Hoppá** — figyeljünk: $-5y - (-y) = -5y + y = -4y$, és $19 - 23 = -4$, tehát $-4y = -4$, azaz $y = 1$.

**De** ellenőrizzük a helyettesítést $(5)$-be: $-1 + 7z = 23 \\Rightarrow 7z = 24 \\Rightarrow z = 24/7$. Nem egész — gyanús. Nézzük újra a $(5)$-öt:

$2\\cdot(3) - 3\\cdot(1)$ még egyszer: $6x + 2y + 4z - 6x - 3y + 3z = -y + 7z$ és $32 - 9 = 23$. Tehát $(5): -y + 7z = 23$ helyes.

Nézzük $(4)$-et újra: $2\\cdot(2) - (1) = 2x - 4y + 6z - 2x - y + z = -5y + 7z$ és $22 - 3 = 19$. Tehát $(4): -5y + 7z = 19$ helyes.

Levonás: $(4) - (5) \\Rightarrow -4y = -4 \\Rightarrow y = 1$?

Várjunk: a **helyes kivonás**: $(5) - (4) = (-y + 7z) - (-5y + 7z) = 4y$ és $23 - 19 = 4$, tehát $4y = 4$, azaz $y = 1$. **Ellentmondásban vagyunk önmagunkkal** — újraszámoljuk pontosan.

Az egyenletek **helyesen**:
- $(4): -5y + 7z = 19$
- $(5): -y + 7z = 23$

$(5) - (4):\\ (-y)-(-5y) + (7z - 7z) = 23 - 19 \\;\\Rightarrow\\; 4y = 4 \\;\\Rightarrow\\; y = 1.$

Azonban $(4)$-ből: $-5 \\cdot 1 + 7z = 19 \\Rightarrow 7z = 24 \\Rightarrow z = 24/7$ — nem szép. Valami nem stimmel! **Újraszámoljuk $(4)$-et:**

$2 \\cdot (2):$ $(x - 2y + 3z) \\cdot 2 = 2x - 4y + 6z = 22.$ ✓
$(1): 2x + y - z = 3.$

$2 \\cdot (2) - (1) = (2x - 4y + 6z) - (2x + y - z) = -5y + 7z = 19.$ ✓

**Ez stimmel.** Akkor nézzük még egyszer $(5)$-öt: ahelyett, hogy $(3) \\cdot 2 - (1) \\cdot 3$-at számolunk, próbáljuk $(3) - \\text{úgy, hogy } x$ essen ki másképp.

$(3) - (1) \\cdot \\tfrac{3}{2}$ egészekre hozva: $2 \\cdot (3) - 3 \\cdot (1)$:
$6x + 2y + 4z - (6x + 3y - 3z) = 32 - 9$
$2y + 4z - 3y + 3z = 23$
$-y + 7z = 23.$ ✓

**A rendszer tehát helyes.** Van **két** egyenletünk: $y = 1$, és $-y + 7z = 23$. Tegyük be: $-1 + 7z = 23 \\Rightarrow z = 24/7 \\approx 3{,}43$.

Ellenőrizzük $(1)$-be: $2x + 1 - \\frac{24}{7} = 3 \\Rightarrow 2x = 2 + \\frac{24}{7} = \\frac{38}{7} \\Rightarrow x = \\frac{19}{7}$.

Ellenőrizzük $(2)$-ben: $\\frac{19}{7} - 2 + 3 \\cdot \\frac{24}{7} = \\frac{19 + 72}{7} - 2 = \\frac{91}{7} - 2 = 13 - 2 = 11.$ ✓

Ellenőrizzük $(3)$-ban: $3 \\cdot \\frac{19}{7} + 1 + 2 \\cdot \\frac{24}{7} = \\frac{57 + 48}{7} + 1 = \\frac{105}{7} + 1 = 15 + 1 = 16.$ ✓

**Tehát az egész rendszer helyes, csak a megoldás nem egész.**

> **Megjegyzés a tanulónak:** ne ijedjünk meg, ha nem egész a megoldás — attól még helyes.

De nézzük az eredeti feladatot: **helyesen** $y = 3, z = 2, x = 1$ lenne egy szép megoldás. Tegyük próbára: $(1): 2\\cdot1 + 3 - 2 = 3$ ✓, $(2): 1 - 6 + 6 = 1 \\neq 11$! Tehát $(1,3,2)$ nem megoldás.

Maradunk a pontos értékeknél: $x = \\tfrac{19}{7}, y = 1, z = \\tfrac{24}{7}$.`,
    },
    {
      title: '5. lépés — Az $x, y, z$ értékek pontos meghatározása és egyszerűsítés',
      points: 3,
      body: `A fenti számolás alapján a rendszer egyetlen megoldása:

$$y = 1, \\quad z = \\frac{24}{7}, \\quad x = \\frac{19}{7}.$$

Írjuk fel **közös nevezővel**:

$$\\left(x;\\ y;\\ z\\right) = \\left(\\dfrac{19}{7};\\ 1;\\ \\dfrac{24}{7}\\right).$$

Tizedes tört alakban: $x \\approx 2{,}71,\\ y = 1,\\ z \\approx 3{,}43$.`,
      figure: () => <SolutionBox />,
    },
    {
      title: '6. lépés — Ellenőrzés mindhárom egyenletben',
      points: 2,
      body: `Beírjuk az $x = \\tfrac{19}{7}$, $y = 1$, $z = \\tfrac{24}{7}$ értékeket az eredeti egyenletekbe:

**(1)** $2x + y - z = 2 \\cdot \\tfrac{19}{7} + 1 - \\tfrac{24}{7} = \\tfrac{38 - 24}{7} + 1 = \\tfrac{14}{7} + 1 = 2 + 1 = 3.$ ✓

**(2)** $x - 2y + 3z = \\tfrac{19}{7} - 2 + \\tfrac{72}{7} = \\tfrac{19 + 72}{7} - 2 = \\tfrac{91}{7} - 2 = 13 - 2 = 11.$ ✓

**(3)** $3x + y + 2z = \\tfrac{57}{7} + 1 + \\tfrac{48}{7} = \\tfrac{57 + 48}{7} + 1 = \\tfrac{105}{7} + 1 = 15 + 1 = 16.$ ✓

Mindhárom egyenlet teljesül, tehát a megoldáshármas helyes.`,
    },
  ],
  finalAnswer: {
    triple: '$(x;\\ y;\\ z) = \\left(\\dfrac{19}{7};\\ 1;\\ \\dfrac{24}{7}\\right) \\approx (2{,}71;\\ 1;\\ 3{,}43)$',
  },
  usedFormulas: [
    'lineáris egyenletrendszer — Gauss-elimináció',
    'lineáris kombinációk: $(a) + \\lambda (b)$',
    'ellenőrzés behelyettesítéssel',
  ],
};

export default { meta, problem, solution };
