import 'dotenv/config';
import packageJson from "../package.json";

import fastifyCors from '@fastify/cors';
import fastify from "fastify";

import { ZodTypeProvider, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { teste } from './routes/teste';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(teste)

const port = Number(process.env.PORT)

app.listen({port: port, host: '0.0.0.0'}).then(()=>{
  console.log(`Server running on port ${process.env.PORT}. Version: ${packageJson.version}`)
}).catch((err)=>{   
  app.log.error(err)
  process.exit(1)
})