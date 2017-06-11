import { compose, createStore, applyMiddleware } from 'redux'
import Router from 'next/router'
import thunk from 'redux-thunk'
import api from './api'
import reducer from './reducer'

const { devToolsExtension = () => _ => _ } = global

export default state =>
  createStore(reducer, state, compose(
    applyMiddleware(thunk.withExtraArgument({ api, Router })),
    devToolsExtension()
  ))
