import { connect } from 'react-redux'
import React from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { Input, FormError, Fields, Button, Anchor, Controls } from '../components'
import { onSubmit, onSubmitSuccess, onSubmitFail } from './actions'
import { validate } from './helpers'

const Page = ({ handleSubmit, onSubmit, submitting, signinError }) => {
  return (
    <form noValidate onSubmit={ handleSubmit }>
      <Fields>
        <FormError error={ signinError } submitting={ submitting }/>
        <Field
          autoFocus
          name='username'
          type='text'
          placeholder='Username'
          component={ Input }/>
        <Field
          name='password'
          type='password'
          placeholder='Password'
          component={ Input }/>
      </Fields>
      <Controls>
        <Anchor prefetch href='/register'>need an account?</Anchor>
        <Button type='submit' disabled={ submitting }>Sign In</Button>
      </Controls>
    </form>
  )
}

export const mapState = ({ signin: { signinError } }) => ({
  signinError
})

export const mapDispatch = dispatch => bindActionCreators({
  onSubmit,
  onSubmitFail,
  onSubmitSuccess
}, dispatch)

export const Signin = reduxForm({
  form: 'signin',
  validate,
  touchOnBlur: false
})(Page)

export default connect(mapState, mapDispatch)(Signin)
