import { Router } from "express";
import * as TaskController from "../controllers/task.controller";

const router = Router();

router.post("/", TaskController.createTask);
router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTaskById);
router.patch("/:id/status", TaskController.updateTaskStatus);
router.delete("/:id", TaskController.deleteTask);

export default router;
