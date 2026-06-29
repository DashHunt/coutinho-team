import { prisma } from "../../../prisma/lib/prisma";

export const getUsers = async () => {
  return await prisma.users.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.users.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email: email },
  });
};

export const updateUser = async (id: number, name: string, email: string, password: string) => {
  return await prisma.users.update({
    where: { id },
    data: { name, email, password },
  });
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  return await prisma.users.create({
    data: {name, email, password},
  });
};
