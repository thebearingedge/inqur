import bcrypt from 'bcrypt'
import { wrap, errors } from '../util'

export const authenticate = users =>
  wrap(async (req, res, next) => {
    const { username, password } = req.body
    const found = await users.findByUsername(username)
    if (!found) throw new errors.Unauthorized('Invalid Login')
    const { password: hashed, ...user } = found
    const match = await bcrypt.compare(password, hashed)
    if (!match) throw new errors.Unauthorized('Invalid Login')
    res.locals.user = user
    next()
  })
