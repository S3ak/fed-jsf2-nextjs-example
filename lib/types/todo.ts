export interface Todo {
  id: number;
  title: string;
  dueDate: string;
  priority?: "Low" | "Medium" | "High";
  completed: boolean;
}

export interface TodoResponse {
  data: Todo[];
}
