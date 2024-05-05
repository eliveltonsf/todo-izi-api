import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserType, LoginInput } from "./user-schema";
import { createUser, findUserByEmail, findUsers } from "./user-service";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserType;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  const userExist = await findUserByEmail(body.email);

  if (userExist) {
    return reply.status(401).send("User already exists!");
  }

  const user = await createUser(body);

  return reply.status(201).send({ ...user, id: randomUUID() });
}

export async function getUsersHandler() {
  const users = await findUsers();

  console.log(users);

  return users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
}

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply
      .status(401)
      .send({ message: "Enter the access token properly." });
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  // find a user by email
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.status(404).send({ err: "User not found" });
  }

  const correctUser = bcrypt.compareSync(body.password, user.password);

  if (!correctUser) {
    return reply.status(400).send({ err: "Invalid email or password" });
  }

  try {
    const token = await reply.jwtSign(
      { email: user.email },
      { sign: { sub: user.id } }
    );
    return reply.send({ accessToken: token });
  } catch (err) {
    return reply.status(400).send({ msg: "Internal failure", err });
  }
}
