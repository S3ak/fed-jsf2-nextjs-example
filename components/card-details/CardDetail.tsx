"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  MutateTodoActionResult,
  OverrideMutateTodoFormSchema,
  Todo,
} from "@/lib/types/todo";
import { DateTime } from "luxon";
import { useState } from "react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

type IProps = {
  mutateTodoAction: (data: FormData) => Promise<MutateTodoActionResult>;
};

export default function CardDetail({
  id,
  title,
  dueDate,
  priority,
  isCompleted,
  mutateTodoAction,
}: Todo & IProps) {
  const formattedDateTime = DateTime.fromISO(dueDate);
  const [isEditMode, setIsEditMode] = useState(false);
  const form = useForm({
    resolver: zodResolver(OverrideMutateTodoFormSchema),
    mode: "onBlur",
    defaultValues: {
      title,
      dueDate: new Date(dueDate),
      priority,
      isCompleted,
    },
  });
  const router = useRouter();

  const handleOnSubmit = (
    data: z.infer<typeof OverrideMutateTodoFormSchema>,
  ) => {
    console.log("Create todo form data", data);
    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("dueDate", data.dueDate);
    formData.append("priority", data.priority);
    formData.append("isCompleted", String(data.isCompleted));

    mutateTodoAction(formData);
    router.refresh();
    setIsEditMode(false);
    return;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl">
              {title} {isEditMode ? "Editing" : ""}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                Priority: {priority}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {isEditMode ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Update Todo</CardTitle>
              <CardDescription>You can edit your todo</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                id="create-todo-form"
                onSubmit={form.handleSubmit(handleOnSubmit)}
              >
                <FieldGroup>
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                          {...field}
                          id="title"
                          aria-invalid={fieldState.invalid}
                          placeholder={title}
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="dueDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          className="rounded-lg border"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="priority"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="responsive"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <FieldLabel htmlFor="form-rhf-select-language">
                            Priority
                          </FieldLabel>
                          <FieldDescription>
                            How important is this task
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="priority"
                            aria-invalid={fieldState.invalid}
                            className="min-w-[120px]"
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    name="isCompleted"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <FieldLabel htmlFor="form-rhf-switch-isCompleted">
                            Completed
                          </FieldLabel>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                        <Switch
                          id="form-rhf-switch-isCompleted"
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" form="create-todo-form">
                  Submit
                </Button>
              </Field>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Due Date
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                {formattedDateTime.toLocaleString(DateTime.DATETIME_MED)}
              </dd>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {formattedDateTime.toRelativeCalendar()}
              </dd>
            </div>

            <div className="space-y-1">
              <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Status
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                {isCompleted ? "Completed" : "In Progress"}
              </dd>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-3 border-t border-zinc-200 dark:border-zinc-800">
        <Button variant="default" className="flex-1">
          {isCompleted ? "Mark as incomplete" : "Mark as complete"}
        </Button>

        <Button onClick={() => setIsEditMode((prev) => !prev)}>Edit</Button>

        <Button variant="outline" className="text-red-600 hover:text-red-700">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
