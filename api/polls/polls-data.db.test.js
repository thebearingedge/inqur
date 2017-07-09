import { describe, beforeEach, afterEach, it } from 'mocha'
import { knex, begin, expect, rejected } from '../test/db'
import { Poll, fakePoll, fakeUser } from '../test/fixtures'
import pollsData from './polls-data'

describe('polls/polls-data', () => {

  let trx
  let polls
  let userId

  beforeEach(done => {
    begin(_trx => {
      trx = _trx
    })(async () => {
      polls = pollsData(trx)
      const [{ user_id }] = await trx
        .insert(fakeUser())
        .into('users')
        .returning(['user_id'])
      userId = user_id
      done()
    })
  })

  afterEach(() => trx.rollback())

  describe('create', () => {

    it('creates a poll owned by a user', async () => {
      const poll = fakePoll(userId)
      const created = await polls.create(poll)
      expect(created).to.have.structure(Poll)
    })

    it('does not create duplicate polls per user', async () => {
      const poll = fakePoll(userId)
      await polls.create(poll)
      const err = await rejected(polls.create(poll))
      expect(err)
        .to.be.an('error')
        .with.property('message')
        .that.includes('unique')
        .and.includes('slug')
        .and.includes('user_id')
    })

    it('does not create polls with fewer than two options', async () => {
      const err = await rejected(knex.transaction(async trx => {
        const [{ user_id }] = await trx
          .insert(fakeUser())
          .into('users')
          .returning(['user_id'])
        const { options: [ option ], ...poll } = fakePoll(user_id)
        await pollsData(trx).create({ ...poll, options: [ option ] })
      }))
      expect(err)
        .to.be.an('error')
        .with.property('message')
        .that.includes('cannot save fewer than two options')
    })

  })

})
