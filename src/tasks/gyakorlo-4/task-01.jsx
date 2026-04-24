import { SvgCanvas } from '../../components/SvgCanvas';

export const meta = {
  id: 'gyakorlo-4-01',
  year: 2024,
  session: 'gyakorló · 4. teszt',
  level: 'közép',
  part: 'I',
  number: 1,
  title: 'Halmazok — szimmetrikus differencia',
  points: 2,
  topics: ['halmazok'],
  difficulty: 1,
  fgvt: [{ page: 10, note: 'halmazműveletek' }],
  estimatedMinutes: 3,
  check: { type: 'text', value: '{1; 4; 5}' },
};

// Hortobágyi Nemzeti Park madárfigyelő naplója egy hétről.
// H = egy hétvégén látott madarak sorszáma, K = keddi nap látott sorszámok.
const H = [1, 2, 3, 5, 8];
const K = [2, 3, 4, 8];

function VennDiagram({ highlight = 'none' }) {
  const fillH = highlight === 'sym' ? '#fca5a5' : '#dbeafe';
  const fillK = highlight === 'sym' ? '#fca5a5' : '#fde68a';
  const fillBoth = highlight === 'sym' ? '#e5e7eb' : '#c7d2fe';
  const only = (x) => H.includes(x) && !K.includes(x);
  const both = (x) => H.includes(x) && K.includes(x);
  const onlyK = (x) => K.includes(x) && !H.includes(x);
  return (
    <SvgCanvas width={520} height={300} viewBox="0 0 520 300">
      <circle cx="190" cy="150" r="120" fill={fillH} fillOpacity="0.5" stroke="#2563eb" strokeWidth="2" />
      <circle cx="330" cy="150" r="120" fill={fillK} fillOpacity="0.5" stroke="#d97706" strokeWidth="2" />
      {highlight === 'sym' && (
        <g>
          <defs>
            <clipPath id="clipBoth-gy4-01">
              <circle cx="190" cy="150" r="120" />
            </clipPath>
          </defs>
          <circle cx="330" cy="150" r="120" fill={fillBoth} fillOpacity="0.95" clipPath="url(#clipBoth-gy4-01)" />
        </g>
      )}
      <text x="90" y="50" fontSize="22" fontWeight="bold" fill="#1e3a8a">H</text>
      <text x="420" y="50" fontSize="22" fontWeight="bold" fill="#92400e">K</text>
      {H.filter(only).map((n, i) => (
        <text key={`h${n}`} x={130 + i * 26} y={160} fontSize="18" textAnchor="middle" fontWeight={highlight === 'sym' ? 700 : 400}>{n}</text>
      ))}
      {H.filter(both).map((n, i) => (
        <text key={`i${n}`} x={245 + i * 26} y={160} fontSize="18" textAnchor="middle">{n}</text>
      ))}
      {K.filter(onlyK).map((n, i) => (
        <text key={`k${n}`} x={360 + i * 26} y={160} fontSize="18" textAnchor="middle" fontWeight={highlight === 'sym' ? 700 : 400}>{n}</text>
      ))}
    </SvgCanvas>
  );
}

export const problem = {
  statement: `A hortobágyi madárfigyelők egy hétvégén és kedden naplózták az általuk megfigyelt madárfajok kódszámát.
A hétvégén látott fajok halmaza: $H = \\{1;\\ 2;\\ 3;\\ 5;\\ 8\\}$.
Kedden látott fajok halmaza: $K = \\{2;\\ 3;\\ 4;\\ 8\\}$.

Sorolja fel azokat a fajkódokat, amelyek **csak az egyik napon** (vagy hétvégén, vagy kedden, de nem mindkettőn) szerepelnek! Ez a két halmaz **szimmetrikus differenciája**, jele $H \\triangle K = (H \\setminus K) \\cup (K \\setminus H)$.`,
  figure: () => <VennDiagram />,
  asked: [{ key: 'sym', label: '$H \\triangle K = ?$' }],
};

export const solution = {
  steps: [
    {
      title: '1. lépés — $H \\setminus K$ (csak hétvégén látottak)',
      points: 1,
      body: `$H$ elemeiből azokat vesszük, amelyek **nincsenek** $K$-ban.

- $1 \\in H$, $1 \\notin K$ → bekerül.
- $2 \\in H$ és $2 \\in K$ → kimarad.
- $3$ → mindkettőben, kimarad.
- $5 \\in H$, $5 \\notin K$ → bekerül.
- $8$ → mindkettőben, kimarad.

Tehát $H \\setminus K = \\{1;\\ 5\\}$.`,
      figure: () => <VennDiagram highlight="sym" />,
    },
    {
      title: '2. lépés — $K \\setminus H$ és az egyesítés',
      points: 1,
      body: `$K$ elemeiből azokat, amelyek **nincsenek** $H$-ban:

- $2, 3, 8$ mindkettőben → kimarad.
- $4 \\in K$, $4 \\notin H$ → bekerül.

Tehát $K \\setminus H = \\{4\\}$.

A szimmetrikus differencia a kettő **uniója** (a közös elemek, $2$, $3$, $8$, nem kerülnek be, mert egyik részhalmazban sincsenek):

$$H \\triangle K = \\{1;\\ 5\\} \\cup \\{4\\} = \\{1;\\ 4;\\ 5\\}.$$`,
      figure: () => <VennDiagram highlight="sym" />,
    },
  ],
  finalAnswer: {
    sym: '$H \\triangle K = \\{1;\\ 4;\\ 5\\}$',
  },
  usedFormulas: [
    'szimmetrikus differencia: $A \\triangle B = (A\\setminus B) \\cup (B\\setminus A)$',
  ],
};

export default { meta, problem, solution };
