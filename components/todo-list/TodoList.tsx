import { Todo } from "@/lib/types/todo";
import { fetchTodos } from "@/lib/data";
import TodoListUI, { TodoListSkeleton } from "./TodoListUI";
import { Card } from "../ui/card";

export default async function TodoList() {
  const json = await fetchTodos();
  const todos: Todo[] = json.data;

  if (!todos) return <TodoListSkeleton />;

  if (todos.length === 0) return <Card>No todos found</Card>;

  return <TodoListUI todos={todos} />;
}
