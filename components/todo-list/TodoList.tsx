import { Todo } from "@/lib/types/todo";
import { fetchTodos } from "@/lib/data";
import TodoListUI, { TodoListSkeleton } from "./TodoListUI";
import { Card } from "../ui/card";
import { toggleTaskIsCompleteAction } from "@/app/todos/actions";

export default async function TodoList() {
  const json = await fetchTodos();
  const todos: Todo[] = json.data;

  // Sort todos by createdAt date (newest first)
  const sortedTodos = todos.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (!sortedTodos) return <TodoListSkeleton />;

  if (sortedTodos.length === 0) return <Card>No todos found</Card>;

  return (
    <TodoListUI
      todos={sortedTodos}
      handleToggleIsCompleteAction={toggleTaskIsCompleteAction}
    />
  );
}
