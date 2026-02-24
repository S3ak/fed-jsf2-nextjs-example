import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Todo } from "@/lib/types/todo";
import { DateTime } from "luxon";

export default function CardDetail({
  title,
  dueDate,
  priority,
  completed,
}: Todo) {
  const formattedDateTime = DateTime.fromISO(dueDate);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                Priority: {priority}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
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
              {completed ? "Completed" : "In Progress"}
            </dd>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 border-t border-zinc-200 dark:border-zinc-800">
        <Button variant="default" className="flex-1">
          {completed ? "Mark as incomplete" : "Mark as complete"}
        </Button>
        <Button variant="outline">Edit</Button>
        <Button variant="outline" className="text-red-600 hover:text-red-700">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
