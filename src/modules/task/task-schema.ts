import z from "zod";

const taskType = {
  title: z.string(),
  description: z.string(),
  status: z.boolean(),
};

const taskGenerated = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
};

const updateTaskType = {
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.boolean().optional(),
};

const updateTaskGenerated = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const taskSchema = z.object({
  ...taskType,
});

export const createTaskSchema = z.object({
  ...taskType,
  userId: z.string().uuid(),
});

export const taskResponseSchema = z.object({
  ...taskType,
  ...taskGenerated,
});

export const updateTaskSchema = z.object({
  ...updateTaskType,
  updatedAt: z.date().optional(),
});

export const updateTaskResponseSchema = z.object({
  ...updateTaskType,
  ...updateTaskGenerated,
});

export const paramTaskSchema = z.object({
  id: z.string(),
});

export const tasksResponseSchema = z.array(taskResponseSchema);

export type CreateTaskType = z.infer<typeof createTaskSchema>;
export type UpdateTaskType = z.infer<typeof updateTaskSchema>;
