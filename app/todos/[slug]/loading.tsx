import Link from "next/link";
import { DateTime } from "luxon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function TodoPageSkeleton() {
  // Static data variables - populate these later
  const todoId = 1;
  const todoTitle = "loading...";
  const todoPriority = "loadiing...";
  const todoDueDate = "2026-02-19T17:00:00.000Z";
  const todoCompleted = false;
  const todoDescription =
    "Complete the routing module including dynamic routes, route groups, and nested layouts.";

  // TODO: use luxon
  const formattedDateTime = "loading";

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-black sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="space-y-4">
          <Link
            href="/todos"
            className="inline-flex text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to todos
          </Link>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Todo #{todoId}
              </h1>
              {todoCompleted && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Completed
                </span>
              )}
            </div>
          </div>
        </header>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <CardTitle className="text-2xl">{todoTitle}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    Priority: {todoPriority}
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {todoDescription}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Due Date
                </dt>
                <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                  soon
                </dd>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                  soon
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Status
                </dt>
                <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                  {todoCompleted ? "Completed" : "In Progress"}
                </dd>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="default" className="flex-1">
              {todoCompleted ? "Mark as incomplete" : "Mark as complete"}
            </Button>
            <Button variant="outline">Edit</Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
