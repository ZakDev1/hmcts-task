import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

export default app;
