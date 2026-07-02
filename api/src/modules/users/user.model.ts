import { prisma } from "../../../prisma/lib/prisma";
import { ConflitcError, EmailNotFound, NotFoundError } from "../../shared/middlewares/error";
import { hashPassword } from "../../shared/utils/hashPassword";

export const getUsers = async () => {
  return await prisma.users.findMany();
};

export const getUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError(id);
  }
  return await prisma.users.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    throw new EmailNotFound(email);
  }

  return await prisma.users.findUnique({
    where: { email: email },
  });
};

export const updateUser = async (id: number, name: string, email: string, password: string) => {
  await getUserById(id);

  return await prisma.users.update({
    where: { id },
    data: { name, email, password },
  });
};

export const createUser = async (name: string, email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (user) {
    throw new ConflitcError(`Email já cadastrado`);
  }

  const hashedPassword = await hashPassword(password);

  return await prisma.users.create({
    data: { name, email, password: hashedPassword },
  });
};
