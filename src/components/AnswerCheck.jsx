import { useState } from 'react';
import { MathText } from '../lib/katex';

/**
 * Accepts `meta.check`:
 *   { type: 'number', value: 60, tolerance: 0.01 }
 *   { type: 'text', value: '{1; 3; 5}' }
 *   { type: 'multi', fields: [{ key, label, type, value, tolerance? }] }
 */
export function AnswerCheck({ check }) {
  const [input, setInput] = useState('');
  const [multi, setMulti] = useState({});
  const [status, setStatus] = useState(null); // null | 'correct' | 'close' | 'wrong'

  if (!check) return null;

  const validate = () => {
    if (check.type === 'number') {
      const v = parseFloat(String(input).replace(',', '.'));
      if (isNaN(v)) { setStatus('wrong'); return; }
      const diff = Math.abs(v - check.value);
      const tol = check.tolerance ?? 0.01;
      if (diff <= tol) setStatus('correct');
      else if (diff <= tol * 10) setStatus('close');
      else setStatus('wrong');
    } else if (check.type === 'text') {
      const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, '');
      setStatus(norm(input) === norm(check.value) ? 'correct' : 'wrong');
    } else if (check.type === 'multi') {
      const ok = check.fields.every((f) => {
        const v = multi[f.key] ?? '';
        if (f.type === 'number') {
          const n = parseFloat(String(v).replace(',', '.'));
          if (isNaN(n)) return false;
          return Math.abs(n - f.value) <= (f.tolerance ?? 0.01);
        }
        return String(v).trim().toLowerCase().replace(/\s+/g, '') ===
               String(f.value).trim().toLowerCase().replace(/\s+/g, '');
      });
      setStatus(ok ? 'correct' : 'wrong');
    }
  };

  return (
    <div className="answer-check">
      <div className="answer-check-head">
        <span>✍️ Írd be a válaszod</span>
      </div>

      {check.type === 'multi' ? (
        <div className="answer-check-multi">
          {check.fields.map((f) => (
            <div key={f.key} className="answer-check-field">
              <label><MathText text={f.label} /></label>
              <input
                type={f.type === 'number' ? 'text' : 'text'}
                inputMode={f.type === 'number' ? 'decimal' : 'text'}
                value={multi[f.key] ?? ''}
                onChange={(e) => setMulti({ ...multi, [f.key]: e.target.value })}
                placeholder={f.placeholder ?? (f.type === 'number' ? 'pl. 3,5' : '')}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="answer-check-single">
          <input
            type="text"
            inputMode={check.type === 'number' ? 'decimal' : 'text'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={check.type === 'number' ? 'pl. 60 vagy 3,14' : 'pl. {1; 3; 5}'}
            onKeyDown={(e) => { if (e.key === 'Enter') validate(); }}
          />
        </div>
      )}

      <div className="answer-check-actions">
        <button className="btn btn-primary" onClick={validate}>
          Ellenőrzés
        </button>
        {status && (
          <span className={`answer-check-status status-${status}`}>
            {status === 'correct' && '✅ Helyes!'}
            {status === 'close' && '🟡 Közel van — nézd meg a pontos értéket'}
            {status === 'wrong' && '❌ Próbáld újra'}
          </span>
        )}
      </div>
    </div>
  );
}
