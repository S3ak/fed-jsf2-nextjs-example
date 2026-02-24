import { z } from "zod";

export const NewTodoFormSchema = z.object({
  // TODO: Implment correct validation rules
  title: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  // #TODO: use date
  dueDate: z.string(),
});
