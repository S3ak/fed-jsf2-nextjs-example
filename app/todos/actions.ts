"use server";

import { revalidatePath, updateTag } from "next/cache";
import {
  TodoSchema,
  ToggleTaskIsCompleteActionSchema,
  MutateTodoActionResult,
  type CreateTodoActionResult,
  type ToggleTodoCompleteFormData,
  CreateTodoFormDataSchema,
} from "@/lib/types/todo";
import z from "zod";
import { addTodo, getTodos, updateTodoById } from "@/lib/data/todo-store-local";

export async function getTodosAction() {
  return {
    success: true,
    todo: getTodos(),
  };
}

export async function createTodoAction(
  formValues: FormData,
): Promise<CreateTodoActionResult> {
  try {
    console.log("---------------------------");
    console.info(">>> START server actino <<<", formValues.get("title"));

    // Validate form fields using Zod
    const validatedFields = CreateTodoFormDataSchema.safeParse({
      title: String(formValues.get("title") ?? ""),
      dueDate: String(formValues.get("dueDate") ?? ""),
      priority: String(formValues.get("priority") ?? "low"),
    });

    if (!validatedFields.success) {
      const flattened = z.flattenError(validatedFields.error);
      return {
        errors: flattened.fieldErrors,
        success: false,
      };
    }

    // TODO: Get from auth
    const currentUserId = crypto.randomUUID();
    const now = new Date().toISOString();

    const todo = TodoSchema.parse({
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      isCompleted: false,
      authorId: currentUserId,
      ...validatedFields.data,
    });

    // If form validation fails, return errors early. Otherwise, continue.

    // Send to your API
    // const response = await fetch(`${API_URL}/todos`, {
    //   method: "POST",
    //   body: formValues,
    // });

    const response = addTodo(todo);

    // if (!response.ok) {
    //   throw new Error("Failed to create todo");
    // }

    // Revalidate the todos page to show the new todo
    revalidatePath("/todos");
    updateTag("todos");

    console.log(">>> server action reached <<<");

    return { success: true };
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
}

export async function toggleTaskIsCompleteAction(
  formValues: FormData,
): Promise<MutateTodoActionResult> {
  try {
    // We express the todo with a interface instead of unknown formData
    const updateTodoData: ToggleTodoCompleteFormData = {
      id: String(formValues.get("id") ?? ""),
      isCompleted: String(formValues.get("completed")) === "true",
    };

    const validatedTodoData = ToggleTaskIsCompleteActionSchema.safeParse({
      id: String(updateTodoData.id),
      completed: updateTodoData.isCompleted,
    });

    if (!validatedTodoData.success) {
      return {
        success: false,
        errors: z.treeifyError(validatedTodoData.error),
      };
    }

    // TODO: Use Neon/ drizzle to execute the query on db
    /**
     * example const {success} neon.update()
     */
    // await mutateTodo(updateTodoData.id, {
    //   isCompleted: updateTodoData.isCompleted,
    // });

    updateTodoById(validatedTodoData.data.id, {
      isCompleted: validatedTodoData.data.isCompleted,
    });

    revalidatePath("/todos");
    updateTag("todos");

    return { success: true };

    // Revalidate the todos page to show the new todo
  } catch (error) {
    console.error("Error updating todo:", error);
    return { success: false, errors: error };
  }
}
