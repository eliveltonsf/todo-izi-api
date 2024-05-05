import { FastifyReply, FastifyRequest } from "fastify";
import { createTask } from "./task-service";

import { decodeTokenJWT } from "../../schemas";
import { taskSchema } from './task-schema';

export async function createTaskHandler (
  request: FastifyRequest,
  reply: FastifyReply
){
  const decodeToken = decodeTokenJWT.safeParse(request.user);

  if(!decodeToken.success){
    return reply.status(401).send('Enter the access token properly.');
  }  

  const userId = decodeToken.data.sub

  const bodyParsed = taskSchema.safeParse(request.body)

  if(!bodyParsed.success){
    return reply.status(401).send('Check that all information is correct');
  }

  const task = await createTask({...bodyParsed.data, userId});

  return reply.status(201).send(task);
}