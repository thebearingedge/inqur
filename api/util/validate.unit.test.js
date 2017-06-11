import { describe, it } from 'mocha'
import joi from 'joi'
import { expect } from '../__test__'
import run from 'express-unit'
import { ValidationError } from './errors'
import validate from './validate'

describe('validate', () => {

  it('returns a middleware', () => {
    const middleware = validate()
    expect(middleware)
      .to.be.a('function')
      .with.lengthOf(3)
  })

  describe('when request data is invalid', () => {
    const schema = joi.object().keys({
      username: joi.string().trim().required()
    })
    const middleware = validate({ body: schema })
    const setup = (req, res, next) => {
      req.body = {}
      next()
    }
    it('forwards a ValidationError', done => {
      run(setup, middleware, err => {
        expect(err).to.be.an.instanceOf(ValidationError)
        done()
      })
    })
  })

  describe('when the request data is valid', () => {
    const schema = joi.object().keys({
      username: joi.string().trim().required()
    })
    const middleware = validate({ body: schema })
    const setup = (req, res, next) => {
      req.body = {
        username: 'foo',
        datOfBirth: new Date('1/1/1970')
      }
      next()
    }
    it('strips unknown properties', done => {
      run(setup, middleware, (err, req) => {
        expect(err).to.equal(null)
        expect(req.body)
          .to.have.property('username')
          .and.not.to.have.property('dateOfBirth')
        done()
      })
    })
  })

})
