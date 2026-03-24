import { Todo } from "@/lib/types/todo";
import TodoListUI from "./TodoListUI";
import { Card } from "../ui/card";
import { toggleTaskIsCompleteAction } from "@/app/todos/actions";
import { use } from "react";

type TodoListProps = {
  todosPromise: Promise<Todo[]>;
};

export default function TodoList({ todosPromise }: TodoListProps) {
  const todos = use(todosPromise);

  const sortedTodos = [...todos].sort((a, b) => {
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
