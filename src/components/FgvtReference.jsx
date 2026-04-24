import { fgvtIndex } from '../fgvt';

const FGVT_URL = 'https://www.tankonyvkatalogus.hu/storage/pdf/OH-FGV912GY__teljes.pdf';

export function FgvtReference({ refs }) {
  if (!refs || refs.length === 0) return null;
  return (
    <span>
      {refs.map((r, i) => {
        const entry = fgvtIndex.find((e) => e.page === r.page) ?? { topic: r.note };
        return (
          <a
            key={i}
            className="fgvt-ref"
            href={`${FGVT_URL}#page=${r.page}`}
            target="_blank"
            rel="noreferrer"
            title={`Négyjegyű függvénytáblázat, ${r.page}. oldal — ${r.note ?? entry.topic}`}
          >
            Fgvt. {r.page}. o. — {r.note ?? entry.topic}
          </a>
        );
      })}
    </span>
  );
}
