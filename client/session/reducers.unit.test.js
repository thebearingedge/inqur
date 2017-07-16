import { describe, it } from 'mocha'
import { expect, INIT } from '../test/unit'
import * as types from './types'
import session from './reducers'

describe('session/reducers', () => {

  describe('session', () => {

    describe(INIT, () => {

      it('returns null', () => {
        const oldState = undefined
        const action = { type: INIT }
        const newState = session(oldState, action)
        expect(newState).to.equal(null)
      })

      describe(types.SESSION_STARTED, () => {

        it('returns null', () => {
          const user = {}
          const oldState = null
          const action = {
            type: types.SESSION_STARTED,
            session: user
          }
          const newState = session(oldState, action)
          expect(newState).to.equal(user)
        })

      })

      describe(types.SESSION_RESUMED, () => {

        it('returns null', () => {
          const user = {}
          const oldState = null
          const action = {
            type: types.SESSION_RESUMED,
            session: user
          }
          const newState = session(oldState, action)
          expect(newState).to.equal(user)
        })

      })

    })

  })

})
