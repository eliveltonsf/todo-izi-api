import fastifyCors from '@fastify/cors';
import fastify from "fastify";
import { teste } from './routes/teste';

import 'dotenv/config';
import packageJson from "../package.json";

const app = fastify()


app.register(fastifyCors, {
  origin: '*'
})

app.register(teste)


const port = Number(process.env.PORT)

app.listen({port: port, host: '0.0.0.0'}).then(()=>{
  console.log(`Server running on port ${process.env.PORT}. Version: ${packageJson.version}`)
}).catch((err)=>{   
  app.log.error(err)
  process.exit(1)
})