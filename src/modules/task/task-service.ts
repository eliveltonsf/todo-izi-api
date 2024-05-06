import { prisma } from "../../lib/prisma";
import { CreateTaskType, ParamsTaskType, UpdateTaskType } from "./task-schema";

export async function createTask(data: CreateTaskType) {
  const { title, description, status, userId } = data;

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

export function getTasks(userId: string, startIndex: number, endIndex: number) {
  return prisma.task.findMany({
    skip: startIndex,
    take: endIndex,
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

export function tasksCountForUser(userId: string) {
  return prisma.task.count({
    select: {
      _all: true, // Count all non-null field values
    },
    where: {
      userId,
    },
  });
}

export async function updateTask(data: UpdateTaskType & { id: number }) {
  const { title, description, status, id, updatedAt } = data;

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

export async function deleteTask(data: ParamsTaskType) {
  const { id } = data;

  const task = prisma.task.delete({
    where: {
      id: Number(id),
    },
  });

  return task;
}
