import type { Request, Response, NextFunction } from "express";
import * as TaskService from "../services/task.service";
import { CreateTaskSchema, UpdateTaskStatusSchema } from "../schemas/task.schema";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = CreateTaskSchema.parse(req.body);
    const task = await TaskService.createTask(data);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TaskService.getTaskById(req.params["id"] as string);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TaskService.getTaskById(req.params["id"] as string);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const data = UpdateTaskStatusSchema.parse(req.body);
    const updated = await TaskService.updateTaskStatus(req.params["id"] as string, data);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TaskService.getTaskById(req.params["id"] as string);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    await TaskService.deleteTask(req.params["id"] as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
