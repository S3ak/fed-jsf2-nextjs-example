import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { todosTable, type TodoInsert, type TodoSelect } from "../schema";
import { Todo } from "../types/todo";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

function toTodo(row: TodoSelect): Todo {
  return {
    ...row,
    description: row.description ?? undefined,
  };
}

function toInsertTodo(todo: Todo): TodoInsert {
  return {
    ...todo,
    description: todo.description ?? null,
  };
}

export async function getTodos() {
  "use server";

  const rows = await db.select().from(todosTable);

  return rows.map(toTodo);
}

export async function createTodo(newTodo: Todo): Promise<Todo> {
  "use server";

  const insertTodo = toInsertTodo(newTodo);

  const createdTodoRows = await db
    .insert(todosTable)
    .values(insertTodo)
    .returning();

  return toTodo(createdTodoRows[0]);
}

export async function getTodoById(id: string): Promise<Todo | null> {
  "use server";

  const rows = await db.select().from(todosTable).where(eq(todosTable.id, id));
  const row = rows[0];

  return row ? toTodo(row) : null;
}
