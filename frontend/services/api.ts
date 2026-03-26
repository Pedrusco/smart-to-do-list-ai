const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

export async function createTask(title: string) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
}

export async function toggleTask(id: string, isCompleted: boolean) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted }),
  });

  return res.json();
}

export async function deleteTask(id: string) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
}

export async function generateTasks(prompt: string, apiKey?: string) {
  const res = await fetch(`${API_URL}/ai/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, apiKey }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    return {
      error: error?.message || 'Failed to generate tasks',
    };
  }

  return await res.json();
}
