import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import TodoList from "@/components/todo-list/TodoList";
import { TodoListSkeleton } from "@/components/todo-list/TodoListUI";

export const dynamic = "force-dynamic";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

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
              Protected Todos
            </h1>
            <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              This page is only available to authenticated users.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Todo list
            </h2>
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
