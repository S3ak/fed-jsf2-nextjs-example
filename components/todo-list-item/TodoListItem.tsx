import React from "react";
import { DateTime } from "luxon";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type IProps = {
  title: string;
  priority: string;
  dueDate: string;
};

export default function TodoListItem({ title, priority, dueDate }: IProps) {
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
