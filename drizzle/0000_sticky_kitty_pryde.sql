CREATE TYPE "public"."todo_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "todos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"due_date" timestamp with time zone NOT NULL,
	"priority" "todo_priority" DEFAULT 'low' NOT NULL,
	"author_id" uuid NOT NULL,
	CONSTRAINT "todos_title_len_check" CHECK (char_length("todos"."title") between 2 and 100),
	CONSTRAINT "todos_description_len_check" CHECK ("todos"."description" is null or char_length("todos"."description") >= 2)
);
