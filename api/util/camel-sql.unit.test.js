import { describe, it } from 'mocha'
import { expect } from '../__test__'
import { spy } from 'sinon'
import camelSql from './camel-sql'

describe('camelSql', () => {

  it('translates camel-keyed inputs and snake-keyed outputs', async () => {
    const obj = { method: spy(arg => arg) }
    const camel = { fooBar: 'baz' }
    const snake = { foo_bar: 'baz' }
    const wrapped = camelSql(obj)
    const result = await wrapped.method(camel)
    expect(result).to.deep.equal(camel)
    expect(obj.method).to.have.been.calledWith(snake)
  })

})
