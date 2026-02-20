import type { Todo } from "@/types/todo";
import { http, HttpResponse } from "msw";
import { API_URL } from "../constants";
import todosJSON from "@/data/todos.json";

export const handlers = [
  http.get(`${API_URL}/todos`, () => {
    return HttpResponse.json(todosJSON);
  }),
];
