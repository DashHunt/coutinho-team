import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUserByEmail, getUserById, getUsers, updateUser } from "./user.model";

type GetByIdBody = { Params: { id: number } };
type GetByEmailBody = { Body: { email: string } };
type UpdateBody = {
  Body: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
};
type CreateBody = {
  Body: {
    name: string;
    email: string;
    password: string;
  };
};

export class UserController {
  public static async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.send(await getUsers());
  }

  public static async getByEmail(
    request: FastifyRequest<GetByEmailBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { email } = request.body;
    const coach = await getUserByEmail(email);

    if (!coach) {
      return reply.code(404).send({ message: "Coach not found" });
    }

    reply.send(coach);
  }

  public static async getById(
    request: FastifyRequest<GetByIdBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = request.params.id;
    const coach = await getUserById(id);

    if (!coach) {
      return reply.code(404).send({ message: "Coach not found" });
    }

    reply.send(coach);
  }

  public static async update(
    request: FastifyRequest<UpdateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id, name, email, password } = request.body;
    const user = await getUserById(id);

    if (!user) {
      return reply.code(404).send({ message: "Coach not found" });
    }

    const updatedUser = await updateUser(id, name, email, password);
    reply.send(updatedUser);
  }

  public static async create(
    request: FastifyRequest<CreateBody>,
    reply: FastifyReply,
  ): Promise<void> {
    const { name, email, password } = request.body;
    await createUser(name, email, password);

    reply.code(201).send({ message: "Coach created!" });
  }
}
