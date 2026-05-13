export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
