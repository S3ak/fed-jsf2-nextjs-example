import { sql } from "drizzle-orm";
import { pgEnum, AnyPgColumn, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { timestamps } from "./schema.helpers";

export const TODO_DEFAULT_MIN_LENGTH = 2;
export const TODO_TITLE_MAX_LENGTH = 160;
export const default_title = `New Todo @${new Date().toISOString()}`;

export const todoPriority = pgEnum("todo_priority", ["low", "medium", "high"]);

export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);

export const users = table(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: t.varchar("first_name", { length: 256 }),
    lastName: t.varchar("last_name", { length: 256 }),
    email: t.varchar().notNull(),
    invitee: t.integer().references((): AnyPgColumn => users.id),
    role: rolesEnum().default("guest"),
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)],
);

export const todosTable = table(
  "todos",
  {
    id: t.uuid("id").primaryKey(),
    slug: t.varchar().$default(() => generateUniqueString(16)),
    dueDate: t
      .timestamp("due_date", {
        withTimezone: true,
        mode: "string",
      })
      .notNull()
      .default(sql`(now() + interval '1 day')`),
    isCompleted: t.boolean("is_completed").notNull().default(false),
    title: t
      .varchar("title", { length: TODO_TITLE_MAX_LENGTH })
      .notNull()
      .default(default_title),
    description: t.text("description"),
    priority: todoPriority("priority").notNull().default("low"),
    authorId: t.uuid("author_id").notNull(),
    ...timestamps,
  },
  (table) => [
    t.check(
      "todos_title_len_check",
      sql`char_length(${table.title}) >= ${TODO_DEFAULT_MIN_LENGTH}`,
    ),
  ],
);

export type TodoSelect = typeof todosTable.$inferSelect;
export type TodoInsert = typeof todosTable.$inferInsert;

function generateUniqueString(length: number = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }
  return uniqueString;
}
