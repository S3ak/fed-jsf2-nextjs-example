import { createComment, getComments } from "@/lib/data/neon";

export default async function ActionPage() {
  return (
    <div>
      <h2>Server Action Example</h2>
      <form action={createComment}>
        <input type="text" name="comment" placeholder="Add a comment" />
        <button type="submit">Submit</button>
      </form>
      <h3>Comments:</h3>
      <ul>
        {await getComments().then((comments) =>
          comments.map((c: any) => <li key={c.id}>{c.comment}</li>),
        )}
      </ul>
    </div>
  );
}
