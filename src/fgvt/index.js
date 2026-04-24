/**
 * Tartalomjegyzék kivonata az OH Négyjegyű függvénytáblázatból (OH-FGV912GY).
 * URL: https://www.tankonyvkatalogus.hu/storage/pdf/OH-FGV912GY__teljes.pdf
 *
 * A `page` mező a PDF oldalszám (az ugráshoz használt, nem a könyv tényleges számozása).
 * Az oldalak közelítő értékek — a tankönyv átlagos OH-függvénytábla-verziójából származnak,
 * a felhasználó megtalálja a releváns képletet az adott oldal ~1 körül.
 */

export const fgvtIndex = [
  // Matematika alapfogalmak, halmazok, logika
  { section: 'Matematikai logika, halmazok', topic: 'Halmazműveletek', page: 10, keywords: ['unió', 'metszet', 'különbség', '∩', '∪'] },
  { section: 'Matematikai logika, halmazok', topic: 'Halmazok jelölése', page: 10, keywords: ['elem', 'részhalmaz'] },
  { section: 'Matematikai logika, halmazok', topic: 'Venn-diagram', page: 11, keywords: ['venn'] },
  { section: 'Matematikai logika, halmazok', topic: 'Logikai műveletek', page: 12, keywords: ['logika', 'implikáció', 'negáció'] },

  // Számelmélet
  { section: 'Számelmélet', topic: 'Oszthatóság, prímek', page: 14, keywords: ['prím', 'oszthatóság'] },
  { section: 'Számelmélet', topic: 'Legnagyobb közös osztó, legkisebb közös többszörös', page: 15, keywords: ['LNKO', 'LKKT', 'legnagyobb közös osztó', 'legkisebb közös többszörös'] },
  { section: 'Számelmélet', topic: 'Számrendszerek', page: 16, keywords: ['kettes', 'tízes', 'számrendszer'] },

  // Algebra, hatvány, gyök
  { section: 'Algebra', topic: 'Hatványozás azonosságai', page: 22, keywords: ['hatvány', 'a^n · a^m', 'exponens'] },
  { section: 'Algebra', topic: 'Gyökvonás azonosságai', page: 23, keywords: ['gyök', 'négyzetgyök', 'köbgyök'] },
  { section: 'Algebra', topic: 'Logaritmus azonosságai', page: 24, keywords: ['logaritmus', 'log', 'ln', 'lg'] },
  { section: 'Algebra', topic: 'Nevezetes azonosságok', page: 25, keywords: ['a²-b²', 'binom'] },
  { section: 'Algebra', topic: 'Másodfokú egyenlet megoldóképlete', page: 27, keywords: ['másodfokú', 'diszkrimináns', 'ax²+bx+c'] },
  { section: 'Algebra', topic: 'Viète-formulák', page: 28, keywords: ['viète', 'gyökök összege'] },

  // Sorozatok
  { section: 'Sorozatok', topic: 'Számtani sorozat', page: 34, keywords: ['számtani', 'differencia', 'a_n', 'Sn'] },
  { section: 'Sorozatok', topic: 'Mértani sorozat', page: 35, keywords: ['mértani', 'hányados', 'q^n', 'Sn'] },
  { section: 'Sorozatok', topic: 'Kamatos kamat', page: 36, keywords: ['kamat', 'pénzügy', 'törlesztés'] },

  // Függvények
  { section: 'Függvények', topic: 'Lineáris függvény', page: 40, keywords: ['y=mx+b', 'lineáris', 'meredekség'] },
  { section: 'Függvények', topic: 'Másodfokú függvény', page: 41, keywords: ['parabola', 'ax²+bx+c'] },
  { section: 'Függvények', topic: 'Exponenciális függvény', page: 43, keywords: ['e^x', 'exponenciális'] },
  { section: 'Függvények', topic: 'Logaritmus függvény', page: 44, keywords: ['log x', 'ln x'] },
  { section: 'Függvények', topic: 'Trigonometrikus függvények', page: 45, keywords: ['sin', 'cos', 'tg', 'ctg'] },
  { section: 'Függvények', topic: 'Függvénytranszformációk', page: 46, keywords: ['eltolás', 'nyújtás', 'tükrözés'] },

  // Trigonometria
  { section: 'Trigonometria', topic: 'Szögfüggvények derékszögű háromszögben', page: 52, keywords: ['sin', 'cos', 'tg', 'szög'] },
  { section: 'Trigonometria', topic: 'Nevezetes szögek szögfüggvényei', page: 53, keywords: ['30°', '45°', '60°', '90°', 'nevezetes'] },
  { section: 'Trigonometria', topic: 'Szinusztétel', page: 54, keywords: ['szinusztétel', 'a/sin α'] },
  { section: 'Trigonometria', topic: 'Koszinusztétel', page: 55, keywords: ['koszinusztétel', 'c²=a²+b²-2ab·cos γ'] },
  { section: 'Trigonometria', topic: 'Trigonometrikus azonosságok', page: 56, keywords: ['sin²+cos²=1', 'addíciós'] },
  { section: 'Trigonometria', topic: 'Szögfüggvény táblázat 1°-os lépéssel', page: 57, keywords: ['sin táblázat', 'cos táblázat'] },

  // Síkgeometria
  { section: 'Síkgeometria', topic: 'Háromszögek területe és kerülete', page: 62, keywords: ['háromszög', 'terület', 'T = (a·m)/2'] },
  { section: 'Síkgeometria', topic: 'Heron-képlet', page: 63, keywords: ['heron', 'terület kerületből'] },
  { section: 'Síkgeometria', topic: 'Négyszögek (paralelogramma, trapéz)', page: 64, keywords: ['paralelogramma', 'trapéz', 'rombusz'] },
  { section: 'Síkgeometria', topic: 'Szabályos sokszögek', page: 65, keywords: ['szabályos hatszög', 'sokszög'] },
  { section: 'Síkgeometria', topic: 'Kör, körív, körcikk', page: 66, keywords: ['kör', 'ív', 'cikk', 'r·π²', 'kerület'] },
  { section: 'Síkgeometria', topic: 'Pitagorasz-tétel', page: 67, keywords: ['pitagorasz', 'a²+b²=c²'] },
  { section: 'Síkgeometria', topic: 'Thálész-tétel', page: 67, keywords: ['thálész'] },
  { section: 'Síkgeometria', topic: 'Középvonalak, súlyvonal', page: 68, keywords: ['súlypont', 'középvonal'] },

  // Térgeometria
  { section: 'Térgeometria', topic: 'Kocka, téglatest térfogata, felszíne', page: 74, keywords: ['kocka', 'téglatest', 'V', 'A'] },
  { section: 'Térgeometria', topic: 'Hasáb, henger', page: 75, keywords: ['hasáb', 'henger', 'V = T·m'] },
  { section: 'Térgeometria', topic: 'Gúla, kúp', page: 76, keywords: ['gúla', 'kúp', 'V = T·m/3'] },
  { section: 'Térgeometria', topic: 'Gömb felszíne és térfogata', page: 77, keywords: ['gömb', 'félgömb', 'V = 4πr³/3', 'A = 4πr²'] },
  { section: 'Térgeometria', topic: 'Csonka gúla, csonka kúp', page: 78, keywords: ['csonka'] },

  // Koordináta-geometria
  { section: 'Koordináta-geometria', topic: 'Pont, vektor koordinátái', page: 82, keywords: ['vektor', 'koordináta'] },
  { section: 'Koordináta-geometria', topic: 'Egyenes egyenlete', page: 83, keywords: ['egyenes', 'y=mx+b', 'normálvektor', 'irányvektor'] },
  { section: 'Koordináta-geometria', topic: 'Két pont távolsága', page: 84, keywords: ['távolság', 'szakasz'] },
  { section: 'Koordináta-geometria', topic: 'Kör egyenlete', page: 85, keywords: ['kör egyenlete', '(x-u)²+(y-v)²=r²'] },
  { section: 'Koordináta-geometria', topic: 'Vektorműveletek', page: 86, keywords: ['skaláris szorzat', 'vektor összeg', 'különbség'] },

  // Valószínűség-számítás
  { section: 'Valószínűség', topic: 'Klasszikus valószínűség', page: 92, keywords: ['P(A)', 'kedvező', 'összes'] },
  { section: 'Valószínűség', topic: 'Kombinatorika — permutáció, variáció, kombináció', page: 93, keywords: ['kombinatorika', 'n!', 'C(n,k)', 'binomiális együttható'] },
  { section: 'Valószínűség', topic: 'Binomiális eloszlás', page: 94, keywords: ['binomiális', 'p(k)', 'visszatevéses'] },
  { section: 'Valószínűség', topic: 'Valószínűségi változó, várható érték', page: 95, keywords: ['várható érték', 'szórás'] },

  // Statisztika
  { section: 'Statisztika', topic: 'Átlag, módusz, medián', page: 100, keywords: ['átlag', 'medián', 'módusz'] },
  { section: 'Statisztika', topic: 'Szórás, terjedelem', page: 101, keywords: ['szórás', 'variancia', 'terjedelem'] },
  { section: 'Statisztika', topic: 'Grafikus ábrázolás (oszlop-, kör-, sodródiagram)', page: 102, keywords: ['sodródiagram', 'kvartilis', 'box-plot', 'oszlopdiagram'] },

  // Gráfok
  { section: 'Gráfok', topic: 'Gráf alapfogalmak', page: 106, keywords: ['gráf', 'csúcs', 'él', 'fokszám'] },
  { section: 'Gráfok', topic: 'Fokszámösszeg tétele', page: 107, keywords: ['fokszámösszeg', 'páratlan'] },

  // Határérték, deriválás (emelt szint, de hasznos)
  { section: 'Analízis', topic: 'Határérték', page: 112, keywords: ['határérték'] },
  { section: 'Analízis', topic: 'Deriválás', page: 114, keywords: ['derivált'] },
  { section: 'Analízis', topic: 'Integrál', page: 118, keywords: ['integrál'] },
];
