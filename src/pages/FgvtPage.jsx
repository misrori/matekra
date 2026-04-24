import { useMemo, useState } from 'react';
import { fgvtIndex } from '../fgvt';
import { tasks } from '../tasks';

const FGVT_URL = 'https://www.tankonyvkatalogus.hu/storage/pdf/OH-FGV912GY__teljes.pdf';

export function FgvtPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return fgvtIndex;
    return fgvtIndex.filter((e) =>
      `${e.topic} ${e.keywords?.join(' ') ?? ''}`.toLowerCase().includes(q)
    );
  }, [search]);

  // Group by section
  const sections = useMemo(() => {
    const m = new Map();
    filtered.forEach((e) => {
      const sec = e.section || 'Egyéb';
      if (!m.has(sec)) m.set(sec, []);
      m.get(sec).push(e);
    });
    return [...m.entries()];
  }, [filtered]);

  return (
    <div className="fgvt-page">
      <h2 style={{ marginTop: 0 }}>Négyjegyű függvénytáblázat</h2>
      <p className="muted">
        Az érettségin használható{' '}
        <a href={FGVT_URL} target="_blank" rel="noreferrer">
          OH Négyjegyű függvénytáblázat (PDF)
        </a>
        {' '}tartalomjegyzéke. Keress rá egy témakörre, és a link egyből a vonatkozó oldalra ugrik.
      </p>

      <div className="filters">
        <div className="filter-group" style={{ flex: 1 }}>
          <label>Keresés</label>
          <input
            type="text"
            placeholder="pl. logaritmus, szinusztétel, háromszög..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {sections.map(([sec, entries]) => (
        <div key={sec} style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 8 }}>{sec}</h3>
          <div className="fgvt-toc">
            {entries.map((e) => {
              const relatedTasks = tasks.filter((t) =>
                (t.meta.fgvt || []).some((r) => r.page === e.page)
              );
              return (
                <a
                  key={e.page + '-' + e.topic}
                  className="fgvt-entry"
                  href={`${FGVT_URL}#page=${e.page}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>{e.topic}</h4>
                  <div className="page">{e.page}. oldal</div>
                  {e.keywords && (
                    <div className="topics">{e.keywords.join(' · ')}</div>
                  )}
                  {relatedTasks.length > 0 && (
                    <div className="small" style={{ marginTop: 6, color: '#2563eb' }}>
                      Felhasznált: #{relatedTasks.map((t) => t.meta.number).join(', #')}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
