import Link from "next/link";
import { Suspense } from "react";
import TodoList from "@/components/todo-list/TodoList";
import { TodoListSkeleton } from "@/components/todo-list/TodoListUI";
import CreateTodoForm from "@/components/create-todo/CreateTodoForm";
import { createTodoAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
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
            Add todo
          </h2>
          <div className="mt-3">
            <CreateTodoForm createTodoAction={createTodoAction} />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Todo list
            </h2>
            {/* TODO: Convert to component */}
            {/* <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {todoCount} items
            </span> */}
          </div>

          <div className="mt-4 space-y-3">
            <Suspense fallback={<TodoListSkeleton />}>
              <TodoList />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}
