import Error from 'es6-error'

class ClientError extends Error {
  toJSON() {
    const { statusCode, error, message } = this
    return { statusCode, error, message }
  }
}

export class BadRequest extends ClientError {
  get error() { return 'Bad Request' }
  get statusCode() { return 400 }
}

export class InternalServerError extends Error {
  get error() { return 'Internal Server Error' }
  get statusCode() { return 500 }
}

// eslint-disable-next-line
export const errorHandler = () => (err, req, res, next) => {
  const error = err instanceof ClientError
    ? err
    : new InternalServerError()
  res.json(error)
}
