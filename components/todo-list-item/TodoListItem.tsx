"use client";

import { useState } from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import type {
  CreateTodoActionResult,
  Todo,
  ToggleTodoCompleteFormData,
} from "@/lib/types/todo";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type IProps = {
  onToggleIsComplete: (data: FormData) => Promise<CreateTodoActionResult>;
};

export default function TodoListItem({
  id,
  title,
  description = "",
  priority = "low",
  dueDate,
  isCompleted: defaultIsCompleted = false,
  createdAt,
  updatedAt,
  authorId,
  onToggleIsComplete,
}: Todo & IProps) {
  const formattedDateTime = DateTime.fromISO(dueDate);
  const checkboxId = `todo-complete-${id}`;
  const [isCompleted, setIsCompleted] = useState(defaultIsCompleted);

  const handleOnToggle = async (nextValue: boolean): Promise<void> => {
    // We need previous value for optimistic update
    const previousValue = isCompleted;
    setIsCompleted(nextValue);

    const updateTodoFormData: ToggleTodoCompleteFormData = {
      id,
      isCompleted: nextValue,
    };

    const formData = new FormData();
    formData.append("id", String(updateTodoFormData.id));
    formData.append("completed", String(updateTodoFormData.isCompleted));

    const { success } = await onToggleIsComplete(formData);

    if (!success) {
      setIsCompleted(previousValue);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Link href={`/todos/${id}`}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <CardDescription>{priority}</CardDescription>
        <CardAction>
          <Field orientation="horizontal">
            <Checkbox
              id="isCompleted"
              name="isCompleted"
              checked={isCompleted}
              onCheckedChange={handleOnToggle}
            />
            <Label htmlFor={checkboxId}>Complete</Label>
            <input hidden id="id" name="id" value={id} readOnly />
          </Field>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <p>{formattedDateTime.toRelativeCalendar()}</p>
      </CardFooter>
    </Card>
  );
}
