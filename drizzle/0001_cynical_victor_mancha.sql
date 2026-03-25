ALTER TABLE "todos" DROP CONSTRAINT "todos_title_len_check";--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_title_len_check" CHECK (char_length("todos"."title") between $1 and $2);