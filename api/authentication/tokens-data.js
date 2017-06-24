import jwt from 'jsonwebtoken'

export default function tokensData(redis) {

  return { issue }

  async function issue(payload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET)
    await redis.psetexAsync(token, process.env.TOKEN_EXPIRY, token)
    return token
  }

}
