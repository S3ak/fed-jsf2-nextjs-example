import z from "zod";
import { NewTodoFormSchema } from "../validations/todo";

// TODO: refactor to use zod
export interface Todo {
  id: number | string;
  title: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  createdAt: string;
}

export interface TodoResponse {
  data: Todo[];
}

export type NewTodoFormData = z.infer<typeof NewTodoFormSchema>;
