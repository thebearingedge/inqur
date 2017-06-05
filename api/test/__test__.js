import 'dotenv/config'
import chai from 'chai'
import { chaiStruct } from 'chai-struct'
import axios from 'axios'
import qs from 'qs'
import { begin } from '../__test__'
import { createApp } from '../server'

chai.use(chaiStruct)

export const start = setup => done => {
  begin(trx => {
    const server = createApp(trx).listen(process.env.API_TEST_PORT, () => {
      setup(trx, server)
    })
  })(done)
}

export const request = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: `http://localhost:${process.env.API_TEST_PORT}`,
  responseType: 'json',
  validateStatus: () => true,
  paramsSerializer: qs.stringify
})
