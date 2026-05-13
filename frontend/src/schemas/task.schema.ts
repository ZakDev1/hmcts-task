import z from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).default("PENDING"),
  dueDate: z.iso.datetime("Invalid date format"),
});

export const UpdateTaskStatusSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskStatusInput = z.infer<typeof UpdateTaskStatusSchema>;
