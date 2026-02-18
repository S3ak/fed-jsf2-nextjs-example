import TodoListItem from "@/components/todo-list-item/TodoListItem";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const mockTodos = [
  {
    id: 1,
    title: "Finish Next.js routing lesson",
    dueDate: "2026-02-19T17:00:00.000Z",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Build todo form UI",
    dueDate: "2026-02-20T17:00:00.000Z",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Refactor button variants",
    dueDate: "2026-02-21T17:00:00.000Z",
    priority: "Low",
    completed: true,
  },
  {
    id: 4,
    title: "Write Playwright test for todos page",
    dueDate: "2026-02-22T17:00:00.000Z",
    priority: "High",
    completed: false,
  },
  {
    id: 5,
    title: "Polish dark mode spacing",
    dueDate: "2026-02-24T17:00:00.000Z",
    priority: "Low",
    completed: true,
  },
] as const;

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-black sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to home
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Todos
            </h1>
            <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              Plan your tasks and keep track of progress. Plug your todo list
              component into the section below.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Add todo (coming next)
          </h2>
          <div className="mt-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Add your form controls here.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Todo list
            </h2>
            <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {mockTodos.length} items
            </span>
          </div>

          <ul className="mt-4 space-y-3">
            {mockTodos.map(({ id, title, priority, dueDate }) => (
              <TodoListItem
                key={id}
                title={title}
                priority={priority}
                dueDate={dueDate}
              />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
