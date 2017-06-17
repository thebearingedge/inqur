import { compose, createStore, applyMiddleware } from 'redux'
import Router from 'next/router'
import thunk from 'redux-thunk'
import api from './api'
import reducer from './reducer'

const { devToolsExtension = () => _ => _ } = global

export default (env = { api, Router }) => state =>
  createStore(reducer, state, compose(
    applyMiddleware(thunk.withExtraArgument(env)),
    devToolsExtension()
  ))
