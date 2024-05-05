import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { CreateUserType } from "./user-schema";

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function createUser(dataUser: CreateUserType) {
  const { email, password, name } = dataUser;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      name,
    },
  });

  return user;
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}
