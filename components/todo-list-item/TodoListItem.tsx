import React from "react";
import { DateTime } from "luxon";
import { Todo } from "@/lib/types/todo";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function TodoListItem({ title, priority, dueDate }: Todo) {
  const formattedDateTime = DateTime.fromISO(dueDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{priority}</CardDescription>
        <CardAction>mark as complete</CardAction>
      </CardHeader>
      <CardFooter>
        <p>{formattedDateTime.toRelativeCalendar()}</p>
      </CardFooter>
    </Card>
  );
}
