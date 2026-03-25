import { timestamp } from "drizzle-orm/pg-core";

const timestampWithTimezone = (columnName: string) =>
  timestamp(columnName, {
    withTimezone: true,
    mode: "string",
  })
    .notNull()
    .defaultNow();

export const timestamps = {
  updatedAt: timestampWithTimezone("updated_at"),
  createdAt: timestampWithTimezone("created_at"),
  deletedAt: timestamp("deleted_at", {
    withTimezone: true,
    mode: "string",
  }),
};
