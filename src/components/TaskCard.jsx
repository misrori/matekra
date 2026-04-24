import { Link } from 'react-router-dom';

export function TaskCard({ task }) {
  const { meta } = task;
  return (
    <Link to={`/task/${meta.id}`} className="task-card">
      <div className="task-card-head">
        <span>{meta.year}. {meta.session} · {meta.level}</span>
        <span>#{String(meta.number).padStart(2, '0')}{meta.sub ? meta.sub : ''}</span>
      </div>
      <div className="task-card-title">{meta.title}</div>
      <div className="task-card-tags">
        <span className={`tag part-${meta.part}`}>{meta.part}. rész</span>
        <span className="tag points">{meta.points} pont</span>
        {meta.difficulty && (
          <span className={`tag diff-${meta.difficulty}`}>
            {'★'.repeat(meta.difficulty)}
          </span>
        )}
      </div>
      <div className="task-card-tags">
        {meta.topics.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </Link>
  );
}
