export class NotFoundError extends Error {
  constructor(id: number) {
    super(`Recurso não encontrado ${id}`)
    this.name = 'NotFoundError'
  }
}

export class EmailNotFound extends Error {
  constructor(email: string) {
    super(`Email não encontrado ${email}`)
    this.name = 'EmailNotFound'
  }
}

export class InactiveError extends Error {
  constructor() {
    super('Herói inativo não pode ser editado')
    this.name = 'InactiveError'
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCredentialsError'
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class ConflitcError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
