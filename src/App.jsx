import { Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { TaskPage } from './pages/TaskPage';
import { TopicsPage } from './pages/TopicsPage';
import { FgvtPage } from './pages/FgvtPage';

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">
          Matek Érettségi Kidolgozó
          <small>2025. május · középszint</small>
        </h1>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Feladatok
          </NavLink>
          <NavLink to="/topics" className={({ isActive }) => (isActive ? 'active' : '')}>
            Témakörök
          </NavLink>
          <NavLink to="/fgvt" className={({ isActive }) => (isActive ? 'active' : '')}>
            Négyjegyű
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes basename="matekra">
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/fgvt" element={<FgvtPage />} />
        </Routes>
      </main>

      <footer className="small muted" style={{ marginTop: 48, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        Forrás: Oktatási Hivatal — 2025. május 6. K2511 feladatlap és hivatalos javítási-értékelési útmutató.
        {' '}· Négyjegyű függvénytáblázat:{' '}
        <a href="https://www.tankonyvkatalogus.hu/storage/pdf/OH-FGV912GY__teljes.pdf" target="_blank" rel="noreferrer">
          OH-FGV912GY (PDF)
        </a>.
      </footer>
    </div>
  );
}
