const STORAGE_KEY = "desklist.todos";

export function loadTodos(fallback = []) {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return fallback;

    return parsed.map((todo) => ({ ...todo }));
  } catch (error) {
    console.error("Invalid saved tasks:", error);
    localStorage.removeItem(STORAGE_KEY);
    return fallback;
  }
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}