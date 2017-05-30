import Error from 'es6-error'

class CustomError extends Error {
  toJSON() {
    const { statusCode, error, message } = this
    return { statusCode, error, message }
  }
}

export class InternalServerError extends CustomError {
  get error() { return 'Internal Server Error' }
  get statusCode() { return 500 }
}

// eslint-disable-next-line
export const errorHandler = () => (err, req, res, next) => {
  const error = err instanceof CustomError
    ? err
    : new InternalServerError()
  res.json(error)
}
