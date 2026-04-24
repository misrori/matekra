import { useParams, Link } from 'react-router-dom';
import { tasks } from '../tasks';
import { TaskView } from '../components/TaskView';

export function TaskPage() {
  const { id } = useParams();
  const task = tasks.find((t) => t.meta.id === id);
  if (!task) {
    return (
      <div className="pad-16 center">
        <p>Nem található feladat: <code>{id}</code></p>
        <Link to="/">← Vissza</Link>
      </div>
    );
  }
  return <TaskView task={task} />;
}
