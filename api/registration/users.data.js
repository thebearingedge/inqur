import bcrypt from 'bcrypt'
import camelSql from '../camel-sql'

export default function usersData(knex) {

  return camelSql({ create })

  async function create({ username, email, password: unhashed }) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(unhashed, salt)
    const [ created ] = await knex
      .insert({ username, email, password })
      .into('users')
      .returning(['user_id', 'username', 'email'])
    return created
  }

}
