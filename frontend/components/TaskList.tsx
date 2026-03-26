import { EmptyState } from './EmptyState';
import { Spinner } from './Spinner';
import { TaskItem } from './TaskItem';

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export function TaskList({
  tasks,
  loading,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  loading: boolean;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-h-96 min-h-96 overflow-y-auto custom-scroll shadow-inner flex flex-col">
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!loading && tasks.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState />
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="space-y-2 p-4 animate-fade-in">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggle(task)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
