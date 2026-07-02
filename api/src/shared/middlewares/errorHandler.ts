import { FastifyReply, FastifyRequest } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { ConflitcError, EmailNotFound, InactiveError, InvalidCredentialsError, NotFoundError, ValidationError } from './error'

export function errorHandler(
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof NotFoundError) {
    return reply.status(404).send({ message: error.message })
  }
  if (error instanceof EmailNotFound) {
    return reply.status(404).send({ message: error.message })
  }
  if (error instanceof InactiveError) {
    return reply.status(410).send({ message: error.message })
  }
  if (error instanceof ConflitcError) {
    return reply.status(409).send({ message: error.message })
  }
  if (error instanceof ValidationError) {
    return reply.status(400).send({ message: error.message })
  }
  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({ message: error.message })
  }
  // Zod validado automaticamente na rota (schema: {...}) lança um erro do Fastify, não um ZodError puro
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({ message: 'Dados inválidos', issues: error.validation })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Erro interno' })
}
