import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { TodoSchema } from "@/lib/types/todo";
import type { TodoInsert, TodoSelect } from "@/lib/schema";

export const sql = neon(process.env.DATABASE_URL!);

export async function createComment(formData: FormData) {
  "use server";
  const comment = formData.get("comment") as string;
  await sql`INSERT INTO comments (comment) VALUES (${comment})`;
  revalidatePath("/action");
}

export async function getComments() {
  await sql`CREATE TABLE IF NOT EXISTS comments (id SERIAL PRIMARY KEY, comment TEXT)`;
  const comments = await sql`SELECT * FROM comments`;
  return comments;
}

export async function getTodos() {
  "use server";

  isDBConnected();

  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id UUID PRIMARY KEY,
      slug TEXT,
      title TEXT NOT NULL,
      description TEXT,
      due_date TIMESTAMPTZ NOT NULL,
      priority TEXT NOT NULL,
      is_completed BOOLEAN NOT NULL DEFAULT FALSE,
      author_id UUID NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL,
      deleted_at TIMESTAMPTZ NOT NULL
    )
  `;

  const rows = (await sql`
    SELECT
      id,
      slug,
      title,
      description,
      due_date AS "dueDate",
      priority,
      is_completed AS "isCompleted",
      author_id AS "authorId",
      created_at AS "createdAt",
      updated_at AS "updatedAt",
      deleted_at AS "deletedAt"
    FROM todos
    ORDER BY created_at DESC
  `) as TodoSelect[];

  return rows;
}

export async function createTodo(input: TodoInsert): Promise<TodoSelect> {
  "use server";

  isDBConnected();

  const todo = TodoSchema.parse(input);

  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id UUID PRIMARY KEY,
      slug TEXT,
      title TEXT NOT NULL,
      description TEXT,
      due_date TIMESTAMPTZ NOT NULL,
      priority TEXT NOT NULL,
      is_completed BOOLEAN NOT NULL DEFAULT FALSE,
      author_id UUID NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL,
      deleted_at TIMESTAMPTZ NOT NULL
    )
  `;

  const [createdTodo] = (await sql`
    INSERT INTO todos (
      id,
      slug,
      title,
      description,
      due_date,
      priority,
      is_completed,
      author_id,
      created_at,
      updated_at,
      deleted_at
    ) VALUES (
      ${todo.id},
      ${todo.slug ?? null},
      ${todo.title},
      ${todo.description ?? null},
      ${todo.dueDate},
      ${todo.priority},
      ${todo.isCompleted},
      ${todo.authorId},
      ${todo.createdAt ?? new Date().toISOString()},
      ${todo.updatedAt ?? new Date().toISOString()},
      ${todo.deletedAt ?? new Date().toISOString()}
    )
    RETURNING
      id,
      slug,
      title,
      description,
      due_date AS "dueDate",
      priority,
      is_completed AS "isCompleted",
      author_id AS "authorId",
      created_at AS "createdAt",
      updated_at AS "updatedAt",
      deleted_at AS "deletedAt"
  `) as TodoSelect[];

  return createdTodo;
}

export async function getTodoById(id: string): Promise<TodoSelect | null> {
  "use server";

  isDBConnected();

  const rows = (await sql`
    SELECT
      id,
      slug,
      title,
      description,
      due_date AS "dueDate",
      priority,
      is_completed AS "isCompleted",
      author_id AS "authorId",
      created_at AS "createdAt",
      updated_at AS "updatedAt",
      deleted_at AS "deletedAt"
    FROM todos
    WHERE id = ${id}
    LIMIT 1
  `) as TodoSelect[];

  return rows[0] ?? null;
}

async function _updateTask(formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "");
  // Insert the comment from the form into the Postgres database
  await sql`INSERT INTO todos (todo) VALUES (${title})`;
}

function isDBConnected() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set");
}
