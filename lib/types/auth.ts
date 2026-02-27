import z from "zod";

export const LoginFormDataSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginFormData = z.infer<typeof LoginFormDataSchema>;

export type LoginActionResult = {
  success: boolean;
  errors?: Partial<Record<keyof LoginFormData, string[]>>;
  message?: string;
};
