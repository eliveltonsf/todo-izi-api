import "dotenv/config";
import packageJson from "../package.json";

import fastifyCors from "@fastify/cors";
import fastify from "fastify";

import fastifyJwt from "@fastify/jwt";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { taskRoutes } from "./modules/task/task-route";
import { userRoutes } from "./modules/user/user-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyJwt, {
  secret: String(process.env.SECRET),
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userRoutes, { prefix: "api/user" });
app.register(taskRoutes, { prefix: "api/task" });

app
  .listen({ port: Number(process.env.PORT), host: "0.0.0.0" })
  .then(() => {
    console.log(
      `Server running on port ${process.env.PORT}. Version: ${packageJson.version}`
    );
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
