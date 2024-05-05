import z from "zod";

const taskType = {
  title: z.string(),
  description: z.string(),
  status: z.boolean().default(false)
};

const taskGenerated = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
};

export const taskSchema = z.object({
  ...taskType,
});

export const createTaskSchema = z.object({
  ...taskType,
  userId: z.string().uuid()
});

export const taskResponseSchema = z.object({
  ...taskType,
  ...taskGenerated,
});

export const tasksResponseSchema = z.array(taskResponseSchema);

export type CreateTaskType = z.infer<typeof createTaskSchema>;