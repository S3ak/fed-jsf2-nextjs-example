import z from "zod";

export const TodoSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  isCompleted: z.boolean().default(false),
  title: z.string().min(2),
  description: z.string().min(2).optional(),
  dueDate: z.iso.datetime(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  authorId: z.uuid(),
});

export const CreateTodoFormDataSchema = TodoSchema.pick({
  title: true,
  dueDate: true,
  priority: true,
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

export type Todo = z.infer<typeof TodoSchema>;

export interface TodoResponse {
  data: Todo[];
}

export type createTodoFormData = z.infer<typeof CreateTodoFormDataSchema>;

export type ToggleTodoCompleteFormData = z.infer<
  typeof ToggleTaskIsCompleteActionSchema
>;
