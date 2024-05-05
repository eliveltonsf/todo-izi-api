import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../user/user-controller";
import { createTaskHandler } from "./task-controller";
import { taskResponseSchema, taskSchema } from "./task-schema";


export async function taskRoutes(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().post('/', {
    onRequest: [verifyJwt],
    schema:{
      body: taskSchema,
      response: {
        201: taskResponseSchema
      },      
    }
  },
    createTaskHandler   
  )

}