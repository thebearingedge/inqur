import debounce from 'debounce'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { Input, Fields, Button, Anchor, Controls } from '../components'
import { onSubmit, onSubmitSuccess, asyncValidate } from './actions'
import { validate, shouldAsyncValidate } from './helpers'

class Form extends Component {
  componentWillMount() {
    const { asyncValidate } = this.props
    this.asyncValidate = debounce(asyncValidate, 200)
  }
  render() {
    const { asyncValidate } = this
    const { handleSubmit, submitting } = this.props
    return (
      <form noValidate onSubmit={ handleSubmit }>
        <Fields>
          <Field
            autoFocus
            name='username'
            type='text'
            placeholder='Username'
            onChange={ asyncValidate }
            component={ Input }/>
          <Field
            name='email'
            type='email'
            placeholder='Email'
            component={ Input }/>
          <Field
            name='password'
            type='password'
            placeholder='Password'
            component={ Input }/>
          <Field
            name='retypePassword'
            type='password'
            placeholder='Retype Password'
            component={ Input }/>
        </Fields>
        <Controls>
          <Anchor prefetch href='/signin'>sign in</Anchor>
          <Button type='submit' disabled={ submitting }>Register</Button>
        </Controls>
      </form>
    )
  }
}

export const mapDispatch = dispatch => bindActionCreators({
  onSubmit,
  asyncValidate,
  onSubmitSuccess
}, dispatch)

export const Register = reduxForm({
  form: 'register',
  validate,
  touchOnBlur: false,
  shouldAsyncValidate
})(Form)

export default connect(null, mapDispatch)(Register)
