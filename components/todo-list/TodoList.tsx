import { use } from "react";
import { TodoSelect } from "@/lib/schema";
import { toggleTaskIsCompleteAction } from "@/app/todos/actions";
import { Card } from "../ui/card";
import TodoListUI from "./TodoListUI";

type TodoListProps = {
  todosPromise: Promise<TodoSelect[]>;
};

export default function TodoList({ todosPromise }: TodoListProps) {
  const todos = use(todosPromise);

  const sortedTodos = [...todos].sort((a, b) => {
    // FIXME: Drizzle should auto convert
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedTodos.length === 0) return <Card>No todos found</Card>;

  return (
    <TodoListUI
      todos={sortedTodos}
      handleToggleIsCompleteAction={toggleTaskIsCompleteAction}
    />
  );
}
