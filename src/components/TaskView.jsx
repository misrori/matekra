import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MathText, InlineMath } from '../lib/katex';
import { Collapsible } from './Collapsible';
import { AnswerCheck } from './AnswerCheck';
import { FgvtReference } from './FgvtReference';
import { RuleBox } from './RuleBox';
import { findNextTask } from '../tasks';

function StepCard({ step, index }) {
  return (
    <div className="solution-step">
      <h3>
        <span>{step.title || `${index + 1}. lépés`}</span>
        {step.points != null && (
          <span className="step-points">{step.points} pont</span>
        )}
      </h3>
      <div className="solution-step-body">
        <MathText text={step.body} />
        {step.figure && (
          <div style={{ marginTop: 10 }}>
            {typeof step.figure === 'function' ? step.figure() : step.figure}
          </div>
        )}
      </div>
    </div>
  );
}

function Hint({ steps }) {
  // Show only the first step as a hint — or a short summary if present
  const first = steps?.[0];
  if (!first) return <div className="muted">Nincs elérhető tipp.</div>;
  return (
    <div>
      <div className="muted small" style={{ marginBottom: 8 }}>
        Első lépés — csak egy kis lökés:
      </div>
      <StepCard step={first} index={0} />
      {steps.length > 1 && (
        <div className="muted small" style={{ marginTop: 8 }}>
          Még {steps.length - 1} lépés van hátra a teljes megoldásban.
        </div>
      )}
    </div>
  );
}

function StepByStep({ steps }) {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <StepCard step={steps[current]} index={current} />
      <div className="step-nav">
        <button
          className="btn btn-secondary"
          disabled={current === 0}
          onClick={() => setCurrent(Math.max(0, current - 1))}
        >
          ◀ Vissza
        </button>
        <span className="progress">{current + 1} / {steps.length}</span>
        <button
          className="btn btn-primary"
          disabled={current === steps.length - 1}
          onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
        >
          Következő ▶
        </button>
      </div>
    </div>
  );
}

function FullSolution({ steps }) {
  return (
    <div>
      {steps.map((s, i) => <StepCard key={i} step={s} index={i} />)}
    </div>
  );
}

function FinalAnswerBox({ finalAnswer, usedFormulas }) {
  return (
    <div className="final-answer">
      <h3>Végeredmény</h3>
      {typeof finalAnswer === 'string' ? (
        <MathText text={finalAnswer} />
      ) : (
        <div>
          {Object.entries(finalAnswer).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 4 }}>
              <MathText text={v} />
            </div>
          ))}
        </div>
      )}
      {usedFormulas && usedFormulas.length > 0 && (
        <div className="muted small" style={{ marginTop: 8 }}>
          Használt képletek/tételek: {usedFormulas.join(' · ')}
        </div>
      )}
    </div>
  );
}

function NextTaskBar({ task }) {
  const navigate = useNavigate();
  const similar = useMemo(() => findNextTask(task, 0), [task]);
  const harder = useMemo(() => findNextTask(task, 1), [task]);
  const easier = useMemo(() => findNextTask(task, -1), [task]);

  const go = (t) => {
    if (!t) return;
    navigate(`/task/${t.meta.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const card = (t, label, icon, tone) => {
    if (!t) return null;
    return (
      <button className={`next-card tone-${tone}`} onClick={() => go(t)}>
        <span className="next-icon">{icon}</span>
        <span className="next-label">{label}</span>
        <span className="next-title">
          <InlineMath text={t.meta.title} />
        </span>
        <span className="next-meta">
          {t.meta.year}. {t.meta.session} · {t.meta.points} pont ·{' '}
          {'★'.repeat(t.meta.difficulty || 0)}
        </span>
      </button>
    );
  };

  return (
    <div className="next-task-bar">
      <h3>Következő feladat</h3>
      <div className="next-cards">
        {card(easier, 'Egyszerűbb', '🟢', 'easy')}
        {card(similar, 'Hasonló szint', '🔵', 'similar')}
        {card(harder, 'Nehezebb', '🔴', 'hard')}
      </div>
    </div>
  );
}

export function TaskView({ task }) {
  const { meta, problem, solution } = task;
  const hasCheck = !!meta.check;
  const hasSolution = solution?.steps?.length > 0;

  return (
    <div className="task-page">
      <div style={{ marginBottom: 16 }}>
        <Link to="/" className="small muted">← Vissza a feladatlistához</Link>
      </div>

      <div className="task-hero">
        <div className="task-hero-labels">
          <span className={`tag part-${meta.part}`}>{meta.part}. rész</span>
          <span className="tag points">{meta.points} pont</span>
          <span className={`tag level-${meta.level}`}>{meta.level}szint</span>
          {meta.difficulty && (
            <span className={`tag diff-${meta.difficulty}`}>
              {'★'.repeat(meta.difficulty)}{'☆'.repeat(5 - meta.difficulty)}
            </span>
          )}
          {meta.estimatedMinutes && (
            <span className="tag time">⏱ ~{meta.estimatedMinutes} perc</span>
          )}
        </div>
        <h1>
          {meta.number}{meta.sub ? meta.sub : ''}. feladat —{' '}
          <InlineMath text={meta.title} />
        </h1>
        <div className="task-hero-sub">
          {meta.year}. {meta.session}
          {meta.topics && meta.topics.length > 0 && (
            <>
              {' · '}
              {meta.topics.map((t, i) => (
                <span key={t} className="tag soft">{t}</span>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="problem-box">
        <div className="problem-box-head">
          <span className="problem-box-label">📝 Feladat</span>
        </div>
        <div className="problem-body">
          <MathText text={problem.statement} />
        </div>
        {problem.figure && (
          <div style={{ marginTop: 12 }}>
            {typeof problem.figure === 'function' ? problem.figure() : problem.figure}
          </div>
        )}
        {problem.asked && (
          <div className="problem-asked">
            <strong>Kért válasz:</strong>{' '}
            {problem.asked.map((a, i) => (
              <span key={i}>
                {i > 0 && '; '}
                <MathText text={a.label} />
              </span>
            ))}
          </div>
        )}
      </div>

      {hasCheck && <AnswerCheck check={meta.check} />}

      {hasSolution && (
        <div className="solution-section">
          <Collapsible
            title="Kis segítség"
            subtitle="Első lépés a megoldáshoz"
            icon="💡"
            tone="hint"
            defaultOpen={false}
          >
            <Hint steps={solution.steps} />
          </Collapsible>

          <Collapsible
            title="Megoldás lépésről lépésre"
            subtitle="Tovább-gomb a következő lépéshez"
            icon="👣"
            tone="solution"
            defaultOpen={false}
          >
            <StepByStep steps={solution.steps} />
          </Collapsible>

          <Collapsible
            title="Teljes megoldás"
            subtitle="Minden lépés egyben"
            icon="📖"
            tone="solution"
            defaultOpen={false}
          >
            <FullSolution steps={solution.steps} />
            {solution.finalAnswer && (
              <FinalAnswerBox
                finalAnswer={solution.finalAnswer}
                usedFormulas={solution.usedFormulas}
              />
            )}
          </Collapsible>
        </div>
      )}

      {meta.topics?.length > 0 && (
        <Collapsible
          title="Témakör szabályai és képletei"
          subtitle={meta.topics.join(' · ')}
          icon="📚"
          tone="rule"
          defaultOpen={false}
        >
          {meta.topics.map((tid) => (
            <RuleBox key={tid} topicId={tid} defaultOpen={true} />
          ))}
        </Collapsible>
      )}

      {meta.fgvt && meta.fgvt.length > 0 && (
        <Collapsible
          title="Négyjegyű függvénytáblázat"
          subtitle="Az érettségin használható képletek helye"
          icon="📘"
          tone="fgvt"
          defaultOpen={false}
        >
          <div style={{ lineHeight: 1.8 }}>
            <FgvtReference refs={meta.fgvt} />
          </div>
        </Collapsible>
      )}

      <NextTaskBar task={task} />
    </div>
  );
}
