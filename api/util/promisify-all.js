import { promisify } from 'util'

export default function promisifyAll(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key + 'Async'] = promisify(obj[key])
    }
  }
}
