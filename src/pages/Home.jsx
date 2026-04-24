import { useMemo, useState } from 'react';
import { tasks } from '../tasks';
import { TaskCard } from '../components/TaskCard';

function Stat({ label, value, hint, tone }) {
  return (
    <div className={`stat stat-${tone || 'default'}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {hint && <div className="stat-hint">{hint}</div>}
    </div>
  );
}

export function Home() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [sessionFilter, setSessionFilter] = useState('all');
  const [partFilter, setPartFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [search, setSearch] = useState('');

  const allLevels = useMemo(() => {
    const s = new Set();
    tasks.forEach((t) => s.add(t.meta.level));
    return [...s].sort();
  }, []);

  const allSessions = useMemo(() => {
    const s = new Set();
    tasks.forEach((t) => t.meta.session && s.add(t.meta.session));
    return [...s].sort();
  }, []);

  const allTopics = useMemo(() => {
    const s = new Set();
    tasks.forEach((t) => t.meta.topics?.forEach((x) => s.add(x)));
    return [...s].sort();
  }, []);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const m = t.meta;
      if (levelFilter !== 'all' && m.level !== levelFilter) return false;
      if (sessionFilter !== 'all' && m.session !== sessionFilter) return false;
      if (partFilter !== 'all' && m.part !== partFilter) return false;
      if (topicFilter !== 'all' && !m.topics?.includes(topicFilter)) return false;
      if (difficultyFilter !== 'all' && m.difficulty !== +difficultyFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${m.title} ${(m.topics || []).join(' ')} ${m.number} ${m.session || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [levelFilter, sessionFilter, partFilter, topicFilter, difficultyFilter, search]);

  // Group by: level → session
  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((t) => {
      const key = `${t.meta.level}|${t.meta.session}`;
      if (!map.has(key)) {
        map.set(key, {
          level: t.meta.level,
          session: t.meta.session,
          year: t.meta.year,
          tasks: [],
        });
      }
      map.get(key).tasks.push(t);
    });
    const arr = [...map.values()];
    // Sort: közép first, then emelt; within, session alpha
    arr.sort((a, b) => {
      if (a.level !== b.level) return a.level === 'közép' ? -1 : 1;
      return (a.session || '').localeCompare(b.session || '');
    });
    return arr;
  }, [filtered]);

  const totalPoints = filtered.reduce((s, t) => s + (t.meta.points || 0), 0);

  // Overview stats (computed on the unfiltered tasks)
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const kozep = tasks.filter((t) => t.meta.level === 'közép').length;
    const emelt = tasks.filter((t) => t.meta.level === 'emelt').length;
    const sessions = new Set(tasks.map((t) => t.meta.session)).size;
    const topicCount = new Set(tasks.flatMap((t) => t.meta.topics || [])).size;
    const svgCount = tasks.filter((t) => t.problem?.figure).length;
    return { totalTasks, kozep, emelt, sessions, topicCount, svgCount };
  }, []);

  const clearFilters = () => {
    setLevelFilter('all');
    setSessionFilter('all');
    setPartFilter('all');
    setTopicFilter('all');
    setDifficultyFilter('all');
    setSearch('');
  };

  const anyFilterActive =
    levelFilter !== 'all' || sessionFilter !== 'all' || partFilter !== 'all' ||
    topicFilter !== 'all' || difficultyFilter !== 'all' || search !== '';

  return (
    <div>
      {/* Hero + stats */}
      <section className="home-hero">
        <div className="home-hero-text">
          <h1 className="home-hero-title">
            Matematika érettségi <span className="grad">kidolgozva</span>
          </h1>
          <p className="home-hero-sub">
            Középszintű és emelt szintű feladatok részletes megoldásokkal,
            SVG ábrákkal, lépésről lépésre magyarázattal, témakör-szabályokkal
            és négyjegyű függvénytáblázat-hivatkozással.
          </p>
        </div>
        <div className="home-stats">
          <Stat label="Feladat" value={stats.totalTasks} tone="accent" />
          <Stat label="Középszint" value={stats.kozep} tone="kozep" />
          <Stat label="Emelt szint" value={stats.emelt} tone="emelt" />
          <Stat label="Tesztsor" value={stats.sessions} />
          <Stat label="Témakör" value={stats.topicCount} />
          <Stat label="SVG ábra" value={stats.svgCount} />
        </div>
      </section>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Szint</label>
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
            <option value="all">Mind</option>
            {allLevels.map((l) => <option key={l} value={l}>{l}szint</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Tesztsor</label>
          <select value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)}>
            <option value="all">Mind</option>
            {allSessions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Rész</label>
          <select value={partFilter} onChange={(e) => setPartFilter(e.target.value)}>
            <option value="all">Mind</option>
            <option value="I">I. rész</option>
            <option value="II">II. rész</option>
            <option value="II.A">II.A (kötelező)</option>
            <option value="II.B">II.B (választható)</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Témakör</label>
          <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
            <option value="all">Mind</option>
            {allTopics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Nehézség</label>
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option value="all">Mind</option>
            <option value="1">★ könnyű</option>
            <option value="2">★★</option>
            <option value="3">★★★ közepes</option>
            <option value="4">★★★★</option>
            <option value="5">★★★★★ nehéz</option>
          </select>
        </div>
        <div className="filter-group" style={{ flex: 1, minWidth: 180 }}>
          <label>Keresés</label>
          <input
            type="text"
            placeholder="cím, témakör, szám…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group" style={{ alignSelf: 'flex-end' }}>
          <div className="filter-summary">
            <strong>{filtered.length}</strong> feladat · <strong>{totalPoints}</strong> pont
            {anyFilterActive && (
              <button className="link-btn" onClick={clearFilters}>szűrők törlése</button>
            )}
          </div>
        </div>
      </div>

      {/* Groups */}
      {grouped.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Nincs találat</h3>
          <p className="muted">Próbálj lazábban szűrni, vagy <button className="link-btn" onClick={clearFilters}>töröld a szűrőket</button>.</p>
        </div>
      ) : (
        grouped.map((group) => {
          const groupPoints = group.tasks.reduce((s, t) => s + (t.meta.points || 0), 0);
          const toneClass = group.level === 'emelt' ? 'emelt' : 'kozep';
          return (
            <section key={`${group.level}-${group.session}`} className={`group-section group-${toneClass}`}>
              <div className="group-header">
                <div>
                  <div className={`group-level-chip group-level-${toneClass}`}>
                    {group.level === 'emelt' ? '🎓 Emelt szint' : '📘 Középszint'}
                  </div>
                  <h2 className="group-title">{group.session}</h2>
                </div>
                <div className="group-meta">
                  <span><strong>{group.tasks.length}</strong> feladat</span>
                  <span>·</span>
                  <span><strong>{groupPoints}</strong> pont</span>
                </div>
              </div>
              <div className="task-grid">
                {group.tasks.map((t) => <TaskCard key={t.meta.id} task={t} />)}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
