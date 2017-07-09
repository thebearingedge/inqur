import { before } from 'mocha'
import { grey } from 'chalk'

before(() => console.log(grey('\n  API Unit Tests\n')))

export * from './shared'
