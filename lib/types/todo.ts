import z from "zod";
import { NewTodoFormSchema } from "../validations/todo";

export interface Todo {
  id: number | string;
  title: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
}

export interface TodoResponse {
  data: Todo[];
}

export type NewTodoFormData = z.infer<typeof NewTodoFormSchema>;
