"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  LoginActionResult,
  LoginFormData,
  LoginFormDataSchema,
} from "@/lib/types/auth";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

type LoginFormProps = {
  loginAction: (data: FormData) => Promise<LoginActionResult>;
};

export default function LoginForm({ loginAction }: LoginFormProps) {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormDataSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    setFormError(null);

    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);

    const result = await loginAction(formData);

    if (result.success) {
      return;
    }

    if (result.errors?.email?.[0]) {
      setError("email", {
        type: "server",
        message: result.errors.email[0],
      });
    }

    if (result.errors?.password?.[0]) {
      setError("password", {
        type: "server",
        message: result.errors.password[0],
      });
    }

    if (result.message) {
      setFormError(result.message);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in to continue to your todos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <FieldError errors={[errors.password]} />
          </Field>

          {formError ? <FieldError>{formError}</FieldError> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="w-full">
        <div className="w-full space-y-2">
          <div>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => signIn("google", { redirectTo: "/todos" })}
            >
              <FaGoogle />
              Sign In with Google
            </Button>
          </div>
          <div>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => signIn("github", { redirectTo: "/todos" })}
            >
              <FaGithub />
              Sign In with Github
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
