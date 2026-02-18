"use client";

import { motion } from "motion/react";
import TodoListItem from "../todo-list-item/TodoListItem";
import { Todo } from "@/lib/types/todo";

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
