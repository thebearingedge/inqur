import toSlug from 'slug'
import { camelSql } from '../util'

export default function pollsData(knex) {

  return camelSql({ create })

  async function create({ question, user_id, options }) {
    const slug = toSlug(question)
    return knex.transaction(async trx => {
      const [{ poll_id }] = await trx
        .insert({ question, slug, user_id })
        .into('polls')
        .returning(['poll_id'])
      await trx
        .insert(options.map(option => ({
          ...option,
          poll_id
        })))
        .into('options')
      return findById(poll_id, trx)
    })
  }

  function findById(poll_id, trx = knex) {
    return trx
      .select('p.*', knex.raw('json_agg(row_to_json(o)) as options'))
      .from('polls as p')
      .joinRaw('join options as o using (poll_id)')
      .where({ poll_id })
      .groupBy('poll_id')
      .first()
  }

}
