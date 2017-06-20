import axios from 'axios'
import { stringify } from 'qs'

export default axios.create({
  baseURL: process.env.API_URL,
  paramsSerializer: stringify
})
