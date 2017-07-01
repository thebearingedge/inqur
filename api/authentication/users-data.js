import { camelSql } from '../util'

export default function usersData(knex) {

  return camelSql({ find })

  async function find(usernameOrEmail) {
    const user = await knex
      .select('*')
      .from('users')
      .where({ username: usernameOrEmail })
      .orWhere({ email: usernameOrEmail })
      .first()
    return user || null
  }

}
