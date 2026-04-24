import { topics } from '../topics';
import { RuleBox } from '../components/RuleBox';
import { tasks } from '../tasks';
import { Link } from 'react-router-dom';

export function TopicsPage() {
  const topicIds = Object.keys(topics);
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Témakörök és szabályok</h2>
      <p className="muted">
        Gyors utalás a fő matek témakörök képleteire, tételeire. Minden témánál látható, hogy a feladatokban hol kerül elő.
      </p>
      {topicIds.map((tid) => {
        const relatedTasks = tasks.filter((t) => t.meta.topics.includes(tid));
        return (
          <div key={tid} style={{ marginBottom: 24 }}>
            <RuleBox topicId={tid} defaultOpen />
            {relatedTasks.length > 0 && (
              <div className="small" style={{ marginTop: 6, paddingLeft: 12 }}>
                Kapcsolódó feladatok:{' '}
                {relatedTasks.map((t, i) => (
                  <span key={t.meta.id}>
                    {i > 0 && ', '}
                    <Link to={`/task/${t.meta.id}`}>
                      #{t.meta.number}{t.meta.sub ?? ''} — {t.meta.title}
                    </Link>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
