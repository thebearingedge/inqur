import axios from 'axios'
import { stringify } from 'qs'

export default axios.create({
  baseURL: '/api',
  paramsSerializer: stringify
})
