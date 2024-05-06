import { FastifyReply, FastifyRequest } from "fastify";
import {
  createTask,
  deleteTask,
  getTasks,
  tasksCountForUser,
  updateTask,
} from "./task-service";

import { decodeTokenJWT } from "../../schemas";
import { generateSafeParse } from "../../util/generateSafeParse";
import {
  paramListTaskSchema,
  paramTaskSchema,
  taskSchema,
  updateTaskSchema,
} from "./task-schema";

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

  const paginationParams = await generateSafeParse(
    request,
    reply,
    paramListTaskSchema,
    "Enter the access token properly.",
    "query"
  );

  console.log(paginationParams.offset, paginationParams.limit);

  const startIndex =
    (Number(paginationParams.offset) - 1) * Number(paginationParams.limit);
  const endIndex = startIndex + Number(paginationParams.limit);

  console.log("teste query", startIndex, endIndex);

  const tasks = await getTasks(userId.sub, startIndex, endIndex);

  const amountItems = await tasksCountForUser(userId.sub);

  const totalPages = Math.ceil(
    amountItems._all / Number(paginationParams.limit)
  );

  return reply
    .status(201)
    .send({ tasks, amountItems: amountItems._all, totalPages });
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

  return reply.status(201).send(task);
}

export async function deleteTaskHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idTask = await generateSafeParse(
    request,
    reply,
    paramTaskSchema,
    "Check that all information is correct.",
    "params"
  );

  await deleteTask({
    id: idTask.id,
  });

  return reply.status(201).send({ message: "Task deleted successfully" });
}
