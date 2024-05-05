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
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    registerUserHandler
  );

  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/", { onRequest: [verifyJwt] }, getUsersHandler);

  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        body: loginSchema,
        response: {
          200: loginResponseSchema,
        },
      },
    },
    loginHandler
  );
}
