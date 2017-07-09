import 'dotenv/config'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'
import chai, { expect } from 'chai'

chai.use(sinonChai)

export { expect, stub }
