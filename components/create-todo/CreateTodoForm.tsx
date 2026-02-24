"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/style-utils";
import { NewTodoFormData } from "@/lib/types/todo";
import { NewTodoFormSchema } from "@/lib/validations/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTodoActionResult } from "@/app/todos/actions";

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
  } = useForm<NewTodoFormData>({
    defaultValues: {
      title: "Demo title",
      dueDate: "2026-02-28T16:47",
      priority: "Low",
    },
    resolver: zodResolver(NewTodoFormSchema),
  });

  const onFormSubmit = async (formValues: NewTodoFormData) => {
    const data = new FormData();

    data.append("title", formValues.title);
    data.append("priority", formValues.priority);
    data.append("dueDate", formValues.dueDate);

    const { success } = await createTodoAction(data);

    if (success) {
      reset();
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
        <label
          htmlFor="todo-title"
          className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
        >
          Title{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
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
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Title must not exceed 100 characters",
            },
          })}
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
        <label
          htmlFor="todo-dueDate"
          className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
        >
          Due Date{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
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
          {...register("dueDate", {
            required: "Due date is required",
            validate: (value) => {
              const selectedDate = new Date(value);
              const now = new Date();
              if (selectedDate < now) {
                return "Due date must be in the future";
              }
              return true;
            },
          })}
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
        <label
          htmlFor="todo-priority"
          className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
        >
          Priority{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
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
          {...register("priority", {
            required: "Priority is required",
          })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
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
