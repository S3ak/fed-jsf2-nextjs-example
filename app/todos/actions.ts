"use server";

import { revalidatePath, updateTag } from "next/cache";
import {
  TodoSchema,
  ToggleTaskIsCompleteActionSchema,
  MutateTodoFormSchema,
  type MutateTodoActionResult,
  type CreateTodoActionResult,
  type ToggleTodoCompleteFormData,
  CreateTodoFormDataSchema,
  MutateTodoFormSchemaType,
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
  formData: FormData,
): Promise<CreateTodoActionResult> {
  try {
    // Validate form fields using Zod
    const validatedFields = CreateTodoFormDataSchema.safeParse({
      title: String(formData.get("title") ?? ""),
      dueDate: String(formData.get("dueDate") ?? ""),
      priority: String(formData.get("priority") ?? "low"),
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

    // Build out our todo for db insert
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

    return { success: true };
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
}

export async function mutateTodoAction(
  formData: FormData,
): Promise<MutateTodoActionResult> {
  try {
    // TODO: fix this at the root
    type MutateTodoFormPayload = MutateTodoFormSchemaType & { id: string };

    console.info(">>> formData ->", formData);
    const updateTodoData: MutateTodoFormPayload = {
      isCompleted: String(formData.get("isCompleted")) === "true",
      dueDate: String(formData.get("dueDate")),
      priority: String(formData.get("priority") ?? "low") as
        | "low"
        | "medium"
        | "high",
      title: String(formData.get("title")),
      id: String(formData.get("id")),
    };

    const validatedTodoData = MutateTodoFormSchema.safeParse({
      isCompleted: updateTodoData.isCompleted,
      dueDate: updateTodoData.dueDate,
      title: updateTodoData.title,
    });

    if (!validatedTodoData.success) {
      return {
        success: false,
        errors: z.treeifyError(validatedTodoData.error),
      };
    }

    updateTodoById(updateTodoData.id, validatedTodoData.data);

    return { success: true };
  } catch (error) {
    console.error("Error updating todo:", error);
    return { success: false, errors: error };
  }
}

export async function toggleTaskIsCompleteAction(
  formData: FormData,
): Promise<MutateTodoActionResult> {
  try {
    // We express the todo with a interface instead of unknown formData
    const updateTodoData: ToggleTodoCompleteFormData = {
      id: String(formData.get("id") ?? ""),
      isCompleted: String(formData.get("isCompleted")) === "true",
    };

    console.log("updateTodoData id", updateTodoData.id);
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

    console.warn(">>> Server action valdation passed <<<<");

    // TODO: Use Neon/ drizzle to execute the query on db
    /**
     * example const {success} neon.update()
     */
    // await mutateTodo(updateTodoData.id, {
    //   isCompleted: updateTodoData.isCompleted,
    // });

    const todos = updateTodoById(validatedTodoData.data.id, {
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
