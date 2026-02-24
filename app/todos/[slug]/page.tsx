import Link from "next/link";
import { notFound } from "next/navigation";
import { API_URL } from "@/lib/constants";
import { Todo } from "@/lib/types/todo";
import CardDetail from "@/components/card-details/CardDetail";

export const dynamic = "force-dynamic";

export default async function TodoDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${API_URL}/todos/${slug}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { id, title, priority, dueDate, completed }: Todo = await res.json();

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
                Todo #{id}
              </h1>
              {completed && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Completed
                </span>
              )}
            </div>
          </div>
        </header>

        <CardDetail
          id={id}
          title={title}
          priority={priority}
          dueDate={dueDate}
          completed={completed}
        />
      </main>
    </div>
  );
}
