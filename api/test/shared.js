import 'dotenv/config'
import { stub, spy } from 'sinon'
import chai, { expect } from 'chai'
import { chaiStruct } from 'chai-struct'
import sinonChai from 'sinon-chai'

process.env.NODE_ENV = 'test'

chai.use(chaiStruct)
chai.use(sinonChai)

export { expect, stub, spy }
