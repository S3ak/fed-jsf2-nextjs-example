import z from "zod";
import { type TodoSelect, todosTable } from "@/lib/schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/effect-schema";
// NOTE: https://orm.drizzle.team/docs/effect-schema

const DueDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(new Date(value).getTime()), {
    message: "Invalid datetime.",
  })
  .transform((value) => new Date(value).toISOString());

export const TodoSchema = createSelectSchema(todosTable);

// Schema for inserting a user - can be used to validate API requests
const TodoInsert = createInsertSchema(todosTable);

// Schema for updating a Todo - can be used to validate API requests
const TodoUpdate = createUpdateSchema(todosTable);

// Schema for selecting a Todo - can be used to validate API responses
const TodoSelect = createSelectSchema(todosTable);

export const CreateTodoFormDataSchema = TodoSchema.pick({
  title: true,
  dueDate: true,
  priority: true,
});

export const MutateTodoFormSchema = TodoSchema.pick({
  title: true,
  dueDate: true,
  priority: true,
  isCompleted: true,
});

export const OverrideMutateTodoFormSchema = MutateTodoFormSchema.extend({
  dueDate: z
    .date({
      message: "A date of birth is required.",
    })
    .transform((val) => val.toISOString()),
});

export const ToggleTaskIsCompleteActionSchema = TodoSchema.pick({
  id: true,
  isCompleted: true,
});

// TODO: rename it to mutateTodoActionResult
export type CreateTodoActionResult = {
  success: boolean;
  errors?: {
    title?: string[];
    dueDate?: string[];
    priority?: string[];
  };
};

export type MutateTodoActionResult = {
  success: boolean;
  errors?: unknown;
};

export type Todo = Omit<TodoSelect, "description"> & {
  description?: string;
};

export interface TodoResponse {
  data: Todo[];
}

export type createTodoFormData = z.infer<typeof CreateTodoFormDataSchema>;

export type ToggleTodoCompleteFormData = z.infer<
  typeof ToggleTaskIsCompleteActionSchema
>;

export type MutateTodoFormSchemaType = z.infer<typeof MutateTodoFormSchema>;
