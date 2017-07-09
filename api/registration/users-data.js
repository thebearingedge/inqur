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
      .returning(['user_id', 'username', 'email', 'created_at', 'updated_at'])
    return created
  }

  async function isAvailable({ username }) {
    const { rows: [{ exists }] } = await knex
      .raw(`select exists(${
        knex
          .select('*')
          .from('users')
          .where({ username })
          .first()
      })`)
    return !exists
  }

}
