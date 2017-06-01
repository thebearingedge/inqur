import { describe, it } from 'mocha'
import { expect } from 'chai'
import run from 'express-unit'
import wrap from './async-wrap'

describe('asyncWrap', () => {

  describe('when the supplied middleware is not an error handler', () => {
    // eslint-disable-next-line
    const middleware = (req, res, next) => Promise.resolve()
    it('returns a new middleware with arity of 3', async () => {
      const wrapped = wrap(middleware)
      expect(wrapped).to.have.a.lengthOf(3)
      const [ err ] = await run(null, wrapped)
      expect(err).to.be.null
    })
  })

  describe('when the supplied middleware is an error handler', () => {
    // eslint-disable-next-line
    const middleware = (err, req, res, next) => Promise.resolve()
    it('returns a new middleware with arity of 4', async () => {
      const wrapped = wrap(middleware)
      expect(wrapped).to.have.a.lengthOf(4)
      const [ err ] = await run(null, wrapped)
      expect(err).to.be.null
    })
  })

})
