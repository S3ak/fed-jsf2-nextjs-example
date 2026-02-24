import { neon } from "@neondatabase/serverless";
import { API_URL } from "../constants";

export async function fetchTodos() {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      cache: "force-cache",
      next: {
        tags: ["todos"],
      },
    });
    const json = res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch the todos");
    }

    return json;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch the todos");
  }
}

async function _demoCreateServerAction(formData: FormData) {
  "use server";
  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);
  const title = formData.get("title");
  // Insert the comment from the form into the Postgres database
  await sql("INSERT INTO todos (todo) VALUES ($1)", [title]);
}
