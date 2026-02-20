import { z } from "zod";

export const NewTodoFormSchema = z.object({
  title: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string(),
});
