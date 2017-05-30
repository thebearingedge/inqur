import deepClone from 'deep-clone'
import camelCase from 'camelcase'
import snakeCase from 'snake-case'

const camelKeys = deepClone.formatKeys(camelCase)
const snakeKeys = deepClone.formatKeys(snakeCase)

export default function camelSql(obj) {
  return Object
    .keys(obj)
    .reduce((_obj, method) => ({
      ..._obj,
      [method]: async data => camelKeys(await obj[method](snakeKeys(data)))
    }), {})
}
