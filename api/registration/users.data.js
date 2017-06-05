import bcrypt from 'bcrypt'
import { camelSql } from '../util'

export default function usersData(knex) {

  return camelSql({ create, isAvailable })

  async function create({ username, email, password: unhashed }) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(unhashed, salt)
    const [ created ] = await knex
      .insert({ username, email, password })
      .into('users')
      .returning(['user_id', 'username', 'email'])
    return created
  }

  async function isAvailable({ username }) {
    const { exists } = await knex
      .select(knex.raw('count(username)::int::boolean as exists'))
      .from('users')
      .where({ username })
      .first()
    return !exists
  }

}
