import jwt from 'jsonwebtoken'

export default function tokensData(redis) {

  return { verify }

  async function verify(token) {
    const exists = await redis.existsAsync(token)
    if (!exists) return null
    return new Promise(resolve => {
      jwt.verify(token, process.env.TOKEN_SECRET, (_, result) => {
        resolve(result || null)
      })
    })
  }

}
