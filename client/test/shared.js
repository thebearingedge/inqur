import { stub } from 'sinon'
import sinonChai from 'sinon-chai'
import chai, { expect } from 'chai'

process.env.NODE_ENV = 'test'

chai.use(sinonChai)

export { expect, stub }
