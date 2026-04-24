import { useState } from 'react';

export function Collapsible({ title, icon, subtitle, defaultOpen = false, tone = 'default', children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`collapsible tone-${tone} ${open ? 'open' : ''}`}>
      <button
        className="collapsible-head"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="collapsible-head-left">
          {icon && <span className="collapsible-icon">{icon}</span>}
          <span>
            <span className="collapsible-title">{title}</span>
            {subtitle && <span className="collapsible-subtitle">{subtitle}</span>}
          </span>
        </span>
        <span className="collapsible-chevron" aria-hidden>
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && (
        <div className="collapsible-body">
          {children}
        </div>
      )}
    </div>
  );
}
