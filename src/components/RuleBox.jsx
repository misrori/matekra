import { useState } from 'react';
import { MathText } from '../lib/katex';
import { topics } from '../topics';
import { FgvtReference } from './FgvtReference';

/** Shows a collapsible rule/formula card for a topic. */
export function RuleBox({ topicId, defaultOpen = true }) {
  const topic = topics[topicId];
  const [open, setOpen] = useState(defaultOpen);
  if (!topic) return null;
  return (
    <div className="rule-box">
      <div className="rule-box-head">
        <span>📚 {topic.title}</span>
        <button onClick={() => setOpen(!open)}>{open ? 'Elrejt' : 'Megnéz'}</button>
      </div>
      {open && (
        <div className="rule-box-body">
          {topic.rules.map((r, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              {r.heading && <strong><MathText text={r.heading} /></strong>}
              {r.text && <p><MathText text={r.text} /></p>}
              {r.formula && (
                <div style={{ padding: '8px 0', textAlign: 'center' }}>
                  <MathText text={`$$${r.formula}$$`} />
                </div>
              )}
              {r.bullets && (
                <ul>
                  {r.bullets.map((b, j) => (
                    <li key={j}><MathText text={b} /></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {topic.fgvt && topic.fgvt.length > 0 && (
            <div style={{ marginTop: 8, fontSize: 13 }}>
              <span style={{ color: '#92400e' }}>Négyjegyűben: </span>
              <FgvtReference refs={topic.fgvt} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
