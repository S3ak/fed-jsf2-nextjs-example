import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTodoById, updateTodoById } from "@/lib/data/todo-store-local";

export async function GET(
  _request: Request,
  ctx: RouteContext<`/api/v1/todos/[id]`>,
) {
  const { id } = await ctx.params;

  const data = getTodoById(id);

  if (!data) {
    return NextResponse.json({ error: "Couldn't find todo" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<`/api/v1/todos/[id]`>,
) {
  const { id } = await ctx.params;
  const body = await request.json();

  // if (typeof body.completed !== "boolean") {
  //   return NextResponse.json(
  //     { error: "Invalid payload. 'completed' must be a boolean." },
  //     { status: 400 },
  //   );
  // }

  const updatedTodo = updateTodoById(id, { isCompleted: body.completed });

  if (!updatedTodo) {
    return NextResponse.json({ error: "Couldn't find todo" }, { status: 404 });
  }

  revalidatePath("/todos");
  revalidatePath(`/todos/${id}`);

  return NextResponse.json(updatedTodo);
}
