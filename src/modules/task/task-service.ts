import { prisma } from "../../lib/prisma";
import { CreateTaskType } from "./task-schema";

export async function createTask(
  data: CreateTaskType
){

  const {title, description, status, userId} = data

  console.log("dataservice:",{data})

  const task = prisma.task.create({
    data:{
      title,
      description,
      status,
      userId
    }
  })

  return task
}