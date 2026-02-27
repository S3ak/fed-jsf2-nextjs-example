"use server";

import { AuthError } from "next-auth";
import z from "zod";
import { signIn } from "@/auth";
import { LoginActionResult, LoginFormDataSchema } from "@/lib/types/auth";

export async function loginAction(
  formData: FormData,
): Promise<LoginActionResult> {
  const validatedFields = LoginFormDataSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  const authFormData = new FormData();
  authFormData.set("email", validatedFields.data.email);
  authFormData.set("password", validatedFields.data.password);
  authFormData.set("redirectTo", "/todos");

  try {
    await signIn("credentials", authFormData);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    throw error;
  }
}
