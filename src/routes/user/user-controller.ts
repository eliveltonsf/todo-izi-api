import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserType } from "./user-schema";
import { createUser, userExists } from "./user-service";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserType;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  const userExist = await userExists(body);

  if(userExist){
    return reply.status(401).send('User already exists!');
  }
  

  const user = await createUser(body);
   
  return reply.status(201).send(user);
}