import { describe, it } from 'mocha'
import { expect, INIT } from '../test/unit'
import * as types from './action-types'
import * as reducers from './reducers'

describe('authentication/reducers', () => {

  describe('signinError', () => {

    describe(INIT, () => {

      it('returns null', () => {
        const oldState = undefined
        const action = { type: INIT }
        const newState = reducers.signinError(oldState, action)
        expect(newState).to.equal(null)
      })

      describe(types.SIGNIN_VISITED, () => {

        it('returns null', () => {
          const oldState = 'Danger!'
          const action = { type: types.SIGNIN_VISITED }
          const newState = reducers.signinError(oldState, action)
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
          const newState = reducers.signinError(oldState, action)
          expect(newState).to.equal(action.message)
        })

      })

    })

  })

})
