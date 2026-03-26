import { Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Tooltip } from './Tooltip';

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;

      if (!el) return;

      // Only show the tooltip when the title would wrap beyond two lines.
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 2;

      setIsOverflowing(el.scrollHeight > maxHeight + 1);
    }
  }, [task.title]);

  return (
    <div className="flex items-start justify-between bg-zinc-800 px-3 py-2 rounded border border-zinc-700 hover:bg-zinc-700 hover:scale-[1.01] transition-all duration-150">
      <div
        onClick={onToggle}
        className="flex items-start gap-3 flex-1 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={task.isCompleted}
          readOnly
          className="mt-1 w-4 h-4 accent-purple-500 cursor-pointer shrink-0"
        />

        <div
          className="flex-1"
          onMouseEnter={(e) => {
            if (!isOverflowing) return;

            const rect = e.currentTarget.getBoundingClientRect();

            const tooltipWidth = 260;

            setTooltipPos({
              x: Math.min(
                rect.right + 16,
                window.innerWidth - tooltipWidth - 16,
              ),
              y: rect.top - 12,
            });

            setShowTooltip(true);
          }}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span
            ref={textRef}
            className={`line-clamp-2 ${
              task.isCompleted ? 'line-through text-zinc-500' : ''
            }`}
          >
            {task.title}
          </span>

          {showTooltip && isOverflowing && (
            <Tooltip text={task.title} position={tooltipPos} />
          )}
        </div>
      </div>

      <button
        onClick={onDelete}
        className="cursor-pointer ml-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1 rounded transition-all duration-150 self-start"
      >
        <Trash size={16} />
      </button>
    </div>
  );
}
