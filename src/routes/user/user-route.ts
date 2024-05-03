import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { registerUserHandler } from "./user-controller";
import { createUserResponseSchema, createUserSchema } from "./user-schema";

export async function user(app: FastifyInstance){

  app.withTypeProvider<ZodTypeProvider>()
    .post('/user',
    {
      schema:{
        body: createUserSchema,
        response: createUserResponseSchema
      }
    },
    registerUserHandler
  )

}