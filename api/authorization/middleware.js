import { wrap, errors } from '../util'

export const verify = tokens =>
  wrap(async (req, res, next) => {
    const token = req.get('X-Access-Token')
    if (!token) throw new errors.Unauthorized('Insufficient Permissions')
    req.user = await tokens.verify(token)
    if (!req.user) throw new errors.Unauthorized('Insufficient Permissions')
    next()
  })
