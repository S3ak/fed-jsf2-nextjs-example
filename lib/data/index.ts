import { API_URL } from "../constants";
import { Todo, TodoResponse } from "../types/todo";
import { updateTodoById } from "./todo-store-local";

export async function fetchTodos() {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      cache: "no-store",
      next: {
        tags: ["todos"],
      },
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch the todos");
    }

    return json;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch the todos");
  }
}

export async function createTodo(todo: Todo) {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch the todos");
    }

    const json: TodoResponse = await res.json();

    return json;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch the todos");
  }
}

export async function mutateTodo(id: string, todo: Partial<Todo>) {
  try {
    // const res = await fetch(`${API_URL}/todos/${id}`, {
    //   method: "PATCH",
    //   body: JSON.stringify(todo),
    // });

    // if (!res.ok) {
    //   throw new Error("Failed to fetch the todos");
    // }

    // const json: TodoResponse = await res.json();
    const todos = await updateTodoById(id, todo);

    return todos;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch the todos");
  }
}
