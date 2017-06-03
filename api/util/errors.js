import Error from 'es6-error'

export class CustomError extends Error {
  toJSON() {
    const { statusCode, error, message } = this
    return { statusCode, error, message }
  }
}

export class ClientError extends CustomError {}

export class BadRequest extends ClientError {
  get error() { return 'Bad Request' }
  get statusCode() { return 400 }
}

export class ValidationError extends BadRequest {
  constructor(errors) {
    super()
    this.errors = errors
  }
  toJSON() {
    const json = super.toJSON()
    const { errors } = this
    return { ...json, errors }
  }
}

export class InternalServerError extends CustomError {
  get error() { return 'Internal Server Error' }
  get statusCode() { return 500 }
}

// eslint-disable-next-line
export const errorHandler = () => (err, req, res, next) => {
  const error = err instanceof ClientError
    ? err
    : new InternalServerError()
  res.status(error.statusCode).json(error)
}
