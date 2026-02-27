import z from "zod";

const DueDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(new Date(value).getTime()), {
    message: "Invalid datetime.",
  })
  .transform((value) => new Date(value).toISOString());

export const TodoSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  isCompleted: z.boolean().default(false),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .optional(),
  dueDate: DueDateSchema,
  priority: z.enum(["low", "medium", "high"]).default("low"),
  authorId: z.uuid(),
});

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

export type Todo = z.infer<typeof TodoSchema>;

export interface TodoResponse {
  data: Todo[];
}

export type createTodoFormData = z.infer<typeof CreateTodoFormDataSchema>;

export type ToggleTodoCompleteFormData = z.infer<
  typeof ToggleTaskIsCompleteActionSchema
>;

export type MutateTodoFormSchemaType = z.infer<typeof MutateTodoFormSchema>;
