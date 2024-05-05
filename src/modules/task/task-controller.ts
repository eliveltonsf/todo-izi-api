import { FastifyReply, FastifyRequest } from "fastify";
import { createTask, getTasks, updateTask } from "./task-service";

import { decodeTokenJWT } from "../../schemas";
import { generateSafeParse } from "../../util/generateSafeParse";
import { paramTaskSchema, taskSchema, updateTaskSchema } from "./task-schema";

export async function createTaskHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = await generateSafeParse(
    request,
    reply,
    decodeTokenJWT,
    "Enter the access token properly.",
    "user"
  );

  const bodyParsed = await generateSafeParse(
    request,
    reply,
    taskSchema,
    "Check that all information is correct.",
    "body"
  );

  const task = await createTask({
    ...bodyParsed,
    userId: userId.sub,
  });

  return reply.status(201).send(task);
}

export async function getTasksHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = await generateSafeParse(
    request,
    reply,
    decodeTokenJWT,
    "Enter the access token properly.",
    "user"
  );

  const products = await getTasks(userId.sub);

  return products;
}

export async function updateTaskHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodyParsed = await generateSafeParse(
    request,
    reply,
    updateTaskSchema,
    "Check that all information is correct.",
    "body"
  );

  const idTask = await generateSafeParse(
    request,
    reply,
    paramTaskSchema,
    "Check that all information is correct.",
    "params"
  );

  const task = await updateTask({
    ...bodyParsed,
    id: Number(idTask.id),
    updatedAt: new Date(),
  });

  console.log("response", task);

  return reply.status(201).send(task);
}
