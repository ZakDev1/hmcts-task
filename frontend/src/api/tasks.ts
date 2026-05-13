import axios from "axios";
import type { Task } from "../types/task";
import type { CreateTaskInput, UpdateTaskStatusInput } from "../schemas/task.schema";

const api = axios.create({
  baseURL: import.meta.env["VITE_API_URL"] ?? "http://localhost:3000",
});

export const getAllTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/api/tasks");
  return data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const { data } = await api.get<Task>(`/api/tasks/${id}`);
  return data;
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
  const { data } = await api.post<Task>("/api/tasks", input);
  return data;
};

export const updateTaskStatus = async (id: string, input: UpdateTaskStatusInput): Promise<Task> => {
  const { data } = await api.patch<Task>(`/api/tasks/${id}/status`, input);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};
