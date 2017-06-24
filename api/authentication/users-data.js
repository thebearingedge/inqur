import { camelSql } from '../util'

export default function usersData(knex) {

  return camelSql({ findByUsername })

  async function findByUsername(username) {
    const user = await knex
      .select('*')
      .from('users')
      .where({ username })
      .first()
    return user || null
  }

}
