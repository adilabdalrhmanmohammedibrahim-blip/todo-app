import { useEffect, useState } from "react";
import { STARTER_TODOS } from "./data";
import { loadTodos, saveTodos } from "./storage";

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos(STARTER_TODOS));

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setTodos((currentTodos) => [
      {
        id: Date.now(),
        text: trimmedText,
        completed: false,
      },
      ...currentTodos,
    ]);
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  function updateTodo(id, text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
  }

  function clearCompleted() {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !todo.completed)
    );
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
}