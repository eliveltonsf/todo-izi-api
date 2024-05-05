import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  getUsersHandler,
  loginHandler,
  registerUserHandler,
  verifyJwt,
} from "./user-controller";
import {
  createUserResponseSchema,
  createUserSchema,
  loginResponseSchema,
  loginSchema,
} from "./user-schema";

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create an user",
        tags: ["users"],
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    registerUserHandler
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      onRequest: [verifyJwt],
      schema: {
        summary: "List logged in user information",
        tags: ["users"],
      },
    },
    getUsersHandler
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        summary: "Log in as user and generate token",
        tags: ["users"],
        body: loginSchema,
        response: {
          200: loginResponseSchema,
        },
      },
    },
    loginHandler
  );
}
