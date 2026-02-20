import { API_URL } from "../constants";

export async function fetchTodos() {
  "use cache";
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
