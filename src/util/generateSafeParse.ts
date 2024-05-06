import { FastifyReply, FastifyRequest } from "fastify";
import { ZodType } from "zod";

export async function generateSafeParse<T>(
  request: FastifyRequest,
  reply: FastifyReply,
  schema: ZodType<T, any>,
  messageError: string,
  typeRequest: "body" | "user" | "params" | "query"
): Promise<T> {
  const valueParsed = schema.safeParse(
    typeRequest === "user"
      ? request.user
      : typeRequest === "body"
      ? request.body
      : typeRequest === "params"
      ? request.params
      : request.query
  );

  if (!valueParsed.success) {
    return reply.status(401).send({ error: messageError });
  }

  return valueParsed.data;
}
