/**
 * Témakör-szabály kártyák. Minden témához képletek + magyarázat + fgvt oldalszám.
 * A `rules` tömbben mindent MathText-kompatibilis: $...$ inline, a formula mező körülölel dollárjelekkel.
 */

export const topics = {
  halmazok: {
    title: 'Halmazok és halmazműveletek',
    rules: [
      {
        heading: 'Alapműveletek',
        bullets: [
          'Metszet: $A \\cap B$ — azon elemek, amelyek $A$-ban **és** $B$-ben is benne vannak.',
          'Unió: $A \\cup B$ — azon elemek, amelyek $A$-ban **vagy** $B$-ben benne vannak (vagy mindkettőben).',
          'Különbség: $A \\setminus B$ — azon elemek, amelyek $A$-ban benne vannak, de $B$-ben **nincsenek**.',
          'Részhalmaz: $A \\subseteq B$ — ha $A$ minden eleme $B$-ben is benne van.',
        ],
      },
      {
        heading: 'Elemszám-formulák',
        formula: '|A \\cup B| = |A| + |B| - |A \\cap B|',
        text: 'Három halmazra: $|A\\cup B\\cup C| = |A|+|B|+|C| - |A\\cap B| - |A\\cap C| - |B\\cap C| + |A\\cap B\\cap C|$ (logikai szita)',
      },
    ],
    fgvt: [{ page: 10, note: 'halmazműveletek' }],
  },

  'számelmélet': {
    title: 'Számelmélet — oszthatóság, LNKO, LKKT',
    rules: [
      {
        heading: 'Prímfaktorizáció',
        text: 'Minden 1-nél nagyobb egész szám egyértelműen felbontható prímszámok szorzatára.',
      },
      {
        heading: 'Legnagyobb közös osztó (LNKO)',
        text: 'Bontsd prímtényezőkre mindkét számot, majd vedd a közös prímek **legkisebb** kitevőjét.',
        formula: '\\mathrm{LNKO}(12, 20) = 2^2 = 4',
      },
      {
        heading: 'Legkisebb közös többszörös (LKKT)',
        text: 'A közös és nem közös prímtényezők **legnagyobb** kitevőjén vett szorzat.',
        formula: '\\mathrm{LKKT}(12, 20) = 2^2 \\cdot 3 \\cdot 5 = 60',
      },
      {
        heading: 'Összefüggés',
        formula: '\\mathrm{LNKO}(a,b) \\cdot \\mathrm{LKKT}(a,b) = a \\cdot b',
      },
    ],
    fgvt: [{ page: 15, note: 'LNKO, LKKT' }],
  },

  'hatvány': {
    title: 'Hatványozás azonosságai',
    rules: [
      {
        heading: 'Alapazonosságok',
        bullets: [
          '$a^n \\cdot a^m = a^{n+m}$',
          '$\\dfrac{a^n}{a^m} = a^{n-m}$',
          '$(a^n)^m = a^{n \\cdot m}$',
          '$(a \\cdot b)^n = a^n \\cdot b^n$',
          '$a^0 = 1$ (ha $a \\neq 0$), $a^{-n} = \\dfrac{1}{a^n}$',
          '$a^{1/n} = \\sqrt[n]{a}$',
        ],
      },
    ],
    fgvt: [{ page: 22, note: 'hatvány azonosságai' }],
  },

  'statisztika': {
    title: 'Statisztika — átlag, sodródiagram',
    rules: [
      {
        heading: 'Számtani átlag',
        formula: '\\bar{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}',
        text: 'Az adatok összegét elosztjuk az adatok számával.',
      },
      {
        heading: 'Medián',
        text: 'A rendezett adatsor középső eleme. Páros elemszám esetén a két középső számtani átlaga.',
      },
      {
        heading: 'Kvartilisek, sodródiagram (box-plot)',
        bullets: [
          'Alsó kvartilis ($Q_1$): az adatsor alsó 25%-ának határa.',
          'Medián ($Q_2$): 50%-os határ.',
          'Felső kvartilis ($Q_3$): 75%-os határ.',
          'A sodródiagram egy dobozt ábrázol $Q_1$-től $Q_3$-ig, benne függőleges vonal a mediánnál; két „bajusz" az adatsor minimumához és maximumához.',
        ],
      },
      {
        heading: 'Szórás (tájékoztatóul)',
        formula: '\\sigma = \\sqrt{\\dfrac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2}',
      },
    ],
    fgvt: [
      { page: 100, note: 'átlag, medián' },
      { page: 102, note: 'sodródiagram' },
    ],
  },

  'trigonometria': {
    title: 'Trigonometria — szinusztétel, koszinusztétel',
    rules: [
      {
        heading: 'Derékszögű háromszögben',
        bullets: [
          '$\\sin \\alpha = \\dfrac{\\text{szemközti befogó}}{\\text{átfogó}}$',
          '$\\cos \\alpha = \\dfrac{\\text{szomszédos befogó}}{\\text{átfogó}}$',
          '$\\mathrm{tg}\\, \\alpha = \\dfrac{\\text{szemközti}}{\\text{szomszédos}}$',
        ],
      },
      {
        heading: 'Szinusztétel (tetszőleges háromszögben)',
        formula: '\\dfrac{a}{\\sin \\alpha} = \\dfrac{b}{\\sin \\beta} = \\dfrac{c}{\\sin \\gamma} = 2R',
        text: 'Az oldal és a vele szemközti szög szinuszának hányadosa konstans (= 2R, ahol R a körülírt kör sugara).',
      },
      {
        heading: 'Koszinusztétel',
        formula: 'c^2 = a^2 + b^2 - 2ab \\cos \\gamma',
        text: 'Általánosított Pitagorasz — ha $\\gamma = 90°$, akkor $\\cos \\gamma = 0$, és visszakapjuk a Pitagorasz-tételt.',
      },
      {
        heading: 'Háromszög területe',
        bullets: [
          '$T = \\dfrac{a \\cdot m_a}{2}$ (oldal és magasság)',
          '$T = \\dfrac{ab \\sin \\gamma}{2}$ (két oldal és a köztük lévő szög)',
        ],
      },
      {
        heading: 'Nevezetes szögek',
        bullets: [
          '$\\sin 30° = \\frac{1}{2}, \\cos 30° = \\frac{\\sqrt{3}}{2}$',
          '$\\sin 45° = \\cos 45° = \\frac{\\sqrt{2}}{2}$',
          '$\\sin 60° = \\frac{\\sqrt{3}}{2}, \\cos 60° = \\frac{1}{2}$',
        ],
      },
    ],
    fgvt: [
      { page: 54, note: 'szinusztétel' },
      { page: 55, note: 'koszinusztétel' },
      { page: 57, note: 'szögfüggvény táblázat' },
    ],
  },

  'gráfelmélet': {
    title: 'Gráfelmélet — fokszám',
    rules: [
      {
        heading: 'Alapfogalmak',
        bullets: [
          '**Csúcs (pont):** a gráf pontjai.',
          '**Él:** két csúcsot összekötő vonal.',
          '**Fokszám:** egy csúcsból kiinduló élek száma.',
          '**Egyszerű gráf:** nincs hurokél és nincs többszörös él.',
        ],
      },
      {
        heading: 'Fokszámösszeg tétele',
        formula: '\\sum_{v} \\deg(v) = 2 \\cdot |E|',
        text: 'Egy gráfban a csúcsok fokszámainak összege az élek számának kétszerese (mert minden él két csúcs fokszámát növeli).',
      },
      {
        heading: 'Kézfogási lemma',
        text: 'Minden gráfban a **páratlan fokszámú csúcsok száma páros**.',
      },
    ],
    fgvt: [{ page: 106, note: 'gráf alapok' }],
  },

  'térgeometria': {
    title: 'Térgeometria — térfogat és felszín',
    rules: [
      {
        heading: 'Kocka',
        formula: 'V = a^3, \\quad A = 6a^2',
      },
      {
        heading: 'Téglatest',
        formula: 'V = a \\cdot b \\cdot c, \\quad A = 2(ab + bc + ca)',
      },
      {
        heading: 'Hasáb, henger',
        formula: 'V = T_{\\text{alap}} \\cdot m',
        text: 'Henger palástja: $2r\\pi \\cdot m$.',
      },
      {
        heading: 'Gúla, kúp',
        formula: 'V = \\dfrac{T_{\\text{alap}} \\cdot m}{3}',
      },
      {
        heading: 'Gömb',
        formula: 'V = \\dfrac{4}{3} r^3 \\pi, \\quad A = 4 r^2 \\pi',
      },
      {
        heading: 'Félgömb',
        formula: 'V_{1/2} = \\dfrac{2}{3} r^3 \\pi, \\quad A_{1/2} = 2 r^2 \\pi + r^2 \\pi = 3 r^2 \\pi',
        text: 'A félgömb felszíne a gömb felszínének fele **plusz** a záró körlap területe.',
      },
    ],
    fgvt: [
      { page: 75, note: 'hasáb, henger' },
      { page: 76, note: 'gúla, kúp' },
      { page: 77, note: 'gömb, félgömb' },
    ],
  },

  'vektor': {
    title: 'Vektorok',
    rules: [
      {
        heading: 'Alapok',
        bullets: [
          'Egy vektort a kezdő- és végpontja határoz meg: $\\overrightarrow{AB}$.',
          '$\\overrightarrow{AB} = B - A$ (koordinátákból).',
          '$\\overrightarrow{AB} = -\\overrightarrow{BA}$.',
        ],
      },
      {
        heading: 'Vektorműveletek',
        bullets: [
          'Összeadás (paralelogramma-szabály): $\\vec{a} + \\vec{b}$.',
          'Kivonás: $\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})$.',
          'Skalárral szorzás: $\\lambda \\vec{a}$ nyújtja/rövidíti a vektort.',
        ],
      },
      {
        heading: 'Felbontás',
        text: 'Ha $\\vec{a}$ és $\\vec{b}$ nem párhuzamosak, akkor minden síkbeli vektor egyértelműen felírható $\\vec{v} = \\lambda \\vec{a} + \\mu \\vec{b}$ alakban.',
      },
    ],
    fgvt: [
      { page: 82, note: 'vektor koordináták' },
      { page: 86, note: 'vektorműveletek' },
    ],
  },

  'koordináta-geometria': {
    title: 'Koordináta-geometria',
    rules: [
      {
        heading: 'Egyenes egyenlete',
        bullets: [
          'Meredekséges forma: $y = m x + b$, ahol $m$ a meredekség, $b$ az $y$-tengelymetszet.',
          'Pontos-meredekséges: $y - y_0 = m(x - x_0)$.',
          'Normálvektoros: $A x + B y = C$, ahol $\\vec{n} = (A, B)$.',
          'Irányvektoros: $\\vec{v} = (v_1, v_2)$, meredekség $m = v_2 / v_1$.',
        ],
      },
      {
        heading: 'Párhuzamos / merőleges egyenesek',
        bullets: [
          'Párhuzamos: $m_1 = m_2$.',
          'Merőleges: $m_1 \\cdot m_2 = -1$.',
        ],
      },
      {
        heading: 'Két pont távolsága',
        formula: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
      },
      {
        heading: 'Kör egyenlete',
        formula: '(x - u)^2 + (y - v)^2 = r^2',
        text: 'Középpont: $(u, v)$, sugár: $r$.',
      },
    ],
    fgvt: [
      { page: 83, note: 'egyenes egyenlete' },
      { page: 85, note: 'kör egyenlete' },
    ],
  },

  'mértani sorozat': {
    title: 'Mértani sorozat',
    rules: [
      {
        heading: 'Definíció',
        text: 'Egy sorozat mértani, ha bármely tag és az előző hányadosa konstans $q$: $a_{n+1} = a_n \\cdot q$.',
      },
      {
        heading: 'n-edik tag',
        formula: 'a_n = a_1 \\cdot q^{n-1}',
      },
      {
        heading: 'Első n tag összege',
        formula: 'S_n = a_1 \\cdot \\dfrac{q^n - 1}{q - 1}, \\quad q \\neq 1',
        text: 'Ha $q = 1$: $S_n = n \\cdot a_1$.',
      },
      {
        heading: 'Mértani közép',
        formula: 'a_n = \\sqrt{a_{n-1} \\cdot a_{n+1}}',
      },
    ],
    fgvt: [{ page: 35, note: 'mértani sorozat' }],
  },

  'számtani sorozat': {
    title: 'Számtani sorozat',
    rules: [
      {
        heading: 'Definíció',
        text: 'Egy sorozat számtani, ha bármely tag és az előző különbsége konstans $d$: $a_{n+1} = a_n + d$.',
      },
      {
        heading: 'n-edik tag',
        formula: 'a_n = a_1 + (n-1) \\cdot d',
      },
      {
        heading: 'Első n tag összege',
        formula: 'S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2} = \\dfrac{(2a_1 + (n-1)d) \\cdot n}{2}',
      },
      {
        heading: 'Számtani közép',
        formula: 'a_n = \\dfrac{a_{n-1} + a_{n+1}}{2}',
      },
    ],
    fgvt: [{ page: 34, note: 'számtani sorozat' }],
  },

  'valószínűség': {
    title: 'Valószínűség-számítás',
    rules: [
      {
        heading: 'Klasszikus valószínűség',
        formula: 'P(A) = \\dfrac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}',
        text: 'Csak akkor használható, ha az elemi események egyenlő valószínűségűek.',
      },
      {
        heading: 'Tulajdonságok',
        bullets: [
          '$0 \\leq P(A) \\leq 1$',
          '$P(\\emptyset) = 0$, $P(\\Omega) = 1$',
          '$P(\\bar{A}) = 1 - P(A)$',
          '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$',
        ],
      },
      {
        heading: 'Kombinatorika',
        bullets: [
          'Permutáció: $n$ elem sorrendje $n!$ féleképpen.',
          'Variáció: $n$-ből $k$ sorbarakva $\\dfrac{n!}{(n-k)!}$ féleképpen.',
          'Kombináció: $n$-ből $k$ kiválasztása (sorrend nem számít): $\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$.',
        ],
      },
      {
        heading: 'Binomiális eloszlás',
        formula: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
        text: '$n$ független kísérlet, mindegyikben $p$ valószínűséggel „siker"; annak a valószínűsége, hogy pontosan $k$ lesz sikeres.',
      },
    ],
    fgvt: [
      { page: 92, note: 'klasszikus P' },
      { page: 93, note: 'kombinatorika' },
      { page: 94, note: 'binomiális eloszlás' },
    ],
  },

  'egyenletek': {
    title: 'Egyenletek',
    rules: [
      {
        heading: 'Lineáris (elsőfokú) egyenlet',
        formula: 'ax + b = 0 \\Rightarrow x = -\\dfrac{b}{a}, \\text{ ha } a \\neq 0',
      },
      {
        heading: 'Másodfokú egyenlet',
        formula: 'ax^2 + bx + c = 0 \\Rightarrow x_{1,2} = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        text: 'Diszkrimináns: $D = b^2 - 4ac$. Ha $D > 0$: két valós gyök; $D = 0$: egy kettős gyök; $D < 0$: nincs valós gyök.',
      },
      {
        heading: 'Viète-formulák',
        bullets: [
          '$x_1 + x_2 = -\\dfrac{b}{a}$',
          '$x_1 \\cdot x_2 = \\dfrac{c}{a}$',
        ],
      },
    ],
    fgvt: [{ page: 27, note: 'másodfokú megoldóképlet' }],
  },

  'síkgeometria': {
    title: 'Síkgeometria — háromszögek, sokszögek, kör',
    rules: [
      {
        heading: 'Pitagorasz-tétel (derékszögű háromszögben)',
        formula: 'a^2 + b^2 = c^2',
      },
      {
        heading: 'Thálész-tétel',
        text: 'A kör átmérőjére illeszkedő bármely kerületi pontban a háromszög derékszögű.',
      },
      {
        heading: 'Háromszög területe',
        bullets: [
          '$T = \\dfrac{a \\cdot m_a}{2}$',
          '$T = \\dfrac{ab \\sin \\gamma}{2}$',
          'Heron: $T = \\sqrt{s(s-a)(s-b)(s-c)}$, ahol $s = (a+b+c)/2$.',
        ],
      },
      {
        heading: 'Négyszögek',
        bullets: [
          'Paralelogramma: $T = a \\cdot m$',
          'Trapéz: $T = \\dfrac{(a + c) \\cdot m}{2}$',
          'Téglalap: $T = a \\cdot b$',
          'Rombusz: $T = \\dfrac{d_1 \\cdot d_2}{2}$',
        ],
      },
      {
        heading: 'Kör',
        bullets: [
          'Kerülete: $K = 2r\\pi$',
          'Területe: $T = r^2 \\pi$',
          'Körív hossza (középponti szög $\\alpha$ fokban): $i = \\dfrac{2r\\pi \\alpha}{360°}$',
          'Körcikk területe: $T_{\\text{cikk}} = \\dfrac{r^2 \\pi \\alpha}{360°}$',
        ],
      },
    ],
    fgvt: [
      { page: 62, note: 'háromszögek' },
      { page: 64, note: 'négyszögek' },
      { page: 66, note: 'kör' },
    ],
  },

  'függvények': {
    title: 'Függvények',
    rules: [
      {
        heading: 'Lineáris',
        formula: 'f(x) = mx + b',
        text: '$m$ a meredekség, $b$ az $y$-tengelymetszet.',
      },
      {
        heading: 'Másodfokú',
        formula: 'f(x) = ax^2 + bx + c',
        text: 'Tengelypontja: $x_0 = -\\dfrac{b}{2a}$. Ha $a > 0$: minimum, ha $a < 0$: maximum.',
      },
      {
        heading: 'Exponenciális',
        formula: 'f(x) = a \\cdot b^x',
        text: 'Ha $b > 1$: növekvő (exponenciális növekedés). Ha $0 < b < 1$: csökkenő (exponenciális csökkenés).',
      },
      {
        heading: 'Logaritmus',
        formula: 'f(x) = \\log_b x',
        text: 'Az $x \\mapsto b^x$ függvény inverze. Értelmezési tartomány: $x > 0$.',
      },
      {
        heading: 'Szélsőérték, zéróhely',
        bullets: [
          'Zéróhely: $f(x) = 0$',
          'Minimum/maximum: a függvény legkisebb/legnagyobb értéke a vizsgált tartományon.',
        ],
      },
    ],
    fgvt: [
      { page: 40, note: 'lineáris' },
      { page: 41, note: 'másodfokú' },
      { page: 43, note: 'exponenciális' },
      { page: 44, note: 'logaritmus' },
    ],
  },

  'logaritmus': {
    title: 'Logaritmus azonosságai',
    rules: [
      {
        heading: 'Definíció',
        formula: 'b^x = a \\Leftrightarrow x = \\log_b a',
        text: '$\\log_{10}$-et általában $\\lg$-nek, $\\log_e$-t $\\ln$-nek jelöljük.',
      },
      {
        heading: 'Azonosságok',
        bullets: [
          '$\\log_b (x \\cdot y) = \\log_b x + \\log_b y$',
          '$\\log_b \\dfrac{x}{y} = \\log_b x - \\log_b y$',
          '$\\log_b x^n = n \\cdot \\log_b x$',
          'Bázisváltás: $\\log_b x = \\dfrac{\\log_c x}{\\log_c b}$',
        ],
      },
    ],
    fgvt: [{ page: 24, note: 'logaritmus azonosságai' }],
  },

  'exponenciális': {
    title: 'Exponenciális függvény és alkalmazásai',
    rules: [
      {
        heading: 'Alak',
        formula: 'f(x) = a \\cdot b^x',
        text: 'Ha $b > 1$: növekedés (pl. kamatos kamat). Ha $0 < b < 1$: csökkenés (pl. radioaktív bomlás, légnyomás magassággal).',
      },
      {
        heading: 'Kamatos kamat',
        formula: 'T_n = T_0 \\cdot (1 + p)^n',
        text: '$T_0$: kezdeti tőke, $p$: éves kamatláb (tizedes tört), $n$: évek száma.',
      },
      {
        heading: 'Megoldás logaritmussal',
        text: 'Ha $b^x = c$, akkor $x = \\log_b c = \\dfrac{\\lg c}{\\lg b}$.',
      },
    ],
    fgvt: [
      { page: 36, note: 'kamatos kamat' },
      { page: 43, note: 'exponenciális függvény' },
    ],
  },

  'százalékszámítás': {
    title: 'Százalékszámítás',
    rules: [
      {
        heading: 'Alap',
        formula: '\\text{százalék} = \\dfrac{\\text{rész}}{\\text{egész}} \\cdot 100\\%',
      },
      {
        heading: 'Százalékos változás',
        bullets: [
          'Növelés $p\\%$-kal: $\\text{új} = \\text{régi} \\cdot (1 + p/100)$',
          'Csökkentés $p\\%$-kal: $\\text{új} = \\text{régi} \\cdot (1 - p/100)$',
        ],
      },
    ],
    fgvt: [],
  },
};
