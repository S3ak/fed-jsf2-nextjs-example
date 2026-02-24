import todos from "@/data/todos.json";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  ctx: RouteContext<`/api/v1/todos/[id]`>,
) {
  const { id } = await ctx.params;

  const data = todos.data.find((x) => x.id.toString() === id);

  if (!data) {
    return NextResponse.json({ error: "Couldn't find todo" }, { status: 404 });
  }

  return NextResponse.json(data);
}
