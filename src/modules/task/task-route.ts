import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../user/user-controller";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "./task-controller";
import {
  deleteTaskResponseSchema,
  paramTaskSchema,
  taskResponseSchema,
  taskSchema,
  tasksResponseSchema,
  updateTaskResponseSchema,
  updateTaskSchema,
} from "./task-schema";

export async function taskRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      onRequest: [verifyJwt],
      schema: {
        body: taskSchema,
        response: {
          201: taskResponseSchema,
        },
      },
    },
    createTaskHandler
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      onRequest: [verifyJwt],
      schema: {
        response: {
          200: tasksResponseSchema,
        },
      },
    },
    getTasksHandler
  );

  app.withTypeProvider<ZodTypeProvider>().patch(
    "/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        body: updateTaskSchema,
        params: paramTaskSchema,
        response: {
          201: updateTaskResponseSchema,
        },
      },
    },
    updateTaskHandler
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        params: paramTaskSchema,
        response: {
          201: deleteTaskResponseSchema,
        },
      },
    },
    deleteTaskHandler
  );
}
