import { neon } from "@neondatabase/serverless";

async function _updateTask(formData: FormData) {
  "use server";
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set");
  // Connect to the Neon database
  const sql = neon(databaseUrl);
  const title = String(formData.get("title") ?? "");
  // Insert the comment from the form into the Postgres database
  await sql`INSERT INTO todos (todo) VALUES (${title})`;
}
