import { prisma } from "../../lib/prisma";
import { CreateTaskType, UpdateTaskType } from "./task-schema";

export async function createTask(data: CreateTaskType) {
  const { title, description, status, userId } = data;

  console.log("dataservice:", { data });

  const task = prisma.task.create({
    data: {
      title,
      description,
      status,
      userId,
    },
  });

  return task;
}

export function getTasks(userId: string) {
  return prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    where: {
      userId,
    },
  });
}

export async function updateTask(data: UpdateTaskType & { id: number }) {
  const { title, description, status, id, updatedAt } = data;

  console.log("dataserviceUpdate:", { data });

  const task = prisma.task.update({
    data: {
      title,
      description,
      status,
      updatedAt,
    },
    where: {
      id,
    },
  });

  return task;
}
