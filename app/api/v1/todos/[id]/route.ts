import todos from "@/data/todos.json";

export async function GET(
  _request: Request,
  ctx: RouteContext<`/api/v1/todos/[id]`>,
) {
  console.log("Request", Request);
  const { id } = await ctx.params;

  const data = todos.data.find((x) => x.id.toString() === id);

  if (!data) {
    return Response.json({ error: "Couldn't find todo" }, { status: 404 });
  }

  return Response.json(data);
}
