import Link from "next/link";

export default function Loading() {
  // Define the Loading UI here
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
              Todos (SKELETON)
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
              0 items
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {/* TODO: Use skeleton layout */}
          </div>
        </section>
      </main>
    </div>
  );
}
