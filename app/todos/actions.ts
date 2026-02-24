"use server";

import { z } from "zod";
import { API_URL } from "@/lib/constants";
import { revalidatePath, revalidateTag } from "next/cache";

const TodoFormDataSchema = z.object({
  title: z.string(),
  dueDate: z.string(),
  priority: z.string(),
});

export type CreateTodoActionResult = {
  success: boolean;
  errors?: {
    title?: string[];
    dueDate?: string[];
    priority?: string[];
  };
};

export async function createTodoAction(
  formValues: FormData,
): Promise<CreateTodoActionResult> {
  try {
    // Validate form fields using Zod
    const validatedFields = TodoFormDataSchema.safeParse({
      title: formValues.get("title"),
      dueDate: formValues.get("dueDate"),
      priority: formValues.get("priority"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        // FIXME:
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      };
    }
    // Send to your API
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      body: formValues,
    });

    console.warn("response >>>", response);

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    // Revalidate the todos page to show the new todo
    revalidatePath("/todos");
    revalidateTag("todos", "max");

    return { success: true };
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
}
