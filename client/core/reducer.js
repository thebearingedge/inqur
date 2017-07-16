import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import signin from '../authentication/reducers'
import session from '../session/reducers'

export default combineReducers({ form, signin, session })
