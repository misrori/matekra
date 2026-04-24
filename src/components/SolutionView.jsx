import { useState } from 'react';
import { MathText } from '../lib/katex';
import { RuleBox } from './RuleBox';

function StepBody({ step }) {
  return (
    <div className="solution-step-body">
      <MathText text={step.body} />
      {step.figure && (
        <div style={{ marginTop: 10 }}>
          {typeof step.figure === 'function' ? step.figure() : step.figure}
        </div>
      )}
    </div>
  );
}

function StepCard({ step, index, total }) {
  return (
    <div className="solution-step">
      <h3>
        <span>{step.title || `${index + 1}. lépés`}</span>
        {step.points != null && (
          <span className="step-points">{step.points} pont</span>
        )}
      </h3>
      <StepBody step={step} />
    </div>
  );
}

export function SolutionView({ solution, topics: topicIds = [] }) {
  const [mode, setMode] = useState('step'); // 'full' | 'step'
  const [current, setCurrent] = useState(0);
  const steps = solution.steps || [];

  return (
    <div className="solution-container">
      <h2 style={{ marginTop: 28, marginBottom: 8 }}>Megoldás</h2>

      {/* Topic rule cards */}
      {topicIds.map((tid) => (
        <RuleBox key={tid} topicId={tid} defaultOpen={false} />
      ))}

      {/* Mode toggle */}
      <div className="solution-modes" role="tablist">
        <button
          role="tab"
          className={mode === 'step' ? 'active' : ''}
          onClick={() => { setMode('step'); setCurrent(0); }}
        >
          Lépésről lépésre
        </button>
        <button
          role="tab"
          className={mode === 'full' ? 'active' : ''}
          onClick={() => setMode('full')}
        >
          Teljes megoldás
        </button>
      </div>

      {mode === 'full' && (
        <div>
          {steps.map((s, i) => (
            <StepCard key={i} step={s} index={i} total={steps.length} />
          ))}
        </div>
      )}

      {mode === 'step' && steps.length > 0 && (
        <div>
          <StepCard
            step={steps[current]}
            index={current}
            total={steps.length}
          />
          <div className="step-nav">
            <button
              className="secondary"
              disabled={current === 0}
              onClick={() => setCurrent(Math.max(0, current - 1))}
            >
              ◀ Vissza
            </button>
            <span className="progress">
              {current + 1} / {steps.length}
            </span>
            <button
              disabled={current === steps.length - 1}
              onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
            >
              Következő ▶
            </button>
          </div>
        </div>
      )}

      {solution.finalAnswer && (
        <div className="final-answer">
          <h3>Végeredmény</h3>
          {typeof solution.finalAnswer === 'string' ? (
            <MathText text={solution.finalAnswer} />
          ) : (
            <div>
              {Object.entries(solution.finalAnswer).map(([k, v]) => (
                <div key={k} style={{ marginBottom: 4 }}>
                  <MathText text={v} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {solution.usedFormulas && solution.usedFormulas.length > 0 && (
        <div className="muted small" style={{ marginTop: 10 }}>
          Használt képletek/tételek: {solution.usedFormulas.join(' · ')}
        </div>
      )}
    </div>
  );
}
