import z from "zod";
import {
  TODO_DEFAULT_MIN_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  todoPriority,
  type TodoInsert,
  type TodoSelect,
} from "@/lib/schema";

const DueDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(new Date(value).getTime()), {
    message: "Invalid datetime.",
  })
  .transform((value) => new Date(value).toISOString());

const TodoPrioritySchema = z.enum(todoPriority.enumValues);

export const TodoSchema = z.object({
  id: z.uuid(),
  slug: z.string().nullable().optional(),
  dueDate: DueDateSchema,
  isCompleted: z.boolean().default(false),
  title: z
    .string()
    .min(TODO_DEFAULT_MIN_LENGTH, "Title must be at least 2 characters")
    .max(
      TODO_TITLE_MAX_LENGTH,
      `Title must not exceed ${TODO_TITLE_MAX_LENGTH} characters`,
    ),
  description: z
    .string()
    .min(TODO_DEFAULT_MIN_LENGTH, "Description must be at least 2 characters")
    .nullable()
    .optional(),
  priority: TodoPrioritySchema.default("low"),
  authorId: z.uuid(),
  updatedAt: z.iso.datetime().optional(),
  createdAt: z.iso.datetime().optional(),
  deletedAt: z.iso.datetime().optional(),
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

export interface TodoResponse {
  data: TodoSelect[];
}

export type createTodoFormData = z.infer<typeof CreateTodoFormDataSchema>;

export type ToggleTodoCompleteFormData = z.infer<
  typeof ToggleTaskIsCompleteActionSchema
>;

export type MutateTodoFormSchemaType = z.infer<typeof MutateTodoFormSchema>;
