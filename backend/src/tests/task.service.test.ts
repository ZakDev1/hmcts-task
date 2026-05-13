import { createTask, getAllTasks, getTaskById, updateTaskStatus, deleteTask } from "../services/task.service";
import { prisma } from "../lib/prisma";

jest.mock("../lib/prisma", () => ({
  prisma: {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockTask = {
  id: "test-uuid",
  title: "Test Task",
  description: "Test description",
  status: "PENDING" as const,
  dueDate: new Date("2026-06-01T10:00:00.000Z"),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("TaskService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create a task", async () => {
      (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await createTask({
        title: "Test Task",
        description: "Test description",
        status: "PENDING",
        dueDate: "2026-06-01T10:00:00.000Z",
      });

      expect(prisma.task.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTask);
    });

    it("should create without a description", async () => {
      (prisma.task.create as jest.Mock).mockResolvedValue({ ...mockTask, description: null });

      const result = await createTask({
        title: "Test Title",
        status: "PENDING",
        dueDate: "2026-06-01T10:00:00.000Z",
      });

      expect(prisma.task.create).toHaveBeenCalledTimes(1);
      expect(result.description).toBeNull();
    });
  });

  describe("getAllTasks", () => {
    it("should return all tasks", async () => {
      (prisma.task.findMany as jest.Mock).mockResolvedValue([mockTask]);

      const result = await getAllTasks();

      expect(prisma.task.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockTask]);
    });

    it("should return empty array when no tasks", async () => {
      (prisma.task.findMany as jest.Mock).mockResolvedValue([]);

      const result = await getAllTasks();

      expect(result).toEqual([]);
    });
  });

  describe("getTaskById", () => {
    it("should return a task by id", async () => {
      (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

      const result = await getTaskById("test-uuid");

      expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: "test-uuid" } });
      expect(result).toEqual(mockTask);
    });

    it("should return null if task not found", async () => {
      (prisma.task.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getTaskById("null");

      expect(result).toBeNull();
    });
  });

  describe("updateTaskStatus", () => {
    it("should update task status", async () => {
      const updated = { ...mockTask, status: "IN_PROGRESS" as const };
      (prisma.task.update as jest.Mock).mockResolvedValue(updated);

      const result = await updateTaskStatus("test-uuid", { status: "IN_PROGRESS" });

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: "test-uuid" },
        data: { status: "IN_PROGRESS" },
      });
      expect(result.status).toBe("IN_PROGRESS");
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      (prisma.task.delete as jest.Mock).mockResolvedValue(mockTask);

      await deleteTask("test-uuid");

      expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: "test-uuid" } });
    });
  });
});
