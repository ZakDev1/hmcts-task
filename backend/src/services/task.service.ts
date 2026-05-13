import { prisma } from "../lib/prisma";
import type { CreateTaskInput, UpdateTaskStatusInput } from "../schemas/task.schema";

export const createTask = async (data: CreateTaskInput) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      status: data.status,
      dueDate: new Date(data.dueDate),
    },
  });
};

export const getAllTasks = async () => {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getTaskById = async (id: string) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const updateTaskStatus = async (id: string, data: UpdateTaskStatusInput) => {
  return prisma.task.update({
    where: { id },
    data: { status: data.status },
  });
};

export const deleteTask = async (id: string) => {
  return prisma.task.delete({
    where: { id },
  });
};
