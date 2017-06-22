import { describe, it } from 'mocha'
import { expect } from '../test/unit'
import { spy } from 'sinon'
import run from 'express-unit'
import * as errors from './errors'

describe('errors', () => {

  describe('BadRequest', () => {
    it('has a 400 status', () => {
      const err = new errors.BadRequest()
      expect(err).to.have.property('error', 'Bad Request')
      expect(err).to.have.property('statusCode', 400)
      expect(err.toJSON()).to.include({
        error: 'Bad Request',
        statusCode: 400
      })
    })
  })

  describe('Unauthorized', () => {
    it('has a 401 status', () => {
      const err = new errors.Unauthorized()
      expect(err).to.have.property('error', 'Unauthorized')
      expect(err).to.have.property('statusCode', 401)
      expect(err.toJSON()).to.include({
        error: 'Unauthorized',
        statusCode: 401
      })
    })
  })

  describe('ValidationError', () => {
    it('is a BadRequest error', () => {
      const err = new errors.ValidationError()
      expect(err).to.have.property('error', 'Bad Request')
      expect(err).to.have.property('statusCode', 400)
      expect(err.toJSON()).to.have.all.keys([
        'error',
        'statusCode',
        'message',
        'errors'
      ])
    })
  })

  describe('InternalServerError', () => {
    it('has a 500 status', () => {
      const err = new errors.InternalServerError()
      expect(err).to.have.property('error', 'Internal Server Error')
      expect(err).to.have.property('statusCode', 500)
      expect(err.toJSON()).to.include({
        error: 'Internal Server Error',
        statusCode: 500
      })
    })
  })

  describe('errorHandler', () => {

    describe('when passed a client error', () => {
      const error = new errors.ClientError()
      const setup = (req, res, next) => {
        spy(res, 'status')
        spy(res, 'json')
        next(error)
      }
      it('sends the client error', done => {
        run(setup, errors.errorHandler(), (_err, req, res) => {
          expect(_err).to.equal(null)
          expect(res.json).to.have.been.calledWith(error)
          done()
        })
      })
    })

    describe('when passed another error', () => {
      const error = new errors.CustomError()
      const setup = (req, res, next) => {
        spy(res, 'status')
        spy(res, 'json')
        next(error)
      }
      it('sends the client error', done => {
        run(setup, errors.errorHandler(), (_err, req, res) => {
          expect(_err).to.equal(null)
          expect(res.status).to.have.been.calledWith(500)
          const [ sent ] = res.json.getCall(0).args
          expect(sent).to.have.property('error', 'Internal Server Error')
          expect(res.json).to.have.been.calledWith(sent)
          done()
        })
      })
    })

  })

})
