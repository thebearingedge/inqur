import { BadRequest } from './errors'

export class ValidationError extends BadRequest {
  constructor(errors) {
    super('Validation failure. See "errors" for details.')
    this.errors = errors
  }
  toJSON() {
    const json = super.toJSON()
    const { errors } = this
    return { ...json, errors }
  }
}

const options = { stripUnknown: true }

export default function validate(config) {
  const schemas = Object.keys(config)
  return (req, res, next) => {
    const _req = schemas.reduce((_req, schema) => {
      const { errors, values } = _req
      const { error, value } = config[schema].validate(req[schema], options)
      return {
        errors: error ? errors.concat({ [schema]: error.details }) : errors,
        values: Object.assign({}, values, { [schema]: value })
      }
    }, { errors: [], values: {} })
    if (_req.errors.length) throw new ValidationError(Object.assign(..._req.errors))
    Object.assign(req, _req)
    next()
  }
}
