"use client";

// import { motion } from "motion/react";
import TodoListItem from "../todo-list-item/TodoListItem";
import { MutateTodoActionResult, Todo } from "@/lib/types/todo";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type TodoListUIProps = {
  todos: Todo[];
  handleToggleIsCompleteAction: (
    data: FormData,
  ) => Promise<MutateTodoActionResult>;
};

const _containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // This is the key property: it sets a delay between each child animation
      staggerChildren: 0.1, // 0.1 seconds delay between each item
      when: "beforeChildren", // Optional: parent animation completes first
    },
  },
};

const _itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start hidden, 20px below final position
  visible: { opacity: 1, y: 0 }, // End visible, at final position
};

export default function TodoListUI({
  todos = [],
  handleToggleIsCompleteAction,
}: TodoListUIProps) {
  return (
    // FIXME: Motion is causeing rerendering issues
    <section
      className="flex flex-col gap-3"
      // variants={containerVariants}
      // initial="hidden"
      // animate="visible"
    >
      {todos.map(
        ({
          id,
          title,
          priority,
          dueDate,
          isCompleted,
          createdAt,
          updatedAt,
          authorId,
        }) => (
          <div
            key={id}
            //  variants={itemVariants}
          >
            <TodoListItem
              id={id}
              title={title}
              priority={priority}
              dueDate={dueDate}
              isCompleted={isCompleted}
              createdAt={createdAt}
              updatedAt={updatedAt}
              authorId={authorId}
              onToggleIsComplete={handleToggleIsCompleteAction}
            />
          </div>
        ),
      )}
    </section>
  );
}

export function TodoListSkeleton() {
  return (
    <section className="flex flex-col gap-3" aria-label="Loading todos">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="gap-4">
          <CardHeader className="gap-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-4 w-1/3" />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
