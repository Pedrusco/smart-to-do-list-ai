'use client';

import { Spinner } from '@/components/Spinner';
import { TaskList } from '@/components/TaskList';
import { OPENAI_API_KEY_STORAGE_KEY } from '@/constants/storage';
import {
  createTask,
  deleteTask,
  generateTasks,
  getTasks,
  toggleTask,
} from '@/services/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleCreate() {
    if (title.trim().length < 3) {
      toast.error('Task must have at least 3 characters');
      return;
    }

    await createTask(title);
    setTitle('');
    loadTasks();
  }

  async function handleToggle(task: Task) {
    await toggleTask(task.id, !task.isCompleted);
    loadTasks();
  }

  async function handleDelete(id: string) {
    await deleteTask(id);
    loadTasks();
  }

  async function handleGenerateAI() {
    if (title.trim().length < 10) {
      toast.error('Please describe your goal in more detail');
      return;
    }

    try {
      setLoadingAI(true);

      const newTasks = await generateTasks(title, apiKey);

      if ('error' in newTasks) {
        toast.error(newTasks.error);
        return;
      }

      setTasks((prev) => [...newTasks, ...prev]);
      setTitle('');

      toast.success('Tasks generated!');
    } catch (error: unknown) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to generate tasks',
      );
    } finally {
      setLoadingAI(false);
    }
  }

  function handleSaveApiKey() {
    const trimmedApiKey = apiKey.trim();

    if (!trimmedApiKey) {
      setApiKey('');
      setIsApiKeySaved(false);
      return;
    }

    localStorage.setItem(OPENAI_API_KEY_STORAGE_KEY, apiKey);
    setIsApiKeySaved(true);
  }

  function handleEditApiKey() {
    setIsApiKeySaved(false);
  }

  function handleApiKeyChange(value: string) {
    setApiKey(value);

    if (value.trim()) return;

    localStorage.removeItem(OPENAI_API_KEY_STORAGE_KEY);
    setIsApiKeySaved(false);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTasks();
        setTasks(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const savedKey = localStorage.getItem(OPENAI_API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
      setIsApiKeySaved(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          Smart To-Do List
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div className="flex flex-col gap-3">
            <textarea
              id="task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Describe your goal or create a task..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-3 outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none leading-relaxed custom-scroll"
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                type="submit"
                disabled={!title.trim()}
                className="bg-blue-600 py-2 rounded hover:bg-blue-500 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Task
              </button>

              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={!title.trim() || loadingAI}
                className="bg-linear-to-r from-purple-600 to-pink-600 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                {loadingAI ? <Spinner /> : '✨ AI Generate'}
              </button>
            </div>
          </div>
        </form>

        <div className="flex gap-2">
          <input
            id="apikey"
            type="password"
            value={apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            placeholder="OpenAI API Key (optional)"
            disabled={isApiKeySaved}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          />

          {!isApiKeySaved ? (
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="bg-green-600 px-3 py-2 rounded active:scale-95 transition-all duration-200 cursor-pointer hover:bg-green-500 disabled:opacity-50"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEditApiKey}
              className="bg-yellow-600 px-3 py-2 rounded hover:bg-yellow-500 transition"
            >
              Edit
            </button>
          )}
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
