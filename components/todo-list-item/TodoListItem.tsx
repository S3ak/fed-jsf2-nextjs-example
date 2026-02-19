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
import Link from "next/link";

export default function TodoListItem({ title, priority, dueDate, id }: Todo) {
  const formattedDateTime = DateTime.fromISO(dueDate);

  return (
    <Card>
      <CardHeader>
        <Link href={`/todos/${id}`}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <CardDescription>{priority}</CardDescription>
        <CardAction>mark as complete</CardAction>
      </CardHeader>
      <CardFooter>
        <p>{formattedDateTime.toRelativeCalendar()}</p>
      </CardFooter>
    </Card>
  );
}
