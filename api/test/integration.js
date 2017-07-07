import chai from 'chai'
import { chaiStruct } from 'chai-struct'
import axios from 'axios'
import qs from 'qs'
import { begin, redis } from './db'
import createApi from '../create-api'
export * from './shared'

process.env.NODE_ENV = 'test'

chai.use(chaiStruct)

export const start = setup => done => {
  begin(trx => {
    const server = createApi(trx, redis).listen(process.env.API_PORT, () => {
      setup(trx, server)
    })
  })(done)
}

export const request = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}`,
  validateStatus: () => true,
  paramsSerializer: qs.stringify
})
