"use client";

import { motion } from "motion/react";
import TodoListItem from "../todo-list-item/TodoListItem";
import { Todo } from "@/lib/types/todo";
import { Card, CardFooter, CardHeader } from "../ui/card";

type IProps = {
  todos: Todo[];
};

const containerVariants = {
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start hidden, 20px below final position
  visible: { opacity: 1, y: 0 }, // End visible, at final position
};

export default function TodoList({ todos = [] }: IProps) {
  console.log("todos", todos);
  return (
    <motion.section
      className="flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {todos.map(({ id, title, priority, dueDate, completed }) => (
        <motion.div key={id} variants={itemVariants}>
          <TodoListItem
            id={id}
            title={title}
            priority={priority}
            dueDate={dueDate}
            completed={completed}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}

export function TodoListSkeleton() {
  return (
    <section className="flex flex-col gap-3" aria-label="Loading todos">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="gap-4">
          <CardHeader className="gap-2">
            <div className="h-5 w-1/2 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
          </CardHeader>
          <CardFooter>
            <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
