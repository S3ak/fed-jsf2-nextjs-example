import { TodoSchema } from "@/lib/types/todo";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  addTodo as createTodo,
  getTodos,
  updateTodoById,
} from "@/lib/data/todo-store-local";
import z from "zod";

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
  const jsonTodo = await req.json();

  // Validate form fields using Zod
  const validatedFields = TodoSchema.safeParse({
    id: jsonTodo.id,
    title: jsonTodo.title,
    dueDate: jsonTodo.dueDate,
    priority: jsonTodo.priority,
    createdAt: jsonTodo.createdAt,
    updatedAt: jsonTodo.updatedAt,
    isCompleted: jsonTodo.isCompleted,
    description: jsonTodo.description,
    authorId: jsonTodo.authorId,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        // FIXME:
        errors: z.treeifyError(validatedFields.error),
        message: "Missing Fields. Failed to Create Todo.",
      },
      {
        status: 401,
      },
    );
  }

  try {
    // NOTE: currently using memTodos
    const data = createTodo(validatedFields.data);

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
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to create Todo",
      },
      {
        status: 401,
      },
    );
  }
}

export async function PATCH(req: Request) {
  const jsonTodo = await req.json();

  // Validate form fields using Zod
  const OptionalTodoSchema = TodoSchema.partial();
  const validatedFields = OptionalTodoSchema.safeParse({
    id: jsonTodo.id,
    title: jsonTodo.title,
    dueDate: jsonTodo.dueDate,
    priority: jsonTodo.priority,
    createdAt: jsonTodo.createdAt,
    updatedAt: jsonTodo.updatedAt,
    isCompleted: jsonTodo.isCompleted,
    description: jsonTodo.description,
    authorId: jsonTodo.authorId,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        // FIXME:
        errors: z.treeifyError(validatedFields.error),
        message: "Missing Fields. Failed to Create Todo.",
      },
      {
        status: 401,
      },
    );
  }

  if (!validatedFields.data.id) {
    return NextResponse.json(
      {
        ok: false,
        message: "Todo ID is required for updates.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    // NOTE: currently using memTodos
    const data = updateTodoById(validatedFields.data.id, validatedFields.data);

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
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to create Todo",
      },
      {
        status: 401,
      },
    );
  }
}
