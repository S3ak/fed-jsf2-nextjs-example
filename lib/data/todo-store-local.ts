import todos from "@/data/todos.json";
import { Todo } from "@/lib/types/todo";

let memTodos: Todo[] = [...(todos.data as Todo[])];

export function getTodos() {
  return memTodos;
}

export function getTodoById(id: string) {
  return memTodos.find((todo) => todo.id.toString() === id);
}

export function addTodo(todo: Todo) {
  memTodos = [...memTodos, todo];
  return memTodos;
}

export function updateTodoById(id: string, updates: Partial<Todo>) {
  let updatedTodo: Todo | undefined;

  memTodos = memTodos.map((todo) => {
    if (todo.id.toString() !== id) {
      return todo;
    }

    updatedTodo = {
      ...todo,
      ...updates,
    };

    return updatedTodo;
  });

  return updatedTodo;
}
