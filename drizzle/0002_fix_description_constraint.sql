-- Fix: Set descriptions with less than 2 characters or empty strings to NULL
UPDATE "todos" 
SET "description" = NULL 
WHERE "description" IS NOT NULL AND (char_length("description") < 2 OR "description" = '');--> statement-breakpoint

-- Add slug column if it doesn't exist
ALTER TABLE "todos" ADD COLUMN IF NOT EXISTS "slug" varchar;--> statement-breakpoint

-- Set default slug values for existing rows that don't have one
UPDATE "todos" SET "slug" = substr(md5(random()::text), 1, 16) WHERE "slug" IS NULL;--> statement-breakpoint

-- Add the description constraint back after data cleanup
ALTER TABLE "todos" ADD CONSTRAINT "todos_description_len_check" CHECK ("description" is null or char_length("description") >= 2);
