import { describe, it } from 'mocha'
import { expect, INIT } from '../test/unit'
import * as types from './action-types'
import * as reducers from './reducers'

describe('authentication/reducers', () => {

  describe(INIT, () => {

    it('returns null', () => {
      const oldState = undefined
      const action = { type: INIT }
      const newState = reducers.error(oldState, action)
      expect(newState).to.equal(null)
    })

    describe(types.SIGNIN_SUBMITTED, () => {

      it('returns null', () => {
        const oldState = 'Danger!'
        const action = { type: types.SIGNIN_SUBMITTED }
        const newState = reducers.error(oldState, action)
        expect(newState).to.equal(null)
      })

    })

    describe(types.SIGNIN_FAILED, () => {

      it('returns the action message', () => {
        const oldState = null
        const action = {
          type: types.SIGNIN_FAILED,
          message: 'Your login information was incorrect.'
        }
        const newState = reducers.error(oldState, action)
        expect(newState).to.equal(action.message)
      })

    })

  })

})
