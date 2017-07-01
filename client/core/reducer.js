import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import signin from '../authentication/reducers'

export default combineReducers({ form, signin })
