import { FastifyInstance } from "fastify";

export async function teste(app: FastifyInstance){
  app.get('/teste', async ( request, reply ) => {

    return reply.status(201).send({message: 'teste'})

  })
}