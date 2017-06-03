import 'dotenv/config'
import chai from 'chai'
import { chaiStruct } from 'chai-struct'
import axios from 'axios'
import { begin } from '../__test__'
import { createApp } from '../server'

chai.use(chaiStruct)

export const start = setup => done => {
  begin(trx => {
    const server = createApp(trx).listen(process.env.TEST_PORT, () => {
      setup(trx, server)
    })
  })(done)
}

export const request = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: `http://localhost:${process.env.TEST_PORT}`,
  responseType: 'json',
  validateStatus: () => true
})
