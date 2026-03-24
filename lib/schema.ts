import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const TODO_TITLE_MIN_LENGTH = 2;
export const TODO_TITLE_MAX_LENGTH = 100;

export const todoPriority = pgEnum("todo_priority", ["low", "medium", "high"]);

export const todosTable = pgTable(
  "todos",
  {
    id: uuid("id").primaryKey(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    isCompleted: boolean("is_completed").notNull().default(false),
    title: text("title").notNull(),
    description: text("description"),
    dueDate: timestamp("due_date", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    priority: todoPriority("priority").notNull().default("low"),
    authorId: uuid("author_id").notNull(),
  },
  (table) => [
    check(
      "todos_title_len_check",
      sql`char_length(${table.title}) between ${TODO_TITLE_MIN_LENGTH} and ${TODO_TITLE_MAX_LENGTH}`,
    ),
    check(
      "todos_description_len_check",
      sql`${table.description} is null or char_length(${table.description}) >= 2`,
    ),
  ],
);

export type TodoSelect = typeof todosTable.$inferSelect;
export type TodoInsert = typeof todosTable.$inferInsert;
