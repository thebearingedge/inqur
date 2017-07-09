import 'dotenv/config'
import { stub, spy } from 'sinon'
import sinonChai from 'sinon-chai'
import chai, { expect } from 'chai'
import { chaiStruct } from 'chai-struct'

chai.use(chaiStruct)
chai.use(sinonChai)

const rejected = promise => promise.catch(err => err)

export { expect, stub, spy, rejected }
