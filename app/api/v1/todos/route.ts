import { Todo } from "@/lib/types/todo";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { NewTodoFormSchema } from "@/lib/validations/todo";
import { addTodo, getTodos } from "@/lib/data/todo-store-local";

export async function GET(_req: Request) {
  //   const url = new URL(request.url);
  // const page = parseInt(url.searchParams.get("page") || "1");
  // const postsPerPage = 5;
  // const offset = (page - 1) * postsPerPage;
  // const totalPosts = await db.post.count();
  // const totalPages = Math.ceil(totalPosts / postsPerPage);

  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //   })
  //   const data = await res.json()
  const data = getTodos();

  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const formData = await req.formData();

  // Validate form fields using Zod
  const validatedFields = NewTodoFormSchema.safeParse({
    title: formData.get("title"),
    dueDate: formData.get("dueDate"),
    priority: formData.get("priority"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        // FIXME:
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Invoice.",
      },
      {
        status: 401,
      },
    );
  }

  // Prepare data for insertion into the database
  const { title, dueDate, priority } = validatedFields.data;
  const id = crypto.randomUUID();
  const completed = false;
  const formattedDueDate = DateTime.fromISO(dueDate);
  const isoDate = formattedDueDate.toISO() ?? "";

  const data = addTodo({
    id,
    title,
    dueDate: isoDate,
    priority,
    completed,
  } as Todo);

  revalidatePath("/todos");

  return NextResponse.json(
    {
      ok: true,
      message: "Successfully created a Todo",
      data,
    },
    {
      status: 201,
    },
  );
}
