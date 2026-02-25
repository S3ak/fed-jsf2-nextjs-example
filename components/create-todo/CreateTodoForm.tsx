"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/style-utils";
import {
  CreateTodoActionResult,
  createTodoFormData,
  CreateTodoFormDataSchema,
} from "@/lib/types/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

type CreateTodoFormProps = {
  createTodoAction: (data: FormData) => Promise<CreateTodoActionResult>;
};

export default function CreateTodoForm({
  createTodoAction,
}: CreateTodoFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      dueDate: "",
      priority: "low",
    },
    resolver: zodResolver(CreateTodoFormDataSchema),
  });

  const onFormSubmit = async (formValues: createTodoFormData) => {
    const data = new FormData();

    data.append("title", formValues.title);
    data.append("priority", formValues.priority);
    data.append("dueDate", formValues.dueDate);

    const { success, errors } = await createTodoAction(data);
    reset();

    if (success) {
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-4"
      noValidate
    >
      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="todo-title">
          Title{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <input
          id="todo-title"
          type="text"
          className={cn(
            "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            errors.title
              ? "border-destructive ring-destructive/20 dark:ring-destructive/40"
              : "border-input dark:border-input dark:bg-input/30",
          )}
          placeholder="Enter todo title"
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "todo-title-error" : undefined}
          aria-required="true"
          {...register("title")}
        />
        {errors.title && (
          <p
            id="todo-title-error"
            className="text-sm font-medium text-destructive"
            role="alert"
          >
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Due Date Field */}
      <div className="space-y-2">
        <Label htmlFor="todo-dueDate">
          Due Date{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <input
          id="todo-dueDate"
          type="datetime-local"
          className={cn(
            "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            errors.dueDate
              ? "border-destructive ring-destructive/20 dark:ring-destructive/40"
              : "border-input dark:border-input dark:bg-input/30",
          )}
          aria-invalid={errors.dueDate ? "true" : "false"}
          aria-describedby={errors.dueDate ? "todo-dueDate-error" : undefined}
          aria-required="true"
          {...register("dueDate")}
        />
        {errors.dueDate && (
          <p
            id="todo-dueDate-error"
            className="text-sm font-medium text-destructive"
            role="alert"
          >
            {errors.dueDate.message}
          </p>
        )}
      </div>

      {/* Priority Field */}
      <div className="space-y-2">
        <Label htmlFor="todo-priority">
          Priority{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <select
          id="todo-priority"
          className={cn(
            "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            errors.priority
              ? "border-destructive ring-destructive/20 dark:ring-destructive/40"
              : "border-input dark:border-input dark:bg-input/30",
          )}
          aria-invalid={errors.priority ? "true" : "false"}
          aria-describedby={errors.priority ? "todo-priority-error" : undefined}
          aria-required="true"
          {...register("priority")}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p
            id="todo-priority-error"
            className="text-sm font-medium text-destructive"
            role="alert"
          >
            {errors.priority.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
          aria-label="Create new todo"
        >
          {isSubmitting ? "Creating..." : "Create Todo"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
          aria-label="Reset form"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
