import todos from "@/data/todos.json";
import fs from "node:fs";
import path from "node:path";
import { Todo } from "@/lib/types/todo";

type TodoStoreShape = {
  data: Todo[];
};

const TODOS_DB_FILE = path.join(process.cwd(), "lib", "data", "todos.json");

function cloneTodos(items: Todo[]): Todo[] {
  return items.map((todo) => ({ ...todo }));
}

function getSeedStore(): TodoStoreShape {
  return {
    data: cloneTodos(todos.data as Todo[]),
  };
}

function ensureStoreFile() {
  if (fs.existsSync(TODOS_DB_FILE)) {
    return;
  }

  fs.writeFileSync(
    TODOS_DB_FILE,
    JSON.stringify(getSeedStore(), null, 2),
    "utf-8",
  );
}

function readStore(): TodoStoreShape {
  ensureStoreFile();

  try {
    const raw = fs.readFileSync(TODOS_DB_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<TodoStoreShape>;

    if (!parsed || !Array.isArray(parsed.data)) {
      return getSeedStore();
    }

    return {
      data: parsed.data,
    };
  } catch {
    return getSeedStore();
  }
}

function writeStore(store: TodoStoreShape) {
  fs.writeFileSync(TODOS_DB_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function getTodos() {
  return cloneTodos(readStore().data);
}

export function getTodoById(id: string) {
  return readStore().data.find((todo) => todo.id.toString() === id);
}

export function addTodo(todo: Todo) {
  const store = readStore();
  const nextTodos = [...store.data, todo];

  writeStore({ data: nextTodos });

  return cloneTodos(nextTodos);
}

export function updateTodoById(id: string, updates: Partial<Todo>): Todo[] {
  const store = readStore();
  const nextTodos = store.data.map((todo) => {
    if (todo.id.toString() !== id) {
      return todo;
    }

    return {
      ...todo,
      ...updates,
    };
  });

  writeStore({ data: nextTodos });

  return cloneTodos(nextTodos);
}
