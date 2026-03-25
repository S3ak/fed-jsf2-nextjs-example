import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { todosTable, type TodoInsert, type TodoSelect } from "../schema";
import { PgSelectQueryBuilder } from "drizzle-orm/pg-core";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

function withPagination<T extends PgSelectQueryBuilder>(
  qb: T,
  page: number = 1,
  pageSize: number = 10,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}

export async function queryTodos() {
  "use server";

  const query = db.select().from(todosTable);
  const dynamicQuery = query.$dynamic();
  const todos = withPagination(dynamicQuery, 1, 30);

  return todos;
}

export async function getTodoById(id: string): Promise<TodoSelect | null> {
  "use server";

  const rows = await db.select().from(todosTable).where(eq(todosTable.id, id));
  const row = rows[0];

  return row ?? null;
}

export async function createTodo(newTodo: TodoInsert): Promise<TodoSelect> {
  "use server";

  const createdTodoRows = await db
    .insert(todosTable)
    .values(newTodo)
    .returning();

  return createdTodoRows[0];
}
